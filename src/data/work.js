import ArtNet from '../components/art/ArtNet.jsx';
import ArtWeb from '../components/art/ArtWeb.jsx';
import ArtMail from '../components/art/ArtMail.jsx';
import ArtRack from '../components/art/ArtRack.jsx';
import ArtChart from '../components/art/ArtChart.jsx';
import ArtBackup from '../components/art/ArtBackup.jsx';

export const WORK = [
  { repo: 'SecNet-Auditor', title: 'SecNet-Auditor', text: 'Modular suite for network auditing, hardening and defensive monitoring on Ubuntu and Debian servers.', tags: ['Python', 'Flask', 'Security'], Art: ArtNet, wide: true },
  { repo: 'mapa-interactivo-cataluna', title: 'Interactive map of Catalonia', text: 'Interactive map of Catalonia built with Next.js.', tags: ['TypeScript', 'Next.js'], Art: ArtWeb },
  { repo: 'Notion-Gmail', title: 'Notion-Gmail', text: 'Self-hosted automation that syncs Gmail emails with Notion tasks, including attachments and direct links.', tags: ['JavaScript', 'Notion', 'Gmail'], Art: ArtMail },
  { repo: 'IA-local', title: 'IA-local', text: 'Private, secure AI environment reachable from anywhere without opening router ports.', tags: ['Shell', 'AI', 'Self-hosted'], Art: ArtRack, wide: true },
  { repo: 'Brain-agent', title: 'Brain-agent', text: 'Local AI agent that generates notes and saves them to an Obsidian vault using Ollama.', tags: ['Python', 'Ollama', 'Obsidian'], Art: ArtChart },
  { repo: 'Games-in-terminal', title: 'Games-in-terminal', text: 'Classic terminal games in a single file, with a menu and no dependencies.', tags: ['Python'], Art: ArtBackup, wide: true }
];
