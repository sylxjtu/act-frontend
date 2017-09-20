import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ActivityDetail from '@/components/ActivityDetail'
import Application from '@/components/Application'
import MetadataEdit from '@/components/MetadataEdit'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/activity/:id',
      name: 'ActivityDetail',
      component: ActivityDetail
    },
    {
      path: '/application',
      name: 'Application',
      component: Application
    },
    {
      path: '/metadata',
      name: 'MetadataEdit',
      component: MetadataEdit
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
})
