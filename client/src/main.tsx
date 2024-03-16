import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ContextProvider from './components/Context/Context';
import Home from './routes/Home/Home';
import Dash from './routes/Dash/Dash';
import Profile from './routes/Profile/Profile';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/dash',
        element: <Dash />,
      },
      {
        path: '/user',
        element: <Profile />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
