<template>
    <div class="content filePurchase">
        <div class="files">
            <div class="text">
                <div class="types" v-if="fileShow1">
                    <p class="title">进货（厂家销售）凭证</p>
                    <div v-for="(item,index) in item_1_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,1)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file1" multiple accept="image/*" @change="fileFun($event,1)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow2">
                    <p class="title">检测情况</p>
                    <div v-for="(item,index) in item_2_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,2)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,2)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow3">
                    <p class="title">动物检疫合格证明</p>
                    <div v-for="(item,index) in item_3_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,3)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file3" multiple accept="image/*" @change="fileFun($event,3)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow4">
                    <p class="title">肉品品质检验合格证</p>
                    <div v-for="(item,index) in item_4_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,4)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file4" multiple accept="image/*" @change="fileFun($event,4)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow5">
                    <p class="title">产地证明</p>
                    <div v-for="(item,index) in item_5_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,5)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file5" multiple accept="image/*" @change="fileFun($event,5)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow6">
                    <p class="title">肉品质量承诺书</p>
                    <div v-for="(item,index) in item_6_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,6)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file6" multiple accept="image/*" @change="fileFun($event,6)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow7">
                    <p class="title">产品检验报告单</p>
                    <div v-for="(item,index) in item_7_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,7)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file7" multiple accept="image/*" @change="fileFun($event,7)">
                        </form>
                    </div>  
                </div>
                <div class="types" v-if="fileShow8">
                    <p class="title">水分检测报告单</p>
                    <div v-for="(item,index) in item_8_list" :key="index">
                        <figure class="image" v-if="item.img_url">
                            <p class="delete" @click="deleteFun(item,index,8)">-</p>
                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                        </figure>
                    </div>
                    <div class="submit">
                        <div class="btn">
                            <p class="icon-add">+</p>
                            <p>上传单据</p>     
                        </div>
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file8" multiple accept="image/*" @change="fileFun($event,8)">
                        </form>
                    </div>  
                </div>
            </div>
        </div>
        <div class="box" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeFun">X</p>
            <div class="imgBox">
                <el-carousel trigger="click" :autoplay="autoplay" :initial-index="current" :height="imgHeight + 'px'">
                    <el-carousel-item  v-for="(item,index) in imgArr" :key="index" v-if="imgArr">
                        <figure class="images" v-if="item.img_url">
                            <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                        </figure>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
import {baseUrl} from '../../js/address/url.js'
import axios from 'axios';
import {GetEntryTz,GetAllBiz,DeleteDoc,SearchDoc,UpdatePc} from '../../js/standingBook/standingBook.js'
export default {
    name:"filePurchase",
    data() {
         return {
            item_1_list: [],
            item_2_list: [],
            item_3_list: [],
            item_4_list: [],
            item_5_list: [],
            item_6_list: [],
            item_7_list: [],
            item_8_list: [],
            imgArr: [],
            biz_id: '',
            tz_id: '',
            clarity: '',
            typeArr: [],
            fileShow1: true,
            fileShow2: true,
            fileShow3: true,
            fileShow4: true,
            fileShow5: true,
            fileShow6: true,
            fileShow7: true,
            fileShow8: true,
            fileBtn: true,
            userId: '',
            areaId: '',
            node_id: '',
            tz_id: '',
            biz_id: '',
            isBigImg: false,
            imgList: [],
            autoplay: false,
            current: 0,
            list: {},
            type: '',
            sizeObj: {},
            imgHeight: '',
            imgArr: []
        }
    },
    mounted() {
        let retail = JSON.parse(localStorage.getItem('retail'))
        this.node_id = retail.node_id
        let param = this.$route.params
        this.userId = param.userId
        this.tz_id = param.tz_id
        this.biz_id = param.biz_id
        this.areaId = param.areaId
        this.fileShowFun()
        this.getFieldFun()
    },
    methods: {
        // 查看大图
        bigImgFun(item){
            this.isBigImg = true
            let imgArr = []
            this.item_1_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_2_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_3_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_4_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_5_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_6_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_7_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.item_8_list.forEach(ele => {
                imgArr.push(ele)
            })
            this.imgArr = imgArr
            imgArr.forEach((ele,index) => {
                if(item.id == ele.id){
                    this.current = index
                }
            })
            this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
        },
        closeFun(){
            this.imgArr = []
            this.isBigImg = false
        },
        // 查看所有图片
        fileShowFun(){
            this.item_1_list = []
            this.item_2_list = []
            this.item_3_list = []
            this.item_4_list = []
            this.item_5_list = []
            this.item_6_list = []
            this.item_7_list = []
            this.item_8_list = []
            let obj = {
                tz_id: this.tz_id,
                node_id: this.node_id,
                tz_type: 1,
            }
            SearchDoc(obj)
                .then(res => {
                    this.imgList = res.data
                    res.data.forEach(ele => {
                        if ( ele.img_type == 1 ){
                            this.item_1_list.push(ele)
                        }
                        if ( ele.img_type == 2 ){
                            this.item_2_list.push(ele)
                        }
                        if ( ele.img_type == 3 ){
                            this.item_3_list.push(ele)
                        }
                        if ( ele.img_type == 4 ){
                            this.item_4_list.push(ele)
                        }
                        if ( ele.img_type == 5 ){
                            this.item_5_list.push(ele)
                        }
                        if ( ele.img_type == 6 ){
                            this.item_6_list.push(ele)
                        }
                        if ( ele.img_type == 7 ){
                            this.item_7_list.push(ele)
                        }
                        if ( ele.img_type == 8 ){
                            this.item_8_list.push(ele)
                        }
                    })                  
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 删除图片
        deleteFun(item,index,type){
             DeleteDoc({id:item.id})
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.fileShowFun()  
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
            
        },
        fileFun(event,type){
            let that = this;
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
                        that.imgArr.push(src.slice(23))
                    })
                }
            }
            let timer = setInterval(()=>{
                if(this.imgArr.length == file.length){
                    let formData = new FormData()  
                    formData.append('img1', this.imgArr[0]);   
                    formData.append('node_id', that.node_id);  
                    formData.append('biz_id', that.biz_id); 
                    formData.append('tz_id', that.tz_id); 
                    formData.append('count', 1); 
                    formData.append('img_type', type); 
                    formData.append('tz_type', 1); // 进货1
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
                    let url = baseUrl + 'originalDoc/insertOriginalDoc'
                    ajaxPost(url,formData,config)
                        .then(res => {         
                            if (res.result == true) {
                                this.fileShowFun()
                                this.$message.success(res.message);
                            }else{
                                this.$message.error(res.message);
                            }   
                            this.imgArr = []        
                        })
                        .catch(res => {
                            console.log(res)
                        })
                    clearInterval(timer);
                }
            },1000)
        },
        // 是否显示该类型
        isShowFileFun(){
            this.typeArr.forEach(ele => {
                if(this.areaId == ele.SHOP_BOOTH_ID){
                    if(ele.TYPE_NAME == "进货（厂家销售）凭证"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow1 = true
                        }else{
                            this.fileShow1 = false
                        }
                    }
                    if(ele.TYPE_NAME == "检测情况"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow2 = true
                        }else{
                            this.fileShow2 = false
                        }
                    }
                    if(ele.TYPE_NAME == "动物检疫合格证明"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow3 = true
                        }else{
                            this.fileShow3 = false
                        }
                    }
                    if(ele.TYPE_NAME == "肉品品质检验合格证"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow4 = true
                        }else{
                            this.fileShow4 = false
                        }
                    }
                    if(ele.TYPE_NAME == "产地证明"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow5 = true
                        }else{
                            this.fileShow5 = false
                        }
                    }
                    if(ele.TYPE_NAME == "肉品质量承诺书"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow6 = true
                        }else{
                            this.fileShow6 = false
                        }
                    }
                    if(ele.TYPE_NAME == "产品检验报告单"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow7 = true
                        }else{
                            this.fileShow7 = false
                        }
                    }
                    if(ele.TYPE_NAME == "水分检测报告单"){
                        if(ele.IS_SHOW == 1){
                            this.fileShow8 = true
                        }else{
                            this.fileShow8 = false
                        }
                    }
                    
                }
            })
        },
        // 获取字段列表
        getFieldFun(){
            let obj = {
                userId: this.userId,
                tz_type: "1",
                shop_booth_id: this.areaId
            }
            UpdatePc(obj)
                .then(res => {
                    this.typeArr = res.data.danju_property
                    this.isShowFileFun()
                })
                .catch(res => {
                    console.log(res)
                })
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
        .files{
            padding: 20px;
            width: 100%;
            height: 100%;
            background: #fff;
            .text{
                margin: 0 20px;
                .types{
                    display: flex;
                    margin-top: 10px;
                    flex-wrap: wrap;    
                    .title{  
                        margin-right: 10px;
                        width: 140px;
                        line-height: 120px;
                        font-size: 14px;
                    }
                    .image{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin-right: 10px;
                        width: 120px;
                        height: 120px;
                        box-sizing: border-box;
                        border: 1px dashed #ccc;
                        .delete{
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
                    }
                    .submit{  
                        position: relative;
                        top: 0;
                        left: 0;
                        width: 120px;
                        height: 120px;
                        color: #ccc;
                        background: #fff;
                        text-align: center;
                        overflow: hidden;
                        border-radius: 5px;
                        font-size: 14px;
                        box-sizing: border-box;
                        border: 1px dashed #ccc;
                        .btn{
                            margin-top: 20px;
                            p{
                                line-height: 40px;
                                font-size: 14px;
                            }
                            .icon-add{ 
                                font-size: 46px;
                            }
                        }
                        .file{
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            width: 120px;
                            height: 120px;
                            opacity: 0;
                            background: rgba(0,0,0,0);
                        }
                    }
                }
            }
        }
        .box{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 666;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
            .images{
                text-align: center;
            }
            .el-carousel{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                .image{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            .el-carousel__container{
                width: 100%;
                height: 100%;
            }
            .el-carousel__item{
                color: #475669;
                font-size: 14px;
                margin: 0;
            }
        }
        
    }
</style>
<style lang="less">
    .filePurchase{

    }
</style>