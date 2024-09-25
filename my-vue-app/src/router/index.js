import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
//import About from '../views/AboutView.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/UploadProduct',
    name: 'UploadProduct',
    component: () => import('../views/UploadProduct.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router