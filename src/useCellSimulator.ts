import { useState } from 'react'
import { CellGrid, generateNextGen, createEmptyGrid } from './cellSimulatorLib';

const useCellSimulator = (
  initialState: Readonly<CellGrid> = createEmptyGrid(6,6)
) => {
  // quick implementation of a stack
  // NOTE! should always have at least one CellGrid on the stack
  const [gridStack, set] = useState([initialState])

  const _getTopGrid = () => 
    gridStack[gridStack.length - 1]

  const _pushGrid = (grid: CellGrid) => 
    set([...gridStack, grid])

  const _popGrid = () => 
    set(gridStack.slice(0, gridStack.length - 1))

  /** Generate next generation and place on top of the stack */
  const gotoNextGen = () => {
    const nextGen = generateNextGen(_getTopGrid())
    // this is a quick version of a deep compare
    if (JSON.stringify(nextGen) !== JSON.stringify(_getTopGrid())) {
      // only add history if the board has changed
      _pushGrid(generateNextGen(_getTopGrid()))
    }
  }

  /** Return to the previous generation of the CellGrid */ 
  const gotoPrevGen = () => 
    // minimum of one grid on the stack
    (gridStack.length > 1 && _popGrid())

  /** Return to the original user configuration before next generation */
  const reset = () => 
    set(gridStack.slice(0,1))

  /** Set all cells in CellGrid to dead */
  const clear = () => {
    const initial = gridStack[0]
    const rows = initial.length
    const columns = initial[0].length
    const grid = createEmptyGrid(rows, columns)
    // create a new bottom of the stack, so if user presses it will take them 
    // back to the empty board at this stage 
    set([grid])
  }

  /** Switch specified cell between alive/dead */
  const toggleCell = (xPos: number, yPos: number) => {
    // toggling also resets the history
    const grid = _getTopGrid()
    grid[yPos][xPos] = (grid[yPos][xPos] === 'alive' ? 'dead' : 'alive')
    set([grid])
  }

  return { 
    cellGrid: _getTopGrid(), 
    gotoNextGen, 
    gotoPrevGen, 
    reset, 
    clear, 
    toggleCell 
  }
}

export default useCellSimulator;