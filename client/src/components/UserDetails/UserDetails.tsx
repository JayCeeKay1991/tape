import React, { useState, MouseEventHandler } from 'react';
import "./UserDetails.css"
import { useMainContext } from '../Context/Context';
import { updateUser } from '../../services/UserClientService';
import { User } from '../../types/User';
import { postImageToCloudinary } from '../../services/CloudinaryService';
import johnMartin from '../AppNav/johnmartin.jpg'
import { HiPlus } from "react-icons/hi2";
import { GoPencil } from "react-icons/go";

export type FormValuesUserProfile = {
  username: string;
  email: string;
  password: string;
  profilePic: string;
};


export default function UserDetails() {
  const { user, setUser } = useMainContext();
  const initialFormState = {
    username: user.userName,
    email: user.email,
    password: "",
    profilePic: user.profilePic,
  };
  const [ formValuesProfile , setFormValuesProfile] = useState<FormValuesUserProfile>(initialFormState);
  
  const [ changeUsername, setChangeUsername ] = useState(false);
  const [ changeEmail, setChangeEmail ] = useState(false);
  const [ changePassword, setChangePassword ] = useState(false);
  const [ changeProfilePic, setChangeProfilePic ] = useState(false);
  const [formPictureFile, setFormPictureFile] = useState<File | null>(null);

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    switch (target.id) {
      case "username":
        setChangeUsername(!changeUsername);
        break;
        case "email":
          setChangeEmail(!changeEmail);
          break;
          case "password":
            setChangePassword(!changePassword);
            break;
            case "profilePic":
              setChangeProfilePic(!changeProfilePic);
              console.log("here!!!!!!!")
              break;
              default:
              break;
     }
   }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormPictureFile(files[0]); 
    } else setFormValuesProfile({ ...formValuesProfile, [name]: value });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let pictureUrl = user.profilePic;
    if (formPictureFile) {
      try {
        pictureUrl = await postImageToCloudinary({
          file: formPictureFile
        });
        console.log("picture: " ,pictureUrl)
      } catch (error) {
        console.error(error);
      }
    }
    if (formValuesProfile.password !== user.password) {
      const newUser: User = {
        _id: user._id,
        userName: formValuesProfile.username,
        email: formValuesProfile.email,
        password: formValuesProfile.password,
        profilePic: pictureUrl,
        channels: user.channels,
        mixTapes: user.mixTapes ? [...user.mixTapes] : [],
      }
       const updatedUser = await updateUser(newUser);
       if (updatedUser) {
         setUser(updatedUser);
       }

    } else {
        const newUser: Omit<User, "password">  = {
          _id: user._id,
          userName: formValuesProfile.username,
          email: formValuesProfile.email,
          profilePic: pictureUrl,
          channels: user.channels,
          mixTapes: user.mixTapes ? [...user.mixTapes] : [],
      };
      updateUser(newUser);
    }
         ///////////////////////////////////////////////
         
         switch (e.target) {
           case document.getElementById("usernameForm"):
            setChangeUsername(!changeUsername);
            break;
          case document.getElementById("emailForm"):
            setChangeEmail(!changeEmail);
            break;
          case document.getElementById("passwordForm"):
            setChangePassword(!changePassword);
            break;
          case document.getElementById("profilePicForm"):
            setChangeProfilePic(!changeProfilePic);
            break;
            default:
              break;
        }
         ////////////////////////////////////////////////
  }
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
         <form id="profilePicForm" onSubmit={submitHandler} className="flex bg-tapeBlack rounded-full justify-center  w-[180px] h-[180px]">
            <div id='allProfilePic' className=' relative w-[180px] h-[180px] rounded-full flex justify-center items-center'>
                <div>
                <div className='relative overflow-hidden w-[180px] h-[180px] rounded-full'>
                 <img src={user.profilePic ? user.profilePic : johnMartin} className='w-[180px] h-[210px] object-cover'/>
                </div>
                 <button type='button' onClick={handleEdit} id='profilePic' className='bg-gradient-to-t from-tapePink to-tapeYellow text-4xl absolute bottom-4 right-3 w-[40px] h-[40px] rounded-full'>
                    <HiPlus />
                 </button>
                 <div className='absulote bottom-1 right-1 w-[40px] h-[40px] rounded-full'>
                 {changeProfilePic ? <div>
                   <input
                   name="profilePic"
                   type="file"
                   onChange={changeHandler}
                    />
                    <button className='submitButton' type="submit">
                    save
                    </button>
                  </div> : null}
                 </div>
                </div>
            </div>
            </form>
            <form id="usernameForm" onSubmit={submitHandler}>
        <div id='allUsername'>
              {changeUsername ? (
                <div>
                 <input
                   name="username"
                   type="text"
                   onChange={changeHandler}
                   value={formValuesProfile.username}
                   required={true}
                 />
                 <button className='submitButton' onClick={handleEdit} id='username'>
                   cancel
                 </button>
                 <button className='submitButton' type="submit">
                 save
               </button>
               </div>
              ) : (
                  <button onClick={handleEdit} id='username' className='border-0 fontFamily-sans text-3xl'><b>{user.userName}</b></button>
              )}
            </div>
            </form>

            <div className='flex flex-row'>
      <div className='flex flex-col p-2 justify-center items-center'>
          <div>{user.mixTapes.length}</div>
          <div>Mixes</div> 
        </div>
        <div className='flex flex-col p-2 justify-center items-center'>
          <div>{user.channels.length }</div> 
          <div>Channels</div>
        </div>
      </div>
          <div id='emailAndPassword' className='flex flex-col'>
            <form id="emailForm" onSubmit={submitHandler}>
          <div id='allEmail' className='flex flex-col mb-10'>
          <label className='block'><b>Email</b></label>
              {changeEmail ? (
                <div>  
                 <input
                   name="email"
                   type="text"
                   onChange={changeHandler}
                   value={formValuesProfile.email}
                   required={true}
                 />
                 <button className='submitButton' onClick={handleEdit} id='email'>
                   cancel
                 </button>
                  <button className='submitButton' type="submit">
                    save
                  </button>
                </div>
              ) : (
                <div className='flex flex-row space-x-10'>
                  <p>{user.email}</p>
                  <button onClick={handleEdit} id='email' className='border-0'><GoPencil /></button>
                </div>
              )}
            </div>
            </form>
          
          <form id="passwordForm" onSubmit={submitHandler}>

            <div id='allPassword'>
              <label className='block'><b>Password</b></label>
              {changePassword ? (
                <div>
                <input
                  name="password"
                  type="password"
                  onChange={changeHandler}
                  value={formValuesProfile.password}
                />
                 <button className='submitButton' onClick={handleEdit} id='password'>
                   cancel
                 </button>
                <button className='submitButton' type="submit">
                    save
                  </button>
                </div>
              ) : (
                <div className='flex flex-row justify-between'>
                <h2 className='text-3xl'>.........</h2>
                <button onClick={handleEdit} id='password' className='border-0'><GoPencil /></button>
              </div>
              )}
            </div>
            </form>
        </div>
    </div>
  );
}
///////////////////////////////////////////////////////////////
/*

function UserDetails() {

  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    setFileName(e.target.files[0].name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // can access file directly from ref
    const file = fileInputRef.current.files[0];
    
    // submit form
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={fileName} 
        readOnly
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange} 
      />

      <button type="submit">Submit</button>
    </form>
  )

}


*/