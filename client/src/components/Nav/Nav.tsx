import './Nav.css'

//type react props
type propsType = {
  toggleShowLogin: () => void;
};

export function Nav({ toggleShowLogin }: propsType) {
  return (
    <nav className="w-full h-[90px] bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-[40px] pl-[40px] z-20">
      <a className=" text-tapeWhite text-[28px] font-semibold">Logo</a>
      <ul className="flex flex-row text-tapeWhite">
        <li className="pr-[40px] text-[28px] font-semibold">Channels</li>
        <li className="pr-[40px] text-[28px] font-semibold">Interactivty</li>
        <li className="pr-[40px] text-[28px] font-semibold">
          <a onClick={toggleShowLogin}>Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;