import { useState, MouseEvent } from 'react';
import { useMainContext } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/UserClientService';
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

  // const navigate = useNavigate();
  const [formValuesUser, setFormValuesUser] =
    useState<FormValuesUser>(initialStateUser);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValuesUser({ ...formValuesUser, [name]: value });
  }

  const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const signupAndSet = async (formValuesUser: FormValuesUser) => {
      const { userName, email, password } = formValuesUser;
      const signupData = {
        userName: userName,
        email: email,
        password: password,
      };
      const newUser = await signUp(signupData); // this is from the service which does not exist yet
      setFormValuesUser(initialStateUser);
      newUser && setUser(newUser);
      console.log(user);
      // navigate('/dash');
    };
    signupAndSet(formValuesUser);
  };

  return (
    <form className="signUpForm">
      <h2>Sign up</h2>
      <input name="userName" onChange={changeHandler} />
      <input name="email" onChange={changeHandler} />
      <input name="password" onChange={changeHandler} />
      <button
        className="signup-button"
        type="button"
        onClick={(e) => handleSignup(e)}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
