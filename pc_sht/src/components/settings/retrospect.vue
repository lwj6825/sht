<template>
    <div class="content">
        <div class="select">
            <p class="title">追溯精选</p>
            <div class="box">
                <ul class="list">
                    <li class="list-item" v-for="(item,index) in imgList" :key="index">    
                        <figure class="image">
                            <p class="icon-deletes" @click="deleteFun(item)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.IMG_URL">
                            <div class="submit-btn">
                                更换图片
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="replaceFun($event,item)">
                                </form>
                            </div>  
                        </figure>
                        <p class="good-name">{{item.GOODS_NAME}}</p>
                    </li>
                    <li>
                        <div class="submit" @click="showFun">
                            <p class="icon-add">+</p>
                            <p>选择推荐商品</p>
                        </div>
                    </li>  
                </ul>
                
            </div>
        </div>
        <div class="box-good" v-if="selectGood">
            <div class="text">
                <div class="box-title">
                    <p class="tit">选择推荐商品</p>
                    <p class="close" @click="closeFun">X</p>
                </div>
                <div class="search">
                    <el-input placeholder="请输入内容" v-model="goodName" clearable></el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
                <div class="checked">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item,index) in checkArr" :key="index" :label="item.ID">{{item.GOODS_NAME}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <el-pagination v-if="num" background layout="prev, pager, next" :current-page.sync="page" :page-size="cols" :total="num"
                @current-change="handleCurrentChange"></el-pagination><!---->
                <div class="btn">
                    <!--<p class="sure-btn">确定</p>-->
                    <el-button class="sure-btn" type="primary" @click="sureFun">确定</el-button>
                </div>
            </div>
        </div>
        <div class="msg">
            <p class="title">资质认证信息</p>
            <div class="msg-list">
                <div class="msg-type">
                    <div class="msg-item">
                        <div class="item-tit">
                            <img class="logo" src="../../assets/images/license.png" >
                            <p class="type-1">营业执照</p>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,5)">
                                </form>
                            </div>  
                            <p v-if="msgArr1.length > 4" class="list-btn" @click="moreFun(5)">{{moreBtn1}}</p>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item,index) in imgArr5" :key="index">
                                    <figure class="image">
                                        <p class="icon-deletes" @click="removeFun(5,item)">-</p>
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="viewFun(5,item)">
                                    </figure>
                                </li>
                            </ul>
                            <!--<div class="showMsg" v-if="showMsg5 && msgArr5.length > 0">
                                <p  class="name">1.jpg</p>
                                <p class="list-btn" @click="viewFun(5)">查看</p>
                                <p class="list-btn" @click="removeFun(5)">删除</p>
                            </div>
                            <ul v-if="!showMsg1">
                                <li v-for="(item,index) in msgArr5" :key="index">
                                    <p  class="name">{{(index+1) + '.jpg' }}</p>
                                    <p class="list-btn" @click="viewFun(5,item)">查看</p>
                                    <p class="list-btn" @click="removeFun(5,item)">删除</p>
                                </li>
                            </ul>-->
                        </div>
                    </div>
                    <div class="msg-item">
                        <div class="item-tit">
                            <img class="logo" src="../../assets/images/u166.png" >
                            <p class="type-1">有机认证</p>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,1)">
                                </form>
                            </div>  
                            <p v-if="msgArr1.length > 4" class="list-btn" @click="moreFun(1)">{{moreBtn1}}</p>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index">
                                    <figure class="image">
                                        <p class="icon-deletes" @click="removeFun(1,item)">-</p>
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="viewFun(1,item)">
                                    </figure>
                                </li>
                            </ul>
                            <!--<div class="showMsg" v-if="showMsg1 && msgArr1.length > 0">
                                <p  class="name">1.jpg</p>
                                <p class="list-btn" @click="viewFun(1)">查看</p>
                                <p class="list-btn" @click="removeFun(1)">删除</p>
                            </div>
                            <ul v-if="!showMsg1">
                                <li v-for="(item,index) in msgArr1" :key="index">
                                    <p  class="name">{{(index+1) + '.jpg' }}</p>
                                    <p class="list-btn" @click="viewFun(1,item)">查看</p>
                                    <p class="list-btn" @click="removeFun(1,item)">删除</p>
                                </li>
                            </ul>-->
                        </div>
                    </div>
                    <div class="msg-item">
                        <div class="item-tit">
                            <img class="logo" src="../../assets/images/u1450.png" >
                            <p class="type-1">ISO22000认证</p>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,2)">
                                </form>
                            </div>  
                            <p v-if="msgArr2.length > 4" class="list-btn" @click="moreFun(2)">{{moreBtn2}}</p>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item,index) in imgArr2" :key="index">
                                    <figure class="image">
                                        <p class="icon-deletes" @click="removeFun(2,item)">-</p>
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="viewFun(2,item)">
                                    </figure>
                                </li>
                            </ul>
                            <!--<div class="showMsg" v-if="showMsg2 && msgArr2.length > 0">
                                <p  class="name">1.jpg</p>
                                <p class="list-btn" @click="viewFun(2)">查看</p>
                                <p class="list-btn" @click="removeFun(2)">删除</p>
                            </div>
                            <ul v-if="!showMsg2">
                                <li v-for="(item,index) in msgArr2" :key="index">
                                    <p  class="name">{{(index+1) + '.jpg'}}</p>
                                    <p class="list-btn" @click="viewFun(2,item)">查看</p>
                                    <p class="list-btn" @click="removeFun(2,item)">删除</p>
                                </li>
                            </ul>-->
                        </div>
                    </div>
                    <div class="msg-item">
                        <div class="item-tit">
                            <img class="logo" src="../../assets/images/oldsize.png" >
                            <p class="type-1">中华老字号</p>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,3)">
                                </form>
                            </div>  
                            <p v-if="msgArr3.length > 4" class="list-btn" @click="moreFun(3)">{{moreBtn3}}</p>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item,index) in imgArr3" :key="index">
                                    <figure class="image">
                                        <p class="icon-deletes" @click="removeFun(3,item)">-</p>
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="viewFun(3,item)">
                                    </figure>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="msg-item">
                        <div class="item-tit">
                            <img class="logo" src="../../assets/images/renzheng.jpg" >
                            <p class="type-1">出口资质</p>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,4)">
                                </form>
                            </div>  
                            <p v-if="msgArr4.length > 4" class="list-btn" @click="moreFun(4)">{{moreBtn4}}</p>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item,index) in imgArr4" :key="index">
                                    <figure class="image">
                                        <p class="icon-deletes" @click="removeFun(4,item)">-</p>
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="viewFun(4,item)">
                                    </figure>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryGoodsForTrace,QueryGoodsForNoTrace,InsertGoodsForTrace,GetNodeZzrzForTrace,DeleteNodeZzrzForTrace} from '../../js/settings/settings.js';
