
const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Go', 'Java', 'Python', 'Ruby', 'JavaScript', 'TypeScript'],
      color: 'bg-teal-500'
    },
    {
      title: 'Frameworks',
      skills: ['GoLang', 'Spring Boot', 'Ruby on Rails', 'Django', 'Flask', 'Fast API'],
      color: 'bg-cyan-500'
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'DynamoDB', 'ElasticSearch', 'Redis'],
      color: 'bg-emerald-500'
    },
    {
      title: 'Testing',
      skills: ['Karate', 'RSpec', 'Mockito', 'Rest Assured', 'JUnit'],
      color: 'bg-blue-500'
    },
    {
      title: 'DevOps & Tools',
      skills: ['Jenkins', 'Keycloak', 'Bitbucket', 'GitHub', 'SonarQube', 'Confluence', 'JIRA'],
      color: 'bg-indigo-500'
    },
    {
      title: 'Queue & Caching',
      skills: ['Apache Pulsar', 'Redis', 'Sidekiq', 'Aerospike', 'Amazon S3'],
      color: 'bg-purple-500'
    },
    {
      title: 'Gen AI',
      skills: ['Prompt Engineering', 'Prompt Studio', 'LLM Studio', 'Retrieval-Augmented Generation (RAG)', 'AI-driven API development', 'MCP Integration'],
      color: 'bg-pink-500'
    },
    {
      title: 'Monitoring',
      skills: ['Kibana', 'New Relic (NRM)', 'Grafana', 'ELK'],
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive expertise across the full technology stack, from backend architecture to AI integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'REST API',
              'Microservice Architecture',
              'Agile Development',
              'Cloud Computing',
              'System Design',
              'Site Reliability Engineering',
              'Leadership',
              'Event Management'
            ].map((competency, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-medium hover:scale-105 transition-transform duration-200"
              >
                {competency}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
