<template>
    <div class="game-container">
        <h2>😼 Tic Tac Toe 🐱</h2>

        <div class="controls">
            <select v-model="mode" @change="resetGame" class="mode-select">
                <option value="pvp">👥 PVP</option>
                <option value="pvc">👥 PVC</option>
            </select>
            <div v-if="mode === 'pvc'">
              <select v-model="difficulty" @change="resetGame" class="mode-select">
                  <option value="easy">🐵 Fácil</option>
                  <option value="medium">🤖 Medio</option>
                  <option value="hard">🧠 Difícil</option>
                  <option value="impossible">💀 Imposible</option>
              </select>
            </div>
            <button @click="resetGame" class="reset-btn">
                🔄 Nuevo Juego
            </button>
        </div>

        <div v-if="gameContinue">
            <div class="game-info">
                <div class="current-player">
                    {{ mode === 'pvp' ? `Turno: ${currentPlayer}` : (currentPlayer === 'X' ? 'Tu turno' :
                    'CPUpensando...')}}
                </div>
            </div>
        </div>

        <div v-else>
            <div class="game-info">
                <div class="current-player">
                    {{ gameEnd }}
                </div>
            </div>
        </div>
        <canvas ref="gameCanvas" width="360" height="360" @click="handleCanvasClick"
            class="game-canvas"></canvas>
    </div>
</template>

<script setup>
/* 1) Imports ---------------------------------------------------------- */
// Composables del modo de juego: Minimax (CPU) y PVP (jugador vs jugador)
import { ref, onMounted, watch, computed } from 'vue'
import useMinimax from "../composables/minimax.js"
import PVP from "../composables/PVP.js"

/* 2) Profundidades del algoritmo por dificultad ---------------------- */
const DEPTH = {
    easy: 1,
    medium: 4,
    hard: 6,
    impossible: 9
}

/* 3) Estado reactivo inicial ------------------------------------------ */
// Modo de juego actual y lógica asociada (Minimax o PVP)
const mode = ref("pvc")
const difficulty = ref("easy")
const game = ref(useMinimax(DEPTH[difficulty.value]))

/* 4) Reactivar lógica al cambiar el modo ------------------------------ */
// Reinicia el composable correspondiente según el nuevo modo
watch([mode, difficulty], ([m, d]) => {
    game.value = (m === "pvp")
        ? PVP()
        : useMinimax(DEPTH[d])
})

/* 5) Mapeo de propiedades del juego ----------------------------------- */
// Computed para exponer estados del juego y funciones a la plantilla
const squares = computed(() => game.value.squares)
const currentPlayer = computed(() => game.value.currentPlayer)
const gameContinue = computed(() => game.value.gameContinue)
const gameEnd = computed(() => game.value.gameEnd)
const winningLine = computed(() => game.value.winningLine)
const handleClick = (...a) => game.value.handleClick(...a)
const resetGame = () => game.value.resetGame()


/* 6) Referencia al canvas --------------------------------------------- */
const gameCanvas = ref(null)
let ctx = null

/* 7) Inicialización del canvas ---------------------------------------- */
// Se configura el contexto 2D y se dibuja el tablero al montar
onMounted(() => {
  ctx = gameCanvas.value.getContext('2d')
  drawBoard()
})

/* 8) Dibujo del tablero ------------------------------------------------ */
// Función principal que organiza el render del tablero
const drawBoard = () => {
  if (!ctx) return

  // Limpiar canvas
  ctx.clearRect(0, 0, 360, 360)

  // Configurar estilo de líneas del tablero
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'

  // Dibujar líneas del tablero
  drawGridLines()

  // Dibujar X y O
  drawSymbols()

  // Dibujar línea ganadora si existe
  if (winningLine.value) {
    drawWinningLine()
  }
}

