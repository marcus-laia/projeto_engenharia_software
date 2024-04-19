import React, { useState } from 'react';
import ChatContainer from './chatContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';
import NegotiationPage from '../NegotiationPage/negotiationPage';
import './chatPage.css';

const ChatPage = () => {
  const currentUserId = Number(localStorage.getItem("userId"));
  const { otherUserId: otherUserIdString } = useParams();
  const otherUserId = parseInt(otherUserIdString);

  const [showNegotiation, setShowNegotiation] = useState(false);

  const toggleNegotiation = () => {
    setShowNegotiation(!showNegotiation);
  };

  return (
    <div className="chat-page-container-chatPage">
      <Header hasSearchBar={false} />
      <button className="see-negotiation-btn-chatPage" onClick={toggleNegotiation}>
        {showNegotiation ? 'Hide negotiation' : 'See negotiation'}
      </button>
      <div className="chat-and-negotiation-container-chatPage">
        <div className={`chat-container-chatPage ${showNegotiation ? 'full-width-chatPage' : ''}`}>
          <ChatContainer currentUserId={currentUserId} otherUserId={otherUserId} />
        </div>
        <div className={`negotiation-container-chatPage ${showNegotiation ? 'expanded-chatPage' : ''}`}>
          <NegotiationPage userId1Received={currentUserId} userId2Received={otherUserId}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
