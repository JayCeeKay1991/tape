import { useState } from 'react';
import Nav from '@/components/Nav/Nav';
import hero from '@/assets/svg/hero-bg.svg';
import logo from '@/assets/svg/logo.svg';
import keyImage from '@/assets/svg/key-image.svg';
import bigVis from '@/assets/svg/big-vis.svg';
import img1 from '@/assets/img/pexels-anastasia-shuraeva-5704849.jpg';
import img2 from '@/assets/img/pexels-juan-gomez-2589650.jpg';
import './Home.css';
import LoginSignup from '@/components/LoginSignup/LoginSignup';

const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [formValue, setFormValue] = useState('login');

  // Toggles the visibilty of the login/signup form
  function toggleShowLogin() {
      setLoginVisible(!loginVisible);
  }

  return (
    <>
      <Nav
        toggleShowLogin={toggleShowLogin}
        setFormValue={setFormValue}
      />

      {loginVisible && (
        <LoginSignup formValue={formValue} toggleShowLogin={toggleShowLogin} />
      )}

      <div
        id="wrapper"
        className="w-full h-full flex flex-col top-0 bg-tapeOffBlack"
      >
        <section
          id="feature0"
          className="w-full h-screen flex flex-col justify-center top-0 "
        >
          <div id="cta" className="w-[700px] z-10 ml-[50px]">
            <h1 className="text-[120px] leading-[100px] mb-[40px] text-tapeWhite font-semibold ">
              Make mixtape streams with your friends
            </h1>
            <p className="w-[470px] mb-[30px] font-regular text-[26px] leading-[30px]  text-tapeWhite">
              Tape FM lets you upload mixes and share <br></br>them in groups of
              your friends
            </p>
            <button
              onClick={() => {
                setFormValue("signUp");
                toggleShowLogin();
              }}
              className="w-[170px] h-[70px] text-2xl font-medium rounded-[10px] bg-tapeWhite text-tapeBlack border-none hover:bg-tapeYellow"
            >
              Join now
            </button>
          </div>
          <div
            id="img-crop"
            className="w-full h-screen absolute overflow-hidden"
          >
            <img
              src={hero}
              id="hero-bg"
              className=" w-full absolute -top-[50px]"
            ></img>
          </div>
        </section>

        <section
          id="feature1"
          name="channels"
          className="w-full h-screen bg-tapeOffBlack flex flex-row justify-center relative"
          >
          <div
            id="feature-body1"
            className="w-full h-full flex flex-col align-middle p-[40px] text-center "
            >
            <div className="mt-[100px] h-1/2  flex flex-col justify-between">

              <h3 className="text-[25px] font-medium mt-[10px] text-tapeWhite"
                >
                Tape channels
              </h3>
              <h1 className="text-[130px] font-semibold leading-[120px] text-tapeWhite">
                Create channels <br></br>and share music
              </h1>
            </div>
            <div id="img-crop1" className="">
              <img src={img1} id="img1" className="absolute "></img>
            </div>
            <div id="img-crop2" className="">
              <img src={img2} id="img2" className="absolute "></img>
            </div>
          </div>
        </section>

        <section
          id="feature2"
          name="interact"
          className="h-screen w-full bg-tapeWhite flex flex-col text-center justify-between"
        >
          <h3 className="text-[30px] text-tapeBlack font-medium mt-[20px]">
            How it works
          </h3>
          <img src={keyImage} id="key-image"></img>
          <h2 className="text-[50px] mb-[40px] font-medium text-tapeBlack">
            Add your mixtape to the stream for endless playback
          </h2>
        </section>

        <section
          id="feature3"
          className="h-screen w-full bg-gradient-to-t from-tapePink to-tapeYellow  flex flex-col justify-center relative"
        >
          {/* <div id='blur1'></div>
          <div id='blur2'></div> */}

          <div id="text-wrapper">
            <div className="w-full h-[160px] text-[200px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[110px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[200px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[110px]">
                <span>Sharing music </span>
                <span className="text-tapeWhite">Making mixtapes </span>
                <span>Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[200px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[110px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[200px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[110px]">
                <span>Sharing music </span>
                <span className="text-tapeWhite">Making mixtapes </span>
                <span>Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[200px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[110px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
          </div>
        </section>

        <section
          id="feature4"
          className="w-full h-screen bg-tapeOffBlack flex flex-col justify-between"
        >
          <img id="big-vis" className="w-full" src={bigVis}></img>

          <div
            id="footer"
            className="flex flex-row justify-between pr-[50px] pl-[50px] mb-[40px]"
          >
            <img id="logo" className="w-[150px]" src={logo}></img>
            <p className="text-tapeWhite w-[700px] flex flex-row justify-between text-[20px]">
              <span> © 2024 Tape</span>
              <span> Privacy Policy</span>
              <span> Terms & Conditions</span>
              <span>Legal</span>
            </p>
            <p className="text-tapeWhite  text-[20px]">Contact us</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
