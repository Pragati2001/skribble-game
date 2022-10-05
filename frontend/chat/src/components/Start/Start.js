import React, { useState } from "react";
import Avatar_Img from "../Avatar/Avatar.js";
import "../styles/start.css";
import Start_btn from "./Start_btn";
import Name from "./Name";

export default function Start({ onstart, img_name, people_name }) {
  const [name, setName] = useState("empty");
  const [avatar, setavatar] = useState("none");
  function selectAvatar(name) {
    setavatar(name);
    img_name(name);
  }
  function persons_name(name) {
    setName(name);
    people_name(name);
  }
  return (
    <div className="start-block">
      <Avatar_Img selectAvatar={selectAvatar} />
      <div className="scribbl-heading">SCRIBBL</div>
      {name == "empty" && (
        <div className="banner">
          <div className="overlay">
            <h1>SELECT NAME AND AVATAR</h1>
          </div>
        </div>
      )}
      {name !== "empty" && avatar !== "none" && <Start_btn onstart={onstart} />}
      <Name persons_name={persons_name} />
    </div>
  );
}
