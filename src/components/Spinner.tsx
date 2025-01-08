// Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div
      className="h-20 w-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      role="status"
    />
  );
};

export default Spinner;
