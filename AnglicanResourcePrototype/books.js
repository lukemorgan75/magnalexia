(function () {
  if (document.body.getAttribute("data-desk") !== "books") return;

  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
  }

  function pdfPart(id, title, file) {
    return { id: id, title: title, file: file, start: 2, pages: 0 };
  }

  var bcpParts = [
    pdfPart("front", "Front matter", "eccles/bcp/Front_Matter_1928.pdf"),
    pdfPart("lectionary", "The Lectionary", "eccles/bcp/Lectionary_1928.pdf"),
    pdfPart("calendar", "Calendar and tables", "eccles/bcp/Calendar_Tables_1928.pdf"),
    pdfPart("mp", "Morning Prayer", "eccles/bcp/MP_1928.pdf"),
    pdfPart("ep", "Evening Prayer", "eccles/bcp/EP_1928.pdf"),
    pdfPart("prayers", "Prayers and Thanksgivings", "eccles/bcp/Prayers_1928.pdf"),
    pdfPart("litany", "Litany and the Penitential Office", "eccles/bcp/Litany_Penitential_1928.pdf"),
    pdfPart("hc", "Holy Communion", "eccles/bcp/HC_1928.pdf"),
    pdfPart("propers", "Collects, Epistles, and Gospels", "eccles/bcp/Propers_1928.pdf"),
    pdfPart("baptism", "Holy Baptism", "eccles/bcp/Baptism_1928.pdf"),
    pdfPart("instruction", "Offices of Instruction and Confirmation", "eccles/bcp/Instruction_Confirmation_1928.pdf"),
    pdfPart("marriage", "Solemnization of Matrimony", "eccles/bcp/Marriage_1928.pdf"),
    pdfPart("pastoral", "Visitation, Communion of the Sick, and Churching", "eccles/bcp/Misc_Pastoral_1928.pdf"),
    pdfPart("burial", "Burial of the Dead", "eccles/bcp/Burial_1928.pdf"),
    pdfPart("psalter", "The Psalter", "eccles/bcp/Psalms_1928.pdf"),
    pdfPart("ordinal", "The Ordinal", "eccles/bcp/Ordinal_1928.pdf"),
    pdfPart("consecration", "Consecration of a Church", "eccles/bcp/Consecration_church_1928.pdf"),
    pdfPart("institution", "Institution of Ministers", "eccles/bcp/institution_ministers_1928.pdf"),
    pdfPart("end", "Catechism and Family Prayer", "eccles/bcp/End_matter_1928.pdf"),
    pdfPart("articles", "Articles of Religion", "eccles/bcp/Articles_Religion.pdf")
  ];

  var altarIds = { hc: 1, propers: 1, baptism: 1, instruction: 1, marriage: 1, pastoral: 1, burial: 1 };

  function scanPart(id, title, volume, leaf) {
    return { id: id, title: title, volume: volume, leaf: leaf };
  }

  function homily(id, title, page) {
    return scanPart(id, title, 0, page + 84);
  }

  var BOOKS = [
    {
      id: "apocrypha",
      title: "The Apocrypha",
      cover: "Apocrypha",
      color: "#3e6d64",
      edition: "Thomas Nelson, New York, about 1895",
      blurb: "The books called Apocrypha, in the order of the English Bible, from an edition printed by Thomas Nelson in New York about 1895. These are page images of that copy, marginal notes included.",
      kind: "scan",
      volumes: [{ archive: "apocrypha00newyuoft", leaves: 204 }],
      parts: [
        scanPart("order", "Names and order of the books", 0, 8),
        scanPart("1esd", "I Esdras", 0, 14),
        scanPart("2esd", "II Esdras", 0, 27),
        scanPart("tobit", "Tobit", 0, 51),
        scanPart("judith", "Judith", 0, 59),
        scanPart("esther", "The rest of Esther", 0, 71),
        scanPart("wisdom", "The Wisdom of Solomon", 0, 74),
        scanPart("sirach", "Ecclesiasticus", 0, 91),
        scanPart("baruch", "Baruch, with the Epistle of Jeremiah", 0, 133),
        scanPart("song", "The Song of the Three Holy Children", 0, 138),
        scanPart("susanna", "The History of Susanna", 0, 140),
        scanPart("bel", "Bel and the Dragon", 0, 142),
        scanPart("manasses", "The Prayer of Manasses", 0, 143),
        scanPart("1macc", "I Maccabees", 0, 144),
        scanPart("2macc", "II Maccabees", 0, 170)
      ]
    },
    {
      id: "bcp",
      title: "The Book of Common Prayer",
      cover: "Common Prayer",
      color: "#8d6b4a",
      edition: "American prayer book, 1928",
      blurb: "The American prayer book of 1928, in pages set from that book by Charles Wohlers. Each part keeps his notice on the first page, one turn back from where the section opens. This is not the 1979 Book of Common Prayer.",
      kind: "pdf",
      parts: bcpParts
    },
    {
      id: "altar",
      title: "The Altar Book",
      cover: "Altar Book",
      color: "#a83d49",
      edition: "Altar services in the 1928 prayer book",
      blurb: "The altar services as they stand in the 1928 prayer book, from Holy Communion through the Burial of the Dead. This is not the 1979 Altar Book.",
      kind: "pdf",
      parts: bcpParts.filter(function (part) { return altarIds[part.id]; })
    },
    {
      id: "articles",
      title: "The Thirty-Nine Articles of Religion",
      cover: "Articles",
      color: "#6b446f",
      edition: "Articles of 1801, as printed in 1928",
      blurb: "The Articles of Religion as printed with the 1928 American prayer book. These are the Articles of 1801.",
      kind: "pdf",
      parts: [pdfPart("articles", "Articles of Religion", "eccles/bcp/Articles_Religion.pdf")]
    },
    {
      id: "homilies",
      title: "The Book of Homilies",
      cover: "Homilies",
      color: "#a3826c",
      edition: "Oxford, 1859, edited by John Griffiths",
      blurb: "The two books of homilies appointed to be read in churches. Oxford, 1859, edited by John Griffiths. Page images of that edition. The side list follows the printed table where its page figures run in order.",
      kind: "scan",
      volumes: [{ archive: "twobookshomilie00grifgoog", leaves: 749 }],
      parts: [
        scanPart("open", "Opening of this edition", 0, 0),
        homily("first", "The First Book", 1),
        homily("table", "The table of the First Book", 2),
        homily("preface", "The preface", 3),
        homily("scripture", "A Fruitful Exhortation to the Reading and Knowledge of Holy Scripture", 7),
        homily("misery", "The Misery of All Mankind", 16),
        homily("salvation", "The Salvation of Mankind", 34),
        homily("works", "Of Good Works Annexed unto Faith", 48),
        homily("love", "Of Christian Love and Charity", 66),
        homily("swearing", "Against Swearing and Perjury", 73),
        homily("falling", "Against Falling from God", 81),
        homily("death", "Against the Fear of Death", 91),
        homily("order", "Of Good Order and Obedience", 105),
        homily("whoredom", "Against Whoredom and Uncleanness", 118),
        homily("contention", "Against Contention and Brawling", 134),
        homily("notice", "Notice of homilies intended", 147),
        homily("second", "The Second Book", 149),
        homily("admonition", "An admonition to all ministers", 151),
        homily("church", "Of the Right Use of the Church", 153),
        homily("idol1", "Against Peril of Idolatry, the first part", 167),
        homily("idol2", "Against Peril of Idolatry, the second part", 180),
        homily("idol3", "Against Peril of Idolatry, the third part", 313),
        homily("repair", "Of Repairing and Keeping Clean of Churches", 373),
        homily("fasting", "Of Good Works, and First of Fasting", 379),
        homily("nativity", "Of the Nativity", 400),
        homily("friday", "For Good Friday", 411),
        homily("passion", "The Second Homily of the Passion", 419),
        homily("easter", "Of the Resurrection", 429),
        homily("sacrament", "Of the Worthy Receiving of the Sacrament", 439),
        homily("whitsun", "Of the Coming Down of the Holy Ghost", 453),
        homily("ghost", "Of the Holy Ghost, the second part", 461),
        homily("rogation", "For the Days of Rogation Week", 470),
        homily("bounds", "An exhortation for perambulation", 494),
        homily("matrimony", "Of the State of Matrimony", 500),
        homily("idleness", "Against Idleness", 516),
        homily("repentance", "Of Repentance", 535),
        homily("rebellion", "Against Disobedience and Wilful Rebellion", 550),
        homily("prayer", "A prayer against rebellion", 560),
        homily("thanks", "A Thanksgiving for the Suppression of the Rebellion", 599),
        homily("texts", "Index of texts", 601),
        homily("index", "General index", 611)
      ]
    },
    {
      id: "polity",
      title: "Of the Laws of Ecclesiastical Polity",
      cover: "Polity",
      color: "#734878",
      edition: "Keble’s edition, Oxford, 1845",
      blurb: "Richard Hooker, in John Keble’s edition of the Works, Oxford, 1845, three volumes. Volume II is Book V. Volume III opens with Book VI, and Books VII and VIII follow it in that volume. Keble’s preface and notes are on these pages.",
      kind: "scan",
      volumes: [
        { archive: "a587915701hookuoft", leaves: 628 },
        { archive: "a587915702hookuoft", leaves: 628 },
        { archive: "a587915703hookuoft", leaves: 774 }
      ],
      parts: [
        scanPart("v1", "Volume I", 0, 0),
        scanPart("v1-preface", "Volume I, editor’s preface", 0, 12),
        scanPart("v2", "Volume II", 1, 0),
        scanPart("v2-book", "Book V", 1, 8),
        scanPart("v3", "Volume III", 2, 0),
        scanPart("v3-book", "Book VI", 2, 8)
      ]
    },
    {
      id: "hymnal",
      title: "The Hymnal 1982",
      cover: "Hymnal",
      color: "#3b6ea5",
      edition: "Words and music are not shown",
      blurb: "Words and music of The Hymnal 1982 are still under copyright and are not shown.",
      kind: "notice",
      notice: "The Hymnal 1982 is still under copyright. Its words and music are not included here.",
      parts: [{ id: "notice", title: "Notice" }]
    }
  ];

  var pdfCache = {};
  var viewToken = 0;
  var reading = null;
  var cursor = { part: 0, page: 1, volume: 0, leaf: 0 };
  var hashLock = false;

  var shelf = document.getElementById("shelf");
  var grid = document.getElementById("shelf-grid");
  var empty = document.getElementById("shelf-empty");
  var reader = document.getElementById("reader");
  var toc = document.getElementById("toc");
  var titleEl = document.getElementById("reader-title");
  var editionEl = document.getElementById("reader-edition");
  var labelEl = document.getElementById("page-label");
  var prevBtn = document.getElementById("page-prev");
  var nextBtn = document.getElementById("page-next");
  var frame = document.getElementById("leaf-frame");
  var canvas = document.getElementById("leaf-canvas");
  var img = document.getElementById("leaf-img");
  var note = document.getElementById("leaf-note");

  function findBook(id) {
    for (var i = 0; i < BOOKS.length; i++) if (BOOKS[i].id === id) return BOOKS[i];
    return null;
  }

  function query() {
    var input = document.getElementById("search");
    return input ? input.value.trim().toLowerCase() : "";
  }

  function bookMatches(book, q) {
    if (!q) return true;
    var blob = book.title + " " + book.cover + " " + book.blurb;
    book.parts.forEach(function (part) { blob += " " + part.title; });
    return blob.toLowerCase().indexOf(q) !== -1;
  }

  function visibleParts(book, q) {
    if (!q) return book.parts;
    var hits = book.parts.filter(function (part) {
      return part.title.toLowerCase().indexOf(q) !== -1;
    });
    return hits.length ? hits : book.parts;
  }

  function renderShelf() {
    var q = query();
    grid.textContent = "";
    var shown = 0;
    BOOKS.forEach(function (book) {
      if (!bookMatches(book, q)) return;
      shown += 1;
      var card = document.createElement("button");
      card.type = "button";
      card.className = "book-card";
      card.setAttribute("data-book", book.id);
      var cover = document.createElement("span");
      cover.className = "book-cover";
      cover.style.setProperty("--cloth", book.color);
      var strong = document.createElement("strong");
      strong.textContent = book.cover;
      cover.appendChild(strong);
      var h = document.createElement("h3");
      h.textContent = book.title;
      var p = document.createElement("p");
      p.textContent = book.blurb;
      card.appendChild(cover);
      card.appendChild(h);
      card.appendChild(p);
      grid.appendChild(card);
    });
    empty.hidden = shown !== 0;
  }

  function activePart() {
    if (!reading) return null;
    if (reading.kind === "scan") {
      var chosen = reading.parts[0];
      reading.parts.forEach(function (part) {
        if (part.volume < cursor.volume || (part.volume === cursor.volume && part.leaf <= cursor.leaf)) chosen = part;
      });
      return chosen;
    }
    return reading.parts[cursor.part] || reading.parts[0];
  }

  function renderToc() {
    var q = query();
    var parts = visibleParts(reading, q);
    var current = activePart();
    toc.textContent = "";
    parts.forEach(function (part) {
      var button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-part", part.id);
      button.textContent = part.title;
      if (current && current.id === part.id) button.setAttribute("aria-current", "true");
      toc.appendChild(button);
    });
  }

  function markToc() {
    var current = activePart();
    var buttons = toc.querySelectorAll("[data-part]");
    buttons.forEach(function (button) {
      if (current && button.getAttribute("data-part") === current.id) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  function setLabel(text) {
    labelEl.textContent = text;
  }

  function setEnds() {
    if (!reading || reading.kind === "notice") {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    if (reading.kind === "pdf") {
      var part = reading.parts[cursor.part];
      prevBtn.disabled = cursor.part === 0 && cursor.page <= 1;
      nextBtn.disabled = !part.pages || (cursor.part === reading.parts.length - 1 && cursor.page >= part.pages);
      return;
    }
    var vol = reading.volumes[cursor.volume];
    prevBtn.disabled = cursor.volume === 0 && cursor.leaf <= 0;
    nextBtn.disabled = cursor.volume === reading.volumes.length - 1 && cursor.leaf >= vol.leaves - 1;
  }

  function showNote(text) {
    canvas.hidden = true;
    img.hidden = true;
    img.removeAttribute("src");
    note.hidden = false;
    note.textContent = text;
  }

  function loadPdf(url) {
    if (!pdfCache[url]) pdfCache[url] = pdfjsLib.getDocument(url).promise;
    return pdfCache[url];
  }

  function paintPdf() {
    var token = ++viewToken;
    var part = reading.parts[cursor.part];
    img.hidden = true;
    img.removeAttribute("src");
    note.hidden = true;
    canvas.hidden = false;
    setLabel(part.title + " · opening");
    if (!window.pdfjsLib) {
      showNote("The page viewer did not load.");
      return;
    }
    loadPdf(part.file).then(function (pdf) {
      if (token !== viewToken) return null;
      part.pages = pdf.numPages;
      if (cursor.page > part.pages) cursor.page = part.pages;
      if (cursor.page < 1) cursor.page = 1;
      return pdf.getPage(cursor.page);
    }).then(function (page) {
      if (!page || token !== viewToken) return;
      var maxW = Math.max(280, frame.clientWidth - 32);
      var maxH = Math.max(280, frame.clientHeight - 32);
      var base = page.getViewport({ scale: 1 });
      var fit = Math.min(maxW / base.width, maxH / base.height);
      var dpr = window.devicePixelRatio || 1;
      var viewport = page.getViewport({ scale: Math.max(0.2, fit) * dpr });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = Math.floor(viewport.width / dpr) + "px";
      canvas.style.height = Math.floor(viewport.height / dpr) + "px";
      var ctx = canvas.getContext("2d", { alpha: false });
      return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
        if (token !== viewToken) return;
        setLabel(part.title + " · " + cursor.page + " / " + part.pages);
        setEnds();
        markToc();
      });
    }).catch(function () {
      if (token !== viewToken) return;
      showNote("This page did not open.");
    });
  }

  function paintScan() {
    var token = ++viewToken;
    var vol = reading.volumes[cursor.volume];
    var part = activePart();
    canvas.hidden = true;
    note.hidden = true;
    img.hidden = false;
    img.alt = part ? part.title : reading.title;
    img.referrerPolicy = "no-referrer";
    setLabel("image " + (cursor.leaf + 1) + " of " + vol.leaves);
    setEnds();
    markToc();
    img.onload = function () {
      if (token !== viewToken) return;
    };
    img.onerror = function () {
      if (token !== viewToken) return;
      showNote("This page did not load. The scan is read from the Internet Archive.");
    };
    img.src = "https://archive.org/download/" + vol.archive + "/page/n" + cursor.leaf + "_w1200.jpg";
  }

  function paint() {
    if (!reading) return;
    titleEl.textContent = reading.title;
    editionEl.textContent = reading.edition;
    if (reading.kind === "notice") {
      viewToken += 1;
      showNote(reading.notice);
      setLabel("Notice");
      setEnds();
      markToc();
      return;
    }
    if (reading.kind === "pdf") paintPdf();
    else paintScan();
  }

  function setHash(book, part) {
    var next = "#" + book.id + "/" + part.id;
    if (location.hash === next) return;
    hashLock = true;
    location.hash = next;
    hashLock = false;
  }

  function clearHash() {
    if (!location.hash) return;
    hashLock = true;
    history.replaceState(null, "", location.pathname + location.search);
    hashLock = false;
  }

  function openBook(id, partId) {
    var book = findBook(id);
    if (!book) return;
    reading = book;
    var part = book.parts[0];
    if (partId) {
      book.parts.forEach(function (item) { if (item.id === partId) part = item; });
    }
    if (book.kind === "pdf") {
      cursor.part = book.parts.indexOf(part);
      cursor.page = part.start || 1;
    } else if (book.kind === "scan") {
      cursor.volume = part.volume || 0;
      cursor.leaf = part.leaf || 0;
    }
    shelf.hidden = true;
    reader.hidden = false;
    renderToc();
    setHash(book, part);
    paint();
    document.getElementById("reader-close").focus();
  }

  function closeBook() {
    viewToken += 1;
    reading = null;
    reader.hidden = true;
    shelf.hidden = false;
    img.removeAttribute("src");
    clearHash();
    renderShelf();
  }

  function goPart(partId) {
    if (!reading) return;
    var part = null;
    reading.parts.forEach(function (item) { if (item.id === partId) part = item; });
    if (!part) return;
    if (reading.kind === "pdf") {
      cursor.part = reading.parts.indexOf(part);
      cursor.page = part.start || 1;
    } else if (reading.kind === "scan") {
      cursor.volume = part.volume || 0;
      cursor.leaf = part.leaf || 0;
    }
    setHash(reading, part);
    renderToc();
    paint();
  }

  function turn(dir) {
    if (!reading || reading.kind === "notice") return;
    if (reading.kind === "pdf") {
      var part = reading.parts[cursor.part];
      var nextPage = cursor.page + dir;
      if (part.pages && nextPage >= 1 && nextPage <= part.pages) {
        cursor.page = nextPage;
        paint();
        return;
      }
      if (dir > 0 && cursor.part < reading.parts.length - 1) {
        cursor.part += 1;
        cursor.page = reading.parts[cursor.part].start || 1;
        setHash(reading, reading.parts[cursor.part]);
        renderToc();
        paint();
        return;
      }
      if (dir < 0 && cursor.page > 1) {
        cursor.page -= 1;
        paint();
        return;
      }
      if (dir < 0 && cursor.part > 0) {
        var prev = reading.parts[cursor.part - 1];
        var go = function (last) {
          cursor.part -= 1;
          cursor.page = last;
          setHash(reading, reading.parts[cursor.part]);
          renderToc();
          paint();
        };
        if (prev.pages) go(prev.pages);
        else if (window.pdfjsLib) {
          loadPdf(prev.file).then(function (pdf) {
            prev.pages = pdf.numPages;
            go(prev.pages);
          }).catch(function () { go(prev.start || 1); });
        }
      }
      return;
    }
    var vol = reading.volumes[cursor.volume];
    var leaf = cursor.leaf + dir;
    if (leaf >= 0 && leaf < vol.leaves) {
      cursor.leaf = leaf;
      paint();
      return;
    }
    if (dir > 0 && cursor.volume < reading.volumes.length - 1) {
      cursor.volume += 1;
      cursor.leaf = 0;
      renderToc();
      paint();
      var landed = activePart();
      if (landed) setHash(reading, landed);
      return;
    }
    if (dir < 0 && cursor.volume > 0) {
      cursor.volume -= 1;
      cursor.leaf = reading.volumes[cursor.volume].leaves - 1;
      renderToc();
      paint();
      var back = activePart();
      if (back) setHash(reading, back);
    }
  }

  function applyHash() {
    var raw = location.hash.replace(/^#/, "");
    if (!raw) {
      if (reading) closeBook();
      return;
    }
    var bits = raw.split("/");
    var book = findBook(bits[0]);
    if (!book) return;
    var partId = bits[1] || book.parts[0].id;
    if (reading && reading.id === book.id) {
      var current = activePart();
      if (current && current.id === partId) return;
      goPart(partId);
      return;
    }
    openBook(book.id, partId);
  }

  grid.addEventListener("click", function (event) {
    var card = event.target.closest("[data-book]");
    if (!card) return;
    openBook(card.getAttribute("data-book"));
  });

  toc.addEventListener("click", function (event) {
    var button = event.target.closest("[data-part]");
    if (!button) return;
    goPart(button.getAttribute("data-part"));
  });

  document.getElementById("reader-close").addEventListener("click", closeBook);
  prevBtn.addEventListener("click", function () { turn(-1); });
  nextBtn.addEventListener("click", function () { turn(1); });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && reading) {
      event.preventDefault();
      closeBook();
      return;
    }
    if (!reading) return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      turn(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      turn(-1);
    }
  });

  document.addEventListener("ar-shelf-search", function () {
    if (reading) renderToc();
    else renderShelf();
  });

  window.addEventListener("hashchange", function () {
    if (hashLock) return;
    applyHash();
  });

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (!reading || reading.kind !== "pdf") return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(paintPdf, 150);
  });

  renderShelf();
  if (location.hash) applyHash();
})();
