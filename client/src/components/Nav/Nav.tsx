import { useState } from 'react';
import './Nav.css'

export function Nav() {

    const [isOpen, setIsOpen] = useState;

    return (
      <nav className="w-full h-20 bg-tapeBlack fixed top-0 left-0 flex flex-row items-center">
            <p className=" text-tapeGreen">Logo</p>
            <button>hello</button>
      </nav>
    );
}

export default Nav;