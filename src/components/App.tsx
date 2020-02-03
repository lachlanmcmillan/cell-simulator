import React, { useState } from 'react';
import CellGridDisplay from './CellGridDisplay'
import { createEmptyGrid } from '../lib/cellSimulatorLib';
import useCellSimulator from '../hooks/useCellSimulator'
import styles from './App.module.css';

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
  } = useCellSimulator(createEmptyGrid(6,6))

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
