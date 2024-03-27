import { useState } from "react";
import { useMainContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/UserClientService";
import "./LoginForm.css";

export type FormValuesUserLogin = {
  email: string;
  password: string;
};

const initialStateUserLogin = {
  email: "",
  password: "",
};

function LoginForm() {
  const { setUser } = useMainContext();
  const navigate = useNavigate();

  const [failedToLogin, setFailedToLogin] = useState(false);
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
    console.log({ loggedinUser });

    // empty the form
    setFormValuesUserLogin(initialStateUserLogin);

    // set user to the logged in user
    if (loggedinUser) {
      setUser(loggedinUser);


      // SET navigation to Dashboard
      navigate('/dash');
    } else {
      setFailedToLogin(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        id="login-form"
        onSubmit={handleLogin}
        className="flex flex-col w-[400px] pb-[50px]"
      >
        <input
          name="email"
          type="text"
          value={formValuesUserLogin.email}
          onChange={changeHandler}
          placeholder="Email"
          required={true}
          className="h-[90px] p-[30px]  border-tapeDarkGrey bg-tapeBlack border-[2px] text-[22px] text-tapeWhite font-medium outline-none"
          data-testid="input-email"
        ></input>
        <div className="w-full h-[50px] flex flex-row justify-center items-center">
          {failedToLogin ? (
            <p className=" text-[20px] text-tapeDarkGrey">
              Incorrect email or password
            </p>
          ) : null}
        </div>
        <input
          name="password"
          type="password"
          value={formValuesUserLogin.password}
          onChange={changeHandler}
          placeholder="Password"
          required={true}
          className="h-[90px] mb-[50px] p-[30px] border-tapeDarkGrey bg-tapeBlack border-[2px] text-[22px] text-tapeWhite font-medium outline-none"
        ></input>
        <button
          className="login-button h-[90px] bg-tapeYellow border-none rounded-[10px] text-[28px] font-semibold"
          type="submit"
          data-testid="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
