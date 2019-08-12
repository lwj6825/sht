<template>
  <div class="syacontent recording">
    <div class="rcbody">
      <!--加验证新增地块-->
      <el-dialog title="新增地块" :visible.sync="centerDialogVisible" :before-close="handleClose" :close-on-click-modal = "isclick"
        width="650px">
        <div class="lz-dialog-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <!--所属合作社-->
            <el-form-item label="所属企业:" prop="hzs_name_local">
              <el-select v-model="ruleForm.hzs_name_local" placeholder="请选择合作社" value-key="userId"class="select-width-me" 
              filterable clearable size="small">
                <el-option v-for="item in plotHzsDataList" :key="item.userId" :label="item.booth_name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <!--地块名称-->
            <el-form-item label="地块名称:" prop="place_name_add" class="lz-item-set">
              <el-input v-model="ruleForm.place_name_add" placeholder="请输入地块名称" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--面积-->
            <el-form-item label="面积(亩):" prop="area_add" class="lz-item-set">
              <el-input v-model="ruleForm.area_add" placeholder="请输入面积" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--品种-->
            <el-form-item label="品种:" prop="goods_name_search" class="lz-item-set">
              <el-select v-model="ruleForm.goods_name_search" placeholder="请选择品种" class="select-width-me" filterable 
              size="small" value-key="id" clearable>
                <el-option v-for="item in ns_sp_list_type" :key="item.id" :label="item.goods_Name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <!--预计采摘时间-->
            <el-form-item label="预计采摘时间:" required class="lz-item-set">
              <el-col>
                <el-form-item prop="pick_date_add">
                  <el-date-picker v-model="ruleForm.pick_date_add" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" 
                  class="select-width-me" size="small" clearable> </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!--预产量-->
            <el-form-item label="预产量(kg):" prop="yield_add" class="lz-item-set">
              <el-input v-model="ruleForm.yield_add" placeholder="请输入预产量" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--地块负责人-->
            <el-form-item label="地块负责人:" prop="fzr_add" class="lz-item-set">
              <el-input v-model="ruleForm.fzr_add" placeholder="请输入地块负责人" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--联系方式-->
            <el-form-item label="联系方式:" prop="telephone_add" class="lz-item-set">
              <el-input v-model="ruleForm.telephone_add" placeholder="请输入电话" size="small" maxlength="11" class="select-width-me" 
              clearable></el-input>
            </el-form-item>
            <!--<el-form-item label="地块介绍:" class="lz-item-set">
              <el-input v-model="ruleForm.dkjs" type="textarea" class="select-width-me"></el-input>
            </el-form-item>-->
            <el-form-item label="上传图片:">
              <div class="msg-item">   
                <!--<div class="img-list">
                  <ul>
                    <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                      <figure class="image">
                        <p class="icon-delete" @click="removeFun(index)">-</p>
                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' +item.img_url">
                      </figure>
                    </li>
                  </ul>
                </div>-->
                <div>
                  <div class="submit">
                    上传图片
                    <form id="upload" enctype="multipart/form-data" method="post"> 
                      <input type="file" class="file" ref="file" @change="fileFun($event)">
                    </form>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="lz-addfoot">
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">取消</el-button>
        </div>
      </el-dialog>
      <!--加验证编辑地块-->
      <el-dialog title="编辑地块" :visible.sync="centerEditDialogVisible" :before-close="handleCloseEdit" :close-on-click-modal="isclick"
        width="650px">
        <div class="lz-dialog-content">
          <el-form :model="ruleFormEdit" ref="ruleFormEdit" label-width="120px">
            <!--所属合作社-->
            <el-form-item label="所属企业:" >
              <el-select v-model="hzs_name_local_bianji" class="select-width-me" filterable size="small" clearable>
                <el-option v-for="item in plotHzsDataListEdit" :key="item.userId" :label="item.booth_name"
                  :value="item.userId"></el-option></el-select>
            </el-form-item>
            <!--地块名称-->
            <el-form-item label="地块名称:" class="lz-item-set">
              <el-input v-model="ruleFormEdit.place_name_add" placeholder="请输入地块名称" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--面积-->
            <el-form-item label="面积(亩):" class="lz-item-set">
              <el-input v-model="ruleFormEdit.area_add" placeholder="请输入面积" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--品种-->
            <el-form-item label="品种:"  >
              <el-select v-model="pz_name_local_bianji" class="select-width-me"  size="small">
                <el-option v-for="item in ns_sp_list_type" :key="item.id" :value="item.id" :label="item.goods_Name" clearable></el-option>
              </el-select>
            </el-form-item>
            <!--预计采摘时间-->
            <el-form-item label="预计采摘时间:"  class="lz-item-set">
              <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="pick_date_add" class="select-width-me" size="small"
                :clearable="isclick"></el-date-picker>
                
            </el-form-item>
            <!--预产量-->
            <el-form-item label="预产量(kg):" class="lz-item-set">
              <el-input v-model="ruleFormEdit.yield_add" placeholder="请输入预产量" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>

            <!--地块负责人-->
            <el-form-item label="地块负责人:" class="lz-item-set">
              <el-input v-model="ruleFormEdit.fzr_add" placeholder="请输入地块负责人" size="small" class="select-width-me" clearable></el-input>
            </el-form-item>

            <!--联系方式-->
            <el-form-item label="联系方式:" class="lz-item-set">
              <el-input v-model="ruleFormEdit.telephone_add" placeholder="请输入电话" size="small" maxlength="11" 
                class="select-width-me" clearable></el-input>
            </el-form-item>
            <!--<el-form-item label="地块介绍:" class="lz-item-set">
              <el-input v-model="ruleForm.dkjs" type="textarea" class="select-width-me"></el-input>
            </el-form-item>-->
            <el-form-item label="上传图片:">
              <div class="msg-item">   
                <div class="img-list">
                  <ul>
                    <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                      <figure class="image">
                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                      </figure>
                    </li>
                  </ul>
                </div><!---->
                <div>
                  <div class="submit">
                    上传图片
                    <form id="upload" enctype="multipart/form-data" method="post"> 
                      <input type="file" class="file" ref="file" @change="fileFun($event)">
                    </form>
                  </div>
                </div>
              </div>
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
            <el-input v-model="place_name" placeholder="输入地块名称" size="mini" style="width: 170px"></el-input>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name" >创建时间</div>
            <!--<el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd" type="daterange" 
              @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>-->
            <el-date-picker v-model="cjsj" type="date" value-format="yyyy-MM-dd"
              placeholder="选择日期" class="my-el-date-picker" size="mini" style="width: 200px">
            </el-date-picker>
          </div>
          <div class="lz-filter-one-style">
            <div class="lz-filter-name-two" >所属企业</div>
            <el-select v-model="hzs_name_local" slot="append" placeholder="请选择" value-key="userId"
              class="select-width-me-one" size="mini" clearable filterable style="width: 170px">
              <el-option v-for="item in plotHzsDataList" :key="item.userId" :label="item.booth_name" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="lz-filter-two">
          <el-button type="primary" class="search-btn" size="mini" @click="getList()">搜索</el-button>
          <el-button size="mini" class="span-clear" type="text" @click="cleanTj()">清空筛选条件</el-button>
        </div>
      </div>
      <div class="lz-table-title">
        <div class="lz-table-title-left">
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
        <el-table :data="plotDataList" style="width: 100% " :default-sort="{prop: 'date', order: 'descending'}"
          :cell-style="getRowheight" :header-cell-style="getRowClass">
          <el-table-column fixed prop="cjsj" min-width="98" label="创建日期" > </el-table-column>
          <el-table-column prop="place_name" label="地块名称" >
          </el-table-column>
          <el-table-column prop="area" label="面积" > </el-table-column>
          <el-table-column prop="pz" label="品种" >
          </el-table-column>
          <el-table-column prop="pick_date" label="预计采摘时间" min-width="109" > </el-table-column>
          <el-table-column min-width="100" prop="yieldaddUnit" label="预计产量" >
          </el-table-column>
          <el-table-column prop="fzrtel" label="地块负责人" min-width="170" > </el-table-column>
          <el-table-column prop="booth_name" label="所属企业" min-width="150" > </el-table-column>
          <el-table-column label="操作" min-width="190">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="goView(scope.row)">查看农事记录</el-button>
              <el-button size="mini" type="text" @click="handleEditplot(scope.row)">修改</el-button>
              <el-button size="mini" type="text" @click="ifDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageBlock">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="totalPageSize">
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
  import { nsGoodsQueryPOST, } from "../../js/farmthings/farmworkgoods.js";
  import {PlotBean} from './PlotBean';
  import {baseUrl,baseUrl2} from '../../js/address/url.js'
  import axios from 'axios';
  // 时间戳转日期格式
  function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate();
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
  export default {
    name: '',
    components: {},
    data() {
      return {
        isclick:false,
        // 修改后的合作社   品种
        hzs_name_local_bianji: '',
        hzs_name_local_bianji_lable: '',
        pz_name_local_bianji: null,
        pz_name_local_bianji_name: '',
        // 验证开始
        ruleForm: {
          hzs_name_local: '',
          place_name_add: '',
          area_add: '',
          goods_name_search: '',
          yield_add: '',
          fzr_add: '',
          telephone_add: '',
          pick_date_add: '',
          dkjs: '',
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
          place_name_add: [
            {required: true, message: '请输入地块名称', trigger: 'blur'},
          ],
          area_add: [
            {required: true, message: '请输入面积', trigger: 'blur'},
          ],
          yield_add: [
            {required: true, message: '请输入预产量', trigger: 'blur'},
          ],

          fzr_add: [
            {required: true, message: '请输入负责人', trigger: 'blur'},
          ],

          telephone_add: [
            {min: 11, max: 11, message: '请输入正确的电话', trigger: 'blur'}
          ],
        },
        // 上面是验证
        plotDataList: [],
        plotHzsDataList: [],
        plotHzsDataListEdit: [],
        // 合作社数据
        hzs_name_local: {},
        hzs_name_local_id: '',
        hzs_name_local_id_final: '',
        hzs_name_local_id_final_two: '',
        hzs_name_local_add: {},
        // 品种
        ns_sp_list_type: [],
        goods_name_search: '',
        // 搜索条件
        // 查询列表的参数
        currentPage: 0,
        totalPageSize: 0,
        page_local: '1',
        page: '',
        cols: '',
        total_local: 0,
        // userId: "28",
        userId: "",
        place_name: "",
        cjsj: "",
        // 新增地块字段
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
        // userId: "28",
        localuserId: "",
        localnodeid: "",
        // 删除id
        idPost: '',
        centerDialogVisible: false,
        centerEditDialogVisible: false,
        imgUrl: '',
        form: {
          dataTime: ''
        },
        startTime: '',
        endTime: '',
        imgArr1: [],
        imgArr: []
      }
    },
    mounted() {
      this.getTime()
      let arr = []
      arr.push(this.startTime)
      arr.push(this.endTime)
      this.form.dataTime = arr
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.localnodeid = JSON.parse(localStorage.getItem('nodeidlocal'));
      this.getList(this.page_local);
      this.getHzsList();
      this.getListNSsptype();
    },
    methods: {
      removeFun(ele){
        // this.imgArr1.splice(ele,1)
        // this.imgArr1.length - 1
      },
      timeChange(ele){
        if(this.form.dataTime){
          this.startTime = this.form.dataTime[0]
          this.endTime = this.form.dataTime[1]
        }else{
          this.getTime()
        }
      },
      getTime(){
          var start = new Date();
          var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.startTime = timestampToTime(startTime)
          var currentTime = new Date()
          this.endTime = formatDate(currentTime)
      },
      fileFun(event){
        var that = this;
        let file = event.target.files;
        let reg = /.(jpg|png|PNG|JPG)+$/;           
        if(file[0].size){
          let point = file[0].name.indexOf('.');
          if(!reg.test((file[0].name).slice(point))){
            this.$message.error("上传图片格式不支持");
            return;
          }
          let size = file[0].size / 1024 / 1024 ;
          if(size > 0.5){
            that.clarity = 0.5/size;
          }else{
            that.clarity = 1;
          }
          let reader = new FileReader();
          reader.readAsDataURL(file[0]); 
          reader.onload = function(){                    
            that.imgFun(reader.result,that.clarity,function(src){
              that.imgArr.push(src.slice(23))
            })
          }
        }
        // let timer = setInterval(()=>{
        //   if(that.imgArr.length == file.length){
        //     let formData = new FormData()  
        //     formData.append('img_url', that.imgArr[0]);   
        //     formData.append('node_id', that.node_id);  
        //     formData.append('id', that.form.goodsID); 
        //     let config = {
        //       headers:{'Content-Type':'multipart/form-data'}
        //     };
        //     const ajaxPost = function (url, params,config) {
        //       return new Promise((resolve, reject) => {
        //         axios
        //           .post(url, params,{config})
        //           .then((res) => {
        //               resolve(res.data)
        //           })
        //           .catch(() => {
        //               reject('error')
        //           })
        //       })
        //     }  
        //     let url = baseUrl + 'goods/updateGoodsImgForTrace'
        //     ajaxPost(url,formData,config)
        //       .then(res => {
        //         that.imgArr = []
        //         that.imgUrl = res.data.img_url
        //       })
        //       .catch(res => {
        //         console.log(res)
        //       })
        //     clearInterval(timer);
        //   }
        // },1000)
      },
      imgFun(path,quality,callback){
        let img = new Image();
        img.src = path;
        img.onload = function(){
          let that = this;
          let w = that.width;
          let h = that.height;
          // console.log(w,h)
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d'); 
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh); 
            // 在canvas绘制前填充白色背景   
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(that, 0, 0, w, h);
          let base64 = canvas.toDataURL('image/jpeg', quality );
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      // 开始验证
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
      // 结束验证
      // 编辑开始验证
      submitFormEdit(formNameEdit) {
        if(this.ruleFormEdit.hzs_name_local instanceof Object){
          this.hzs_name_local_id_final = this.ruleFormEdit.hzs_name_local.userId;
          this.ruleFormEdit.hzs_name_local = this.ruleFormEdit.hzs_name_local.booth_name;
        }else {
          this.hzs_name_local_id_final = this.ruleFormEdit.userId;
          this.ruleFormEdit.hzs_name_local = this.ruleFormEdit.ns_hzs_Edit;
        };
        // 品种
        if (typeof(this.ruleFormEdit.goods_name_search) != "undefined") {
          this.ruleFormEdit.goods_name_search = this.ruleFormEdit.goods_name_search;
        } else {
          // this.ruleFormEdit.goods_name_search = this.ruleFormEdit.goods_name_search = this.ruleFormEdit.pz_add_Edit;
          this.ruleFormEdit.goods_name_search  = this.ruleFormEdit.pz_add_Edit;
          // alert(this.ruleFormEdit.goods_name_search);
        };
        // 日期
        if (typeof(this.ruleFormEdit.pick_date_add) != "undefined") {
          this.ruleFormEdit.pick_date_add = this.ruleFormEdit.pick_date_add;
        } else {
          this.ruleFormEdit.pick_date_add = this.ruleFormEdit.pick_date_add = this.ruleFormEdit.editDate;
        };
        this.$refs[formNameEdit].validate((valid) => {
          if (valid) {
            this.updatePlot(this.$refs[formNameEdit]);
          } else {
            return false;
          }
        });
      },
      resetFormEdit(formNameEdit) {
        this.hzs_name_local_bianji = ''
        this.pz_name_local_bianji = ''
        this.pick_date_add = ''
        this.imgArr = []
        this.$refs[formNameEdit].resetFields();
        this.centerEditDialogVisible = false;
      },
      // 结束验证
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
      // 删除地块后台服务器数据
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
      // 关闭按钮
      handleClose(done) {
        done()
        // 点击关闭 数据重置
        this.imgArr = []
        this.imgArr1 = []
        this.$refs['ruleForm'].resetFields();
      },
      // 关闭按钮
      handleCloseEdit(done) {
        done()
        // 点击关闭 数据重置
        this.hzs_name_local_bianji = ''
        this.pz_name_local_bianji = ''
        this.pick_date_add = ''
        this.imgArr = []
        this.imgArr1 = []
        this.$refs['ruleFormEdit'].resetFields();
      },
      // 编辑地块
      handleEditplot(row) {
        this.centerEditDialogVisible = true;
        this.ruleFormEdit.place_name_add = row.place_name;
        this.ruleFormEdit.ns_hzs_Edit = row.booth_name;
        // this.ruleFormEdit.hzs_name_local = row.booth_name;
        this.pz_name_local_bianji = row.pzid;
        this.hzs_name_local_bianji = row.userId;
        this.pick_date_add = row.pick_date
        this.ruleFormEdit.area_add = row.area;
        this.ruleFormEdit.pz_add_Edit = row.pz;
        this.ruleFormEdit.editDate = row.pick_date;
        this.ruleFormEdit.yield_add = row.yield;
        this.ruleFormEdit.fzr_add = row.fzr;
        this.ruleFormEdit.telephone_add = row.telphone;
        this.ruleFormEdit.plot_id = row.id;
        this.ruleFormEdit.hzs_name_local_id = row.userId;
        let obj = {
          img_url: row.img_url
        }
        this.imgArr1.push(obj)
      },
      hzsName_change(selVal) {
        this.$set(this.ruleFormEdit.hzs_name_local_edit = selVal.booth_name);
      },
      // 验证电话号码
      isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
          this.$message.success('请检查电话号码输入是否正确');
        } else {
          return str;
        }
      },
      // 新增地块
      addNewPlot(getDataObject) {
        this.centerDialogVisible = false;
        if (this.isPoneAvailable(getDataObject.model.telephone_add) != undefined) {
          let addparams = {
            place_name: getDataObject.model.place_name_add,
            area: getDataObject.model.area_add,
            pz: getDataObject.model.goods_name_search.goods_Name,//准备添加字段品种id
            pzid:getDataObject.model.goods_name_search.id,
            pick_date: getDataObject.model.pick_date_add,
            yield: getDataObject.model.yield_add,
            telphone: this.isPoneAvailable(getDataObject.model.telephone_add),
            fzr: getDataObject.model.fzr_add,
            img_url: this.imgArr.length > 0 ? this.imgArr[0] : '',
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
        };
      },
      // 加验证的编辑地块
      updatePlot(getDataObject) {
        this.centerEditDialogVisible = false;
        if (this.isPoneAvailable(getDataObject.model.telephone_add) != undefined) {
          let addparams = {
            place_name: getDataObject.model.place_name_add,
            area: getDataObject.model.area_add,
            pz: this.getPZlable(this.pz_name_local_bianji),
            pzid: this.pz_name_local_bianji,
            // pz: this.ruleFormEdit.goods_name_search.goods_Name,
            // pz: this.ruleFormEdit.goods_name_search,
            // pzid:this.ruleFormEdit.goods_name_search.id,
            pick_date: this.pick_date_add,
            yield: getDataObject.model.yield_add,
            telphone: getDataObject.model.telephone_add,
            fzr: getDataObject.model.fzr_add,
            img_url: this.imgArr.length > 0 ? this.imgArr[0] : '',
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
        };
      },
      // 关闭窗口
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
      // 获取地块list
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
      // 品种通过id获取名称
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
              plot.img_url = item.img_url;
              this.plotDataList.push(plot)
            }
          })
          .catch((res) => {
            console.log(res)
          })
      },
      // 获取合作社list
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
          .catch((res) => {
            console.log(res)
          })
      },
      // 是否删除
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
        this.form = {
          dataTime: '',
        }
        this.getTime()
        this.page = 1
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
      // 分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getList(this.page_local);
      },
      // 获取商品类别
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
      // 新增布局
      addView() {
        this.centerDialogVisible = true;
      },
      // 格式化日期
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

  }
