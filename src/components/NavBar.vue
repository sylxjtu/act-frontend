<template>
  <div class="nav">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <template>
        <el-menu-item v-if="isLoggedIn" index="/logout">管理员登出</el-menu-item>
        <el-menu-item v-else index="/login">管理员登录</el-menu-item>
      </template>
      <el-menu-item index="/application">活动室申请</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState({
      isLoggedIn: 'isLoggedIn'
    })
  }
</script>
