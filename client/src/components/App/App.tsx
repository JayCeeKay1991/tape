import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import TestPlayer from '../TestPlayer/TestPlayer';
import ContextProvider, { useMainContext } from '@/components/Context/Context';


const App = () => {
  const { currentStreamUrls } = useMainContext()
  return (
<ContextProvider>

    <div className='App'>
      <AppNav />
      <TestPlayer/>
      <Outlet />
    </div>
</ContextProvider>
  )

}

export default App;