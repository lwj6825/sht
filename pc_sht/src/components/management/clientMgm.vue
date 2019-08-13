<template>
  <div class="content" ref="content">
    <div class="areaBox" ref="areaBox" v-if="isShow">
      <AreaSelect @selectId='selectId'></AreaSelect>
    </div>
    <div class="option-wrapper" ref="optionWrapper">
      <el-row class="demo-autocomplete">
        <el-col :span="2"><div class="sub-title">客户名称</div></el-col>
        <el-col :span="4"><el-input v-model="customerName" placeholder="输入客户名称" clearable></el-input></el-col>
        <el-col :span="2"><div class="sub-title">联系人</div></el-col>
        <el-col :span="4"><el-input  v-model="concatType" placeholder="输入联系人或联系方式" clearable></el-input></el-col>
        <el-col :span="10">
          <el-button type="primary" size="medium" class="import"  style="margin-left: 10px" @click="searchConditions">搜索</el-button>
          <span class="span-clear" @click="clearConditions">清空筛选条件</span>
        
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <div class="title">
        <p class="tz-title">全部客户</p>
        <div>
          <el-button type="primary" size="medium" class="new-add"  @click="newClientMgm" >{{addClient}}</el-button>
          <span class="submit">
            批量导入
            <form id="upload" enctype="multipart/form-data" method="post"> 
              <input type="file" class="file" ref="file" @change="fileFun($event)">
            </form>
          </span>
          <el-button type="primary" size="medium" class="import" @click="downloadFun">下载</el-button>
        </div>
      </div>
      <div class="booth-management-msg">
        <el-table :data="dataList"  border>
          <el-table-column prop="concact_name" label="客户名称"> </el-table-column>
          <el-table-column prop="concact_name" label="联系人"> </el-table-column>
          <el-table-column prop="cellphone" label="联系方式"> </el-table-column>
          <el-table-column label="地址"> 
            <template slot-scope="scope">
              <span v-if="scope.row.area_name">{{scope.row.area_name}}</span>
              <span v-if="scope.row.addr">{{scope.row.addr}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="check(scope.$index, scope.row)">{{lookMsg}}</el-button>
              <el-button type="text" size="small" @click="remove(scope.$index, scope.row)">{{deleteMsg}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total='dataTotal'>
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  import {allGys,deleGys} from "../../js/management/management.js";
  import {QueryArea} from '../../js/area/area.js';
  import AreaSelect from '../common/area'
  import {baseUrl2,importCustomer,downloadCustomer} from '../../js/address/url.js'
  import axios from 'axios';
  export default {
    name: "commodityMgm",
    created() {
      this.userId = localStorage.getItem('userId')
    },
    data() {
      return{
        addClient:'新增客户',
        lookMsg:'查看',
        deleteMsg:'删除',
        dataList:[],
        customerName:'',
        concatType:'',
        total: "",
        page: 1,
        cols: 15,
        userId: 2,
        type: 2,
        name: "",
        boothName: "",
        stall_no: "",
        currentPage:1,
        dataTotal:0,
        isShow: true,
        isRegion: '',
        scShopId: '',
        areaId: '',
        file: '',
        userId: '',
      }
    },
    mounted() {      
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      this.userId = localStorage.getItem('userId')
      if(this.isRegion == 'false'){
        this.isShow = false
        this.getAllGys()
      }else{
        this.queryLists()//查询供客户列表
      }
    },
    methods: {
      downloadFun(){
        let areaId = ''
        if(this.isRegion == 'false'){
          areaId = this.scShopId
        }else{
          areaId = this.areaId
        }
        window.location.href = downloadCustomer + "?userId=" + this.userId + '&region=' + this.areaId + '&biz_name=' + this.customerName 
          + '&concact_name=' + this.concatType + '&type=2' + '&shop_booth_id=' + areaId
      },
      fileFun(event){
        let areaId = ''
        if(this.isRegion == 'false'){
          areaId = this.scShopId
        }else{
          areaId = this.areaId
        }
        this.file = event.target.files[0];
        let formData = new FormData();
        formData.append('customerFile', this.file);  
        formData.append('userId', this.userId);  
        formData.append('region',this.areaId); 
        formData.append('biz_name',this.customerName); 
        formData.append('concact_name',this.concatType); 
        formData.append('type', '2'); 
        formData.append('shop_booth_id',areaId); 
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
        let url = baseUrl2 + 'manage/importCustomer'
        ajaxPost(url,formData,config)
          .then(res => {
            if(res.result == true){
              this.$message.success(res.message);
            }else{
              this.$message.error(res.message);
            }
            this.getAllGys()
            this.$refs.file.value = null
          })
          .catch(res => {
              console.log(res)
              this.$message.error("出错了");
          })
      },
      getAllGys(){
        if(this.isRegion == 'false'){
          let boothData = {
            page: this.page,
            cols: this.cols,
            userId: this.userId,
            type:'2',
            concact_name: this.concatType,
            biz_name:this.customerName,
            region:this.areaId,
            shop_booth_id:this.scShopId,
          }
          allGys(boothData)
            .then(res => {
              this.dataList = res.data.dataList;
              this.dataTotal = res.data.condition.total;
            })
            .catch(res => {
              console.log(res)
            })
        }else{
          let boothData = {
            page: this.page,
            cols: this.cols,
            userId: this.userId,
            type:'2',
            concact_name: this.concatType,
            biz_name:this.customerName,
            region:this.areaId,
            shop_booth_id:this.areaId,
          }
          allGys(boothData)
            .then(res => {
              this.dataList = res.data.dataList;
              this.dataTotal = res.data.condition.total;
            })
            .catch(res => {
              console.log(res)
            })
        }
      },
      handleSizeChange(val) { //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //currentPage 改变时会触发
        this.page = val
        if(this.isRegion == 'false'){
          this.getAllGys()
        }else{
          this.getAllGys()
        }
      },
      searchConditions(){//搜索
        this.getAllGys()
      },
      clearConditions(){//清空
        this.customerName = ''; 
        this.concatType = '';
        this.getAllGys()
      },
      newClientMgm(){//新增
        this.$router.push({name:'NewClient',params: {areaId: this.areaId}})
      },
      remove(index, row){//删除
        // console.log(index,row)
        this.$confirm('确认删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let boothId = row.shop_concacts_id;
            deleGys({shop_concacts_id:boothId})
              .then((res)=>{
                // console.log(res)
                this.getAllGys()
              })
              .catch((res)=>{
                console.log(res)
              })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      },
      check(index, row){//查看
        this.$router.push({name:'ViewClient',params:{gysMsg:row}})
      },
      // type=1 供应商 type =2 商户
      queryLists(){//首页展示-获取商户列表
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
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            let boothId = res.data.dataList[0].bootList[0].shop_booth_id;
            let boothData = {
              page: this.page,
              cols: this.cols,
              userId: this.userId,
              type:'2',
              concact_name:'',
              biz_name:'',
              region:boothId,
              shop_booth_id:boothId,
            }
            allGys(boothData)
              .then(res => {
                this.dataTotal = res.data.condition.total;
                this.dataList = res.data.dataList;
              })
              .catch(res => {
                console.log(res)
              })
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
                this.areaId = ele.bootList[0].shop_booth_id;
                let boothId = ele.bootList[0].shop_booth_id;
                let boothData = {
                  page: this.page,
                  cols: this.cols,
                  userId: this.userId,
                  type:'2',
                  concact_name:'',
                  biz_name:'',
                  region:boothId,
                  shop_booth_id:this.areaId,
                }
                allGys(boothData)
                  .then(res => {
                    this.dataTotal = res.data.condition.total;
                    this.dataList = res.data.dataList;
                  })
                  .catch(res => {
                    console.log(res)
                  })
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
        line-height: 20px;
        font-size: 14px;
        box-sizing: border-box;
        border-left: 2px solid #409EFF;
      }
      div{
        display: flex;
        width: 300px;
        justify-content: flex-end;
        .submit{
          margin: 0 10px;
          position: relative;
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
      }
    }
    .file-btn{
      color: #777;
      background: #fff;
      border-color: #eaeaea;
    }
    .new-add{
      background: #409EFF;
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
      padding: 10px;
      background: #fff;

      .demo-autocomplete{
        margin-top: 10px;
        .sub-title {
          width: 60px;
          text-align: right;
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
    .pagination{
      padding-top: 10px;
      text-align: center;
    }
  }
</style>
