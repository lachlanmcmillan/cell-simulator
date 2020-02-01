import React, { useState } from 'react';
import classNames from 'classnames'
import { CellGrid, CellState, countAliveNeighbours, generateNextGen } from './cellSimulatorLib';
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

  const [cellGrid, setCellGrid] = useState(testFrame1)

  const toggleShowNeighboursCount = () => 
    setShowNeighboursCount(!showNeighboursCount)

  const gotoNextGen = () =>
    setCellGrid(generateNextGen(cellGrid))

  const gotoPrevGen = () =>
    console.log('not ready yet')

  const reset = () =>
    setCellGrid(testFrame1)

  const clear = () => 
    console.log('not ready yet')

  const togglePlayPause = () => 
    console.log('not ready yet')

  const stop = () => 
    console.log('not ready yet')
  
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

      <div className={styles.content}>
        <CellGridDisplay
          grid={cellGrid} 
          showNeighboursCount={showNeighboursCount}
        />
      </div>

    </div>
  );
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
