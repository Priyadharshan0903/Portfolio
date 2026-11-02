// All copy for the portfolio lives here.
// Rich text convention (rendered by <Rich />): {{Term}} → tech chip, **text** → emphasis.

export const site = {
  name: "Priyadharshan Senthil",
  url: "https://priyadharshan0903.github.io/Portfolio/",
  description: "Platform Engineer at Workday. I build reliable platforms, integrations and developer tools, and own them end to end.",
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

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  repo: string;
  headline: string;
  desc: string;
  overview: string;
  platform: string;
  stack: string[];
  images: ProjectImage[];
  highlights: { title: string; desc: string }[];
  action: { label: string; href: string };
  setup: { title: string; desc: string; command?: string };
};

// Curated from the public project READMEs. Keep release-specific details in the source repositories.
export const projects: Project[] = [
  {
    slug: "runlens", name: "Runlens", tag: "Agent tooling", repo: "Runlens",
    headline: "See what your agents did.",
    desc: "Explore Claude Code and Codex conversations, tool calls, subagents, and file changes on your machine.",
    overview: "Agent runs leave a trail. Runlens makes that trail readable: the question, the commands, the edits, and the point where something failed. It reads existing local session history without API keys or model calls.",
    platform: "Local web app · Node.js 20+", stack: ["TypeScript", "Preact", "Node.js"],
    images: [
      { src: "runlens-library.webp", alt: "Runlens session library with agent filters, project groups, and transcript search", caption: "The session library, with Claude Code and Codex filters. App render with demo sessions.", width: 1920, height: 1333 },
      { src: "runlens-session.webp", alt: "Runlens conversation timeline showing tool calls and file changes", caption: "A conversation alongside its recorded tool calls and file changes. App render with demo sessions.", width: 1920, height: 1333 },
    ],
    highlights: [
      { title: "Follow the whole run", desc: "Read conversations beside commands, recorded patches, failures, and child agent activity." },
      { title: "Find earlier work", desc: "Search transcripts, filter by agent, and browse sessions by project or date." },
      { title: "Keep your own context", desc: "Pin and rename sessions, add tags and notes, or export a conversation as Markdown or JSON." },
      { title: "Read history locally", desc: "Transcript files stay unchanged. Browser notes and preferences are stored separately." },
    ],
    action: { label: "Visit Runlens", href: "https://priyadharshan0903.github.io/Runlens/" },
    setup: { title: "Open your history", desc: "Run the published viewer with Node.js 20 or newer, then open the local URL printed in your terminal. The read-only MCP integration is a separate source preview; see the repository for its current status.", command: "npx runlens@latest" },
  },
  {
    slug: "foglio", name: "Foglio", tag: "Mac workspace", repo: "Foglio",
    headline: "A home for your daily work.",
    desc: "Notes, task boards, and your calendar in a native Mac workspace, with a local connector for your agents.",
    overview: "Keep a meeting, its notes, and the work that follows in the same place. Foglio combines a familiar editor with task boards and calendars. Notes remain readable Markdown files, and task data stays on your Mac.",
    platform: "macOS 14+ · Apple silicon preview", stack: ["Swift", "SwiftUI", "MCP"],
    images: [
      { src: "foglio-board.webp", alt: "Foglio task board in the Ember theme, with custom status columns and task properties", caption: "The task board in Ember, with custom statuses and stable ticket IDs. App render with example tasks.", width: 1840, height: 940 },
      { src: "foglio-notes.webp", alt: "Foglio rich text notes editor with a studio launch checklist", caption: "The notes editor, with rich text and checklists. App render with example notes.", width: 1440, height: 940 },
    ],
    highlights: [
      { title: "Write in Markdown", desc: "Use headings, checklists, quotes, code, tables, and attachments while keeping notes readable outside the app." },
      { title: "Make the board yours", desc: "Arrange tasks across custom statuses with priorities, subtasks, due dates, and blocking relationships." },
      { title: "Turn meetings into work", desc: "Read macOS Calendar, calendar URLs, or .ics files, then create a meeting note or follow-up task." },
      { title: "Connect your agents", desc: "Use the local MCP connector to let supported agents work with notes, tasks, and calendar context." },
    ],
    action: { label: "Visit Foglio", href: "https://priyadharshan0903.github.io/Foglio/" },
    setup: { title: "Make room on your Mac", desc: "The website has the app preview and download details. The current build targets Apple silicon Macs on macOS 14 or later and is a locally signed preview. Source build instructions live in the repository." },
  },
  {
    slug: "workbench", name: "Workbench", tag: "Developer workspace", repo: "workbench",
    headline: "Pick up where you left off.",
    desc: "Find local projects, check their services, and launch them from one workspace.",
    overview: "A folder tells you where a project lives, but not how to run it or whether it is already running. Workbench keeps the path, launch command, local URL, service status, and agent skills together in a durable local catalog.",
    platform: "macOS and Linux · Node.js 22.14+", stack: ["Go", "htmx", "JavaScript"],
    images: [],
    highlights: [
      { title: "Find the project", desc: "Discover project folders and review suggestions before adding them to your workspace." },
      { title: "Know what is running", desc: "Inspect actual local listeners, port reservations, ownership, readiness, and launch logs." },
      { title: "Start with context", desc: "Review the exact command and working folder, start a project, and open it once it is ready." },
      { title: "Keep a durable catalog", desc: "Project records persist across updates. The CLI and MCP interface expose the same local workspace." },
    ],
    action: { label: "Get Workbench", href: "https://github.com/Priyadharshan0903/workbench#install-a-published-release" },
    setup: { title: "Bring your projects together", desc: "The npm launcher selects a compiled Go runtime for macOS or Linux on ARM64 or x64. Requires Node.js 22.14 or newer, plus the runtimes your own projects need.", command: "npx @priyadharshan933/workbench@latest" },
  },
  {
    slug: "catnap", name: "Catnap", tag: "Browser game", repo: "Cat-Nap",
    headline: "A little room for logic.",
    desc: "132 cat logic puzzles, a winding chapter map, and a daily challenge. Play offline, at your own pace.",
    overview: "Place one cat in every row, column, and colored region, without letting them touch. Catnap builds a quiet puzzle journey around that simple rule, with chapter gifts, companions, focused hints, and saved progress.",
    platform: "Web · Offline play", stack: ["React", "TypeScript", "Vite", "Dexie"],
    images: [
      { src: "catnap-banner.webp", alt: "Catnap project artwork featuring a cat by a window and the words A little room for logic", caption: "Catnap’s project artwork, made for a quiet puzzle journey.", width: 1400, height: 460 },
      { src: "catnap-companions.webp", alt: "The illustrated cat companions from Catnap", caption: "The companions you meet along the journey. Project artwork.", width: 1400, height: 260 },
    ],
    highlights: [
      { title: "A puzzle for today", desc: "Work through 132 boards from 5×5 to 9×9, including 12 Expert challenges, or try the daily puzzle." },
      { title: "Progress that stays", desc: "Automatic local saves and offline play let you return later. Export and import a save to move between devices." },
      { title: "Help when you need it", desc: "Earn hints and Find a cat assists. Three lives recharge one at a time after incorrect placements." },
      { title: "A quieter game", desc: "No ads, sound, or vibration. Touch controls, keyboard support, themes, and reduced motion are built in." },
    ],
    action: { label: "Play Catnap", href: "https://priyadharshan0903.github.io/Cat-Nap/" },
    setup: { title: "Find a home for every cat", desc: "Open the game in your browser. No account or backend is needed; progress is saved in that browser. Use save-file export and import to take your journey to another device." },
  },
  {
    slug: "corral", name: "Corral", tag: "Mac clipboard", repo: "Corral-Releases",
    headline: "Keep the image. Copy the words.",
    desc: "Clipboard history, saved snippets, and on-device text extraction, one shortcut away on your Mac.",
    overview: "A useful screenshot should be more than a picture you copy once. Corral keeps images and snippets close, opens your clipboard beside your mouse pointer, and uses Apple Vision to pull reusable text out of images on your Mac.",
    platform: "macOS · Apple silicon download", stack: ["Electron", "Apple Vision"],
    images: [
      { src: "corral-library.webp", alt: "Corral dark library with saved snippets and a snippet editor", caption: "The clipboard library with a saved snippet open. App render with example content.", width: 1840, height: 1320 },
      { src: "corral-popup.webp", alt: "Corral dark clipboard popup with saved snippet names", caption: "The shortcut popup that opens beside your mouse pointer. App render with example content.", width: 880, height: 1200 },
    ],
    highlights: [
      { title: "Keep visual references", desc: "Browse copied screenshots in image history and select an image to copy it again." },
      { title: "Extract text on your Mac", desc: "Apple Vision recognizes screenshot text on demand, without uploading the image to an OCR service." },
      { title: "Copy the useful detail", desc: "Reuse full text or individual links, emails, phone numbers, dates, amounts, and numeric codes." },
      { title: "Stay in your flow", desc: "Use a global shortcut to open the clipboard beside your pointer, or keep snippets and drafts in the library." },
    ],
    action: { label: "Get Corral", href: "https://github.com/Priyadharshan0903/Corral-Releases/releases/latest" },
    setup: { title: "Keep it within reach", desc: "The published Mac download is for Apple silicon. Get the current release and follow the repository’s installation instructions.", },
  },
  {
    slug: "rewind", name: "Rewind", tag: "API client", repo: "Rewind",
    headline: "Any API call, replayed.",
    desc: "A local-first API client that keeps requests and their run history as plain JSON on disk.",
    overview: "An API response is easier to understand when you can see what came before it. Rewind pairs a tabbed request workspace with a persistent run history, so you can inspect a previous call and run it again without moving your data to a hosted workspace.",
    platform: "macOS · Build from source", stack: ["Electron", "TypeScript", "React"],
    images: [
      { src: "rewind-runbook.webp", alt: "Rewind API client showing its collection sidebar, request editor, and response pane", caption: "The request workspace, from the Rewind repository.", width: 1920, height: 1204 },
      { src: "rewind-history.webp", alt: "A second view of the Rewind API client and request history", caption: "Another view of the API workspace, from the Rewind repository.", width: 1920, height: 1204 },
    ],
    highlights: [
      { title: "Keep requests organized", desc: "Work across persistent tabs with collections, named requests, and environment variables." },
      { title: "Send real requests", desc: "Configure parameters, headers, authentication, and bodies, including JSON and multipart file uploads." },
      { title: "Read the response", desc: "Inspect response bodies alongside status, timing, and size, with a retry path for failed runs." },
      { title: "Keep the history", desc: "Each run is stored locally as plain JSON, ready to inspect without a hosted account." },
    ],
    action: { label: "Build Rewind", href: "https://github.com/Priyadharshan0903/Rewind#develop" },
    setup: { title: "Start a local runbook", desc: "Clone the repository, install its dependencies, then launch the Electron development app. The repository also documents building a Mac package.", command: "git clone https://github.com/Priyadharshan0903/Rewind.git\ncd Rewind\nnpm install\nnpm run dev" },
  },
  {
    slug: "git-switcher", name: "Git Switcher", tag: "Command line", repo: "Git-Switcher",
    headline: "One command. Your identity.",
    desc: "Switch GitHub CLI accounts, Git identity, and SSH keys together with ghsw.",
    overview: "Work and personal repositories should use the identity you intended. ghsw coordinates the existing GitHub CLI, Git configuration, and SSH key selection, with optional folder-specific identities and support for GitHub Enterprise hosts.",
    platform: "Command line · Go", stack: ["Go", "Git", "GitHub CLI"], images: [],
    highlights: [
      { title: "Switch the defaults together", desc: "Select the GitHub CLI account, global Git author identity, and default SSH key in one command." },
      { title: "Pin an identity to a folder", desc: "Use Git conditional includes for directories that should always keep a particular identity." },
      { title: "Keep existing authentication", desc: "Orchestrate gh and SSH instead of introducing a separate OAuth flow or credential store." },
      { title: "Work across GitHub hosts", desc: "Register GitHub Enterprise identities and switch each host independently." },
    ],
    action: { label: "Get ghsw", href: "https://github.com/Priyadharshan0903/Git-Switcher#install" },
    setup: { title: "Switch with intent", desc: "Follow the repository’s install and account-registration instructions first. With an account named work registered, this command selects it as the machine-wide default; repository-specific Git settings still take precedence.", command: "ghsw use work" },
  },
  {
    slug: "claude-switcher", name: "Claude Switcher", tag: "Command line", repo: "Claude-Switcher",
    headline: "Give each login its own space.",
    desc: "Use separate local configuration directories for your own Claude Code accounts with clw.",
    overview: "clw gives each of your Claude Code logins a separate configuration directory. Select an account to launch Claude with that directory, and optionally add a shell hook so future claude commands use the saved selection too.",
    platform: "macOS and Linux · Claude Code required", stack: ["Go", "Shell"], images: [],
    highlights: [
      { title: "Separate account state", desc: "Each registered account keeps its own login under a separate Claude configuration directory." },
      { title: "Select and launch", desc: "clw use selects an account, persists the selection, and launches the real Claude Code binary." },
      { title: "Integrate with your shell", desc: "An optional Bash or Zsh hook makes a plain claude command use the account you last selected." },
    ],
    action: { label: "Get clw", href: "https://github.com/Priyadharshan0903/Claude-Switcher#install" },
    setup: { title: "Keep your logins separate", desc: "Install clw and Claude Code, then register your own accounts using the repository’s instructions. This example selects an account named personal. The tool manages logins; each account retains its normal subscription limits.", command: "clw use personal" },
  },
  {
    slug: "observability-lab", name: "Observability Lab", tag: "Learning project", repo: "grafana-observability-lab",
    headline: "Watch an error budget burn.",
    desc: "A local Go, Prometheus, Sloth, and Grafana stack for learning SLOs through controlled failures.",
    overview: "Make an SLO tangible by breaking a service on purpose. This learning lab runs a fake checkout service with generated traffic, turns SLO definitions into Prometheus rules, and brings the resulting signals into Grafana.",
    platform: "Local Docker Compose stack", stack: ["Go", "Prometheus", "Sloth", "Grafana", "Docker"], images: [],
    highlights: [
      { title: "Follow the pipeline", desc: "Trace SLO YAML through Sloth and Prometheus recording rules into provisioned Grafana dashboards." },
      { title: "Inject a failure", desc: "Change the fake checkout service’s error and slowness rates, then observe the effect." },
      { title: "Learn from the signals", desc: "Explore SLIs, error budgets, timeslices, and burn rates with a local stack you can inspect." },
    ],
    action: { label: "Explore the lab", href: "https://github.com/Priyadharshan0903/grafana-observability-lab" },
    setup: { title: "Run the experiment locally", desc: "Clone the repository and start its stack with Docker Compose. It exposes Grafana on 3300, Prometheus on 9090, and the fake service on 8091; check those ports before starting.", command: "git clone https://github.com/Priyadharshan0903/grafana-observability-lab.git\ncd grafana-observability-lab/stack\ndocker compose up -d --build" },
  },
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
