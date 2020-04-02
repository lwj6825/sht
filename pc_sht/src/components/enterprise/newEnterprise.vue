<template>
    <div class="content newEnterprise">
        <el-form class="form" ref="form" :inline="true" :model="form" :rules="rules"  label-width="120px" size="small">
            <div class="title">账号信息</div>
            <el-form-item label="账号" prop="account">
                <el-input class="fill" v-model="form.account" clearable placeholder="请输入"></el-input> 
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input class="fill" type="password" v-model="form.password" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态">          
                <el-switch v-model="form.switchStatus" 
                    :class="{'active-icon-class':activeIconClass,'inactive-icon-class':inActiveIconClass}" 
                    active-text="禁用" inactive-text="启用"> </el-switch>
            </el-form-item>
            <el-form-item label="区域代码" prop="qyCode">
                <el-input class="fill" v-model="form.qyCode" clearable placeholder="请输入"></el-input> 
            </el-form-item>
            <el-form-item label="行业代码" prop="hyCode">
                <el-input class="fill" v-model="form.hyCode" clearable placeholder="请输入密码"></el-input>
            </el-form-item>
            <div class="title user-msg">用户信息</div>
            <el-form-item label="企业名称" class="padding-left">
            <el-input class="fill-input" v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="营业执照号" class="padding-left">
                <el-input class="fill-input" v-model="form.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="法人代表" class="padding-left" prop="people">
                <el-input class="fill-input" v-model="form.people" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址：" class="padding-left">
                <el-cascader class="fill-input" :options="addrOptions" v-model="form.addr" clearable
                    :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址：" class="padding-left">
                <el-input class="fill-input" v-model="form.addrInfo" clearable placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="经营范围">
                <el-select v-model="form.range" filterable clearable placeholder="请选择">
                    <el-option  label="已上报" value="1"></el-option>
                    <el-option  label="未上报" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业类型">
                <el-select v-model="form.types" filterable clearable placeholder="请选择">
                    <el-option  label="已上报" value="1"></el-option>
                    <el-option  label="未上报" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属监管单位">
                <el-select v-model="form.company" filterable clearable placeholder="请选择">
                    <el-option  label="已上报" value="1"></el-option>
                    <el-option  label="未上报" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属区">
                <el-select v-model="form.region" filterable clearable placeholder="请选择">
                    <el-option  label="已上报" value="1"></el-option>
                    <el-option  label="未上报" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-btn" type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"newEnterprise",
    data() {
        return {
            roleOptions: [],            
            activeIconClass:true,
            inActiveIconClass:false,
            form:{
                account: '',
                password: '',
                switchStatus: true,
                qyCode: '', // 区域代码
                hyCode: '', // 行业代码
                name: '',
                code: '',
                people: '',
                addr: [],
                addrInfo: '',
                range: '',
                types: '',
                company: '', // 所属监管单位
                region: '', // 所属区
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                qyCode: [
                    { required: true, message: '请输入区域代码', trigger: 'blur' }
                ],
                qyCode: [
                    { required: true, message: '请输入行业代码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入营业执照号', trigger: 'blur' }
                ],
                people: [
                    {required: true, message: '请输入法人代表',trigger: 'blur'}
                ],
                addr: [
                    {required: true, message: '请选择联系地址',trigger: 'blur'}
                ],
                addrInfo: [
                    {required: true, message: '请输入详细地址',trigger: 'blur'}
                ],
                range: [
                    {required: true, message: '请选择经营范围',trigger: 'blur'}
                ],
                types: [
                    {required: true, message: '请选择企业类型',trigger: 'blur'}
                ],
                company: [
                    {required: true, message: '请选择所属监管单位',trigger: 'blur'}
                ],
                region: [
                    {required: true, message: '请选择所属区',trigger: 'blur'}
                ],
            },
            addrOptions: [],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            nodeOptions: [
                {
                    value: '110114107',
                    label: '水屯批发市场'
                }
            ],
            isShow: true, // 角色是否为运维
        }
    },
    mounted() {
        
    },
    methods: {
        saveFun(){

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }, 
    },
}
</script>

<style scoped lang='less'>
    .content{
        padding: 30px 30px 0;
        height: 100%; 
        background: #fff;
        box-sizing: border-box;
        .form{
            width: 800px;
            color: #606266;
            font-size: 14px;
            .fill-input{
                width: 260px;
            }
            .fill{
                width: 160px;
            }
            .text{
                display: inline-block;
                width: 80px;
                text-align: right;
            }
            .title{
                clear: both;
                margin-bottom: 10px;
                &.user-msg{
                    margin-top: 30px;
                }
            }
            .submit-btn{
                margin-left: 300px;
                font-size: 14px;
            }
            
        }
        .padding-left{
            padding-left: 90px;
        }

    }
</style>
<style lang='less'>
.el-switch__label--left{
    margin-right:-28px;
    z-index: 2;
    color: #fff;
    >span{
        position: relative;
        left: 4px;
    }
}
.el-switch__label--right{
    margin-left:-28px;
    z-index: 2;
    >span{
        position: relative;
        right: 4px;
    }
}
.el-switch.is-checked {
    .el-switch__core::after{
        z-index: 5;
    }
}
.el-switch__core{
    width: 54px !important;
}
.inactive-icon-class .el-switch__label--left,.active-icon-class .el-switch__label--right{   
    display: none;
}
</style>
