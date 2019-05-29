<template>
    <div class="account-info">
        <section class="item">
            <span class="name">账号：</span>
            <div class="box">
                <span>{{username}}</span> 
                <!--<span class="Modify">修改</span>-->
                <span class="btn" @click="editNumFun">修改密码</span>
            </div>
        </section>
        <section class="item">
            <span class="name" style="margin-top:5px;">姓名：</span>
            <div class="box">
                <input class="user-name" type="text">
            </div>
        </section>
        <section class="item">
            <span class="name">联系方式：</span>
            <div class="box">
                <span>13713513900</span> 
                <span class="Modify">修改</span>
            </div>
        </section>
        <section class="item">
            <span class="name">角色：</span>
            <div class="box">
                <span>超级管理员</span> 
            </div>
        </section>
        <div class="footer">
            <input type="button" value="保存">
        </div>
        <div class="passwrd" v-if="isEdit">
            <div class="text">
                <div class="close" @click="closeFun">X</div>
                <el-form class="form" ref="form" :model="form" label-width="80px">
                    <el-form-item label="旧密码">
                        <el-input type="password" v-model="form.oldNum"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="form.newNum"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="form.sureNum"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sureNumFun">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {UpdatePassword} from '../../js/settings/settings.js'
export default {
    name:"accountSeting",
    data() {
        return {
            isEdit: false,
            form: {
                oldNum: '',
                newNum: '',
                sureNum: '',
            },
            username: '',
            password: ''
        }
    },
    mounted() {
        let username = JSON.parse(localStorage.getItem('username'));
        this.password = localStorage.getItem('password')
        this.username = username
    },
    methods: {
        sureNumFun(){
            //userName=ceshi2&password=123456
            let str = 'userName=' + this.username + '&password=' + this.form.newNum
            if(this.form.oldNum != this.password){
                this.$message.error("旧密码输入错误");
                return;
            }
            if(this.form.newNum != this.form.sureNum){
                this.$message.error("新密码输入不一致");
                return;
            }
            UpdatePassword(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.password = this.form.newNum
                        this.form = {
                            oldNum: '',
                            newNum: '',
                            sureNum: '',
                        }
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res);
                })
            this.isEdit = false
        },
        editNumFun(){
            this.isEdit = true
        },
        closeFun(){
            this.isEdit = false
        },
    }
}
</script>

<style scoped lang='less'>
    .account-info{
        padding: 30px 0 30px 80px;
        height: 100%;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-sizing: border-box;
        .passwrd{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -150px;
                margin-left: -200px;
                width: 400px;
                height: 300px;
                background: #fff;
                .close{
                    margin: 0 10px;
                    padding-left: 340px;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                }
                .form{
                    margin-top: 20px;
                    margin-left: 30px;
                    .el-input{
                        width: 200px;
                    }
                }
            }
        }
        .item{
            margin-bottom: 15px;
        }
        .name{
            float: left;
            width: 80px;
            text-align: right;
        }
        .box{
            margin-left: 90px;
            .Modify{
                margin-left: 20px;
            }
            .user-name{
                display:block;
                padding:0 10px;
                width: 250px;
                height: 30px;
                line-height: 30px;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
            .btn{
                margin-left: 20px;
                color: #409EFF;
                cursor: pointer;
            }
        }
        .footer{
            input{
                display: block;
                margin-top: 20px;
                margin-left: 200px;
                width: 60px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                background: #409EFF;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
</style>
