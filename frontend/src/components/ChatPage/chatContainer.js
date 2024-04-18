import React from 'react';
import Chat from './chat';
import { useQuery } from '@apollo/client';
import { GET_CHAT } from '../../graphql/mutations/getChatQuery';
import './chatContainer.css';

const ChatContainer = ({ currentUserId, otherUserId }) => {
  const { loading, error, data } = useQuery(GET_CHAT, {
    variables: { currentUserId, otherUserId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="chat-container-chatContainer">
      <Chat messages={data.messages} currentUserId={currentUserId} otherUserId={otherUserId} />
    </div>
  );
};

export default ChatContainer;
