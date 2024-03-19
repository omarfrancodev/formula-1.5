import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/Home.vue'
import MainResults from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainHome
  },
  {
    path: '/results',
    name: 'Results',
    component: MainResults
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
