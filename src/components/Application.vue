<template>
  <div class="application">
    <h1>活动室申请</h1>
    <el-form :model="application" :rules="rules" v-loading="isLoading" ref="applicationForm" inline>
      <el-form-item label="活动名" prop="name">
        <el-input v-model="application.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="活动房间" prop="roomId">
        <el-select v-model="application.roomId">
          <el-option
            v-for="room in rooms"
            :key="room.id"
            :label="room.name"
            :value="room.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="timeRange">
        <el-date-picker v-model="application.timeRange" type="datetimerange"></el-date-picker>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="application.studentId" type="text"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="studentName">
        <el-input v-model="application.studentName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="studentPhone">
        <el-input v-model="application.studentPhone" type="text"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="application.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <!-- HACK: 将captcha加入验证 -->
        <el-input v-model="application.captcha" type="text"></el-input>
      </el-form-item>
      <captcha ref="captcha"></captcha>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ActivityController from '../controllers/activity'
  import RoomController from '../controllers/room'
  import Captcha from './Captcha'
  import dateFormat from '../helpers/dateformat'
  export default {
    data () {
      return {
        isLoading: true,
        rooms: [],
        application: {
          name: '',
          roomId: '',
          timeRange: ['', ''],
          studentId: '',
          studentName: '',
          studentPhone: '',
          email: '',
          captcha: ''
        },
        computed: {
          captcha () {
            return this.data.captcha
          }
        },
        rules: {
          name: [
            {required: true}
          ],
          roomId: [
            {required: true}
          ],
          timeRange: [
            {
              type: 'array',
              required: true,
              len: 2,
              fields: {
                0: {type: 'date'},
                1: {type: 'date'}
              }
            }
          ],
          studentId: [
            {required: true}
          ],
          studentName: [
            {required: true}
          ],
          studentPhone: [
            {required: true}
          ],
          email: [
            {required: true}
          ],
          captcha: [
            {required: true}
          ]
        }
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        var self = this
        self.isLoading = true
        RoomController.getRooms()
        .then((data) => {
          self.rooms = data
          self.isLoading = false
        }).catch((err) => {
          self.$alert(err.msg)
          self.isLoading = false
        })
      },
      submitData () {
        var self = this
        var captcha = self.application.captcha
        var data = Object.assign(
          {},
          self.application,
          {
            captcha: undefined,
            beginTime: dateFormat(self.application.timeRange[0]),
            endTime: dateFormat(self.application.timeRange[1])
          }
        )
        console.log(self.application)
        ActivityController.addActivity(data, captcha).then(() => {
          self.$alert('创建成功')
        }).catch((err) => {
          self.$alert(`创建失败 ${err.msg}`)
          self.$refs.captcha.reload()
        })
      },
      onSubmit () {
        var self = this
        self.$refs.applicationForm.validate((valid) => {
          if (valid) {
            self.submitData()
          } else {
            self.$alert('填写不符合规范')
            return false
          }
        })
      }
    },
    components: {
      'captcha': Captcha
    }
  }
</script>
