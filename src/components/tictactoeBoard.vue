<script setup>
/* 1) Imports ---------------------------------------------------------- */
import { ref, computed, watch } from "vue"
import tictactoeSquare from "./tictactoeSquare.vue"

import useMinimax from "../composables/minimax.js"
import PVP        from "../composables/PVP.js"

/* 2) Mapeo de profundidades ------------------------------------------- */
const DEPTH = {
  easy:        1,
  medium:      4,
  hard:        6,
  impossible:  9
}

/* 3) Estado reactivo inicial ------------------------------------------ */
const mode = ref("easy")
const game = ref(useMinimax(DEPTH[mode.value]))

/* 4) Reactivar juego cada vez que cambia el modo ---------------------- */
watch(mode, (m) => {
  game.value = (m === "pvp")
    ? PVP()
    : useMinimax(DEPTH[m])
})

/* 5) Exponer datos a la plantilla ------------------------------------- */
const squares       = computed(() => game.value.squares)
const currentPlayer = computed(() => game.value.currentPlayer)
const gameEnd       = computed(() => game.value.gameEnd)
const handleClick   = (...a) => game.value.handleClick(...a)
</script>

<template>
  <!-- Selector de dificultad -->
  <select id="mode" v-model="mode">
    <option value="easy">Fácil</option>
    <option value="medium">Medio</option>
    <option value="hard">Difícil</option>
    <option value="impossible">Imposible</option>
    <option value="pvp">PvP</option>
  </select>

  <h1>Turno actual: {{ currentPlayer }}</h1>

  <!-- Tablero -->
  <div class="board">
    <div class="row" v-for="r in 3" :key="`r${r}`">
      <tictactoeSquare
        v-for="c in 3"
        :key="`c${r}${c}`"
        :value="squares[(r-1)*3 + (c-1)]"
        :handleClick="() => handleClick((r-1)*3 + (c-1))"
        :bottom="r < 3"
        :right="c < 3"
      />
    </div>
  </div>

  <h1>{{ gameEnd }}</h1>
</template>

<style scoped>
.board { display:flex; flex-direction:column; align-items:center; }
.row   { display:flex; direction:ltr; }
</style>
