import './Nav.css';
import icon from '@/assets/svg/logo-icon.svg';

//type react props
type propsType = {
  toggleShowLogin: () => void;
  setFormValue: React.Dispatch<React.SetStateAction<string>>;
};

export function Nav({ toggleShowLogin, setFormValue }: propsType) {
  return (
    <nav className='w-full h-[80px] bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-[50px] pl-[50px] z-40'>
      <a className=' text-tapeWhite text-[28px] font-semibold'>
        <img id='icon' className='w-[50px]' src={icon}></img>
      </a>
      <ul className='flex flex-row items-center'>
        <li className='w-[90px] h-[40px] text-[24px] font-medium text-tapeWhite ml-[100px]'>
          Channels
        </li>
        <li className='w-[90px] h-[40px] text-[24px] font-medium  text-tapeWhite ml-[100px]'>
          Interactivty
        </li>
        <li
          onClick={() => {
            toggleShowLogin();
            setFormValue('login');
          }}
          className='w-[130px] h-[60px] text-center ml-[100px] text-[24px] font-medium  text-tapeWhite hover:bg-tapeWhite hover:text-tapeBlack rounded-[10px] cursor-pointer flex flex-col justify-center'
          data-testid='login-toggle'>
          Login
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
