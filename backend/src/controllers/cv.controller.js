const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Fonction pour générer un CV en PDF
const generateCV = async (userData) => {
    try {
        // Charger le template HTML
        const templatePath = path.join(__dirname, '../templates/classic/cv-template.html');
        let template = fs.readFileSync(templatePath, 'utf8');

        // Injecter les données utilisateur dans le template
        template = template.replace('{{name}}', userData.name);
        template = template.replace('{{email}}', userData.email);
        template = template.replace('{{phone}}', userData.phone);
        template = template.replace('{{experiences}}', userData.experiences.map(exp => `
            <li>
                <strong>${exp.title}</strong> - ${exp.company} (${exp.startDate} - ${exp.endDate})
                <p>${exp.description}</p>
            </li>
        `).join(''));

        // Créer un fichier temporaire HTML
        const tempHtmlPath = path.join(__dirname, '../templates/temp-cv.html');
        fs.writeFileSync(tempHtmlPath, template);

        // Lancer Puppeteer pour convertir le HTML en PDF
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'load' });
        const pdfPath = path.join(__dirname, `../../src/output/${userData.name}-CV.pdf`);
        await page.pdf({ path: pdfPath, format: 'A4' });

        // Fermer le navigateur et supprimer le fichier temporaire
        await browser.close();
        fs.unlinkSync(tempHtmlPath);

        return pdfPath;
    } catch (error) {
        console.error('Erreur lors de la génération du CV :', error);
        throw error;
    }
};

// Fonction pour générer des aperçus (preview.png) pour chaque template
const generateTemplatePreviews = async () => {
    try {
        // Dossier contenant les templates HTML
        const templatesDir = path.join(__dirname, '../templates/classic');
        const previewDir = path.join(__dirname, '../../src/output/previews');

        // Vérifier si le dossier des aperçus existe, sinon le créer
        if (!fs.existsSync(previewDir)) {
            fs.mkdirSync(previewDir, { recursive: true });
        }

        // Lister les templates disponibles
        const templates = fs.readdirSync(templatesDir).filter(file => file.endsWith('.html'));

        if (templates.length === 0) {
            console.log('Aucun template HTML trouvé dans le dossier des templates.');
            return;
        }

        // Lancer Puppeteer
        const browser = await puppeteer.launch();

        for (const templateFile of templates) {
            const templatePath = path.join(templatesDir, templateFile);
            const templateName = path.basename(templateFile, '.html');
            const previewPath = path.join(previewDir, `${templateName}-preview.png`);

            console.log(`Génération de l'aperçu pour le template : ${templateName}`);

            // Charger le template HTML
            const page = await browser.newPage();
            await page.goto(`file://${templatePath}`, { waitUntil: 'load' });

            // Générer une capture d'écran
            await page.screenshot({ path: previewPath, fullPage: true });
            console.log(`Aperçu généré pour ${templateName}: ${previewPath}`);
        }

        // Fermer le navigateur
        await browser.close();
    } catch (error) {
        console.error('Erreur lors de la génération des aperçus :', error);
        throw error;
    }
};

// Exporter les fonctions pour les utiliser dans les routes ou ailleurs
module.exports = {
    generateCV,
    generateTemplatePreviews,
};