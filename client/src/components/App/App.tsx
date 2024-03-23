import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import ContextProvider from '../Context/Context';
import PlayerContextProvider, { usePlayerContext } from '../Context/PlayerContext'; // Renamed import
import Player from '../Player/Player';

const App = () => {
  const userId = localStorage.getItem('loggedinUser');
  return (
    <ContextProvider>
      <PlayerContextProvider> 
        <div className='App'>
          <AppNav />
          <Player />
          <Outlet />
        </div>
      </PlayerContextProvider> 
    </ContextProvider>
  );
};

export default App;
