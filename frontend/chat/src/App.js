import { io } from "socket.io-client";
import { useState } from "react";
import Main_page from "./Pages/Main_Page";
import First_page from "./Pages/First_page";
import Instruction_Page from "./Pages/Instruction_page";

function App() {
  const socket = io("http://localhost:3001");
  socket.on("connect", () => {
    console.log(`You're Connected with id:-> ${socket.id}`);
  });
  const [check, setCheck] = useState("main_page");
  const [avatar_name, setAvatar_name] = useState("");
  const [person_name, setPerson_name] = useState("none");
  const [room_id, setroomid] = useState(0);
  const [Messagelist, setMessagelist] = useState([]);

  function first_page() {
    setCheck("front_page");
  }
  function img_name(name) {
    setAvatar_name(name);
  }
  function people_name(name) {
    setPerson_name(name);
  }
  function set_room_id(data) {
    setroomid(data);
  }
  console.log(check);
  return (
    <div className="App">
      {check === "front_page" && (
        <>
          <First_page
            setCheck={setCheck}
            img_name={img_name}
            people_name={people_name}
          />
        </>
      )}
      {check === "instruction" && (
        <>
          <Instruction_Page
            img_name={avatar_name}
            people_name={person_name}
            set_room_id={set_room_id}
            socket={socket}
            setCheck={setCheck}
          />
        </>
      )}

      {check === "main_page" && (
        <>
          <Main_page
            socket={socket}
            person_name={person_name}
            room_id={room_id}
            img_name={avatar_name}
            Messagelist={Messagelist}
            setMessagelist={setMessagelist}
          />
        </>
      )}
    </div>
  );
}

export default App;
