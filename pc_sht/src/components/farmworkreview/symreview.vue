<template>
  <div class="syacontent">
    <!--最外层的壳子-->
    <!--头部-->
    <div class="syotitle">
      <!--账号   申请日期-->
      <div class="title_row">
        <div class="title_row_left">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
          <el-input v-model="username_local" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
        </div>
        <div class="title_row_right">
          <span class="right_span">申请日期:</span>
          <el-date-picker v-model="start_date_local" type="date" size="small" style="width: 200px" value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
          <el-date-picker v-model="end_date_local" value-format="yyyy-MM-dd" type="date" size="small" style="width: 200px"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <!--申请产品   申请单号-->
      <div class="title_row">
        <div class="title_row_left">
          <span>申请产品:</span>
          <el-select v-model="pz_name_local" slot="append" placeholder="请选择" size="small" style="width: 200px">
            <el-option v-for="item in tableSymReviewList_variety" :key="item.id" :label="item.pz_name" :value="item.pz_name"></el-option>
          </el-select>
        </div>
        <div class="title_row_left_two">
          <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
          <el-select v-model="review_state_local" slot="append" placeholder="请选择" size="small" style="width: 200px">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="审核通过" value="审核通过"></el-option>
            <el-option label="审核未通过" value="审核未通过"></el-option>
          </el-select>
        </div>
        <div class="lz_button">
          <el-button type="primary" size="mini" plain @click="getSymReviewList()">搜索</el-button>
          <!--清空筛选条件-->
          <el-button size="mini" type="text" @click="clearAllCondition()">清空筛选条件</el-button>
        </div>
      </div>
    </div>
    <!--表格内容-->
    <div class="syocontent">
      <el-table :data="tableSymReviewList" style="width: 100%" :cell-style="getRowheight" :header-cell-style="getRowClass">
        <el-table-column width="100px" label="申请日期" prop="lz_apply_time"></el-table-column>
        <el-table-column width="100px" label="账号" prop="username"></el-table-column>
        <el-table-column width="100px" label="申请产品" prop="pz_name"></el-table-column>
        <el-table-column width="100px" label="申请数量" prop="apply_num"></el-table-column>
        <el-table-column label="企业名称" prop="superadmin"></el-table-column>
        <el-table-column width="220px" label="合作社" prop="booth_name"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
        <el-table-column width="180px" label="联系人" prop="lz_person_tel"></el-table-column>
        <el-table-column label="审核状态" width="100px" prop="review_state"
          :filters="[{ text: '审核通过', value: '1' }, { text: '审核未通过', value: '0' }]"
          :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span v-if="scope.row.review_state==='0'">审核未通过</span>
            <span v-if="scope.row.review_state==='1'">审核通过</span>
            <span v-if="scope.row.review_state==='2'">待审核</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" id="open_btn" v-if="scope.row.review_state==='2'" 
              @click="reviewSendId(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini" type="text " class="xiazaicolor" v-if="scope.row.review_state==='1'"
              @click="downloadtxt(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pageBlock">
      <el-pagination v-if="totalPageSize" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="totalPageSize">
      </el-pagination>
    </div>
    <!--新审核-->
    <el-dialog
      title="审核"
      :visible.sync="reviewflag"
      :before-close="handleClose"
      width="650px">
      <!--内容-->
      <!--产品名称-->
      <div class="tjsf-div2-row">
        <div class="left">审核结果:</div>
        <div class="right">
          <el-select v-model="ifpassname" slot="append" placeholder="请选择" value-key="id" class="select-width-me" clearable>
            <el-option v-for="item in if_pass_list" :key="item.value" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="saveIfPass()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    symGetAllsymPost,
    symInsert
  } from "../../js/farmthings/farmworksym.js";
  import {plotList} from "../../js/farmthings/farmworkget.js";
  import {
    nsGoodsQueryPOST
  } from "../../js/farmthings/farmworkgoods.js";
  //  审核
  import {
    nsAuditQueryUrlPOST, nsAuditDownloadUrlPOST, nsAuditInsertOverUrlPOST, nsAuditInsertUrlPOST
  } from "../../js/farmthings/farmworkreviewpost.js";
  import {ReviewBean} from './ReviewBean';

  export default {
    name: '',
    components: {},
    data() {
      return {
        reviewflag: false,
        localuserId: '',
        // 账号  申请日期    申请产品  企业名称   状态
        username_local: '',
        start_date_local: '',
        end_date_local: '',
        pz_name_local: '',
        // place_name_local: '',
        review_state_local_submit: '',
        review_state_local: '',
        // 审核id
        reviewSendId_local: '',
        // 地块名称和id    产品名称和id
        place_name_add_name: '',
        place_name_add_id: '',
        pz_add_name: '',
        pz_add_id: '',
        apply_num_add: '',
        tableSymReviewList: [],
        tableSymReviewList_variety: [],
        // 地块list   产品名称
        place_name_list: [],
        ns_sp_list: [],
        // key:'',
        value: {},
        if_pass_list: [{name: "审核通过", value: "1"}, {name: "驳回", value: "0"}],
        ifpassname: '',
        // 分页参数
        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',
      }
    },
    methods: {
      filterTag(value, row) {
        return row.review_state === value;
      },
      // 申请溯源码
      reviewSendId(index, row) {
        this.reviewflag = true;
        this.reviewSendId_local = row.id;
        var btn = document.getElementById('open_btn');
        var div = document.getElementById('background');
        var close = document.getElementById('close-button');
        // btn.onclick = function show() {
        //   div.style.display = "block";
        // };
        // close.onclick = function close() {
        //   div.style.display = "none";
        // }
        // window.onclick = function close(e) {
        //   if (e.target == div) {
        //     div.style.display = "none";
        //   }
        // }
      },
      // 获取POST数据      获取审核信息
      getSymReviewList(page_local_par) {
        switch (this.review_state_local) {
          case "审核未通过":
            this.review_state_local_submit = 0
            break;
          case "审核通过":
            this.review_state_local_submit = 1
            break;
          case "待审核":
            this.review_state_local_submit = 2
            break;
          default:
            this.review_state_local_submit = ''
            break;
        }
        let params = {
          page: page_local_par,
          cols: "10",
          apply_start_time: this.start_date_local,
          apply_end_time: this.end_date_local,
          username: this.username_local,
          pz_name: this.pz_name_local,
          // name: this.place_name_local,
          review_state: this.review_state_local_submit,
        };
        this.getsymReviewPostList(params);
      },
      getsymReviewPostList(params) {
        nsAuditQueryUrlPOST(params)
          .then(res => {
            this.totalPageSize = parseInt(res.data.condition.total);
            this.tableSymReviewList = [];
            // 遍历数组然后创建对象并重新赋值
            for (var item of res.data.dataList) {
              let review = new ReviewBean();
              review.addr = item.addr;
              review.apply_num = item.apply_num;
              review.apply_time = item.apply_time;
              review.lz_apply_time = item.apply_time.slice(0, 10);
              review.booth_name = item.booth_name;
              review.contacts = item.contacts;
              review.lz_person_tel = item.contacts + " " + "(" + item.telphone + ")";
              review.id = item.id;
              review.pz_name = item.pz_name;
              review.review_state = item.review_state;
              review.superadmin = item.superadmin;
              review.telphone = item.telphone;
              review.userId = item.userId;
              review.username = item.username;
              this.tableSymReviewList.push(review)

            };
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      // 获取POST数据申请产品      获取审核信息
      getSymReviewListVariety() {
        let params = {
          page: 1,
          cols: "1000",
          apply_start_time: this.start_date_local,
          apply_end_time: this.end_date_local,
          username: this.username_local,
          pz_name: this.pz_name_local,
          // name: this.place_name_local,
          review_state: '',
        };
        this.getsymReviewPostListVariety(params);
      },
      getsymReviewPostListVariety(params) {
        nsAuditQueryUrlPOST(params)
          .then(res => {
            this.tableSymReviewList_variety = res.data.dataList;
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      // 清空条件
      clearAllCondition() {
        this.start_date_local = '';
        this.end_date_local = '';
        this.username_local = '';
        this.pz_name_local = '';
        // this.place_name_local = '';
        this.review_state_local_submit = '';
        this.review_state_local = '';
        this.getSymReviewList(this.page_local);
      },
      // 下载接口
      downloadtxt(index, rows) {
        let params = {
          id: rows.id,
        };
        nsAuditDownloadUrlPOST(params)
          .then(res => {
            this.download(res);
          })
          .catch(() => {
            this.$message.error("没下载到数据!");
          })
      },
      // 下载文件
      download(data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'codelist.txt')
        document.body.appendChild(link)
        link.click()
      },
      // 申请溯源码
      addSymSubmit() {
        this.getdkId();
        let addparams = {
          pz_name: this.pz_add_name,
          pz_id: this.pz_add_id,
          userId: "2",
          apply_num: this.apply_num_add,
          place_id: this.place_name_add_id,
          place_name: this.place_name_add_name,
        };
        symInsert(addparams)
          .then(res => {
            this.$message.success(res.message);
            this.closeWindow();
            this.getSymList();
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      // 关闭审核弹窗
      handleClose(done) {
        this.clearnum();
      },
      // 新增申请清空
      clearnum() {
        this.reviewflag = false;
        this.ifpassname = '';
      },
      // 获取地块list
      getListdk() {
        let params = {
          page: 1,
          cols: 15,
          total: "",
          userId: this.localuserId,
          place_name: "",
          cjsj: "",
        }
        this.getPlotList(params);
      },
      getPlotList(params) {
        plotList(params)
          .then(res => {
            this.place_name_list = res.data.dataList;
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      // 获取商品品种的信息
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
            this.$message.error(res.message);
          })
      },
      // h获取地块id
      getdkId() {
        this.place_name_add_name = this.place_name_add.place_name;
        this.place_name_add_id = this.place_name_add.id;
        this.pz_add_name = this.pz_add.goods_Name;
        this.pz_add_id = this.pz_add.id;
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
        this.getSymReviewList(this.page_local);
      },
      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'
      },
      // 保存接口
      saveIfPass() {
        if (this.ifpassname === '审核通过') {
          this.reviewTo();
          this.handleClose();
        } else {
          this.reviewStop();
          this.handleClose();
        };
      },
      // 审核通过接口
      reviewTo() {
        let params = {
          id: this.reviewSendId_local,
        };
        nsAuditInsertUrlPOST(params)
          .then(res => {
            this.$message.success(res.message);
            this.getSymReviewList(this.page_local);
          })
          .catch(() => {
            this.$message.error("没下载到数据!");
          })
      },
      // 审核未接口
      reviewStop() {
        let params = {
          id: this.reviewSendId_local,
        };
        nsAuditInsertOverUrlPOST(params)
          .then(res => {
            this.$message.success(res.message);
            this.getSymReviewList(this.page_local);
          })
          .catch(() => {
            this.$message.error("没下载到数据!");
          })
      },
    },
    mounted() {
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.getSymReviewList(this.page_local);
      this.getSymReviewListVariety();
      this.getListdk();
      this.getListNSsp();
    }
  }
</script>

<style scoped lang='less'>
  @lz-filter-name-width: 70px;
  .lz-filter {
    height: 130px;
    font-size: 14px;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    border: 1px solid #f5f5f5;
    .lz-filter-one {
      flex: 1;
      margin-left: 45px;
      width: 950px;
      display: flex;
      align-items: center;
      .lz-filter-one-style {
        flex: 1;
        display: flex;
        .lz-filter-name {
          width: @lz-filter-name-width;
          display: flex;
          align-items: center;
        }
        .lz-filter-name-two {
          width: @lz-filter-name-width + 12px;
          display: flex;
          align-items: center;
        }
      }
      .lz-filter-one-style-three {
        flex: 1;
        display: flex;
        .lz-filter-name-two {
          width: @lz-filter-name-width + 12px;
          display: flex;
          align-items: center;
        }
      }
    }
    .lz-filter-two {
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 115px;
    }
  }
  /*遮罩层样式*/
  .tjsf-div2-row {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .left {
      width: 60px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .right {
      height: 50px;
      line-height: 50px;
      width: 300px;
      margin-left: 10px;
    }
  }
  /*内容*/
  .syacontent {
    background: #fff;
    padding: 10px;
    height: 100%;
  }
  .syotitle {
    height: 138px;
    margin-top: 3px;
    background-color: #F5F5F5;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    .title_row {
      flex: 1;
      display: flex;
      height: 33%;
      align-items: center;
      .title_row_left {
        display: flex;
        margin-left: 40px;
        align-items: center;
        span {
          width: 65px;
        }
      }
      .title_row_left_two {
        display: flex;
        margin-left: 40px;
        align-items: center;
        span {
          width: 65px;
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
      .lz_button {
        width: 200px;
        margin-left: 31px;
        display: flex;
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
    margin-top: 25px;
    background-color: #F5F5F5;
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
  .xiazaicolor {
    color: red;
  }
  .pageBlock {
    height: 80px;
    margin-top: 11px;
    display: flex;
    justify-content: center;
  }
</style>
