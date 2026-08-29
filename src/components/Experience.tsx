
import SectionHeader from './SectionHeader';

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
      return <span className="text-gray-700 dark:text-gray-300">{achievement}</span>;
    }
    return (
      <div className="mb-4">
        <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{achievement.title}</h5>
        <ul className="space-y-1 ml-4">
          {achievement.items.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-teal-600 dark:text-teal-400 mt-1.5">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-slate-950 dark:to-teal-950/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-12 lg:gap-16 items-start">
          <SectionHeader
            eyebrow="Career"
            title="Experience"
            lead="My professional journey building scalable systems and AI-driven solutions."
          >
            {/* Role history: companies, titles, durations and promotions live in
                the rail; the matching highlight cards sit in the right column. */}
            <div className="mt-10 space-y-8 text-left max-w-md mx-auto lg:mx-0">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-teal-600 dark:bg-teal-400 rounded-full border-2 border-white dark:border-slate-900 shadow"></div>
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-[5px] top-6 -bottom-8 w-px bg-teal-200 dark:bg-teal-800"></div>
                  )}

                  <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">{exp.company}</h3>

                  {exp.positions ? (
                    <div className="space-y-4">
                      {exp.positions.map((pos, posIndex) => (
                        <div key={posIndex} className="border-l-2 border-teal-200 dark:border-teal-800 pl-3">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{pos.title}</h4>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{pos.duration}</span>
                          </div>
                          {pos.promotion && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{pos.promotion}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-l-2 border-teal-200 dark:border-teal-800 pl-3">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{exp.position}</h4>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{exp.duration}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionHeader>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600 dark:text-teal-400 mb-4">
                  {exp.company} · Highlights
                </p>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      {typeof achievement === 'string' && (
                        <span className="text-teal-600 dark:text-teal-400 mt-1.5">•</span>
                      )}
                      <div className="flex-1">
                        {renderAchievement(achievement)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
