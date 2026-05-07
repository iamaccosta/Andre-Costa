'use client'
import About from '@/components/About';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Questions from '@/components/Questions';
import NavBar from '@/components/NavBar';
import { useEffect, useRef, useState } from 'react';
import Toggle from '@/components/sub/Toggle';
import Load from '@/components/sub/Load';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import GraphView from '@/components/GraphView';
import FlashTransition from '@/components/graph/FlashTransition';

export default function Home() {
  const [id, setId]             = useState(0);
  const [viewMode, setViewMode] = useState('scroll');
  const [showFlash, setShowFlash] = useState(false);
  const compsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setId(entry.target.id);
          }
        });
    }, { threshold: 0.3 });

    const compsArr = Array.from(compsRef.current.children);
    compsArr.forEach((comp) => {
      observer.observe(comp);
    });
  }, []);

  const MIN_GRAPH_WIDTH = 1440;

  // Flash only plays when entering graph view, not returning to scroll
  const switchView = (newMode) => {
    if (newMode === viewMode) return;
    if (newMode === 'graph') {
      if (window.innerWidth < MIN_GRAPH_WIDTH) return;
      setShowFlash(true);
    }
    setViewMode(newMode);
  };

  // Exit graph view automatically on small screens
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < MIN_GRAPH_WIDTH && viewMode === 'graph') setViewMode('scroll');
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [viewMode]);

  return (
    <>
      <Load />
      {showFlash && <FlashTransition onComplete={() => setShowFlash(false)} />}
      {viewMode === 'graph' && <GraphView onSwitchView={switchView} />}
      <Toggle>
        {viewMode === 'scroll' && <NavBar id={id} />}
        <div className="w-full sections-container" ref={compsRef}>
          <Hero viewMode={viewMode} onSwitchView={switchView} />
          <About />
          <Experience />
          <Projects />
          <Services />
          <Contact />
          <Questions />
          <Footer />
        </div>
      </Toggle>
    </>
  );
}
