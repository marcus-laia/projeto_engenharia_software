import React from 'react';
import ChatContainer from './chatContainer';
import Header from '../Header';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const currentUserId = 123; //TO DO: handle current user id
  const { otherUserId: otherUserIdString }  = useParams();
  const otherUserId = parseInt(otherUserIdString);
  return (
    <div>
      <Header hasSearchBar={false} />
      <ChatContainer currentUserId = {currentUserId} otherUserId = {otherUserId}/>
    </div>
  );
};

export default ChatPage;