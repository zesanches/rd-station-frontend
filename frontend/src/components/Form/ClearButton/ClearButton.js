import React from 'react';

function ClearButton({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full font-semibold py-2.5 px-4 rounded-lg border border-gray-300
                 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100
                 transition-all duration-200 shadow-sm hover:shadow mt-2"
    >
      {text}
    </button>
  );
}

export default ClearButton;
