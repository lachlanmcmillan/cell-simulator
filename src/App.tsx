import React, { useState } from 'react';
import CellGridDisplay from './components/CellGridDisplay'
import { CellGrid, } from './cellSimulatorLib';
import useCellSimulator from './useCellSimulator'
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

  const { cellGrid, gotoNextGen, gotoPrevGen, reset, clear, toggleCell } = useCellSimulator(testFrame1)

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
          onClickCell={toggleCell}
        />
      </div>

    </div>
  );
}


export default App;
