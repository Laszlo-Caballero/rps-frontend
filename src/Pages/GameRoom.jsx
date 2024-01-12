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
  const [socket, setSocket] = useState(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [optionUser, setOptionUser] = useState("");
  const [optionOpponet, setOptionOpponet] = useState("");
  const [result, setResult] = useState(null);
  const [playAgain, setPlayAgain] = useState(0);
  const [buttomDisable, setButtomDisable] = useState(false);
  const [players, setPlayers] = useState(0);
  useEffect(() => {
    const newSocket = io("http://192.168.1.46:4000");
    setSocket(newSocket);

    newSocket.emit("Create room", room);

    window.addEventListener("beforeunload", () => {
      newSocket.emit("leave room", room);
    });

    newSocket.on("Turn Opponent", (option) => {
      console.log(option);
      setOptionOpponet(option);
    });
    newSocket.on("players", (cantPlayers) => {
      console.log(cantPlayers);
      setPlayers(cantPlayers);
    });
    return () => {
      newSocket.emit("leave room", room);
    };
  }, [room]);

  useEffect(() => {
    if (optionOpponet != "" && optionUser != "") {
      const resultGame = PlayGame(optionUser, optionOpponet);
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
  }, [optionOpponet, optionUser]);
  useEffect(() => {
    if (playAgain == 2) {
      setSelected(false);
      setButtomDisable(false);
      setOptionUser("");
      setOptionOpponet("");
    }
  }, [playAgain]);
  return (
    <>
      {players <= 1 && (
        <div className="h-screen w-screen z-10 flexx absolute bg-opacity-50 bg-black flex items-center justify-center">
          <p className="text-white font-BarlowBlod text-6xl">Find Oponet</p>
        </div>
      )}
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center min-w-screen font-BarlowRegular text-white">
        <Header score={score} />
        <section className="w-[50%] h-[75%] flex flex-col items-center justify-center">
          {!selected && (
            <GameMenu
              paper={() => {
                setOptionUser("paper");
                socket.emit("Option", room, "paper");
                setSelected(true);
              }}
              scissors={() => {
                socket.emit("Option", room, "scissor");
                setOptionUser("scissor");
                setSelected(true);
              }}
              rock={() => {
                socket.emit("Option", room, "rock");
                setOptionUser("rock");
                setSelected(true);
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
                        socket.emit("Play again", room);
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
                {optionOpponet == "" ? (
                  <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
                    {" "}
                  </div>
                ) : (
                  renderIcon(optionOpponet)
                )}
              </div>
            </div>
          )}
        </section>
        <Footer
          onClick={() => {
            setOptionUser("");
            setOptionOpponet("");
          }}
        />
      </main>
    </>
  );
}

export default GameRoom;
