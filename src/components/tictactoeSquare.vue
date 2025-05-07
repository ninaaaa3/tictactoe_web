<template>
  <button :style="buttonStyle" @click="props.handleClick">{{ props.value }}</button>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  value: String,
  bottom: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  handleClick: {
    type: Function,
    required: true
  }
})

// Computed style based on border props
const buttonStyle = computed(() => ({
  borderBottom: props.bottom ? '1px solid black' : '1px solid transparent',
  borderRight: props.right ? '1px solid black' : '1px solid transparent',
}))
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; /* asegúrate de que sea consistente */
  line-height: 1; /* importante para evitar salto vertical */
  padding: 0;
  margin: 0;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid transparent;
}

</style>