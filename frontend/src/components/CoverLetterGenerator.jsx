import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/cover-letter.css';

const CoverLetterGenerator = ({ userData, onComplete, onSkip }) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSave = () => {
    onComplete(coverLetter);
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
              onClick={handleSave}
            >
              {t('coverLetter.save')}
            </button>
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