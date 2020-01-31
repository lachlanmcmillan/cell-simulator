/**
 * cellSimulatorLib.ts
 **/

const CELL_GRID_MIN_CELLS = 16

export type Cell = 'alive' | 'dead'

/** A grid of cells, with equal number columns and rows */
export type CellGrid = Cell[][]

/** 
 * For any Cell in a CellGrid, get the number of alive neighbours of that Cell
 * 
 * Neighbours are those Cells which are adjacent to the specified Cell at
 * location (x,y) when layed out on a 2D plane (like a chessboard). Neighbours
 * includes diagonals.
 */  
export function countAliveNeighbours(xPos: number, yPos: number, grid: Readonly<CellGrid>): number {
  let neighbours = 0
  const boardColumnMax = grid.length - 1 
  for (let x = xPos - 1; x <= xPos + 1; x++) {
    for (let y = yPos - 1; y <= yPos + 1; y++) {
      if (x < 0 || y < 0) continue
      if (x > boardColumnMax || y > boardColumnMax) continue
      if (x === xPos && y === yPos) continue

      if (grid[y][x] === 'alive') neighbours++
    }
  }
  return neighbours
}

export function generateNextGen(grid: Readonly<CellGrid>): CellGrid {
  // stub!
  return [ ...grid ]
}