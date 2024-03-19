import Select from 'react-select'
import { useState, useEffect } from 'react'
import { getAllUsers } from '../../services/UserClientService'
import { User } from '../../types/User'
import johnMartin from '../../components/AppNav/johnmartin.jpg'


const AddMembersSelect = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
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


  return (
    <div>
      <ul className='align-middle'>
        {
          users.map(user => (
            <li className='flex flex-row' key={user._id}>
              <div className="overflow-hidden rounded-full w-[50px] h-[50px]">
                <img src={user.profilePic ? user.profilePic : johnMartin} alt={user.userName} className='w-16 h-16 object-cover' style={{ objectPosition: 'center-center' }} />
              </div>
              <p className='text-tapeWhite '>{user.userName}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default AddMembersSelect