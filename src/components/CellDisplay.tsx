import React from 'react'
import classNames from 'classnames'
import { CellState } from '../cellSimulatorLib'
import styles from './CellDisplay.module.css'

interface CellDisplayProps {
  cell: CellState,
  onClick: () => void,
  neighboursCount?: number
}

const CellDisplay: React.FC<CellDisplayProps> = ({ 
  cell, 
  onClick,
  neighboursCount 
}: CellDisplayProps) =>
    <div 
      className={classNames(styles.container, styles[cell])} 
      onClick={onClick}
    >{neighboursCount}</div>

export default CellDisplay;