import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/perfumes-x-pomade-frontend"> {/* ✅ bọc App */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
