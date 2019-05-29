<template>
  <div class="content">
    <div class="big-box">
      <div class="section-content">
        <el-form  label-width="120px">
          <el-form-item label="商品名称：">{{goodsName}} </el-form-item>
          <el-form-item label="图片：">
            <div class="box-fileimg">
              <figure class="image" v-if="imgUrl">
                <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + imgUrl">
              </figure>
            </div>
          </el-form-item>
          <el-form-item label="品种：">{{varieties}} </el-form-item>
          <el-form-item label="价格：" >{{price}} </el-form-item>
          <el-form-item label="单位：">{{specifications}} </el-form-item>
          <el-form-item label="规格：" v-if="isShow">{{measuringUnit}} </el-form-item>
          <el-form-item label="供应商：">{{supplier}} </el-form-item>
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
      <div class="material-list" v-if="materialArr.length > 0">
        <div class="material-title">
          <p>原料配比表</p>
        </div>
        <div class="material-content">
          <div class="material-item" v-for="(item, index) in materialArr" :key="index">
            <ul class="item">
              <li>
                <p>原料</p>
                <p>{{item.or_goods_name}}</p>
              </li>
              <li>
                <p>单位</p>
                <p>{{item.or_unit}}</p>
              </li>
              <li v-if="item.or_specification">
                <p>规格</p>
                <p>{{item.or_specification}}</p>
              </li>
              <li class="block">
                <p>使用量</span>
                <p class="number">
                  <span>{{item.or_number}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
        materialArr: [],
        areaName: '',
        supplier: '',
        imgUrl: '',
        logoUrl: '',
        isShow:false,
      }
    },
    mounted(){
      console.log(this.$route.params.goodsMsg)
      if(this.$route.params.goodsMsg.stk_list){
        this.materialArr = this.$route.params.goodsMsg.stk_list;
      }
      this.imgUrl = this.$route.params.goodsMsg.IMG_URL
      this.logoUrl = this.$route.params.goodsMsg.PRODUCT_IMG_URL
      this.supplier = this.$route.params.goodsMsg.SUPPLIERS_NAME;
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
    },
    methods: {
      modify(){
        this.$router.push({name:'EditMarket',params:{'goodsMsg':this.$route.params.goodsMsg,areaId: this.$route.params.areaId}})
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
    .big-box{
      display: flow-root;
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .section-content{
      float: left;
      padding-top: 20px;
      padding-right: 10px;
      margin-right: 40px;
      width: 460px;
    }
    .new-add{
      margin-top: 30px;
    }
    .material-list{
      float: left;
      margin-top: 30px;
      width: 400px;
      background: #f2f2f2;
      border: 1px solid #ccc;
      box-sizing: border-box;
      .material-title{
        p{
          padding-left: 20px;
          font-size: 14px;
          line-height: 50px;
        }
      }
      .material-content{
        display: flex;
        flex-wrap:wrap;
      }
      .material-item{
        margin: 16px 19px;
        width: 160px;
        height: 160px;
        background: #fff;
        .item{
          margin-top: 14px; 
          li{
            display: flex;
            p{
              width: 80px;
              font-size: 14px;
              line-height: 30px;
            }
            p:first-child{
              margin-right: 10px;
              width: 70px;
              text-align: right;
              color: #666;
            }
            .number{
              width: 56px;
              overflow: hidden;
            }
          }
        }
      }
    }
    
  }
</style>