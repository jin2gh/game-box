import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Level } from '@/core/minesweeper'
import { LEVEL_TB } from '@/core/minesweeper/constants'
import styles from './styles.module.scss'

type menuEmits = {
  change: (level: Level) => void
  success: (time: number) => void
}

const menuProps = {
  count: Number,
  onChange: Function as PropType<menuEmits['change']>,
}

export default defineComponent({
  name: 'menu',
  props: menuProps,
  emits: ['change'],
  setup(props, { emit }) {
    const { count } = props
    const btns = Object.keys(LEVEL_TB) as Level[]
    function changeLevel(level: Level) {
      emit('change', level)
    }
    return () => (
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
          <div class={styles.btn}>&#128578;</div>
          <div>{count}</div>
        </div>
      </header>
    )
  }
})