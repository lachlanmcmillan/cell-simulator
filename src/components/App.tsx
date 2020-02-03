import React, { useState } from 'react';
import CellGridDisplay from './CellGridDisplay'
import { CellGrid, } from '../lib/cellSimulatorLib';
import useCellSimulator from '../hooks/useCellSimulator'
import styles from './App.module.css';

const toCell = (cell: string) => (cell !== ' ' ? 'alive' : 'dead')

const testFrame1: CellGrid = [ 
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

  const { 
    cellGrid, 
    isWrappingOn,
    gotoNextGen, 
    gotoPrevGen, 
    reset, 
    clear, 
    toggleCell, 
    toggleIsWrappingOn 
  } = useCellSimulator(testFrame1)

  const toggleShowNeighboursCount = () => 
    setShowNeighboursCount(!showNeighboursCount)

  return (
    <div className={styles.App}>

      <div className={styles.controls}>
        <div>
          <label>Show neighbours count
            <input 
              type="checkbox" 
              onChange={toggleShowNeighboursCount} 
              checked={showNeighboursCount}
            />
          </label>
        </div>

        <div>
          <label>Enable Wrapping at board edge
            <input 
              type="checkbox" 
              onChange={toggleIsWrappingOn} 
              checked={isWrappingOn}
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
      </div>

      <div className={styles.content}>
        <CellGridDisplay
          grid={cellGrid} 
          showNeighboursCount={showNeighboursCount}
          onClickCell={toggleCell}
        />
      </div>

    </div>
  );
}

export default App;
