import { useState, useEffect } from 'react';
import { useMainContext } from '@/components/Context/Context';
import AddChannelForm from '@/components/AddChannelForm/AddChannelForm';
import ChannelItem from '@/components/ChannelItem/ChannelItem';
import { getChannelsUserMemberOf } from '@/services/ChannelClientService';
import { ChannelType } from '@/types/Channel';

export default function Dash() {
  const { user } = useMainContext();
  const channelList = user.channels;
  const [showForm, setShowForm] = useState(false);
  const [channels, setChannels] = useState<ChannelType[]>([]);

  useEffect(() => {
    // get all users to populate dropdown
    async function getAllChannels() {
      const allChannels = await getChannelsUserMemberOf(user._id);
      setChannels(allChannels);
    }
    getAllChannels();
  }, [user]);

  const toggleAddForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div id="dashWrapper" className="w-full h-full">
      <div
        id="channel-list-wrap"
        className="text-tapeWhite bg-tapeOffBlack flex-col w-11/12 mx-10 my-5 px-10 rounded-3xl mt-[80px]"
      >
        <div id="channel-list-header" className="flex justify-between items-center pt-5">
          <h2 className="text-[50px] font-semibold">Your channels</h2>
          <div id="channel-list-controls" className=' relative'>
            <button onClick={toggleAddForm} className="white-button w-[120px] h-[50px] font-medium">
              Add channel
            </button>
            {showForm && <AddChannelForm setShowForm={setShowForm} />}
          </div>
        </div>

        <div id="all-channels" className="flex flex-col gap-x-10 py-1">
          <p className="text-[20px] text-tapeDarkGrey">
            {channelList.length} streams
          </p>
          <div className="w-full h-[600px] overflow-scroll">
            <div id="channel-list" className="flex gap-x-10 py-12">
              {channelList.length
                ? channelList.map((channel) => (
                    <ChannelItem key={channel._id} channel={channel} />
                  ))
                : "No channels yet."}
            </div>
          </div>

          <h2 className="text-[50px]">
            <b>Friends channels</b>
          </h2>
          <p className="text-[20px] text-tapeDarkGrey">
            {channels.length} streams
          </p>

          <div className="w-full h-[600px] overflow-scroll">
            <div id="membership-channels" className="flex gap-x-10 py-12">
              {channels.length > 0
                ? channels.map((channel) =>
                    channel.owner.toString() === user._id ? null : (
                      <ChannelItem key={channel._id} channel={channel} />
                    )
                  )
                : "No channels yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
