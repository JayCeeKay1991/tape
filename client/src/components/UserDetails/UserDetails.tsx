import React, { useEffect } from 'react';
import { useMainContext } from '../Context/Context';

export default function UserDetails() {
  const { user } = useMainContext();
  return (
    <div>
      <h2>userDetails</h2>
      <div>
        <div>username: {user.userName}</div>
        <div>email: {user.email}</div>
        <div>password: {user.password}</div>
        <div>profile picture: {user.profilePic}</div>
        <div>channels: { user.channels.length < 1 ? <div>not channels yet</div> : user.channels.map((channel) => {
          return (
            <div>
              <div>channel name: {channel.name}</div>
              <div>channel picture: {channel.picture}</div>
            </div>
          );
        })}</div>
         <div>tapes: { user.mixTapes.length < 1 ? <div>not tapes yet</div> : user.mixTapes.map((tape) => {
          return (
            <div>
              <div>channel name: {tape.name}</div>
            </div>
          );
        })}</div>
      </div>
    </div>
  );
}
