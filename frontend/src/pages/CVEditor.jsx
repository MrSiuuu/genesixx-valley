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
    // Ajout du nouveau template
    case 'executive-template':
      return <ExecutiveTemplate userData={formData} />;
    default:
      return <ClassicTemplate userData={formData} />;
  }
}; 