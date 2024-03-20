import React, { useEffect, useState } from 'react';
import "./UserDetails.css"
import { useMainContext } from '../Context/Context';
import { updateUser } from '../../services/UserClientService';
import { User } from '../../types/User';
import { postImageToCloudinary } from '../../services/CloudinaryService';


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
    password: user.password,
    profilePic: user.profilePic,
  };
  const [ formValuesProfile , setFormValuesProfile] = useState<FormValuesUserProfile>(initialFormState);
  
  const [ changeusername, setChangeusername ] = useState(false);
  const [ changeemail, setChangeemail ] = useState(false);
  const [ changepassword, setChangepassword ] = useState(false);
  const [formPictureFile, setFormPictureFile] = useState<File | null>(null);

  function handleEdit(e: React.MouseEvent) {
    e.preventDefault();
     switch (e.target) {
       case document.getElementById("username"):
         setChangeusername(!changeusername);
         break;
       case document.getElementById("email"):
         setChangeemail(!changeemail);
         break;
       case document.getElementById("password"):
         setChangepassword(!changepassword);
         break;
       case document.getElementById("profilePic"):
         setFormPictureFile(null);
         break;
       default:
         break;
     }
    
    console.log("e.target: ", document.getElementById("username"));
    // setChangePassword(!changePassword);
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
      updateUser(newUser);
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
    setChangepassword(false);
  }
  return (
    <div>
      <form id="userDetailsForm" onSubmit={submitHandler}>
        <div id='allUsername'>
              {changeusername ? (
                 <input
                   name="username"
                   type="text"
                   onChange={changeHandler}
                   value={formValuesProfile.username}
                   required={true}
                 />
              ) : (
                 <button onClick={handleEdit} id='username'>{user.userName}</button>
              )}
            </div>
          <div>
          <div id='allEmail'>
              {changeemail ? (
                 <input
                   name="email"
                   type="text"
                   onChange={changeHandler}
                   value={formValuesProfile.email}
                   required={true}
                 />
              ) : (
                 <button onClick={handleEdit} id='email'>{user.email}</button>
              )}
            </div>
          <div>
            <div id='allPassword'>
              <label>password:</label>
              {changepassword ? (
                <input
                  name="password"
                  type="password"
                  onChange={changeHandler}
                  value={formValuesProfile.password}
                  required={true}
                />
              ) : (
                 <button onClick={handleEdit} id='password'>set new password</button>
              )}
            </div>
            <div id='profilePic'>
              <label>profilePic:</label>
              <input
               name="profilePic"
               type="file"
               onChange={changeHandler}
                />
            </div>

          </div>
        </div>
        <button className='submitButton' type="submit">
          update details
        </button>
      </form>

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