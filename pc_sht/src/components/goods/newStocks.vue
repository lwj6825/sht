<template>
  <div class="content">
    <div class="section-content">
      <el-form  label-width="120px" :rules="rules" :model="form" ref="form" >
        <el-form-item label="商品编码：" prop="goodsCode">
          <el-input v-model="form.goodsCode"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goodsName">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品简称：">
            <el-input v-model="form.j_name" clearable></el-input>
          </el-form-item>
        <el-form-item label="图片：" v-if="showFile">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl">
              <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + imgUrl">
            </figure>
            <span class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event)">
              </form>
            </span>  
          </div>
        </el-form-item>
        <el-form-item label="品种：" prop="selectVarieties">
          <el-cascader
            style="width: 100%"
            :options="systemDefaultType"
            filterable
            @change="handleChange"
            placeholder="可搜索"
            :props="props"
            change-on-select
            v-model="form.selectVarieties"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input style="width: 200px;" v-model="form.price"></el-input>
          <span >&nbsp;&nbsp;元</span>
        </el-form-item>
        <el-form-item label="单位：" prop="specifications">
          <el-select v-model="form.specifications"  placeholder="未选择"  @change="selectChange">
            <el-option  v-for="item in specificationList" :key="item.TYPE_NAME" :label="item.TYPE_NAME"  :value="item.TYPE_NAME" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格：" v-show="isShow">
          <el-input style="width: 91px" v-model="form.input"></el-input>
          <el-select v-model="form.unit" style="width: 90px" placeholder="未选择">
            <el-option  v-for="item in form.unitList" :key="item.id" :label="item.name"  :value="item.name"  >
            </el-option>
          </el-select>
          <el-input style="width: 80px;text-align: center" :disabled="true" placeholder="/箱" v-model="form.goodsUnit"></el-input>
        </el-form-item>
        <el-form-item label="供应商：">
          <el-select v-model="form.suppliersId" filterable style="width: 100%" placeholder="请选择供应商" @change="selectSuppliers">
            <el-option  v-for="item in suppliersList" :key="item.shop_concacts_id" :label="item.biz_name"  :value="item.shop_concacts_id" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地：" prop="addr">
          <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address" clearable :props="propes" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="商品介绍：" v-if="showFile">
          <div class="box-fileimg">
            <figure class="image" v-if="logoUrl">
              <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + logoUrl">
            </figure>
            <span class="submit">
              上传图片
              <form id="upload" enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun2($event)">
              </form>
            </span>  
          </div>
        </el-form-item>
        <el-form-item label="标签编码：">
          <el-input v-model="form.association_id"></el-input>
        </el-form-item>
        <el-form-item label="条形码：">
          <el-input v-model="form.userdefine_code_one"></el-input>
        </el-form-item>
        <el-form-item label="物品码：" prop="userdefine_code_two">
          <el-input v-model="form.userdefine_code_two"></el-input>
        </el-form-item>
        <el-form-item label="产品标准：">
          <el-input v-model="form.userdefineCategory"></el-input>
        </el-form-item>
        <el-form-item label="保质期：">
          <el-input v-model="form.bzq"></el-input>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-input v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
  import {getDefaultProductTypes,allSuppliers,allSpecification,addPurchase,goodUpdate,GoodsCode,UpdateGoodsImgForTrace} from "../../js/goods/goods.js";
  import {GetSupplier} from '../../js/district/district.js'
  import {getAddr} from '../../js/user/user.js';
  import {baseUrl,baseUrl2} from '../../js/address/url.js'
  import axios from 'axios';
  export default {
    name: "",    
    data() {
      return {
        isShow:true,
        //产品分类--系统默认提供
        systemDefaultType:[],
        props: {
          value: 'level_id',
          label: 'type_name',
          children: 'systemDefaultTypeList'
        },
        form: {
          userdefineCategory: '',
          bzq: '',
          brandL: '',
          association_id: '',
          userdefine_code_one: '',
          userdefine_code_two: '',
          goodsCode: '',
          userId: 2,
          goodsID:'',
          selectVarieties:[],
          goodsName:"",
          j_name: "",
          gbCode:"",
          gbName:"",
          price:"",
          goodsUnit:"",
          input:"",
          specifications:"",
          addr: [],//地址
          unit:'',
          unitList:[
            {
              id:'00',
              name:'斤',
            },
            {
              id:'01',
              name:'公斤',
            },
            {
              id:'02',
              name:'g',
            },
            {
              id:'03',
              name:'kg',
            },
            {
              id:'04',
              name:'ml',
            },
            {
              id:'05',
              name:'L',
            }
          ],
          suppliersId:"",
          suppliersName:"",
        },
        addrOptions:[],
        propes:{
          label: 'caption',
          value:'szm',
          children: 'list'
        },
        suppliersList:[],
        specificationList:[],
        region: '',
        bigAreaId: '',
        isRegion: '',
        scShopId: '', // 市场的shop_booth_id
        imgUrl: '',
        imgFile: '',
        imgArr: [],
        node_id: '',
        clarity: '',
        logoUrl: '',
        logoFile: '',
        logoArr: [],
        showFile: false,
        rules: {
          goodsCode: [
            { required: true, message: '请输入商品编码', trigger: 'blur' }
          ],
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          selectVarieties: [
            { required: true, message: '请选择品种', trigger: 'blur' }
          ],
          specifications: [
            { required: true, message: '请选择单位', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.form.userId = localStorage.getItem('userId')
      this.region = this.$route.params.areaId
      this.bigAreaId = this.$route.params.bigAreaId
      if(localStorage.getItem('roleId') == "79" || localStorage.getItem('roleId') == "77"){
        this.rules.userdefine_code_two = [
          { required: true, message: '请输入物品码', trigger: 'blur' }
        ]
      }
    },
    mounted() {
      this.node_id = localStorage.getItem('loginId')
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      this.getAddrList()
      this.initData();
      if(JSON.stringify(this.$route.params.goodsMsg)){   
        this.form.userdefineCategory = this.$route.params.goodsMsg.USERDEFINE_CATEGORY
        this.form.bzq = this.$route.params.goodsMsg.BZQ
        this.form.brand = this.$route.params.goodsMsg.BRAND
        this.form.association_id = this.$route.params.goodsMsg.association_id
        this.form.userdefine_code_one = this.$route.params.goodsMsg.userdefine_code_one
        this.form.userdefine_code_two = this.$route.params.goodsMsg.userdefine_code_two 
        this.showFile = true
        this.form.goodsName = this.$route.params.goodsMsg.GOODS_NAME;
        this.form.j_name = this.$route.params.goodsMsg.J_NAME
        if(this.$route.params.goodsMsg.level_id){
          let str = this.$route.params.goodsMsg.level_id;
          this.form.selectVarieties = [str.slice(0,2),str.slice(0,5),str.slice(0,8)];
          this.form.gbCode = str.slice(0,8);
        }
        this.form.goodsCode = this.$route.params.goodsMsg.GOODS_CODE
        this.form.price = this.$route.params.goodsMsg.PRICE;
        this.form.specifications = this.$route.params.goodsMsg.GOODS_UNIT;
        if(this.form.specifications == '斤' || this.form.specifications =='公斤'){
          this.isShow = false;
          this.form.input = '';
        }else{
          this.isShow = true;
          this.form.input = this.$route.params.goodsMsg.COUNT;
          this.form.unit = this.$route.params.goodsMsg.SPECIFICATIONS;          
        }
        this.form.goodsUnit = this.$route.params.goodsMsg.GOODS_UNIT; 
        this.form.suppliersId = this.$route.params.goodsMsg.SUPPLIERS_ID;
        this.form.suppliersName = this.$route.params.goodsMsg.SUPPLIERS_NAME;
        this.form.goodsID = this.$route.params.goodsMsg.ID;
        this.imgUrl = this.$route.params.goodsMsg.IMG_URL
        this.logoUrl = this.$route.params.goodsMsg.PRODUCT_IMG_URL
        let originArr = [];
        if(this.$route.params.goodsMsg.areaOriginId){
          if(this.$route.params.goodsMsg.areaOriginId.slice(4,6) != '00'){
            originArr.unshift(this.$route.params.goodsMsg.areaOriginId);
          }
          if(this.$route.params.goodsMsg.areaOriginId.slice(2,4) != '00'){
            originArr.unshift(this.$route.params.goodsMsg.areaOriginId.slice(0,4)+'00');
          }
          if(this.$route.params.goodsMsg.areaOriginId.slice(0,2) != '00'){
            originArr.unshift(this.$route.params.goodsMsg.areaOriginId.slice(0,2)+'0000');
          }
          this.form.addr = originArr
        }
      }else{
        this.getGoodsCode()
      }
    },
    methods: {
      fileFun(event){
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
              that.imgArr.push(src.slice(23))
            })
          }
        }
        let timer = setInterval(()=>{
          if(that.imgArr.length == file.length){
            let formData = new FormData()  
            formData.append('img_url', that.imgArr[0]);   
            formData.append('node_id', that.node_id);  
            formData.append('id', that.form.goodsID); 
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
                that.imgUrl = res.data.img_url
              })
              .catch(res => {
                console.log(res)
              })
            clearInterval(timer);
          }
        },1000)
      },
      fileFun2(event){
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
          if(that.logoArr.length == file.length){
            let formData = new FormData()  
            formData.append('img_url', that.logoArr[0]);   
            formData.append('node_id', that.node_id);  
            formData.append('id', that.form.goodsID); 
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
            let url = baseUrl + 'goods/updateProductImg'
            ajaxPost(url,formData,config)
              .then(res => {
                console.log(res)
                that.logoArr = []
                that.logoUrl = res.data.product_img
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
      getGoodsCode(){
        let obj = {
          userId:this.form.userId,
          region: this.region
        }
        GoodsCode(obj)
          .then(res => {
            this.form.goodsCode = res.data.dataList
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
            if(!this.$route.params.goodsMsg){
              // 新增商品
              let params = {
                id:'',
                goodsName:this.form.goodsName,
                j_name: this.form.j_name,
                gbCode:this.form.gbCode,
                price:this.form.price,
                goodsUnit:this.form.specifications,
                specifications:this.form.unit,
                count:this.form.input,
                suppliersId:this.form.suppliersId,
                suppliersName:this.form.suppliersName,
                userId:this.form.userId,
                region: this.region,
                goodsCode: this.form.goodsCode,
                areaOriginId: this.form.addr[this.form.addr.length-1],
                areaOriginNname: addrArr.join(""),
                association_id: this.form.association_id,
                userdefine_code_one: this.form.userdefine_code_one,
                userdefine_code_two: this.form.userdefine_code_two,
                userdefineCategory: this.form.userdefineCategory,
                bzq: this.form.bzq,
                brand: this.form.brand,
              };
              addPurchase(params)
                .then(res => {
                  if (res.result == true) {
                    this.$message.success(res.message);
                    this.$router.push({path:'stocks'});  
                  }else{
                    this.$message.error(res.message);
                  }
                })
                .catch(() => {
                  this.$message.error("出错啦!");
                })


            }else{
              // 编辑商品
              let params = {
                id:this.$route.params.goodsMsg.ID,
                goodsName:this.form.goodsName,
                j_name: this.form.j_name,
                gbCode:this.form.gbCode,
                price:this.form.price,
                goodsUnit:this.form.specifications,
                specifications:this.form.unit,
                count:this.form.input,
                suppliersId:this.form.suppliersId,
                suppliersName:this.form.suppliersName,
                userId:this.form.userId,
                goodsCode: this.form.goodsCode,
                areaOriginId: this.form.addr[this.form.addr.length-1],
                areaOriginNname: addrArr.join(""),
                node_id: this.node_id,
                association_id: this.form.association_id,
                userdefine_code_one: this.form.userdefine_code_one,
                userdefine_code_two: this.form.userdefine_code_two,
                userdefineCategory: this.form.userdefineCategory,
                bzq: this.form.bzq,
                brand: this.form.brand,
              };
              goodUpdate(params)
                .then(res => {
                  if (res.result == true) {
                    this.$message.success(res.message);
                    this.$router.push({path:'stocks'});
                  }else{
                    this.$message.error(res.message);
                  }
                })
                .catch(() => {
                  this.$message.error("出错啦!");
                })
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleChange(value) {
        this.form.gbCode =value[value.length - 1];
      },
      selectChange(value) {//选择单位
        if(value == "斤" || value == "公斤"){
          this.isShow = false;
          this.form.input = '';
        }else {
          this.isShow = true;
        }
        this.form.goodsUnit = '/'+value;
      },
      selectSuppliers(val){//选择供应商
        this.suppliersList.forEach((ele)=>{ 
          if(ele.SHOP_CONCACTS_ID === val){
            this.form.suppliersName = ele.BIZ_NAME;
          }
        })
      },
      //查询品种列表
      systemDefaultTypeLists(){
        getDefaultProductTypes()
          .then(res =>{
            this.systemDefaultType = res;
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      //查询供应商列表
      getAllSuppliers(){
        if(this.isRegion == 'false'){
          let obj = {
              page: '1',
              cols: '100',
              userId: this.form.userId, // 区域
              type: "1",
              concact_name: "",
              region: this.region, //区域shop_booth_id
              biz_name: "",
              shop_booth_id: this.scShopId //区域shop_booth_id
          }
          GetSupplier(obj)
            .then(res =>{
              this.suppliersList = res.data.dataList
            })
            .catch(() => {
              this.$message.error("出错啦!");
            })
        }else{ 
          let obj = {
              page: '1',
              cols: '100',
              userId: this.bigAreaId, // 区域
              type: "1",
              concact_name: "",
              region: this.region, //区域shop_booth_id
              biz_name: "",
              shop_booth_id: this.region //区域shop_booth_id
          }
          GetSupplier(obj)
            .then(res =>{
              this.suppliersList = res.data.dataList
            })
            .catch(() => {
              this.$message.error("出错啦!");
            })
        }
      },
      //查询包装规格列表
      getAllSpecification(){
        allSpecification()
          .then(res =>{
            this.specificationList = res.data.specificationList;
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      initData() {
        //查询商品品种三级列表
        this.systemDefaultTypeLists()
        //查询供应商列表
        this.getAllSuppliers()
        //查询规格列表
        this.getAllSpecification()
      }
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .content {
    padding: 10px;
    background: #fff;
    height: 100%;
    box-sizing: border-box;
    
    .box-fileimg{
      display: flex;
      width: 300px;
      height: 100px;
      .submit{
        position: relative;
        top: 36%;
        left: 10px;
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
          top: 0;
          width: 90px;
          height: 36px;
          opacity: 0;
          background: rgba(0,0,0,0);
        }
      }
      .image{
        width: 200px;
        height: 100px;
        vertical-align: middle;
        border: 1px solid #eaeaea;
        overflow: hidden;
        box-sizing: border-box;
        img{
          display: block;
          border: none;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .section-content{
      padding: 20px 100px;
      width: 500px;
    }
    .new-add{
      margin-top: 30px;
    }
    .el-cascader{
      width: 380px;
    }
  }
</style>
