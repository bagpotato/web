import ArtNet from '../components/art/ArtNet.jsx';
import ArtWeb from '../components/art/ArtWeb.jsx';
import ArtMail from '../components/art/ArtMail.jsx';
import ArtRack from '../components/art/ArtRack.jsx';
import ArtChart from '../components/art/ArtChart.jsx';
import ArtBackup from '../components/art/ArtBackup.jsx';

export const WORK = [
  { repo: 'SecNet-Auditor', title: 'SecNet-Auditor', text: 'Suite modular de auditoría de red, hardening y monitorización defensiva para servidores Ubuntu y Debian.', tags: ['Python', 'Flask', 'Seguridad'], Art: ArtNet, wide: true },
  { repo: 'mapa-interactivo-cataluna', title: 'Mapa interactivo de Cataluña', text: 'Mapa interactivo de Cataluña desarrollado con Next.js.', tags: ['TypeScript', 'Next.js'], Art: ArtWeb },
  { repo: 'Notion-Gmail', title: 'Notion-Gmail', text: 'Automatización self-hosted que sincroniza correos de Gmail con tareas de Notion, con adjuntos y enlaces directos.', tags: ['JavaScript', 'Notion', 'Gmail'], Art: ArtMail },
  { repo: 'IA-local', title: 'IA-local', text: 'Entorno de IA privado y seguro, accesible desde cualquier lugar sin abrir puertos en el router.', tags: ['Shell', 'IA', 'Self-hosted'], Art: ArtRack, wide: true },
  { repo: 'Brain-agent', title: 'Brain-agent', text: 'Agente de IA local que genera y guarda notas en un vault de Obsidian usando Ollama.', tags: ['Python', 'Ollama', 'Obsidian'], Art: ArtChart },
  { repo: 'Games-in-terminal', title: 'Games-in-terminal', text: 'Colección de juegos clásicos para la terminal en un solo archivo, con menú y sin dependencias.', tags: ['Python'], Art: ArtBackup, wide: true }
];
