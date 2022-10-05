import React from "react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import "../styles/instruction.css";
export default function Instruction_Page({
  img_name,
  people_name,
  set_room_id,
  socket,
  setCheck,
}) {
  // const [playerjoin, setplayerjoin] = useState(0);
  const [roomId, setroomId] = useState("");
  const OnStartGame = (data) => {
    set_room_id(data);
  };
  const join_room = () => {
    socket.emit("join-room", people_name, "join_room", (info) => {
      alert(info);
    });
    setCheck("main-page");
  };
  return (
    <div className="instruction">
      <div className="inst_heading">INSTRUCTIONS</div>
      <div className="inst_middle">
        <div className="settings">
          <h2>SETTINGS</h2>
          <ul>
            <li>There is 3 rounds for each game.</li>
            <li>After 3 rounds you have to restart game.</li>
            <li>For each round you have 90sec to guess</li>
          </ul>
        </div>
        <div className="avatar_chosen">
          <img
            className="avatar__style instruction_pic"
            // src={img_name}
            src={`../assets/${img_name}.png`}
            alt={`${img_name}`}
          />
          <p>Name - {`${people_name}`}</p>
          <p>
            Enter room id
            <input
              className="input"
              value={roomId}
              onChange={(e) => {
                OnStartGame(e.target.value);
                setroomId(e.target.value);
              }}
            ></input>
          </p>
          <button className="custom-btn btn-8" onClick={join_room}>
            <span>Join Room </span>
          </button>
          <button className="custom-btn btn-8">
            <span>Create Room </span>
          </button>
        </div>
        <div className="rules">
          <h2>RULES</h2>
          <ul>
            <li>No discrepancy is allowed.</li>
            <li>Maintain the decorum of game.</li>
            <li>No Cheating activities are encouraged.</li>
          </ul>
        </div>
      </div>
      {/* <div className="next_btn"> */}
      {/* <button
          className="custom-btn btn-8"
          onClick={() => {
            start_page();
          }}
        >
          <span>Back</span>
        </button> */}
      {/* </div> */}
    </div>
  );
}
