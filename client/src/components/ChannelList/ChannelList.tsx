import { useEffect, useState } from 'react';
import { useMainContext } from '../Context/Context';
import ChannelItem from '../ChannelItem/ChannelItem';
import AddChannelForm from '../AddChannelForm/AddChannelForm';
import { Channel } from '../../types/Channel';


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
    <div id="channel-list-wrap" className='bg-tapeOffBlack flex-col w-3/4 my-5 px-10 rounded-3xl'>
      <div id="channel-list-header" className='flex justify-between items-center h-1/6'>
        <h1>Your channels</h1>
        <div id="channel-list-controls" >
          <button onClick={toggleAddForm} className='bg-tapeWhite rounded-full p-4 text-tapeBlack' >Add channel</button>
        </div>
      </div>
      <div id="channel-list" className='flex gap-x-10' >
        {channelList.length ? channelList.map(channel => <ChannelItem key={channel._id} channel={channel}/>) : 'No channels yet.'}
      </div>
      {
        showForm ? <AddChannelForm setChannelList={setChannelList} setShowForm={setShowForm} /> : <></>
      }
    </div>
  )
}

export default ChannelList;