import { useState, useEffect, useRef, MouseEvent } from 'react'
import { getAllUsers } from '../../services/UserClientService'
import { User } from '../../types/User'
import johnMartin from '../../components/AppNav/johnmartin.jpg'


const AddMembersSelect = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedMembers, setSelectedMembers]  = useState<User[]>([])
  const selectedMembersRef = useRef<HTMLDivElement>(null)

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
  }, [])

  const handleMemberSelect = (userId: string) => {
    const user = users.find(user => user._id === userId);
    if (user) {
      setSelectedMembers(prevSelectedMembers => [...prevSelectedMembers, user]);
    }
  };


  return (
    <div className='flex flex-column'>
      <div id='selected-members'>
        {selectedMembers.map(user => (
          <div key={user._id} className="flex items-center">
            <img
              src={user.profilePic ? user.profilePic : johnMartin}
              alt={user.userName}
              className="w-16 h-16 object-cover"
              style={{ objectPosition: 'center-center' }}
            />
            <p className="text-tapeWhite">{user.userName}</p>
          </div>
        ))}
      </div>
      <ul className='align-middle text-tapeWhite flex flex-col w-72 gap-2 rounded-2xl'>
        {users.map(user => (
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


//   return (
//     <div>
//       <ul className='align-middle text-tapeWhite flex flex-col w-72 gap-2 rounded-2xl'>
//         {
//           users.map(user => (
//             <li className='flex flex-row hover:bg-tapePink' key={user._id} onClick={() => handleMemberSelect(user._id)}  >
//               <div className="overflow-hidden rounded-full w-[50px] h-[50px]">
//                 <img src={user.profilePic ? user.profilePic : johnMartin} alt={user.userName} className='w-16 h-16 object-cover' style={{ objectPosition: 'center-center' }} />
//               </div>
//               <p className='text-tapeWhite '>{user.userName}</p>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }

export default AddMembersSelect