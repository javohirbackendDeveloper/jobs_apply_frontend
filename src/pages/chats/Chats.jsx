import React, { useEffect, useState, useRef } from "react";
import "./Chats.css";
import { companyStore } from "../../stores/CompanyStore";
import { ChatsStore } from "../../stores/chats";
import UserStore from "../../stores/UserStore";
import { io } from "socket.io-client";

function Chats() {
  const { user } = UserStore();
  const { company } = companyStore();
  const { getContacts, contacts, getChatMessages, messages } = ChatsStore();

  const [activeContact, setActiveContact] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [currentPerson, setCurrentPerson] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingContact, setTypingContact] = useState(null);
  const [message, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user) {
      setCurrentPerson(user.id);
    } else if (company) {
      setCurrentPerson(company.id);
    }
  }, [user, company]);

  useEffect(() => {
    if (currentPerson) {
      getContacts(currentPerson);
    }
  }, [currentPerson, getContacts]);

  useEffect(() => {
    if (!currentPerson) return;

    socketRef.current = io(
      "https://jobs-apply-backend-24.onrender.com/graphql",
      {
        query: { userId: currentPerson },
        transports: ["websocket"],
      }
    );

    socketRef.current.on("connect", () => {
      console.log("Socket connected successfully!");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socketRef.current.on("receiveMessage", (newMessage) => {
      console.log({ newMessage });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socketRef.current.on("typing", (typingInfo) => {
      if (typingInfo.isTyping) {
        setIsTyping(true);
        setTypingContact(typingInfo.senderId);
      } else {
        setIsTyping(false);
        setTypingContact(null);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentPerson]);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setShowChat(true);
    getChatMessages(contact.senderId, contact.receiverId);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeContact || !socketRef.current) return;

    try {
      const receiverId =
        activeContact.receiverId !== (user?.id || company?.id)
          ? activeContact.receiverId
          : activeContact.senderId;

      const senderId = user?.id || company?.id;

      socketRef.current.emit("sendMessage", {
        senderId,
        receiverId,
        content: messageText,
      });

      setMessageText("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = () => {
    if (!socketRef.current || !activeContact) return;

    const receiverId =
      activeContact.receiverId !== (user?.id || company?.id)
        ? activeContact.receiverId
        : activeContact.senderId;

    socketRef.current.emit("typing", {
      senderId: user?.id || company?.id,
      receiverId,
      isTyping: messageText.length > 0,
    });
  };

  const handleBackClick = () => {
    setShowChat(false);
    setIsTyping(false);
  };

  // console.log({ message, messages });

  return (
    <div className="app">
      <div className={`contacts-sidebar ${showChat ? "mobile-hidden" : ""}`}>
        <div className="sidebar-header">
          <h2>Contacts</h2>
        </div>
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${
                activeContact?.id === contact.id ? "active" : ""
              }`}
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact?.person?.profile_img || "./avatar.jpg"}
                className="contact-avatar"
                alt="contact avatar"
              />
              <div className="contact-info">
                <h3>{contact?.person?.fullName}</h3>
                <p className="last-message">
                  {contact.lastMessage?.messageText || "No messages yet"}
                </p>
              </div>
              <span className="last-message-time">
                {contact.lastMessage?.createdAt
                  ? new Date(contact.lastMessage.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`chat-area ${!showChat ? "mobile-hidden" : ""}`}>
        {activeContact ? (
          <>
            <div className="chat-header">
              <button className="back-button" onClick={handleBackClick}>
                ← Back
              </button>
              <img
                src={activeContact?.person?.profile_img || "./avatar.jpg"}
                className="chat-avatar"
                alt="contact avatar"
              />
              <div className="chat-contact-info">
                <h2>{activeContact?.person?.fullName}</h2>
                <p className="online-status">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.senderId === (user?.id || company?.id)
                      ? "my-message"
                      : "their-message"
                  }`}
                >
                  <div className="message-content">
                    <p>{message.messageText}</p>
                    <span className="message-time">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && typingContact !== (user?.id || company?.id) && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <input
                type="text"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  handleTyping();
                }}
                onBlur={() => {
                  if (socketRef.current && activeContact) {
                    const receiverId =
                      activeContact.receiverId !== (user?.id || company?.id)
                        ? activeContact.receiverId
                        : activeContact.senderId;
                    socketRef.current.emit("typing", {
                      senderId: user?.id || company?.id,
                      receiverId,
                      isTyping: false,
                    });
                  }
                }}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
