import React from "react";

const Avatar = ({ photoUrl }) => (
  <img src={photoUrl} alt='avatar' className='rounded-circle w-100' />
);

export default Avatar;
