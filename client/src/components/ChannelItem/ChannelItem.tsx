import { Channel } from "../../types/Channel"


type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  return (
    <div>
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