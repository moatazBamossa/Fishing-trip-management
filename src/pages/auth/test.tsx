import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for the Fishing Trip Management system.</p>
      <button onClick={() => navigate('/login')}>Click</button>
    </div>
  );
};

export default TestPage;
