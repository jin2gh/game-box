<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type {
  Level
} from '@/core/minesweeper'
import {
  LEVEL_KEY,
  LEVEL_TB
} from '@/core/minesweeper/constants'

type menuEmits = {
  change: (level: Level) => void
  success: (time: number) => void
}

const menuProps = {
  count: Number,
  level: { type: String as PropType<Level>, required: true },
  onChange: Function as PropType<menuEmits['change']>,
  onSuccess: Function as PropType<menuEmits['success']>,
}
export default defineComponent({
  props: menuProps,
  data () {
    return {
      LEVEL_TB,
    }
  },
  methods: {
    changeLevel() {
      const { E, M, H } = LEVEL_KEY
      const newLevelMap = {
        [E]: M,
        [M]: H,
        [H]: E
      }
      this.$emit('change', newLevelMap[this.level || E])
    }
  }
})
</script>
<template>
  <header>
    <div class="box" @click="changeLevel">{{level ? LEVEL_TB[level].name : ''}}</div>
    <div>剩余：{{count}}</div>
  </header>
</template>
<style  scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.box {
  cursor: pointer;
}
</style>