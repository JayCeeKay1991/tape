import { useEffect, useState } from 'react';
import { useMainContext } from '../Context/Context';
import ChannelItem from '../ChannelItem/ChannelItem';
import AddChannelForm from '../AddChannelForm/AddChannelForm';
import { Channel } from '../../types/Channel';
import './ChannelList.css';

const ChannelList = () => {
  const { user } = useMainContext();
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) setChannelList(user.channels);
  }, [user])


  const toggleAddForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div id="channel-list-wrap" >
      <div id="channel-list-header" >
        <h3>Your streams</h3>
        <div id="channel-list-controls" >
          <button onClick={toggleAddForm} >Add channel</button>
          <button>Last</button>
          <button>Most replayed</button>
          <button>List view / cards view</button>
        </div>
      </div>
      <div id="channel-list" >
        {channelList.length ? channelList.map(channel => <ChannelItem key={channel._id} channel={channel}/>) : 'No channels yet.'}
      </div>
      {
        showForm ? <AddChannelForm setChannelList={setChannelList} setShowForm={setShowForm} /> : <></>
      }
    </div>
  )
}

export default ChannelList;