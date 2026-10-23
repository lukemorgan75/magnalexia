(function () {
  var deskName = document.body.getAttribute("data-desk");
  if (deskName !== "down" && !document.getElementById("sankey-root") && !document.getElementById("chord-root")) return;

  var DATA = null;
  var VERSE = null;
  var FLOW = null;
  var markCache = {};
  var chordFocus = null;
  var sankeyFocus = null;
  var sankeyLatch = null;
  var sankeyDrill = [];
  var sankeyTrue = true;
  var sankeySeenWidth = 0;
  var OVERVIEW_THREAD = 2.75;
  var downFocus = null;
  var hoverTimer = 0;
  var downHoverTimer = 0;
  var grain = "both";

  var SHORT = {
    advent: "Adv", christmas: "Chr", epiphany: "Epi", gesima: "Ges", lent: "Len",
    holyweek: "HW", easter: "Eas", pentecost: "Pen", ordinary: "Ord", feasts: "Fea"
  };
  var INCENSE = {
    advent: ["#734878", "#f7f3ea"], christmas: ["#e3d2a4", "#5c4930"], epiphany: ["#3e6d64", "#f7f3ea"],
    gesima: ["#5c5378", "#f7f3ea"], lent: ["#6b446f", "#f7f3ea"], holyweek: ["#a83d49", "#f7f3ea"],
    easter: ["#d8c398", "#5c4930"], pentecost: ["#a83d49", "#f7f3ea"], ordinary: ["#3e6d64", "#f7f3ea"],
    feasts: ["#8a6434", "#f7f3ea"]
  };
  var FOG = {
    advent: ["#3B82F6", "#f5f5f7"], christmas: ["#E6B422", "#1c1406"], epiphany: ["#22C55E", "#04150a"],
    gesima: ["#818CF8", "#0b1020"], lent: ["#1D4ED8", "#f5f5f7"], holyweek: ["#C2410C", "#fff7ed"],
    easter: ["#86EFAC", "#052e16"], pentecost: ["#60A5FA", "#0b1220"], ordinary: ["#15803D", "#f0fdf4"],
    feasts: ["#F59E0B", "#1c1406"]
  };
  var LECT_LABEL = { rcl: "RCL", office: "Daily Office", historic: "1662" };

  function fogTheme() { return document.body.getAttribute("data-wheel") === "fog"; }
  function palette() { return fogTheme() ? FOG : INCENSE; }
  function seasonColor(id) {
    var row = palette()[id] || (fogTheme() ? ["#8e8e93", "#111"] : ["#6e5430", "#f7f3ea"]);
    return { fill: row[0], ink: row[1] };
  }
  function lectTrack(id) {
    var map = fogTheme()
      ? { rcl: "#c4b4a4", office: "#7dcec0", historic: "#e0b080" }
      : { rcl: "#a3826c", office: "#2f6f62", historic: "#8a5a32" };
    return map[id] || "#888";
  }
  function ink() { return fogTheme() ? "#f5f5f7" : "#1c1612"; }
  function muted() { return fogTheme() ? "#98989d" : "rgba(28, 22, 18, 0.64)"; }
  function sourceBar() {
    return fogTheme() ? { fill: "#3a3a3c", ink: "#f5f5f7" } : { fill: "#d4cbc0", ink: "#1c1612" };
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function num(n) { return Math.round(n).toLocaleString("en-US"); }
  function r1(n) { return Math.round(n * 10) / 10; }
  function pt(cx, cy, r, a) { return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; }
  function samePick(a, b) {
    if (!a || !b) return false;
    return a.kind === b.kind && String(a.id) === String(b.id) && (a.year || "") === (b.year || "") && (a.lect || "") === (b.lect || "") && (a.season || "") === (b.season || "") && (a.book || "") === (b.book || "") && (a.chapter || "") === (b.chapter || "");
  }
  function buildFlowIndex() {
    var book = [];
    var section = {};
    var year = {};
    var season = {};
    (DATA.books || []).forEach(function () { book.push({ years: {}, seasons: {} }); });
    (DATA.passages || []).forEach(function (p) {
      var info = DATA.books[p.b];
      if (!info || !book[p.b]) return;
      var slot = book[p.b];
      slot.years[p.y] = true;
      slot.seasons[p.y + "|" + p.s] = true;
      var sec = section[info.section] || (section[info.section] = { years: {}, seasons: {}, books: {} });
      sec.years[p.y] = true;
      sec.seasons[p.y + "|" + p.s] = true;
      sec.books[p.b] = true;
      var yr = year[p.y] || (year[p.y] = { books: {}, sections: {}, seasons: {} });
      yr.books[p.b] = true;
      yr.sections[info.section] = true;
      yr.seasons[p.y + "|" + p.s] = true;
      var key = p.y + "|" + p.s;
      var row = season[key] || (season[key] = { books: {}, sections: {} });
      row.books[p.b] = true;
      row.sections[info.section] = true;
    });
    FLOW = { book: book, section: section, year: year, season: season };
  }
  function copyFlags(from, into) {
    if (!from) return;
    Object.keys(from).forEach(function (key) { into[key] = true; });
  }
  function markOverview(pick, books, sections, seasons, years) {
    if (!pick || !FLOW) return;
    if (pick.kind === "section" && FLOW.section[pick.id]) {
      var sec = FLOW.section[pick.id];
      sections[pick.id] = true;
      copyFlags(sec.books, books);
      copyFlags(sec.years, years);
      copyFlags(sec.seasons, seasons);
    } else if (pick.kind === "book" && FLOW.book[Number(pick.id)]) {
      var bk = FLOW.book[Number(pick.id)];
      books[String(pick.id)] = true;
      if (DATA.books[Number(pick.id)]) sections[DATA.books[Number(pick.id)].section] = true;
      copyFlags(bk.years, years);
      copyFlags(bk.seasons, seasons);
    } else if (pick.kind === "cycle" && FLOW.year[pick.id]) {
      var yr = FLOW.year[pick.id];
      years[pick.id] = true;
      copyFlags(yr.books, books);
      copyFlags(yr.sections, sections);
      copyFlags(yr.seasons, seasons);
    } else if (pick.kind === "season" && FLOW.season[pick.year + "|" + pick.id]) {
      var row = FLOW.season[pick.year + "|" + pick.id];
      years[pick.year] = true;
      seasons[pick.year + "|" + pick.id] = true;
      copyFlags(row.books, books);
      copyFlags(row.sections, sections);
    }
  }
  function lectName(id) {
    var found = "";
    (DATA.lects || []).forEach(function (lect) { if (lect.id === id) found = lect.name; });
    return found || id;
  }
  function yearName(lect, year) {
    var found = year;
    (DATA.lects || []).forEach(function (item) {
      if (item.id !== lect) return;
      (item.cycles || []).forEach(function (cycle) { if (cycle.id === year) found = cycle.name; });
    });
    return found;
  }
  function seasonName(id) {
    return (DATA.seasonNames && DATA.seasonNames[id]) || id;
  }
  function sectionById(id) {
    var found = null;
    (DATA.sections || []).forEach(function (s) { if (s.id === id) found = s; });
    return found;
  }
  function bibleLeaf() {
    var last = null;
    sankeyDrill.forEach(function (step) {
      if (step.kind === "section" || step.kind === "book" || step.kind === "chapter") last = step;
    });
    return last;
  }
  function lectLeaf() {
    var last = null;
    sankeyDrill.forEach(function (step) {
      if (step.kind === "cycle" || step.kind === "season" || step.kind === "day") last = step;
    });
    return last;
  }
  function lectDrillState() {
    var year = "";
    var season = "";
    var day = null;
    sankeyDrill.forEach(function (step) {
      if (step.kind === "cycle") year = String(step.id || "");
      if (step.kind === "season") {
        year = String(step.year || year || "");
        season = String(step.id || "");
      }
      if (step.kind === "day") {
        year = String(step.year || year || "");
        season = String(step.season || season || "");
        day = { id: String(step.id || ""), year: year, season: season, label: String(step.name || "Day") };
      }
    });
    if (day) { day.year = year; day.season = season; }
    return { year: year, season: season, day: day };
  }
  function sameLectDrill(a, b) {
    var ad = a && a.day;
    var bd = b && b.day;
    return !!a && !!b && a.year === b.year && a.season === b.season && String((ad && ad.id) || "") === String((bd && bd.id) || "") && String((ad && ad.year) || "") === String((bd && bd.year) || "") && String((ad && ad.season) || "") === String((bd && bd.season) || "");
  }
  function publishLectDrill(before, after) {
    if (sameLectDrill(before, after)) return;
    document.dispatchEvent(new CustomEvent("ar-lect-drill", { detail: { before: before, after: after } }));
  }
  function sameBibleDrill(a, b) {
    return !!a && !!b && a.kind === b.kind && a.book === b.book && Number(a.chapter) === Number(b.chapter);
  }
  function bibleDrillState() {
    var canon = { kind: "canon", section: "Law", book: "Genesis", chapter: 1 };
    if (!DATA) return canon;
    var leaf = bibleLeaf();
    if (!leaf) return canon;
    if (leaf.kind === "section") {
      var sec = sectionById(leaf.id);
      var bi = sec && sec.books && sec.books.length ? Number(sec.books[0]) : 0;
      var book = DATA.books[bi];
      return { kind: "section", section: sec ? sec.name : "", book: book ? book.name : "Genesis", chapter: 1 };
    }
    if (leaf.kind === "book") {
      var chosen = DATA.books[Number(leaf.id)];
      var chosenSec = chosen ? sectionById(chosen.section) : null;
      return { kind: "book", section: chosenSec ? chosenSec.name : "", book: chosen ? chosen.name : "", chapter: 1 };
    }
    if (leaf.kind === "chapter") {
      var chapterBook = DATA.books[Number(leaf.book)];
      var chapterSec = chapterBook ? sectionById(chapterBook.section) : null;
      return { kind: "chapter", section: chapterSec ? chapterSec.name : "", book: chapterBook ? chapterBook.name : "", chapter: Number(leaf.id) || 1 };
    }
    return canon;
  }
  function publishBibleDrill(before, after) {
    if (sameBibleDrill(before, after)) return;
    document.dispatchEvent(new CustomEvent("ar-bible-drill", { detail: { before: before, after: after } }));
  }
  function bookIdsInDrill() {
    var ids = [];
    DATA.books.forEach(function (book, i) {
      var ok = true;
      sankeyDrill.forEach(function (step) {
        if (step.kind === "section" && book.section !== step.id) ok = false;
        if (step.kind === "book" && String(i) !== String(step.id)) ok = false;
        if (step.kind === "chapter" && String(i) !== String(step.book)) ok = false;
      });
      if (ok) ids.push(i);
    });
    return ids;
  }
  function visiblePassages() {
    var out = [];
    (DATA.passages || []).forEach(function (p, idx) {
      var book = DATA.books[p.b];
      if (!book) return;
      for (var i = 0; i < sankeyDrill.length; i++) {
        var step = sankeyDrill[i];
        if (step.kind === "section" && book.section !== step.id) return;
        if (step.kind === "book" && String(p.b) !== String(step.id)) return;
        if (step.kind === "chapter") {
          if (String(p.b) !== String(step.book)) return;
          if (!overlapsRange(p, chapterRange(Number(step.book), Number(step.id)))) return;
        }
        if (step.kind === "cycle" && p.y !== step.id) return;
        if (step.kind === "season" && (p.y !== step.year || p.s !== step.id)) return;
        if (step.kind === "day" && (p.y !== step.year || p.s !== step.season || String(p.i) !== String(step.id))) return;
      }
      out.push({ p: p, idx: idx });
    });
    return out;
  }
  function sankeyStepLabel(step) {
    if (step.kind === "section") {
      var sec = sectionById(step.id);
      return sec ? sec.name : step.id;
    }
    if (step.kind === "book") {
      var book = DATA.books[Number(step.id)];
      return book ? book.name : step.id;
    }
    if (step.kind === "chapter") return step.name || unitName(Number(step.book), Number(step.id));
    if (step.kind === "cycle") return "Year " + step.id;
    if (step.kind === "season") return "Year " + step.year + " · " + seasonName(step.id);
    if (step.kind === "day") return step.name || "Day";
    return step.id;
  }
  function bookVerses(bi) {
    if (!VERSE || !VERSE.length || !VERSE[bi] || !VERSE[bi].length) return null;
    return VERSE[bi];
  }
  function marksOf(bi) {
    if (markCache[bi]) return markCache[bi];
    var chapters = bookVerses(bi);
    if (!chapters) return null;
    var marks = [];
    var chapterStarts = [];
    var chapterEnds = [];
    var at = 0;
    for (var c = 0; c < chapters.length; c++) {
      chapterStarts.push(at);
      for (var v = 0; v < chapters[c].length; v++) {
        marks.push({ c: c + 1, v: v + 1, start: at, words: chapters[c][v] });
        at += chapters[c][v];
      }
      chapterEnds.push(at);
    }
    markCache[bi] = { marks: marks, chapterStarts: chapterStarts, chapterEnds: chapterEnds, total: at };
    return markCache[bi];
  }
  function chapterRange(bi, chapter) {
    var pack = marksOf(bi);
    if (!pack || chapter < 1 || chapter > pack.chapterStarts.length) return null;
    return { start: pack.chapterStarts[chapter - 1], end: pack.chapterEnds[chapter - 1] };
  }
  function verseRange(bi, chapter, verse) {
    var pack = marksOf(bi);
    if (!pack) return null;
    var marks = pack.marks;
    var lo = 0;
    var hi = marks.length - 1;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      var m = marks[mid];
      if (m.c < chapter || (m.c === chapter && m.v < verse)) lo = mid + 1;
      else if (m.c === chapter && m.v === verse) return { start: m.start, end: m.start + m.words };
      else hi = mid - 1;
    }
    return null;
  }
  function overlapsRange(p, range) {
    return !!range && p.o < range.end && (p.o + p.w) > range.start;
  }
  function verseAt(bi, offset) {
    var pack = marksOf(bi);
    if (!pack || !pack.marks.length) return null;
    var marks = pack.marks;
    if (offset < 0) offset = 0;
    if (offset >= pack.total) offset = pack.total - 1;
    var lo = 0;
    var hi = marks.length - 1;
    var ans = 0;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      if (marks[mid].start <= offset) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    return marks[ans];
  }
  function citeName(book) {
    if (!book) return "";
    return book.name === "Psalms" ? "Psalm" : book.name;
  }
  function unitName(bi, chapter, verse) {
    var name = citeName(DATA.books[bi]);
    if (!name) return "";
    if (verse) return name + " " + chapter + ":" + verse;
    return name + " " + chapter;
  }
  function citation(p) {
    var name = citeName(DATA.books[p.b]);
    if (!bookVerses(p.b)) return name;
    var start = verseAt(p.b, p.o);
    var end = verseAt(p.b, p.o + Math.max(p.w, 1) - 1);
    if (!start || !end) return name;
    var dash = "\u2013";
    if (start.c === end.c && start.v === end.v) return name + " " + start.c + ":" + start.v;
    if (start.c === end.c) return name + " " + start.c + ":" + start.v + dash + end.v;
    return name + " " + start.c + ":" + start.v + dash + end.c + ":" + end.v;
  }
  function utcDate(y, m, d) { return new Date(Date.UTC(y, m - 1, d)); }
  function addDays(dt, n) { return new Date(dt.getTime() + n * 86400000); }
  function isoOf(dt) {
    var m = dt.getUTCMonth() + 1;
    var d = dt.getUTCDate();
    return dt.getUTCFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
  }
  function todayIso() {
    var n = new Date();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    return n.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
  }
  function letterOf(startYear) {
    var mod = startYear % 3;
    if (mod === 0) return "A";
    if (mod === 1) return "B";
    return "C";
  }
  function easterSunday(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return utcDate(year, month, day);
  }
  function adventSunday(year) {
    for (var d = 27; d <= 33; d++) {
      var dt = utcDate(year, 11, d);
      if (dt.getUTCDay() === 0) return dt;
    }
    return null;
  }
  function sundayOnOrAfter(dt) {
    return addDays(dt, (7 - dt.getUTCDay()) % 7);
  }
  function nthWeekday(year, month, weekday, n) {
    var first = utcDate(year, month, 1);
    var add = (weekday - first.getUTCDay() + 7) % 7;
    return addDays(first, add + (n - 1) * 7);
  }
  function sundayInWeek(start) {
    for (var i = 0; i < 7; i++) {
      var dt = addDays(start, i);
      if (dt.getUTCDay() === 0) return dt;
    }
    return null;
  }
  var ADVENT_N = { "First Sunday of Advent": 0, "Second Sunday of Advent": 1, "Third Sunday of Advent": 2, "Fourth Sunday of Advent": 3 };
  var LENT_N = { "First Sunday in Lent": 1, "Second Sunday in Lent": 2, "Third Sunday in Lent": 3, "Fourth Sunday in Lent": 4, "Fifth Sunday in Lent": 5 };
  var EASTER_N = { "Second Sunday of Easter": 2, "Third Sunday of Easter": 3, "Fourth Sunday of Easter": 4, "Fifth Sunday of Easter": 5, "Sixth Sunday of Easter": 6, "Seventh Sunday of Easter": 7 };
  var EPI_N = { "Second Sunday after the Epiphany": 2, "Third Sunday after the Epiphany": 3, "Fourth Sunday after the Epiphany": 4, "Fifth Sunday after the Epiphany": 5, "Sixth Sunday after the Epiphany": 6, "Seventh Sunday after the Epiphany": 7 };
  var FROM_EASTER = {
    "Ash Wednesday": -46,
    "Liturgy of the Palms": -7,
    "Liturgy of the Passion": -7,
    "Monday of Holy Week": -6,
    "Tuesday of Holy Week": -5,
    "Wednesday of Holy Week": -4,
    "Maundy Thursday": -3,
    "Good Friday": -2,
    "Holy Saturday": -1,
    "Easter Vigil": 0,
    "Resurrection of the Lord": 0,
    "Easter Evening": 0,
    "Ascension of the Lord": 39,
    "Day of Pentecost": 49,
    "Trinity Sunday": 56
  };
  function occasionDate(startYear, name) {
    var easter = easterSunday(startYear + 1);
    if (Object.prototype.hasOwnProperty.call(ADVENT_N, name)) return addDays(adventSunday(startYear), ADVENT_N[name] * 7);
    if (name === "Nativity of the Lord - Proper I") return utcDate(startYear, 12, 24);
    if (name === "Nativity of the Lord - Proper II" || name === "Nativity of the Lord - Proper III") return utcDate(startYear, 12, 25);
    if (name === "First Sunday after Christmas Day") {
      for (var c = 26; c <= 31; c++) {
        var christmasSunday = utcDate(startYear, 12, c);
        if (christmasSunday.getUTCDay() === 0) return christmasSunday;
      }
      return null;
    }
    if (name === "Second Sunday after Christmas Day") {
      for (var s = 2; s <= 5; s++) {
        var second = utcDate(startYear + 1, 1, s);
        if (second.getUTCDay() === 0) return second;
      }
      return null;
    }
    if (name === "Holy Name of Jesus" || name === "New Year's Day") return utcDate(startYear + 1, 1, 1);
    if (name === "Epiphany of the Lord") return utcDate(startYear + 1, 1, 6);
    if (name === "Presentation of the Lord") return utcDate(startYear + 1, 2, 2);
    if (name === "Visitation of Mary to Elizabeth") return utcDate(startYear + 1, 5, 31);
    if (name === "Holy Cross") return utcDate(startYear + 1, 9, 14);
    if (name === "All Saints Day") return utcDate(startYear + 1, 11, 1);
    if (name === "Canadian Thanksgiving Day") return nthWeekday(startYear + 1, 10, 1, 2);
    if (name === "Thanksgiving Day") return nthWeekday(startYear + 1, 11, 4, 4);
    var baptism = sundayOnOrAfter(utcDate(startYear + 1, 1, 7));
    var transfiguration = addDays(easter, -49);
    if (name === "Baptism of the Lord") return baptism;
    if (name === "Transfiguration Sunday") return transfiguration;
    if (Object.prototype.hasOwnProperty.call(EPI_N, name)) {
      var epi = addDays(baptism, (EPI_N[name] - 1) * 7);
      if (epi.getTime() >= transfiguration.getTime()) return null;
      return epi;
    }
    if (name === "Annunciation of the Lord") {
      var ann = utcDate(startYear + 1, 3, 25);
      var palm = addDays(easter, -7);
      var easter2 = addDays(easter, 7);
      if (ann.getTime() >= palm.getTime() && ann.getTime() <= easter2.getTime()) return addDays(easter2, 1);
      return ann;
    }
    if (Object.prototype.hasOwnProperty.call(FROM_EASTER, name)) return addDays(easter, FROM_EASTER[name]);
    if (Object.prototype.hasOwnProperty.call(LENT_N, name)) return addDays(easter, -7 * (7 - LENT_N[name]));
    if (Object.prototype.hasOwnProperty.call(EASTER_N, name)) return addDays(easter, 7 * (EASTER_N[name] - 1));
    var proper = /Proper\s+(\d+)/.exec(name);
    if (proper) {
      var sun = sundayInWeek(addDays(utcDate(startYear + 1, 5, 29), (Number(proper[1]) - 4) * 7));
      if (!sun || sun.getTime() <= addDays(easter, 56).getTime()) return null;
      return sun;
    }
    return null;
  }
  var KEPT_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var KEPT_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var keptCache = {};
  function formatWhen(iso) {
    var y = Number(iso.slice(0, 4));
    var m = Number(iso.slice(5, 7));
    var d = Number(iso.slice(8, 10));
    var dt = new Date(Date.UTC(y, m - 1, d));
    var written = KEPT_DAYS[dt.getUTCDay()] + ", " + KEPT_MONTHS[m - 1] + " " + d + ", " + y;
    if (iso === todayIso()) return "Today, " + written + ".";
    return "Next on " + written + ".";
  }
  function nextKept(p) {
    var key = p.y + "\n" + p.n;
    if (keptCache[key]) return keptCache[key];
    var today = todayIso();
    var from = Number(today.slice(0, 4)) - 1;
    var best = "";
    for (var y = from; y < from + 90; y++) {
      if (letterOf(y) !== p.y) continue;
      var dt = occasionDate(y, p.n);
      if (!dt) continue;
      var iso = isoOf(dt);
      if (iso >= today && (!best || iso < best)) best = iso;
    }
    keptCache[key] = best ? formatWhen(best) : "This observance does not fall in the coming years.";
    return keptCache[key];
  }
  function bibleBarMode(depth, pack) {
    if (pack || !depth || !VERSE) return "canon";
    if (depth.kind === "book" && bookVerses(Number(depth.id))) return "chapters";
    if (depth.kind === "chapter" && bookVerses(Number(depth.book))) return "verses";
    return "canon";
  }
  function placeSlices(slices, gap) {
    var pad = 28;
    var total = 0;
    slices.forEach(function (s) { total += s.words; });
    var gaps = Math.max(0, slices.length - 1) * gap;
    var px = total ? (1680 - pad * 2 - gaps) / total : 0;
    var x = pad;
    slices.forEach(function (s, i) {
      s.x = x;
      s.w = s.words * px;
      x += s.w;
      if (i < slices.length - 1) x += gap;
    });
    slices.px = px;
    slices.right = x;
    slices.pad = pad;
  }
  function layoutChapters(bi) {
    var pack = marksOf(bi);
    if (!pack) return null;
    var slices = [];
    for (var c = 0; c < pack.chapterStarts.length; c++) {
      slices.push({
        kind: "chapter",
        id: c + 1,
        book: bi,
        words: pack.chapterEnds[c] - pack.chapterStarts[c],
        start: pack.chapterStarts[c],
        name: unitName(bi, c + 1),
        tip: unitName(bi, c + 1)
      });
    }
    placeSlices(slices, 4);
    slices.forEach(function (s) {
      s.label = s.w > String(s.id).length * 6.4 + 2 ? String(s.id) : "";
    });
    return slices;
  }
  function layoutVerses(bi, chapter) {
    var pack = marksOf(bi);
    if (!pack) return null;
    var slices = [];
    pack.marks.forEach(function (m) {
      if (m.c !== chapter) return;
      slices.push({
        kind: "verse",
        id: m.v,
        book: bi,
        chapter: chapter,
        words: m.words,
        start: m.start,
        name: unitName(bi, chapter, m.v),
        tip: unitName(bi, chapter, m.v)
      });
    });
    placeSlices(slices, 2);
    slices.forEach(function (s) {
      s.label = s.w > String(s.id).length * 6.4 + 2 ? String(s.id) : "";
    });
    return slices;
  }
  function spanInSlices(slices, offset, width) {
    var end = offset + width;
    var x0 = null;
    var x1 = null;
    slices.forEach(function (s) {
      if (!s.words) return;
      var a = Math.max(offset, s.start);
      var b = Math.min(end, s.start + s.words);
      if (b <= a) return;
      var left = s.x + ((a - s.start) / s.words) * s.w;
      var right = s.x + ((b - s.start) / s.words) * s.w;
      if (x0 == null || left < x0) x0 = left;
      if (x1 == null || right > x1) x1 = right;
    });
    if (x0 == null) return null;
    return { sx: x0, sw: Math.max(x1 - x0, 0.4) };
  }
  function geoFromUnits(units, bi) {
    var geom = [];
    if (units.length) {
      var a = units[0];
      var b = units[units.length - 1];
      geom[bi] = { x: a.x, w: (b.x + b.w) - a.x };
    }
    return { width: 1680, pad: 28, px: units.px, right: units.right, bookGeom: geom, secGeom: [] };
  }
  function drawUnits(parts, units, y, h) {
    var tone = sourceBar();
    units.forEach(function (unit) {
      if (unit.w < 0.25) return;
      var attrs = ' data-kind="' + unit.kind + '" data-id="' + unit.id + '" data-book="' + unit.book + '"';
      if (unit.kind === "verse") attrs += ' data-chapter="' + unit.chapter + '"';
      attrs += ' data-name="' + esc(unit.name) + '" data-tip="' + esc(unit.tip) + '"';
      parts.push('<rect class="sk-node"' + attrs + ' x="' + r1(unit.x) + '" y="' + y + '" width="' + r1(Math.max(unit.w, 0.4)) + '" height="' + h + '" fill="' + tone.fill + '"/>');
      if (unit.label) {
        parts.push('<text class="sk-label"' + attrs + ' x="' + r1(unit.x + unit.w / 2) + '" y="' + (y + h / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + tone.ink + '" font-size="10" font-family="system-ui, sans-serif" pointer-events="none">' + esc(unit.label) + "</text>");
      }
    });
  }

  function crumbBar(stack, labelOf, rootLabel) {
    if (!stack.length) return "";
    var html = '<p class="crumbs"><button type="button" data-crumb="0">' + esc(rootLabel) + "</button>";
    stack.forEach(function (step, i) {
      html += '<span aria-hidden="true"> / </span>';
      if (i < stack.length - 1) html += '<button type="button" data-crumb="' + (i + 1) + '">' + esc(labelOf(step)) + "</button>";
      else html += '<span class="crumb-here">' + esc(labelOf(step)) + "</span>";
    });
    return html + "</p>";
  }
  function boxesSpan(geom, ids) {
    var x0 = null;
    var x1 = null;
    ids.forEach(function (bi) {
      var box = geom[bi];
      if (!box || !(box.w > 0)) return;
      if (x0 == null || box.x < x0) x0 = box.x;
      var right = box.x + box.w;
      if (x1 == null || right > x1) x1 = right;
    });
    if (x0 == null) return null;
    return { x: x0, w: Math.max(x1 - x0, 0.4) };
  }
  function unionBoxes(nodes) {
    var x0 = null;
    var x1 = null;
    nodes.forEach(function (node) {
      if (!node || !(node.w > 0)) return;
      if (x0 == null || node.x < x0) x0 = node.x;
      var right = node.x + node.w;
      if (x1 == null || right > x1) x1 = right;
    });
    if (x0 == null) return null;
    return { x: x0, w: Math.max(x1 - x0, 0.4) };
  }
  function categoryRect(parts, spec) {
    var attrs = ' data-kind="' + esc(spec.kind) + '" data-id="' + esc(spec.id) + '" data-parent="1" data-tip="' + esc(spec.tip) + '"';
    if (spec.book != null && spec.book !== "") attrs += ' data-book="' + esc(spec.book) + '"';
    if (spec.chapter != null && spec.chapter !== "") attrs += ' data-chapter="' + esc(spec.chapter) + '"';
    if (spec.year) attrs += ' data-year="' + esc(spec.year) + '"';
    if (spec.season) attrs += ' data-season="' + esc(spec.season) + '"';
    if (spec.name) attrs += ' data-name="' + esc(spec.name) + '"';
    parts.push('<rect class="sk-node"' + attrs + ' x="' + r1(spec.x) + '" y="' + spec.y + '" width="' + r1(Math.max(spec.w, 0.4)) + '" height="' + spec.h + '" fill="' + spec.fill + '"/>');
    if (spec.label && spec.w > String(spec.label).length * 6.6) {
      parts.push('<text class="sk-label"' + attrs + ' x="' + r1(spec.x + spec.w / 2) + '" y="' + (spec.y + spec.h / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + spec.ink + '" font-size="12" font-weight="650" font-family="system-ui, sans-serif" pointer-events="none">' + esc(spec.label) + "</text>");
    }
  }

  function layoutArcs(arcs) {
    var lectGap = 0.05;
    var yearGap = 0.016;
    var seasonGap = 0.005;
    var total = 0;
    arcs.forEach(function (arc) { total += arc.w; });
    var gaps = lectGap;
    for (var i = 0; i < arcs.length - 1; i++) {
      var a = arcs[i];
      var b = arcs[i + 1];
      if (a.L !== b.L) gaps += lectGap;
      else if (a.y !== b.y) gaps += yearGap;
      else gaps += seasonGap;
    }
    var avail = Math.PI * 2 - gaps;
    var theta = -Math.PI / 2;
    arcs.forEach(function (arc, idx) {
      var span = total ? (arc.w / total) * avail : 0;
      arc.start = theta;
      arc.end = theta + span;
      arc.mid = theta + span / 2;
      theta += span;
      if (idx < arcs.length - 1) {
        var next = arcs[idx + 1];
        if (arc.L !== next.L) theta += lectGap;
        else if (arc.y !== next.y) theta += yearGap;
        else theta += seasonGap;
      }
    });
  }

  function layoutLinks(arcs, links) {
    var bins = arcs.map(function () { return []; });
    links.forEach(function (link, idx) {
      link.idx = idx;
      bins[link.a].push(link);
      bins[link.b].push(link);
    });
    arcs.forEach(function (arc, i) {
      var items = bins[i];
      var sum = 0;
      items.forEach(function (link) { sum += link.w; });
      var scale = sum > arc.w ? arc.w / sum : 1;
      items.sort(function (p, q) {
        var op = p.a === i ? p.b : p.a;
        var oq = q.a === i ? q.b : q.a;
        return arcs[op].mid - arcs[oq].mid;
      });
      var span = arc.end - arc.start;
      var used = 0;
      items.forEach(function (link) { used += (link.w * scale / arc.w) * span; });
      var cursor = arc.start + (span - used) / 2;
      items.forEach(function (link) {
        var ang = (link.w * scale / arc.w) * span;
        var slot = { start: cursor, end: cursor + ang };
        if (link.a === i) link.aSlot = slot;
        else link.bSlot = slot;
        cursor += ang;
      });
    });
  }

  function donut(cx, cy, inner, outer, a0, a1) {
    var large = a1 - a0 > Math.PI ? 1 : 0;
    var p0 = pt(cx, cy, outer, a0);
    var p1 = pt(cx, cy, outer, a1);
    var p2 = pt(cx, cy, inner, a1);
    var p3 = pt(cx, cy, inner, a0);
    return "M " + r1(p0[0]) + " " + r1(p0[1])
      + " A " + outer + " " + outer + " 0 " + large + " 1 " + r1(p1[0]) + " " + r1(p1[1])
      + " L " + r1(p2[0]) + " " + r1(p2[1])
      + " A " + inner + " " + inner + " 0 " + large + " 0 " + r1(p3[0]) + " " + r1(p3[1]) + " Z";
  }

  function ribbon(cx, cy, r, a0, a1, b0, b1) {
    var A0 = pt(cx, cy, r, a0);
    var A1 = pt(cx, cy, r, a1);
    var B0 = pt(cx, cy, r, b0);
    var B1 = pt(cx, cy, r, b1);
    var largeA = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    var largeB = Math.abs(b1 - b0) > Math.PI ? 1 : 0;
    return "M " + r1(A0[0]) + " " + r1(A0[1])
      + " A " + r + " " + r + " 0 " + largeA + " 1 " + r1(A1[0]) + " " + r1(A1[1])
      + " Q " + cx + " " + cy + " " + r1(B1[0]) + " " + r1(B1[1])
      + " A " + r + " " + r + " 0 " + largeB + " 0 " + r1(B0[0]) + " " + r1(B0[1])
      + " Q " + cx + " " + cy + " " + r1(A0[0]) + " " + r1(A0[1]) + " Z";
  }

  function anchorFor(ang) {
    var s = Math.sin(ang);
    if (Math.abs(s) < 0.2) return "middle";
    return s > 0 ? "start" : "end";
  }

  function drawChord() {
    var root = document.getElementById("chord-root");
    if (!root || !DATA) return;
    var arcs = DATA.arcs || [];
    var links = DATA.links || [];
    layoutArcs(arcs);
    layoutLinks(arcs, links);
    var cx = 540;
    var cy = 470;
    var rIn = 214;
    var rOut = 300;
    var parts = [];
    var maxW = 1;
    links.forEach(function (link) { if (link.w > maxW) maxW = link.w; });
    links.forEach(function (link) {
      if (!link.aSlot || !link.bSlot) return;
      var rest = 0.05 + 0.3 * Math.pow(link.w / maxW, 0.5);
      var tip = seasonName(arcs[link.a].s) + " · " + yearName(arcs[link.a].L, arcs[link.a].y)
        + " (" + lectName(arcs[link.a].L) + ") and "
        + seasonName(arcs[link.b].s) + " · " + yearName(arcs[link.b].L, arcs[link.b].y)
        + " (" + lectName(arcs[link.b].L) + ") share " + num(link.w) + " words";
      parts.push('<path class="ch-ribbon" data-kind="link" data-id="' + link.idx + '" data-tip="' + esc(tip) + '" style="--rest:' + rest.toFixed(3) + '" d="'
        + ribbon(cx, cy, rOut - 1, link.aSlot.start, link.aSlot.end, link.bSlot.start, link.bSlot.end) + '"/>');
    });
    arcs.forEach(function (arc, i) {
      var color = seasonColor(arc.s);
      var tip = lectName(arc.L) + " · " + yearName(arc.L, arc.y) + " · " + seasonName(arc.s) + " · " + num(arc.w) + " words appointed";
      parts.push('<path class="ch-arc" data-kind="arc" data-id="' + i + '" data-tip="' + esc(tip) + '" fill="' + color.fill + '" d="'
        + donut(cx, cy, rIn, rOut, arc.start, arc.end) + '"/>');
      var span = arc.end - arc.start;
      var label = span > 0.55 ? seasonName(arc.s) : SHORT[arc.s] || "";
      if (label && span > 0.09) {
        var mid = pt(cx, cy, (rIn + rOut) / 2, arc.mid);
        parts.push('<text data-kind="arc" data-id="' + i + '" data-tip="' + esc(tip) + '" x="' + r1(mid[0]) + '" y="' + r1(mid[1]) + '" text-anchor="middle" dominant-baseline="middle" fill="' + color.ink + '" font-size="' + (span > 0.55 ? 11 : 9) + '" font-family="system-ui, sans-serif" pointer-events="none">' + esc(label) + "</text>");
      }
    });
    var groups = [];
    arcs.forEach(function (arc, i) {
      var last = groups[groups.length - 1];
      if (!last || last.L !== arc.L) groups.push({ L: arc.L, start: arc.start, end: arc.end, years: [] });
      var group = groups[groups.length - 1];
      group.end = arc.end;
      var years = group.years;
      var year = years[years.length - 1];
      if (!year || year.y !== arc.y) years.push({ y: arc.y, start: arc.start, end: arc.end, i0: i });
      years[years.length - 1].end = arc.end;
    });
    groups.forEach(function (group) {
      parts.push('<path fill="' + lectTrack(group.L) + '" d="' + donut(cx, cy, rOut + 8, rOut + 16, group.start, group.end) + '" data-kind="lect" data-id="' + esc(group.L) + '" data-tip="' + esc(lectName(group.L)) + '"/>');
      var mid = group.start - 0.03;
      var pos = pt(cx, cy, rOut + 48, mid);
      parts.push('<text class="ch-label" data-kind="lect" data-id="' + esc(group.L) + '" data-tip="' + esc(lectName(group.L)) + '" x="' + r1(pos[0]) + '" y="' + r1(pos[1]) + '" text-anchor="' + anchorFor(mid) + '" dominant-baseline="middle" fill="' + ink() + '" font-size="13" font-weight="650" font-family="system-ui, sans-serif">' + esc(LECT_LABEL[group.L] || group.L) + "</text>");
      if (group.years.length < 2) return;
      group.years.forEach(function (year) {
        var ym = (year.start + year.end) / 2;
        var yp = pt(cx, cy, rOut + 34, ym);
        var name = yearName(group.L, year.y);
        parts.push('<text class="ch-label" data-kind="year" data-lect="' + esc(group.L) + '" data-id="' + esc(year.y) + '" data-tip="' + esc(lectName(group.L) + " · " + name) + '" x="' + r1(yp[0]) + '" y="' + r1(yp[1]) + '" text-anchor="' + anchorFor(ym) + '" dominant-baseline="middle" fill="' + muted() + '" font-size="11" font-family="system-ui, sans-serif">' + esc(name) + "</text>");
      });
    });
    var seen = {};
    var legend = [];
    arcs.forEach(function (arc) {
      if (seen[arc.s]) return;
      seen[arc.s] = true;
      var color = seasonColor(arc.s);
      legend.push('<span><i class="viz-swatch" style="background:' + color.fill + '"></i>' + esc(seasonName(arc.s)) + "</span>");
    });
    var note = "Revised Common Lectionary (Years A, B, and C), the Daily Office (Year One and Year Two), and the 1662 Sunday lectionary. Arc length is the scripture each season appoints. A band’s thickness is text those two seasons share. Click a season, a year, or a band to keep that correlation and dim the rest.";
    root.innerHTML = '<div class="viz-head"><div><h2>Where the lectionaries share a text</h2><p class="viz-note">' + note + '</p></div></div><div class="viz-legend">' + legend.join("") + '</div><p class="viz-read" data-rest="Hover a season or a band.">Hover a season or a band.</p><svg viewBox="0 0 1080 940" role="img" aria-label="Chord diagram of shared scripture among three lectionaries">' + parts.join("") + "</svg>";
    applyChordFocus();
  }

  function arcChosen(arc, pick) {
    if (!pick) return false;
    if (pick.kind === "arc") return String(arc.i) === String(pick.id);
    if (pick.kind === "lect") return arc.L === pick.id;
    if (pick.kind === "year") return arc.L === pick.lect && arc.y === pick.id;
    return false;
  }

  function applyChordFocus() {
    var root = document.getElementById("chord-root");
    if (!root || !DATA) return;
    var arcs = DATA.arcs || [];
    var links = DATA.links || [];
    arcs.forEach(function (arc, i) { arc.i = i; });
    var pick = chordFocus;
    var arcState = {};
    var linkState = {};
    if (pick) {
      if (pick.kind === "link") {
        var one = links[Number(pick.id)];
        if (one) {
          linkState[Number(pick.id)] = "on";
          arcState[one.a] = "on";
          arcState[one.b] = "on";
        }
      } else {
        arcs.forEach(function (arc, i) { if (arcChosen(arc, pick)) arcState[i] = "on"; });
        links.forEach(function (link, idx) {
          var aOn = arcState[link.a] === "on";
          var bOn = arcState[link.b] === "on";
          if (aOn || bOn) {
            linkState[idx] = "on";
            if (!aOn) arcState[link.a] = arcState[link.a] || "touch";
            if (!bOn) arcState[link.b] = arcState[link.b] || "touch";
          }
        });
      }
    }
    root.querySelectorAll(".ch-arc, .ch-ribbon, .ch-label, [data-kind='lect']").forEach(function (el) {
      var kind = el.getAttribute("data-kind");
      var state = "";
      if (pick) {
        if (kind === "arc") state = arcState[el.getAttribute("data-id")] || "off";
        else if (kind === "link") state = linkState[el.getAttribute("data-id")] || "off";
        else if (kind === "lect") {
          var id = el.getAttribute("data-id");
          var any = false;
          var self = pick.kind === "lect" && pick.id === id;
          arcs.forEach(function (arc, i) {
            if (arc.L === id && arcState[i] && arcState[i] !== "off") any = true;
          });
          state = self ? "on" : any ? "touch" : "off";
        } else if (kind === "year") {
          var lect = el.getAttribute("data-lect");
          var year = el.getAttribute("data-id");
          var selfYear = pick.kind === "year" && pick.lect === lect && pick.id === year;
          var touched = false;
          arcs.forEach(function (arc, i) {
            if (arc.L === lect && arc.y === year && arcState[i] && arcState[i] !== "off") touched = true;
          });
          state = selfYear ? "on" : touched ? "touch" : "off";
        }
        el.classList.toggle("is-on", state === "on");
        el.classList.toggle("is-touch", state === "touch");
        el.classList.toggle("is-off", state === "off");
      } else {
        el.classList.remove("is-on", "is-touch", "is-off");
      }
      if (kind === "link") {
        if (state === "on" && links[Number(el.getAttribute("data-id"))]) {
          var link = links[Number(el.getAttribute("data-id"))];
          var preferred = arcs[link.a];
          if (pick && pick.kind === "arc" && String(link.b) === String(pick.id)) preferred = arcs[link.b];
          else if (pick && pick.kind === "lect") preferred = arcs[link.a].L === pick.id ? arcs[link.a] : arcs[link.b];
          else if (pick && pick.kind === "year") {
            var aHit = arcs[link.a].L === pick.lect && arcs[link.a].y === pick.id;
            preferred = aHit ? arcs[link.a] : arcs[link.b];
          }
          el.style.fill = seasonColor(preferred.s).fill;
        } else el.style.fill = "";
      }
    });
    var firstArc = root.querySelector(".ch-arc");
    if (firstArc) {
      root.querySelectorAll(".ch-ribbon.is-on").forEach(function (el) { firstArc.before(el); });
    }
  }

  function layoutBible(bookIds, sectioned, span) {
    var width = span || 1680;
    var pad = 28;
    var books = DATA.books;
    var total = 0;
    bookIds.forEach(function (bi) { total += books[bi].words; });
    var groups = [];
    if (sectioned) {
      DATA.sections.forEach(function (sec) {
        var ids = sec.books.filter(function (bi) { return bookIds.indexOf(bi) !== -1; });
        if (ids.length) groups.push({ sec: sec, ids: ids });
      });
    } else if (bookIds.length) {
      groups.push({ sec: null, ids: bookIds.slice() });
    }
    var sectionGap = sectioned ? 16 : 0;
    var bookGap = sectioned ? (grain === "section" ? 0 : 2) : (bookIds.length > 1 ? 2 : 0);
    var innerGaps = 0;
    groups.forEach(function (g) { innerGaps += Math.max(0, g.ids.length - 1) * bookGap; });
    var secGaps = Math.max(0, groups.length - 1) * sectionGap;
    var px = total ? (width - pad * 2 - secGaps - innerGaps) / total : 0;
    var x = pad;
    var bookGeom = new Array(books.length);
    var secGeom = [];
    groups.forEach(function (g, gi) {
      var start = x;
      g.ids.forEach(function (bi, j) {
        var w = books[bi].words * px;
        bookGeom[bi] = { x: x, w: w };
        x += w;
        if (j < g.ids.length - 1) x += bookGap;
      });
      if (g.sec) secGeom.push({ id: g.sec.id, name: g.sec.name, x: start, w: x - start });
      if (gi < groups.length - 1) x += sectionGap;
    });
    return { width: width, pad: pad, px: px, right: x, bookGeom: bookGeom, secGeom: secGeom };
  }

  function ribbonWidth(item, px) {
    return item.sw != null ? item.sw : item.p.w * px;
  }

  function layoutLect(px, pad, right, items) {
    var years = [];
    items.forEach(function (item) {
      if (years.indexOf(item.p.y) === -1) years.push(item.p.y);
    });
    years.sort();
    var groups = years.map(function (year) {
      var days = [];
      var map = {};
      items.forEach(function (item) {
        var p = item.p;
        if (p.y !== year) return;
        if (!map[p.i]) {
          map[p.i] = { i: p.i, s: p.s, n: p.n, items: [] };
          days.push(map[p.i]);
        }
        map[p.i].items.push(item);
      });
      days.sort(function (a, b) { return a.i - b.i; });
      days.forEach(function (day) {
        day.items.sort(function (a, b) { return a.p.b - b.p.b || a.p.o - b.p.o; });
      });
      return { y: year, days: days };
    });
    var seasonBreaks = 0;
    var dayBreaks = 0;
    var ribbonW = 0;
    items.forEach(function (item) { ribbonW += ribbonWidth(item, px); });
    groups.forEach(function (group) {
      group.days.forEach(function (day, idx) {
        if (!idx) return;
        if (day.s !== group.days[idx - 1].s) seasonBreaks += 1;
        else dayBreaks += 1;
      });
    });
    var cycleBreaks = Math.max(0, groups.length - 1);
    var baseDay = 1.4;
    var baseSeason = 12;
    var baseCycle = 36;
    var side = 8;
    var avail = right - pad;
    var base = ribbonW + cycleBreaks * baseCycle + seasonBreaks * baseSeason + dayBreaks * baseDay + side * 2;
    var extra = Math.max(0, avail - base);
    var dayG = baseDay;
    var seasonG = baseSeason + (seasonBreaks ? extra * 0.4 / seasonBreaks : 0);
    var cycleG = baseCycle + (cycleBreaks ? extra * 0.5 / cycleBreaks : 0);
    var sideG = side + extra * 0.1 / 2;
    var x = pad + sideG;
    var placed = [];
    var cycles = [];
    groups.forEach(function (group, gi) {
      var cStart = x;
      var seasons = [];
      var sStart = x;
      var sName = group.days.length ? group.days[0].s : "";
      group.days.forEach(function (day, idx) {
        if (idx) {
          if (day.s !== group.days[idx - 1].s) {
            seasons.push({ s: sName, y: group.y, x: sStart, w: x - sStart });
            x += seasonG;
            sStart = x;
            sName = day.s;
          } else x += dayG;
        }
        day.items.forEach(function (item) {
          var w = ribbonWidth(item, px);
          placed.push({ p: item.p, idx: item.idx, x: x, w: w, sx: item.sx, sw: item.sw });
          x += w;
        });
      });
      if (group.days.length) seasons.push({ s: sName, y: group.y, x: sStart, w: x - sStart });
      cycles.push({ y: group.y, x: cStart, w: x - cStart, seasons: seasons });
      if (gi < groups.length - 1) x += cycleG;
    });
    return { placed: placed, cycles: cycles, days: [], readings: [] };
  }

  function layoutStops(px, pad, right, groups) {
    var ribbonW = 0;
    groups.forEach(function (g) {
      g.items.forEach(function (item) { ribbonW += ribbonWidth(item, px); });
    });
    var gaps = Math.max(0, groups.length - 1);
    var baseGap = 14;
    var side = 8;
    var avail = Math.max(0, right - pad);
    var extra = Math.max(0, avail - ribbonW - gaps * baseGap - side * 2);
    var gap = baseGap + (gaps ? extra * 0.85 / gaps : 0);
    var sideG = side + extra * 0.15 / 2;
    var x = pad + sideG;
    var placed = [];
    var nodes = [];
    groups.forEach(function (g, idx) {
      if (idx) x += gap;
      var start = x;
      g.items.forEach(function (item) {
        var w = Math.max(ribbonWidth(item, px), 0);
        placed.push({ p: item.p, idx: item.idx, x: x, w: w, sx: item.sx, sw: item.sw });
        x += w;
      });
      nodes.push(Object.assign({}, g.node, { x: start, w: Math.max(0, x - start) }));
    });
    return { placed: placed, nodes: nodes };
  }

  function layoutDays(px, pad, right, items) {
    var map = {};
    var groups = [];
    items.forEach(function (item) {
      var key = String(item.p.i);
      if (!map[key]) {
        map[key] = {
          items: [],
          node: { i: item.p.i, n: item.p.n, s: item.p.s, y: item.p.y }
        };
        groups.push(map[key]);
      }
      map[key].items.push(item);
    });
    groups.sort(function (a, b) { return a.node.i - b.node.i; });
    groups.forEach(function (g) {
      g.items.sort(function (a, b) { return a.p.b - b.p.b || a.p.o - b.p.o; });
    });
    var spread = layoutStops(px, pad, right, groups);
    return { placed: spread.placed, cycles: [], days: spread.nodes, readings: [] };
  }

  function layoutReadings(px, pad, right, items) {
    var ordered = items.slice().sort(function (a, b) { return a.p.b - b.p.b || a.p.o - b.p.o; });
    var groups = ordered.map(function (item) {
      return { items: [item], node: { idx: item.idx, b: item.p.b, s: item.p.s, y: item.p.y, i: item.p.i, n: item.p.n } };
    });
    var spread = layoutStops(px, pad, right, groups);
    return { placed: spread.placed, cycles: [], days: [], readings: spread.nodes };
  }

  function layoutPacked(items) {
    var width = 1680;
    var pad = 28;
    var groups = [];
    var map = {};
    items.forEach(function (item) {
      var key = item.p.b;
      if (!map[key]) {
        map[key] = { b: key, items: [] };
        groups.push(map[key]);
      }
      map[key].items.push(item);
    });
    groups.forEach(function (group) {
      group.items.sort(function (a, b) { return a.p.o - b.p.o || a.idx - b.idx; });
    });
    var total = 0;
    items.forEach(function (item) { total += item.p.w; });
    var bookGap = groups.length > 1 ? 10 : 0;
    var px = total ? (width - pad * 2 - Math.max(0, groups.length - 1) * bookGap) / total : 0;
    var x = pad;
    var bookGeom = [];
    groups.forEach(function (group, gi) {
      var start = x;
      group.items.forEach(function (item) {
        item.sx = x;
        item.sw = item.p.w * px;
        x += item.sw;
      });
      bookGeom[group.b] = { x: start, w: x - start };
      if (gi < groups.length - 1) x += bookGap;
    });
    return { width: width, pad: pad, px: px, right: x, bookGeom: bookGeom, secGeom: [], packed: true };
  }

  function band(x0, y0, x1, y1, w) {
    var dy = (y1 - y0) * 0.46;
    return "M " + r1(x0) + " " + r1(y0)
      + " C " + r1(x0) + " " + r1(y0 + dy) + " " + r1(x1) + " " + r1(y1 - dy) + " " + r1(x1) + " " + r1(y1)
      + " L " + r1(x1 + w) + " " + r1(y1)
      + " C " + r1(x1 + w) + " " + r1(y1 - dy) + " " + r1(x0 + w) + " " + r1(y0 + dy) + " " + r1(x0 + w) + " " + r1(y0) + " Z";
  }

  function centerline(x0, y0, x1, y1) {
    var dy = (y1 - y0) * 0.46;
    return "M " + r1(x0) + " " + r1(y0) + " C " + r1(x0) + " " + r1(y0 + dy) + " " + r1(x1) + " " + r1(y1 - dy) + " " + r1(x1) + " " + r1(y1);
  }

  var SANS = "system-ui, sans-serif";
  var SERIF = '"Iowan Old Style", Palatino, Georgia, serif';
  var BOOK_FORMS = {
    Genesis: ["Genesis"], Exodus: ["Exodus"], Leviticus: ["Leviticus", "Lev."], Numbers: ["Numbers"],
    Deuteronomy: ["Deuteronomy", "Deut."], Joshua: ["Joshua", "Josh.", "Josh"], Judges: ["Judges", "Judg.", "Judg"],
    Ruth: ["Ruth"], "1 Samuel": ["1 Samuel", "1 Sam.", "1 Sam"], "2 Samuel": ["2 Samuel", "2 Sam.", "2 Sam"],
    "1 Kings": ["1 Kings", "1 Kgs"], "2 Kings": ["2 Kings", "2 Kgs"],
    "1 Chronicles": ["1 Chronicles", "1 Chron.", "1 Chr."], "2 Chronicles": ["2 Chronicles", "2 Chron.", "2 Chr."],
    Ezra: ["Ezra"], Nehemiah: ["Nehemiah", "Neh."], Esther: ["Esther", "Esth."],
    Job: ["Job"], Psalms: ["Psalms"], Proverbs: ["Proverbs", "Prov."], Ecclesiastes: ["Ecclesiastes", "Eccl."],
    "Song of Solomon": ["Song of Solomon", "Song"],
    Isaiah: ["Isaiah"], Jeremiah: ["Jeremiah"], Lamentations: ["Lamentations", "Lam."],
    Ezekiel: ["Ezekiel"], Daniel: ["Daniel", "Dan.", "Dan"],
    Hosea: ["Hosea", "Hos."], Joel: ["Joel"], Amos: ["Amos"], Obadiah: ["Obadiah", "Obad."],
    Jonah: ["Jonah"], Micah: ["Micah", "Mic."], Nahum: ["Nahum", "Nah."], Habakkuk: ["Habakkuk", "Hab."],
    Zephaniah: ["Zephaniah", "Zeph."], Haggai: ["Haggai", "Hag."], Zechariah: ["Zechariah", "Zech."],
    Malachi: ["Malachi", "Mal."], Matthew: ["Matthew", "Matt."], Mark: ["Mark", "Mk"], Luke: ["Luke"],
    John: ["John", "Jn"], Acts: ["Acts"], Romans: ["Romans", "Rom."],
    "1 Corinthians": ["1 Corinthians", "1 Cor."], "2 Corinthians": ["2 Corinthians", "2 Cor."],
    Galatians: ["Galatians", "Gal."], Ephesians: ["Ephesians", "Eph."], Philippians: ["Philippians", "Phil."],
    Colossians: ["Colossians", "Col."], "1 Thessalonians": ["1 Thessalonians", "1 Thess.", "1 Th."],
    "2 Thessalonians": ["2 Thessalonians", "2 Thess.", "2 Th."], "1 Timothy": ["1 Timothy", "1 Tim."],
    "2 Timothy": ["2 Timothy", "2 Tim."], Titus: ["Titus", "Tit."], Philemon: ["Philemon", "Phlm."],
    Hebrews: ["Hebrews", "Heb."], James: ["James", "Jas."], "1 Peter": ["1 Peter", "1 Pet."],
    "2 Peter": ["2 Peter", "2 Pet."], "1 John": ["1 John", "1 Jn"], "2 John": ["2 John", "2 Jn"],
    "3 John": ["3 John", "3 Jn"], Jude: ["Jude"], Revelation: ["Revelation", "Rev."]
  };
  var SECTION_FORMS = {
    law: [["Law"]],
    history: [["History"]],
    wisdom: [["Wisdom"]],
    major: [["Major Prophets"]],
    minor: [["Minor Prophets"], ["Min. Proph."]],
    gospels: [["Gospels"]],
    acts: [["Church History"], ["Church", "History"], ["Ch. Hist."]],
    paul: [["Pauline letters"], ["Pauline Epist."]],
    general: [["General letters"], ["Gen. Epistles"], ["Gen. Ep."]],
    revelation: [["Prophecy"], ["Proph."], ["Pr."]]
  };

  function glyphWidth(ch, size) {
    if (ch === " ") return size * 0.34;
    if (ch === "." || ch === "," || ch === "'" || ch === "’") return size * 0.28;
    if ("ilIj1!".indexOf(ch) !== -1) return size * 0.32;
    if (ch === "m" || ch === "w") return size * 0.86;
    if (ch === "M" || ch === "W") return size * 0.92;
    if (ch >= "A" && ch <= "Z") return size * 0.7;
    if (ch >= "0" && ch <= "9") return size * 0.58;
    return size * 0.56;
  }
  function textWidth(text, size) {
    var w = 0;
    for (var i = 0; i < text.length; i++) w += glyphWidth(text.charAt(i), size);
    return w;
  }
  function bookLabel(name, width, height) {
    var forms = BOOK_FORMS[name] || [name];
    var sizes = [12, 11, 10];
    var limit = width - 2;
    var s, i, size, form;
    for (s = 0; s < sizes.length; s++) {
      size = sizes[s];
      if (size > height - 8) continue;
      for (i = 0; i < forms.length; i++) {
        form = forms[i];
        if (textWidth(form, size) <= limit) return { text: form, size: size, vertical: false };
      }
    }
    var shortForm = forms[forms.length - 1];
    var vSize = Math.min(11, width - 1);
    if (vSize < 6) return null;
    var need = textWidth(shortForm, vSize);
    var limitH = height - 4;
    if (need > limitH) vSize = vSize * limitH / need;
    if (vSize < 6) return null;
    return { text: shortForm, size: Math.round(vSize * 10) / 10, vertical: true };
  }
  function sectionLabel(sec, width, height) {
    var options = SECTION_FORMS[sec.id] || [[sec.name]];
    var sizes = [16, 15, 14, 13, 12, 11, 10];
    var limit = Math.max(0, width - 2);
    var s, o, lines, size, n, fit;
    for (s = 0; s < sizes.length; s++) {
      size = sizes[s];
      for (o = 0; o < options.length; o++) {
        lines = options[o];
        if (lines.length * size * 1.15 > height - 4) continue;
        fit = true;
        for (n = 0; n < lines.length; n++) {
          if (textWidth(lines[n], size) > limit) fit = false;
        }
        if (fit) return { lines: lines, size: size };
      }
    }
    return null;
  }
  function sectionText(sec, x, y, w, h, tip) {
    var fit = sectionLabel(sec, w, h);
    if (!fit) return "";
    var cx = r1(x + w / 2);
    var cy = r1(y + h / 2);
    var attrs = ' class="sk-label" data-kind="section" data-id="' + esc(sec.id) + '" data-tip="' + esc(tip) + '" text-anchor="middle" fill="' + sourceBar().ink + '" font-size="' + fit.size + '" font-style="italic" font-family="' + SERIF + '" pointer-events="none"';
    if (fit.lines.length === 1) {
      return '<text' + attrs + ' x="' + cx + '" y="' + cy + '" dominant-baseline="middle">' + esc(fit.lines[0]) + "</text>";
    }
    var lineH = fit.size * 1.12;
    var y0 = r1(cy - lineH * (fit.lines.length - 1) / 2);
    var out = '<text' + attrs + ' x="' + cx + '" y="' + y0 + '" dominant-baseline="middle">';
    fit.lines.forEach(function (line, idx) {
      out += '<tspan x="' + cx + '"' + (idx ? ' dy="' + r1(lineH) + '"' : "") + ">" + esc(line) + "</tspan>";
    });
    return out + "</text>";
  }
  function bookText(book, bi, box, y, h, tip) {
    var fit = bookLabel(book.name, box.w, h);
    if (!fit) return "";
    var cx = r1(box.x + box.w / 2);
    var cy = r1(y + h / 2);
    var turn = fit.vertical ? ' transform="rotate(-90 ' + cx + " " + cy + ')"' : "";
    return '<text class="sk-label" data-kind="book" data-id="' + bi + '" data-section="' + esc(book.section) + '" data-tip="' + esc(tip) + '" text-anchor="middle" dominant-baseline="middle" fill="' + sourceBar().ink + '" font-size="' + fit.size + '" font-family="' + SANS + '" pointer-events="none"' + turn + ' x="' + cx + '" y="' + cy + '">' + esc(fit.text) + "</text>";
  }

  function drawSankey() {
    var root = document.getElementById("sankey-root");
    if (!root || !DATA) return;
    var depth = bibleLeaf();
    var leaf = lectLeaf();
    var items = visiblePassages();
    var mode = leaf && leaf.kind === "day" ? "readings" : leaf && leaf.kind === "season" ? "days" : "seasons";
    var pack = mode === "days" || mode === "readings";
    var barMode = bibleBarMode(depth, pack);
    var ids = bookIdsInDrill();
    var units = null;
    if (!pack && barMode === "canon" && leaf && leaf.kind === "cycle") {
      var usedBook = {};
      items.forEach(function (item) { usedBook[item.p.b] = true; });
      ids = ids.filter(function (id) { return usedBook[id]; });
    }
    var geo;
    if (pack) geo = layoutPacked(items);
    else if (barMode === "chapters") {
      units = layoutChapters(Number(depth.id));
      items.forEach(function (item) {
        var span = spanInSlices(units, item.p.o, item.p.w);
        if (span) { item.sx = span.sx; item.sw = span.sw; }
      });
      geo = geoFromUnits(units, Number(depth.id));
    } else if (barMode === "verses") {
      units = layoutVerses(Number(depth.book), Number(depth.id));
      items.forEach(function (item) {
        var span = spanInSlices(units, item.p.o, item.p.w);
        if (span) { item.sx = span.sx; item.sw = span.sw; }
      });
      geo = geoFromUnits(units, Number(depth.book));
    } else geo = layoutBible(ids, !depth);
    var lect = mode === "days" ? layoutDays(geo.px, geo.pad, geo.right, items)
      : mode === "readings" ? layoutReadings(geo.px, geo.pad, geo.right, items)
      : layoutLect(geo.px, geo.pad, geo.right, items);
    var showSection = barMode === "canon" && !pack && !depth && grain !== "book";
    var showBook = barMode === "canon" && (pack || !!depth || grain !== "section");
    var bibleParent = null;
    if (depth && depth.kind === "section" && barMode === "canon") bibleParent = "section";
    else if (depth && depth.kind === "book" && barMode === "chapters") bibleParent = "book";
    else if (depth && depth.kind === "chapter" && (barMode === "verses" || barMode === "canon")) bibleParent = "chapter";
    var ySec = 12;
    var hSec = 30;
    var hParent = 30;
    var yBook = (showSection || bibleParent) ? 48 : 14;
    var hBook = 36;
    var barBottom = (barMode !== "canon" || showBook) ? (yBook + hBook) : (ySec + hSec);
    var y0 = barBottom + 8;
    var y1 = 608;
    var hLect = 26;
    var parts = [];
    var bar = sourceBar();
    var plotSpan = { x: geo.pad || 28, w: Math.max((geo.right || 1652) - (geo.pad || 28), 80) };
    if (bibleParent === "section") {
      var parentSec = sectionById(depth.id);
      var secSpan = boxesSpan(geo.bookGeom, ids) || plotSpan;
      if (parentSec) {
        var secWords = 0;
        DATA.books.forEach(function (b) { if (b.section === parentSec.id) secWords += b.words; });
        categoryRect(parts, {
          kind: "section", id: parentSec.id,
          tip: parentSec.name + " · " + num(secWords) + " words",
          x: secSpan.x, y: ySec, w: secSpan.w, h: hParent,
          fill: bar.fill, ink: bar.ink, label: parentSec.name
        });
      }
    } else if (bibleParent === "book") {
      var parentBi = Number(depth.id);
      var parentBook = DATA.books[parentBi];
      var parentBox = geo.bookGeom[parentBi] || plotSpan;
      if (parentBook) {
        categoryRect(parts, {
          kind: "book", id: parentBi,
          tip: parentBook.name + " · " + num(parentBook.words) + " words",
          x: parentBox.x, y: ySec, w: parentBox.w, h: hParent,
          fill: bar.fill, ink: bar.ink, label: parentBook.name
        });
      }
    } else if (bibleParent === "chapter") {
      var chapterBi = Number(depth.book);
      var chapterBox = geo.bookGeom[chapterBi] || plotSpan;
      var chapterLabel = depth.name || unitName(chapterBi, Number(depth.id));
      categoryRect(parts, {
        kind: "chapter", id: depth.id, book: chapterBi, name: chapterLabel, tip: chapterLabel,
        x: chapterBox.x, y: ySec, w: chapterBox.w, h: hParent,
        fill: bar.fill, ink: bar.ink, label: chapterLabel
      });
    }
    if (showSection) {
      geo.secGeom.forEach(function (sec) {
        var words = 0;
        DATA.books.forEach(function (b) { if (b.section === sec.id) words += b.words; });
        var tip = sec.name + " · " + num(words) + " words";
        parts.push('<rect class="sk-node" data-kind="section" data-id="' + esc(sec.id) + '" data-tip="' + esc(tip) + '" x="' + r1(sec.x) + '" y="' + ySec + '" width="' + r1(sec.w) + '" height="' + hSec + '" fill="' + bar.fill + '"/>');
        parts.push(sectionText(sec, sec.x, ySec, sec.w, hSec, tip));
      });
    }
    if (showBook) {
      ids.forEach(function (bi) {
        var book = DATA.books[bi];
        var box = geo.bookGeom[bi];
        if (!box) return;
        var tip = book.name + " · " + num(book.words) + " words";
        var bookParent = depth && depth.kind === "book" && barMode === "canon" && String(depth.id) === String(bi) ? ' data-parent="1"' : "";
        parts.push('<rect class="sk-node" data-kind="book" data-id="' + bi + '" data-section="' + esc(book.section) + '" data-tip="' + esc(tip) + '"' + bookParent + ' x="' + r1(box.x) + '" y="' + yBook + '" width="' + r1(Math.max(box.w, 0.4)) + '" height="' + hBook + '" fill="' + bar.fill + '"/>');
        parts.push(bookText(book, bi, box, yBook, hBook, tip));
      });
    }
    if (units) drawUnits(parts, units, yBook, hBook);
    var overview = !sankeyDrill.length;
    var sheet = overview ? {} : null;
    var threads = overview && !sankeyTrue ? {} : null;
    var threadScale = 1040 / 1680;
    if (threads) {
      var threadRoot = document.getElementById("sankey-root");
      if (threadRoot && threadRoot.clientWidth) threadScale = threadRoot.clientWidth / 1680;
    }
    lect.placed.forEach(function (item) {
      var p = item.p;
      var book = DATA.books[p.b];
      var box = geo.bookGeom[p.b];
      if (!book || !box) return;
      if (barMode !== "canon" && item.sx == null) return;
      var sw = item.sw != null ? item.sw : Math.max(item.w, 0);
      var sx = item.sx != null ? item.sx : box.x + (book.words ? (p.o / book.words) * box.w : 0);
      if (item.sx == null) {
        if (sx < box.x) sx = box.x;
        if (sx + sw > box.x + box.w) sx = Math.max(box.x, box.x + box.w - sw);
      }
      var color = seasonColor(p.s);
      var yStart = barBottom;
      if (overview) {
        var list = sheet[color.fill] || (sheet[color.fill] = []);
        list.push(band(sx, yStart, item.x, y1, sw));
        if (threads && sw * threadScale < OVERVIEW_THREAD) {
          var line = threads[color.fill] || (threads[color.fill] = []);
          line.push(centerline(sx + sw / 2, yStart, item.x + sw / 2, y1));
        }
        return;
      }
      var tip = citation(p) + " · Year " + p.y + " · " + p.n + " · " + seasonName(p.s) + ". " + nextKept(p);
      parts.push('<g class="sk-ribbon" data-kind="ribbon" data-idx="' + item.idx + '" data-id="' + item.idx + '" data-book="' + p.b + '" data-section="' + esc(book.section) + '" data-year="' + esc(p.y) + '" data-season="' + esc(p.s) + '" data-day="' + esc(p.i) + '" data-tip="' + esc(tip) + '">'
        + '<path fill="' + color.fill + '" style="pointer-events:none" d="' + band(sx, yStart, item.x, y1, sw) + '"/>'
        + '<path class="sk-hit" stroke-width="' + r1(Math.max(sw, 8)) + '" d="' + centerline(sx + sw / 2, y0, item.x + sw / 2, y1) + '"/>'
        + "</g>");
    });
    if (overview) {
      var painted = ['<g class="sk-sheet">'];
      Object.keys(sheet).forEach(function (fill) {
        painted.push('<path fill="' + fill + '" d="' + sheet[fill].join("") + '"/>');
        if (threads && threads[fill]) {
          painted.push('<path class="sk-thread" fill="none" stroke="' + fill + '" stroke-width="' + OVERVIEW_THREAD + '" vector-effect="non-scaling-stroke" stroke-linecap="butt" d="' + threads[fill].join("") + '"/>');
        }
      });
      painted.push("</g>");
      parts.push(painted.join(""));
    }
    if (!items.length && sankeyDrill.length) {
      parts.push('<text x="840" y="340" text-anchor="middle" fill="' + muted() + '" font-size="14" font-family="system-ui, sans-serif">Nothing in this selection is appointed in the Revised Common Lectionary.</text>');
    }
    lect.cycles.forEach(function (cycle) {
      cycle.seasons.forEach(function (season) {
        if (season.w <= 0) return;
        var color = seasonColor(season.s);
        var tip = "Year " + season.y + " · " + seasonName(season.s);
        parts.push('<rect class="sk-node" data-kind="season" data-id="' + esc(season.s) + '" data-year="' + esc(season.y) + '" data-tip="' + esc(tip) + '" x="' + r1(season.x) + '" y="' + y1 + '" width="' + r1(season.w) + '" height="' + hLect + '" fill="' + color.fill + '"/>');
        var label = season.w > 46 ? seasonName(season.s) : (season.w > 18 ? (SHORT[season.s] || "") : "");
        if (label) {
          parts.push('<text class="sk-label" data-kind="season" data-id="' + esc(season.s) + '" data-year="' + esc(season.y) + '" data-tip="' + esc(tip) + '" x="' + r1(season.x + season.w / 2) + '" y="' + (y1 + hLect / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + color.ink + '" font-size="10" font-family="system-ui, sans-serif" pointer-events="none">' + esc(label) + "</text>");
        }
      });
      var name = "Year " + cycle.y;
      var yYear = y1 + hLect + 8;
      var hYear = 22;
      var yearTip = "Revised Common Lectionary · " + name;
      var yearParent = leaf && leaf.kind === "cycle" && String(leaf.id) === String(cycle.y) ? ' data-parent="1"' : "";
      parts.push('<rect class="sk-node" data-kind="cycle" data-id="' + esc(cycle.y) + '" data-tip="' + esc(yearTip) + '"' + yearParent + ' x="' + r1(cycle.x) + '" y="' + yYear + '" width="' + r1(Math.max(cycle.w, 0.4)) + '" height="' + hYear + '" fill="' + bar.fill + '"/>');
      if (cycle.w > name.length * 7.2) {
        parts.push('<text class="sk-label" data-kind="cycle" data-id="' + esc(cycle.y) + '" data-tip="' + esc(yearTip) + '" x="' + r1(cycle.x + cycle.w / 2) + '" y="' + (yYear + hYear / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + bar.ink + '" font-size="12" font-weight="650" font-family="system-ui, sans-serif" pointer-events="none">' + esc(name) + "</text>");
      }
    });
    lect.days.forEach(function (day) {
      if (day.w <= 0) return;
      var color = seasonColor(day.s);
      var tip = "Year " + day.y + " · " + seasonName(day.s) + " · " + day.n;
      var label = day.w > day.n.length * 6.4 ? day.n : "";
      parts.push('<rect class="sk-node" data-kind="day" data-id="' + esc(day.i) + '" data-year="' + esc(day.y) + '" data-season="' + esc(day.s) + '" data-name="' + esc(day.n) + '" data-tip="' + esc(tip) + '" x="' + r1(day.x) + '" y="' + y1 + '" width="' + r1(day.w) + '" height="' + hLect + '" fill="' + color.fill + '"/>');
      if (label) {
        parts.push('<text class="sk-label" data-kind="day" data-id="' + esc(day.i) + '" data-year="' + esc(day.y) + '" data-season="' + esc(day.s) + '" data-name="' + esc(day.n) + '" data-tip="' + esc(tip) + '" x="' + r1(day.x + day.w / 2) + '" y="' + (y1 + hLect / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + color.ink + '" font-size="10" font-family="system-ui, sans-serif" pointer-events="none">' + esc(label) + "</text>");
      }
    });
    lect.readings.forEach(function (reading) {
      if (reading.w <= 0) return;
      var book = DATA.books[reading.b];
      var color = seasonColor(reading.s);
      var cited = DATA.passages[reading.idx] ? citation(DATA.passages[reading.idx]) : book.name;
      var tip = cited + " · Year " + reading.y + " · " + (reading.n ? reading.n + " · " : "") + seasonName(reading.s) + ". " + nextKept(reading);
      parts.push('<rect class="sk-node" data-kind="reading" data-id="' + reading.idx + '" data-book="' + reading.b + '" data-year="' + esc(reading.y) + '" data-season="' + esc(reading.s) + '" data-day="' + esc(reading.i) + '" data-tip="' + esc(tip) + '" x="' + r1(reading.x) + '" y="' + y1 + '" width="' + r1(reading.w) + '" height="' + hLect + '" fill="' + color.fill + '"/>');
      if (reading.w > book.name.length * 6.2) {
        parts.push('<text class="sk-label" data-kind="reading" data-id="' + reading.idx + '" data-book="' + reading.b + '" data-year="' + esc(reading.y) + '" data-season="' + esc(reading.s) + '" data-day="' + esc(reading.i) + '" data-tip="' + esc(tip) + '" x="' + r1(reading.x + reading.w / 2) + '" y="' + (y1 + hLect / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" fill="' + color.ink + '" font-size="10" font-family="system-ui, sans-serif" pointer-events="none">' + esc(book.name) + "</text>");
      }
    });
    if (leaf && leaf.kind === "season") {
      var seasonSpan = unionBoxes(lect.days) || plotSpan;
      var seasonTone = seasonColor(leaf.id);
      var seasonTip = "Year " + leaf.year + " · " + seasonName(leaf.id);
      var seasonLabel = seasonSpan.w > 46 ? seasonName(leaf.id) : (SHORT[leaf.id] || "");
      categoryRect(parts, {
        kind: "season", id: leaf.id, year: leaf.year, tip: seasonTip,
        x: seasonSpan.x, y: y1 + hLect + 8, w: seasonSpan.w, h: hParent,
        fill: seasonTone.fill, ink: seasonTone.ink, label: seasonLabel
      });
    }
    if (leaf && leaf.kind === "day") {
      var daySpan = unionBoxes(lect.readings) || plotSpan;
      var dayTone = seasonColor(leaf.season);
      var dayTip = "Year " + leaf.year + " · " + seasonName(leaf.season) + " · " + (leaf.name || "Day");
      categoryRect(parts, {
        kind: "day", id: leaf.id, year: leaf.year, season: leaf.season, name: leaf.name || "", tip: dayTip,
        x: daySpan.x, y: y1 + hLect + 8, w: daySpan.w, h: hParent,
        fill: dayTone.fill, ink: dayTone.ink, label: leaf.name || "Day"
      });
    }
    var rest = sankeyDrill.length
      ? "Hover a category or a band. Click a band to hold it. Click a category to open it. Click it again to return. Reset returns to the top."
      : (sankeyTrue
        ? "Hover a category. Click a category to open it. Bands can be selected once a category is open. Width matches the length of each reading."
        : "Hover a category. Click a category to open it. Bands can be selected once a category is open. Line width is exaggerated so thin bands stay visible.");
    var headBtn = sankeyDrill.length
      ? '<button type="button" class="context-add" id="sankey-reset">Reset</button>'
      : '<button type="button" class="context-add" id="sankey-truth" aria-pressed="' + (sankeyTrue ? "false" : "true") + '">' + (sankeyTrue ? "Exaggerate Line Width for Clarity" : "Show True Resolution") + "</button>";
    root.innerHTML = '<div class="viz-head"><div><h2>Search the Lectionary by the Bible</h2>' + crumbBar(sankeyDrill, sankeyStepLabel, "Canon") + "</div>" + headBtn + '</div><div class="viz-read-row"><p class="viz-read" data-rest="' + esc(rest) + '">' + esc(rest) + '</p><button type="button" class="context-add" id="sankey-context" hidden>Add filter</button></div><svg viewBox="0 0 1680 690" role="img" aria-label="Search the Lectionary by the Bible">' + parts.join("") + "</svg>";
    applySankeyFocus();
    if (sankeyLatch) {
      var held = root.querySelector('.sk-ribbon[data-id="' + sankeyLatch.id + '"]');
      if (!held) {
        sankeyLatch = null;
        if (sankeyFocus && sankeyFocus.kind === "ribbon") sankeyFocus = null;
        applySankeyFocus();
      } else {
        var heldRead = root.querySelector(".viz-read");
        if (heldRead) heldRead.textContent = held.getAttribute("data-tip") || heldRead.getAttribute("data-rest");
      }
    }
    syncSankeyContext();
    drawDownSankey();
  }

  function bandAcross(x0, y0, x1, y1, h) {
    var dx = (x1 - x0) * 0.46;
    return "M " + r1(x0) + " " + r1(y0)
      + " C " + r1(x0 + dx) + " " + r1(y0) + " " + r1(x1 - dx) + " " + r1(y1) + " " + r1(x1) + " " + r1(y1)
      + " L " + r1(x1) + " " + r1(y1 + h)
      + " C " + r1(x1 - dx) + " " + r1(y1 + h) + " " + r1(x0 + dx) + " " + r1(y0 + h) + " " + r1(x0) + " " + r1(y0 + h) + " Z";
  }

  function lineAcross(x0, y0, x1, y1) {
    var dx = (x1 - x0) * 0.46;
    return "M " + r1(x0) + " " + r1(y0) + " C " + r1(x0 + dx) + " " + r1(y0) + " " + r1(x1 - dx) + " " + r1(y1) + " " + r1(x1) + " " + r1(y1);
  }

  function drawDownSankey() {
    var root = document.getElementById("sankey-down-root");
    if (!root || !DATA) return;
    var kept = 0;
    var scroller = root.querySelector(".sk-scroll");
    if (scroller) kept = scroller.scrollTop;
    var ids = [];
    for (var bi = 0; bi < DATA.books.length; bi++) ids.push(bi);
    var items = [];
    (DATA.passages || []).forEach(function (p, idx) {
      if (DATA.books[p.b]) items.push({ p: p, idx: idx });
    });
    var span = 5400;
    var geo = layoutBible(ids, true, span);
    var lect = layoutLect(geo.px, geo.pad, geo.right, items);
    var sectionX = 168;
    var sectionW = 22;
    var bookX = 198;
    var bookW = 34;
    var flowX = bookX + bookW;
    var seasonX = 900;
    var seasonW = 112;
    var yearX = 1022;
    var yearW = 20;
    var viewW = 1240;
    var plotEnd = geo.right || span;
    lect.cycles.forEach(function (cycle) {
      var end = cycle.x + cycle.w;
      if (end > plotEnd) plotEnd = end;
    });
    var viewH = Math.ceil(plotEnd + 28);
    var parts = [];
    var bar = sourceBar();
    geo.secGeom.forEach(function (sec) {
      var words = 0;
      DATA.books.forEach(function (b) { if (b.section === sec.id) words += b.words; });
      var tip = sec.name + " · " + num(words) + " words";
      var attrs = ' data-kind="section" data-id="' + esc(sec.id) + '" data-tip="' + esc(tip) + '"';
      parts.push('<rect class="sk-node"' + attrs + ' x="' + sectionX + '" y="' + r1(sec.x) + '" width="' + sectionW + '" height="' + r1(Math.max(sec.w, 0.4)) + '" fill="' + bar.fill + '"/>');
      if (sec.w > sec.name.length * 6.4) {
        var cy = sec.x + sec.w / 2;
        var cx = sectionX + sectionW / 2;
        parts.push('<text class="sk-label"' + attrs + ' x="' + r1(cx) + '" y="' + r1(cy) + '" text-anchor="middle" dominant-baseline="middle" fill="' + bar.ink + '" font-size="11" font-family="system-ui, sans-serif" transform="rotate(-90 ' + r1(cx) + " " + r1(cy) + ')">' + esc(sec.name) + "</text>");
      }
    });
    ids.forEach(function (id) {
      var book = DATA.books[id];
      var box = geo.bookGeom[id];
      if (!book || !box || box.w < 0.25) return;
      var tip = book.name + " · " + num(book.words) + " words";
      var attrs = ' data-kind="book" data-id="' + id + '" data-section="' + esc(book.section) + '" data-tip="' + esc(tip) + '"';
      parts.push('<rect class="sk-node"' + attrs + ' x="' + bookX + '" y="' + r1(box.x) + '" width="' + bookW + '" height="' + r1(Math.max(box.w, 0.4)) + '" fill="' + bar.fill + '"/>');
      if (box.w >= 13) {
        parts.push('<text class="sk-label"' + attrs + ' x="' + (sectionX - 8) + '" y="' + r1(box.x + box.w / 2) + '" text-anchor="end" dominant-baseline="middle" fill="' + ink() + '" font-size="11" font-family="system-ui, sans-serif">' + esc(book.name) + "</text>");
      }
    });
    lect.placed.forEach(function (item) {
      var p = item.p;
      var book = DATA.books[p.b];
      var box = geo.bookGeom[p.b];
      if (!book || !box) return;
      var sw = item.sw != null ? item.sw : Math.max(p.w * geo.px, 0);
      var sy = item.sx != null ? item.sx : box.x + (book.words ? (p.o / book.words) * box.w : 0);
      var color = seasonColor(p.s);
      var tip = citation(p) + " · Year " + p.y + " · " + p.n + " · " + seasonName(p.s) + ". " + nextKept(p);
      parts.push('<g class="sk-ribbon" data-kind="ribbon" data-idx="' + item.idx + '" data-id="' + item.idx + '" data-book="' + p.b + '" data-section="' + esc(book.section) + '" data-year="' + esc(p.y) + '" data-season="' + esc(p.s) + '" data-day="' + esc(p.i) + '" data-tip="' + esc(tip) + '">'
        + '<path fill="' + color.fill + '" style="pointer-events:none" d="' + bandAcross(flowX, sy, seasonX, item.x, sw) + '"/>'
        + '<path class="sk-hit" stroke-width="' + r1(Math.max(sw, 7)) + '" d="' + lineAcross(flowX, sy + sw / 2, seasonX, item.x + sw / 2) + '"/>'
        + "</g>");
    });
    lect.cycles.forEach(function (cycle) {
      cycle.seasons.forEach(function (season) {
        if (season.w <= 0) return;
        var color = seasonColor(season.s);
        var tip = "Year " + season.y + " · " + seasonName(season.s);
        var attrs = ' data-kind="season" data-id="' + esc(season.s) + '" data-year="' + esc(season.y) + '" data-tip="' + esc(tip) + '"';
        parts.push('<rect class="sk-node"' + attrs + ' x="' + seasonX + '" y="' + r1(season.x) + '" width="' + seasonW + '" height="' + r1(season.w) + '" fill="' + color.fill + '"/>');
        var label = season.w > 16 ? (seasonW > seasonName(season.s).length * 6.4 ? seasonName(season.s) : (SHORT[season.s] || "")) : "";
        if (label) {
          parts.push('<text class="sk-label"' + attrs + ' x="' + (seasonX + 8) + '" y="' + r1(season.x + Math.min(14, season.w / 2)) + '" text-anchor="start" dominant-baseline="middle" fill="' + color.ink + '" font-size="11" font-family="system-ui, sans-serif">' + esc(label) + "</text>");
        }
      });
      var name = "Year " + cycle.y;
      var yearTip = "Revised Common Lectionary · " + name;
      var yearAttrs = ' data-kind="cycle" data-id="' + esc(cycle.y) + '" data-tip="' + esc(yearTip) + '"';
      parts.push('<rect class="sk-node"' + yearAttrs + ' x="' + yearX + '" y="' + r1(cycle.x) + '" width="' + yearW + '" height="' + r1(Math.max(cycle.w, 0.4)) + '" fill="' + bar.fill + '"/>');
      if (cycle.w > 18) {
        parts.push('<text class="sk-label"' + yearAttrs + ' x="' + (yearX + yearW + 8) + '" y="' + r1(cycle.x + 14) + '" text-anchor="start" dominant-baseline="middle" fill="' + ink() + '" font-size="13" font-weight="650" font-family="system-ui, sans-serif">' + esc(name) + "</text>");
      }
    });
    var rest = "The Bible runs down the left, from Genesis. The lectionary runs down the right, from Year A through Year C. Scroll to move later in the year. Hover a category or a band.";
    root.innerHTML = '<div class="viz-head"><div><h2>The Bible beside the year</h2></div></div><p class="viz-read" data-rest="' + esc(rest) + '">' + esc(rest) + '</p><div class="sk-scroll"><svg class="sk-down" width="' + viewW + '" height="' + viewH + '" data-vw="' + viewW + '" data-vh="' + viewH + '" viewBox="0 0 ' + viewW + " " + viewH + '" preserveAspectRatio="xMinYMin meet" role="img" aria-label="The Bible on the left and the lectionary running downward">' + parts.join("") + "</svg></div>";
    var nextScroll = root.querySelector(".sk-scroll");
    if (nextScroll) nextScroll.scrollTop = kept;
    sizeDownChart();
    applyDownFocus();
  }

  function sizeDownChart(tries) {
    var svg = document.querySelector("#sankey-down-root svg");
    var box = document.querySelector("#sankey-down-root .sk-scroll");
    if (!svg || !box) return;
    var vw = Number(svg.getAttribute("data-vw")) || 1240;
    var vh = Number(svg.getAttribute("data-vh")) || 5400;
    var w = box.clientWidth || Math.round(box.getBoundingClientRect().width);
    if (!w || !vw) {
      if ((tries || 0) < 8) requestAnimationFrame(function () { sizeDownChart((tries || 0) + 1); });
      return;
    }
    svg.style.width = "100%";
    svg.style.height = Math.round(w * vh / vw) + "px";
    svg.style.maxHeight = "none";
    svg.style.minHeight = "0";
  }

  function applyDownFocus() {
    var root = document.getElementById("sankey-down-root");
    if (!root || !DATA) return;
    var pick = downFocus;
    var activeBooks = {};
    var activeSections = {};
    var activeSeasons = {};
    var activeYears = {};
    root.querySelectorAll(".sk-ribbon").forEach(function (el) {
      var on = pick ? flowOn(el, pick) : false;
      el.classList.toggle("is-on", !!pick && on);
      el.classList.toggle("is-off", !!pick && !on);
      if (on) {
        activeBooks[el.getAttribute("data-book")] = true;
        activeSections[el.getAttribute("data-section")] = true;
        activeSeasons[el.getAttribute("data-year") + "|" + el.getAttribute("data-season")] = true;
        activeYears[el.getAttribute("data-year")] = true;
      }
    });
    var seasonAnchor = root.querySelector('.sk-node[data-kind="season"]');
    if (seasonAnchor) {
      root.querySelectorAll(".sk-ribbon.is-on").forEach(function (el) { seasonAnchor.before(el); });
    }
    root.querySelectorAll(".sk-node, .sk-label").forEach(function (el) {
      if (!pick) {
        el.classList.remove("is-on", "is-off", "is-touch");
        return;
      }
      var kind = el.getAttribute("data-kind");
      var id = el.getAttribute("data-id");
      var state = "off";
      if (kind === "book") {
        if (pick.kind === "book" && String(pick.id) === id) state = "on";
        else if (pick.kind === "section" && el.getAttribute("data-section") === pick.id) state = "on";
        else if (activeBooks[id]) state = "touch";
      } else if (kind === "section") {
        if (pick.kind === "section" && pick.id === id) state = "on";
        else if (pick.kind === "book" && DATA.books[pick.id] && DATA.books[pick.id].section === id) state = "on";
        else if (activeSections[id]) state = "touch";
      } else if (kind === "cycle") {
        if (pick.kind === "cycle" && pick.id === id) state = "on";
        else if (sourcePick(pick.kind) && activeYears[id]) state = "touch";
        else if ((pick.kind === "season" || pick.kind === "ribbon") && id === pick.year) state = "touch";
      } else if (kind === "season") {
        var seasonKey = el.getAttribute("data-year") + "|" + id;
        if (pick.kind === "season" && pick.id === id && pick.year === el.getAttribute("data-year")) state = "on";
        else if (sourcePick(pick.kind) && activeSeasons[seasonKey]) state = "on";
        else if (pick.kind === "cycle" && el.getAttribute("data-year") === pick.id) state = "touch";
        else if (pick.kind === "ribbon") {
          var flow = root.querySelector('.sk-ribbon[data-idx="' + pick.id + '"]');
          if (flow && flow.getAttribute("data-year") === el.getAttribute("data-year") && flow.getAttribute("data-season") === id) state = "on";
        }
      }
      el.classList.toggle("is-on", state === "on");
      el.classList.toggle("is-touch", state === "touch");
      el.classList.toggle("is-off", state === "off");
    });
  }

  function flowOn(el, pick) {
    if (!pick) return false;
    if (pick.kind === "ribbon" || pick.kind === "reading") return el.getAttribute("data-idx") === String(pick.id);
    if (pick.kind === "book") return el.getAttribute("data-book") === String(pick.id);
    if (pick.kind === "section") return el.getAttribute("data-section") === pick.id;
    if (pick.kind === "chapter" || pick.kind === "verse") return passageHits(el, pick);
    if (pick.kind === "cycle") return el.getAttribute("data-year") === pick.id;
    if (pick.kind === "season") return el.getAttribute("data-year") === pick.year && el.getAttribute("data-season") === pick.id;
    if (pick.kind === "day") return el.getAttribute("data-year") === pick.year && el.getAttribute("data-season") === pick.season && el.getAttribute("data-day") === String(pick.id);
    return false;
  }

  function passageHits(el, pick) {
    var p = DATA.passages[Number(el.getAttribute("data-idx"))];
    if (!p || String(p.b) !== String(pick.book)) return false;
    if (pick.kind === "chapter") return overlapsRange(p, chapterRange(Number(pick.book), Number(pick.id)));
    if (pick.kind === "verse") return overlapsRange(p, verseRange(Number(pick.book), Number(pick.chapter), Number(pick.id)));
    return false;
  }
  function sourcePick(kind) {
    return kind === "book" || kind === "section" || kind === "chapter" || kind === "verse";
  }
  function unitOverlaps(el, p) {
    if (!p || String(p.b) !== el.getAttribute("data-book")) return false;
    var kind = el.getAttribute("data-kind");
    if (kind === "chapter") return overlapsRange(p, chapterRange(p.b, Number(el.getAttribute("data-id"))));
    if (kind === "verse") return overlapsRange(p, verseRange(p.b, Number(el.getAttribute("data-chapter")), Number(el.getAttribute("data-id"))));
    return false;
  }

  function applySankeyFocus() {
    var root = document.getElementById("sankey-root");
    if (!root || !DATA) return;
    var pick = sankeyFocus;
    var activeBooks = {};
    var activeSections = {};
    var activeSeasons = {};
    var activeYears = {};
    var activeDays = {};
    var activeReadings = {};
    var activeSpans = [];
    var overview = !sankeyDrill.length;
    if (overview) markOverview(pick, activeBooks, activeSections, activeSeasons, activeYears);
    else root.querySelectorAll(".sk-ribbon").forEach(function (el) {
      var on = pick ? flowOn(el, pick) : false;
      el.classList.toggle("is-on", !!pick && on);
      el.classList.toggle("is-off", !!pick && !on);
      var fill = el.querySelector("path");
      if (fill) fill.style.pointerEvents = sankeyLatch && on ? "auto" : "none";
      if (on) {
        activeBooks[el.getAttribute("data-book")] = true;
        activeSections[el.getAttribute("data-section")] = true;
        activeSeasons[el.getAttribute("data-year") + "|" + el.getAttribute("data-season")] = true;
        activeYears[el.getAttribute("data-year")] = true;
        activeDays[el.getAttribute("data-year") + "|" + el.getAttribute("data-season") + "|" + el.getAttribute("data-day")] = true;
        activeReadings[el.getAttribute("data-idx")] = true;
        var passage = DATA.passages[Number(el.getAttribute("data-idx"))];
        if (passage) activeSpans.push(passage);
      }
    });
    var seasonAnchor = root.querySelector('.sk-node[data-kind="season"], .sk-node[data-kind="day"], .sk-node[data-kind="reading"]');
    if (seasonAnchor) {
      root.querySelectorAll(".sk-ribbon.is-on").forEach(function (el) { seasonAnchor.before(el); });
    }
    root.querySelectorAll(".sk-node, .sk-label").forEach(function (el) {
      if (!pick) {
        el.classList.remove("is-on", "is-off", "is-touch");
        return;
      }
      var kind = el.getAttribute("data-kind");
      var id = el.getAttribute("data-id");
      var state = "off";
      if (kind === "book") {
        if (pick.kind === "book" && String(pick.id) === id) state = "on";
        else if (pick.kind === "section" && el.getAttribute("data-section") === pick.id) state = "on";
        else if ((pick.kind === "chapter" || pick.kind === "verse") && String(pick.book) === String(id)) state = "on";
        else if (activeBooks[id]) state = "touch";
      } else if (kind === "section") {
        if (pick.kind === "section" && pick.id === id) state = "on";
        else if (pick.kind === "book" && DATA.books[pick.id] && DATA.books[pick.id].section === id) state = "on";
        else if (activeSections[id]) state = "touch";
      } else if (kind === "cycle") {
        if (pick.kind === "cycle" && pick.id === id) state = "on";
        else if (sourcePick(pick.kind) && activeYears[id]) state = "touch";
        else if ((pick.kind === "season" || pick.kind === "day" || pick.kind === "ribbon" || pick.kind === "reading") && id === pick.year) state = "touch";
      } else if (kind === "season") {
        var seasonKey = el.getAttribute("data-year") + "|" + id;
        if (pick.kind === "season" && pick.id === id && pick.year === el.getAttribute("data-year")) state = "on";
        else if (pick.kind === "day" && pick.season === id && pick.year === el.getAttribute("data-year")) state = "on";
        else if (sourcePick(pick.kind) && activeSeasons[seasonKey]) state = "on";
        else if (pick.kind === "cycle" && el.getAttribute("data-year") === pick.id) state = "touch";
        else if (pick.kind === "ribbon" || pick.kind === "reading") {
          var flow = root.querySelector('.sk-ribbon[data-idx="' + pick.id + '"]');
          if (flow && flow.getAttribute("data-year") === el.getAttribute("data-year") && flow.getAttribute("data-season") === id) state = "on";
        }
      } else if (kind === "day") {
        var dayKey = el.getAttribute("data-year") + "|" + el.getAttribute("data-season") + "|" + id;
        if (pick.kind === "day" && String(pick.id) === String(id) && pick.year === el.getAttribute("data-year") && pick.season === el.getAttribute("data-season")) state = "on";
        else if (sourcePick(pick.kind) && activeDays[dayKey]) state = "on";
        else if (pick.kind === "cycle" && el.getAttribute("data-year") === pick.id) state = "touch";
        else if (pick.kind === "ribbon" || pick.kind === "reading") {
          var dayFlow = root.querySelector('.sk-ribbon[data-idx="' + pick.id + '"]');
          if (dayFlow && dayFlow.getAttribute("data-year") === el.getAttribute("data-year") && dayFlow.getAttribute("data-season") === el.getAttribute("data-season") && dayFlow.getAttribute("data-day") === String(id)) state = "on";
        }
      } else if (kind === "reading") {
        if ((pick.kind === "reading" || pick.kind === "ribbon") && String(pick.id) === String(id)) state = "on";
        else if (sourcePick(pick.kind) && activeReadings[id]) state = "on";
        else if (pick.kind === "day" && el.getAttribute("data-year") === pick.year && el.getAttribute("data-season") === pick.season && el.getAttribute("data-day") === String(pick.id)) state = "on";
        else if (pick.kind === "cycle" && el.getAttribute("data-year") === pick.id) state = "touch";
      } else if (kind === "chapter" || kind === "verse") {
        var exact = kind === "chapter"
          ? (pick.kind === "chapter" && String(pick.id) === String(id) && String(pick.book) === el.getAttribute("data-book"))
            || (pick.kind === "verse" && String(pick.chapter) === String(id) && String(pick.book) === el.getAttribute("data-book"))
          : pick.kind === "verse" && String(pick.id) === String(id) && String(pick.book) === el.getAttribute("data-book") && String(pick.chapter) === el.getAttribute("data-chapter");
        var hit = false;
        for (var si = 0; si < activeSpans.length; si++) {
          if (unitOverlaps(el, activeSpans[si])) { hit = true; break; }
        }
        if (exact) state = "on";
        else if ((pick.kind === "ribbon" || pick.kind === "reading") && hit) state = "on";
        else if (hit) state = "touch";
      }
      el.classList.toggle("is-on", state === "on");
      el.classList.toggle("is-touch", state === "touch");
      el.classList.toggle("is-off", state === "off");
    });
  }

  function canSankeyDrill() {
    var pick = sankeyFocus;
    if (!pick || !DATA) return false;
    if (pick.kind === "section") return !bibleLeaf();
    if (pick.kind === "book") {
      var ids = bookIdsInDrill();
      if (ids.length === 1 && String(ids[0]) === String(pick.id)) return false;
      return true;
    }
    if (pick.kind === "chapter") {
      if (!pick.book || !bookVerses(Number(pick.book))) return false;
      var chapterLeaf = bibleLeaf();
      if (chapterLeaf && chapterLeaf.kind === "chapter" && String(chapterLeaf.id) === String(pick.id) && String(chapterLeaf.book) === String(pick.book)) return false;
      return true;
    }
    if (pick.kind === "cycle") {
      var yearLeaf = lectLeaf();
      if (yearLeaf && (yearLeaf.kind === "season" || yearLeaf.kind === "day")) return false;
      if (yearLeaf && yearLeaf.kind === "cycle" && yearLeaf.id === pick.id) return false;
      return true;
    }
    if (pick.kind === "season") {
      var seasonLeaf = lectLeaf();
      if (seasonLeaf && seasonLeaf.kind === "day") return false;
      if (seasonLeaf && seasonLeaf.kind === "season" && seasonLeaf.id === pick.id && seasonLeaf.year === pick.year) return false;
      return true;
    }
    if (pick.kind === "day") {
      var dayLeaf = lectLeaf();
      if (dayLeaf && dayLeaf.kind === "day" && String(dayLeaf.id) === String(pick.id) && dayLeaf.year === pick.year && dayLeaf.season === pick.season) return false;
      return true;
    }
    return false;
  }

  function stepFrom(pick) {
    return {
      kind: pick.kind,
      id: pick.id,
      year: pick.year || "",
      lect: pick.lect || "",
      season: pick.season || "",
      name: pick.name || "",
      book: pick.book || "",
      chapter: pick.chapter || ""
    };
  }

  function drillDown() {
    if (!canSankeyDrill()) return;
    var before = lectDrillState();
    var beforeBible = bibleDrillState();
    sankeyLatch = null;
    sankeyDrill.push(stepFrom(sankeyFocus));
    sankeyFocus = null;
    publishLectDrill(before, lectDrillState());
    publishBibleDrill(beforeBible, bibleDrillState());
    drawSankey();
  }

  function drillUpFrom(pick) {
    var idx = -1;
    for (var i = sankeyDrill.length - 1; i >= 0; i--) {
      if (samePick(sankeyDrill[i], pick)) { idx = i; break; }
    }
    if (idx < 0) return;
    var before = lectDrillState();
    var beforeBible = bibleDrillState();
    sankeyLatch = null;
    var step = sankeyDrill.splice(idx, 1)[0];
    sankeyFocus = step;
    publishLectDrill(before, lectDrillState());
    publishBibleDrill(beforeBible, bibleDrillState());
    drawSankey();
    var read = document.querySelector("#sankey-root .viz-read");
    if (read) read.textContent = sankeyStepLabel(step);
  }

  function chapterAppointed(bi, chapter) {
    var range = chapterRange(bi, chapter);
    if (!range || !DATA) return null;
    var passages = DATA.passages || [];
    for (var i = 0; i < passages.length; i++) {
      var passage = passages[i];
      if (Number(passage.b) !== bi) continue;
      if (overlapsRange(passage, range)) return true;
    }
    return false;
  }

  function openUnappointedChapter(pick) {
    var bi = Number(pick.book);
    var chapter = Number(pick.id);
    var leaf = bibleLeaf();
    var already = leaf && leaf.kind === "chapter" && String(leaf.book) === String(bi) && String(leaf.id) === String(chapter);
    if (!already) {
      var beforeLect = lectDrillState();
      var beforeBible = bibleDrillState();
      sankeyLatch = null;
      sankeyDrill.push(stepFrom(pick));
      sankeyFocus = null;
      publishLectDrill(beforeLect, lectDrillState());
      publishBibleDrill(beforeBible, bibleDrillState());
      drawSankey();
    }
    var book = DATA.books[bi];
    var label = (book ? citeName(book) : "Chapter") + " " + chapter;
    var read = document.querySelector("#sankey-root .viz-read");
    if (read) read.textContent = label + " is not appointed in the Revised Common Lectionary. Its cross references are open beside the text.";
    document.dispatchEvent(new CustomEvent("ar-open-chapter", { detail: { ref: label + ":1" } }));
  }

  function pickFrom(el) {
    return {
      kind: el.getAttribute("data-kind"),
      id: el.getAttribute("data-id"),
      year: el.getAttribute("data-year") || "",
      lect: el.getAttribute("data-lect") || "",
      season: el.getAttribute("data-season") || "",
      name: el.getAttribute("data-name") || "",
      book: el.getAttribute("data-book") || "",
      chapter: el.getAttribute("data-chapter") || ""
    };
  }

  function cancelSankeyHover() {
    if (!hoverTimer) return;
    clearTimeout(hoverTimer);
    hoverTimer = 0;
  }
  function sankeyRead(panel, text) {
    var read = panel ? panel.querySelector(".viz-read") : document.querySelector("#sankey-root .viz-read");
    if (!read) return;
    read.textContent = text || read.getAttribute("data-rest");
  }
  function syncSankeyContext() {
    var btn = document.getElementById("sankey-context");
    if (!btn) return;
    var ribbon = sankeyLatch && document.querySelector('#sankey-root .sk-ribbon[data-id="' + sankeyLatch.id + '"]');
    var season = ribbon ? ribbon.getAttribute("data-season") : "";
    if (!ribbon || !season) {
      btn.hidden = true;
      return;
    }
    var label = seasonName(season);
    var on = false;
    try {
      var raw = JSON.parse(sessionStorage.getItem("ar-context") || "null");
      on = !!(raw && raw.season === season);
    } catch (e) {}
    btn.hidden = false;
    btn.setAttribute("data-context-add", "season");
    btn.setAttribute("data-context-id", season);
    btn.setAttribute("data-context-label", label);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", (on ? "Remove " : "Add ") + label + " as a filter");
    btn.textContent = on ? "In filters" : "Add filter";
  }
  function releaseSankeyLatch(panel) {
    sankeyLatch = null;
    sankeyFocus = null;
    applySankeyFocus();
    sankeyRead(panel, "");
    syncSankeyContext();
  }
  function settleSankeyHover(panel, target) {
    if (sankeyLatch) return;
    var read = panel.querySelector(".viz-read");
    var node = target && target.isConnected && target.closest ? target.closest("[data-kind]") : null;
    if (node && node.isConnected && panel.contains(node)) {
      var next = pickFrom(node);
      if (!samePick(sankeyFocus, next)) {
        sankeyFocus = next;
        applySankeyFocus();
      }
      if (read) read.textContent = node.getAttribute("data-tip") || read.getAttribute("data-rest");
      return;
    }
    if (sankeyFocus) {
      sankeyFocus = null;
      applySankeyFocus();
    }
    if (read) read.textContent = read.getAttribute("data-rest");
  }
  function wire(panel, which) {
    if (!panel) return;
    panel.addEventListener("click", function (event) {
      if (which === "sankey") {
        cancelSankeyHover();
        var truth = event.target.closest("#sankey-truth");
        if (truth && panel.contains(truth)) {
          event.stopPropagation();
          sankeyTrue = !sankeyTrue;
          drawSankey();
          return;
        }
        var reset = event.target.closest("#sankey-reset");
        if (reset && panel.contains(reset)) {
          event.stopPropagation();
          var beforeReset = lectDrillState();
          var beforeResetBible = bibleDrillState();
          sankeyLatch = null;
          sankeyFocus = null;
          sankeyDrill = [];
          publishLectDrill(beforeReset, lectDrillState());
          publishBibleDrill(beforeResetBible, bibleDrillState());
          drawSankey();
          return;
        }
        var crumb = event.target.closest("[data-crumb]");
        if (event.target.closest("[data-context-add]")) return;
        if (crumb && panel.contains(crumb)) {
          var beforeCrumb = lectDrillState();
          var beforeCrumbBible = bibleDrillState();
          sankeyLatch = null;
          sankeyDrill = sankeyDrill.slice(0, Number(crumb.getAttribute("data-crumb")));
          sankeyFocus = null;
          publishLectDrill(beforeCrumb, lectDrillState());
          publishBibleDrill(beforeCrumbBible, bibleDrillState());
          drawSankey();
          return;
        }
        var el = event.target.closest("[data-kind]");
        if (!el || !panel.contains(el)) {
          if (sankeyLatch) releaseSankeyLatch(panel);
          return;
        }
        var next = pickFrom(el);
        if (next.kind === "ribbon") {
          if (sankeyLatch && samePick(sankeyLatch, next)) {
            releaseSankeyLatch(panel);
            return;
          }
          sankeyLatch = next;
          sankeyFocus = next;
          applySankeyFocus();
          sankeyRead(panel, el.getAttribute("data-tip"));
          syncSankeyContext();
          return;
        }
        if (sankeyLatch) {
          sankeyLatch = null;
          syncSankeyContext();
        }
        if (el.getAttribute("data-parent") === "1") {
          drillUpFrom(next);
          return;
        }
        if (next.kind === "chapter" && chapterAppointed(Number(next.book), Number(next.id)) === false) {
          openUnappointedChapter(next);
          return;
        }
        sankeyFocus = next;
        if (canSankeyDrill()) {
          drillDown();
          return;
        }
        applySankeyFocus();
        var stayed = panel.querySelector(".viz-read");
        if (stayed) stayed.textContent = el.getAttribute("data-tip") || stayed.getAttribute("data-rest");
        return;
      }
      var node = event.target.closest("[data-kind]");
      if (!node || !panel.contains(node)) chordFocus = null;
      else {
        var picked = pickFrom(node);
        chordFocus = samePick(chordFocus, picked) ? null : picked;
      }
      applyChordFocus();
      var chordRead = panel.querySelector(".viz-read");
      if (chordRead) {
        var tipEl = event.target.closest("[data-tip]");
        chordRead.textContent = chordFocus && tipEl ? tipEl.getAttribute("data-tip") : chordRead.getAttribute("data-rest");
      }
    });
    panel.addEventListener("mousemove", function (event) {
      var read = panel.querySelector(".viz-read");
      if (!read) return;
      var tip = event.target.closest("[data-tip]");
      if (which !== "sankey") {
        read.textContent = tip && panel.contains(tip) ? tip.getAttribute("data-tip") : read.getAttribute("data-rest");
        return;
      }
      if (sankeyLatch) {
        cancelSankeyHover();
        return;
      }
      var target = event.target;
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () {
        hoverTimer = 0;
        settleSankeyHover(panel, target);
      }, 120);
    });
    if (which === "sankey") {
      panel.addEventListener("mouseleave", function () {
        cancelSankeyHover();
        if (sankeyLatch) return;
        if (!sankeyFocus) {
          var idle = panel.querySelector(".viz-read");
          if (idle) idle.textContent = idle.getAttribute("data-rest");
          return;
        }
        sankeyFocus = null;
        applySankeyFocus();
        var read = panel.querySelector(".viz-read");
        if (read) read.textContent = read.getAttribute("data-rest");
      });
    }
  }

  function cancelDownHover() {
    if (!downHoverTimer) return;
    clearTimeout(downHoverTimer);
    downHoverTimer = 0;
  }
  function settleDownHover(panel, target) {
    var read = panel.querySelector(".viz-read");
    var node = target && target.isConnected && target.closest ? target.closest("[data-kind]") : null;
    if (node && node.isConnected && panel.contains(node)) {
      var next = pickFrom(node);
      if (!samePick(downFocus, next)) {
        downFocus = next;
        applyDownFocus();
      }
      if (read) read.textContent = node.getAttribute("data-tip") || read.getAttribute("data-rest");
      return;
    }
    if (downFocus) {
      downFocus = null;
      applyDownFocus();
    }
    if (read) read.textContent = read.getAttribute("data-rest");
  }
  function wireDown(panel) {
    if (!panel) return;
    panel.addEventListener("click", function (event) {
      cancelDownHover();
      var el = event.target.closest("[data-kind]");
      var read = panel.querySelector(".viz-read");
      if (!el || !panel.contains(el)) {
        downFocus = null;
        applyDownFocus();
        if (read) read.textContent = read.getAttribute("data-rest");
        return;
      }
      downFocus = pickFrom(el);
      applyDownFocus();
      if (read) read.textContent = el.getAttribute("data-tip") || read.getAttribute("data-rest");
    });
    panel.addEventListener("mousemove", function (event) {
      var target = event.target;
      if (downHoverTimer) clearTimeout(downHoverTimer);
      downHoverTimer = setTimeout(function () {
        downHoverTimer = 0;
        settleDownHover(panel, target);
      }, 120);
    });
    panel.addEventListener("mouseleave", function () {
      cancelDownHover();
      if (downFocus) {
        downFocus = null;
        applyDownFocus();
      }
      var read = panel.querySelector(".viz-read");
      if (read) read.textContent = read.getAttribute("data-rest");
    });
  }

  document.addEventListener("ar-context", syncSankeyContext);

  wire(document.getElementById("chord-panel"), "chord");
  wire(document.getElementById("sankey-panel"), "sankey");
  var sankeyResizeRoot = document.getElementById("sankey-root");
  if (sankeyResizeRoot && window.ResizeObserver) {
    new ResizeObserver(function (entries) {
      var w = entries[0].contentRect.width;
      if (!w || Math.abs(w - sankeySeenWidth) < 16) return;
      sankeySeenWidth = w;
      if (!DATA || sankeyTrue || sankeyDrill.length) return;
      drawSankey();
    }).observe(sankeyResizeRoot);
  }
  wireDown(document.getElementById("sankey-down"));
  window.addEventListener("resize", sizeDownChart);

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    cancelSankeyHover();
    cancelDownHover();
    if (!chordFocus && !sankeyFocus && !sankeyLatch && !downFocus) return;
    chordFocus = null;
    sankeyLatch = null;
    sankeyFocus = null;
    downFocus = null;
    applyChordFocus();
    applySankeyFocus();
    applyDownFocus();
    var sankeyIdle = document.querySelector("#sankey-root .viz-read");
    if (sankeyIdle) sankeyIdle.textContent = sankeyIdle.getAttribute("data-rest");
    syncSankeyContext();
  });

  new MutationObserver(function () {
    if (!DATA) return;
    if (deskName === "down") {
      drawDownSankey();
      return;
    }
    drawChord();
    drawSankey();
  }).observe(document.body, { attributes: true, attributeFilter: ["data-wheel"] });

  Promise.all([
    fetch("lectionary-viz.json").then(function (res) { if (!res.ok) throw new Error("missing"); return res.json(); }),
    fetch("verse-index.json").then(function (res) { return res.ok ? res.json() : null; }).catch(function () { return null; })
  ])
    .then(function (pair) {
      DATA = pair[0];
      VERSE = pair[1];
      buildFlowIndex();
      if (deskName === "down") {
        drawDownSankey();
        return;
      }
      drawChord();
      drawSankey();
    })
    .catch(function (err) {
      console.error(err);
      var note = '<p class="viz-note">The lectionary figure could not be loaded.</p>';
      var chord = document.getElementById("chord-root");
      if (chord) chord.innerHTML = note;
      var down = document.getElementById("sankey-down-root");
      if (down) down.innerHTML = '<div class="viz-head"><div><h2>The Bible beside the year</h2></div></div>' + note;
    });
})();
