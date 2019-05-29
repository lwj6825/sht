<template>
    <div class="content">
        <div class="custom">
            <span>添加商品类型</span>
        </div>
        <el-table :data="tableData"  border class="custom-msg">
            <el-table-column prop="goodsType" label="商品类型" width='600'> </el-table-column>            
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" size="small" @click="handleDelete()">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'custom',
    data(){
        return{
            tableData: [
                { goodsType: '肉禽蛋/鲜肉类/牛肉' }, 
                { goodsType: '主食' }, 
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
        .custom{
            span{
                display: inline-block;
                padding: 8px 20px;
                font-size: 12px;
                color: #fff;
                border-radius: 3px;
                background: #409EFF;
                border: 1px solid #409EFF;
                box-sizing: border-box;
                cursor: pointer;
            }
        }
        .custom-msg{
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
