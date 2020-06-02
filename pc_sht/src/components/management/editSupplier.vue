<template>
    <div class="header">

        <div class="section-content">
          <el-form :model="form" :rules="rules" ref="form"  label-width="120px">
            <el-form-item label="供应商名称："  prop="bizName">
              <el-input v-model="form.bizName" clearable></el-input>
            </el-form-item>
            <el-form-item label="营业执照：">
              <el-input v-model="form.licenceNo" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
              <el-input v-model="form.regId" clearable></el-input>
            </el-form-item>
            <el-form-item label="供货单位：" prop="ghdw">
              <el-select class="address" v-model="form.ghdw" placeholder="请选择供货单位" @change="selectGhdw" filterable>
                <el-option  v-for="val in dwArr" :key="val.ID" :label="val.SUPPLIER_NAME" :value="val.SUPPLIER_NAME" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人：" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="callphone">
              <el-input v-model="form.callphone" clearable></el-input>
            </el-form-item>
            <el-form-item label="地区：" prop="addr">
              <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address"
                clearable :props="props" change-on-select ></el-cascader>
              <el-input v-model="form.infoAddr" style='margin-top:20px;' placeholder="请输入详细地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="产地：" prop="origin_name">
              <el-cascader :options="addrOptions" v-model="form.origin_name" placeholder="省/市/县" class="address"
                clearable :props="props" change-on-select ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="new-add" @click="submitForm('form')" :disabled="disabled">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import {getAddr} from '../../js/user/user.js';
  import {UpdateGys} from '../../js/management/management.js'
  import {QuerySuppiler} from '../../js/standingBook/standingBook.js'
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
                origin_name: [],//产地
                origin_id: '',
                shop_concacts_id:'',
                ghdw: '',
                ghdw_id: '',
              },
              addrOptions:[],
              props:{
                label: 'caption',
                value:'szm',
                children: 'list'
              },
              dwArr: [],
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
                  { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                addr: [
                  { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                origin_name: [
                  { required: true, message: '请选择产地', trigger: 'blur' }
                ],
              },
              scShopId: '',
              areaId: '',
              disabled: false,
              isRegion: '',
            }
        },
        created() {
          this.form.userId = localStorage.getItem('userId')
          this.scShopId = localStorage.getItem('scShopId');
          this.areaId = this.$route.query.areaId
        },
        mounted(){
          this.isRegion = localStorage.getItem('isRegion')
          this.getAddrList()//获取地区列表     
          this.getGhdwFun()     
          if(this.$route.query.gysMsg){
            let gysMsg = JSON.parse(this.$route.query.gysMsg)
            this.form.type = gysMsg.type;
            this.form.licenceNo = gysMsg.licence_no;//营业执照
            this.form.bizName = gysMsg.biz_name;//供应商名称
            this.form.regId = gysMsg.regId;//身份证号
            this.form.name = gysMsg.concact_name;//联系人
            this.form.callphone = gysMsg.cellphone;//联系方式
            this.form.addrId = gysMsg.area_id;
            this.form.origin_id = gysMsg.area_origin_id
            this.form.ghdw = gysMsg.ws_supplier
            this.form.ghdw_id = gysMsg.ws_supplier_id
            let arr = [];
            if(gysMsg.area_id){
              if(gysMsg.area_id.slice(4,6) != '00'){
                arr.unshift(gysMsg.area_id);
              }
              if(gysMsg.area_id.slice(2,4) != '00'){
                arr.unshift(gysMsg.area_id.slice(0,4)+'00');
              }
              if(gysMsg.area_id.slice(0,2) != '00'){
                arr.unshift(gysMsg.area_id.slice(0,2)+'0000');
              }
            }
            this.form.addr = arr;
            this.form.infoAddr =gysMsg.addr;//详细地址
            this.form.shop_concacts_id = gysMsg.shop_concacts_id;
            let originArr = [];
            if(gysMsg.area_origin_id){
              if(gysMsg.area_origin_id.slice(4,6) != '00'){
                originArr.unshift(gysMsg.area_origin_id);
              }
              if(gysMsg.area_origin_id.slice(2,4) != '00'){
                originArr.unshift(gysMsg.area_origin_id.slice(0,4)+'00');
              }
              if(gysMsg.area_origin_id.slice(0,2) != '00'){
                originArr.unshift(gysMsg.area_origin_id.slice(0,2)+'0000');
              }
            }
            this.form.origin_name = originArr
          }
        },
        methods: {
           // 供货单位
          getGhdwFun(){
            if(this.isRegion == 'false'){
              let obj = {
                shop_booth_id: this.scShopId
              }
              QuerySuppiler(obj)
                .then(res => {
                  this.dwArr = res.data.suppilerList
                })
                .catch(() => {
                  this.$message.error("出错啦!");
                })
            }else{
              let obj = {
                shop_booth_id: this.areaId
              }
              QuerySuppiler(obj)
                .then(res => {
                  this.dwArr = res.data.suppilerList
                })
                .catch(() => {
                  this.$message.error("出错啦!");
                })
            }
          },
          // 选择供货单位
          selectGhdw(val){
            this.dwArr.forEach((ele)=>{ 
              if(ele.SUPPLIER_NAME == val){
                this.form.ghdw_id = ele.SUPPLIER_ID;
                  
              }
            })
          },
          getAddrList(){//获取地区列表
            getAddr()
              .then(res => {
                this.addrOptions = res.data.dataList;
                let addrArr = [];
                if(this.$route.query.gysMsg){
                  let gysMsg = JSON.parse(this.$route.query.gysMsg)
                  if(gysMsg.area_name){
                    let areaName = gysMsg.area_name
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
                    }else{
                      return
                    }
                    this.form.addr = addrArr.slice(0,3)
                  }
                  if(gysMsg.area_origin_name){
                    let areaName = gysMsg.area_origin_name, arr = [];
                    if(areaName.slice(0,3) == '北京市'){
                      this.addrOptions.forEach(ele => {
                        arr.push('110000')
                        ele.list.forEach(ele => {
                          if(areaName.slice(3,6) == ele.caption){
                            arr.push(ele.szm)
                            ele.list.forEach(ele => {
                              if(areaName.slice(6) == ele.caption){
                                arr.push(ele.szm)                              
                              }
                            })
                          }
                        })
                      })
                    }else if(areaName.slice(0,3) == '上海市'){
                      arr.push('310000')
                      this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                          if(areaName.slice(3,6) == ele.caption){
                            arr.push(ele.szm)
                            ele.list.forEach(ele => {
                              if(areaName.slice(6) == ele.caption){
                                arr.push(ele.szm)                              
                              }
                            })
                          }
                        })
                      })
                    }else if(areaName.slice(0,3) == '天津市'){
                      arr.push('120000')
                      this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                          if(areaName.slice(3,6) == ele.caption){
                            arr.push(ele.szm)
                            ele.list.forEach(ele => {
                              if(areaName.slice(6) == ele.caption){
                                arr.push(ele.szm)                              
                              }
                            })
                          }
                        })
                      })
                    }else if(areaName.slice(0,3) == '重庆市'){
                      arr.push('500000')
                      this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                          if(areaName.slice(3,6) == ele.caption){
                            arr.push(ele.szm)
                            ele.list.forEach(ele => {
                              if(areaName.slice(6) == ele.caption){
                                arr.push(ele.szm)                              
                              }
                            })
                          }
                        })
                      })
                    }else{
                      return
                    }
                    this.form.origin_name = arr.slice(0,3)
                  }
                }
              })
              .catch(res => {
                  console.log(res)
              })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.disabled = true
                this.editFun()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          editFun(){
            // 根据地区序列号查询地址
            let addrArr = [], originArr = [];
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
            this.addrOptions.forEach(ele => {
              if(ele.szm == this.form.origin_name[0]){
                originArr.push(ele.caption)
                ele.list.forEach(ele => {
                  if(ele.szm == this.form.origin_name[1]){
                    originArr.push(ele.caption)
                    ele.list.forEach(ele => {
                      if(ele.szm == this.form.origin_name[2]){
                        originArr.push(ele.caption)                              
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
              area_origin_id: this.form.origin_name[this.form.origin_name.length -1],
              area_origin_name: originArr.join(''),
              region:localStorage.getItem('gysAreaId'),
              shop_concacts_id: this.form.shop_concacts_id ,
              ws_supplier: this.form.ghdw, // 供货单位
              ws_supplier_id: this.form.ghdw_id,
            };
            UpdateGys(params)
              .then(res => {
                this.disabled = false
                if (res.result) {
                  this.$message.success(res.message);
                  this.$router.push({path:'supplierMgm'})
                  this.$emit("changePage",{});
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {
                this.disabled = false
              })
          }
        }
    };
</script>

<style lang='less' scoped>
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
