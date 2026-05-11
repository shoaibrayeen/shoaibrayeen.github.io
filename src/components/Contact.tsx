
import { Mail, Github, Linkedin, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  const handleEmailClick = () => {
    const userAgent = navigator.userAgent;
    const email = 'shoaibrayeen.me@gmail.com';
    
    // Check if user is on mobile or has Outlook installed
    if (userAgent.includes('Outlook') || userAgent.includes('Windows')) {
      window.location.href = `mailto:${email}`;
    } else {
      // Default to Gmail web interface
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+918181813999';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918181813999', '_blank');
  };

  const handleConversationClick = () => {
    // Redirect to LinkedIn for professional conversations
    window.open('https://www.linkedin.com/in/shoaibrayeen/', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let's discuss opportunities to build scalable systems and AI-driven solutions together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shoaibrayeen/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <Linkedin size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">LinkedIn</h3>
              <p className="text-gray-600 text-sm">@shoaibrayeen</p>
            </a>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors duration-300">
                <Mail size={32} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-xs break-all">shoaibrayeen.me@gmail.com</p>
            </button>


            {/* GitHub */}
            <a
              href="https://github.com/shoaibrayeen"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                <Github size={32} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">GitHub</h3>
              <p className="text-gray-600 text-sm">@shoaibrayeen</p>
            </a>

          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Collaborate?</h3>
              <p className="text-lg mb-6">
                I'm always open to exploring impactful opportunities, especially those centered around innovation, scalability, and AI-driven technologies. If you're working on something that aligns, I'd be glad to connect and discuss further.
              </p>
              <button
                onClick={handleConversationClick}
                className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
