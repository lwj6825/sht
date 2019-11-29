<template>
  <div class="content" ref="content">


    <!--筛选条件-->
    <div class="lz-search-condition">

      <!--展开前的样式-->
      <div class="lz-search-item-style-one" v-show="isshowcondition">
        <div class="lz-filter-one-style">
          <div class="lz-filter-name">生产日期</div>
          <el-date-picker
            class="lz-filter-date"
            v-model="local_date_start_end"
            type="daterange"
            value-format="yyyy-MM-dd"
            size="small"
            style="width: 225px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-button class="lz-margin-left" @click="checkListSearch">搜索</el-button>
          <el-button>导出</el-button>
          <!--<el-button class="lz-margin-left" @click="clearcondition" type="text">清空筛选条件</el-button>-->

        </div>


        <div class="lz-search-item-style-one-button">

          <el-button type="text" @click="goExpend">展开筛选条件 <i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </div>


      </div>


      <!--展开后的样式-->
      <div class="lz-search-item-style-two" v-show="!isshowcondition">


        <div class="lz-filter-one-style">

          <!--检测日期-->
          <div class="lz-three-item">
            <div class="lz-filter-name">生产日期</div>
            <el-date-picker
              class="lz-filter-date"
              v-model="local_date_start_end"
              type="daterange"
              value-format="yyyy-MM-dd"
              size="small"
              style="width: 225px"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>


          <!--商户名称-->
          <div class="lz-three-item">
            <div class="lz-filter-name">生产批次号</div>

            <el-select v-model="local_booth_name" slot="append" placeholder="请选择" value-key="userId"
                       class="select-width-me" size="small" filterable clearable filterable style="width: 225px">
              <el-option
                v-for="item in local_booth_name_options"
                :key="item.bootList[0].shop_booth_id"
                :label="item.bootList[0].booth_name"
                :value="item.bootList[0].shop_booth_id">
              </el-option>
            </el-select>
          </div>

          <!--检测结果-->
          <div class="lz-three-item">
            <div class="lz-filter-name">销售商品</div>

            <el-select v-model="local_check_result" slot="append" placeholder="请选择" value-key="userId"
                       class="select-width-me" size="small" clearable filterable style="width: 225px">
              <el-option
                v-for="item in check_result_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </div>


        </div>

        <!--第二行筛选条件-->
        <div class="lz-filter-one-style">

          <!--检测商品-->
          <div class="lz-three-item">
            <div class="lz-filter-name">进货批次号</div>

            <el-select v-model="local_check_good" filterable placeholder="请选择商品" size="small" value-key="ID"
                       style="width: 225px">
              <el-option v-for="item in local_check_good_options" :key="item.ID" :label="item.GOODS_NAME"
                         :value="item"></el-option>
            </el-select>


          </div>


          <div class="lz-three-item">
            <el-button class="lz-margin-left" @click="checkListSearch">搜索</el-button>
            <el-button>导出</el-button>
            <el-button class="lz-margin-left" @click="clearcondition" type="text">清空筛选条件</el-button>
          </div>

          <div class="lz-three-item"></div>
        </div>


        <div class="lz-search-item-style-one-button">

          <el-button type="text" @click="goCollapse">收起筛选条件 <i class="el-icon-arrow-up el-icon--right"></i></el-button>

          <!--<div>{{ msg | capitalize}}</div>-->
        </div>


      </div>

    </div>

    <!--表格-->
    <div class="table">
      <div class="title">
        <p class="tz-title">全部生产任务</p>
        <div>
          <el-button type="primary" class="addBtn blue-bth" @click="goAddCheck">添加生产任务</el-button>
          <el-button type="primary" class="addBtn blue-bth" @click="goAddCheck" plain>批量下载</el-button>
        </div>
      </div>
      <div class="tables">
        <el-table :data="tableData" :header-cell-style="rowClass">
          <el-table-column prop="check_date" label="生产日期"></el-table-column>
          <el-table-column prop="booth_name" label="生产批次号"></el-table-column>
          <el-table-column prop="stall_no" label="销售商品" v-if="isShow"></el-table-column>
          <el-table-column prop="check_good" label="规格"></el-table-column>
          <el-table-column prop="check_result" :formatter="toCheckResult" label="销售数量"></el-table-column>
          <el-table-column prop="remark" label="进货商品信息"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewImg(scope.row)">查看附件</el-button>
              <el-button type="text" size="small" @click="ifDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination v-if="totalPageSize" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="totalPageSize">
      </el-pagination>
    </div>


    <!--显示图片-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="isclick"
      width="650px"
      height="650px">

      <div class="lz-dialog-content">
        <!--<img class="lz-checkimag" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/'+viewImgUrl"/>-->
        <img class="lz-checkimag" :src="BaseImgUrl+viewImgUrl"/>

      </div>

    </el-dialog>
  </div>
</template>

