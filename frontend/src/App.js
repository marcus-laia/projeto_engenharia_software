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
import ProductDetailsPage from './components/ProductDetailsPage';
import AddToNegotiationPage from './components/AddToNegotiationPage';
import RemoveFromNegotiationPage from './components/RemoveFromNegotiationPage';

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
        <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
        <Route path="/add-cards-to-negotiation/:negotiationId/:userId" element={<AddToNegotiationPage />} />
        <Route path="/remove-cards-from-negotiation/:negotiationId/:userId" element={<RemoveFromNegotiationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
