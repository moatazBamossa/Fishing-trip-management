import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NextUIProvider } from '@nextui-org/react';
import Names from './lib/Names/Names';
import Operations from './lib/Operations/Operations';

function App() {
  return (
    <NextUIProvider
      style={{
        direction: 'rtl'
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Names />} />
          <Route path="/operations/:id" element={<Operations />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
