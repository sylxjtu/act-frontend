<template>
  <div class="home">
    <h1>活动室申请系统</h1>
    <el-table border
      v-loading="isLoading"
      :data="tableData"
      :row-class-name="rowClassName"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名">
      </el-table-column>
      <el-table-column
        prop="roomName"
        label="房间">
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="开始时间"
        width="110"
        :formatter="beginTimeFormatter">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="110"
        :formatter="endTimeFormatter">
      </el-table-column>
      <el-table-column
        prop="isAccepted"
        label="审核状态"
        width="100"
        :formatter="acceptFormatter">
      </el-table-column>
      <el-table-column v-if = "isLoggedIn"
        label="管理"
        width="100">
        <template scope="scope">
          <el-button
          size="small"
          @click="handleDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-checkbox class="showAll" v-model="showAll">显示所有活动（包括已结束的活动）</el-checkbox>
  </div>
</template>

<script>
  import ActivityController from '../controllers/activity'
  import dateFormat from '../helpers/dateformat'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        tableData: [],
        isLoading: true,
        showAll: false
      }
    },
    created () {
      this.loadData()
    },
    computed: mapState({
      isLoggedIn: 'isLoggedIn'
    }),
    methods: {
      rowClassName: (row) => (row.isAccepted ? 'row-success' : 'row-pending'),
      acceptFormatter: (row) => (row.isAccepted ? '通过' : '等待'),
      beginTimeFormatter: (row) => (dateFormat(row.beginTime)),
      endTimeFormatter: (row) => (dateFormat(row.endTime)),

      loadData () {
        var self = this
        self.isLoading = true
        ActivityController.getActivities(self.showAll)
        .then((data) => {
          self.tableData = data
          self.isLoading = false
        }).catch((err) => {
          self.$alert(err.msg)
          self.isLoading = false
        })
      },

      handleDetail (activityId) {
        this.$router.push({name: 'ActivityDetail', params: {id: activityId}})
      }
    },
    watch: {
      showAll () {
        this.loadData()
      }
    }
  }
</script>

<style>
.row-success {
  background-color: #e2f0e4 !important;
}
.row-pending {
  background-color: #c9e5f5 !important;
}
</style>

<style scoped>
.showAll {
  margin-top: 20px;
}
</style>
