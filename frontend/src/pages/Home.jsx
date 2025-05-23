import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 text-center relative overflow-x-hidden box-border">
      <div className="w-full flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-2xl w-full p-10 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Bienvenue sur GeneSixx Valley</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">Votre plateforme de création de CV professionnel</p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center home-actions">
            <button className="inline-block font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 px-7 py-3 rounded-md shadow hover:-translate-y-1 hover:shadow-lg transition btn btn-primary">
              Commencer maintenant
            </button>
            <button className="inline-block font-semibold text-blue-600 border-2 border-blue-100 bg-white px-7 py-3 rounded-md hover:border-blue-500 hover:-translate-y-0.5 transition btn btn-secondary">
              Découvrir
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">Pourquoi choisir GeneSixx Valley ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Création de CV</h3>
              <p className="text-gray-500 text-center">Créez un CV professionnel en quelques minutes avec nos modèles modernes.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Designs Modernes</h3>
              <p className="text-gray-500 text-center">Choisissez parmi une large sélection de templates élégants et professionnels.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Export Rapide</h3>
              <p className="text-gray-500 text-center">Exportez votre CV en PDF en un clic, prêt à être partagé.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 GeneSixx Valley. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;