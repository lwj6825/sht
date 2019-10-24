<template>
  <div class="syacontent">
    <!--头部-->
    <div class="syotitle">
      <span>商品品种</span>
        <el-select v-model="goods_name_search" slot="append" placeholder="请选择" size="small" clearable filterable>
          <el-option v-for="item in ns_sp_list_type" :key="item.id" :label="item.goods_Name" :value="item.goods_Name"></el-option>
        </el-select>
      <el-button type="primary" @click="getListNSsp()" class="btn-end" size="small">搜索</el-button>
    </div>
    <div class="lz-table-title">
      <div class="lz-table-title-left">
        <span>全部商品</span>
        <!--<span>全部商品</span>-->
      </div>
      <div class="lz-table-title-right">
        <el-button type="primary" id="open_btn" class="sf-but" @click="jumpAddLayout()" size="mini">新增商品品种</el-button>
      </div>
    </div>
    <!--内容区域-->
    <!--表格-->
    <div class="rctable" id="edit_open_btn" >
      <el-table :data="ns_sp_list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" 
        :cell-style = "getRowheight" :header-cell-style="getRowClass">
        <el-table-column prop="code1" label="商品编码"></el-table-column>
        <el-table-column prop="goods_Name" label="商品品种"> </el-table-column>
        <el-table-column prop="breed" :formatter="formatter" label="所属品种"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="edit_btn" size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="ifDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pageBlock">
      <el-pagination v-if="totalPageSize" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, prev, pager, next, jumper" :total="totalPageSize">
      </el-pagination>
    </div>
    <!--调试后的新增商品-->
    <el-dialog title="新增商品品种" :visible.sync="comvarietyflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--内容-->
        <!--商品编码-->
        <div class="tjsf-div2-row">
          <div class="left">商品编码:</div>
          <div class="right">
            <el-input v-model="Goods_num_add" placeholder="请输入商品品种"></el-input>
          </div>
        </div>
      <!--商品品种-->
        <div class="tjsf-div2-row">
          <div class="left">商品品种:</div>
          <div class="right">
            <el-input v-model="Goods_name_add" placeholder="请输入商品品种"></el-input>
          </div>
        </div>
        <!--溯源码数量-->
        <div class="tjsf-div2-row">
          <div class="left">所属品种:</div>
          <div class="right">
            <el-cascader :options="myoptions" v-model="selectedOptions" :props="props" class="eljl" filterable @change="handleChange">
            </el-cascader>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addNewNsGoods()">保存</el-button>
      </span>
    </el-dialog>
    <!--调试后的编辑商品-->
    <el-dialog title="编辑商品" :visible.sync="comvarietyEditflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--商品编码-->
      <div class="tjsf-div2-row">
        <div class="left">商品编码:</div>
        <div class="right">
          <el-input v-model="Goods_num_add" placeholder="请输入商品品种" disabled></el-input>
        </div>
      </div>
        <!--溯源码数量-->
        <div class="tjsf-div2-row">
          <div class="left">商品品种:</div>
          <div class="right">
            <el-input v-model="Goods_name_add" placeholder="请输入商品品种"></el-input>
          </div>
        </div>
        <!--溯源码数量-->
        <div class="tjsf-div2-row">
          <div class="left">所属品种:</div>
          <div class="right">
            <el-cascader :options="myoptions" v-model="selectedOptions" :props="props" class="eljl" filterable>
            </el-cascader>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="updateNsGoods()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {
    nsGoodsQueryPOST,
    nsGoodsDeletePOST,
    nsGoodsInsertPOST,
    nsGoodsUpdatePOST,
    nsGoodsNumberPOST
  } from "../../js/farmthings/farmworkgoods.js";

  import {getDefaultProductTypes} from "../../js/goods/goods.js";

  export default {
    name: '',
    components: {},
    data() {
      return {
        props: {
          label: 'type_name',
          value: 'level_id',
          children: 'systemDefaultTypeList'
        },
        comvarietyflag:false,
        comvarietyEditflag:false,
        isclick:false,
        // selectedOptions: '',
        selectedOptions: [],
        edittype: '',
        Goods_name_add: '',
        Goods_num_add: '',
        apply_num_add: '',
        goods_name_search: '',
        myoptions: [],
        ns_sp_list: [],
        ns_sp_list_type: [],
        // 编辑属性
        yiji: '',
        yjstring: '',
        editId : '',
        editTypeId : '',
        editTypeIdSubmit : '',
        typeNameStr: '',
        // 分页参数
        currentPage: 0,
        totalPageSize: 0,
        page_local:'1',
        queryNameData:[],
        localuserId:'',
      }
    },
    methods: {
      // 设置表格第一行的颜色
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
        this.getListNSsp(this.page_local);
      },
      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'
      },
      // 获取商品品种表格信息
      getListNSsp(page_local_par) {
        let params = {
          page: page_local_par,
          cols: 10,
          userId: this.localuserId,
          goods_Name: this.goods_name_search,

        }
        this.getNsGoodsQueryPOST(params);
      },
      getNsGoodsQueryPOST(params) {
        nsGoodsQueryPOST(params)
          .then(res => {
            this.ns_sp_list = res.data.dataList;
            this.totalPageSize = parseInt(res.data.condition.total);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 获取商品编码信息
      getListNSspNumber() {
        let params = {
          userId: this.localuserId,
        }
        this.getNsGoodsNumberPOST(params);
      },
      getNsGoodsNumberPOST(params) {
        nsGoodsNumberPOST(params)
          .then(res => {
            this.Goods_num_add = res.data.dataList;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 获取商品类别
      getListNSsptype() {
        let params = {
          page: 1,
          cols: 15,
          userId: this.localuserId,
        }
        this.getNsGoodsQueryPOSTType(params);
      },
      getNsGoodsQueryPOSTType(params) {
        nsGoodsQueryPOST(params)
          .then(res => {
            this.ns_sp_list_type = res.data.dataList;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 编辑商品调用的方法
      handleEdit(index, row) {
        this.Goods_name_add = row.goods_Name;
        this.edittype = this.formatter(row, index);
        this.editId = row.id;
        this.editTypeId = row.level_id;
        this.Goods_num_add = row.code1;
        this.comvarietyEditflag = true;
        this.selectedOptions.push(row.level_id.substring(0,2));
        this.selectedOptions.push(row.level_id.substring(0,5));
        this.selectedOptions.push(row.level_id.substring(0,8));
        this.selectedOptions.push(row.level_id.substring(0,12));
      },
      // 新增商品接口
      addNewNsGoods() {
        let addparams = {
          goods_Name: this.Goods_name_add,
          goods_Code: this.Goods_num_add,
          gb_Code: this.selectedOptions[3],
          userId: this.localuserId,
        };
        nsGoodsInsertPOST(addparams)
          .then(res => {
            this.$message.success(res.message);
            this.getListNSsp(this.page_local);
            this.getListNSsptype();
            this.handleClose();
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },
      // 编辑商品接口
      updateNsGoods() {
        if (this.selectedOptions[3] === undefined) {
          this.editTypeIdSubmit = this.editTypeId
        } else {
          this.editTypeIdSubmit = this.selectedOptions[3]
        }
        let updateParams = {
          goods_Name: this.Goods_name_add,
          gb_Code: this.editTypeIdSubmit,
          id: this.editId,
          userId: this.localuserId,
        };
        nsGoodsUpdatePOST(updateParams)
          .then(res => {
            this.$message.success("保存成功!");
            this.getListNSsp();
            this.getListNSsptype();
            this.handleClose();
            this.cleanEditPro();
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 清除Edit属性
      cleanEditPro(){
        this.selectedOptions = [];
      },
      handleChange(value) {
      },
      // 删除商品功能
      ifDelete(index, rows) {
        this.$confirm('此操作将永久删除该品种, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows),
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
      deleteRow(index, rows) {
        this.deletePlot(rows.id);
      },
      // 删除地块后台服务器数据
      deletePlot(a) {
        let deleteParams = {
          id: a,
        };
        nsGoodsDeletePOST(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getListNSsp(this.page_local);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 获取对应的名称
      formatter(row, column) {
        let typeName = '';
        let level_1_name = '';
        let level_2_name = '';
        let level_3_name = '';
        let level_4_name = '';
        let queryNameData = this.queryNameData;
        if (row.level_id.length == 2) {
          level_1_name = queryNameData[0].type_name;
          typeName = level_1_name;
        }
        if (row.level_id.length == 5) {
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele) => {
            if (ele.level_id == row.level_id.slice(0 - 5)) {
              level_2_name = ele.type_name;
              typeName = level_1_name + '/' + level_2_name;
            }
          })
        }
        if (row.level_id.length == 8) {
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele) => {
            if (ele.level_id == row.level_id.slice(0, 5)) {
              level_2_name = ele.type_name;
              ele.systemDefaultTypeList.forEach((ele) => {
                if (ele.level_id == row.level_id.slice(0, 8)) {
                  level_3_name = ele.type_name;
                  typeName = level_1_name + '/' + level_2_name + '/' + level_3_name;
                }
              })
            }
          })
        }
        if (row.level_id.length == 12) {
          level_1_name = queryNameData[0].type_name;
          queryNameData[0].systemDefaultTypeList.forEach((ele) => {
            if (ele.level_id == row.level_id.slice(0, 5)) {
              level_2_name = ele.type_name;
              ele.systemDefaultTypeList.forEach((ele) => {
                if (ele.level_id == row.level_id.slice(0, 8)) {
                  level_3_name = ele.type_name;
                  ele.systemDefaultTypeList.forEach((ele) => {
                    if (ele.level_id == row.level_id.slice(0, 12)) {
                      level_4_name = ele.type_name;
                      typeName = level_1_name + '/' + level_2_name + '/' + level_3_name + '/' + level_4_name;
                    }
                  })
                }
              })
            }
          })
        }
        return typeName;
      },
      // 默认的三级联动
      created() {
        getDefaultProductTypes()
          .then(res => {
            this.myoptions = res;
            localStorage.setItem('queryNameData', JSON.stringify(res));
          })
          .catch(res => {
            this.$message.error("数据加载失败!");
          })
      },
      // 关闭申请弹窗
      handleClose(done) {
        this.clearnum();
      },
      // 新增商品品种清空
      clearnum(){
        this.comvarietyflag = false;
        this.comvarietyEditflag = false;
        this.Goods_name_add = '';
        this.selectedOptions = '';
        this.goods_Code = '';
        this.cleanEditPro();
      },
      // 新增商品布局
      jumpAddLayout(){
        this.comvarietyflag = true;
        this.getListNSspNumber();
      },
    },
    mounted() {
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.queryNameData = JSON.parse(localStorage.getItem('queryNameData'));
      this.getListNSsp(this.page_local);
      this.getListNSsptype();
      this.getListNSspNumber();
      this.created();
    }
  }
</script>

<style scoped lang='less'>
  .lz-table-title {
    padding: 0 10px;
    height: 40px;
    display: flex;
    background: #fff;
    .lz-table-title-left {
      flex: 1;
      display: flex;
      align-items: center;
      span{
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
    }
    .lz-table-title-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
  .eljl{
    width: 300px;
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
  #editclose-button {
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
  #editbackground {
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
    height: 260px;
    font-size: 14px;
    margin: 17% auto;
    overflow: auto;
  }
  .syacontent {
    height: 100%;
  }
  .rctable {
    padding: 10px;
    background: #fff;
    border-top: 1px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
  }
  .syotitle {
    padding: 0 10px;
    margin-bottom: 10px;
    height: 100px;
    background-color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    border: 1px solid #f5f5f5;
    span {
      margin-left: 50px;
      width: 75px;
    }
    .input-middle {
      width: 300px;
    }
    .btn-end {
      margin-left: 50px;
      color: #409EFF;
      background: #fff;
    }
  }
  .pageBlock{
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: center;
  }
</style>
