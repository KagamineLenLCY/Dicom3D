import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Workspace from '../views/Workspace.vue'
import Library from '../views/Library.vue'
import Settings from '../views/Settings.vue'
import History from '../views/History.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: Workspace
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
