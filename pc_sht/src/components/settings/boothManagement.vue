<template>
    <div class="content">
        <!--<div class="booth-management">
            <span class="new-add" @click="newAdd()">新增厅</span>
            <span class="import">批量导入</span>
        </div>
        <el-table :data="tableData"  border class="booth-management-msg">
            <el-table-column prop="boothName" label="摊位名称" width='600'> </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>-->
    </div>
</template>

<script>
export default {
    name:'custom',
    data(){
        return{
            tableData: [
                {boothName:'1厅'},
                {boothName:'2厅'},
            ]
        }
    },
    methods: {
        // 添加条目
        newAdd() {
            this.$prompt('新增厅', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                this.tableData.push({
                    boothName : value
                })
                this.$message({
                    type: 'success',
                    message: '新增厅: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
    //   修改此条
        modify(row){
            this.$prompt('修改信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                let msg = row.boothName;
                this.tableData.forEach(element => {
                    if(element.boothName == msg){
                        element.boothName = value;
                    }
                });
                this.$message({
                    type: 'success',
                    message: '修改 '+ msg +' 信息为: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消修改'
                });
            });
        },
    //   删除此条
        handleDelete(row) {
            this.$confirm('是否要删除该厅信息？', '确认提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                 this.tableData.forEach(element => {
                    if(element.boothName == row.boothName){
                        this.tableData.pop(element)
                    }
                });
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

<style rel="stylesheet/less" lang='less' scoped>
    .content{
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        .booth-management{
            span{
                display: inline-block;
                padding: 6px 10px;
                font-size: 12px;
                color: #fff;
                border-radius: 3px;
                cursor: pointer;
                border: 1px solid #409EFF;
                box-sizing: border-box;
            }
            .new-add{
                margin-right: 20px;
                background: #409EFF;
            }
            .import{
                color: #409EFF;
                background: #fff;
            }
        }
        .booth-management-msg{
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
