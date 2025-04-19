const path = require('path');
const { generateCV, generateTemplatePreviews } = require('./controllers/cv.controller');

// Exemple de données utilisateur
const userData = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    experiences: [
        {
            title: 'Développeur Web',
            company: 'TechCorp',
            startDate: 'Janvier 2020',
            endDate: 'Décembre 2022',
            description: 'Développement de sites web et applications front-end.'
        },
        {
            title: 'Ingénieur Logiciel',
            company: 'SoftSolutions',
            startDate: 'Mars 2018',
            endDate: 'Décembre 2019',
            description: 'Conception et développement de logiciels sur mesure.'
        }
    ]
};

// Fonction pour tester la génération du CV et des aperçus
(async () => {
    try {
        console.log('Début du test de génération du CV...');
        console.log('Données utilisateur :', userData);

        // Générer le CV en PDF
        const pdfPath = await generateCV(userData);
        console.log(`CV généré avec succès : ${pdfPath}`);

        // Générer les aperçus des templates
        console.log('Début de la génération des aperçus...');
        await generateTemplatePreviews();
        console.log('Aperçus générés avec succès.');
    } catch (error) {
        console.error('Erreur lors du test :', error);
    }
})();