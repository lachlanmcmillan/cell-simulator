/**
 * cellSimulatorLib.ts
 **/

const CELL_GRID_MIN_CELLS = 16

export type Cell = 'alive' | 'dead'

/** A grid of cells, with equal number columns and rows */
export type CellGrid = Cell[][]

export function countAliveNeighbours(xPos: number, yPos: number, board: Readonly<CellGrid>): number {
  let neighbours = 0
  const boardColumnMax = board.length - 1 
  for (let x = xPos - 1; x <= xPos + 1; x++) {
    for (let y = yPos - 1; y <= yPos + 1; y++) {
      if (x < 0 || y < 0) continue
      if (x > boardColumnMax || y > boardColumnMax) continue
      if (x === xPos && y === yPos) continue

      if (board[y][x] === 'alive') neighbours++
    }
  }
  return neighbours
}