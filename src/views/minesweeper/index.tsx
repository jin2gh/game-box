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
import Menu from './components/Menu.vue'
import styles from './styles.module.scss'

export default defineComponent({
  name: 'minisweeper',
  setup() {
    const instance = ref<MinesweeperType>()
    let level = ref<Level>(LEVEL_KEY.E)
    let count = ref<number>(0)

    function gameOver(): void {
      setTimeout(() => {
        alert('游戏结束')
      }, 999)
    }

    function onSuccess(): void {
      setTimeout(() => {
        alert('成功')
      }, 999)
    }

    function init(level: Level): void {
      instance.value = initMS({
        level,
        fail: gameOver,
        success: onSuccess
      })
      count.value = instance.value.count
    }

    function changeLevel(newVal: Level): void {
      level.value = newVal
      init(newVal)
    }

    function show(x: number, y: number): void {
      instance.value?.clickItem([x, y])
    }
    function mark(e: MouseEvent, x: number, y: number): void {
      e.preventDefault()
      instance.value?.markItem([x, y])
      count.value -= (instance.value?.flagged || 0)
    }
    function renderItem (val: ItemVal): JSX.Element {
      if (val === MINE_STATE) return <>&#128163;</>
      // if (val >= QM_LINE) return <>&#10067;</>
      if (val >= FLAG_LINE) return <>&#128681;</>
      if (val < MASK_LINE) return (<span class={classnames(styles.item, styles[`item-${val}`])}>{val}</span>)
      return <span></span>
    }

    onMounted(() => {
      init(level.value)
    })
    return () => (
      <>
        <Menu level={level.value} count={count.value} onChange={changeLevel} />
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
      </>
    )
  }
})