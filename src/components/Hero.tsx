import { Download } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    console.log('Download button clicked');

    // Google Drive direct download URL
    const driveUrl = 'https://drive.google.com/uc?export=download&id=1xwVsgSsioC3KwySH5GDdMTzo8IPBXhkP';

    // Create download link
    const link = document.createElement('a');
    link.href = driveUrl;
    link.download = 'Mohd_Shoaib_Rayeen_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Download initiated');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-25 via-white to-cyan-25 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-100 dark:bg-teal-800 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-100 dark:bg-cyan-800 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-emerald-100 dark:bg-emerald-800 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-teal-200 dark:bg-teal-700 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-60 right-10 w-18 h-18 bg-cyan-200 dark:bg-cyan-700 rounded-full opacity-25 animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-16 items-center">
          {/* Intro column */}
          <div className="text-center lg:text-left space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Technical Lead I · 6+ Years
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
              Backend systems,{' '}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                <span className="whitespace-nowrap">Gen AI</span> in production.
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Mohd Shoaib Rayeen
            </h2>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              6+ years architecting scalable backend systems, AI-powered pipelines, and LLM-integrated workflows
              across legal-tech and fintech. Delivering production-grade Gen AI, RAG, and MCP solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-300 px-8 py-4 rounded-full font-semibold hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white dark:hover:from-teal-600 dark:hover:to-cyan-600 dark:hover:text-white transition-all duration-200 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 hover:from-teal-600 hover:to-cyan-600"
              >
                Get In Touch
              </button>
              <button
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 inline-flex items-center gap-2 justify-center"
              >
                <Download size={20} />
                Download CV
              </button>
            </div>

            {/* Tech Stack Highlights */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
              {['Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Apache Pulsar', 'Redis', 'GoLang', 'MCP', 'Gen AI'].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 dark:from-teal-950 dark:to-cyan-950 dark:text-teal-300 rounded-full text-xs font-medium border border-teal-100 dark:border-teal-800 hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900 dark:hover:to-cyan-900 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Portrait column */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-3xl border border-teal-100 dark:border-teal-800 bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-8 py-12 flex flex-col items-center gap-5 shadow-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 dark:from-teal-700 dark:to-cyan-700 rounded-full blur-lg opacity-40 scale-110"></div>
                <img
                  src="/profile.png"
                  alt="Mohd Shoaib Rayeen"
                  className="relative w-52 h-52 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-800 ring-4 ring-teal-100 dark:ring-teal-900"
                />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Legal-tech · Fintech · Real Estate</p>
            </div>

            {/* Proof-point chips */}
            <div className="absolute -top-4 -right-2 md:-right-5 rounded-xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-lg px-4 py-2.5 text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">6+ years</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">backend & AI systems</p>
            </div>
            <div className="absolute -bottom-4 -left-2 md:-left-5 rounded-xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-lg px-4 py-2.5 text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Gen AI · RAG · MCP</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">in production</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
