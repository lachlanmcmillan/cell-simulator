import { CellGrid, countAliveNeighbours, generateNextGen } from './cellSimulatorLib'

/** helper function to convert string cell representation into Cell type */
const toCell = (cell: string) => (cell !== ' ' ? 'alive' : 'dead')

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

test('generateNextGen', () => {
  expect(generateNextGen(testFrame1)).toStrictEqual(testFrame2)
  expect(generateNextGen(testFrame2)).toStrictEqual(testFrame3)
  expect(generateNextGen(testFrame3)).toStrictEqual(testFrame4)
  expect(generateNextGen(testFrame4)).toStrictEqual(testFrame5)
})
