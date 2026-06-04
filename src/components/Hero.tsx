import { ArrowDown, Download } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    console.log('Download button clicked');
    
    // Google Drive direct download URL
    const driveUrl = 'https://drive.google.com/uc?export=download&id=1uIxXCEDzKNIDLiA7lw_ONSRKNxUkA3d8';
    
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
      <div className="absolute inset-0 bg-gradient-to-br from-teal-25 via-white to-cyan-25"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-emerald-100 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-teal-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-60 right-10 w-18 h-18 bg-cyan-200 rounded-full opacity-25 animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Photo */}
          <div className="mb-12 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full blur-lg opacity-30 scale-110"></div>
              <img 
                src="/profile.png"
                alt="Mohd Shoaib Rayeen"
                className="relative w-56 h-56 rounded-full mx-auto shadow-2xl border-4 border-white object-cover ring-4 ring-teal-100"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent animate-fade-in">
              Mohd Shoaib Rayeen
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-700 font-semibold animate-fade-in-delay-1">
              Technical Lead I
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2">
              6+ years architecting scalable backend systems, AI-powered pipelines, and LLM-integrated workflows 
              across legal-tech and fintech. Delivering production-grade Gen AI, RAG, and MCP solutions.
            </p>
          </div>
          
          {/* Tech Stack Highlights */}
          <div className="py-8">
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-delay-3">
              {['Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Apache Pulsar', 'Redis', 'GoLang', 'MCP', 'Gen AI'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-6 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100 hover:from-teal-100 hover:to-cyan-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="py-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-teal-600 text-teal-600 px-10 py-4 rounded-full font-semibold hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white transition-all duration-200 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-600 hover:to-cyan-600"
              >
                Get In Touch
              </button>
              <button
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 inline-flex items-center gap-2 justify-center"
              >
                <Download size={20} />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
