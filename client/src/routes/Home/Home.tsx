//import Nav from '../../components/Nav/Nav';
import { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowSignup = () => {
    setShowSignup(!showSignup)
  }

  return (
    <>
      <div id="hero-wrap">
        <img id="hero-background" ></img>
        <div  id="hero-body" >
          <h1>Make mixtape streams with your friends</h1>
          <p>Tape FM lets you upload mixes and share them in groups of your friends </p>
          <button onClick={toggleShowSignup} >Join now</button>
        </div>
      {showSignup ? <SignupForm/> : <></>}
      </div>
      <div id="feature-wrap">
        <section id="feature1" >
          <img id="feature-background1" ></img>
          <div  id="feature-body1" >
            <p>Tape Channels</p>
            <h1>Create channels and share music</h1>
            <img></img>
            <img></img>
            <img></img>
          </div>
        </section>
        <section id="feature2" >
          <img id="feature-background2" ></img>
          <div  id="feature-body2" >
            <p>How it works</p>
            <h1>Add your mixtape to the stream for endless playback</h1>
            <img></img>
            <img></img>
            <img></img>
          </div>
        </section>
        <section id="feature3" >
          <img id="feature-background3" ></img>
          <div  id="feature-body3" >
            <p>Sharing music making mixtapes Playing tunes</p>
            <p>making mixtapes Playing tunes Sharing music</p>
            <p>Playing tunes Sharing music making mixtapes</p>
            <p>music making mixtapes Playing tunes Sharing</p>
          </div>
        </section>
        <section id="feature4" >
          <img id="feature-background4" ></img>
          <img id="logo" ></img>
        </section>
      </div>
    </>
  )
}

export default Home;