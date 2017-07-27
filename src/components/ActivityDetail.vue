<template>
  <div class="home">
    <h1>活动详情</h1>
    <el-form v-loading="isLoading" label-position="top" inline>
      <el-form-item label="ID">
        <span>{{ detailData.id }}</span>
      </el-form-item>
      <el-form-item label="活动名">
        <span>{{ detailData.name }}</span>
      </el-form-item>
      <el-form-item label="房间">
        <span>{{ detailData.roomName }}</span>
      </el-form-item>
      <el-form-item label="开始时间">
        <span>{{ dateFormat(detailData.beginTime) }}</span>
      </el-form-item>
      <el-form-item label="结束时间">
        <span>{{ dateFormat(detailData.endTime) }}</span>
      </el-form-item>
      <el-form-item label="审核状态">
        <span>{{ detailData.isAccepted ? '通过' : '等待' }}</span>
      </el-form-item>
      <el-form-item label="申请人学号">
        <span>{{ detailData.studentId }}</span>
      </el-form-item>
      <el-form-item label="申请人姓名">
        <span>{{ detailData.studentName }}</span>
      </el-form-item>
      <el-form-item label="申请人电话">
        <span>{{ detailData.studentPhone }}</span>
      </el-form-item>
      <el-form-item label="申请时间">
        <span>{{ dateFormat(detailData.createTime) }}</span>
      </el-form-item>
      <el-form-item label="申请人邮箱">
        <span>{{ detailData.email }}</span>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button v-if="!detailData.isAccepted" type="success" @click="accept">通过</el-button>
        <el-button type="danger" @click="reject">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ActivityController from '../controllers/activity'
  import dateFormat from '../helpers/dateformat'
  export default {
    data () {
      return {
        detailData: {},
        isLoading: true
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      dateFormat,
      loadData () {
        var self = this
        self.isLoading = true
        ActivityController.getActivity(self.$route.params.id)
        .then((data) => {
          self.detailData = data
          self.isLoading = false
        }).catch((err) => {
          self.$alert(`加载失败 ${err.msg}`)
          self.isLoading = false
        })
      },
      accept () {
        var self = this
        ActivityController.acceptActivity(self.$route.params.id)
        .then((data) => {
          self.$alert(`操作成功`)
          self.loadData()
        }).catch((err) => {
          self.$alert(`操作失败 ${err.msg}`)
        })
      },
      reject () {
        var self = this
        ActivityController.deleteActivity(self.$route.params.id)
        .then((data) => {
          self.$alert(`操作成功`)
        }).catch((err) => {
          self.$alert(`操作失败 ${err.msg}`)
        })
      }
    }
  }
</script>