<script>
  import AreaSelect from '../common/area';
  import {QueryArea} from '../../js/area/area.js';
  import {getCheckList, GetAllBiz, DeteleCheckItem, Parse} from '../../js/standingBook/standingBook.js'
  import {purchase, getDefaultProductTypes,} from "../../js/goods/goods.js";

  import {BaseImgUrl} from '../../js/address/url.js';

  export default {
    name: "saleTz",
    data() {
      return {

        isclick: false,

        msg: '测试过滤器',
        BaseImgUrl: '',

        //  检测日期  商户名称  摊位号  检测商品   检测结果  备注
        local_check_date: '',
        local_booth_name: '',
        local_booth_name_options: '',


        local_stall_no: '',
        local_check_good: '',
        local_check_good_options: [],

        goods_name_Arr: [],

        submit_goods_name: '',

        local_remark: '',
        local_date_start_end: '',
        local_node_id: '',
        local_area_booth_name: '',

        //检测结果
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
        isshowcondition: true,


        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',

        userId: '',
        areaId: '', // 大区的shop_booth_id
        // bigAreaId: '', // 大区userId
        contacts: '',
        nodeName: '',
        file: '',
        scShopId: '', // 市场的shop_booth_id
        isShow: true,
        isRegion: '',
        user_shop_booth_id: '',
        node_id: '',
      }
    },
    mounted() {
      this.node_id = localStorage.getItem('loginId');
      this.BaseImgUrl = BaseImgUrl;

      // console.log("这是图片地址"+BaseImgUrl);

      //获取  区域的  shop_booth_id   node_id   商户的    shop_booth_id
      this.isRegion = localStorage.getItem('isRegion');
      this.scShopId = localStorage.getItem('scShopId');
      this.userId = localStorage.getItem('userId');
      // this.user_shop_booth_id = localStorage.getItem('scShopId');


      if (this.isRegion == 'false') {

        // nodeidlocal
        this.local_node_id = localStorage.getItem('nodeidlocal');

        this.isShow = false;
        this.getCheckListtable(this.page_local);
        this.getMerchantsFun();
        this.getGoodsFun();
      } else {
        this.getArear();

      }


    },
    methods: {

      toCheckResult(row, column) {
        switch (row.check_result) {
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

      //分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getCheckListtable(this.page_local);
      },

      //      关闭按钮
      handleClose(done) {

        done();


      },

      //点击搜索
      checkListSearch() {

        this.getCheckListtable(this.page_local);

      },

      //清空筛选条件

      clearcondition() {

        this.local_date_start_end = null;
        this.local_check_good = null;
        this.local_check_result = '';
        this.local_booth_name = '';
        this.local_date_start_end = '';
        this.local_check_good = '';

        this.getCheckListtable(this.page_local);
      },

      //  获取商品列表
      getGoodsFun() {
        let boothData = {
          page: 1,
          cols: 15000,
          goodsName: "",
          suppliersName: '',
          region: this.areaId,
          userId: this.userId,
          total: '',
        }
        purchase(boothData)
          .then(res => {

            this.local_check_good_options = res.data.purchaseList;

          })
          .catch(res => {
          })

      },


      // 获取商户
      getMerchantsFun() {
        let obj = {
          page: '1',
          cols: '100',
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
      getArear() {
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
            this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
            this.local_node_id = res.data.dataList[0].bootList[0].node_id;
            this.local_area_booth_name = res.data.dataList[0].bootList[0].booth_name;
            this.getMerchantsFun();
            this.getGoodsFun();
            this.getCheckListtable(this.page_local)

          })
          .catch(res => {
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

        if (index.img_url != '') {
          this.centerDialogVisible = true;
          this.viewImgUrl = index.img_url;
        } else {
          this.$message({
            message: '没有上传附件',
            type: 'warning'
          });
        }
        ;


      },

      //去新增界面
      goAddCheck() {

        this.$router.push({
          name: 'AddCheckTz',
          params: {areaId: this.areaId, bigAreaId: this.bigAreaId, areaName: this.local_area_booth_name}
        })
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
        let obj = {
          page: currentPageLocal,
          cols: '10',
          node_id: this.local_node_id,
          region: this.areaId,
          check_good: this.local_check_good.GOODS_NAME,
          shop_booth_id: this.user_shop_booth_id,
          check_result: this.local_check_result,
          start_time: this.local_date_start_end.toString().substring(0, 10),
          end_time: this.local_date_start_end.toString().substring(11, 21),
        }
        getCheckList(obj)
          .then(res => {

            this.currentPage = parseInt(res.data.condition.page);
            this.totalPageSize = parseInt(res.data.condition.total);

            this.totalItemNum = res.data.dataList.length;

            this.tableData = res.data.dataList;

          })
          .catch(res => {
          })
      },


      //删除数据
      ifDelete(index, rows) {
        this.$confirm('此操作将永久删除该地块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCheckItem(rows.id);
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
    filters: {
      isCheck: function (value) {

        if (value == '1') {
          return '合格'
        }

      }
    },

  }
</script>

<style lang='less' scoped>

  @lz-filter-name-width: 70px;

  /*筛选条件--*/
  .lz-search-condition {
    margin: 10px 0;
    background: #fff;
    width: 100%;

    /*第一个样式的布局*/
    .lz-search-item-style-one {
      width: 100%;
      padding: 0px 10px;
      height: 100px;
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

    width: 100%;
    height: 100%;

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
</style>
