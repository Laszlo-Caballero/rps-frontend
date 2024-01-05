import Logo from "./../images/logo.svg?react";
import { Link } from "react-router-dom";
function IndexMenu() {
  return (
    <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR min-h-screen flex flex-col justify-center min-w-screen font-BarlowRegular text-white">
      <header className="flex justify-center">
        <Logo />
      </header>
      <section className="flex justify-center gap-16 mt-10">
        <Link
          to="/Singleplayer"
          className="px-7 py-3 border-white border-2 rounded-lg"
        >
          SinglePlayer
        </Link>
        <Link
          to="/Multiplayer"
          className="px-7 py-3 border-white border-2 rounded-lg"
        >
          MultiPlayer
        </Link>
      </section>
    </main>
  );
}

export default IndexMenu;