import {baseUrl} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"retrospect",
    data() {
        return {
            imgFile: '',
            imgArr: [],
            imgList: [],
            selectGood: false,
            goodName: '',
            checked: [],
            checkArr: [],
            checkList: [],
            msgArr1: [],
            msgArr2: [],
            msgArr3: [],
            msgArr4: [],
            showMsg1: true,
            moreBtn1: '更多',
            showMsg2: true,
            moreBtn2: '更多',
            showMsg3: true,
            moreBtn3: '更多',
            showMsg4: true,
            moreBtn4: '更多',
            showMsg5: true,
            moreBtn5: '更多',
            node_id: '',
            node_name: '',
            logoFile: '',
            logoArr: [],
            logoList: [],
            clarity: '',
            imgArr1: [],
            imgArr2: [],
            imgArr3: [],
            imgArr4: [],
            imgArr5: [],
            page: 1,
            cols: 15,
            num: 0,
        }
    },
    mounted() {
        this.node_id = localStorage.getItem('loginId')
        this.node_name = localStorage.getItem('loginName')
        this.getSelectGoodFun()
        this.getMsgFun1()
        this.getMsgFun2()
        this.getMsgFun3()
        this.getMsgFun4()
        this.getMsgFun5()
    },
    methods: {
        handleCurrentChange(val){
            this.page = val
            this.showFun()
        },
        // 删除资质认证信息图片
        removeFun(ele,ele2){
            if(ele2){
                let obj = {
                    id: ele2.id,
                }
                DeleteNodeZzrzForTrace(obj)
                    .then(res => {
                        if (res.result) {
                            if(ele == 1){
                                this.getMsgFun1()
                            }else if(ele == 2){
                                this.getMsgFun2()
                            }else if(ele == 3){
                                this.getMsgFun3()
                            }else if(ele == 4){
                                this.getMsgFun4()
                            }else if(ele == 5){
                                this.getMsgFun5()
                            }
                            this.$message.success('删除成功');
                        }else{
                            this.$message.error('删除失败');
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        // 上传资质认证信息图片
        fileFun(event,ele){
            if(ele == 1){
                var that = this;
                let file = event.target.files;
                let reg = /.(jpg|png|tif|PNG|JPG)+$/;           
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
                        formData.append('img_url', this.logoArr[0]);  
                        formData.append('node_id', that.node_id);  
                        formData.append('img_type', 1); 
                        formData.append('type_name', '有机认证'); 
                        formData.append('node_name', that.node_name); 
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
                        let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                        ajaxPost(url,formData,config)
                            .then(res => {
                                that.logoArr = []
                                that.getMsgFun1()
                            })
                            .catch(res => {
                                console.log(res)
                            })
                        clearInterval(timer);
                    }
                },1000)
            }else if(ele == 2){
                var that = this;
                let file = event.target.files;
                let reader = new FileReader();
                let reg = /.(jpg|png|tif|PNG|JPG)+$/;           
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
                        formData.append('img_url', this.logoArr[0]);  
                        formData.append('node_id', that.node_id);  
                        formData.append('img_type', 2); 
                        formData.append('type_name', 'ISO22000认证'); 
                        formData.append('node_name', that.node_name); 
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
                        let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                        ajaxPost(url,formData,config)
                            .then(res => {
                                that.logoArr = []
                                that.getMsgFun2()
                            })
                            .catch(res => {
                                console.log(res)
                            })
                        clearInterval(timer);
                    }
                },1000)
            }else if(ele == 3){
                var that = this;
                let file = event.target.files;
                let reader = new FileReader();
                let reg = /.(jpg|png|tif|PNG|JPG)+$/;           
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
                        formData.append('img_url', this.logoArr[0]);  
                        formData.append('node_id', that.node_id);  
                        formData.append('img_type', 3); 
                        formData.append('type_name', '中华老字号'); 
                        formData.append('node_name', that.node_name); 
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
                        let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                        ajaxPost(url,formData,config)
                            .then(res => {
                                that.logoArr = []
                                that.getMsgFun3()
                            })
                            .catch(res => {
                                console.log(res)
                            })
                        clearInterval(timer);
                    }
                },1000)
            }else if(ele == 4){
                var that = this;
                let file = event.target.files;
                let reader = new FileReader();
                let reg = /.(jpg|png|tif|PNG|JPG)+$/;   
                console.log(file[0].size)        
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
                        formData.append('img_url', this.logoArr[0]);  
                        formData.append('node_id', that.node_id);  
                        formData.append('img_type', 4); 
                        formData.append('type_name', '出口资质'); 
                        formData.append('node_name', that.node_name); 
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
                        let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                        ajaxPost(url,formData,config)
                            .then(res => {
                                that.logoArr = []
                                that.getMsgFun4()
                            })
                            .catch(res => {
                                console.log(res)
                            })
                        clearInterval(timer);
                    }
                },1000)
            }else if(ele == 5){
                var that = this;
                let file = event.target.files;
                let reader = new FileReader();
                let reg = /.(jpg|png|tif|PNG|JPG)+$/;   
                console.log(file[0].size)        
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
                        formData.append('img_url', this.logoArr[0]);  
                        formData.append('node_id', that.node_id);  
                        formData.append('img_type', 5); 
                        formData.append('type_name', '营业执照'); 
                        formData.append('node_name', that.node_name); 
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
                        let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                        ajaxPost(url,formData,config)
                            .then(res => {
                                that.logoArr = []
                                that.getMsgFun5()
                            })
                            .catch(res => {
                                console.log(res)
                            })
                        clearInterval(timer);
                    }
                },1000)
            }
        },
        // 查看有机认证图片列表
        getMsgFun1(){
            let obj = {
                node_id: this.node_id,
                img_type: 1 
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.moreBtn1 = '更多'
                    this.msgArr1 = res.data
                    this.imgArr1 = this.msgArr1.slice(0,4)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 查看ISO22000认证图片列表
        getMsgFun2(){
            let obj = {
                node_id: this.node_id,
                img_type: 2 
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.moreBtn2 = '更多'
                    this.msgArr2 = res.data
                    this.imgArr2 = this.msgArr2.slice(0,4)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        //中华老字号
        getMsgFun3(){
            let obj = {
                node_id: this.node_id,
                img_type: 3 
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.moreBtn3 = '更多'
                    this.msgArr3 = res.data
                    this.imgArr3 = this.msgArr3.slice(0,4)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 出口资质
        getMsgFun4(){
            let obj = {
                node_id: this.node_id,
                img_type: 4 
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.moreBtn4 = '更多'
                    this.msgArr4 = res.data
                    this.imgArr4 = this.msgArr4.slice(0,4)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 营业执照
        getMsgFun5(){
            let obj = {
                node_id: this.node_id,
                img_type: 5
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.moreBtn5 = '更多'
                    this.msgArr5 = res.data
                    this.imgArr5 = this.msgArr5.slice(0,4)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 更换图片
        replaceFun(event,ele){
            var that = this;
            let file = event.target.files;
            let reg = /.(jpg|png)+$/;           
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
                    formData.append('node_id', that.node_id);  
                    formData.append('id', ele.ID); 
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
                    let url = baseUrl + 'goods/updateGoodsImgForTrace'
                    ajaxPost(url,formData,config)
                        .then(res => {
                            that.imgArr = []
                            that.getSelectGoodFun()
                        })
                        .catch(res => {
                            console.log(res)
                        })
                    clearInterval(timer);
                }
            },1000)
        },
        // 删除追溯精选图片
        deleteFun(ele){
            console.log(ele)
            let obj = {
                code: ele.ID,
                xjbj: 0
            }
            InsertGoodsForTrace(obj)
                .then(res => {
                    if (res.result) {
                        this.getSelectGoodFun()
                        this.$message.success('删除成功');
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 选择追溯精选图片
        sureFun(){
            let data = this.checkList.join(',')
            let obj = {
                code: data,
                xjbj: 1
            }
            InsertGoodsForTrace(obj)
                .then(res => {
                    if (res.result) {
                        this.selectGood = false
                        this.getSelectGoodFun()
                        this.$message.success('添加成功');
                    }else{
                        this.$message.error('添加失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        viewFun(ele,ele2){
            this.$router.push({name: 'LookImages',params: {type: ele,data: ele2}})
        },
        // 查看选中追溯精选商品
        getSelectGoodFun(){
            let obj = {
                node_id: this.node_id,
                xjbj: 1,
            }
            QueryGoodsForTrace(obj)
                .then(res => {
                    this.imgList = res.data.purchaseList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 查看所有追溯精选商品
        showFun(){
            let obj = {
                node_id: this.node_id,
                page: this.page,
                cols: this.cols
            }
            QueryGoodsForNoTrace(obj)
                .then(res => {
                    this.num = res.data.goodsinfo.total
                    this.checkArr = res.data.purchaseList
                    this.selectGood = true
                })
                .catch(res => {
                    console.log(res)
                })
        },
        closeFun(){
            this.selectGood = false
        },
        // 查看更多
        moreFun(ele){
            if(ele == 1){
                if(this.moreBtn1 == '更多'){
                    this.moreBtn1 = '收起'
                    this.imgArr1 = this.msgArr1
                }else if(this.moreBtn1 == "收起"){
                    this.imgArr1 = this.msgArr1.slice(0,4)
                    this.moreBtn1 = '更多'
                }
            }else if(ele == 2){
                if(this.moreBtn2 == '更多'){
                    this.imgArr2 = this.msgArr2
                    this.moreBtn2 = '收起'
                }else if(this.moreBtn2 == "收起"){
                    this.imgArr2 = this.msgArr2.slice(0,4)
                    this.moreBtn2 = '更多'
                }
            }else if(ele == 3){
                if(this.moreBtn3 == '更多'){
                    this.imgArr3 = this.msgArr3
                    this.moreBtn3 = '收起'
                }else if(this.moreBtn3 == "收起"){
                    this.imgArr3 = this.msgArr3.slice(0,4)
                    this.moreBtn3 = '更多'
                }
            }else if(ele == 4){
                if(this.moreBtn4 == '更多'){
                    this.imgArr4 = this.msgArr4
                    this.moreBtn4 = '收起'
                }else if(this.moreBtn4 == "收起"){
                    this.imgArr4 = this.msgArr4.slice(0,4)
                    this.moreBtn4 = '更多'
                }
            }
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
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .el-checkbox{
            margin-left: 30px;
            margin-bottom: 10px;
        }
        .box-good{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0,0,0,.6);
            z-index: 200;
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-left: -200px;
                margin-top: -300px;
                width: 400px;
                height: 600px;
                background: #fff;
                .el-pagination{
                    text-align: center;
                }
                .box-title{
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0 20px;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        flex: 1;
                        font-size: 14px;
                    }
                    .close{
                        width: 40px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .search{
                    margin: 10px 0;
                    text-align: center;
                    .el-input{
                        width: 260px;
                    }
                }
                .checked{
                    margin: 0 20px;
                }
                
                .btn{
                    .sure-btn{
                        margin-left: 50px;
                        color: #409EFF;
                        background: #fff;
                    }
                }
            }
        }
        .select,.msg{
            width: 100%;
            background: #fff;
            margin-bottom: 10px;
            .title{
                font-size: 14px;
                padding: 10px;
            }
        }
        .select{
            .list{
                display: flex;
                flex-wrap:wrap;
                padding: 10px;
                width: 1000px;
                li{
                    height: 130px;
                    margin: 10px 35px; 
                }
                .list-item{   
                    .image{
                        position: relative;
                        top: 0;
                        left: 0;
                        width: 100px;
                        height: 100px;
                        box-sizing: border-box;
                        border: 1px dashed #ccc;
                        .icon-deletes{
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 16px;
                            height: 16px;
                            text-align: center;
                            line-height: 10px;
                            font-size: 30px;
                            background: #990000;
                            color: #fff;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .submit-btn{
                            position: relative;
                            right: -48px;
                            bottom: 24px;
                            display: inline-block;
                            width: 50px;
                            height: 20px;
                            line-height: 20px;
                            color: #fff;
                            background:  #409EFF;
                            text-align: center;
                            overflow: hidden;
                            font-size: 12px;
                            .file{
                                position: absolute;
                                left: 0px;
                                top: 0px;
                                width: 50px;
                                height: 20px;
                                opacity: 0;
                                background: rgba(0,0,0,0);
                            }
                        }
                    }
                    .good-name{
                        margin-top: 10px;
                        width: 100px;
                        font-size: 14px;
                        text-align: center;
                        color: #666;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
                .submit{
                    width: 100px;
                    height: 100px;
                    color: #ccc;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px dashed #ccc;
                    cursor: pointer;
                    .icon-add{ 
                        font-size: 46px;
                    }
                }
            }
        }
        .msg{
            .msg-type{
                display: flex;
                flex-wrap:wrap;
                width: 1000px;
                .msg-item{
                    margin: 10px 0;
                    width: 330px;
                    .item-tit{
                        margin: 10px 30px;
                        display: flex;
                        .logo{
                            margin-top: 5px;
                            width: 20px;
                            height: 20px;
                        }
                        .type-1{
                            padding: 0 8px;
                            max-width: 110px;
                            font-size: 14px;
                            line-height: 30px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                        .submit{  
                            position: relative;
                            top: 50%;
                            display: inline-block;
                            margin-bottom: -12px;
                            width: 90px;
                            height: 30px;
                            line-height: 30px;
                            color: #ccc;
                            background: #fff;
                            overflow: hidden;
                            border-radius: 5px;
                            font-size: 14px;
                            box-sizing: border-box;
                            border: 1px dashed #ccc;
                            .btn{
                                display: flex;
                                p{
                                    line-height: 30px;
                                }
                                .icon-add{ 
                                    margin-left: 4px;
                                    margin-top: -2px;
                                    font-size: 26px;
                                }
                            }
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
                        .list-btn{
                            font-size: 12px;
                            margin-left: 10px;
                            line-height: 30px;
                            color: #409EFF;
                            cursor: pointer;
                        }
                    }
                    .list{
                        margin: 0 20px;
                        ul{
                            display: flex;
                            flex-wrap:wrap;
                            li{
                                position: relative;
                                top: 0;
                                left: 0;
                                margin: 10px;
                                .icon-deletes{
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
                        /** ul li,.showMsg{
                            display: flex;
                            font-size: 14px;
                            line-height: 30px;
                            .name{
                                margin-right: 10px;
                                width: 120px;
                                color: #666;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }
                            .list-btn{
                                margin-right: 20px;
                                color: #409EFF;
                                cursor: pointer;
                            }
                        }*/
                    }
                }
            }
        }
    }
</style>
