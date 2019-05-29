<template>
  <div class="syacontent">
    <div class="rcbody">


      <!--<el-button type="primary" @click="addView()" size="small">新增地块</el-button>-->



      <!--加验证新增地块-->
      <el-dialog
        title="新增地块"
        :visible.sync="centerDialogVisible"
        :before-close="handleClose"
        :close-on-click-modal = "isclick"
        width="650px">

        <div class="lz-dialog-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <!--所属合作社-->
            <el-form-item label="所属合作社:" prop="hzs_name_local">
              <el-select v-model="ruleForm.hzs_name_local" placeholder="请选择所属合作社" value-key="userId"
                         class="select-width-me" filterable size="small">
                <el-option v-for="item in plotHzsDataList" :key="item.userId" :label="item.booth_name"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
            <!--地块名称-->
            <el-form-item label="地块名称:" prop="place_name_add" class="lz-item-set">
              <el-input v-model="ruleForm.place_name_add" placeholder="请输入地块名称" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--面积-->
            <el-form-item label="面积:" prop="area_add" class="lz-item-set">
              <el-input v-model="ruleForm.area_add" placeholder="请输入面积" size="small" class="select-width-me"></el-input>
            </el-form-item>

            <!--品种-->
            <el-form-item label="品种:" prop="goods_name_search" class="lz-item-set">
              <el-select v-model="ruleForm.goods_name_search" placeholder="请选择品种"
                         class="select-width-me" filterable size="small" value-key="id">
                <el-option v-for="item in ns_sp_list_type" :key="item.id" :label="item.goods_Name"
                           :value="item"></el-option>
                           <!--:value="item.goods_Name"></el-option>-->
              </el-select>

              <!--<el-select v-model="pz_add" slot="append" placeholder="请选择"  value-key="id" class="select-width-me" size="small">-->
              <!--<el-option v-for="item in ns_sp_list" :key="item.id" :label="item.goods_Name" :value="item" ></el-option>-->
              <!--</el-select>-->

            </el-form-item>

            <!--预计采摘时间-->
            <el-form-item label="预计采摘时间:" required class="lz-item-set">

              <el-col>
                <el-form-item prop="pick_date_add">
                  <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"-->
                  <!--style="width: 100%;"></el-date-picker>-->

                  <el-date-picker
                    v-model="ruleForm.pick_date_add"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期" class="select-width-me"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>


            </el-form-item>

            <!--预产量-->
            <el-form-item label="预产量(公斤):" prop="yield_add" class="lz-item-set">
              <el-input v-model="ruleForm.yield_add" placeholder="请输入预产量" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--地块负责人-->
            <el-form-item label="地块负责人:" prop="fzr_add" class="lz-item-set">
              <el-input v-model="ruleForm.fzr_add" placeholder="请输入地块负责人" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--联系方式-->
            <el-form-item label="联系方式:" prop="telephone_add" class="lz-item-set">
              <el-input v-model="ruleForm.telephone_add" placeholder="请输入电话" size="small" maxlength="11"
                        class="select-width-me"></el-input>
            </el-form-item>


            <!--<div class="lz-addfoot">-->
            <!--<el-form-item >-->
            <!--<el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>-->
            <!--<el-button @click="resetForm('ruleForm')" size="small">取消</el-button>-->
            <!--</el-form-item>-->
            <!--</div>-->

          </el-form>

        </div>
        <div class="lz-addfoot">
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">取消</el-button>
        </div>
      </el-dialog>

      <!--加验证编辑地块-->
      <el-dialog
        title="编辑地块"
        :visible.sync="centerEditDialogVisible"
        :before-close="handleCloseEdit"
        :close-on-click-modal = "isclick"
        width="650px">

        <div class="lz-dialog-content">
          <el-form :model="ruleFormEdit" :rules="rules" ref="ruleFormEdit" label-width="120px">
            <!--所属合作社-->
            <el-form-item label="所属合作社:" >

              <el-select v-model="hzs_name_local_bianji" class="select-width-me" filterable size="small">
                <el-option v-for="item in plotHzsDataListEdit" :key="item.userId" :label="item.booth_name"
                           :value="item.userId"></el-option>
              </el-select>

              <!--<el-select v-model="ruleFormEdit.hzs_name_local" :placeholder="ruleFormEdit.ns_hzs_Edit"-->
              <!--value-key="userId"-->
              <!--class="select-width-me" filterable size="small">-->
              <!--<el-option v-for="item in plotHzsDataListEdit" :key="item.userId" :label="item.booth_name"-->
              <!--:value="item"></el-option>-->
              <!--</el-select>-->


            </el-form-item>


            <!--更换思路之前-->
            <!--<el-form-item label="所属合作社:" prop="hzs_name_local">-->
              <!--&lt;!&ndash;@change="hzsName_change"&ndash;&gt;-->
              <!--&lt;!&ndash;<el-select v-model="ruleFormEdit.hzs_name_local_edit"  value-key="userid"&ndash;&gt;-->
              <!--<el-select v-model="ruleFormEdit.hzs_name_local" :placeholder="ruleFormEdit.ns_hzs_Edit"-->
                         <!--value-key="userId"-->
                         <!--class="select-width-me" filterable size="small">-->
                <!--<el-option v-for="item in plotHzsDataListEdit" :key="item.userId" :label="item.booth_name"-->
                           <!--:value="item"></el-option>-->
              <!--</el-select>-->


            <!--</el-form-item>-->
            <!--地块名称-->
            <el-form-item label="地块名称:" prop="place_name_add" class="lz-item-set">
              <el-input v-model="ruleFormEdit.place_name_add" placeholder="请输入地块名称" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--面积-->
            <el-form-item label="面积:" prop="area_add" class="lz-item-set">
              <el-input v-model="ruleFormEdit.area_add" placeholder="请输入面积" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--品种-->
            <el-form-item label="品种:"  >

              <el-select v-model="pz_name_local_bianji" class="select-width-me"  size="small">
                <el-option v-for="item in ns_sp_list_type" :key="item.id" :value="item.id" :label="item.goods_Name">

                </el-option>
              </el-select>

            </el-form-item>


            <!--<el-form-item label="品种:" prop="goods_name_search" class="lz-item-set">-->
              <!--&lt;!&ndash;<el-select v-model="ruleFormEdit.goods_name_search" :placeholder="ruleFormEdit.pz_add_Edit"&ndash;&gt;-->
              <!--<el-select v-model="ruleFormEdit.goods_name_search" :placeholder="ruleFormEdit.pz_add_Edit"-->
                         <!--class="select-width-me" filterable size="small" value-key="id" @change="pzxuanze()">-->
                <!--<el-option v-for="item in ns_sp_list_type" :key="item.id" :label="item.goods_Name"-->
                           <!--:value="item">{{item.goods_Name}}-->
                <!--</el-option>-->
              <!--</el-select>-->

            <!--</el-form-item>-->

            <!--<el-form-item label="品种:" prop="goods_name_search" class="lz-item-set">-->
              <!--<el-select v-model="ruleForm.goods_name_search" placeholder="请选择品种"-->
                         <!--class="select-width-me" filterable size="small" value-key="id">-->
                <!--<el-option v-for="item in ns_sp_list_type" :key="item.id" :label="item.goods_Name"-->
                           <!--:value="item"></el-option>-->
                <!--&lt;!&ndash;:value="item.goods_Name"></el-option>&ndash;&gt;-->
              <!--</el-select>-->

            <!--预计采摘时间-->
            <!--预计采摘时间-->
            <el-form-item label="预计采摘时间:"  class="lz-item-set">

              <el-col>
                <el-form-item >

                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="pick_date_add"
                    class="select-width-me"
                    size="small"
                    :clearable="isclick"
                  >
                  </el-date-picker>

                  <!--<el-date-picker-->
                  <!--v-model="ruleFormEdit.pick_date_add"-->
                  <!--type="date"-->
                  <!--value-format="yyyy-MM-dd"-->
                  <!--:placeholder="ruleFormEdit.editDate"-->
                  <!--class="select-width-me"-->
                  <!--size="small"-->
                  <!--&gt;-->
                  <!--</el-date-picker>-->
                </el-form-item>
              </el-col>


            </el-form-item>



            <!--更新前采摘时间-->
            <!--<el-form-item label="预计采摘时间:" required class="lz-item-set">-->

              <!--<el-col>-->
                <!--<el-form-item prop="pick_date_add">-->
                  <!--&lt;!&ndash;<el-date-picker type="date" placeholder="选择日期" v-model="ruleFormEdit.date1"&ndash;&gt;-->
                  <!--&lt;!&ndash;style="width: 100%;"></el-date-picker>&ndash;&gt;-->

                  <!--<el-date-picker-->
                    <!--v-model="ruleFormEdit.pick_date_add"-->
                    <!--type="date"-->
                    <!--value-format="yyyy-MM-dd"-->
                    <!--:placeholder="ruleFormEdit.editDate" class="select-width-me"-->
                    <!--size="small"-->
                  <!--&gt;-->
                  <!--</el-date-picker>-->
                <!--</el-form-item>-->
              <!--</el-col>-->


            <!--</el-form-item>-->

            <!--预产量-->
            <el-form-item label="预产量(公斤):" prop="yield_add" class="lz-item-set">
              <el-input v-model="ruleFormEdit.yield_add" placeholder="请输入预产量" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--地块负责人-->
            <el-form-item label="地块负责人:" prop="fzr_add" class="lz-item-set">
              <el-input v-model="ruleFormEdit.fzr_add" placeholder="请输入地块负责人" size="small"
                        class="select-width-me"></el-input>
            </el-form-item>

            <!--联系方式-->
            <el-form-item label="联系方式:" prop="telephone_add" class="lz-item-set">
              <el-input v-model="ruleFormEdit.telephone_add" placeholder="请输入电话" size="small" maxlength="11"
                        class="select-width-me"></el-input>
            </el-form-item>

          </el-form>

        </div>
        <div class="lz-addfoot">
          <!--<el-button type="primary" @click="submitForm('ruleFormEdit')" size="small">保存</el-button>-->
          <el-button type="primary" @click="submitFormEdit('ruleFormEdit')" size="small">保存</el-button>
          <el-button @click="resetFormEdit('ruleFormEdit')" size="small">取消</el-button>
        </div>
      </el-dialog>



      <!--筛选条件重新布局-->
      <div class="lz-filter">
        <div class="lz-filter-one">
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >地块名称</div>
            <el-input v-model="place_name" placeholder="输入地块名称" size="mini" style="width: 200px"></el-input>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >创建日期</div>

            <el-date-picker
              v-model="cjsj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" class="my-el-date-picker" size="mini" style="width: 200px">
            </el-date-picker>

          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name-two" >所属合作社</div>
            <el-select v-model="hzs_name_local" slot="append" placeholder="请选择" value-key="userId"
                       class="select-width-me-one" size="mini" clearable filterable style="width: 200px">
              <el-option v-for="item in plotHzsDataList" :key="item.userId" :label="item.booth_name"
                         :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="lz-filter-two">
          <el-button type="primary"  size="mini" @click="getList()">搜索</el-button>

          <el-button size="mini" type="text" @click="cleanTj()">清空筛选条件</el-button>

        </div>
      </div>

      <div class="lz-table-title">
        <div class="lz-table-title-left">

          <div class="lz-feilei-wai">
            <img class="lz-feilei" src="../../assets/images/fenleithree.png"/>
          </div>

          <div class="lz-span">全部地块信息</div>
          <!--<span>全部商品</span>-->

        </div>
        <div class="lz-table-title-right">
          <!--<el-button type="primary" id="open_btn" class="sf-but" @click="jumpAddLayout()" size="mini">新增商品品种</el-button>-->
          <el-button type="primary" @click="addView()" size="mini">新增地块</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="rctable">
        <el-table
          :data="plotDataList"
          style="width: 100% "
          :default-sort="{prop: 'date', order: 'descending'}"
          :cell-style="getRowheight"
          :header-cell-style="getRowClass">
          <el-table-column
            fixed
            prop="cjsj"
            min-width="98"
            label="创建日期"
          >
          </el-table-column>
          <el-table-column
            prop="place_name"
            label="地块名称"
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="面积"
          >
          </el-table-column>
          <el-table-column
            prop="pz"
            label="品种"
          >
          </el-table-column>
          <el-table-column
            prop="pick_date"
            label="预计采摘时间"
            min-width="109"
          >
          </el-table-column>
          <el-table-column
            min-width="100"
            prop="yieldaddUnit"
            label="预计产量"
          >
          </el-table-column>
          <el-table-column
            prop="fzrtel"
            label="地块负责人"
            min-width="170"
          >
          </el-table-column>
          <el-table-column
            prop="booth_name"
            label="所属合作社"
            min-width="150"
          >
          </el-table-column>

          <el-table-column label="操作" min-width="190">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="goView(scope.row)">
                查看农事记录
              </el-button>

              <el-button
                size="mini"
                type="text"
                @click="handleEditplot(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="ifDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="pageBlock">
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="totalPageSize">
        </el-pagination>

      </div>


    </div>

  </div>
