
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Experience = () => {
  const [visibleAppraisals, setVisibleAppraisals] = useState<{[key: string]: boolean}>({});

  const toggleAppraisalVisibility = (key: string) => {
    setVisibleAppraisals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const experiences = [
    {
      company: "Sirion",
      positions: [
        {
          title: "Senior Software Engineer 1",
          duration: "Apr 2024 - Present",
          promotion: "Promoted from Software Engineer 1",
          appraisal: { period: "Apr 2025", rating: "4.1/5" }
        },
        {
          title: "Software Engineer 1", 
          duration: "Jan 2023 - Mar 2024",
          promotion: "🔄 Redesignated from Software Engineer",
          appraisal: { period: "Apr 2024", rating: "4.18/5" }
        },
        {
          title: "Software Engineer",
          duration: "Aug 2021 - Dec 2022",
          appraisal: [
            { period: "Dec 2022", rating: "3.51/5" },
            { period: "Dec 2021", rating: "4.18/5" }
          ]
        }
      ],
      achievements: [
        {
          title: "Document Extraction & Gen AI Integration",
          items: [
            "Integration of Gen AI SKU for document extraction in the Sirion pipeline",
            "Integration of client-provided LLMs into Sirion Extraction output",
            "Auto-extraction of document data with AI enhancements",
            "Integration of 3rd-party extraction flows to Sirion Extraction system",
            "Integration of MCP servers for extraction and contract CRUD operations"
          ]
        },
        {
          title: "Product Enhancements & Feature Development",
          items: [
            "Enhancement, optimization, and new feature development for Sirion products",
            "Bulk activity support and performance optimizations using async flows and Redis caching",
            "Microservices & API development with Java 17 and Spring Boot architecture"
          ]
        },
        {
          title: "Communication & Interaction Enhancements",
          items: [
            "Email integration to notify users during bulk activities",
            "Talk-to-Document feature: document conversation using LLM with contextual references"
          ]
        },
        {
          title: "Monitoring, Alerts & Performance",
          items: [
            "Integration of alert frameworks and dynamic logger for AE services",
            "Exception handling and logging mechanisms",
            "Monitoring and performance enhancement using ElasticSearch and GoLang"
          ]
        }
      ]
    },
    {
      company: "Airtel Africa",
      position: "Software Engineer",
      duration: "Aug 2020 - Aug 2021",
      achievements: [
        "ESB: Developed Transactional and Non-Transactional APIs in 13 Operating Countries in Africa",
        "Canza: Designed and Developed a UI and REST APIs for managing exchange rates for different countries in Africa",
        "Impact: Revenue was increased 1.5 times after deploying Canza and new features in ESB on the production"
      ]
    },
    {
      company: "Housing.com",
      position: "Software Engineer Intern",
      duration: "Jan 2020 - Jul 2020",
      achievements: [
        "FAQ Service: Redesigned and Developed FAQ Service based on Property Listing to recommend properties on Search Engines",
        "SEO Service: Developed APIs to create SEO Links for the dedicated property pages",
        "Impact: SEO Traffic increased after deploying FAQ service on the production"
      ]
    }
  ];

  const renderAchievement = (achievement: string | { title: string; items: string[] }) => {
    if (typeof achievement === 'string') {
      // Handle string achievements with bold formatting before colons
      const colonIndex = achievement.indexOf(':');
      if (colonIndex !== -1) {
        const beforeColon = achievement.substring(0, colonIndex);
        const afterColon = achievement.substring(colonIndex + 1);
        return (
          <span className="text-gray-700">
            <strong>{beforeColon}</strong>:{afterColon}
          </span>
        );
      }
      return <span className="text-gray-700">{achievement}</span>;
    } else {
      // Handle grouped achievements for Sirion
      return (
        <div className="mb-4">
          <h5 className="font-bold text-gray-800 mb-2">{achievement.title}</h5>
          <ul className="space-y-1 ml-4">
            {achievement.items.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1.5">🔹</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
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
                  
                  {/* Handle Sirion with multiple positions */}
                  {exp.positions ? (
                    <div className="space-y-6">
                      {exp.positions.map((pos, posIndex) => {
                        // const appraisalKey = `${index}-${posIndex}`;
                        // const isVisible = visibleAppraisals[appraisalKey];
                        
                        return (
                          <div key={posIndex} className="border-l-4 border-teal-200 pl-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h4 className="text-xl font-semibold text-gray-800">{pos.title}</h4>
                              <span className="text-gray-500 font-medium">{pos.duration}</span>
                            </div>
                            
                            {pos.promotion && (
                              <p className="text-sm text-emerald-600 font-medium mb-2">{pos.promotion}</p>
                            )}
                            
                            {/* COMMENTED - Appraisal Rating Cards */}
                            {/* {pos.appraisal && (
                              <div className="mb-2">
                                {Array.isArray(pos.appraisal) ? (
                                  <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="text-sm font-semibold text-teal-700">Appraisal Ratings:</h5>
                                      <button
                                        onClick={() => toggleAppraisalVisibility(appraisalKey)}
                                        className="text-teal-600 hover:text-teal-800 transition-colors"
                                      >
                                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                      </button>
                                    </div>
                                    {isVisible && (
                                      <div className="flex flex-wrap gap-2">
                                        {pos.appraisal.map((appr, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                                            {appr.period}: {appr.rating}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="text-sm font-semibold text-teal-700">Appraisal Rating:</h5>
                                      <button
                                        onClick={() => toggleAppraisalVisibility(appraisalKey)}
                                        className="text-teal-600 hover:text-teal-800 transition-colors"
                                      >
                                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                      </button>
                                    </div>
                                    {isVisible && (
                                      <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                                        {pos.appraisal.period}: {pos.appraisal.rating}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )} */}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Handle other companies with single position */
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
                        <span className="text-teal-600 mt-1.5">🔹</span>
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
