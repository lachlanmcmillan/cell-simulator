import { CellGrid, countAliveNeighbours } from './cellSimulatorLib'

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
].map(row => 
  row.map(cell => 
    (cell !== ' ' ? 'alive' : 'dead')
  )
)

test('countAliveNeighbours on testFrame1', () => {
  const expectedNumNeighbours: number[][] = [ 
  // 0 1 2 3 4 5 
    [0,1,1,1,0,0], // 0
    [0,1,1,2,1,0], // 1
    [1,2,5,3,2,0], // 2
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

  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
      expect(
        countAliveNeighbours(x, y, testFrame1)
      ).toBe(expectedNumNeighbours[y][x])
    }
  }
})

