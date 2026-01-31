import React, { useState, useEffect } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences);

  useEffect(() => {
    setCurrentPreferences(selectedPreferences);
  }, [selectedPreferences]);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Preferências
      </legend>
      <ul className="space-y-2">
        {preferences.map((preference, index) => (
          <li key={index}>
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-600"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default Preferences;
