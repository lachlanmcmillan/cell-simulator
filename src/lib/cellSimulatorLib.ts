/**
 * cellSimulatorLib.ts
 **/

export type CellState = 'alive' | 'dead'

/** A grid of cells - all rows should have the same length*/
export type CellGrid = CellState[][]

/** Create a new CellGrid with all cells dead */
export const createEmptyGrid = (rows: number, columns: number): CellGrid => {
  const grid = []
  for (let i = 0; i < rows; i++) {
    grid.push(new Array(columns).fill('dead'))
  }
  return grid
}

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

/**
 * Given a CellGrid, evolve it to the next generation
 */
export function generateNextGen(grid: Readonly<CellGrid>): CellGrid {
  return grid.map((row, y) =>
    row.map((cell, x) =>
      _determineNextGenState(
        cell,
        countAliveNeighbours(x, y, grid)
      )
    )
  )
}

/**
 * Given a CellGrid, evolve it to the next generation, including the rule
 * 
 * "A Cell who "comes to life" outside the board should wrap at the other side 
 * of the board."
 */
export function generateNextGenWithWrapping(grid: Readonly<CellGrid>): CellGrid {
  const columns = grid[0].length
  const rows = grid.length
  const nextGrid = createEmptyGrid(grid.length, grid[0].length)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      nextGrid[y][x] = _determineNextGenState(
        grid[y][x],
        countAliveNeighbours(x,y,grid)
      )
    }
  }
  // do the 'off-grid' manipulations after, so they take precedence
  // these loops could be unwrapped in the future to speed them up
  for (let y = -1; y < rows + 1; y++) {
    for (let x = -1; x < columns + 1; x++) {
      const offGrid = (x < 0 || y < 0 || x >= columns || y >= rows)
      if (offGrid) {
        const nextCellState = _determineNextGenState(
          'dead',
          countAliveNeighbours(x, y, grid)
        ) 
        if (nextCellState === 'alive') {
          const wrappedX = _wrapNumberInRange(x, 0, columns - 1)
          const wrappedY = _wrapNumberInRange(y, 0, rows - 1)
          nextGrid[wrappedY][wrappedX] = 'alive'
        }
      }
    }
  }
  return nextGrid
}

export const _wrapNumberInRange = (num: number, min: number, max: number) => {
  if (num < min) return max
  if (num > max) return min

  return num
}

/** 
 * Returns whether a cell will die/live in the next generation according
 * to the requirements.
 */
export function _determineNextGenState(
  cell: CellState, 
  aliveNeighboursCount: number
): CellState {
  return (
    // these represent the possible states to live
    (cell === 'alive' && aliveNeighboursCount === 2) ||
    (cell === 'alive' && aliveNeighboursCount === 3) ||
    (cell === 'dead' && aliveNeighboursCount === 3)
  ) ? 'alive' : 'dead'
}

