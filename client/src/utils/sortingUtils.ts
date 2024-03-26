import { ChannelType } from "@/types/Channel";

// sort channelList by number  of members
  export const sortByMembers = (channelItems: ChannelType[]) => {
    return channelItems.sort((a, b) => b.members.length - a.members.length);
  }

   // sort channelList by number  of members
   export const sortByMixtapes = (channelItems: ChannelType[]) => {
    return channelItems.sort((a, b) => b.mixTapes.length - a.mixTapes.length);
  }
  
