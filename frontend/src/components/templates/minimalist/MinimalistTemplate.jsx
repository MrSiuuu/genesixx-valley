// ...existing imports...
import CustomSection from '../shared/CustomSection';

const MinimalistTemplate = ({ userData, previewMode = false }) => {
  const {
    // ...existing destructuring...
    customSections = []
  } = userData || {};

  return (
    <div className={/* ...existing class... */}>
      {/* ...existing template sections... */}
      
      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map((section, index) => (
        <div key={`custom-section-${index}`} className="section">
          <CustomSection section={section} />
        </div>
      ))}
      
      {/* ...existing footer... */}
    </div>
  );
};

export default MinimalistTemplate;
