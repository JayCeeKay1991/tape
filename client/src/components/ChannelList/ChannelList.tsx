import { useEffect, useState } from 'react';
//import AppContext from '../Context/Context';
import ChannelItem from '../ChannelItem/ChannelItem';
import getChannels from '../../services/ChannelService/getChannels';

const ChannelList = () => {
  const { user } = useAppContext();
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const fetchAndSet = async () => {
      const channelsPerUser = await getChannels(user._id);
      setChannelList(channelsPerUser);
    };
    fetchAndSet();
  }, [])

  return (
      channelList.length ? channelList.map(channel => <ChannelItem channel={channel}/>) : <p>No channels yet.</p>
  )

}

export default ChannelList;