import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import ChatRoom from "./Chatroom";
import axios from "axios";
import styled from "styled-components";

const StyleChat = styled.div`
  .avatar-lg {
    height: 3.125rem;
    min-height: 3.125rem;
    width: 3.125rem;
    min-width: 3.125rem;
  }

  .avatar {
    background: #f5f6fa;
    display: inline-block;
    position: relative;
    line-height: 0;
  }
  .avatar-image-lg {
    border-radius: 50%;
  }
  .avatar-sm {
    height: 2.75rem;
    min-height: 2.75rem;
    width: 2.75rem;
    min-width: 2.75rem;
  }
  .avatar-image-sm {
    height: 2.75rem;
    min-height: 2.75rem;
    width: 2.75rem;
    min-width: 2.75rem;
  }
  .message-group {
    height: 750px;
  }
`;

const Chat = ({ user }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState({});

  const getChatRooms = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/rooms");
      console.log(data);
      setChatRooms(data);
    } catch (error) {
      console.log("chatroom error", error);
    }
  };

  const getRoom = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/rooms/${roomId}`);
      console.log(data);
      // setCurrentRoom(data);
    } catch (error) {
      console.log("current room error", error);
    }
  };

  useEffect(() => {
    getChatRooms();
    console.log(chatRooms);
  }, []);

  const handleRoomChange = (event) => {
    setRoomId(event.target.dataset.id);
    console.log(roomId);
  };

  return (
    <StyleChat className='container-fluid mt-5'>
      <div className='row'>
        <div className='col-2 justify-content-around'>
          <ListGroup defaultActiveKey='#link1'>
            {chatRooms.length > 0 ? (
              chatRooms.map((chatroom) => {
                return (
                  <ListGroup.Item
                    key={chatroom.id}
                    data-id={chatroom.id}
                    action
                    onClick={handleRoomChange}
                  >
                    {chatroom.title}
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item action disabled>
                The are no rooms
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
        <div className='col-10'>
          <ChatRoom roomId={roomId} user={user} />
        </div>
      </div>
    </StyleChat>
  );
};

export default Chat;
