import ArtMail from '../components/art/ArtMail.jsx';
import ArtNet from '../components/art/ArtNet.jsx';
import ArtBackup from '../components/art/ArtBackup.jsx';
import ArtRack from '../components/art/ArtRack.jsx';
import ArtChart from '../components/art/ArtChart.jsx';
import ArtWeb from '../components/art/ArtWeb.jsx';

export const PROJECTS = [
  { title: 'Integración Notion-Gmail', tags: ['API', 'Notion', 'Automation'], text: 'Automatización avanzada para sincronizar flujos de trabajo de correo electrónico directamente en bases de datos de Notion.', repo: 'Notion-Gmail', Art: ArtMail },
  { title: 'Seguridad y Hardening de Redes', tags: ['Cisco', 'Firewall', 'VPN'], text: 'Implementación de políticas de seguridad en routers y switches, filtrado de tráfico y configuración de VPNs.', Art: ArtNet },
  { title: 'Automatización de Backups Pro', tags: ['Bash', 'Automation', 'Cloud'], text: 'Scripts en Bash y PowerShell para la automatización de copias de seguridad incrementales con subida a la nube.', Art: ArtBackup },
  { title: 'Infraestructura Cloud Personal', tags: ['Linux', 'Cloud', 'Networking'], text: 'Despliegue de un entorno de servicios autogestionados sobre Ubuntu Server, optimizando recursos.', Art: ArtRack },
  { title: 'Monitorización Real-Time con IA', tags: ['IA', 'Sistemas', 'Python'], text: 'Panel avanzado de monitorización utilizando modelos locales de IA para detectar anomalías de tráfico.', Art: ArtChart },
  { title: 'Despliegue de Servidores Web Pro', tags: ['Apache2', 'SSL', 'DevOps'], text: 'Configuración avanzada de Apache2 con certificados SSL/TLS y balanceo de carga.', Art: ArtWeb }
];
