import Header from "../components/Header";
import GameMenu from "../components/GameMenu";
import { useState, useEffect } from "react";
import { ShowOption, ShowOptionMobile } from "../components/showOptions";
import Footer from "../components/Footer";
import useGameSinglePlayer from "../hooks/useGameSingleplayer";
function SinglePlayer() {
  const [mobileSection, setMobileSection] = useState(true);
  const {
    score,
    selected,
    option,
    optionComputer,
    result,
    paper,
    scissors,
    rock,
    playAgain,
  } = useGameSinglePlayer();
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setMobileSection(false);
    }
  }, []);

  return (
    <>
      {" "}
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center min-w-screen font-BarlowRegular text-white ">
        <Header score={score} />
        <section className="lg:w-[50%] mobile:w-full h-[75%] flex flex-col items-center justify-center">
          {!selected ? (
            <GameMenu paper={paper} scissors={scissors} rock={rock} />
          ) : !mobileSection ? (
            <ShowOption
              option={option}
              optionOpponet={optionComputer}
              result={result}
              playAgain={playAgain}
            />
          ) : (
            <ShowOptionMobile
              option={option}
              optionOpponet={optionComputer}
              result={result}
              playAgain={playAgain}
            />
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default SinglePlayer;
