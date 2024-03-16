import { Channel } from "../../types/Channel"


type ChannelItemProps = {
  channel: Channel
}

const ChannelItem = ({channel}:ChannelItemProps) => {

  return (
      <div>
        <h3>{channel.name}</h3>
      </div>
  )

}

export default ChannelItem;