</template>


<script>


  import {
    plotList,
    addFarmPlotPost,
    deleteFarmPlotPost,
    updateFarmPlotPost,
    plotHzsList
  } from "../../js/farmthings/farmworkget.js";

  import {
    nsGoodsQueryPOST,
  } from "../../js/farmthings/farmworkgoods.js";
  import {PlotBean} from './PlotBean';

  export default {
    name: '',
    components: {},
    data() {
      return {
        isclick:false,

        //修改后的合作社   品种
        hzs_name_local_bianji: '',
        hzs_name_local_bianji_lable: '',
        pz_name_local_bianji: null,
        pz_name_local_bianji_name: '',


//        验证开始
        ruleForm: {
          hzs_name_local: '',
          place_name_add: '',
          area_add: '',
          goods_name_search: '',
          yield_add: '',
          fzr_add: '',
          telephone_add: '',
          pick_date_add: '',
        },
        ruleFormEdit: {
          hzs_name_local_edit: '',
          place_name_add: '',
          area_add: '',
          goods_name_search: '',
          yield_add: '',
          fzr_add: '',
          telephone_add: '',
          pick_date_add: '',
          pz_add_Edit: '',
          ns_hzs_Edit: '',
          editDate: '',
        },
        rules: {
//          hzs_name_local: [
//            {required: true, message: '请选择合作社', trigger: 'change'},
////            {required: true, message: '请选择合作社', trigger: 'blur'},
//          ],
//
//          hzs_name_local_edit: [
//            {required: true, message: '请选择合作社', trigger: 'blur'},
//          ],

          place_name_add: [
            {required: true, message: '请输入地块名称', trigger: 'blur'},
          ],
          area_add: [
            {required: true, message: '请输入面积', trigger: 'blur'},
          ],

//          goods_name_search: [
//            {required: true, message: '请选择品种', trigger: 'change'},
////            {required: true, message: '请选择品种', trigger: 'blur'},
//          ],

          yield_add: [
            {required: true, message: '请输入预产量', trigger: 'blur'},
          ],

          fzr_add: [
            {required: true, message: '请输入负责人', trigger: 'blur'},
          ],

          telephone_add: [
//            {required: true, message: '请输入电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入正确的电话', trigger: 'blur'}
          ],

//          pick_date_add: [
////            {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
//            {type: 'string', required: true, message: '请选择日期', trigger: 'blur'}
//          ],


        },


//        上面是验证
        plotDataList: [],
        plotHzsDataList: [],
        plotHzsDataListEdit: [],

//        合作社数据
        hzs_name_local: {},
        hzs_name_local_id: '',
        hzs_name_local_id_final: '',
        hzs_name_local_id_final_two: '',
        hzs_name_local_add: {},
//品种
        ns_sp_list_type: [],
        goods_name_search: '',
//        搜索条件

//            查询列表的参数
        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',

        page: '',
        cols: '',
        total_local: 0,
//        userId: "28",
        userId: "",
        place_name: "",
        cjsj: "",

//        新增地块字段
        plotNamesr: '',
        place_name_add: "",
        area_add: "",
        pz_add: "",
        pick_date_add: "",
        yield_add: "",
        telephone_add: "",
        plot_id: "",
        fzr_add: "",
        img_url: "/nsjd/1111111000.jpg",
//        userId: "28",
        localuserId: "",
        localnodeid: "",

//        删除id
        idPost: '',
        centerDialogVisible: false,
        centerEditDialogVisible: false,


      }
    },

    methods: {
//      开始验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addNewPlot(this.$refs[formName]);
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false;
      },

//      结束验证

//     编辑开始验证
      submitFormEdit(formNameEdit) {
        if(this.ruleFormEdit.hzs_name_local instanceof Object){

          this.hzs_name_local_id_final = this.ruleFormEdit.hzs_name_local.userId;
          this.ruleFormEdit.hzs_name_local = this.ruleFormEdit.hzs_name_local.booth_name;
        }else {
          this.hzs_name_local_id_final = this.ruleFormEdit.userId;
          this.ruleFormEdit.hzs_name_local = this.ruleFormEdit.ns_hzs_Edit;

        };



        //    品种

        console.info(this.ruleFormEdit.goods_name_search);

        if (typeof(this.ruleFormEdit.goods_name_search) != "undefined") {

          this.ruleFormEdit.goods_name_search = this.ruleFormEdit.goods_name_search;
        } else {
          // this.ruleFormEdit.goods_name_search = this.ruleFormEdit.goods_name_search = this.ruleFormEdit.pz_add_Edit;

          this.ruleFormEdit.goods_name_search  = this.ruleFormEdit.pz_add_Edit;
          // alert(this.ruleFormEdit.goods_name_search);
        };

//        日期
        if (typeof(this.ruleFormEdit.pick_date_add) != "undefined") {

          this.ruleFormEdit.pick_date_add = this.ruleFormEdit.pick_date_add;

        } else {
          this.ruleFormEdit.pick_date_add = this.ruleFormEdit.pick_date_add = this.ruleFormEdit.editDate;
        };

        this.$refs[formNameEdit].validate((valid) => {
          if (valid) {
            console.info(this.$refs[formNameEdit]);
            this.updatePlot(this.$refs[formNameEdit]);
          } else {
            return false;
          }
        });
      },
      resetFormEdit(formNameEdit) {
        this.$refs[formNameEdit].resetFields();
        this.centerEditDialogVisible = false;
      },

//      结束验证

      pzxuanze(){
        console.info('hhhh')
        console.log(this.ruleFormEdit.goods_name_search)
      },


      goView(viewId) {
        this.$router.push({path: 'viewrecord', query: {viewFarm: viewId}})
      },

      deleteRow(index, rows) {
        this.deletePlot(rows.id);
      },

//      删除地块后台服务器数据
      deletePlot(a) {
        let deleteParams = {
          id: a,
        };

        deleteFarmPlotPost(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getList(this.page_local);

          })
          .catch(() => {
            this.$message.error("出错啦!");
          })


      },


