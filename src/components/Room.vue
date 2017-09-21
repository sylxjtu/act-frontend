<template>
  <div class="home">
    <h1>房间列表</h1>
    <el-table border
      v-loading="isLoading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="房间名">
      </el-table-column>
      <el-table-column
        label="管理"
        width="100">
        <template scope="scope">
          <el-button
          size="small"
          @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="createRoomData" class="createRoom" inline>
      <el-form-item label="房间名" >
        <el-input v-model="createRoomData.name" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建房间</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import RoomController from '../controllers/room'
  export default {
    data () {
      return {
        tableData: [],
        isLoading: true,
        createRoomData: {name: ''}
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
          self.tableData = data
          self.isLoading = false
        }).catch((err) => {
          self.$alert(err.msg)
          self.isLoading = false
        })
      },
      onSubmit () {
        var self = this
        RoomController.createRoom(self.createRoomData)
        .then(() => {
          self.$alert('创建成功')
          self.loadData()
        }).catch((err) => {
          self.$alert(`创建失败 ${err.msg}`)
        })
      },
      handleDelete (id) {
        var self = this
        RoomController.deleteRoom(id)
        .then(() => {
          self.$alert('删除成功')
          self.loadData()
        }).catch((err) => {
          self.$alert(`删除失败 ${err.msg}`)
        })
      }
    }
  }
</script>

<style scoped>
.createRoom {
  margin-top: 20px;
}
</style>
