import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import Wall from './components/Wall.jsx';
import Repos from './components/Repos.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Languages from './components/Languages.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ProjectViewer from './components/ProjectViewer.jsx';
import Game from './components/Game.jsx';

export default function App() {
  const [game, setGame] = useState(false);
  const [project, setProject] = useState(null);

  return (
    <>
      <Header onPlay={() => setGame(true)} />
      <main>
        <Hero />
        <Section id="proyectos" tone="dark" title="Proyectos y laboratorios" intro="Selecciona un monitor para ver el detalle del proyecto.">
          <Wall onOpen={setProject} />
        </Section>
        <Section id="repositorios" title="Repositorios"><Repos /></Section>
        <Section id="especialidades" tone="mist" title="Especialidades"><Skills /></Section>
        <Section id="formacion" title="Formación"><Education /></Section>
        <Section id="idiomas" tone="mist" title="Idiomas"><Languages /></Section>
        <Section id="preguntas" title="Preguntas frecuentes"><Faq /></Section>
        <Section id="contacto" tone="dark" title="Contacto"><Contact /></Section>
      </main>
      <Footer />
      <ProjectViewer index={project} onClose={() => setProject(null)} />
      <Game open={game} onClose={() => setGame(false)} />
    </>
  );
}
