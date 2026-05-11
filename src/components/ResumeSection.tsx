
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResumeSection = () => {
  const handleDownloadResume = () => {
    console.log('Resume download button clicked');
    
    // Google Drive direct download URL
    const driveUrl = 'https://drive.google.com/uc?export=download&id=1uIxXCEDzKNIDLiA7lw_ONSRKNxUkA3d8';
    
    // Create download link
    const link = document.createElement('a');
    link.href = driveUrl;
    link.download = 'Mohd_Shoaib_Rayeen_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Resume download initiated');
  };

  return (
    <section id="resume" className="py-16 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Download My CV
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Access my latest resume / curriculum vitae for more details on my experience and expertise.
        </p>
        <Button
          onClick={handleDownloadResume}
          variant="default"
          size="lg"
          className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg px-8 py-4 font-semibold rounded-full text-lg"
        >
          <Download size={24} className="inline-block" />
          Download CV
        </Button>
      </div>
    </section>
  );
};

export default ResumeSection;