//      关闭按钮
      handleClose(done) {

        done();
        // 点击关闭 数据重置
        this.$refs['ruleForm'].resetFields();

      },

      //      关闭按钮
      handleCloseEdit(done) {

        done();
        // 点击关闭 数据重置
        this.$refs['ruleFormEdit'].resetFields();

      },


//      编辑地块
      handleEditplot(index, row) {
        this.centerEditDialogVisible = true;
        this.ruleFormEdit = row;
        console.log(row);
        this.ruleFormEdit.place_name_add = row.place_name;
        this.ruleFormEdit.ns_hzs_Edit = row.booth_name;
//        this.ruleFormEdit.hzs_name_local = row.booth_name;
        this.pz_name_local_bianji = row.pzid;
        this.hzs_name_local_bianji = row.userId.toString();

        this.pick_date_add = this.dateFormatter(new Date(row.pick_date), false);
        this.ruleFormEdit.area_add = row.area;
        this.ruleFormEdit.pz_add_Edit = row.pz;
        this.ruleFormEdit.editDate = row.pick_date;
        this.ruleFormEdit.yield_add = row.yield;
        this.ruleFormEdit.fzr_add = row.fzr;
        this.ruleFormEdit.telephone_add = row.telphone;
        this.ruleFormEdit.plot_id = row.id;
        this.ruleFormEdit.hzs_name_local_id = row.userId;
      },

      hzsName_change(selVal) {
        this.$set(this.ruleFormEdit.hzs_name_local_edit = selVal.booth_name);
      },

