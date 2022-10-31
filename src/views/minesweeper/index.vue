<script lang="ts">
import { defineComponent } from 'vue'
import { LEVEL_KEY } from '@/core/minesweeper/constants'
import Minefield from './components/Minefield'


export default defineComponent({
  name: 'minisweeper',
  components: {
    Minefield
  },
  data() {
    return {
      LEVEL_KEY
    }
  }
})
</script>
<template>
  <div>
    <Minefield :level="LEVEL_KEY.H" />
  </div>
</template>