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
        <div className={styles.row}>
          {row.map((cell, x) => 
            <CellDisplay 
              cell={cell} 
              neighboursCount={
                showNeighboursCount
                  ? countAliveNeighbours(x, y, grid)
                  : undefined
              }
              onClick={() => onCellClick(x, y)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CellGridDisplay;