//      验证电话号码
      isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
          this.$message.success('请检查电话号码输入是否正确');
        } else {
          return str;
        }
      },


//      新增地块
      addNewPlot(getDataObject) {

        this.centerDialogVisible = false;

        if (this.isPoneAvailable(getDataObject.model.telephone_add) != undefined) {
          console.info(getDataObject.model.goods_name_search);

          let addparams = {
            place_name: getDataObject.model.place_name_add,
            area: getDataObject.model.area_add,
            pz: getDataObject.model.goods_name_search.goods_Name,//准备添加字段品种id
            pzid:getDataObject.model.goods_name_search.id,
            pick_date: getDataObject.model.pick_date_add,
            yield: getDataObject.model.yield_add,
            telphone: this.isPoneAvailable(getDataObject.model.telephone_add),
            fzr: getDataObject.model.fzr_add,
            img_url: "/nsjd/1111111000.jpg",
            biz_id: getDataObject.model.hzs_name_local.userId,
            userId: this.localuserId,
          };

          addFarmPlotPost(addparams)
            .then(res => {
              this.$message.success(res.message);
              this.hzs_name_local = '';
              this.getList(this.page_local);
              this.closeWindowEdit();
              getDataObject.resetFields();
            })
            .catch(() => {
              this.$message.error(res.message);
            })
        } else {
          this.$message.error('请检查电话号码输入是否正确');
          this.centerDialogVisible = true;
        }
        ;


      },


      //      加验证的编辑地块
      updatePlot(getDataObject) {

        this.centerEditDialogVisible = false;

        console.log('==='+this.pz_name_local_bianji);

        if (this.isPoneAvailable(getDataObject.model.telephone_add) != undefined) {

          let addparams = {
            place_name: getDataObject.model.place_name_add,
            area: getDataObject.model.area_add,
            pz: this.getPZlable(this.pz_name_local_bianji),
            pzid: this.pz_name_local_bianji,
            // pz: this.ruleFormEdit.goods_name_search.goods_Name,
//            pz: this.ruleFormEdit.goods_name_search,
//             pzid:this.ruleFormEdit.goods_name_search.id,
            pick_date: this.pick_date_add,
            yield: getDataObject.model.yield_add,
            telphone: getDataObject.model.telephone_add,
            fzr: getDataObject.model.fzr_add,
            img_url: "/nsjd/1111111000.jpg",
            id: getDataObject.model.plot_id,
            // biz_id: this.hzs_name_local_id_final,
            biz_id: this.hzs_name_local_bianji,
            userId: this.localuserId,

          };
          updateFarmPlotPost(addparams)
            .then(res => {
              this.$message.success(res.message);
              this.hzs_name_local = '';
              this.getList(this.page_local);
              getDataObject.resetFields();
            })
            .catch(() => {
              this.$message.error(res.message);
            })
        } else {
          this.$message.error('请检查电话号码输入是否正确');
          this.centerEditDialogVisible = true;
        }
        ;


      },




      //      关闭窗口
      closeWindowEdit() {
        this.centerEditDialogVisible = false;
        this.centerDialogVisible = false;
        this.place_name_add = '';
        this.area_add = '';
        this.pz_add = '';
        this.pick_date_add = '';
        this.yield_add = '';
        this.fzr_add = '';
        this.telephone_add = '';
        this.goods_name_search = "";
        this.ruleForm = {};
        this.rules.hzs_name_local = [];
        this.rules.goods_name_search = [];


      },

