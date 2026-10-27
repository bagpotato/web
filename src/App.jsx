import { useEffect, useState } from 'react';
import useTheme from './hooks/useTheme.js';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [dark, toggle] = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  }, [ready]);

  return (
    <>
      <Preloader onReveal={() => setReady(true)} />
      {ready && (
        <>
          <Nav dark={dark} toggle={toggle} />
          <main>
            <Hero />
            <Work />
            <About />
          </main>
          <Contact />
        </>
      )}
    </>
  );
}
