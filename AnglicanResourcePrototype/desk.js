(function () {
  var LEVELS = [
    { id: "devotional", label: "Devotional", description: "Accessible to any believer; no theological training assumed. Ideal for personal devotion, small group use, or children’s ministry." },
    { id: "parish", label: "Parish Formation", description: "Written for educated lay leaders, adult formation classes, and confirmation. Some theological vocabulary assumed." },
    { id: "ordained", label: "Ordained Ministry", description: "Designed for clergy, seminarians, and serious lay scholars. Engages primary texts, theological argument, and pastoral application." },
    { id: "academic", label: "Academic / Graduate", description: "Scholarly resources appropriate for seminary coursework, doctoral-level study, or advanced theological research." }
  ];
  var POSTURES = [
    { id: "devotional", label: "Devotional", description: "Primarily for personal or communal prayer, worship, and spiritual nurture." },
    { id: "educational", label: "Educational", description: "Primarily for teaching, study, discussion, or theological formation." },
    { id: "both", label: "Both", description: "Resources equally suited to devotional and educational use." }
  ];
  var FORMATS = ["Sermon", "Commentary", "Curriculum", "Devotional", "Prayer", "Article", "Book", "Youth", "Children"];
  var AUDIENCES = ["Children 6–12", "Youth", "Adults", "Clergy", "All ages"];
  var SEASONS = [
    { id: "advent", name: "Advent", color: "#3c4f86", weeks: 4, line: "The church keeps a month of waiting, in the dark, for the coming of Christ." },
    { id: "christmas", name: "Christmas", color: "#c6a36a", weeks: 2, line: "The Nativity and the twelve days that follow it." },
    { id: "epiphany", name: "Epiphany", color: "#2f6b4f", weeks: 8, line: "Christ is shown to the nations, and the church lingers with that light." },
    { id: "lent", name: "Lent", color: "#5c4a78", weeks: 6, line: "Forty days of penitence, fasting, and preparation for the paschal mystery." },
    { id: "holyweek", name: "Holy Week", color: "#8f3d3d", weeks: 1, line: "From the palms to the tomb, the church walks the last days of Jesus." },
    { id: "easter", name: "Easter", color: "#d4b483", weeks: 7, line: "Fifty days of resurrection, ending at Pentecost." },
    { id: "pentecost", name: "Pentecost", color: "#a33b3b", weeks: 1, line: "The Spirit is given, and the church is sent." },
    { id: "ordinary", name: "Ordinary Time", color: "#2a6a45", weeks: 23, line: "The long green season, when the church learns the life of Christ week by week." },
    { id: "feasts", name: "Feasts & Fasts", color: "#c6a36a", weeks: 2, line: "Principal feasts and the named days that punctuate the year." }
  ];
  var TOPICS = [
    { id: "doctrine", name: "Theology & doctrine", subs: ["Trinity", "Incarnation", "Scripture", "Anglicanism"] },
    { id: "sacrament", name: "Sacramental life", subs: ["Baptism", "Eucharist", "Marriage", "Orders"] },
    { id: "prayer", name: "Prayer", subs: ["Daily Office", "Intercession", "Retreats"] },
    { id: "scripture", name: "Scripture & preaching", subs: ["Interpretation", "Sermon series", "Expository"] },
    { id: "pastoral", name: "Pastoral ministry", subs: ["Grief", "Healing", "Family", "Conflict"] },
    { id: "mission", name: "Mission", subs: ["Witness", "Parish renewal"] },
    { id: "formation", name: "Formation", subs: ["Catechesis", "Adult formation", "Small groups"] },
    { id: "ethics", name: "Ethics & culture", subs: ["Vocation", "Justice"] },
    { id: "worship", name: "Church & worship", subs: ["Liturgy", "Music"] },
    { id: "leadership", name: "Leadership", subs: ["Vestry", "Stewardship", "Clergy wellness"] }
  ];
  var AGES = ["Nursery", "Elementary", "Youth", "Adults", "All ages"];
  var CANON = [
    { testament: "Old Testament", name: "Law", books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"] },
    { testament: "Old Testament", name: "History", books: ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"] },
    { testament: "Old Testament", name: "Wisdom", books: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"] },
    { testament: "Old Testament", name: "Major Prophets", books: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"] },
    { testament: "Old Testament", name: "Minor Prophets", books: ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"] },
    { testament: "New Testament", name: "Gospels", books: ["Matthew", "Mark", "Luke", "John"] },
    { testament: "New Testament", name: "Acts", books: ["Acts"] },
    { testament: "New Testament", name: "Pauline letters", books: ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"] },
    { testament: "New Testament", name: "General letters", books: ["Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"] },
    { testament: "New Testament", name: "Revelation", books: ["Revelation"] }
  ];
  var POETRY = { Job: 1, Psalms: 1, Proverbs: 1, "Song of Solomon": 1, Lamentations: 1 };
  var LIBRARY = [
    { id: "s1", title: "The greatest commandment", summary: "A parish sermon on loving God and neighbor, from Matthew 22.", format: "Sermon", level: "parish", use: "both", season: "ordinary", topic: "scripture", sub: "Expository", audience: "Adults", access: "Free", body: "The question is a test, and Jesus does not dodge it. The whole law hangs on love of God and love of neighbor. A parish can hear that without a lecture, and still leave knowing the two are not rivals." },
    { id: "s2", title: "Two commandments, for children", summary: "A short children’s moment that stays with the gospel and does not wander off into a mascot.", format: "Children", level: "devotional", use: "devotional", season: "ordinary", topic: "formation", sub: "Catechesis", audience: "Children 6–12", access: "Free", body: "Ask the children who they love, and who loves them. Then tell them Jesus put love of God first, and love of the person next to them second. Stop there." },
    { id: "s3", title: "Our dwelling place", summary: "A devotion on Psalm 90 for the week Moses dies on the mountain.", format: "Devotional", level: "devotional", use: "devotional", season: "ordinary", topic: "prayer", sub: "Daily Office", audience: "Adults", access: "Free", body: "Lord, you have been our dwelling place. The psalm does not pretend the years are long. It asks for the work of our hands to matter anyway." },
    { id: "s4", title: "Nebo, and the land he may see", summary: "A close reading of Deuteronomy 34 for someone preparing a lecture or a teaching sermon.", format: "Commentary", level: "academic", use: "educational", season: "ordinary", topic: "scripture", sub: "Interpretation", audience: "Clergy", access: "Premium", body: "The death notice is also a succession text. Joshua receives the spirit of wisdom by the laying on of hands, and the narrator will not let Moses’ uniqueness cancel that succession." },
    { id: "s5", title: "A great multitude", summary: "An All Saints sermon that stays with Revelation 7 and the Beatitudes together.", format: "Sermon", level: "parish", use: "devotional", season: "ordinary", topic: "worship", sub: "Liturgy", audience: "All ages", access: "Free", body: "The multitude is not a metaphor for our nicest members. It is the church the Lamb has gathered, and the Beatitudes are how that crowd already sounds." },
    { id: "s6", title: "Blessed are you", summary: "A youth session on the Beatitudes that does not turn them into a personality quiz.", format: "Youth", level: "devotional", use: "devotional", season: "ordinary", topic: "formation", sub: "Catechesis", audience: "Youth", access: "Free", body: "Read Matthew 5:1–12 aloud once, slowly. Ask which blessing sounds least like the school they attend. Stay with that one." },
    { id: "s7", title: "Wise and foolish, a parish forum", summary: "A one-session adult forum on Matthew 25, with a leader page and a question sheet.", format: "Curriculum", level: "parish", use: "educational", season: "ordinary", topic: "formation", sub: "Adult formation", audience: "Adults", access: "Free", body: "The oil is not a trick. The parable is about a community that expected to wait, and some of whom did not prepare for the wait. Let the room argue about what preparation looks like here." },
    { id: "s8", title: "Watch, therefore", summary: "Preaching notes for clergy on the delay in Matthew 25.", format: "Sermon", level: "ordained", use: "educational", season: "ordinary", topic: "scripture", sub: "Expository", audience: "Clergy", access: "Free", body: "Do not scold the congregation for failing to be bridesmaids. Preach the delay as the time the church has actually been given, and the oil as the practices that survive a long week." },
    { id: "s9", title: "Four weeks of waiting", summary: "A household devotion for Advent, one page a week.", format: "Devotional", level: "devotional", use: "devotional", season: "advent", topic: "prayer", sub: "Daily Office", audience: "All ages", access: "Free", body: "Light one candle. Read a short gospel sentence. Ask what the household is actually waiting for. Pray the collect, then stop." },
    { id: "s10", title: "A parish Lent library", summary: "A short stack for a formation hour: one sermon, one prayer, one conversation.", format: "Curriculum", level: "parish", use: "both", season: "lent", topic: "formation", sub: "Adult formation", audience: "Adults", access: "Free", body: "Keep the stack small enough that a vestry could actually use it. One Sunday sermon, one midweek prayer, one question that a small group can finish." },
    { id: "s11", title: "Compline for a hard week", summary: "A brief order for the end of the day, in contemporary language.", format: "Prayer", level: "devotional", use: "devotional", season: "ordinary", topic: "prayer", sub: "Daily Office", audience: "Adults", access: "Free", body: "Guide us waking, and guard us sleeping, that awake we may watch with Christ, and asleep we may rest in peace." },
    { id: "s12", title: "The long obedience of a vestry", summary: "An essay for wardens and clergy on staying with a parish through an ordinary year.", format: "Article", level: "ordained", use: "educational", season: "ordinary", topic: "leadership", sub: "Vestry", audience: "Clergy", access: "Free", body: "Most of the work is not a crisis. It is the next meeting, the next budget line, and the decision not to invent a new vision every September." },
    { id: "s13", title: "Five books for a new curate", summary: "A short reading list for the first year of ordained ministry.", format: "Book", level: "ordained", use: "educational", season: "ordinary", topic: "leadership", sub: "Clergy wellness", audience: "Clergy", access: "Premium", body: "A prayer book you will actually use, one gospel commentary, one book of pastoral theology, one poet, and one history of the parish you serve." },
    { id: "s14", title: "A note on the collects", summary: "A short unmarked note, waiting for a primary-use tag.", format: "Article", level: "parish", use: null, season: "ordinary", topic: "worship", sub: "Liturgy", audience: "Adults", access: "Free", body: "The collect already knows the week. A parish can read it before anyone has decided whether the hour is study or prayer." }
  ];
  var EVENTS = [
    { date: "Nov 12", name: "Preaching workshop", where: "A midweek gathering for clergy and licensed lay preachers.", kind: "Workshop" },
    { date: "Nov 18", name: "The Daily Office, online", where: "An hour on Morning and Evening Prayer for people who have never led it.", kind: "Webinar" },
    { date: "Dec 5", name: "Advent quiet day", where: "A Saturday of silence, psalms, and one address.", kind: "Retreat" }
  ];

  var state = {
    role: sessionStorage.getItem("ar-role") || "standard",
    level: sessionStorage.getItem("ar-level") || "parish",
    posture: loadPosture(),
    module: "year",
    season: "ordinary",
    topic: null,
    sub: null,
    audience: null,
    age: null,
    query: "",
    compose: false,
    added: loadAdded(),
    openBody: {},
    depth: "year",
    settle: false,
    style: sessionStorage.getItem("ar-wheel-style") === "fog" ? "fog" : "incense",
    slice: { kind: "year" },
    day: null,
    card: null,
    board: false,
    bible: { open: false, full: false, level: "testament", testament: null, section: null, book: null, chapter: null, verses: [], showNums: false, large: false, toEnd: false, xrefs: false, xrefHome: null },
    books: {}
  };
  var legacy = document.body.getAttribute("data-legacy-wheel") === "1";
  var numTimer = null;
  var drillLock = false;

  function loadAdded() {
    try { return JSON.parse(sessionStorage.getItem("ar-added") || "[]"); }
    catch (e) { return []; }
  }
  function allResources() { return state.added.concat(LIBRARY); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function loadPosture() {
    var raw = sessionStorage.getItem("ar-posture");
    if (!raw || raw === "any") return "";
    if (raw === "heart") return "devotional";
    if (raw === "mind") return "educational";
    if (raw === "devotional" || raw === "educational" || raw === "both") return raw;
    return "";
  }
  function primaryUse(item) {
    if (item.use === "devotional" || item.use === "educational" || item.use === "both") return item.use;
    if (item.use === null || item.use === "") return null;
    if (item.posture === "heart" || item.posture === "devotional") return "devotional";
    if (item.posture === "mind" || item.posture === "educational") return "educational";
    if (item.posture === "both") return "both";
    return null;
  }
  function matches(item) {
    if (state.level && item.level !== state.level) return false;
    if (state.posture) {
      var use = primaryUse(item);
      if (use && use !== state.posture && use !== "both") return false;
    }
    if (state.query) {
      var hay = (item.title + " " + item.summary + " " + item.format).toLowerCase();
      if (hay.indexOf(state.query.toLowerCase()) === -1) return false;
    }
    return true;
  }
  function seasonName(id) {
    var found = SEASONS.filter(function (s) { return s.id === id; })[0];
    return found ? found.name : id;
  }
  function card(item) {
    var useName = primaryUse(item);
    var useText = useName === "devotional" ? "Devotional" : useName === "educational" ? "Educational" : useName === "both" ? "Devotional and educational" : "";
    var bits = [item.format, seasonName(item.season), item.audience, item.access].filter(Boolean);
    var action = "";
    if (item.link) action = '<a href="' + esc(item.link) + '" target="_blank" rel="noopener">Open</a>';
    else if (item.body) {
      var shown = state.openBody[item.id];
      action = '<button class="text-toggle" type="button" data-body="' + item.id + '">' + (shown ? "Hide" : "Read") + "</button>";
      if (shown) action += '<p class="body">' + esc(item.body) + "</p>";
    }
    return '<article class="card"><header><span>' + esc(item.format) + "</span>" + (useText ? "<span>" + esc(useText) + "</span>" : "") + "</header><h3>" + esc(item.title) + "</h3><p>" + esc(item.summary) + '</p><p class="meta">' + esc(bits.join(" · ")) + "</p>" + action + "</article>";
  }
  function cards(list) {
    if (!list.length) return '<p class="empty">Nothing in this view matches what you have set.</p>';
    return '<div class="cards">' + list.map(card).join("") + "</div>";
  }

  function reading(kind) {
    return { kind: kind, cites: Array.prototype.slice.call(arguments, 1) };
  }
  function proper(season, name, date, lessons) {
    return { season: season, name: name, date: date, lessons: lessons };
  }
  var STRIPE = {
    advent: "#734878", christmas: "#8a6434", epiphany: "#3e6d64", lent: "#6b446f",
    holyweek: "#a83d49", easter: "#8a6434", pentecost: "#a83d49", ordinary: "#3e6d64"
  };
  var PROPERS = [
    proper("advent", "First Sunday of Advent", "November 29, 2026", [reading("First lesson", "Isaiah 64:1-9"), reading("Psalm", "Psalm 80:1-7, 17-19"), reading("Epistle", "1 Corinthians 1:3-9"), reading("Gospel", "Mark 13:24-37")]),
    proper("advent", "Second Sunday of Advent", "December 6, 2026", [reading("First lesson", "Isaiah 40:1-11"), reading("Psalm", "Psalm 85:1-2, 8-13"), reading("Epistle", "2 Peter 3:8-15a"), reading("Gospel", "Mark 1:1-8")]),
    proper("advent", "Third Sunday of Advent", "December 13, 2026", [reading("First lesson", "Isaiah 61:1-4, 8-11"), reading("Psalm", "Psalm 126"), reading("Epistle", "1 Thessalonians 5:16-24"), reading("Gospel", "John 1:6-8, 19-28")]),
    proper("advent", "Fourth Sunday of Advent", "December 20, 2026", [reading("First lesson", "2 Samuel 7:1-11, 16"), reading("Psalm", "Psalm 89:1-4, 19-26"), reading("Epistle", "Romans 16:25-27"), reading("Gospel", "Luke 1:26-38")]),
    proper("christmas", "Christmas Day", "December 25, 2026", [reading("First lesson", "Isaiah 9:2-7"), reading("Psalm", "Psalm 96"), reading("Epistle", "Titus 2:11-14"), reading("Gospel", "Luke 2:1-14, (15-20)")]),
    proper("christmas", "First Sunday after Christmas", "December 27, 2026", [reading("First lesson", "Isaiah 61:10-62:3"), reading("Psalm", "Psalm 148"), reading("Epistle", "Galatians 4:4-7"), reading("Gospel", "Luke 2:22-40")]),
    proper("christmas", "Holy Name", "January 1, 2027", [reading("First lesson", "Numbers 6:22-27"), reading("Psalm", "Psalm 8"), reading("Epistle", "Galatians 4:4-7"), reading("Gospel", "Luke 2:15-21")]),
    proper("christmas", "Second Sunday after Christmas", "January 3, 2027", [reading("First lesson", "Jeremiah 31:7-14"), reading("Psalm", "Psalm 147:12-20"), reading("Epistle", "Ephesians 1:3-14"), reading("Gospel", "John 1:(1-9), 10-18")]),
    proper("epiphany", "The Epiphany", "January 6, 2027", [reading("First lesson", "Isaiah 60:1-6"), reading("Psalm", "Psalm 72:1-7, 10-14"), reading("Epistle", "Ephesians 3:1-12"), reading("Gospel", "Matthew 2:1-12")]),
    proper("epiphany", "Baptism of the Lord", "January 10, 2027", [reading("First lesson", "Genesis 1:1-5"), reading("Psalm", "Psalm 29"), reading("Epistle", "Acts 19:1-7"), reading("Gospel", "Mark 1:4-11")]),
    proper("epiphany", "Second Sunday after the Epiphany", "January 17, 2027", [reading("First lesson", "1 Samuel 3:1-10, (11-20)"), reading("Psalm", "Psalm 139:1-6, 13-18"), reading("Epistle", "1 Corinthians 6:12-20"), reading("Gospel", "John 1:43-51")]),
    proper("epiphany", "Third Sunday after the Epiphany", "January 24, 2027", [reading("First lesson", "Jonah 3:1-5, 10"), reading("Psalm", "Psalm 62:5-12"), reading("Epistle", "1 Corinthians 7:29-31"), reading("Gospel", "Mark 1:14-20")]),
    proper("epiphany", "Fourth Sunday after the Epiphany", "January 31, 2027", [reading("First lesson", "Deuteronomy 18:15-20"), reading("Psalm", "Psalm 111"), reading("Epistle", "1 Corinthians 8:1-13"), reading("Gospel", "Mark 1:21-28")]),
    proper("epiphany", "The Presentation", "February 2, 2027", [reading("First lesson", "Malachi 3:1-4"), reading("Psalm", "Psalm 84"), reading("Epistle", "Hebrews 2:14-18"), reading("Gospel", "Luke 2:22-40")]),
    proper("epiphany", "Last Sunday after the Epiphany", "February 7, 2027", [reading("First lesson", "2 Kings 2:1-12"), reading("Psalm", "Psalm 50:1-6"), reading("Epistle", "2 Corinthians 4:3-6"), reading("Gospel", "Mark 9:2-9")]),
    proper("lent", "Ash Wednesday", "February 10, 2027", [reading("First lesson", "Joel 2:1-2, 12-17"), reading("Psalm", "Psalm 51:1-17"), reading("Epistle", "2 Corinthians 5:20b-6:10"), reading("Gospel", "Matthew 6:1-6, 16-21")]),
    proper("lent", "First Sunday in Lent", "February 14, 2027", [reading("First lesson", "Genesis 9:8-17"), reading("Psalm", "Psalm 25:1-10"), reading("Epistle", "1 Peter 3:18-22"), reading("Gospel", "Mark 1:9-15")]),
    proper("lent", "Second Sunday in Lent", "February 21, 2027", [reading("First lesson", "Genesis 17:1-7, 15-16"), reading("Psalm", "Psalm 22:23-31"), reading("Epistle", "Romans 4:13-25"), reading("Gospel", "Mark 8:31-38")]),
    proper("lent", "Third Sunday in Lent", "February 28, 2027", [reading("First lesson", "Exodus 20:1-17"), reading("Psalm", "Psalm 19"), reading("Epistle", "1 Corinthians 1:18-25"), reading("Gospel", "John 2:13-22")]),
    proper("lent", "Fourth Sunday in Lent", "March 7, 2027", [reading("First lesson", "Numbers 21:4-9"), reading("Psalm", "Psalm 107:1-3, 17-22"), reading("Epistle", "Ephesians 2:1-10"), reading("Gospel", "John 3:14-21")]),
    proper("lent", "Fifth Sunday in Lent", "March 14, 2027", [reading("First lesson", "Jeremiah 31:31-34"), reading("Psalm", "Psalm 51:1-12"), reading("Epistle", "Hebrews 5:5-10"), reading("Gospel", "John 12:20-33")]),
    proper("holyweek", "Palm Sunday", "March 21, 2027", [reading("Palms", "Mark 11:1-11"), reading("Psalm", "Psalm 118:1-2, 19-29"), reading("First lesson", "Isaiah 50:4-9a"), reading("Psalm", "Psalm 31:9-16"), reading("Epistle", "Philippians 2:5-11"), reading("Gospel", "Mark 14:1-15:47")]),
    proper("holyweek", "Monday of Holy Week", "March 22, 2027", [reading("First lesson", "Isaiah 42:1-9"), reading("Psalm", "Psalm 36:5-11"), reading("Epistle", "Hebrews 9:11-15"), reading("Gospel", "John 12:1-11")]),
    proper("holyweek", "Tuesday of Holy Week", "March 23, 2027", [reading("First lesson", "Isaiah 49:1-7"), reading("Psalm", "Psalm 71:1-14"), reading("Epistle", "1 Corinthians 1:18-31"), reading("Gospel", "John 12:20-36")]),
    proper("holyweek", "Wednesday of Holy Week", "March 24, 2027", [reading("First lesson", "Isaiah 50:4-9a"), reading("Psalm", "Psalm 70"), reading("Epistle", "Hebrews 12:1-3"), reading("Gospel", "John 13:21-32")]),
    proper("holyweek", "Maundy Thursday", "March 25, 2027", [reading("First lesson", "Exodus 12:1-4, (5-10), 11-14"), reading("Psalm", "Psalm 116:1-2, 12-19"), reading("Epistle", "1 Corinthians 11:23-26"), reading("Gospel", "John 13:1-17, 31b-35")]),
    proper("holyweek", "Good Friday", "March 26, 2027", [reading("First lesson", "Isaiah 52:13-53:12"), reading("Psalm", "Psalm 22"), reading("Epistle", "Hebrews 10:16-25"), reading("Gospel", "John 18:1-19:42")]),
    proper("holyweek", "Holy Saturday", "March 27, 2027", [reading("First lesson", "Job 14:1-14"), reading("Psalm", "Psalm 31:1-4, 15-16"), reading("Epistle", "1 Peter 4:1-8"), reading("Gospel", "Matthew 27:57-66")]),
    proper("easter", "Easter Vigil", "March 28, 2027", [reading("Old Testament", "Genesis 1:1-2:4a"), reading("Psalm", "Psalm 136:1-9, 23-26"), reading("Old Testament", "Genesis 7:1-5, 11-18; 8:6-18; 9:8-13"), reading("Psalm", "Psalm 46"), reading("Old Testament", "Genesis 22:1-18"), reading("Psalm", "Psalm 16"), reading("Old Testament", "Exodus 14:10-31; 15:20-21"), reading("Canticle", "Exodus 15:1-18"), reading("Old Testament", "Isaiah 55:1-11"), reading("Canticle", "Isaiah 12:2-6"), reading("Old Testament", "Proverbs 8:1-8, 19-21; 9:4-6"), reading("Psalm", "Psalm 19"), reading("Old Testament", "Ezekiel 36:24-28"), reading("Psalm", "Psalm 42"), reading("Old Testament", "Ezekiel 37:1-14"), reading("Psalm", "Psalm 143"), reading("Old Testament", "Zephaniah 3:14-20"), reading("Psalm", "Psalm 98"), reading("Epistle", "Romans 6:3-11"), reading("Psalm", "Psalm 114"), reading("Gospel", "Mark 16:1-8")]),
    proper("easter", "Easter Day", "March 28, 2027", [reading("First lesson", "Acts 10:34-43"), reading("Psalm", "Psalm 118:1-2, 14-24"), reading("Epistle", "1 Corinthians 15:1-11"), reading("Gospel", "John 20:1-18")]),
    proper("easter", "Second Sunday of Easter", "April 4, 2027", [reading("First lesson", "Acts 4:32-35"), reading("Psalm", "Psalm 133"), reading("Epistle", "1 John 1:1-2:2"), reading("Gospel", "John 20:19-31")]),
    proper("easter", "Third Sunday of Easter", "April 11, 2027", [reading("First lesson", "Acts 3:12-19"), reading("Psalm", "Psalm 4"), reading("Epistle", "1 John 3:1-7"), reading("Gospel", "Luke 24:36-48")]),
    proper("easter", "Fourth Sunday of Easter", "April 18, 2027", [reading("First lesson", "Acts 4:5-12"), reading("Psalm", "Psalm 23"), reading("Epistle", "1 John 3:16-24"), reading("Gospel", "John 10:11-18")]),
    proper("easter", "Fifth Sunday of Easter", "April 25, 2027", [reading("First lesson", "Acts 8:26-40"), reading("Psalm", "Psalm 22:25-31"), reading("Epistle", "1 John 4:7-21"), reading("Gospel", "John 15:1-8")]),
    proper("easter", "Sixth Sunday of Easter", "May 2, 2027", [reading("First lesson", "Acts 10:44-48"), reading("Psalm", "Psalm 98"), reading("Epistle", "1 John 5:1-6"), reading("Gospel", "John 15:9-17")]),
    proper("easter", "Ascension Day", "May 6, 2027", [reading("First lesson", "Acts 1:1-11"), reading("Psalm", "Psalm 47"), reading("Epistle", "Ephesians 1:15-23"), reading("Gospel", "Luke 24:44-53")]),
    proper("easter", "Seventh Sunday of Easter", "May 9, 2027", [reading("First lesson", "Acts 1:15-17, 21-26"), reading("Psalm", "Psalm 1"), reading("Epistle", "1 John 5:9-13"), reading("Gospel", "John 17:6-19")]),
    proper("pentecost", "The Day of Pentecost", "May 16, 2027", [reading("First lesson", "Acts 2:1-21"), reading("Psalm", "Psalm 104:24-34, 35b"), reading("Epistle", "Romans 8:22-27"), reading("Gospel", "John 15:26-27; 16:4b-15")]),
    proper("ordinary", "Trinity Sunday", "May 23, 2027", [reading("First lesson", "Isaiah 6:1-8"), reading("Psalm", "Psalm 29"), reading("Epistle", "Romans 8:12-17"), reading("Gospel", "John 3:1-17")]),
    proper("ordinary", "Proper 4", "May 30, 2027", [reading("First lesson", "1 Samuel 3:1-10, (11-20)", "Deuteronomy 5:12-15"), reading("Psalm", "Psalm 139:1-6, 13-18", "Psalm 81:1-10"), reading("Epistle", "2 Corinthians 4:5-12"), reading("Gospel", "Mark 2:23-3:6")]),
    proper("ordinary", "Proper 5", "June 6, 2027", [reading("First lesson", "1 Samuel 8:4-11, (12-15), 16-20", "Genesis 3:8-15"), reading("Psalm", "Psalm 138", "Psalm 130"), reading("Epistle", "2 Corinthians 4:13-5:1"), reading("Gospel", "Mark 3:20-35")]),
    proper("ordinary", "Proper 6", "June 13, 2027", [reading("First lesson", "1 Samuel 15:34-16:13", "Ezekiel 17:22-24"), reading("Psalm", "Psalm 20", "Psalm 92:1-4, 12-15"), reading("Epistle", "2 Corinthians 5:6-10, (11-13), 14-17"), reading("Gospel", "Mark 4:26-34")]),
    proper("ordinary", "Proper 7", "June 20, 2027", [reading("First lesson", "1 Samuel 17:(1a, 4-11, 19-23), 32-49", "Job 38:1-11"), reading("Psalm", "Psalm 9:9-20", "Psalm 107:1-3, 23-32"), reading("Epistle", "2 Corinthians 6:1-13"), reading("Gospel", "Mark 4:35-41")]),
    proper("ordinary", "Proper 8", "June 27, 2027", [reading("First lesson", "2 Samuel 1:1, 17-27", "Lamentations 3:22-33"), reading("Psalm", "Psalm 130", "Psalm 30"), reading("Epistle", "2 Corinthians 8:7-15"), reading("Gospel", "Mark 5:21-43")]),
    proper("ordinary", "Proper 9", "July 4, 2027", [reading("First lesson", "2 Samuel 5:1-5, 9-10", "Ezekiel 2:1-5"), reading("Psalm", "Psalm 48", "Psalm 123"), reading("Epistle", "2 Corinthians 12:2-10"), reading("Gospel", "Mark 6:1-13")]),
    proper("ordinary", "Proper 10", "July 11, 2027", [reading("First lesson", "2 Samuel 6:1-5, 12b-19", "Amos 7:7-15"), reading("Psalm", "Psalm 24", "Psalm 85:8-13"), reading("Epistle", "Ephesians 1:3-14"), reading("Gospel", "Mark 6:14-29")]),
    proper("ordinary", "Proper 11", "July 18, 2027", [reading("First lesson", "2 Samuel 7:1-14a", "Jeremiah 23:1-6"), reading("Psalm", "Psalm 89:20-37", "Psalm 23"), reading("Epistle", "Ephesians 2:11-22"), reading("Gospel", "Mark 6:30-34, 53-56")]),
    proper("ordinary", "Proper 12", "July 25, 2027", [reading("First lesson", "2 Samuel 11:1-15", "2 Kings 4:42-44"), reading("Psalm", "Psalm 14", "Psalm 145:10-18"), reading("Epistle", "Ephesians 3:14-21"), reading("Gospel", "John 6:1-21")]),
    proper("ordinary", "Proper 13", "August 1, 2027", [reading("First lesson", "2 Samuel 11:26-12:13a", "Exodus 16:2-4, 9-15"), reading("Psalm", "Psalm 51:1-12", "Psalm 78:23-29"), reading("Epistle", "Ephesians 4:1-16"), reading("Gospel", "John 6:24-35")]),
    proper("ordinary", "Proper 14", "August 8, 2027", [reading("First lesson", "2 Samuel 18:5-9, 15, 31-33", "1 Kings 19:4-8"), reading("Psalm", "Psalm 130", "Psalm 34:1-8"), reading("Epistle", "Ephesians 4:25-5:2"), reading("Gospel", "John 6:35, 41-51")]),
    proper("ordinary", "Proper 15", "August 15, 2027", [reading("First lesson", "1 Kings 2:10-12; 3:3-14", "Proverbs 9:1-6"), reading("Psalm", "Psalm 111", "Psalm 34:9-14"), reading("Epistle", "Ephesians 5:15-20"), reading("Gospel", "John 6:51-58")]),
    proper("ordinary", "Proper 16", "August 22, 2027", [reading("First lesson", "1 Kings 8:(1, 6, 10-11), 22-30, 41-43", "Joshua 24:1-2a, 14-18"), reading("Psalm", "Psalm 84", "Psalm 34:15-22"), reading("Epistle", "Ephesians 6:10-20"), reading("Gospel", "John 6:56-69")]),
    proper("ordinary", "Proper 17", "August 29, 2027", [reading("First lesson", "Song of Solomon 2:8-13", "Deuteronomy 4:1-2, 6-9"), reading("Psalm", "Psalm 45:1-2, 6-9", "Psalm 15"), reading("Epistle", "James 1:17-27"), reading("Gospel", "Mark 7:1-8, 14-15, 21-23")]),
    proper("ordinary", "Proper 18", "September 5, 2027", [reading("First lesson", "Proverbs 22:1-2, 8-9, 22-23", "Isaiah 35:4-7a"), reading("Psalm", "Psalm 125", "Psalm 146"), reading("Epistle", "James 2:1-10, (11-13), 14-17"), reading("Gospel", "Mark 7:24-37")]),
    proper("ordinary", "Proper 19", "September 12, 2027", [reading("First lesson", "Proverbs 1:20-33", "Isaiah 50:4-9a"), reading("Psalm", "Psalm 19", "Psalm 116:1-9"), reading("Epistle", "James 3:1-12"), reading("Gospel", "Mark 8:27-38")]),
    proper("ordinary", "Proper 20", "September 19, 2027", [reading("First lesson", "Proverbs 31:10-31", "Jeremiah 11:18-20"), reading("Psalm", "Psalm 1", "Psalm 54"), reading("Epistle", "James 3:13-4:3, 7-8a"), reading("Gospel", "Mark 9:30-37")]),
    proper("ordinary", "Proper 21", "September 26, 2027", [reading("First lesson", "Esther 7:1-6, 9-10; 9:20-22", "Numbers 11:4-6, 10-16, 24-29"), reading("Psalm", "Psalm 124", "Psalm 19:7-14"), reading("Epistle", "James 5:13-20"), reading("Gospel", "Mark 9:38-50")]),
    proper("ordinary", "Proper 22", "October 3, 2027", [reading("First lesson", "Job 1:1; 2:1-10", "Genesis 2:18-24"), reading("Psalm", "Psalm 26", "Psalm 8"), reading("Epistle", "Hebrews 1:1-4; 2:5-12"), reading("Gospel", "Mark 10:2-16")]),
    proper("ordinary", "Proper 23", "October 10, 2027", [reading("First lesson", "Job 23:1-9, 16-17", "Amos 5:6-7, 10-15"), reading("Psalm", "Psalm 22:1-15", "Psalm 90:12-17"), reading("Epistle", "Hebrews 4:12-16"), reading("Gospel", "Mark 10:17-31")]),
    proper("ordinary", "Proper 24", "October 17, 2027", [reading("First lesson", "Job 38:1-7, (34-41)", "Isaiah 53:4-12"), reading("Psalm", "Psalm 104:1-9, 24, 35c", "Psalm 91:9-16"), reading("Epistle", "Hebrews 5:1-10"), reading("Gospel", "Mark 10:35-45")]),
    proper("ordinary", "Proper 25", "October 24, 2027", [reading("First lesson", "Job 42:1-6, 10-17", "Jeremiah 31:7-9"), reading("Psalm", "Psalm 34:1-8, (19-22)", "Psalm 126"), reading("Epistle", "Hebrews 7:23-28"), reading("Gospel", "Mark 10:46-52")]),
    proper("ordinary", "Proper 26", "October 31, 2027", [reading("First lesson", "Ruth 1:1-18", "Deuteronomy 6:1-9"), reading("Psalm", "Psalm 146", "Psalm 119:1-8"), reading("Epistle", "Hebrews 9:11-14"), reading("Gospel", "Mark 12:28-34")]),
    proper("ordinary", "Proper 27", "November 7, 2027", [reading("First lesson", "Ruth 3:1-5; 4:13-17", "1 Kings 17:8-16"), reading("Psalm", "Psalm 127", "Psalm 146"), reading("Epistle", "Hebrews 9:24-28"), reading("Gospel", "Mark 12:38-44")]),
    proper("ordinary", "Proper 28", "November 14, 2027", [reading("First lesson", "1 Samuel 1:4-20", "Daniel 12:1-3"), reading("Psalm", "1 Samuel 2:1-10", "Psalm 16"), reading("Epistle", "Hebrews 10:11-14, (15-18), 19-25"), reading("Gospel", "Mark 13:1-8")]),
    proper("ordinary", "Christ the King", "November 21, 2027", [reading("First lesson", "2 Samuel 23:1-7", "Daniel 7:9-10, 13-14"), reading("Psalm", "Psalm 132:1-12, (13-18)", "Psalm 93"), reading("Epistle", "Revelation 1:4b-8"), reading("Gospel", "John 18:33-37")])
  ];

  function citeLabel(cite) {
    return cite.replace(/(\d)\s*-\s*(\d)/g, "$1–$2");
  }
  function sundayCard(day) {
    var lessons = day.lessons.map(function (lesson) {
      var cites = lesson.cites.map(function (cite) {
        var shown = citeLabel(cite);
        if (!bookName(cite)) return '<span class="plain">' + esc(shown) + "</span>";
        return '<button type="button" data-ref="' + esc(cite) + '">' + esc(shown) + "</button>";
      }).join('<span class="or">or</span>');
      return '<p class="lesson"><span>' + esc(lesson.kind) + "</span><span>" + cites + "</span></p>";
    }).join("");
    return '<article class="sunday"><header><h3>' + esc(day.name) + "</h3><time>" + esc(day.date) + "</time></header><div class=\"lessons\">" + lessons + "</div></article>";
  }
  function drillBoard() {
    var season = SEASONS.filter(function (s) { return s.id === state.season; })[0] || SEASONS[0];
    var days = PROPERS.filter(function (day) { return day.season === season.id; });
    var title = season.name;
    var line = season.line;
    var list = allResources().filter(function (item) { return item.season === season.id && matches(item); });
    var sliced = !legacy && state.board && state.slice && state.slice.kind !== "year";
    if (sliced) {
      var visible = {};
      var seasonIds = {};
      sliceDays().forEach(function (d) {
        visible[d.iso] = true;
        seasonIds[d.season] = true;
      });
      days = PROPERS.filter(function (day) { return visible[properIso(day.date)]; });
      list = allResources().filter(function (item) { return seasonIds[item.season] && matches(item); });
      if (state.slice.kind === "month") {
        title = monthLabel(state.slice.key);
        line = state.slice.season ? seasonName(state.slice.season) : "Every day of this month in the year";
      } else if (state.slice.kind === "week") {
        title = weekRangeLabel(sliceDays());
        line = state.slice.season ? seasonName(state.slice.season) : season.name;
      }
    }
    var long = days.length > 12;
    var note = season.id === "ordinary"
      ? "Year B of the Revised Common Lectionary, both Old Testament tracks. A reading opens in the Bible."
      : "Year B of the Revised Common Lectionary. A reading opens in the Bible.";
    var stripe = STRIPE[season.id] || "#6e5430";
    if (!legacy && state.style === "fog" && FOG_COLORS[season.id]) stripe = FOG_COLORS[season.id].fill;
    var back = legacy ? "The year" : "The wheel";
    var body = days.length ? days.map(sundayCard).join("") : '<p class="empty">No readings in this slice.</p>';
    return '<div class="year drill"><div class="drill-top"><button type="button" class="drill-back" data-year>' + back + '</button><div class="season-copy"><h2>' + esc(title) + "</h2><p>" + esc(line) + '</p></div><span></span></div><p class="lection-note">' + esc(note) + '</p><div class="sundays' + (long ? " is-long" : "") + '" style="--season:' + stripe + '">' + body + "</div>" + (list.length ? cards(list) : "") + "</div>";
  }

  var YEAR0 = Date.UTC(2026, 10, 29);
  var YEAR_COUNT = 364;
  var MONTH_NAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var SEASON_CUTS = [
    ["advent", "2026-11-29", "2026-12-25"],
    ["christmas", "2026-12-25", "2027-01-06"],
    ["epiphany", "2027-01-06", "2027-02-10"],
    ["lent", "2027-02-10", "2027-03-21"],
    ["holyweek", "2027-03-21", "2027-03-28"],
    ["easter", "2027-03-28", "2027-05-16"],
    ["pentecost", "2027-05-16", "2027-05-23"],
    ["ordinary", "2027-05-23", "2027-11-28"]
  ];
  var SEASON_STORY = {
    advent: [
      "The church year opens here, in the dark. Advent takes its name from the Latin adventus, a coming or arrival, and the four Sundays hold two arrivals in one season: the birth at Bethlehem, and the day when Christ comes to judge and to make all things new. The weeks do not begin with the manger. They begin with the end.",
      "Rome settled on four Sundays. Some other Western churches once kept a longer preparation from St. Martin’s day on November 11, a fast sometimes called St. Martin’s Lent. The English prayer books from 1549 open the Christian year on Advent Sunday, so the first of these Sundays is the church’s New Year. Violet became the usual color. A deep blue is used in some Anglican churches, a sign of hope rather than of Lent’s sorrow.",
      "The waiting has an order. The first Sundays look toward the day of the Lord and the prophets who asked for the heavens to be torn open. John the Baptist stands in the middle of the season, a voice in the wilderness. Only at the end does the story turn to Mary and the promise of a child. Where a fast is kept, it is lighter than Lent. The note is expectation.",
      "This year the ring runs from November 29 through December 24. Christmas Day begins the next season. The four weeks are short on purpose. The church practices wanting what it does not yet hold."
    ],
    christmas: [
      "Christmas Day is the feast of the Nativity, and the season is the twelve days that follow, through the evening of January 5, Twelfth Night. December 25 is an old Roman date. A civil calendar compiled in 354 records that the church in Rome was already keeping the birth of Christ on that day in 336. In the East the older feast was January 6, and it gathered the birth together with the baptism. The December date spread from west to east. January 6 remained as the Epiphany.",
      "The twelve days are a feast, not a fast. White and gold are the colors. Inside them the church kept other days and refused to postpone them: Stephen, the first martyr, on the 26th; John the evangelist on the 27th; the Holy Innocents, the children of Bethlehem, on the 28th; and on January 1 the naming of Jesus, which older books called the Circumcision. The joy is not thin. Stephen’s day is still inside the feast, and the church tells the truth that the child is born into a world that resists him.",
      "On this wheel the ring runs from December 25, 2026, through January 5, 2027. January 6 is the Epiphany and starts the next ring. For these twelve days the year stays with one birth: the Word made flesh, in a particular place, visited by shepherds who were told not to be afraid."
    ],
    epiphany: [
      "Epiphany, on January 6, is the feast of the manifestation. The Greek word means a showing. In the West the day came to belong especially to the magi, the nations arriving with gold, frankincense, and myrrh. Medieval worship also gathered two other signs onto this day: Jesus baptized in the Jordan, and the water turned to wine at Cana. One feast, three ways the hidden Christ is made known.",
      "After the day itself the season continues in green. These are the counted weeks before Lent, when the church stays with the light that has been shown and reads the early ministry: the call of the disciples, the first healings, the authority of the teaching. Older English prayer books inserted three pre-Lent Sundays, Septuagesima, Sexagesima, and Quinquagesima, and the American book of 1928 still had them. The calendar this wheel follows lets Epiphany run up to Ash Wednesday, so those three Sundays are not a separate season.",
      "This year the ring runs from January 6 through February 9. February 2, the Presentation of Christ in the Temple, falls inside it. That day was long kept as the close of the Christmas cycle, when candles were blessed and Christ was hailed as a light to the nations and the glory of Israel. Then the green weeks finish, and Lent begins."
    ],
    lent: [
      "Lent is the forty-day fast before Easter. The Latin name is Quadragesima, the fortieth. The number is the Lord’s own: forty days in the wilderness, and behind that the forty of Moses on the mountain and of Elijah on the way to Horeb. The church walks into that wilderness before it tries to keep the Passion.",
      "Sundays are in Lent, but they are not fast days, and so they are not counted in the forty. The fast starts on Ash Wednesday and runs through Holy Saturday. Count every day between those two, including both, and then set the six Sundays aside, and forty remain. Ashes on every worshipper, rather than on public penitents only, spread through the Western church in the tenth and eleventh centuries. The English books of the Reformation kept the fast and did not keep the imposition of ashes. Many Anglican churches have since received that sign back. A forty-day Lent is already visible in the fourth century. Before that, the pre-Easter fast was often shorter and differed from city to city.",
      "On this wheel the violet ring runs from Ash Wednesday, February 10, through March 20, the day before Palm Sunday. The forty days are not cut short. Holy Week is drawn as its own ring, and the fast continues through it to the tomb. The fourth Sunday has long been a slight easing, called Refreshment Sunday, or Laetare, and in England Mothering Sunday. The work of the season is repentance, almsgiving, and prayer, so that the week of the Passion is not a surprise."
    ],
    holyweek: [
      "Holy Week is the last week of Jesus’ life, from the entry into Jerusalem to the Sabbath spent in the tomb. Pilgrims in Jerusalem in the 380s already called it the Great Week and walked the places of the story on the days themselves. The West came to call it Holy Week. It is the heart of the year. Everything else leans toward it or away from it.",
      "Palm Sunday opens with branches and the shout of the crowds, and the same liturgy turns to the Passion. The reading is long because the church refuses to summarize these hours. Monday, Tuesday, and Wednesday stay with the last teaching and the closing of the plot. Wednesday is sometimes called Spy Wednesday, for the betrayal. Maundy Thursday takes its English name from the Latin mandatum, the new commandment. The church remembers the supper, the bread and the cup, and the washing of feet. Good Friday is the day of the cross. The English name is medieval. Holy Saturday is the day of the tomb, and of the night watch that became the Easter Vigil, the hour when the early church preferred to baptize.",
      "This year Palm Sunday is March 21, Good Friday is March 26, and Holy Saturday is March 27. Easter Day is March 28. March 25, the Annunciation, falls on Thursday of this week. The date remains the feast’s day. Many modern calendars keep the observance on a day after Easter, so the week is not asked to celebrate two mysteries at once. The ring is short, and it is meant to be walked slowly."
    ],
    easter: [
      "Easter is the feast of the resurrection. Most of the Christian world calls it Pascha, from the Hebrew pesach, because the Lord’s passover from death was kept at the time of Passover. The English name comes from the old name of the month in which the feast fell. Bede, in the eighth century, says that month was called Eosturmonath. The date is the Sunday after the full moon on or after March 21, the rule that grew out of the fourth-century effort to keep one feast. This year that Sunday is March 28.",
      "From Easter Day the church keeps fifty days, a week of weeks, and calls the stretch the Great Fifty Days. Fasting was set aside. Alleluia, put away for Lent, comes back. White and gold replace violet. The Sundays belong to the feast itself. Older books counted them as Sundays after Easter. The fiftieth day is Pentecost, drawn on this wheel as its own ring, so the Easter ring runs from March 28 through May 15, the eve of Pentecost.",
      "Inside those days, the fortieth is the Ascension, always a Thursday. This year it is May 6. The church has kept that day since the fourth century as the moment the risen Christ entrusts his going to the church and promises the Spirit. The stories of the season are the appearances, the breakfast on the shore, the opening of the scriptures, and the charge to go. Easter is not one morning. It is a season long enough to learn what the morning means."
    ],
    pentecost: [
      "Pentecost is the fiftieth day, and the name is the Greek number. In Jerusalem it was already the Jewish feast of Weeks, fifty days after Passover, when Acts tells of a wind, of fire, and of a crowd that heard the apostles each in its own language. The Christian year treats that day as the gift of the Spirit and the sending of the church. The fifty days of Easter end here. What was promised at the Ascension is given.",
      "The English name is Whitsunday, white Sunday, usually explained by the white robes of those baptized at the feast. Red is the color, for the fire, and it has been a Western color for this day since the medieval schemes of vestments. Older prayer books kept an octave, Whitsun week, and only then Trinity Sunday. From Trinity they numbered the rest of the year after Trinity, not after Pentecost. Trinity Sunday, as a feast of the whole Western church, dates from the fourteenth century, though England kept it earlier.",
      "On this wheel the red ring is one week, May 16 through May 22. Trinity Sunday, May 23, opens the long green season. The week is a pause between the resurrection and the counted Sundays: the church stands in the story of its own beginning, and then it is sent to live the rest of the year from that day."
    ],
    ordinary: [
      "Ordinary Time is the long green season. The word does not mean plain. It means the counted Sundays. The older Anglican prayer books did not use the modern name. They said after Epiphany and after Trinity. The calendar behind these readings took up the newer name, and on this wheel the long count still begins at Trinity rather than the day after Pentecost. That is the older English shape: Trinity first, then the numbered Sundays.",
      "The season runs from Trinity Sunday, May 23, to November 27, the eve of the next Advent. Green has marked the days outside feast and fast in the West since the medieval writers on vestments. The work of the weeks is the public life of Jesus, read in course: parables, healings, disputes, the sending of the Twelve, the cost of following. In Year B the Gospel is Mark, with John brought in where Mark is brief. These Sundays are not a lesser substitute for Easter. They are the life the resurrection makes possible.",
      "Certain days break the green without ending it. The Transfiguration falls on August 6, Holy Cross on September 14, All Saints on November 1. The last Sunday, November 21 this year, is Christ the King. That feast was appointed for the Roman church in 1925 and later moved to the end of the year. It is kept here as the Sunday before Advent: a last claim that the counted weeks have a Lord. Then the year turns back to the dark and begins again."
    ]
  };
  var INCENSE_COLORS = {
    advent: { fill: "#734878", ink: "#f7f3ea" },
    christmas: { fill: "#e3d2a4", ink: "#5c4930" },
    epiphany: { fill: "#3e6d64", ink: "#f7f3ea" },
    lent: { fill: "#6b446f", ink: "#f7f3ea" },
    holyweek: { fill: "#a83d49", ink: "#f7f3ea" },
    easter: { fill: "#d8c398", ink: "#5c4930" },
    pentecost: { fill: "#a83d49", ink: "#f7f3ea" },
    ordinary: { fill: "#3e6d64", ink: "#f7f3ea" }
  };
  var FOG_COLORS = {
    advent: { fill: "#3B82F6", ink: "#f5f5f7" },
    christmas: { fill: "#E6B422", ink: "#1c1406" },
    epiphany: { fill: "#22C55E", ink: "#04150a" },
    lent: { fill: "#1D4ED8", ink: "#f5f5f7" },
    holyweek: { fill: "#C2410C", ink: "#fff7ed" },
    easter: { fill: "#86EFAC", ink: "#052e16" },
    pentecost: { fill: "#60A5FA", ink: "#0b1220" },
    ordinary: { fill: "#15803D", ink: "#f0fdf4" }
  };
  var FEAST_NAME = {
    "2026-11-30": "St. Andrew",
    "2026-12-25": "Christmas",
    "2027-01-01": "Holy Name",
    "2027-01-06": "Epiphany",
    "2027-02-02": "Presentation",
    "2027-02-10": "Ash Wednesday",
    "2027-03-21": "Palm Sunday",
    "2027-03-25": "Annunciation",
    "2027-03-26": "Good Friday",
    "2027-03-28": "Easter",
    "2027-05-06": "Ascension",
    "2027-05-16": "Pentecost",
    "2027-05-23": "Trinity",
    "2027-08-06": "Transfiguration",
    "2027-09-14": "Holy Cross",
    "2027-11-01": "All Saints",
    "2027-11-21": "Christ the King"
  };

  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function isoFromUTC(t) {
    var d = new Date(t);
    return d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate());
  }
  function properIso(date) {
    var parts = String(date).match(/^([A-Za-z]+)\s+(\d+),\s+(\d+)$/);
    if (!parts) return "";
    var names = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
    var m = names[parts[1].toLowerCase()];
    if (!m) return "";
    return parts[3] + "-" + pad2(m) + "-" + pad2(Number(parts[2]));
  }
  function seasonOfIso(iso) {
    for (var i = 0; i < SEASON_CUTS.length; i++) {
      if (iso >= SEASON_CUTS[i][1] && iso < SEASON_CUTS[i][2]) return SEASON_CUTS[i][0];
    }
    return "ordinary";
  }
  function seasonSpan(id) {
    var cut = null;
    for (var i = 0; i < SEASON_CUTS.length; i++) {
      if (SEASON_CUTS[i][0] === id) cut = SEASON_CUTS[i];
    }
    if (!cut) return "";
    function one(iso, back) {
      var bits = iso.split("-");
      var t = Date.UTC(Number(bits[0]), Number(bits[1]) - 1, Number(bits[2]));
      if (back) t -= 86400000;
      var d = new Date(t);
      return MONTH_NAME[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
    }
    return one(cut[1], false) + " – " + one(cut[2], true);
  }
  function seasonCard(id) {
    var story = SEASON_STORY[id];
    if (!story) return "";
    var fog = state.style === "fog";
    var stripe = fog ? (FOG_COLORS[id] || FOG_COLORS.ordinary).fill : (STRIPE[id] || "#6e5430");
    var paras = story.map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("");
    return '<aside class="dial-read"><article class="season-essay" style="--season:' + stripe + '"><header><p class="season-kicker">The season</p><h3>' + esc(seasonName(id)) + "</h3><time>" + esc(seasonSpan(id)) + "</time></header>" + paras + "</article></aside>";
  }
  function monthNumber(key) {
    var bits = String(key).split("-");
    return Number(bits[bits.length - 1]);
  }
  function monthLabel(key) {
    return MONTH_NAME[monthNumber(key) - 1] || String(key);
  }
  function weekRangeLabel(days) {
    if (!days.length) return "Week";
    var a = days[0], b = days[days.length - 1];
    if (a.iso === b.iso) return MONTH_NAME[a.m - 1] + " " + a.d;
    if (a.m === b.m) return MONTH_NAME[a.m - 1] + " " + a.d + "–" + b.d;
    return MONTH_SHORT[a.m - 1] + " " + a.d + " – " + MONTH_SHORT[b.m - 1] + " " + b.d;
  }
  var PROPER_AT = {};
  PROPERS.forEach(function (p, i) {
    var iso = properIso(p.date);
    if (!iso) return;
    if (!PROPER_AT[iso]) PROPER_AT[iso] = [];
    PROPER_AT[iso].push(i);
  });
  function yearDays() {
    if (yearDays.cache) return yearDays.cache;
    var list = [];
    for (var i = 0; i < YEAR_COUNT; i++) {
      var t = YEAR0 + i * 86400000;
      var iso = isoFromUTC(t);
      var dt = new Date(t);
      list.push({
        i: i,
        iso: iso,
        y: dt.getUTCFullYear(),
        m: dt.getUTCMonth() + 1,
        d: dt.getUTCDate(),
        dow: dt.getUTCDay(),
        season: seasonOfIso(iso),
        monthKey: iso.slice(0, 7),
        propers: PROPER_AT[iso] || [],
        feast: FEAST_NAME[iso] || ""
      });
    }
    yearDays.cache = list;
    return list;
  }
  function sliceDays() {
    var all = yearDays();
    var s = state.slice || { kind: "year" };
    if (s.kind === "season") return all.filter(function (d) { return d.season === s.id; });
    if (s.kind === "month") {
      var month = monthNumber(s.key);
      var list = all.filter(function (d) { return d.m === month && (!s.season || d.season === s.season); });
      var at = 0;
      for (var mi = 0; mi < list.length; mi++) if (list[mi].d === 1) { at = mi; break; }
      if (at) list = list.slice(at).concat(list.slice(0, at));
      return list;
    }
    if (s.kind === "week") return all.filter(function (d) { return d.iso >= s.start && d.iso <= s.end; });
    return all;
  }
  function groupDays(days, keyOf) {
    var groups = [];
    days.forEach(function (d) {
      var key = keyOf(d);
      var last = groups[groups.length - 1];
      if (!last || last.key !== key) groups.push({ key: key, days: [d] });
      else last.days.push(d);
    });
    return groups;
  }
  function weekChunks(days) {
    var chunks = [];
    var cur = null;
    days.forEach(function (d) {
      if (!cur || d.dow === 0) {
        cur = { key: d.iso, days: [d] };
        chunks.push(cur);
      } else cur.days.push(d);
    });
    return chunks;
  }

  function todayInYear() {
    var days = yearDays();
    var now = new Date();
    var iso = now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate());
    var best = days[0];
    var bestDist = Infinity;
    var target = Date.parse(iso + "T00:00:00Z");
    for (var i = 0; i < days.length; i++) {
      if (days[i].iso === iso) return iso;
      var dist = Math.abs(Date.parse(days[i].iso + "T00:00:00Z") - target);
      if (dist < bestDist) { best = days[i]; bestDist = dist; }
    }
    return best.iso;
  }
  function pinDay() {
    var days = sliceDays();
    if (!days.length) return;
    if (state.day) {
      for (var i = 0; i < days.length; i++) if (days[i].iso === state.day) return;
    }
    var today = todayInYear();
    for (var j = 0; j < days.length; j++) if (days[j].iso === today) { state.day = today; return; }
    state.day = days[0].iso;
  }
  function dial() {
    pinDay();
    var days = sliceDays();
    if (!days.length) days = yearDays();
    var fog = state.style === "fog";
    var colors = fog ? FOG_COLORS : INCENSE_COLORS;
    var cx = 500, cy = 500;
    var kind = (state.slice && state.slice.kind) || "year";
    var outerR = 486;
    var dayInner = kind === "week" ? 128 : kind === "year" ? 218 : 196;
    var bands = kind === "year"
      ? { season: [112, 158], month: [164, 208] }
      : kind === "season"
        ? { month: [112, 186] }
        : kind === "month"
          ? { week: [112, 186] }
          : {};
    var bandThick = (outerR - dayInner) / 7;
    var dayRings = [];
    for (var ringDow = 0; ringDow < 7; ringDow++) {
      var ringOuter = outerR - ringDow * bandThick;
      var ringInner = ringOuter - bandThick;
      var seam = kind === "week" ? 5 : 3;
      dayRings.push([ringInner + (ringDow === 6 ? 0 : seam), ringOuter - (ringDow === 0 ? 0 : seam)]);
    }
    function n(v) { return Math.round(v * 10) / 10; }
    function polar(r, a) { return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }
    function angAt(i, count) { return -Math.PI / 2 + (i / count) * Math.PI * 2; }
    function plain(r0, r1, a0, a1) {
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var o0 = polar(r1, a0), o1 = polar(r1, a1), i1 = polar(r0, a1), i0 = polar(r0, a0);
      return "M " + n(o0[0]) + " " + n(o0[1]) + " A " + n(r1) + " " + n(r1) + " 0 " + large + " 1 " + n(o1[0]) + " " + n(o1[1]) +
        " L " + n(i1[0]) + " " + n(i1[1]) + " A " + n(r0) + " " + n(r0) + " 0 " + large + " 0 " + n(i0[0]) + " " + n(i0[1]) + " Z";
    }
    function fogPath(r0, r1, a0, a1) {
      var span = a1 - a0;
      var midR = (r0 + r1) / 2;
      var arc = span * midR;
      var gap = arc > 50 ? Math.min(11, arc * 0.11) : arc > 24 ? 2.6 : 0.7;
      var corner = arc > 50 ? Math.min(18, (r1 - r0) * 0.3, arc * 0.16) : arc > 24 ? 5 : 0;
      var pad = gap / midR;
      if (span <= pad * 2 + 0.001) return plain(r0 + 0.4, r1 - 0.4, a0, a1);
      var b0 = a0 + pad, b1 = a1 - pad;
      var rr0 = r0 + gap * 0.35, rr1 = r1 - gap * 0.35;
      if (corner < 1.5 || (b1 - b0) < corner / rr0 * 2) return plain(rr0, rr1, b0, b1);
      var da1 = Math.min(corner / rr1, (b1 - b0) * 0.32);
      var da0 = Math.min(corner / rr0, (b1 - b0) * 0.32);
      var large = (b1 - b0) > Math.PI ? 1 : 0;
      function P(r, a) { var p = polar(r, a); return n(p[0]) + " " + n(p[1]); }
      var oS = P(rr1, b0 + da1), oE = P(rr1, b1 - da1);
      var iE = P(rr0, b1 - da0), iS = P(rr0, b0 + da0);
      return "M " + oS + " A " + n(rr1) + " " + n(rr1) + " 0 " + large + " 1 " + oE +
        " Q " + P(rr1, b1) + " " + P(rr1 - corner, b1) +
        " L " + P(rr0 + corner, b1) +
        " Q " + P(rr0, b1) + " " + iE +
        " A " + n(rr0) + " " + n(rr0) + " 0 " + large + " 0 " + iS +
        " Q " + P(rr0, b0) + " " + P(rr0 + corner, b0) +
        " L " + P(rr1 - corner, b0) +
        " Q " + P(rr1, b0) + " " + oS + " Z";
    }
    function annulus(r0, r1) {
      return "M " + n(cx + r1) + " " + n(cy) +
        " A " + n(r1) + " " + n(r1) + " 0 1 1 " + n(cx - r1) + " " + n(cy) +
        " A " + n(r1) + " " + n(r1) + " 0 1 1 " + n(cx + r1) + " " + n(cy) +
        " M " + n(cx + r0) + " " + n(cy) +
        " A " + n(r0) + " " + n(r0) + " 0 1 0 " + n(cx - r0) + " " + n(cy) +
        " A " + n(r0) + " " + n(r0) + " 0 1 0 " + n(cx + r0) + " " + n(cy) + " Z";
    }
    function wedgePath(r0, r1, a0, a1) {
      if (a1 - a0 >= Math.PI * 2 - 0.001) return annulus(r0, r1);
      return fog ? fogPath(r0, r1, a0, a1) : plain(r0, r1, a0, a1);
    }
    function flatDeg(a) {
      var deg = a * 180 / Math.PI + 90;
      var norm = ((deg % 360) + 360) % 360;
      if (norm > 90 && norm < 270) deg += 180;
      return n(deg);
    }
    function radialDeg(a) {
      var deg = a * 180 / Math.PI;
      var norm = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (norm < Math.PI) deg += 180;
      return n(deg);
    }
    function textAt(label, a, r, font, fill, cls, radial) {
      var p = polar(r, a);
      var deg = radial ? radialDeg(a) : flatDeg(a);
      return '<text class="' + cls + '" x="' + n(p[0]) + '" y="' + n(p[1]) + '" fill="' + fill + '" font-size="' + n(font) + '" transform="rotate(' + deg + " " + n(p[0]) + " " + n(p[1]) + ')" pointer-events="none">' + esc(label) + "</text>";
    }
    var total = days.length;
    var parts = [];
    if (fog) parts.push('<circle cx="500" cy="500" r="498" fill="#000"/>');
    else parts.push('<circle cx="500" cy="500" r="498" fill="#f4f1eb"/>');
    function ringLabel(text, a0, a1, r0, r1, fill, cls) {
      var mid = (a0 + a1) / 2;
      var r = (r0 + r1) / 2;
      var arc = Math.abs(a1 - a0) * r;
      var font = Math.min(cls === "season-name" ? 18 : 15, Math.max(10, arc * 0.2));
      var width = text.length * font * 0.56;
      var thick = Math.abs(r1 - r0);
      if (width <= arc * 0.88) return textAt(text, mid, r, font, fill, "ring-label " + cls, false);
      if (width <= thick * 0.9) return textAt(text, mid, r, Math.min(font, 14), fill, "ring-label " + cls, true);
      return "";
    }
    var sid = kind === "season" ? state.slice.id : (state.slice && state.slice.season) || "";
    var weeks = weekChunks(days);
    var nW = Math.max(weeks.length, 1);
    function piecesBy(keyOf) {
      var raw = [];
      weeks.forEach(function (w, wi) {
        var a0 = angAt(wi, nW);
        var span = angAt(wi + 1, nW) - a0;
        var runs = [];
        w.days.forEach(function (d) {
          var key = keyOf(d);
          var last = runs[runs.length - 1];
          if (!last || last.key !== key) runs.push({ key: key, days: [d] });
          else last.days.push(d);
        });
        runs.forEach(function (run) {
          var startDow = run.days[0].dow;
          var endDow = run.days[run.days.length - 1].dow;
          raw.push({
            key: run.key,
            a0: a0 + span * (startDow / 7),
            a1: a0 + span * ((endDow + 1) / 7),
            days: run.days
          });
        });
      });
      var out = [];
      raw.forEach(function (p) {
        var last = out[out.length - 1];
        if (last && last.key === p.key && Math.abs(last.a1 - p.a0) < 0.0001) {
          last.a1 = p.a1;
          last.days = last.days.concat(p.days);
        } else out.push({ key: p.key, a0: p.a0, a1: p.a1, days: p.days.slice() });
      });
      return out;
    }
    if (bands.season) {
      piecesBy(function (d) { return d.season; }).forEach(function (p) {
        var id = p.key;
        var tone = colors[id] || colors.ordinary;
        var name = seasonName(id);
        var box = bands.season;
        var seasonOn = state.card === id;
        var seasonStroke = seasonOn
          ? ' stroke="' + (fog ? "#f5f5f7" : "#1c1612") + '" stroke-width="2.8"'
          : (fog ? "" : ' stroke="#b08d57" stroke-width="0.8"');
        parts.push('<g data-cut="season" data-id="' + id + '" role="button" tabindex="0" aria-pressed="' + (seasonOn ? "true" : "false") + '" aria-label="' + esc(name) + ', history of this season"><path class="slice' + (seasonOn ? " is-season" : "") + '" d="' + wedgePath(box[0], box[1], p.a0, p.a1) + '" fill="' + tone.fill + '"' + seasonStroke + '><title>' + esc(name) + "</title></path>" + ringLabel(name, p.a0, p.a1, box[0], box[1], tone.ink, "season-name") + "</g>");
      });
    }
    function joinYearMonth(pieces) {
      if (pieces.length < 2) return pieces;
      var head = pieces[0];
      var tail = pieces[pieces.length - 1];
      var turn = Math.PI * 2;
      if (head.key !== tail.key || Math.abs(tail.a1 - head.a0 - turn) > 0.01) return pieces;
      tail.a1 = head.a1 + turn;
      tail.days = tail.days.concat(head.days);
      pieces.shift();
      return pieces;
    }
    if (bands.month) {
      var monthFill = fog ? "#2a2a2c" : "#f7f3ea";
      var monthInk = fog ? "#f5f5f7" : "#6e5430";
      joinYearMonth(piecesBy(function (d) { return d.m; })).forEach(function (p) {
        var key = p.key;
        var label = MONTH_SHORT[p.days[0].m - 1];
        var full = monthLabel(key);
        var box = bands.month;
        parts.push('<g><path class="slice" d="' + wedgePath(box[0], box[1], p.a0, p.a1) + '" fill="' + monthFill + '"' + (fog ? "" : ' stroke="#b08d57" stroke-width="0.8"') + '><title>' + esc(full) + "</title></path>" + ringLabel(label, p.a0, p.a1, box[0], box[1], monthInk, "month-name") + "</g>");
      });
    }
    if (bands.week) {
      var weekFill = fog ? "#2a2a2c" : "#f7f3ea";
      var weekInk = fog ? "#f5f5f7" : "#6e5430";
      var weekBox = bands.week;
      weeks.forEach(function (w, wi) {
        var a0 = angAt(wi, nW), a1 = angAt(wi + 1, nW);
        var a = w.days[0], b = w.days[w.days.length - 1];
        var label = a.d === b.d ? String(a.d) : a.d + "–" + b.d;
        var full = weekRangeLabel(w.days);
        parts.push('<g><path class="slice" d="' + wedgePath(weekBox[0], weekBox[1], a0, a1) + '" fill="' + weekFill + '"' + (fog ? "" : ' stroke="#b08d57" stroke-width="0.8"') + '><title>' + esc(full) + "</title></path>" + ringLabel(label, a0, a1, weekBox[0], weekBox[1], weekInk, "week-name") + "</g>");
      });
    }
    var hot = null;
    var todayPath = "";
    var todayNow = new Date();
    var todayIso = todayNow.getFullYear() + "-" + pad2(todayNow.getMonth() + 1) + "-" + pad2(todayNow.getDate());
    weeks.forEach(function (w, wi) {
      var a0 = angAt(wi, nW);
      var a1 = angAt(wi + 1, nW);
      w.days.forEach(function (day) {
        var ring = dayRings[day.dow];
        var tone = colors[day.season] || colors.ordinary;
        var names = [];
        day.propers.forEach(function (idx) { names.push(PROPERS[idx].name); });
        if (day.feast && names.indexOf(day.feast) === -1) names.push(day.feast);
        var isToday = day.iso === todayIso;
        var aria = WEEKDAY[day.dow] + ", " + MONTH_NAME[day.m - 1] + " " + day.d + ", " + day.y + ", " + seasonName(day.season);
        if (names.length) aria += ", " + names.join(", ");
        if (isToday) aria += ", today";
        var fullRing = (a1 - a0) >= Math.PI * 1.99;
        var labelA = fullRing ? -Math.PI / 2 : (a0 + a1) / 2;
        var midR = (ring[0] + ring[1]) / 2;
        var arc = Math.abs(a1 - a0) * midR;
        var bandH = Math.abs(ring[1] - ring[0]);
        var label = String(day.d);
        var fontCap = kind === "week" ? 52 : 20;
        var font = Math.min(bandH * 0.58, arc * 0.46);
        font = Math.max(7.5, Math.min(fontCap, font));
        if (day.dow === 0) font = Math.min(font * 1.12, bandH * 0.72, kind === "week" ? 56 : 22);
        var width = label.length * font * 0.62;
        var radial = width > arc * 0.84;
        if (radial) font = Math.max(7, Math.min(bandH * 0.5, arc * 0.9, 16));
        var cls = "day-num" + (day.dow === 0 ? " is-sun" : "") + (day.propers.length ? " is-proper" : "") + (day.iso === state.day ? " is-on" : "");
        var stroke = "";
        if (!fog) stroke = ' stroke="#b08d57" stroke-width="0.45"';
        if (day.iso === state.day) stroke = ' stroke="' + (fog ? "#f5f5f7" : "#6e5430") + '" stroke-width="2.4"';
        var path = wedgePath(ring[0], ring[1], a0, a1);
        if (day.iso === state.day) hot = path;
        if (isToday) todayPath = path;
        var mark = "";
        if (day.feast || (day.propers.length && total <= 120)) {
          var markA = labelA + (fullRing ? 0.42 : Math.min(0.18, (a1 - a0) * 0.28));
          var markR = ring[1] - Math.min(8, bandH * 0.26);
          var mp = polar(markR, markA);
          var size = total > 80 ? 3.4 : 6;
          var ink = fog ? "#f5f5f7" : (tone.ink === "#5c4930" ? "#8a6434" : "#f7f3ea");
          mark = '<rect x="' + n(mp[0] - size / 2) + '" y="' + n(mp[1] - size / 2) + '" width="' + size + '" height="' + size + '" transform="rotate(45 ' + n(mp[0]) + " " + n(mp[1]) + ')" fill="' + ink + '" pointer-events="none"/>';
        }
        parts.push('<g data-cut="day" data-iso="' + day.iso + '" data-dow="' + day.dow + '"' + (isToday ? ' data-today="1"' : "") + ' role="button" tabindex="0" aria-label="' + esc(aria) + '"><path class="slice' + (day.iso === state.day ? " is-on" : "") + (isToday ? " is-today" : "") + '" d="' + path + '" fill="' + tone.fill + '"' + stroke + '><title>' + esc(aria) + "</title></path>" + textAt(label, labelA, midR, font, tone.ink, cls, radial) + mark + "</g>");
      });
    });
    if (!fog) {
      for (var gi = 1; gi < dayRings.length; gi++) {
        parts.push('<circle cx="500" cy="500" r="' + n(dayRings[gi][1] + 0.3) + '" fill="none" stroke="rgba(176,141,87,0.5)" stroke-width="0.55" pointer-events="none"/>');
      }
    }
    if (!fog) {
      parts.push('<circle cx="500" cy="500" r="492" fill="none" stroke="#b08d57" stroke-width="1.3" pointer-events="none"/>');
      parts.push('<circle cx="500" cy="500" r="486" fill="none" stroke="#b08d57" stroke-width="0.45" pointer-events="none"/>');
    }
    parts.push('<circle cx="500" cy="500" r="104" fill="' + (fog ? "#000" : "#f4f1eb") + '" pointer-events="none"/>');
    if (hot) parts.push('<path d="' + hot + '" fill="none" stroke="' + (fog ? "#f5f5f7" : "#6e5430") + '" stroke-width="2.6" pointer-events="none"/>');
    if (todayPath) parts.push('<path class="today-beat" d="' + todayPath + '" fill="' + (fog ? "rgba(245,245,247,0.28)" : "rgba(255,248,231,0.55)") + '" stroke="' + (fog ? "#f5f5f7" : "#fff8e7") + '" stroke-width="3.2" pointer-events="none"/>');

    var title = "The year";
    var sub = days.length + " days · 2026–27";
    var kicker = "Year B";
    if (kind === "season") {
      title = seasonName(state.slice.id);
      sub = days.length + " days";
    } else if (kind === "month") {
      title = monthLabel(state.slice.key);
      sub = (state.slice.season ? seasonName(state.slice.season) + " · " : "") + days.length + " days";
    } else if (kind === "week") {
      title = weekRangeLabel(days);
      sub = (sid ? seasonName(sid) + " · " : "") + days.length + " days";
    }
    if (state.day) {
      var picked = null;
      for (var pi = 0; pi < days.length; pi++) if (days[pi].iso === state.day) picked = days[pi];
      if (!picked) yearDays().forEach(function (d) { if (d.iso === state.day) picked = d; });
      if (picked) {
        kicker = title;
        title = MONTH_NAME[picked.m - 1] + " " + picked.d;
        var bits = [];
        picked.propers.forEach(function (idx) { bits.push(PROPERS[idx].name); });
        if (picked.feast && bits.indexOf(picked.feast) === -1) bits.push(picked.feast);
        bits.push(WEEKDAY[picked.dow]);
        bits.push(seasonName(picked.season));
        sub = bits.join(" · ");
      }
    }
    var crumbs = ['<button type="button" data-cut="year"' + (kind === "year" ? ' aria-current="page"' : "") + ">The year</button>"];
    var crumbSeason = kind === "season" ? state.slice.id : sid;
    if (!crumbSeason && kind !== "year") {
      var only = "";
      var mixed = false;
      days.forEach(function (d) {
        if (!only) only = d.season;
        else if (only !== d.season) mixed = true;
      });
      if (!mixed) crumbSeason = only;
    }
    if (crumbSeason && kind !== "year") {
      crumbs.push('<button type="button" data-cut="season" data-id="' + crumbSeason + '"' + (kind === "season" ? ' aria-current="page"' : "") + ">" + esc(seasonName(crumbSeason)) + "</button>");
    }
    if (kind === "month" || kind === "week") {
      var key = state.slice.key;
      crumbs.push('<button type="button" data-cut="month" data-key="' + key + '"' + (sid ? ' data-sid="' + sid + '"' : "") + (kind === "month" ? ' aria-current="page"' : "") + ">" + esc(monthLabel(key)) + "</button>");
    }
    if (kind === "week") crumbs.push('<span aria-current="page">' + esc(weekRangeLabel(days)) + "</span>");
    var properCount = 0;
    days.forEach(function (d) { properCount += d.propers.length; });
    var fullOn = document.body.classList.contains("is-wheel-full");
    var tools = '<div class="dial-styles" role="group" aria-label="Appearance"><button type="button" data-style="fog" aria-pressed="' + (fog ? "true" : "false") + '">Fog</button><button type="button" data-style="incense" aria-pressed="' + (fog ? "false" : "true") + '">Incense</button></div>';
    if (kind !== "year" && properCount) tools += '<button type="button" class="dial-text" data-board>Readings</button>';
    tools += '<button type="button" class="dial-text" data-fullwheel aria-pressed="' + (fullOn ? "true" : "false") + '">' + (fullOn ? "Leave full screen" : "Full screen") + "</button>";
    var read = "";
    var chosen = null;
    days.forEach(function (d) { if (d.iso === state.day) chosen = d; });
    if (state.card && SEASON_STORY[state.card]) {
      read = seasonCard(state.card);
    } else if (chosen) {
      var stripe = fog ? (colors[chosen.season] || colors.ordinary).fill : (STRIPE[chosen.season] || "#6e5430");
      var body = chosen.propers.length
        ? chosen.propers.map(function (idx) { return sundayCard(PROPERS[idx]); }).join("")
        : '<article class="sunday"><header><h3>' + esc(chosen.feast || WEEKDAY[chosen.dow]) + "</h3><time>" + esc(MONTH_NAME[chosen.m - 1] + " " + chosen.d + ", " + chosen.y) + "</time></header><p class=\"sunday-note\">" + esc(seasonName(chosen.season)) + "</p></article>";
      read = '<aside class="dial-read"><div class="sundays" style="--season:' + stripe + '">' + body + "</div></aside>";
    }
    var library = "";
    if (kind !== "year") {
      var seasonIds = {};
      days.forEach(function (d) { seasonIds[d.season] = true; });
      var found = allResources().filter(function (item) { return seasonIds[item.season] && matches(item); });
      if (found.length) library = '<div class="dial-library">' + cards(found) + "</div>";
    }
    var arrive = state.settle ? " is-arriving" : "";
    return '<div class="dial' + arrive + '" data-look="' + state.style + '"><div class="dial-bar"><nav class="crumbs" aria-label="Slice">' + crumbs.join('<span class="crumb-sep" aria-hidden="true">/</span>') + '</nav><div class="dial-tools">' + tools + '</div></div><div class="dial-stage"><div class="dial-frame"><svg class="dial-svg" viewBox="0 0 1000 1000" role="group" aria-label="Liturgical year. Sundays sit on the outer ring, and each week snakes inward to Saturday.">' + parts.join("") + '</svg><div class="dial-hub"><p class="dial-kicker" data-rest="' + esc(kicker) + '">' + esc(kicker) + "</p><h2 data-rest=\"" + esc(title) + "\">" + esc(title) + '</h2><p class="dial-sub" data-rest="' + esc(sub) + '">' + esc(sub) + "</p></div></div>" + read + "</div>" + library + "</div>";
  }

  function topics() {
    var grid = TOPICS.map(function (topic) {
      return '<button type="button" data-topic="' + topic.id + '" aria-pressed="' + (state.topic === topic.id) + '">' + esc(topic.name) + "</button>";
    }).join("");
    var rest = "";
    if (state.topic) {
      var topic = TOPICS.filter(function (t) { return t.id === state.topic; })[0];
      var chips = topic.subs.map(function (sub) {
        return '<button type="button" data-sub="' + esc(sub) + '" aria-pressed="' + (state.sub === sub) + '">' + esc(sub) + "</button>";
      }).join("");
      var list = allResources().filter(function (item) {
        return item.topic === topic.id && matches(item) && (!state.sub || item.sub === state.sub);
      });
      rest = '<div class="chips" role="group" aria-label="Subtopics">' + chips + "</div>" + cards(list);
    }
    return '<div class="topic-grid">' + grid + "</div>" + rest;
  }

  function audiences() {
    var grid = AUDIENCES.map(function (name) {
      return '<button type="button" data-audience="' + esc(name) + '" aria-pressed="' + (state.audience === name) + '">' + esc(name) + "</button>";
    }).join("");
    var rest = "";
    if (state.audience) {
      var list = allResources().filter(function (item) {
        return item.audience === state.audience && matches(item);
      });
      rest = cards(list);
    }
    return '<div class="topic-grid">' + grid + "</div>" + rest;
  }

  function formation() {
    var ages = AGES.map(function (age) {
      return '<button type="button" data-age="' + esc(age) + '" aria-pressed="' + (state.age === age) + '">' + esc(age) + "</button>";
    }).join("");
    var list = allResources().filter(function (item) {
      if (!matches(item)) return false;
      if (!state.age) return item.audience.indexOf("Children") === 0 || item.audience === "Youth" || item.format === "Youth" || item.format === "Children";
      if (state.age === "Nursery" || state.age === "Elementary") return item.audience.indexOf("Children") === 0;
      if (state.age === "Youth") return item.audience === "Youth" || item.format === "Youth";
      if (state.age === "Adults") return item.audience === "Adults";
      return item.audience === "All ages";
    });
    return '<div class="age-grid">' + ages + "</div>" + cards(list);
  }

  function byFormats(formats) {
    return cards(allResources().filter(function (item) {
      return matches(item) && formats.indexOf(item.format) !== -1;
    }));
  }

  function events() {
    return '<div class="events">' + EVENTS.map(function (event) {
      return '<article class="event"><time>' + esc(event.date) + '</time><div><h3>' + esc(event.name) + '</h3><p>' + esc(event.kind) + " · " + esc(event.where) + "</p></div></article>";
    }).join("") + "</div>";
  }

  function option(value, label, selected) {
    return '<option value="' + esc(value) + '"' + (selected ? " selected" : "") + ">" + esc(label) + "</option>";
  }

  function composer() {
    if (state.role !== "curator") return "";
    if (!state.compose) {
      return '<div class="composer-launch"><button type="button" class="signup" data-compose>Add to the library</button></div>';
    }
    var topicId = state.topic || TOPICS[0].id;
    var topic = TOPICS.filter(function (t) { return t.id === topicId; })[0];
    var formats = FORMATS.map(function (f) { return option(f, f, false); }).join("");
    var levels = LEVELS.map(function (l) { return option(l.id, l.label, l.id === state.level); }).join("");
    var postures = '<option value="">Not tagged</option>' + POSTURES.map(function (p) { return option(p.id, p.label, false); }).join("");
    var seasons = SEASONS.map(function (s) { return option(s.id, s.name, s.id === state.season); }).join("");
    var audiences = AUDIENCES.map(function (a) { return option(a, a, false); }).join("");
    var topics = TOPICS.map(function (t) { return option(t.id, t.name, t.id === topic.id); }).join("");
    var subs = topic.subs.map(function (sub) { return option(sub, sub, sub === state.sub); }).join("");
    return '<section class="composer"><h2>Add to the library <button type="button" data-compose>Close</button></h2><form id="add-form"><label>Title<input name="title" required></label><label>Format<select name="format">' + formats + '</select></label><label class="wide">Summary<input name="summary" required></label><label class="wide">Link or a few sentences<textarea name="body" placeholder="A URL, or the text itself"></textarea></label><label>Experience<select name="level">' + levels + '</select></label><label>Primary use<select name="posture">' + postures + '</select></label><label>Season<select name="season">' + seasons + '</select></label><label>Audience<select name="audience">' + audiences + '</select></label><label>Topic<select name="topic">' + topics + '</select></label><label>Subtopic<select name="sub">' + subs + '</select></label><button class="signup" type="submit">Add</button></form></section>';
  }

  function lensBar() {
    var mode = state.module === "topics" ? "topic" : state.module === "audience" ? "audience" : "time";
    function lensBtn(id, label) {
      return '<button type="button" role="radio" data-lens="' + id + '" aria-checked="' + (mode === id ? "true" : "false") + '">' + label + "</button>";
    }
    return '<div class="lens" role="radiogroup" aria-label="View">' + lensBtn("time", "Liturgical Time") + lensBtn("topic", "Topic") + lensBtn("audience", "Audience") + "</div>";
  }

  function renderStage() {
    if (document.body.getAttribute("data-desk") === "books") {
      document.body.setAttribute("data-wheel", state.style);
      return;
    }
    var analysis = document.body.getAttribute("data-desk") === "analysis";
    var body = "";
    if (analysis || state.module === "year") {
      body = state.board ? drillBoard() : dial();
    } else if (state.module === "topics") body = topics();
    else if (state.module === "audience") body = audiences();
    else if (state.module === "formation") body = formation();
    else if (state.module === "preaching") body = byFormats(["Sermon", "Commentary"]);
    else if (state.module === "prayer") body = byFormats(["Devotional", "Prayer"]);
    else body = events();
    var stage = document.getElementById("stage");
    stage.classList.toggle("is-year", analysis || state.module === "year");
    if (legacy) document.body.removeAttribute("data-wheel");
    else document.body.setAttribute("data-wheel", state.style);
    var lens = !analysis && !legacy && (state.module === "year" || state.module === "topics" || state.module === "audience") ? lensBar() : "";
    stage.innerHTML = (analysis ? "" : composer()) + lens + body;
    state.settle = false;
    var form = document.getElementById("add-form");
    if (form) {
      form.addEventListener("submit", onAdd);
      var topicSelect = form.querySelector("[name=topic]");
      var subSelect = form.querySelector("[name=sub]");
      topicSelect.addEventListener("change", function () {
        var chosen = TOPICS.filter(function (t) { return t.id === topicSelect.value; })[0];
        subSelect.innerHTML = chosen.subs.map(function (sub) { return option(sub, sub, false); }).join("");
      });
    }
  }

  function onAdd(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var body = String(data.get("body") || "").trim();
    var item = {
      id: "new-" + Date.now(),
      title: String(data.get("title") || "").trim(),
      summary: String(data.get("summary") || "").trim(),
      format: String(data.get("format")),
      level: String(data.get("level")),
      use: String(data.get("posture") || "") || null,
      season: String(data.get("season")),
      audience: String(data.get("audience")),
      topic: String(data.get("topic")),
      sub: String(data.get("sub") || ""),
      access: "Free"
    };
    if (/^https?:\/\//i.test(body)) item.link = body;
    else if (body) item.body = body;
    state.added.unshift(item);
    sessionStorage.setItem("ar-added", JSON.stringify(state.added));
    state.compose = false;
    state.level = item.level;
    sessionStorage.setItem("ar-level", state.level);
    state.module = "year";
    state.season = item.season;
    if (!legacy) {
      state.slice = { kind: "year" };
      state.board = false;
      state.depth = "year";
    }
    syncPressed();
    renderStage();
  }

  function bookName(cite) {
    var cleaned = String(cite).replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    var match = cleaned.match(/^(.+?)\s+\d+:/);
    if (!match) return null;
    var name = match[1].trim();
    if (name === "Psalm") name = "Psalms";
    for (var i = 0; i < CANON.length; i++) {
      if (CANON[i].books.indexOf(name) !== -1) return name;
    }
    return null;
  }

  function parseRef(ref) {
    var text = String(ref).replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    var toEnd = false;
    var semi = text.search(/;\s*\d+:/);
    if (semi !== -1) text = text.slice(0, semi).trim();
    var match = text.match(/^(.+?)\s+(\d+):\s*([0-9].*)$/);
    if (!match) return null;
    var book = match[1].trim() === "Psalm" ? "Psalms" : match[1].trim();
    if (!bookName(book === "Psalms" ? "Psalm 1:1" : book + " 1:1")) return null;
    var body = match[3];
    if (/\d[a-z]?\s*-\s*\d+:/i.test(body)) {
      toEnd = true;
      body = body.split(/\s*-\s*\d+:/)[0];
    }
    var verses = [];
    body.split(",").forEach(function (part) {
      part = part.replace(/[a-z]/ig, "").trim();
      if (!part) return;
      var bits = part.split(/\s*-\s*/);
      var start = parseInt(bits[0], 10);
      var end = bits[1] ? parseInt(bits[1], 10) : start;
      if (!start || !end || end < start || end - start > 120) return;
      for (var i = start; i <= end; i++) verses.push(i);
    });
    if (!verses.length) return null;
    return { book: book, chapter: Number(match[2]), verses: verses, toEnd: toEnd };
  }

  function bibleHeader(title, back) {
    return '<div class="bible-bar">' +
      (back ? '<button class="back" type="button" data-bible-back>' + back + "</button>" : "") +
      '<h2 class="grow">' + esc(title) + '</h2><div class="bible-tools">' +
      '<button type="button" data-nums aria-pressed="' + state.bible.showNums + '" aria-label="Show chapter and verse numbers for 7 seconds">#</button>' +
      '<button type="button" data-large aria-pressed="' + state.bible.large + '" aria-label="Larger type">Aa</button>' +
      '<button type="button" data-full aria-pressed="' + state.bible.full + '" aria-label="Full page">' + (state.bible.full ? "Exit" : "Full") + "</button>" +
      '<button type="button" data-bible-close aria-label="Close">Close</button></div></div>';
  }

  function renderBible() {
    var pane = document.getElementById("bible");
    var opener = document.getElementById("bible-open");
    pane.hidden = !state.bible.open;
    pane.classList.toggle("is-full", state.bible.full);
    pane.classList.toggle("is-large", state.bible.large);
    opener.setAttribute("aria-pressed", state.bible.open ? "true" : "false");
    if (!state.bible.open) { pane.innerHTML = ""; return; }
    var html = "";
    if (state.bible.level === "testament") {
      html = bibleHeader("Bible", "") + '<div class="bible-body"><p class="lede">King James Version. Choose a testament.</p><ul class="nav-list"><li><button type="button" data-testament="Old Testament">Old Testament</button></li><li><button type="button" data-testament="New Testament">New Testament</button></li></ul></div>';
    } else if (state.bible.level === "section") {
      var sections = CANON.filter(function (s) { return s.testament === state.bible.testament; });
      html = bibleHeader(state.bible.testament, "Testaments") + '<div class="bible-body"><ul class="nav-list">' + sections.map(function (s) {
        return '<li><button type="button" data-section="' + esc(s.name) + '">' + esc(s.name) + "</button></li>";
      }).join("") + "</ul></div>";
    } else if (state.bible.level === "books") {
      var section = CANON.filter(function (s) { return s.name === state.bible.section; })[0];
      html = bibleHeader(section.name, "Sections") + '<div class="bible-body"><ul class="nav-list">' + section.books.map(function (book) {
        return '<li><button type="button" data-book="' + esc(book) + '">' + esc(book) + "</button></li>";
      }).join("") + "</ul></div>";
    } else {
      var readTitle = state.bible.book || "Bible";
      if (state.bible.chapter) readTitle += " " + state.bible.chapter;
      var backLabel = "Books";
      if (state.bible.xrefHome) {
        var home = state.bible.xrefHome;
        var homeName = home.book === "Psalms" ? "Psalm" : home.book;
        backLabel = homeName + " " + home.chapter;
      }
      html = bibleHeader(readTitle, backLabel) + '<div class="bible-body" id="bible-prose"><p class="lede">Opening the book…</p></div>';
    }
    pane.innerHTML = html;
    if (state.bible.level === "read") loadBook();
  }

  var xrefCache = {};
  var xrefWaiters = {};

  function loadXrefs(book, done) {
    if (Object.prototype.hasOwnProperty.call(xrefCache, book)) { done(xrefCache[book]); return; }
    if (xrefWaiters[book]) { xrefWaiters[book].push(done); return; }
    xrefWaiters[book] = [done];
    fetch("cross-refs/" + slug(book) + ".json").then(function (res) {
      if (!res.ok) throw new Error("missing");
      return res.json();
    }).then(function (data) {
      xrefCache[book] = data;
    }).catch(function () {
      xrefCache[book] = null;
    }).then(function () {
      var waiters = xrefWaiters[book] || [];
      delete xrefWaiters[book];
      waiters.forEach(function (fn) { fn(xrefCache[book]); });
    });
  }

  function xrefHtml(data, chapter) {
    if (!data) {
      return '<section class="xrefs" aria-label="Cross references"><h3>Cross references</h3><p class="xref-note">Cross references for this chapter did not open.</p></section>';
    }
    var rows = data[chapter - 1] || [];
    var items = [];
    rows.forEach(function (refs, index) {
      if (!refs || !refs.length) return;
      var verse = index + 1;
      var links = refs.map(function (cite) {
        return '<button type="button" data-ref="' + esc(cite) + '">' + esc(citeLabel(cite)) + "</button>";
      }).join("");
      items.push('<li><button type="button" class="xref-verse" data-xref-verse="v-' + chapter + "-" + verse + '" aria-label="Verse ' + verse + '">' + verse + '</button><span class="xref-refs">' + links + "</span></li>");
    });
    var note = items.length
      ? "Treasury of Scripture Knowledge."
      : "This chapter has no cross references in the Treasury of Scripture Knowledge.";
    return '<section class="xrefs" aria-label="Cross references"><h3>Cross references</h3><p class="xref-note">' + note + "</p>" + (items.length ? "<ol>" + items.join("") + "</ol>" : "") + "</section>";
  }

  function mountXrefs(host, book, chapter) {
    if (!host || !state.bible.xrefs || state.bible.book !== book || Number(state.bible.chapter) !== Number(chapter)) return;
    var old = host.querySelector(".xrefs");
    if (old) old.remove();
    host.insertAdjacentHTML("afterbegin", xrefHtml(xrefCache[book], chapter));
    var block = host.querySelector(".xrefs");
    if (block) block.scrollIntoView({ block: "start" });
  }

  function loadBook() {
    var book = state.bible.book;
    var target = document.getElementById("bible-prose");
    if (!target) return;
    var ready = function (chapters) {
      var show = state.bible.showNums;
      var html = '<div class="prose">' + chapters.map(function (verses, index) {
        var n = index + 1;
        var body = verses.map(function (text, i) {
          var v = i + 1;
          var num = show ? '<sup class="vnum">' + n + ":" + v + "</sup>" : "";
          return '<span class="verse" id="v-' + n + "-" + v + '">' + num + esc(text) + " </span>" + (POETRY[book] ? "<br>" : "");
        }).join("");
        return '<section class="chapter" id="c-' + n + '"><h3>' + n + "</h3><p>" + body + "</p></section>";
      }).join("") + "</div>";
      target.innerHTML = html;
      var hits = state.bible.verses.slice();
      if (state.bible.toEnd && hits.length && chapters[state.bible.chapter - 1]) {
        var from = hits[0];
        var count = chapters[state.bible.chapter - 1].length;
        hits = [];
        for (var i = from; i <= count; i++) hits.push(i);
      }
      hits.forEach(function (v) {
        var el = document.getElementById("v-" + state.bible.chapter + "-" + v);
        if (el) el.classList.add("verse-hit");
      });
      if (state.bible.xrefs) {
        target.insertAdjacentHTML("afterbegin", '<section class="xrefs" aria-label="Cross references"><h3>Cross references</h3><p class="xref-note">Opening the Treasury of Scripture Knowledge…</p></section>');
        var wantBook = book;
        var wantChapter = state.bible.chapter;
        loadXrefs(wantBook, function () {
          mountXrefs(document.getElementById("bible-prose"), wantBook, wantChapter);
        });
        return;
      }
      var hit = target.querySelector(".verse-hit");
      var chapter = document.getElementById("c-" + state.bible.chapter);
      if (hit) hit.scrollIntoView({ block: "center" });
      else if (chapter) chapter.scrollIntoView({ block: "start" });
    };
    if (state.books[book]) { ready(state.books[book]); return; }
    fetch("bible/" + slug(book) + ".json").then(function (res) {
      if (!res.ok) throw new Error("missing");
      return res.json();
    }).then(function (chapters) {
      state.books[book] = chapters;
      ready(chapters);
    }).catch(function () {
      target.innerHTML = '<p class="empty">This book did not open.</p>';
    });
  }

  function openBibleAt(ref, opts) {
    var parsed = ref ? parseRef(ref) : null;
    state.bible.open = true;
    if (!parsed) {
      state.bible.level = "testament";
      state.bible.testament = null;
      state.bible.section = null;
      state.bible.book = null;
      state.bible.chapter = null;
      state.bible.verses = [];
      state.bible.toEnd = false;
    } else {
      state.bible.level = "read";
      state.bible.book = parsed.book;
      state.bible.chapter = parsed.chapter;
      state.bible.verses = parsed.verses;
      state.bible.toEnd = !!parsed.toEnd;
      CANON.forEach(function (section) {
        if (section.books.indexOf(parsed.book) !== -1) {
          state.bible.testament = section.testament;
          state.bible.section = section.name;
        }
      });
    }
    if (opts && opts.xrefs && parsed) {
      state.bible.xrefs = true;
      state.bible.xrefHome = null;
      state.bible.verses = [];
      state.bible.toEnd = false;
    }
    renderBible();
  }

  document.addEventListener("ar-open-chapter", function (event) {
    var ref = event.detail && event.detail.ref;
    openBibleAt(ref || "", { xrefs: true });
  });

  function syncPressed() {
    document.querySelectorAll("[data-role]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-role") === state.role ? "true" : "false");
    });
    document.querySelectorAll("[data-level]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-level") === state.level ? "true" : "false");
    });
    document.querySelectorAll("[data-posture]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-posture") === state.posture ? "true" : "false");
    });
    document.querySelectorAll("[data-module]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-module") === state.module ? "true" : "false");
    });
    var person = document.querySelector(".person-btn");
    if (person) {
      var levelObj = null;
      var postureObj = null;
      LEVELS.forEach(function (l) { if (l.id === state.level) levelObj = l; });
      POSTURES.forEach(function (p) { if (p.id === state.posture) postureObj = p; });
      person.setAttribute("aria-label", "Experience, " + (levelObj ? levelObj.label : "scholarship") + (postureObj ? ", " + postureObj.label : ", no posture filter"));
    }
  }

  document.body.addEventListener("click", function (event) {
    var expRoot = document.querySelector(".experience");
    var expMenu = document.getElementById("experience-menu");
    if (expMenu && !expMenu.hasAttribute("hidden") && expRoot && !expRoot.contains(event.target)) {
      expMenu.setAttribute("hidden", "");
      var opener = expRoot.querySelector(".person-btn");
      if (opener) opener.setAttribute("aria-expanded", "false");
    }
    var appNav = document.querySelector(".app-nav");
    var appMenu = document.getElementById("app-menu");
    if (appMenu && !appMenu.hasAttribute("hidden") && appNav && !appNav.contains(event.target)) {
      appMenu.setAttribute("hidden", "");
      var menuOpener = document.getElementById("app-menu-btn");
      if (menuOpener) menuOpener.setAttribute("aria-expanded", "false");
    }
    var zoomRoot = document.querySelector(".magnifier");
    var zoomMenu = document.getElementById("zoom-menu");
    if (zoomMenu && !zoomMenu.hasAttribute("hidden") && zoomRoot && !zoomRoot.contains(event.target)) {
      zoomMenu.setAttribute("hidden", "");
      var zoomOpener = document.getElementById("zoom-btn");
      if (zoomOpener) zoomOpener.setAttribute("aria-expanded", "false");
    }
    if (event.target.closest("#app-full")) {
      toggleAppFull();
      return;
    }
    var vizPath = event.composedPath ? event.composedPath() : [];
    var inViz = event.target.closest(".viz-panel");
    if (!inViz) {
      for (var vi = 0; vi < vizPath.length; vi++) {
        if (vizPath[vi].classList && vizPath[vi].classList.contains("viz-panel")) { inViz = true; break; }
      }
    }
    if (inViz) return;
    var menuBtn = event.target.closest("#app-menu-btn");
    if (menuBtn && appMenu) {
      var menuOpen = appMenu.hasAttribute("hidden");
      if (menuOpen) appMenu.removeAttribute("hidden");
      else appMenu.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", menuOpen ? "true" : "false");
      return;
    }
    var zoomBtn = event.target.closest("#zoom-btn");
    if (zoomBtn && zoomMenu) {
      var zoomOpen = zoomMenu.hasAttribute("hidden");
      if (zoomOpen) zoomMenu.removeAttribute("hidden");
      else zoomMenu.setAttribute("hidden", "");
      zoomBtn.setAttribute("aria-expanded", zoomOpen ? "true" : "false");
      return;
    }
    var zoomAct = event.target.closest("[data-zoom]");
    if (zoomAct) {
      stepZoom(zoomAct.getAttribute("data-zoom"));
      return;
    }
    var personBtn = event.target.closest(".person-btn");
    if (personBtn) {
      var menu = document.getElementById("experience-menu");
      if (!menu) return;
      var willOpen = menu.hasAttribute("hidden");
      if (willOpen) menu.removeAttribute("hidden");
      else menu.setAttribute("hidden", "");
      personBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      return;
    }
    if (event.target.closest("[data-compose]")) {
      state.compose = !state.compose;
      renderStage();
      return;
    }
    var role = event.target.closest("[data-role]");
    if (role) {
      state.role = role.getAttribute("data-role");
      sessionStorage.setItem("ar-role", state.role);
      syncPressed();
      renderStage();
      return;
    }
    var level = event.target.closest("[data-level]");
    if (level) {
      state.level = level.getAttribute("data-level");
      sessionStorage.setItem("ar-level", state.level);
      syncPressed();
      renderStage();
      return;
    }
    var posture = event.target.closest("[data-posture]");
    if (posture) {
      state.posture = posture.getAttribute("data-posture") || "";
      if (state.posture) sessionStorage.setItem("ar-posture", state.posture);
      else sessionStorage.removeItem("ar-posture");
      syncPressed();
      renderStage();
      return;
    }
    var lensBtn = event.target.closest("[data-lens]");
    if (lensBtn && !legacy) {
      var lensId = lensBtn.getAttribute("data-lens");
      if (lensId === "topic") state.module = "topics";
      else if (lensId === "audience") state.module = "audience";
      else {
        state.module = "year";
        state.board = false;
        state.depth = "year";
      }
      syncPressed();
      renderStage();
      return;
    }
    var moduleBtn = event.target.closest("[data-module]");
    if (moduleBtn) {
      var nextModule = moduleBtn.getAttribute("data-module");
      if (nextModule === "year") {
        if (legacy) {
          if (state.depth === "season") state.settle = true;
          state.depth = "year";
        } else {
          state.board = false;
          state.depth = "year";
          state.slice = { kind: "year" };
          state.day = null;
          state.card = null;
          state.settle = true;
        }
      }
      state.module = nextModule;
      syncPressed();
      renderStage();
      return;
    }
    if (event.target.closest("[data-year]")) {
      if (!legacy) {
        state.board = false;
        state.depth = "year";
        state.settle = true;
        renderStage();
      } else {
        state.depth = "year";
        state.settle = true;
        renderStage();
      }
      var scroller = document.getElementById("stage");
      if (scroller) scroller.scrollTop = 0;
      return;
    }
    if (event.target.closest("[data-fullwheel]")) {
      toggleWheelFull();
      renderStage();
      return;
    }
    var styleBtn = event.target.closest("button[data-style]");
    if (styleBtn && !legacy) {
      state.style = styleBtn.getAttribute("data-style") === "fog" ? "fog" : "incense";
      sessionStorage.setItem("ar-wheel-style", state.style);
      renderStage();
      return;
    }
    if (event.target.closest("[data-board]")) {
      if (state.slice.kind === "season") state.season = state.slice.id;
      else if (state.slice.season) state.season = state.slice.season;
      else if (state.day) {
        yearDays().forEach(function (d) { if (d.iso === state.day) state.season = d.season; });
      }
      state.board = true;
      state.depth = "season";
      renderStage();
      var boardPane = document.getElementById("stage");
      if (boardPane) boardPane.scrollTop = 0;
      return;
    }
    var cut = event.target.closest("[data-cut]");
    if (cut && !legacy) {
      var cutKind = cut.getAttribute("data-cut");
      if (cutKind === "year") {
        state.slice = { kind: "year" };
        state.card = null;
      } else if (cutKind === "season") {
        var seasonId = cut.getAttribute("data-id");
        if (!seasonId || !SEASON_STORY[seasonId] || state.slice.kind !== "year") return;
        state.card = seasonId;
        state.board = false;
        state.depth = "year";
        renderStage();
        return;
      } else if (cutKind === "month" || cutKind === "week") {
        return;
      } else if (cutKind === "day") {
        var iso = cut.getAttribute("data-iso");
        state.day = iso;
        state.card = null;
        yearDays().forEach(function (d) { if (d.iso === iso) state.season = d.season; });
      }
      state.board = false;
      state.depth = "year";
      renderStage();
      return;
    }
    var season = event.target.closest("[data-season]");
    if (season && legacy) {
      state.season = season.getAttribute("data-season");
      state.depth = "year";
      renderStage();
      return;
    }
    var topic = event.target.closest("[data-topic]");
    if (topic) {
      state.topic = topic.getAttribute("data-topic");
      state.sub = null;
      renderStage();
      return;
    }
    var sub = event.target.closest("[data-sub]");
    if (sub) {
      var nextSub = sub.getAttribute("data-sub");
      state.sub = state.sub === nextSub ? null : nextSub;
      renderStage();
      return;
    }
    var audience = event.target.closest("[data-audience]");
    if (audience) {
      state.audience = audience.getAttribute("data-audience");
      renderStage();
      return;
    }
    var age = event.target.closest("[data-age]");
    if (age) { state.age = age.getAttribute("data-age"); renderStage(); return; }
    var body = event.target.closest("[data-body]");
    if (body) {
      var id = body.getAttribute("data-body");
      state.openBody[id] = !state.openBody[id];
      renderStage();
      return;
    }
    var jump = event.target.closest("[data-xref-verse]");
    if (jump) {
      var vid = jump.getAttribute("data-xref-verse");
      var verseEl = vid && document.getElementById(vid);
      var prose = document.getElementById("bible-prose");
      if (prose) prose.querySelectorAll(".verse-hit").forEach(function (el) { el.classList.remove("verse-hit"); });
      if (verseEl) {
        verseEl.classList.add("verse-hit");
        verseEl.scrollIntoView({ block: "center" });
      }
      return;
    }
    var ref = event.target.closest("[data-ref]");
    if (ref) {
      if (ref.closest(".xrefs") && state.bible.xrefs && state.bible.level === "read") {
        state.bible.xrefHome = {
          book: state.bible.book,
          chapter: state.bible.chapter,
          testament: state.bible.testament,
          section: state.bible.section
        };
      } else {
        state.bible.xrefHome = null;
      }
      state.bible.xrefs = false;
      openBibleAt(ref.getAttribute("data-ref"));
      return;
    }
    if (event.target.closest("#bible-open")) {
      if (state.bible.open) { state.bible.open = false; renderBible(); }
      else {
        state.bible.xrefs = false;
        state.bible.xrefHome = null;
        openBibleAt(null);
      }
      return;
    }
    if (event.target.closest("[data-bible-close]")) { state.bible.open = false; renderBible(); return; }
    if (event.target.closest("[data-full]")) { state.bible.full = !state.bible.full; renderBible(); return; }
    if (event.target.closest("[data-large]")) { state.bible.large = !state.bible.large; renderBible(); return; }
    if (event.target.closest("[data-nums]")) {
      state.bible.showNums = !state.bible.showNums;
      if (numTimer) clearTimeout(numTimer);
      if (state.bible.showNums) {
        numTimer = setTimeout(function () {
          state.bible.showNums = false;
          renderBible();
        }, 7000);
      }
      renderBible();
      return;
    }
    if (event.target.closest("[data-testament]")) {
      state.bible.testament = event.target.closest("[data-testament]").getAttribute("data-testament");
      state.bible.level = "section";
      renderBible();
      return;
    }
    if (event.target.closest("[data-section]")) {
      state.bible.section = event.target.closest("[data-section]").getAttribute("data-section");
      state.bible.level = "books";
      renderBible();
      return;
    }
    if (event.target.closest("#bible [data-book]")) {
      state.bible.book = event.target.closest("[data-book]").getAttribute("data-book");
      state.bible.chapter = 1;
      state.bible.verses = [];
      state.bible.toEnd = false;
      state.bible.xrefs = false;
      state.bible.xrefHome = null;
      state.bible.level = "read";
      renderBible();
      return;
    }
    if (event.target.closest("[data-bible-back]")) {
      if (state.bible.level === "read" && state.bible.xrefHome) {
        var homeBack = state.bible.xrefHome;
        state.bible.xrefHome = null;
        state.bible.xrefs = true;
        state.bible.book = homeBack.book;
        state.bible.chapter = homeBack.chapter;
        state.bible.testament = homeBack.testament;
        state.bible.section = homeBack.section;
        state.bible.verses = [];
        state.bible.toEnd = false;
        state.bible.level = "read";
        renderBible();
        return;
      }
      state.bible.xrefs = false;
      state.bible.xrefHome = null;
      if (state.bible.level === "read") state.bible.level = "books";
      else if (state.bible.level === "books") state.bible.level = "section";
      else state.bible.level = "testament";
      renderBible();
    }
  });

  function syncAppFull() {
    var btn = document.getElementById("app-full");
    if (!btn) return;
    var on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Leave full screen" : "Full screen");
    var enter = btn.querySelector(".full-enter");
    var leave = btn.querySelector(".full-leave");
    if (enter) enter.hidden = on;
    if (leave) leave.hidden = !on;
  }
  function toggleAppFull() {
    var exit = document.exitFullscreen || document.webkitExitFullscreen;
    if ((document.fullscreenElement || document.webkitFullscreenElement) && exit) {
      var leaving = exit.call(document);
      if (leaving && leaving.catch) leaving.catch(function () {});
      return;
    }
    var root = document.documentElement;
    var req = root.requestFullscreen || root.webkitRequestFullscreen;
    if (!req) return;
    var pending = req.call(root);
    if (pending && pending.catch) pending.catch(function () {});
  }
  function toggleWheelFull() {
    if (document.body.classList.contains("is-wheel-full")) {
      document.body.classList.remove("is-wheel-full");
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (document.fullscreenElement && exit) exit.call(document);
      return;
    }
    document.body.classList.add("is-wheel-full");
    var root = document.documentElement;
    var req = root.requestFullscreen || root.webkitRequestFullscreen;
    if (req) {
      var pending = req.call(root);
      if (pending && pending.catch) pending.catch(function () {});
    }
  }
  function onWheelFullChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && document.body.classList.contains("is-wheel-full")) {
      document.body.classList.remove("is-wheel-full");
      if (!legacy && state.module === "year" && !state.board) renderStage();
    }
    syncAppFull();
  }
  syncAppFull();
  document.addEventListener("fullscreenchange", onWheelFullChange);
  document.addEventListener("webkitfullscreenchange", onWheelFullChange);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var openMenu = document.getElementById("experience-menu");
      if (openMenu && !openMenu.hasAttribute("hidden")) {
        openMenu.setAttribute("hidden", "");
        var person = document.querySelector(".person-btn");
        if (person) person.setAttribute("aria-expanded", "false");
      }
    }
    if (event.key === "Escape" && document.body.classList.contains("is-wheel-full") && !document.fullscreenElement) {
      document.body.classList.remove("is-wheel-full");
      if (!legacy && state.module === "year") renderStage();
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    var fromSvg = event.target && event.target.closest && event.target.closest("svg [data-cut]");
    if (!fromSvg) return;
    event.preventDefault();
    fromSvg.click();
  });
  document.addEventListener("mouseover", function (event) {
    if (legacy || state.module !== "year" || state.board) return;
    var hub = document.querySelector(".dial-hub");
    if (!hub) return;
    var dayEl = event.target.closest && event.target.closest("[data-cut='day']");
    var title = hub.querySelector("h2");
    var sub = hub.querySelector(".dial-sub");
    var kicker = hub.querySelector(".dial-kicker");
    if (!title || !sub || !kicker) return;
    if (!dayEl) {
      if (hub.getAttribute("data-hover") === "1") {
        hub.setAttribute("data-hover", "0");
        kicker.textContent = kicker.getAttribute("data-rest") || "";
        title.textContent = title.getAttribute("data-rest") || "";
        sub.textContent = sub.getAttribute("data-rest") || "";
        var hot = document.querySelector(".dial-svg .slice.is-hot");
        if (hot) hot.classList.remove("is-hot");
      }
      return;
    }
    var iso = dayEl.getAttribute("data-iso");
    var day = null;
    yearDays().forEach(function (d) { if (d.iso === iso) day = d; });
    if (!day) return;
    hub.setAttribute("data-hover", "1");
    kicker.textContent = WEEKDAY[day.dow];
    title.textContent = MONTH_NAME[day.m - 1] + " " + day.d;
    var bits = [];
    day.propers.forEach(function (idx) { bits.push(PROPERS[idx].name); });
    if (day.feast && bits.indexOf(day.feast) === -1) bits.push(day.feast);
    bits.push(seasonName(day.season));
    sub.textContent = bits.join(" · ");
    var prev = document.querySelector(".dial-svg .slice.is-hot");
    if (prev) prev.classList.remove("is-hot");
    var slice = dayEl.querySelector(".slice");
    if (slice) slice.classList.add("is-hot");
  });

  document.getElementById("search").addEventListener("input", function (event) {
    state.query = event.target.value.trim();
    if (document.body.getAttribute("data-desk") === "books") {
      document.dispatchEvent(new CustomEvent("ar-shelf-search"));
      return;
    }
    renderStage();
  });

  function mountExperience() {
    var menu = document.getElementById("experience-menu");
    if (!menu || menu.getAttribute("data-ready") === "1") return;
    var heart = '<svg class="exp-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.2s-6.5-4.1-6.5-7.8C5.5 8.6 7.2 7 9.3 7c1.2 0 2.2.6 2.7 1.5.5-.9 1.5-1.5 2.7-1.5 2.1 0 3.8 1.6 3.8 4.4 0 3.7-6.5 7.8-6.5 7.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    var mind = '<svg class="exp-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 18.5v-1.2c-1.8-.5-3.2-2-3.2-4 0-1.3.6-2.3 1.3-3.1-.2-.5-.3-1-.1-1.6.3-.8 1.1-1.4 2-1.5.4-1.1 1.4-1.8 2.6-1.8 1.3 0 2.4.8 2.8 2 .8-.2 1.7 0 2.3.6.6.6.8 1.5.5 2.3.8.7 1.4 1.6 1.4 2.8 0 2.2-1.7 4-3.8 4.3V18.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.2v8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    var icons = { devotional: heart, educational: mind, both: heart + mind };
    var levels = LEVELS.map(function (l) {
      return '<button type="button" class="exp-option" data-level="' + l.id + '" aria-pressed="false"><span class="exp-name">' + esc(l.label) + '</span><span class="exp-desc">' + esc(l.description) + '</span></button>';
    }).join("");
    var postures = '<button type="button" class="exp-option" data-posture="" aria-pressed="false"><span class="exp-name">Any</span><span class="exp-desc">Shows every resource, including those with no primary-use tag.</span></button>' +
      POSTURES.map(function (p) {
        return '<button type="button" class="exp-option" data-posture="' + p.id + '" aria-pressed="false"><span class="exp-name">' + icons[p.id] + esc(p.label) + '</span><span class="exp-desc">' + esc(p.description) + '</span></button>';
      }).join("");
    menu.innerHTML = '<p class="exp-kicker">Scholarship</p><div class="exp-list" role="group" aria-label="Scholarship">' + levels + '</div><p class="exp-kicker">Posture <span>optional</span></p><div class="exp-list" role="group" aria-label="Posture">' + postures + "</div>";
    menu.setAttribute("data-ready", "1");
  }

  var ZOOM_STEPS = [1, 1.5, 2, 3, 4, 6, 8];
  function currentZoom() {
    var z = parseFloat(sessionStorage.getItem("ar-zoom") || "1");
    return z && z >= 1 ? z : 1;
  }
  function applyZoom() {
    var box = document.getElementById("viz-zoom") || document.getElementById("stage");
    var z = currentZoom();
    if (box) box.style.zoom = z === 1 ? "" : String(z);
    var label = document.getElementById("zoom-label");
    if (label) label.textContent = z === 1 ? "Fit" : Math.round(z * 100) + "%";
    var zoomBtn = document.getElementById("zoom-btn");
    if (zoomBtn) zoomBtn.setAttribute("aria-pressed", z === 1 ? "false" : "true");
  }
  function stepZoom(dir) {
    var z = currentZoom();
    var next = z;
    if (dir === "fit") next = 1;
    else if (dir === "in") {
      next = ZOOM_STEPS[ZOOM_STEPS.length - 1];
      for (var i = 0; i < ZOOM_STEPS.length; i++) if (ZOOM_STEPS[i] > z + 0.01) { next = ZOOM_STEPS[i]; break; }
    } else if (dir === "out") {
      next = ZOOM_STEPS[0];
      for (var j = ZOOM_STEPS.length - 1; j >= 0; j--) if (ZOOM_STEPS[j] < z - 0.01) { next = ZOOM_STEPS[j]; break; }
    }
    sessionStorage.setItem("ar-zoom", String(next));
    applyZoom();
  }

  mountExperience();
  syncPressed();
  applyZoom();
  renderStage();
})();
