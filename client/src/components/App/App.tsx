import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';

const App = () => {
  return (
    <>
    <AppNav />
      {/* <div id="temporary-navbar" >
      <Link to={`/home`} >
        <button>Link to Home</button>
      </Link>
      <Link to={`/dash`} >
        <button>Link to Dashboard</button>
      </Link>
      <Link to={`/user`} >
        <button>Link to Profile</button>
      </Link>
      <Link to={`/channel`} >
        <button>Link to Channel</button>
      </Link>
    </div> */}
    <Outlet/>
    </>
  )

}

export default App;