// Importation du nouveau template
import ExecutiveTemplate from '../components/templates/executive/ExecutiveTemplate';

// Dans la fonction de rendu du template
const renderTemplate = () => {
  switch(templateId) {
    case 'cv-template':
      return <ClassicTemplate userData={formData} />;
    case 'student-template':
      return <StudentTemplate userData={formData} />;
    case 'jobsticker-template':
      return <JobStickerTemplate userData={formData} />;
    case 'campusfrance-template':
      return <CampusFranceTemplate userData={formData} />;
    case 'tech-template':
      return <TechTemplate userData={formData} />;
    case 'minimalist-template':
      return <MinimalistTemplate userData={formData} />;
    case 'student-template':
      return <StudentTemplate userData={formData} />;
    case 'executive-template':
      return <ExecutiveTemplate userData={formData} />;
    default:
      return <ClassicTemplate userData={formData} />;
  }
}; 