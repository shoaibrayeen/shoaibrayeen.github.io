
const Experience = () => {

  const experiences = [
    {
      company: "Sirion",
      positions: [
        {
          title: "Technical Lead I",
          duration: "Jun 2025 - Present",
          promotion: "Promoted from Senior Software Engineer 1"
        },
        {
          title: "Senior Software Engineer 1",
          duration: "Apr 2024 - May 2025",
          promotion: "Promoted from Software Engineer 1"
        },
        {
          title: "Software Engineer 1",
          duration: "Jan 2023 - Mar 2024",
          promotion: "Redesignated from Software Engineer"
        },
        {
          title: "Software Engineer",
          duration: "Aug 2021 - Dec 2022"
        }
      ],
      achievements: [
        {
          title: "Document Extraction & Gen AI Integration",
          items: [
            "Architected Gen AI SKU and client-provided LLM integrations (OpenAI, Claude) into enterprise AI extraction pipeline, automating 10,000+ legal documents/month and slashing manual review effort by 60%",
            "Deployed MCP server covering 15+ AI extraction and document management operations, trimming new-client tooling onboarding time by 50%",
            "Spearheaded auto-extraction pipeline with RAG-based retrieval across 3rd-party and in-house LLM providers, hitting 90%+ accuracy across 50+ clause types",
            "Standardized prompt engineering across 30+ LLM templates in a centralized prompt and LLM repository, lowering hallucination rates by 25%"
          ]
        },
        {
          title: "Product Enhancements & Feature Development",
          items: [
            "Designed 4-tier async API processing (Priority, Dedicated, Small, Large queues), cutting average response latency by 40% and boosting overall system throughput by 35%",
            "Engineered 20+ RESTful microservices in Java 17 and Spring Boot; implemented Apache Pulsar event streaming and Redis caching, sustaining 5M+ events/day with 45% lower DB load"
          ]
        },
        {
          title: "Communication & Interaction Enhancements",
          items: [
            "Launched Talk-to-Document — LLM-powered contextual Q&A with semantic reference linking — shrinking average review cycles by 45% for enterprise users"
          ]
        },
        {
          title: "Monitoring, Alerts & Performance",
          items: [
            "Established ELK Stack observability and structured dynamic logging across 10+ distributed services, decreasing MTTR for production incidents by 35%"
          ]
        }
      ]
    },
    {
      company: "Airtel Africa",
      position: "Software Engineer",
      duration: "Aug 2020 - Aug 2021",
      achievements: [
        "Delivered 25+ transactional and non-transactional payment REST APIs across 13 countries, processing millions of cross-border settlement transactions monthly",
        "Championed Canza — real-time exchange rate management platform (Angular 9, Node.js) — directly driving a 1.5x post-deployment revenue increase across pan-African markets",
        "Shipped 8 ESB and Canza production features on schedule, strengthening payment transaction reliability and unlocking new regional revenue streams"
      ]
    },
    {
      company: "PropTiger.com",
      position: "Software Engineer Intern",
      duration: "Jan 2020 - Jul 2020",
      achievements: [
        "Overhauled FAQ service architecture and launched 10+ SEO-optimized Python REST APIs, lifting organic property search traffic by 20%+",
        "Accelerated backend search relevance and page-ranking algorithms, dropping average query response time by 25% and improving session engagement metrics"
      ]
    }
  ];

  const renderAchievement = (achievement: string | { title: string; items: string[] }) => {
    if (typeof achievement === 'string') {
      return <span className="text-gray-700">{achievement}</span>;
    }
    return (
      <div className="mb-4">
        <h5 className="font-bold text-gray-800 mb-2">{achievement.title}</h5>
        <ul className="space-y-1 ml-4">
          {achievement.items.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-teal-600 mt-1.5">•</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            My professional journey building scalable systems and AI-driven solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <div className="bg-white rounded-xl shadow-lg p-8 ml-8 relative">
                {/* Timeline dot */}
                <div className="absolute -left-12 top-8 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow-lg"></div>
                
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute -left-10 top-12 w-px h-24 bg-teal-200"></div>
                )}

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-teal-600 mb-2">{exp.company}</h3>
                  
                  {exp.positions ? (
                    <div className="space-y-4">
                      {exp.positions.map((pos, posIndex) => (
                        <div key={posIndex} className="border-l-4 border-teal-200 pl-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-xl font-semibold text-gray-800">{pos.title}</h4>
                            <span className="text-gray-500 font-medium">{pos.duration}</span>
                          </div>
                          {pos.promotion && (
                            <p className="text-sm text-emerald-600 font-medium mb-2">{pos.promotion}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">{exp.position}</h4>
                      <span className="text-gray-500 font-medium">{exp.duration}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      {typeof achievement === 'string' && (
                        <span className="text-teal-600 mt-1.5">•</span>
                      )}
                      <div className="flex-1">
                        {renderAchievement(achievement)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
