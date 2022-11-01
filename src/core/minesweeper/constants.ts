export const STEP = 10
export const MASK_LINE = 10
export const FLAG_LINE = 20
export const QM_LINE = 30

export const LAND_MINE_STATE = 9

export const GAME_STATE = {
  INIT: 0,
  PLAYING: 1,
  SUCCESS: 2,
  FAIL: 3
} as const

export const LEVEL_KEY = {
  E: 'E',
  M: 'M',
  H: 'H'
} as const

export const LEVEL_TB = {
  [LEVEL_KEY.E]: { rows: 8, cols: 8, name: '简单', count: 10 },
  [LEVEL_KEY.M]: { rows: 16, cols: 16, name: '中等', count: 40 },
  [LEVEL_KEY.H]: { rows: 16, cols: 30, name: '困难', count: 99 },
}
