import { Channel } from "../../types/Channel"
import { useNavigate } from "react-router"

type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  const navigate = useNavigate();

  const navigateToChannel = () => {
    navigate(`/channels/${channel._id}`, {state: {channel}});
  }

  return (
    <div id="channel-item-wrap" className="w-60 h-96 bg-gradient-to-b from-tapePink tapeYellow rounded-3xl overflow-hidden text-tapeBlack" >
      <button onClick={navigateToChannel} className="rounded-t-3xl border-none">
        <img id="channel-thumbnail" src={channel.picture} className="rounded-full h-48 w-48 object-cover my-6 mx-6" />
      </button>
      <h1 className="mx-2 leading-10" >{channel.name}</h1>
      <div id="channel-item-footer" className="flex justify-between mx-2" >
        <p>{`${channel.members.length} members`}</p>
        <p>duration</p>
      </div>
    </div>
  )

}

export default ChannelItem;