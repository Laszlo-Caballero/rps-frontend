import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import GameMenu from "../../components/GameMenu";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import useGameMultiplayer from "../../hooks/useGameMultiplayer";
import { ShowOption, ShowOptionMobile } from "../../components/showOptions";
function GameRoom() {
  let { room } = useParams();
  const [mobileSection, setMobileSection] = useState(true);
  const {
    players,
    selected,
    score,
    optionUser,
    optionOpponet,
    result,
    EmitPaper,
    EmitRock,
    EmitScissors,
    EmitPlayAgain,
  } = useGameMultiplayer(room);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setMobileSection(false);
    }
  }, []);
  return (
    <>
      {players <= 1 && (
        <div className="h-screen w-screen z-10 flexx absolute bg-opacity-50 bg-black flex items-center justify-center">
          <p className="text-white font-BarlowBlod text-6xl">Find Oponet</p>
        </div>
      )}
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center min-w-screen font-BarlowRegular text-white">
        <Header score={score} />
        <section className="mobile:w-full lg:w-1/2 h-[75%] flex flex-col items-center justify-center">
          {!selected ? (
            <GameMenu
              paper={EmitPaper}
              scissors={EmitScissors}
              rock={EmitRock}
            />
          ) : !mobileSection ? (
            <ShowOption
              option={optionUser}
              optionOpponet={optionOpponet}
              result={result}
              playAgain={EmitPlayAgain}
            />
          ) : (
            <ShowOptionMobile
              option={optionUser}
              optionOpponet={optionOpponet}
              result={result}
              playAgain={EmitPlayAgain}
            />
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default GameRoom;
