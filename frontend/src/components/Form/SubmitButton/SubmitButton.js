import React from 'react';

function SubmitButton({ text, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-200
        ${disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow'
        }`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
