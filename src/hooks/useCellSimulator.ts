import { useState } from 'react'
import { 
  CellGrid, 
  generateNextGen, 
  generateNextGenWithWrapping,
  createEmptyGrid 
} from '../lib/cellSimulatorLib';
import NonEmptyStack from '../lib/NonEmptyStack'

/** 
 * Provides the game board and functions for playing the cell-simulator game
 */
const useCellSimulator = (
  initialState: CellGrid = createEmptyGrid(6,6)
) => {
  const [gridStack, setStack] = useState(new NonEmptyStack<CellGrid>([initialState]))
  const [isWrappingOn, setIsWrappingOn] = useState(false)

  return {
    cellGrid: gridStack.top(), 
    isWrappingOn,

    gotoNextGen: () => setStack(prevStack => _gotoNextGen(prevStack, isWrappingOn)), 

    /** Return to the previous generation of the CellGrid */ 
    gotoPrevGen: () => setStack(_gotoPrevGen), 

    /** Return to the original user configuration before next generation */
    reset: () => setStack(_reset), 

    /** Set all cells in CellGrid to dead */
    clear: () => setStack(_clear), 

    /** Switch specified cell between alive/dead */
    toggleCell: (xPos: number, yPos: number) => 
      setStack(prevStack => _toggleCell(prevStack, xPos, yPos)),
    
    toggleIsWrappingOn: () => setIsWrappingOn(prev => !prev)
  }
}

export default useCellSimulator;

/** Private functions - exported for testing only */

export type CellGridStack = NonEmptyStack<CellGrid> // reduce typing

export const _gotoNextGen = (gridStack: CellGridStack, wrapAtEdge: boolean): CellGridStack => {
  const nextGen = (wrapAtEdge
    ? generateNextGenWithWrapping(gridStack.top())
    : generateNextGen(gridStack.top())
  )
  // this is a quick version of a deep compare
  const hasBoardChanged = (
    JSON.stringify(nextGen) !== JSON.stringify(gridStack.top())
  )
  // only add history if the board has changed
  return (hasBoardChanged
    ? gridStack.push(nextGen)
    : gridStack
  )
}

export const _gotoPrevGen = (gridStack: CellGridStack): CellGridStack => {
  // minimum of one grid on the stack
  return (gridStack.length() > 1
    ? gridStack.pop()
    : gridStack
  )
}

export const _reset = (gridStack: CellGridStack): CellGridStack => 
  new NonEmptyStack<CellGrid>([gridStack.bottom()])

export const _clear = (gridStack: CellGridStack): CellGridStack => {
  const initial = gridStack.bottom()
  const rows = initial.length
  const columns = initial[0].length
  const grid = createEmptyGrid(rows, columns)
  // create a new bottom of the stack, so if user presses it will take them 
  // back to the empty board at this stage 
  return new NonEmptyStack<CellGrid>([grid])
}

export const _toggleCell = (
  gridStack: CellGridStack, 
  xPos: number, 
  yPos: number
): CellGridStack => {
  // toggling also resets the history
  const grid = gridStack.top()
  grid[yPos][xPos] = (grid[yPos][xPos] === 'alive' ? 'dead' : 'alive')
  return new NonEmptyStack<CellGrid>([grid])
}