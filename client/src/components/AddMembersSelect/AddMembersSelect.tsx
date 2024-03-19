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


  const options = users.map(user => ({
    value: user,
    label: (
      <div className="overflow-hidden rounded-full w-[50px] h-[50px]" >
        <img src={user.profilePic ? user.profilePic : johnMartin} className='w-16 h-16 object-cover' style={{ objectPosition: 'center-center' }} />
        <p>{user.userName}</p>
      </div>
    )
  }))

  return (
    <Select options={options} className='w-[300px] ' />
  )

}

export default AddMembersSelect