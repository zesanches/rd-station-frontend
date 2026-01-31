import React, { useState, useEffect } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  useEffect(() => {
    setCurrentFeatures(selectedFeatures);
  }, [selectedFeatures]);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((feat) => feat !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Funcionalidades
      </legend>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index}>
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-green-600"
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default Features;
