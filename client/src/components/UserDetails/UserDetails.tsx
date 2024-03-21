
import React, { useState, MouseEventHandler, useEffect } from 'react';
import "./UserDetails.css"

import { useMainContext } from '../Context/Context';
import { updateUser } from '@/services/UserClientService';
import { User } from '@/types/User';
import { postImageToCloudinary } from '@/services/CloudinaryService';

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
    password: '',
    profilePic: user.profilePic,
  };
  const [formValuesProfile, setFormValuesProfile] =
    useState<FormValuesUserProfile>(initialFormState);

  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeProfilePic, setChangeProfilePic] = useState(false);
  const [formPictureFile, setFormPictureFile] = useState<File | null>(null);

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    switch (e.target) {
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
              break;
              default:
              break;
     }
   }


  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormPictureFile(files[0]);
      let pictureUrl = user.profilePic;
      if (formPictureFile) {
        try {
          pictureUrl = await postImageToCloudinary({
            file: formPictureFile
          });
          ///////////////////////////////////////////////
           const newUser: Omit<User, "password"> = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            profilePic: pictureUrl,
            channels: user.channels,
            mixTapes: user.mixTapes ? [...user.mixTapes] : [],
          }
       const updatedUser = await updateUser(newUser);
       if (updatedUser) {
         setUser(updatedUser);
       }
          ///////////////////////////////////////////////
          setChangeProfilePic(!changeProfilePic);
        } catch (error) {
          console.error(error);
        }
      }
      } else setFormValuesProfile({ ...formValuesProfile, [name]: value });
  }



  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValuesProfile.password !== user.password) {
      const newUser: User = {
        _id: user._id,
        userName: formValuesProfile.username,
        email: formValuesProfile.email,
        password: formValuesProfile.password,
        profilePic: user.profilePic,
        channels: user.channels,
        mixTapes: user.mixTapes ? [...user.mixTapes] : [],
      };
      const updatedUser = await updateUser(newUser);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } else {
        const newUser: Omit<User, "password">  = {
          _id: user._id,
          userName: formValuesProfile.username,
          email: formValuesProfile.email,
          profilePic: user.profilePic,
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
            default:
              break;
        }
  }
  return (
    <div className='flex flex-col bg-tapeDarkBlack justify-center items-center w-[350px] h-[600px] rounded-[20px] border-[1px] '>
         <form id="profilePicForm" onSubmit={submitHandler} className="relative rounded-full justify-center  w-[180px] h-[180px]">
            <div id='allProfilePic' className=' relative w-[180px] h-[180px] rounded-full flex justify-center items-center'>
                <div>
                <div className='relative overflow-hidden w-[180px] h-[180px] rounded-full'>
                 <img src={user.profilePic ? user.profilePic : johnMartin} className='w-[180px] h-[200px] object-cover'/>
                </div>
                 <button type='button' onClick={handleEdit} id='profilePic' className='bg-gradient-to-t from-tapePink to-tapeYellow text-4xl absolute bottom-4 right-3 w-[40px] h-[40px] rounded-full'>
                    <HiPlus />
                 </button>
                 <div className='bottom-1 right-1 w-[40px] h-[40px] rounded-full'>
                 {changeProfilePic ? <div>
                   <input
                   name="profilePic"
                   type="file"
                   className=' border w-[90px] border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey'
                   onChange={changeHandler}
                    />
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
                   className=' border border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey'
                   onChange={changeHandler}
                   value={formValuesProfile.username}
                   required={true}
                 />
                 <div>
                 <button className='rounded-full h-5 w-10 flex  p-1 pb-2 items-center ml-12 mr-5' onClick={handleEdit} id='username'>
                   cancel
                 </button>
                 <button className='rounded-full h-5 w-10 flex p-1 pb-2 items-center bg-tapeGray' type="submit">
                 save
               </button>
                 </div>
               </div>
              ) : (
                  <button onClick={handleEdit} id='username' className='border-0 fontFamily-sans text-3xl'><b>{user.userName}</b></button>
              )}
            </div>
          )}
        </div>
      </form>
      <form id='usernameForm' onSubmit={submitHandler}>
        <div id='allUsername'>
          <label>username:</label>
          {changeUsername ? (
            <div>
              <input
                name='username'
                type='text'
                onChange={changeHandler}
                value={formValuesProfile.username}
                required={true}
              />
              <button
                className='submitButton'
                onClick={handleEdit}
                id='username'>
                cancel
              </button>
              <button className='submitButton' type='submit'>
                save
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} id='username'>
              {user.userName}
            </button>
          )}
        </div>
      </form>
      <div>
        <form id='emailForm' onSubmit={submitHandler}>
          <div id='allEmail'>
            <label>email:</label>
            {changeEmail ? (
              <div>
                <input
                  name='email'
                  type='text'
                  onChange={changeHandler}
                  value={formValuesProfile.email}
                  required={true}
                />
                <button
                  className='submitButton'
                  onClick={handleEdit}
                  id='email'>
                  cancel
                </button>
                <button className='submitButton' type='submit'>
                  save
                </button>
              </div>
            ) : (
              <button onClick={handleEdit} id='email'>
                {user.email}
              </button>
            )}
          </div>
        </form>

        <form id='passwordForm' onSubmit={submitHandler}>
          <div id='allPassword'>
            <label>password:</label>
            {changePassword ? (
              <div>

                <input
                  name="password"
                  type="password"
                  className=' border border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey'

                  onChange={changeHandler}
                  value={formValuesProfile.password}
                />
                <button
                  className='submitButton'
                  onClick={handleEdit}
                  id='password'>
                  cancel
                </button>
                <button className='submitButton' type='submit'>
                  save
                </button>
              </div>
            ) : (
              <button onClick={handleEdit} id='password'>
                set new password
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div>
          Channels:
          {user.channels.length > 0 ? (
            user.channels!.map((channel) => (
              <div>
                <div>Channel name: {channel.name}</div>
              </div>
            ))
          ) : (
            <div>No channels yet</div>
          )}
        </div>
        <div>
          Tapes:
          {user.mixTapes.length > 0 ? (
            user.mixTapes.map((tape) => (
              <div>
                <div>Tape name: {tape.name}</div>
              </div>
            ))
          ) : (
            <div>No tapes yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

