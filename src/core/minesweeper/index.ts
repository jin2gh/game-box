import { DIRS8 } from '@/utils/constants'
import type { EnumElem, Tuple, ValueOf } from '@/utils/types'
import {
  STEP,
  MASK_LINE,
  FLAG_LINE,
  GAME_STATE,
  LEVEL_KEY,
  LEVEL_TB,
  LAND_MINE_STATE
} from './constants'

export type GameState = ValueOf<typeof GAME_STATE>
export type Level = ValueOf<typeof LEVEL_KEY>
export type ItemVal = EnumElem<30>
export type Grid = Tuple<Tuple<ItemVal, number>, number>
export type Point = [number, number]
export type TriggerFn = (p: Point) => void
export type Opts = {
  level: Level
  fail: Function
  success: Function
}

class Minesweeper {
  rows: number
  cols: number
  count: number
  grid: Grid
  state: GameState
  opts: Opts
  constructor(opts: Opts) {
    const { level } = opts
    const { rows, cols, count } = LEVEL_TB[level]
    this.rows = rows
    this.cols = cols
    this.count = count
    this.state = GAME_STATE.INIT
    this.opts = opts
    this.grid = new Array(rows).fill(0).map(() => new Array(cols).fill(MASK_LINE))
  }

  getPosition(int: number): [number, number] {
    return [Math.floor(int / this.cols), int % this.cols]
  }

  getMapKey([x, y]: Point): number {
    return x * this.cols + y
  }

  init(p: Point): void {
    const hashMap = new Map<number, boolean>()
    const total: number = this.rows * this.cols
    let i: number = 0
    this.checkNear(p, (newPoint: Point) => {
      const key = this.getMapKey(newPoint)
      hashMap.set(key, true)
    })
    while (i < this.count) {
      const randomVal: number = Math.floor(Math.random() * total)
      if (!hashMap.has(randomVal)) {
        const [row, col] = this.getPosition(randomVal)
        hashMap.set(randomVal, true)
        if (row === p[0] && col === p[1]) continue
        this.grid[row][col] += LAND_MINE_STATE
        i += 1
      }
    }

    this.compute()
  }

  compute(): void {
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        if (this.isLandMine(i, j)) continue
        for (const [x, y] of DIRS8) {
          const ni = i + x, nj = j + y
          if (this.inArea(ni, nj) && this.isLandMine(ni, nj)) this.grid[i][j] += 1
        }
      }
    }
  }

  start(p: Point): void {
    this.init(p)
    this.showNoLandMineArea(p)
    this.state = GAME_STATE.PLAYING
  }

  end(): void {}

  fail(): void {
    this.opts.fail()
    this.end()
  }

  success(): void {
    this.opts.success()
    this.end()
  }

  showNoLandMineArea(p: Point): void {
    const que: Point[] = [p]
    while (que.length) {
      const [x, y] = que.shift() as Point
      if (this.isMask(x, y)) this.grid[x][y] -= STEP
      this.checkNear([x, y], ([nx, ny]: Point): void => {
        if (this.isEmpty(nx, ny)) que.push([nx, ny])
        if (this.isMask(nx, ny) && !this.isLandMine(nx, ny)) this.grid[nx][ny] -= STEP
      })
    }
  }

  checkNear(p: Point, cb: TriggerFn): void {
    const [x, y] = p
    for (const d of DIRS8) {
      const [nx, ny] = [x + d[0], y + d[1]]
      if (this.inArea(nx, ny)) {
        cb([nx, ny])
      }
    }
  }

  clickItem(p: Point): void {
    const [x, y] = p
    if (this.state === GAME_STATE.INIT) {
      this.start(p)
    }
    else if (this.grid[x][y] >= MASK_LINE) { // 
      if (this.isLandMine(x, y)) {
        this.fail()
        return
      } else {
        this.showNoLandMineArea(p)
      }
    }
    else {
      let flagCnts = 0
      this.checkNear(p, ([nx, ny]: Point) => {
        if (this.isFlag(nx, ny)) flagCnts += 1
      })

      if (flagCnts === this.grid[x][y]) this.showNoLandMineArea(p)
    }
  }

  markItem(p: Point): void {
    const [x, y] = p
    if (this.isMask(x, y)) this.grid[x][y] += STEP
    else if (this.isFlag(x, y)) this.grid[x][y] -= STEP
  }

  inArea(x: number, y: number): boolean {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols
  }

  isMask(x: number, y: number): boolean {
    return this.grid[x][y] >= MASK_LINE && this.grid[x][y] < FLAG_LINE
  }

  isFlag(x: number, y: number): boolean {
    return this.grid[x][y] > FLAG_LINE
  }

  isEmpty(x: number, y: number): boolean {
    return this.grid[x][y] === MASK_LINE
  }

  isLandMine(x: number, y: number): boolean {
    return this.grid[x][y] - STEP === LAND_MINE_STATE
  }
}

export interface MinesweeperType extends Minesweeper {}

export function init(opts: Opts) {
  const minesweeper = new Minesweeper(opts)
  return minesweeper
}
