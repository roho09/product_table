import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import './styles/index.css'; // Ensure this file exists and contains Tailwind imports
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot() instead of render()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
