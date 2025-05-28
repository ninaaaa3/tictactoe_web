import { ref } from 'vue';

// -----------------------------------------------------------------------------
// Composable para el modo PVP (Jugador vs Jugador).
// Administra el estado del tablero, turnos, condición de victoria y reinicio.
// -----------------------------------------------------------------------------


export default function PVP() {
  /* ───────────────────────────  ESTADO  ─────────────────────────── */
  const squares = ref(Array(9).fill(" "));
  const currentPlayer = ref("X");
  const gameContinue = ref(true);
  const gameEnd = ref("");
  const winningLine = ref(null)


  // Todas las líneas ganadoras pre-calculadas.
  const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];

  // -------------------------------------------------------
  // Maneja el evento de clic en una casilla.
  // Marca la jugada del jugador actual y cambia el turno.
  // -------------------------------------------------------
  function handleClick(index) {
    if (gameContinue.value && squares.value[index] === ' ') {
      squares.value[index] = currentPlayer.value;
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
      review(); // Revisa si hay ganador o empate
    }
  }

  // -------------------------------------------------------
  // Revisa el estado del tablero después de cada jugada.
  // Determina si hay un ganador o si el juego terminó en empate.
  // -------------------------------------------------------
  function review() {
    for (let [a, b, c] of win) {
      if (squares.value[a] !== " " &&
        squares.value[a] === squares.value[b] &&
        squares.value[b] === squares.value[c]) {
        gameEnd.value = "Ganó: " + squares.value[a];
        gameContinue.value = false;
        winningLine.value = [a, b, c] // Guarda la línea ganadora
        return;
      }
    }
    // Si no quedan espacios y nadie ganó → empate
    if (!squares.value.includes(" ")) {
      gameEnd.value = "Empate";
      gameContinue.value = false;
    }
  }
  // -------------------------------------------------
  // Reinicia el estado del juego a su estado inicial.
  // -------------------------------------------------
  function resetGame() {
    squares.value = Array(9).fill(" ")
    currentPlayer.value = "X"
    gameContinue.value = true
    gameEnd.value = ""
    winningLine.value = null
  }

  // Retorna propiedades y funciones para usar en el componente
  return {
    squares,
    currentPlayer,
    gameContinue,
    gameEnd,
    winningLine,
    handleClick,
    resetGame
  };
}
