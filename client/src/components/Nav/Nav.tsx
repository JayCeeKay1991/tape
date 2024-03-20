import './Nav.css'
import icon from "../../assets/svg/logo-icon.svg";

//type react props
type propsType = {
  toggleShowLogin: () => void;
};

export function Nav({ toggleShowLogin }: propsType) {
  return (
    <nav className="w-full h-[90px] bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-[40px] pl-[40px] z-40">
      <a className=" text-tapeWhite text-[28px] font-semibold">
        <img id="icon" className="w-[70px]" src={icon}></img>
      </a>
      <ul className="flex flex-row">
        <li className="p-[50px] text-[28px] font-medium text-tapeWhite">
          Channels
        </li>
        <li className="p-[50px] text-[28px] font-medium  text-tapeWhite">
          Interactivty
        </li>
        <li
          onClick={toggleShowLogin}
          className="p-[50px] text-[28px] font-medium  text-tapeWhite hover:bg-tapeWhite hover:text-tapeBlack rounded-full cursor-pointer"
          data-testid="login-toggle"
        >Login
        </li>
      </ul>
    </nav>
  );
}

export default Nav;