
import type { EnumElem, Tuple, ValueOf } from '@/utils/types'
import type { LEVEL_KEY } from './constants'

export type Level = ValueOf<typeof LEVEL_KEY>
export type ItemVal = EnumElem<40>

export type Grid = Tuple<Tuple<ItemVal, number>, number>

