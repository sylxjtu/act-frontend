<template>
  <div class="metadataEdit">
    <h1>修改信息</h1>
    <el-form :model="metadataEdit" inline v-loading="isLoading">
      <el-form-item label="旧密码" >
        <el-input v-model="metadataEdit.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" >
        <el-input v-model="metadataEdit.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" >
        <el-input v-model="metadataEdit.email" type="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import LoginController from '../controllers/login'
  export default {
    data () {
      return {
        isLoading: true,
        metadataEdit: {
          newPassword: '',
          oldPassword: '',
          email: ''
        }
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        var self = this
        LoginController.getMetadata().then((result) => {
          self.metadataEdit.email = result.email
          self.isLoading = false
        }).catch((err) => {
          self.$alert(`${err.msg}`)
          self.isLoading = false
        })
      },
      onSubmit () {
        var self = this
        var data = Object.assign({}, self.metadataEdit)
        if (!data.newPassword) data.newPassword = data.oldPassword
        LoginController.editMetadata(data).then(() => {
          self.$alert('修改成功')
        }).catch((err) => {
          self.$alert(`修改失败 ${err.msg}`)
        })
      }
    }
  }
</script>
