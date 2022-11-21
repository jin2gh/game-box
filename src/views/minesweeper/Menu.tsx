import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { GameState, Level } from '@/core/minesweeper'
import { GAME_STATE, LEVEL_TB } from '@/core/minesweeper/constants'
import styles from './styles.module.scss'

type menuEmits = {
  changeLevel: (level: Level) => void
  reset: () => void
}

const menuProps = {
  count: Number,
  status: {
    default: GAME_STATE.INIT,
    type: Number as PropType<GameState>,
    required: true
  },
  time: {
    default: 0,
    type: Number,
  },
  onChangeLevel: Function as PropType<menuEmits['changeLevel']>,
  onReset: Function as PropType<menuEmits['reset']>,
}

type EmojiMapType = {
  [k: string]: number
}

const emojiMap: EmojiMapType = {
  [GAME_STATE.INIT]: 128578,
  [GAME_STATE.PLAYING]: 128578,
  [GAME_STATE.FAIL]: 128534,
  [GAME_STATE.SUCCESS]: 128526
}

export default defineComponent({
  name: 'MenuBar',
  props: menuProps,
  emits: ['changeLevel', 'reset'],
  setup(props, { emit }) {
    const btns = Object.keys(LEVEL_TB) as Level[]
    function changeLevel(level: Level) {
      emit('changeLevel', level)
    }

    function reset() {
      emit('reset')
    }

    function renderBtn (state: GameState): String {
      const key: string = String(state) 
      return String.fromCodePoint(emojiMap[key])
    }

    return () => {
      const { count, status, time } = props

      return (
        <header>
          <div class={styles.menu}>
            {btns.map((it, i) => (
              <div key={i} onClick={() => changeLevel(it)}>
                {LEVEL_TB[it].name}
              </div>
            ))}
          </div>
          <div class={styles.menu}>
            <div>{count}</div>
            <div class={styles.btn} onClick={reset}>{renderBtn(status)}</div>
            <div>{time}</div>
          </div>
          <div></div>
        </header>
      )
    }
  }
})