import { Link } from "react-router-dom";
import { useState } from "react";
import ModalRules from "./modal";
function Footer({ onClick }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <footer className="flex justify-between w-full lg:px-12 mobile:px-4">
        <Link to="/" className="px-8 py-2 border-white border-2 rounded-xl">
          Menu
        </Link>
        <button onClick={onClick}>ver jugadores</button>
        <button
          className="px-8 py-2 border-white border-2 rounded-xl"
          onClick={() => {
            setModal(true);
          }}
        >
          RULES
        </button>
      </footer>
      {modal && (
        <ModalRules
          onClick={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
}

export default Footer;
