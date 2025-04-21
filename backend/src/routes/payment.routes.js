const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Route pour intégrer le SDK Seamless de CinetPay
router.get('/seamless', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).send('ID du template est requis.');
    }

    // Charger les données des templates depuis le fichier JSON
    const templatesPath = path.join(__dirname, '../prices/prices.json');
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));

    // Vérification du prix du template
    const template = templates.find((t) => t.id === id);
    if (!template) {
        return res.status(404).send('Template non trouvé.');
    }

    // Liste des pays disponibles avec leurs site_id, devise et clé API correspondants
    const countries = [
        { code: 'TG', name: 'Togo', site_id: process.env.CINETPAY_SITE_ID_TG, currency: 'XOF', api_key: process.env.CINETPAY_API_KEY_TG },
        { code: 'GN', name: 'Guinée', site_id: process.env.CINETPAY_SITE_ID_GN, currency: 'GNF', api_key: process.env.CINETPAY_API_KEY_GN },
        { code: 'CM', name: 'Cameroun', site_id: process.env.CINETPAY_SITE_ID_CM, currency: 'XAF', api_key: process.env.CINETPAY_API_KEY_CM },
    ];

    // Génération de la page HTML avec le SDK Seamless
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://cdn.cinetpay.com/seamless/main.js"></script>
            <style>
                .sdk {
                    display: block;
                    position: absolute;
                    background-position: center;
                    text-align: center;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                select {
                    margin-bottom: 20px;
                    padding: 10px;
                    font-size: 16px;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
            <script>
                function checkout() {
                    const countrySelect = document.getElementById('country');
                    const selectedCountry = countrySelect.value;

                    if (!selectedCountry) {
                        alert('Veuillez sélectionner un pays.');
                        return;
                    }

                    // Récupérer le site_id, la devise et la clé API correspondant au pays sélectionné
                    const countrySiteIdMap = ${JSON.stringify(
        countries.reduce((map, country) => {
            map[country.code] = { site_id: country.site_id, currency: country.currency, api_key: country.api_key };
            return map;
        }, {})
    )};
                    const countryData = countrySiteIdMap[selectedCountry];

                    if (!countryData || !countryData.site_id || !countryData.currency || !countryData.api_key) {
                        alert('Site ID, devise ou clé API introuvable pour le pays sélectionné.');
                        return;
                    }

                    CinetPay.setConfig({
                        apikey: countryData.api_key, // Clé API spécifique au pays
                        site_id: countryData.site_id, // Site ID correspondant au pays
                        notify_url: '${process.env.BACKEND_URL}/api/payment/notify', // URL de notification
                        mode: 'PRODUCTION' // ou 'TEST' pour l'environnement de test
                    });
                    CinetPay.getCheckout({
                        transaction_id: Math.floor(Math.random() * 100000000).toString(),
                        amount: ${template.price}, // Montant du paiement
                        currency: countryData.currency, // Devise correspondant au pays
                        description: 'Achat du template ${id}',
                        customer_country: selectedCountry, // Pays sélectionné
                    });
                    CinetPay.waitResponse(function(data) {
                        if (data.status === "REFUSED") {
                            alert("Votre paiement a échoué");
                        } else if (data.status === "ACCEPTED") {
                            alert("Votre paiement a été effectué avec succès");
                            window.location.href = '${process.env.FRONTEND_URL}/cv/create?template=${id}';
                        }
                    });
                    CinetPay.onError(function(error) {
                        console.error('Erreur CinetPay:', error);
                    });
                }
            </script>
        </head>
        <body>
            <div class="sdk">
                <h1>GENESIXX VALLEY CAISSE</h1>
                <select id="country">
                    <option value="">-- Sélectionnez votre pays --</option>
                    ${countries.map(country => `<option value="${country.code}">${country.name}</option>`).join('')}
                </select>
                <button onclick="checkout()">Payer maintenant</button>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;