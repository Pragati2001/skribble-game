import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../../styles/chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, username, room, setMessagelist, Messagelist }) {
  const [currentMessage, setCurrentMessage] = useState("");
  // const [Messagelist, setMessagelist] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const Messagedata = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", Messagedata);
      // setMessagelist("");
      setMessagelist((list) => [...list, Messagedata]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagelist((list) => [...list, data]);
    });
    // console.log(data);
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {Messagelist.map((msg_content) => {
            return (
              <div
                className="message"
                id={username === msg_content.author ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    <p>{msg_content.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{msg_content.time}</p>
                    <p>{msg_content.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
