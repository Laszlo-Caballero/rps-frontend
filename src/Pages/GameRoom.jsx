import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Logo from "./../images/logo.svg?react";
import Rock from "./../images/icon-rock.svg?react";
import Paper from "./../images/icon-paper.svg?react";
import Scissors from "./../images/icon-scissors.svg?react";
import Option from "../components/Option";
import ModalRules from "../components/modal";
import renderIcon from "../func/renderIcon";
import PlayGame from "../func/PlayGame";
import resultText from "../func/resultText";
import { Link } from "react-router-dom";
function GameRoom() {
  let { room } = useParams();
  const socket = io("http://192.168.1.46:4000");
  socket.emit("Create room", room);
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [optionUser, setOptionUser] = useState("");
  const [opponentComputer, setOpponentComputer] = useState("");
  const [result, setResult] = useState(null);
  const [playAgain, setPlayAgain] = useState(0);
  const [buttomDisable, setButtomDisable] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      socket.emit("leave room", room);
    });
    socket.on("Option Game", (option) => {
      setOpponentComputer(option);
    });
    socket.on("Response Play", (number) => {
      setPlayAgain((playAgain) => playAgain + 1);
    });
    return () => {
      socket.emit("leave room", room);
    };
  }, [socket, room]);

  useEffect(() => {
    if (opponentComputer != "" && optionUser != "") {
      const resultGame = PlayGame(optionUser, opponentComputer);
      setResult(resultGame);
      switch (resultGame) {
        case 0:
          setScore((score) => score + 1);
          break;
        case 1:
          setScore((score) => score - 1);
          break;
        default:
          break;
      }
    }
  }, [opponentComputer, optionUser]);
  useEffect(() => {
    if (playAgain == 2) {
      setSelected(false);
      setButtomDisable(false);
      setOptionUser("");
      setOpponentComputer("");
    }
  }, [playAgain]);
  return (
    <>
      {" "}
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center min-w-screen font-BarlowRegular text-white">
        <header className="border-white border-2 w-3/5 rounded-xl p-5 flex justify-between mt-6">
          <Logo />
          <div className="h-[98px] bg-white flex flex-col items-center w-2/12 justify-center rounded-lg">
            {" "}
            <p className="text-TextScore">SCORE</p>
            <p className="text-DarkText text-6xl pb-1 font-BarlowBlod">
              {score}
            </p>
          </div>
        </header>
        <section className="w-[50%] h-[75%] flex flex-col items-center justify-center">
          {!selected && (
            <>
              <div className="flex w-auto gap-20">
                <Option
                  colorClass="from-PaperGradientT to-PaperGradientB"
                  element={<Paper />}
                  onClick={() => {
                    setOptionUser("paper");
                    socket.emit("Emit option", room, "paper");
                    setSelected(true);
                    setPlayAgain(0);
                  }}
                />
                <Option
                  colorClass="from-ScissorGradientT to-ScissorGradientB"
                  element={<Scissors />}
                  onClick={() => {
                    setOptionUser("scissor");
                    socket.emit("Emit option", room, "scissor");
                    setSelected(true);
                    setPlayAgain(0);
                  }}
                />
              </div>
              <div className="mt-12">
                <Option
                  colorClass="from-RockGradientT to-RockGradientB"
                  element={<Rock />}
                  onClick={() => {
                    setOptionUser("rock");
                    socket.emit("Emit option", room, "rock");
                    setSelected(true);
                    setPlayAgain(0);
                  }}
                />
              </div>
            </>
          )}
          {selected && (
            <div className="w-full h-full flex">
              <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                <p>YOU PICKED</p>
                {renderIcon(optionUser)}
              </div>
              <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                {result != null && (
                  <>
                    <p className="text-4xl font-BarlowBlod">
                      {resultText(result)}
                    </p>
                    <button
                      className="text-red-500 bg-white px-10 py-2 rounded-lg font-BarlowBlod"
                      onClick={() => {
                        setPlayAgain((playAgain) => playAgain + 1);
                        socket.emit("Play again", room, 1);
                        setResult(null);
                      }}
                      disabled={buttomDisable}
                    >
                      PLAY AGAIN
                    </button>
                  </>
                )}
              </div>
              <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                <p>THE HOUSE PICKED</p>
                {!opponentComputer && (
                  <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
                    {" "}
                  </div>
                )}
                {opponentComputer && renderIcon(opponentComputer)}
              </div>
            </div>
          )}
        </section>
        <footer className="flex justify-between w-full px-12">
          <Link to="/" className="px-8 py-2 border-white border-2 rounded-xl">
            Menu
          </Link>
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
      </main>
    </>
  );
}

export default GameRoom;
