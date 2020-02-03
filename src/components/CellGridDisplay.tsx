import React from 'react'
import styles from './CellGridDisplay.module.css'
import CellDisplay from './CellDisplay'

import { CellGrid, countAliveNeighbours, } from '../lib/cellSimulatorLib';

interface CellGridDisplayProps {
  grid: Readonly<CellGrid>,
  showNeighboursCount: boolean,
  onClickCell: (x: number, y: number) => void
}

const CellGridDisplay: React.FC<CellGridDisplayProps> = ({
  grid,
  showNeighboursCount,
  onClickCell: onCellClick
}: CellGridDisplayProps) => {
  return (
    <div className={styles.container}>
      {grid.map((row, y) =>
        // these rows/cells are not being rearranged, so it's okay to use the 
        // array index as a react-key here
        <div className={styles.row} key={y}>
          {row.map((cell, x) => 
            <CellDisplay 
              cell={cell} 
              neighboursCount={
                showNeighboursCount
                  ? countAliveNeighbours(x, y, grid)
                  : undefined
              }
              onClick={() => onCellClick(x, y)}
              key={x}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CellGridDisplay;