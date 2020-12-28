<template>
  <div class="content" ref="content">  
    <div class="msg-title" ref="title">账号信息</div>
    <div class="account-msg" ref="accoutnMsg">
      <div class="item">
        <span class="item-name">账号：</span>
        <el-input v-model="account" type='text'disabled class="input" clearable></el-input>
      </div>
      <div class="item password">
        <span class="item-name">密码：</span>
        <el-input v-model="password" type='password' disabled class="input" clearable></el-input>
        <span class="edit-btn" @click="editNumFun">修改密码</span>
      </div>
      <div style="clear: both;"></div>
      <div class="item">
        <span class="item-name">联系人：</span>
        <el-input v-model="people" type='text' :disabled="disabled" class="input" clearable></el-input>
      </div>
      <div class="item last-itme">
        <span class="item-name">联系方式：</span>
        <el-input v-model="phoneNumber" type='text' :disabled="disabled" class="input" maxlength='11' clearable></el-input>
        <el-checkbox style="display:inline-block;" v-model="checked">是否向商户发送短信告知账号信息？</el-checkbox>
      </div>
    </div>
    <div class="msg-title">商铺信息</div>
    <div class="shop-msg">
      <div class="box" ref="addShop">
        <div class="shop-name" v-show="showShopListName">
          <el-button v-for="item in shopList" :key="item.index" @click='lookThis(item.booth_name)' 
            :class="{current:item.booth_name == lookShopName}" type="primary" class="btn">{{item.booth_name}}</el-button>
        </div>
        <el-button type="primary" class="btn" :class="{current:active}" @click='addShop'>添加商铺</el-button>
      </div>
      <div class="form-content" v-show="!selectAddShop">
        <!-- 展示商铺信息 -->
        <div class="infor-msg" v-show="!isEdit">
          <div v-for="item in shopList" :key="item.id">
            <div class="section">
              <span class="item-name">所属区域：</span>
              <span class="item-msg">{{districtName}}</span>
            </div>
            <div class="section">
              <span class="item-name">商户编码：</span>
              <span class="item-msg">{{item.biz_id}}</span>
            </div>
            <div class="section">
              <span class="item-name">营业执照号：</span>
              <span class="item-msg">{{item.licenceNo}}</span>
            </div>
            <div class="section">
              <span class="item-name">身份证号：</span>
              <span class="item-msg">{{item.regId}}</span>
            </div>
            <div class="section">
              <span class="item-name">商户名称：</span>
              <span class="item-msg">{{item.booth_name}}</span>
            </div>
            <div class="section">
              <span class="item-name">企业名称：</span>
              <span class="item-msg">{{item.corporate_name}}</span>
            </div>
            <div class="section">
              <span class="item-name">联系人：</span>
              <span class="item-msg">{{item.contacts}}</span>
            </div>
            <div class="section">
              <span class="item-name">联系电话：</span>
              <span class="item-msg">{{item.callphone}}</span>
            </div>
            <div class="section addr">
              <span class="item-name">地址：</span>
              <span class="item-msg">{{item.area_name}}</span>
              <span class="item-msg">{{item.addr}}</span>
            </div>
            <div class="section">
              <span class="item-name">摊位号：</span>
              <span class="item-msg">{{item.stall_no}}</span>
            </div>
            <div class="section">
              <span class="item-name">工行支付账户：</span>
              <span class="item-msg">{{item.shop_mer_id}}</span>
            </div>
            <div class="section">
              <span class="item-name">营业执照：</span>
              <span class="item-msg">
                <div class="box-fileimg" v-if="item.img_url" @click="bigImgFun(item.img_url)">
                  <figure class="image">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                  </figure>
                </div>
                <p v-else>无</p>
              </span>
            </div>
            <div class="section">
              <span class="item-name">个人照：</span>
              <span class="item-msg">
                <div class="box-fileimg" v-if="item.logo" @click="bigImgFun(item.logo)">
                  <figure class="image">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.logo">
                  </figure> 
                </div>
                <p v-else>无</p>
              </span>
            </div>
            <div class="section">
              <el-button type="primary" @click="modifyMsg(lookMsg.nodeName)">修改</el-button>
            </div>
          </div>
        </div>
        <!-- 编辑查看 -->
        <el-form :model="editForm" class="form" label-width="120px" v-show="isEdit">
          <el-form-item label="所属区域：" >
            <el-select style="width: 340px;" v-model="editForm.district" filterable size="mini" @change="selectFun">
              <el-option  v-for="(item,index) in districtArr" :key="index" :label="item.name" :value="item.bootList[0].shop_booth_id" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户编码：" >
            <el-input v-model="editForm.biz_id" readonly></el-input>
          </el-form-item>
          <el-form-item label="营业执照号：">
            <el-input v-model="editForm.licenceNo"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="editForm.regId"></el-input>
          </el-form-item>
          <el-form-item label="商户名称：">
            <el-input v-model="editForm.nodeName"></el-input>
          </el-form-item>
          <el-tooltip class="item" effect="dark" content="营业执照上的名称" placement="top-start">
            <el-form-item label="企业名称：">
              <el-input v-model="editForm.corporate_name" style="width: 340px"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-form-item label="联系人：">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="editForm.callphone"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-cascader class="address" :options="addrOptions" v-model="editForm.addr" placeholder="省/市/县" 
              clearable :props="props" change-on-select></el-cascader>
            <el-input v-model="editForm.addrInfo" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="摊位号：">
            <el-input v-model="editForm.stallNo"></el-input>
          </el-form-item>
          <el-form-item label="工行支付账户：">
            <el-input v-model="editForm.shop_mer_id"></el-input>
          </el-form-item>
          <el-form-item label="营业执照：">
            <div class="box-fileimg">
              <figure class="image" v-if="imgUrl">
                <p class="delete" @click="removeFun(1)">-</p>
                <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + imgUrl" @click="bigImgFun(imgUrl)">
              </figure>
              <span class="submit">
                上传图片
                <form enctype="multipart/form-data" method="post"> 
                  <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event)">
                </form>
              </span>  
            </div>
          </el-form-item>
          <el-form-item label="个人照：">
            <div class="box-fileimg">
              <figure class="image" v-if="logoUrl">
                <p class="delete" @click="removeFun(2)">-</p>
                <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + logoUrl" @click="bigImgFun(logoUrl)">
              </figure>
              <span class="submit">
                上传图片
                <form enctype="multipart/form-data" method="post"> 
                  <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun2($event)">
                </form>
              </span>  
            </div>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="saveMsg()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增商户 -->
      <div class="form-content" v-show="selectAddShop">
        <el-form :model="form" class="form" label-width="120px">
          <el-form-item label="营业执照号：" prop="licenceNo">
            <el-input v-model="form.licenceNo" clearable></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="regId">
            <el-input v-model="form.regId" clearable></el-input>
          </el-form-item>
          <el-form-item label="商户名称：" prop="nodeName" >
            <el-input v-model="form.nodeName" clearable></el-input>
          </el-form-item>
          <el-tooltip class="item" effect="dark" content="营业执照上的名称" placement="top-start">
            <el-form-item label="企业名称：" prop="corporate_name">
              <el-input v-model="form.corporate_name" clearable style="width: 340px"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-form-item label="联系人：" prop="name">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="callphone">
            <el-input v-model="form.callphone" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="addr">
            <el-cascader class="address" :options="addrOptions" v-model="form.addr" placeholder="省/市/县"
              clearable :props="props" change-on-select></el-cascader>
            <el-input v-model="form.addrInfo" placeholder="请输入详细地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="摊位号：" prop="stallNo">
            <el-input v-model="form.stallNo" clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="passwrd" v-if="isEdits">
      <div class="text">
        <div class="close" @click="closeFun">X</div>
        <el-form class="form" ref="formNum" :model="formNum" label-width="80px">
          <el-form-item label="旧密码">
            <el-input type="password" v-model="formNum.oldNum"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="formNum.newNum"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="formNum.sureNum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sureNumFun">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="big-img" v-show="isBigImg" ref="boxsize">
      <p class="iconfont icon-close close" @click="closeFun2"></p>
      <div class="imgBox">
        <figure class="images">
          <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + img_url" v-if="img_url">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js';
