import { Channel } from "../../types/Channel"
import { useNavigate } from "react-router"


type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  const navigate = useNavigate();
  const navigateToChannel = () => {
    const id = channel._id;
    navigate(`/channels/${id}`);
  }

  return (
    <div id="channel-item-wrap" >
      <button onClick={navigateToChannel} ></button>
      <img>{channel.picture}</img>
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