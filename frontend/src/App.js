import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import AddCardsPage from './components/AddCardsPage';
import ChatPage from './components/ChatPage';
import AllChatsPage from './components/AllChatsPage';
import MyAccount from './components/MyAccount/myAccount';
import MyCardsPage from './components/MyCardsPage/myCardsPage';
import NegotiationPage from './components/NegotiationPage/negotiationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-cards-page" element={<AddCardsPage />} />
        <Route path="/chat-page/:otherUserId" element={<ChatPage />} />
        <Route path="/all-chats" element={<AllChatsPage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-cards" element={<MyCardsPage />} />
        <Route path="/negotiation/:userId1/:userId2" element={<NegotiationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
