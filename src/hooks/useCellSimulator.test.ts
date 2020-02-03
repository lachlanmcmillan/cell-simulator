import { 
  _gotoNextGen,
  _gotoPrevGen,
  _clear,
  _reset,
  _toggleCell
} from "./useCellSimulator"

import NonEmptyStack from '../lib/NonEmptyStack'
import { CellGrid, CellState, createEmptyGrid } from '../lib/cellSimulatorLib'

/** helper function to convert string cell representation into Cell type */
const toCell = (str: string): CellState => (str !== ' ' ? 'alive' : 'dead')

// the first frame of test image
// https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg
const testFrame1: CellGrid = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ','X',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ','X','X','X',' ',' '], // 3
  [' ',' ',' ',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame2: CellGrid = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ','X',' ','X',' ',' '], // 2
  [' ',' ','X','X',' ',' '], // 3
  [' ',' ','X',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

test("_gotoNextGen adds the next generation to the top of the stack", () => {
  const stack = new NonEmptyStack<CellGrid>([testFrame1])
  const nextState = _gotoNextGen(stack)
  expect(nextState.top()).toStrictEqual(testFrame2)
})

test("_gotoNextGen does not change the state if the next-gen is no different from the last gen", () => {
  const emptyBoard = createEmptyGrid(6,6)
  const stack = new NonEmptyStack<CellGrid>([emptyBoard])
  const nextState = _gotoNextGen(stack)
  expect(nextState.top()).toStrictEqual(emptyBoard)
})

test("_gotoPrevGen ", () => {
  const stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  const nextState = _gotoPrevGen(stack)
  expect(nextState.top()).toStrictEqual(testFrame1)
})

test("_gotoPrevGen does not change the state if prev-gen is the original configuration of the board", () => {
  const stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  const nextState = _gotoPrevGen(stack)
  expect(nextState.top()).toStrictEqual(testFrame1)
  const thirdState = _gotoPrevGen(nextState)
  expect(thirdState.top()).toStrictEqual(testFrame1)
})

test("_reset returns the game board to the user's configuration", () => {
  let stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  stack = _gotoNextGen(stack, false)
  expect(stack.top()).not.toStrictEqual(testFrame1)
  stack = _reset(stack)
  expect(stack.top()).toStrictEqual(testFrame1)
})

test("_clear makes a new board (no history) with all cells dead", () => {
  let stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  stack = _clear(stack)
  expect(stack.top()).toStrictEqual(createEmptyGrid(6,6))
})

test("_toggleCell changes a cell between alive/dead and clears history", () => {
  let stack = new NonEmptyStack<CellGrid>([testFrame1, testFrame2])
  expect(stack.top()[0][0]).toBe('dead')
  expect(stack.length()).toBe(2)
  // dead cell comes alive
  stack = _toggleCell(stack, 0,0)
  expect(stack.top()[0][0]).toBe('alive')
  // history reset
  expect(stack.length()).toBe(1)
  // alive cell becomes dead
  stack = _toggleCell(stack, 0,0)
  expect(stack.top()[0][0]).toBe('dead')
  // confirm nothing else has changed
  expect(stack.top()).toStrictEqual(testFrame2)
})

