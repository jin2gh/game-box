import {
  defineComponent,
  ref,
  onMounted,
} from 'vue'
import classnames from 'classnames'
import {
  init as initMS,
  type ItemVal,
  type Level,
  type MinesweeperType
} from '@/core/minesweeper'
import {
  MASK_LINE,
  FLAG_LINE,
  MINE_STATE,
  LEVEL_KEY
} from '@/core/minesweeper/constants'
import MenuBar from './Menu'
import styles from './styles.module.scss'

export default defineComponent({
  name: 'minisweeper',
  setup() {
    const instance = ref<MinesweeperType>()

    function init(level: Level): void {
      instance.value = initMS({ level })
    }

    function show(x: number, y: number): void {
      instance.value?.clickItem([x, y])
    }
    function mark(e: MouseEvent, x: number, y: number): void {
      e.preventDefault()
      instance.value?.markItem([x, y])
    }
    function renderItem (val: ItemVal): JSX.Element {
      if (val === MINE_STATE) return <>&#128163;</>
      // if (val >= QM_LINE) return <>&#10067;</>
      if (val >= FLAG_LINE) return <>&#128681;</>
      if (val < MASK_LINE) return (<span class={classnames(styles.item, styles[`item-${val}`])}>{val}</span>)
      return <span></span>
    }

    onMounted(() => {
      init(LEVEL_KEY.E)
    })
    return () => {
      const { level, state, count, flagged } = instance.value || {}
      const restCount = (count || 0) - (flagged || 0)

      return instance.value ? (
        <div class={styles.box}>
          <MenuBar
            count={restCount}
            level={level}
            status={state}
            onChangeLevel={init}
            onReset={() => init(level as Level)}
          />
          <div>
            {instance.value.grid.map((row, i) => 
              <div class={styles.field}>
                {row.map((val, j) => (
                  <div
                    class={styles.btn}
                    onClick={() => show(i, j)}
                    onContextmenu={e => mark(e, i, j)}
                  >{renderItem(val)}
                  </div>
                ))}
            </div>)}
          </div>
        </div>
      ) : null
    }
  }
})