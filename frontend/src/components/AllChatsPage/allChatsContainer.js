import React from 'react';
import AllChats from './allChats';
import { useQuery } from '@apollo/client';
import { GET_ALL_CHATS } from '../../graphql/mutations/getAllChatsMutation';

const AllChatsContainer = ( {currentUserId} ) => {
  const { loading, error, data } = useQuery(GET_ALL_CHATS, {
    variables: { currentUserId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AllChats chats={data.chats} currentUserId={currentUserId}/>
    </div>
  );
};
export default AllChatsContainer;