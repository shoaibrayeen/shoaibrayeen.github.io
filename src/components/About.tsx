
import { Code, Database, Cpu } from 'lucide-react';
import SectionHeader from './SectionHeader';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-12 lg:gap-16 items-start">
          <SectionHeader eyebrow="Who I Am" title="About Me">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 mt-8">
              <div className="text-center p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
            </div>
          </SectionHeader>

          <div className="space-y-8">
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I am Mohd Shoaib Rayeen, a Technical Lead with 6+ years of experience architecting scalable backend systems,
              AI-powered pipelines, and LLM-integrated workflows across legal-tech and fintech domains.
              Delivered production-grade Generative AI, RAG, and MCP server solutions integrated with OpenAI, Claude, Llama, Gemini, Mistral, Cerebras, and WatsonX.AI.
              Consistently boosted throughput, slashed processing latency, and accelerated revenue growth through high-performance distributed microservices in Java 17, Spring Boot, and Golang.
            </p>

            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                With deep expertise in system design, automation testing, and site reliability engineering,
                I have contributed to building high-performance, resilient, and AI-driven solutions that
                serve millions of users across multiple countries.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My passion lies in creating scalable systems, implementing cutting-edge AI-driven automation,
                and architecting distributed computing solutions. I'm also an active member
                of the Programmers Community, sharing knowledge and learning from peers in the evolving landscape of AI and software engineering.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 rounded-xl">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Database size={24} className="text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Backend Architecture</h3>
                  <p className="text-gray-600 dark:text-gray-400">Designing scalable, fault-tolerant backend systems with microservices architecture.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-xl">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <Cpu size={24} className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">AI Integrations</h3>
                  <p className="text-gray-600 dark:text-gray-400">Implementing AI-driven solutions with LLM integrations and intelligent automation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <Code size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Distributed Systems</h3>
                  <p className="text-gray-600 dark:text-gray-400">Building high-performance distributed systems that scale globally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
