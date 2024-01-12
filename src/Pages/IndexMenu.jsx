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
      <footer className="flex justify-center">
        <div className="mobile:mt-20 lg:mt-10 flex gap-2 justify-center mobile:flex-col">
          <span>
            Challenge by
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              rel="noreferrer"
            >
              Frontend Mentor.
            </a>
          </span>
          <span>
            Coded by{" "}
            <a
              href="https://github.com/Laszlo-Caballero"
              target="_blank"
              rel="noreferrer"
            >
              Laszlo-Caballero.
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}

export default IndexMenu;
