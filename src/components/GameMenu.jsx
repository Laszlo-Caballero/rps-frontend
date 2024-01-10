import Option from "./Option";
import Rock from "./../images/icon-rock.svg?react";
import Paper from "./../images/icon-paper.svg?react";
import Scissors from "./../images/icon-scissors.svg?react";
function GameMenu({ paper, scissors, rock }) {
  return (
    <>
      <div className="flex w-auto lg:gap-20 mobile:gap-8">
        <Option
          colorClass="from-PaperGradientT to-PaperGradientB"
          element={<Paper />}
          onClick={paper}
        />
        <Option
          colorClass="from-ScissorGradientT to-ScissorGradientB"
          element={<Scissors />}
          onClick={scissors}
        />
      </div>
      <div className="mt-12">
        <Option
          colorClass="from-RockGradientT to-RockGradientB"
          element={<Rock />}
          onClick={rock}
        />
      </div>
    </>
  );
}

export default GameMenu;
