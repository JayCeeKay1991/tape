import { useEffect, useState } from 'react';
import AppContext from '../Context/Context';
import ChannelItem from '../ChannelItem/ChannelItem';
import { getChannelsByUser } from '../../services/ChannelService';
import { Channel } from '../../types/Channel';

const ChannelList = () => {
  const { user } = useAppContext();
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchAndSet = async () => {
      const channelsPerUser = await getChannelsByUser(user._id);
      setChannelList(channelsPerUser);
    };
    fetchAndSet();
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