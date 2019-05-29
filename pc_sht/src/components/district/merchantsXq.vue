<template>
    <div class="header merchantsXq">
        <div class="account-cont">
            <p class="msg-title">账号信息</p>
            <el-row class="demo-autocomplete">
                <el-col :span="4"  class="sub-title">账号：</el-col>
                <el-col :span="4" class="sub-text">{{form.userName}}</el-col>
                <el-col :span="4"  class="sub-title">密码：</el-col>
                <el-col :span="4"  class="sub-text">******</el-col>
                <!--<el-col :span="4"  class="sub-title">角色：</el-col>
                <el-col :span="4"  class="sub-text"></el-col>-->
            </el-row>
            <el-row class="demo-autocomplete">
                <el-col :span="4" class="sub-title">联系人：</el-col>
                <el-col :span="4" class="sub-text">
                    <span :class="show ? 'block' : 'none'">{{form.name}}<i class="el-icon-edit" @click="showFun"></i></span>
                    <span :class="show ? 'none' : 'block'">
                        <el-input v-model="form.name"></el-input>
                    </span>
                    
                </el-col>
                <el-col :span="4" class="sub-title">联系方式：</el-col>
                <el-col :span="4"  class="sub-text">
                    <span :class="show2 ? 'block' : 'none'">{{form.telephone}}<i class="el-icon-edit" @click="showFun2"></i></span>
                    <span :class="show2 ? 'none' : 'block'">
                        <el-input v-model="form.telephone"></el-input>
                    </span>
                </el-col>
            </el-row>
        </div>

        <div class="store-cont">
            <p class="msg-title">商铺信息</p>
            <div class="enterprise-info">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="padding: 5px">
                    <el-tab-pane  type="card" v-for="(item) in tabs" :key="item.shop_booth_id" :label="item.booth_name" :name="item.booth_name">
                        <div class="section-content">
                            <el-form  label-width="120px" v-show="!isShow">
                                <el-form-item label="营业执照号：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.licenceNo}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.licenceNo"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.regId}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.regId"></el-input>
                                </el-form-item>
                                <el-form-item label="商户名称：" >
                                    <p :class="show3 ? 'block' : 'none'">{{item.booth_name}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.booth_name"></el-input>
                                </el-form-item>
                                <el-form-item label="联系人：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.contacts}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.contacts"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.callphone}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.callphone"></el-input>
                                </el-form-item>
                                <el-form-item label="所在地区：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.area_name}}</p>
                                    <span>
                                        <el-cascader :class="show3 ? 'none' : 'block'" class="fill-input" :options="addrOptions" v-model="form.area_name" clearable
                                        :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
                                    </span>
                                </el-form-item>
                                <el-form-item label="地址：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.addr}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.addr"></el-input>
                                </el-form-item>
                                <el-form-item label="摊位号：">
                                    <p :class="show3 ? 'block' : 'none'">{{item.stall_no}}</p>
                                    <el-input :class="show3 ? 'none' : 'block'" v-model="form.stall_no"></el-input>
                                </el-form-item>
                                <el-form-item>
                                <el-button  type="primary" style="background: #199ed8;" @click="showFun3(item)">{{editBtn}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="section-content" v-show="isShow">
                            <el-form label-width="120px">
                                <el-form-item label="营业执照号：">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号：">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="商户名称：" >
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="联系人：">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话：">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="所在地区：">
                                    <span>
                                        <el-cascader style="width: 380px;" class="fill-input" :options="addrOptions" v-model="form.areaName" clearable
                                        :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
                                    </span>
                                </el-form-item>
                                <el-form-item label="地址：">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="摊位号：">
                                    <el-input style="width: 260px;"></el-input>
                                    <span>&nbsp;&nbsp;例：1厅8排</span>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js'
import {updateBizUser,updateBizBooth} from '../../js/management/management.js';
    export default {
        name: "merchantsXq",
        created() {
            
        },
        data() {
            return {
                isShow:true,
                show: true,
                show2: true,
                show3: true,
                editBtn: '修改',
                tabs: [
                    {
                        booth_name: '添加店铺',
                        booth_name: '添加店铺',
                        shop_booth_id: ''
                    }
                ],
                activeName: '添加店铺',
                form: {
                    areaName: [],//所在地区
                },
                bootList: [],
                addrOptions: [],
                props:{
                    label: 'caption',
                    value:'szm',
                    children: 'list'
                },
                shopUserId: '',
                shop_booth_id: '',
                editForm:{},
            }
        },
        mounted(){
            if(this.$route.params.ele){
                this.form = this.$route.params.ele;
                this.bootList = this.$route.params.ele.bootList
                this.shop_booth_id = this.$route.params.ele.bootList[0].shop_booth_id
                this.shopUserId = this.$route.params.ele.userId
                for(var i in this.bootList){
                    this.tabs.unshift(this.bootList[i])
                }
            }
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        methods: {
            // 修改用户信息
            updateBizUserFun(){
            let obj = {
                contact: this.form.name,
                telphone: this.form.telephone,
                userId: this.shopUserId
            }
            updateBizUser(obj)
                .then(res =>{
                    if(res.result == true){
                        this.$message.success(res.message);
                    }else{
                        this.$message.error('用户信息修改失败');
                    }
                    })
                .catch(res =>{
                    console.log(res)
                })
            },
            // 修改商铺信息
            updateBizBooth(){
                let obj = {
                    shop_booth_id: this.shop_booth_id,
                    callphone: this.form.callphone,//联系电话
                    licenceNo: this.form.licenceNo,//营业执照号
                    nodeName: this.form.booth_name,//商铺名称
                    regId: this.form.regId,//身份证
                    name: this.form.contacts,//联系人
                    areaId: this.form.area_name[2],//地址序列号
                    areaName:this.form.addrInfor,//地址名称
                    addr: this.form.addr,//地址详细信息
                    stallNo: this.form.stall_no,//摊位号
                }
                updateBizBooth(obj)
                    .then(res =>{
                        if(res.result == true){
                            this.$message.success(res.message);
                        }else{
                            this.$message.error('商户信息修改失败');
                        }
                    })
                    .catch(res =>{
                        console.log(res)
                    })
            },
            showFun(){
                this.show = false
            },
            showFun2(){
                this.show2 = false
            },
            // 修改提交保存
            showFun3(ele){
                if(this.editBtn == '修改'){
                    this.show3 = false
                    this.editBtn = '保存'
                    this.form.licenceNo = ele.licenceNo;//营业执照号
                    this.form.regId = ele.regId;//身份证
                    this.form.booth_name = ele.booth_name;//商铺名称
                    this.form.contacts = ele.contacts;//联系人
                    this.form.callphone = ele.callphone;//联系电话
                    // this.form.addr = ele.areaIdArr;//地址名称
                    this.form.addr = ele.addr;//地址详细信息
                    this.form.stall_no = ele.stall_no;//摊位号
                    this.form.region = ele.region;//大区id
                    this.form.addrInfor = ele.area_name
                    if(ele.area_id){
                        let arr = [];
                        if(ele.area_id.slice(4,6) != '00'){
                            arr.unshift(ele.area_id);
                        }
                        if(ele.area_id.slice(2,4) != '00'){
                            arr.unshift(ele.area_id.slice(0,4)+'00');
                        }
                        if(ele.area_id.slice(0,2) != '00'){
                            arr.unshift(ele.area_id.slice(0,2)+'0000');
                        }
                        this.form.area_name = arr;
                    }
                }else if(this.editBtn == '保存'){

                    this.updateBizUserFun()
                    this.updateBizBooth()
                    this.$router.push({name: "GlMerchants"})
                }
            },
            handleClick(tab, event) {
                if(this.activeName == "添加店铺"){
                    this.isShow = true
                }else {
                    this.isShow = false
                }
            }
        }
    };
</script>

<style lang='less' scoped>
.header {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
    .msg-title{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        padding-left: 10px;
        box-sizing: border-box;
        border-left: 2px solid #409EFF;
    }
    .block{
        display: block;
    }
    .none{
        display: none;
    }
    .btn{
        float:right;
        margin-right: 33%;
        background: #199ed8;
    }
    .demo-autocomplete{
        margin-top: 10px;
        .sub-title {
            text-align: right;
            padding-right: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
        .sub-text {
            text-align: left;
            padding-right: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
    }
    .account-cont{
        padding: 20px 40px;
        width: auto;
    }
    .store-cont{
        margin: 20px 40px;
        .enterprise-info{
            padding: 20px 40px;
            font-size: 14px;
            .new-add{
                padding: 20px 60px ;
                background: #83CCE5;
                border-color: transparent;
            }
            .account-add{
                padding: 20px 60px ;
                border-color: #83CCE5;
            }
            .view{
                padding-top: 10px;
                border-bottom: 1px solid #83CCE5;
            }
        }
        .section-content{
            padding-left: 100px;
            width: 600px;
            margin-top: 10px;
            .el-input,.el-cascader{
                width: 380px;
            }
        }
    }
    .el-icon-edit{
        font-size: 18px;
        margin-left: 20px;
        color: #ccc;
        cursor: pointer;
    }
}
</style>
<style lang="less">
/** .merchantsXq{
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        background: #409EFF;
        color: #fff;
    }
    .el-tabs__item .is-top{
        border: none;
    }
}*/
    .merchantsXq{
        .el-tabs__item{
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__nav{
            border: none;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item{
            margin-right: 5px;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item{
            background: #eaeaea;
            color: #777;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
            /**color: #fff;
            border-top: 1px solid #409EFF;
            border-left: 1px solid #409EFF;
            border-right: 1px solid #409EFF;
            background: #409EFF; */
            border: 1px solid #409EFF;
            color: #409EEF;
            background: #fff;
        }
    }
</style>