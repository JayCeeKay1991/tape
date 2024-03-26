
import { useState, useEffect, ChangeEvent } from "react";
import { useMainContext } from "@/components/Context/Context";
import AddChannelForm from "@/components/AddChannelForm/AddChannelForm";
import ChannelItem from "@/components/ChannelItem/ChannelItem";
import { getChannelsUserMemberOf } from "@/services/ChannelClientService";
import { ChannelType } from "@/types/Channel";
import AppNav from "@/components/AppNav/AppNav";
import { IoSearch } from 'react-icons/io5';
import ChannelSideBar from "@/components/ChannelSideBar/ChannelSideBar";
import { sortByMembers, sortByMixtapes } from "@/utils/sortingUtils";
import Player from "@/components/Player/Player";

export default function Dash() {
  const { user } = useMainContext();
  const [userChannels, setUserChannels] = useState<ChannelType[]>(user.channels)
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
 
  const [showForm, setShowForm] = useState(false);
  const [sorting, setSorting] = useState<string>('none')
  const [searching, setSearching] = useState<boolean>(false);
  const [showChannel, setShowChannel] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(null);

  useEffect(() => {
    async function getAllChannels() {
      console.log(sorting)
      const allChannels = await getChannelsUserMemberOf(user._id);
      setChannels(allChannels);
      setUserChannels(user.channels)
      if (sorting === 'none') {
        setUserChannels(user.channels)
      }
      else {
        if (sorting === 'members') {
          setUserChannels(sortByMembers(userChannels))
          setChannels(sortByMembers(channels));

        } else {
          setUserChannels(sortByMixtapes(userChannels))
          setChannels(sortByMixtapes(channels));
        }
      }

    }
    getAllChannels();
  }, [user, sorting, searching]);

  const toggleAddForm = () => {
    setShowForm(!showForm);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`searching ${e.target.value}`)
    if (e.target.value === '') {
      setSearching(false);
      return;
    }
    const searchValue = e.target.value.toLowerCase().trim();
    setSearching(true);

    const filteredChannels: ChannelType[] = channels.filter(channel => {
      return Object.values(channel).some(value =>
        value.toString().toLowerCase().trim().startsWith(searchValue)
      );
    });

    const filteredUserChannels: ChannelType[] = userChannels.filter(channel => {
      return Object.values(channel).some(value =>
        value.toString().toLowerCase().trim().startsWith(searchValue)
      );
    });

    if (filteredChannels.length > 0 || filteredUserChannels.length > 0) {
      setChannels(filteredChannels)
      setUserChannels(filteredUserChannels)
    }
  }



  return (
    <div
      id="dashWrapper"
      className="w-full h-full flex flex-row justify-center gap-[20px] p-[20px] relative"
    >
      <div id="searchWrap" className='absolute top-[42px] left-[105px]' >
        <button className="border-none mt-[2px]" onClick={toggleSearch}>
          <IoSearch size={25} className="border-none" />
        </button>
        {isSearchVisible && (
          <input
            className="bg-tapeBlack text-tapeWhite mx-8 focus:outline none"
            onChange={search}
            type="text"
            placeholder="Search..."
          />
        )}
      </div>

      <div
        id="channel-list-wrap"
        className="text-tapeWhite bg-tapeOffBlack flex-col w-full px-10 rounded-3xl"
      >
        <AppNav />

        <div className="text-[60px] font-semibold mb-[40px]">
          <p> Welcome back {user.userName} 👋</p>
        </div>

        <div id="your-channels" className="flex flex-col pt-5 ">

          <div className="flex flex-row justify-between ">
            <div>
              <h2 className="text-[40px] font-semibold">Your channels</h2>
              <p className="text-[20px] text-tapeDarkGrey">
                {userChannels.length} streams
              </p>
            </div>
            <div id="button-popup" className="relative">
              <button className="white-button w-[120px] h-[50px] font-medium cursor-pointer " onClick={() => setSorting('members')}>Sort by MixTapes</button>
              <button className="white-button w-[120px] h-[50px] font-medium cursor-pointer" onClick={() => setSorting('mixtapes')}>Sort by Members</button>
              <button
                onClick={toggleAddForm}
                className="white-button w-[120px] h-[50px] font-medium"
              >
                Add channel
              </button>
              {showForm && <AddChannelForm setShowForm={setShowForm} />}
            </div>

          </div>

          <div id="channel-list" className="flex gap-x-10 py-12 flex-wrap">
            {userChannels.length
              ? userChannels.map((channel, index) => (
                <ChannelItem
                  key={index}
                  channel={channel}
                  setSelectedChannel={setSelectedChannel}
                  showChannel={showChannel}
                  setShowChannel={setShowChannel}
                />
              ))
              : "No channels yet."}
          </div>
        </div>

        <div id="friends-channels" className="flex flex-col">
          <h2 className="text-[50px]">
            <b>Friends channels</b>
          </h2>
          <p className="text-[20px] text-tapeDarkGrey">
            {channels.length} streams
          </p>

          <div
            id="membership-channels"
            className="flex gap-x-10 py-12 flex-wrap"
          >
            {channels.length > 0
              ? channels.map((channel, index) =>
                channel.owner.toString() === user._id ? null : (
                  <ChannelItem
                    key={index}
                    channel={channel}
                    setSelectedChannel={setSelectedChannel}
                    showChannel={showChannel}
                    setShowChannel={setShowChannel}
                  />
                )
              )
              : "No channels yet."}
          </div>
        </div>
      </div>
      {showChannel && <ChannelSideBar selectedChannel={selectedChannel} />}
      <Player />
    </div>
  );
}
