<template>
    <div class="content viewWorkers">
        <div class="box">
            <p class="title">员工信息</p>
            <div class="list">
                <div class="item" >
                    <p>账号</p>
                    <p>{{form.account}}</p>
                </div>
                <div class="item">
                    <p>密码</p>
                    <p>{{form.password}}</p>
                </div>
                <div class="item">
                    <p>员工</p>
                    <p>{{form.staff}}</p>
                </div>
                <div class="item">
                    <p>联系方式</p>
                    <p>{{form.callphone}}</p>
                </div>
            </div>
            <div class="list">
                <div class="item">
                    <p>角色</p>
                    <p>{{form.role}}</p>
                </div>
            </div>
        </div>
        <div class="msg">
            <p class="title">员工权限</p>
            <div class="role">
                <div>
                    <p>电脑端功能菜单</p>
                    <el-tree :data="dataArr1" default-expand-all node-key="id" ref="tree1" highlight-current :props="defaultProps1">
                    </el-tree>
                </div>
                <div>
                    <p>移动端功能菜单</p>
                    <el-tree :data="dataArr2" default-expand-all node-key="id" ref="tree2" highlight-current :props="defaultProps2">
                    </el-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {GetAllStallFunction} from '../../js/settings/settings.js'
export default {
    name:'viewWorkers',
    data(){
        return{
            form: {
                account: '',
                staff: '',
                callphone: '',
                role: '',
            },
            roleid: '',
            dataArr1: [],
            dataArr2: [],
            defaultProps1: {
                children: 'children',
                label: 'label'
            },
            defaultProps2: {
                children: 'children',
                label: 'label'
            },

        }
    },
    mounted(){
        // console.log(this.$route.params)
        this.form.account = this.$route.params.username
        this.form.password = this.$route.params.password
        this.form.staff = this.$route.params.name
        this.form.callphone = this.$route.params.telephone
        this.form.role = this.$route.params.role_name
        this.roleid = this.$route.params.roleid
        this.getDataFun()
        this.getDataFun2()
    },
    methods:{
        getDataFun(){
            let obj = {
                roleid: this.roleid, // "员工的角色id",
                mobile_flag: 1
            }
            GetAllStallFunction(obj)
                .then(res => {
                    let child_list = res.data.m_child_list;
                    child_list.forEach(v => {
                        v.label = v.describe
                        v.children = v.node_list
                        if(v.node_list){
                            v.node_list.forEach(v =>{
                                v.label = v.describe
                                v.children = v.node_list
                                if(v.node_list){
                                    v.node_list.forEach(v =>{
                                        v.label = v.describe
                                        v.children = v.node_list
                                        if(v.node_list){
                                            v.node_list.forEach(v =>{
                                                v.label = v.describe
                                                v.children = v.node_list
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.dataArr1 = child_list
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        getDataFun2(){
            let obj = {
                roleid: this.roleid, // "员工的角色id",
                mobile_flag: 2
            }
            GetAllStallFunction(obj)
                .then(res => {
                    let child_list = res.data.m_child_list;
                    child_list.forEach(v => {
                        v.label = v.describe
                        v.children = v.node_list
                        if(v.node_list){
                            v.node_list.forEach(v =>{
                                v.label = v.describe
                                v.children = v.node_list
                                if(v.node_list){
                                    v.node_list.forEach(v =>{
                                        v.label = v.describe
                                        v.children = v.node_list
                                        if(v.node_list){
                                            v.node_list.forEach(v =>{
                                                v.label = v.describe
                                                v.children = v.node_list
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.dataArr2 = child_list
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        }
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .title{
            padding: 10px;
            border-bottom: 1px solid #e4e7ed;
        }
        .box{
            padding: 0 20px;
            background: #fff;
            .list{
                display: flex;
                margin: 0 20px;
                .item{
                    flex: 1;
                    margin-right: 10px;
                    padding: 10px 0;
                    font-size: 14px;
                    p{
                        line-height: 30px;
                    }
                    p:last-child{
                        color: #999;
                    }
                }
                .item:last-child{
                    margin-right: 0px;
                }
            }
        }
        .tips{
            margin-left: 100px;
            font-size: 12px;
            color: #999;
        }
        .msg{
            padding: 0 20px 20px;
            margin-top: 10px;
            background: #fff;
            .role{
                margin-top: 10px;
                display: flex;
                div{
                    flex: 1;
                }
                .el-tree{
                    padding-top: 10px;
                    padding-left: 50px;
                }
                p{
                    padding-left: 20px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
<style lang="less">
    .viewWorkers{
        .el-tree__empty-text{
            left: 0;
            font-size: 14px;
        }
    }
</style>