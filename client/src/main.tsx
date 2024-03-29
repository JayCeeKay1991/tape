import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App/App';
import Home from './routes/Home/Home';
import Dash from './routes/Dash/Dash';
import UserDetails from './routes/UserDetails/UserDetails';

import './index.css';
import ContextProvider from './components/Context/Context';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/',
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),
    children: [
      {
        path: '/dash',
        element: <Dash />,
      },
      {
        path: '/user',
        element: <UserDetails />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
