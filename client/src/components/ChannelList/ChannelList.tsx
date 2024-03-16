import { useEffect, useState } from 'react';
//import AppContext from '../Context/Context';
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
    channelList.length ? channelList.map(channel => <ChannelItem channel={channel}/>) : <p>No channels yet.</p>
  )
}

export default ChannelList;