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
  const [members, setMembers] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const getChatRooms = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/rooms");
      if (data) {
        setChatRooms(data);
      }
    } catch (error) {
      console.log("chatroom error", error);
    }
  };

  const getRoomData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/rooms/${roomId}`);

      if (isMounted) {
        setMembers(data.members);
        setMessages(data.messages);
      }
    } catch (error) {
      console.log("current room error", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    // if (chatRooms.length === 0) {
    getChatRooms();
    // }

    if (roomId) {
      getRoomData();
    }
    console.log(chatRooms);
    return () => setIsMounted(false);
  }, [roomId]);

  const handleRoomChange = ({ target }) => {
    setRoomId(target.dataset.id);
  };

  const filteredRooms = () => {
    return chatRooms.filter((chatroom) => {
      const result = chatroom.members.find((member) => member.id === user.id);

      if (result) {
        return chatroom;
      }
    });
  };

  const renderRooms = () => {
    const rooms = filteredRooms();

    if (rooms.length > 0) {
      return rooms.map((room) => {
        return (
          <ListGroup.Item
            key={room.id}
            data-id={room.id}
            action
            onClick={handleRoomChange}
          >
            {room.title}
          </ListGroup.Item>
        );
      });
    } else {
      return (
        <ListGroup.Item action disabled>
          The are no rooms
        </ListGroup.Item>
      );
    }
  };

  return (
    <StyleChat className='container-fluid mt-5'>
      <div className='row'>
        <div className='col-3 justify-content-around'>
          <ListGroup>{chatRooms.length > 0 && renderRooms()}</ListGroup>
        </div>
        {members === null && messages === null ? (
          <div>Select a room</div>
        ) : (
          <ChatRoom
            id={roomId}
            user={user}
            messages={messages}
            members={members}
          />
        )}
      </div>
    </StyleChat>
  );
};

export default Chat;
