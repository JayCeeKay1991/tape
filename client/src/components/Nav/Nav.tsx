import icon from '@/assets/svg/logo-icon.svg';
import { scroller } from 'react-scroll';


//type react props
type propsType = {
  toggleShowLogin: () => void;
  setFormValue: React.Dispatch<React.SetStateAction<string>>;
};

const Nav = ({ toggleShowLogin, setFormValue }: propsType) => {



  const scrollToChannels = () => {
    scroller.scrollTo('channels', {
      smooth: true
    });
  };
  const scrollToInteractivity = () => {
    scroller.scrollTo('interact', {
      smooth: true,
      offset: -90
    });
  };


  return (
    <nav className="w-11/12 h-[60px] border-white border-2 bg-tapeWhite/30 fixed top-10 ml-[50px] flex flex-row  items-center justify-between pl-[50px] z-40 rounded-full">
      <a>
        <img id="icon" className="w-[50px]" src={icon}></img>
      </a>
      <ul className="flex flex-row items-center">
        <li className="w-[90px] h-[40px] text-[24px] font-medium text-tapeWhite ml-[100px]">
          <button className='border-none' onClick={scrollToChannels} >Channels</button>
        </li>
        <li className="w-[90px] h-[40px] text-[24px] font-medium  text-tapeWhite ml-[100px]">
          <button className='border-none' onClick={scrollToInteractivity}>
            Interactivty
          </button>
        </li>
        <li
          onClick={() => {
            toggleShowLogin();
            setFormValue("login");
          }}
          className="w-[130px] h-[56px] text-center ml-[100px] mr-[2px] text-[24px] font-medium  text-tapeWhite bg-tapeBlack hover:bg-tapeWhite hover:text-tapeBlack rounded-full cursor-pointer flex flex-col justify-center"
          data-testid="login-toggle"
        >
          <button className='border-none rounded-full'>Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
