
import { useState, FormEvent } from 'react';
import { Mail, Github, Linkedin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Injected at build time: mapped from the EMAIL_API_KEY repo secret in the deploy
// workflow; .env.local for local dev (template in .env.example); random stub in tests.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailClick = () => {
    const userAgent = navigator.userAgent;
    const email = 'shoaibrayeen.me@gmail.com';
    
    if (userAgent.includes('Outlook') || userAgent.includes('Windows')) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  const handleConversationClick = () => {
    window.open('https://www.linkedin.com/in/shoaibrayeen/', '_blank');
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New message from shoaibrayeen.github.io');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Contact Form */}
          <div className="mt-12">
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Send Me a Message
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Have a question or want to work together? Drop me a message below.
              </p>

              <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
                {/* Honeypot for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-cyan-700 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Ready to Collaborate */}
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
