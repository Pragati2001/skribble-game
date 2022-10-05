import React from "react";
import "../../styles/start_btn.scss";
export default function Start_btn({ setCheck }) {
  return (
    <div className="start_btn">
      <button
        className="btn third"
        onClick={() => {
          setCheck("instruction");
        }}
      >
        <span className="start_wrd">Start</span>
      </button>
    </div>
  );
}
