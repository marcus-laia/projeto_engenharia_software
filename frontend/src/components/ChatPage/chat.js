import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../../graphql/mutations/sendMessageMutation";
import "./chat.css";

const Chat = ({ messages, currentUserId, otherUserId }) => {
  const [messageText, setMessageText] = useState("");

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);
  const sendMessage = async () => {
    try {
      const { status } = await sendMessageMutation({
        variables: { text: messageText, currentUserId: currentUserId, otherUserId: otherUserId}
      });

      if (status === "success") {
        console.log("Message sent successfully");
        setMessageText("");
        window.location.reload();
      } else {
        console.error("Failed to send message");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container-chat">
      <div className="messages-container-chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-chat ${message.fromUserId == currentUserId ? 'sender-chat' : 'receiver-chat'}`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="text-input-chat">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
