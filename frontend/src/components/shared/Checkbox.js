import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        {...props}
      />
      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 select-none">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;
