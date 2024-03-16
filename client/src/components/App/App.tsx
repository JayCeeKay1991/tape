// import Home from '../../routes/Home';
// import Dash from '../../routes/Dash';

import { useState } from 'react';
import { useMainContext } from '../Context/Context';
import { User } from '@app/types/User';
import SignupForm from '../SignupForm/SignupForm';
// import { useNavigate } from 'react-router-dom';

import './App.css';

export type FormValuesUser = {
  userName: string;
  email: string;
  password: string;
};

const initialStateUser = {
  userName: '',
  email: '',
  password: '',
};

function App() {
  const { user, setUser } = useMainContext();

  // doesnt work at the moment, it says it needs to be on the router: react-router-dom.js?t=1710588235289&v=6cab7815:207 Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
  // const navigate = useNavigate();

  const [formValuesUser, setFormValuesUser] =
    useState<FormValuesUser>(initialStateUser);

  // handler functions
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValuesUser({ ...formValuesUser, [name]: value });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValuesUser;
    const loginData = { email, password };

    // make service call login function

    const loggedInUser = await login(loginData);
    setFormValuesUser(initialStateUser);

    // set user to the logged in user
    setUser(loggedInUser);
    // SET navigation to Dashboard
    // navigate('/dash');
  };

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
        <form id="login-form" onSubmit={handleLogin}>
          <input
            name="email"
            type="text"
            value={formValuesUser.email}
            onChange={changeHandler}
            placeholder="email"
            required={true}
          ></input>
          <input
            name="password"
            type="password"
            value={formValuesUser.password}
            onChange={changeHandler}
            placeholder="password"
            required={true}
          ></input>
          <button className="login-button" type="submit">
            login
          </button>
        </form>
      )}
      :<h1>Goes to Homepage</h1>
    </>
  );
}

export default App;
