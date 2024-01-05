import { Route, Routes } from "react-router-dom";

function Multiplayer() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>asdasdsad</h1>} />
        <Route path="/asd" element={<h1>sdasd</h1>} />
        <Route path="/*" element={<h1>JODETE</h1>} />
      </Routes>
    </>
  );
}

export default Multiplayer;
