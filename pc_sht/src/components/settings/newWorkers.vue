<template>
    <div class="content newWorkers">
        <el-form ref="form" :model="form" label-width="100px" class="form">
            <el-form-item label="账号">
                <el-input v-model="form.account" clearable></el-input>
            </el-form-item>
            <p class="tips">初始密码000000</p>
            <el-form-item label="员工">
                <el-input v-model="form.staff" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.callphone" clearable></el-input>
            </el-form-item>
            <el-form-item label="角色" clearable>
                <el-select v-model="form.role" placeholder="请选择">
                    <el-option v-for="(item, index) in roleArr" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
                </el-select>
            </el-form-item><!---->
            <el-form-item style="margin-left: 100px;">
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {InsertStall, Query} from '../../js/settings/settings.js'
export default {
    name:'newWorkers',
    data(){
        return{
            form: {
                account: '',
                staff: '',
                callphone: '',
                role: '',
            },
            roleArr: [],
            node_id: '',
            node_name: '',
        }
    },
    mounted(){
        this.node_id = localStorage.getItem('loginId');
        this.node_name = localStorage.getItem('loginName');
        this.getQueryFun()
    },
    methods:{
        getQueryFun(){
            let obj = {
                page: 1,
                cols: 10000,
                parent: 2
            }
            Query(obj)
                .then(res => {
                    this.roleArr = res.data.roleList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        submitForm(){
            let obj = {
                node_id: this.node_id, // "市场id",
                node_name: this.node_name, // "市场名称"，
                username: this.form.account, // "账号名称"，
                password: '000000', // "账号密码"，
                name: this.form.staff, // "员工姓名",
                roleid: this.form.role, // "角色id"，
                telePhone: this.form.callphone, // “联系电话”
            }
            InsertStall(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('新增成功');
                        // this.$message.success(res.message);
                        this.$router.push({path:'WorkersSeting'});
                    }else{
                        this.$message.error('用户名已存在');
                    }
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
        .form{
            padding: 30px 50px;
            .el-input, .el-select{
                width: 300px;
            }
        }
        .tips{
            margin-left: 100px;
            font-size: 12px;
            color: #999;
        }
    }
</style>
