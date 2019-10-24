<template>
    <div class="content szProcessing">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-select v-model="goodName" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in goodList" :key="index" :label="item.GOODS_NAME"
                            :value="item.ID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部加工工艺</p>
                <div>
                    <el-button type="primary" @click="newFun"> + 创建加工工艺</el-button>
                    <!--<el-button type="primary" id="btn-file" plain @click="isShowFun($event)" @onblur="closeFun">批量导入</el-button>
                    <el-button type="primary" plain @click="getDownloadAssetsBase">导出</el-button>-->
                </div> 
            </div>
            <!--<div class="file-btns" v-if="isfile">
                <div>
                    <span class="submit">
                        批量新增
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                        </form>
                    </span>
                </div>
                <div>
                    <span class="submit">
                        批量修改
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="files" @change="fileFun($event,2)">
                        </form>
                    </span>
                </div>
                <el-button type="primary" plain @click="fileAddFun(1)">批量新增</el-button>
                <el-button type="primary" plain @click="fileAddFun(2)">批量修改</el-button>
            </div>-->
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="technology_name" label="工艺名称"> </el-table-column>
                    <el-table-column prop="technology_cycle" label="周期"> </el-table-column>
                    <el-table-column prop="technology_describe" label="工艺描述"> </el-table-column>
                    <el-table-column prop="sort" label="排序"> </el-table-column>
                    <el-table-column prop="goods_name" label="所属商品"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看附件</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <!--附件-->
        <div class="big-img" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeFun2">X</p>
            <div class="imgBox">
                <figure class="images" v-for="(item,index) in imgArrs" :key="index">
                    <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url" v-if="item.img_url">
                </figure>
            </div>
        </div>
        <!--新增 编辑-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}加工工艺</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form" :rules="rules" :model="form" label-width="120px">
                    <el-form-item label="所属商品" prop="goodName">
                        <el-select v-model="form.goodName" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in goodList" :key="index" :label="item.GOODS_NAME"
                            :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工艺名称" prop="name">
                        <el-input clearable v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="周期" prop="cycle" style="margin-bottom: 16px;">
                        <el-input clearable v-model="form.cycle" placeholder="如：3-5天"></el-input>
                    </el-form-item>
                    <el-form-item label="工艺描述" prop="describe">
                        <el-input clearable v-model="form.describe" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                                <ul>
                                    <li v-if="img_url">
                                        <figure class="image">
                                            <img :src="img_url">
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div class="submit">
                                    上传图片
                                    <form id="upload" enctype="multipart/form-data" method="post"> 
                                        <input type="file" class="file" ref="file" @change="fileFun($event)">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </el-form-item><!---->
                    <el-form-item label="排序" prop="sort">
                        <el-input clearable v-model="form.sort" placeholder="同一商品数字越大 排序越靠后"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm('form')" :disabled="disabled">确认</el-button>
                    </el-form-item>
                </el-form>
            
            </div>
        </div>
    </div>
</template>

