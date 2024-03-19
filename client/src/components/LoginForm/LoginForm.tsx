import { useState } from 'react';
import { useMainContext, initialStateUser } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/UserClientService';
import './LoginForm.css';

export type FormValuesUserLogin = {
  email: string;
  password: string;
};

const initialStateUserLogin = {
  email: '',
  password: '',
};

function LoginForm() {
  const { setUser } = useMainContext();
  const navigate = useNavigate();

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
    const loggedinUser = await login(loginData);

    // set user to the logged in user
    loggedinUser && setUser(loggedinUser);

    // empty the form
    setFormValuesUserLogin(initialStateUserLogin);

    // set the localstorage to the logged in user id
    if (loggedinUser) {
      localStorage.setItem('loggedinUser', loggedinUser._id);
    }

    // SET navigation to Dashboard
    navigate('/dash');
  };

  // logout function redirects to homepage, will be moved to nav bar

  const handleLogout = async () => {
    setUser(initialStateUser);
    setFormValuesUserLogin(initialStateUserLogin);
    localStorage.clear();
    //SET navigation to Homepage("/")
    navigate('/home');
  };

  return (
    <>
      <form id="login-form" onSubmit={handleLogin} className='w-[400px] fixed z-50 bg-tapePink left-[200px] top-[200px]'>
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
  );
}

export default LoginForm;
