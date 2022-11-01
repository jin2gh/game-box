import {
  defineComponent,
  ref,
  onMounted,
} from 'vue'
import type { PropType } from 'vue'
import classnames from 'classnames'
import type { MinesweeperType } from '@/core/minesweeper'
import {
  init as initMS,
  type ItemVal,
  type Level
} from '@/core/minesweeper'
import {
  MASK_LINE,
  FLAG_LINE,
  QM_LINE,
  LAND_MINE_STATE,
  LEVEL_KEY
} from '@/core/minesweeper/constants'
import styles from './styles.module.scss'

export default defineComponent({
  name: 'Minefield',
  props: {
    level: { type: String as PropType<Level>, default: LEVEL_KEY.E },
  },
  setup(props) {
    const { level } = props
    const instance = ref<MinesweeperType>()

    function gameOver(): void {}

    function onSuccess(): void {

    }

    function init(): void {
      instance.value = initMS({
        level,
        fail: gameOver,
        success: onSuccess
      })
    }

    function show(x: number, y: number): void {
      instance.value?.clickItem([x, y])
    }
    function mark(e: MouseEvent, x: number, y: number): void {
      e.preventDefault()
      instance.value?.markItem([x, y])
    }
    function renderItem (val: ItemVal): JSX.Element {
      if (val === LAND_MINE_STATE) return <>&#128163;</>
      // if (val >= QM_LINE) return <>&#10067;</>
      if (val >= FLAG_LINE) return <>&#128681;</>
      if (val < MASK_LINE) return (<span class={classnames(styles.item, styles[`item-${val}`])}>{val}</span>)
      return <span></span>
    }

    onMounted(() => {
      init()
    })
    return () => (
      <div>
        {instance.value?.grid.map((row, i) => 
          <div class={styles.row}>
            {row.map((val, j) => (
              <div
                class={styles.col}
                onClick={() => show(i, j)}
                onContextmenu={e => mark(e, i, j)}
              >{renderItem(val)}
              </div>
            ))}
        </div>)}
      </div>
    )
  }
})