//          获取地块list
      getList(currentPageLocal) {

        let params = {
          page: currentPageLocal,
          cols: "10",
          total: this.total_local.toString(),
          userId: this.hzs_name_local.userId,
          place_name: this.place_name,
          cjsj: this.cjsj,
          node_id: this.localnodeid,
        }

        this.getPlotList(params);
      },


      //   品种通过id获取名称
      getPZlable(pzvalue) {

        for (let i = 0; i < this.ns_sp_list_type.length; i++) {
          if (this.ns_sp_list_type[i].id === pzvalue) {
            return this.ns_sp_list_type[i].goods_Name;
          }
        }

      },

      getPlotList(params) {
        plotList(params)
          .then(res => {
            this.currentPage = parseInt(res.data.condition.page);
            this.totalPageSize =parseInt(res.data.condition.total) ;
            this.plotDataList = [];
            for (var item of res.data.dataList) {
              let plot = new PlotBean();
              plot.area = item.area;
              plot.booth_name = item.booth_name;
              plot.cjsj = item.cjsj;
              plot.fzr = item.fzr;
              plot.fzrtel = item.fzr + "(" + item.telphone + ")";
              plot.id = item.id;
              plot.node_id = item.node_id;
              plot.node_name = item.node_name;
              plot.pz = item.pz;
              plot.pzid = item.pzid;
              plot.telphone = item.telphone;
              plot.userId = item.userId;
              plot.yield = item.yield;
              plot.yieldaddUnit = item.yield+"(公斤)";
              plot.pick_date = item.pick_date;
              plot.place_name = item.place_name;
//              plot.img_url=item.img_url;
              this.plotDataList.push(plot)

            }
          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },

      //          获取合作社list
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
            this.plotHzsDataListEdit = res.data.dataList;

          })
          .catch(() => {
            this.$message.error(res.message);
          })
      },


