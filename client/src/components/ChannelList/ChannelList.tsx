import { useEffect, useState } from 'react';
import { useMainContext } from '../Context/Context';
import ChannelItem from '../ChannelItem/ChannelItem';
import { Channel } from '../../types/Channel';
import './ChannelList.css';

const ChannelList = () => {
  const { user } = useMainContext();
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    if (user) setChannelList(user.channels);
  }, [])

  return (
    <div id="channel-list-wrap" >
      <div id="channel-list-header" >
        <h3>Your streams</h3>
        <div id="channel-list-controls" >
          <button>Last</button>
          <button>Most replayed</button>
          <button>List view / cards view</button>
        </div>
      </div>
      <div id="channel-list" >
        {channelList.length ? channelList.map(channel => <ChannelItem channel={channel}/>) : <p>No channels yet.</p>}
      </div>
    </div>
  )
}

export default ChannelList;