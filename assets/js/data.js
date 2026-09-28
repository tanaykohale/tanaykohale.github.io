/* Site content: profile, projects, experience, education, skills.
   All pages and cards are rendered from this file. */

window.SITE = {
  name: "Tanay Kohale",
  // Public address of the site — used for links inside PDFs. Change if you use a custom domain.
  url: "https://tanaykohale.github.io",
  // Hero one-liner (open item #14 — edit freely)
  tagline: "IIT (BHU) engineer building AI agents, local-LLM tools and data pipelines — and shipping them as products people can use.",
  email: "tanaykohale12@gmail.com",
  github: "https://github.com/tanaykohale",
  linkedin: "https://www.linkedin.com/in/tanaykohale",
  codeforces: "https://codeforces.com/profile/tanaykohale12",

  // Visit counter — create a free GoatCounter account (goatcounter.com),
  // then put your code here, e.g. "tanaykohale". Leave "" to disable.
  goatcounter: "tanaykohale",
  // true = show total visits in the footer (enable "Allow adding visitor counts
  // on your website" in GoatCounter settings first)
  showVisitCount: false,

  updated: "Sep 2026",
};

/* Fields — used as filters on /projects and as tags on cards */
window.FIELDS = {
  ai:       { label: "AI · LLM & Agents",   short: "AI & LLM" },
  data:     { label: "Data Science & ML",   short: "Data & ML" },
  research: { label: "Biomedical & CFD Research", short: "Research" },
  apps:     { label: "Apps, Web & IoT",     short: "Apps & IoT" },
};

/* Projects — order here = order on the explore page.
   Fields used per project:
     slug, title, kicker, oneLiner, fields[], status, when, role,
     description[] (paragraphs — only real descriptions, nothing invented),
     highlights[], stack[], links[{label,url}], gallery[{src,alt,phone?}],
     stats[{n,l}], accent (css color), featured (bool)                       */
