import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import tictactoeSquare from './tictactoeSquare.vue'

describe('tictactoeSquare', () => {
  it('renderiza el valor correctamente', () => {
    const wrapper = mount(tictactoeSquare, {
      props: {
        value: 'X',
        bottom: true,
        right: true,
        handleClick: vi.fn(),
      }
    })
    expect(wrapper.text()).toBe('X')
  })

  it('llama a handleClick cuando se hace click', async () => {
    const mock = vi.fn()
    const wrapper = mount(tictactoeSquare, {
      props: {
        value: '',
        bottom: false,
        right: false,
        handleClick: mock,
      }
    })
    await wrapper.find('button').trigger('click')
    expect(mock).toHaveBeenCalled()
  })

  it('aplica bordes correctamente según las props', () => {
    const wrapper = mount(tictactoeSquare, {
      props: {
        value: '',
        bottom: true,
        right: false,
        handleClick: vi.fn(),
      }
    })
    const btn = wrapper.find('button')
    // Debe tener borde inferior y no borde derecho
    expect(btn.attributes('style')).toContain('border-bottom: 1px solid black')
    expect(btn.attributes('style')).toContain('border-right: 1px solid transparent')
  })
})
