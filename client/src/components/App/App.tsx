import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import Player from '../TestPlayer/TestPlayer';
import ContextProvider from '@/components/Context/Context';


const App = () => {
  const userId = localStorage.getItem('loggedinUser');
  return (
<ContextProvider>
    <div className='App'>
      <AppNav />
      {userId ? (
        <Player/>
      ) : <></>}
      <Outlet />
    </div>
</ContextProvider>
  )

}

export default App;