<script>
import {GetAllProductionTech,InsertProductionTech,UpdateProductionTech,DeleteProductionTech} from '../../js/production/production.js'
import {sales} from "../../js/goods/goods.js";
export default {
    name:"szProcessing",
    data() {
        return {
            goodName: '',
            goodList: '',
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            isBigImg: false,
            sizeObj: {},
            url: '',
            imgArr1: [],
            imgArrs: [],
            prompt: '创建',
            isEdits: false,
            form: {
                goodName: '', // 所属商品
                name: '', // 工艺名称
                cycle: '', // 周期
                describe: '', // 工艺描述
                sort: '', // 排序
            },
            goodArr: [],
            imgArr: [],
            userId: '',
            ids: '',
            node_id: '',
            node_name: '',
            img_url: '',
            disabled: false,
            editUrl: '',
            rules: {
                goodName: [
                    { required: true, message: '请选择所属商品', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入工艺名称', trigger: 'blur' },
                ],
                cycle: [
                    { required: true, message: '请输入周期', trigger: 'blur' },
                ],
                describe: [
                    { required: true, message: '请输入工艺描述', trigger: 'blur' },
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.node_id = localStorage.getItem('loginId')
        this.node_name = localStorage.getItem('loginName')
        this.getSaleFun()
        this.getDataFun()
    },
    methods: {
        deleteFun(ele){
            let obj = {
                id: ele.id
            }
            DeleteProductionTech(obj)
                .then(res =>{
                     if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.closeFun()
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        getSaleFun(){
            let boothData = {
                page: 1,
                cols: '10000',
                goodsName: '',
                goodsCode: '',
                suppliersName: '',
                region: '',
                userId: this.userId,
                total: '',
                j_name: ''
            }
            sales(boothData)
                .then(res => {
                    this.goodList = res.data.salesList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getDataFun(){
            let obj = {
                goods_id: this.goodName,
                page: this.page,
                cols: this.cols,
                node_id: this.node_id,
            }
            GetAllProductionTech(obj)
                .then(res =>{
                    this.tableData = res.data.list
                    this.num = res.data.bean.total
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitFormFun()
                } else {
                    return false;
                }
            });
        },
        submitFormFun(){
            this.disabled = true
            if(this.prompt == '创建'){
                let obj = {
                    goods_id: this.form.goodName,
                    technology_name: this.form.name, 
                    technology_cycle: this.form.cycle,
                    technology_describe: this.form.describe,
                    sort: this.form.sort,
                    img_url: this.imgArr.length > 0 ? this.imgArr[0] : '',
                    node_id: this.node_id,
                    node_name: this.node_name
                }
                InsertProductionTech(obj)
                    .then(res =>{
                        this.disabled = false
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.closeFun()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res =>{
                        this.disabled = false
                        console.log(res)
                    })
            }else{
                let obj = {
                    goods_id: this.form.goodName,
                    technology_name: this.form.name, 
                    technology_cycle: this.form.cycle,
                    technology_describe: this.form.describe,
                    sort: this.form.sort,
                    img_url: this.editUrl,
                    id: this.ids
                }
                UpdateProductionTech(obj)
                    .then(res =>{
                        this.disabled = false
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.closeFun()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res =>{
                        this.disabled = false
                        console.log(res)
                    })
            }
            
        },
        cancelFun(){
            this.closeFun()
        },
        newFun(){
            this.prompt = '创建'
            this.isEdits = true
        },
        closeFun(){
            this.form = {
                goodName: '', // 所属商品
                name: '', // 工艺名称
                cycle: '', // 周期
                describe: '', // 工艺描述
                sort: '', // 排序
            }
            this.ids = ''
            this.imgArr1 = []
            this.imgArr = []
            this.img_url = ''
            this.editUrl = ''
            this.isEdits = false
        },
        editFun(ele){
            this.ids = ele.id
            this.form.goodName = ele.goods_id
            this.form.name = ele.technology_name
            this.form.cycle = ele.technology_cycle
            this.form.describe = ele.technology_describe
            this.form.sort = ele.sort
            if(ele.img_url){
                this.img_url = 'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + ele.img_url
            }
            this.editUrl = ele.img_url
            this.prompt = '编辑'
            this.isEdits = true
        },
        viewFun(ele){
            let obj = {
                img_url: ele.img_url
            }
            this.imgArrs.push(obj)
            this.isBigImg = true
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.goodName = ''
            this.page = 1 
            this.getDataFun()
        },
        closeFun2(){
            this.imgArrs = []
            this.isBigImg = false
        }, 
        fileFun(event){
            this.img_url = ''
            this.imgArr = []
            var that = this;
            let file = event.target.files;
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
                        that.img_url = src
                        that.imgArr.push(src.slice(23))
                    })
                }
            }
            // let timer = setInterval(()=>{
            //   if(that.imgArr.length == file.length){
            //     let formData = new FormData()  
            //     formData.append('img_url', that.imgArr[0]);   
            //     formData.append('node_id', that.node_id);  
            //     formData.append('id', that.form.goodsID); 
            //     let config = {
            //       headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     const ajaxPost = function (url, params,config) {
            //       return new Promise((resolve, reject) => {
            //         axios
            //           .post(url, params,{config})
            //           .then((res) => {
            //               resolve(res.data)
            //           })
            //           .catch(() => {
            //               reject('error')
            //           })
            //       })
            //     }  
            //     let url = baseUrl + 'goods/updateGoodsImgForTrace'
            //     ajaxPost(url,formData,config)
            //       .then(res => {
            //         that.imgArr = []
            //         that.imgUrl = res.data.img_url
            //       })
            //       .catch(res => {
            //         console.log(res)
            //       })
            //     clearInterval(timer);
            //   }
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
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    },
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .search-btn{
            margin-top: 2px;
            margin-right: 10px;
            color: #409EFF;
            background: #fff;
        }
        .searchs{
            padding: 10px 0;
            background: #fff;
            .search{
                .file-btn{
                    color: #777;
                    background: #fff;
                    border-color: #eaeaea;
                }
                .search-btn{
                    color: #409EFF;
                    background: #fff;
                }
                .clear-content{
                    margin-left: 10px;
                    cursor: pointer;
                    color: #999999;
                    font-size: 14px;
                }
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .file-btns{
                position: absolute;
                top: 40px;
                right: 69px;
                z-index: 22;
                background: #fff;
                div{
                    margin-bottom: -5px;
                }
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .submit:hover{
                    background: #409EFF;
                    color: #fff;
                }
            }
            .import{
                color: #409EFF;
                background: #fff;
            }
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
                div{
                    display: flex;
                    width: 300px;
                    justify-content: flex-end;
                }
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
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
                margin-top: -270px;
                margin-left: -280px;
                width: 560px;
                height: 540px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        width: 330px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                }
                .close{
                    float: right;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    cursor: pointer;
                }
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 30px;
                    .el-input,.el-select,.el-textarea{
                        width: 300px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 80px;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .btn{
                    margin-left: 270px;
                }
            }
        }
        .big-img{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 999;
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
            .imgBox{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
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
            
        }
        .msg-item{
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
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang='less'>
    .szProcessing{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }

</style>
