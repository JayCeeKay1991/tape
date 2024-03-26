import { Link, useNavigate } from 'react-router-dom';
import { useMainContext, initialStateUser } from '@/components/Context/Context';
import { MdHome } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '@/services/UserClientService';
import { usePlayerContext } from '../Context/PlayerContext';

const AppNav = () => {
  const { user, setUser } = useMainContext();
  const {setCurrentStream} = usePlayerContext();


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(initialStateUser);
      setCurrentStream([]);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <nav className="w-full h-20 bg-tapeBlack fixed top-0 left-0 flex flex-row items-center justify-between pr-[20px] pl-[20px]">
      <div className="flex flex-row align-middle">
        <Link to={`/dash`}>
          <button className=" text-tapeWhite border-none mr-[20px]">
            <MdHome size={30} />
          </button>
        </Link>
      </div>
      <div className=" w-[100px] pl-[20px] flex flex-row  bg-tapeWhite rounded-full items-center justify-between">
        <button
          className="bg-none text-tapeBlack border-none"
          onClick={handleLogout}
          data-testid="logout-button"
        >
          <FiLogOut size={20} />
        </button>
        <Link to={'/user'}>
          <div className="overflow-hidden rounded-full w-[50px] h-[50px] flex justify-center items-center">
            <img
              src={user.profilePic}
              className="w-16 h-16 object-cover"
              style={{ objectPosition: 'center-center' }}
              data-testid="profile-image"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AppNav;
