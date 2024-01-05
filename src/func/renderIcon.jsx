import Rock from "./../images/icon-rock.svg?react";
import Paper from "./../images/icon-paper.svg?react";
import Scissors from "./../images/icon-scissors.svg?react";
import Option from "../components/Option";
export default function renderIcon(state) {
  switch (state) {
    case "paper":
      return (
        <Option
          colorClass="from-PaperGradientT to-PaperGradientB"
          element={<Paper />}
        />
      );
    case "rock":
      return (
        <Option
          colorClass="from-RockGradientT to-RockGradientB"
          element={<Rock />}
        />
      );
    case "scissor":
      return (
        <Option
          colorClass="from-ScissorGradientT to-ScissorGradientB"
          element={<Scissors />}
        />
      );
  }
}
