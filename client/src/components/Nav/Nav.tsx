import './Nav.css'

export function Nav() {

    return (
      <nav className="w-full h-20 bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-5 pl-5">
        <a className=" text-tapeWhite">Tape</a>
        <ul className="flex flex-row text-tapeWhite">
          <li className="pr-5 ">Channels</li>
          <li className="pr-5 ">Interactivty</li>
          <li className="pr-5 ">Login</li>
        </ul>
      </nav>
    );
}

export default Nav;