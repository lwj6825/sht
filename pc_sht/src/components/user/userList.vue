<template>
    <div class="content uesr-list">
        <div class="box">
            <div class="term">
                <p class="margin-rt">开通日期</p><p></p>
                <el-date-picker clearable style="width: 300px" v-model="time" value-format="yyyy-MM-dd" type="daterange"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="term">
                <p class="margin-rt">账号</p>
                <el-input class="file-input" v-model="account" clearable placeholder="请输入内容"></el-input>
            </div>
            <div class="term">
                <p class="margin-rt">系统角色</p>
                <el-select class="margin-rt file-input" v-model="systemRole" clearable placeholder="请选择">
                    <el-option v-for="item in systemRoleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"> </el-option>
                </el-select>
            </div>
            <div class="term">
                <p class="margin-rt">企业名称</p>
                <el-input class="file-input margin-rt" v-model="enterpriseName" clearable placeholder="请输入内容"></el-input>
            </div>
            <div class="term">
                <p class="margin-rt">状态</p>
                <el-select class="file-input" v-model="enterpriseStatus" clearable placeholder="请选择">
                    <el-option v-for="item in enterpriseStatusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div class="term">
                <p class="margin-rt">节点名称</p>
                <el-select class="file-input" v-model="nodeId" clearable filterable placeholder="请选择">
                    <el-option v-for="(item,index) in nodeList" :key="index" :label="item.node_name" :value="item.node_id"></el-option>
                </el-select>
            </div>
            <div class="term">
                <el-button type="primary" class="search-btn" @click="search()">搜索</el-button>
                <!--<el-button class="margin-rt file-btn">导出</el-button>-->
                <span class="clear-all" @click="clearAll()">清空筛选条件</span>
            </div>
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部用户</p>
                <div>
                    <el-button type="primary" @click="addUser()">{{addNew}}</el-button>
                    <el-button type="primary" @click="addMarketFun">添加市场</el-button>
                    <!--<el-button>导入</el-button>-->
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" v-loading="loading">
                <el-table-column prop="userName" label="账号" align="center"> </el-table-column>
                <el-table-column prop="roleName" label="节点名称">
                    <template slot-scope="scope">
                        <p>{{scope.row.bootList[0].node_name}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="name" :formatter='nameFormat' label="企业名称"> </el-table-column>
                <el-table-column prop="contacts" label="联系人" :formatter='contactPeopleFormat'> </el-table-column>
                <el-table-column prop="roleName" label="系统角色" align="center"> </el-table-column>
                <el-table-column prop="scbj" label="状态" align="center"> </el-table-column>
                <el-table-column prop="record_date" label="开通日期"> </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="lookInfo(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button type="text" v-if="scope.row.roleId == '2'" size="small" @click="loginFun(scope.row)">跳转登录</el-button>           
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination v-if="dataTotal" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next, jumper" :total='dataTotal'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getUserList,deleteUser,GetAllNode} from '../../js/user/user.js'
import {getRoleList} from '../../js/role/role.js'
import {router} from '../../js/address/url.js'
import {login,login2,GetShtUserInfo,Loginout} from "../../js/login/ajax.js";
export default {
    name:'userList',
    data(){
        return{
            addNew:'新建用户',
            time:'',
            account:'',
            enterpriseName:'',
            systemRole:'',
            systemRoleOptions: [],
            enterpriseStatus:'',
            enterpriseStatusOptions: [
                {
                    value: 0,
                    label: '禁用'
                },
                {
                    value: 1,
                    label: '启用'
                }
            ],
            tableData: [],
            currentPage:1,
            dataTotal:0,
            nodeList: [],
            nodeId: '',
            loading:true,
        }
    },
    mounted(){
        // 获取系统角色
        let pageData = {
            page:'1',
            cols:'1500',
            roleName:'',
        }
        getRoleList(pageData)
            .then(res => {
                this.systemRoleOptions = res.data.roleList;
            })
            .catch(res => {
                console.log(res)
            })
        //获取用户列表
        let userDate = { 
            page:'1',
            cols:'15',
            startDate:'',  
            endDate:'',  
            userName:'',  
            roleId:'', 
            boothName:'',  
            state:'',
            nodeId: this.nodeId,
        }
        getUserList(userDate)
            .then(res => {      
                // console.log(res)
                this.dataTotal = Number(res.data.condition.total);
                this.tableData = res.data.dataList
                this.tableData.forEach(ele => {
                    if(ele.scbj == "删除"){
                        ele.scbj = '禁用'
                    }
                });
                this.loading = false
            })
            .catch(res => {
                console.log(res)
                this.loading = false
            })
        this.getNodeFun()
    },
    methods: {
        loginFun(ele){//退出
            localStorage.clear();
            sessionStorage.clear();
            let data = {
                username : ele.userName,
                password : ele.password,
            }
            login(data).then((res)=>{
                location.reload();
                if(res.data.booth_list.length != 0){
                    let name = res.data.booth_list[0].name,
                        node_id = res.data.booth_list[0].node_id,
                        isRegion = res.data.role_list[0].region,
                        scShopId = res.data.booth_list[0].SHOP_BOOTH_ID,
                        roleId = res.data.role_list[0].ROLEID;
                    localStorage.setItem('loginName',name);
                    localStorage.setItem('loginId',node_id);
                    localStorage.setItem('isRegion',isRegion);
                    localStorage.setItem('scShopId',scShopId);
                    localStorage.setItem('roleId',roleId);
                    localStorage.setItem('account',this.account);
                    localStorage.setItem('password',this.password);
                    localStorage.setItem('userType',JSON.stringify(res.data.booth_list[0].usertype));
                }
                if(res.result){
                    if(this.check){
                        localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                        localStorage.setItem('username',JSON.stringify(this.account));
                        localStorage.setItem('checked',JSON.stringify(true));
                        localStorage.setItem('userId',res.data.userId);
                        localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                        this.userId = res.data.userId;
                    }else{
                        localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                        localStorage.setItem('username',JSON.stringify(this.account));
                        localStorage.setItem('userId',res.data.userId);
                        localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                        this.userId = res.data.userId;
                    }
                    this.$router.push({name:'home'})
                }else{
                    clocalStorage.clear();                    
                }                
            })
            .catch((res)=>{
                console.log(res)
            })
        },
        getNodeFun(){
            GetAllNode()
                .then(res => {
                    this.nodeList = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addMarketFun(){
            this.$router.push({name: 'addMarekt'})
        },
        handleSizeChange(val) { //pageSize 改变时会触发
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) { //currentPage 改变时会触发
            //获取用户列表
            if(this.time){
                this.loading = true
                let userDate = { 
                    page:val,
                    cols:'15',
                    startDate:this.time[0],
                    endDate:this.time[1],  
                    userName:this.account,  
                    roleId:this.systemRole, 
                    boothName:this.enterpriseName,  
                    state:this.enterpriseStatus,
                    nodeId: this.nodeId
                }
                getUserList(userDate)
                    .then(res => {                
                        this.dataTotal = Number(res.data.condition.total);
                        this.tableData = res.data.dataList
                        this.tableData.forEach(ele => {
                            if(ele.scbj == "删除"){
                                ele.scbj = '禁用'
                            }
                        });
                        this.loading = false
                    })
                    .catch(res => {
                        console.log(res)
                        this.loading = false
                    })
            }else{
                this.loading = true
                let userDate = { 
                    page:val,
                    cols:'15',
                    startDate:'',
                    endDate:'',  
                    userName:this.account,  
                    roleId:this.systemRole, 
                    boothName:this.enterpriseName,  
                    state:this.enterpriseStatus,
                    nodeId: this.nodeId
                }
                getUserList(userDate)
                    .then(res => {                
                        this.dataTotal = Number(res.data.condition.total);
                        this.tableData = res.data.dataList
                        this.tableData.forEach(ele => {
                            if(ele.scbj == "删除"){
                                ele.scbj = '禁用'
                            }
                        });
                        this.loading = false
                    })
                    .catch(res => {
                        console.log(res)
                        this.loading = false
                    })
            }
        },
        nameFormat(row){
            if(row.bootList.length>0){
                return row.bootList[0].booth_name
            }else{
                return '-'
            }
        },
        contactPeopleFormat(row, column) {
            return `${row.bootList[0].contacts} (${row.bootList[0].callphone})`
        },
        lookInfo(row) {
            this.$router.push({name:'LookInfo',params:{'row':row}})
        },
        handleDelete(row) {
            this.$confirm('是否要删除该账号信息？', '确认提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(row.userId)
                        .then(res => {
                            //获取用户列表
                            this.loading = true
                            let userDate = {page: 1,cols: 15, startDate:'',  endDate:'',  userName:'',  roleId:'', boothName:'',  state:'', nodeId: ''}
                            getUserList(userDate)
                                .then(res => {
                                    this.tableData = res.data.dataList
                                    this.dataTotal = Number(res.data.condition.total);
                                    this.currentPage = this.page
                                    this.loading = false
                                })
                                .catch(res => {
                                    console.log(res)
                                })
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                        .catch(res => {
                            console.log(res)
                            this.loading = false
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        addUser(){
            this.$router.push({name:'AddUser'})
        },
        search(){
            if(this.time){
                this.loading = true
                let userDate = {
                    startDate:this.time[0],
                    endDate:this.time[1],
                    userName:this.account,
                    roleId:this.systemRole,
                    boothName:this.enterpriseName,
                    state:this.enterpriseStatus,
                    nodeId: this.nodeId,
                    page: 1,cols: 15,
                }
                getUserList(userDate)
                    .then(res => {
                        this.tableData = res.data.dataList
                        this.dataTotal = res.data.condition.total;
                        this.loading = false
                    })
                    .catch(res => {
                        console.log(res)
                        this.loading = false
                    })
            }else{
                this.loading = true
                let userDate = {
                    startDate:'',
                    endDate:'',
                    userName:this.account,
                    roleId:this.systemRole,
                    boothName:this.enterpriseName,
                    state:this.enterpriseStatus,
                    nodeId: this.nodeId,
                    page: 1,cols: 15,
                }
                getUserList(userDate)
                    .then(res => {
                        this.tableData = res.data.dataList
                        this.dataTotal = res.data.condition.total;
                        this.loading = false
                    })
                    .catch(res => {
                        console.log(res)
                        this.loading = false
                    })
            }

        },
        clearAll(){
            this.time='';
            this.account='';
            this.systemRole='';
            this.enterpriseName='';
            this.enterpriseStatus='';
            this.nodeId = ''
            //获取用户列表
            this.loading = true
            let userDate = {page: 1,cols: 15, startDate:'',  endDate:'',  userName:'',  roleId:'', boothName:'',  state:'',nodeId: ''}
            getUserList(userDate)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.dataTotal = Number(res.data.condition.total);
                    this.loading = false
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
                })
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
    .tables{
        margin-top: 10px;
        padding: 10px;
        background: #fff;
    }
    .title{
        margin-bottom: 10px;
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
    .file-btn{
      color: #777;
      background: #fff;
      border-color: #eaeaea;
    }
    .search-btn{
        color: #409EFF;
        background: #fff;
    }
    .margin-rt{
        margin-right: 10px;
    }
    .clear-all{
        margin-left: 10px;
        cursor: pointer;
        color: #999;
    }
    .content{
        height: 100%;
        box-sizing: border-box;
        .box{
            display: flex;
            flex-wrap: wrap;
		    align-items: center;
            padding: 10px;
            font-size: 14px;
            background: #fff;
            .term{
                margin: 10px;
                display: flex;
                align-items: center;
                height: 30px;
            }
            .file-input{
                width: 200px;
            }
            .date-picker{
                float: left;
            }
        }
        .el-range-editor.el-input__inner{
            padding: 0 10px;
        }
    }
</style>
<style lang="less">
.uesr-list{
    .pagination{
        padding-top: 10px;
        text-align: center;
    }
    .el-input__icon{
        line-height: 30px;
    }
    .el-date-editor .el-range-input, .el-date-editor .el-range-separator{
        font-size: 13px !important;
    }
}
</style>