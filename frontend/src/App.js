import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Recomendador de Produtos RD Station
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Selecione suas preferências e funcionalidades desejadas para receber
            recomendações personalizadas de produtos que melhor atendam às
            necessidades do seu negócio.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-6 md:p-8">
              <Form onRecommendationsChange={setRecommendations} />
            </div>
            <div className="p-6 md:p-8 bg-gray-50">
              <RecommendationList recommendations={recommendations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
