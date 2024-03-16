import { useState } from 'react';
import { useAppContext } from '../Context/Context'; // does not export anything yet
import { useNavigate } from "react-router-dom";

export type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const initialState = {
  userName: '',
  email: '',
  password: '',
};

const SignupForm = () => {

  const {user, setUser} = useAppContext();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>(initialState);


  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupAndSet = async (formValues:FormValues) => {
      const { userName, email, password } = formValues;
      const signupData = { userName, email, password };
      const newUser = await signup(signupData); // this is from the service which does not wexist yet
      setFormValues(initialState);
      setUser(newUser);
      navigate('/dash');
    }
    signupAndSet(formValues);
  }

  return (
    <form onSubmit={handleSignup} >
      <h2>Sign up</h2>
      <input name="username" onChange={changeHandler} ></input>
      <input name="email" onChange={changeHandler}></input>
      <input name="password" onChange={changeHandler}></input>
      <button type="submit" ></button>
  </form>
    )

}

export default SignupForm;