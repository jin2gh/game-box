import { createRouter, createWebHistory } from 'vue-router'
import Minesweeper from '@/views/minesweeper/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'minesweeper',
      component: Minesweeper
    },
  ]
})

export default router
