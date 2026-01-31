import React from 'react';

const TYPES = [
  { value: 'SingleProduct', label: 'Produto Único' },
  { value: 'MultipleProducts', label: 'Múltiplos Produtos' },
];

function RecommendationType({ selectedType = '', onRecommendationTypeChange }) {
  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Tipo de Recomendação
      </legend>
      <div className="flex items-center gap-4">
        {TYPES.map(({ value, label }) => (
          <label key={value} className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="recommendationType"
              value={value}
              checked={selectedType === value}
              onChange={() => onRecommendationTypeChange(value)}
              className="form-radio h-4 w-4 text-blue-600 transition-colors"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RecommendationType;
