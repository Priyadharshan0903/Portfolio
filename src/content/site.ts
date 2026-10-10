// All copy for the portfolio lives here.
// Rich text convention (rendered by <Rich />): {{Term}} → tech chip, **text** → emphasis.

export const site = {
  name: "Priyadharshan Senthil",
  email: "priyadharshansenthil@gmail.com",
  github: "https://github.com/Priyadharshan0903",
  journal: "https://priyadharshan0903.github.io/Journal/",
  linkedin: "https://www.linkedin.com/in/priyadharshan-senthil-112ab821a/",
  resume: "Priyadharshan_Senthil_Resume.pdf",
  role: "Platform Engineer at Workday",
  location: "Chennai, connected to the world",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "3", suffix: "+", label: "years building platforms" },
  { value: "40", suffix: "%", label: "API cost reduction" },
  { value: "99.9", suffix: "%", label: "sync reliability" },
  { value: "60", suffix: "%", label: "less changelog noise" },
];

export const facts = [
  { k: "NOW", v: "Workday, Developer Platform" },
  { k: "BASED", v: "Chennai, India" },
  { k: "LOVES", v: "tools that make developers' lives easier", accent: true },
];

export type Role = { title: string; dates: string; summary?: string; bullets?: string[] };
export type Job = {
  /** Globe focus while this role is in view. */
  layer: 0 | 1 | 2 | 3;
  when: string;
  company: string;
  title: string;
  roles?: Role[];
  bullets?: string[];
};

export const experience: Job[] = [
  {
    layer: 3,
    when: "JUL 2026 TO PRESENT · CHENNAI",
    company: "Workday",
    title: "Sr Associate Software Development Engineer · Chennai",
    roles: [
      {
        title: "Production Engineering, Developer Platform",
        dates: "Sep 2026 to Present",
        summary: "Building automation and tooling that ensures production readiness of the platform.",
      },
      {
        title: "Pipedream R&D",
        dates: "Jul 2026 to Sep 2026",
        bullets: [
          "Shipped 30+ open-source app integrations (Google Drive, Slack, Zoom and more).",
          "Rewrote the instruction set for {{AI agent}} code reviews.",
          "Refactored the {{Pipedream CLI}} in {{Golang}}, including version updates.",
        ],
      },
    ],
  },
  {
    layer: 2,
    when: "JUL 2024 TO JUL 2026 · CHENNAI",
    company: "Klenty",
    title: "Software Development Engineer · Chennai",
    bullets: [
      "Owned infrastructure and product features for {{Kubernetes}}-orchestrated microservices; secured {{CI/CD}} with {{HashiCorp Vault}} and {{NGINX}}.",
      "Built {{Salesforce}}, {{Pipedrive}} and {{HubSpot}} integrations, cutting API costs by **40%** with **99.9%** sync reliability.",
      "Redesigned an event-sourced {{Cadence}} system, reducing changelog noise by **60%** for 10K+ users.",
      "Built live call transcription by streaming call audio to {{Deepgram}}, with {{Redis}} handling token failures, rate limiting and retries. If a live connection can't be established, the backend is flagged to run post-call transcription on the recording fetched from {{Twilio}}, {{Exotel}} or {{Frejun}}.",
      "Built open and link-click tracking for outbound emails, so every open and click is recorded against the prospect and campaign.",
      "Built the reply tracker that detects replies to sent emails and updates the prospect's status in the sequence.",
      "Built AI SDR-powered list assignment, boosting sales efficiency by **35%**.",
    ],
  },
  {
    layer: 1,
    when: "MAR 2024 TO JUL 2024 · BERLIN, REMOTE",
    company: "UrbanGround GmbH",
    title: "Full Stack Engineer (Remote) · Berlin",
    bullets: ["Built a real-time rental platform from scratch on {{AWS}}, launching the MVP 6 weeks early."],
  },
  {
    layer: 0,
    when: "JUN 2023 TO JAN 2024 · CHENNAI",
    company: "PK Innovatives",
    title: "Full Stack Developer Intern · Chennai",
    bullets: ["Built a reusable {{Angular}} component library and fast {{REST APIs}}."],
  },
];

export const projects = [
  { name: "Corral", tag: "macOS", repo: "Corral-Releases", desc: "macOS clipboard manager that keeps your copy history for one-click reuse." },
  { name: "Foglio", tag: "local-first", repo: "Foglio", liveUrl: "https://priyadharshan0903.github.io/Foglio/", desc: "Local-first, all-in-one task and meeting manager." },
  { name: "Rewind", tag: "API client", repo: "Rewind", desc: "A local-first Postman alternative that keeps a full history of every API call you make." },
  { name: "Git Switcher", tag: "CLI", repo: "Git-Switcher", desc: "CLI to switch between Git identities instantly." },
  { name: "Claude Account Switcher", tag: "CLI", repo: "Claude-Switcher", desc: "CLI for seamless switching between Claude accounts." },
];

export const openSource = {
  pipedream: {
    href: "https://github.com/PipedreamHQ/pipedream",
    blurb: "30+ integrations in the public component registry.",
  },
  zed: {
    href: "https://github.com/zed-industries/zed",
    blurb: "Contributor to the high-performance open-source code editor, improving the Git Panel's stash workflow.",
    prs: [
      {
        id: 62439,
        title: "Optional message support for git stash",
        desc: "A prompt to name a stash, so entries are searchable in the stash picker.",
      },
      {
        id: 62254,
        title: "Stash Tracked and Stash Staged options",
        desc: "Stash only tracked or only staged changes from the Git Panel.",
      },
    ],
  },
};

const J = "https://priyadharshan0903.github.io/Journal/";
export const posts = [
  { date: "SEP 29", tag: "mongodb", title: "MongoDB Connection Storms Need Creation Limits Beyond Pool Size", href: J + "mongodb/mongodb-connection-storms-need-creation-limits-beyond-pool-size" },
  { date: "AUG 25", tag: "github", title: "GitHub Only Attributes A Commit To Your Account Via A Verified Email", href: J + "github/github-only-attributes-a-commit-to-your-account-via-a-verified-email" },
  { date: "AUG 25", tag: "go", title: "flag.Parse stops at the first non-flag argument", href: J + "go/go-flag-parse-stops-at-the-first-non-flag-argument" },
  { date: "AUG 25", tag: "projects", title: "Orchestrating Existing Tools Beat Reimplementing Auth In ghsw", href: J + "projects/orchestrating-existing-tools-beat-reimplementing-auth-in-ghsw" },
];

export const skillGroups = [
  { g: "l", name: "Languages", color: "var(--ink)", x: 20, y: 27, items: ["Golang", "Rust", "TypeScript", "JavaScript"] },
  { g: "i", name: "Infrastructure", color: "var(--fg)", x: 76, y: 26, items: ["Kubernetes", "Docker", "AWS", "Azure", "NGINX", "HashiCorp Vault", "CI/CD"] },
  { g: "d", name: "Data and messaging", color: "var(--muted)", x: 25, y: 75, items: ["PostgreSQL", "MongoDB", "MySQL", "RabbitMQ"] },
  { g: "w", name: "Web and APIs", color: "color-mix(in oklab,var(--ink) 55%,var(--fg))", x: 76, y: 75, items: ["Node.js", "GraphQL", "REST", "React", "Angular", "OAuth integrations"] },
];

export const education = {
  years: "2020 TO 2024",
  degree: "B.E. Computer Science Engineering",
  school: "Panimalar Engineering College, Chennai",
  cgpa: "9.24",
};
