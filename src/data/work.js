import ArtNet from '../components/art/ArtNet.jsx';
import ArtWeb from '../components/art/ArtWeb.jsx';
import ArtMail from '../components/art/ArtMail.jsx';
import ArtRack from '../components/art/ArtRack.jsx';
import ArtBrain from '../components/art/ArtBrain.jsx';
import ArtGame from '../components/art/ArtGame.jsx';

export const WORK = [
  {
    slug: 'secnet-auditor',
    repo: 'SecNet-Auditor',
    title: 'SecNet-Auditor',
    text: 'Modular suite for network auditing, hardening and defensive monitoring on Ubuntu and Debian servers.',
    tags: ['Python', 'Flask', 'Security'],
    Art: ArtNet,
    wide: true,
    summary: 'A local dashboard that audits an Ubuntu or Debian server and shows what needs fixing. It started as an SMX course project and is read-only on purpose: it suggests fixes but never touches the firewall, users or permissions.',
    points: [
      'Checks Netplan configuration, DNS resolution and the state of each network interface.',
      'Flags an inactive UFW firewall, non-root accounts with UID 0 and file permissions looser than expected.',
      'Reads auth.log to spot SSH brute force per IP, and marks any IP that also logged in successfully.',
      'Exposes each module through a JSON API and listens on localhost only.'
    ],
    stack: ['Python', 'Flask', 'Bootstrap 5', 'UFW', 'Netplan']
  },
  {
    slug: 'map-of-catalonia',
    repo: 'mapa-interactivo-cataluna',
    title: 'Interactive map of Catalonia',
    text: 'An interactive atlas of 98 places across Catalonia, Mallorca and Menorca.',
    tags: ['TypeScript', 'Next.js', 'Leaflet'],
    Art: ArtWeb,
    demo: 'https://coneix-cat.netlify.app/',
    summary: 'An atlas for exploring Catalonia, Mallorca and Menorca. It puts 98 places on one map you can filter, search and open.',
    points: [
      'Filters by region and by type: city, medieval, coast, nature, heritage or viewpoint.',
      'Searches by place name or by comarca.',
      'Opens a sheet for each place with a description, highlights and the best time to go.'
    ],
    stack: ['TypeScript', 'Next.js', 'Leaflet']
  },
  {
    slug: 'notion-gmail',
    repo: 'Notion-Gmail',
    title: 'Notion-Gmail',
    text: 'Self-hosted automation that syncs Gmail emails with Notion tasks, including attachments and direct links.',
    tags: ['JavaScript', 'Notion', 'Gmail'],
    Art: ArtMail,
    summary: 'Send yourself an email in a simple format and it becomes a Notion task, with its date, priority and status already filled in.',
    points: [
      'Only processes email from an authorized address, so spam never becomes a task.',
      'Uploads attachments to Google Drive and links them from the task.',
      'Adds a direct link back to the original Gmail thread.',
      'Replies to confirm the task exists and labels each email as processed or failed.'
    ],
    stack: ['JavaScript', 'Google Apps Script', 'Notion API', 'Gmail', 'Google Drive']
  },
  {
    slug: 'local-ai-agent',
    repo: 'IA-local',
    title: 'Local AI agent',
    text: 'Private, local AI agent built on Ollama, with web search, sandboxed code, memory, vision, voice and subagents.',
    tags: ['Python', 'Ollama', 'FastAPI'],
    Art: ArtRack,
    wide: true,
    summary: 'A private AI agent that runs on your own machine. Ollama serves the models, and a FastAPI layer with an OpenAI-compatible API adds the tools around them.',
    points: [
      'Runs Python in a throwaway Docker container with no network access.',
      'Blocks dangerous tools for the rest of a turn once it has read web or screen content.',
      'Searches the web through a filter that stops SSRF.',
      'Keeps memory in an embedded Qdrant database, sees the screen or webcam and works by voice.',
      'Splits independent tasks across parallel subagents.'
    ],
    stack: ['Python', 'FastAPI', 'Ollama', 'Qdrant', 'Docker', 'Whisper', 'Piper']
  },
  {
    slug: 'brain-agent',
    repo: 'Brain-agent',
    title: 'Brain-agent',
    text: 'Local AI agent that generates notes and saves them to an Obsidian vault using Ollama.',
    tags: ['Python', 'Ollama', 'Obsidian'],
    Art: ArtBrain,
    canvas: true,
    summary: 'Give it a topic and it writes a structured note straight into an Obsidian vault. It runs on Ollama, so there is no cloud, no API key and no cost.',
    points: [
      'Writes YAML frontmatter, internal links and actionable sections into every note.',
      'Detects the type of note and files it in the right folder of the vault.',
      'Takes one topic at a time or runs as an interactive session.',
      'Uses only the Python standard library.'
    ],
    stack: ['Python', 'Ollama', 'Obsidian', 'Markdown']
  },
  {
    slug: 'games-in-terminal',
    repo: 'Games-in-terminal',
    title: 'Games-in-terminal',
    text: 'Classic terminal games in a single file, with a menu and no dependencies.',
    tags: ['Python'],
    Art: ArtGame,
    canvas: true,
    wide: true,
    summary: 'Eight games and a relaxing clock in one Python file: Snake, Wordle, Tetris, a roguelike, Game of Life, Hangman, Minesweeper and Pong. Pick one from the menu and play in your terminal.',
    points: [
      'Needs nothing but Python: no installs and no dependencies.',
      'Reads the keyboard without blocking on Windows, Linux and macOS.',
      'Draws with ANSI codes on the alternate screen, so your terminal is untouched when you quit.',
      'Registers each game as one entry in a list, so adding another takes one line.'
    ],
    stack: ['Python', 'ANSI escape codes']
  }
];
