import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Howler, Howl } from 'howler';
// types
import { User } from '@/types/User';
import { ChannelType } from '@/types/Channel';
import { MixTape } from '@/types/Mixtape';
// services
import { getAllUsers } from '@/services/UserClientService';
import { getChannel, deleteChannel } from '@/services/ChannelClientService';
import { usePlayerContext } from '@/components/Context/PlayerContext';
// components
import { useMainContext } from '@/components/Context/Context';
import AddMembersSelect from '@/components/AddMembersSelect/AddMembersSelect';
import AddMixtapeForm from '@/components/AddMixtapeForm/AddMixtapeForm';
import CommentList from '@/components/CommentList/CommentList';
// styling
import { MdPlayArrow } from 'react-icons/md';
import AudioWave from '@/components/AudioWave/AudioWave';
import { GoPlus } from 'react-icons/go';
// utils
import ConfirmationDialog from '@/utils/ConfirmationDialog';
import { generateStream } from '@/utils/StreamCreationHelpers';

const Channel = () => {
  const { user, setUser } = useMainContext();
  const { setCurrentStream, currentStream, streamIndex, setStreamIndex, setCurrentPlaybackTime, setMixTapeDuration, setPlaying} = usePlayerContext()
  const location = useLocation();
  // states
  const [channel, setChannel] = useState<ChannelType>(location.state.channel);
  const [showMixForm, setShowMixForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPlayClicked, setIsPlayClicked] = useState(false);

  const navigateTo = useNavigate();

  // users useEffect
  useEffect(() => {
    async function retrieveAllUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('error getting all users');
      }
    }
    async function retrieveChannel() {
      try {
        const channelData = await getChannel(channel._id);
        setChannel(channelData);
      } catch (error) {
        console.error('error getting channel');
      }
    }
    retrieveChannel();
    retrieveAllUsers();
  }, []);

  const handlePlayClick = async () => {
    if (isPlayClicked) {
      return;
    }
    setIsPlayClicked(true);
    if (currentStream[streamIndex]) {
      currentStream[streamIndex].stop();
      setPlaying(false);
    }
    try {
      const stream = await generateStream(channel, setStreamIndex, streamIndex);
      console.log('new stream ready', stream)
      setCurrentStream(stream);
    } catch (error) {
      console.error('Error occurred while loading stream:', error);
    } finally {
      setIsPlayClicked(false);
    }
  };


  const toggleMemberForm = () => {
    setShowMemberForm(!showMemberForm);
    setShowMixForm(false);
  };

  const toggleComments = () => {
    if (isCommentsOpen === true) {
      setIsCommentsOpen(false);
    } else {
      setIsCommentsOpen(true);
    }
  };

  // Asks for a confirmation
  const handleDelete = () => {
    // Show confirmation dialog when delete button is clicked
    setShowConfirmation(true);
  };

  // Deleting after confirmation
  const handleConfirmDelete = async () => {
    await deleteChannel(channel._id);

    // update the dashboard
    setUser((prevList) => ({
      ...prevList,
      channels: prevList.channels.filter((el) => el._id !== channel._id),
    }));

    navigateTo('/dash');
  };

  return (
    <div id="channel" className="flex flex-col items-center">
      <div
        id="channel-element"
        className="text-tapeWhite w-[1350px] h-72 flex justify-between p-10 rounded-2xl bg-gradient-to-r from-tapePink to-tapeYellow mb-[20px]"
      >
        <div id="channel-info" className="w-2/5 text-xl">
          <div className="flex flex-row">
            <MdPlayArrow
              size={70}
              onClick={handlePlayClick}
              className="cursor-pointer"
            />
            <div className="flex flex-col">
              <h1 className="text-[55px] font-medium mb-[20px]">
                {channel.name}
              </h1>
              <div className="flex flex-row">
                <p className="mr-[20px] font-medium">
                  {channel.mixTapes.length
                    ? `${channel.mixTapes.length} mixtape${channel.mixTapes.length === 1 ? '' : 's'
                    }`
                    : '0 mixtapes'}
                </p>
                <p className="font-medium">
                  {channel.members.length
                    ? `${channel.members.length} member${channel.members.length === 1 ? '' : 's'
                    }`
                    : '0 members'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row ml-[30px] mt-[50px]">
            {channel.members.map((member, index) => {
              return (
                <div
                  key={index}
                  className="w-[80px] h-[80px] overflow-hidden rounded-full border-tapePink border-[2px] -ml-[30px]"
                >
                  <img src={member.profilePic}></img>
                </div>
              );
            })}
            <button
              className="w-[80px] h-[80px] flex flex-row justify-center items-center bg-tapeBlack rounded-full border-tapePink border-[2px] -ml-[30px]"
              onClick={toggleMemberForm}
            >
              <GoPlus className="text-tapeWhite" size={30} />
            </button>
          </div>
          {/* <AudioWave></AudioWave> */}
        </div>
        {showMemberForm && (
          <AddMembersSelect channel={channel} setChannel={setChannel} />
        )}
        <img src={channel.picture} className="w-48 rounded-2xl object-cover" />
      </div>
      <div className="w-full h-[100px] pl-[50px] pr-[50px] flex flex-col items-start">
        <div className="flex flex-row">
          {isCommentsOpen ? (
            <>
              <button
                className="border-none mr-[40px] text-[20px] font-medium text-tapeWhite"
                onClick={toggleComments}
              >
                Comments
              </button>
              <button
                className="border-none mr-[40px] text-[20px] font-medium text-tapeDarkGrey"
                onClick={toggleComments}
              >
                Uploads
              </button>
              <button
                className="border-none mr-[40px] text-[20px] text-tapeDarkGrey hover:text-tapeWhite"
                onClick={handleDelete}
              >
                Delete
              </button>
              {showConfirmation && (
                <ConfirmationDialog
                  isOpen={showConfirmation}
                  onCancel={() => setShowConfirmation(false)}
                  onConfirm={handleConfirmDelete}
                />
              )}
            </>
          ) : (
            <>
              <button
                className="border-none mr-[40px] text-[20px] text-tapeDarkGrey"
                onClick={toggleComments}
              >
                Comments
              </button>
              <button
                className="border-none mr-[40px] text-[20px] text-tapeWhite"
                onClick={toggleComments}
              >
                Uploads
              </button>
            </>
          )}
        </div>
        <hr className="w-full mt-[20px] border-tapeDarkGrey"></hr>
      </div>
      {isCommentsOpen ? (
        <CommentList channel={channel} />
      ) : (
        <AddMixtapeForm
          channelId={channel._id}
          channel={channel}
          setChannel={setChannel}
          setShowMixForm={setShowMixForm}
        />
      )}
    </div>
  );
};
export default Channel;
