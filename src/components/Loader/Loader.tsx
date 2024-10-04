import React from 'react';
import './style.module.css'; // Import your styles here

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Loader;
