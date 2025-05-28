import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import tictactoeBoard from './tictactoeBoard.vue'

describe('tictactoeBoard', () => {
  it('inicia en modo easy y permite hacer jugadas', async () => {
    const wrapper = mount(tictactoeBoard)
    // El tablero debe iniciar vacío y turno X
    expect(wrapper.html()).toContain('Turno actual: X')
    // Busca todos los cuadrados del tablero
    const squares = wrapper.findAllComponents({ name: 'tictactoeSquare' })
    // Haz click en la primera casilla
    await squares[0].vm.handleClick()
    expect(wrapper.html()).toContain('Turno actual: O')
  })

  it('puede alternar a modo PvP y ambos pueden jugar', async () => {
    const wrapper = mount(tictactoeBoard)
    const select = wrapper.find('select')
    await select.setValue('pvp')
    expect(wrapper.html()).toContain('Turno actual: X')
    // Busca los cuadrados
    let squares = wrapper.findAllComponents({ name: 'tictactoeSquare' })
    await squares[0].vm.handleClick() // X
    expect(wrapper.html()).toContain('Turno actual: O')
    await squares[1].vm.handleClick() // O
    expect(wrapper.html()).toContain('Turno actual: X')
  })

  it('muestra "Empate" al terminar en empate (modo PvP)', async () => {
    const wrapper = mount(tictactoeBoard)
    const select = wrapper.find('select')
    await select.setValue('pvp')
    let squares = wrapper.findAllComponents({ name: 'tictactoeSquare' })
    // Secuencia para empate: X O X X O O O X X
    await squares[0].vm.handleClick() // X
    await squares[1].vm.handleClick() // O
    await squares[2].vm.handleClick() // X
    await squares[4].vm.handleClick() // O
    await squares[3].vm.handleClick() // X
    await squares[5].vm.handleClick() // O
    await squares[7].vm.handleClick() // X
    await squares[6].vm.handleClick() // O
    await squares[8].vm.handleClick() // X
    expect(wrapper.html()).toContain('Empate')
  })
})
