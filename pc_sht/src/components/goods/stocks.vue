<template>
  <div class="content" ref='content'>
    <div class="areaBox" ref="areaBox" v-if="isShow">
      <AreaSelect @selectId='selectId'></AreaSelect>
    </div>
    <div class="box" v-if="boxShow">
      <div class="select">
        <p class="close" @click="closeFun">X</p>
        <div class="filemsg">
          {{fileMsg}}
        </div>
        
      </div>
    </div>

    <div class="option-wrapper" ref="optionWrapper">
      <div class="option serach-val">
        <span class="option-title">商品编码</span>
        <el-input class="fill-input" v-model="goodsCode" clearable placeholder="请输入内容"></el-input>
        <span class="option-title">商品名称</span>
        <el-input class="fill-input" v-model="goodsName" clearable placeholder="请输入内容"></el-input>
        <span class="option-title">商品简称</span>
        <el-input class="fill-input" v-model="j_name" clearable placeholder="请输入内容"></el-input>
      </div>
      <div class="option">
        <span class="option-title">供应商</span>
        <el-input class="fill-input" v-model="supplier" clearable placeholder="请输入内容"></el-input>
        <el-button type="primary" size="medium" class="search-btn" @click="searcGoods">搜索</el-button>
        <el-button type="primary" size="medium" class="file-btn">导出</el-button>
        <span class="clear-content" @click="clearConditions">清空筛选条件</span>
      </div>
    </div>
    <div class="table">
      <div class="title">
        <p class="tz-title">全部进货商品</p>
        <div class="tit">
          <el-button type="primary" size="medium" class="new-add"  @click="newStocksMgm">{{addGoods}}</el-button>
          <div class="submit">
              批量导入
            <form id="upload" enctype="multipart/form-data" method="post"> 
              <input type="file" class="file" ref="file" @change="fileFun($event)">
            </form> 
          </div>
          <el-button type="primary" size="medium" class="import" @click="loadFun">下载</el-button>
        </div>
      </div>
      <div class="booth-management-msg" :header-cell-style="rowClass">
        <el-table :data="dataList"  border :header-cell-style="rowClass">
          <el-table-column prop="GOODS_CODE" label="商品编码"> </el-table-column>
          <el-table-column prop="GOODS_NAME" label="商品名称"> </el-table-column>
          <el-table-column prop="J_NAME" label="商品简称"> </el-table-column>
          <el-table-column prop="GB_NAME" :formatter="formatter" label="品种"> </el-table-column>
          <el-table-column prop="PRICE" label="价格"> </el-table-column>
          <el-table-column prop="GOODS_UNIT" label="规格"> </el-table-column>
          <el-table-column prop="SUPPLIERS_NAME" label="供应商"> </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="check(scope.$index, scope.row)">{{viewGoods}}</el-button>
              <el-button size="mini" type="text" style="margin-left: 20px" @click="edit(scope.$index, scope.row)">{{editGoods}}</el-button>
              <el-button size="mini" type="text" style="margin-left: 20px" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="cols"
          layout="total, prev, pager, next, jumper"
          :total='dataTotal'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
  }
  import axios from 'axios';
  import {purchase,deleteGood,getDefaultProductTypes,DownloadPurchase} from "../../js/goods/goods.js";
  import {QueryArea} from '../../js/area/area.js';
  import AreaSelect from '../common/area';
  import {GetSupplier} from '../../js/district/district.js'
  import {baseUrl2} from '../../js/address/url.js'
  export default {
    name: "stocks",
    data() {
      return{
        addGoods:'新增进货商品',
        viewGoods:'查看',
        editGoods:'编辑',
        dataList:[],
        total: "",
        page: 1,
        cols: 15,
        userId:2,
        suppliersName: "",
        goodsName: "",
        supplier:'',
        areaId:'',//大区的shop_booth_id
        bigAreaId:'',//大区userId
        currentPage:1,
        dataTotal:0,
        queryNameData:[],
        isShow: true,
        isRegion: '',
        boxShow: false,
        gysId: '',
        suppliersList:[],
        gysName: '',
        areaName: '',
        scShopId: '', // 市场的shop_booth_id
        region: '',
        loginId: '',
        loginName: '',
        fileMsg: '',
        file: '',
        goodsCode: '',
        j_name: '',
      }
    },
    created(){
      this.userId = localStorage.getItem('userId');          
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      this.loginId = localStorage.getItem('loginId')
      this.loginName = localStorage.getItem('loginName')
    },
    mounted() {  
      this.queryNameData = JSON.parse(localStorage.getItem('queryNameData'))
      if(this.isRegion == 'false'){
        this.isShow = false
        this.getPurchase()
      }else{
        this.queryLists();  
      }
    },
    methods: {
      rowClass({ row, rowIndex}) {
        return {
          background: '#f2f2f2',
          color: '#333'
        }
      },  
      // 获取供应商
      getAllSuppliers(){
        if(this.isRegion == 'false'){
          let obj = {
            page: '1',
            cols: '100',
            userId: this.userId, // 区域
            type: "1",
            concact_name: "",
            region: this.areaId, //区域shop_booth_id
            biz_name: "",
            shop_booth_id: this.scShopId //区域shop_booth_id
          }
          GetSupplier(obj)
            .then(res =>{
              console.log(res)
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
            region: this.areaId, //区域shop_booth_id
            biz_name: "",
            shop_booth_id: this.areaId //区域shop_booth_id
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
          if(ele.shop_concacts_id === val){
            this.gysName = ele.biz_name;
          }
        })
      },
      closeFun(){
        this.boxShow = false;
        this.getPurchase()
      },
      fileShowFun(){
        this.boxShow = true;
      },
      // 下载
      loadFun(){
        window.location.href = baseUrl2 + "goods/downloadPurchase?userId=" + this.userId + '&region=' + this.areaId
      },
      // 上传
      fileFun(event){
        let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('purchase', this.file);  
            formData.append('userId', this.userId);  
            formData.append('node_id',this.loginId); 
            formData.append('region',this.areaId); 
            formData.append('node_name',this.loginName); 
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
            //http://192.168.1.14:8081/order_sht/goods/importPurchase
            let url = baseUrl2 + 'goods/importPurchase'
            ajaxPost(url,formData,config)
              .then(res => {
                this.boxShow = true;
                this.fileMsg = res.message
                this.$refs.file.value = null
              })
              .catch(res => {
                console.log(res)
                this.$message.error("出错了");
              })
          

      },
      getPurchase(){
        let boothData = {
          page: this.page,
          cols: this.cols,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
          suppliersName:this.supplier.trim(),
          region: this.areaId,
          userId: this.userId,
          total: '',
          j_name: this.j_name
        }
        purchase(boothData)
          .then(res => {
            this.dataList = res.data.purchaseList;
            this.dataTotal = res.data.goodsinfo.total;
          })
          .catch(res => {
            console.log(res)
          })
      },
      formatter(row, column){
        let typeName = '';
        let level_1_name  = '';
        let level_2_name  = '';
        let level_3_name  = '';
        let level_4_name  = '';
        let queryNameData = this.queryNameData;
        if(!row.level_id){
          return
        }
        if(row.level_id.length == 2){
          level_1_name = queryNameData[0].type_name;
          typeName = level_1_name;
        }
        if(row.level_id.length == 5){
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
            if(ele.level_id == row.level_id.slice(0-5)){
              level_2_name = ele.type_name;
              typeName = level_1_name +'/'+ level_2_name ;
            }
          })
        }
        if(row.level_id.length == 8){
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
            if(ele.level_id == row.level_id.slice(0,5)){
              level_2_name = ele.type_name;
              ele.systemDefaultTypeList.forEach((ele)=>{
                if(ele.level_id == row.level_id.slice(0,8)){
                  level_3_name = ele.type_name;
                  typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name;
                }
              })
            }
          })
        }
        if(row.level_id.length == 12){
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
            if(ele.level_id == row.level_id.slice(0,5)){
              level_2_name = ele.type_name;
              ele.systemDefaultTypeList.forEach((ele)=>{
                if(ele.level_id == row.level_id.slice(0,8)){
                  level_3_name = ele.type_name;
                  ele.systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0,12)){
                      level_4_name = ele.type_name;
                      typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name +'/'+ level_4_name;
                    }
                  })
                }
              })
            }
          })
        }
        return typeName;
      },    
      handleSizeChange(val) { //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //currentPage 改变时会触发
        this.page = val
        if(this.isRegion == 'false'){
          this.isShow = false
          this.getPurchase()
        }else{
          this.getPurchase()
        }
      },  
      clearConditions(){
        this.goodsName = '';
        this.supplier = '';
        this.goodsCode = ''
        this.getPurchase()
      },
      newStocksMgm(){
        this.$router.push({name:'EditStocks',params:{'areaId':this.areaId,'bigAreaId':this.bigAreaId,'scShopId': this.scShopId}})
      },
      check(index, row){
        this.$router.push({name:'ViewStocks',params:{'name':this.viewGoods,'goodsMsg':row,'scShopId': this.scShopId}})
      },
      edit(index, row){
        this.$router.push({name:'EditStocks',params:{'areaId':this.areaId,'bigAreaId':this.bigAreaId,'name':this.viewGoods,'goodsMsg':row,'scShopId': this.scShopId}})
      },
      handleDelete(index, row){ //删除列表信息
        this.$confirm('是否要删除此条信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteGood(row.ID)
              .then(res => {
                console.log(res)
                this.getPurchase()
              })
              .catch(res => {
                console.log(res);
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        
      },
      queryLists(){//查询进货商品列表
        let data = {
          page: '1',
          cols: '100',
          total: '',
          userId: this.userId,
          name: this.goodsName,
          boothName: this.supplier.trim(),
          goodsCode: this.goodsCode,
        }
        QueryArea(data)
          .then(res => {      
            this.bigAreaId = res.data.dataList[0].userId;
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.areaName = res.data.dataList[0].name
            let boothId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.getAllSuppliers()
            this.getPurchase()
          })
          .catch(res => {
            console.log(res)
          })
      },
      searcGoods(){//按条件搜索
        this.getPurchase()
      },
      selectId(id){//选择区域展示商品列表
        if(this.isRegion == 'false'){
          this.isShow = false
          this.getPurchase()
        }else{
          let data = {
            page: '1',
            cols: '100',
            total: this.total,
            userId: this.userId,
            name: this.goodsName,
            boothName: this.supplier.trim(),
          }
          QueryArea(data)
            .then(res =>{
              res.data.dataList.forEach(ele => {
                if(ele.userId == id){
                  this.bigAreaId = id;
                  this.areaId = ele.bootList[0].shop_booth_id;
                  this.areaName = ele.name
                  let boothId = ele.bootList[0].shop_booth_id;
                  this.getPurchase()
                  this.getAllSuppliers()
                }
              });
            })
            .catch(res =>{
              console.log(res)
            })
        }
      }
    },
    components:{
      AreaSelect,
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .content{
    height: 100%;
    box-sizing: border-box;
    .areaBox{
      padding: 10px;
      background: #fff;
    }
    .table{
      padding: 10px;
      background: #fff;
    }
    .title{
      display: flex;
      .tz-title{
        flex: 1;
        padding-left: 4px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        box-sizing: border-box;
        border-left: 2px solid #409EFF;
      }
      .tit{
        display: flex;
      }
    }
    .file-btn{
      color: #777;
      background: #fff;
      border-color: #eaeaea;
    }
    .stocks{
      display: flex;
    }
    .search-btn{
      color: #409EFF;
      background: #fff;
    }
    .submit{
      position: relative;
      top: 0;
      display: inline-block;
      margin: 0 10px;
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
    .box{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999;
      .filemsg{
        width: 360px;
        height: 240px;
        margin: 10px auto;
        font-size: 14px;
        overflow: hidden;
      }
      .select{
        background: #fff;
        width: 400px;
        height: 300px;
        position: relative;
        top: 50%;
        margin-top: -150px;
        left: 50%;
        margin-left: -200px;
        .close{
          text-align: right;
          margin-right: 20px;
          padding-top: 10px;
          cursor: pointer;
        }
      }
    }
    .import{
      color: #169bd5;
      background: #fff;
    }
    .option-wrapper{
      clear: both;
      display: flex;
		  flex-wrap: wrap;
      margin: 10px 0;
      background: #fff;
      padding: 10px;
    }
    .serach-val{
      width: 710px;
    }
    .option{
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
      .option-title,.fill-input{
        float: left;
        display: block;
        margin-right: 10px;
      }
      .option{
        width: 100px;
      }
      .fill-input{
        width: 160px;
      }
      .ecport-btn{
        color: #169bd5;
        background: #fff;
      }
      .clear-content{
        margin-left: 10px;
        cursor: pointer;
        color: #999999;
      }
    }
    .booth-management-msg{
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
<style>
.el-table--border th{
  background:#F2F2F2;
}
.pagination{
  padding-top: 10px;
  text-align: center;
}
</style>