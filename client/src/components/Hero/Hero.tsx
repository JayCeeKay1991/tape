import { useState } from "react";
import SignupForm from "../SignupForm/SignupForm";

const Hero = () => {
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowSignup = () => {
    setShowSignup(!showSignup)
  }

  return (
    <div id="hero-wrap">
      <img id="hero-background" ></img>
      <div  id="hero-body" >
        <h1>Make mixtape streams with your friends</h1>
        <p>Tape FM lets you upload mixes and share them in groups of your friends </p>
        <button onClick={toggleShowSignup} >Join now</button>
      </div>
      {showSignup ? <SignupForm/> : <></>}
    </div>
  )
}

export default Hero;