const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

/**
 * Génère un PDF à partir d'un template et de données
 * @param {string} templateId - L'identifiant du template
 * @param {Object} data - Les données à injecter dans le template
 * @returns {Promise<Buffer>} - Le buffer du PDF généré
 */
const generatePDF = async (templateId, data) => {
  try {
    // Chemin vers le template HTML
    let templatePath = path.join(__dirname, `../templates/${templateId}.html`);
    
    // Ajouter des logs pour déboguer
    console.log('Chemin du template:', templatePath);
    console.log('Le template existe:', fs.existsSync(templatePath));
    
    // Vérifier si le template existe
    if (!fs.existsSync(templatePath)) {
      console.warn(`Template ${templateId} introuvable, utilisation du template par défaut`);
      // Utiliser un template par défaut
      let defaultTemplateId = 'executive-template';
      templatePath = path.join(__dirname, `../templates/${defaultTemplateId}.html`);
      
      // Vérifier si le template par défaut existe
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${defaultTemplateId} introuvable`);
      }
    }
    
    // Lire le template
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    
    // Compiler le template avec Handlebars
    const template = handlebars.compile(templateHtml);
    
    // Ajouter la date actuelle aux données
    const templateData = {
      ...data,
      currentDate: new Date().toLocaleDateString('fr-FR')
    };
    
    // Générer le HTML final
    const html = template(templateData);
    
    // Lancer le navigateur avec plus de temps d'attente
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--js-flags=--max-old-space-size=512'
      ],
      timeout: 60000 // Augmenter le timeout à 60 secondes
    });
    
    const page = await browser.newPage();
    
    // Augmenter le timeout de navigation
    await page.setDefaultNavigationTimeout(60000);
    
    // Définir le contenu HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Attendre que le contenu soit complètement chargé
    await page.waitForFunction('document.readyState === "complete"', { timeout: 30000 });
    
    // Attendre un peu plus avant de générer le PDF
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Générer le PDF avec un timeout plus long
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      timeout: 60000
    });
    
    // Fermer le navigateur de manière plus sûre
    await browser.close();
    
    return pdfBuffer;
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw error;
  }
};

/**
 * Génère un PDF pour une lettre de motivation
 * @param {string} content - Le contenu de la lettre
 * @returns {Promise<Buffer>} - Le buffer du PDF généré
 */
const generateCoverLetterPDF = async (content) => {
  try {
    // Template HTML simple pour la lettre
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Lettre de motivation</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }
          .letter-content {
            white-space: pre-line;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="letter-content">${content}</div>
        <div class="footer">
          Lettre générée avec CV Generator - ${new Date().toLocaleDateString('fr-FR')}
        </div>
      </body>
      </html>
    `;
    
    // Lancer Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Définir le contenu HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Générer le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    // Fermer le navigateur
    await browser.close();
    
    return pdfBuffer;
  } catch (error) {
    console.error('Erreur lors de la génération du PDF de la lettre:', error);
    throw error;
  }
};

module.exports = {
  generatePDF,
  generateCoverLetterPDF
}; 