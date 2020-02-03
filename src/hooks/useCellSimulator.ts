import { useState } from 'react'
import { CellGrid, generateNextGen, createEmptyGrid } from '../lib/cellSimulatorLib';
import NonEmptyStack from '../lib/NonEmptyStack'

const useCellSimulator = (
  initialState: CellGrid = createEmptyGrid(6,6)
) => {
  const [gridStack, set] = useState(new NonEmptyStack<CellGrid>([initialState]))

  /** Generate next generation and place on top of the history stack */
  const gotoNextGen = () => {
    const nextGen = generateNextGen(gridStack.top())
    // this is a quick version of a deep compare
    if (JSON.stringify(nextGen) !== JSON.stringify(gridStack.top())) {
      // only add history if the board has changed
      set(gridStack.push(nextGen))
    }
  }

  /** Return to the previous generation of the CellGrid */ 
  const gotoPrevGen = () => 
    // minimum of one grid on the stack
    (gridStack.length() > 1 && set(gridStack.pop()))

  /** Return to the original user configuration before next generation */
  const reset = () => 
    set(new NonEmptyStack<CellGrid>([gridStack.bottom()]))

  /** Set all cells in CellGrid to dead */
  const clear = () => {
    const initial = gridStack.bottom()
    const rows = initial.length
    const columns = initial[0].length
    const grid = createEmptyGrid(rows, columns)
    // create a new bottom of the stack, so if user presses it will take them 
    // back to the empty board at this stage 
    set(new NonEmptyStack<CellGrid>([grid]))
  }

  /** Switch specified cell between alive/dead */
  const toggleCell = (xPos: number, yPos: number) => {
    // toggling also resets the history
    const grid = gridStack.top()
    grid[yPos][xPos] = (grid[yPos][xPos] === 'alive' ? 'dead' : 'alive')
    set(new NonEmptyStack<CellGrid>([grid]))
  }

  return { 
    cellGrid: gridStack.top(), 
    gotoNextGen, 
    gotoPrevGen, 
    reset, 
    clear, 
    toggleCell 
  }
}

export default useCellSimulator;