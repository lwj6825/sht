<template>
    <div class="content szAddEnterprise">
        <div class="box">
            <div class="list-title">基本资料</div>
            <div class="list">
                <div class="data">
                    <div class="title">账号</div>
                    <div class="msg">
                        <el-input v-model="form.account" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">密码</div>
                    <div class="msg">
                        <el-input v-model="form.password" clearable></el-input>
                    </div>
                </div>
                <!--<div class="data">
                    <div class="title">角色</div>
                    <div class="msg">
                        <el-select v-model="form.role" clearable placeholder="请选择">
                            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                            </el-option>
                        </el-select>
                    </div>
                </div>-->
                <div class="data">
                    <div class="title">联系人</div>
                    <div class="msg">
                        <el-input v-model="form.name" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">联系方式</div>
                    <div class="msg">
                        <el-input v-model="form.callphone" clearable></el-input>
                    </div>
                </div>
                <!--<div class="data">
                    <div class="title">企业编码</div>
                    <div class="msg">
                        <el-input v-model="form.qyCoding" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">企业名称</div>
                    <div class="msg">
                        <el-input v-model="form.qyName" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">状态</div>
                    <div class="msg">
                        <el-switch :width="widthNum" style="width: 150px;" v-model="form.states" active-text="启用" 
                            inactive-text="停用" active-value="启用" inactive-value="停用" @change="changeFun">
                        </el-switch>
                    </div>
                </div>-->
            </div>
        </div>
        <el-form :model="form" class="form" ref="form"  label-width="120px" size="small">
            <div class="list-title">企业信息</div>
            <el-form-item label="企业名称">
                <el-input v-model="form.enterprise" clearable></el-input>
            </el-form-item>
            <el-form-item label="营业执照号">
                <el-input v-model="form.licenceNo" clearable></el-input>
            </el-form-item>
            <!--<el-form-item label="营业执照附件">
                <div class="msg-item">   
                    <div class="img-list">
                        <ul>
                            <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                <figure class="image">
                                    <p class="icon-delete" @click="removeFun(index)">-</p>
                                    <img :src="item.img_url">
                                </figure>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span class="submit">
                            上传图片
                            <form id="upload" enctype="multipart/form-data" method="post"> 
                                <input type="file" class="file" ref="file" @change="fileFun($event)">
                            </form>
                        </span>
                    </div>
                </div>
            </el-form-item>-->
            <!--<el-form-item label="法人代表">
                <el-input v-model="form.behalf" clearable></el-input>
            </el-form-item>-->
            <el-form-item label="联系地址">
                <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" 
                    clearable :props="props" change-on-select></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.inforAddr" placeholder="请输入详细地址" clearable class="add-infor-input"></el-input>
            </el-form-item>
            <!--<el-form-item label="经营范围">
                <el-select v-model="form.jyScope" clearable placeholder="请选择">
                    <el-option v-for="item in roleList" :key="item.a_conf_id" :label="item.a_conf_item"
                        :value="item.a_conf_id">
                    </el-option>
                </el-select>
            </el-form-item>--><!---->
            <div class="list-title">联系人信息</div>
            <el-form-item label="联系人">
                <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.callphone" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 50px;">
                <el-button type="primary" class="new-add" @click="saveFun" size="mini">保存</el-button>
                <el-button size="mini" @click="cancalFun">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js';
