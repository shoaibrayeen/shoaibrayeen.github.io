
import { Play, Heart, Headphones, Camera, Coffee, Film, ExternalLink } from 'lucide-react';

type Hobby = {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  link?: { href: string; label: string };
};

const Hobbies = () => {
  const hobbies: Hobby[] = [
    {
      title: "Sports Enthusiast",
      description: "Passionate about Cricket, Carrom, and Badminton - love the strategy and teamwork",
      icon: <Play size={24} className="text-teal-600" />,
      color: "from-teal-50 to-emerald-50"
    },
    {
      title: "K-Drama & K-Pop Lover",
      description: "Avid viewer of Korean dramas and K-pop music enthusiast, fascinated by Korean culture",
      icon: <Heart size={24} className="text-pink-600" />,
      color: "from-pink-50 to-rose-50"
    },
    {
      title: "Music Aficionado",
      description: "Enjoys timeless classics and diverse music genres that span generations and cultures",
      icon: <Headphones size={24} className="text-purple-600" />,
      color: "from-purple-50 to-indigo-50"
    },
    {
      title: "Photography & Travel",
      description: "Capturing moments through photography while exploring new destinations and cultures",
      icon: <Camera size={24} className="text-blue-600" />,
      color: "from-blue-50 to-cyan-50"
    },
    {
      title: "Cafe Hopping",
      description: "Exploring unique cafes and coffee cultures, discovering new flavors and ambiances",
      icon: <Coffee size={24} className="text-amber-600" />,
      color: "from-amber-50 to-orange-50"
    },
    {
      title: "Cinema Enthusiast",
      description: "Passionate about films from different genres and cultures, appreciating storytelling and cinematography",
      icon: <Film size={24} className="text-red-600" />,
      color: "from-red-50 to-pink-50",
      link: {
        href: "https://shoaibrayeen.github.io/cinema-hub/",
        label: "Explore my Cinema Hub"
      }
    }
  ];

  return (
    <section id="hobbies" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Hobbies & Interests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beyond coding, I find joy in diverse activities that keep me balanced, inspired, and connected to different cultures.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <div key={index} className={`bg-gradient-to-br ${hobby.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mx-auto mb-4 shadow-md">
                {hobby.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{hobby.title}</h3>
              <p className="text-gray-600 text-center">{hobby.description}</p>
              {hobby.link && (
                <div className="mt-4 text-center">
                  <a
                    href={hobby.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-white text-teal-700 rounded-full text-sm font-semibold border border-teal-200 shadow-sm hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white hover:border-transparent transition-all duration-200"
                  >
                    {hobby.link.label}
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
