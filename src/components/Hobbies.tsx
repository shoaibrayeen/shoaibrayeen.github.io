
import { Play, Heart, Headphones, Camera, Coffee, Film, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';

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
      icon: <Play size={24} className="text-teal-600 dark:text-teal-400" />,
      color: "from-teal-50 to-emerald-50 dark:from-teal-900 dark:to-emerald-900"
    },
    {
      title: "K-Drama & K-Pop Lover",
      description: "Avid viewer of Korean dramas and K-pop music enthusiast, fascinated by Korean culture",
      icon: <Heart size={24} className="text-pink-600 dark:text-pink-400" />,
      color: "from-pink-50 to-rose-50 dark:from-pink-900 dark:to-rose-900"
    },
    {
      title: "Music Aficionado",
      description: "Enjoys timeless classics and diverse music genres that span generations and cultures",
      icon: <Headphones size={24} className="text-purple-600 dark:text-purple-400" />,
      color: "from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900"
    },
    {
      title: "Photography & Travel",
      description: "Capturing moments through photography while exploring new destinations and cultures",
      icon: <Camera size={24} className="text-blue-600 dark:text-blue-400" />,
      color: "from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900"
    },
    {
      title: "Cafe Hopping",
      description: "Exploring unique cafes and coffee cultures, discovering new flavors and ambiances",
      icon: <Coffee size={24} className="text-amber-600 dark:text-amber-400" />,
      color: "from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900"
    },
    {
      title: "Cinema Enthusiast",
      description: "Passionate about films from different genres and cultures, appreciating storytelling and cinematography",
      icon: <Film size={24} className="text-red-600 dark:text-red-400" />,
      color: "from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900",
      link: {
        href: "https://shoaibrayeen.github.io/cinema-hub/",
        label: "Explore my Cinema Hub"
      }
    }
  ];

  return (
    <section id="hobbies" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-slate-950 dark:to-teal-950/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-12 lg:gap-16 items-start">
          <SectionHeader
            eyebrow="Beyond Code"
            title="Hobbies & Interests"
            lead="Beyond coding, I find joy in diverse activities that keep me balanced, inspired, and connected to different cultures."
          >
            {/* Decorative icon strip summarising the six interests. */}
            <div
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3"
              aria-hidden="true"
            >
              {hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${hobby.color} dark:ring-1 dark:ring-white/15 rounded-full shadow-sm`}
                >
                  <span className="flex items-center justify-center w-9 h-9 bg-white dark:bg-slate-900 rounded-full">
                    {hobby.icon}
                  </span>
                </span>
              ))}
            </div>
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-8">
          {hobbies.map((hobby, index) => (
            <div key={index} className={`bg-gradient-to-br ${hobby.color} dark:ring-1 dark:ring-white/15 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              <div className="flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 rounded-full mx-auto mb-4 shadow-md">
                {hobby.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">{hobby.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{hobby.description}</p>
              {hobby.link && (
                <div className="mt-4 text-center">
                  <a
                    href={hobby.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-white text-teal-700 dark:bg-slate-900 dark:text-teal-300 rounded-full text-sm font-semibold border border-teal-200 dark:border-teal-700 shadow-sm hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white hover:border-transparent dark:hover:text-white dark:hover:border-transparent transition-all duration-200"
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
      </div>
    </section>
  );
};

export default Hobbies;
