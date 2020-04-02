<template>
    <div class="enterprise-info supplyUnit">

        <div class="types">
            <p class="title">市场人员公示：</p>
            <div v-for="(item,index) in cyPresonList" :key="index">
                <figure class="image" v-if="item.img_url">
                    <p class="icon-delete" @click="deleteFun(item)">-</p>
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                </figure>
            </div>
            <div class="submit" @click="handleInput">
                <div class="btn">
                    <p class="icon-add">+</p>
                    <p>上传</p>
                </div>
                <form id="upload" enctype="multipart/form-data" method="post">
                    <!-- <input type="file" class="file" ref="file1" multiple accept="image/*" @change="fileFun($event,6)"> -->
                </form>
            </div>
            <div class="tishi">
              <p>1、建议图片尺寸1400*950。</p>
              <p>2、图片支持JPG、PNG格式。</p>
            </div>
        </div>
        <div class="types">
            <p class="title">营业执照附件：</p>
            <div v-for="(item,index) in YyzzList" :key="index">
                <figure class="image" v-if="item.img_url">
                    <p class="icon-delete" @click="deleteFun(item)">-</p>
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+item.img_url" @click="bigImgFun(item)">
                </figure>
            </div>
            <div class="submit" @click="handleInput">
                <div class="btn">
                    <p class="icon-add">+</p>
                    <p>上传</p>
                </div>
                <form id="upload" enctype="multipart/form-data" method="post">
                    <!-- <input type="file" class="file" ref="file1" multiple accept="image/*" @change="fileFun($event,5)"> -->
                </form>
            </div>
            <div class="tishi">
              <p>1、图片需文字清晰，证书需在有效期内。</p>
              <p>2、建议图片尺寸1400*950。</p>
              <p>3、图片支持JPG、PNG格式。</p>
            </div>
        </div>
      <div class="item">
          <span class="name">欢迎词：</span>
           <div class="box">
                <el-switch
                 v-model="node_welcome" active-text="开启" inactive-text="关闭"
                 active-value="开启" inactive-value="关闭" @change="swichChange()">
                </el-switch>
        </div>
        <div class="tishi" style="margin-left: 0;">
          <p>注：欢迎词与数据屏关联，无数据屏用户无需此功能</p>
        </div>
      </div>

        <div class="ifShow" v-if="ifShow">
          <section class="item">
              <span class="name"><span>*</span>文字简介：</span>
              <div class="box box1">
                  <textarea v-model="screen_text" :maxlength="maxlength" placeholder="最多输入30个字" @input="descInput" class="fill-textarea"></textarea>
                  <p class="tips">剩余{{remnant}}个字。注：每行文字加符号不能超过10个</p>
              </div>
          </section>
          <section class="item">
              <span class="name"><span>*</span>文字样式：</span>
              <div class="box  box1" style="margin-left: 34px;">
                <div class="itemChild" @click="handleChange(1)">
                  <p> <img src="../../../static/guanggao2.jpg"/></p>
                  <p class="myp">全屏样式</p>
                  <p class="myp myp1">注：选定全屏样式则不再显示数据分析</p>
                   <el-radio class="myRadio" v-model="radio" :label="1">全屏样式</el-radio>
                </div>
                <div class="itemChild itemChild1" style="margin-left: 50px;" @click="handleChange(2)">
                  <p> <img src="../../../static/guanggao1.jpg"/></p>
                  <p class="myp">横幅样式</p>
                  <el-radio class="myRadio" style="margin-top: 20px;" v-model="radio" :label="2">横幅样式</el-radio>
                </div>
              </div>
          </section>
          <section class="item">
              <span class="name" style='margin-top: 38px;'><span>*</span>文字背景：</span>
              <div class="box box1">
                <div class="itemChild" @click="handleChange1(1)">
                  <p class="bg bg1">欢迎光临</p>
                  <p>红色背景黄色文字</p>
                   <el-radio class="myRadio" v-model="radio1" :label="1">红色背景黄色文字</el-radio>
                </div>
                <div class="itemChild itemChild1" @click="handleChange1(2)">
                   <p class="bg bg2">欢迎光临</p>
                   <p>蓝色背景黄色文字</p>
                  <el-radio class="myRadio" v-model="radio1" :label="2">蓝色背景黄色文字</el-radio>
                </div>
              </div>
          </section>
        </div>

        <div class="footer">
            <el-button type="primary" @click="editFun">保存</el-button>
        </div>
    </div>
