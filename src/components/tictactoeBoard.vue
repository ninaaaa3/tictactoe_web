<template>
  <select name="mode" id="mode" v-model="mode">
    <option value="easy">Fácil</option>
    <option value="medium">Medio</option>
    <option value="impossible">Imposible</option>
    <option value="PVP">PVP</option>
  </select>
  <h1>Current player: {{ currentPlayer }}</h1>
  <div class="board">
    <div class="row">
      <tictactoeSquare :key="1" :value="squares[0]" :handleClick="() => handleClick(0)" bottom right />
      <tictactoeSquare :key="2" :value="squares[1]" :handleClick="() => handleClick(1)" bottom right />
      <tictactoeSquare :key="3" :value="squares[2]" :handleClick="() => handleClick(2)" bottom />
    </div>
    <div class="row">
      <tictactoeSquare :key="4" :value="squares[3]" :handleClick="() => handleClick(3)" bottom right />
      <tictactoeSquare :key="5" :value="squares[4]" :handleClick="() => handleClick(4)" bottom right />
      <tictactoeSquare :key="6" :value="squares[5]" :handleClick="() => handleClick(5)" bottom />
    </div>
    <div class="row">
      <tictactoeSquare :key="7" :value="squares[6]" :handleClick="() => handleClick(6)" right />
      <tictactoeSquare :key="8" :value="squares[7]" :handleClick="() => handleClick(7)" right />
      <tictactoeSquare :key="9" :value="squares[8]" :handleClick="() => handleClick(8)" />
    </div>
  </div>
  <h1>{{ gameEnd }}</h1>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import tictactoeSquare from "./tictactoeSquare.vue";
import easy from "../composables/easy.js";
import PVP from "../composables/PVP.js";

const mode = ref("easy");

let game = ref(easy());

watch(mode, (newMode) => {
  if (newMode === "easy") game.value = easy();
  else if (newMode === "PVP") game.value = PVP();
});

const squares = computed(() => game.value.squares);
const currentPlayer = computed(() => game.value.currentPlayer);
const gameEnd = computed(() => game.value.gameEnd);
const handleClick = (...args) => game.value.handleClick(...args);
</script>


<style>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  direction: ltr;
}
</style>