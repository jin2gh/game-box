import { LevelEnum } from './utils'

export const LEVEL_MAP = {
  [LevelEnum.easy]: { rows: 8, cols: 8, name: '简单', count: 10 },
  [LevelEnum.middle]: { rows: 16, cols: 16, name: '中等', count: 40 },
  [LevelEnum.hard]: { rows: 30, cols: 16, name: '困难', count: 99 },
}