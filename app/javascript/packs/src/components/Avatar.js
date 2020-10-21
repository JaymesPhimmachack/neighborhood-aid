import React from "react";
import ProfileImage from "../../../../assets/images/model-2911331_640.jpg";
import styled from "styled-components";

const StyledImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Avatar = () => <img src={ProfileImage} alt='avatar' />;

export default Avatar;
