import { Route, Routes } from "react-router-dom";
import IndexMenu from "./Pages/IndexMenu";
import SinglePlayer from "./Pages/SinglePlayer";
import Multiplayer from "./Pages/Multiplayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexMenu />} />
      <Route path="/Singleplayer" element={<SinglePlayer />} />
      <Route path="/Multiplayer/*" element={<Multiplayer />} />
    </Routes>
  );
}

export default App;
