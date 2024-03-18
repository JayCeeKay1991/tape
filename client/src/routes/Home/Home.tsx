//import Nav from '../../components/Nav/Nav';
import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Nav from '../../components/Nav/Nav';
import logo from "../../assets/hero-bg.svg";
import keyImage from "../../assets/key-image.svg";

import "./Home.css";

const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);

  function toggleShowLogin() {
    if (!loginVisible) {
      setLoginVisible(true)
      console.log(loginVisible)
    } else {
      setLoginVisible(false)
      console.log(loginVisible);
    }
  }

  return (
    <>
      <Nav toggleShowLogin={toggleShowLogin} />

      {loginVisible && <LoginForm />}

      <div
        id="wrapper"
        className="w-full mt-[40px] h-full bg-tapeGreen flex flex-col"
      >
        <section
          id="feature0"
          className="w-full h-screen bg-tapeOffBlack flex flex-col justify-center"
        >
          <div id="cta" className="w-[700px] z-10 ml-[50px]">
            <h1 className="text-[130px] leading-[110px] mb-[40px] text-tapeWhite font-semibold ">
              Make mixtape streams with your friends
            </h1>
            <p className="w-[470px] mb-[50px] font-regular text-[30px] leading-[30px]  text-tapeWhite">
              Tape FM lets you upload mixes and share them in groups of your
              friends
            </p>
            <button className="pl-[40px] pr-[50px] pt-[20px] pb-[20px] text-2xl font-medium rounded-[15px]">
              Join now
            </button>
          </div>
          <div
            id="img-crop"
            className="w-full h-screen absolute overflow-hidden"
          >
            <img src={logo} id="hero-bg" className="absolute -top-[50px]"></img>
          </div>
        </section>

        <section
          id="feature1"
          className="w-full h-screen bg-tapeOffBlack flex flex-row justify-center "
        >
          <div
            id="feature-body1"
            className="w-full flex flex-col align-middle p-[40px] text-center"
          >
            <div className="mt-[100px] h-1/2  flex flex-col justify-between">
              <p className="text-tapeWhite">Tape Channels</p>
              <h1 className="text-[160px] font-semibold leading-[130px] text-tapeWhite">
                Create channels <br></br>and share music
              </h1>
            </div>
            <img></img>
            <img></img>
            <img></img>
          </div>
        </section>

        <section
          id="feature2"
          className="h-screen w-full bg-tapeWhite flex flex-col text-center justify-between"
        >
          <p>How it works</p>
          <img src={keyImage} id="key-image"></img>
          <h2 className="text-[80px]">
            Add your mixtape to the stream for endless playback
          </h2>
        </section>

        <section
          id="feature3"
          className="h-screen w-full bg-gradient-to-t from-tapePink to-tapeYellow"
        >
          <img id="feature-background3"></img>
          <div id="feature-body3">
            <div className="overflow-x-hidden">
              <div className="py-12 animate-marquee whitespace-nowrap ">
                <span className="text-9xl mx-4 font-medium">
                  Sharing music Making mixtapes Playing tunes
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="feature4" className="w-full h-screen bg-tapeOffBlack">
          <img id="feature-background4"></img>
          <img id="logo"></img>
        </section>
      </div>
    </>
  );
}

export default Home;