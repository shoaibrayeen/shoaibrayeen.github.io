
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// Removed ResumeSection import
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Achievements from '@/components/Achievements';
import Hobbies from '@/components/Hobbies';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <Hero />
        {/* Removed <ResumeSection /> */}
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Achievements />
        <Hobbies />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
