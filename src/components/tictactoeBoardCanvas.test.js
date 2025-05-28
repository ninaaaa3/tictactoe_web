import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import tictactoeBoardCanvas from './tictactoeBoardCanvas.vue'

beforeAll(() => {
  window.HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    lineCap: '',
    strokeStyle: '',
    lineWidth: 0,
    shadowColor: '',
    shadowBlur: 0,
  })
})

describe('tictactoeBoardCanvas', () => {
  it('muestra el turno inicial y permite reiniciar', async () => {
    const wrapper = mount(tictactoeBoardCanvas)
    expect(wrapper.html()).toContain('Tic Tac Toe')
    expect(wrapper.html()).toContain('Tu turno') // <-- Cambiado aquí
    // Cambia modo y reinicia
    const select = wrapper.find('select')
    await select.setValue('pvp')
    expect(wrapper.html()).toContain('Turno: X')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.html()).toContain('Turno: X')
  })

  it('cambia a modo CPU y muestra texto de CPU', async () => {
    const wrapper = mount(tictactoeBoardCanvas)
    const select = wrapper.find('select')
    await select.setValue('easy')
    expect(wrapper.html()).toContain('Tu turno')
  })
})
