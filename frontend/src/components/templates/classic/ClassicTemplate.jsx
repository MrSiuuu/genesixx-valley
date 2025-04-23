import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import { styled } from '@stitches/react';
import '../shared/Experience';
import '../shared/Education';
import '../shared/Certificates';
import CustomSection from '../shared/CustomSection'; // Import the CustomSection component

// Styled components with Radix UI
const CVContainer = styled('div', {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: 'white',
  color: '#1F2937',
  lineHeight: 1.6,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',

  '@media (max-width: 768px)': {
    padding: '20px',
  },

  variants: {
    preview: {
      true: {
        fontSize: '0.9em',
        transform: 'scale(0.9)',
        transformOrigin: 'top center',
      }
    }
  }
});

const Header = styled('div', {
  marginBottom: '28px',
});

const Name = styled('h1', {
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: '4px',
  letterSpacing: '-0.01em',
  color: '#111827',
});

const Title = styled('h2', {
  fontSize: '18px',
  fontWeight: 500,
  marginTop: 0,
  marginBottom: '12px',
  color: '#4B5563',
});

const ContactInfo = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  fontSize: '14px',
  color: '#6B7280',
});

const ContactItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const SectionTitle = styled('h3', {
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '12px',
  paddingBottom: '6px',
  color: '#111827',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
});

const StyledSeparator = styled(Separator.Root, {
  backgroundColor: '#E5E7EB',
  height: '1px',
  width: '100%',
  marginBottom: '16px',
});

const Summary = styled('p', {
  fontSize: '15px',
  lineHeight: 1.6,
  color: '#4B5563',
  marginBottom: '24px',
});

const Section = styled('div', {
  marginBottom: '28px',
});

const TwoColumnGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

const Column = styled('div', {});

const ExperienceItem = styled('div', {
  marginBottom: '18px',
});

const ExperienceHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

const ExperienceTitle = styled('h4', {
  fontSize: '16px',
  fontWeight: 600,
  margin: 0,
  color: '#111827',
});

const ExperienceCompany = styled('div', {
  fontSize: '15px',
  fontWeight: 500,
  color: '#4B5563',
});

const ExperiencePeriod = styled('div', {
  fontSize: '14px',
  color: '#6B7280',
});

const ExperienceDescription = styled('p', {
  fontSize: '14px',
  marginTop: '8px',
  color: '#4B5563',
  whiteSpace: 'pre-line',
});

const EducationItem = styled('div', {
  marginBottom: '18px',
});

const EducationHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

const EducationDegree = styled('h4', {
  fontSize: '16px',
  fontWeight: 600,
  margin: 0,
  color: '#111827',
});

const EducationSchool = styled('div', {
  fontSize: '15px',
  fontWeight: 500,
  color: '#4B5563',
});

const EducationDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: '#6B7280',
});

const EducationDescription = styled('p', {
  fontSize: '14px',
  marginTop: '8px',
  color: '#4B5563',
});

const SkillsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
});

const SkillItem = styled('div', {
  marginBottom: '8px',
});

const SkillName = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  fontWeight: 500,
  color: '#111827',
  marginBottom: '4px',
});

const SkillLevel = styled('div', {
  height: '6px',
  backgroundColor: '#E5E7EB',
  borderRadius: '3px',
  overflow: 'hidden',
});

const SkillLevelFill = styled('div', {
  height: '100%',
  backgroundColor: '#9CA3AF',
  borderRadius: '3px',
});

const LanguagesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '10px',
});

const LanguageItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  padding: '6px 0',
});

const LanguageName = styled('span', {
  fontWeight: 500,
  color: '#111827',
});

const LanguageLevel = styled('span', {
  color: '#6B7280',
});

const CertificatesGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '16px',
});

const CertificateItem = styled('div', {
  padding: '12px',
  backgroundColor: '#F9FAFB',
  borderRadius: '6px',
});

const CertificateName = styled('div', {
  fontSize: '14px',
  fontWeight: 600,
  color: '#111827',
  marginBottom: '4px',
});

const CertificateIssuer = styled('div', {
  fontSize: '13px',
  color: '#6B7280',
  marginBottom: '4px',
});

const CertificateDate = styled('div', {
  fontSize: '12px',
  color: '#9CA3AF',
});

const ProjectsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
});

const ProjectItem = styled('div', {
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderRadius: '6px',
});

const ProjectName = styled('h4', {
  fontSize: '16px',
  fontWeight: 600,
  margin: '0 0 8px 0',
  color: '#111827',
});

const ProjectDescription = styled('p', {
  fontSize: '14px',
  margin: '0 0 12px 0',
  color: '#4B5563',
});

const TechnologiesList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
});

const TechnologyTag = styled('span', {
  fontSize: '12px',
  padding: '3px 8px',
  backgroundColor: '#E5E7EB',
  borderRadius: '4px',
  color: '#4B5563',
});

const Footer = styled('div', {
  marginTop: '32px',
  textAlign: 'center',
  fontSize: '12px',
  color: '#9CA3AF',
});

