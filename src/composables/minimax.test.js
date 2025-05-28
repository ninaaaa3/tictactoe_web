import { describe, it, expect } from 'vitest'
import useMinimax from './minimax'

describe('useMinimax', () => {
  it('inicializa el tablero vacío', () => {
    const { squares, currentPlayer, gameContinue, gameEnd, winningLine } = useMinimax()
    expect(squares.value).toEqual([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
    expect(currentPlayer.value).toBe('X')
    expect(gameContinue.value).toBe(true)
    expect(gameEnd.value).toBe('')
    expect(winningLine.value).toBe(null)
  })

  it('permite jugar en una casilla vacía', () => {
    const { squares, handleClick } = useMinimax()
    handleClick(0)
    expect(squares.value[0]).toBe('X')
  })

  it('no permite jugar en una casilla ocupada', () => {
    const { squares, handleClick } = useMinimax()
    handleClick(0)
    handleClick(0)
    expect(squares.value[0]).toBe('X') // No cambia, sigue siendo X
  })

  it('detecta victoria por fila', () => {
    const { squares, handleClick, gameEnd, winningLine, currentPlayer } = useMinimax(9, 0)
    // Secuencia para ganar por fila superior: X en 0, 1, 2
    handleClick(0) // X (humano)
    handleClick(3) // O (cpu)
    handleClick(1) // X
    handleClick(4) // O
    handleClick(2) // X -> Gana
    // Es probable que la IA juegue su turno automáticamente (depende del delay, ver abajo)
    expect(gameEnd.value).toContain('Ganó: X')
    expect(winningLine.value).toEqual([0, 1, 2])
  })

  it('detecta empate forzando el tablero', () => {
    const { squares, gameEnd, review } = useMinimax()
    // Tablero lleno y sin ganador
    squares.value = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ]
    review()
    expect(gameEnd.value).toBe('Empate')
  })

  it('no permite más jugadas tras terminar el juego', () => {
    const { squares, handleClick, gameEnd } = useMinimax(9, 0)
    handleClick(0) // X
    handleClick(3) // O
    handleClick(1) // X
    handleClick(4) // O
    handleClick(2) // X (gana)
    expect(gameEnd.value).toContain('Ganó: X')
    handleClick(5) // Intento jugar después del final
    expect(squares.value[5]).toBe(' ')
  })

  it('reinicia correctamente el juego', () => {
    const { squares, handleClick, resetGame, currentPlayer, gameContinue, gameEnd, winningLine } = useMinimax()
    handleClick(0)
    resetGame()
    expect(squares.value).toEqual([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
    expect(currentPlayer.value).toBe('X')
    expect(gameContinue.value).toBe(true)
    expect(gameEnd.value).toBe('')
    expect(winningLine.value).toBe(null)
  })

  it('detecta la línea ganadora (diagonal)', () => {
    const { squares, gameEnd, review, winningLine } = useMinimax()
    squares.value = [
      'X', 'O', ' ',
      'O', 'X', 'O',
      ' ', ' ', 'X'
    ]
    review()
    expect(gameEnd.value).toBe('Ganó: X')
    expect(winningLine.value).toEqual([0, 4, 8])
  })
})
