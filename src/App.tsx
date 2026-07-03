import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LiveDetection from './components/LiveDetection';
import Experience from './components/Experience';
import CaseStudy from './components/CaseStudy';
import Metrics from './components/Metrics';
import Certificates from './components/Certificates';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/ui/Cursor';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollProgress from './components/ui/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <Cursor />
      <ScrollProgress />
      <div className="min-h-screen bg-white dark:bg-dark-950 text-dark-900 dark:text-dark-100 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <LiveDetection />
          <Experience />
          <CaseStudy />
          <Metrics />
          <Certificates />
          <Leadership />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;