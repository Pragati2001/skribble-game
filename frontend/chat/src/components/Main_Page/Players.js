import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar_Img from "../components/Avatar/Avatar";
export default function Players(socket, username, img_name) {
  console.log("cscsdcscscscscscsdcsdc");
  // const { players } = useSelector((state) => state.RoomStore);
  // const { avatars } = useSelector((state) => state.RoomStore);
  const [allPlayers, setAllPlayers] = useState({});
  // const [allAvatars, setAllAvatars] = useState({});

  // useEffect(() => {
  //   setAllPlayers(players);
  //   // setAllAvatars(avatars);
  // }, [players]);

  return (
    <div className="players">
      {/* {[...Object.values(allPlayers)].map((player) => (
        <div key={player.id} className="players__player">
          {player.name}
          <Avatar_Img avatarName={player.avatar} />
      
        </div>
      ))} */}
    </div>
  );
}
