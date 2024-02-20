import React from 'react';
import AllChatsContainer from './allChatsContainer';
import Header from '../Header';

const AllChatsPage = () => {
  const currentUserId = 123; //TO DO: handle current user id
  return (
    <div>
      <Header hasSearchBar={false} />
      <AllChatsContainer currentUserId = {currentUserId}/>
    </div>
  );
};

export default AllChatsPage;