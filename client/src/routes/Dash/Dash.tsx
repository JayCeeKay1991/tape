import { useState, useEffect, ChangeEvent } from 'react';
import { useMainContext } from '@/components/Context/Context';
import AddChannelForm from '@/components/AddChannelForm/AddChannelForm';
import ChannelItem from '@/components/ChannelItem/ChannelItem';
import { getChannelsUserMemberOf } from '@/services/ChannelClientService';
import { ChannelType } from '@/types/Channel';
import { IoSearch } from 'react-icons/io5';

export default function Dash() {
  const { user } = useMainContext();
  const channelList = user.channels;
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<ChannelType[]>([]);
  const [filteredChannelsOwn, setFilteredChannelsOwn] = useState<ChannelType[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);


  useEffect(() => {
    async function getAllChannels() {
      const allChannels = await getChannelsUserMemberOf(user._id);
      setChannels(allChannels);
      setFilteredChannels(allChannels);
      setFilteredChannelsOwn(channelList);
    }
    getAllChannels();
  }, [user]);

  const toggleAddForm = () => {
    setShowForm(!showForm);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const searchFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue.trim()) {
      setFilteredChannels(channels);
      setFilteredChannelsOwn(channelList);
      setSearch('');
    } else {
      setSearch(searchValue);
      const searchResult: ChannelType[] = channels.filter(channel => {
        return Object.values(channel).some(value =>
          value.toString().toLowerCase().startsWith(searchValue)
        );
      });
      const searchResultOwn: ChannelType[] = channelList.filter(channel => {
        return Object.values(channel).some(value =>
          value.toString().toLowerCase().startsWith(searchValue)
        );
      });

     setFilteredChannels(searchResult);
     setFilteredChannelsOwn(searchResultOwn);
    }

  }


  return (
    <div id="dashWrapper" className="w-full h-full">
      <div id="searchWrap" className='fixed top-[22px] left-[80px]' >
        <button className="border-none mt-[2px]" onClick={toggleSearch}>
          <IoSearch size={25} className="border-none" />
        </button>
        {isSearchVisible && (
          <input
            className="bg-tapeBlack text-tapeWhite mx-8 focus:outline none"
            onChange={searchFilter}
            value={search}
            type="text"
            placeholder="Search..."
          />
        )}
      </div>
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
            {filteredChannelsOwn.length} streams
          </p>
          <div className="w-full h-[600px] overflow-scroll">
            <div id="channel-list" className="flex gap-x-10 py-12">
              {filteredChannelsOwn.length
                ? filteredChannelsOwn.map((channel) => (
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
              {filteredChannels.length > 0
                ? filteredChannels.map((channel) =>
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
