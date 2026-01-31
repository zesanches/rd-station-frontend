import React from 'react';
import EmptyState from '../shared/EmptyState';

const CATEGORY_COLORS = {
  'Vendas': 'bg-amber-100 text-amber-800',
  'Marketing': 'bg-purple-100 text-purple-800',
  'Omnichannel': 'bg-teal-100 text-teal-800',
  'Uso de Inteligência Artificial': 'bg-indigo-100 text-indigo-800',
};

function CategoryBadge({ category }) {
  const colorClasses = CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colorClasses}`}>
      {category}
    </span>
  );
}

function RecommendationCard({ product }) {
  return (
    <li className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
        <CategoryBadge category={product.category} />
      </div>
      <ul className="space-y-1">
        {product.features.map((feature, i) => (
          <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
            <span className="text-gray-400 mt-0.5 shrink-0">-</span>
            {feature}
          </li>
        ))}
      </ul>
    </li>
  );
}

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Recomendações
      </h2>

      {recommendations.length === 0 ? (
        <EmptyState
          title="Nenhuma recomendação encontrada"
          description="Selecione suas preferências e clique em buscar."
        />
      ) : (
        <>
          <p className="text-xs text-gray-500 mb-3">
            {recommendations.length === 1
              ? '1 produto encontrado'
              : `${recommendations.length} produtos encontrados`}
          </p>
          <ul className="space-y-3">
            {recommendations.map((product) => (
              <RecommendationCard key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RecommendationList;
