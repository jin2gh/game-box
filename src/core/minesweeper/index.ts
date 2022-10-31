import { DIRS8 } from '@/utils/constants'
import {
  STEP,
  MASK_LINE,
  QM_LINE,
  LEVEL_TB,
  LAND_MINE_STATE
} from './constants'
import type { Grid, Level } from './types'


class Minesweeper {
  rows: number
  cols: number
  count: number
  grid: Grid
  constructor(level: Level) {
    const { rows, cols, count } = LEVEL_TB[level]
    this.rows = rows
    this.cols = cols
    this.count = count
    this.grid = new Array(rows).fill(0).map(() => new Array(cols).fill(MASK_LINE))
  }

  getPosition(int: number): [number, number] {
    return [Math.floor(int / this.cols), int % this.cols]
  }

  initLandMine(): void {
    const hashMap = new Map<number, boolean>()
    const total: number = this.rows * this.cols
    let i: number = 0
    while (i < this.count) {
      const randomVal: number = Math.floor(Math.random() * total)
      if (!hashMap.has(randomVal)) {
        const [row, col] = this.getPosition(randomVal)
        this.grid[row][col] += LAND_MINE_STATE
        hashMap.set(randomVal, true)
        i += 1
      }
    }

    this.compute()
  }

  compute(): void {
    const [r, c]: number[] = [this.rows - 1, this.cols - 1]
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        if (this.isLandMine(i, j)) continue
        for (const [x, y] of DIRS8) {
          const ni = i + x, nj = j + y
          if (ni >= 0 && ni < r && nj >= 0 && nj < c && this.isLandMine(ni, nj)) this.grid[i][j] += 1
        }
      }
    }
  }

  isLandMine(x: number, y: number): boolean {
    return this.grid[x][y] === LAND_MINE_STATE
  }

  clickItem(x: number, y: number): void {
    if (this.grid[x][y] >= MASK_LINE) this.grid[x][y] -= STEP
  }

  markItem(x: number, y: number): void {
    if (this.grid[x][y] < MASK_LINE) return
    if (this.grid[x][y] >= QM_LINE) this.grid[x][y] -= STEP * 2
    else this.grid[x][y] += STEP
  }
}

export interface MinesweeperType extends Minesweeper {}

export function init(level: Level) {
  const minesweeper = new Minesweeper(level)
  minesweeper.initLandMine()
  return minesweeper
}

