<template>
    <div class="enterprise-info">
        <section class="item">
            <span class="name">企业名称：</span>
            <div class="box">
                <el-input v-model="qyName" :disabled="disabled" clearable></el-input>
                <!--<span class="Modify">修改</span>-->
            </div>
        </section>
        <section class="item">
            <span class="name">机构类型：</span>
            <div class="box">
                <el-input v-model="jglx" :disabled="disabled" clearable></el-input>
            </div>
        </section>
        <!--<section class="item">-->
            <!--<span class="name">营业执照号：</span>-->
            <!--<div class="box">110010201805291037</div>-->
        <!--</section>-->
        <section class="item">
            <span class="name">所在地区：</span>
            <div class="box">
                <div v-if="btnMsg == '修改'">
                    <p class="addr">{{addrName}}</p>
                    <p>{{addr}}</p>
                </div>
                <div v-if="btnMsg == '保存'">
                    <el-cascader :options="addrOptions" v-model="addrList" 
                    placeholder="省/市/县" class="address" clearable :props="propes" change-on-select></el-cascader>
                    <br>
                    <el-input v-model="addr" clearable></el-input>
                </div>
            </div>
        </section>
        <section class="item">
            <span class="name">开通日期：</span>
            <div class="box msg">{{time}}</div>
        </section>
        <section class="item" style='margin-bottom: 15px;'>
            <span class="name" :style="logoUrl ? {'margin-top': '38px'} : {}">logo：</span>
            <div class="box">
                <figure class="image" v-if="logoUrl">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + logoUrl">
                </figure>
                <span class="submit">
                        上传图片
                    <form id="upload1" enctype="multipart/form-data" method="post"> 
                        <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event)">
                    </form>
                </span>  
                
            </div>
        </section>
        <section class="item" style='margin-bottom: 15px;'>
            <span class="name" :style="imgUrl ? {'margin-top': '38px'} : {}">企业图片：</span>
            <div class="box">
                <figure class="image" v-if="imgUrl">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + imgUrl">
                </figure>
                <span class="submit">
                        上传图片
                    <form id="upload2" enctype="multipart/form-data" method="post"> 
                        <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun2($event)">
                    </form>
                </span>  
                
            </div>
        </section>
        <section class="item">
            <span class="name" style='margin-top: 38px;'>企业简介：</span>
            <div class="box">
                <textarea v-model="qyjj" class="fill-textarea" :disabled="disabled"></textarea>
            </div>
        </section>
        <section class="item">
            <span class="name" style='margin-top: 5px;'>联系人姓名：</span>
            <div class="box">
                <el-input v-model="name" :disabled="disabled" clearable></el-input>
            </div>
        </section>
        <section class="item">
            <span class="name" style='margin-top: 5px;'>联系人手机号：</span>
            <div class="box">
                <el-input v-model="phone" :disabled="disabled" clearable></el-input>
            </div>
        </section>
        <div class="footer">
            <el-button type="primary" @click="editFun">{{btnMsg}}</el-button>
        </div>
    </div>
</template>

