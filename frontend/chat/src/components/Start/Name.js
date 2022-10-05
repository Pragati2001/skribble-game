import React from "react";
import { useState } from "react";
import "../../styles/name.scss";
export default function Name({ persons_name }) {
  const [name, setName] = useState(null);
  return (
    <div className="wrapper">
      <div className="desc">
        Enter your Name
        <input
          className="inp"
          type="text"
          spellCheck="false"
          v-model="displayText"
          onChange={(e) => {
            persons_name(e.currentTarget.value);
            // console.log(e.currentTarget.value);
          }}
          required
          autoFocus
        ></input>
      </div>
    </div>
  );
}
