import { useState, useEffect } from 'react';
import { useMainContext } from '@/components/Context/Context';
import AddChannelForm from '@/components/AddChannelForm/AddChannelForm';
import ChannelItem from '@/components/ChannelItem/ChannelItem';
import { ChannelType } from '@/types/Channel';

const Dash = () => {
  const { user } = useMainContext();
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) setChannelList(user.channels);
  }, [user, channelList]);

  const toggleAddForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      id='channel-list-wrap'
      className='text-tapeWhite bg-tapeOffBlack flex-col w-11/12 mx-10 my-5 px-10 rounded-3xl'>
      <div
        id='channel-list-header'
        className='flex justify-between items-center pt-5'>
        <h1>Your channels</h1>
        <div id='channel-list-controls'>
          <button onClick={toggleAddForm} className='white-button'>
            Add channel
          </button>
        </div>
      </div>
      <div id='channel-list' className='flex gap-x-10 py-12'>
        {channelList.length
          ? channelList.map((channel) => (
            <ChannelItem key={channel._id} channel={channel} />
          ))
          : 'No channels yet.'}
      </div>
      {showForm ? (
        <AddChannelForm
          setChannelList={setChannelList}
          setShowForm={setShowForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dash;
