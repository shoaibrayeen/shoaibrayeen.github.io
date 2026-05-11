const Education = () => {
  const education = [
    {
      institution: "University of Delhi - Dept. of Computer Science",
      degree: "MCA (Master of Computer Applications)",
      grade: "83.93%",
      duration: "Jul 2017 - Jun 2020"
    },
    {
      institution: "Hansraj College, University of Delhi",
      degree: "B.Sc. (Hons.) Computer Science",
      grade: "88.41%",
      duration: "Jul 2014 - Jun 2017"
    }
    // COMMENTED - 12th and 10th Grade entries
    // {
    //   institution: "Sachidanand Inter College, U.P. Board",
    //   degree: "12th Grade",
    //   grade: "94.00%"
    // },
    // {
    //   institution: "Sachidanand Inter College, U.P. Board",
    //   degree: "10th Grade",
    //   grade: "87.83%"
    // }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Academic foundation that shaped my technical expertise and problem-solving approach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                  <h4 className="text-lg text-teal-600 font-semibold mb-1">{edu.institution}</h4>
                  {edu.duration && (
                    <p className="text-sm text-gray-500 font-medium">{edu.duration}</p>
                  )}
                </div>
                {/* COMMENTED - Grade percentages */}
                {/* <div className="mt-4 md:mt-0">
                  <span className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full font-semibold">
                    🏆 {edu.grade}
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
