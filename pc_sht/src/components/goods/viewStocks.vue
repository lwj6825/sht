<template>
  <div class="content">
    <div class="section-content">
      <el-form  label-width="120px">
        <el-form-item label="商品名称：">{{goodsName}} </el-form-item>
        <el-form-item label="图片：">
          <div class="box-fileimg">
            <figure class="image">
              <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + imgUrl">
            </figure>
          </div>
        </el-form-item>
        <el-form-item label="品种：">{{varieties}} </el-form-item>
        <el-form-item label="价格：" >{{price}} </el-form-item>
        <el-form-item label="单位：">{{specifications}} </el-form-item>
        <div v-if="isShow">
          <el-form-item label="规格：">{{measuringUnit}} </el-form-item>
        </div>
        <el-form-item label="供应商：">{{supplierName}} </el-form-item>
        <el-form-item label="产地：">{{areaName}} </el-form-item>
        <el-form-item label="商品介绍：">
          <div class="box-fileimg">
            <figure class="image" v-if="logoUrl">
              <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + logoUrl">
            </figure> 
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="new-add" @click="modify()" >修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",    
    data() {
      return {
        goodsName:'',
        varieties:'',
        price:'',
        specifications:'',
        measuringUnit:'',
        supplierName:'',
        isShow:false,
        imgUrl: '',
        logoUrl: '',
        areaName: '',
      }
    },
    mounted(){
      console.log(this.$route.params)
      if(JSON.stringify(this.$route.params) != '{}'){
     
        if(this.$route.params.goodsMsg.IMG_URL == null){
          this.imgUrl = '';
        }else{
          this.imgUrl = this.$route.params.goodsMsg.IMG_URL
        }
        if(this.$route.params.goodsMsg.PRODUCT_IMG_URL == null){
          this.logoUrl = '';
        }else{
          this.logoUrl = this.$route.params.goodsMsg.PRODUCT_IMG_URL;
        }
        this.areaName = this.$route.params.goodsMsg.areaOriginNname;
        this.goodsName = this.$route.params.goodsMsg.GOODS_NAME;
        this.varieties = this.$route.params.goodsMsg.GB_NAME;
        this.price = this.$route.params.goodsMsg.PRICE;
        this.specifications = this.$route.params.goodsMsg.GOODS_UNIT;
        if(this.specifications == '斤' || this.specifications == '公斤'){
          this.isShow = false
        }else{
          this.isShow = true
        }
        if(this.$route.params.goodsMsg.SPECIFICATIONS){
          this.measuringUnit =this.$route.params.goodsMsg.COUNT + this.$route.params.goodsMsg.SPECIFICATIONS +'/'+ this.$route.params.goodsMsg.GOODS_UNIT;
        }else{
          this.measuringUnit = '';
        }
        this.supplierName = this.$route.params.goodsMsg.SUPPLIERS_NAME;

      }
    },
    methods: {
      modify(){
        this.$router.push({name:'EditStocks',params:{'goodsMsg':this.$route.params.goodsMsg}})
      }
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .content {
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .section-content{
      padding: 20px 100px;
      width: 500px;
    }
    .new-add{
      margin-top: 30px;
    }
    
    .box-fileimg{
      display: flex;
      width: 300px;
      height: 100px;
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
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
