import { DIRS8 } from '@/utils/constants'
import { LEVEL_MAP } from './constants'
import type { Grid } from './types'
import { LevelEnum, PointState } from './utils'


class Minesweeper {
  rows: number
  cols: number
  count: number
  grid: Grid
  constructor(level: LevelEnum) {
    const { rows, cols, count } = LEVEL_MAP[level]
    this.rows = rows
    this.cols = cols
    this.count = count
    this.grid = new Array(rows).fill(new Array(cols).fill(0))
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
        this.grid[row][col] = PointState.TRUE
        hashMap.set(randomVal, true)
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
          if (ni > 0 && ni < r && nj > 0 && nj < c && this.isLandMine(ni, nj)) this.grid[i][j] += 1
        }
      }
    }
  }

  isLandMine(x: number, y: number): boolean {
    return this.grid[x][y] === PointState.TRUE
  }
}

export function init(level: LevelEnum): Minesweeper {
  const minesweeper = new Minesweeper(level)
  minesweeper.initLandMine()
  return minesweeper
}

export interface MinesweeperType extends Minesweeper {}