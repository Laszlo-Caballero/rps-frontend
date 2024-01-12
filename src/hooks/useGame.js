import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PlayGame from "../func/PlayGame";

function useGameMultiplayer(room) {
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

  const EmitPaper = () => {
    setOptionUser("paper");
    socket.emit("Option", room, "paper");
    setSelected(true);
  };
  const EmitRock = () => {
    socket.emit("Option", room, "rock");
    setOptionUser("rock");
    setSelected(true);
  };
  const EmitScissors = () => {
    socket.emit("Option", room, "scissor");
    setOptionUser("scissor");
    setSelected(true);
  };
  const EmitPlayAgain = () => {
    setPlayAgain((playAgain) => playAgain + 1);
    socket.emit("Play again", room);
    setResult(null);
  };

  return {
    score,
    selected,
    optionUser,
    optionOpponet,
    result,
    buttomDisable,
    players,
    EmitPaper,
    EmitRock,
    EmitScissors,
    EmitPlayAgain,
  };
}

export default useGameMultiplayer;
