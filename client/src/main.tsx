import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import ContextProvider from './components/Context/Context';
import './index.css';
import Nav from './components/Nav/Nav';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <Nav/>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