<script>
import {GetNodeInfo,UpdateNodeInfo} from '../../js/settings/settings.js'
import {baseUrl} from '../../js/address/url.js'
import {getAddr} from '../../js/user/user.js';
import axios from 'axios';
export default {
    name:'enterpriseInfo',
    data(){
        return{
            btnMsg: '修改',
            qyName: '', // 企业名称
            name: '', // 联系人
            phone: '', // 联系电话
            jglx: '', // 机构类型
            addrName: '', // 所在地区
            addrId: '', // 所在地区
            addr: '', // 详细地址
            time: '', // 开通日期
            qyjj: '', // 企业简介
            disabled: true,
            imgUrl: '',
            logoUrl: '',
            node_id: '',
            area_id: '',
            logoFile: '',
            imgFile: '',
            scShopId: '',
            logoArr: [],
            imgArr: [],
            clarity: '',
            addrList: [],
            addrOptions:[],
            propes:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
        }
    },
    mounted(){
        this.node_id = localStorage.getItem('loginId')
        this.scShopId = localStorage.getItem('scShopId');
        // console.log(this.$route.meta.title)
        this.getAddrList()
        this.getQyMsgFun()
    },
    methods: {
        getAddrList(){//获取地区列表
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                    if(this.addrName){
                        let addrArr = []
                        let areaName = this.addrName
                        if(areaName.slice(0,3) == '北京市'){
                            addrArr.push('110000')
                            this.addrOptions.forEach(ele => {
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
                            console.log(addrArr)
                            this.addrList = addrArr.slice(0,3)
                        }else if(areaName.slice(0,3) == '上海市'){
                            addrArr.push('310000')
                            this.addrOptions.forEach(ele => {
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
                            this.addrList = addrArr.slice(0,3)
                        }else if(areaName.slice(0,3) == '天津市'){
                            addrArr.push('120000')
                            this.addrOptions.forEach(ele => {
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
                            this.addrList = addrArr.slice(0,3)
                        }else if(areaName.slice(0,3) == '重庆市'){
                            addrArr.push('500000')
                            this.addrOptions.forEach(ele => {
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
                            this.addrList = addrArr.slice(0,3)
                        }else{
                            if(this.addrId){
                                let originArr = []
                                if(this.addrId.slice(4,6) != '00'){
                                    originArr.unshift(this.addrId);
                                }
                                if(this.addrId.slice(2,4) != '00'){
                                    originArr.unshift(this.addrId.slice(0,4)+'00');
                                }
                                if(this.addrId.slice(0,2) != '00'){
                                    originArr.unshift(this.addrId.slice(0,2)+'0000');
                                }
                                this.addrList = originArr
                            }
                        }
                        console.log(this.addrList)
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // logo
        fileFun(event){
            var that = this;
            let file = event.target.files;
            let node_id = this.node_id,
                scShopId = this.scShopId,
                area_id = this.area_id,
                addrName = this.addrName,
                name = this.name,
                phone = this.phone,
                addr = this.addr,
                qyjj = this.qyjj,
                jglx = this.jglx,
                imgFile = this.imgFile,
                qyName = this.qyName;
            let reg = /.(jpg|png|PNG|JPG)+$/;  
            if(file[0].size){
                let point = file[0].name.indexOf('.');
                if(!reg.test((file[0].name).slice(point))){
                    this.$message.error("上传图片格式不支持");
                    return;
                }
                let size = file[0].size / 1024 / 1024 ;
                if(size > 0.5){
                    that.clarity = 0.5/size;
                }else{
                    that.clarity = 1;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file[0]); 
                reader.onload = function(){                    
                    that.imgFun(reader.result,that.clarity,function(src){
                        that.logoArr.push(src.slice(23))
                    })
                }
            }
            let timer = setInterval(()=>{
                if(this.logoArr.length == file.length){
                    let formData = new FormData()  
                    formData.append('logo', this.logoArr[0]);  
                    formData.append('node_id', node_id);  
                    formData.append('name',qyName); 
                    formData.append('introduce',qyjj); 
                    formData.append('node_type',jglx); 
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    const ajaxPost = function (url, params,config) {
                        return new Promise((resolve, reject) => {
                            axios
                                .post(url, params,{config})
                                .then((res) => {
                                    that.logoArr = []
                                    resolve(res.data)
                                })
                                .catch(() => {
                                    reject('error')
                                })
                        })
                    }  
                    let url = baseUrl + 'login/updateLogo'
                    ajaxPost(url,formData,config)
                        .then(res => {
                            // console.log(res)
                            that.logoUrl = res.data.logo
                            that.getQyMsgFun()
                        })
                        .catch(res => {
                            console.log(res)
                        })
                    clearInterval(timer);
                }
            },1000)
        },
        // 企业图片
        fileFun2(event){
            var that = this;
            let file = event.target.files;
            this.imgLength = file.length;
            let node_id = this.node_id,
                scShopId = this.scShopId,
                area_id = this.area_id,
                addrName = this.addrName,
                name = this.name,
                phone = this.phone,
                addr = this.addr,
                qyjj = this.qyjj,
                jglx = this.jglx,
                logoFile = this.logoFile,
                qyName = this.qyName;
            let reg = /.(jpg|png|PNG|JPG)+$/;  
            if(file[0].size){
                let point = file[0].name.indexOf('.');
                if(!reg.test((file[0].name).slice(point))){
                    this.$message.error("上传图片格式不支持");
                    return;
                }
                let size = file[0].size / 1024 / 1024 ;
                if(size > 0.5){
                    that.clarity = 0.5/size;
                }else{
                    that.clarity = 1;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file[0]); 
                reader.onload = function(){                    
                    that.imgFun(reader.result,that.clarity,function(src){
                        that.imgArr.push(src.slice(23))
                    })
                }
            }
            let timer = setInterval(()=>{
                if(this.imgArr.length == file.length){
                    let formData = new FormData()  
                    formData.append('img_url', this.imgArr[0]); 
                    formData.append('node_id', node_id);  
                    formData.append('name',qyName); 
                    formData.append('introduce',qyjj); 
                    formData.append('node_type',jglx); 
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    const ajaxPost = function (url, params,config) {
                        return new Promise((resolve, reject) => {
                            axios
                                .post(url, params,{config})
                                .then((res) => {

                                    resolve(res.data)
                                })
                                .catch(() => {
                                    reject('error')
                                })
                        })
                    }  
                    let url = baseUrl + 'login/updateImg'
                    ajaxPost(url,formData,config)
                        .then(res => {
                            that.imgArr = []
                            that.imgUrl = res.data.img_url
                            that.getQyMsgFun()
                        })
                        .catch(res => {
                            console.log(res)
                        })
                    clearInterval(timer);
                }
            },1000)
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
        editFun(){
            if(this.btnMsg == '修改'){
                this.disabled = false
                this.btnMsg = '保存'
            }else{
                this.disabled = true
                let addrArr = [], originArr = [];
                this.addrOptions.forEach(ele => {
                if(ele.szm == this.addrList[0]){
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                    if(ele.szm == this.addrList[1]){
                        addrArr.push(ele.caption)
                        ele.list.forEach(ele => {
                        if(ele.szm == this.addrList[2]){
                            addrArr.push(ele.caption)                              
                        }
                        })
                    }
                    })
                }
                })
                let obj = {
                    node_id: this.node_id,
                    name: this.qyName,
                    shop_booth_id: this.scShopId,
                    area_id: this.addrList[this.addrList.length -1],
                    area_name: addrArr.join(""),
                    contacts: this.name,
                    telephone: this.phone,
                    addr: this.addr,
                    introduce: this.qyjj,
                    node_type: this.jglx
                }
                console.log(obj)
                UpdateNodeInfo(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.btnMsg = '修改'
                            this.getQyMsgFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        getQyMsgFun(){
            let obj = {
                node_id: this.node_id
            }
            GetNodeInfo(obj)
                .then(res => {
                    this.qyName = res.data.name
                    this.name = res.data.contacts
                    this.phone = res.data.telephone
                    this.addr = res.data.addr
                    this.addrName = res.data.area_name
                    this.addrId = res.data.area_name
                    this.imgUrl = res.data.img_url
                    this.logoUrl = res.data.logo
                    this.area_id = res.data.area_id
                    this.jglx = res.data.node_type
                    this.time = res.data.record_date
                    this.qyjj = res.data.introduce
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        }
    }
}
</script>

<style rel="stylesheet/less" lang='less' scoped>
    .enterprise-info{
        padding: 30px 0 30px 80px;
        height: 100%;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-sizing: border-box;
        .file-img{
            height: 100px;
        }/*/**/ 
        .msg{
            height: 30px;
        }
        .submit{  
            position: relative;
            top: 50%;
            display: inline-block;
            margin-bottom: -12px;
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
                height: 36px;
                opacity: 0;
                background: rgba(0,0,0,0);
            }
        }
        .el-input, .el-cascader{
            width: 350px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 0;
        }
        .item{
            clear: both;
            margin-bottom: 10px;
        }
        .name{
            float: left;
            width: 100px;
            text-align: right;
        }
        .Modify{
            margin-left: 20px;
        }
        .box{
            margin-left: 110px;
            .addr{
                display:block;
                width: 250px;
                height: 30px;
                line-height: 30px;
            }
            .image{
                display: inline-block;
                /*margin-right: 10px;*/
                width: 200px;
                height: 100px;
                vertical-align: middle;
                border: 1px solid #eaeaea;
                overflow: hidden;
                img{
                    display: block;
                    border: none;
                    max-width: 100%;
                    max-height: 100%;

                }
            }
            .fill-textarea{
                display: block;
                padding: 5px;
                width: 400px;
                height: 150px;
                color: #606266;
                border: 1px solid #ddd;
                resize: none;
                box-sizing: border-box;
                text-indent: 2rem;
            }
            .contact-name,.contact-phone{
                display: inline-block;
                padding:0 10px;
                width: 250px;
                height: 30px;
                line-height: 30px;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
        }
        .footer{
            .el-button{
                margin-left: 200px;
            }
        }
    }
</style>
