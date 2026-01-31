import { useState, useCallback } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, handleChange, resetForm };
};

export default useForm;