window.PROJECTS = [
  {
    slug: "rachnava",
    title: "Rachnava",
    kicker: "Ongoing · Flagship",
    oneLiner: "A public map of the technology India still needs to build — traced down to the exact missing capability, and who in the world holds it.",
    fields: ["ai", "data"],
    status: "In progress",
    when: "2025 – present",
    role: "Builder",
    accent: "#ff8a4c",
    featured: true,
    description: [
      "Rachnava is a public map of what technology still needs to be built. It starts from plain questions — why does India build the Kaveri engine but import fighter jet engines, why is an Indian-made motor or solar panel so hard to find — and follows each answer downward, part by part, process by process, science by science, until it reaches either a wall nobody has crossed or ground so ordinary that any working engineer in that field already knows it. Each stopping point becomes a page: what the capability is, who in the world holds it, whether anyone in India does, and what exactly is in the way. Different questions keep arriving at the same stopping points, and those crossings are the interesting part — a question about magnets and a question about transformers turn out to be blocked by the same furnace. It is meant for students, researchers, founders and funders who want a traceable starting point instead of a blank page.",
      "The work is mostly data, not code. Each entry is written as a capability — an action on an object at a stated spec — and resolves to one of four states: common everywhere, done in India, done only abroad, or done by nobody. Where something is missing, the entry names which kind of wall it is: the knowledge is secret, the industrialisation know-how isn't here, an input has no supplier, it works only at lab scale, each iteration takes so long that only incumbents survive it, or nothing exists to buy the output. Entries link to whatever they require, so the map is an interlinked graph rather than a single tree; the site draws one tree per question out of it, with a clickable node view and a side panel, alongside the linked notes and a bounty board that lists the open walls. Agents do the drafting, linking and search; humans fact-check, remove anything not publicly available, and promote drafts. Drafts stay visible and marked, so the map fills in the way a wiki does. Bounty scoring is deliberately last."
    ],
    highlights: [
      "Building a public map of India's manufacturing chains: breaking critical technologies — jet engines, motors, solar panels — down to each process, input and know-how, to show where the chain is already independent and where the gaps are for new entrepreneurs.",
      "Designed the data model: every entry is an action on an object at a stated spec, resolved to one of four states and tagged with the type of barrier blocking it.",
      "Orchestrating 10+ AI agents for drafting, linking and search, with human fact-checking before drafts are promoted — so the map grows like a wiki."
    ],
    stack: ["Multi-agent pipeline (10+ agents)", "Graph data model", "Interactive node view"],
    stats: [{ n: "10+", l: "AI agents" }, { n: "4", l: "capability states" }, { n: "6", l: "wall types" }],
    links: [],
    note: "Not public yet — the link and screenshots will be added when it launches.",
  },
  {
    slug: "quiz-studio",
    title: "Quiz Studio",
    kicker: "Live · Web app",
    oneLiner: "A zero-dependency quiz & exam app with JEE / UPSC marking schemes, a bubble-sheet exam mode and an LLM quiz-generation template.",
    fields: ["apps"],
    status: "Live",
    when: "2025 – 26",
    role: "Solo build",
    accent: "#7cc4ff",
    featured: true,
    description: [
      "A quiz and exam companion built with vanilla HTML, CSS and JavaScript. No frameworks, no build tools, no server — just open it in any browser and start solving.",
      "Quiz mode loads questions from a JSON file or pasted text and runs them as Practice (instant feedback and rationale), Exam (no feedback until submit), Speed (auto-advance) or Sudden Death (one wrong answer ends it). Exam mode is a manual bubble sheet: configure sections, questions and options, record your answers, then check them against an answer key typed as letters, numbers, JSON or CSV — or uploaded as a file. A built-in prompt template lets you generate quiz JSON with Claude, Gemini or ChatGPT."
    ],
    highlights: [
      "Four quiz modes, a bubble-sheet exam mode and answer-key import (letters, numbers, JSON, CSV).",
      "Configurable scoring with JEE (+4 / −1) and UPSC (+2 / −⅔, −⅚) negative-marking presets, countdown and per-question timers.",
      "Autosave and exam history in the browser, JSON/CSV export; deployed on GitHub Pages.",
      "Unit tests (Node) + browser end-to-end tests (Playwright) with CI."
    ],
    stack: ["Vanilla JS", "HTML / CSS", "localStorage", "Playwright", "GitHub Pages"],
    stats: [{ n: "4", l: "quiz modes" }, { n: "0", l: "dependencies" }, { n: "22", l: "automated tests" }],
    links: [
      { label: "Open live app", url: "https://tanaykohale.github.io/QuizStudio/", primary: true },
      { label: "Source on GitHub", url: "https://github.com/tanaykohale/QuizStudio" }
    ],
    live: "https://tanaykohale.github.io/QuizStudio/",
  },
  {
    slug: "fluffy",
    title: "Fluffy",
    kicker: "Offline desktop AI",
    oneLiner: "An offline desktop app to host, switch and chat with any local LLM — with RAG over your own files.",
    fields: ["ai"],
    status: "Done · tested",
    when: "",
    role: "Solo build",
    accent: "#c3a6ff",
    description: [
      "Host and chat with any LLM locally using Ollama and Python, all within a fully offline interface. Fluffy auto-detects installed models, switches between them in one click, streams replies on a background thread so the UI stays responsive, and keeps context-aware conversations with a token-budgeted history.",
      "RAG lets you chat with your own files: add text, code, CSV, JSON or PDF files to the knowledge base, and they are chunked and embedded locally with an Ollama embedding model. With RAG on, the most similar chunks (cosine similarity) are injected as context and the file names are cited. The index is a plain JSON file — no vector database needed."
    ],
    highlights: [
      "Offline AI chat app with one-click model switching, streaming and context-aware replies.",
      "RAG over your own text/PDF files (chunking + Ollama embeddings + cosine search, JSON index) with cited file names.",
      "Multiple chat sessions with persistent history, real-time CPU/RAM monitor; multithreaded, non-blocking UI; unit + end-to-end GUI tests."
    ],
    stack: ["Python", "Ollama", "CustomTkinter", "RAG", "Multithreading", "pytest"],
    stats: [{ n: "100%", l: "offline" }, { n: "33", l: "tests" }],
    gallery: [
      { src: "fluffy-chat.png", alt: "Fluffy chat window" },
      { src: "fluffy-main.png", alt: "Fluffy main screen" },
      { src: "fluffy-detect-models.png", alt: "Model detection" },
      { src: "fluffy-select-model.png", alt: "Choosing a model" }
    ],
    links: [{ label: "Source on GitHub", url: "https://github.com/tanaykohale/fluffy", primary: true }],
  },
  {
    slug: "snitch-for-safe-road",
    title: "Snitch for Safe Road",
    kicker: "Mobile app",
    oneLiner: "Report traffic violations and road problems in under a minute — a photo and vehicle number become a formal complaint to the right authority.",
    fields: ["apps"],
    status: "Working app",
    when: "2025 – 26",
    role: "Solo build",
    accent: "#ff5d73",
    description: [
      "Snap a photo, note the vehicle number, and Snitch drafts a formal complaint addressed to the right authority for your city: the Traffic Police for violations, the Municipal Corporation for potholes, open manholes, broken streetlights and more.",
      "Everything stays on your phone. No account, no server, no tracking. Complaints are built from templates (no AI) in formal Indian English and are fully editable before sending by email with the photo attached, or sharing on WhatsApp."
    ],
    highlights: [
      "React Native (Expo, TypeScript) app that turns a photo, vehicle number and GPS location into a formal complaint letter addressed to the correct Traffic Police or Municipal Corporation contact, covering 10 cities.",
      "20-type taxonomy (10 traffic violations, 10 road problems), template-based letters, duplicate warning within 50 m, and status tracking — all stored locally in SQLite.",
      "Send via email with the photo attached or share on WhatsApp; runs on Android, iOS and web."
    ],
    stack: ["Expo / React Native", "TypeScript", "SQLite", "Expo Router", "NativeWind", "Zustand"],
    stats: [{ n: "10", l: "cities" }, { n: "20", l: "report types" }, { n: "<1 min", l: "per report" }],
    gallery: [
      { src: "snitch-01-report.png", alt: "Report screen", phone: true },
      { src: "snitch-02-report-filled.png", alt: "Filled report", phone: true },
      { src: "snitch-03-case.png", alt: "Generated complaint", phone: true },
      { src: "snitch-05-my-reports.png", alt: "My reports", phone: true }
    ],
    links: [{ label: "Source on GitHub", url: "https://github.com/tanaykohale/Snitch-for-Safe-Road", primary: true }],
  },
  {
    slug: "mental-health-chatbot",
    title: "Mental Health Chatbot",
    kicker: "ShellHacks 2021 · Team lead",
    oneLiner: "A Rasa chatbot built in 24 hours at FIU's ShellHacks to support people facing lockdown loneliness.",
    fields: ["ai"],
    status: "Hackathon build",
    when: "2021 (updated 2026)",
    role: "Team lead (3 members)",
    accent: "#ffd166",
    description: [
      "The 2021 COVID wave in India brought a wave of loneliness and depression with it, from students to celebrities. We wanted a friendly bot people could talk to during lockdown.",
      "The bot checks in on how you feel, tries to lift your mood when you're down, and — if you agree — walks you through a short 15-question mental-health-at-work survey. It collects the answers; it does not diagnose or score risk."
    ],
    highlights: [
      "Led a 3-member team (with Om Khade and Yash Mantri) at ShellHacks 2021, building a RASA + TensorFlow chatbot.",
      "Delivered the core conversational flow (mood check-in, cheer-up path) and a 15-question workplace mental-health survey.",
      "2026: migrated to Rasa 3, survey rebuilt as a Rasa form, conversation tests + CI."
    ],
    stack: ["Python", "Rasa", "TensorFlow"],
    links: [
      { label: "Devpost (demo video)", url: "https://devpost.com/software/mental-health-chat-bot", primary: true },
      { label: "Source on GitHub", url: "https://github.com/tanaykohale/shellHacks_HBot" }
    ],
  },
  {
    slug: "malar-ai",
    title: "MALAR-AI",
    kicker: "Club project · Health AI",
    oneLiner: "Smartphone-based malaria screening — phone microscope + staining kit + a ResNet-50 model.",
    fields: ["data", "research"],
    status: "Done · club-tested",
    when: "IIT (BHU)",
    role: "Model builder",
    accent: "#ff8a4c",
    description: [
      "MALAR-AI is the club's annual flagship build: a smartphone microscope and staining kit for malaria screening. Each year one student develops the model; an app is built roughly once every five to six years."
    ],
    highlights: [
      "Built the ResNet-50 model for the club's malaria-screening kit, classifying blood-smear images with >95% accuracy in club testing."
    ],
    stack: ["ResNet-50", "TensorFlow", "OpenCV", "NumPy", "Jupyter"],
    stats: [{ n: ">95%", l: "accuracy (club testing)" }],
    links: [],
  },
  {
    slug: "autism-mri",
    title: "fMRI & sMRI Analysis in Autism",
    kicker: "Academic project",
    oneLiner: "Classifying Autism Spectrum Disorder from functional and structural MRI features.",
    fields: ["data", "research"],
    status: "Done",
    when: "IIT (BHU)",
    role: "Academic project",
    accent: "#7cc4ff",
    description: [],
    highlights: [
      "Pearson correlation, ACF, Random Forest, Naive Bayes, SVM and Decision Trees; 84.5% (fMRI) and 89.3% (sMRI) classification accuracy."
    ],
    stack: ["Python", "scikit-learn", "Random Forest", "SVM", "Naive Bayes"],
    stats: [{ n: "84.5%", l: "fMRI accuracy" }, { n: "89.3%", l: "sMRI accuracy" }],
    links: [],
  },
  {
    slug: "finval-genie",
    title: "FinVal Genie",
    kicker: "GenAI crawler",
    oneLiner: "A GenAI asset-valuation crawler — gathers news, search and forum data for assets like gold or crypto; a local LLM returns a fair value and its rationale.",
    fields: ["ai", "data"],
    status: "Code public",
    when: "2025 – 26",
    role: "Solo build",
    accent: "#4fd1a5",
    description: [
      "FinVal Genie is a GenAI-powered web crawler that scrapes, interprets and estimates asset valuations using large language models. It searches the web for the asset, extracts the readable article text from the top results, and gives up to three sources to a local LLM running in Ollama, which returns a fair value with its currency, unit, rationale and source links as structured JSON."
    ],
    highlights: [
      "Automated crawler extracting asset data (gold, crypto) from news, search results and market forums.",
      "Local LLM (Ollama) estimates fair value and summarizes market sentiment across sources.",
      "Outputs structured JSON reports (asset, value, currency, unit, rationale, source URLs) from a modular, asset-agnostic pipeline; offline test suite."
    ],
    stack: ["Python", "Selenium", "BeautifulSoup", "Ollama (Mistral)", "Jupyter"],
    code: '{\n  "asset": "Gold 24 carat in Mumbai",\n  "value": 68250,\n  "currency": "INR",\n  "unit": "10 g",\n  "note": "Average of 3 sources.",\n  "sources": ["https://…", "https://…", "https://…"]\n}',
    codeNote: "Output shape (illustrative — values depend on the day's sources and the model).",
    links: [{ label: "Source on GitHub", url: "https://github.com/tanaykohale/FinVal-Genie", primary: true }],
  },
  {
    slug: "microfluidics-paper",
    title: "Microfluidics Chip for Alanine Detection",
    kicker: "Co-authored paper",
    oneLiner: "\"Fabrication of a microbe-assisted microfluidics chip for the detection of alanine amino acid\" — manuscript under review at Biointerphases.",
    fields: ["research"],
    status: "Under review — Biointerphases",
    when: "",
    role: "Co-author · CFD analysis",
    accent: "#4fd1a5",
    description: [
      "Snehlata Yadav, Pooja Kumari, Tanay Vilas Kohale, Sushmitha Paulraj, Sanjeev Kumar Mahto — Tissue Engineering & Biomicrofluidics Lab, School of Biomedical Engineering, IIT (BHU)."
    ],
    highlights: [
      "My part (software analysis, reviewing & editing): ANSYS Fluent CFD to find the flow rate that keeps laminar flow in the Y-shaped chip — 0.3 µL/min with negligible FITC diffusion, then confirmed experimentally."
    ],
    stack: ["ANSYS Fluent", "CFD", "Microfluidics"],
    stats: [{ n: "0.3 µL/min", l: "laminar-flow rate" }],
    links: [],
  },
  {
    slug: "mtech-thesis",
    title: "CFD Study of Microfluidic Devices",
    kicker: "M.Tech dissertation",
    oneLiner: "\"Computational Fluid Dynamics Study of Microfluidic Device Performance: Flow, Forces, and Shear Stress\" — June 2024.",
    fields: ["research"],
    status: "Completed",
    when: "June 2024",
    role: "M.Tech dissertation · supervisor Dr. Sanjeev Kumar Mahto",
    accent: "#c3a6ff",
    description: [],
    highlights: [
      "Simulated two microfluidic devices in ANSYS Fluent: velocity, pressure, drag force and shear stress on co-cultured L929 fibroblasts and HepG2 hepatocytes (MFD-I).",
      "Diffusion and concentration gradients of FITC in a Y-junction chip (MFD-II), including mesh strategy and diffusion-coefficient calculation."
    ],
    stack: ["ANSYS Fluent", "CFD", "Meshing"],
    links: [],
  },
  {
    slug: "guardino",
    title: "Guardino",
    kicker: "IoT · Team lead",
    oneLiner: "An automated plant-irrigation system with remote monitoring.",
    fields: ["apps"],
    status: "Done",
    when: "IIT (BHU)",
    role: "Student Point of Contact (team lead)",
    accent: "#4fd1a5",
    description: [],
    highlights: [
      "As Student Point of Contact, led a team building an Arduino + ESP8266 irrigation system that waters plants automatically from soil-moisture, temperature, humidity and light readings, with remote monitoring."
    ],
    stack: ["Arduino Uno", "ESP8266", "DHT11", "BH1750", "LDR", "Solenoid valve"],
    links: [],
  },
  {
    slug: "toll-audit",
    title: "Toll Plaza Spacing Audit",
    kicker: "Geospatial + local LLM",
    oneLiner: "Audits national-highway toll plazas against NHAI's 60 km spacing rule using OpenStreetMap data and local-LLM verification.",
    fields: ["ai", "data"],
    status: "Done · tested",
    when: "",
    role: "Solo build",
    accent: "#ffd166",
    description: [
      "Flags national-highway toll plazas that sit closer together than the 60 km spacing in India's NH fee rules, using OpenStreetMap data, then checks each suspect plaza against the web with a locally hosted LLM (Ollama).",
      "The pipeline stream-parses OSM XML, clusters booths within 1 km into plazas, lists every plaza pair closer than 60 km, and verifies each one: a headless-Chrome search (by name, or \"toll plaza near lat,lon\" when unnamed), with the page text handed to a local model for a 0/1 judgement. Distances are straight-line, so a pair under 60 km is a candidate that still needs a road-distance check."
    ],
    highlights: [
      "Stream-parsed OpenStreetMap data (lxml, flat memory on multi-GB extracts) to extract toll-booth nodes on Indian highways.",
      "Clustered booth nodes into plazas and used Haversine distances to flag pairs closer than 60 km — NE-zone sample: 28 booths → 16 plazas → 12 candidate pairs (clustering removed 12 false \"violations\" that were lanes of the same plaza).",
      "Verified each flagged plaza with a local-LLM pipeline (Selenium web search → Ollama judgement → 0/1 classification), fully offline-capable; packaged as a tested CLI with a map output."
    ],
    stack: ["Python", "pandas", "lxml", "OpenStreetMap", "Haversine", "Selenium", "Ollama", "pytest"],
    stats: [{ n: "28", l: "booths" }, { n: "16", l: "plazas" }, { n: "12", l: "candidate pairs" }],
    gallery: [{ src: "toll-pairs.png", alt: "Chart of plaza pairs closer than 60 km" }],
    links: [{ label: "Source on GitHub", url: "https://github.com/tanaykohale/Automated-Toll-Booth-Legality-Validation-Using-Geospatial-and-LLM-Based-Reasoning", primary: true }],
  },

];