// Dibujar líneas de la cuadrícula
const drawGridLines = () => {
  ctx.beginPath()
  // Líneas verticales
  ctx.moveTo(120, 20)
  ctx.lineTo(120, 340)
  ctx.moveTo(240, 20)
  ctx.lineTo(240, 340)
  // Líneas horizontales
  ctx.moveTo(20, 120)
  ctx.lineTo(340, 120)
  ctx.moveTo(20, 240)
  ctx.lineTo(340, 240)
  ctx.stroke()
}

// Recorre las casillas y dibuja X u O si corresponde
const drawSymbols = () => {
  squares.value.forEach((symbol, index) => {
    if (symbol !== " ") {
      const position = getSquareCenter(index);
      if (symbol === 'X') {
        drawX(position.x, position.y)
      } else if (symbol === 'O') {
        drawO(position.x, position.y)
      }
    }
  })
}

// Dibuja una X en la posición dada
const drawX = (x, y) => {
  ctx.strokeStyle = '#ff6b6b'
  ctx.lineWidth = 8
  ctx.lineCap = 'round'

  ctx.beginPath()
  ctx.moveTo(x - 30, y - 30)
  ctx.lineTo(x + 30, y + 30)
  ctx.moveTo(x + 30, y - 30)
  ctx.lineTo(x - 30, y + 30)
  ctx.stroke()
}

// Dibuja una O en la posición dada
const drawO = (x, y) => {
  ctx.strokeStyle = '#4ecdc4'
  ctx.lineWidth = 8

  ctx.beginPath()
  ctx.arc(x, y, 35, 0, 2 * Math.PI)
  ctx.stroke()
}

// Dibujar línea ganadora
const drawWinningLine = () => {
  const pattern = winningLine.value
  if (!pattern) return

  ctx.strokeStyle = '#ffd700'
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.shadowColor = '#ffd700'
  ctx.shadowBlur = 10

  const [start, , end] = pattern
  const startPos = getSquareCenter(start)
  const endPos = getSquareCenter(end)

  ctx.beginPath()
  ctx.moveTo(startPos.x, startPos.y)
  ctx.lineTo(endPos.x, endPos.y)
  ctx.stroke()

  // Limpia efectos de sombra después del trazo
  ctx.shadowBlur = 0
}

// Calcula el centro de una casilla dada su posición en el array
const getSquareCenter = (index) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  return {
    x: col * 120 + 60,
    y: row * 120 + 60
  }
}


/* 9) Interacción con el tablero --------------------------------------- */
// Maneja el click sobre el canvas y determina qué casilla fue seleccionada
const handleCanvasClick = (event) => {
  if (!gameContinue.value) return

  const rect = gameCanvas.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Convertir coordenadas a índice de casilla
  const col = Math.floor((x - 20) / 120)
  const row = Math.floor((y - 20) / 120)
  const index = row * 3 + col

  // Verificar si el click está dentro del tablero y la casilla está vacía
  if (col >= 0 && col < 3 && row >= 0 && row < 3 && squares.value[index] === ' ') {
    handleClick(index)
  }
}

/* 10) Redibujar en cada cambio del estado del juego ------------------- */
watch([squares, currentPlayer, gameContinue, gameEnd], () => {
    drawBoard()
}, { deep: true })
</script>

<style scoped>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 90vh;
    color: white;
    font-family: Arial, sans-serif;
}

h1 {
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 2.5rem;
}

.game-canvas {
    border: 4px solid #fff;
    border-radius: 10px;
    background: #f8f9fa;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.game-canvas:hover {
    transform: scale(1.02);
}

.game-info {
    margin: 20px 0;
    background: white;
    padding: 15px 30px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.current-player {
    font-size: 1.3rem;
    color: #333;
    font-weight: 600;
}

.game-result {
    color: #ff6b6b;
    font-size: 28px;
    margin: 15px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
}

.controls {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    align-items: center;
    flex-wrap: wrap;
}

.mode-select {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 25px;
    border: 2px solid white;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
}

.mode-select:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.reset-btn {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 25px;
    border: none;
    background: linear-gradient(45deg, #ff6b6b, #ffa500);
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.reset-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
</style>