import { Channel } from "../../types/Channel"


type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  return (
    <div>
      <img>{channel.picture}</img>
      <h3>{channel.name}</h3>
      <img></img>
      <img></img>
      <img></img>
      <p>duration</p>
    </div>
  )

}

export default ChannelItem;