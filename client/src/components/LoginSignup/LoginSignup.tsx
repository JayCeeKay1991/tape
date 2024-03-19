import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
// import { useState } from "react";


type propsType = {
    formValue: string;
  toggleShowLogin: () => void;
};

export function LoginSignup({ formValue, toggleShowLogin }: propsType) {

    return (
        <div className="w-full h-full bg-tapeBlack/70 fixed z-50 top-0 left-0 flex flex-row justify-center items-center">
        <div
          id="loginSignup"
          className="w-[500px] h-[700px] bg-tapeWhite rounded-[20px]"
        >
            <button onClick={toggleShowLogin}>xxx</button>
            <p className="text-[50px]">Signup</p>
        {formValue === 'login' ? <LoginForm /> : <SignupForm/>}
        </div>
      </div>
    );
}

export default LoginSignup;