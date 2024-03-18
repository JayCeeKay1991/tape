import { Channel } from "../../types/Channel"
import { useNavigate } from "react-router"
import './ChannelItem.css';

type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  const navigate = useNavigate();

  const navigateToChannel = () => {
    navigate(`/channels/${channel._id}`, {state: {channel}});
  }

  return (
    <div id="channel-item-wrap" >
       <button onClick={navigateToChannel}>Go to Channel</button>
      <img id="channel-thumbnail" src={channel.picture}/>
      <h3>{channel.name}</h3>
      <div id="channel-item-footer" >
        <div id="channel-member-prev" >
          <img></img>
          <img></img>
          <img></img>
        </div>
        <p>duration</p>
      </div>
    </div>
  )

}

export default ChannelItem;