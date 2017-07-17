<template>
  <h1>登出中</h1>
</template>

<script>
  import LoginController from '../controllers/login'
  export default {
    created () {
      var self = this
      LoginController.logout().then(() => {
        self.$alert('登出成功')
        self.$store.commit('logout')
      }).catch((err) => {
        self.$alert(`登出失败 ${err.msg}`)
        self.$store.dispatch('checkLoginState')
      })
    }
  }
</script>
