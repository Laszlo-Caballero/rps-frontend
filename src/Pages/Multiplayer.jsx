import { Route, Routes } from "react-router-dom";
import RoomIndex from "./roomIndex";
import GameRoom from "./GameRoom";
function Multiplayer() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomIndex />} />
        <Route path="/:room" element={<GameRoom />} />
      </Routes>
    </>
  );
}

export default Multiplayer;
