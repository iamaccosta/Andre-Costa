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

export default function Home() {
  const [id, setId ] = useState(0);
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

  return (
    <>
      <Load />
      <Toggle>  
        <NavBar id={id} />
        <div className="w-full sections-container" ref={compsRef}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Services />
          <Contact />
          <Questions />
        </div>
      </Toggle>
    </>
  );
}
