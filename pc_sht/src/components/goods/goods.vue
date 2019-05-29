<template>
  <div class="content">
    <nav class="aside-nav">
      <div class='head-title'>商品管理</div>
      <div class="data">
        <ul class="data-list">
          <li v-for="(item,key) in enterpriseMenu.children.nodeList" :key='key' :class="{active:currId == item.id}"
              @click='select(item.id,item.url)'>{{item.text}}</li>
        </ul>
      </div>
    </nav>
    <div class="top-title" v-if="isDefault">
        <TopHead :title='titleArr'></TopHead>   
    </div> 
    <div class="top-title" v-else>
        <NavHead :parent='parentOperation' :child='childOperation'></NavHead>
    </div>
    <div class="inner-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  // import menu from "../../assets/test/menu";
  import TopHead from '../common/header';
  import NavHead from '../common/navHeader';
  import Bus from '../common/bus.js'
  export default {
    name:'goods',
    data(){
      return{
        menu:'',
        enterpriseMenu:[],
        currId:'',
        titleArr:'',
        isDefault:true,
        parentOperation:'',
        childOperation:'',
      }
    },
    created(){
      this.menu = JSON.parse(localStorage.getItem('menuList'));
      this.menu.forEach((ele)=>{
        if(ele.text == "商品"){
          this.enterpriseMenu = ele
        }
      })
    },
    mounted(){
      this.currId = this.enterpriseMenu.children.nodeList[0].id;
      this.titleArr = this.$route.meta.title.join(",");
    },
    beforeUpdate(){
        Bus.$on('back',()=>{
          this.isDefault = true;
        })
        Bus.$on("addGoods",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg})
        });
        Bus.$on("viewGoods",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg.goodsMsg})
        });
        Bus.$on("editGoods",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg})
        });
        Bus.$on("addSellGoods",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg})
        });
        Bus.$on("viewSellGoods",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg.goodsMsg})
        });
        Bus.$on("editMarket",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/goods/'+ msg.url,query:msg})
        });
    },
    methods:{
      select(id,menuType){
        this.currId = id;
        this.isDefault = true;
        this.$router.push({path:'/home/goods/'+ menuType})
        this.titleArr = this.$route.meta.title.join(",");
      },

    },
    components:{
      TopHead,
      NavHead
    }
  }
</script>

<style scoped lang='less' rel="stylesheet/less">
  @fs13 : 13px;
  @fs16 : 16px;
  @fsc333 : #333;
  @fsc000 : #000;
  .content{
    position: relative;
    height: 100%;
    .top-title{
      margin-left: 100px;
    }
    .aside-nav{
      float: left;
      width: 100px;
      height: 100%;
      background: #fff;
      border-right: 1px solid #ddd;
      .head-title{
        height: 59px;
        line-height: 59px;
        font-size: @fs16;
        text-align: center;
        font-weight: 900;
        box-sizing: border-box;
      }
      .data{
        padding: 10px 0;
        border-top:1px solid #ddd;
        .data-list{
          font-size: 14px;
          color: @fsc333;
          >li{
            text-align: center;
            height: 38px;
            line-height: 38px;
            cursor: pointer;
            &:hover,&.active{
              background: #ddd;
            }
          }
        }
      }
    }
    .inner-content{
      position: absolute;
      top: 70px;
      left: 110px;
      bottom: 10px;
      right: 10px;
      background: #fff;
    }
  }
</style>
