import Header from "../components/Header";
import GameMenu from "../components/GameMenu";
import { useState, useEffect } from "react";
import renderIcon from "../func/renderIcon";
import PlayGame from "../func/PlayGame";
import resultText from "../func/resultText";
import Footer from "../components/Footer";
function SinglePlayer() {
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [option, setOption] = useState("");
  const [optionComputer, setOptionComputer] = useState("");
  const [result, setResult] = useState(null);
  const [mobileSection, setMobileSection] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobileSection(false);
    }
  }, []);
  useEffect(() => {
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
    }, 1000);
  };
  return (
    <>
      {" "}
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center min-w-screen font-BarlowRegular text-white ">
        <Header score={score} />
        <section className="lg:w-[50%] mobile:w-full h-[75%] flex flex-col items-center justify-center">
          {!selected && (
            <GameMenu
              paper={() => {
                handleOption("paper");
                setSelected(true);
              }}
              scissors={() => {
                handleOption("scissor");
                setSelected(true);
              }}
              rock={() => {
                handleOption("rock");
                setSelected(true);
              }}
            />
          )}
          {selected && (
            <div className="w-full h-full flex mobile:flex-col mobile:items-center mobile:justify-center">
              {mobileSection ? (
                <>
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
                      <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
                        {" "}
                      </div>
                    )}
                    {optionComputer && renderIcon(optionComputer)}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full justify-center items-center gap-x-20">
                    <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                      <p>YOU PICKED</p>
                      {renderIcon(option)}
                    </div>

                    <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
                      <p>THE HOUSE PICKED</p>
                      {!optionComputer && (
                        <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
                          {" "}
                        </div>
                      )}
                      {optionComputer && renderIcon(optionComputer)}
                    </div>
                  </div>
                  <div className="w-full h-[30%] flex flex-col items-center justify-center gap-y-5">
                    {result != null && (
                      <>
                        <p className="text-7xl font-BarlowBlod">
                          {resultText(result)}
                        </p>
                        <button
                          className="text-red-500 bg-white px-20 py-4 rounded-lg font-BarlowBlod"
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
                </>
              )}
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default SinglePlayer;
