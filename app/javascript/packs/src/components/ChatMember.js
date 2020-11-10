import React from "react";
import { Card } from "react-bootstrap";
import Avatar from "./Avatar";
import styled from "styled-components";

const StyleCard = styled(Card)`
  .member-img-style {
    margin-top: 7px;
  }
  .member-name {
    margin-top: 7px;
  }
  .member-img {
    width: 50px;
    margin-left: 10px;
  }
`;

export const ChatMember = ({ members }) => {
  return members.map((member) => {
    return (
      <StyleCard key={member.id}>
        <Card.Body>
          <div className='d-flex justify-content-center'>
            <div className='member-name'>
              {member.first_name} {member.last_name}
            </div>
            <div className='member-img'>
              <Avatar photoUrl={member.photo_url} />
            </div>
          </div>
        </Card.Body>
      </StyleCard>
    );
  });
};
