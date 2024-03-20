import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent} from 'react'
import { getAllUsers } from '../../services/UserClientService'
import { User } from '../../types/User'
import johnMartin from '../../components/AppNav/johnmartin.jpg'
import { addUserToChannel } from '../../services/ChannelClientService';
import { ChannelType } from '../../types/Channel';


interface AddMembersSelectProps {
  channel: ChannelType
  setChannel: Dispatch<SetStateAction<ChannelType>>
}

const AddMembersSelect = ({ channel, setChannel }: AddMembersSelectProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedMembers, setSelectedMembers] = useState<User[]>(channel.members)
  const [matchedUsers, setMatchedUsers] = useState<User[]>([])

  useEffect(() => {
    // get all users to populate dropdown
    async function retrieveAllUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers)
      } catch (error) {
        console.error('error getting all users')
      }
    }
    retrieveAllUsers();
  }, [users])

  const handleMemberSelect = async (userId: string) => {
    const user = users.find(user => user._id === userId);
    if (user) {
      if (selectedMembers.includes(user)) {
        // already member
        return
      }
      setSelectedMembers(prevSelectedMembers => [...prevSelectedMembers, user]);
      // add new user to channel on back end
      const id = channel._id;
      const updatedChannel = await addUserToChannel(id, user._id)
      setChannel(updatedChannel);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMatchedUsers(users.filter(user => user.userName.toLowerCase().includes(e.target.value.toLowerCase())))
  }


  return (
    <div className='flex flex-row'>
      <div id='selected-members'>
        {selectedMembers && selectedMembers.length && selectedMembers.map(user => (
          <div key={user._id} className="flex items-center">
            <img
              src={user.profilePic ? user.profilePic : johnMartin}
              alt={user.userName}
              className="w-16 h-16 object-cover"
              style={{ objectPosition: 'center-center' }}
            />
          </div>
        ))}
      </div>
      <input type='text' placeholder='Search for a friend...' onChange={handleChange}></input>
      <ul className='align-middle text-tapeWhite flex flex-col w-72 gap-2 bg-tapeOffBlack'>
        {matchedUsers.length && matchedUsers.map(user => (
          <li
            key={user._id}
            className='flex flex-row hover:bg-tapePink cursor-pointer'
            onClick={() => handleMemberSelect(user._id)}
          >
            <div className="overflow-hidden rounded-full w-[50px] h-[50px]">
              <img
                src={user.profilePic ? user.profilePic : johnMartin}
                alt={user.userName}
                className='w-16 h-16 object-cover'
                style={{ objectPosition: 'center-center' }}
              />
            </div>
            <p className='text-tapeWhite'>{user.userName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddMembersSelect