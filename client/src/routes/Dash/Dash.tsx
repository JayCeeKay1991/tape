import ChannelList from "../../components/ChannelList/ChannelList";
import { useMainContext } from "../../components/Context/Context";

const Dash = () => {
  const { user } = useMainContext();

  return (
    <div  id="dash-wrap" className="flex gap-x-3 h-screen bg-tapeBlack text-tapeWhite"  >
      <div id="user-info" className="flex-col text-center place-content-around w-1/6 bg-tapeOffBlack m-5 h-1/3 rounded-3xl p-10" >
        <img src={user.profilePic} className='w-36 h-36 object-cover rounded-full' />
        <h1  >Welcome {user.userName}</h1>
      </div>
      <ChannelList/>
    </div>
  )
}

export default Dash;