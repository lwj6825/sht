<template>
    <div class="header">

        <div class="section-content">
          <el-form :model="form" :rules="rules" ref="form"  label-width="120px">
            <el-form-item label="营业执照：">
              <el-input v-model="form.licenceNo" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
              <el-input v-model="form.regId" clearable></el-input>
            </el-form-item>
            <el-form-item label="供应商名称："  prop="bizName">
              <el-input v-model="form.bizName" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="callphone">
              <el-input v-model="form.callphone" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="addr">
              <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address"
                clearable :props="props" change-on-select ></el-cascader>
              <el-input v-model="form.infoAddr" style='margin-top:20px;' placeholder="请输入详细地址" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="new-add" @click="submitForm()" >保存</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import {getAddr} from '../../js/user/user.js';
  import {UpdateGys} from '../../js/management/management.js'
    export default {
      name: "",
        data() {
          return {
            form: {
              type: '',
              userId: 2,
              licenceNo: '',//营业执照
              bizName: '',//客户名称
              regId: '',//身份证号
              name: '',//联系人
              callphone: '',//联系方式
              addrId:'',
              addr: [],//地址
              infoAddr:'',//详细地址
              shop_concacts_id:'',
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
                { required: true, message: '请输入身份证号', trigger: 'blur' }
              ],
              name: [
                { required: true, message: '请输入联系人', trigger: 'blur' }
              ],
              callphone: [
                { required: true, message: '请输入联系方式', trigger: 'blur' }
              ],
              addr: [
                { required: true, message: '请输入地址', trigger: 'blur' }
              ],
            },

          }
        },
        mounted(){
          this.getAddrList()//获取地区列表      
          console.log(this.$route.params.gysMsg)   
          if(JSON.stringify(this.$route.params.gysMsg)){
            this.form.type = this.$route.params.gysMsg.type;
            this.form.licenceNo = this.$route.params.gysMsg.licence_no;//营业执照
            this.form.bizName = this.$route.params.gysMsg.biz_name;//供应商名称
            this.form.regId = this.$route.params.gysMsg.regId;//身份证号
            this.form.name = this.$route.params.gysMsg.concact_name;//联系人
            this.form.callphone = this.$route.params.gysMsg.cellphone;//联系方式
            this.form.addrId = this.$route.params.gysMsg.area_id;
            let arr = [];
            if(this.$route.params.gysMsg.area_id){
              if(this.$route.params.gysMsg.area_id.slice(4,6) != '00'){
                arr.unshift(this.$route.params.gysMsg.area_id);
              }
              if(this.$route.params.gysMsg.area_id.slice(2,4) != '00'){
                arr.unshift(this.$route.params.gysMsg.area_id.slice(0,4)+'00');
              }
              if(this.$route.params.gysMsg.area_id.slice(0,2) != '00'){
                arr.unshift(this.$route.params.gysMsg.area_id.slice(0,2)+'0000');
              }
            }
            this.form.addr = arr;
            this.form.infoAddr = this.$route.params.gysMsg.addr;//详细地址
            this.form.shop_concacts_id = this.$route.params.gysMsg.shop_concacts_id;
          }
        },
        created() {
          this.form.userId = localStorage.getItem('userId')
        },
        methods: {
          getAddrList(){//获取地区列表
            getAddr()
              .then(res => {
                this.addrOptions = res.data.dataList;
                let addrArr = [];
                if(this.$route.params.gysMsg){
                  if(this.$route.params.gysMsg.area_name){
                    let areaName = this.$route.params.gysMsg.area_name
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
                    }else if(areaName.slice(0,3) == '上海市'){
                      this.addrOptions.forEach(ele => {
                          addrArr.push('310000')
                          ele.list.forEach(ele => {
                            if(areaName.slice(3,6) == ele.caption){
                              addrArr.push(ele.szm)
                              ele.list.forEach(ele => {
                                // console.log(ele)
                                if(areaName.slice(6) == ele.caption){
                                  addrArr.push(ele.szm)                              
                                }
                              })
                            }
                          })
                      })
                    }else{
                      return
                    }
                    this.form.addr = addrArr.slice(0,3)
                  }
                }
              })
              .catch(res => {
                  console.log(res)
              })
          },
          submitForm(){
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
                areaId: this.form.addr[this.form.addr.length -1],
                areaName: addrArr.join(""),//所在地区
                addr: this.form.infoAddr,//地址
                region:localStorage.getItem('gysAreaId'),
                shop_concacts_id: this.form.shop_concacts_id ,
              };
              // console.log(params)
             UpdateGys(params)
              .then(res => {
                // console.log(res)
                if (res.result) {
                  this.$message.success(res.message);      
                  this.$router.push({path:'clientMgm'});
                  this.$emit('chagePage',{})
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {
                this.$message.error("出错啦!");
              })
        
        
        
          }
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
}
.address{
  width:280px;
}
</style>