/* Experience — newest first */
window.EXPERIENCE = [
  { role: "Independent Builder & Researcher", org: "Remote", when: "Feb 2025 – present",
    points: ["Building Rachnava, a public capability map, with a 10+ agent pipeline.", "Co-authoring a microfluidics CFD research draft.", "Shipped Quiz Studio (live), Snitch for Safe Road and FinVal Genie."] },
  { role: "AI Trainer", org: "Outlier · Remote", when: "Oct 2024 – Jan 2025",
    points: ["Evaluated, corrected and refined LLM responses for problem-solving in math, physics and coding.", "Crafted prompts to probe model capabilities; annotated data for RLHF."] },
  { role: "Machine Learning Intern", org: "Suvidha Foundation · Nagpur", when: "Jun – Jul 2023",
    points: ["Implemented a Pointer-Generator Network for abstractive text summarization, with a cleaning / tokenization / stemming pipeline."] },
  { role: "Flutter Developer", org: "Headsup (IIT BHU start-up) · Varanasi", when: "Oct 2019 – Feb 2021",
    points: ["Built a real-time chat interface (PubNub) and a 2D game (Flutter + Flame) for a mental-health app."] },
];

window.EDUCATION = [
  { degree: "Master of Technology — Biomedical Technology", school: "Indian Institute of Technology (BHU) Varanasi", when: "2024" },
  { degree: "Bachelor of Technology — Bioengineering", school: "Indian Institute of Technology (BHU) Varanasi", when: "2024" },
];

