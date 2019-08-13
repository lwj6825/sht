<template>
    <div class="content">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width: 30%;margin-left: 150px">
            <el-form-item label="区域名称：" prop="nodeName">
                <el-input v-model="form.nodeName"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：" prop="boothType">
                <el-select v-model="form.boothType" placeholder="请选择经营范围">
                    <el-option label="肉类" value="肉类"></el-option>
                    <el-option label="蔬菜" value="蔬菜"></el-option>
                    <el-option label="水果类" value="水果类"></el-option>
                    <el-option label="禽蛋类" value="禽蛋类"></el-option>
                    <el-option label="粮油副食" value="粮油副食"></el-option>
                    <el-option label="酒水饮料" value="酒水饮料"></el-option>
                    <el-option label="干货类" value="干货类"></el-option>
                    <el-option label="水产类" value="水产类"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="负责人：" prop="contact">
                <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="callphone">
                <el-input v-model="form.callphone"></el-input>
            </el-form-item>
            <!--<el-form-item label="角色：" prop="role">
                <el-select class="fill" v-model="form.role" placeholder="请选择">
                    <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"> </el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item>
                <el-checkbox-group v-model="form.sendMsg">
                    <el-checkbox label="1" name="type" value="1">是否短信告知负责人？</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="已签供应商：">
                <el-button :style="current ? {color: '#fff',background: '#26a2ff'} : {color: '#666'}"  @click="btnFun('1')">是</el-button>
                <el-button :style="current1 ? {color: '#fff',background: '#26a2ff'} : {color: '#666'}"  @click="btnFun('2')">否</el-button><!---->
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {AddMarkets } from '../../js/district/district.js';
export default {
    name:"addMarket",
    data() {
        return {
            form: {
                nodeName: '', // 区域名称
                boothType: '', // 经营范围
                contact: '', // 负责人
                sendMsg: '', // 是否通知
                callphone: '', // 联系方式
                role: '',
            },
            bindgys: 1, // 已签供应商
            rules: {
                nodeName: [
                    { required: true, message: '请输入区域名称', trigger: 'blur' }
                ],
                boothType: [
                    { required: true, message: '请选择经营范围', trigger: 'change' }
                ],
                contact: [
                    { required: true, message: '请输入负责人', trigger: 'blur' }
                ],
                callphone: [
                    {required: true, message: '请输入联系方式',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^((\d{3,4}-\d{7,8})|(1[34578]\d{9})|(\d{3,4}\d{7,8}))$/.test(value) == false){
                        // (/^1[34578]\d{9}$/.test(value) == false || /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/ == false)
                            callback(new Error("请输入正确的手机号或座机号"));
                        }
                        else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                // role: [
                //     { required: true, message: '请选择角色', trigger: 'change' }
                // ],
            },
            current: true,
            current1: false,
            userId: '',
            roleOptions: [],
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    mounted() {
    },
    methods: {
        btnFun(ele){
            this.bindgys = ele
            if(ele == 1){
                this.current = true
                this.current1 = false
            }if(ele == 2){
                this.current = false
                this.current1 = true
            }
        },
        saveFun(){
            let obj = {
                nodeName: this.form.nodeName,
                contact: this.form.contact,
                callphone: this.form.callphone,
                boothType: this.form.boothType,
                bindgys: this.bindgys,
                userId: this.userId,
                roleId: this.form.role
            }
            AddMarkets(obj)
                .then(res => {
                    if (res.result == true) {
                        if(res.message == '保存成功'){
                            this.$message.success(res.message);
                            this.$router.push({path:'market'});
                        }else{
                            this.$message.error(res.message);
                        }
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding-top: 50px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        .el-form{
            .el-input,.el-select{
                width: 344px;
            }
        }
        .el-form-item__content{
            margin-left: 100px;
            margin: 0 auto;
            text-align: center;
        }
    }
</style>
