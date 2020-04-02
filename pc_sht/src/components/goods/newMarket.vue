<template>
  <div class="content">
    <div class="big-box">
      <div class="section-content">
        <el-form label-width="130px" :model="form" ref="form" :rules="rules">
          <el-form-item label="商品编码：" prop="goodsCode">
            <el-input v-model="form.goodsCode"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：" prop="goodsName">
            <el-input v-model="form.goodsName" clearable></el-input>
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
            <el-cascader style="width: 100%" :options="systemDefaultType" filterable @change="handleChange" placeholder="可搜索"
              :props="props" change-on-select v-model="form.selectVarieties" clearable></el-cascader>
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
              <el-option  v-for="item in form.unitList" :key="item.id" :label="item.name" :value="item.name">
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
            <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" style="width: 340px;" class="address" clearable :props="propes" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="商品介绍：" v-if="showFile">
            <div class="box-fileimg">
              <figure class="image" v-if="logoUrl">
                <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + logoUrl">
              </figure>
              <span class="submit">
                上传图片
                <form id="upload" enctype="multipart/form-data" method="post"> 
                  <input type="file" class="file" ref="file2" @change="fileFun2($event)">
                </form>
              </span>  
            </div>
          </el-form-item>
          <el-form-item label="商品基地图片：" v-if="showFile">
            <div class="img-box">
              <ul class="list">
                <li class="list-item" v-if="imgList.length > 0" v-for="(item,index) in imgList" :key="index">    
                  <figure class="image">
                    <p class="icon-delete" @click="deleteFun(item,index)">-</p> 
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url"  v-if="item.img_url">
                    <div class="submit-btn">
                      更换图片
                      <form id="upload" enctype="multipart/form-data" method="post"> 
                        <input type="file" class="file" ref="file2" multiple accept="image/*" @change="replaceFun($event,2,item)">
                      </form>
                    </div>  
                  </figure>
                </li>
                <li v-if="imgList.length < 5">
                  <div class="submit" @change="replaceFun($event,1)">
                    <div class="btn">
                      <p class="icon-add">+</p>
                      <p>添加图片</p>     
                    </div>
                    <form id="upload" enctype="multipart/form-data" method="post"> 
                      <input type="file" class="file" ref="file2" multiple accept="image/*">
                    </form>
                  </div>  
                </li>  
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="是否下发：">
            <el-radio-group v-model="disgrant">
              <el-radio label="未下发" value="未下发" name="disgrant"></el-radio>
              <el-radio label="已下发" value="已下发" name="disgrant"></el-radio>
            </el-radio-group>
          </el-form-item>
          <p class="add-material" v-if="amount" @click="MaterialFun">+添加原料</p>
          <p class="add-material" v-if="!amount" @click="newFun">+去增加原料</p>
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
      <div class="material-list" v-if="materialArr.length > 0">
        <div class="material-title">
          <p>已保存原料</p>
        </div>
        <div class="material-content">
          <div class="material-item" v-for="(item, index) in materialArr" :key="index">
            <p class="close" @click="removeStkFun(item)">X</p>
            <ul class="item">
              <li>
                <p>编码</p>
                <p>{{item.or_goods_code}}</p>
              </li>
              <li>
                <p>原料</p>
                <p>{{item.or_goods_name}}</p>
              </li>
              <li>
                <p>单位</p>
                <p>{{item.or_unit}}</p>
              </li>
              <li v-if="item.or_specification && item.or_specification != 'null'">
                <p>规格</p>
                <p>{{item.or_specification}}</p>
              </li>
              <li class="block">
                <p>占比</span>
                <p class="number">
                  <el-input v-model="item.or_number" clearable></el-input>
                </p>
              </li>
              <li>
                <p class="save" @click="editFun(item)">保存</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="material-list" v-if="newArr.length > 0">
        <div class="material-title">
          <p>新增原料</p>
        </div>
        <div class="material-content">
          <div class="material-item" v-for="(item, index) in newArr" :key="index">
            <p class="close" @click="removeStkFun2(index)">X</p>
            <ul class="item" style="padding-bottom: 16px;">
              <li>
                <p>编码</p>
                <p>{{item.GOODS_CODE}}</p>
              </li>
              <li>
                <p>原料</p>
                <p>{{item.GOODS_NAME}}</p>
              </li>
              <li>
                <p>单位</p>
                <p>{{item.GOODS_UNIT}}</p>
              </li>
              <li v-if="item.SPECIFICATIONS">
                <p>规格</p>
                <p>{{item.SPECIFICATIONS}}</p>
              </li>
              <li class="block">
                <p>占比</span>
                <p class="number">
                  <span>{{item.amount ? item.amount : 1}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-if="material">
      <div class="material">
        <div class="box-title">
          <p class="tit">添加原料配比信息</p>
          <p class="close" @click="closeFun">X</p>
        </div>
        <div class="search">
          <el-input placeholder="搜索原料名称" v-model="materialName" clearable></el-input>
          <el-button type="primary" @click="searchFun">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" style="width: 90%; margin: 0 auto;"
          @select="handleSelectionChange" @select-all="handleSelectionChange">
          <!--@select="handleSelectionChange" @select-all="handleSelectionChange"-->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="GOODS_CODE" label="原料编码"></el-table-column>
          <el-table-column prop="GOODS_NAME" label="原料名称"></el-table-column>
          <el-table-column prop="GOODS_UNIT" label="规格/单位"></el-table-column>
          <el-table-column label="投入品占比" width="120">
            <template slot-scope="scope">
              <el-input style="width: 100px;" placeholder="投入品占比" size="mini" v-model="scope.row.amount" clearable>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
        layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
        <!--<p style="margin: 10px 20px;">
          <el-button size="mini" @click="addMaterialFun">新增原料</el-button>
        </p>-->
        <div class="btn">
          <el-button class="sure-btn" type="primary" @click="saveMaterial">保存</el-button>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
  import {getDefaultProductTypes,allSpecification,addPurchase,goodUpdate,GoodsCode} from "../../js/goods/goods.js";
  import {GetSupplier} from '../../js/district/district.js'
  import {saleAdd,purchase,DeleteStkOr,GeStkOrigin,UpdateStkOr,InsertStkOr,GetGoodsJdImg,
    DeleteGoodsJdImg} from "../../js/goods/goods.js";
  import {getAddr} from '../../js/user/user.js';
  import {baseUrl,baseUrl2,updateGoodsJdImg} from '../../js/address/url.js'
  import axios from 'axios';
  export default {
    name: "",    
    data() {
      return {
        isShow:true,
        isShow2:true,
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
          brand: '',
          association_id: '',
          userdefine_code_one: '',
          userdefine_code_two: '',
          goodsCode: '',
          addr: [],//地址
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
        disgrant: '未下发',
        specificationList:[],
        region: '',
        bigAreaId: '',
        suppliersList:[],
        isRegion: '',
        scShopId: '', // 市场的shop_booth_id
        addrOptions:[],
        propes:{
          label: 'caption',
          value:'szm',
          children: 'list'
        },
        amount: true,
        material: false,
        materialName: '',
        tableData: [],
        selectStr: '',
        selectStr2: '',
        materialArr: [],
        page: 1,
        cols: 10,
        num: 0,
        imgUrl: '',
        imgFile: '',
        imgArr: [],
        logoUrl: '',
        file: '',
        logoArr: [],
        node_id: '',
        selectArr: [],
        selectArr2: [],
        newArr: [],
        node_name: '',
        showFile: false,
        newSelectArr: [],
        selectData: [],
        imgList: [],
        goodImgArr: [],
        sort: 1,
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
      if(localStorage.getItem('roleId') == "79" || localStorage.getItem('roleId') == "77"){
        this.rules.userdefine_code_two = [
          { required: true, message: '请输入物品码', trigger: 'blur' }
        ]
      }
      this.form.userId = localStorage.getItem('userId')
      this.region = this.$route.params.areaId
      this.bigAreaId = this.$route.params.bigAreaId
    },
    watch: {
      'tableData': {
        handler: function(newVal,oldVal){
          if(this.$route.params.goodsMsg){
            // 编辑新增原料
            let val = []
            this.selectArr2.forEach(ele => {
              newVal.forEach(v => {
                if(ele.ID == v.ID){
                  ele = v
                }
              })
            })
            let stk_goods_code = this.$route.params.goodsMsg.GOODS_CODE ? this.$route.params.goodsMsg.GOODS_CODE : '',
              stk_goods_name = this.$route.params.goodsMsg.GOODS_NAME,
              stk_specification = this.$route.params.goodsMsg.GOODS_UNIT,
              stk_number = '';
            let str = "[", 
              goodCode = '',
              specification = '';
            this.selectArr2.forEach((ele,index) => {
              if(ele.GOODS_CODE){
                goodCode = ele.GOODS_CODE
              }else{
                goodCode = index
              }
              if(ele.SPECIFICATIONS == null){
                specification = ''
              }else{
                specification = ele.SPECIFICATIONS
              }
              if(ele.amount){
                str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
                  + '","stk_goods_code":"' + stk_goods_code + '","stk_gb_code":"' + ele.GB_CODE
                  + '","stk_gb_name":"' + ele.GB_NAME
                  + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
                  + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
                  + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + specification
                  + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
              }else{
                str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
                  + '","stk_goods_code":"' + stk_goods_code + '","stk_gb_code":"' + ele.GB_CODE
                  + '","stk_gb_name":"' + ele.GB_NAME
                  + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
                  + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1 
                  + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + specification
                  + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
              }
            })
            str += "]"
            let stk = '';
            if(str != '[]'){
              stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
              this.selectStr2 = stk
            }else{
              this.selectStr2 = ''
            }
            console.log(stk)
            this.selectStr2 = stk
          }else{
            let val = []
            this.selectArr.forEach(ele => {
              newVal.forEach(v => {
                if(ele.ID == v.ID){
                  ele = v
                }
              })
            })
            let str = "[", 
              goodCode = '';
            this.selectArr.forEach((ele,index) => {
              if(ele.GOODS_CODE){
                goodCode = ele.GOODS_CODE
              }else{
                goodCode = index
              }
              if(ele.amount){
                str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
                  + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
                  + '","or_unit":"' + ele.GOODS_UNIT + '"},'
              }else{
                str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1
                  + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
                  + '","or_unit":"' + ele.GOODS_UNIT + '"},'
              }
              // "[{'or_goods_code':'892799','or_goods_name':'苹果','or_number':'1','or_unit':'斤'}
            })
            str += "]"
            let stk = ''
            if(str != '[]'){
              stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
              this.selectStr = stk
            }else{
              this.selectStr = ''
            }
            console.log(stk)
          }
        },
        deep: true
      }
    },
    mounted() {
      this.node_id = localStorage.getItem('loginId')
      this.node_name = localStorage.getItem('loginName')
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      this.initData();
      this.getAddrList()
      if(JSON.stringify(this.$route.params.goodsMsg)){ 
        if(this.$route.params.goodsMsg.DISGRANT == 0){
          this.disgrant = '未下发'
        }else if(this.$route.params.goodsMsg.DISGRANT == 1){
          this.disgrant = '已下发'
        }
        this.form.userdefineCategory = this.$route.params.goodsMsg.USERDEFINE_CATEGORY
        this.form.bzq = this.$route.params.goodsMsg.BZQ
        this.form.brand = this.$route.params.goodsMsg.BRAND
        this.form.association_id = this.$route.params.goodsMsg.association_id
        this.form.userdefine_code_one = this.$route.params.goodsMsg.userdefine_code_one
        this.form.userdefine_code_two = this.$route.params.goodsMsg.userdefine_code_two
        this.amount = false
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
        this.logoUrl = this.$route.params.goodsMsg.PRODUCT_IMG_URL
        this.imgUrl = this.$route.params.goodsMsg.IMG_URL
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
        }
        this.form.addr = originArr
        this.getStkFun()
        this.getGoodsJdImgFun()
      }else{
        this.getGoodsCode()
      }
    },
    methods: {
      deleteFun(ele,index){
        let str = 'id=' + ele.id
        DeleteGoodsJdImg(str)
          .then(res => {
            if(res.result == true){
              this.$message.success(res.message);
              this.getGoodsJdImgFun()
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log(res)
          })
      },
      getGoodsJdImgFun(){
        let str = 'goods_info_id=' + this.form.goodsID
        GetGoodsJdImg(str)
          .then(res => {
            if(res.data.length > 0){
              this.imgList = res.data
              this.sort = this.imgList[this.imgList.length - 1].sort + 1
            }
          })
          .catch(res => {
            console.log(res);
          })
      },
      replaceFun(event,ele,item){
        if(ele == 1){
          // 添加图片
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
                that.goodImgArr.push(src.slice(23))
              })
            }
          }
          let timer = setInterval(()=>{
            if(this.goodImgArr.length == file.length){
              let formData = new FormData()  
              formData.append('goods_info_id', that.form.goodsID);  
              formData.append('node_id', that.node_id);  
              formData.append('node_name', that.node_name);  
              formData.append('goods_name', that.form.goodsName);  
              formData.append('sort', that.sort);  
              formData.append('img_url', that.goodImgArr[0]);   
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
              let url = updateGoodsJdImg
              ajaxPost(url,formData,config)
                .then(res => {
                  if(res.result == true){
                    this.$message.success(res.message);
                  }else{
                    this.$message.error(res.message);
                  }
                  that.goodImgArr = []
                  that.getGoodsJdImgFun()
                })
                .catch(res => {
                  console.log(res)
                })
              clearInterval(timer);
            }
          },1000)
        }else{
          // 更换图片
          console.log(item)
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
                that.goodImgArr.push(src.slice(23))
              })
            }
          }
          let timer = setInterval(()=>{
            if(this.goodImgArr.length == file.length){
              let formData = new FormData()  
              formData.append('id', item.id);  
              formData.append('goods_info_id', that.form.goodsID);  
              formData.append('node_id', that.node_id);  
              formData.append('node_name', that.node_name);  
              formData.append('goods_name', that.form.goodsName);  
              formData.append('sort', item.sort);  
              formData.append('img_url', that.goodImgArr[0]);
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
              let url = updateGoodsJdImg
              ajaxPost(url,formData,config)
                .then(res => {
                  if(res.result == true){
                    this.$message.success(res.message);
                  }else{
                    this.$message.error(res.message);
                  }
                  that.goodImgArr = []
                  that.getGoodsJdImgFun()
                })
                .catch(res => {
                  console.log(res)
                })
              clearInterval(timer);
            }
          },1000)
        }
      },
      onSubmit(){
        let stk_goods_code = this.$route.params.goodsMsg.GOODS_CODE ? this.$route.params.goodsMsg.GOODS_CODE : '',
          stk_goods_name = this.$route.params.goodsMsg.GOODS_NAME,
          stk_specification = this.$route.params.goodsMsg.GOODS_UNIT,
          stk_number = '';
        let str = "[", 
          goodCode = '',
          specification = '';
        this.selectArr2.forEach((ele,index) => {
          if(ele.GOODS_CODE){
            goodCode = ele.GOODS_CODE
          }else{
            goodCode = index
          }
          if(ele.SPECIFICATIONS == null){
            specification = ''
          }else{
            specification = ele.SPECIFICATIONS
          }
          if(ele.amount){
            str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
              + '","stk_goods_code":"' + stk_goods_code + '","stk_gb_code":"' + ele.GB_CODE
              + '","stk_gb_name":"' + ele.GB_NAME
              + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
              + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
              + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + specification 
              + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
          }else{
            str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
              + '","stk_goods_code":"' + stk_goods_code + '","stk_gb_code":"' + ele.GB_CODE
              + '","stk_gb_name":"' + ele.GB_NAME
              + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
              + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1 
              + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + specification
              + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
          }
        })
        str += "]"
        let stk = '';
        if(str != '[]'){
          stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
          this.selectStr2 = stk
        }else{
          this.selectStr2 = ''
        }
        console.log(stk)
        this.selectStr2 = stk
        let obj = {
          // node_id: this.node_id,
          // node_name: this.node_name,
          // stk_goods_code: this.$route.params.goodsMsg.GOODS_CODE ? this.$route.params.goodsMsg.GOODS_CODE : '',
          // stk_goods_name: this.$route.params.goodsMsg.GOODS_NAME,
          // stk_specification: this.$route.params.goodsMsg.GOODS_UNIT,
          // stk_number: this.form2.number,
          // or_goods_code: this.form2.goods_code,
          // or_goods_name: this.form2.goods_name,
          // or_number: this.form2.number,
          // or_unit: this.form2.specification,
          // or_specification: this.form2.input + this.form2.unit + this.form2.goodsUnit,
          // main_or: 1,
          stk: this.selectStr2
        }
        InsertStkOr(obj)
          .then(res => {
            if (res.result == true) {
              this.$message.success(res.message);
              this.getStkFun()
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      newFun(){
        this.page = 1
        this.material = true
        this.getPurchase()
      },
      editFun(ele){
        let or_goods_name = '',
          or_unit = '',
          or_number = '',
          or_specification = '';
        if(ele.or_number){
          or_number = ele.or_number
        }else{
          or_number = ''
        }
        let obj = {
          id: ele.id,
          or_goods_code: ele.or_goods_code,
          or_goods_name: ele.or_goods_name,
          or_unit: ele.or_unit,
          or_number: or_number,
          or_specification: ele.or_specification,
          main_or: 0,
        }
        UpdateStkOr(obj)
          .then(res => {
            if (res.result == true) {
              this.$message.success(res.message);
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      removeStkFun2(ele){
        this.newArr.splice(ele,1)
        this.newArr.length - 1
      },
      removeStkFun(ele){
        let obj = {
          id: ele.id
        }
        DeleteStkOr(obj)
          .then(res => {
            if (res.result == true) {
              this.$message.success(res.message);
              this.getStkFun()
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      getStkFun(){
        let obj = {
          node_id: this.node_id,
          goodsName: this.$route.params.goodsMsg.GOODS_NAME,
          goodsCode:  this.form.goodsCode,
        }
        GeStkOrigin(obj)
          .then(res => {
            this.materialArr = res.data.list
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      // 图片
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
      // 商品介绍
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
      getPurchase(){
        let boothData = {
          page: this.page,
          cols: this.cols,
          goodsName: this.materialName,
          suppliersName: '',
          region: this.region,
          userId: this.form.userId,
          total: '',
        }
        purchase(boothData)
          .then(res => { 
            res.data.purchaseList.forEach((v,i) => {
              if(this.selectArr.length != 0){
                this.selectArr.forEach((val,ind) => {
                  if(val.ID == v.ID){
                    v.amount = val.amount
                  }
                })
              }else if(this.selectArr2.length != 0){
                this.selectArr2.forEach((val,ind) => {
                  if(val.ID == v.ID){
                    v.amount = val.amount
                  }
                })
              }
            })
            this.tableData = res.data.purchaseList;
            this.num = res.data.goodsinfo.total;
            this.$nextTick(()=>{          
              if(this.$route.params.goodsMsg){
                if(this.selectArr2.length != 0){
                  this.tableData.forEach((v,i) => {
                    this.selectArr2.forEach((val,ind) => {
                      if(val.ID == v.ID){
                        this.$refs.multipleTable.toggleRowSelection(v)
                      }
                    })
                  })
                }
              }else{
                if(this.selectArr.length != 0){
                  this.tableData.forEach((v,i) => {
                    this.selectArr.forEach((val,ind) => {
                      if(val.ID == v.ID){
                        this.$refs.multipleTable.toggleRowSelection(v)
                      }
                    })
                  })
                }
              }  
            })
          })
          .catch(res => {
            console.log(res)
          })
      },
      searchFun(){
        this.page = 1
        this.getPurchase()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getPurchase()
      },
      MaterialFun(){
        this.page = 1
        this.material = true
        this.getPurchase()
      },
      handleSelectionChange(val) {
        console.log(val)
        if(this.$route.params.goodsMsg){
          // 编辑新增原料
          // let stk_goods_code = this.$route.params.goodsMsg.GOODS_CODE ? this.$route.params.goodsMsg.GOODS_CODE : '',
          //   stk_goods_name = this.$route.params.goodsMsg.GOODS_NAME,
          //   stk_specification = this.$route.params.goodsMsg.GOODS_UNIT,
          //   stk_number = '';
          if(this.selectArr2.length == 0){
            this.selectArr2 = val
          }else{
            for(var i = 0; i < val.length; i++){
              if(this.selectArr2.indexOf(val[i])==-1){
                this.selectArr2.push(val[i]);
              }
            }
          }
          // let str = "[", 
          //   goodCode = '';
          // this.selectArr2.forEach((ele,index) => {
          //   if(ele.GOODS_CODE){
          //     goodCode = ele.GOODS_CODE
          //   }else{
          //     goodCode = index
          //   }
          //   if(ele.amount){
          //     str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
          //       + '","stk_goods_code":"' + stk_goods_code
          //       + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
          //       + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
          //       + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + ele.SPECIFICATIONS 
          //       + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
          //   }else{
          //     str += '{"node_id":"' + this.node_id + '","node_name":"' + this.node_name + '","stk_goods_name":"' + stk_goods_name
          //       + '","stk_goods_code":"' + stk_goods_code + '","stk_specification":"' + stk_specification
          //       + '","stk_number":"' + 1 + '","stk_specification":"' + stk_specification
          //       + '","or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1 
          //       + '","or_unit":"' + ele.GOODS_UNIT + '","or_specification":"' + ele.SPECIFICATIONS 
          //       + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME + '","main_or":"' + 1 +  '"},'
          //   }
          // })
          // str += "]"
          // let stk = '';
          // if(str != '[]'){
          //   stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
          //   this.selectStr2 = stk
          // }else{
          //   this.selectStr2 = ''
          // }
          // console.log(stk)
          // this.selectStr2 = stk
        }else{
          if(this.selectArr.length == 0){
            this.selectArr = val
          }else{
            for(var i = 0; i < val.length; i++){
              if(this.selectArr.indexOf(val[i])==-1){
                this.selectArr.push(val[i]);
              }
            }
            for (var k = 0; k < this.selectArr.length; k++) {
              for (var j = 0; j < this.selectArr.length; j++) {
                if (this.selectArr[k] == this.selectArr[j] && k != j) {//将后面重复的数删掉
                  this.selectArr.splice(j, 1);
                }
              }
            }
          }
          // let str = "[", 
          //   goodCode = '';
          // this.selectArr.forEach((ele,index) => {
          //   if(ele.GOODS_CODE){
          //     goodCode = ele.GOODS_CODE
          //   }else{
          //     goodCode = index
          //   }
          //   if(ele.amount){
          //     str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
          //       + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
          //       + '","or_unit":"' + ele.GOODS_UNIT + '"},'
          //   }else{
          //     str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1
          //       + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
          //       + '","or_unit":"' + ele.GOODS_UNIT + '"},'
          //   }
          //   // "[{'or_goods_code':'892799','or_goods_name':'苹果','or_number':'1','or_unit':'斤'}
          // })
          // str += "]"
          // let stk = '';
          // if(str != '[]'){
          //   stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
          //   this.selectStr = stk
          // }else{
          //   this.selectStr = ''
          // }
          // console.log(stk)
          // this.selectStr = stk
        }
      },
      saveMaterial(){
        if(this.$route.params.goodsMsg){
          this.onSubmit()
        }else{
          for(var i = 0; i < this.selectArr.length; i++){
            if(this.newArr.indexOf(this.selectArr[i])==-1){
              this.newArr.push(this.selectArr[i]);
            }
          }
        }
        this.material = false
        this.materialName = ''
        this.selectArr = []
        this.selectArr2 = []
      },
      closeFun(){
        this.material = false
        this.materialName = ''
        this.selectArr = []
        this.selectArr2 = []
      },
      addMaterialFun(){
        this.$router.push({name:'EditStocks',params:{'areaId':this.region,'bigAreaId':this.bigAreaId,'scShopId': this.scShopId}})
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
      // 查询供应商
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
      selectSuppliers(val){//选择供应商
        this.suppliersList.forEach((ele)=>{ 
          if(ele.SHOP_CONCACTS_ID === val){
            this.form.suppliersName = ele.BIZ_NAME;
          }
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
            if(JSON.stringify(this.$route.params.goodsMsg)){

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
                // stk: this.selectStr,
                areaOriginId: this.form.addr[this.form.addr.length-1],
                areaOriginNname: addrArr.join(""),
                node_id: this.node_id,
                association_id: this.form.association_id,
                userdefine_code_one: this.form.userdefine_code_one,
                userdefine_code_two: this.form.userdefine_code_two,
                userdefineCategory: this.form.userdefineCategory,
                bzq: this.form.bzq,
                brand: this.form.brand,
                disgrant: this.disgrant == "未下发" ? 0 : 1
              };
              goodUpdate(params)
                .then(res => {
                  if (res.result == true) {
                    this.$message.success(res.message);
                    this.$router.push({path:'market'});
                  }else{
                    this.$message.error(res.message);
                  }
                })
                .catch(() => {
                  this.$message.error("出错啦!");
                })

            }else{
              let str = "[", 
                goodCode = '';
              this.newArr.forEach((ele,index) => {
                if(ele.GOODS_CODE){
                  goodCode = ele.GOODS_CODE
                }else{
                  goodCode = index
                }
                if(ele.amount){
                  str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + ele.amount 
                    + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
                    + '","or_unit":"' + ele.GOODS_UNIT + '"},'
                }else{
                  str += '{"or_goods_code":"' + goodCode + '","or_goods_name":"' + ele.GOODS_NAME + '","or_number":"' + 1
                    + '","or_gb_code":"' + ele.GB_CODE + '","or_gb_name":"' + ele.GB_NAME
                    + '","or_unit":"' + ele.GOODS_UNIT + '"},'
                }
              })
              str += "]"
              let stk = '';
              if(str != '[]'){
                stk = str.substr(0, str.length-2)+str.substr(str.length-1,str.length)
                this.selectStr = stk
              }else{
                this.selectStr = ''
              }
              this.selectStr = stk
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
                stk: this.selectStr,
                association_id: this.form.association_id,
                userdefine_code_one: this.form.userdefine_code_one,
                userdefine_code_two: this.form.userdefine_code_two,
                userdefineCategory: this.form.userdefineCategory,
                bzq: this.form.bzq,
                brand: this.form.brand,
                disgrant: this.disgrant == "未下发" ? 0 : 1
              };
              saleAdd(params)
                .then(res => {
                  if (res.result == true) {
                    this.$message.success(res.message);
                    this.$router.push({path:'market'});                    
                    this.$emit('changePage',{})
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
      selectChange2(value) {//选择单位
        if(value == "斤" || value == "公斤"){
          this.isShow2 = false;
          this.form.input = '';
        }else {
          this.isShow2 = true;
          this.form2.goodsUnit = '/'+value;
        }
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
        this.systemDefaultTypeLists();
        //查询规格列表
        this.getAllSpecification();
        //查询供应商列表
        this.getAllSuppliers()
      }
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .content {
    height: 100%;
    box-sizing: border-box;
    .img-box{
      .list{
        display: flex;
        flex-wrap:wrap;
        width: 360px;
        li{
          height: 80px;
          margin: 10px; 
        }
        .list-item{   
          .image{
            position: relative;
            top: 0;
            left: 0;
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
            .submit-btn{
              position: relative;
              right: -28px;
              bottom: 40px;
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
        }
        .submit{  
          position: relative;
          top: 0;
          display: inline-block;
          margin-bottom: -12px;
          width: 80px;
          height: 80px;
          line-height: 30px;
          color: #ccc;
          background: #fff;
          overflow: hidden;
          border-radius: 5px;
          font-size: 14px;
          box-sizing: border-box;
          border: 1px dashed #ccc;
          .btn{
            text-align: center;
            p{
              line-height: 30px;
            }
            .icon-add{ 
              margin-top: 10px;
              font-size: 26px;
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
    }
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
    .form-box{
      clear: both;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 222;
      background: rgba(0,0,0,.6);
      .form{
        position: relative;
        top: 50%;
        left: 50%;
        margin-left: -270px;
        margin-top: -300px;
        width: 540px;
        height: 600px;
        background: #fff;
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
        .el-form{
          margin: 30px 50px;
          .el-input, .el-select{
            width: 270px;
          }
        }
      }
    }
    .el-pagination{
      margin-top: 15px;
      text-align: center;
    }
    .box{
      clear: both;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 222;
      background: rgba(0,0,0,.6);
      .material{
        position: relative;
        top: 0;
        left: 50%;
        margin-left: -320px;
        margin-top: 100px;
        width: 640px;
        height: 600px;
        background: #fff;
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
            width: 300px;
          }
        }
        .btn{
          margin-left: 220px;
          .sure-btn{
            color: #409EFF;
            background: #fff;
          }
        }
      }
    }
    .add-material{
      margin: 5px 0;
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #409EFF;
      cursor: pointer;
    }
    .material-list{
      float: left;
      margin-top: 30px;
      width: 400px;
      background: #f2f2f2;
      border: 1px solid #ccc;
      box-sizing: border-box;
      .material-title{
        p{
          padding-left: 20px;
          font-size: 14px;
          line-height: 50px;
        }
      }
      .material-content{
        display: flex;
        flex-wrap:wrap;
      }
      .material-item{
        margin: 16px 19px;
        width: 160px;
        background: #fff;
        .item{
          li{
            display: flex;
            p{
              width: 80px;
              font-size: 14px;
              line-height: 30px;
            }
            p:first-child{
              margin-right: 10px;
              width: 50px;
              text-align: right;
            }
            .number{
              width: 70px;
            }
            .edit{
              margin-right: 20px;
              width: 100%;
              text-align: right;
              color: #8d8d8d;
              line-height: 30px;
              font-size: 16px;
              cursor: pointer;
            }
            .el-input{
              width: 80px;
            }
            .save{
              margin-left: 120px;
              width: 30px;
              text-align: center;
              color: #409EFF;
              font-size: 12px;
              cursor: pointer;
            }
          }
        } 
        .close{
          position: relative;
          top: -8px;
          left: 150px;
          visibility: hidden;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: #ccc;
          color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .material-item:hover{
        .close{
          visibility: visible;
        }
      }
    }
    .big-box{
      display: flow-root;
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .section-content{
      float: left;
      padding-top: 20px;
      padding-right: 10px;
      margin-right: 40px;
      width: 460px;
    }
    .new-add{
      margin-left: 80px;
      margin-top: 30px;
    }
    .el-cascader{
      width: 380px;
    }
    .el-table{
      height: 360px;
      overflow: auto;
    }
  }
</style>