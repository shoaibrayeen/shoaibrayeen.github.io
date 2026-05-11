
const Projects = () => {
  const projects = [
    {
      title: "Talk-to-Document",
      tech: "Spring Boot, Vector Search, LLM",
      description: "Pioneered an LLM-powered semantic Q&A engine handling 10,000+ user queries/month with sub-second response times for contract review at Sirion."
    },
    {
      title: "Gen AI Extraction Pipeline",
      tech: "OpenAI, Claude, RAG, Spring Boot",
      description: "Automated full document ingestion lifecycle (parse → extract → validate) via OpenAI and Claude with RAG fallback, achieving 90%+ accuracy across diverse legal document formats at Sirion."
    },
    {
      title: "MCP Server Integration",
      tech: "Model Context Protocol, Spring Boot",
      description: "Streamlined AI tooling access by exposing 15+ standardized operations via Model Context Protocol, enabling plug-and-play LLM integration for enterprise clients at Sirion."
    },
    {
      title: "Bulk Processor",
      tech: "Java 17, Spring Boot, PostgreSQL, Apache Pulsar",
      description: "Scaled an async contract processing engine to 5M+ daily events with zero data loss under sustained peak load at Sirion."
    },
    {
      title: "Canza",
      tech: "Angular 9, Node.js, REST APIs",
      description: "Grew a real-time financial exchange platform into a production-grade tool across 13 African countries, contributing to 1.5x revenue uplift at Airtel Africa."
    },
    {
      title: "ESB Payment Gateway",
      tech: "Spring Boot, Event-Driven Architecture",
      description: "Facilitated cross-border settlement for millions of users via an event-driven payment API gateway with sub-100ms transaction routing across pan-African markets at Airtel Africa."
    },
    {
      title: "RAG & AI API Integration",
      tech: "Qdrant, Weaviate, Vector Search",
      description: "Integrated Qdrant and Weaviate vector databases into knowledge retrieval APIs, accelerating semantic search speed by 40% over keyword-based baseline systems."
    },
    {
      title: "Housing FAQ Service",
      tech: "Ruby on Rails, PostgreSQL, Sidekiq, Redis",
      description: "Revamped an SEO-optimized FAQ microservice for property listings, enhancing search engine discoverability and lifting organic traffic by 20%+."
    },
    {
      title: "URL Shortener",
      tech: "Spring Boot, Java, MySQL",
      description: "Implemented a long URL shortening service with persistent storage and fast redirect lookups."
    },
    {
      title: "AI Chatbot",
      tech: "Flask, Python, AIML, JavaScript",
      description: "Developed an AI-powered chatbot supporting sports, dictionary, and general knowledge queries."
    },
    {
      title: "Accident Prevention System",
      tech: "OpenCV, Python",
      description: "Implemented a drowsiness detection system for driver safety alerts using computer vision."
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of scalable systems, AI integrations, and distributed computing solutions I've built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:bg-cyan-500 transition-colors duration-200"></div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    {project.tech}
                  </span>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>
              
              <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
