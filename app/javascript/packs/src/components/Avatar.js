import React from "react";

const Avatar = ({ photoUrl, headerImageClass }) => (
  <img
    src={photoUrl}
    alt='avatar'
    className={`rounded-circle ${headerImageClass}`}
  />
);

export default Avatar;
