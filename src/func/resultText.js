export default function resultText(result) {
  switch (result) {
    case 0:
      return "YOU WIN";
    case 1:
      return "YOU LOSE";
    case 2:
      return "TIE";
  }
}
