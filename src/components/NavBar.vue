<template>
  <div class="nav">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <template v-if="isLoggedIn">
        <el-menu-item index="/logout">管理员登出</el-menu-item>
        <el-menu-item index="/metadata">修改邮箱/密码</el-menu-item>
      </template>
      <template v-else>
        <el-menu-item index="/login">管理员登录</el-menu-item>
      </template>
      <el-menu-item index="/application">活动室申请</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    created () {
      var self = this
      this.$store.dispatch('checkLoginState').catch((err) => { self.$alert(err.msg) })
    },
    computed: mapState({
      isLoggedIn: 'isLoggedIn'
    })
  }
</script>
