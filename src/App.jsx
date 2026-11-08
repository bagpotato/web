import { useEffect } from 'react';
import useTheme from './hooks/useTheme.js';
import useProjectRoute from './hooks/useProjectRoute.js';
import { WORK } from './data/work.js';
import Sky from './components/Sky.jsx';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

export default function App() {
  const [dark, toggle] = useTheme();
  const [slug, closeProject] = useProjectRoute();
  const project = WORK.find((p) => p.slug === slug);

  useEffect(() => {
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <>
      <Sky />
      <Preloader />
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Contact />
      {project && <ProjectDetail project={project} onClose={closeProject} />}
    </>
  );
}
