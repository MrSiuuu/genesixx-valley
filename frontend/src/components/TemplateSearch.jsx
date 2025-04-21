import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/template-search.css';

const TemplateSearch = ({ onSearch, onFilter }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onSearch(searchTerm, value);
  };

  return (
    <div className="template-search">
      <div className="search-container">
        <input
          type="text"
          placeholder={t('search.placeholder', 'Rechercher un modèle...')}
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select 
          value={category} 
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="all">{t('search.allCategories', 'Rechercher par Catégory')}</option>
          <option value="professional">{t('search.professional', 'Modèle Professional')}</option>
          <option value="academic">{t('search.academic', 'Modèle Academic')}</option>
          <option value="creative">{t('search.creative', 'Modèle Creative')}</option>
          {/* Vous pouvez ajouter d'autres catégories ici */}
        </select>
      </div>
    </div>
  );
};

export default TemplateSearch; 