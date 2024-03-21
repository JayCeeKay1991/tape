import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import TestPlayer from '../TestPlayer/TestPlayer';
import ContextProvider, { useMainContext } from '@/components/Context/Context';


const App = () => {
  const userId = localStorage.getItem('loggedinUser');
  return (
<ContextProvider>
    <div className='App'>
      <AppNav />
      {userId ? (
              <TestPlayer/>

      ) : <></>}
      <Outlet />
    </div>
</ContextProvider>
  )

}

export default App;