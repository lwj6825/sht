<template>
  <div class="content">
    <div class="title">
      <p class="tz-title">全部员工</p>
      <div>
        <el-button type="primary" size="medium" class="new-add" @click="addFun">添加员工</el-button>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="rowClass" class="workers-msg">
      <el-table-column prop="username" label="员工账号" ></el-table-column>
      <el-table-column prop="name" label="员工姓名"></el-table-column>
      <el-table-column prop="telephone" label="联系方式"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="record_date" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
            <el-button @click="viewFun(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editFun(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
      layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
  </div>
</template>

<script>
import {GetAllStall, DeleteStall} from '../../js/settings/settings.js'
export default {
  name:'addWorkers',
  data(){
    return{
      tableData: [],
      page: 1,
      cols: 15,
      num: 0,
      node_id: '',
    }
  },
  mounted() {
    this.node_id = localStorage.getItem('loginId');
    this.getDataFun()
  },
  methods: {
    getDataFun(){
      let obj = {
        page: this.page,
        cols: this.cols,
        name: '', // "姓名",
        role_name: '', // "角色名称"
        node_id: this.node_id,
      }
      GetAllStall(obj)
        .then(res => {
          this.tableData = res.data.list
          this.num = res.data.condition.total
        })
        .catch(() => {
          this.$message.error("出错啦!");
        })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getDataFun()
    },
    addFun(){
      this.$router.push({name: 'NewWorkers'})
    },
    editFun(row) {
      this.$router.push({name: 'EditWorkers', params: row})
    },
    viewFun(ele){
      this.$router.push({name: 'ViewWorkers', params: ele})
    },
    handleDelete(ele) {
      this.$confirm('是否要删除该员工信息？', '确认提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        let obj = {
          userid: ele.userid
        }
        DeleteStall(obj)
          .then(res => {
            if (res.result == true) {
              this.$message.success('删除成功');
              this.page = 1
              this.getDataFun()
            }else{
              this.$message.error('删除失败');
            }
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
        })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    rowClass({ row, rowIndex}) {
      return {
        background: '#f2f2f2',
        color: '#333'
      }
    },
  },
}
</script>

<style scoped lang='less'>
  .content{
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .title{
      display: flex;
      .tz-title{
        flex: 1;
        height: 20px;
        font-size: 14px;
        padding-left: 4px;
        line-height: 20px;
        box-sizing: border-box;
        border-left: 2px solid #409EFF;
      }
      div{
        display: flex;
        width: 300px;
        justify-content: flex-end;
      }
    }
    .add-workers{
      span{
        display: inline-block;
        padding: 6px 10px;
        font-size: 12px;
        color: #fff;
        border-radius: 3px;
        background: #409EFF;
        border: 1px solid #409EFF;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
    .workers-msg{
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
<style lang="less">
.el-table td, .el-table th{
  padding: 4px 0;
}
</style>

