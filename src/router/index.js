import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ResultsView from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
