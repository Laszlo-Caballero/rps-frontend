import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";
import GameMenu from "../components/GameMenu";
import renderIcon from "../func/renderIcon";
import PlayGame from "../func/PlayGame";
import resultText from "../func/resultText";
import Footer from "../components/Footer";
function GameRoom() {
  let { room } = useParams();
  const socket = io("http://192.168.1.46:4000");
  socket.emit("Create room", room);

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
        <Header score={score} />
        <section className="w-[50%] h-[75%] flex flex-col items-center justify-center">
          {!selected && (
            <GameMenu
              paper={() => {
                setOptionUser("paper");
                socket.emit("Emit option", room, "paper");
                setSelected(true);
                setPlayAgain(0);
              }}
              scissors={() => {
                setOptionUser("scissor");
                socket.emit("Emit option", room, "scissor");
                setSelected(true);
                setPlayAgain(0);
              }}
              rock={() => {
                setOptionUser("rock");
                socket.emit("Emit option", room, "rock");
                setSelected(true);
                setPlayAgain(0);
              }}
            />
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
        <Footer />
      </main>
    </>
  );
}

export default GameRoom;
