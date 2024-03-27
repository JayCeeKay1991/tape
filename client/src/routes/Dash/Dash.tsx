import { useState, useEffect, ChangeEvent } from "react";
import { useMainContext } from "@/components/Context/Context";
import AddChannelForm from "@/components/AddChannelForm/AddChannelForm";
import ChannelItem from "@/components/ChannelItem/ChannelItem";
import { getChannelsUserMemberOf } from "@/services/ChannelClientService";
import { ChannelType } from "@/types/Channel";
import AppNav from "@/components/AppNav/AppNav";
import { IoSearch } from "react-icons/io5";
import ChannelSideBar from "@/components/ChannelSideBar/ChannelSideBar";
import { sortByMembers, sortByMixtapes } from "@/utils/sortingUtils";
import Player from "@/components/Player/Player";
import Notifications from "@/components/Notification/NotificationItem";
import { displayNotification } from "@/types/Notification";
import { IoAddSharp } from "react-icons/io5";

export default function Dash() {
  const { user } = useMainContext();
  const [userChannels, setUserChannels] = useState<ChannelType[]>(
    user.channels
  );
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [notifications, setNotifications] = useState<displayNotification[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [sorting, setSorting] = useState<string>("none");
  const [searching, setSearching] = useState<boolean>(false);
  const [showChannel, setShowChannel] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null
  );

  useEffect(() => {
    async function getAllChannels() {
      const allChannels = await getChannelsUserMemberOf(user._id);
      const userNotifications = allChannels.map((channel) => {
        return {
          channelName: channel.name,
          notifications: channel.notifications,
        };
      });
      setChannels(allChannels);
      setNotifications(userNotifications);
      setUserChannels(user.channels);
      if (sorting === "none") {
        setUserChannels(user.channels);
      } else {
        if (sorting === "members") {
          setUserChannels(sortByMembers(userChannels));
          setChannels(sortByMembers(channels));
        } else {
          setUserChannels(sortByMixtapes(userChannels));
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
    console.log(`searching ${e.target.value}`);
    if (e.target.value === "") {
      setSearching(false);
      return;
    }
    const searchValue = e.target.value.toLowerCase().trim();
    setSearching(true);

    const filteredChannels: ChannelType[] = channels.filter((channel) => {
      return Object.values(channel).some((value) =>
        value.toString().toLowerCase().trim().startsWith(searchValue)
      );
    });

    const filteredUserChannels: ChannelType[] = userChannels.filter(
      (channel) => {
        return Object.values(channel).some((value) =>
          value.toString().toLowerCase().trim().startsWith(searchValue)
        );
      }
    );

    if (filteredChannels.length > 0 || filteredUserChannels.length > 0) {
      setChannels(filteredChannels);
      setUserChannels(filteredUserChannels);
    }
  };

  return (
    <div
      id="dashWrapper"
      className="w-full h-full flex flex-row justify-center gap-[20px] p-[20px] relative"
    >
      <div id="searchWrap" className="absolute top-[42px] left-[105px]">
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
        className="text-tapeWhite flex-col w-full h-full"
      >
        <AppNav />

        {/* <Notifications notifications={notifications} user={user} /> */}
        <div
          id="top-notfication"
          className="w-full h-[320px] bg-tapePink rounded-[30px]"
        ></div>

        <div id="your-channels-wrap" className="flex flex-col pt-5 mb-[60px]">
          <div className="flex flex-row justify-between mb-[30px]">
            <div id="channel-details">
              <h2 className="text-[30px] font-semibold">Your channels</h2>
              <p className="text-[15px] text-tapeDarkGrey">
                {userChannels.length} streams
              </p>
            </div>
            <div
              id="button-popup"
              className="flex flex-row justify-center items-center relative"
            >
              <button
                className={`mr-[10px] pl-[15px] pr-[15px] pt-[7px] pb-[7px] text-[14px] border-tapeWhite border-[1px] rounded-full font-medium cursor-pointer ${
                  sorting === "members"
                    ? "text-tapeBlack bg-tapeWhite"
                    : "text-tapeWhite"
                }`}
                onClick={() => setSorting("members")}
              >
                Sort by MixTapes
              </button>
              <button
                className={`mr-[10px] pl-[15px] pr-[15px] pt-[7px] pb-[7px] text-[14px] border-tapeWhite border-[1px] rounded-full font-medium cursor-pointer ${
                  sorting === "mixtapes"
                    ? "text-tapeBlack bg-tapeWhite"
                    : "text-tapeWhite"
                }`}
                onClick={() => setSorting("mixtapes")}
              >
                Sort by Members
              </button>
              <button
                className={`p-[7px] text-[14px] border-[1px] border-tapeWhite rounded-full font-medium hover:bg-tapeWhite hover:text-tapeBlack cursor-pointer ${
                  showForm
                    ? "text-tapeBlack bg-tapeWhite"
                    : "text-tapeWhite bg-tapeBlack"
                }`}
                onClick={toggleAddForm}
              >
                <IoAddSharp size={20} />
              </button>
              {showForm && <AddChannelForm setShowForm={setShowForm} />}
            </div>
          </div>

          <div id="channel-list" className="flex gap-[20px] flex-wrap">
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
          <div id="channel-details" className="mb-[30px]">
            <h2 className="text-[30px] font-semibold">Friends channels
            </h2>
            <p className="text-[15px] text-tapeDarkGrey">
              {channels.length} streams
            </p>
          </div>

          <div id="membership-channels" className="flex gap-[30px] flex-wrap">
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
      {showChannel && (
        <ChannelSideBar
          selectedChannel={selectedChannel}
          showChannel={showChannel}
          setShowChannel={setShowChannel}
        />
      )}
      <Player />
    </div>
  );
}
