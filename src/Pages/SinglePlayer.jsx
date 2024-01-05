import Logo from "./../images/logo.svg?react";
import Rock from "./../images/icon-rock.svg?react";
import Paper from "./../images/icon-paper.svg?react";
import Scissors from "./../images/icon-scissors.svg?react";
import Option from "../components/Option";
import { useState, useEffect } from "react";
import ModalRules from "../components/modal";
import renderIcon from "../func/renderIcon";
import PlayGame from "../func/PlayGame";
import resultText from "../func/resultText";
import { Link } from "react-router-dom";
function SinglePlayer() {
  const [modal, setModal] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [option, setOption] = useState("");
  const [optionComputer, setOptionComputer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Comparar opciones después de que optionComputer se establece
    if (optionComputer) {
      const resultGame = PlayGame(option, optionComputer);
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
  }, [optionComputer, option]);

  const handleOption = (selectOption) => {
    setOption(selectOption);
    setTimeout(() => {
      const rps = ["paper", "rock", "scissor"];
      setOptionComputer(rps[Math.floor(Math.random() * 3)]);
    }, 2000);
  };
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
                    handleOption("paper");
                    setSelected(true);
                  }}
                />
                <Option
                  colorClass="from-ScissorGradientT to-ScissorGradientB"
                  element={<Scissors />}
                  onClick={() => {
                    handleOption("scissor");
                    setSelected(true);
                  }}
                />
              </div>
              <div className="mt-12">
                <Option
                  colorClass="from-RockGradientT to-RockGradientB"
                  element={<Rock />}
                  onClick={() => {
                    handleOption("rock");
                    setSelected(true);
                  }}
                />
              </div>
            </>
          )}
          {selected && (
            <div className="w-full h-full flex">
              <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                <p>YOU PICKED</p>
                {renderIcon(option)}
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
                        setSelected(false);
                        setOptionComputer("");
                        setResult(null);
                      }}
                    >
                      PLAY AGAIN
                    </button>
                  </>
                )}
              </div>
              <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                <p>THE HOUSE PICKED</p>
                {!optionComputer && (
                  <div className="bg-black bg-opacity-20 w-[70%] h-[22%] rounded-full">
                    {" "}
                  </div>
                )}
                {optionComputer && renderIcon(optionComputer)}
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

export default SinglePlayer;
