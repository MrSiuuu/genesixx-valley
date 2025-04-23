import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Register fonts (optional - for better typography)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#555',
    marginBottom: 15,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderBottom: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    color: '#555',
    marginTop: 2,
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    width: '60%',
    paddingRight: 10,
  },
  rightColumn: {
    width: '40%',
  },
  skillsSection: {
    marginBottom: 10,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  skillName: {
    fontSize: 10,
    width: '70%',
  },
  skillLevel: {
    height: 5,
    width: '30%',
    backgroundColor: '#e0e0e0',
  },
  skillFill: {
    height: 5,
    backgroundColor: '#2D9CDB',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  certificateItem: {
    marginBottom: 5,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 3,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    fontSize: 8,
    backgroundColor: '#f0f0f0',
    padding: 3,
    marginRight: 5,
    marginBottom: 3,
    borderRadius: 3,
  },
});

// Classic Template PDF Component
const ClassicTemplatePDF = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{userData.name || "Your Name"}</Text>
        {userData.title && <Text style={styles.title}>{userData.title}</Text>}
        <View style={styles.contactInfo}>
          {userData.email && <Text style={styles.contactItem}>{userData.email}</Text>}
          {userData.phone && <Text style={styles.contactItem}>{userData.phone}</Text>}
          {userData.address && <Text style={styles.contactItem}>{userData.address}</Text>}
        </View>
      </View>

      {userData.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.profileText}>{userData.summary}</Text>
        </View>
      )}

      {userData.experiences && userData.experiences.length > 0 && userData.experiences[0].title && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {userData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.dates}>{exp.startDate} - {exp.endDate}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {userData.education && userData.education.length > 0 && userData.education[0].degree && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {userData.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dates}>{edu.year} {edu.location && `- ${edu.location}`}</Text>
              {edu.description && <Text style={styles.description}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      <View style={styles.twoColumnContainer}>
        <View style={styles.leftColumn}>
          {userData.skills && userData.skills.length > 0 && userData.skills[0].name && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {userData.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillLevel}>
                    <View style={[styles.skillFill, { width: `${skill.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {userData.certificates && userData.certificates.length > 0 && userData.certificates[0].name && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {userData.certificates.map((cert, index) => (
                <View key={index} style={styles.certificateItem}>
                  <Text style={styles.jobTitle}>{cert.name}</Text>
                  <Text style={styles.company}>{cert.issuer}</Text>
                  {cert.date && <Text style={styles.dates}>{cert.date}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.rightColumn}>
          {userData.languages && userData.languages.length > 0 && userData.languages[0].name && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {userData.languages.map((lang, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.skillName}>{lang.name}</Text>
                  <Text style={{ fontSize: 9 }}>{lang.level || lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {userData.projects && userData.projects.length > 0 && userData.projects[0].name && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {userData.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  {project.technologies && project.technologies.length > 0 && (
                    <View style={styles.technologies}>
                      {project.technologies.map((tech, i) => (
                        <Text key={i} style={styles.techTag}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {userData.customSections && userData.customSections.length > 0 && (
        <View style={styles.section}>
          {userData.customSections.map((section, sectionIndex) => (
            section.title && section.items && section.items.length > 0 && section.items[0].name && (
              <View key={sectionIndex} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{item.name}</Text>
                    {item.date && <Text style={styles.dates}>{item.date}</Text>}
                    {item.description && <Text style={styles.description}>{item.description}</Text>}
                  </View>
                ))}
              </View>
            )
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text>CV generated with Genesixx Valley CV Generator - {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

// Export function that returns a PDF document based on template type
export const generatePDF = async (userData, templateId) => {
  // Select the template to use based on templateId
  let PdfTemplate;
  
  switch(templateId) {
    case 'classic':
    case 'classic-template':
    default:
      PdfTemplate = <ClassicTemplatePDF userData={userData} />;
      break;
    
    // Add cases for other templates as needed
    // case 'tech':
    //   PdfTemplate = <TechTemplatePDF userData={userData} />;
    //   break;
  }
  
  // Generate the PDF blob
  const blob = await pdf(PdfTemplate).toBlob();
  
  // Generate a filename
  const fileName = `${userData.name ? userData.name.replace(/\s+/g, '_') : 'resume'}_${new Date().toISOString().slice(0, 10)}.pdf`;
  
  // Return the blob and filename
  return { blob, fileName };
};

// Function to generate and download PDF
export const generateAndDownloadPDF = async (userData, templateId) => {
  try {
    const { blob, fileName } = await generatePDF(userData, templateId);
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export default {
  generatePDF,
  generateAndDownloadPDF
};
