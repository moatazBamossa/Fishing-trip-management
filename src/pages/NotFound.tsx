import React from 'react';


const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <div className="not-found-animation">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default NotFound;