</script>

<style scoped lang='less'>
  @lz-filter-name-width:70px;
  .el-form{
    width: 500px;
  }
  .search-btn{
    margin-top: 2px;
    margin-right: 10px;
    color: #409EFF;
    background: #fff;
  }
  .msg-item{
    margin: 10px 0;
    width: 500px;
    display: flex;
    .submit{
      margin: 0 30px;
      position: relative;
      left: 0;
      top: 20%;
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
    .img-list{
      ul{
        display: flex;
        flex-wrap:wrap;
        li{
          position: relative;
          top: 0;
          left: 0;
          margin: 10px;
          .icon-delete{
            position: absolute;
            top: -6px;
            right: -6px;
            width: 12px;
            height: 12px;
            text-align: center;
            line-height: 7px;
            font-size: 24px;
            background: #990000;
            color: #fff;
            border-radius: 50%;
            cursor: pointer;
          }
          img{
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
  .span-clear {
    color: #999999;
    margin-left: 15px;
    cursor: pointer;
    font-size: 14px;
  }
  .box-fileimg{
    display: flex;
    width: 300px;
    height: 100px;
    .submit{
      position: relative;
      top: 36%;
      left: 10px;
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
        top: 0;
        width: 90px;
        height: 36px;
        opacity: 0;
        background: rgba(0,0,0,0);
      }
    }
    .image{
      width: 200px;
      height: 100px;
      vertical-align: middle;
      border: 1px solid #eaeaea;
      overflow: hidden;
      box-sizing: border-box;
      img{
        display: block;
        border: none;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .lz-table-title {
    padding: 0 10px;
    height: 40px;
    display: flex;
    background: #fff;
    .lz-table-title-left {
      flex: 1;
      display: flex;
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
    }
    .lz-table-title-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .lz-filter {
    margin-bottom: 10px;
    background: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    color:black;
    .lz-filter-one{
      margin: 10px 0 10px 20px;
      flex: 1;
      width: 950px;
      display: flex;
      align-items: center;
      .lz-filter-one-style{
        margin-right: 20px;
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
      margin-bottom: 10px;
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 20px;
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
      padding: 10px;
      background: #fff;
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
    display: flex;
    justify-content: center;
    background: #fff;
  }
</style>
<style lang="less">
  .recording{
    .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
      line-height: 24px;
    }
    .el-dialog{
      margin: 20px auto !important;
    }
  }
</style>
