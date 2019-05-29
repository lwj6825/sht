<template>
    <div class="content">
        <div class="add-workers">
            <span>添加员工</span>
        </div>
        <el-table :data="tableData"  border class="workers-msg">
            <el-table-column prop="account" label="员工账号" align="center" fixed> </el-table-column>
            <el-table-column prop="name" label="员工姓名" align="center"> </el-table-column>
            <el-table-column prop="contact" label="联系方式" align="center"> </el-table-column>
            <el-table-column prop="role" label="角色" align="center"> </el-table-column>
            <el-table-column prop="date" label="创建时间" align="center"> </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="handleDelete()">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'addWorkers',
    data(){
        return{
            tableData: [
                {
                    account: '18310674889',
                    name: '王小虎',
                    contact: '18310674889',
                    role: '超级管理员',
                    date: '2018-05-13  10:20',
                }, 
                {
                    account: '18310674889',
                    name: '王小虎',
                    contact: '18310674889',
                    role: '超级管理员',
                    date: '2018-05-13  10:20',
                }, 
            ]
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleDelete() {
        this.$confirm('是否要删除该员工信息？', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
}
</script>

<style scoped lang='less'>
    .content{
        padding: 10px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
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
<style>
.el-table td, .el-table th{
    padding: 4px 0;
}
</style>

