import React from 'react';
import classNames from 'classnames'
import { CellGrid, Cell, countAliveNeighbours } from './cellSimulatorLib';
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
  return (
    <div className={styles.App}>
      <CellGridDisplay
        grid={testFrame1} 
      />

    </div>
  );
}

interface CellGridDisplayProps {
  grid: Readonly<CellGrid>,
}

const CellGridDisplay: React.FC<CellGridDisplayProps> = ({ grid }: CellGridDisplayProps) => {
  return (
    <div className={styles.container}>
      {grid.map((row, y) =>
        <div className={styles.row}>
          {row.map((cell, x) => 
            <CellDisplay 
              cell={cell} 
              neighboursCount={countAliveNeighbours(x, y, grid)} 
            />
          )}
        </div>
      )}
    </div>
  )
}

interface CellDisplayProps {
  cell: Cell,
  neighboursCount?: number
}

const CellDisplay: React.FC<CellDisplayProps> = ({ cell, neighboursCount }: CellDisplayProps) => {
  const classes = classNames(styles.CellDisplay, styles[cell])
  return (
    <div className={classes}>{neighboursCount}</div>
  )
}


export default App;
