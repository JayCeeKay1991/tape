import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import ContextProvider from '@/components/Context/Context';

const App = () => {
  return (
<ContextProvider>

    <div className='App'>
      <AppNav />
      <Outlet />
    </div>
</ContextProvider>
  )

}

export default App;