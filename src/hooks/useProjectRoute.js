import { useCallback, useEffect, useRef, useState } from 'react';

const PREFIX = '#project/';
const readSlug = () => (window.location.hash.startsWith(PREFIX) ? window.location.hash.slice(PREFIX.length) : null);

export const projectHref = (slug) => `${PREFIX}${slug}`;

export default function useProjectRoute() {
  const [slug, setSlug] = useState(readSlug);
  const current = useRef(slug);
  const openedInPage = useRef(false);

  useEffect(() => {
    const sync = () => {
      const next = readSlug();
      if (next && !current.current) openedInPage.current = true;
      current.current = next;
      setSlug(next);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const close = useCallback(() => {
    if (!current.current) return;
    current.current = null;
    if (openedInPage.current) {
      window.history.back();
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setSlug(null);
    }
  }, []);

  return [slug, close];
}
