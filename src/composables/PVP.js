import { ref } from 'vue';

export default function PVP() {
  const squares = ref(Array(9).fill(" "));
  const currentPlayer = ref("X");
  const gameContinue = ref(true);
  const gameEnd = ref("");

  const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function handleClick(index) {
    if (gameContinue.value && squares.value[index] === ' ') {
      squares.value[index] = currentPlayer.value;
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
      review();
    }
  }

  function review() {
    for (let [a, b, c] of win) {
      if (squares.value[a] !== " " &&
          squares.value[a] === squares.value[b] &&
          squares.value[b] === squares.value[c]) {
        gameEnd.value = "Ganó: " + squares.value[a];
        gameContinue.value = false;
        return;
      }
    }
    if (!squares.value.includes(" ")) {
      gameEnd.value = "Empate";
      gameContinue.value = false;
    }
  }

  return {
    squares,
    currentPlayer,
    gameContinue,
    gameEnd,
    handleClick
  };
}