import {insBiz,allBizs,updateBizUser,updateBizBooth, DeleteBizImg} from '../../js/management/management.js';
import {baseUrl} from '../../js/address/url.js'
import axios from 'axios';
import {UpdatePassword} from '../../js/settings/settings.js'
import { GetMarkets} from '../../js/district/district.js';
export default {
  name:"",
  data(){
    return{
      isEdits: false,
      formNum: {
        oldNum: '',
        newNum: '',
        sureNum: '',
      },
      disabled: true,
      userId:'2',
      account:'',//账号
      password:'',//密码
      people:'',
      phoneNumber:'',
      checked:false,
      form:{
        corporate_name: '',
        licenceNo: '',//营业执照
        regId: '',//身份证号
        nodeName: '',//商户名称（商铺）
        name: '',//店铺联系人
        callphone: '',//店铺联系方式
        addr:[],
        addrInfo: '',//地址
        stallNo: '',//摊位号
        shop_mer_id: '',
      },
      lookMsg:{},
      editForm:{
        biz_id: '',
        licenceNo: '',
        regId: '',//身份证号
        nodeName: '',//商户名称（商铺）
        corporate_name: '', 
        name: '',//店铺联系人
        callphone: '',//店铺联系方式
        addr:[],
        addrInfo: '',//地址
        stallNo: '',//摊位号
        district: '', // 所属区域
        shop_mer_id: '',
      },
      addrOptions:[],
      props:{
        label: 'caption',
        value:'szm',
        children: 'list'
      },
      shopList:[],//绑定商铺
      showShopListName:false,//绑定商铺是否展示
      active:true,//选中添加商铺
      lookShopName:'',//查看商铺
      selectAddShop:true,//选中添加商品展示表单
      isEdit:false,//是否在编辑
      shopUserId: '',
      shop_booth_id: '',
      biz_id: '',
      imgUrl: '',
      logoUrl: '',
      logoFile: '',
      imgFile: '',
      logoArr: [],
      imgArr: [],
      districtArr: [],
      districtUserId: '',
      districtName: '',
      file: '',
      node_id: '',
      inforMsg: {},
      isBigImg: '',
      img_url: '',
    }
  },
  mounted(){    
    if(this.$route.query.inforMsg){
      this.inforMsg = JSON.parse(this.$route.query.inforMsg)
    }
    this.node_id = localStorage.getItem('loginId');
    this.getAddrList();//获取地区列表
    this.getMarketFun()
    this.getShopMsg();//查询商铺信息
  },  
  created() {
    this.userId = localStorage.getItem('userId')
  },
  methods:{
    removeFun(ele){
      if(ele == 1){
        let str = 'shop_booth_id=' + this.shop_booth_id + '&type=img';
        DeleteBizImg(str)
          .then(res => {
            if (res.result == true) {
              this.$message.success(res.message);
              this.imgUrl = ''
              // this.btnMsg = '修改'
              // this.getShopMsg()
              // this.getMarketFun()
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log(res)
          })
      }else if(ele == 2){
        let str = 'shop_booth_id=' + this.shop_booth_id + '&type=logo';
        DeleteBizImg(str)
          .then(res => {
            if (res.result == true) {
              this.$message.success(res.message);
              this.logoUrl = ''
              // this.btnMsg = '修改'
              // this.getShopMsg()
              // this.getMarketFun()
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log(res)
          })
      }
    },
    bigImgFun(item){
      this.isBigImg = true
      this.$nextTick(()=>{            
        this.imgHeight = this.$refs.boxsize.offsetHeight - 60
        let sizeObj = {
          'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
          'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
          'margin-bottom': 10 + 'px'
        }
        this.sizeObj = sizeObj
      })
      this.img_url = item
    },
    closeFun2(){
      this.img_url = ''
      this.isBigImg = false
    },
    selectFun(ele){
      this.districtArr.forEach(val => {
        if(ele == val.bootList[0].shop_booth_id){
          this.districtUserId = val.bootList[0].userId
        }
      })
    },
    // 区域
    getMarketFun(){            
      let obj = {
        page: 1,
        cols: 1000,
        total: "",
        userId: this.userId,
        contacts: '',
        nodeName: '',
        node_id: this.node_id
      }
      GetMarkets(obj)
        .then(res => {
          this.districtArr = res.data.dataList
          this.districtArr.forEach(val => {
            if(this.inforMsg.bootList[0].region == val.bootList[0].shop_booth_id){
              this.districtUserId = val.bootList[0].userId
              this.districtName = val.bootList[0].booth_name
            }
          })
        })
        .catch(res => {
          console.log(res)
        })
    },
    sureNumFun(){
      let str = 'userName=' + this.account + '&password=' + this.formNum.newNum
      if(this.formNum.oldNum != this.password){
        this.$message.error("旧密码输入错误");
        return;
      }
      if(this.formNum.newNum != this.formNum.sureNum){
        this.$message.error("新密码输入不一致");
        return;
      }
      UpdatePassword(str)
        .then(res => {
          if (res.result == true) {
            this.$message.success(res.message);
            this.password = this.formNum.newNum
            this.formNum = {
              oldNum: '',
              newNum: '',
              sureNum: '',
            }
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(res => {
          console.log(res);
        })
      this.isEdits = false
    },
    editNumFun(){
      this.isEdits = true
    },
    closeFun(){
      this.isEdits = false
    },
    // 营业执照
    fileFun(event){
      var that = this;
      this.file = event.target.files[0];
      let formData = new FormData();
      formData.append('img_url', this.file);   
      formData.append('biz_id', that.biz_id);  
      formData.append('shop_booth_id', that.shop_booth_id);     
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
      const url = baseUrl + 'manage/updateBizImg'
      ajaxPost(url,formData,config)
        .then(res => {
          that.imgArr = []
          that.imgUrl = res.data.img_url
          that.file = null
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 个人照
    fileFun2(event){
      var that = this;
      this.file = event.target.files[0];
      let formData = new FormData();
      formData.append('logo', this.file);   
      formData.append('biz_id', that.biz_id);  
      formData.append('shop_booth_id', that.shop_booth_id); 
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
      const url = baseUrl + 'manage/updateBizLogo'
      ajaxPost(url,formData,config)
        .then(res => {
          that.logoArr = []
          that.logoUrl = res.data.logo
          that.file = null
        })
        .catch(res => {
          console.log(res)
        })
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
    // 修改用户信息
    updateBizUserFun(){
      let obj = {
        contact: this.people,
        telphone: this.phoneNumber,
        userId: this.shopUserId,
        paternt: this.districtUserId, // 区域userid      
        region: this.editForm.district// 区域shop_booth_id
      }
      updateBizUser(obj)
        .then(res =>{
          if(res.result == true){
            this.$message.success(res.message);
          }else{
            this.$message.error('用户信息修改失败');
          }
        })
        .catch(res =>{
          console.log(res)
        })
    },
    // 修改商铺信息
    updateBizBooth(){
      let addrArr = [];
      this.addrOptions.forEach(ele => {
        if(ele.szm == this.editForm.addr[0]){
          addrArr.push(ele.caption)
          ele.list.forEach(ele => {
            if(ele.szm == this.editForm.addr[1]){
              addrArr.push(ele.caption)
              ele.list.forEach(ele => {
                if(ele.szm == this.editForm.addr[2]){
                  addrArr.push(ele.caption)                              
                }
              })
            }
          })
        }
      })
      let obj = {
        shop_booth_id: this.shop_booth_id,
        callphone: this.editForm.callphone,//联系电话
        licenceNo: this.editForm.licenceNo,//营业执照号
        nodeName: this.editForm.nodeName,//商铺名称
        regId: this.editForm.regId,//身份证
        name: this.editForm.name,//联系人
        areaId: this.editForm.addr[this.editForm.addr.length - 1],//地址序列号
        areaName: addrArr.join(""),//地址名称
        addr: this.editForm.addrInfo,//地址详细信息
        stallNo: this.editForm.stallNo,//摊位号
        biz_id: this.biz_id,
        corporate_name: this.editForm.corporate_name,
        paternt: this.districtUserId, // 区域userid      
        region: this.editForm.district, // 区域shop_booth_id
        shop_mer_id: this.editForm.shop_mer_id,
      }
      updateBizBooth(obj)
        .then(res =>{
          if(res.result == true){
            this.$message.success(res.message);
          }else{
            this.$message.error('商户信息修改失败');
          }
        })
        .catch(res =>{
          console.log(res)
        })
    },
    // 详情
    getShopMsg(){      
      allBizs({userId:this.inforMsg.bootList[0].userId})
        .then(res =>{
          let len = res.data.dataList.length;
          this.account = res.data.dataList[0].userName;
          this.password = res.data.dataList[0].password
          this.people = res.data.dataList[0].name;
          this.shopUserId = res.data.dataList[0].userId
          this.shop_booth_id = res.data.dataList[0].bootList[0].shop_booth_id
          this.phoneNumber = res.data.dataList[0].telephone;
          this.biz_id = res.data.dataList[0].bootList[0].biz_id
          if(len > 0){
            this.isEdit = false;
            res.data.dataList[0].bootList[0].shop_mer_id = res.data.dataList[0].shop_mer_id
            this.shopList = res.data.dataList[0].bootList;
            this.lookThis(res.data.dataList[0].bootList[0].booth_name)
            this.lookShopName = res.data.dataList[0].bootList[0].booth_name;
          }
        })
        .catch(res =>{
          console.log(res)
        })
    },
    getAddrList(){//获取地区列表
      getAddr()
        .then(res => {
          this.addrOptions = res.data.dataList
        })
        .catch(res => {
          console.log(res)
        })
    },
    submitForm(){//添加商铺保存
      // 根据地区序列号查询地址
      let addrArr = [];
      this.addrOptions.forEach(ele => {
        if(ele.szm == this.form.addr[0]){
          addrArr.push(ele.caption)
          ele.list.forEach(ele => {
            if(ele.szm == this.form.addr[1]){
              addrArr.push(ele.caption)
              ele.list.forEach(ele => {
                if(ele.szm == this.form.addr[2]){
                  addrArr.push(ele.caption)                              
                }
              })
            }
          })
        }
      })
      // 新增商户提交数据
      let data = {
        userName:this.account,//账号
        password:this.password,//密码
        contact:this.people,//联系人
        telphone:this.phoneNumber,// 联系人电话       
        state:"1",
        licenceNo:this.form.licenceNo,//营业执照号
        regId:this.form.regId,//身份证
        nodeName:this.form.nodeName,//商铺名称
        name:this.form.name,//联系人
        callphone:this.form.callphone,//联系电话
        areaId:this.form.addr[2],//地址序列号
        areaName:addrArr.join(""),//地址名称
        addr:this.form.addrInfo,//地址详细信息
        stallNo:this.form.stallNo,//摊位号
        region:localStorage.getItem('merchantsAreaId'),//大区id
        userId:this.userId,//用户id
        corporate_name: this.form.corporate_name
      }
      // insBiz(data)
      //   .then(res => {
      //     if(res.result){
      //       this.$message({
      //         message: '恭喜您，保存成功！',
      //         type: 'success'
      //       });
            this.shopList.push({
              userName:this.account,//账号
              password:this.password,//密码
              contact:this.people,//联系人
              telphone:this.phoneNumber,// 联系人电话       
              state:"1",
              licenceNo:this.form.licenceNo,//营业执照号
              regId:this.form.regId,//身份证
              nodeName:this.form.nodeName,//商铺名称
              name:this.form.name,//联系人
              callphone:this.form.callphone,//联系电话 
              areaIdArr:[this.form.addr[0],this.form.addr[1],this.form.addr[2]],             
              areaId:this.form.addr[2],//地址序列号
              areaName:addrArr.join(""),//地址名称
              addr:this.form.addrInfo,//地址详细信息
              stallNo:this.form.stallNo,//摊位号
              region:localStorage.getItem('merchantsAreaId'),//大区id
              userId:this.userId,//用户id,
              corporate_name: this.form.corporate_name
            })
            // 新增商铺保存后重置页面录入信息
            this.account='';//账号
            this.password='';//密码
            this.people='';//联系人
            this.phoneNumber='';// 联系人电话    
            this.form.licenceNo='';//营业执照号
            this.form.regId='';//身份证
            this.form.nodeName='';//商铺名称
            this.form.name='';//联系人
            this.form.callphone='';//联系电话
            this.form.addr=[];//地址
            this.form.addrInfo='';//地址详细信息
            this.form.stallNo='';//摊位号
            this.form.corporate_name = ''
        //   }else{
        //     console.log(res.result);
        //   }
        // })
        // .catch(res => {
        //   console.log(res.message)
        // })
    },
    lookThis(name){//查看商铺信息
      this.lookShopName = name;
      this.active = false;
      this.selectAddShop = false;
      this.isEdit = false;
      this.shopList.forEach(ele => {
        if(ele.name == name){
          this.account = ele.userName;//账号
          this.password = ele.password;//密码
          this.people = ele.contact;//联系人
          this.phoneNumber = ele.telphone; // 联系人电话   

          this.lookMsg.licenceNo = ele.licenceNo;//营业执照号
          this.lookMsg.regId = ele.regId;//身份证
          this.lookMsg.nodeName = ele.nodeName;//商铺名称
          this.lookMsg.name = ele.name;//联系人
          this.lookMsg.callphone = ele.callphone;//联系电话
          this.lookMsg.areaIdArr = ele.areaIdArr;
          this.lookMsg.areaId = ele.areaId,//地址序列号
          this.lookMsg.addr = ele.area_name;//地址名称
          this.lookMsg.addrInfo = ele.addr;//地址详细信息
          this.lookMsg.stallNo = ele.stallNo;//摊位号
          this.lookMsg.region = ele.region;//大区id
          this.lookMsg.corporate_name = ele.corporate_name
          this.lookMsg.shop_mer_id = ele.shop_mer_id
          this.districtArr.forEach(val => {
            if(ele.region == val.bootList[0].shop_booth_id){
              this.districtName = val.bootList[0].booth_name
            }
          })
        }
      })
    },
    modifyMsg(name){//修改商铺信息
      this.isEdit = true;
      this.disabled = false
      this.shopList.forEach(ele => {
        if(ele.name == name){
          let addrArr = [];
          if(ele.area_name){
            let areaName = ele.area_name
            if(areaName.slice(0,3) == '北京市'){
              this.addrOptions.forEach(ele => {
                  addrArr.push('110000')
                  ele.list.forEach(ele => {
                    if(areaName.slice(3,6) == ele.caption){
                      addrArr.push(ele.szm)
                      ele.list.forEach(ele => {
                        if(areaName.slice(6) == ele.caption){
                          addrArr.push(ele.szm)                              
                        }
                      })
                    }
                  })
              })
              this.editForm.addr = addrArr.slice(0,3)
            }else if(areaName.slice(0,3) == '上海市'){
              addrArr.push('310000')
              this.addrOptions.forEach(ele => {
                ele.list.forEach(ele => {
                  if(areaName.slice(3,6) == ele.caption){
                    addrArr.push(ele.szm)
                    ele.list.forEach(ele => {
                      if(areaName.slice(6) == ele.caption){
                        addrArr.push(ele.szm)                              
                      }
                    })
                  }
                })
              })
              this.editForm.addr = addrArr.slice(0,3)
            }else if(areaName.slice(0,3) == '天津市'){
              addrArr.push('120000')
              this.addrOptions.forEach(ele => {
                ele.list.forEach(ele => {
                  if(areaName.slice(3,6) == ele.caption){
                    addrArr.push(ele.szm)
                    ele.list.forEach(ele => {
                      if(areaName.slice(6) == ele.caption){
                        addrArr.push(ele.szm)                              
                      }
                    })
                  }
                })
              })
              this.editForm.addr = addrArr.slice(0,3)
            }else if(areaName.slice(0,3) == '重庆市'){
              addrArr.push('500000')
              this.addrOptions.forEach(ele => {
                ele.list.forEach(ele => {
                  if(areaName.slice(3,6) == ele.caption){
                    addrArr.push(ele.szm)
                    ele.list.forEach(ele => {
                      if(areaName.slice(6) == ele.caption){
                        addrArr.push(ele.szm)                              
                      }
                    })
                  }
                })
              })
              this.editForm.addr = addrArr.slice(0,3)
            }else{
              let arr = [];
              if(ele.area_id.slice(4,6) != '00'){
                arr.unshift(ele.area_id);
              }
              if(ele.area_id.slice(2,4) != '00'){
                arr.unshift(ele.area_id.slice(0,4)+'00');
              }
              if(ele.area_id.slice(0,2) != '00'){
                arr.unshift(ele.area_id.slice(0,2)+'0000');
              }
              this.editForm.addr = arr;
            }
          }
          // this.account = ele.userName;//账号
          // this.password = ele.password;//密码
          // this.people = '';//联系人
          // this.phoneNumber = ''; // 联系人电话   
          this.biz_id = ele.biz_id
          this.editForm.licenceNo = ele.licenceNo;//营业执照号
          this.editForm.regId = ele.regId;//身份证
          this.editForm.nodeName = ele.booth_name;//商铺名称
          this.editForm.name = ele.contacts;//联系人
          this.editForm.callphone = ele.callphone;//联系电话
          this.editForm.corporate_name = ele.corporate_name
          // this.editForm.addr = ele.areaIdArr;//地址名称
          this.editForm.addrInfo = ele.addr;//地址详细信息
          this.editForm.stallNo = ele.stall_no;//摊位号
          // this.editForm.region = ele.region;//大区id
          // this.editForm.area_name = ele.area_name
          this.editForm.biz_id = ele.biz_id
          this.editForm.shop_mer_id = ele.shop_mer_id
          this.districtArr.forEach(val => {
            if(ele.region == val.bootList[0].shop_booth_id){
              this.districtUserId = val.bootList[0].userId
            }
          })
          this.editForm.district = Number(ele.region) // 区域shop_booth_id
          this.imgUrl = ele.img_url
          this.logoUrl = ele.logo
        }
      })
    },
    saveMsg(){ // 修改商户提交数据
      this.updateBizUserFun()
      this.updateBizBooth()
      this.$router.push({name: "MerchantsMgm"})
    },
    addShop(){//添加商铺
      if(this.shopList.length == 1){
        this.shopList.forEach(val => {
          val.logo = this.logoUrl
          val.img_url = this.imgUrl
        })
      }
      this.lookShopName = '';
      this.active = true;
      this.selectAddShop = true;
      // 添加商品重置录入信息
      // this.account='';//账号
      // this.password='';//密码
      // this.people='';//联系人
      // this.phoneNumber='';// 联系人电话       
      
      this.form.licenceNo='';//营业执照号
      this.form.regId='';//身份证
      this.form.nodeName='';//商铺名称
      this.form.name='';//联系人
      this.form.callphone='';//联系电话
      this.form.addr=[];//地址
      this.form.addrInfo='';//地址详细信息
      this.form.stallNo='';//摊位号
      this.form.corporate_name = ''
      this.form.shop_mer_id = ''
    },
  },
   watch:{
    shopList(val){
      if(val.length > 0){
        this.showShopListName = true;
      }
    }
  },
}
</script>

<style scoped lang="less">
  @import '../../assets/css/common.css';
  @color:#409EFF;
  .content{
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .password{
      width: 40% !important;
    }
    .big-img{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      .close{
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
      .imgBox{
        margin: 50px 20px;
        padding: 10px 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
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
    }
    .passwrd{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 666;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      .text{
        position: relative;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
        width: 400px;
        height: 300px;
        background: #fff;
        .close{
          margin: 0 10px;
          padding-left: 340px;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          border-bottom: 1px solid #ccc;
          cursor: pointer;
        }
        .form{
          margin-top: 20px;
          margin-left: 30px;
          .el-input,{
            width: 200px;
          }
        }
      }
    }
    .el-form-item{ 
      clear: both;
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
        position: relative;
        top: 0;
        left: 0;
        width: 200px;
        height: 100px;
        vertical-align: middle;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
        .delete{
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
          display: block;
          border: none;
          max-width: 190px;
          max-height: 100%;
        }
      }
    }
    .msg-title{
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      padding-left: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      border-left: 2px solid #409EFF;
    }
    .title{
      margin-bottom: 15px;
      padding: 5px 15px;
      font-size: 14px;
    }
    .account-msg{
      padding: 0 40px;
      overflow: hidden;
    }
    .item{
      float: left;
      margin-bottom: 20px;
      width: 33.33%;
      height: 40px;
      line-height: 40px;
      .input{
        width: 150px;
      }
      .item-name{
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .edit-btn{
        font-size: 14px;
        color: #409EFF;
        cursor: pointer;
      }
    }
    .last-itme{
      width: 66.66%;
    }
    .shop-msg{
      .box{
        border-bottom: 1px solid #eaeaea;
        .el-button{
          border-radius: 0;
        }
      }
      .shop-name{
        display: inline-block;
      }
      .btn{
        padding: 0 10px;
        background: #eaeaea;
        color: #777;
        border-color: #eaeaea;
      }
      .current{
        border: 1px solid #409EFF;
        color: #409EEF;
        background: #fff;
      }      
    }
    .form-content{
      padding: 20px 0 0 100px;
      .form{
        width: 460px;
      }
      .address{
        margin-bottom: 12px;
        width: 340px;
      }
      .el-form-item{
        margin-bottom: 12px;
      }
      .infor-msg{
        font-size: 14px;
        color: #606266;
        width: 460px;
      }
      .section{
        margin-bottom: 10px;
        line-height: 26px;
        overflow: hidden;
        .el-button{
          margin-left: 120px;
        }
      }
      .item-name{
        float: left;
        display: block;
        padding-right: 12px;
        width: 120px;
        text-align: right;
        box-sizing: border-box;
      }
      .item-msg{
        display: block;
        margin-left: 120px;
      }
      
      .addr{
        margin-bottom: 0;
        height: 70px;
        .item-msg{
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
