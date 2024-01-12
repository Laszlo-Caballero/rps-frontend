import { useParams } from "react-router-dom";
import Header from "../components/Header";
import GameMenu from "../components/GameMenu";
import renderIcon from "../func/renderIcon";
import resultText from "../func/resultText";
import Footer from "../components/Footer";
import useGameMultiplayer from "../hooks/useGame";
function GameRoom() {
  let { room } = useParams();
  const {
    players,
    selected,
    score,
    optionUser,
    optionOpponet,
    result,
    buttomDisable,
    EmitPaper,
    EmitRock,
    EmitScissors,
    EmitPlayAgain,
  } = useGameMultiplayer(room);
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
              paper={EmitPaper}
              scissors={EmitScissors}
              rock={EmitRock}
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
                      onClick={EmitPlayAgain}
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
        <Footer />
      </main>
    </>
  );
}

export default GameRoom;
