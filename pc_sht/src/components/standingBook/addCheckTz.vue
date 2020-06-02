<template>
  <div class="lz-content-jc">
    <div class="lz-form-style" v-if="!msg_id">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="检测日期" prop="name">
          <el-date-picker v-model="local_check_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商户名称" prop="name" v-show="isShowMerchant">
          <el-select v-model="local_booth_name" filterable placeholder="请选择" @change="getStallNo" style="width: 300px">
            <el-option v-for="item in local_booth_name_options" :key="item.bootList[0].shop_booth_id"
              :label="item.bootList[0].booth_name" :value="item.bootList[0].shop_booth_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摊位号" prop="name" v-show="isShowMerchant">
          <el-input v-model="local_stall_no" :disabled="true" placeholder="选择商户后自动填充"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-radio-group v-model="goodsType">
            <el-radio label="进货" name="goodsType" value="进货" @change="goodsTypesFun(1)"></el-radio>
            <el-radio label="销售" name="goodsType" value="销售" @change="goodsTypesFun(2)"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检测商品" prop="name">
          <el-select v-model="local_check_good" placeholder="请选择" size="small" value-key="ID" filterable style="width: 300px"
            @change="getGoodsNameFirst">
            <el-option v-for="item in local_check_good_options" :key="item.ID" :label="item.GOODS_NAME"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测结果" prop="name">
          <el-select v-model="local_check_result" filterable placeholder="请选择" style="width: 300px">
            <el-option v-for="item in check_result_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="local_remark"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="desc">
          <div class="msg-item">   
            <div class="img-list">
              <ul>
                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                  <figure class="image">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                  </figure>
                </li>
              </ul>
            </div>
            <div>
              <div class="submit">
                添加图片
                <form id="upload" enctype="multipart/form-data" method="post"> 
                  <input type="file" class="file" ref="file" @change="fileFun($event)">
                </form>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="检测项目">
          <el-input v-model="check_project"></el-input>
        </el-form-item>
        <el-form-item label="检测值">
          <el-input v-model="standard_value"></el-input>
        </el-form-item>
        <el-form-item label="检测标准">
          <el-input v-model="check_standard"></el-input>
        </el-form-item>
        <el-form-item label="检测结果值">
          <el-input v-model="check_res"></el-input>
        </el-form-item><!---->
        <el-form-item label="检测人">
          <el-input v-model="check_person"></el-input>
        </el-form-item>
        <el-form-item label="检测机构">
          <el-input v-model="check_mechanism"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormLz">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-form :model="ruleForm" ref="ruleForm" label-width="220px" class="demo-ruleForm">
        <el-form-item label="检测日期" prop="name">{{local_check_date}}</el-form-item>
        <el-form-item label="商户名称" prop="name">{{booth_name}}</el-form-item>
        <el-form-item label="摊位号" prop="name">{{local_stall_no}}</el-form-item>
        <el-form-item label="商品类型">{{goodsType}}</el-form-item>
        <el-form-item label="检测商品" prop="name">{{check_good}}</el-form-item>
        <el-form-item label="检测结果" prop="name">
          <p v-if="local_check_result == 0">不合格</p>
          <p v-else-if="local_check_result == 1">合格</p>
          <p v-else>未知</p>
        </el-form-item>
        <el-form-item label="备注" prop="desc">{{local_remark}}</el-form-item>
        <el-form-item label="上传图片" prop="desc">
          <div class="img_group">
          <img style="width: 50px;height: 50px; margin-right: 20px;" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com'+ img_url" v-if="img_url && file == ''">
            <!--<div class="img_box" v-for="(item,index) in imgArr" :key="index">-->
            <div v-for="(item,index) in imgArr" :key="index">
              <div class="img_show_box">
                <img style="width: 100%" :src="item" alt="">
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="检测项目">{{check_project}}</el-form-item>
        <el-form-item label="检测值">{{standard_value}}</el-form-item>
        <el-form-item label="检测标准">{{check_standard}}</el-form-item>
        <el-form-item label="检测结果值">{{check_res}}</el-form-item><!---->
        <el-form-item label="检测人">{{check_person}}</el-form-item>
        <el-form-item label="检测机构">{{check_mechanism}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {addCheckItem, updateCheck, uploadImgJc} from '../../js/address/url.js';
  import {purchase, getDefaultProductTypes,} from "../../js/goods/goods.js";
  import {GetSaleTz, GetAllBiz, Parse, jcpurchase,UpdateCheck, AddCheckItem} from '../../js/standingBook/standingBook.js'
  import axios from 'axios';
  export default {
    name: "saleTz",
    data() {
      return {
        isShowImg: true,
        imgData: '',
        imgArr: [],
        imgSrc: '',
        allowAddImg: true,
        showBaseCode: '',
        //  检测日期  商户名称  摊位号  检测商品   检测结果  备注
        local_check_date: '',
        local_booth_name: '',
        submit_booth_name: '',
        submit_biz_id: '',
        submit_shop_booth_id: '',
        local_booth_name_options: '',
        check_project: '', // 检测项目
        standard_value: '', // 检测值
        check_standard: '',  //检测标准
        check_res: '', // 检测结果值 
        check_person: '', // 检测人
        check_mechanism: '',  //检测机
        local_stall_no: '',
        local_check_good: [],
        local_check_good_options: [],
        goods_name_Arr: [],
        merchant_name_Arr: [],
        submit_goods_name: '',
        local_remark: '',
        local_region: '',
        local_region_name: '',
        local_node_id: '',
        local_node_name: '',
        //检测结果
        local_check_result: '',
        check_result_options: [{
          value: '1',
          label: '合格'
        }, {
          value: '0',
          label: '不合格'
        }],
        ruleForm: {},
        rules: {},
        isShowMerchant: true,
        goodsType: '销售',
        file: '',
        check_goods_code: '',
        msg_id: '',
        img_url: '',
        count: 1,
        booth_name: '',
        check_good: '',
        imgArr1: [],
      }
    },
    mounted() {
      this.isRegion = localStorage.getItem('isRegion');
      this.local_node_name = localStorage.getItem('loginName');
      this.local_node_id_id = localStorage.getItem('nodeidlocal');
      if (this.isRegion == 'false') {
        this.isShowMerchant = false;
        this.submit_shop_booth_id = localStorage.getItem('scShopId');
        this.submit_booth_name = this.local_node_name;
      }
      this.local_region = this.$route.query.areaId;
      this.local_region_name = this.$route.query.areaName;
      this.userId_local = localStorage.getItem('userId');
      this.local_node_id = localStorage.getItem('loginId');
      this.getGoodsFun(2)
      this.getMerchantsFun();
      if(this.$route.query.msg){
        let msg = JSON.parse(this.$route.query.msg)
        this.local_check_date = msg.check_date // 日期
        this.local_stall_no = msg.stall_no // 摊位号
        this.local_check_result = msg.check_result // 检测结果
        this.local_remark = msg.remark // 备注
        this.img_url = msg.img_url
        this.check_project = msg.check_project // 检测项目
        this.standard_value = msg.standard_value // 检测值
        this.check_standard = msg.check_standard // 检测标准
        this.check_res = msg.check_res // 检测结果值
        this.check_person = msg.check_person // 检测人
        this.check_mechanism = msg.check_mechanism // 检测机构
        this.msg_id = msg.id
        this.local_booth_name = msg.shop_booth_id
        this.booth_name = msg.booth_name
        this.check_good = msg.check_good
      }
    },
    methods: {
      fileFun(event){
        let that = this;
        this.file = event.target.files[0];
        let formData = new FormData();
        formData.append('img_url', this.file);   
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
          let url = uploadImgJc;
          ajaxPost(url,formData,config)
            .then(res => {
              if(res.result == true){
                let obj = {
                  img_url: res.data
                }
                let arr = []
                arr.push(obj)
                this.imgArr1.push(obj)
                this.$message.success(res.message);
              }else{
                this.$message.error(res.message);
              }
              this.file = null
            })
            .catch(res => {
              console.log(res)
            })
      },
      goodsTypesFun(ele){
        this.getGoodsFun(ele)
      },
      // 通过商品的值获取 对应的 商品名称
      getGoodsNameFirst(e) {
        let codeArr = []
        this.submit_goods_name = e.GOODS_NAME;
        this.check_goods_code = e.GOODS_CODE
        // for (let i = 0; i < e.length; i++) {
        //   codeArr.push(e[i].GOODS_CODE)
        //   this.submit_goods_name += e[i].GOODS_NAME.toString() + ',';
        // }
        // if(codeArr.length > 0){
        //   this.check_goods_code = codeArr.join(',')
        // }else{
        //   this.check_goods_code = ''
        // }
      },
      //获取摊位号码
      getStallNo(value) {
        for (let i = 0; i < this.local_booth_name_options.length; i++) {
          if (value == this.local_booth_name_options[i].bootList[0].shop_booth_id) {
            this.local_stall_no = this.local_booth_name_options[i].bootList[0].stall_no;
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      //  将图片转换成Base64位
      changeImg(e) {
        this.file = e.target.files[0];
      },
      deleteImg(index) {
        this.imgArr.splice(index, 1);
        if (this.imgArr.length < 5) {
          this.allowAddImg = true;
        }
      },
      //  表单提交数据
      submitFormLz() {
        let img_url = '';
        if(this.imgArr1.length > 0){
          this.imgArr1.forEach(val => {
            img_url += val.img_url + ','
          })
        }
        if(img_url != ''){
          img_url = img_url.substr(0, img_url.length - 1)
        }
        if(this.msg_id){
          if (this.submit_goods_name == '') {
            return false;
          }
          this.getMerchantName();
          let formData = new FormData();
          formData.append('node_id', this.local_node_id);
          formData.append('node_name', this.local_node_name);
          formData.append('region', this.local_region);
          formData.append('region_name', this.local_region_name);
          formData.append('biz_id', this.submit_biz_id);
          formData.append('shop_booth_id', this.submit_shop_booth_id);
          formData.append('booth_name', this.submit_booth_name);
          formData.append('stall_no', this.local_stall_no.toString());
          formData.append('check_good', this.submit_goods_name);
          formData.append('check_result', this.local_check_result);
          formData.append('remark', this.local_remark);
          formData.append('img', this.file);
          formData.append('check_date', this.local_check_date);
          formData.append('check_project', this.check_project); // 检测项目
          formData.append('standard_value', this.standard_value); // 检测值
          formData.append('check_standard', this.check_standard); //检测标准
          formData.append('check_res', this.check_res); //检测结果值 
          formData.append('check_person', this.check_person); // 检测人
          formData.append('check_mechanism', this.check_mechanism); //检测机
          formData.append('check_goods_code', this.check_goods_code); //选择商品的goods_code
          formData.append('id', this.msg_id); //选择商品的goods_code
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          // axios.post(updateCheck, formData, config).then((res) => {
          //   if (res.status === 200) {
          //     this.$message.success(res.data.message);
          //     this.$router.go(-1);
          //     this.submitclear();
          //     this.isShowImg = true;
          //     this.showBaseCode = '';
          //   }
          // })
        }else{
          if (this.submit_goods_name == '') {
            return false;
          }
          this.getMerchantName();
          // let params = {
          //   node_id: this.local_node_id,
          //   node_name: this.local_node_name,
          //   region: this.local_region,
          //   region_name: this.local_region_name,
          //   biz_id: this.submit_biz_id,
          //   shop_booth_id: this.submit_shop_booth_id,
          //   booth_name: this.submit_booth_name,
          //   stall_no: this.local_stall_no,
          //   check_good: this.submit_goods_name,
          //   check_result: this.local_check_result,
          //   remark: this.local_remark,
          //   img_url: img_url,
          //   check_date: this.local_check_date,
          //   check_project: this.check_project, // 检测项目
          //   standard_value: this.standard_value, // 检测值
          //   check_standard: this.check_standard, //检测标准
          //   check_res: this.check_res, //检测结果值 
          //   check_person: this.check_person, // 检测人
          //   check_mechanism: this.check_mechanism, //检测机
          //   check_goods_code: this.check_goods_code, //选择商品的goods_code
          // }
          // console.log(params)
          // AddCheckItem(params)
          //   .then(res => {
          //     if (res.result == true) {
          //       this.$message.success(res.message);
          //       this.$router.push({name: 'CheckTz'})
          //     }else{
          //       this.$message.error(res.message);
          //     }
          //   })
          //   .catch((res) => {
          //     console.log(res)
          //   })
          let formData = new FormData();
          formData.append('node_id', this.local_node_id);
          formData.append('node_name', this.local_node_name);
          formData.append('region', this.local_region);
          formData.append('region_name', this.local_region_name);
          formData.append('biz_id', this.submit_biz_id);
          formData.append('shop_booth_id', this.submit_shop_booth_id);
          formData.append('booth_name', this.submit_booth_name);
          formData.append('stall_no', this.local_stall_no);
          formData.append('check_good', this.submit_goods_name);
          formData.append('check_result', this.local_check_result);
          formData.append('remark', this.local_remark);
          formData.append('img_url', img_url);
          formData.append('check_date', this.local_check_date);
          formData.append('check_project', this.check_project); // 检测项目
          formData.append('standard_value', this.standard_value); // 检测值
          formData.append('check_standard', this.check_standard); //检测标准
          formData.append('check_res', this.check_res); //检测结果值 
          formData.append('check_person', this.check_person); // 检测人
          formData.append('check_mechanism', this.check_mechanism); //检测机
          formData.append('check_goods_code', this.check_goods_code); //选择商品的goods_code
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post(addCheckItem, formData, config).then((res) => {
            if (res.status === 200) {
              this.$message.success(res.data.message);
              this.$router.push({name: 'CheckTz'})
              // this.submitclear();
              // this.isShowImg = true;
              // this.showBaseCode = '';
            }
          })
        }
      },
      /*
      *   page: 1,
          cols: 15000,
          goodsName: "",
          suppliersName: '',
          region: this.local_region,
          userId: this.userId_local,
          total: '',
      * */
      //  获取商品列表
      getGoodsFun(goodsType) {
        let msg = {}
        if(this.$route.query.msg){
          msg = JSON.parse(this.$route.query.msg)
        }
        let boothData = {
          region: this.local_region,
          userId: this.userId_local,
          node_id: this.local_node_id_id,
          goodsType: goodsType,// 1 进货 2销售
        }
        jcpurchase(boothData)
          .then(res => {
            this.local_check_good_options = res.data;
            
            if(this.count == 1 && msg.check_good){
              let name = '',arr = [];
              name = msg.check_good
              arr = name.split(',')
              this.local_check_good_options.forEach(val => {
                arr.forEach(val2 => {
                  if(val.GOODS_NAME == val2){
                    this.local_check_good.push(val)
                  }
                })
              })
              let codeArr = []
              this.submit_goods_name = '';
              for (let i = 0; i < this.local_check_good.length; i++) {
                codeArr.push(this.local_check_good[i].GOODS_CODE)
                this.submit_goods_name += this.local_check_good[i].GOODS_NAME.toString() + ',';
              }
              if(codeArr.length > 0){
                this.check_goods_code = codeArr.join(',')
              }else{
                this.check_goods_code = ''
              }
              if(msg.check_good && this.local_check_good.length == 0){
                this.goodsType = '销售'
                this.getGoodsFun(2)
              }else{
                this.count = 2
              }
            }
          })
          .catch(res => {
          })
      },
      //  商户通过  id  去查询  对应的名称   local_booth_name
      getMerchantName() {
        for (let j = 0; j < this.local_booth_name_options.length; j++) {
          if (this.local_booth_name === this.local_booth_name_options[j].bootList[0].shop_booth_id) {
            this.submit_booth_name = this.local_booth_name_options[j].bootList[0].booth_name;
            this.submit_biz_id = this.local_booth_name_options[j].bootList[0].biz_id;
            this.submit_shop_booth_id = this.local_booth_name_options[j].bootList[0].shop_booth_id;
          }
        }
      },
      // 获取商户
      getMerchantsFun() {
        let msg = {}
        if(this.$route.query.msg){
          msg = JSON.parse(this.$route.query.msg)
        }
        let obj = {
          page: '1',
          cols: '',
          total: "",
          userId: this.userId_local,
          name: "",
          boothName: "",
          stall_no: "",
          // region: "192",
          region: this.local_region,
        }
        GetAllBiz(obj)
          .then(res => {
            this.local_booth_name_options = res.data.dataList
            if(msg && this.count == 1){
              this.local_booth_name_options.forEach(val => {
                if(val.bootList[0].booth_name == msg.booth_name){
                  this.local_booth_name = val.bootList[0].shop_booth_id
                }
              })
            }
          })
          .catch(() => {
            this.$message.error("出错啦!");
          })
      },
      //  清空所有数据
      submitclear() {
        this.local_check_date = "";
        this.local_booth_name = '';
        this.local_stall_no = '';
        this.local_check_good = [];
        this.submit_goods_name = '';
        this.local_remark = '';
        this.local_check_result = '';
        this.$refs.inputcheckimg.value = '';
        this.isShowImg = false;
      },
    },
    components: {}
  }
</script>

<style lang='less' scoped>
  .msg-item{
    width: 400px;
    display: flex;
    .img-list{
      ul{
        display: flex;
        flex-wrap:wrap;
        li{
          position: relative;
          top: 0;
          left: 0;
          margin: 0 10px;
          .delete{
            position: absolute;
            top: -6px;
            right: -6px;
            z-index: 66;
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
          .stop{
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            border: none;
          }
          img{
            width: 50px;
            height: 50px;
            border: 1px solid #eaeaea;
          }
        }
      }
    }
    .submit{
      margin: 10px auto;
      position: relative;
      left: 0;
      display: inline-block;
      width: 110px;
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
        width: 110px;
        height: 30px;
        opacity: 0;
        background: rgba(0,0,0,0);
      }
    } 
  }
  .img_group{
    display: flex;
  }
  .lz-content-jc {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    .lz-form-style {
      margin-left: 100px;
      margin-top: 50px;
      width: 400px;
    }
  }
  .img_delete {
    width: 50px;
    height: 50px;
    background-color: yellow;
  }
</style>
