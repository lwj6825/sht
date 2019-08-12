<template>
    <div class="header">
        <div class="section-content">
          <el-form :model="form" :rules="rules" ref="form"  label-width="120px">
            <el-form-item label="营业执照：">
                <el-input v-model="form.licenceNo" clearable></el-input>
                <el-select v-model="value4" clearable placeholder="请选择" v-if="show" @change="selectFun">
                  <el-option
                    v-for="(item) in options"
                    :key="item.biz_id"
                    :label="item.biz_name"
                    :value="item.biz_id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号：">
              <el-input v-model="form.regId" clearable></el-input>
            </el-form-item>
            <el-form-item label="经营范围：" prop="boothType">
              <el-select v-model="form.boothType" placeholder="请选择经营范围" @change="boothChange">
                <el-option  v-for="val in boothArr" :key="val.code" :label="val.name" :value="val.code" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供货单位：">
              <el-select v-model="form.ghdw" placeholder="请选择供货单位" @change="selectGhdw" filterable>
                <el-option  v-for="val in dwArr" :key="val.ID" :label="val.SUPPLIER_NAME" :value="val.SUPPLIER_NAME" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商名称：" prop="bizName">
              <el-input v-model="form.bizName" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="callphone">
              <el-input v-model="form.callphone" clearable></el-input>
            </el-form-item>
            <el-form-item label="地区：" prop="addr">
              <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address" clearable :props="props" change-on-select></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址：" prop="infoAddr">
              <el-input v-model="form.infoAddr" placeholder="请输入详细地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="产地：">
              <el-cascader :options="addrOptions" v-model="form.origin_name" placeholder="省/市/县" class="address" clearable :props="props" change-on-select></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>

          </el-form>

        </div>
    </div>
</template>

<script>
  import {insGys,GetCenterBussinessInfo} from "../../js/management/management.js";
  import {getAddr} from '../../js/user/user.js';
  import {QuerySuppiler} from '../../js/standingBook/standingBook.js'

  export default {
    name: "",
    data() {
      return {
        show: false,
        options: [],
        value4: '',
        form: {
          boothType: '',
          ghdw: '',
          type: 1,
          userId: 2,
          licenceNo: '',//营业执照
          bizName: '',//客户名称
          regId: '',//身份证号
          name: '',//联系人
          callphone: '',//联系方式
          addr: [],//地址
          infoAddr:'',//详细地址
          origin_name: [],//产地
          origin_id: '',
        },
        addrOptions:[],
        props:{
          label: 'caption',
          value:'szm',
          children: 'list'
        },
        rules:{
          // licenceNo: [
          //   { required: true, message: '请输入营业执照', trigger: 'blur' }
          // ],
          bizName: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' }
          ],
          boothType: [
            { required: true, message: '请选择经营范围', trigger: 'blur' }
          ],
          ghdw: [
            { required: true, message: '请选择供货单位', trigger: 'blur' }
          ],
          // regId: [
          //   { required: true, message: '请输入身份证号', trigger: 'blur' },
          //   {
          //     pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
          //   }
          // ],
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
            { required: true, message: '请选择地址', trigger: 'blur' }
          ],
          origin_name: [
            { required: true, message: '请输入产地', trigger: 'blur' }
          ],

        },
        areaId: '',
        dwArr: [],
        isRegion: '',
        scShopId: '',
        ghdwId: '',
        boothName: '',
        boothArr: [
          { name: '肉类', code: '2005', },
          { name: '蔬菜', code: '1005', },
          { name: '水果类', code: '10061', },
          { name: '禽蛋类', code: '10062', },
          { name: '粮油副食', code: '10063', },
          { name: '酒水饮料', code: '10064', },
          { name: '干货类', code: '10065', },
          { name: '水产类', code: '10066', },
          { name: '其它', code: '1006', },
        ],
        biz_id: '',
        node_id: '',
      }
    },
    created() {
      this.form.userId = localStorage.getItem('userId')
    },
    mounted(){
      this.isRegion = localStorage.getItem('isRegion')
      this.scShopId = localStorage.getItem('scShopId');
      this.node_id = localStorage.getItem('loginId');
      this.areaId = this.$route.params.areaId
      this.getAddrList()//获取地区列表
      this.getGhdwFun()
    },
    watch: {
      'form.licenceNo': function (val) {
          if (val.length == 0) {
            this.show = false
            this.value4 = ''
          } else{
            this.show = true
            this.getYyzhFun()
          } 
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
        console.log(val)
        this.dwArr.forEach((ele)=>{ 
          if(ele.SUPPLIER_NAME == val){
            this.ghdwId = ele.SUPPLIER_ID;
              
          }
        })
      },
      selectFun(val){
        if(val == ''){
          this.form.name = ''
          this.form.callphone = ''
          this.form.bizName = ''
          this.biz_id = ''
        }else{
          this.options.forEach((ele)=>{ 
            if(ele.biz_id == val){
              this.form.name = ele.legal_represent
              this.form.callphone = ele.telphone
              this.form.bizName = ele.biz_name
              this.biz_id = ele.biz_id
            }
          })
        }
      },
      // 营业执照
      getYyzhFun(){
        let obj = {
          regId: this.form.licenceNo,
          node_id: this.node_id
        }
        GetCenterBussinessInfo(obj)
          .then(res => {
            this.options = res.data.dataList
          })
          .catch(res => {
              console.log(res)
          })
      },
      // 经营范围
      boothChange(val){
        console.log(val)
        this.boothArr.forEach((ele)=>{ 
          if(ele.code == val){
            this.boothName = ele.name;

          }
        })
        console.log(this.boothName)
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
      submitForm(formName) {
        if(this.form.licenceNo == ''){
          this.$message.error('营业执照号不能为空');
        }else{   
          this.$refs[formName].validate((valid) => {
            if (valid) {
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
                bizId: this.biz_id,
                name: this.form.name,//店铺联系人
                callphone: this.form.callphone,//店铺联系方式
                areaId: this.form.addr[this.form.addr.length-1],
                areaName: addrArr.join(""),//所在地区
                addr: this.form.infoAddr,//地址
                area_origin_id: this.form.origin_name[this.form.origin_name.length -1],//产地
                area_origin_name: originArr.join(''),
                region:this.areaId,
                supplier_type: this.boothName, //经营范围
                supplier_code: this.form.boothType,
                ws_supplier: this.form.ghdw, // 供货单位
                ws_supplier_id: this.ghdwId,
                shop_booth_id: this.scShopId
              };
              insGys(params)
                .then(res => {
                  if (res.message == "保存成功") {
                    this.$message.success(res.message);
                    this.$router.push({path:'supplierMgm'});
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
        }
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
    width: 800px;
    .el-form{
      width: 700px;
    }
    .el-input,.el-cascader,.el-select{
      width: 280px;
    }
  }
  .new-add{
    background: #409EFF;
  }
}
.address{
  width: 280px;
}
</style>

