import { Link } from 'react-router-dom';
import { useMainContext, initialStateUser } from "../../components/Context/Context";
import { useNavigate } from 'react-router-dom';
import johnMartin from './johnmartin.jpg'
import { MdHome } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const AppNav = () => {
    const { user, setUser } = useMainContext()
    const navigate = useNavigate();

    const handleLogout = async () => {
        setUser(initialStateUser);
        localStorage.clear();
        navigate('/home');
    };

    return (
        <nav className="w-full h-20 bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-5 pl-5">
            <Link to={`/home`} >
                <a className=" text-tapeWhite"><MdHome size={25} /></a>
            </Link>
            <input type='text' placeholder='Search...' />
            <ul className="flex flex-row text-tapeWhite">
                <Link to={'/user'}>
                    <div className="overflow-hidden rounded-full w-[50px] h-[50px]">
                        <img src={johnMartin} className='w-16 h-16 object-cover' style={{objectPosition: 'center-center'}}/>
                    </div>
                </Link>
                <li className="pr-5">
                    <a className=" text-tapeWhite"onClick={handleLogout}><FiLogOut size={25}/></a>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav;