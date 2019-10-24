<template>
    <div class="content" ref='content'>
        <div class="search-area" ref='searchArea'>
            <span class="role-name">角色名称</span>
            <el-input class="search-input" v-model="searchInput" placeholder="请输入内容" clearable
                @keyup.native.13="search()" @blur="change()"></el-input>
            <el-button type="primary" class="search-btn ss-btn" @click="search()">搜索</el-button>
            <span class="clear" @click="clearFun">清空筛选条件</span>
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部角色</p>
                <div>
                    <el-button class="add-role" type="primary" @click="create()">{{createRole}}</el-button>
                </div>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="roleName" label="角色名称" align="center" fixed> </el-table-column>
                    <el-table-column prop="description" label="描述" align="center"> </el-table-column>
                    <el-table-column prop="iN_DATE" label="创建时间" align="center"> </el-table-column>
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
                    :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next, jumper" :total='dataTotal'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getRoleList,deleteRoleList,editRoleList} from '../../js/role/role.js'
export default {
    name:'roleManagement',
    data(){
        return{
            createRole:'创建角色',
            edit:'编辑',
            searchInput:'',
            tableData: [],
            page: 1,
            cols: 10,
            num: 0,
            userId: '',
            currentPage:1,
            dataTotal:0,
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
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
            let data = {
                roleName:this.searchInput,
                page: this.page,
                cols: this.cols,   
                USERID: this.userId,        
            };
            getRoleList(data)
                .then(res => {
                    console.log(res)
                    this.dataTotal = res.data.roleFuncton.total;
                    this.tableData = res.data.roleList;
                })
                .catch(res => {
                    console.log(res)
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
                roleName:'',   
                USERID:this.userId,         
            }
            getRoleList(pageData)
                .then(res => {
                    this.dataTotal = res.data.roleFuncton.total;
                    this.tableData = res.data.roleList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleDelete(rowdata) {             
          this.$confirm('是否要删除该角色信息？', '确认提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRoleList(rowdata.roleId)
                    .then(res => {
                        let pageData = {
                            page: this.page,
                            cols: this.cols,
                            roleName:'',       
                            USERID: this.userId,          
                        }
                        getRoleList(pageData)
                            .then(res => {
                                this.tableData = res.data.roleList;
                                this.dataTotal = res.data.roleFuncton.total;
                                this.currentPage = this.page
                                this.searchInput = ''
                            })
                            .catch(res => {
                                console.log(res.message)
                            })
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(res => {
                        console.log(res)
                    })

                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        
        },
        create(){
            this.$router.push({path:'editRole'})
        },        
        handleEdit(rowdata){
            this.$router.push({name:'EditRole',params:{'row':rowdata}})
        },
        search(){
            let data = {
                roleName:this.searchInput,
                page: this.page,
                cols: this.cols,   
                USERID: this.userId,        
            };
            getRoleList(data)
                .then(res => {
                    console.log(res)
                    this.dataTotal = res.data.roleFuncton.total;
                    this.tableData = res.data.roleList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        change(){
            if(!Boolean(this.searchInput)){                
                let pageData = {
                    page: this.page,
                    cols: this.cols,
                    roleName:'',    
                    USERID: this.userId,             
                }
                getRoleList(pageData)
                    .then(res => {
                        this.tableData = res.data.roleList;
                        this.dataTotal = res.data.roleFuncton.total;
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        }
        
    },
}
</script>
<style scoped lang='less'>    
    .content{
        height: 100%;
        box-sizing: border-box;
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
        .ss-btn{
            color: #409EFF;
            background: #fff;
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
    }
</style>


