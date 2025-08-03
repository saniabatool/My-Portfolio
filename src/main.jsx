import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// The entry point of the application.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Renders the main App component from app.jsx */}
    <App />
  </React.StrictMode>
);
