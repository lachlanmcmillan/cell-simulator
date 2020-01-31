/**
 * cellSimulatorLib.ts
 **/

const CELL_GRID_MIN_CELLS = 16

export type Cell = 'alive' | 'dead'

/** A grid of cells, with equal number columns and rows */
export type CellGrid = Cell[][]

export function countAliveNeighbours(xPos: number, yPos: number, board: Readonly<CellGrid>): number {
  return 0
}