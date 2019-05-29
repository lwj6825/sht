<template>
  <div class="header">
    <div class="section-content">
      <el-form :model="form" :rules="rules" ref="form"  label-width="120px">
        <el-form-item label="营业执照：">
          <el-input v-model="form.licenceNo"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="form.regId"></el-input>
        </el-form-item>
        <el-form-item label="客户名称："  prop="bizName">
          <el-input v-model="form.bizName"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="callphone">
          <el-input v-model="form.callphone"></el-input>
        </el-form-item>
         <el-form-item label="地址：" prop="addr">
              <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address"
                clearable :props="props" change-on-select></el-cascader>
              <el-input v-model="form.infoAddr" style='margin-top:20px;' placeholder="请输入详细地址" clearable></el-input>
            </el-form-item>
        <el-form-item>
          <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
  import {InsertKh} from "../../js/management/management.js";
  import {getAddr} from '../../js/user/user.js';

  export default {
    name: "",
    data() {
      return {
        form: {
          type: 2,
          userId: 2,
          licenceNo: '',//营业执照
          bizName: '',//客户名称
          regId: '',//身份证号
          name: '',//联系人
          callphone: '',//联系方式
          addr: [],//地址
          inforAddr: '',//详细地址
        },
        addrOptions:[],
        props:{
            label: 'caption',
            value:'szm',
            children: 'list'
        },
        rules:{
          licenceNo: [
            { required: true, message: '请输入营业执照', trigger: 'blur' }
          ],
          bizName: [
            { required: true, message: '请输入客户名称', trigger: 'blur' }
          ],
          regId: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            {
              pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
            }
          ],
          name: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          callphone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            {validator:function(rule,value,callback){
              if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
              }
              else{
                callback();
              }
            }, trigger: 'blur'}
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],

        },
        areaId: '',
        scShopId: '',
      }
    },
    created() {
      this.form.userId = localStorage.getItem('userId')
    },
    mounted(){
      this.areaId = this.$route.params.areaId
      this.scShopId = localStorage.getItem('scShopId');
        this.getAddrList()//获取地区列表
    },
    methods: {
      getAddrList(){//获取地区列表
        getAddr()
          .then(res => {
            this.addrOptions = res.data.dataList
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
            let params = {
              type:this.form.type,
              userId:this.form.userId,
              licenceNo: this.form.licenceNo,//营业执照
              regId: this.form.regId,//身份证号
              bizName: this.form.bizName,//供应商名称
              name: this.form.name,//店铺联系人
              callphone: this.form.callphone,//店铺联系方式
              areaId: this.form.addr[this.form.addr.length-1],
              areaName: addrArr.join(""),//所在地区
              addr: this.form.infoAddr,//地址
              region:this.areaId,
              shop_booth_id: this.scShopId
            };
            InsertKh(params)
              .then(res => {
                // console.log(res)
                if (res.message == "保存成功") {
                  this.$message.success(res.message);
                  this.$router.push({path:'clientMgm'});
                  // this.$emit('changePage',{})
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {
                this.$message.error("出错啦!");
              })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .header {
    padding: 10px;
    height: 100%;
    background: #fff;
    .section-content{
      padding: 20px 100px;
      width: 400px;
    }
    .new-add{
      background: #409EFF;
    }
  }
  .address{
    width: 280px;
  }
</style>
