import React, { useEffect, useState } from 'react';
import "./UserDetails.css"
import { useMainContext } from '../Context/Context';
import { updateUser } from '../../services/UserClientService';
import { User } from '../../types/User';


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
  const [ changePassword, setChangePassword ] = useState(false);

  function handlePasswordChange(e: React.MouseEvent) {
    e.preventDefault();
    setChangePassword(!changePassword);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValuesProfile({...formValuesProfile, [name]: value });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUser: User = {
      _id: user._id,
      userName: formValuesProfile.username,
      email: formValuesProfile.email,
      password: formValuesProfile.password,
      profilePic: formValuesProfile.profilePic,
      channels: user.channels,
      mixTapes: user.mixTapes ? [...user.mixTapes] : [],
    };
    updateUser(newUser);
    setChangePassword(false);
  }

  return (
    <div>
      <form id="userDetailsForm" onSubmit={submitHandler}>
        <div>
          <div>
            <div id='username'>
              <label>username:</label>
              <input
                name="username"
                type="text"
                onChange={changeHandler}
                value={formValuesProfile.username}
                required={true}
              />
            </div>
            <div id='email'>
              <label>email:</label>
              <input
                name="email"
                type="text"
                onChange={changeHandler}
                value={formValuesProfile.email}
                required={true}
              />
            </div>
            <div id='password'>
              <label>password:</label>
              {changePassword ? (
                <input
                  name="password"
                  type="password"
                  onChange={changeHandler}
                  value={formValuesProfile.password}
                  required={true}
                />
              ) : (
                 <button onClick={handlePasswordChange}>set new password</button>
              )}
            </div>
            <div id='profilePic'>
              <label>profilePic:</label>
              <input
                name="profilePic"
                type="text"
                onChange={changeHandler}
                value={formValuesProfile.profilePic}
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