//      是否删除

      ifDelete(index, rows) {
        this.$confirm('此操作将永久删除该地块, 是否继续?', '提示', {
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
      cleanTj() {
        this.cjsj = '';
        this.place_name = '';
        this.hzs_name_local = '';
        this.getList(this.page_local);
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#F5F5F5;height:40px; padding: 0px 0; '
        } else {
          return ''
        }
      },

      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'


      },

//分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getList(this.page_local);
      },


      //      获取商品类别
      getListNSsptype() {
        let params = {
          page: 1,
          cols: 10000,
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


//      新增布局
      addView() {
        this.centerDialogVisible = true;

      },

      //      格式化日期
      dateFormatter(str) {//默认返回yyyy-MM-dd HH-mm-ss
        var hasTime = arguments[1] != false ? true : false;//可传第二个参数false，返回yyyy-MM-dd
        var d = new Date(str);
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        if (hasTime) {
          return [year, month, day].join('-') + " " + [hour, minute, second].join(':');
        } else {
          return [year, month, day].join('-');
        }
      },


    },
    mounted() {
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.localnodeid = JSON.parse(localStorage.getItem('nodeidlocal'));
      this.getList(this.page_local);
      this.getHzsList();
      this.getListNSsptype();
    },

  }
</script>

<style scoped lang='less'>
  @lz-filter-name-width:70px;

  .lz-table-title {
    /*width: 90%;*/
    margin-top: 20px;
    height: 40px;
    display: flex;
    .lz-table-title-left {
      flex: 1;
      display: flex;
      /*border: 1px solid red;*/
      align-items: center;
      .lz-span{
        font-size: 13px;
        margin-bottom: 2px;
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
    height: 130px;
    /*margin-top: 12px;*/
    font-size: 14px;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    color:black;
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

    }
    .lz-filter-two{
      flex: 1;
      display: flex;
      /*align-items: flex-start;*/
      align-items: center;
      margin-left: 115px;
    }
  }

  .lz-dialog-content {
    width: 588px;
    display: flex;
    justify-content: center;
  }

  .lz-addfoot {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }

  .lz-item-set {
    margin-top: 24px;
  }

  .hands {
    cursor: pointer;
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
      border-bottom: 0.5px solid gray;
    }
  }

  .syacontent {

    background: #fff;
    padding: 10px;
    height: 100%;

  }

  .select-width-me {
    width: 450px;
  }

  .select-width-me {
    width: 300px;
  }

  .select-width-me-one {
    width: 300px;
  }

  .tjsf-div2-row {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .left {
      width: 88px;
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

  .tjsf-foot {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    margin-top: 114px;
  }

  .my-el-date-picker {
    width: 253px;
  }

  #open_btn {
  }

  #open_btn_edit {
  }

  #close-button {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }

  #close-button-edit {
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

  #background-edit {
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
    height: 550px;
    font-size: 14px;
    margin: 12% auto;
    overflow: auto;
  }

  /*农事记录*/
  .div1-ns {
    background: #ffffff;
    width: 438px;
    height: 325px;
    margin: 23% auto;
    overflow: auto;
  }

  span {
    color: white;
    padding-top: 12px;
    cursor: pointer;
    padding-right: 15px;
  }

  .div2 {
    margin: auto;
    height: 320px;
    padding: 0 20px;
    margin-top: 10px;
  }

  .div2-ns {
    margin: auto;
    padding: 0 20px;
    margin-top: 10px;
  }

  .rcbody {

    .rcfilter {
      height: 130px;
      margin-top: 12px;
      background-color: #F5F5F5;
      position: relative;
      font-size: 14px;
      .rcfilter-one {
        position: absolute;
        margin-left: 42px;
        margin-top: 24px;
        height: 20px;


        .rcfilter-one-rowone {
          display: flex;
          .left {
            width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            .one {
              width: 100px;
            }
          }
          .right {
            margin-left: 20px;
          }

        }

        .rcfilter-one-rowtwo {
          margin-top: 21px;
          margin-left: 75px;
        }
      }
    }
    .rctable {
      /*margin-top: 19px;*/
      border-top: 1px solid #f4f4f4;
      border-left: 1px solid #f4f4f4;
      border-right: 1px solid #f4f4f4;
    }
  }

  .btn_block {
    display: block;
  }

  .pageBlock {
    height: 80px;
    margin-top: 11px;
    display: flex;
    justify-content: center;
  }


</style>
