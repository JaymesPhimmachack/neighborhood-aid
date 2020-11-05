import React from "react";
import { Card } from "react-bootstrap";

export const ChatMember = ({ members }) => {
  return members.map((member) => {
    return (
      <Card key={member.id}>
        <Card.Body>
          <div className='media'>
            <div className='media-body'>
              <span>
                {member.first_name} {member.last_name}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  });
};
