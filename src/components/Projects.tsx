
const Projects = () => {
  const projects = [
    {
      title: "Bulk Processor",
      tech: "Spring Boot, PostgreSQL, Pulsar",
      description: "Designed a fault-tolerant system for bulk data processing with context-aware service restart and retry mechanisms. Integrated Pulsar messaging, email notification templates, and Excel download APIs for improved usability."
    },
    {
      title: "ESB, Airtel Africa",
      tech: "Spring Boot, PostgreSQL, Redis",
      description: "Developed transactional and non-transactional APIs for 13 operating countries. Managed production and UAT bug fixes, improving system stability."
    },
    {
      title: "Canza, Airtel Africa",
      tech: "Spring Boot, PostgreSQL, Redis, Angular 9, Node.js 12",
      description: "Built an intuitive Exchange Rate Management UI for multiple countries. Developed APIs to add, update, and manage forex conversion rates."
    },
    {
      title: "Housing FAQ Service",
      tech: "Ruby on Rails, PostgreSQL, Sidekiq, Redis",
      description: "Revamped an SEO-optimized FAQ microservice, enhancing search discoverability."
    },
    {
      title: "Profile Management System",
      tech: "Ruby on Rails, PostgreSQL, ElasticSearch, Sidekiq",
      description: "Developed a team hierarchy and CRUD-based user management system."
    },
    {
      title: "API Testing Automation",
      tech: "Java, Karate, JavaScript",
      description: "Automated microservice API testing with reporting capabilities."
    },
    {
      title: "URL Shortener",
      tech: "Spring Boot, Java, MySQL",
      description: "Implemented a long URL shortening service with persistent storage."
    },
    {
      title: "AI Chatbot",
      tech: "Flask, Python, AIML, JavaScript",
      description: "Developed an AI-powered chatbot supporting sports, dictionary, and general knowledge queries."
    },
    {
      title: "Accident Prevention System",
      tech: "OpenCV, Python",
      description: "Implemented a drowsiness detection system for driver safety alerts."
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
