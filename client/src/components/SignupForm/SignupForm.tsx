import { useState, MouseEvent } from 'react';
import { useMainContext } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/UserClientService';

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

  console.log(user);
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
      // navigate('/dash');
    };
    signupAndSet(formValuesUser);
  };

  return (
    // <form onSubmit={(e) => handleSignup(e)}>
    <>
      <h2>Sign up</h2>
      <input name="userName" onChange={changeHandler}></input>
      <input name="email" onChange={changeHandler}></input>
      <input name="password" onChange={changeHandler}></input>
      <button className="signup-button" type="button" onClick={handleSignup}>
        Sign Up
      </button>
      {/* // </form> */}
    </>
  );
};

export default SignupForm;
