
import React, { useState } from 'react';
import './UserDetails.css';
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
      case document.getElementById('username'):
        setChangeUsername(!changeUsername);
        break;
      case document.getElementById('email'):
        setChangeEmail(!changeEmail);
        break;
      case document.getElementById('password'):
        setChangePassword(!changePassword);
        break;
      case document.getElementById('profilePic'):
        setChangeProfilePic(!changeProfilePic);
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
          file: formPictureFile,
        });
        console.log('picture: ', pictureUrl);
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
      };
      const updatedUser = await updateUser(newUser);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } else {
      const newUser: Omit<User, 'password'> = {
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
      case document.getElementById('usernameForm'):
        setChangeUsername(!changeUsername);
        break;
      case document.getElementById('emailForm'):
        setChangeEmail(!changeEmail);
        break;
      case document.getElementById('passwordForm'):
        setChangePassword(!changePassword);
        break;
      case document.getElementById('profilePicForm'):
        setChangeProfilePic(!changeProfilePic);
        break;
      default:
        break;
    }
    ////////////////////////////////////////////////
  }
  return (
    <div>
      <form id='profilePicForm' onSubmit={submitHandler}>
        <div id='allProfilePic'>
          {changeProfilePic ? (
            <div>
              <input name='profilePic' type='file' onChange={changeHandler} />
              <button className='submitButton' type='submit'>
                save
              </button>
            </div>
          ) : (
            <div>
              <img
                src={user.profilePic ? user.profilePic : johnMartin}
                className='w-16 h-16 object-cover'
                style={{ objectPosition: 'center-center' }}
              />
              <button onClick={handleEdit} id='profilePic'>
                {' '}
                edit pic
              </button>
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
                  name='password'
                  type='password'
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