</template>

<script>
import {urlGetScreenStyle,urlUpdateScreenStyle,DeleteNodeZzrzForTrace} from '../../js/settings/settings.js'
import {baseUrl} from '../../js/address/url.js'
import {getAddr} from '../../js/user/user.js';
import axios from 'axios';
export default {
    name:'enterpriseInfo',
    data(){
        return{
          logoArr:[],
            cyPresonList:[],//人员公示图片
            YyzzList:[],//营业执照图片
            node_welcome:'关闭',//是否启用
            screen_text:'',//文字简介
            radio:'',//文字样式
            radio1:'',//文字背景
            ifShow:true,
            node_name:'',
            remnant:30,
            maxlength:32
        }
    },
    mounted(){
        this.node_id = localStorage.getItem('loginId');
        this.scShopId = localStorage.getItem('scShopId');
        this.node_name = localStorage.getItem('loginName');
        // console.log(this.$route.meta.title)
        this.urlGetScreenStyleFun();
    },
    methods: {
      descInput(){
        let val = this.screen_text.replace(/[\r\n]/g, "");
        let txtVal = val.length;
        this.remnant = 30 - txtVal;
      },
      handleChange(ele){
        if(ele != this.radio){
          this.radio = ele;
        }
      },
      handleChange1(ele){
        if(ele != this.radio1){
          this.radio1 = ele;
        }
      },
      swichChange(){
        if(this.node_welcome=='开启'){
          this.ifShow = true;
        }else{
          this.ifShow = false;
        }
      },
      bigImgFun(){

      },

      urlGetScreenStyleFun(){
        // let obj = {
        //     node_id: this.node_id,
        // }
        let str = 'node_id=' + this.node_id
        urlGetScreenStyle(str)
            .then(res => {
                console.log(res);
                let data = res.data;
                this.YyzzList = data.YyzzList;
                this.cyPresonList = data.cyPresonList;
                this.list = data.list;
                if(data.list[0].node_welcome=='true'){
                    this.node_welcome = '开启';
                    this.ifShow = true;
                }else{
                    this.node_welcome = '关闭';
                    this.ifShow = false;
                }
                this.screen_text = data.list[0].screen_text?data.list[0].screen_text:'';
                if(data.list[0].screen_font_backgroud==1){
                  this.radio1 = 1;
                }else if(data.list[0].screen_font_backgroud==2){
                   this.radio1 = 2;
                }
                if(data.list[0].screen_font==1){
                  this.radio = 1;
                }else if(data.list[0].screen_font==2){
                   this.radio = 2;
                }
                this.descInput();
            })
            .catch(res => {
                console.log(res);
            })
      },
      editFun(){
        let obj = {};
        if(this.node_welcome == '开启'){
          if(!this.screen_text){
            this.$message.error("请填写文字简介");
            return ;
          }
          if(!this.radio){
            this.$message.error("请选择文字样式");
            return ;
          }
          if(!this.radio1){
            this.$message.error("请选择文字背景");
            return ;
          }
          obj = {
              node_id: this.node_id,
              "node_welcome":true,
              "screen_text":this.screen_text,
              "screen_font":this.radio,
              "screen_font_backgroud":this.radio1
          }
        }else{
          obj = {
              node_id: this.node_id,
              "node_welcome":false,
              "screen_text":'',
              "screen_font":'',
              "screen_font_backgroud":''
          }
        }
        urlUpdateScreenStyle(obj)
            .then(res => {
              if(res.result){
                this.$message.success(res.message);
              }
            })
            .catch(res => {
                console.log(res);
            })
      },
        // logo
        handleInput(){
          this.$message.success('功能正在调试中');
          return ;
        },
        fileFun(event,ele){
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
                        that.logoArr.push(src.slice(23))
                    })
                }
            }
            let timer = setInterval(()=>{
                if(this.logoArr.length == file.length){
                    let formData = new FormData()
                   formData.append('img_url', this.logoArr[0]);
                   formData.append('node_id', that.node_id);
                    if(ele==6){
                      formData.append('img_type', 6);
                      formData.append('type_name', '从业人员');
                    }else{
                      formData.append('img_type', 5);
                      formData.append('type_name', '营业执照');
                    }
                   formData.append('node_name', that.node_name);
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
                    let url = baseUrl + 'login/uploadZzrzInfoForTrace'
                    ajaxPost(url,formData,config)
                        .then(res => {
                            console.log(res)
                             this.$message.success('上传成功');
                            // if(ele==6){
                            //   that.cyPresonList.push(res.data.logo);
                            // }else{
                            //   that.YyzzList.push(res.data.logo);
                            // }
                            this.urlGetScreenStyleFun();
                        })
                        .catch(res => {
                            console.log(res)
                             this.$message.error("上传失败，请重新上传");
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
        deleteFun(ele){
            console.log(ele)
            let obj = {
                id: ele.id,
            }
            DeleteNodeZzrzForTrace(obj)
                .then(res => {
                    if (res.result) {
                        this.urlGetScreenStyleFun()
                        this.$message.success('删除成功');
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
    }
}
</script>
<style lang='less' scoped>
    .enterprise-info{
        padding: 30px 0 30px 80px;
        height: 100%;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-sizing: border-box;
        .types{
            display: flex;
            margin-top: 25px;
            flex-wrap: wrap;
            align-items: center;
            .title{
                margin-right: 50px;
                width: 100px;
                line-height: 80px;
                font-size: 14px;
                text-align: right;
            }
            .image{
                position: relative;
                top: 0;
                left: 0;
                margin-right: 10px;
                width: 80px;
                height: 80px;
                box-sizing: border-box;
                border: 1px dashed #ccc;
                .icon-delete{
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
                width: 80px;
                height: 80px;
                color: #ccc;
                background: #fff;
                text-align: center;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px dashed #ccc;
                .btn{
                    margin-top: 18px;
                    p{
                        line-height: 26px;
                        font-size: 12px;
                        color: #333;
                    }
                    .icon-add{
                        font-size: 35px;
                        color: #ccc;
                    }
                }
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 80px;
                    height: 80px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
            }
        }


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
        .tishi{
          color: #999;
          font-size: 12px;
          margin-left: 35px;
        }
        .tishi p{
          line-height: 20px;
        }
        .el-input, .el-cascader{
            width: 350px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 0;
        }
        .item{
            clear: both;
            margin-top: 25px;
            display: flex;
            /* align-items: center; */
        }
        .name{
            float: left;
            width: 100px;
            text-align: right;
            span{
              color: #f83F2d;
            }
        }
        .Modify{
            margin-left: 20px;
        }
        .box{
            margin-left: 10px;
            display: flex;
            align-items: center;
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
                height: 100px;
                color: #606266;
                border: 1px solid #ddd;
                resize: none;
                box-sizing: border-box;
                /* text-indent: 2rem; */
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
            .itemChild{
              cursor: pointer;
              p{
                text-align: center;
                line-height: 35px;
                color: #999;
                font-size: 12px;
              }
              .myp{
                line-height: 20px;
              }
              img{
                width: 140px;
              }
              .myRadio{
                width: 100%;
                text-align: center;
                margin-top: 5px;
              }
              .bg{
                width: 180px;
                height: 40px;
                border-radius: 5px;
                line-height: 40px;
                text-align: center;
                font-weight: bold;
                letter-spacing:8px;
              }
              .bg1{
                color:  #ffd05c;
                background-color: #e22323;
              }
              .bg2{
               background-color: #3287ed;
               color:  #ffd05c;
              }
            }
            .itemChild1{
              margin-left: 40px;
            }
        }
        .box1{
          margin-left: 50px;
          position: relative;
        }
        .tips{
          position: absolute;
          color: #999;
          top: 75px;
          font-size: 12px;
          right: 10px;
        }
        .footer{
          margin-top: 50px;
            .el-button{
                margin-left: 200px;
            }
        }
    }
</style>

<style lang="less">
.supplyUnit{
    .el-table td{
        padding: 5px 0 !important;
    }
    .el-switch__label--left{
        position: relative;
        left: 70px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right{
        position: relative;
        right: 70px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label.is-active{
        z-index: 1111;
        color: #fff;
    }
    .el-switch__core{
        width: 80px !important;
        height: 30px;
        line-height: 30px;
        border-radius:20px;
    }
    .el-switch__core:after{
      top: 7px;
      left: 4px;
    }
    .el-switch__label{
      height: 30px;
      line-height: 30px;
    }
    .el-radio__label{
      display: none;
    }
    .el-switch{
      height: 30px;
      line-height: 30px;
      float: left;
      text-align: left;
      display: flex;
    }
}
</style>
