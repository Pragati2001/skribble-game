import React from "react";
import "../styles/main_page.css";
import Chat from "../components/Main_Page/Chat";
import Canvas from "../components/Canvas/Canvas";
import Heading from "../components/Main_Page/Heading";
export default function Main_page({
  socket,
  person_name,
  room_id,
  img_name,
  Messagelist,
  setMessagelist,
}) {
  console.log("main-page");
  return (
    <div className="main_page">
      <Heading />
      <div className="component">
        <Canvas socket={socket} />
        <Chat
          socket={socket}
          username={person_name}
          room={room_id}
          setMessagelist={setMessagelist}
          Messagelist={Messagelist}
        />
      </div>
    </div>
  );
}
