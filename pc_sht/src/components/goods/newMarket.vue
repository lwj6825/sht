<template>
  <div class="header">
    <div class="section-content">
      <el-form  label-width="120px"  :model="form" ref="form" >
        <el-form-item label="商品名称：">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="品种：">
          <el-cascader
            style="width: 100%"
            :options="systemDefaultType"
            filterable
            @change="handleChange"
            placeholder="可搜索"
            :props="props"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input style="width: 90%" v-model="form.price"></el-input>
          <span >&nbsp;&nbsp;元</span>
        </el-form-item>
        <el-form-item label="包装规格：" >
          <el-select v-model="form.specifications"  placeholder="未选择"  @change="selectChange">
            <el-option  v-for="item in specificationList" :key="item.TYPE_NAME" :label="item.TYPE_NAME"  :value="item.TYPE_NAME" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计量单位：" v-show="isShow">
          <el-input style="width: 150px" v-model="form.input"></el-input>
          <el-select v-model="form.specifications" style="width: 100px" placeholder="未选择" @change="selectChange">
            <el-option  v-for="item in specificationList" :key="item.TYPE_NAME" :label="item.TYPE_NAME"  :value="item.TYPE_NAME"  >
            </el-option>
          </el-select>
          <el-input style="width: 60px;text-align: center" :disabled="true" placeholder="/箱" v-model="form.goodsUnit"></el-input>
        </el-form-item>
        <el-form-item label="供应商：">
          <el-select v-model="form.suppliersId" style="width: 100%" placeholder="请选择供应商" >
            <el-option  v-for="item in suppliersList" :key="item.SHOP_CONCACTS_ID" :label="item.BIZ_NAME"  :value="item.SHOP_CONCACTS_ID" >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getDefaultProductTypes,allSuppliers,allSpecification,saleAdd} from "../../js/goods/goods.js";
  export default {
    name: "",
    created() {
      this.form.userId = localStorage.getItem('userId')
    },
    data() {
      return {
        isShow:true,
        //产品分类--系统默认提供
        systemDefaultType:[],
        props: {
          value: 'level_id',
          label: 'type_name',
          children: 'systemDefaultTypeList'
        },
        form: {
          userId: 2,
          goodsName:"",
          gbCode:"",
          gbName:"",

          price:"",
          goodsUnit:"1箱",
          input:"",
          specifications:"",

          suppliersId:"",
          suppliersName:"",
        },
        suppliersList:[],
        specificationList:[],
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              goodsName:this.form.goodsName,
//              gbCode:this.form.gbCode,
              gbCode:"00-01-02",
              price:this.form.price,
              goodsUnit:this.form.goodsUnit,
              specifications:this.form.input+""+this.form.specifications,
              suppliersId:this.form.suppliersId,
              userId:this.form.userId,
            };
//                console.log(JSON.stringify(params))
            saleAdd(params)
              .then(res => {
                if (res.result == true) {
                  this.$message.success(res.message);
                  this.$router.go(-1);
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
      handleChange(value) {
        this.form.gbCode =value[value.length - 1]
        console.log(this.form.gbCode)
      },
      selectChange(value) {
        console.log("value---"+JSON.stringify(value))
        if(value == "斤" ){
          this.isShow = false
          console.log("1")
        }else if(value == "公斤"){
          this.isShow = false
          console.log("2")
        }else {
          this.isShow = true
          console.log("3")
        }
      },
      //“产品分类-系统默认提供”列表
      systemDefaultTypeLists(){
        getDefaultProductTypes()
          .then(res =>{
            this.systemDefaultType = res;
          })
          .catch(() => {
            console.log("失败")
            this.$message.error("出错啦!");
          })
      },
      //查询供应商列表
      getAllSuppliers(){
        allSuppliers()
          .then(res =>{
            this.suppliersList = res.data.suppliersList;
          })
          .catch(() => {
            console.log("失败")
            this.$message.error("出错啦!");
          })
      },
      //查询规格列表
      getAllSpecification(){
        allSpecification()
          .then(res =>{
            this.specificationList = res.data.specificationList;
          })
          .catch(() => {
            console.log("失败")
            this.$message.error("出错啦!");
          })
      },
      initData() {
        //查询商品品种三级列表
        this.systemDefaultTypeLists()
        //查询供应商列表
        this.getAllSuppliers()
        //查询规格列表
        this.getAllSpecification()

      }
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .header {
    padding: 10px;
    width: 100%;
    .section-content{
      padding: 20px 100px;
      width: 500px;
    }
    .new-add{
      background: #199ed8;
    }

  }
</style>
