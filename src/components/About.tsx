
import { Code, Database, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            I am Mohd Shoaib Rayeen, a Senior Software Engineer with 6+ years of experience architecting scalable backend systems, 
            AI-powered pipelines, and LLM-integrated workflows across legal-tech and fintech domains. 
            Delivered production-grade Generative AI, RAG, and MCP server solutions integrated with OpenAI, Claude, Llama, Gemini, Mistral, Cerebras, and WatsonX.AI. 
            Consistently boosted throughput, slashed processing latency, and accelerated revenue growth through high-performance distributed microservices in Java 17, Spring Boot, and Golang.
          </p>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">6+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600">15+</div>
              <div className="text-gray-600">Projects</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              With deep expertise in system design, automation testing, and site reliability engineering, 
              I have contributed to building high-performance, resilient, and AI-driven solutions that 
              serve millions of users across multiple countries.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My passion lies in creating scalable systems, implementing cutting-edge AI-driven automation, 
              and architecting distributed computing solutions. I'm also an active member 
              of the Programmers Community, sharing knowledge and learning from peers in the evolving landscape of AI and software engineering.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Database size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Backend Architecture</h3>
                <p className="text-gray-600">Designing scalable, fault-tolerant backend systems with microservices architecture.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Cpu size={24} className="text-cyan-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Integrations</h3>
                <p className="text-gray-600">Implementing AI-driven solutions with LLM integrations and intelligent automation.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Code size={24} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Distributed Systems</h3>
                <p className="text-gray-600">Building high-performance distributed systems that scale globally.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
