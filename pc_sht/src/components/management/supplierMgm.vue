<template>
  <div class="content" ref='content'>
    <div class="areaBox" ref="areaBox" v-if="isShow">
      <AreaSelect @selectId='selectId'></AreaSelect>
    </div>
    <div class="option-wrapper" ref="optionWrapper">
      <el-row class="demo-autocomplete">
        <el-col :span="3"><div class="sub-title">供应商名称</div></el-col>
        <el-col :span="4">
          <el-input v-model="gysName" placeholder="输入供应商名称" clearable></el-input>
        </el-col>
        <el-col :span="2"><div class="sub-title">联系人</div></el-col>
        <el-col :span="4">
          <el-input v-model="concactName" placeholder="输入联系人或联系方式" clearable></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="medium" class="import" style="margin-left: 10px" @click="searchConditions">搜索</el-button>
          <!--<el-button type="primary" size="medium" class="file-btn">导出</el-button>-->
          <span class="span-clear" @click="clearConditions">清空筛选条件</span>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <div class="title">
        <p class="tz-title">全部供应商</p>
        <div>
          <el-button type="primary" size="medium" class="new-add"  @click="newSupplierMgm">{{addSupplier}}</el-button>
          <!--<el-button type="primary" size="medium" class="import">批量导入</el-button>-->
        </div>
      </div>
      <div class="booth-management-msg">
        <el-table :data="dataList"  border >
          <el-table-column prop="biz_name" label="供应商名称"> </el-table-column>
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
              <el-button type="text" size="small" @click="look(scope.$index, scope.row)">{{lookMsg}}</el-button>
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
  export default {
    name: "commodityMgm",
    data() {
      return{
        addSupplier:'新增供应商',
        lookMsg:'查看',
        deleteMsg:'删除',
        dataList:[],
        concactName: '',
        gysName:'',
        total: "",
        page: 1,
        cols: 15,
        userId: 2,
        type: 1,
        name: "",
        boothName: "",
        stall_no: "",
        areaId:'',
        currentPage:1,
        dataTotal:0,
        isShow: true,
        isRegion: '',
        scShopId: ''
      }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    mounted() {
      // this.getList();//首页展示-获取供应商列表
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      if(this.isRegion == 'false'){
        this.isShow = false
        this.getAllGys()
      }else{
        this.getList();  
      }
    },
    methods: {
      getAllGys(){
        if(this.isRegion == 'false'){
          let boothData = {
            page: this.page,
            cols: this.cols,
            userId: this.userId,
            type:'1',
            concact_name: this.concactName,
            biz_name: this.gysName,
            region: this.areaId,
            shop_booth_id:this.scShopId,
          }
          allGys(boothData)
          .then(res => {
            this.dataTotal = res.data.condition.total;
            this.dataList = res.data.dataList;
          })
          .catch(res => {
            console.log(res)
          })
        }else{
          let boothData = {
            page: this.page,
            cols: this.cols,
            userId: this.userId,
            type:'1',
            concact_name: this.concactName,
            biz_name: this.gysName,
            region: this.areaId,
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
      },
      handleSizeChange(val) { //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { //currentPage 改变时会触发
        this.page = val
        if(this.isRegion == 'false'){
          this.isShow = false
          this.getAllGys()
        }else{ 
          this.getAllGys()
        }
      },
      searchConditions(){//搜索
        this.getAllGys()
      },
      clearConditions(){  //清空筛选条件      
        this.gysName =''; 
        this.concactName = '';
        this.getAllGys()
      },
      newSupplierMgm(){//新增供应商
        this.$router.push({name:'NewSupplier',params: {areaId: this.areaId}})
      },
      look(index, row){//查看
        console.log(row)
        this.$router.push({name:'ViewSupplier',params:{gysMsg:row,areaId: this.areaId}})
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
                this.getAllGys();
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
      // type=1 供应商 type =2 商户
      getList(){ //首页展示-获取供应商列表
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
            this.getAllGys()
          })
          .catch(res => {
            console.log(res)
          })
      },
      selectId(id){//选择区域展示供应商列表
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
          .then((res) =>{
            res.data.dataList.forEach(ele => {
              if(ele.userId == id){
                this.areaId = ele.bootList[0].shop_booth_id;
                let boothId = ele.bootList[0].shop_booth_id;
                this.getAllGys()
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
      background: #fff;
      padding: 10px;

      .demo-autocomplete{
        margin-top: 10px;
        .sub-title {
          text-align: right;
          padding-right: 20px;
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