import {getRoleList} from '../../js/role/role.js';
import {insBiz} from '../../js/management/management.js';
export default {
    name:"szAddEnterprise",
    data() {
        return {
            form: {
                account: '', // 账号
                password: '', // 密码
                role: '', // 角色
                qyCoding: '', // 企业编码
                qyName: '', // 企业名称
                states: '', // 状态
                enterprise: '', // 企业信息 -- 企业名称
                licenceNo: '', // 营业执照号
                behalf: '', // 法人代表
                addr: [], // 地址
                inforAddr: '', // 详细地址
                jyScope: '', // 经营范围
                name: '', // 联系人
                callphone: '', // 联系方式

                // people:'', // 联系人
                // phoneNumber: '', // 联系方式
                // regId: '', // 身份证号
                // cooperativeName: '', // 合作社名称
            },
            roleList: [],
            widthNum: 70,
            imgArr1: [],
            addrOptions:[],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem('userId'));
        this.getAddrList()
        this.getRoleType()
    },
    methods: {
        getAddrList(){//获取地区列表
            getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
        },
        getRoleType(){//获取角色列表
            let pageData = {
                page:'1',
                cols:'150',
                roleName:'',
                USERID: this.userId,
            }
            getRoleList(pageData)
                .then(res => {
                    this.roleList = res.data.roleList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
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
            let data = {
                userName:this.form.account,//账号
                password:this.form.password,//密码
                roleId: "7",//角色
                contact:this.form.name,//联系人
                telphone:this.form.callphone,// 联系方式
                state:"1",
                licenceNo:this.form.licenceNo,//营业执照号
                regId: '',//身份证
                nodeName:this.form.enterprise, // 企业名称
                name:this.form.name,//联系人
                callphone:this.form.callphone,//联系电话
                areaId:this.form.addr[2],//地址序列号
                areaName:addrArr.join(""),//地址名称
                addr:this.form.inforAddr,//地址详细信息
                userId:this.userId,//用户id
            }
            console.log(data)
            insBiz(data)
                .then(res => {
                    if(res.result){
                        this.$message.success(res.message)
                        this.$router.push({name:'SzEnterpriseList'})
                    }else{
                        // console.log(res.message);
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    // console.log(res.message)
                })
        },
        cancalFun(){
            this.$router.push({name: 'SzEnterpriseList'})
        },
        fileFun(event){
            // var that = this;
            // let file = event.target.files;
            // let reg = /.(jpg|png|PNG|JPG)+$/;           
            // if(file[0].size){
            //     let point = file[0].name.indexOf('.');
            //     if(!reg.test((file[0].name).slice(point))){
            //         this.$message.error("上传图片格式不支持");
            //         return;
            //     }
            //     let size = file[0].size / 1024 / 1024 ;
            //     if(size > 0.5){
            //         that.clarity = 0.5/size;
            //     }else{
            //         that.clarity = 1;
            //     }
            //     let reader = new FileReader();
            //     reader.readAsDataURL(file[0]); 
            //     reader.onload = function(){                    
            //         that.imgFun(reader.result,that.clarity,function(src){
            //             that.imgArr.push(src.slice(23))
            //         })
            //     }
            // }
            // let timer = setInterval(()=>{
            //     if(that.imgArr.length == file.length){
            //         let formData = new FormData()  
            //         formData.append('img_url', that.imgArr[0]);   
            //         formData.append('node_id', that.node_id);  
            //         formData.append('id', that.form.goodsID); 
            //         let config = {
            //             headers:{'Content-Type':'multipart/form-data'}
            //         };
            //         const ajaxPost = function (url, params,config) {
            //             return new Promise((resolve, reject) => {
            //                 axios
            //                     .post(url, params,{config})
            //                     .then((res) => {
            //                         resolve(res.data)
            //                     })
            //                     .catch(() => {
            //                         reject('error')
            //                     })
            //             })
            //         }  
            //         let url = baseUrl + 'goods/updateGoodsImgForTrace'
            //         ajaxPost(url,formData,config)
            //             .then(res => {
            //                 that.imgArr = []
            //                 that.imgUrl = res.data.img_url
            //             })
            //             .catch(res => {
            //                 console.log(res)
            //             })
            //         clearInterval(timer);
            //     }
            // },1000)
        },
        imgFun(path,quality,callback){
            let img = new Image();
            img.src = path;
            img.onload = function(){
                let that = this;
                let w = that.width;
                let h = that.height;
                // console.log(w,h)
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d'); 
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh); 
                    // 在canvas绘制前填充白色背景   
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(that, 0, 0, w, h);
                let base64 = canvas.toDataURL('image/jpeg', quality );
                // 回调函数返回base64的值
                callback(base64);
            }
        },
        changeFun(ele){
            // if(ele.status == '启用'){
                
            // }else if(ele.status == '停用'){
                
            // }
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        height: 100%;
        background: #fff;
        .list-title{
            padding-left: 20px;
            line-height: 40px;
        }
        .box{
            padding: 10px 20px;
            background: #fff;
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 28%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
            }
        }
        .msg-item{
            margin: 10px 0;
            width: 500px;
            display: flex;
            .submit{
                margin: 0 30px;
                position: relative;
                left: 0;
                top: 20%;
                display: inline-block;
                width: 90px;
                height: 30px;
                line-height: 30px;
                color: #409EFF;
                background: #fff;
                text-align: center;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px solid #409EFF;
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 90px;
                    height: 30px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
            }
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin: 10px;
                        .icon-delete{
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 12px;
                            height: 12px;
                            text-align: center;
                            line-height: 7px;
                            font-size: 24px;
                            background: #990000;
                            color: #fff;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }
        .el-input, .el-select, .el-cascader{
            width: 200px;
        }
        .form{
            padding: 10px 20px;
            .el-input, .el-select, .el-cascader{
                width: 400px;
            }
        }
    }
</style>
<style lang="less">
    .szAddEnterprise{
        .el-input__icon{
            line-height: 30px;
        }
        .el-switch__label--left{
            position: relative;
            left: 60px;
            color: #fff;
            z-index: -1111;
        }
        .el-switch__label--right{
            position: relative;
            right: 60px;
            color: #fff;
            z-index: -1111;
        }
        .el-switch__label.is-active{
            z-index: 1111;
            color: #fff;
        }
        .el-switch__core{
            width: 60px !important;
        }
    }
</style>
