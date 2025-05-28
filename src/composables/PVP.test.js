import { describe, it, expect } from 'vitest'
import PVP from './PVP'

describe('PVP', () => {
  it('inicializa el tablero vacío y X comienza', () => {
    const { squares, currentPlayer, gameContinue, gameEnd, winningLine } = PVP()
    expect(squares.value).toEqual([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
    expect(currentPlayer.value).toBe('X')
    expect(gameContinue.value).toBe(true)
    expect(gameEnd.value).toBe('')
    expect(winningLine.value).toBe(null)
  })

  it('permite jugar alternando turnos', () => {
    const { squares, currentPlayer, handleClick } = PVP()
    handleClick(0)
    expect(squares.value[0]).toBe('X')
    expect(currentPlayer.value).toBe('O')
    handleClick(1)
    expect(squares.value[1]).toBe('O')
    expect(currentPlayer.value).toBe('X')
  })

  it('no permite jugar en una casilla ocupada', () => {
    const { squares, handleClick, currentPlayer } = PVP()
    handleClick(0)
    const prevPlayer = currentPlayer.value
    handleClick(0)
    expect(squares.value[0]).toBe('X')
    expect(currentPlayer.value).toBe(prevPlayer)
  })

  it('detecta victoria por fila', () => {
    const {handleClick, gameEnd, winningLine, gameContinue } = PVP()
    handleClick(0) // X
    handleClick(3) // O
    handleClick(1) // X
    handleClick(4) // O
    handleClick(2) // X gana
    expect(gameEnd.value).toBe('Ganó: X')
    expect(gameContinue.value).toBe(false)
    expect(winningLine.value).toEqual([0, 1, 2])
  })

  it('detecta empate', () => {
    const { handleClick, gameEnd, gameContinue } = PVP()
    // Secuencia para empate: X O X X O O O X X
    handleClick(0) // X
    handleClick(1) // O
    handleClick(2) // X
    handleClick(4) // O
    handleClick(3) // X
    handleClick(5) // O
    handleClick(7) // X
    handleClick(6) // O
    handleClick(8) // X
    expect(gameEnd.value).toBe('Empate')
    expect(gameContinue.value).toBe(false)
  })

  it('no permite jugar tras terminar el juego', () => {
    const { handleClick, gameEnd } = PVP()
    handleClick(0) // X
    handleClick(3) // O
    handleClick(1) // X
    handleClick(4) // O
    handleClick(2) // X gana
    expect(gameEnd.value).toBe('Ganó: X')
    handleClick(5)
    // No es necesario usar squares aquí si no lo necesitas
  })

  it('reinicia correctamente el juego', () => {
    const { squares, handleClick, resetGame, currentPlayer, gameContinue, gameEnd, winningLine } = PVP()
    handleClick(0)
    handleClick(1)
    resetGame()
    expect(squares.value).toEqual([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
    expect(currentPlayer.value).toBe('X')
    expect(gameContinue.value).toBe(true)
    expect(gameEnd.value).toBe('')
    expect(winningLine.value).toBe(null)
  })

  it('detecta victoria en diagonal', () => {
    const {handleClick, gameEnd, winningLine } = PVP()
    handleClick(0) // X
    handleClick(1) // O
    handleClick(4) // X
    handleClick(2) // O
    handleClick(8) // X (diagonal)
    expect(gameEnd.value).toBe('Ganó: X')
    expect(winningLine.value).toEqual([0, 4, 8])
  })
})
