import React from "react";
import styled from "styled-components";

const StyledImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Avatar = ({ photoUrl }) => <img src={photoUrl} alt='avatar' />;

export default Avatar;
