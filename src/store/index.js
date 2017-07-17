import Vue from 'vue'
import Vuex from 'vuex'
import LoginController from '../controllers/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login (state) {
      state.isLoggedIn = true
    },
    logout (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    checkLoginState (context) {
      return new Promise((resolve, reject) => {
        LoginController.getLoginStatus()
          .then((data) => {
            if (data.isLoggedIn) context.commit('login')
            else context.commit('logout')
            resolve()
          }).catch((err) => { reject(err) })
      })
    }
  }
})

export default store
