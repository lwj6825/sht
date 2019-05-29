<template>
  <div class="content">
    <el-form :inline='true' ref="form" label-width="120px">
      <div class="title" ref="title">账号信息</div>
      <el-form-item label='账号：'>
        <span class="item-msg">{{account}}</span>
      </el-form-item>
      <el-form-item label='密码：'>
        <span class="item-msg">{{password}}</span>
      </el-form-item>
      <el-form-item label='角色：'>
        <span class="item-msg">{{role}}</span>
      </el-form-item>
      <div>
        <el-form-item label='联系人：'>
          <span class="item-msg">{{people}}</span>
        </el-form-item>
        <el-form-item label='联系方式：'>
          <span class="item-msg">{{phoneNumber}}</span>
          <el-checkbox style="display:inline-block;" v-model="checked">是否向商户发送短信告知账号信息？</el-checkbox>
        </el-form-item>
      </div>
      <div class="title">商铺信息</div>

      <div class="lz-shopinfo">
        <div class="lz-shopinfo-left">营业执照：</div>
        <div class="lz-shopinfo-right">{{licenceNo}}</div>
      </div><div class="lz-shopinfo">
        <div class="lz-shopinfo-left">身份证号：</div>
        <div class="lz-shopinfo-right">{{regId}}</div>
      </div><div class="lz-shopinfo">
        <div class="lz-shopinfo-left">合作社名称：</div>
        <div class="lz-shopinfo-right">{{cooperativeName}}</div>
      </div><div class="lz-shopinfo">
        <div class="lz-shopinfo-left">联系人：</div>
        <div class="lz-shopinfo-right">{{name}}</div>
      </div><div class="lz-shopinfo">
        <div class="lz-shopinfo-left">联系电话：</div>
        <div class="lz-shopinfo-right">{{callphone}}</div>
      </div>
      <div class="lz-shopinfo">
        <div class="lz-shopinfo-left">地址：</div>
        <div class="lz-shopinfo-right">{{addr}}</div>
      </div>

      <div class="lz-shopinfo">
        <div class="lz-shopinfo-left">图片信息：</div>
        <div class="lz-shopinfo-right">

          <div class="lz-tp">
            <img class="lz-tp-img" :src="BaseImgUrl"/>
          </div>

        </div>
      </div>


      <div class="block-item">

        <el-button type="primary" class="new-add" @click="edit()" size="mini">修改</el-button>
      </div>


      <!--之前代码-->
      <!--<el-form-item label="营业执照：" class="block-item">{{licenceNo}}</el-form-item>-->
      <!--<el-form-item label="身份证号：" class="block-item">{{regId}}</el-form-item>-->
      <!--<el-form-item label="合作社名称：" class="block-item">{{cooperativeName}}</el-form-item>-->
      <!--<el-form-item label="联系人：" class="block-item">{{name}}</el-form-item>-->
      <!--<el-form-item label="联系电话：" class="block-item">{{callphone}}</el-form-item>-->
      <!--<el-form-item label="地址：" class="block-item">{{addr}}</el-form-item>-->
      <!--<el-form-item label="图片信息：" class="block-item">-->

        <!--&lt;!&ndash;<img src="../../assets/images/guo03.jpg"/>&ndash;&gt;-->

      <!--</el-form-item>-->
      <!--<el-form-item class="block-item">-->
        <!--<el-button type="primary" class="new-add" @click="edit()" size="mini">修改</el-button>-->
      <!--</el-form-item>-->
    </el-form>
  </div>
</template>

<script>
  import {getRoleList} from '../../js/role/role.js';
  import {getAddr} from '../../js/user/user.js';
  import {BaseImgUrl} from '../../js/address/url.js';

  export default {
    name: 'InforCrop',
    data() {
      return {
        userId: '',
        checked: false,
        account: '',
        password: '',
        role: '合作社',
        people: '',
        phoneNumber: '',
        licenceNo: '',
        regId: '',
        cooperativeName: '',
        name: '',
        callphone: '',
        addr: '',
        BaseImgUrl: '',
      }
    },
    mounted() {

      this.account = this.$route.params.username;
      this.password = this.$route.params.password;
      // this.role = this.$route.params.roleId;
      this.people = this.$route.params.name;
      this.phoneNumber = this.$route.params.tel;
      this.licenceNo = this.$route.params.licence_no;
      this.regId = this.$route.params.regid;
      this.cooperativeName = this.$route.params.corporate_name;
      this.name = this.$route.params.contacts;
      this.callphone = this.$route.params.callphone;
      this.addr = this.$route.params.area_name + this.$route.params.addr;
      this.userId = this.$route.params.userId;
      this.BaseImgUrl = BaseImgUrl+this.$route.params.img_url;
      // console.log(BaseImgUrl+this.$route.params.img_url);
      this.getRoleType();
      this.getAddrData();

    },
    methods: {
      edit() {
        this.$router.push({name: 'EditCrop', params: this.$route.params})
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
            res.data.roleList.forEach(ele => {
              if (ele.roleId == this.$route.params.roleId) {
//                            this.role = ele.roleName;
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
                        addrArr.push(ele.szm)
                        ele.list.forEach(ele => {
                          if (ele.szm == oneLevel + towLevel + threeLevel) {
                            addrArr.push(ele.szm)
                          }
                        })
                      }
                    })
                  }
                } else {
                  if (ele.szm == oneLevel + "0000") {
                    addrArr.push(ele.szm);
                    ele.list.forEach(ele => {
                      if (ele.szm == oneLevel + towLevel + '00') {
                        addrArr.push(ele.szm)
                        ele.list.forEach(ele => {
                          if (ele.szm == oneLevel + towLevel + threeLevel) {
                            addrArr.push(ele.szm)
                          }
                        })
                      }
                    })
                  }
                }

              })
              localStorage.setItem('addrData', JSON.stringify(addrArr))
            }
          })
          .catch(res => {
//                    console.log(res)
          })
      }
    },
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
    .item-msg {
      display: inline-block;
      width: 150px;
    }
    .block-item {

      display: flex;

      /*display: block;*/
      padding-left: 100px;

      img {
        width: 50%;
        margin-left: 30px;
      }
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
      margin-left: 400px;
    }

    .lz-shopinfo {
      display: flex;
      margin-left: 200px;
      font-size: 14px;
      margin-bottom: 30px;

      .lz-shopinfo-left {
        width: 108px;
        color: #58595D;
        display: flex;
        justify-content: flex-end;
      }
      .lz-shopinfo-right {
        margin-left: 12px;

        .lz-tp {
          width: 200px;
          .lz-tp-img {
            width: 100%;
            height: 100%;
          }
        }

      }

    }

  }
</style>
