import { useState, useEffect } from "react";
import { useMainContext } from "@/components/Context/Context";
import AddChannelForm from "@/components/AddChannelForm/AddChannelForm";
import ChannelItem from "@/components/ChannelItem/ChannelItem";
import { getChannelsUserMemberOf } from "@/services/ChannelClientService";
import { ChannelType } from "@/types/Channel";
import AppNav from "@/components/AppNav/AppNav";
import ChannelSideBar from "@/components/ChannelSideBar/ChannelSideBar";

export default function Dash() {
  const { user } = useMainContext();
  const channelList = user.channels;
  const [showForm, setShowForm] = useState(false);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [showChannel, setShowChannel] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null
  );

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
    <div
      id="dashWrapper"
      className="w-full h-full flex flex-row justify-center gap-[20px] p-[20px] relative"
    >
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
                {channelList.length} streams
              </p>
            </div>

            <div id="button-popup" className="relative">
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
            {channelList.length
              ? channelList.map((channel, index) => (
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
    </div>
  );
}
