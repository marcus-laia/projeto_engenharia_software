import React from 'react';
import './allChats.css';
import { useNavigate } from 'react-router-dom';

const AllChats = ({ chats }) => {
  const navigate = useNavigate();

  const goToChatPage = (otherUserId) => {
    navigate(`/chat-page/${otherUserId}`);
  }
  
  return (
    <div className="all-chats-container-all-chats">
      <h2>All Chats</h2>
      <div className="chats-list-all-chats">
        {chats.map((chat, index) => (
          <div key={index} onClick={() => goToChatPage(chat.otherUserId)} className="chat-row-all-chats">
            <div className="user-name-all-chats">{chat.otherUserName}</div>
            <div className="last-message-all-chats">{chat.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllChats;
