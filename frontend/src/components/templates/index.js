import ClassicTemplate from './classic/ClassicTemplate';
import JobStickerTemplate from './jobsticker/JobStickerTemplate';
import CampusFranceTemplate from './campusfrance/CampusFranceTemplate';
import ExecutiveTemplate from './executive/ExecutiveTemplate';
import MinimalTemplate from './minimal/MinimalTemplate';
import TechTemplate from './tech/TechTemplate';
import StudentTemplate from './student/StudentTemplate';

// Exporter tous les templates
export {
  ClassicTemplate,
  JobStickerTemplate,
  CampusFranceTemplate,
  ExecutiveTemplate,
  MinimalTemplate as MinimalistTemplate, // Alias pour résoudre l'incohérence de nommage
  TechTemplate,
  StudentTemplate
}; 