const ClassicTemplate = ({ userData, previewMode = false }) => {
  const {
    name = '',
    email = '',
    phone = '',
    address = '',
    title = '',
    summary = '',
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    certificates = [],
    projects = [],
    customSections = [] // Add this to destructure custom sections
  } = userData || {};

  return (
    <CVContainer preview={previewMode}>
      <Header>
        <Name>{name || 'Your Name'}</Name>
        {title && <Title>{title}</Title>}
        <ContactInfo>
          {email && <ContactItem>{email}</ContactItem>}
          {phone && <ContactItem>{phone}</ContactItem>}
          {address && <ContactItem>{address}</ContactItem>}
        </ContactInfo>
      </Header>

      {summary && (
        <Section>
          <SectionTitle>Professional Profile</SectionTitle>
          <StyledSeparator decorative />
          <Summary>{summary}</Summary>
        </Section>
      )}

      {experiences && experiences.length > 0 && experiences[0].title && (
        <Section>
          <SectionTitle>Work Experience</SectionTitle>
          <StyledSeparator decorative />
          {experiences.map((exp, index) => (
            <ExperienceItem key={index}>
              <ExperienceHeader>
                <ExperienceTitle>{exp.title}</ExperienceTitle>
                <ExperiencePeriod>
                  {exp.startDate}{exp.startDate && exp.endDate && ' - '}{exp.endDate}
                </ExperiencePeriod>
              </ExperienceHeader>
              <ExperienceCompany>{exp.company}</ExperienceCompany>
              <ExperienceDescription>{exp.description}</ExperienceDescription>
            </ExperienceItem>
          ))}
        </Section>
      )}

      {education && education.length > 0 && education[0].degree && (
        <Section>
          <SectionTitle>Education</SectionTitle>
          <StyledSeparator decorative />
          {education.map((edu, index) => (
            <EducationItem key={index}>
              <EducationHeader>
                <EducationDegree>{edu.degree}</EducationDegree>
                <EducationDetails>{edu.year}</EducationDetails>
              </EducationHeader>
              <EducationSchool>{edu.school}{edu.location && `, ${edu.location}`}</EducationSchool>
              {edu.description && <EducationDescription>{edu.description}</EducationDescription>}
            </EducationItem>
          ))}
        </Section>
      )}

      <TwoColumnGrid>
        <Column>
          {skills && skills.length > 0 && skills[0].name && (
            <Section>
              <SectionTitle>Skills</SectionTitle>
              <StyledSeparator decorative />
              <SkillsContainer>
                {skills.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <span>{skill.name}</span>
                      {skill.level && <span>{skill.level}%</span>}
                    </SkillName>
                    {skill.level && (
                      <SkillLevel>
                        <SkillLevelFill style={{ width: `${skill.level}%` }} />
                      </SkillLevel>
                    )}
                  </SkillItem>
                ))}
              </SkillsContainer>
            </Section>
          )}
        </Column>

        <Column>
          {languages && languages.length > 0 && languages[0].name && (
            <Section>
              <SectionTitle>Languages</SectionTitle>
              <StyledSeparator decorative />
              <LanguagesContainer>
                {languages.map((lang, index) => (
                  <LanguageItem key={index}>
                    <LanguageName>{lang.name}</LanguageName>
                    {lang.level && <LanguageLevel>{lang.level}</LanguageLevel>}
                  </LanguageItem>
                ))}
              </LanguagesContainer>
            </Section>
          )}
        </Column>
      </TwoColumnGrid>

      {certificates && certificates.length > 0 && certificates[0].name && (
        <Section>
          <SectionTitle>Certifications</SectionTitle>
          <StyledSeparator decorative />
          <CertificatesGrid>
            {certificates.map((cert, index) => (
              <CertificateItem key={index}>
                <CertificateName>{cert.name}</CertificateName>
                <CertificateIssuer>{cert.issuer}</CertificateIssuer>
                {cert.date && <CertificateDate>{cert.date}</CertificateDate>}
              </CertificateItem>
            ))}
          </CertificatesGrid>
        </Section>
      )}

      {projects && projects.length > 0 && projects[0].name && (
        <Section>
          <SectionTitle>Projects</SectionTitle>
          <StyledSeparator decorative />
          <ProjectsContainer>
            {projects.map((project, index) => (
              <ProjectItem key={index}>
                <ProjectName>{project.name}</ProjectName>
                <ProjectDescription>{project.description}</ProjectDescription>
                {project.technologies && project.technologies.length > 0 && (
                  <TechnologiesList>
                    {project.technologies.map((tech, i) => (
                      <TechnologyTag key={i}>{tech}</TechnologyTag>
                    ))}
                  </TechnologiesList>
                )}
              </ProjectItem>
            ))}
          </ProjectsContainer>
        </Section>
      )}

      {customSections && customSections.length > 0 && customSections.map((section, index) => (
        <Section key={`custom-section-${index}`}>
          <CustomSection section={section} />
        </Section>
      ))}

      <Footer>
        <p>CV generated with CV Generator - {new Date().toLocaleDateString()}</p>
      </Footer>
    </CVContainer>
  );
};

export default ClassicTemplate;