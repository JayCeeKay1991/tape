import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ContextProvider from './components/Context/Context';
import App from './components/App/App';
import Home from './routes/Home/Home';
import Dash from './routes/Dash/Dash';
import Profile from './routes/Profile/Profile';
import TestPlayer from './components/TestPlayer/TestPlayer';
import './index.css';
import Nav from './components/Nav/Nav';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/dash',
        element: <Dash />,
      },
      {
        path: '/user',
        element: <Profile />,
      },
      {
        path: '/channel',
        element: <TestPlayer />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
