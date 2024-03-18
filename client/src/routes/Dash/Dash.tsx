import ChannelList from "../../components/ChannelList/ChannelList";
import { useMainContext } from "../../components/Context/Context";
import './Dash.css';

const Dash = () => {
  const { user } = useMainContext();

  return (
    <div  id="dash-wrap">
      <div id="user-info" >
        <img src={user.profilePic} />
        <p>Welcome {user.userName}</p>
      </div>
      <ChannelList/>
    </div>
  )
}

export default Dash;