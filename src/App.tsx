import React, { useState } from 'react';
import classNames from 'classnames'
import { 
  CellGrid, 
  CellState, 
  countAliveNeighbours, 
  generateNextGen,
  createEmptyGrid
} from './cellSimulatorLib';
import styles from './App.module.css';

const toCell = (cell: string) => (cell !== ' ' ? 'alive' : 'dead')

const testFrame1: Readonly<CellGrid> = [ 
//  0   1   2   3   4   5
  [' ',' ',' ',' ',' ',' '], // 0
  [' ',' ','X',' ',' ',' '], // 1
  [' ',' ',' ','X',' ',' '], // 2
  [' ','X','X','X',' ',' '], // 3
  [' ',' ',' ',' ',' ',' '], // 4
  [' ',' ',' ',' ',' ',' ']  // 5
].map(row => row.map(toCell)) 

const App: React.FC = () => {
  const [showNeighboursCount, setShowNeighboursCount] = useState(false)

  const { cellGrid, gotoNextGen, gotoPrevGen, reset, clear } = useCellSimulator(testFrame1)

  const toggleShowNeighboursCount = () => 
    setShowNeighboursCount(!showNeighboursCount)

  return (
    <div className={styles.App}>

      <div>
        <label> Show neighbours count
          <input 
            type="checkbox" 
            onClick={toggleShowNeighboursCount} 
            checked={showNeighboursCount}
          />
        </label>
      </div>

      <div>
        <button onClick={gotoNextGen}>Next Generation</button>
      </div>

      <div>
        <button onClick={gotoPrevGen}>Previous Generation</button>
      </div>

      <div>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <button onClick={clear}>Clear</button>
      </div>

      <div className={styles.content}>
        <CellGridDisplay
          grid={cellGrid} 
          showNeighboursCount={showNeighboursCount}
        />
      </div>

    </div>
  );
}

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

  const gotoNextGen = () => 
    _pushGrid(generateNextGen(_getTopGrid()))

  const gotoPrevGen = () => 
    // minimum of one grid on the stack
    (gridStack.length > 1 && _popGrid())

  const reset = () => 
    set(gridStack.slice(0,1))

  const clear = () => {
    const initial = gridStack[0]
    const rows = initial.length
    const columns = initial[0].length
    const grid = createEmptyGrid(rows, columns)
    // create a new bottom of the stack, so if user presses it will take them 
    // back to the empty board at this stage 
    set([grid])
  }

  const toggleSquare = (x: number, y: number) => null
  const togglePlayPause = () => null
  const stop = () => null

  return { cellGrid: _getTopGrid(), gotoNextGen, gotoPrevGen, reset, clear }
}

interface CellGridDisplayProps {
  grid: Readonly<CellGrid>,
  showNeighboursCount?: boolean
}

const CellGridDisplay: React.FC<CellGridDisplayProps> = ({
  grid,
  showNeighboursCount
}: CellGridDisplayProps) => {
  return (
    <div className={styles.container}>
      {grid.map((row, y) =>
        <div className={styles.row}>
          {row.map((cell, x) => 
            <CellDisplay 
              cell={cell} 
              neighboursCount={
                showNeighboursCount
                  ? countAliveNeighbours(x, y, grid)
                  : undefined
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

interface CellDisplayProps {
  cell: CellState,
  neighboursCount?: number
}

const CellDisplay: React.FC<CellDisplayProps> = ({ cell, neighboursCount }: CellDisplayProps) => {
  const classes = classNames(styles.CellDisplay, styles[cell])
  return (
    <div className={classes}>{neighboursCount}</div>
  )
}


export default App;
