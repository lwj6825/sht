<template>
  <div class="content" ref="content">
    <div class="areaBox" ref="areaBox">
      <AreaSelect @selectId='selectId'></AreaSelect>
    </div>
    <div class="commodity" ref="commodity">
      <div class="box" v-if="boxShow">
        <div class="select">
          <p class="close" @click="closeFun">X</p>
          <div class="filemsg">
            {{fileMsg}}
          </div>
        </div>
      </div>
    </div>
    <div class="option-wrapper" ref="optionWrapper">
        <el-row class="demo-autocomplete">
          <el-col :span="2"><div class="sub-title">商铺名称</div></el-col>
          <el-col :span="4"><el-input v-model="boothName" placeholder="输入商铺名称" clearable></el-input></el-col>
          <el-col :span="2"><div class="sub-title">联系人</div></el-col>  
          <el-col :span="4"><el-input v-model="name" placeholder="输入联系人或联系方式" clearable></el-input></el-col>
          <el-col :span="2"><div class="sub-title">摊位号</div></el-col>
          <el-col :span="4"><el-input v-model="stall_no"  placeholder="输入摊位号" clearable></el-input></el-col>
        </el-row>

        <el-row class="demo-autocomplete">
          <el-button type="primary" size="medium" class="import" style="margin-left: 8.5%" @click="searchConditions">搜索</el-button>
          <el-button type="primary" size="medium" class="file-btn">导出</el-button>
          <span class="span-clear" @click="clearConditions">清空筛选条件</span>
        </el-row>
    </div>
    <div class="table">
      <div class="title">
        <p class="tz-title">全部商户</p>
        <div>
          <el-button type="primary" size="medium" class="new-add" @click="newCommodity">{{addMerchants}}</el-button>
          <span class="submit">
            批量导入
            <form id="upload" enctype="multipart/form-data" method="post"> 
              <input type="file" class="file" ref="file" @change="fileFun($event)">
            </form>
          </span>
          <el-button type="primary" size="medium" class="import" @click="loadFun">下载</el-button>
        </div>
      </div>
      <div class="booth-management-msg" >    
        <el-table :data="dataList"  border >
          <el-table-column label="商铺名称">
            <template slot-scope="scope">
              <ul>
                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.booth_name}}</li>
              </ul>
            </template>    
          </el-table-column>
          <el-table-column label="商铺编码">
            <template slot-scope="scope">
              <ul>
                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.biz_id}}</li>
              </ul>
            </template>    
          </el-table-column>
          <el-table-column label="摊位号">
            <template slot-scope="scope">
              <ul>
                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.stall_no}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="联系人">
            <template slot-scope="scope">
              <ul>
                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.contacts}}&emsp;{{item.callphone}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="操作" width='200' center>
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="manageSuppliersHandle(scope.$index, scope.row)">{{manageMerchants}}</el-button>
              <el-button type="text" size="small" @click="manageGoodsHandle(scope.$index, scope.row)">{{manageGoods}}</el-button>
              <el-button type="text" size="small" @click="inforHandle(scope.$index, scope.row)">{{infor}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next, jumper" :total='dataTotal'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {allBizs} from "../../js/management/management.js";
import {QueryArea} from '../../js/area/area.js';
import AreaSelect from '../common/area';
import axios from 'axios';
import {baseUrl} from '../../js/address/url.js'

export default {
    name: "merchantsMgm",   
    data() {
      return{
        addMerchants:'新增商户',
        manageMerchants:'管理供应商',
        manageGoods:'管理商品',
        infor:'详情',
        dataList:[],
        total: "",
        page: 1,
        cols: 15,
        userId: 2,
        name: "",
        boothName: "",
        stall_no: "",
        areaId:'',//大区的shop_booth_id
        bigAreaId:'',//大区userId
        currentPage:1,
        dataTotal:0,
        loginId: '',
        loginName: '',
        boxShow: false,
        fileMsg: '',
        file: ''
      }
    },    
    created() {
        this.userId = localStorage.getItem('userId')
        this.loginId = localStorage.getItem('loginId')
        this.loginName = localStorage.getItem('loginName')
    },
    mounted() {
      this.getList();//首页展示-获取供应商列表    
    },
    methods: {
      closeFun(){
        this.boxShow = false;
        this.getAllBizs()
      },
      fileFun(event){
            
        this.file = event.target.files[0];
        let formData = new FormData();
        formData.append('bizFile', this.file);  
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
        let url = baseUrl + 'manage/importBiz'
        // http://192.168.1.14:8081/order_sht/manage/importBiz
        //'http://shtordertest.zhdtech.com:8080/order_sht/manage/importBiz'
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
      loadFun(){
        window.location.href = baseUrl + 'manage/downloadBiz'
        // window.location.href = 'http://192.168.1.14:8081/order_sht/manage/downloadBiz'
      },
      handleSizeChange(val) { //pageSize 改变时会触发
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //currentPage 改变时会触发
        // console.log(`当前页: ${val}`);
        this.page = val
        this.getAllBizs()
      },
      searchConditions(){//搜索
        let params = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name.trim(),
          boothName: this.boothName.trim(),
          stall_no: this.stall_no.trim(),
          region:this.areaId,
        }
        allBizs(params)
          .then(res => {
            this.dataTotal = res.data.condition.total;
            this.dataList = res.data.dataList;
          })
          .catch((res) => {
            this.$message.error("出错啦!");
            console.log(res)
          })
      },
      clearConditions(){//清空筛选条件
        this.boothName = '';
        this.name = '';
        this.stall_no = '';
        let params = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
          stall_no: this.stall_no,
          region:this.areaId,
        }
        allBizs(params)
          .then(res => {
            this.dataTotal = res.data.condition.total;
            this.dataList = res.data.dataList;
          })
          .catch((res) => {
            this.$message.error("出错啦!");
            console.log(res)
          })
      },
      newCommodity(){//新增商户
        this.$router.push({name:'NewCommodity'})
        localStorage.setItem('merchantsAreaId',this.areaId);
      },
      manageSuppliersHandle(index,row){//管理供应商
        let data = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
        }
        QueryArea(data)
          .then(res => {
            res.data.dataList.forEach(ele => {
              if(ele.userId == this.bigAreaId){
                let data = {
                  userId: this.userId,
                  region:'',
                  shop_booth_id:'',
                  bindgys:'',
                  parent_userId:ele.userId,
                  parent_shop_booth_id:ele.bootList[0].shop_booth_id,
                  currShop_userId:row.bootList[0].userId,
                  currShop_shop_booth_id:row.bootList[0].shop_booth_id,
                }
                if(ele.bootList[0].bindgys == 1){
                  data.region = ele.bootList[0].shop_booth_id;
                  data.shop_booth_id = ele.bootList[0].shop_booth_id;
                  data.bindgys = ele.bootList[0].bindgys;
                }
                if(ele.bootList[0].bindgys != 1){
                  data.userId = row.bootList[0].userId;
                  data.region = ele.bootList[0].shop_booth_id;
                  data.shop_booth_id = row.bootList[0].shop_booth_id;
                  data.bindgys = ele.bootList[0].bindgys;
                }
                this.$router.push({name:'ManageSuppliers',params:{searchMsg:data,areaId: this.areaId}})
              }
            })
          })
          .catch(res => {
            console.log(res)
          })
        
      },
      manageGoodsHandle(index,row){//管理商品
        let data = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
        }
        QueryArea(data)
          .then(res => {
            res.data.dataList.forEach(ele => {
              if(ele.userId == this.bigAreaId){
                let data = {
                  userId: this.userId,
                  region:'',
                  shop_booth_id:'',
                  bindgys:'',
                  parent_userId:ele.userId,
                  parent_shop_booth_id:ele.bootList[0].shop_booth_id,
                  currShop_userId:row.bootList[0].userId,
                  currShop_shop_booth_id:row.bootList[0].shop_booth_id,
                }
                if(ele.bootList[0].bindgys == 1){
                  data.region = ele.bootList[0].shop_booth_id;
                  data.shop_booth_id = ele.bootList[0].shop_booth_id;
                  data.bindgys = ele.bootList[0].bindgys;
                }
                if(ele.bootList[0].bindgys != 1){
                  data.userId = row.bootList[0].userId;
                  data.region = ele.bootList[0].shop_booth_id;
                  data.shop_booth_id = row.bootList[0].shop_booth_id;
                  data.bindgys = ele.bootList[0].bindgys;
                }
                this.$router.push({name:'ManageGoods',params:{searchMsg:data}})
              }
            })
          })
          .catch(res => {
            console.log(res)
          })
        
      },
      inforHandle(index,row){//详情
         this.$router.push({name:'MerchantsInfor',params:{inforMsg:row}})
      },
      getList(){ //首页展示-获取商户列表
        let data = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
        }
        QueryArea(data)
          .then(res => {        
            // console.log(res)
            this.bigAreaId = res.data.dataList[0].userId;
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            let boothId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.getAllBizs()
          })
          .catch(res => {
            console.log(res)
          })
      },
      getAllBizs(){
        let boothData = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
          stall_no: this.stall_no,
          region:this.areaId,
        }
        allBizs(boothData)
          .then(res => {
            this.dataTotal = res.data.condition.total;
            this.dataList = res.data.dataList;
          })
          .catch(res => {
            console.log(res)
          })

      },
      selectId(id){//选择区域展示商户列表
        this.page = 1
        let data = {
          page: this.page,
          cols: this.cols,
          total: this.total,
          userId: this.userId,
          name: this.name,
          boothName: this.boothName,
        }
        QueryArea(data)
          .then(res =>{
            // console.log(res)
            res.data.dataList.forEach(ele => {
              if(ele.userId == id){
                this.bigAreaId = id;
                this.areaId = ele.bootList[0].shop_booth_id;
                let boothId = ele.bootList[0].shop_booth_id;
                this.getAllBizs()
              }
            });
          })
          .catch(res =>{
            console.log(res)
          })
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
      div{
        display: flex;
        width: 300px;
        justify-content: flex-end;
        .file{
          line-height: 28px;
          font-size: 14px; 
        }
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
    .new-add{
      background: #409EFF;
    }
    .file-btn{
      color: #777;
      background: #fff;
      border-color: #eaeaea;
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
      margin: 10px 0;
      background: #fff;
      padding: 10px;
      .demo-autocomplete{
        margin-top: 10px;
        .sub-title {
          width: 70px;
          text-align: right;
          padding-right: 10px;
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
<style>
.el-table--border th{
  color: #333;
  background:#F2F2F2;
}
.pagination{
  padding-top: 10px;
  text-align: center;
}
</style>