window.ACHIEVEMENTS = [
  { big: "547", small: "of 4,428", label: "2026 International Collegiate Programming Contest (ICPC) Online Challenge powered by Huawei — top 12.5%" },
  { big: "72", small: "AIR", label: "GATE 2023 — Biomedical Engineering" },
  { big: "2", small: "degrees", label: "B.Tech + M.Tech, IIT (BHU) Varanasi" },
  { big: "1", small: "paper", label: "Co-authored manuscript, under review at Biointerphases" },
];

window.CERTS = [
  ["Agentic AI Fundamentals: Architectures, Frameworks, and Applications", "LinkedIn Learning", "Dec 2024"],
  ["Agentic AI for Developers: Concepts and Application for Enterprises", "LinkedIn Learning", "Dec 2024"],
  ["Designing Agentic AI Products with No Code", "LinkedIn Learning", "Dec 2024"],
  ["RAG and Fine-Tuning Explained", "LinkedIn Learning", "Dec 2024"],
  ["Fine-Tuning LLMs for Cybersecurity", "LinkedIn Learning", "Dec 2024"],
  ["OpenAI ChatGPT: Creating Custom GPTs", "LinkedIn Learning", "Dec 2024"],
  ["Creating GPTs with Actions", "LinkedIn Learning", "Nov 2024"],
  ["Introduction to Prompt Engineering for Generative AI", "LinkedIn Learning", "Nov 2024"],
  ["Deep Learning and Generative AI: Data Prep, Analysis, and Visualization with Python", "LinkedIn Learning", "Nov 2024"],
  ["Data Cleaning in Python Essential Training", "LinkedIn Learning", "Nov 2024"],
  ["Data Literacy: Exploring and Describing Data", "LinkedIn Learning", "Nov 2024"],
  ["Learning Excel: Data Analysis", "LinkedIn Learning", "Nov 2024"],
  ["Learning Data Science: Ask Great Questions", "LinkedIn Learning", "Oct 2024"],
  ["The Non-Technical Skills of Effective Data Scientists", "LinkedIn Learning", "Oct 2024"],
  ["Hugging Face Project", "Simplilearn", "May 2024"],
];

window.SKILLS = {
  "Languages & data": ["Python", "SQL / MySQL", "Pandas", "NumPy", "Matplotlib", "JavaScript"],
  "LLM / GenAI": ["Ollama", "Local LLMs", "RAG", "Prompt engineering", "Multi-agent systems", "LLM evaluation (RLHF)", "Rasa"],
  "ML / DL": ["scikit-learn", "TensorFlow", "OpenCV", "Transformers", "ResNet-50", "NLP"],
  "Automation": ["Selenium", "Web crawling", "n8n", "Twilio"],
  "Testing & CI": ["pytest", "Node test runner", "Playwright", "GitHub Actions"],
  "Apps & web": ["Flutter", "Dart", "Flame", "Expo / React Native", "CustomTkinter", "HTML / CSS"],
  "Engineering & sim": ["ANSYS Fluent (CFD)", "MATLAB", "AutoCAD"],
  "IoT": ["Arduino", "ESP8266", "Sensors"],
};
