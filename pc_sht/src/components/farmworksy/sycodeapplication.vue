<template>
  <div class="syacontent">
    <div>
      <!--重新布局头部-->
      <div class="lz-filter">
        <div class="lz-filter-one">
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >申请日期</div>
            <el-date-picker v-model="local_date_start_end" type="daterange" value-format="yyyy-MM-dd" size="small"
              style="width: 225px" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >申请商品</div>
            <el-input v-model="pz_name_local" placeholder="请输入内容" size="small" style="width: 225px"></el-input>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >审核结果</div>
            <el-select v-model="review_state_local" slot="append" placeholder="请选择" size="small" style="width: 225px" 
              class="select-width-me-sh">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="审核通过" value="审核通过"></el-option>
              <el-option label="审核未通过" value="审核未通过"></el-option>
            </el-select>
          </div>
        </div>
        <div class="lz-filter-one">
          <div class="lz-filter-one-style">
            <div class="lz-filter-name-two" >所属企业</div>
            <el-select v-model="hzs_name_local" slot="append" placeholder="请选择" value-key="userId" class="select-width-me" size="small" 
              clearable filterable style="width: 225px">
              <el-option v-for="item in plotHzsDataList" :key="item.userId" :label="item.booth_name" :value="item"></el-option>
            </el-select>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >申请单号</div>
            <el-input v-model="apply_num_local" placeholder="请输入内容" size="small" style="width: 225px"></el-input>
          </div>
          <div class="lz-filter-one-style-three">
            <el-button type="primary" class="search-btn" size="mini" @click="getSymList()">搜索</el-button>
            <!--清空筛选条件-->
            <el-button size="mini" class="span-clear" type="text" @click="clearAllCondition()">清空筛选条件</el-button>
          </div>
        </div>
      </div>
      <div class="lz-table-title">
        <div class="lz-table-title-left">
          <div class="lz-span">全部申请记录</div>
        </div>
        <div class="lz-table-title-right">
          <el-button type="primary" id="open_btn" class="sf-but" @click="symapplicationflag = true" size="small">申请溯源码
          </el-button>
        </div>
      </div>
      <!--表格内容-->
      <div class="syocontent">
        <el-table :data="tableSymSqList" style="width: 100%" :cell-style="getRowheight" :header-cell-style="getRowClass">
          <el-table-column label="申请单号" prop="apply_id"> </el-table-column>
          <el-table-column label="申请日期" prop="apply_time"> </el-table-column>
          <el-table-column label="申请商品" prop="pz_name"> </el-table-column>
          <el-table-column label="所属企业" prop="pz_name"> </el-table-column>
          <el-table-column label="审核状态" prop="review_state"
            :filters="[{ text: '审核通过', value: '1' }, { text: '审核未通过', value: '0' }]" :filter-method="filterTag" 
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <span v-if="scope.row.review_state==='0'">审核未通过</span>
              <span v-if="scope.row.review_state==='1'">审核通过</span>
              <span v-if="scope.row.review_state==='2'">待审核</span>
            </template>
          </el-table-column>
          <el-table-column label="地块名称" prop="place_name"> </el-table-column>
          <el-table-column type="expand" label="操作" width="100px">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                 <el-form-item label="生产批次号">
                  <span>{{ props.row.apply_id }}</span>
                </el-form-item>
                <el-form-item label="申请数量">
                  <span>{{ props.row.apply_num }}</span>
                </el-form-item>
                <el-form-item label="审核日期">
                  <span>{{ props.row.review_time }}</span>
                </el-form-item>
                <el-form-item label="申请单号">
                  <span>{{ props.row.apply_id }}</span>
                </el-form-item>
                <el-form-item label="申请日期">
                  <span>{{ props.row.apply_time }}</span>
                </el-form-item>
                <el-form-item label="产品名称">
                  <span>{{ props.row.pz_name }}</span>
                </el-form-item>
                <el-form-item label="地块名称">
                  <span>{{ props.row.place_name }}</span>
                </el-form-item>
                <el-form-item label="所属合作社">
                  <span>{{ props.row.booth_name}}</span>
                </el-form-item>
                <el-form-item label="审核结果">
                  <span v-if="props.row.review_state==='0'">审核未通过</span>
                  <span v-if="props.row.review_state==='1'">审核通过</span>
                  <span v-if="props.row.review_state==='2'">待审核</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>

      </div>


      <!--分页-->
      <div class="pageBlock">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="totalPageSize">
        </el-pagination>

      </div>


      <!--新的申请溯源码-->
      <el-dialog title="申请溯源码" :visible.sync="symapplicationflag" :before-close="handleClose" :close-on-click-modal = "isclick"
        width="650px">
        <!--内容-->
        <!--选择地块-->
        <div class="tjsf-div2-row">
          <div class="left">选择地块:</div>
          <div class="right">
            <el-select v-model="place_name_add" slot="append" placeholder="请选择" value-key="id" class="select-width-me"
              size="small" @change="changevalue()">
              <el-option v-for="item in place_name_list" :key="item.id" :label="item.place_name" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <!--所属合作社-->
        <div class="tjsf-div2-row">
          <div class="left">所属企业:</div>
          <div class="right">
            <el-input v-model="sq_sym_Hzs" size="small" disabled placeholder="选择地块后会自动填充"></el-input>
          </div>
        </div>
        <!--产品名称-->
        <div class="tjsf-div2-row">
          <div class="left">申请商品:</div>
          <div class="right">
            <el-input v-model="pz_add_name" size="small" disabled placeholder="选择地块后会自动填充"></el-input>
          </div>
        </div>
        <div class="tjsf-div2-row">
          <div class="left">生产批次号:</div>
          <div class="right">
            <el-select v-model="place_name_add" slot="append" placeholder="请选择" value-key="id" class="select-width-me"
              size="small" @change="changevalue()">
              <el-option v-for="item in place_name_list" :key="item.id" :label="item.place_name" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <!--溯源码数量-->
        <div class="tjsf-div2-row">
          <div class="left">溯源码数量:</div>
          <div class="right">
            <el-input v-model="apply_num_add" placeholder="请输入申请数量" size="small" maxlength="11"
              onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()" size="small">取 消</el-button>
          <el-button type="primary" @click="addSymSubmit()" size="small">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
  import {
    plotHzsList
  } from "../../js/farmthings/farmworkget.js";
  import {
    symGetAllsymPost,
    symInsert
  } from "../../js/farmthings/farmworksym.js";

  import {plotList} from "../../js/farmthings/farmworkget.js";
  import {
    nsGoodsQueryPOST
  } from "../../js/farmthings/farmworkgoods.js";

  export default {
    name: '',
    components: {},
    data() {
      return {

        localuserId: '',
        localnodeid: '',
        isclick: false,

        local_date_start_end: '',

//
        symapplicationflag: false,

//产品名称   申请日期   审核状态   申请单号
        pz_name_local: '',

        start_date_local: '',
        end_date_local: '',
        review_state_local: '',
        review_state_local_submit: '',
        apply_num_local: '',

        //        合作社数据
        hzs_name_local: {},
        plotHzsDataList: [],

//        申请溯源码合作社
        sq_sym_Hzs: '',


//       地块名称 产品名称
        place_name_add: {},
//        pz_add: {},
        pz_add: '',

//        地块名称和id    产品名称和id
        place_name_add_name: '',
        place_name_add_id: '',
        pz_add_name: '',
        pz_add_id: '',
        pz_hzs_id: '',

        apply_num_add: '',


        tableSymSqList: [],

//        地块list   产品名称
        place_name_list: [],
        ns_sp_list: [],

//        key:'',
        value: {},

//        分页参数
        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',


      }
    },
    methods: {
      filterTag(value, row) {
        return row.review_state === value;
      },


      //      申请溯源码
      addSym() {
        var btn = document.getElementById('open_btn');
        var div = document.getElementById('background');
        var close = document.getElementById('close-button');

        btn.onclick = function show() {
          div.style.display = "block";
        };

        close.onclick = function close() {
          div.style.display = "none";
        }

        window.onclick = function close(e) {
          if (e.target == div) {
            div.style.display = "none";
          }
        }
      },

//      获取POST数据      获取溯源码信息

      getSymList(page_local_par) {
        switch (this.review_state_local) {
          case "审核未通过":
            this.review_state_local_submit = 0
            break;
          case "审核通过":
            this.review_state_local_submit = 1
            break;
          default:
            this.review_state_local_submit = ''
            break;
        }
        let params = {
          page: page_local_par,
          cols: "10",
          pz_name: this.pz_name_local,
          // apply_start_time: this.start_date_local,
          // apply_end_time: this.end_date_local,
          review_state: this.review_state_local_submit,
          apply_start_time: this.local_date_start_end.toString().substring(0,10),
          apply_end_time: this.local_date_start_end.toString().substring(11,21),
          apply_id: this.apply_num_local,
          userId: this.hzs_name_local.userId,
          // userId: this.localuserId,
          node_id: this.localnodeid,
        };

        console.log('=========='+this.localuserId);
        this.getsymPostList(params);
      },

      getsymPostList(params) {
        symGetAllsymPost(params)
          .then(res => {
            this.tableSymSqList = res.data.sym_list;
            this.totalPageSize = parseInt(res.data.condition.total);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },

//      获取合作社
      getHzsList(currentPageLocal) {
        let params = {
          userId: this.localuserId,

        }

        this.getPlotHzsList(params);
      },

      getPlotHzsList(params) {
        plotHzsList(params)
          .then(res => {
            this.plotHzsDataList = res.data.dataList;

          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },

      //      关闭申请弹窗
      handleClose(done) {

        this.clearnum();

      },

      //      新增申请清空
      clearnum() {
        this.symapplicationflag = false;
        this.apply_num_add = '';
        this.pz_add = '';
        this.place_name_add = [];
        this.sq_sym_Hzs = '';

      },


//      清空条件
      clearAllCondition() {

        this.pz_name_local = '';
        this.start_date_local = '';
        this.end_date_local = '';
        this.review_state_local = '';
        this.apply_num_local = '';
        this.hzs_name_local = [];
        this.local_date_start_end = '';

        this.getSymList(this.page_local);


      },


//      申请溯源码

      addSymSubmit() {

//        合作社   合作社id   品种   品种id  地块
        this.getdkId();
        let addparams = {
          pz_name: this.pz_add_name,
          pz_id: this.pz_add_id,

          biz_id: this.pz_hzs_id,
          apply_num: this.apply_num_add,
          userId: this.localuserId,
          place_id: this.place_name_add_id,
          place_name: this.place_name_add_name,
        };

        symInsert(addparams)
          .then(res => {
            this.$message.success(res.message);
            this.handleClose();
            this.getSymList(this.page_local);
            this.pz_add_name = '';
          })
          .catch(() => {
            this.$message.error(res.message);
          })


      },

      //      关闭窗口
      closeWindow() {

        var div = document.getElementById('background');

        div.style.display = 'none'
        this.getdkId();

      },


      //          获取地块list
      getListdk() {
        let params = {
          page: 1,
          cols: 15000,
          total: "",
          userId: "",
          place_name: "",
          node_id:this.localnodeid,
          cjsj: "",
        }

        this.getPlotList(params);
      },

      getPlotList(params) {
        plotList(params)
          .then(res => {
            console.info(res)
            this.place_name_list = res.data.dataList;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },

      //      获取商品品种的信息
      getListNSsp() {
        let params = {
          page: 1,
          cols: 15,
          userId: this.localuserId,
        }

        this.getNsGoodsQueryPOST(params);
      },

      getNsGoodsQueryPOST(params) {
        nsGoodsQueryPOST(params)
          .then(res => {
            this.ns_sp_list = res.data.dataList;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },


//      h获取地块id
      getdkId() {
        this.place_name_add_name = this.place_name_add.place_name;
        this.place_name_add_id = this.place_name_add.id;
//        this.pz_add_name = this.pz_add.goods_Name;
//        this.pz_add_id = this.pz_add.id;
        this.pz_hzs_id = this.place_name_add.userId;

      },

      //设置表格第一行的颜色
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#F5F5F5;height:40px; padding: 0px 0;'
        } else {
          return ''
        }
      },

      //分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getSymList(this.page_local);
      },
      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'
      },

//     地块变化相应的变化    合作社   合作社id   品种   品种id  地块
      changevalue() {
        console.log(this.place_name_add);
        this.sq_sym_Hzs = this.place_name_add.booth_name;
//        this.pz_add = this.place_name_add.pz;
        this.pz_add_id = this.place_name_add.pzid;
        this.pz_add_name = this.place_name_add.pz

      }


    },
    mounted() {
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.localnodeid = JSON.parse(localStorage.getItem('nodeidlocal'));
      this.getSymList(this.page_local);
      this.getListdk();
      this.getListNSsp();
      this.getHzsList();


    }
  }
</script>

<style scoped lang='less'>

  @lz-filter-name-width:70px;
  .search-btn{
    margin-top: 2px;
    margin-right: 10px;
    color: #409EFF;
    background: #fff;
  }
  .span-clear {
    color: #999999;
    margin-left: 15px;
    cursor: pointer;
    font-size: 14px;
  }
  .lz-table-title {
    padding: 0 10px;
    height: 40px;
    display: flex;
    background: #fff;
    .lz-table-title-left {
      flex: 1;
      display: flex;
      /*border: 1px solid red;*/
      align-items: center;
      .lz-span{
        font-size: 13px;
        margin-bottom: 2px;
        padding-left: 10px;
        border-left: 2px solid #409EFF;
      }
      .lz-feilei-wai{
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        background-color: #fff;
        .lz-feilei {
          width: 90%;
          height: 90%;
        }
      }
      /*background-color: red;*/
    }

    .lz-table-title-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;


    }
  }

  .lz-filter {
    padding: 10px;
    margin-bottom: 10px;
    height: 130px;
    /*margin-top: 12px;*/
    font-size: 14px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: 1px solid #f5f5f5;
    .lz-filter-one{
      flex: 1;
      margin-left: 45px;
      width: 950px;
      /*background-color: red;*/
      display: flex;
      align-items: center;
      .lz-filter-one-style{
        flex: 1;
        display: flex;
        .lz-filter-name{
          width: @lz-filter-name-width;
          display: flex;
          align-items: center;
        }

        .lz-filter-name-two{
          width: @lz-filter-name-width + 12px ;
          display: flex;
          align-items: center;
        }
      }

      .lz-filter-one-style-three{
        flex: 1;
        display: flex;
        .lz-filter-name-two{
          width: @lz-filter-name-width + 12px ;
          display: flex;
          align-items: center;
        }
      }

    }
    .lz-filter-two{
      flex: 1;
      display: flex;
      /*align-items: flex-start;*/
      align-items: center;
      margin-left: 115px;
    }
  }



  /*遮罩层样式*/
  .tjsf-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 58px;
    font-size: 16px;
    font-weight: 600;
    .tjsf-title-inner {
      width: 414px;
      height: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      border-bottom: 0.5px solid #D7D7D7;
    }
  }
  .search-btn{
    color: #409EFF;
    background: #fff;
  }
  .clear-btn{
    color: #999;
  }
  .tjsf-foot {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    margin-top: 14px;
  }

  .my-el-date-picker {
    width: 253px;
  }

  #close-button {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }

  #background {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .div1 {
    background: #ffffff;
    width: 438px;
    height: 300px;
    font-size: 14px;
    margin: 17% auto;
    overflow: auto;
  }

  /*内容*/

  .syacontent {
    height: 100%;
  }

  .rctable {
    margin-top: 19px;
    height: 500px;
  }

  .syotitle {
    height: 150px;
    margin-top: 14px;
    background-color: #F5F5F5;
    font-size: 14px;

    .title_row {
      display: flex;
      height: 33%;
      align-items: center;
      .title_row_left {
        display: flex;
        margin-left: 40px;
        align-items: center;
        span {
          width: 80px;
        }
      }
      .title_row_left_sh {
        display: flex;
        margin-left: 40px;
        align-items: center;
        span {
        }
      }

      .title_row_right {
        display: flex;
        margin-left: 40px;
        align-items: center;
        .right_span {
          margin-right: 6px;
        }
      }
    }

    .title_row_three_btn {
      display: flex;
      height: 33%;
      align-items: center;
      margin-left: 114px;

    }
  }



  .syocontent {
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
  }

  .demo-table-expand {
    font-size: 0px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }

  .select-width-me {
    width: 250px;
  }

  .select-width-me-sh {
    width: 204px;
  }

  .tjsf-div2-row {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .left {
      width: 76px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .right {
      height: 50px;
      line-height: 50px;
      width: 250px;
      margin-left: 10px;
    }
  }

  .pageBlock {
    height: 80px;
    display: flex;
    justify-content: center;
    background: #fff;
  }

  .lz-template-color {
    background-color: red;
  }

</style>
