// -----------------------------------------------------------------------------
// src/composables/minimax.js
// IA de Tic-Tac-Toe con Minimax, profundidad variable y desempate aleatorio.
//
//  - maxDepth <= 2 → se comporta “muy tonto”: juega 100 % al azar.
//  - 2 < maxDepth < 9 → busca la mejor jugada pero aleatoriza los empates
//                       (así Medio y Difícil no siempre abren igual).
//  - maxDepth >= 9 → árbol completo, juego perfecto y determinista.
// -----------------------------------------------------------------------------
import { ref } from "vue";

export default function useMinimax(maxDepth = 9) {
  /* ───────────────────────────  ESTADO  ─────────────────────────── */
  const squares       = ref(Array(9).fill(" "));
  const currentPlayer = ref("X");       // el Humano empieza
  const gameContinue  = ref(true);
  const gameEnd       = ref("");

  // Todas las líneas ganadoras pre-calculadas.
  const win = [
    [0,1,2], [3,4,5], [6,7,8],   // filas
    [0,3,6], [1,4,7], [2,5,8],   // columnas
    [0,4,8], [2,4,6]             // diagonales
  ];

  /* ─────────────────────  INTERACCIÓN DEL HUMANO ─────────────────── */
  function handleClick(idx) {
    if (!gameContinue.value || squares.value[idx] !== " ") return;

    squares.value[idx] = "X";
    revisarEstado();

    if (gameContinue.value) {
      currentPlayer.value = "O";
      setTimeout(cpuMove, 200);      // delay para que “piense”
    }
  }

  /* ──────────────────────────  TURNO CPU  ────────────────────────── */
  function cpuMove() {
    /* 1. Obtiene la(s) mejor(es) jugada(s) vía minimax */
    const {moves } = minimax(
      squares.value,
      "O",
      0,
      maxDepth
    );

    /* 2. Decide cómo desempatar según la profundidad (= dificultad) */
    let idxSeleccionado;

    if (maxDepth <= 2) {
      // ★ Fácil → TOTALMENTE al azar entre TODAS las casillas vacías
      const vacías = moves; // aquí moves == casillas libres
      idxSeleccionado = vacías[Math.floor(Math.random() * vacías.length)];

    } else if (maxDepth < 9) {
      // ★ Medio / Difícil → azar SOLO entre los “óptimos”
      idxSeleccionado = moves[Math.floor(Math.random() * moves.length)];

    } else {
      // ★ Imposible → determinista (siempre la primera óptima)
      idxSeleccionado = moves[0];
    }

    /* 3. Ejecuta la jugada y revisa el estado */
    squares.value[idxSeleccionado] = "O";
    revisarEstado();
    if (gameContinue.value) currentPlayer.value = "X";
  }

  /* ─────────────────────  ALGORITMO MINIMAX  ─────────────────────── */
  function minimax(board, player, depth, limit) {
    // a) ¿Partida terminada o profundidad límite?
    const outcome = evaluar(board);
    if (outcome !== null || depth === limit) {
      return { bestScore: puntaje(outcome, depth), moves: libres(board) };
    }

    // b) Inicialización del mejor puntaje según quién juega
    let bestScore = player === "O" ? -Infinity : Infinity;
    let bestMoves = [];               // ← Lista de todas las mejores casillas

    // c) Recorremos cada casilla libre
    for (const idx of libres(board)) {
      const clone = [...board];
      clone[idx]  = player;

      const { bestScore: scoreHijo } = minimax(
        clone,
        player === "O" ? "X" : "O",
        depth + 1,
        limit
      );

      if (player === "O") {                 // CPU maximiza
        if (scoreHijo > bestScore) {
          bestScore = scoreHijo;
          bestMoves = [idx];                // nueva mejor jugada
        } else if (scoreHijo === bestScore) {
          bestMoves.push(idx);              // empate → la añadimos
        }
      } else {                              // Humano minimiza
        if (scoreHijo < bestScore) {
          bestScore = scoreHijo;
          bestMoves = [idx];
        } else if (scoreHijo === bestScore) {
          bestMoves.push(idx);
        }
      }
    }
    return { bestScore, moves: bestMoves };
  }

  /* ───────────────  FUNCIONES AUXILIARES  ─────────────── */
  function libres(brd) {
    // Devuelve array con índices vacíos
    return brd.reduce((a, v, i) => (v === " " ? a.concat(i) : a), []);
  }

  function evaluar(brd) {
    // 'X' gana, 'O' gana, 'draw', o null (sigue).
    for (const [a,b,c] of win)
      if (brd[a] !== " " && brd[a] === brd[b] && brd[b] === brd[c])
        return brd[a];
    return brd.includes(" ") ? null : "draw";
  }

  function puntaje(outcome, depth) {
    if (outcome === "O")   return  10 - depth; // CPU gana
    if (outcome === "X")   return -10 + depth; // Humano gana
    return 0;                                  // Empate o límite
  }

  function revisarEstado() {
    const res = evaluar(squares.value);
    if (res === null) return;
    gameContinue.value = false;
    gameEnd.value = res === "draw" ? "Empate" : `Ganó: ${res}`;
  }

  /* ───────────────────  EXPONEMOS A LA UI  ─────────────────── */
  return { squares, currentPlayer, gameEnd, handleClick };
}
