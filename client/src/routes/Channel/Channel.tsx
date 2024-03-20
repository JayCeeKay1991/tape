import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// types
import { User } from "../../types/User";
import { ChannelType } from "../../types/Channel";
// services
import { getAllUsers } from "../../services/UserClientService";
// components
import TestPlayer from "../../components/TestPlayer/TestPlayer";
import { useMainContext } from "../../components/Context/Context";
import AddMembersSelect from "../../components/AddMembersSelect/AddMembersSelect";
import AddMixtapeForm from "../../components/AddMixtapeForm/AddMixtapeForm";
import CommentList  from "../../components/CommentList/CommentList"
// styling
import { MdPlayArrow } from "react-icons/md";

const Channel = () => {
  const { user } = useMainContext();
  const location = useLocation();
  const [channel, setChannel] = useState<ChannelType>(location.state.channel);
  const [showMixForm, setShowMixForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const initialState = {
    name: '',
    url: '',
    duration: 0,
    creator: user,
    parentChannel: channel,
    channels: [],
    users: [],
  };

  const [users, setUsers] = useState<User[]>(initialState.users)

  useEffect(() => {
    async function retrieveAllUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers)
      } catch (error) {
        console.error('error getting all users')
      }
    }
    setChannel(channel);
    retrieveAllUsers();
  }, [channel])


  const toggleMixForm = () => {
    setShowMixForm(!showMixForm)
    setShowMemberForm(false)

  }
  const toggleMemberForm = () => {
    setShowMemberForm(!showMemberForm)
    setShowMixForm(false)
  }

  return (
    <div id="channel">
      <div id="channel-element" className="text-tapeWhite h-72 bg-gradient-to-r from-tapePink to-tapeYellow flex justify-between p-10 w-11/12 m-12 rounded-2xl" >
        <div id="channel-info" >
          <h1 className="flex items-center" ><MdPlayArrow size={35} />{channel.name}</h1>
          <p className="pl-3" >{`${channel.mixTapes ? channel.mixTapes.length : 0} mixtape${channel.mixTapes.length > 1 ? 's' : ''}`}</p>
          <p className="pl-3">{channel.members ? channel.members.length : 'no members'}</p>
        </div>
        <img src={channel.picture} className="w-48 rounded-2xl object-cover" />

      </div>
      <button onClick={toggleMixForm} className="white-button ml-12" >Add Mixtape</button>
      <button onClick={toggleMemberForm} className="white-button" >Add Members</button>
      {
        showMixForm ? (
         <AddMixtapeForm  channelId={channel._id} setChannel={setChannel} user={user} setShowMixForm={setShowMixForm}/> ) : (<></>)
      }
      {
        showMemberForm ? (
          <AddMembersSelect channelId={channel._id} setChannel={setChannel} />) : (<></>)
      }
      <TestPlayer />
      <CommentList channel={channel} />
    </div>
  )

}

export default Channel;