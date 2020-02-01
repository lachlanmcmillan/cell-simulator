/**
 * cellSimulatorLib.ts
 **/

export type CellState = 'alive' | 'dead'

/** A grid of cells - all rows should have the same length*/
export type CellGrid = CellState[][]

/** 
 * For any Cell in a CellGrid, get the number of alive neighbours of that Cell
 * 
 * Neighbours are those Cells which are adjacent to the specified Cell at
 * location (x,y) when layed out on a 2D plane (like a chessboard). Neighbours
 * includes diagonals.
 */  
export function countAliveNeighbours(
  xPos: number, 
  yPos: number, 
  grid: Readonly<CellGrid>
): number {
  let neighbours = 0
  // ASSUMPTION. all rows are the same length
  const xMax = grid[0].length 
  const yMax = grid.length - 1

  for (let x = xPos - 1; x <= xPos + 1; x++) {
    for (let y = yPos - 1; y <= yPos + 1; y++) {
      if (x < 0 || y < 0) continue
      if (x > xMax || y > yMax) continue
      if (x === xPos && y === yPos) continue

      if (grid[y][x] === 'alive') neighbours++
    }
  }
  return neighbours
}

export function generateNextGen(grid: Readonly<CellGrid>): CellGrid {
  return grid.map((row, y) =>
    row.map((cell, x) =>
      determineNextGenState(
        cell,
        countAliveNeighbours(x, y, grid)
      )
    )
  )
}

export function determineNextGenState(
  cell: CellState, 
  aliveNeighboursCount: number
): CellState {
  // stub !
  return 'alive'
}
