
import React, { Dispatch, SetStateAction } from "react";
import { ChannelType, } from '@/types/Channel';
import { IoMdPlay } from "react-icons/io";

type ChannelItemProps = {
  channel: ChannelType;
  setSelectedChannel: (channel: ChannelType) => void;
  showChannel: boolean;
  setShowChannel: Dispatch<SetStateAction<boolean>>;
};

const ChannelItem = ({ channel, setSelectedChannel, showChannel, setShowChannel }: ChannelItemProps) => {

  const handleClick = () => {
    setSelectedChannel(channel)
    setShowChannel(!showChannel)
  }

  return (
    <button
      className="rounded-t-3xl border-none mb-[20px] relative "
      onClick={handleClick}
    >
      <div className="w-full h-full absolute flex flex-row justify-center items-center opacity-0 hover:opacity-100">
        <IoMdPlay size={90} className="text-tapeWhite" />
      </div>
      <div
        id="channel-item-wrap"
        className="w-60 h-96 bg-gradient-to-b from-tapePink to-tapeYellow rounded-3xl overflow-hidden text-tapeWhite"
      >
        <img
          id="channel-thumbnail"
          src={channel.picture}
          className="rounded-full h-48 w-48 object-cover my-6 mx-6"
          data-testid="channel-picture"
        />

        <h1 className="mx-2 leading-10" data-testid="channel-name">
          {channel.name}
        </h1>
        <div id="channel-item-footer" className="flex justify-between mx-2">
          <div>
            <p>
              {channel.mixTapes.length
                ? `${channel.mixTapes.length} mixtape${
                    channel.mixTapes.length === 1 ? "" : "s"
                  }`
                : "No mixtapes"}
            </p>
            <p>
              {channel.members.length
                ? `${channel.members.length} member${
                    channel.members.length === 1 ? "" : "s"
                  }`
                : "No members"}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChannelItem;
