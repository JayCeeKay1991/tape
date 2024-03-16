import React from 'react'
// import User from 'context'

// type UserType = {
//     _id: string;
//     username: string;
//     email: string;
//     password: string;
//     profilepic: string;
//     groups: string[];
//     mixtapes: string[];
//   };
const User = {
        username: "test",
        email: "test",
        password: "test",
        profilepic: "test",
        channels: ["test"],
        mixtapes:["test"],
};
export default function UserDetails() {
  return (
    <div>
      <h2>UserDetails</h2>
        <div>
          <div>username: {User.username}</div>
          <div>email: {User.email}</div>
          <div>password: {User.password}</div>
          <div>profile picture: {User.profilepic}</div>
          <div>channels: {User.channels}</div>
          <div>mix tapes: {User.mixtapes}</div>
        </div>
    </div>
  )
}

