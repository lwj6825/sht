<template>
    <div class="content" ref='content'>
        <div class="search-area" ref="searchArea">
            <span class="role-name">功能名称</span>
            <el-input class="search-input" v-model="searchInput" placeholder="请输入内容" @keyup.native.13="search()" clearable></el-input>
            <el-button type="primary" class="search-btn" @click='search()'>搜索</el-button>
            <span class="clear" @click="clearFun">清空筛选条件</span>
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部功能</p>
                <div>
                    <el-button class="add-role" type="primary" @click="addFunction()">{{addFun}}</el-button>
                </div>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="functionName" label="功能名称" align="center" fixed> </el-table-column>
                    <el-table-column prop="describe" label="别名" align="center"> </el-table-column>
                    <el-table-column prop="functionUrl" label="功能地址" align="center"> </el-table-column>
                    <el-table-column prop="functionParent" label="父节点" align="center"> </el-table-column>
                    <el-table-column prop="level" label="级别" align="center"> </el-table-column>
                    <el-table-column prop="sort" label="排序" align="center"> </el-table-column>
                    <el-table-column prop="type" label="类型" align="center"> </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">{{edit}}</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination v-if="dataTotal" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next, jumper"
                    :total='dataTotal'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getAllFunUrlList,
    getAllParentNode,
    searchFunUrlList,
    deleteItem,
    addFun,
} from '../../js/fun/fun.js'
export default {
    name:'funManagement',
    data(){
        return{
            searchInput:'',
            addFun:'新增功能模块',
            edit:'编辑',
            tableData: [],
            page: 1,
            cols: 15,
            userId: 1,
            currentPage:1,
            dataTotal:0,
        }
    },
    mounted(){
        this.getInitData(this.page);  
       
    },
    methods: {
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        clearFun(){
            this.searchInput = ''
            let pageData = {
                page:this.page,
                cols:this.cols,   
                functionName:this.searchInput    
            }
            searchFunUrlList(pageData)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.dataList;
                    this.dataTotal = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res.message)
                })
        },
        handleSizeChange(val) { //pageSize 改变时会触发
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){
            this.getInitData(val);
        },
        getInitData(page){
            let pageData = {
                page:page,
                cols:this.cols,       
            }
             getAllFunUrlList(pageData)
                .then(res => {
                    // console.log(res)
                    this.dataTotal = res.data.condition.total;
                    this.tableData = res.data.dataList;
                })
                .catch(res => {
                    console.log(res.result)
                })
        },
        handleDelete(data) {
            this.$confirm('是否要删除该员工信息？', '确认提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteItem({functionId:data.functionId})
                        .then(res => {
                            this.$message({
                                type: 'success',
                                message: res.message,
                            });
                            let pageData = {
                                page:page,
                                cols:this.cols,       
                            }
                            getAllFunUrlList(pageData)
                                .then(res => {
                                    this.tableData = res.data.dataList;
                                })
                                .catch()
                        })
                        .catch(res => {
                            console.log(res.result)
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        addFunction(){
            this.$router.push({name:'EditFun'})
        },
        handleEdit(row){
            this.$router.push({name:"EditFun",params:row})
        },
        search(){
            let pageData = {
                page:this.page,
                cols:this.cols,   
                functionName:this.searchInput    
            }
            searchFunUrlList(pageData)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.dataList;
                    this.dataTotal = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res.message)
                })
        },
        
    },

}
</script>

<style scoped lang='less'>
    .content{
        height: 100%;
        box-sizing: border-box;
    }
    .tables{
        margin-top: 10px;
        padding: 10px;
        background: #fff;
    }
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
    .add-role{
        background:#409EFF;
    }
    .search-area{
        padding: 10px;
        background: #fff;
        overflow: hidden;
        .role-name{
            display: inline-block;
            font-size: 14px;
        }
        .search-input{
            display: inline-block;
            margin-left: 10px;
            width: 200px;
        }
        .search-btn{
            display: inline-block;
            margin: 0 10px;
            color: #409EFF;
            background: #fff;
        }
        .clear{
            font-size: 14px;
            cursor: pointer;
            color: #999;
        }
    }
    .table-box{
        margin-top: 10px;
    }
    .pagination{
        padding-top: 10px;
        text-align: center;
    }
</style>
