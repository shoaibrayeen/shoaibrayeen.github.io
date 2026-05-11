
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
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Achievements & Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Recognition, leadership roles, and contributions to the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              Achievements
            </h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="border-l-4 border-teal-500 pl-4 mb-4">
                <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">📜</span>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{cert.title}</h4>
                  <p className="text-sm text-amber-600 font-medium">{cert.organization}, {cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Positions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏅</span>
              Leadership
            </h3>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div key={index} className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{position.title}</h4>
                  <p className="text-sm text-cyan-600 font-medium">{position.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
