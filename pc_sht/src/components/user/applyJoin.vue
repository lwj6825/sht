<template>
    <div class="content">
        <el-form class="form" ref="form" :model="form" :rules="rules" label-width="120px" size="small">
            <div class="title">企业基本信息</div>
            <el-form-item label="企业名称" prop="name">
                <el-input class="fill" v-model="form.name" clearable placeholder="请输入企业名称"></el-input> 
            </el-form-item>
            <el-form-item label="营业执照号" prop="license">
                <el-input class="fill" v-model="form.license" clearable placeholder="请输入营业执照号"></el-input> 
            </el-form-item>
            <el-form-item label="法人代表" prop="behalf">
                <el-input class="fill" v-model="form.behalf" clearable placeholder="请输入法人代表"></el-input>
            </el-form-item>
            <el-form-item label="经营地址" prop="addr">
                <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" style="width: 300px;" class="address" clearable :props="propes" change-on-select></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input class="fill" v-model="form.address" clearable placeholder="请输入详细地址"></el-input> 
            </el-form-item>
            <div class="title user-msg">联系人信息</div>
            <el-form-item label="联系人姓名" class="padding-left" prop="contact">
                <el-input class="fill-input" v-model="form.contact" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" class="padding-left" prop="phone">
               <el-input class="fill-input" v-model="form.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人邮箱" class="padding-left" prop="email">
                <el-input class="fill-input" v-model="form.email" clearable></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js'
export default {
    name:'applyJoin',
    data(){
        return{           
            roleOptions: [],            
            activeIconClass:true,
            inActiveIconClass:false,
            form:{
                name: '',
                license: '',
                behalf: '',
                address: '',
                addr:[],
                contact: '',
                phone: '',
                email: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                license: [
                    { required: true, message: '请输入营业执照号', trigger: 'blur' }
                ],
                behalf: [
                    { required: true, message: '请输入法人代表', trigger: 'blur' },
                ],
                addr: [
                    {required: true, message: '请选择经营地址',trigger: 'blur'}
                ],
                address: [
                    {required: true, message: '请输入详细地址',trigger: 'blur'}
                ],
                contact: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' }
                ],
                email: [
                    {required: true, message: '请输入联系邮箱',trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入联系电话',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(0\d{2,3}\d{7,8}))$/.test(value) == false){
                            callback(new Error("请输入正确的手机号或座机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
            },
            addrOptions: [],
            propes:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
        }
    },
    mounted(){
        
        this.getAddrList()
    },
    methods: {
        getAssetsAdd(){
            console.log(123)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getAssetsAdd()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getAddrList(){//获取地区列表
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                    let addrArr = [];
                    if(this.$route.params.goodsMsg){
                        if(this.$route.params.goodsMsg.areaOriginNname){
                        let areaName = this.$route.params.goodsMsg.areaOriginNname
                        if(areaName.slice(0,3) == '北京市'){
                            this.addrOptions.forEach(ele => {
                                addrArr.push('110000')
                                ele.list.forEach(ele => {
                                if(areaName.slice(3,6) == ele.caption){
                                    addrArr.push(ele.szm)
                                    ele.list.forEach(ele => {
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                    })
                                }
                                })
                            })
                        }else if(areaName.slice(0,3) == '上海市'){
                            this.addrOptions.forEach(ele => {
                                addrArr.push('310000')
                                ele.list.forEach(ele => {
                                if(areaName.slice(3,6) == ele.caption){
                                    addrArr.push(ele.szm)
                                    ele.list.forEach(ele => {
                                    // console.log(ele)
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                    })
                                }
                                })
                            })
                        }else{
                            return
                        }
                        this.form.addr = addrArr.slice(0,3)
                        }
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },

    }
}
</script>

<style scoped lang='less'>
    .content{
        padding: 10px 30px 0;
        height: 100%; 
        background: #fff;
        box-sizing: border-box;
        .title{
            margin: 20px 0;
            font-size: 14px;
        }
        .el-input,.el-select{
            width: 300px;
        }
    }
</style>
