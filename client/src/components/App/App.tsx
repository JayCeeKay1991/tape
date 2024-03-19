import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';

const App = () => {
  return (
    <div className='App'>
      <AppNav />
      <Outlet />
    </div>
  )

}

export default App;