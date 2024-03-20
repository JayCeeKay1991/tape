import { useState } from 'react';
import { useMainContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/UserClientService';
import './SignupForm.css';

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

const SignupForm = () => {
  const { user, setUser } = useMainContext();

  const navigate = useNavigate();
  const [formValuesUser, setFormValuesUser] =
    useState<FormValuesUser>(initialStateUser);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValuesUser({ ...formValuesUser, [name]: value });
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userName, email, password } = formValuesUser;
    const signupData = {
      userName,
      email,
      password,
    };

    // make service call signup function
    const newUser = await signup(signupData);

    // set user to the signed up user
    newUser && setUser(newUser);

    setFormValuesUser(initialStateUser);

    // set the localstorage to the new user id
    if (newUser) {
      localStorage.setItem('loggedinUser', newUser._id);
    }

    // SET navigation to Dashboard
    navigate('/dash');
  };

  // do we need conditional below?
  return (
    <form className="signup-Form" onSubmit={handleSignup}>
      <h2>Sign up</h2>
      <input
        name="userName"
        value={formValuesUser.userName}
        type="text"
        placeholder="username"
        onChange={changeHandler}
        required={true}
        data-testid="input-name"
      />
      <input
        name="email"
        value={formValuesUser.email}
        type="text"
        placeholder="email"
        onChange={changeHandler}
        required={true}
      />
      <input
        name="password"
        value={formValuesUser.password}
        type="password"
        placeholder="password"
        onChange={changeHandler}
        required={true}
      />
      <button className="signup-button" type="submit" data-testid="signup-button">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
