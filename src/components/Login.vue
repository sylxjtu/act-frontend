<template>
  <div class="login">
    <h1>管理员登录</h1>
    <el-form :model="login" inline>
      <el-form-item label="密码" >
        <el-input v-model="login.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" >
        <el-input v-model="login.captcha" type="text"></el-input>
      </el-form-item>
      <captcha ref="captcha"></captcha>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import LoginController from '../controllers/login'
  import Captcha from './Captcha'
  export default {
    data () {
      return {
        login: {
          password: '',
          captcha: ''
        }
      }
    },
    methods: {
      onSubmit () {
        var self = this
        LoginController.login(self.login.password, self.login.captcha).then(() => {
          self.$alert('登录成功')
          self.$store.commit('login')
        }).catch((err) => {
          self.$alert(`登录失败 ${err.msg}`)
          self.$store.dispatch('checkLoginState')
          self.$refs.captcha.reload()
        })
      }
    },
    components: {
      'captcha': Captcha
    }
  }
</script>
