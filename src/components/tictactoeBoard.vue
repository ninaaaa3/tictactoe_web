<template>
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
  
</template>

<script setup>
import tictactoeSquare from "./tictactoeSquare.vue";
import { ref } from 'vue';

const squares = ref(Array(9).fill(" "))

let currentPlayer = ref("X")

function handleClick(index) {
  if (squares.value[index] === ' ') {
    squares.value[index] = currentPlayer.value;
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
    review();
  }
}

const win = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function review() {
  for (let i = 0; i < win.length; i++) {
    if (squares.value[win[i][0]] != " " && squares.value[win[i][1]] != " " && squares.value[win[i][2]] != " ") {
      if (squares.value[win[i][0]] === squares.value[win[i][1]] && squares.value[win[i][1]] === squares.value[win[i][2]]) {
        return "Ganó: " + squares.value[win[i][0]];
      }
      else {
        return "";
      }
    }
  }
}
</script>

<style>
.row {
  display: flex;
  direction: ltr;
}
</style>