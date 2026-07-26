
const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Java', 'Go (Golang)', 'Python', 'Ruby', 'JavaScript', 'TypeScript'],
      color: 'bg-teal-500'
    },
    {
      title: 'Frameworks',
      skills: ['Spring Boot', 'Golang', 'Ruby on Rails', 'Django', 'Flask', 'FastAPI'],
      color: 'bg-cyan-500'
    },
    {
      title: 'AI & Machine Learning',
      skills: ['Generative AI', 'Retrieval-Augmented Generation (RAG)', 'LLM Inference Integration', 'MCP Server Development', 'AI Extraction Pipelines', 'Prompt Engineering', 'Prompt Repository', 'LLM Repository', 'LLM Management'],
      color: 'bg-pink-500'
    },
    {
      title: 'LLM Inference APIs',
      skills: ['OpenAI', 'Claude (Anthropic)', 'Llama (Meta)', 'Gemini (Google)', 'Mistral AI', 'Cerebras', 'WatsonX.AI'],
      color: 'bg-rose-500'
    },
    {
      title: 'Vector Databases',
      skills: ['Qdrant', 'Weaviate'],
      color: 'bg-violet-500'
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'ElasticSearch', 'Redis'],
      color: 'bg-emerald-500'
    },
    {
      title: 'Messaging & Caching',
      skills: ['Apache Pulsar', 'Apache Kafka', 'Redis', 'Sidekiq', 'Aerospike', 'Amazon S3'],
      color: 'bg-purple-500'
    },
    {
      title: 'Cloud Platforms',
      skills: ['AWS', 'Microsoft Azure', 'Oracle Cloud'],
      color: 'bg-sky-500'
    },
    {
      title: 'DevOps & CI/CD',
      skills: ['Docker', 'Jenkins', 'GitHub Actions', 'SonarQube', 'Bitbucket', 'Keycloak'],
      color: 'bg-indigo-500'
    },
    {
      title: 'Monitoring & Observability',
      skills: ['ELK Stack', 'Kibana', 'Grafana', 'New Relic', 'Performance Monitoring'],
      color: 'bg-orange-500'
    },
    {
      title: 'Testing',
      skills: ['JUnit', 'Mockito', 'Rest Assured', 'Karate', 'RSpec', 'Go Testing'],
      color: 'bg-blue-500'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive expertise across the full technology stack, from backend architecture to AI integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 rounded-full text-sm font-medium hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-200"
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
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Distributed Systems',
              'Microservices Architecture',
              'RESTful API Design',
              'Async Processing',
              'Event-Driven Architecture',
              'System Design',
              'Agile & Scrum',
              'Cloud Computing',
              'Leadership'
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
