// import Home from '../../routes/Home';
// import Dash from '../../routes/Dash';

import { useState } from 'react';
import { useMainContext, initialStateUser } from '../Context/Context';

// import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/UserClientService';
import './LogInForm.css';

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

  // const navigate = useNavigate();

  const [formValuesUserLogin, setFormValuesUserLogin] =
    useState<FormValuesUserLogin>(initialStateUserLogin);

  // handler functions
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValuesUserLogin({ ...formValuesUserLogin, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValuesUserLogin;
    const loginData = { email, password };

    // make service call login function
    const loggedInUser = await logIn(loginData);

    // set user to the logged in user
    loggedInUser && setUser(loggedInUser);

    // empty the form
    setFormValuesUserLogin(initialStateUserLogin);

    // set the localstorage to the logged in user id
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', loggedInUser._id);
    }

    // SET navigation to Dashboard
    // navigate('/dash');
  };

  // logout button redirects to homepage
  // there is no logout button yet not sure where to put the button, maybe move the function to other component
  // logout button
  /* <button className="logout-button" type="button" onClick={handleLogout}> logout
   </button> */
  const handleLogout = async () => {
    setUser(initialStateUser);
    setFormValuesUserLogin(initialStateUserLogin);
    localStorage.clear();

    //SET navigation to Homepage("/")
    // navigate('/home');
  };

  // if logged in: showing dashboard, else: homepage- the navigation is missing and below is the conditional is placeholder at the moment
  return (
    <>
      {user?._id ? (
        <h1>goes to Dashboard</h1>
      ) : (
        <>
          <form id="login-form" onSubmit={handleLogin}>
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
            <button className="login-button" type="submit">
              login
            </button>
          </form>
        </>
      )}
      :<h1>Goes to Homepage</h1>
    </>
  );
}

export default App;
