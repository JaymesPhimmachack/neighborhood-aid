import React from 'react'
import ProfileImage from '../../assets/images/model-2911331_640.jpg'
import styled from 'styled-components'


const StyledImage = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 50%;
`

const Avatar = () => (
	<StyledImage>
		<div className="mb-4">
      <img src={ProfileImage}
        className="rounded-circle z-depth-1-half avatar-pic" alt="avatar" />
    </div>
	</StyledImage>
)

export default Avatar