import { 
  CellGrid, 
  CellState,
  countAliveNeighbours, 
  generateNextGen,
  generateNextGenWithWrapping,
  _determineNextGenState
} from './cellSimulatorLib'

/** helper function to convert string cell representation into Cell type */
const toCell = (str: string): CellState => (str !== ' ' ? 'alive' : 'dead')

// the first frame of test image
// https://user-images.githubusercontent.com/7149052/53603476-bfb00e00-3c05-11e9-8862-1dfd31836dcd.jpg
const testFrame1: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ','X',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ','X','X','X',' ',' '], // 3
  [' ',' ',' ',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame2: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ','X',' ','X',' ',' '], // 2
  [' ',' ','X','X',' ',' '], // 3
  [' ',' ','X',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame3: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ','X',' ','X',' ',' '], // 3
  [' ',' ','X','X',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame4: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ',' ','X',' ',' ',' '], // 2
  [' ',' ',' ','X','X',' '], // 3
  [' ',' ','X','X',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const testFrame5: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ',' ',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ',' ',' ',' ','X',' '], // 3
  [' ',' ','X','X','X',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

test('countAliveNeighbours on testFrame1', () => {
  const expectedNumNeighbours: number[][] = [ 
  // 0 1 2 3 4 5 
    [0,1,1,1,0,0], // 0
    [0,1,1,2,1,0], // 1
    [1,3,5,3,2,0], // 2
    [1,1,3,2,2,0], // 3
    [1,2,3,2,1,0], // 4
    [0,0,0,0,0,0]  // 5
  ]

  // NOTE. to access an element of the array, select the row before the column
  // ie. grid[y][x], NOT grid[x],[y]
  // see example below.
  const col = 2
  const row = 4
  expect(expectedNumNeighbours[row][col]).toBe(3)

  const result = testFrame1.map((row, y) =>
    row.map((cell, x) =>
      countAliveNeighbours(x, y, testFrame1)
    )
  )
  console.log('output: ', result)

  expect(result).toStrictEqual(expectedNumNeighbours)
})

test('determineNextGenState', () => {
  // A cell can have a maximum of eight neighbours and start as either 'alive'
  // or 'dead'. Therefore, there are 18 possible states to be in as a cell
  // goes into the next generation.

  // - A Cell with fewer than two live neighbours dies of under-population.
  // - A Cell with 2 or 3 live neighbours lives on to the next generation.
  // - A Cell with more than 3 live neighbours dies of overcrowding.
  // - An empty Cell with exactly 3 live neighbours "comes to life".
  // - A Cell who "comes to life" outside the board should wrap at the other side of the board.

  expect(_determineNextGenState('alive',  0)).toBe('dead')
  expect(_determineNextGenState('alive',  1)).toBe('dead')
  expect(_determineNextGenState('alive',  2)).toBe('alive')
  expect(_determineNextGenState('alive',  3)).toBe('alive')
  expect(_determineNextGenState('alive',  4)).toBe('dead')
  expect(_determineNextGenState('alive',  5)).toBe('dead')
  expect(_determineNextGenState('alive',  6)).toBe('dead')
  expect(_determineNextGenState('alive',  7)).toBe('dead')
  expect(_determineNextGenState('alive',  8)).toBe('dead')

  expect(_determineNextGenState('dead',  0)).toBe('dead')
  expect(_determineNextGenState('dead',  1)).toBe('dead')
  expect(_determineNextGenState('dead',  2)).toBe('dead')
  expect(_determineNextGenState('dead',  3)).toBe('alive')
  expect(_determineNextGenState('dead',  4)).toBe('dead')
  expect(_determineNextGenState('dead',  5)).toBe('dead')
  expect(_determineNextGenState('dead',  6)).toBe('dead')
  expect(_determineNextGenState('dead',  7)).toBe('dead')
  expect(_determineNextGenState('dead',  8)).toBe('dead')
})

test('generateNextGen', () => {
  expect(generateNextGen(testFrame1)).toStrictEqual(testFrame2)
  expect(generateNextGen(testFrame2)).toStrictEqual(testFrame3)
  expect(generateNextGen(testFrame3)).toStrictEqual(testFrame4)
  expect(generateNextGen(testFrame4)).toStrictEqual(testFrame5)
})

test('generateNextGenWithWrapping', () => {
  // wrapping on all four edges
  const frame1: Readonly<CellGrid> = [ 
  //  0   1   2   3   4   5
    ['X','X','X',' ',' ','X'], // 0
    [' ',' ',' ',' ',' ','X'], // 1
    [' ',' ',' ',' ',' ','X'], // 2
    ['X',' ',' ',' ',' ',' '], // 3
    ['X',' ',' ',' ',' ',' '], // 4
    ['X',' ',' ','X','X','X']  // 5
  ].map(row => row.map(toCell)) 


  const frame2: Readonly<CellGrid> = [ 
  //  0   1   2   3   4   5
    [' ',' ',' ',' ','X',' '], // 0
    ['X',' ',' ',' ',' ',' '], // 1
    [' ',' ',' ',' ',' ',' '], // 2
    [' ',' ',' ',' ',' ',' '], // 3
    [' ',' ',' ',' ',' ','X'], // 4
    [' ','X',' ',' ',' ',' ']  // 5
  ].map(row => row.map(toCell)) 

  expect(generateNextGenWithWrapping(frame1)).toStrictEqual(frame2)
})
