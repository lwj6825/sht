<template>
  <div class="content">
    <el-form :model="form" :rules="rules" :inline='true' ref="form" label-width="120px">
      <div class="title" ref="title">账号信息</div>
      <el-form-item label='账号：' prop='account'>
        <el-input v-model="form.account" type='text' class="input" :disabled='true' clearable></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop='password'>
        <el-input v-model="form.password" type='text' class="input" :disabled='true' clearable></el-input>
      </el-form-item>
      <el-form-item label='角色：' prop='role'>
        <el-select v-model="form.role" placeholder="请选择" clearable :disabled='true' class="input">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label='联系人：' prop='people'>
          <el-input v-model="form.people" type='text' class="input" clearable></el-input>
        </el-form-item>
        <el-form-item label='联系方式：' prop='phoneNumber'>
          <el-input v-model="form.phoneNumber" type='text' class="input" maxlength='11' :disabled='true' clearable></el-input>
          <el-checkbox style="display:inline-block;" v-model="checked">是否向商户发送短信告知账号信息？</el-checkbox>
        </el-form-item>
      </div>
      <div class="title">商铺信息</div>
      <el-form-item label="营业执照：" prop="licenceNo" class="block-item">
        <el-input v-model="form.licenceNo" clearable class="shop-msg-input"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="regId" class="block-item">
        <el-input v-model="form.regId" clearable class="shop-msg-input"></el-input>
      </el-form-item>
      <el-form-item label="合作社名称：" prop="cooperativeName" class="block-item">
        <el-input v-model="form.cooperativeName" clearable class="shop-msg-input"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="name" class="block-item">
        <el-input v-model="form.name" clearable class="shop-msg-input"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="callphone" class="block-item">
        <el-input v-model="form.callphone" clearable class="shop-msg-input"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="addr" class="block-item">
        <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="shop-msg-input" clearable 
          :props="props" change-on-select></el-cascader>
        <el-input v-model="form.inforAddr" placeholder="请输入详细地址" clearable class="add-infor-input"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="desc" class="block-item">
        <div>
          <div v-if="allowAddImg">
            <input type="file" accept="image/*" @change="changeImg($event)" ref="inputcheckimg">
            <div class="filter"></div>
          </div>
          <div v-for="(item,index) in imgArr" :key="index">
            <div class="img_show_box">
              <img :src="item" alt="">
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="block-item">
        <el-button type="primary" class="new-add" @click="submitForm('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getRoleList} from '../../js/role/role.js';
  import {getAddr} from '../../js/user/user.js';
  import {EditSave} from '../../js/farmthings/farmworkget.js'
  import axios from 'axios';
  import {nsHeZuoSheImagUrl} from '../../js/address/url.js';

  export default {
    name: 'AddCrop',
    data() {
      return {
        type: 2,
        userId: '',
        allowAddImg: true,
        imgArr: [],
        showBaseCode: '',
        form: {
          account: '',//账号
          password: '',//密码
          role: [],//角色
          people: '',
          phoneNumber: '',
          licenceNo: '',//营业执照
          cooperativeName: '',//客户名称
          regId: '',//身份证号
          name: '',//联系人
          callphone: '',//联系方式
          addr: [],//地址
          inforAddr: '',//详细地址
        },
        roleOptions: [],
        checked: false,
        addrOptions: [],
        props: {
          label: 'caption',
          value: 'szm',
          children: 'list'
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
          people: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          phoneNumber: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'}
          ],
          licenceNo: [
            {required: true, message: '请输入营业执照', trigger: 'blur'}
          ],
          cooperativeName: [
            {required: true, message: '请输入合作社名称', trigger: 'blur'}
          ],
          regId: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'}
          ],
          name: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          callphone: [
            {required: true, message: '请输入联系方式', trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                  callback(new Error("请输入正确的手机号"));
                }
                else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          addr: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],

        },
      }
    },
    mounted() {
      // this.userId = JSON.parse(localStorage.getItem('userId'));
      console.log(this.$route.params)
      this.getRoleType();
      this.form.account = this.$route.params.username;
      this.form.password = this.$route.params.password;
      // this.form.role = this.$route.params.roleId;
      this.form.role = '合作社';
      this.form.people = this.$route.params.name;
      this.form.phoneNumber = this.$route.params.tel;
      this.form.licenceNo = this.$route.params.licence_no;
      this.form.cooperativeName = this.$route.params.corporate_name;
      this.form.regId = this.$route.params.regid;
      this.form.name = this.$route.params.contacts;
      this.form.callphone = this.$route.params.callphone;
      // this.form.addr = this.$route.params.area_Id;
      this.form.inforAddr = this.$route.params.addr;
      this.userId = this.$route.params.userId;
      this.getAddrList()//获取地区列表
      // this.getAddrData();
      this.form.addr = JSON.parse(localStorage.getItem('addrData'));

    },
    methods: {
      getAddrList() {//获取地区列表
        getAddr()
          .then(res => {
            this.addrOptions = res.data.dataList
          })
          .catch(res => {
            console.log(res)
          })
      },
      getRoleType() {//获取角色列表
        let pageData = {
          page: '1',
          cols: '15',
          roleName: '',
          USERID: this.userId,
        }
        getRoleList(pageData)
          .then(res => {
            this.roleOptions = res.data.roleList;
            res.data.roleList.forEach(ele => {
              if (ele.roleId == this.$route.params.roleId) {
                this.form.role = ele.roleName;
              }
            });
          })
          .catch(res => {
            console.log(res)
          })
      },
      getAddrData() {
        // 获取地址
        getAddr()
          .then(res => {
            if (this.$route.params.area_Id) {
              let oneLevel = this.$route.params.area_Id.slice(0, 2);
              let towLevel = this.$route.params.area_Id.slice(2, 4);
              let threeLevel = this.$route.params.area_Id.slice(4, 6);
              let addrArr = [];
              res.data.dataList.forEach(ele => {
                if (oneLevel == 11 || oneLevel == 12 || oneLevel == 50 || oneLevel == 31 || oneLevel == 81 || oneLevel == 82) {
                  if (ele.szm == oneLevel + "0000") {
                    addrArr.push(ele.szm);
                    ele.list.forEach(ele => {
                      if (ele.szm == oneLevel + "0000") {
                        // addrArr.push(ele.caption)
                        addrArr.push(ele.szm)
                        ele.list.forEach(ele => {
                          if (ele.szm == oneLevel + towLevel + threeLevel) {
                            // addrArr.push(ele.caption)
                            addrArr.push(ele.szm)
                          }
                        })
                      }
                    })
                  }
                } else {
                  if (ele.szm == oneLevel + "0000") {
                    // addrArr.push(ele.caption)
                    addrArr.push(ele.szm);
                    ele.list.forEach(ele => {
                      if (ele.szm == oneLevel + towLevel + '00') {
                        // addrArr.push(ele.caption)
                        addrArr.push(ele.szm)
                        ele.list.forEach(ele => {
                          if (ele.szm == oneLevel + towLevel + threeLevel) {
                            // addrArr.push(ele.caption)
                            addrArr.push(ele.szm)
                          }
                        })
                      }
                    })
                  }
                }

              })
              // console.log(addrArr)
              this.form.addr = addrArr
            }
          })
          .catch(res => {
            console.log(res)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 根据地区序列号查询地址
            let addrArr = [];
            this.addrOptions.forEach(ele => {
              if (ele.szm == this.form.addr[0]) {
                addrArr.push(ele.caption)
                ele.list.forEach(ele => {
                  if (ele.szm == this.form.addr[1]) {
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                      if (ele.szm == this.form.addr[2]) {
                        addrArr.push(ele.caption)
                      }
                    })
                  }
                })
              }
            })
            let data = {
              userName: this.form.account,//账号
              password: this.form.password,//密码
              roleId: this.form.role,//角色
              contact: this.form.people,//联系人
              telphone: this.form.phoneNumber,// 联系人电话
              state: "1",
              licenceNo: this.form.licenceNo,//营业执照号
              regId: this.form.regId,//身份证
              nodeName: this.form.cooperativeName,//合作社名称
              name: this.form.name,//联系人
              callphone: this.form.callphone,//联系电话
              areaId: this.form.addr[2],//地址序列号
              areaName: addrArr.join(""),//地址名称
              addr: this.form.inforAddr,//地址详细信息
              userId: this.userId,//用户id
              shop_booth_id: this.$route.params.shop_booth_id,
            }
            // console.log(data)
            EditSave(data)
              .then(res => {
                if (res.result) {
                  this.submitFormLz();
                  this.$message.success("恭喜您，保存成功！")
                  this.$router.push({name: 'ManagementCrop'})
                } else {
                  console.log(res.result);
                }
              })
              .catch(res => {
                console.log(res.message)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

      //  将图片转换成Base64位
      changeImg(e) {
        var _this = this;
        var imgLimit = 1024;
        var files = e.target.files;
        var image = new Image();
        if (files.length > 0) {
          var dd = 0;
          if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
            return false;
          }
          if (files.item(dd).size > imgLimit * 102400) {
            //to do sth
          } else {
            image.src = window.URL.createObjectURL(files.item(dd));
            image.onload = function () {
              var w = image.width,
                h = image.height,
                scale = w / h;
              w = 200;
              h = w / scale;
              var quality = 0.1;
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var anw = document.createAttribute("width");
              anw.nodeValue = w;
              var anh = document.createAttribute("height");
              anh.nodeValue = h;
              canvas.setAttributeNode(anw);
              canvas.setAttributeNode(anh);
              ctx.drawImage(image, 0, 0, w, h);
              var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
              var base64 = canvas.toDataURL("image/" + ext, quality);
              _this.showBaseCode = base64.substring(22);
              if (_this.imgArr.length = 1) {
                _this.imgArr.splice(0, 1, base64);
              }
            }
          }
        }
      },
      //  表单提交数据
      submitFormLz() {
        let formData = new FormData();
        formData.append('shop_booth_id', this.$route.params.shop_booth_id);
        formData.append('img_url', this.showBaseCode);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(nsHeZuoSheImagUrl, formData, config).then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
          }
        })
      },
    }
  }
</script>

<style lang='less' scoped>
  @color: #409EFF;
  .content {
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .title {
      display: block;
      margin-bottom: 10px;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
    }
    .input {
      width: 150px;
    }
    .block-item {
      display: block;
      padding-left: 100px;
    }
    .shop-msg-input {
      width: 280px;
    }
    .add-infor-input {
      display: block;
      margin-top: 20px;
      width: 280px;
    }
    .new-add {
      margin-left: 300px;
    }
  }
</style>
