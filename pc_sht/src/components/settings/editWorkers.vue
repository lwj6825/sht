<template>
    <div class="content editWorkers">
        <el-form ref="form" :model="form" label-width="100px" class="form">
            <el-form-item label="账号">
                <el-input v-model="form.account" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" clearable></el-input>
            </el-form-item>
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
import {UpdateStall, Query} from '../../js/settings/settings.js'
export default {
    name:'editWorkers',
    data(){
        return{
            form: {
                account: '',
                staff: '',
                callphone: '',
                role: '',
                password: '',
            },
            roleArr: [],
            userid: '',
        }
    },
    mounted(){
        // console.log(this.$route.params)
        this.form.account = this.$route.params.username
        this.form.password = this.$route.params.password
        this.form.staff = this.$route.params.name
        this.form.callphone = this.$route.params.telephone
        this.userid = this.$route.params.userid
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
                    if(this.$route.params.role_name){
                        this.roleArr.forEach(val => {
                            if(val.roleName == this.$route.params.role_name){
                                this.form.role = val.roleId
                            }
                        })
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        submitForm(){
            let obj = {
                userid: this.userid,
                username: this.form.account, // "账号名称"，
                password: '000000', // "账号密码"，
                name: this.form.staff, // "员工姓名",
                roleid: this.form.role, // "角色id"，
                telePhone: this.form.callphone, // “联系电话”
                password: this.form.password,
            }
            UpdateStall(obj)
                .then(res => {
                    if (res.result == true) {
                        // this.$message.success(res.message);
                        this.$message.success('修改成功');
                        this.$router.push({path:'WorkersSeting'});
                    }else{
                        this.$message.error('修改失败');
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
