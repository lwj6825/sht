<template>
  <div class="content check-tz" ref="content">
    <div class="areaBox" ref="areaBox" v-if="isShow">
      <AreaSelect @selectId='selectId'></AreaSelect>
    </div>
    <!--筛选条件-->
    <div class="lz-search-condition">
      <!--展开前的样式-->
      <div class="lz-search-item-style-one" v-show="isshowcondition">
        <div class="lz-filter-one-style">
          <div class="lz-filter-name">检测日期</div>
          <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" class="search-bth white-bth" style="margin-left: 10px;" @click="checkListSearch" >搜索</el-button>
          <el-button class="lz-margin-left clear-content" @click="clearcondition" type="text">清空筛选条件</el-button>
          <div class="lz-three-item"></div>
        </div>
        <div class="lz-search-item-style-one-button" style="height: 30px">
          <el-button type="text" @click="goExpend">展开筛选条件</el-button>
        </div>
      </div>
      <!--展开后的样式-->
      <div class="lz-search-item-style-two" v-show="!isshowcondition">
        <div class="lz-filter-one-style">
          <!--检测日期-->
          <div class="lz-three-item">
            <div class="lz-filter-name">检测日期</div>
            <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
              type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <!--商户名称-->
          <div class="lz-three-item" v-if="roleId != 76">
            <div class="lz-filter-name">商户名称</div>
            <el-select v-model="local_booth_name" slot="append" placeholder="请选择" value-key="userId"
                class="select-width-me" size="small" filterable  clearable style="width: 225px">
              <el-option v-for="item in local_booth_name_options" :key="item.bootList[0].shop_booth_id"
                :label="item.bootList[0].booth_name" :value="item.bootList[0].shop_booth_id">
              </el-option>
            </el-select>
          </div>
          <!--检测结果-->
          <div class="lz-three-item">
            <div class="lz-filter-name">检测结果</div>
            <el-select v-model="local_check_result" slot="append" placeholder="请选择" value-key="userId"
              class="select-width-me" size="small" clearable filterable style="width: 225px">
              <el-option v-for="item in check_result_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="lz-three-item" v-if="roleId == 76">
            <div class="lz-filter-name">检测商品</div>
            <el-select v-model="goods_name" filterable clearable placeholder="请选择商品" size="small" style="width: 225px">
              <el-option v-for="(item, index) in goodsArr" :key="index" :label="item.check_good + '(' + item.check_goods_code + ')'" :value="item.check_good" ></el-option>
            </el-select>
          </div>
        </div>
        <!--第二行筛选条件-->
        <div class="lz-filter-one-style">
          <!--检测商品-->
          <div class="lz-three-item" v-if="roleId != 76">
            <div class="lz-filter-name">检测商品</div>
            <el-select v-model="local_check_good" filterable clearable placeholder="请选择商品" size="small" value-key="ID" style="width: 225px">
              <el-option v-for="item in local_check_good_options" :key="item.ID" :label="item.GOODS_NAME + '(' + item.GOODS_CODE + ')'" :value="item" ></el-option>
            </el-select>
          </div>
          <div class="lz-three-item" v-if="roleId != 76">
            <div class="lz-filter-name">商品编码</div>
            <el-input v-model="good_code" clearable size="small"  style="width: 225px"></el-input>
          </div>
          <div class="lz-three-item">
            <el-button type="primary" class="search-bth white-bth" style="margin-left: 10px;" @click="checkListSearch">搜索</el-button>
            <el-button class="lz-margin-left clear-content" @click="clearcondition" type="text">清空筛选条件</el-button>
          </div>
          <div class="lz-three-item"></div>
        </div>
        <div class="lz-search-item-style-one-button">
          <el-button type="text" @click="goCollapse">收起筛选条件</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <div class="table">
      <div class="title">
        <p class="tz-title">全部检测信息</p>
        <div>
          <el-button type="primary" class="addBtn blue-bth" @click="goAddCheck">新增检测信息</el-button>
          <el-button type="primary" class="addBtn blue-bth" @click="downloadFun">导出</el-button>
        </div>
      </div>
      <div class="tables">
        <el-table :data="tableData" :header-cell-style="rowClass" v-loading="loading">
          <el-table-column prop="check_date"  label="检测日期"></el-table-column>
          <el-table-column prop="booth_name" label="商户名称" v-if="roleId != 76"></el-table-column>
          <el-table-column prop="stall_no" label="摊位号" v-if="isShow"></el-table-column>
          <el-table-column prop="check_good" label="检测商品"></el-table-column>
          <el-table-column prop="check_project" label="检测项目"></el-table-column>
          <el-table-column prop="check_result" :formatter="toCheckResult" label="检测结果"></el-table-column>
          <el-table-column prop="check_mechanism" label="检测机构"></el-table-column><!--
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="standard_value" label="检测值"></el-table-column>
          <el-table-column prop="check_standard" label="检测标准"></el-table-column>
          <el-table-column prop="check_res" label="检测结果值"></el-table-column>
          <el-table-column prop="check_person" label="检测人"></el-table-column>-->
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewImg(scope.row)">查看附件</el-button><!---->
              <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="ifDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination v-if="totalPageSize" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, prev, pager, next, jumper" :total="totalPageSize">
      </el-pagination>
    </div>
    <!--显示图片-->
    <el-dialog :visible.sync="centerDialogVisible" :before-close="handleClose" :close-on-click-modal = "isclick">
      <div class="lz-dialog-content">
        <div class="imgBox" v-if="isImg">
          <el-carousel trigger="click" :autoplay="autoplay" :initial-index="current" :height="imgHeight + 'px'">
              <el-carousel-item  v-for="(item,index) in imgArr" :key="index" v-if="imgArr">
                  <figure class="images" v-if="item.img_url">
                      <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                  </figure>
              </el-carousel-item>
          </el-carousel>
        </div>
        <iframe v-else :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + viewImgUrl" 
            scrolling="auto" width="100%" height="600" frameborder="0" id="contentIframe"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 时间戳转日期格式
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
  // var h = date.getHours() + ':';
  // var m = date.getMinutes() + ':';
  // var s = date.getSeconds();
  // return Y+M+D+h+m+s;
  return Y+M+D;
}
// 标准时间转日期格式
function formatTen(num) { 
  return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
  var year = date.getFullYear(); 
  var month = date.getMonth() + 1; 
  var day = date.getDate(); 
  var hour = date.getHours(); 
  var minute = date.getMinutes(); 
  var second = date.getSeconds(); 
  return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
// function getLastYearYestdy(date){   
//   var datastr = ''
//   var strYear = date.getFullYear() - 1;     
//   var strDay = date.getDate();     
//   var strMonth = date.getMonth()+1;   
//   if(strMonth<10){     
//     strMonth='0'+strMonth;     
//   }   
//   if(strDay<10){     
//     strDay= '0'+strDay;     
//   }   
//   datastr = strYear+'-'+strMonth+'-'+strDay;   
//   return datastr;   
// }  
function getLastYearYestdy(date) { 
  var year = date.getFullYear(); 
  var month = date.getMonth() + 1; 
  var day = date.getDate(); 
  var hour = date.getHours(); 
  var minute = date.getMinutes(); 
  var second = date.getSeconds(); 
  return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
  import AreaSelect from '../common/area';
  import {QueryArea} from '../../js/area/area.js';
  import {getCheckList,GetAllBiz, DeteleCheckItem, Parse,jcpurchase, QueryCheckGoods2, ExportAllCheck} from '../../js/standingBook/standingBook.js'
  import {purchase, getDefaultProductTypes,} from "../../js/goods/goods.js";
  import {BaseImgUrl} from '../../js/address/url.js';
  function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            + " "  + date.getHours()  + seperator2  + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate
}
  export default {
    name: "saleTz",
    data() {
      return {
        isclick:false,
        msg:'测试过滤器',
        BaseImgUrl:'',
        // 检测日期  商户名称  摊位号  检测商品   检测结果  备注
        local_check_date: '',
        local_booth_name: '',
        local_booth_name_options: '',
        form: {
          dataTime: ''
        },
        good_code: '',
        local_stall_no: '',
        local_check_good: '',
        local_check_good_options: [],
        goods_name_Arr: [],
        submit_goods_name: '',
        local_remark: '',
        local_date_start_end: '',
        local_node_id: '',
        local_node_id_id: '',
        local_area_booth_name: '',
        // 检测结果
        local_check_result: '',
        check_result_options: [{
          value: '1',
          label: '合格'
        }, {
          value: '0',
          label: '不合格'
        }],
        totalItemNum: '',
        tableData: [],
        centerDialogVisible: false,
        viewImgUrl: '',
        isshowcondition: false,
        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',
        userId: '',
        areaId: '', // 大区的shop_booth_id
        bigAreaId: '', // 大区userId
        contacts: '',
        nodeName: '',
        file: '',
        scShopId: '', // 市场的shop_booth_id
        isShow: true,
        isRegion: '',
        user_shop_booth_id: '',
        goodsType: '进货',
        startTime: '',
        endTime: '',
        isImg: true,
        node_id: '',
        isBigImg: false,
        imgArr: [],
        autoplay: false,
        current: 0,
        sizeObj: {},
        imgHeight: '',
        roleId: '', // 超市76
        goods_name: '',
        goodsArr: '',
        loading: true,
      }
    },
    mounted() {
      this.node_id = localStorage.getItem('loginId');
      this.BaseImgUrl = BaseImgUrl;
      //获取  区域的  shop_booth_id   node_id   商户的    shop_booth_id
      this.isRegion = localStorage.getItem('isRegion');
      this.scShopId = localStorage.getItem('scShopId');
      this.userId = localStorage.getItem('userId');
      this.roleId = localStorage.getItem('roleId');
      this.getTime()
      this.local_node_id_id = localStorage.getItem('nodeidlocal');
      let arr = []
      arr.push(this.startTime)
      arr.push(this.endTime)
      this.form.dataTime = arr
      if(this.isRegion == 'false'){
        // nodeidlocal
        this.local_node_id = localStorage.getItem('nodeidlocal');
        this.isShow = false;
        this.getMerchantsFun();
        this.getGoodsFun();
      }else{
        this.getArear();
      }
    },
    methods: {
      downloadFun(){
        this.loading = true
        let goods_name = '', check_goods_code = '';
        if(this.roleId == 76){
          goods_name = this.goods_name;
          this.goodsArr.forEach(val => {
            if(this.goods_name == val.check_goods_code){
              check_goods_code = val.check_goods_code
            }
          })
        }else{
          if(this.local_check_good){
            goods_name = this.local_check_good.GOODS_NAME
            check_goods_code = this.local_check_good.GOODS_CODE
          }else{
            check_goods_code = this.good_code
          }
        }
        let params = {
          node_id: this.local_node_id,
          region: this.areaId,
          check_good: goods_name,
          shop_booth_id: this.local_booth_name,
          check_result:this.local_check_result,
          start_time: this.startTime,
          end_time: this.endTime,
          check_goods_code: check_goods_code,
        }
        ExportAllCheck( params, {})
          .then((res) => {
              this.loading = false
              let time = getNowFormatDate()
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
              let url = window.URL.createObjectURL(blob);
              let aLink = document.createElement("a");
              aLink.style.display = "none";
              aLink.href = url;
              aLink.setAttribute("download", `检测信息` + time);
              document.body.appendChild(aLink);
              aLink.click();
              document.body.removeChild(aLink); 
              window.URL.revokeObjectURL(url); 
          })
          .catch(function (res) {
              this.loading = false
          });
      },
      viewFun(ele){
        this.$router.push({name:'ViewCheckTz',query: {areaId: this.areaId,bigAreaId: this.bigAreaId, areaName: this.local_area_booth_name, msg: JSON.stringify(ele)}})
        // let routeData = this.$router.resolve({
        //   path: "/home/standingBook/viewCheckTz",
        //   query: {
        //     areaId: this.areaId,
        //     bigAreaId: this.bigAreaId, 
        //     areaName: this.local_area_booth_name, 
        //     msg: JSON.stringify(ele)
        //   }
        // });
        // window.open(routeData.href, '_blank');
      },
      getTime(){
        var start = new Date();
        var aa = start.getTime() - 3600 * 1000 * 24 * 30;
        this.startTime = getLastYearYestdy(new Date(aa))
        var currentTime = new Date()
        this.endTime = formatDate(currentTime)
      },
      timeChange(ele){
        if(this.form.dataTime){
          this.startTime = this.form.dataTime[0]
          this.endTime = this.form.dataTime[1]
        }else{
          this.startTime = ''
          this.endTime = ''
        }
      },
      toCheckResult(row, column) {
        switch(row.check_result){
          case '0':
            return '不合格';
            break;

          case '1':
            return '合格';
            break;

          default:
            return '未知';
        }
      },
      // 分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getCheckListtable(this.page_local);
      },
      // 关闭按钮
      handleClose(done) {
        this.current = 0
        this.imgArr = []
        done();
      },
      //点击搜索
      checkListSearch(){
        this.timeChange()
        this.page_local = 1
        this.getCheckListtable(this.page_local);
      },
      //清空筛选条件
      clearcondition(){
        this.getTime()
        this.local_date_start_end = null;
        this.local_check_good = null;
        this.local_check_result = '';
        this.local_booth_name = '';
        this.local_date_start_end = '';
        this.local_check_good = '';
        this.good_code = '';
        this.goods_name = '';
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.page_local = 1
        this.getCheckListtable(this.page_local);
      },
      // 获取商品列表
      getGoodsFun() {
        if(this.roleId == 76){
          let obj = {
            check_good: '',
            node_id:this.local_node_id_id,
          }
          QueryCheckGoods2(obj)
            .then(res => {
              this.goodsArr = res.data.list;
              this.getCheckListtable(this.page_local);
            })
            .catch(res => {
            })
        }else{
          let boothData = {
            region: this.areaId,
            userId:this.userId,
            node_id:this.local_node_id_id,
          }
          jcpurchase(boothData)
            .then(res => {
              this.local_check_good_options = res.data;
              this.getCheckListtable(this.page_local);
            })
            .catch(res => {
            })
        }
      },
      // 获取商户
      getMerchantsFun() {
        let obj = {
          page: '1',
          cols: '',
          total: "",
          userId: this.userId,
          name: "",
          boothName: "",
          stall_no: "",
          region: this.areaId,
        }
        GetAllBiz(obj)
          .then(res => {
            this.local_booth_name_options = res.data.dataList
          })
          .catch(() => {
            this.$message.error("商户数据获取失败");
          })
      },
      //获取区域
      getArear(){
        let data = {
          page: '1',
          cols: '100',
          total: '',
          userId: this.userId,
          contacts: this.contacts,
          nodeName: this.nodeName,
          node_id: this.node_id,
        }
        QueryArea(data)
          .then(res =>{
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.local_node_id = res.data.dataList[0].bootList[0].node_id;
            this.local_area_booth_name = res.data.dataList[0].bootList[0].booth_name;
            this.getMerchantsFun();
            this.getGoodsFun();
            this.getCheckListtable(this.page_local)
          })
          .catch(res =>{
            // console.log(res)
          })
      },
      goExpend() {
        this.isshowcondition = false;
      },
      goCollapse() {
        this.isshowcondition = true;
      },
      //显示表格中得图片
      viewImg(index, rows) {
        let url = ''
        if(index.img_url){
          url = index.img_url.substring(1, index.img_url.length)
        }
        if(index.check_img.length > 0){
          if(index.img_url){
            index.check_img.push({img_url: url})
          }
          if(index.img_url.substring(index.img_url.length-4) == '.pdf'){
            this.isImg = false
          }else{
            this.isImg = true
          }
          this.current = 0
          let imgArr = []
          this.imgArr = index.check_img
          this.centerDialogVisible = true;
          // this.viewImgUrl = index.img_url;
        }else if(index.img_url){
          index.check_img.push({img_url: url})
          this.current = 0
          let imgArr = []
          this.imgArr = index.check_img
          this.centerDialogVisible = true;
        } else {
          this.$message({
            message: '没有上传附件',
            type: 'warning'
          });
        };
      },
      //去新增界面
      goAddCheck() {
        this.$router.push({name:'AddCheckTz',query: {areaId: this.areaId,bigAreaId: this.bigAreaId, areaName: this.local_area_booth_name }})
        // let routeData = this.$router.resolve({
        //   path: "/home/standingBook/addCheckTz",
        //   query: {
        //     areaId: this.areaId,
        //     bigAreaId: this.bigAreaId, 
        //     areaName: this.local_area_booth_name
        //   }
        // });
        // window.open(routeData.href, '_blank');
      },
      //设置table表头
      rowClass({row, rowIndex}) {
        return {
          background: '#f2f2f2',
          color: '#333'
        }
      },
      //获取检测列表
      getCheckListtable(currentPageLocal) {
        this.loading = true
        let goods_name = '', check_goods_code = '';
        if(this.roleId == 76){
          goods_name = this.goods_name;
          this.goodsArr.forEach(val => {
            if(this.goods_name == val.check_goods_code){
              check_goods_code = val.check_goods_code
            }
          })
        }else{
          if(this.local_check_good){
            goods_name = this.local_check_good.GOODS_NAME
            check_goods_code = this.local_check_good.GOODS_CODE
          }else{
            check_goods_code = this.good_code
          }
        }
        let obj = {
          page: currentPageLocal,
          cols: '10',
          node_id: this.local_node_id,
          region: this.areaId,
          check_good: goods_name,
          shop_booth_id: this.local_booth_name,
          check_result:this.local_check_result,
          start_time: this.startTime,
          end_time: this.endTime,
          check_goods_code: check_goods_code,
        }
        getCheckList(obj)
          .then(res => {
            this.loading = false
            this.currentPage = parseInt(res.data.condition.page);
            this.totalPageSize =parseInt(res.data.condition.total) ;
            this.totalItemNum = res.data.dataList.length;
            this.tableData = res.data.dataList;
          })
          .catch(res => {
            this.loading = false
          })
      },
      //删除数据
      ifDelete(index, rows) {
        this.$confirm('此操作将永久删除该检测信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteCheckItem(rows.id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //      删除检测数据
      deleteCheckItem(a) {
        let deleteParams = {
          id: a,
        };
        DeteleCheckItem(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getCheckListtable();
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      //搜索条件
      selectId(id) {//选择区域
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.goodsType = "进货"
        let data = {
          page: '1',
          cols: '100',
          total: '',
          userId: this.userId,
          contacts: this.contacts,
          nodeName: this.nodeName,
          node_id: this.node_id
        }
        QueryArea(data)
          .then(res => {
            res.data.dataList.forEach(ele => {
              if (ele.userId == id) {
                this.bigAreaId = id;
                this.areaId = ele.bootList[0].shop_booth_id;
                this.getCheckListtable(this.page_local);
                this.getMerchantsFun();
                this.getGoodsFun()
              }
            });
          })
          .catch(res => {
            // console.log(res)
          })
      },
    },
    components: {
      AreaSelect,
    },
    filters:{
      isCheck:function(value){
        if(value == '1'){
          return '合格'
        }
      }
    },
  }
</script>

<style lang='less' scoped>

  @lz-filter-name-width: 70px;
  .imgBox{
    .el-carousel{
      padding: 10px 0;
      width: 100%;
      height: 600px;
      .images{
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
  /*筛选条件--*/
  .lz-search-condition {
    margin: 10px 0;
    background: #fff;
    width: 100%;

    /*第一个样式的布局*/
    .lz-search-item-style-one {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .lz-filter-one-style {
        flex: 1;
        display: flex;
        align-items: center;
        .lz-filter-name {
          width: @lz-filter-name-width;

        }

        .lz-margin-left {
          margin-left: 10px;
        }

      }

      .lz-search-item-style-one-button {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }

    /*第二个样式布局*/
    .lz-search-item-style-two {
      width: 100%;
      padding: 0px 10px;
      height: 130px;
      font-size: 14px;
      display: flex;
      flex-direction: column;

      .lz-filter-one-style {
        flex: 1;
        display: flex;

        .lz-three-item {
          flex: 1;
          display: flex;
          align-items: center;
          .lz-filter-name {
            width: @lz-filter-name-width;
          }

        }

      }

      .lz-search-item-style-one-button {
        flex: 0.6;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .lz-dialog-content {
    .lz-checkimag {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    height: 100%;
    .areaBox {
      padding: 10px;
      background: #fff;
    }
    .searchs {
      padding: 10px 0;
      background: #f2f2f2;
    }
    .table {
      padding: 10px;
      background: #fff;
      .title {
        display: flex;
        margin-bottom: 10px;
        .tz-title {
          padding-left: 4px;
          height: 20px;
          line-height: 20px;
          box-sizing: border-box;
          border-left: 2px solid #409EFF;
        }
        p {
          flex: 1;
          line-height: 30px;
          font-size: 14px;
        }
        div {
          display: flex;
          justify-content: flex-end;
          width: 300px;
          .addBtn {
            height: 30px;
            margin-right: 10px;
          }
          .submit {
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
            .file {
              position: absolute;
              left: 0px;
              top: 0px;
              width: 90px;
              height: 36px;
              opacity: 0;
              background: rgba(0, 0, 0, 0);
            }
          }

        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
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
</style>
<style lang="less">
    .check-tz{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-dialog{
          width: 700px;
          height: 700px;
          margin-top: 20px !important;
        }
    }
</style>
