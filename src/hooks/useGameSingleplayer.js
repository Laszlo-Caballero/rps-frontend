import { useState, useEffect } from "react";
import PlayGame from "../func/PlayGame";
function useGameSinglePlayer() {
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [option, setOption] = useState("");
  const [optionComputer, setOptionComputer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (optionComputer) {
      const resultGame = PlayGame(option, optionComputer);
      setResult(resultGame);
      switch (resultGame) {
        case 0:
          setScore((score) => score + 1);
          break;
        case 1:
          if (score > 0) setScore((score) => score - 1);
          break;
        default:
          break;
      }
    }
  }, [optionComputer, option]);

  const handleOption = (selectOption) => {
    setOption(selectOption);
    setTimeout(() => {
      const rps = ["paper", "rock", "scissor"];
      setOptionComputer(rps[Math.floor(Math.random() * 3)]);
    }, 1000);
  };

  const paper = () => {
    handleOption("paper");
    setSelected(true);
  };
  const scissors = () => {
    handleOption("scissor");
    setSelected(true);
  };
  const rock = () => {
    handleOption("rock");
    setSelected(true);
  };
  const playAgain = () => {
    setSelected(false);
    setOptionComputer("");
    setResult(null);
  };
  return {
    score,
    selected,
    option,
    optionComputer,
    result,
    paper,
    scissors,
    rock,
    playAgain,
  };
}

export default useGameSinglePlayer;
