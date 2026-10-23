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
  var TYPES = [
    { id: "sermon", name: "Sermon", about: "Full sermon manuscripts, audio recordings, or video" },
    { id: "series", name: "Sermon Series", about: "Multi-week preaching series with outlines, manuscripts, and support materials" },
    { id: "commentary", name: "Commentary", about: "Exegetical and homiletical commentary on Scripture passages" },
    { id: "curriculum", name: "Curriculum", about: "Multi-session formation courses with leader guides and participant materials" },
    { id: "devotional", name: "Devotional", about: "Daily devotions, reflections, prayer guides, and meditations" },
    { id: "liturgical", name: "Liturgical Resource", about: "Prayers, collects, seasonal liturgies, service orders, and worship aids" },
    { id: "study", name: "Study Guide", about: "Discussion guides for books, films, or parish topics" },
    { id: "article", name: "Article / Essay", about: "Theological, pastoral, or cultural essays by Anglican scholars and leaders" },
    { id: "book", name: "Book", about: "Full-length works available for purchase or free download; also featured reviews" },
    { id: "video", name: "Video", about: "Lectures, conference talks, teaching series, and documentary content" },
    { id: "audio", name: "Podcast / Audio", about: "Sermons, interviews, and teaching in audio format" },
    { id: "prayer", name: "Prayer Guide", about: "Standalone prayer resources: litanies, intercessory guides, daily prayer aids" },
    { id: "youth", name: "Youth / Children\u2019s Resource", about: "Age-specific materials cross-tagged to other dimensions" },
    { id: "retreat", name: "Retreat Resource", about: "Day retreat and silent retreat guides for individuals or groups" }
  ];
  var FORMAT_TYPE = { Sermon: "sermon", Commentary: "commentary", Curriculum: "curriculum", Devotional: "devotional", Prayer: "prayer", Article: "article", Book: "book", Youth: "youth", Children: "youth" };
  var CANON_MEDIA = ["Physical Bible", "Physical Torah", "Individual book", "Audiobook", "Podcast", "YouTube audio"];
  var SHELF_LANDINGS = ["canonical"];
  var WORKS = [
    { id: "national:declaration", label: "Declaration of Independence" },
    { id: "national:washington", label: "Washington\u2019s Thanksgiving Proclamation" },
    { id: "national:lincoln", label: "Lincoln\u2019s Thanksgiving Proclamation" },
    { id: "national:hjres", label: "H.J. Res. 41, 1941" },
    { id: "eccles:apocrypha", label: "The Apocrypha" },
    { id: "eccles:bcp", label: "The Book of Common Prayer" },
    { id: "eccles:altar", label: "The Altar Book" },
    { id: "eccles:articles", label: "The Thirty-Nine Articles of Religion" },
    { id: "eccles:homilies", label: "The Book of Homilies" },
    { id: "eccles:polity", label: "Of the Laws of Ecclesiastical Polity" },
    { id: "eccles:hymnal", label: "The Hymnal 1982" }
  ];
  var AUDIENCES = ["Children 6–12", "Youth", "Adults", "Clergy", "All ages"];
  var AUDIENCE_ABOUT = {
    "Children 6–12": "Elementary-age formation, Sunday school curricula, children’s sermons.",
    "Youth": "Middle school (11–14): confirmation preparation, small group resources, devotionals. High school (14–18): apologetics, identity formation, leadership development.",
    "Adults": "The broad adult formation and parish education category.",
    "Clergy": "Theological and pastoral resources for ordained and lay leaders.",
    "All ages": "Resources suitable for mixed-age parish use."
  };
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
    { id: "scripture", name: "Scripture & preaching", subs: ["Interpretation", "Sermon series", "Expository"], about: "Reading the Bible, Biblical Interpretation, Sermon Series, Expository Preaching, Lectio Divina, OT/NT Survey" },
    { id: "prayer", name: "Prayer", subs: ["Daily Office", "Intercession", "Retreats"], about: "Daily Office, Contemplative Prayer, Intercession, Fasting, Spiritual Direction, Retreats, Devotional Life" },
    { id: "sacrament", name: "Sacramental life", subs: ["Baptism", "Eucharist", "Marriage", "Orders"], about: "Baptism, Eucharist, Confirmation, Marriage, Holy Orders, Unction, Reconciliation" },
    { id: "pastoral", name: "Pastoral ministry", subs: ["Grief", "Healing", "Family", "Conflict"], about: "Grief & Loss, Illness & Healing, Marriage & Family, Conflict, Mental Health, Crisis Pastoral Care" },
    { id: "evangelism", name: "Evangelism & the great commission", subs: [], about: "" },
    { id: "mission", name: "Mission", subs: ["Witness", "Parish renewal"], about: "Church Planting, Personal Witness, Cross-Cultural Mission, Global South, Parish Renewal" },
    { id: "worship", name: "Church & worship", subs: ["Liturgy", "Music"], about: "Liturgy, Music & Hymnody, Architecture & Space, Preaching, Anglican Tradition" },
    { id: "ethics", name: "Ethics & culture", subs: ["Vocation", "Justice"], about: "Bioethics, Sexual Ethics, Justice & Poverty, Creation Care, Political Theology, Vocation" },
    { id: "formation", name: "Formation", subs: ["Catechesis", "Adult formation", "Small groups"], about: "Discipleship, Catechesis, Confirmation, Adult Formation, Small Groups, Mentoring" },
    { id: "leadership", name: "Leadership", subs: ["Vestry", "Stewardship", "Clergy wellness"], about: "Vestry Development, Stewardship, Strategic Planning, Clergy Wellness, Church Law" },
    { id: "doctrine", name: "Theology & doctrine", subs: ["Trinity", "Incarnation", "Scripture", "Anglicanism"], about: "Trinity, Incarnation, Atonement, Resurrection, Eschatology, Scripture & Authority, Creeds & Councils, Anglicanism" }
  ];
  var AGES = ["Nursery", "Elementary", "Youth", "Adults", "All ages"];
  var CANON = [
    { testament: "Old Testament", name: "Law", books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"] },
    { testament: "Old Testament", name: "History", books: ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"] },
    { testament: "Old Testament", name: "Wisdom", books: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"] },
    { testament: "Old Testament", name: "Major Prophets", books: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"] },
    { testament: "Old Testament", name: "Minor Prophets", books: ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"] },
    { testament: "New Testament", name: "Gospels", books: ["Matthew", "Mark", "Luke", "John"] },
    { testament: "New Testament", name: "Church History", books: ["Acts"] },
    { testament: "New Testament", name: "Pauline letters", books: ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"] },
    { testament: "New Testament", name: "General letters", books: ["Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"] },
    { testament: "New Testament", name: "Prophecy", books: ["Revelation"] }
  ];
  var BOOK_BLURBS = {
    "Genesis": "In chapters 1-11, the book of Genesis recounts God’s good world and humanity’s repeated rebellion. How will God restore blessing to the world? We find the answer in the family of Abraham. | Through Abraham’s family, God promises to bless all nations. Genesis follows four generations of human failure set against God’s continued faithfulness. As Joseph says, “You planned this for evil, but God planned it for good” (Gen. 50:20). The book ends with the promise of a future king who will restore blessing to the nations.",
    "Exodus": "How does God respond when his people cry out to him? The first part of the book of Exodus recounts a powerful confrontation between God and the unjust Pharaoh. This section is a fast-paced narrative that leads to divine justice, rescue, and deliverance. | The first part of Exodus shows God freeing Israel from Egypt. Then, at Mount Sinai, Moses receives God’s law, but Israel breaks the covenant. Moses pleads with God, who renews his promises. After the tabernacle is built, God’s glory fills it, but Moses can’t enter due to his own rebellion.",
    "Leviticus": "Israel cannot enter God’s presence because of their corruption. In response, God introduces sacrifices, the priesthood, and purity laws.",
    "Numbers": "Numbers tells of Israel’s repeated rebellion in the wilderness, met by God’s justice and mercy. God responds with short-term severity and long-term generosity.",
    "Deuteronomy": "Moses gives Israel final words of warning and blessing: the story so far, a collection of laws, and a charge to listen and obey. He knows they will rebel, yet he looks forward to their promised hope.",
    "Joshua": "Joshua shows God’s covenant faithfulness in bringing Israel into the land promised to Abraham. The book points to covenant obedience before, during, and after God fulfills his promises.",
    "Judges": "After Joshua’s death, Israel spirals downward, and Judges highlights six judges and their increasing corruption. The center of the book says that Israel had no king, and everyone did what was right in their own eyes.",
    "Ruth": "Ruth follows Naomi, her Moabite daughter-in-law Ruth, and the farmer Boaz during the time of the judges. Their story of tragedy turned to joy becomes part of the line of King David and the Messiah.",
    "1 Samuel": "1 Samuel focuses on Samuel, Saul, and David. A poem near the start sets the themes: God’s opposition to the proud, the lifting up of the humble, and the promise of a messianic king.",
    "2 Samuel": "2 Samuel shows humility, the destructiveness of pride, and the faithfulness of God’s promise. David succeeds and fails, and the promise of a future king stands at the beginning and the end.",
    "1 Kings": "Kings recounts Israel’s rulers from Solomon until the exile. The question at the center is whether God’s promised Messiah will rescue Israel in spite of their failures.",
    "2 Kings": "Kings recounts Israel’s rulers from Solomon until the exile. The question at the center is whether God’s promised Messiah will rescue Israel in spite of their failures.",
    "1 Chronicles": "Chronicles invites readers back through David, Solomon, the temple, and the kings of Judah. It leaves the reader waiting for the promised Messiah who will restore Israel’s covenant partnership with God.",
    "2 Chronicles": "Chronicles invites readers back through David, Solomon, the temple, and the kings of Judah. It leaves the reader waiting for the promised Messiah who will restore Israel’s covenant partnership with God.",
    "Ezra": "Ezra–Nehemiah recounts the return from exile and the rebuilding of the temple in Jerusalem. Ezra, a descendant of Aaron, arrives later and teaches God’s law to the post-exile generation.",
    "Nehemiah": "Nehemiah rebuilds the walls of Jerusalem after the return from exile. Ezra arrives later and teaches God’s law to that generation.",
    "Esther": "Though God is never named in Esther, he is at work behind the scenes, and Haman’s plot against the Jewish people is thwarted. Even when God seems absent, he has not abandoned his promises.",
    "Job": "Job, his wife, and his friends speculate on why an upright man suffers so much. God reminds him that the world is ordered and beautiful, and also wild, and that pain can be brought to God.",
    "Psalms": "Psalms is a designed collection of poetry about God’s character, made for a lifetime of contemplation. It holds prayer, pain, praise, and the fulfillment of prophecy.",
    "Proverbs": "Linked to Solomon and other wise men, Proverbs is hundreds of short sayings on how to live wisely. Each one touches a common part of life in God’s good world.",
    "Ecclesiastes": "Ecclesiastes answers Proverbs: life is not as simple as fearing God and choosing wisdom. Life is unpredictable and fleeting, and still it has a point.",
    "Song of Solomon": "Song of Songs is a love song between two lovers, and it works on two levels. It celebrates human intimacy and points to being united with God and his wisdom.",
    "Isaiah": "The book of Isaiah is filled with sobering accounts of Israel’s sin and rebellion and warnings of their coming judgement. But along with warnings, Isaiah also offers a message of hope—a suffering servant, a Messiah, will come to establish God’s Kingdom on Earth and create a new Jerusalem. | Isaiah calls for Israel and the surrounding rebellious nations to repent and turn to God, warning of the judgment that will come if they do not. But Isiah’s message is not without hope. He continually points to a coming servant, Immanuel, who will establish a new Israel and bring God's Kingdom to Earth. Jesus reads from the scroll of Isaiah and declares that the book’s messianic promises were being fulfilled in him.",
    "Jeremiah": "Jeremiah announced that God would judge Israel’s sins with exile to Babylon, and then he lived through it. The book shows how disobedience leads to destruction.",
    "Lamentations": "Lamentations is a collection of poems on Israel’s grief after Jerusalem’s destruction, caused by rebellion against God. The people confess their sins and seek restoration.",
    "Ezekiel": "Ezekiel is a prophet living in exile in Babylon. Ezekiel boldly speaks God’s message of Israel’s rebellion and makes clear that this exile is punishment for their covenant unfaithfulness. God's presence being revealed to Ezekiel demonstrates that holiness has nothing to do with geographical location—it’s about the condition of the heart. God is moved by the faithfulness of men like Ezekiel, who became his priest not because of status but because of his faith in dark circumstances. His example is a model for believers everywhere. | Ezekiel is a prophet living in exile in Babylon. God’s presence being revealed to Ezekiel demonstrates that holiness has nothing to do with geographical location—it’s about the condition of the heart. God is moved by the faithfulness of men like Ezekiel, who became his priest not because of status but because of his faith in dark circumstances.",
    "Daniel": "Daniel’s visions point to the coming Son of Man, the messianic king who will deliver Israel and the nations. The book is also about staying faithful to the Lord in exile.",
    "Hosea": "God sends Hosea to Israel to speak his grief over their idolatry and reliance on other nations. The people have failed the covenant, and God’s commitment to them remains.",
    "Joel": "Joel speaks of the day of the Lord, when evil empires are brought low and God’s people are delivered. God will not let evil keep wrecking his good world.",
    "Amos": "God calls the shepherd Amos to confront Israel’s wrongdoing and offer one more chance before judgment. God is grieved by the evil, and he still offers them a way to change.",
    "Obadiah": "Obadiah is short, and it speaks against the arrogance of Edom and other nations. Through him God declares judgment on Edom.",
    "Jonah": "Jonah asks whether we forgive our enemies, and whether we run from God when we fail. The story teaches trust in God’s decision to save.",
    "Micah": "Micah describes coming judgment on Israel for exploiting the poor and twisting the Torah. God is also faithful and merciful, and he promises a faithful remnant and a new Jerusalem.",
    "Nahum": "Nahum is a collection of poems announcing the downfall of some of Israel’s worst oppressors. The fall of Nineveh and Assyria shows how God works in history.",
    "Habakkuk": "Babylon stands for any nation that exalts itself and practices injustice, violence, and idolatry. God tells Habakkuk that he will deal with evil, and that faithfulness can wait on his timing.",
    "Zephaniah": "Zephaniah warns that God will judge the nations with fire and purify them from sin, evil, and violence. That purification opens a future in which humanity can flourish.",
    "Haggai": "Haggai tells the returned exiles to remember the covenant and build the temple before their own houses. God promises a new Jerusalem, the defeat of evil, and his presence among them.",
    "Zechariah": "Zechariah is a series of dream visions, and it does not follow a neat pattern. It shows God guiding history, and it asks for faithfulness while we hope for his kingdom.",
    "Malachi": "Malachi indicts Israel’s rebellion and still offers hope. After years of rebellion and exile, God has not abandoned Israel, and he promises to defeat evil and purify a faithful remnant.",
    "Matthew": "Matthew begins with a genealogy that shows Jesus as a descendant from the line of David, a king and a fulfillment of God’s covenant promises to David and all of Israel. Matthew’s gospel account shows readers how the promises and prophecies God made to his people in the Old Testament came to pass through Jesus. | Matthew’s gospel opens with Jesus’ genealogy, showing him as David’s descendant and fulfillment of God’s promises to Israel. Throughout the narrative, Matthew weaves together Jesus’ teachings, miracles, and ministry to show readers how the promises and prophecies God made to his people in the Old Testament came to pass through Jesus.",
    "Mark": "Mark tells Jesus’ life and ministry without an early, plain statement of who he is, and that is intentional. The second half of the book gives strong evidence that Jesus is the Messiah.",
    "Luke": "Luke documents how Jesus expands God's Kingdom and covenant by creating a new Israel that includes the poor, outcasts, and others to whom Jesus brings restoration and reverses their life circumstances as he gives them freedom and release from the tyranny of evil and sin. Throughout the book, we see that Jesus is indeed the messianic King, but he will reign over Israel by suffering. His actions usher in an upside-down Kingdom marked by self-giving love, and he challenges his disciples to follow his example and share in his ministry. | Luke documents how Jesus expands God’s Kingdom and covenant by creating a new Israel that includes the poor and outcasts. Throughout the book, we see that Jesus is indeed the messianic King, but he will reign over Israel by suffering. His actions usher in an upside-down Kingdom marked by self-giving love.",
    "John": "John's Gospel emphasizes Jesus' identity as the Messiah and Son of God. Because of this divine identity, Jesus is able to give eternal life to everyone who believes in him. We see this reality through the signs and miracles he performs. And seven times, he answers \"I Am\" when people question his identity, echoing God's personal name revealed in Exodus 3. John's Gospel also shows Jesus using his time on earth to introduce people to the new birth. By believing that he is the Messiah and God's son, they have eternal life and freedom from sin and are empowered to perform radical acts of kindness, generosity, and selfless love as they live their lives in devotion to Jesus and his Kingdom.",
    "Acts": "Jesus' followers received the Holy Spirit on Pentecost and became filled and equipped to spread the good news that would restore God's kingdom over the world. Through persecution, the believers were scattered. They continued to preach, and the church at Antioch was born. It grew into the first multiethnic, international church from which missionaries were sent throughout the world to preach about Jesus, the messianic Messiah and risen king of all nations. Paul even continued to preach despite imprisonment and wrote important letters to the churches. | Jesus’ followers received the Holy Spirit at Pentecost and were equipped to spread the good news that would restore God’s Kingdom on Earth. Through persecution, followers of Jesus were scattered, so missionaries went out to preach about Jesus, the Messiah and risen King of all nations.",
    "Romans": "The people of Israel tried to obey God and follow the law, but they didn’t succeed. Only faith in Jesus’ death and resurrection can justify humanity and fulfill God’s promise to create a covenant relationship with his people, the descendants of Abraham. | Watch our overview video on the book of Romans, which breaks down the literary design of the book and its flow of thought. This is the second of two videos dedicated to the book of Romans, which aims to help you see its unique contribution to the story of Jesus, but also how it works within the Bible’s overall framework.",
    "1 Corinthians": "Paul’s first letter to Corinth is a wake-up call: the resurrection is a reason for unity, purity, and love. Believing Jesus was raised opens a new reality for every part of life.",
    "2 Corinthians": "Paul asks the Corinthians to see life through the paradox of the cross. Because of the cross and the Spirit, Jesus’ followers can live the cruciform life themselves.",
    "Galatians": "Galatians teaches that people are justified by the gospel of Jesus, not by the laws of the Torah. Believers are one multi-ethnic family, equipped by the Spirit to love God and others.",
    "Ephesians": "Ephesians shows how the gospel makes one multi-ethnic covenant family and shapes ordinary life. By the Spirit, believers can stand against the evil that threatens their unity.",
    "Philippians": "Philippians shows Christian life as a living expression of Jesus’ own story. Citizenship is in heaven, and closeness to Jesus gives hope in the darkest circumstances.",
    "Colossians": "Colossians challenges the church to be transformed by Jesus’ resurrection and love. Because he was raised, they are reconciled to God, free from the law, and part of his new family.",
    "1 Thessalonians": "Paul celebrates the Thessalonians’ holiness, love, and future hope as they stay faithful to Jesus. Despite persecution, the church has flourished.",
    "2 Thessalonians": "Paul encourages the church to stay faithful, hopeful, and fearless while waiting for Jesus’ return. What we hope for shapes what we live for.",
    "1 Timothy": "Paul tells Timothy how to answer corrupt leaders and false teaching in Ephesus. What a church believes shapes how its people live.",
    "2 Timothy": "2 Timothy is Paul’s last letter, urging Timothy to accept his calling despite suffering. He is to keep faith in Jesus’ resurrection and raise leaders who teach the good news.",
    "Titus": "Paul reminds believers on Crete that, despite the culture around them, the grace of Jesus can make them a new humanity. That is the same grace by which Jesus died to redeem them.",
    "Philemon": "Paul asks Philemon to forgive Onesimus, who had run away. It is the gospel in action: people become equal partners in the new humanity.",
    "Hebrews": "Hebrews urges believers to stay faithful to Jesus through hardship, following the models of faith in the Old Testament. Jesus is greater than any of those people or events, and he is worthy of devotion.",
    "James": "James is short wisdom speeches, full of metaphors and lines that are easy to remember. It challenges believers on how they live: hearing God’s word and doing it.",
    "1 Peter": "Peter writes to encourage Christians facing persecution. He tells them they are chosen by God, and that their suffering can show others the generosity and love of Jesus.",
    "2 Peter": "Peter warns against corrupt teachers who deny Jesus’ resurrection and lead the community astray. On the day of the Lord, God will expose evil and make way for a new heaven and earth.",
    "1 John": "1 John answers teachers who no longer confess Jesus as the Messiah and Son of God. True teachers tell the truth about Jesus and the cross, and they love others.",
    "2 John": "John warns the church not to receive teachers who deny that Jesus came in the flesh. Legitimate teachers tell the truth about him and love others.",
    "3 John": "John writes to Gaius about hospitality for traveling workers and a conflict with Diotrephes. True teachers spread love rather than fear.",
    "Jude": "Jude uses the Hebrew Bible and Jewish stories to picture God’s judgment on rebellion. He tells the church to contend for the faith, because God’s grace asks for a whole life.",
    "Revelation": "The book of Revelation is not a secret code for deciphering the timeline of Jesus’ return. It’s a work of apocalyptic literature that shows how every human kingdom eventually becomes Babylon and must be resisted. Revelation prophecies that Jesus, who died for the sins of the world, will return one day as King to prompt repentance.",
  };
  var POETRY = { Job: 1, Psalms: 1, Proverbs: 1, "Song of Solomon": 1, Lamentations: 1 };
  var LIBRARY = [];
  var EVENTS = [
    { date: "Nov 12", name: "Preaching workshop", where: "A midweek gathering for clergy and licensed lay preachers.", kind: "Workshop" },
    { date: "Nov 18", name: "The Daily Office, online", where: "An hour on Morning and Evening Prayer for people who have never led it.", kind: "Webinar" },
    { date: "Dec 5", name: "Advent quiet day", where: "A Saturday of silence, psalms, and one address.", kind: "Retreat" }
  ];

  var state = {
    role: sessionStorage.getItem("ar-role") || "standard",
    levels: loadLevels(),
    types: loadTypes(),
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
    feedOpen: "",
    feedMedia: "",
    depth: "year",
    settle: false,
    style: "incense",
    slice: { kind: "year" },
    day: null,
    card: null,
    monthFocus: null,
    church: 0,
    board: false,
    lit: "canonical",
    context: loadContext(),
    bible: { open: false, full: false, level: "section", testament: null, section: null, book: null, chapter: null, verses: [], showNums: false, large: false, toEnd: false, xrefs: false, xrefHome: null },
    bibleAnchor: { book: "Genesis", chapter: 1 },
    books: {}
  };
  var canonBlobs = {};
  var legacy = document.body.getAttribute("data-legacy-wheel") === "1";
  function themeIsDark() {
    return sessionStorage.getItem("ar-theme") === "dark";
  }
  function applyTheme() {
    var dark = themeIsDark();
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.textContent = dark ? "Light theme" : "Dark theme";
      themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
    }
  }
  applyTheme();
  var numTimer = null;
  var drillLock = false;

  var FEAST_FIXED = [
    ["st-andrew", "St. Andrew", "11-30"],
    ["st-thomas", "St. Thomas", "12-21"],
    ["christmas", "Christmas", "12-25"],
    ["st-stephen", "St. Stephen", "12-26"],
    ["st-john", "St. John", "12-27"],
    ["holy-innocents", "Holy Innocents", "12-28"],
    ["holy-name", "Holy Name", "01-01"],
    ["epiphany", "Epiphany", "01-06"],
    ["conversion-of-st-paul", "Conversion of St. Paul", "01-25"],
    ["presentation", "Presentation", "02-02"],
    ["st-matthias", "St. Matthias", "02-24"],
    ["annunciation", "Annunciation", "03-25"],
    ["st-mark", "St. Mark", "04-25"],
    ["st-philip-and-st-james", "St. Philip and St. James", "05-01"],
    ["st-barnabas", "St. Barnabas", "06-11"],
    ["nativity-of-st-john", "Nativity of St. John the Baptist", "06-24"],
    ["st-peter", "St. Peter", "06-29"],
    ["st-james", "St. James", "07-25"],
    ["transfiguration", "Transfiguration", "08-06"],
    ["st-bartholomew", "St. Bartholomew", "08-24"],
    ["holy-cross", "Holy Cross", "09-14"],
    ["st-matthew", "St. Matthew", "09-21"],
    ["st-michael", "St. Michael and All Angels", "09-29"],
    ["st-luke", "St. Luke", "10-18"],
    ["st-simon-and-st-jude", "St. Simon and St. Jude", "10-28"],
    ["all-saints", "All Saints", "11-01"]
  ];
  function loadAdded() {
    try { return JSON.parse(sessionStorage.getItem("ar-added") || "[]"); }
    catch (e) { return []; }
  }
  function emptyContext() {
    return { season: "", lectYear: "", lectDay: null, audience: "", topic: "", sub: "", shelf: "", testament: "", section: "", book: "", occasions: [], works: [] };
  }
  function loadContext() {
    var ctx = emptyContext();
    try {
      var raw = JSON.parse(sessionStorage.getItem("ar-context") || "null");
      if (!raw) return ctx;
      if (SEASONS.some(function (s) { return s.id === raw.season; })) ctx.season = raw.season;
      if (AUDIENCES.indexOf(raw.audience) !== -1) ctx.audience = raw.audience;
      var topic = TOPICS.filter(function (t) { return t.id === raw.topic; })[0];
      if (topic) {
        ctx.topic = topic.id;
        if (topic.subs.indexOf(raw.sub) !== -1) ctx.sub = raw.sub;
      }
      if (SHELF_LANDINGS.indexOf(raw.shelf) !== -1) ctx.shelf = raw.shelf;
      if (raw.occasions && raw.occasions.forEach) {
        raw.occasions.forEach(function (o) {
          if (!o || (o.kind !== "feast" && o.kind !== "holiday" && o.kind !== "national")) return;
          if (!o.id || String(o.id).indexOf(o.kind + ":") !== 0) return;
          ctx.occasions.push({ id: String(o.id), kind: o.kind, label: String(o.label || o.id) });
        });
      }
      if (raw.works && raw.works.forEach) {
        raw.works.forEach(function (w) {
          if (!w || !knownWork(String(w.id || ""))) return;
          ctx.works.push({ id: String(w.id), label: workLabel(w.id) || String(w.label || w.id) });
        });
      }
      var bookPlace = canonPlace(raw.book);
      if (bookPlace) {
        ctx.book = bookPlace.book;
        ctx.section = bookPlace.section.name;
        ctx.testament = bookPlace.section.testament;
        ctx.shelf = "canonical";
      } else {
        var sectionPlace = canonSectionNamed(raw.section);
        if (sectionPlace) {
          ctx.section = sectionPlace.name;
          ctx.testament = sectionPlace.testament;
          ctx.shelf = "canonical";
        } else if (raw.testament === "Old Testament" || raw.testament === "New Testament") {
          ctx.testament = raw.testament;
          ctx.shelf = "canonical";
        }
      }
      var lectDay = raw.lectDay;
      var lectYearOk = raw.lectYear === "A" || raw.lectYear === "B" || raw.lectYear === "C";
      var lectDayOk = lectDay && (lectDay.year === "A" || lectDay.year === "B" || lectDay.year === "C") && SEASONS.some(function (s) { return s.id === lectDay.season; }) && lectDay.id != null && String(lectDay.id) !== "";
      if (lectDayOk) {
        ctx.lectDay = { id: String(lectDay.id), year: lectDay.year, season: lectDay.season, label: String(lectDay.label || "Day") };
        ctx.lectYear = lectDay.year;
        ctx.season = lectDay.season;
      } else if (lectYearOk) ctx.lectYear = raw.lectYear;
    } catch (e) {}
    return ctx;
  }
  function saveContext() {
    try { sessionStorage.setItem("ar-context", JSON.stringify(state.context)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("ar-context"));
  }
  function allResources() {
    return state.added.filter(function (item) { return item.shelf !== "canonical"; }).concat(LIBRARY);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function loadTypes() {
    var raw = sessionStorage.getItem("ar-types");
    var all = TYPES.map(function (t) { return t.id; });
    if (!raw) return all;
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.forEach) return all;
      var ids = [];
      parsed.forEach(function (id) {
        if (all.indexOf(id) !== -1 && ids.indexOf(id) === -1) ids.push(id);
      });
      return all.filter(function (id) { return ids.indexOf(id) !== -1; });
    } catch (e) { return all; }
  }
  function saveTypes() {
    var all = TYPES.map(function (t) { return t.id; });
    state.types = all.filter(function (id) { return state.types.indexOf(id) !== -1; });
    try {
      if (state.types.length === all.length) sessionStorage.removeItem("ar-types");
      else sessionStorage.setItem("ar-types", JSON.stringify(state.types));
    } catch (e) {}
  }
  function loadLevels() {
    var raw = sessionStorage.getItem("ar-level");
    var ids = [];
    function keep(id) {
      if (LEVELS.some(function (l) { return l.id === id; }) && ids.indexOf(id) === -1) ids.push(id);
    }
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.forEach) parsed.forEach(keep);
        else keep(String(parsed || ""));
      } catch (e) { keep(raw); }
    }
    if (!ids.length) ids.push("parish");
    return LEVELS.map(function (l) { return l.id; }).filter(function (id) { return ids.indexOf(id) !== -1; });
  }
  function saveLevels() {
    state.levels = LEVELS.map(function (l) { return l.id; }).filter(function (id) { return state.levels.indexOf(id) !== -1; });
    if (!state.levels.length) state.levels = ["parish"];
    try { sessionStorage.setItem("ar-level", JSON.stringify(state.levels)); } catch (e) {}
  }
  function allLevels() {
    return LEVELS.every(function (l) { return state.levels.indexOf(l.id) !== -1; });
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
  function itemTypes(item) {
    var all = TYPES.map(function (t) { return t.id; });
    var ids = [];
    function keep(id) {
      if (all.indexOf(id) !== -1 && ids.indexOf(id) === -1) ids.push(id);
    }
    if (item.types && item.types.forEach) item.types.forEach(function (id) { keep(String(id)); });
    if (!ids.length && item.format) {
      String(item.format).split(",").forEach(function (part) {
        var name = part.trim();
        TYPES.forEach(function (t) { if (t.name === name) keep(t.id); });
        if (FORMAT_TYPE[name]) keep(FORMAT_TYPE[name]);
      });
    }
    return all.filter(function (id) { return ids.indexOf(id) !== -1; });
  }
  function typeNames(ids) {
    return ids.map(function (id) {
      var found = "";
      TYPES.forEach(function (t) { if (t.id === id) found = t.name; });
      return found || id;
    });
  }
  function matchesType(item) {
    var types = itemTypes(item);
    if (!types.length) return false;
    return types.some(function (id) { return state.types.indexOf(id) !== -1; });
  }
  function matches(item) {
    if (!matchesType(item)) return false;
    if (state.levels.length && item.level && state.levels.indexOf(item.level) === -1) return false;
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
    if (!list.length) {
      var any = state.added.concat(LIBRARY).length;
      return '<p class="empty">' + (any ? "Nothing in this view matches what you have set." : "Nothing is in the library yet.") + "</p>";
    }
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
      var sep = lesson.join === "part" ? '<span class="part" aria-hidden="true">·</span>' : '<span class="or">or</span>';
      var cites = lesson.cites.map(function (cite) {
        var shown = citeLabel(cite);
        if (!bookName(cite)) return '<span class="plain">' + esc(shown) + "</span>";
        return '<button type="button" data-ref="' + esc(cite) + '">' + esc(shown) + "</button>";
      }).join(sep);
      return '<p class="lesson"><span>' + esc(lesson.kind) + "</span><span>" + cites + "</span></p>";
    }).join("");
    return '<article class="sunday"><header><h3>' + esc(day.name) + "</h3><time>" + esc(day.date) + "</time></header><div class=\"lessons\">" + lessons + "</div></article>";
  }
  var GOSPEL_BOOKS = { Matthew: 1, Mark: 1, Luke: 1, John: 1 };
  var EPISTLE_BOOKS = {
    Acts: 1, Romans: 1, "1 Corinthians": 1, "2 Corinthians": 1, Galatians: 1, Ephesians: 1,
    Philippians: 1, Colossians: 1, "1 Thessalonians": 1, "2 Thessalonians": 1,
    "1 Timothy": 1, "2 Timothy": 1, Titus: 1, Philemon: 1, Hebrews: 1, James: 1,
    "1 Peter": 1, "2 Peter": 1, "1 John": 1, "2 John": 1, "3 John": 1, Jude: 1, Revelation: 1
  };
  var LECT_ADVENT = { "First Sunday of Advent": 0, "Second Sunday of Advent": 1, "Third Sunday of Advent": 2, "Fourth Sunday of Advent": 3 };
  var LECT_LENT = { "First Sunday in Lent": 1, "Second Sunday in Lent": 2, "Third Sunday in Lent": 3, "Fourth Sunday in Lent": 4, "Fifth Sunday in Lent": 5 };
  var LECT_EASTER_SUN = { "Second Sunday of Easter": 2, "Third Sunday of Easter": 3, "Fourth Sunday of Easter": 4, "Fifth Sunday of Easter": 5, "Sixth Sunday of Easter": 6, "Seventh Sunday of Easter": 7 };
  var LECT_EPI = { "Second Sunday after the Epiphany": 2, "Third Sunday after the Epiphany": 3, "Fourth Sunday after the Epiphany": 4, "Fifth Sunday after the Epiphany": 5, "Sixth Sunday after the Epiphany": 6, "Seventh Sunday after the Epiphany": 7 };
  var LECT_FROM_EASTER = {
    "Ash Wednesday": -46, "Liturgy of the Palms": -7, "Liturgy of the Passion": -7,
    "Monday of Holy Week": -6, "Tuesday of Holy Week": -5, "Wednesday of Holy Week": -4,
    "Maundy Thursday": -3, "Good Friday": -2, "Holy Saturday": -1, "Easter Vigil": 0,
    "Resurrection of the Lord": 0, "Easter Evening": 0, "Ascension of the Lord": 39,
    "Day of Pentecost": 49, "Trinity Sunday": 56
  };
  var LECT_TITLES = {
    "Resurrection of the Lord": "Easter Day",
    "Day of Pentecost": "The Day of Pentecost",
    "Reign of Christ - Proper 29 (34)": "Christ the King",
    "Nativity of the Lord - Proper I": "Christmas Eve",
    "Nativity of the Lord - Proper II": "Christmas Day",
    "Nativity of the Lord - Proper III": "Christmas Day",
    "Holy Name of Jesus": "Holy Name",
    "Ascension of the Lord": "Ascension",
    "Epiphany of the Lord": "The Epiphany",
    "Transfiguration Sunday": "The Transfiguration",
    "Annunciation of the Lord": "The Annunciation",
    "Presentation of the Lord": "The Presentation",
    "Visitation of Mary to Elizabeth": "The Visitation",
    "All Saints Day": "All Saints"
  };
  var lectPack = null;
  var lectIndex = {};
  function lectSundayOnOrAfter(dt) { return addDays(dt, (7 - dt.getUTCDay()) % 7); }
  function lectSundayInWeek(start) {
    for (var i = 0; i < 7; i++) {
      var found = addDays(start, i);
      if (found.getUTCDay() === 0) return found;
    }
    return null;
  }
  function lectNth(year, month, weekday, n) {
    var first = utcDate(year, month, 1);
    var add = (weekday - first.getUTCDay() + 7) % 7;
    return addDays(first, add + (n - 1) * 7);
  }
  function lectOccasionIso(startYear, name) {
    var easter = easterSunday(startYear + 1);
    var dt = null;
    if (Object.prototype.hasOwnProperty.call(LECT_ADVENT, name)) dt = addDays(adventSunday(startYear), LECT_ADVENT[name] * 7);
    else if (name === "Nativity of the Lord - Proper I") dt = utcDate(startYear, 12, 24);
    else if (name === "Nativity of the Lord - Proper II" || name === "Nativity of the Lord - Proper III") dt = utcDate(startYear, 12, 25);
    else if (name === "First Sunday after Christmas Day") {
      for (var c = 26; c <= 31; c++) {
        var christmasSunday = utcDate(startYear, 12, c);
        if (christmasSunday.getUTCDay() === 0) { dt = christmasSunday; break; }
      }
    } else if (name === "Second Sunday after Christmas Day") {
      for (var s = 2; s <= 5; s++) {
        var second = utcDate(startYear + 1, 1, s);
        if (second.getUTCDay() === 0) { dt = second; break; }
      }
    } else if (name === "Holy Name of Jesus" || name === "New Year's Day") dt = utcDate(startYear + 1, 1, 1);
    else if (name === "Epiphany of the Lord") dt = utcDate(startYear + 1, 1, 6);
    else if (name === "Presentation of the Lord") dt = utcDate(startYear + 1, 2, 2);
    else if (name === "Visitation of Mary to Elizabeth") dt = utcDate(startYear + 1, 5, 31);
    else if (name === "Holy Cross") dt = utcDate(startYear + 1, 9, 14);
    else if (name === "All Saints Day") dt = utcDate(startYear + 1, 11, 1);
    else if (name === "Canadian Thanksgiving Day") dt = lectNth(startYear + 1, 10, 1, 2);
    else if (name === "Thanksgiving Day") dt = lectNth(startYear + 1, 11, 4, 4);
    else {
      var baptism = lectSundayOnOrAfter(utcDate(startYear + 1, 1, 7));
      var transfiguration = addDays(easter, -49);
      if (name === "Baptism of the Lord") dt = baptism;
      else if (name === "Transfiguration Sunday") dt = transfiguration;
      else if (Object.prototype.hasOwnProperty.call(LECT_EPI, name)) {
        var epi = addDays(baptism, (LECT_EPI[name] - 1) * 7);
        dt = epi.getTime() >= transfiguration.getTime() ? null : epi;
      } else if (name === "Annunciation of the Lord") {
        var ann = utcDate(startYear + 1, 3, 25);
        var palm = addDays(easter, -7);
        var easter2 = addDays(easter, 7);
        dt = ann.getTime() >= palm.getTime() && ann.getTime() <= easter2.getTime() ? addDays(easter2, 1) : ann;
      } else if (Object.prototype.hasOwnProperty.call(LECT_FROM_EASTER, name)) dt = addDays(easter, LECT_FROM_EASTER[name]);
      else if (Object.prototype.hasOwnProperty.call(LECT_LENT, name)) dt = addDays(easter, -7 * (7 - LECT_LENT[name]));
      else if (Object.prototype.hasOwnProperty.call(LECT_EASTER_SUN, name)) dt = addDays(easter, 7 * (LECT_EASTER_SUN[name] - 1));
      else {
        var proper = /Proper\s+(\d+)/.exec(name);
        if (proper) {
          var sun = lectSundayInWeek(addDays(utcDate(startYear + 1, 5, 29), (Number(proper[1]) - 4) * 7));
          dt = !sun || sun.getTime() <= addDays(easter, 56).getTime() ? null : sun;
        }
      }
    }
    return dt ? isoFromUTC(dt.getTime()) : "";
  }
  function lectTitle(name) {
    if (LECT_TITLES[name]) return LECT_TITLES[name];
    return String(name).replace(/\s*\(\d+\)\s*$/, "");
  }
  function lectMarks(bi) {
    if (lectPack.marks[bi]) return lectPack.marks[bi];
    var chapters = lectPack.verse[bi];
    if (!chapters) return null;
    var marks = [];
    var at = 0;
    for (var c = 0; c < chapters.length; c++) {
      for (var v = 0; v < chapters[c].length; v++) {
        marks.push({ c: c + 1, v: v + 1, start: at });
        at += chapters[c][v];
      }
    }
    lectPack.marks[bi] = marks;
    return marks;
  }
  function lectVerseAt(bi, offset) {
    var marks = lectMarks(bi);
    if (!marks || !marks.length) return null;
    var ans = 0;
    var lo = 0;
    var hi = marks.length - 1;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      if (marks[mid].start <= offset) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    return marks[ans];
  }
  function lectCite(p) {
    var book = lectPack.data.books[p.b];
    var name = book ? (book.name === "Psalms" ? "Psalm" : book.name) : "";
    var start = lectVerseAt(p.b, p.o);
    var end = lectVerseAt(p.b, p.o + Math.max(p.w, 1) - 1);
    if (!name || !start || !end) return name;
    if (start.c === end.c && start.v === end.v) return name + " " + start.c + ":" + start.v;
    if (start.c === end.c) return name + " " + start.c + ":" + start.v + "-" + end.v;
    return name + " " + start.c + ":" + start.v + "-" + end.c + ":" + end.v;
  }
  function mergeCite(prev, cite) {
    var a = String(prev).match(/^(.*)\s+(\d+):(.*)$/);
    var b = String(cite).match(/^(.*)\s+(\d+):(.*)$/);
    if (!a || !b || a[1] !== b[1] || a[2] !== b[2]) return "";
    return a[1] + " " + a[2] + ":" + a[3] + ", " + b[3];
  }
  function lectKind(book, seenPsalm) {
    if (book === "Psalms") return "Psalm";
    if (book === "Song of Solomon" && seenPsalm) return "Psalm";
    if (GOSPEL_BOOKS[book]) return "Gospel";
    if (seenPsalm && EPISTLE_BOOKS[book]) return "Epistle";
    return "First lesson";
  }
  function groupLect(passages) {
    var seenPsalm = false;
    var items = [];
    passages.forEach(function (p) {
      var book = lectPack.data.books[p.b] ? lectPack.data.books[p.b].name : "";
      var kind = lectKind(book, seenPsalm);
      var cite = lectCite(p);
      if (!cite) return;
      var chapterMatch = cite.match(/\s(\d+):/);
      var chapter = chapterMatch ? Number(chapterMatch[1]) : 0;
      var last = items[items.length - 1];
      if (last && last.kind === kind && last.book === book && last.chapter === chapter) {
        var merged = mergeCite(last.cites[last.cites.length - 1], cite);
        if (merged) last.cites[last.cites.length - 1] = merged;
        else last.cites.push(cite);
      } else if (last && last.kind === kind) {
        last.cites.push(cite);
        if (last.book !== book) last.join = "or";
        last.book = book;
        last.chapter = chapter;
      } else items.push({ kind: kind, book: book, chapter: chapter, cites: [cite], join: "part" });
      if (book === "Psalms") seenPsalm = true;
    });
    return items.map(function (item) {
      return { kind: item.kind, cites: item.cites, join: item.join === "or" ? "or" : "part" };
    });
  }
  function lectForYear(startYear) {
    if (!lectPack) return {};
    if (lectIndex[startYear]) return lectIndex[startYear];
    var map = {};
    var letter = letterOf(startYear);
    var byName = {};
    lectPack.data.passages.forEach(function (p) {
      if (p.y !== letter) return;
      if (!byName[p.n]) byName[p.n] = [];
      byName[p.n].push(p);
    });
    var year = buildYear(startYear);
    Object.keys(byName).forEach(function (name) {
      var iso = lectOccasionIso(startYear, name);
      if (!iso || iso < year.startIso || iso >= year.endExclusive) return;
      var lessons = groupLect(byName[name]);
      if (!lessons.length) return;
      if (!map[iso]) map[iso] = [];
      map[iso].push({ name: lectTitle(name), date: longDate(iso), lessons: lessons });
    });
    lectIndex[startYear] = map;
    return map;
  }
  function dayArticles(day) {
    if (day.propers.length) return day.propers.map(function (idx) { return sundayCard(PROPERS[idx]); }).join("");
    var found = lectForYear(startYearContaining(day.iso))[day.iso] || [];
    return found.map(sundayCard).join("");
  }
  function dayCardBody(day) {
    var body = dayArticles(day);
    if (body) return body;
    return '<article class="sunday"><header><h3>' + esc(day.feast || WEEKDAY[day.dow]) + "</h3><time>" + esc(MONTH_NAME[day.m - 1] + " " + day.d + ", " + day.y) + "</time></header><p class=\"sunday-note\">" + esc(seasonName(day.season)) + "</p></article>";
  }
  function ensureLect() {
    if (ensureLect.started) return;
    ensureLect.started = true;
    Promise.all([
      fetch("lectionary-viz.json").then(function (res) { if (!res.ok) throw new Error("missing"); return res.json(); }),
      fetch("verse-index.json").then(function (res) { if (!res.ok) throw new Error("missing"); return res.json(); })
    ]).then(function (pair) {
      lectPack = { data: pair[0], verse: pair[1], marks: {} };
      lectIndex = {};
      var desk = document.body.getAttribute("data-desk");
      if (desk === "books" || desk === "down" || desk === "nation") return;
      if ((desk === "analysis" || state.module === "year") && !state.board) renderStage();
    }).catch(function () {});
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
    var letter = shownYear().letter;
    var note = season.id === "ordinary"
      ? "Year " + letter + " of the Revised Common Lectionary, both Old Testament tracks. A reading opens in the Bible."
      : "Year " + letter + " of the Revised Common Lectionary. A reading opens in the Bible.";
    var stripe = STRIPE[season.id] || "#6e5430";
    if (!legacy && state.style === "fog" && FOG_COLORS[season.id]) stripe = FOG_COLORS[season.id].fill;
    var back = legacy ? "The year" : "The wheel";
    var body = days.length ? days.map(sundayCard).join("") : '<p class="empty">No readings in this slice.</p>';
    return '<div class="year drill">' + yearSwitch() + '<div class="drill-top"><button type="button" class="drill-back" data-year>' + back + '</button><div class="season-copy"><h2>' + esc(title) + "</h2><p>" + esc(line) + '</p></div><span></span></div><p class="lection-note">' + esc(note) + '</p><div class="sundays' + (long ? " is-long" : "") + '" style="--season:' + stripe + '">' + body + "</div>" + (list.length ? cards(list) : "") + "</div>";
  }

  var MONTH_NAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var SEASON_STORY = {
    advent: [
      "The church year opens here, in the dark. Advent takes its name from the Latin adventus, a coming or arrival, and the four Sundays hold two arrivals in one season: the birth at Bethlehem, and the day when Christ comes to judge and to make all things new. The weeks do not begin with the manger. They begin with the end.",
      "Rome settled on four Sundays. Some other Western churches once kept a longer preparation from St. Martin’s day on November 11, a fast sometimes called St. Martin’s Lent. The English prayer books from 1549 open the Christian year on Advent Sunday, so the first of these Sundays is the church’s New Year. Violet became the usual color. A deep blue is used in some Anglican churches, a sign of hope rather than of Lent’s sorrow.",
      "The waiting has an order. The first Sundays look toward the day of the Lord and the prophets who asked for the heavens to be torn open. John the Baptist stands in the middle of the season, a voice in the wilderness. Only at the end does the story turn to Mary and the promise of a child. Where a fast is kept, it is lighter than Lent. The note is expectation."
    ],
    christmas: [
      "Christmas Day is the feast of the Nativity, and the season is the twelve days that follow, through the evening of January 5, Twelfth Night. December 25 is an old Roman date. A civil calendar compiled in 354 records that the church in Rome was already keeping the birth of Christ on that day in 336. In the East the older feast was January 6, and it gathered the birth together with the baptism. The December date spread from west to east. January 6 remained as the Epiphany.",
      "The twelve days are a feast, not a fast. White and gold are the colors. Inside them the church kept other days and refused to postpone them: Stephen, the first martyr, on the 26th; John the evangelist on the 27th; the Holy Innocents, the children of Bethlehem, on the 28th; and on January 1 the naming of Jesus, which older books called the Circumcision. The joy is not thin. Stephen’s day is still inside the feast, and the church tells the truth that the child is born into a world that resists him."
    ],
    epiphany: [
      "Epiphany, on January 6, is the feast of the manifestation. The Greek word means a showing. In the West the day came to belong especially to the magi, the nations arriving with gold, frankincense, and myrrh. Medieval worship also gathered two other signs onto this day: Jesus baptized in the Jordan, and the water turned to wine at Cana. One feast, three ways the hidden Christ is made known.",
      "After the day itself the season continues in green. These are the counted weeks before Lent, when the church stays with the light that has been shown and reads the early ministry: the call of the disciples, the first healings, the authority of the teaching. Older English prayer books inserted three pre-Lent Sundays, Septuagesima, Sexagesima, and Quinquagesima, and the American book of 1928 still had them. The calendar this wheel follows lets Epiphany run up to Ash Wednesday, so those three Sundays are not a separate season.",
      "February 2, the Presentation of Christ in the Temple, falls inside this season. That day was long kept as the close of the Christmas cycle, when candles were blessed and Christ was hailed as a light to the nations and the glory of Israel. Then the green weeks finish, and Lent begins."
    ],
    lent: [
      "Lent is the forty-day fast before Easter. The Latin name is Quadragesima, the fortieth. The number is the Lord’s own: forty days in the wilderness, and behind that the forty of Moses on the mountain and of Elijah on the way to Horeb. The church walks into that wilderness before it tries to keep the Passion.",
      "Sundays are in Lent, but they are not fast days, and so they are not counted in the forty. The fast starts on Ash Wednesday and runs through Holy Saturday. Count every day between those two, including both, and then set the six Sundays aside, and forty remain. Ashes on every worshipper, rather than on public penitents only, spread through the Western church in the tenth and eleventh centuries. The English books of the Reformation kept the fast and did not keep the imposition of ashes. Many Anglican churches have since received that sign back. A forty-day Lent is already visible in the fourth century. Before that, the pre-Easter fast was often shorter and differed from city to city.",
      "The forty days are not cut short. Holy Week is drawn as its own ring, and the fast continues through it to the tomb. The fourth Sunday has long been a slight easing, called Refreshment Sunday, or Laetare, and in England Mothering Sunday. The work of the season is repentance, almsgiving, and prayer, so that the week of the Passion is not a surprise."
    ],
    holyweek: [
      "Holy Week is the last week of Jesus’ life, from the entry into Jerusalem to the Sabbath spent in the tomb. Pilgrims in Jerusalem in the 380s already called it the Great Week and walked the places of the story on the days themselves. The West came to call it Holy Week. It is the heart of the year. Everything else leans toward it or away from it.",
      "Palm Sunday opens with branches and the shout of the crowds, and the same liturgy turns to the Passion. The reading is long because the church refuses to summarize these hours. Monday, Tuesday, and Wednesday stay with the last teaching and the closing of the plot. Wednesday is sometimes called Spy Wednesday, for the betrayal. Maundy Thursday takes its English name from the Latin mandatum, the new commandment. The church remembers the supper, the bread and the cup, and the washing of feet. Good Friday is the day of the cross. The English name is medieval. Holy Saturday is the day of the tomb, and of the night watch that became the Easter Vigil, the hour when the early church preferred to baptize."
    ],
    easter: [
      "Easter is the feast of the resurrection. Most of the Christian world calls it Pascha, from the Hebrew pesach, because the Lord’s passover from death was kept at the time of Passover. The English name comes from the old name of the month in which the feast fell. Bede, in the eighth century, says that month was called Eosturmonath. The date is the Sunday after the full moon on or after March 21, the rule that grew out of the fourth-century effort to keep one feast.",
      "From Easter Day the church keeps fifty days, a week of weeks, and calls the stretch the Great Fifty Days. Fasting was set aside. Alleluia, put away for Lent, comes back. White and gold replace violet. The Sundays belong to the feast itself. Older books counted them as Sundays after Easter. The fiftieth day is Pentecost, drawn on this wheel as its own ring.",
      "Inside those days, the fortieth is the Ascension, always a Thursday. The church has kept that day since the fourth century as the moment the risen Christ entrusts his going to the church and promises the Spirit. The stories of the season are the appearances, the breakfast on the shore, the opening of the scriptures, and the charge to go. Easter is not one morning. It is a season long enough to learn what the morning means."
    ],
    pentecost: [
      "Pentecost is the fiftieth day, and the name is the Greek number. In Jerusalem it was already the Jewish feast of Weeks, fifty days after Passover, when Acts tells of a wind, of fire, and of a crowd that heard the apostles each in its own language. The Christian year treats that day as the gift of the Spirit and the sending of the church. The fifty days of Easter end here. What was promised at the Ascension is given.",
      "The English name is Whitsunday, white Sunday, usually explained by the white robes of those baptized at the feast. Red is the color, for the fire, and it has been a Western color for this day since the medieval schemes of vestments. Older prayer books kept an octave, Whitsun week, and only then Trinity Sunday. From Trinity they numbered the rest of the year after Trinity, not after Pentecost. Trinity Sunday, as a feast of the whole Western church, dates from the fourteenth century, though England kept it earlier.",
      "On this wheel the red ring is one week, and Trinity Sunday opens the long green season. The week is a pause between the resurrection and the counted Sundays: the church stands in the story of its own beginning, and then it is sent to live the rest of the year from that day."
    ],
    ordinary: [
      "Ordinary Time is the long green season. The word does not mean plain. It means the counted Sundays. The older Anglican prayer books did not use the modern name. They said after Epiphany and after Trinity. The calendar behind these readings took up the newer name, and on this wheel the long count still begins at Trinity rather than the day after Pentecost. That is the older English shape: Trinity first, then the numbered Sundays.",
      "The season runs from Trinity Sunday to the eve of the next Advent. Green has marked the days outside feast and fast in the West since the medieval writers on vestments. The work of the weeks is the public life of Jesus, read in course: parables, healings, disputes, the sending of the Twelve, the cost of following. These Sundays are not a lesser substitute for Easter. They are the life the resurrection makes possible.",
      "Certain days break the green without ending it. The Transfiguration falls on August 6, Holy Cross on September 14, All Saints on November 1. The last Sunday is Christ the King. That feast was appointed for the Roman church in 1925 and later moved to the end of the year. It is kept here as the Sunday before Advent: a last claim that the counted weeks have a Lord. Then the year turns back to the dark and begins again."
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
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function isoFromUTC(t) {
    var d = new Date(t);
    return d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate());
  }
  function localTodayIso() {
    var now = new Date();
    return now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate());
  }
  function utcDate(y, m, d) { return new Date(Date.UTC(y, m - 1, d)); }
  function nthWeekday(year, month, weekday, n) {
    var first = utcDate(year, month, 1);
    var delta = (weekday - first.getUTCDay() + 7) % 7;
    return isoFromUTC(utcDate(year, month, 1 + delta + (n - 1) * 7).getTime());
  }
  function lastWeekday(year, month, weekday) {
    var last = new Date(Date.UTC(year, month, 0));
    var back = (last.getUTCDay() - weekday + 7) % 7;
    return isoFromUTC(last.getTime() - back * 86400000);
  }
  function addDays(dt, n) { return new Date(dt.getTime() + n * 86400000); }
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
  function letterOf(startYear) {
    var mod = startYear % 3;
    if (mod === 0) return "A";
    if (mod === 1) return "B";
    return "C";
  }
  function startYearContaining(iso) {
    var y = Number(iso.slice(0, 4));
    var advent = isoFromUTC(adventSunday(y).getTime());
    return iso >= advent ? y : y - 1;
  }
  function buildYear(startYear) {
    var advent = adventSunday(startYear);
    var next = adventSunday(startYear + 1);
    var startIso = isoFromUTC(advent.getTime());
    var endExclusive = isoFromUTC(next.getTime());
    var easter = easterSunday(startYear + 1);
    var easterIso = isoFromUTC(easter.getTime());
    function off(n) { return isoFromUTC(easter.getTime() + n * 86400000); }
    var ash = off(-46);
    var palm = off(-7);
    var pentecost = off(49);
    var trinity = off(56);
    var christmas = startYear + "-12-25";
    var epiphany = (startYear + 1) + "-01-06";
    var cuts = [
      ["advent", startIso, christmas],
      ["christmas", christmas, epiphany],
      ["epiphany", epiphany, ash],
      ["lent", ash, palm],
      ["holyweek", palm, easterIso],
      ["easter", easterIso, pentecost],
      ["pentecost", pentecost, trinity],
      ["ordinary", trinity, endExclusive]
    ];
    var feasts = {};
    function put(iso, name) {
      if (iso >= startIso && iso < endExclusive && !feasts[iso]) feasts[iso] = name;
    }
    put(startYear + "-11-30", "St. Andrew");
    put((startYear + 1) + "-11-30", "St. Andrew");
    put(christmas, "Christmas");
    put((startYear + 1) + "-01-01", "Holy Name");
    put(epiphany, "Epiphany");
    put((startYear + 1) + "-02-02", "Presentation");
    put((startYear + 1) + "-03-25", "Annunciation");
    put((startYear + 1) + "-08-06", "Transfiguration");
    put((startYear + 1) + "-09-14", "Holy Cross");
    put((startYear + 1) + "-11-01", "All Saints");
    feasts[ash] = "Ash Wednesday";
    feasts[palm] = "Palm Sunday";
    feasts[off(-2)] = "Good Friday";
    feasts[easterIso] = "Easter";
    feasts[off(39)] = "Ascension";
    feasts[pentecost] = "Pentecost";
    feasts[trinity] = "Trinity";
    feasts[isoFromUTC(next.getTime() - 7 * 86400000)] = "Christ the King";
    var letter = letterOf(startYear);
    return {
      startYear: startYear,
      letter: letter,
      startIso: startIso,
      endExclusive: endExclusive,
      count: Math.round((next.getTime() - advent.getTime()) / 86400000),
      cuts: cuts,
      feasts: feasts,
      ash: ash,
      palm: palm,
      easterIso: easterIso,
      goodFriday: off(-2),
      holySaturday: off(-1),
      ascension: off(39),
      pentecost: pentecost,
      trinity: trinity,
      christKing: isoFromUTC(next.getTime() - 7 * 86400000)
    };
  }
  function shownYear() {
    var offset = state.church === -1 || state.church === 1 ? state.church : 0;
    return buildYear(startYearContaining(localTodayIso()) + offset);
  }
  function yearTag(year) {
    var endYear = String(year.startYear + 1);
    return year.startYear + "\u2013" + endYear.slice(2);
  }
  function isoShift(iso, days) {
    var bits = iso.split("-");
    return isoFromUTC(Date.UTC(Number(bits[0]), Number(bits[1]) - 1, Number(bits[2])) + days * 86400000);
  }
  function longDate(iso) {
    var bits = iso.split("-");
    var dt = new Date(Date.UTC(Number(bits[0]), Number(bits[1]) - 1, Number(bits[2])));
    return MONTH_NAME[dt.getUTCMonth()] + " " + dt.getUTCDate() + ", " + dt.getUTCFullYear();
  }
  function monthDay(iso) {
    var bits = iso.split("-");
    var dt = new Date(Date.UTC(Number(bits[0]), Number(bits[1]) - 1, Number(bits[2])));
    return MONTH_NAME[dt.getUTCMonth()] + " " + dt.getUTCDate();
  }
  function weekdayOf(iso) {
    var bits = iso.split("-");
    var dt = new Date(Date.UTC(Number(bits[0]), Number(bits[1]) - 1, Number(bits[2])));
    return WEEKDAY[dt.getUTCDay()];
  }
  function yearSwitch() {
    function btn(offset, label) {
      var sample = buildYear(startYearContaining(localTodayIso()) + offset);
      var on = (state.church === -1 || state.church === 1 ? state.church : 0) === offset;
      return '<button type="button" data-church="' + offset + '" aria-pressed="' + (on ? "true" : "false") + '" title="' + esc("Year " + sample.letter + ", " + yearTag(sample)) + '">' + label + "</button>";
    }
    return '<div class="dial-styles year-switch" role="group" aria-label="Church year">' + btn(-1, "Previous") + btn(0, "This year") + btn(1, "Next") + "</div>";
  }
  function seasonYearNote(id) {
    var year = shownYear();
    var cut = null;
    year.cuts.forEach(function (row) { if (row[0] === id) cut = row; });
    if (!cut) return "";
    var start = monthDay(cut[1]);
    var end = monthDay(isoShift(cut[2], -1));
    if (id === "advent") return "This year the ring runs from " + start + " through " + end + ". Christmas Day begins the next season. The four weeks are short on purpose. The church practices wanting what it does not yet hold.";
    if (id === "christmas") return "On this wheel the ring runs from " + longDate(cut[1]) + ", through " + longDate(isoShift(cut[2], -1)) + ". January 6 is the Epiphany and starts the next ring. For these twelve days the year stays with one birth: the Word made flesh, in a particular place, visited by shepherds who were told not to be afraid.";
    if (id === "epiphany") return "This year the ring runs from " + start + " through " + end + ".";
    if (id === "lent") return "On this wheel the violet ring runs from Ash Wednesday, " + longDate(year.ash) + ", through " + longDate(isoShift(year.palm, -1)) + ", the day before Palm Sunday.";
    if (id === "holyweek") {
      var note = "This year Palm Sunday is " + longDate(year.palm) + ", Good Friday is " + monthDay(year.goodFriday) + ", and Holy Saturday is " + monthDay(year.holySaturday) + ". Easter Day is " + longDate(year.easterIso) + ".";
      var ann = (year.startYear + 1) + "-03-25";
      if (ann >= year.palm && ann <= year.holySaturday) note += " March 25, the Annunciation, falls on " + weekdayOf(ann) + " of this week. The date remains the feast\u2019s day. Many modern calendars keep the observance on a day after Easter, so the week is not asked to celebrate two mysteries at once.";
      return note + " The ring is short, and it is meant to be walked slowly.";
    }
    if (id === "easter") return "This year Easter Day is " + longDate(year.easterIso) + ". The Easter ring runs from " + monthDay(year.easterIso) + " through " + monthDay(isoShift(year.pentecost, -1)) + ", the eve of Pentecost. Ascension Day, always a Thursday, is " + monthDay(year.ascension) + ".";
    if (id === "pentecost") return "This year the red ring runs from " + monthDay(year.pentecost) + " through " + monthDay(isoShift(year.trinity, -1)) + ". Trinity Sunday, " + monthDay(year.trinity) + ", opens the long green season.";
    if (id === "ordinary") {
      var gospel = year.letter === "A" ? "Matthew" : year.letter === "C" ? "Luke" : "Mark, with John brought in where Mark is brief";
      return "This year the green runs from " + longDate(year.trinity) + " to " + longDate(isoShift(year.endExclusive, -1)) + ", the eve of the next Advent. The Gospel read on the Sundays is " + gospel + ". The last Sunday, " + longDate(year.christKing) + ", is Christ the King.";
    }
    return "";
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
    var cuts = shownYear().cuts;
    for (var i = 0; i < cuts.length; i++) {
      if (iso >= cuts[i][1] && iso < cuts[i][2]) return cuts[i][0];
    }
    return "ordinary";
  }
  function seasonSpan(id) {
    var cuts = shownYear().cuts;
    var cut = null;
    for (var i = 0; i < cuts.length; i++) {
      if (cuts[i][0] === id) cut = cuts[i];
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
    var story = SEASON_STORY[id] ? SEASON_STORY[id].slice() : null;
    if (!story) return "";
    var extra = seasonYearNote(id);
    if (extra) story.push(extra);
    var fog = state.style === "fog";
    var stripe = fog ? (FOG_COLORS[id] || FOG_COLORS.ordinary).fill : (STRIPE[id] || "#6e5430");
    var paras = story.map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("");
    return '<aside class="dial-read"><article class="season-essay" style="--season:' + stripe + '"><header><p class="season-kicker">The season</p><h3>' + esc(seasonName(id)) + "</h3><time>" + esc(seasonSpan(id)) + "</time>" + contextButton("season", id, seasonName(id)) + "</header>" + paras + "</article></aside>";
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
  function daysForYear(year) {
    var list = [];
    var origin = Date.parse(year.startIso + "T00:00:00Z");
    for (var i = 0; i < year.count; i++) {
      var t = origin + i * 86400000;
      var iso = isoFromUTC(t);
      var dt = new Date(t);
      var season = "ordinary";
      for (var c = 0; c < year.cuts.length; c++) {
        if (iso >= year.cuts[c][1] && iso < year.cuts[c][2]) { season = year.cuts[c][0]; break; }
      }
      list.push({
        i: i,
        iso: iso,
        y: dt.getUTCFullYear(),
        m: dt.getUTCMonth() + 1,
        d: dt.getUTCDate(),
        dow: dt.getUTCDay(),
        season: season,
        monthKey: iso.slice(0, 7),
        propers: PROPER_AT[iso] || [],
        feast: year.feasts[iso] || ""
      });
    }
    return list;
  }
  function yearDays() {
    var year = shownYear();
    if (yearDays.cache && yearDays.cacheKey === year.startIso) return yearDays.cache;
    var list = daysForYear(year);
    yearDays.cache = list;
    yearDays.cacheKey = year.startIso;
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
  function liturgicalNames(day) {
    var names = [];
    day.propers.forEach(function (idx) {
      var properName = PROPERS[idx].name;
      if (properName.indexOf("Vigil") === -1 && names.indexOf(properName) === -1) names.push(properName);
    });
    if (!names.length) {
      day.propers.forEach(function (idx) {
        var vigilName = PROPERS[idx].name;
        if (names.indexOf(vigilName) === -1) names.push(vigilName);
      });
    }
    if (day.feast && names.indexOf(day.feast) === -1) names.push(day.feast);
    return names;
  }
  function holyName(day) {
    var names = liturgicalNames(day);
    var holy = WEEKDAY[day.dow];
    for (var ni = 0; ni < names.length; ni++) {
      if (!/^Proper \d+$/.test(names[ni])) { holy = names[ni]; break; }
    }
    if (holy === WEEKDAY[day.dow] && names.length) holy = names[0];
    return holy;
  }
  function isNamedOccasion(day) {
    if (day.dow === 0) return true;
    if (day.feast) return true;
    return holyName(day) !== WEEKDAY[day.dow];
  }
  function upcomingOccasions(fromIso, count) {
    var start = startYearContaining(fromIso);
    var found = [];
    for (var step = 0; step < 3 && found.length < count; step++) {
      var list = daysForYear(buildYear(start + step));
      for (var i = 0; i < list.length && found.length < count; i++) {
        if (list[i].iso <= fromIso) continue;
        if (isNamedOccasion(list[i])) found.push(list[i]);
      }
    }
    return found;
  }
  function dayCenter(day) {
    var names = liturgicalNames(day);
    var holy = holyName(day);
    var dateLine = MONTH_NAME[day.m - 1] + " " + day.d;
    var kicker = holy === WEEKDAY[day.dow] ? seasonName(day.season) : WEEKDAY[day.dow];
    var bits = [dateLine];
    names.forEach(function (name) { if (name !== holy && bits.indexOf(name) === -1) bits.push(name); });
    var season = seasonName(day.season);
    if (kicker !== season && bits.indexOf(season) === -1) bits.push(season);
    return { holy: holy, kicker: kicker, sub: bits.join(" · "), long: holy.length > 16 };
  }
  function dial() {
    pinDay();
    var days = sliceDays();
    if (!days.length) days = yearDays();
    var fog = state.style === "fog";
    var hotInk = fog ? "#f5f5f7" : "#ff6a00";
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
        var monthOn = kind === "year" && state.monthFocus === key;
        var monthStroke = monthOn
          ? ' stroke="' + (fog ? "#f5f5f7" : "#1c1612") + '" stroke-width="3.2"'
          : (fog ? "" : ' stroke="#b08d57" stroke-width="0.8"');
        var monthFace = monthOn && !fog ? "#fff8e7" : monthFill;
        parts.push('<g data-cut="month" data-month="' + key + '" role="button" tabindex="0" aria-pressed="' + (monthOn ? "true" : "false") + '" aria-label="' + esc(full) + '"><path class="slice' + (monthOn ? " is-month" : "") + '" d="' + wedgePath(box[0], box[1], p.a0, p.a1) + '" fill="' + monthFace + '"' + monthStroke + '><title>' + esc(full) + "</title></path>" + ringLabel(label, p.a0, p.a1, box[0], box[1], monthInk, "month-name") + "</g>");
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
    function monthClusterPaths(cells) {
      var cols = [];
      cells.forEach(function (cell) {
        var key = Math.round(cell.a0 * 10000);
        var col = null;
        for (var i = 0; i < cols.length; i++) if (cols[i].key === key) col = cols[i];
        if (!col) cols.push({ key: key, a0: cell.a0, a1: cell.a1, r0: cell.r0, r1: cell.r1 });
        else {
          if (cell.r0 < col.r0) col.r0 = cell.r0;
          if (cell.r1 > col.r1) col.r1 = cell.r1;
        }
      });
      cols.sort(function (a, b) { return a.a0 - b.a0; });
      if (!cols.length) return [];
      var turn = Math.PI * 2;
      var eps = 0.02;
      var runs = [[cols[0]]];
      for (var c = 1; c < cols.length; c++) {
        var prevCol = cols[c - 1];
        if (Math.abs(cols[c].a0 - prevCol.a1) < eps) runs[runs.length - 1].push(cols[c]);
        else runs.push([cols[c]]);
      }
      if (runs.length > 1) {
        var head = runs[0];
        var tail = runs[runs.length - 1];
        if (Math.abs(head[0].a0 + turn - tail[tail.length - 1].a1) < eps) {
          head.forEach(function (col) { col.a0 += turn; col.a1 += turn; });
          runs[runs.length - 1] = tail.concat(head);
          runs.shift();
        }
      }
      function arcTo(r, a0, a1, sweep) {
        var end = polar(r, a1);
        var large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
        return "A " + n(r) + " " + n(r) + " 0 " + large + " " + sweep + " " + n(end[0]) + " " + n(end[1]);
      }
      function lineTo(r, a) {
        var p = polar(r, a);
        return "L " + n(p[0]) + " " + n(p[1]);
      }
      return runs.map(function (run) {
        var start = polar(run[0].r1, run[0].a0);
        var d = ["M " + n(start[0]) + " " + n(start[1])];
        for (var i = 0; i < run.length; i++) {
          var col = run[i];
          d.push(arcTo(col.r1, col.a0, col.a1, 1));
          var next = run[i + 1];
          if (next) {
            if (Math.abs(next.r1 - col.r1) > 0.4) d.push(lineTo(next.r1, col.a1));
          } else d.push(lineTo(col.r0, col.a1));
        }
        for (var j = run.length - 1; j >= 0; j--) {
          var back = run[j];
          d.push(arcTo(back.r0, back.a1, back.a0, 0));
          var earlier = run[j - 1];
          if (earlier) {
            if (Math.abs(earlier.r0 - back.r0) > 0.4) d.push(lineTo(earlier.r0, back.a0));
          } else d.push(lineTo(run[0].r1, run[0].a0));
        }
        d.push("Z");
        return d.join(" ");
      });
    }
    var hot = null;
    var todayPath = "";
    var monthCells = [];
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
        if (day.iso === state.day) stroke = ' stroke="' + hotInk + '" stroke-width="2.8"';
        var path = wedgePath(ring[0], ring[1], a0, a1);
        if (day.iso === state.day) hot = path;
        if (isToday) todayPath = path;
        if (kind === "year" && state.monthFocus && day.m === state.monthFocus) {
          monthCells.push({ a0: a0, a1: a1, r0: ring[0], r1: ring[1] });
        }
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
    if (monthCells.length) {
      var clusterInk = fog ? "#f5f5f7" : "#1c1612";
      var clusterFill = fog ? "rgba(245,245,247,0.2)" : "rgba(255,244,214,0.46)";
      monthClusterPaths(monthCells).forEach(function (d) {
        parts.push('<path class="month-cluster" d="' + d + '" fill="' + clusterFill + '" stroke="' + clusterInk + '" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" pointer-events="none"/>');
      });
    }
    if (hot) parts.push('<path class="day-pick" d="' + hot + '" fill="none" stroke="' + hotInk + '" stroke-width="3.4" pointer-events="none"/>');
    if (todayPath) parts.push('<path class="today-beat" d="' + todayPath + '" fill="' + (fog ? "rgba(245,245,247,0.28)" : "rgba(255,248,231,0.55)") + '" stroke="' + (fog ? "#f5f5f7" : "#fff8e7") + '" stroke-width="3.2" pointer-events="none"/>');

    var year = shownYear();
    var title = yearTag(year);
    var sub = days.length + " days · " + yearTag(year);
    var kicker = "Year " + year.letter;
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
        var center = dayCenter(picked);
        title = center.holy;
        var bits = [MONTH_NAME[picked.m - 1] + " " + picked.d];
        liturgicalNames(picked).forEach(function (name) {
          if (name !== center.holy && bits.indexOf(name) === -1) bits.push(name);
        });
        if (center.holy !== WEEKDAY[picked.dow]) bits.push(WEEKDAY[picked.dow]);
        if (bits.indexOf(seasonName(picked.season)) === -1) bits.push(seasonName(picked.season));
        bits.push(yearTag(year));
        sub = bits.join(" · ");
      }
    }
    var crumbs = [];
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
    var tools = "";
    if (kind !== "year" && properCount) tools += '<button type="button" class="dial-text" data-board>Readings</button>';
    var read = "";
    var showUpcoming = false;
    var chosen = null;
    days.forEach(function (d) { if (d.iso === state.day) chosen = d; });
    if (state.card && SEASON_STORY[state.card]) {
      read = seasonCard(state.card);
    } else if (chosen) {
      var stripe = fog ? (colors[chosen.season] || colors.ordinary).fill : (STRIPE[chosen.season] || "#6e5430");
      var body = dayCardBody(chosen);
      var upcoming = "";
      if (!document.body.getAttribute("data-desk") && chosen.iso === localTodayIso()) {
        var nextDays = upcomingOccasions(chosen.iso, 4);
        if (nextDays.length) {
          var blocks = nextDays.map(function (day) {
            var dayStripe = fog ? (colors[day.season] || colors.ordinary).fill : (STRIPE[day.season] || "#6e5430");
            return '<div class="sundays" style="--season:' + dayStripe + '">' + dayCardBody(day) + "</div>";
          }).join("");
          upcoming = '<section class="upcoming" aria-label="Upcoming"><p class="season-kicker">Upcoming</p><div class="upcoming-list">' + blocks + "</div></section>";
        }
      }
      showUpcoming = !!upcoming;
      read = '<aside class="dial-read' + (upcoming ? " is-today" : "") + '"><div class="sundays" style="--season:' + stripe + '">' + body + "</div>" + upcoming + "</aside>";
    }
    var library = "";
    if (kind !== "year") {
      var seasonIds = {};
      days.forEach(function (d) { seasonIds[d.season] = true; });
      var found = allResources().filter(function (item) { return seasonIds[item.season] && matches(item) && matchesContext(item); });
      if (found.length) library = '<div class="dial-library">' + cards(found) + "</div>";
    }
    var arrive = state.settle ? " is-arriving" : "";
    var bar = "";
    if (crumbs.length || tools) bar = '<div class="dial-bar"><nav class="crumbs" aria-label="Slice">' + crumbs.join('<span class="crumb-sep" aria-hidden="true">/</span>') + '</nav><div class="dial-tools">' + tools + '</div></div>';
    return '<div class="dial' + arrive + (showUpcoming ? " is-today" : "") + '" data-look="' + state.style + '">' + bar + '<div class="dial-stage"><div class="dial-col">' + yearSwitch() + '<div class="dial-frame"><svg class="dial-svg" viewBox="0 0 1000 1000" role="group" aria-label="Liturgical year ' + esc(yearTag(year)) + '. Sundays sit on the outer ring, and each week snakes inward to Saturday.">' + parts.join("") + '</svg><div class="dial-hub"><p class="dial-kicker" data-rest="' + esc(kicker) + '">' + esc(kicker) + "</p><h2" + (title.length > 16 ? ' class="is-long"' : "") + " data-rest=\"" + esc(title) + "\">" + esc(title) + '</h2><p class="dial-sub" data-rest="' + esc(sub) + '">' + esc(sub) + "</p></div></div></div>" + read + "</div>" + library + "</div>";
  }

  function topics() {
    var grid = TOPICS.map(function (topic) {
      var line = topic.about ? '<span class="choice-line">' + esc(topic.about) + "</span>" : "";
      return '<button type="button" data-topic="' + topic.id + '" aria-pressed="' + (state.topic === topic.id) + '"><span class="choice-name">' + esc(topic.name) + "</span>" + line + "</button>";
    }).join("");
    var rest = "";
    if (state.topic) {
      var topic = TOPICS.filter(function (t) { return t.id === state.topic; })[0];
      var chips = topic.subs.length ? '<div class="chips" role="group" aria-label="Subtopics">' + topic.subs.map(function (sub) {
        return '<button type="button" data-sub="' + esc(sub) + '" aria-pressed="' + (state.sub === sub) + '">' + esc(sub) + "</button>";
      }).join("") + "</div>" : "";
      var list = state.added.concat(LIBRARY).filter(function (item) {
        return item.topic === topic.id && matches(item) && matchesContext(item) && (!state.sub || item.sub === state.sub);
      });
      rest = '<p class="context-row">' + contextButton("topic", topic.id, topic.name) + (state.sub ? contextButton("sub", state.sub, state.sub) : "") + "</p>" + chips + cards(list);
    }
    return '<section class="choice-block"><h2>Topic</h2><div class="topic-grid">' + grid + "</div>" + rest + "</section>";
  }

  function audiences() {
    var grid = AUDIENCES.map(function (name) {
      return '<button type="button" data-audience="' + esc(name) + '" aria-pressed="' + (state.audience === name) + '"><span class="choice-name">' + esc(name) + '</span><span class="choice-line">' + esc(AUDIENCE_ABOUT[name] || "") + "</span></button>";
    }).join("");
    var rest = "";
    if (state.audience) {
      var list = state.added.concat(LIBRARY).filter(function (item) {
        return item.audience === state.audience && matches(item) && matchesContext(item);
      });
      rest = '<p class="context-row">' + contextButton("audience", state.audience, state.audience) + "</p>" + cards(list);
    }
    return '<section class="choice-block"><h2>Audience</h2><div class="topic-grid">' + grid + "</div>" + rest + "</section>";
  }

  function topicAudience() {
    return '<div class="listed">' + topics() + audiences() + "</div>";
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

  var LIT_KINDS = [
    { id: "canonical", name: "Canonical" },
    { id: "eccles", name: "Ecclesiastical" },
    { id: "national", name: "National" }
  ];

  function litKind() {
    var kind = "canonical";
    LIT_KINDS.forEach(function (item) { if (item.id === state.lit) kind = item.id; });
    return kind;
  }

  function litToggle(kind) {
    return '<div class="lit-toggle" role="group" aria-label="Literature">' + LIT_KINDS.map(function (item) {
      return '<button type="button" data-lit="' + item.id + '" aria-pressed="' + (item.id === kind) + '">' + esc(item.name) + "</button>";
    }).join("") + "</div>";
  }

  function writeLitHash() {
    if (state.module !== "literature") {
      if (location.hash.indexOf("#literature") === 0) history.replaceState(null, "", location.pathname + location.search);
      return;
    }
    var kind = litKind();
    var raw = location.hash.replace(/^#/, "").split("/");
    if (raw[0] === "literature" && raw[1] === kind && (kind === "eccles" || kind === "national") && raw[2]) return;
    var next = "#literature/" + kind;
    if (location.hash !== next) history.replaceState(null, "", location.pathname + location.search + next);
  }

  function syncLitHome() {
    var bar = document.getElementById("lit-bar");
    var analysis = document.body.getAttribute("data-desk") === "analysis";
    if (analysis || state.module !== "literature") {
      document.body.removeAttribute("data-lit");
      if (bar) { bar.hidden = true; bar.innerHTML = ""; }
      return;
    }
    var kind = litKind();
    state.lit = kind;
    document.body.setAttribute("data-lit", kind);
    if (bar) {
      bar.hidden = false;
      bar.innerHTML = litToggle(kind);
    }
    writeLitHash();
  }

  function canonCard(item) {
    var bits = [];
    if (item.fileName) bits.push(item.fileName);
    var links = "";
    if (item.link) links += '<a href="' + esc(item.link) + '" target="_blank" rel="noopener">Open link</a>';
    if (canonBlobs[item.id]) links += '<a href="' + esc(canonBlobs[item.id]) + '" target="_blank" rel="noopener">Open file</a>';
    var filter = contextButton("work", "canonical:" + item.id, item.title);
    return '<article class="card" data-canon-item="' + esc(item.id) + '"><header><span>' + esc(item.format) + "</span></header><h3>" + esc(item.title) + "</h3>" +
      (item.summary ? "<p>" + esc(item.summary) + "</p>" : "") +
      (bits.length ? '<p class="meta">' + esc(bits.join(" · ")) + "</p>" : "") +
      '<div class="card-actions">' + filter + links + "</div></article>";
  }

  function knownWork(id) {
    if (WORKS.some(function (w) { return w.id === id; })) return true;
    if (String(id).indexOf("canonical:") !== 0) return false;
    var postId = String(id).slice("canonical:".length);
    if (!postId) return false;
    var added = state && state.added ? state.added : loadAdded();
    return added.some(function (item) { return item.shelf === "canonical" && item.id === postId; });
  }
  function workLabel(id) {
    var found = "";
    WORKS.forEach(function (w) { if (w.id === id) found = w.label; });
    if (found) return found;
    if (String(id).indexOf("canonical:") !== 0) return "";
    var postId = String(id).slice("canonical:".length);
    var added = state && state.added ? state.added : loadAdded();
    var title = "";
    added.forEach(function (item) { if (item.id === postId) title = item.title; });
    return title;
  }
  function workChoices() {
    var list = WORKS.map(function (w) { return { id: w.id, label: w.label }; });
    var added = state && state.added ? state.added : [];
    added.forEach(function (item) {
      if (item.shelf !== "canonical") return;
      list.push({ id: "canonical:" + item.id, label: item.title });
    });
    return list;
  }
  function itemWorks(item) {
    var ids = [];
    (item.works || []).forEach(function (id) {
      if (ids.indexOf(id) === -1) ids.push(id);
    });
    if (item.shelf === "canonical") {
      var own = "canonical:" + item.id;
      if (ids.indexOf(own) === -1) ids.push(own);
    }
    return ids;
  }
  function contextHas(kind, id) {
    if (kind === "feast" || kind === "holiday" || kind === "national") {
      return state.context.occasions.some(function (o) { return o.id === id; });
    }
    if (kind === "work") return state.context.works.some(function (w) { return w.id === id; });
    return state.context[kind] === id;
  }
  function contextButton(kind, id, label) {
    var on = contextHas(kind, id);
    return '<button type="button" class="context-add" data-context-add="' + esc(kind) + '" data-context-id="' + esc(id) + '" data-context-label="' + esc(label) + '" aria-pressed="' + on + '">' + (on ? "In filters" : "Add filter") + "</button>";
  }
  function matchesContext(item, opts) {
    var c = state.context;
    opts = opts || {};
    if (c.lectYear && item.lectYear !== c.lectYear) return false;
    if (c.season && item.season !== c.season) return false;
    if (c.lectDay && (String(item.lectDay || "") !== String(c.lectDay.id) || item.lectDayYear !== c.lectDay.year || item.lectDaySeason !== c.lectDay.season)) return false;
    if (c.audience && item.audience !== c.audience) return false;
    if (c.topic && item.topic !== c.topic) return false;
    if (c.sub && item.sub !== c.sub) return false;
    if (!opts.skipShelf && c.shelf && (item.shelf || "") !== c.shelf) return false;
    if (c.occasions.length) {
      var tags = item.occasions || [];
      var hit = false;
      c.occasions.forEach(function (o) { if (tags.indexOf(o.id) !== -1) hit = true; });
      if (!hit) return false;
    }
    if (c.works.length) {
      var works = itemWorks(item);
      var workHit = false;
      c.works.forEach(function (w) { if (works.indexOf(w.id) !== -1) workHit = true; });
      if (!workHit) return false;
    }
    if (c.testament && item.testament !== c.testament) return false;
    if (c.section && item.section !== c.section) return false;
    if (c.book && item.book !== c.book) return false;
    return true;
  }
  function feedItems() {
    return state.added.concat(LIBRARY).filter(function (item) {
      return matches(item) && matchesContext(item);
    });
  }
  function shelvedPosts(kind) {
    return state.added.filter(function (item) {
      return item.shelf === kind && matches(item) && matchesContext(item, { skipShelf: true });
    });
  }
  function shelfLabel(id) {
    var found = null;
    LIT_KINDS.forEach(function (item) { if (item.id === id) found = item; });
    return found ? found.name : id;
  }
  function inShownYear(year, iso) {
    return iso >= year.startIso && iso < year.endExclusive;
  }
  function fixedIso(year, md) {
    var hits = [];
    [year.startYear, year.startYear + 1].forEach(function (y) {
      var iso = y + "-" + md;
      if (inShownYear(year, iso)) hits.push(iso);
    });
    return hits;
  }
  function yearOccasions(year) {
    var feasts = [];
    var holidays = [];
    var national = [];
    function add(list, kind, id, label, iso) {
      if (!inShownYear(year, iso)) return;
      list.push({ id: kind + ":" + id, kind: kind, label: label, iso: iso });
    }
    FEAST_FIXED.forEach(function (row) {
      fixedIso(year, row[2]).forEach(function (iso) { add(feasts, "feast", row[0], row[1], iso); });
    });
    add(feasts, "feast", "ash-wednesday", "Ash Wednesday", year.ash);
    add(feasts, "feast", "palm-sunday", "Palm Sunday", year.palm);
    add(feasts, "feast", "good-friday", "Good Friday", year.goodFriday);
    add(feasts, "feast", "easter", "Easter", year.easterIso);
    add(feasts, "feast", "ascension", "Ascension", year.ascension);
    add(feasts, "feast", "pentecost", "Pentecost", year.pentecost);
    add(feasts, "feast", "trinity", "Trinity", year.trinity);
    add(feasts, "feast", "christ-the-king", "Christ the King", year.christKing);
    [year.startYear, year.startYear + 1].forEach(function (y) {
      add(holidays, "holiday", "mlk", "Martin Luther King Jr. Day", nthWeekday(y, 1, 1, 3));
      add(holidays, "holiday", "washington", "Washington's Birthday", nthWeekday(y, 2, 1, 3));
      add(holidays, "holiday", "memorial", "Memorial Day", lastWeekday(y, 5, 1));
      add(holidays, "holiday", "juneteenth", "Juneteenth", y + "-06-19");
      add(holidays, "holiday", "labor", "Labor Day", nthWeekday(y, 9, 1, 1));
      add(holidays, "holiday", "columbus", "Columbus Day", nthWeekday(y, 10, 1, 2));
      add(holidays, "holiday", "veterans", "Veterans Day", y + "-11-11");
      add(national, "national", "independence", "Independence Day", y + "-07-04");
      add(national, "national", "thanksgiving", "Thanksgiving Day", nthWeekday(y, 11, 4, 4));
    });
    function byDate(a, b) { return a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : 0; }
    feasts.sort(byDate);
    holidays.sort(byDate);
    national.sort(byDate);
    return { feasts: feasts, holidays: holidays, national: national };
  }
  function occasionOpen(key) {
    try {
      var raw = JSON.parse(sessionStorage.getItem("ar-occasions") || "{}");
      if (raw && typeof raw[key] === "boolean") return raw[key];
    } catch (e) {}
    return true;
  }
  function occasionSection(title, key, rows) {
    if (!rows.length) return "";
    var open = occasionOpen(key);
    var items = rows.map(function (row) {
      return "<li><div><strong>" + esc(row.label) + "</strong><span>" + esc(weekdayOf(row.iso) + ", " + longDate(row.iso)) + "</span></div>" + contextButton(row.kind, row.id, row.label) + "</li>";
    }).join("");
    return '<section class="occasion-group' + (open ? "" : " is-collapsed") + '"><h2><button type="button" class="occasion-toggle" data-occasion-toggle="' + key + '" aria-expanded="' + (open ? "true" : "false") + '">' + esc(title) + '</button></h2><ul class="occasion-list">' + items + "</ul></section>";
  }
  function occasionBoard() {
    var groups = yearOccasions(shownYear());
    return '<div class="occasion-board">' + occasionSection("Feast days", "feast", groups.feasts) + occasionSection("Major annual holidays", "holiday", groups.holidays) + occasionSection("National holidays", "national", groups.national) + "</div>";
  }
  function kindName(kind) {
    if (kind === "feast") return "Feast";
    if (kind === "holiday") return "Holiday";
    if (kind === "national") return "National";
    if (kind === "lectYear") return "Year";
    if (kind === "season") return "Season";
    if (kind === "lectDay") return "Day";
    if (kind === "topic") return "Topic";
    if (kind === "sub") return "Subtopic";
    if (kind === "audience") return "Audience";
    if (kind === "shelf") return "Shelf";
    if (kind === "work") return "Literature";
    if (kind === "testament") return "Testament";
    if (kind === "section") return "Section";
    if (kind === "book") return "Book";
    return "Context";
  }
  function fixedPill(kind, label) {
    return '<span class="context-pill is-fixed" title="Change this in the menu"><span>' + esc(kind) + "</span>" + esc(label) + "</span>";
  }
  function contextPills() {
    var pills = [];
    if (allLevels()) pills.push(fixedPill("Scholarship", "All"));
    else state.levels.forEach(function (id) {
      var label = id;
      LEVELS.forEach(function (l) { if (l.id === id) label = l.label; });
      pills.push(fixedPill("Scholarship", label));
    });
    var postureLabel = "Any";
    POSTURES.forEach(function (p) { if (p.id === state.posture) postureLabel = p.label; });
    pills.push(fixedPill("Posture", postureLabel));
    function one(kind, id, label) {
      if (!id) return;
      pills.push('<button type="button" class="context-pill" data-context-remove="' + esc(kind) + '" data-context-id="' + esc(id) + '" aria-label="Remove ' + esc(label) + '"><span>' + kindName(kind) + "</span>" + esc(label) + " ×</button>");
    }
    one("lectYear", state.context.lectYear, state.context.lectYear);
    one("season", state.context.season, seasonName(state.context.season));
    if (state.context.lectDay) one("lectDay", state.context.lectDay.id, state.context.lectDay.label);
    one("topic", state.context.topic, (TOPICS.filter(function (t) { return t.id === state.context.topic; })[0] || { name: state.context.topic }).name);
    one("sub", state.context.sub, state.context.sub);
    one("audience", state.context.audience, state.context.audience);
    one("shelf", state.context.shelf, shelfLabel(state.context.shelf));
    one("testament", state.context.testament, state.context.testament);
    one("section", state.context.section, state.context.section);
    one("book", state.context.book, state.context.book);
    state.context.occasions.forEach(function (o) { one(o.kind, o.id, o.label); });
    state.context.works.forEach(function (w) { one("work", w.id, w.label); });
    return '<div class="context-pills">' + pills.join("") + "</div>";
  }
  function resourceById(id) {
    var found = null;
    state.added.concat(LIBRARY).forEach(function (item) { if (item.id === id) found = item; });
    return found;
  }
  function safeHttp(url) {
    return /^https?:\/\//i.test(String(url || "")) ? String(url) : "";
  }
  function itemLink(item) {
    if (safeHttp(item.link)) return item.link;
    var body = String(item.body || "").trim();
    if (safeHttp(body) && body.indexOf(" ") === -1) return body;
    return "";
  }
  function itemText(item) {
    var body = String(item.body || "").trim();
    if (!body || (safeHttp(body) && body.indexOf(" ") === -1)) return "";
    return body;
  }
  function fileExt(name) {
    var clean = String(name || "").split("?")[0].split("#")[0];
    var dot = clean.lastIndexOf(".");
    return dot === -1 ? "" : clean.slice(dot + 1).toLowerCase();
  }
  function extKind(ext) {
    if (["mp4", "webm", "ogv", "mov"].indexOf(ext) !== -1) return "video";
    if (["mp3", "m4a", "wav", "ogg", "aac"].indexOf(ext) !== -1) return "audio";
    if (["jpg", "jpeg", "png", "gif", "webp", "avif"].indexOf(ext) !== -1) return "image";
    if (ext === "pdf") return "pdf";
    return "";
  }
  function youtubeId(url) {
    try {
      var parsed = new URL(url);
      var host = parsed.hostname.replace(/^www\./, "");
      var id = "";
      if (host === "youtu.be") id = parsed.pathname.slice(1);
      else if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
        if (parsed.pathname === "/watch") id = parsed.searchParams.get("v") || "";
        else if (parsed.pathname.indexOf("/embed/") === 0) id = parsed.pathname.slice(7);
        else if (parsed.pathname.indexOf("/shorts/") === 0) id = parsed.pathname.slice(8);
        else if (parsed.pathname.indexOf("/live/") === 0) id = parsed.pathname.slice(6);
      }
      id = String(id).split("/")[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
    } catch (err) { return ""; }
  }
  function vimeoId(url) {
    try {
      var parsed = new URL(url);
      var host = parsed.hostname.replace(/^www\./, "");
      if (host !== "vimeo.com" && host !== "player.vimeo.com") return "";
      var parts = parsed.pathname.split("/").filter(Boolean);
      var id = parts[parts.length - 1] || "";
      return /^[0-9]+$/.test(id) ? id : "";
    } catch (err) { return ""; }
  }
  function linkHost(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (err) { return url; }
  }
  function feedSource(item) {
    var link = itemLink(item);
    var blob = canonBlobs[item.id] || "";
    var name = item.fileName || "";
    var types = typeNames(itemTypes(item));
    var typeLabel = types[0] || item.format || "Note";
    var yt = youtubeId(link);
    if (yt) return { kind: "youtube", play: "https://www.youtube-nocookie.com/embed/" + yt, open: link, label: "Video" };
    var vimeo = vimeoId(link);
    if (vimeo) return { kind: "vimeo", play: "https://player.vimeo.com/video/" + vimeo, open: link, label: "Video" };
    var blobKind = extKind(fileExt(name));
    var linkKind = extKind(fileExt(link));
    function direct(kind) {
      if (blob && blobKind === kind) return { play: blob, open: blob, label: name || kind };
      if (link && linkKind === kind) return { play: link, open: link, label: kind === "pdf" ? "PDF" : kind };
      return null;
    }
    var video = direct("video");
    if (video) return { kind: "video", play: video.play, open: video.open, label: video.label };
    var audio = direct("audio");
    if (audio) return { kind: "audio", play: audio.play, open: audio.open, label: audio.label };
    var image = direct("image");
    if (image) return { kind: "image", play: image.play, open: image.open, label: image.label };
    var pdf = direct("pdf");
    if (pdf) return { kind: "pdf", play: pdf.play, open: pdf.open, label: name || "PDF" };
    if (blob) return { kind: "file", play: blob, open: blob, label: name || typeLabel };
    if (link) return { kind: "link", play: "", open: link, label: linkHost(link) };
    var text = itemText(item);
    if (text) return { kind: "text", play: "", open: "", label: typeLabel, text: text };
    return { kind: "note", play: "", open: "", label: typeLabel };
  }
  function feedFrame(item, source) {
    var allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    return '<div class="post-frame"><iframe src="' + esc(source.play) + '" title="' + esc(item.title) + '" allow="' + allow + '" allowfullscreen></iframe></div>';
  }
  function feedWidget(item, source, open) {
    var expand = '<button type="button" class="post-expand" data-feed-act="expand">Expand</button>';
    if (source.kind === "youtube" || source.kind === "vimeo") {
      return '<div class="post-widget" data-feed-kind="' + source.kind + '">' + feedFrame(item, source) + expand + "</div>";
    }
    if (source.kind === "video") {
      return '<div class="post-widget" data-feed-kind="video"><video controls playsinline preload="metadata" src="' + esc(source.play) + '"></video>' + expand + "</div>";
    }
    if (source.kind === "audio") {
      return '<div class="post-widget is-audio" data-feed-kind="audio"><span class="post-widget-kicker">Audio</span><audio controls preload="metadata" src="' + esc(source.play) + '"></audio>' + expand + "</div>";
    }
    if (source.kind === "image") {
      return '<button type="button" class="post-widget" data-feed-act="expand" data-feed-kind="image"><img src="' + esc(source.play) + '" alt=""><span class="post-expand">Expand</span></button>';
    }
    if (source.kind === "pdf" || source.kind === "file") {
      return '<button type="button" class="post-widget is-file" data-feed-act="expand" data-feed-kind="' + source.kind + '"><span class="post-widget-kicker">' + (source.kind === "pdf" ? "PDF" : "File") + "</span><strong>" + esc(source.label) + "</strong></button>";
    }
    if (source.kind === "link") {
      return '<div class="post-widget is-link" data-feed-kind="link"><a href="' + esc(source.open) + '" target="_blank" rel="noopener"><span class="post-widget-kicker">Link</span><strong>' + esc(item.title) + "</strong><span>" + esc(source.label) + "</span></a>" + expand + "</div>";
    }
    if (source.kind === "text") {
      return '<div class="post-widget is-text" data-feed-kind="text"><span class="post-widget-kicker">' + esc(source.label) + '</span><span class="post-excerpt' + (open ? " is-full" : "") + '">' + esc(source.text) + "</span>" + expand + "</div>";
    }
    return '<div class="post-widget is-note" data-feed-kind="note"><span class="post-widget-kicker">' + esc(source.label) + "</span><strong>No file attached</strong>" + expand + "</div>";
  }
  function feedPost(item) {
    var source = feedSource(item);
    var open = state.feedOpen === item.id;
    var types = typeNames(itemTypes(item));
    var name = types[0] || item.format || "Note";
    var initial = (name.replace(/[^A-Za-z0-9]/g, "").slice(0, 1) || "N").toUpperCase();
    var meta = [];
    if (types.length > 1) meta.push(types.slice(1).join(", "));
    if (item.audience) meta.push(item.audience);
    if (item.lectYear) meta.push("Year " + item.lectYear);
    if (item.season) meta.push(seasonName(item.season));
    if (item.lectDayLabel) meta.push(item.lectDayLabel);
    var summary = item.summary ? '<p class="post-summary">' + esc(item.summary) + "</p>" : "";
    var actions = "";
    if (open) {
      var controls = ['<button type="button" data-feed-act="close">Close</button>', '<button type="button" data-feed-act="expand">Open item</button>'];
      if (source.open) controls.push('<a href="' + esc(source.open) + '" target="_blank" rel="noopener">' + (source.kind === "link" || source.kind === "youtube" || source.kind === "vimeo" ? "Open link" : "Open file") + "</a>");
      actions = '<div class="post-actions">' + controls.join("") + "</div>";
    }
    return '<article class="post' + (open ? " is-open" : "") + '" data-feed="' + esc(item.id) + '" tabindex="0" aria-expanded="' + (open ? "true" : "false") + '"><div class="post-avatar" aria-hidden="true">' + esc(initial) + '</div><div class="post-main"><div class="post-id"><strong class="post-name">' + esc(name) + "</strong>" + (meta.length ? '<span class="post-meta"> · ' + esc(meta.join(" · ")) + "</span>" : "") + '</div><h3 class="post-title">' + esc(item.title) + "</h3>" + summary + feedWidget(item, source, open) + actions + "</div></article>";
  }
  function feedViewerHtml() {
    if (!state.feedMedia) return "";
    var item = resourceById(state.feedMedia);
    if (!item) return "";
    var source = feedSource(item);
    var view = "";
    if (source.kind === "youtube" || source.kind === "vimeo") view = '<div class="feed-view-frame">' + feedFrame(item, source) + "</div>";
    else if (source.kind === "video") view = '<video controls playsinline autoplay src="' + esc(source.play) + '"></video>';
    else if (source.kind === "audio") view = '<audio controls autoplay src="' + esc(source.play) + '"></audio>';
    else if (source.kind === "image") view = '<img src="' + esc(source.play) + '" alt="' + esc(item.title) + '">';
    else if (source.kind === "pdf") view = '<iframe class="feed-view-doc" src="' + esc(source.play) + '" title="' + esc(item.title) + '"></iframe>';
    else if (source.kind === "link" || source.kind === "file") view = '<p class="feed-view-url">' + esc(source.label) + "</p>";
    else view = '<div class="feed-view-read">' + (item.summary ? "<p>" + esc(item.summary) + "</p>" : "") + (source.text ? '<div class="post-body">' + esc(source.text) + "</div>" : "") + "</div>";
    var go = source.open ? '<a href="' + esc(source.open) + '" target="_blank" rel="noopener">' + (source.kind === "link" || source.kind === "youtube" || source.kind === "vimeo" ? "Open link" : "Open file") + "</a>" : "";
    return '<div id="feed-viewer" class="feed-view"><div class="feed-view-backdrop" data-feed-act="close-view"></div><div class="feed-view-panel" role="dialog" aria-modal="true" aria-label="' + esc(item.title) + '"><header><h2>' + esc(item.title) + '</h2><div class="post-actions">' + go + '<button type="button" data-feed-act="close-view">Close</button></div></header>' + view + "</div></div>";
  }
  function mountFeedViewer() {
    var html = feedViewerHtml();
    var current = document.getElementById("feed-viewer");
    if (!html) {
      if (current) current.remove();
      return;
    }
    if (current) current.outerHTML = html;
    else document.body.insertAdjacentHTML("beforeend", html);
  }
  function contextFeedHtml() {
    var list = feedItems();
    if (!list.length) {
      var anyPosts = state.added.concat(LIBRARY).length;
      return '<p class="empty">' + (anyPosts ? "Nothing matches these filters." : "Nothing is in the library yet.") + "</p>";
    }
    return "<ul>" + list.map(function (item) { return "<li>" + feedPost(item) + "</li>"; }).join("") + "</ul>";
  }
  function filtersCollapsed() {
    try { return sessionStorage.getItem("ar-filters-collapsed") !== "0"; } catch (e) { return true; }
  }
  function contentCollapsed() {
    try { return sessionStorage.getItem("ar-content-collapsed") !== "0"; } catch (e) { return true; }
  }
  function renderContextPane() {
    var pane = document.getElementById("context-pane");
    if (!pane) return;
    var scroll = pane.scrollTop;
    var collapsed = filtersCollapsed();
    pane.classList.toggle("is-collapsed", collapsed);
    var toggle = '<button type="button" class="context-collapse" data-filters-toggle aria-expanded="' + (collapsed ? "false" : "true") + '" aria-label="' + (collapsed ? "Expand filters" : "Collapse filters") + '">' + (collapsed ? "Filters" : "Collapse") + "</button>";
    pane.innerHTML = '<div class="context-sticky"><div class="context-bar"><h2>Filters</h2>' + toggle + '</div><div class="context-body"><p class="context-note">Scholarship and posture are context filters. Change them in their menu. Feast days, holidays, national days, and literature items can be combined. Year, season, day, topic, audience, and shelf each take one. Remove a pill to drop that filter.</p>' + contextPills() + "</div></div>";
    pane.scrollTop = scroll;
    syncWorkButtons();
    renderContentFeed();
  }
  function syncWorkButtons() {
    document.querySelectorAll("[data-context-add='work']").forEach(function (btn) {
      var id = btn.getAttribute("data-context-id");
      if (!id) return;
      var on = contextHas("work", id);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "In filters" : "Add filter";
    });
  }
  function renderTypeFilters() {
    var row = document.getElementById("type-filters");
    if (!row) return;
    row.innerHTML = TYPES.map(function (t) {
      var on = state.types.indexOf(t.id) !== -1;
      return '<button type="button" data-type="' + t.id + '" aria-pressed="' + (on ? "true" : "false") + '" title="' + esc(t.about) + '">' + esc(t.name) + "</button>";
    }).join("");
  }
  function renderContentFeed() {
    renderTypeFilters();
    var body = document.getElementById("content-feed-list");
    var scroller = document.getElementById("content-feed-body");
    var count = document.getElementById("content-dock-count");
    if (!body) return;
    var scroll = scroller ? scroller.scrollTop : 0;
    var list = feedItems();
    var shown = {};
    list.forEach(function (item) { shown[item.id] = true; });
    if (state.feedOpen && !shown[state.feedOpen]) state.feedOpen = "";
    if (state.feedMedia && !shown[state.feedMedia]) state.feedMedia = "";
    if (count) count.textContent = String(list.length);
    body.innerHTML = contextFeedHtml();
    if (scroller) scroller.scrollTop = scroll;
    mountFeedViewer();
    bindContentDock();
  }
  function bindContentDock() {
    var dock = document.getElementById("content-dock");
    var edge = document.getElementById("content-dock-edge");
    var toggle = document.getElementById("content-dock-toggle");
    if (!dock || !edge || !toggle || dock.getAttribute("data-bound") === "1") return;
    dock.setAttribute("data-bound", "1");
    var openHeight = "";
    function limits() {
      return { min: 140, max: Math.max(200, Math.round(window.innerHeight * 0.7)) };
    }
    function setHeight(next) {
      var bound = limits();
      if (next < bound.min) next = bound.min;
      if (next > bound.max) next = bound.max;
      dock.style.height = Math.round(next) + "px";
      edge.setAttribute("aria-valuemin", String(bound.min));
      edge.setAttribute("aria-valuemax", String(bound.max));
      edge.setAttribute("aria-valuenow", String(Math.round(next)));
    }
    function setCollapsed(collapsed) {
      dock.classList.toggle("is-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      toggle.textContent = collapsed ? "Expand" : "Collapse";
      edge.tabIndex = collapsed ? -1 : 0;
      try { sessionStorage.setItem("ar-content-collapsed", collapsed ? "1" : "0"); } catch (e) {}
    }
    toggle.addEventListener("click", function () {
      var collapsed = !dock.classList.contains("is-collapsed");
      if (collapsed) openHeight = dock.style.height;
      setCollapsed(collapsed);
      if (!collapsed && openHeight) dock.style.height = openHeight;
    });
    setCollapsed(contentCollapsed());
    function dragTo(clientY, originY, originH) {
      setHeight(originH + (originY - clientY));
    }
    edge.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || dock.classList.contains("is-collapsed")) return;
      event.preventDefault();
      var originY = event.clientY;
      var originH = dock.getBoundingClientRect().height;
      edge.setPointerCapture(event.pointerId);
      function move(e) { dragTo(e.clientY, originY, originH); }
      function up() {
        edge.removeEventListener("pointermove", move);
        edge.removeEventListener("pointerup", up);
        edge.removeEventListener("pointercancel", up);
      }
      edge.addEventListener("pointermove", move);
      edge.addEventListener("pointerup", up);
      edge.addEventListener("pointercancel", up);
    });
    edge.addEventListener("keydown", function (event) {
      if (dock.classList.contains("is-collapsed")) return;
      var step = event.shiftKey ? 48 : 16;
      var current = dock.getBoundingClientRect().height;
      if (event.key === "ArrowUp") { setHeight(current + step); event.preventDefault(); }
      else if (event.key === "ArrowDown") { setHeight(current - step); event.preventDefault(); }
    });
    var measured = dock.getBoundingClientRect().height;
    setHeight(measured > 80 ? measured : Math.round(window.innerHeight * 0.28));
  }
  function toggleContext(kind, id, label) {
    if (!kind || !id) return;
    if (kind === "feast" || kind === "holiday" || kind === "national") {
      var kept = state.context.occasions.filter(function (o) { return o.id !== id; });
      if (kept.length === state.context.occasions.length) kept.push({ id: id, kind: kind, label: label || id });
      state.context.occasions = kept;
    } else if (kind === "work") {
      if (!knownWork(id)) return;
      var worksKept = state.context.works.filter(function (w) { return w.id !== id; });
      if (worksKept.length === state.context.works.length) worksKept.push({ id: id, label: workLabel(id) || label || id });
      state.context.works = worksKept;
    } else if (kind === "season" || kind === "topic" || kind === "sub" || kind === "audience" || kind === "shelf") {
      if (kind === "shelf" && SHELF_LANDINGS.indexOf(id) === -1) return;
      if (kind === "season" && !SEASONS.some(function (s) { return s.id === id; })) return;
      state.context[kind] = state.context[kind] === id ? "" : id;
      if (kind === "topic") state.context.sub = "";
      if (kind === "sub" && state.context.sub && state.topic) state.context.topic = state.topic;
    } else return;
    saveContext();
    renderStage();
  }
  function removeContext(kind, id) {
    if (kind === "feast" || kind === "holiday" || kind === "national") {
      state.context.occasions = state.context.occasions.filter(function (o) { return o.id !== id; });
    } else if (kind === "work") {
      state.context.works = state.context.works.filter(function (w) { return w.id !== id; });
    } else if (kind === "lectYear") state.context.lectYear = "";
    else if (kind === "lectDay") state.context.lectDay = null;
    else if (kind === "season" || kind === "topic" || kind === "sub" || kind === "audience" || kind === "shelf" || kind === "testament" || kind === "section" || kind === "book") {
      state.context[kind] = "";
      if (kind === "topic") state.context.sub = "";
    }
    saveContext();
    renderStage();
  }

  function canonSectionNamed(name) {
    for (var i = 0; i < CANON.length; i++) {
      if (CANON[i].name === name) return CANON[i];
    }
    return null;
  }
  function canonPlace(book) {
    for (var i = 0; i < CANON.length; i++) {
      if (CANON[i].books.indexOf(book) !== -1) return { book: book, section: CANON[i] };
    }
    return null;
  }
  function applyCanonFilter(kind, id) {
    if (kind === "book") {
      var place = canonPlace(id);
      if (!place) return;
      state.context.book = place.book;
      state.context.section = place.section.name;
      state.context.testament = place.section.testament;
      state.context.shelf = "canonical";
    } else if (kind === "section") {
      var section = canonSectionNamed(id);
      if (!section) return;
      state.context.section = section.name;
      state.context.testament = section.testament;
      state.context.shelf = "canonical";
      if (state.context.book && section.books.indexOf(state.context.book) === -1) state.context.book = "";
    } else if (kind === "testament") {
      if (id !== "Old Testament" && id !== "New Testament") return;
      state.context.testament = id;
      state.context.shelf = "canonical";
      var current = canonSectionNamed(state.context.section);
      if (!current || current.testament !== id) {
        state.context.section = "";
        state.context.book = "";
      }
    } else return;
    saveContext();
    renderStage();
  }
  function applyBibleAnchor() {
    var place = canonPlace(state.bibleAnchor.book);
    state.bible.level = "read";
    state.bible.book = place ? place.book : state.bibleAnchor.book;
    state.bible.chapter = Number(state.bibleAnchor.chapter) || 1;
    state.bible.verses = [];
    state.bible.toEnd = false;
    state.bible.xrefs = false;
    state.bible.xrefHome = null;
    if (place) {
      state.bible.testament = place.section.testament;
      state.bible.section = place.section.name;
    }
  }
  function openBibleBook(name) {
    var place = canonPlace(name);
    if (!place) return;
    state.bible.open = true;
    state.bible.level = "read";
    state.bible.book = name;
    state.bible.chapter = 1;
    state.bible.verses = [];
    state.bible.toEnd = false;
    state.bible.xrefs = false;
    state.bible.xrefHome = null;
    state.bible.testament = place.section.testament;
    state.bible.section = place.section.name;
    renderBible();
  }
  function canonTree() {
    var html = '<div class="canon-tree" aria-label="Biblical books">';
    ["Old Testament", "New Testament"].forEach(function (name) {
      var sections = CANON.filter(function (section) { return section.testament === name; });
      var count = 0;
      sections.forEach(function (section) { count += section.books.length; });
      html += '<button type="button" class="canon-testament" style="grid-row:span ' + count + '" data-canon="testament" data-canon-id="' + esc(name) + '" aria-pressed="' + (state.context.testament === name ? "true" : "false") + '"><span>' + esc(name) + "</span></button>";
      sections.forEach(function (section) {
        html += '<button type="button" class="canon-section" style="grid-row:span ' + section.books.length + '" data-canon="section" data-canon-id="' + esc(section.name) + '" aria-pressed="' + (state.context.section === section.name ? "true" : "false") + '"><span>' + esc(section.name) + "</span></button>";
        section.books.forEach(function (book) {
          var on = state.context.book === book;
          html += '<button type="button" class="canon-book' + (on ? " is-on" : "") + '" data-canon="book" data-canon-id="' + esc(book) + '" aria-pressed="' + (on ? "true" : "false") + '">' + esc(book) + "</button>";
          html += '<p class="canon-blurb' + (on ? " is-on" : "") + '">' + esc(BOOK_BLURBS[book] || "") + "</p>";
        });
      });
    });
    html += '</div><p class="canon-credit">Book notes are the text BibleProject places under its overview videos. A book told in more than one video joins those notes with a pipe.</p>';
    return html;
  }
  function literatureBody(kind) {
    if (kind === "eccles" || kind === "national") return "";
    if (kind === "canonical") {
      var posts = shelvedPosts("canonical");
      var anyCanon = state.added.some(function (item) { return item.shelf === "canonical"; });
      var list = posts.length
        ? '<div class="cards">' + posts.map(canonCard).join("") + "</div>"
        : (anyCanon ? '<p class="empty">Nothing matches these filters.</p>' : "");
      return canonTree() + list;
    }
    return '<p class="empty">Nothing is on this shelf yet.</p>';
  }

  function literature() {
    var kind = litKind();
    if (kind === "eccles" || kind === "national") return "";
    var landing = SHELF_LANDINGS.indexOf(kind) === -1 ? "" : '<p class="context-row">' + contextButton("shelf", kind, shelfLabel(kind)) + "</p>";
    return '<div class="literature">' + landing + literatureBody(kind) + "</div>";
  }

  function events() {
    return '<div class="events">' + EVENTS.map(function (event) {
      return '<article class="event"><time>' + esc(event.date) + '</time><div><h3>' + esc(event.name) + '</h3><p>' + esc(event.kind) + " · " + esc(event.where) + "</p></div></article>";
    }).join("") + "</div>";
  }

  function option(value, label, selected) {
    return '<option value="' + esc(value) + '"' + (selected ? " selected" : "") + ">" + esc(label) + "</option>";
  }

  function landingShelf() {
    if (SHELF_LANDINGS.indexOf(state.context.shelf) !== -1) return state.context.shelf;
    if (state.module === "literature" && SHELF_LANDINGS.indexOf(litKind()) !== -1) return litKind();
    return "";
  }

  function landingSentence() {
    var shelf = landingShelf();
    var where = shelf ? "This post will be filed under " + shelfLabel(shelf) + "." : "This post will be filed in the library, with no shelf.";
    return "The fields follow the filters. Feasts, holidays, and literature items selected on the left are included. " + where;
  }
  function landingNote() {
    return '<p class="composer-note" data-landing-note>' + esc(landingSentence()) + "</p>";
  }
  function refreshLandingNote(form) {
    if (!form) return;
    var note = form.querySelector("[data-landing-note]");
    if (note) note.textContent = landingSentence();
  }

  function subOptions(topicId, selected) {
    var chosen = TOPICS.filter(function (t) { return t.id === topicId; })[0];
    var sub = selected && chosen && chosen.subs.indexOf(selected) !== -1 ? selected : "";
    var html = option("", "Not set", !sub);
    if (chosen) html += chosen.subs.map(function (name) { return option(name, name, name === sub); }).join("");
    return html;
  }

  function workPick(selected) {
    if (!selected) selected = state.context.works.map(function (w) { return w.id; });
    var boxes = workChoices().map(function (w) {
      var on = selected.indexOf(w.id) !== -1;
      return '<label><input type="checkbox" name="works" value="' + esc(w.id) + '"' + (on ? " checked" : "") + "> " + esc(w.label) + "</label>";
    }).join("");
    return '<fieldset class="type-pick work-pick"><legend>Literature</legend><div class="type-pick-grid">' + boxes + "</div></fieldset>";
  }
  function composer() {
    if (state.role !== "curator" || !state.compose) return "";
    if (landingShelf() === "canonical") {
      var media = '<option value="" selected disabled>Choose</option>' + CANON_MEDIA.map(function (name) {
        return option(name, name, false);
      }).join("");
      return '<section class="composer"><h2>Add to the library <button type="button" data-compose>Close</button></h2><form id="add-form" data-shelf="canonical" autocomplete="off"><label>Kind<select name="medium" required>' + media + '</select></label><label>Title<input name="title" required autocomplete="off"></label>' + workPick() + '<label class="wide">Description<textarea name="summary" placeholder="What this reading is. A short introduction is allowed."></textarea></label><label class="wide">Link<input name="link" type="url" inputmode="url" placeholder="https://" autocomplete="off"></label><label class="wide file-drop">File<input name="file" type="file"></label>' + landingNote() + '<p class="composer-note">A chosen file stays in this browser for this visit. Nothing is sent to a server.</p><p class="type-pick-error" data-type-error hidden>Select at least one type above.</p><button class="signup" type="submit">Add</button></form></section>';
    }
    var ctx = state.context;
    var levels = LEVELS.map(function (l) { return option(l.id, l.label, l.id === state.levels[0]); }).join("");
    var postures = '<option value="">Not tagged</option>' + POSTURES.map(function (p) { return option(p.id, p.label, false); }).join("");
    var seasons = option("", "Not set", !ctx.season) + SEASONS.map(function (s) { return option(s.id, s.name, s.id === ctx.season); }).join("");
    var audiences = option("", "Not set", !ctx.audience) + AUDIENCES.map(function (a) { return option(a, a, a === ctx.audience); }).join("");
    var topics = option("", "Not set", !ctx.topic) + TOPICS.map(function (t) { return option(t.id, t.name, t.id === ctx.topic); }).join("");
    var subs = subOptions(ctx.topic, ctx.sub);
    return '<section class="composer"><h2>Add to the library <button type="button" data-compose>Close</button></h2><form id="add-form" autocomplete="off"><label>Title<input name="title" required autocomplete="off"></label>' + workPick() + '<label class="wide">Summary<input name="summary" required autocomplete="off"></label><label class="wide">Link or a few sentences<textarea name="body" placeholder="A URL, or the text itself"></textarea></label><label>Experience<select name="level">' + levels + '</select></label><label>Primary use<select name="posture">' + postures + '</select></label><label>Season<select name="season">' + seasons + '</select></label><label>Audience<select name="audience">' + audiences + '</select></label><label>Topic<select name="topic">' + topics + '</select></label><label>Subtopic<select name="sub">' + subs + '</select></label>' + landingNote() + '<p class="type-pick-error" data-type-error hidden>Select at least one type above.</p><button class="signup" type="submit">Add</button></form></section>';
  }

  function lensBar() {
    var mode = state.module === "topics" ? "topic" : state.module === "audience" ? "audience" : "time";
    function lensBtn(id, label) {
      return '<button type="button" role="radio" data-lens="' + id + '" aria-checked="' + (mode === id ? "true" : "false") + '">' + label + "</button>";
    }
    return '<div class="lens" role="radiogroup" aria-label="View">' + lensBtn("time", "Liturgical Time") + lensBtn("topic", "Topic") + lensBtn("audience", "Audience") + "</div>";
  }

  var formSyncing = false;
  function captureDraft(form) {
    if (!form) return null;
    var data = new FormData(form);
    var draft = {};
    ["title", "summary", "body", "format", "level", "posture", "medium", "link"].forEach(function (name) {
      if (form.querySelector("[name=" + name + "]")) draft[name] = String(data.get(name) || "");
    });
    draft.works = [];
    form.querySelectorAll("[name=works]:checked").forEach(function (el) { draft.works.push(el.value); });
    return draft;
  }
  function restoreDraft(form, draft) {
    if (!form || !draft) return;
    ["title", "summary", "body", "format", "level", "posture", "medium", "link"].forEach(function (name) {
      var el = form.querySelector("[name=" + name + "]");
      if (el && draft[name]) el.value = draft[name];
    });
    if (draft.works) {
      form.querySelectorAll("[name=works]").forEach(function (el) {
        el.checked = draft.works.indexOf(el.value) !== -1;
      });
    }
  }
  function applyWorksToForm(form) {
    if (!form) return;
    var selected = state.context.works.map(function (w) { return w.id; });
    form.querySelectorAll("[name=works]").forEach(function (el) {
      if (selected.indexOf(el.value) !== -1) el.checked = true;
    });
  }
  function applyContextToForm(form) {
    if (!form || form.getAttribute("data-shelf") === "canonical") return;
    formSyncing = true;
    function set(name, value) {
      var el = form.querySelector("[name=" + name + "]");
      if (el) el.value = value || "";
    }
    set("season", state.context.season);
    set("audience", state.context.audience);
    set("topic", state.context.topic);
    applyWorksToForm(form);
    var subSelect = form.querySelector("[name=sub]");
    if (subSelect) subSelect.innerHTML = subOptions(state.context.topic, state.context.sub);
    formSyncing = false;
  }
  function pullContextFromForm(form) {
    if (formSyncing || !form || form.getAttribute("data-shelf") === "canonical") return;
    var season = form.season ? form.season.value : "";
    var audience = form.audience ? form.audience.value : "";
    var topic = form.topic ? form.topic.value : "";
    var sub = form.sub ? form.sub.value : "";
    if (!SEASONS.some(function (s) { return s.id === season; })) season = "";
    if (AUDIENCES.indexOf(audience) === -1) audience = "";
    var topicRow = TOPICS.filter(function (t) { return t.id === topic; })[0];
    if (!topicRow) { topic = ""; sub = ""; }
    else if (topicRow.subs.indexOf(sub) === -1) sub = "";
    if (state.context.season === season && state.context.audience === audience && state.context.topic === topic && state.context.sub === sub) return;
    state.context.season = season;
    state.context.audience = audience;
    state.context.topic = topic;
    state.context.sub = sub;
    saveContext();
    formSyncing = true;
    renderStage();
    formSyncing = false;
  }
  function bindForm(form) {
    if (!form || form.getAttribute("data-bound") === "1") return;
    form.setAttribute("data-bound", "1");
    form.addEventListener("submit", onAdd);
    form.addEventListener("dragover", function (event) {
      if (!form.querySelector("[name=file]") || !event.dataTransfer) return;
      event.preventDefault();
    });
    form.addEventListener("drop", function (event) {
      var fileInput = form.querySelector("[name=file]");
      if (!fileInput || !event.dataTransfer || !event.dataTransfer.files || !event.dataTransfer.files.length) return;
      event.preventDefault();
      try { fileInput.files = event.dataTransfer.files; } catch (err) {}
    });
    ["season", "audience", "topic", "sub"].forEach(function (name) {
      var el = form.querySelector("[name=" + name + "]");
      if (el) el.addEventListener("change", function () { pullContextFromForm(form); });
    });
  }

  function renderLibrary() {
    var launch = document.getElementById("library-launch");
    var host = document.getElementById("library-composer");
    if (!launch || !host) return;
    if (state.role !== "curator") {
      launch.innerHTML = "";
      host.innerHTML = "";
      return;
    }
    if (!state.compose) {
      launch.innerHTML = '<button type="button" class="signup" data-compose>Add to the library</button>';
      host.innerHTML = "";
      return;
    }
    launch.innerHTML = "";
    var form = host.querySelector("#add-form");
    var wantCanon = landingShelf() === "canonical";
    var keepForm = !!(form && ((form.getAttribute("data-shelf") === "canonical") === wantCanon));
    var draft = (!keepForm && form) ? captureDraft(form) : null;
    if (keepForm) {
      applyContextToForm(form);
      applyWorksToForm(form);
      refreshLandingNote(form);
      if (state.types.length) showTypeError(form, false);
      return;
    }
    host.innerHTML = composer();
    var openedForm = host.querySelector("#add-form");
    if (draft) restoreDraft(openedForm, draft);
    bindForm(openedForm);
    var scroller = document.getElementById("content-feed-body");
    if (scroller) scroller.scrollTop = 0;
    if (!formSyncing) {
      var titleField = openedForm && openedForm.querySelector("[name=title]");
      if (titleField) {
        setTimeout(function () {
          if (document.body.contains(titleField)) titleField.focus({ preventScroll: true });
        }, 0);
      }
    }
  }

  function renderStage() {
    var desk = document.body.getAttribute("data-desk");
    if (desk === "books" || desk === "down" || desk === "nation") {
      document.body.setAttribute("data-wheel", state.style);
      return;
    }
    var analysis = document.body.getAttribute("data-desk") === "analysis";
    document.body.setAttribute("data-module", analysis ? "year" : state.module);
    var body = "";
    if (analysis || state.module === "year") {
      body = state.board ? drillBoard() : dial();
      if (!analysis && state.module === "year" && !state.board) body += occasionBoard();
    } else if (state.module === "lectionary") body = "";
    else if (state.module === "literature") body = literature();
    else if (state.module === "browse" || state.module === "topics" || state.module === "audience") body = topicAudience();
    else if (state.module === "formation") body = formation();
    else if (state.module === "preaching") body = byFormats(["Sermon", "Commentary"]);
    else if (state.module === "prayer") body = byFormats(["Devotional", "Prayer"]);
    else body = events();
    var stage = document.getElementById("stage");
    var keptScroll = stage.scrollTop;
    stage.classList.toggle("is-year", analysis || state.module === "year");
    stage.classList.toggle("is-composing", !analysis && state.compose && state.role === "curator");
    if (legacy) document.body.removeAttribute("data-wheel");
    else document.body.setAttribute("data-wheel", state.style);
    stage.innerHTML = body;
    stage.scrollTop = keptScroll;
    syncLitHome();
    renderLibrary();
    renderContextPane();
    state.settle = false;
  }

  function copyContextOnto(item) {
    if (state.context.lectYear) item.lectYear = state.context.lectYear;
    else delete item.lectYear;
    if (state.context.season) item.season = state.context.season;
    else delete item.season;
    if (state.context.lectDay) {
      item.lectDay = state.context.lectDay.id;
      item.lectDayYear = state.context.lectDay.year;
      item.lectDaySeason = state.context.lectDay.season;
      item.lectDayLabel = state.context.lectDay.label;
    } else {
      delete item.lectDay;
      delete item.lectDayYear;
      delete item.lectDaySeason;
      delete item.lectDayLabel;
    }
    if (state.context.audience) item.audience = state.context.audience;
    else delete item.audience;
    if (state.context.topic) item.topic = state.context.topic;
    else delete item.topic;
    if (state.context.sub) item.sub = state.context.sub;
    else delete item.sub;
    if (state.context.testament) item.testament = state.context.testament;
    else delete item.testament;
    if (state.context.section) item.section = state.context.section;
    else delete item.section;
    if (state.context.book) item.book = state.context.book;
    else delete item.book;
    var occ = state.context.occasions.map(function (o) { return o.id; });
    if (occ.length) item.occasions = occ;
    if (item.shelf !== "canonical") {
      var shelf = landingShelf();
      if (shelf) item.shelf = shelf;
    }
  }
  function storeAdded() {
    try { sessionStorage.setItem("ar-added", JSON.stringify(state.added)); } catch (e) {}
  }
  function finishAdd(item) {
    state.added.unshift(item);
    storeAdded();
    state.compose = false;
    if (item.level && LEVELS.some(function (l) { return l.id === item.level; }) && state.levels.indexOf(item.level) === -1) {
      state.levels.push(item.level);
      saveLevels();
    }
    if (item.shelf && SHELF_LANDINGS.indexOf(item.shelf) !== -1) {
      state.module = "literature";
      state.lit = item.shelf;
    }
    syncPressed();
    writeLitHash();
    renderStage();
  }
  function chosenTypes() {
    return TYPES.map(function (t) { return t.id; }).filter(function (id) {
      return state.types.indexOf(id) !== -1;
    });
  }
  function showTypeError(form, show) {
    var error = form && form.querySelector("[data-type-error]");
    var row = document.getElementById("type-filters");
    if (error) error.hidden = !show;
    if (row) {
      if (show) row.setAttribute("aria-invalid", "true");
      else row.removeAttribute("aria-invalid");
    }
    if (show && row) {
      var first = row.querySelector("button");
      if (first) first.focus();
    }
  }
  function addCanonical(form, types) {
    var data = new FormData(form);
    var title = String(data.get("title") || "").trim();
    var medium = String(data.get("medium") || "").trim();
    if (!title || !medium || CANON_MEDIA.indexOf(medium) === -1 || !types.length) return;
    var link = String(data.get("link") || "").trim();
    var fileInput = form.querySelector("[name=file]");
    var chosen = fileInput && fileInput.files && fileInput.files[0];
    var item = {
      id: "canon-" + Date.now(),
      shelf: "canonical",
      title: title,
      summary: String(data.get("summary") || "").trim(),
      format: medium,
      types: types,
      access: "Free"
    };
    if (/^https?:\/\//i.test(link)) item.link = link;
    if (chosen) {
      item.fileName = chosen.name;
      canonBlobs[item.id] = URL.createObjectURL(chosen);
    }
    copyContextOnto(item);
    item.shelf = "canonical";
    assignWorks(item, form);
    finishAdd(item);
  }
  function chosenWorks(form) {
    var ids = [];
    form.querySelectorAll("[name=works]:checked").forEach(function (el) {
      if (knownWork(el.value) && ids.indexOf(el.value) === -1) ids.push(el.value);
    });
    return ids;
  }
  function assignWorks(item, form) {
    var works = chosenWorks(form);
    if (works.length) item.works = works;
    else delete item.works;
  }

  function onAdd(event) {
    event.preventDefault();
    var form = event.target;
    var types = chosenTypes();
    if (!types.length) {
      showTypeError(form, true);
      return;
    }
    showTypeError(form, false);
    if (form.getAttribute("data-shelf") === "canonical") {
      addCanonical(form, types);
      return;
    }
    var data = new FormData(form);
    var body = String(data.get("body") || "").trim();
    var item = {
      id: "new-" + Date.now(),
      title: String(data.get("title") || "").trim(),
      summary: String(data.get("summary") || "").trim(),
      format: typeNames(types).join(", "),
      types: types,
      level: String(data.get("level")),
      use: String(data.get("posture") || "") || null,
      access: "Free"
    };
    if (/^https?:\/\//i.test(body)) item.link = body;
    else if (body) item.body = body;
    pullContextFromForm(event.target);
    copyContextOnto(item);
    assignWorks(item, form);
    finishAdd(item);
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

  function canonGroups() {
    return ["Old Testament", "New Testament"].map(function (name) {
      var id = name === "Old Testament" ? "ot-label" : "nt-label";
      var items = CANON.filter(function (section) { return section.testament === name; }).map(function (section) {
        return '<li><button type="button" data-section="' + esc(section.name) + '">' + esc(section.name) + "</button></li>";
      }).join("");
      return '<section class="canon-group"><h3 id="' + id + '">' + esc(name) + '</h3><div class="canon-row"><div class="canon-side" aria-hidden="true"></div><ul class="nav-list" aria-labelledby="' + id + '">' + items + "</ul></div></section>";
    }).join("");
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
    if (state.bible.level === "testament" || state.bible.level === "section") {
      html = bibleHeader("Bible", "") + '<div class="bible-body"><p class="lede">King James Version.</p>' + canonGroups() + "</div>";
    } else if (state.bible.level === "books") {
      var section = CANON.filter(function (s) { return s.name === state.bible.section; })[0];
      html = bibleHeader(section.name, "Bible") + '<div class="bible-body"><ul class="nav-list">' + section.books.map(function (book) {
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
      state.bible.level = "section";
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
      var levelId = btn.getAttribute("data-level");
      var on = levelId === "all" ? allLevels() : state.levels.indexOf(levelId) !== -1;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-posture]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-posture") === state.posture ? "true" : "false");
    });
    document.querySelectorAll("[data-module]").forEach(function (btn) {
      if (btn === document.body) return;
      btn.setAttribute("aria-pressed", btn.getAttribute("data-module") === state.module ? "true" : "false");
    });
    document.querySelectorAll("[data-lens]").forEach(function (btn) {
      var id = btn.getAttribute("data-lens");
      var on = false;
      if (id === "browse" || id === "topic" || id === "audience") on = state.module === "browse" || state.module === "topics" || state.module === "audience";
      else if (id === "lectionary") on = state.module === "lectionary";
      else if (id === "literature") on = state.module === "literature";
      else on = state.module !== "browse" && state.module !== "topics" && state.module !== "audience" && state.module !== "lectionary" && state.module !== "literature";
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    var person = document.querySelector(".person-btn");
    if (person) {
      var levelNames = [];
      if (allLevels()) levelNames.push("All");
      else LEVELS.forEach(function (l) { if (state.levels.indexOf(l.id) !== -1) levelNames.push(l.label); });
      var postureObj = null;
      POSTURES.forEach(function (p) { if (p.id === state.posture) postureObj = p; });
      person.setAttribute("aria-label", "Experience, " + (levelNames.join(", ") || "scholarship") + (postureObj ? ", " + postureObj.label : ", no posture filter"));
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
    if (event.target.closest && event.target.closest("#feed-viewer")) {
      var viewAct = event.target.closest("[data-feed-act]");
      if (viewAct) {
        state.feedMedia = "";
        renderContentFeed();
      }
      return;
    }
    var composing = event.target.closest && event.target.closest(".composer");
    if (composing && !event.target.closest("[data-compose]")) return;
    var feedAct = event.target.closest && event.target.closest("[data-feed-act]");
    if (feedAct && feedAct.closest("#content-feed-list")) {
      var feedHost = feedAct.closest("[data-feed]");
      var feedId = feedHost ? feedHost.getAttribute("data-feed") : "";
      var feedAction = feedAct.getAttribute("data-feed-act");
      if (feedAction === "expand" && feedId) state.feedMedia = feedId;
      else if (feedAction === "close" && state.feedOpen === feedId) state.feedOpen = "";
      renderContentFeed();
      if (state.feedMedia) {
        var viewClose = document.querySelector("#feed-viewer .feed-view-panel [data-feed-act='close-view']");
        if (viewClose) viewClose.focus();
      }
      return;
    }
    if (event.target.closest && event.target.closest("#content-feed-list a[href], #content-feed-list video, #content-feed-list audio, #content-feed-list iframe")) return;
    var feedPostEl = event.target.closest && event.target.closest("#content-feed-list [data-feed]");
    if (feedPostEl) {
      var selection = window.getSelection ? String(window.getSelection()) : "";
      if (selection && feedPostEl.contains(window.getSelection().anchorNode)) return;
      var nextFeed = feedPostEl.getAttribute("data-feed");
      if (state.feedOpen !== nextFeed) {
        state.feedOpen = nextFeed;
        renderContentFeed();
        var openedPost = document.querySelector('#content-feed-list [data-feed="' + nextFeed + '"]');
        if (openedPost && openedPost.scrollIntoView) openedPost.scrollIntoView({ block: "nearest" });
      }
      return;
    }
    var typeBtn = event.target.closest && event.target.closest("[data-type]");
    if (typeBtn && typeBtn.closest("#type-filters")) {
      var typeId = typeBtn.getAttribute("data-type");
      if (!TYPES.some(function (t) { return t.id === typeId; })) return;
      var typeAt = state.types.indexOf(typeId);
      if (typeAt === -1) state.types.push(typeId);
      else state.types.splice(typeAt, 1);
      saveTypes();
      renderStage();
      return;
    }
    var occasionToggle = event.target.closest && event.target.closest("[data-occasion-toggle]");
    if (occasionToggle) {
      var group = occasionToggle.closest(".occasion-group");
      var key = occasionToggle.getAttribute("data-occasion-toggle");
      var willOpen = !!(group && group.classList.contains("is-collapsed"));
      if (group) group.classList.toggle("is-collapsed", !willOpen);
      occasionToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
      var stored = {};
      try { stored = JSON.parse(sessionStorage.getItem("ar-occasions") || "{}") || {}; } catch (e) {}
      stored[key] = willOpen;
      try { sessionStorage.setItem("ar-occasions", JSON.stringify(stored)); } catch (e2) {}
      return;
    }
    if (event.target.closest && event.target.closest("[data-filters-toggle]")) {
      try {
        if (filtersCollapsed()) sessionStorage.setItem("ar-filters-collapsed", "0");
        else sessionStorage.setItem("ar-filters-collapsed", "1");
      } catch (e) {}
      renderContextPane();
      return;
    }
    var addCtx = event.target.closest("[data-context-add]");
    if (addCtx) {
      toggleContext(addCtx.getAttribute("data-context-add"), addCtx.getAttribute("data-context-id"), addCtx.getAttribute("data-context-label"));
      return;
    }
    var dropCtx = event.target.closest("[data-context-remove]");
    if (dropCtx) {
      removeContext(dropCtx.getAttribute("data-context-remove"), dropCtx.getAttribute("data-context-id"));
      return;
    }
    var canonBtn = event.target.closest && event.target.closest("[data-canon]");
    if (canonBtn && canonBtn.closest("#stage")) {
      var canonKind = canonBtn.getAttribute("data-canon");
      var canonId = canonBtn.getAttribute("data-canon-id");
      applyCanonFilter(canonKind, canonId);
      if (canonKind === "book") openBibleBook(canonId);
      return;
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
      if (state.compose) {
        var dock = document.getElementById("content-dock");
        var dockToggle = document.getElementById("content-dock-toggle");
        if (dock) {
          dock.classList.remove("is-collapsed");
          if (dock.getBoundingClientRect().height < 420) dock.style.height = "420px";
        }
        if (dockToggle) {
          dockToggle.setAttribute("aria-expanded", "true");
          dockToggle.textContent = "Collapse";
        }
        try { sessionStorage.setItem("ar-content-collapsed", "0"); } catch (e) {}
        var dockEdge = document.getElementById("content-dock-edge");
        if (dockEdge) dockEdge.tabIndex = 0;
      }
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
      var levelId = level.getAttribute("data-level");
      if (levelId === "all") state.levels = LEVELS.map(function (l) { return l.id; });
      else {
        var levelAt = state.levels.indexOf(levelId);
        if (levelAt === -1) state.levels.push(levelId);
        else if (state.levels.length > 1) state.levels.splice(levelAt, 1);
      }
      saveLevels();
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
      var enteredLect = state.module !== "lectionary" && lensId === "lectionary";
      if (lensId === "browse" || lensId === "topic" || lensId === "audience") state.module = "browse";
      else if (lensId === "lectionary") state.module = "lectionary";
      else if (lensId === "literature") state.module = "literature";
      else {
        state.module = "year";
        state.board = false;
        state.depth = "year";
      }
      syncPressed();
      writeLitHash();
      renderStage();
      if (enteredLect && state.bible.open) {
        applyBibleAnchor();
        renderBible();
      }
      return;
    }
    var litBtn = event.target.closest("[data-lit]");
    if (litBtn && litBtn !== document.body) {
      var nextLit = litBtn.getAttribute("data-lit") || "canonical";
      if (!LIT_KINDS.some(function (item) { return item.id === nextLit; })) return;
      state.lit = nextLit;
      state.module = "literature";
      syncPressed();
      writeLitHash();
      renderStage();
      return;
    }
    var moduleBtn = event.target.closest("[data-module]");
    if (moduleBtn && moduleBtn !== document.body) {
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
    var churchBtn = event.target.closest("[data-church]");
    if (churchBtn && !legacy) {
      var offset = Number(churchBtn.getAttribute("data-church"));
      if (offset !== -1 && offset !== 0 && offset !== 1) return;
      if (offset !== state.church) {
        state.church = offset;
        state.slice = { kind: "year" };
        state.day = null;
        state.card = null;
        state.board = false;
        state.depth = "year";
        state.settle = true;
        yearDays.cache = null;
        yearDays.cacheKey = "";
      }
      renderStage();
      return;
    }
    var themeBtn = event.target.closest("#theme-toggle");
    if (themeBtn) {
      if (themeIsDark()) sessionStorage.removeItem("ar-theme");
      else sessionStorage.setItem("ar-theme", "dark");
      applyTheme();
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
        state.monthFocus = null;
      } else if (cutKind === "season") {
        var seasonId = cut.getAttribute("data-id");
        if (!seasonId || !SEASON_STORY[seasonId] || state.slice.kind !== "year") return;
        state.card = state.card === seasonId ? null : seasonId;
        state.board = false;
        state.depth = "year";
        renderStage();
        return;
      } else if (cutKind === "month") {
        if (state.slice.kind !== "year") return;
        var monthNum = Number(cut.getAttribute("data-month"));
        if (!monthNum) return;
        state.monthFocus = state.monthFocus === monthNum ? null : monthNum;
        renderStage();
        return;
      } else if (cutKind === "week") {
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
      else if (document.body.getAttribute("data-module") === "lectionary") {
        applyBibleAnchor();
        state.bible.open = true;
        renderBible();
      } else {
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
    if (event.target.closest("[data-section]")) {
      var sectionName = event.target.closest("[data-section]").getAttribute("data-section");
      state.bible.section = sectionName;
      CANON.forEach(function (section) {
        if (section.name === sectionName) state.bible.testament = section.testament;
      });
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
      else state.bible.level = "section";
      renderBible();
    }
  });

  function syncAppFull() {
    var btn = document.getElementById("app-full");
    if (!btn) return;
    var on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Leave full screen" : "Full screen");
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
    if ((event.key === "Enter" || event.key === " ") && event.target && event.target.getAttribute && event.target.getAttribute("data-feed") && event.target.closest("#content-feed-list")) {
      event.preventDefault();
      if (state.feedOpen !== event.target.getAttribute("data-feed")) {
        state.feedOpen = event.target.getAttribute("data-feed");
        renderContentFeed();
      }
      return;
    }
    if (event.key === "Escape" && state.feedMedia) {
      state.feedMedia = "";
      renderContentFeed();
      return;
    }
    if (event.key === "Escape" && state.feedOpen && !(event.target && event.target.closest && event.target.closest("input, textarea, select"))) {
      state.feedOpen = "";
      renderContentFeed();
      return;
    }
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
  var hoverIso = "";
  function dayUnderPointer(event) {
    var node = event.target;
    if (node && node.closest) {
      var direct = node.closest("[data-cut='day']");
      if (direct) return direct;
    }
    var path = event.composedPath ? event.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      if (path[i].getAttribute && path[i].getAttribute("data-cut") === "day") return path[i];
    }
    return null;
  }
  function syncDayHub(event) {
    if (legacy || state.module !== "year" || state.board) return;
    var hub = document.querySelector(".dial-hub");
    if (!hub) return;
    var title = hub.querySelector("h2");
    var sub = hub.querySelector(".dial-sub");
    var kicker = hub.querySelector(".dial-kicker");
    if (!title || !sub || !kicker) return;
    var dayEl = dayUnderPointer(event);
    if (!dayEl) {
      if (hoverIso) {
        hoverIso = "";
        hub.setAttribute("data-hover", "0");
        kicker.textContent = kicker.getAttribute("data-rest") || "";
        title.textContent = title.getAttribute("data-rest") || "";
        title.classList.toggle("is-long", (title.getAttribute("data-rest") || "").length > 16);
        sub.textContent = sub.getAttribute("data-rest") || "";
        var hot = document.querySelector(".dial-svg .slice.is-hot");
        if (hot) hot.classList.remove("is-hot");
      }
      return;
    }
    var iso = dayEl.getAttribute("data-iso");
    if (iso === hoverIso) return;
    var day = null;
    yearDays().forEach(function (d) { if (d.iso === iso) day = d; });
    if (!day) return;
    hoverIso = iso;
    var center = dayCenter(day);
    hub.setAttribute("data-hover", "1");
    kicker.textContent = center.kicker;
    title.textContent = center.holy;
    title.classList.toggle("is-long", center.long);
    sub.textContent = center.sub;
    var prev = document.querySelector(".dial-svg .slice.is-hot");
    if (prev) prev.classList.remove("is-hot");
    var slice = dayEl.querySelector(".slice");
    if (slice) slice.classList.add("is-hot");
  }
  document.addEventListener("pointermove", syncDayHub);
  document.addEventListener("mouseover", syncDayHub);
  document.addEventListener("ar-works-sync", syncWorkButtons);
  document.addEventListener("ar-bible-drill", function (event) {
    var after = event.detail && event.detail.after;
    if (!after || !after.book) return;
    var place = canonPlace(after.book);
    state.bibleAnchor = {
      book: after.book,
      chapter: Number(after.chapter) || 1,
      section: place ? place.section.name : (after.section || "")
    };
    if (document.body.getAttribute("data-module") !== "lectionary" || !state.bible.open) return;
    applyBibleAnchor();
    renderBible();
  });
  document.addEventListener("ar-lect-drill", function (event) {
    var detail = event.detail || {};
    var before = detail.before || {};
    var after = detail.after || {};
    var changed = false;
    var yearOk = after.year === "A" || after.year === "B" || after.year === "C";
    if (yearOk) {
      if (state.context.lectYear !== after.year) { state.context.lectYear = after.year; changed = true; }
    } else if (before.year && state.context.lectYear === before.year) {
      state.context.lectYear = "";
      changed = true;
    }
    var seasonOk = SEASONS.some(function (s) { return s.id === after.season; });
    if (after.season && seasonOk) {
      if (state.context.season !== after.season) { state.context.season = after.season; changed = true; }
    } else if (before.season && state.context.season === before.season) {
      state.context.season = "";
      changed = true;
    }
    var day = after.day;
    var dayOk = day && day.id != null && String(day.id) !== "" && (day.year === "A" || day.year === "B" || day.year === "C") && SEASONS.some(function (s) { return s.id === day.season; });
    if (dayOk) {
      var held = state.context.lectDay;
      var sameDay = held && String(held.id) === String(day.id) && held.year === day.year && held.season === day.season;
      if (!sameDay) {
        state.context.lectDay = { id: String(day.id), year: day.year, season: day.season, label: String(day.label || "Day") };
        changed = true;
      }
    } else if (before.day && state.context.lectDay && String(state.context.lectDay.id) === String(before.day.id) && state.context.lectDay.year === before.day.year && state.context.lectDay.season === before.day.season) {
      state.context.lectDay = null;
      changed = true;
    }
    if (!changed) return;
    saveContext();
    renderContextPane();
    var form = document.getElementById("add-form");
    if (form) applyContextToForm(form);
  });

  var bookSearch = document.getElementById("book-search");
  if (bookSearch) bookSearch.addEventListener("input", function () {
    document.dispatchEvent(new CustomEvent("ar-shelf-search"));
  });
  var nationSearch = document.getElementById("nation-search");
  if (nationSearch) nationSearch.addEventListener("input", function () {
    document.dispatchEvent(new CustomEvent("ar-nation-search"));
  });

  var searchBox = document.getElementById("search");
  if (searchBox) searchBox.addEventListener("input", function (event) {
    state.query = event.target.value.trim();
    if (document.body.getAttribute("data-desk") === "books") {
      document.dispatchEvent(new CustomEvent("ar-shelf-search"));
      return;
    }
    if (document.body.getAttribute("data-desk") === "nation") {
      document.dispatchEvent(new CustomEvent("ar-nation-search"));
      return;
    }
    if (document.body.getAttribute("data-desk") === "down") return;
    renderStage();
  });

  function mountExperience() {
    var menu = document.getElementById("experience-menu");
    if (!menu || menu.getAttribute("data-ready") === "1") return;
    var heart = '<svg class="exp-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.2s-6.5-4.1-6.5-7.8C5.5 8.6 7.2 7 9.3 7c1.2 0 2.2.6 2.7 1.5.5-.9 1.5-1.5 2.7-1.5 2.1 0 3.8 1.6 3.8 4.4 0 3.7-6.5 7.8-6.5 7.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    var mind = '<svg class="exp-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 18.5v-1.2c-1.8-.5-3.2-2-3.2-4 0-1.3.6-2.3 1.3-3.1-.2-.5-.3-1-.1-1.6.3-.8 1.1-1.4 2-1.5.4-1.1 1.4-1.8 2.6-1.8 1.3 0 2.4.8 2.8 2 .8-.2 1.7 0 2.3.6.6.6.8 1.5.5 2.3.8.7 1.4 1.6 1.4 2.8 0 2.2-1.7 4-3.8 4.3V18.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.2v8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    var icons = { devotional: heart, educational: mind, both: heart + mind };
    var levels = '<button type="button" class="exp-option" data-level="all" aria-pressed="false"><span class="exp-name">All</span><span class="exp-desc">Every scholarship level.</span></button>' + LEVELS.map(function (l) {
      return '<button type="button" class="exp-option" data-level="' + l.id + '" aria-pressed="false"><span class="exp-name">' + esc(l.label) + '</span><span class="exp-desc">' + esc(l.description) + '</span></button>';
    }).join("");
    var postures = '<button type="button" class="exp-option" data-posture="" aria-pressed="false"><span class="exp-name">Any</span><span class="exp-desc">Shows every resource, including those with no primary-use tag.</span></button>' +
      POSTURES.map(function (p) {
        return '<button type="button" class="exp-option" data-posture="' + p.id + '" aria-pressed="false"><span class="exp-name">' + icons[p.id] + esc(p.label) + '</span><span class="exp-desc">' + esc(p.description) + '</span></button>';
      }).join("");
    menu.innerHTML = '<p class="exp-kicker">Scholarship <span>All, or one or more</span></p><div class="exp-list" role="group" aria-label="Scholarship">' + levels + '</div><p class="exp-kicker">Posture <span>optional</span></p><div class="exp-list" role="group" aria-label="Posture">' + postures + "</div>";
    menu.setAttribute("data-ready", "1");
  }

  var ZOOM_STEPS = [1, 1.5, 2, 3, 4, 6, 8];
  function currentZoom() {
    var z = parseFloat(sessionStorage.getItem("ar-zoom") || "1");
    return z && z >= 1 ? z : 1;
  }
  function zoomLevel() {
    var down = document.body.getAttribute("data-desk") === "down";
    if (down && document.body.getAttribute("data-zoom-live") !== "1") return 1;
    return currentZoom();
  }
  function applyZoom() {
    var down = document.body.getAttribute("data-desk") === "down";
    var z = zoomLevel();
    var box = document.getElementById("viz-zoom") || document.getElementById("stage");
    if (box) box.style.zoom = down || z === 1 ? "" : String(z);
    if (down) {
      var chart = document.querySelector("#sankey-down-root svg.sk-down");
      if (chart) chart.style.zoom = z === 1 ? "" : String(z);
    }
    var label = document.getElementById("zoom-label");
    if (label) label.textContent = z === 1 ? "Fit" : Math.round(z * 100) + "%";
    var zoomBtn = document.getElementById("zoom-btn");
    if (zoomBtn) zoomBtn.setAttribute("aria-pressed", z === 1 ? "false" : "true");
  }
  function stepZoom(dir) {
    var down = document.body.getAttribute("data-desk") === "down";
    var z = zoomLevel();
    var next = z;
    if (dir === "fit") next = 1;
    else if (dir === "in") {
      next = ZOOM_STEPS[ZOOM_STEPS.length - 1];
      for (var i = 0; i < ZOOM_STEPS.length; i++) if (ZOOM_STEPS[i] > z + 0.01) { next = ZOOM_STEPS[i]; break; }
    } else if (dir === "out") {
      next = ZOOM_STEPS[0];
      for (var j = ZOOM_STEPS.length - 1; j >= 0; j--) if (ZOOM_STEPS[j] < z - 0.01) { next = ZOOM_STEPS[j]; break; }
    }
    if (down) document.body.setAttribute("data-zoom-live", "1");
    sessionStorage.setItem("ar-zoom", String(next));
    applyZoom();
  }

  mountExperience();
  syncPressed();
  applyZoom();
  (function readLitHash() {
    var bits = location.hash.replace(/^#/, "").split("/");
    if (bits[0] !== "literature") return;
    state.module = "literature";
    state.lit = bits[1] || "canonical";
  })();
  ensureLect();
  renderStage();
})();
