import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Signin from '../views/Signin.vue'
import Home from '../views/Home.vue'
import Perfil from '../views/Perfil.vue'
import Register from '../views/Register.vue'
import Eventos from '../views/Eventos.vue'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes : [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Perfil',
      name: 'Perfil',
      component: Perfil,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Eventos',
      name: 'Eventos',
      component: Eventos,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    }
  ]
})



router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('Login')
  else if (!requiresAuth && currentUser) next('Home')
  else if (!requiresAuth && currentUser) next('Perfil')
  else next()
})

export default router
