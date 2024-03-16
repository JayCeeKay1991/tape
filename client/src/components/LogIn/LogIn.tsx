// import Home from '../../routes/Home';
// import Dash from '../../routes/Dash';

import { useState, MouseEvent } from 'react';
import { useMainContext } from '../Context/Context';
import { User } from '../../types/User';

// import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/UserClientService';
import './LogIn.css';

export type FormValuesUserLogin = {
  email: string;
  password: string;
};

const initialStateUserLogin = {
  email: '',
  password: '',
};

function App() {
  const { user, setUser } = useMainContext();

  // doesnt work at the moment, it says it needs to be on the router: react-router-dom.js?t=1710588235289&v=6cab7815:207 Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
  // const navigate = useNavigate();

  const [formValuesUserLogin, setFormValuesUserLogin] =
    useState<FormValuesUserLogin>(initialStateUserLogin);

  // handler functions
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValuesUserLogin({ ...formValuesUserLogin, [name]: value });
  }

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = formValuesUserLogin;
    const loginData = { email, password };

    // make service call login function

    const loggedInUser = await logIn(loginData);

    // set user to the logged in user

    setUser(loggedInUser);

    console.log('User state after login:----', user);

    setFormValuesUserLogin(initialStateUserLogin);

    // SET navigation to Dashboard
    // navigate('/dash');
  };
  console.log(user);

  // logout button redirects back to start
  const handleLogout = async () => {
    setUser({} as User);

    //SET navigation to Homepage("/")
  };

  // if logged in: showing dashboard, else: homepage
  return (
    <>
      {user?._id ? (
        <h1>goes to Dashboard</h1>
      ) : (
        //here we need to navigate to homepage if not logged in, dont know at the moment if the loging or the homepage, want to pop up the login !! check with others
        <form id="login-form">
          <input
            name="email"
            type="text"
            value={formValuesUserLogin.email}
            onChange={changeHandler}
            placeholder="email"
            required={true}
          ></input>
          <input
            name="password"
            type="password"
            value={formValuesUserLogin.password}
            onChange={changeHandler}
            placeholder="password"
            required={true}
          ></input>
          <button className="login-button" type="button" onClick={handleLogin}>
            login
          </button>
        </form>
      )}
      :<h1>Goes to Homepage</h1>
    </>
  );
}

export default App;
