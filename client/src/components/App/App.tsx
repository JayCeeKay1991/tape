import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import { useMainContext } from '../Context/Context';
import PlayerContextProvider from '../Context/PlayerContext'; // Renamed import
import Player from '../Player/Player';

const App = () => {
  const { user } = useMainContext();
  return (
    <PlayerContextProvider>
      <div className="App">
        <AppNav />
        {user._id ? <Player /> : <></>}
        <Outlet />
      </div>
    </PlayerContextProvider>
  );
};

export default App;
