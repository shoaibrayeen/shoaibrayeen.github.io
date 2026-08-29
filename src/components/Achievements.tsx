
import SectionHeader from './SectionHeader';

const Achievements = () => {
  const achievements = [
    {
      title: "Academic Excellence Award",
      description: "Awarded by Akhilesh Yadav (Former CM of UP) for Academic Excellence"
    }
  ];

  const certifications = [
    {
      title: "Advanced Prompt Engineering Techniques",
      organization: "LinkedIn Learning",
      year: "2024"
    }
  ];

  const positions = [
    {
      title: "Alexa Student Influencer",
      organization: "Amazon Alexa, Amazon"
    },
    {
      title: "Chegg Subject Expert",
      organization: "Chegg"
    },
    {
      title: "Head Organizer",
      organization: "Equinox, Hansraj College"
    },
    {
      title: "Senior Coordinator",
      organization: "Society of General Awareness, Hansraj College"
    },
    {
      title: "Senior Coordinator",
      organization: "Haritima, Hansraj College"
    }
  ];


  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50 dark:from-slate-950 dark:to-teal-950/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-12 lg:gap-16 items-start">
          <SectionHeader
            eyebrow="Recognition"
            title="Achievements & Leadership"
            lead="Recognition, leadership roles, and contributions to the community."
          >
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 mt-8">
              <div className="text-center p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{achievements.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Award</div>
              </div>
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{certifications.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certification</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{positions.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Leadership Roles</div>
              </div>
            </div>
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              Achievements
            </h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">{achievement.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{achievement.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-2xl mr-3">📜</span>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{cert.title}</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">{cert.organization}, {cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Positions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏅</span>
              Leadership
            </h3>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div key={index} className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{position.title}</h4>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{position.organization}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
