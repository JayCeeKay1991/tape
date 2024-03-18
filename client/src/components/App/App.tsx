import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <div id="temporary-navbar" >
      <Link to={`/home`} >
        <button>Link to Home</button>
      </Link>
      <Link to={`/dash`} >
        <button>Link to Dashboard</button>
      </Link>
      <Link to={`/user`} >
        <button>Link to Profile</button>
      </Link>
      <Link to={`/channels/65f8471ba7be5037549bfc44`} >
        <button>Link to one Example Channel</button>
      </Link>
    </div>
    <Outlet/>
    </>
  )

}

export default App;