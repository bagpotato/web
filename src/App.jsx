import useTheme from './hooks/useTheme.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [dark, toggle] = useTheme();

  return (
    <>
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Contact />
    </>
  );
}
