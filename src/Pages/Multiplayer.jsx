import { Route, Routes } from "react-router-dom";
import RoomIndex from "./roomIndex";
import GameRoom from "./GameRoom";
function Multiplayer() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomIndex />} />
        <Route path="/:room" element={<GameRoom />} />
        <Route path="/spectator/:room" element={<h1>room</h1>} />
      </Routes>
    </>
  );
}

export default Multiplayer;
