<template>
  <div id="app">
    <nav-bar></nav-bar>
    <el-row><el-col :xs="24" :md="{span: 12, offset: 6}">
    <router-view></router-view>
    </el-col></el-row>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'app',
  components: {
    'nav-bar': NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
label {
  font-weight: bold;
}
</style>
