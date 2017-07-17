<template>
  <div class="login">
    <h1>管理员登录</h1>
    <el-row><el-col :span="8" :offset="8">
      <el-form ref="login" :model="login" label-position="top">
        <el-form-item label="密码" >
          <el-input v-model="login.data.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" >
          <el-input v-model="login.captcha" type="text"></el-input>
        </el-form-item>
        <img src="http://localhost:3000/captcha"></img>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col></el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        login: {
          data: {password: ''},
          captcha: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
