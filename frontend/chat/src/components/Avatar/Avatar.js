import React from "react";
import "../../styles/avatar.css";
import Avatar from "@material-ui/core/Avatar";
import img0 from "../../assets/img0.png";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import img7 from "../../assets/img7.png";
import img8 from "../../assets/img8.png";
import img9 from "../../assets/img9.png";
export default function Avatar_Img({ selectAvatar }) {
  return (
    <div className="avatar_grp">
      <img
        className="avatar__style"
        src={img0}
        alt="img0"
        onClick={() => {
          selectAvatar(`img0`);
        }}
      />
      <img
        className="avatar__style"
        src={img1}
        alt="img1"
        onClick={() => {
          selectAvatar(`img1`);
        }}
      />
      <img
        className="avatar__style"
        src={img2}
        alt="img2"
        onClick={() => {
          selectAvatar(`img2`);
        }}
      />
      <img
        className="avatar__style"
        src={img4}
        alt="img4"
        onClick={() => {
          selectAvatar(`img4`);
        }}
      />
      <img
        className="avatar__style"
        src={img5}
        alt="img5"
        onClick={() => {
          selectAvatar(`img5`);
        }}
      />
      <img
        className="avatar__style"
        src={img6}
        alt="img6"
        onClick={() => {
          selectAvatar(`img6`);
        }}
      />
      <img
        className="avatar__style"
        src={img7}
        alt="img7"
        onClick={() => {
          selectAvatar(`img7`);
        }}
      />
      <img
        className="avatar__style"
        src={img8}
        alt="img8"
        onClick={() => {
          selectAvatar(`img8`);
        }}
      />
      <img
        className="avatar__style"
        src={img9}
        alt="img9"
        onClick={() => {
          selectAvatar(`img9`);
        }}
      />
    </div>
  );
}
