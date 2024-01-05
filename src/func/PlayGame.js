export default function PlayGame(jugador1, jugador2) {
  if (jugador1 === jugador2) {
    return 2; //empate
  } else if (
    (jugador1 === "rock" && jugador2 === "scissor") ||
    (jugador1 === "paper" && jugador2 === "rock") ||
    (jugador1 === "scissor" && jugador2 === "paper")
  ) {
    return 0; //gana el jugador 1
  } else {
    return 1; //gana el jugador 2
  }
}
