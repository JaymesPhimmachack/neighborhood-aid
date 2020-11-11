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

const Chat = ({ user, loggedInStatus, history }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [members, setMembers] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const getChatRooms = async () => {
    try {
      const { data } = await axios.get("https://jp-neighborhood-aid.herokuapp.com/rooms");
      if (data) {
        setChatRooms(data);
      }
    } catch (error) {
      console.log("chatroom error", error);
    }
  };

  const getRoomData = async () => {
    try {
      const { data } = await axios.get(`https://jp-neighborhood-aid.herokuapp.com/rooms/${roomId}`);

      if (isMounted) {
        setMembers(data.members);
        setRoomMessages(data.messages);
      }
    } catch (error) {
      console.log("current room error", error);
    }
  };

  useEffect(() => {
    if (loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/");
    }

    if (chatRooms.length === 0) {
      getChatRooms();
    }

    if (roomId) {
      getRoomData();
    }
    setIsMounted(true);

    return () => setIsMounted(false);
  }, [roomId, loggedInStatus]);

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
          <h2>Chat Rooms</h2>
          <ListGroup>{chatRooms.length > 0 && renderRooms()}</ListGroup>
        </div>
        {members === null && roomMessages === null ? (
          <div>Select a room</div>
        ) : (
          <ChatRoom
            id={roomId}
            user={user}
            setRoomMessages={setRoomMessages}
            roomMessages={roomMessages}
            members={members}
            loggedInStatus={loggedInStatus}
            history={history}
          />
        )}
      </div>
    </StyleChat>
  );
};

export default Chat;
