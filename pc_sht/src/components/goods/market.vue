<template>
  <div class="content" ref='content'>
    <div class="areaBox" ref="areaBox" v-if="isShow">
      <AreaSelect  @selectId='selectId'></AreaSelect>
    </div>
    <div class="option-wrapper" ref="optionWrapper">
      <div class="option-wrappers" ref="optionWrapper">
        <div class="search-val">
          <div>
            <span class="option-title">商品编码</span>
            <el-input class="fill-input" v-model="goodsCode" clearable placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span class="option-title">商品名称</span>
            <el-input class="fill-input" v-model="goodsName" clearable placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span class="option-title">商品简称</span>
            <el-input class="fill-input" v-model="j_name" clearable placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span class="option-title">是否为报价商品</span>
            <el-select v-model="isNeed" filterable clearable placeholder="请选择">
              <el-option  label="是" value="1"></el-option>
              <el-option  label="否" value="0"></el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary" size="medium" class="import" style="margin-left: 10px;" @click="searchConditions">搜索</el-button>
            <span class="span-clear" @click="clearConditions">清空筛选条件</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-if="boxShow">
      <div class="select">
        <p class="close" @click="closeFun">X</p>
        <div class="filemsg">
          {{fileMsg}}
        </div>
      </div>
    </div>
    <div class="table">
      <div class="title">
        <p class="tz-title">全部销售商品</p>
        <div class="tit">
          <el-button type="primary" size="medium" class="new-add"  @click="addSellGood">{{addSellGoods}}</el-button>
          <div class="submit">
              批量导入
            <form id="upload" enctype="multipart/form-data" method="post"> 
              <input type="file" class="file" ref="file" @change="fileFun($event)">
            </form> 
          </div>
          <el-button type="primary" size="medium" class="import" @click="loadFun">下载</el-button>
        </div>
      </div>
      <div class="booth-management-msg">
        <el-table :data="dataList" :header-cell-style="rowClass">
          <el-table-column prop="GOODS_CODE" label="商品编码"> </el-table-column>
          <el-table-column prop="GOODS_NAME" label="商品名称"> </el-table-column>
          <el-table-column prop="J_NAME" label="商品简称"> </el-table-column>
          <el-table-column prop="GB_NAME" label="品种" :formatter="formatter"> </el-table-column>
          <el-table-column prop="PRICE" label="价格"> </el-table-column>
          <el-table-column prop="GOODS_UNIT" label="规格"> </el-table-column>
          <el-table-column prop="SUPPLIERS_NAME" label="供应商"> </el-table-column>
          <el-table-column label="原料"> 
            <template slot-scope="scope">
              <p v-for="(item,index) in scope.row.stk_list" :key="index">{{item.or_goods_name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否为报价商品" width="140">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.IS_NEED" active-text="是" inactive-text="否"
              active-value="1" inactive-value="0" @change="isNeedFun(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <!--<el-button type="text" size="small" @click="check(scope.$index, scope.row)">{{viewSellGoods}}</el-button>-->
              <el-button size="mini" type="text" style="margin-left: 20px" @click="edit(scope.$index, scope.row)">{{editSellGoods}}</el-button>
              <el-button size="mini" type="text" style="margin-left: 20px" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination v-if="dataTotal" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="page" :page-size="cols" layout="total, prev, pager, next, jumper" :total='dataTotal'>
        </el-pagination>
      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios';
  import {sales,deleteGood,purchase,updateGoodsIsNeed} from "../../js/goods/goods.js";
  import {QueryArea} from '../../js/area/area.js';
  import AreaSelect from '../common/area';
  import {GetSupplier} from '../../js/district/district.js'
  import {baseUrl,baseUrl2} from '../../js/address/url.js'
  export default {
    name: "market",
    data() {
      return{
        addSellGoods:'新增销售商品',
        viewSellGoods:'查看',
        editSellGoods:'编辑',
        dataList:[],
        value: '',
        total: "",
        page: 1,
        cols: 15,
        userId:2,
        goodsName: "",
        areaId:'',//大区的shop_booth_id
        bigAreaId:'',//大区userId
        currentPage:1,
        dataTotal:0,
        supplier: '',
        isShow: true,
        isRegion: '',
        boxShow: false,
        gysId: '',
        suppliersList:[],
        gysName: '',
        areaName: '',
        scShopId: '', // 市场的shop_booth_id
        queryNameData: [],
        loginId: '',
        loginName: '',
        fileMsg: '',
        goodsCode: '',
        j_name: '',
        node_id: '',
        isNeed: '',
      }
    },
    created() {
      this.userId = localStorage.getItem('userId')
      this.node_id = localStorage.getItem('loginId')
    },
    mounted() {    
      this.queryNameData = JSON.parse(localStorage.getItem('queryNameData'))
      this.scShopId = localStorage.getItem('scShopId');
      this.isRegion = localStorage.getItem('isRegion')
      this.loginId = localStorage.getItem('loginId')
      this.loginName = localStorage.getItem('loginName')
      if(this.isRegion == 'false'){
        this.isShow = false
        this.getSales()
      }else{  
        this.queryList();//初始化筛选商品列表
      }
      this.getAllSuppliers()
    },   
    methods: {  
      isNeedFun(ele){
        let str = 'id=' + ele.ID + '&is_need=' + ele.IS_NEED
        updateGoodsIsNeed(str)
          .then(res => {
            if(res.result == true){
              this.$message.success(res.message);
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log(res)
          })
      },
      closeFun(){
        this.boxShow = false;
        this.getSales()
      },
      loadFun(){
        window.location.href = baseUrl + "goods/downloadSaleGoods?userId=" + this.userId + '&region=' + this.areaId + '&node_id=' + this.node_id
      },
      fileFun(event){
        let param = this.$refs.file.files[0];
        this.file = event.target.files[0];
        let formData = new FormData();
        formData.append('saleAndOrigin', this.file);  
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
        let url = baseUrl2 + 'goods/importSaleAndOrigin'
        ajaxPost(url,formData,config)
          .then(res => {
            this.boxShow = true;
            if(res.message == ""){
              this.fileMsg = res.message
            }else{
              if(res.result == true){
                this.fileMsg = "导入成功"
              }else{
                this.fileMsg = "导入失败"
              }
            }
            this.$refs.file.value = null
          })
          .catch(res => {
            console.log(res)
            this.$message.error("出错了");
          })
      },
      rowClass({ row, rowIndex}) {
        return {
          background: '#f2f2f2',
          color: '#333'
        }
      },  
      formatter(row, column){
        let typeName = '';
        let level_1_name  = '';
        let level_2_name  = '';
        let level_3_name  = '';
        let level_4_name  = '';
        if(!row.level_id){
          return
        }
        let queryNameData = this.queryNameData;
        if(row.level_id.length == 2){
          if(queryNameData){
            level_1_name = queryNameData[0].type_name;
          }
          typeName = level_1_name;
        }
        if(row.level_id.length == 5){
          if(queryNameData){
            level_1_name = queryNameData[0].type_name;
            queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
              if(ele.level_id == row.level_id.slice(0-5)){
                level_2_name = ele.type_name;
                typeName = level_1_name +'/'+ level_2_name ;
              }
            })
          }
        }
        if(row.level_id.length == 8){
          if(queryNameData){
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
        }
        if(row.level_id.length == 12){
          if(queryNameData){
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
        }
        return typeName;
      }, 
      getAllSuppliers(){
        if(this.isRegion == 'false'){
          let obj = {
            page: '1',
            cols: '100',
            userId: this.userId,
            type: '1',
            concact_name: '',
            region: this.areaId, //区域shop_booth_id
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
      getSales(){
        let boothData = {
          page: this.page,
          cols: this.cols,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
          suppliersName:this.supplier,
          region:this.areaId,
          userId: this.userId,
          total: '',
          j_name: this.j_name,
          is_need: this.isNeed
        }
        sales(boothData)
          .then(res => {
            this.dataTotal = res.data.goodsinfo.total;
            this.dataList = res.data.salesList;
          })
          .catch(res => {
            console.log(res)
          })
      }, 
      queryList(){//初始化筛选商品列表
        let data = {
          page: '1',
          cols: '100',
          total: this.total,
          userId: this.userId,
          name: this.goodsName,
          goodsCode: this.goodsCode,
          boothName: '',
          node_id: this.node_id
        }
        QueryArea(data)
          .then(res => {        
            this.bigAreaId = res.data.dataList[0].userId;
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.areaName = res.data.dataList[0].name
            let boothId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.getSales()
          })
          .catch(res => {
            console.log(res)
          })
      },   
      handleSizeChange(val) { //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //currentPage 改变时会触发
        this.page = val
        if(this.isRegion == 'false'){
          this.getSales()
        }else{  
          this.getSales()
        }
      },
      searchConditions(){//搜索查询商品列表
        // this.queryLists(this.goodsName);// 搜索-查询销售商品列表
        this.page = 1
        this.currentPage = 1
        this.getSales()
      },
      selectId(id){//切换地区查询商品列表
        this.page = 1
        this.currentPage = 1
        this.goodsName = '';
        this.goodsCode = ''
        this.j_name = ''
        this.isNeed = ''
        let data = {
          page: '1',
          cols: '100',
          total: this.total,
          userId: this.userId,
          name: this.goodsName,
          boothName: "",
          node_id: this.node_id
        }
        QueryArea(data)
          .then(res =>{
            res.data.dataList.forEach(ele => {
              if(ele.userId == id){
                this.bigAreaId = id;
                this.areaId = ele.bootList[0].shop_booth_id;
                this.areaName = ele.name
                let boothId = ele.bootList[0].shop_booth_id;
                this.getSales()
                this.getAllSuppliers()
              }
            });
          })
          .catch(res =>{
            console.log(res)
          })
      },
      clearConditions(){//清空筛选条件
        this.goodsName = '';
        this.goodsCode = ''
        this.j_name = ''
        this.isNeed = ''
        this.page = 1
        this.currentPage = 1
        this.getSales();
      },
      addSellGood(){ //添加销售商品
        this.$router.push({name:'EditMarket',params: {'areaId':this.areaId,'bigAreaId':this.bigAreaId}})
      },
      check(index, row){//查看销售商品
        this.$router.push({name:'ViewMarket',params:{'goodsMsg':row,'areaId':this.areaId}})
      },
      edit(index, row){//编辑销售商品
        this.$router.push({name:'EditMarket',params:{'goodsMsg':row,'areaId':this.areaId,'bigAreaId':this.bigAreaId}})
      },
      handleDelete(index, row) {//删除商品
        this.$confirm('是否要删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGood(row.ID)
            .then(res => {
              this.getSales()
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
    },
    components:{
      AreaSelect,
    }
  };
</script>

<style lang='less' scoped>
  .content{
    height: 100%;
    box-sizing: border-box;
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
    .areaBox{
      padding: 10px;
      background: #fff;
    }
    .table{
      padding: 10px;
      background: #fff;
    }
    .option-wrapper{
      clear: both;
      margin: 10px 0;
      padding: 10px;
      background: #fff;
    }
    .option-wrappers{
      line-height: 40px;
    }
    .search-val{
      display: flex;
		  flex-wrap: wrap;
      line-height: 40px;
      font-size: 14px;
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
    .search-btn{
     
    }
    .import{
      color: #409EFF;
      background: #fff;
    }
    .span-clear {
      color: #999999;
      margin-left: 15px;
      cursor: pointer;
      font-size: 14px;
    }
    .option-wrapper{

      .demo-autocomplete{
        margin-top: 10px;
        .sub-title {
          width: 60px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
      }

    }
    .booth-management-msg{
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
