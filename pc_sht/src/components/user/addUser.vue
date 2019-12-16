<template>
    <div class="content">
        <el-form class="form" ref="form" :inline="true" :model="form" :rules="rules"  label-width="120px" size="small">
            <div class="title">账号信息</div>
            <el-form-item label="账号" prop="account">
                <el-input class="fill" v-model="form.account" clearable placeholder="请输入账号"></el-input> 
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input class="fill" type="password" v-model="form.password" clearable placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="系统角色" prop="systemRole">
                <el-select class="fill" v-model="form.systemRole" clearable placeholder="请选择">
                    <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">          
                <el-switch v-model="form.switchStatus" 
                    :class="{'active-icon-class':activeIconClass,'inactive-icon-class':inActiveIconClass}" 
                    active-text="禁用" inactive-text="启用"> </el-switch>
            </el-form-item>
            <div class="title user-msg">用户信息</div>
            <el-form-item label="营业执照号：" class="padding-left" prop="code">
                <el-input class="fill-input" v-model="form.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业名称：" class="padding-left" prop="name">
               <el-input class="fill-input" v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" class="padding-left" prop="idCard">
                <el-input class="fill-input" v-model="form.idCard" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人：" class="padding-left" prop="people">
                <el-input class="fill-input" v-model="form.people" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" class="padding-left" prop="phone">
               <el-input class="fill-input" v-model="form.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址：" class="padding-left" prop="addr">
                <el-cascader class="fill-input" :options="addrOptions" v-model="form.addr" clearable
                     :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址：" class="padding-left" prop="addrInfo">
                <el-input class="fill-input" v-model="form.addrInfo" clearable placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="所属节点：" class="padding-left" prop="node">
                <el-select class="fill-input" filterable v-model="form.node" placeholder="请选择" clearable>
                    <el-option v-for="item in nodeOptions" :key="item.node_id" :label="item.node_name" :value="item.node_id" > </el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button class="submit-btn" type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getAddr,addUser,GetAllNode} from '../../js/user/user.js'
import {getRoleList} from '../../js/role/role.js'
export default {
    name:'addUser',
    data(){
        return{           
            roleOptions: [],            
            activeIconClass:true,
            inActiveIconClass:false,
            form:{
                account:'',
                password:'',
                systemRole:'',
                switchStatus:true,
                code:'',
                name:'',
                idCard:'',
                people:'',
                phone:'',
                addr:[],
                addrInfo:'',
                node:''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                systemRole: [
                    { required: true, message: '请选择系统角色', trigger: 'change' }
                ],
                code: [
                    { required: true, message: '请输入营业执照号', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                idCard: [
                    {required: true, message: '请输入身份证号',trigger: 'blur'},
                    {
                        pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
                    }
                ],
                people: [
                    {required: true, message: '请输入联系人',trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入联系电话',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^((\d{3,4}-\d{7,8})|(1[35874]\d{9})|(\d{3,4}\d{7,8}))$/.test(value) == false){
                            callback(new Error("请输入正确的手机号或座机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                addr: [
                    {required: true, message: '请选择所在地区',trigger: 'blur'}
                ],
                addrInfo: [
                    {required: true, message: '请输入地址',trigger: 'blur'}
                ],
                node: [
                    {required: true, message: '请选择所属节点',trigger: 'change'}
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
            ]
        }
    },
    mounted(){
        console.log(localStorage.getItem('userId'))
        this.getNodeFun()
         // 获取系统角色
        let pageData = {
            page:'1',
            cols:'100',
            roleName:'',        
            userId:localStorage.getItem('userId')    
        }
        getRoleList(pageData)
            .then(res => {
                console.log(res)
                this.roleOptions = res.data.roleList;
            })
            .catch(res => {
                console.log(res)
            })
        // 获取地址
        getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
        
    },
    methods: {     
        getNodeFun(){
            GetAllNode()
                .then(res => {
                    console.log(res)
                    this.nodeOptions = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSubmit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }, 
        onSubmit(){
            let addrArr = [];
            this.addrOptions.forEach(ele => {
                if(ele.szm == this.form.addr[0]){
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.form.addr[1]){
                            addrArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form.addr[2]){
                                    addrArr.push(ele.caption)
                                    
                                }
                            })
                        }
                    })
                }
            })
            let addData = {
                userName:this.form.account,
                password:this.form.password,
                roleID:this.form.systemRole,
                state:this.form.switchStatus==true?1:0,
                licenceNo:this.form.code,
                nodeName:this.form.name,
                regId:this.form.idCard,
                name:this.form.people,
                callphone:this.form.phone,
                areaId:this.form.addr[2],
                areaName:addrArr.join(""),
                addr:this.form.addrInfo,
                nodeId:this.form.node,
                userId:localStorage.getItem('userId')
            }
            // console.log(this.form.addr)
            addUser(addData)
                .then(res => {                    
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.$router.push({path:'userList'})
                })
                .catch(res => {
                    console.log(res)
                })
      }
    },
    computed: {
        switchStatus() {
    　　　　return this.form.switchStatus
    　　}
    },
    watch:{
        switchStatus(value){
            // console.log(value)
            if(value){
                this.activeIconClass=true
                this.inActiveIconClass=false
            }else{
                this.activeIconClass=false
                this.inActiveIconClass=true
            }
        }
    }
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
