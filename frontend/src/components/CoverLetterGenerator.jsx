import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/cover-letter.css';
import { toast } from 'react-toastify';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

const CoverLetterGenerator = ({ userData, onComplete, onSkip }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [coverLetterId, setCoverLetterId] = useState(null);

  const tones = [
    { id: 'professional', name: t('coverLetter.tones.professional') },
    { id: 'student', name: t('coverLetter.tones.student') },
    { id: 'expert', name: t('coverLetter.tones.expert') },
    { id: 'creative', name: t('coverLetter.tones.creative') },
    { id: 'formal', name: t('coverLetter.tones.formal') },
    { id: 'dynamic', name: t('coverLetter.tones.dynamic') }
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cover-letter/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          tone: selectedTone
        })
      });
      
      if (!response.ok) {
        throw new Error(t('coverLetter.generationError'));
      }
      
      const data = await response.json();
      setCoverLetter(data.coverLetter);
      setIsGenerating(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLetter = async () => {
    try {
      if (!user) {
        toast.error('Vous devez être connecté pour sauvegarder une lettre');
        return;
      }
      
      if (!coverLetter) {
        toast.error('Aucun contenu à sauvegarder');
        return;
      }
      
      // Utiliser directement Supabase
      const { data, error } = await supabase
        .from('cover_letters')
        .insert({
          user_id: user.id,
          content: coverLetter,
          job_title: jobTitle || '',
          company: company || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        console.error('Erreur Supabase:', error);
        
        // Vérifier si l'erreur est liée à une colonne manquante
        if (error.message && error.message.includes('column')) {
          toast.error(`Erreur de base de données: ${error.message}`);
        } else {
          toast.error('Erreur lors de la sauvegarde');
        }
        return;
      }
      
      toast.success('Lettre de motivation sauvegardée avec succès');
      
      // Stocker l'ID de la lettre pour permettre le téléchargement
      if (data && data[0] && data[0].id) {
        setCoverLetterId(data[0].id);
      }
      
      onComplete(coverLetter);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur de connexion');
    }
  };

  return (
    <div className="cover-letter-container">
      {!isGenerating && !coverLetter && (
        <div className="cover-letter-prompt">
          <h2>{t('coverLetter.title')}</h2>
          <p>{t('coverLetter.description')}</p>
          
          <div className="cover-letter-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => setIsGenerating(true)}
            >
              {t('coverLetter.generate')}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={onSkip}
            >
              {t('coverLetter.skip')}
            </button>
          </div>
        </div>
      )}
      
      {isGenerating && (
        <div className="cover-letter-generator">
          <h2>{t('coverLetter.selectTone')}</h2>
          
          <div className="tone-selector">
            {tones.map(tone => (
              <div 
                key={tone.id}
                className={`tone-option ${selectedTone === tone.id ? 'selected' : ''}`}
                onClick={() => setSelectedTone(tone.id)}
              >
                <div className="tone-name">{tone.name}</div>
                <div className="tone-description">
                  {t(`coverLetter.toneDescriptions.${tone.id}`)}
                </div>
              </div>
            ))}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="generator-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('coverLetter.generateButton')}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsGenerating(false)}
            >
              {t('common.back')}
            </button>
          </div>
        </div>
      )}
      
      {coverLetter && (
        <div className="cover-letter-result">
          <h2>{t('coverLetter.result')}</h2>
          
          <div className="cover-letter-metadata">
            <div className="form-group">
              <label htmlFor="jobTitle">Titre du poste</label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ex: Développeur Web"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Entreprise</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Acme Inc."
                className="form-control"
              />
            </div>
          </div>
          
          <div className="cover-letter-editor">
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={15}
              className="cover-letter-textarea"
            />
          </div>
          
          <div className="result-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleSaveLetter}
            >
              {t('coverLetter.save')}
            </button>
            
            {coverLetterId && (
              <a 
                href={`${import.meta.env.VITE_API_URL}/api/cover-letter/download/${coverLetterId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-download"
              >
                {t('coverLetter.download')}
              </a>
            )}
            
            {userData && userData.id && (
              <a 
                href={`${import.meta.env.VITE_API_URL}/api/cv/download/${userData.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-download"
              >
                {t('common.downloadCV')}
              </a>
            )}
            
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setCoverLetter('');
                setIsGenerating(true);
              }}
            >
              {t('coverLetter.regenerate')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator; 