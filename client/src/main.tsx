import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import ContextProvider from './components/Context/Context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
