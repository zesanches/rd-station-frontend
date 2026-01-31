import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { ClearButton } from './ClearButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

const INITIAL_FORM_STATE = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: '',
};

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange, resetForm } = useForm(INITIAL_FORM_STATE);
  const { getRecommendations } = useRecommendations(products);

  const hasSelection =
    formData.selectedPreferences.length > 0 ||
    formData.selectedFeatures.length > 0;

  const isSubmitDisabled =
    !hasSelection || !formData.selectedRecommendationType;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getRecommendations(formData);

    onRecommendationsChange(result);
  };

  const handleClear = () => {
    resetForm();
    onRecommendationsChange([]);
  };

  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />

      <SubmitButton text="Buscar recomendação" disabled={isSubmitDisabled} />
      {hasSelection && (
        <ClearButton text="Limpar" onClick={handleClear} />
      )}
    </form>
  );
}

export default Form;
