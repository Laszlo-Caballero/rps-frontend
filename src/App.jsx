import { Route, Routes } from "react-router-dom";
import IndexMenu from "./Pages/IndexMenu";
import SinglePlayer from "./Pages/SinglePlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexMenu />} />
      <Route path="/Singleplayer" element={<SinglePlayer />} />
      <Route path="/Multiplayer" element={<h1>MULTIPLAYER EN DESARROLLO</h1>} />
    </Routes>
  );
}

export default App;
