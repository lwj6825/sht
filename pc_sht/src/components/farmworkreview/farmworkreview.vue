<template>
  <div class="content">
    <nav class="aside-nav">
      <div class='head-title'>审核管理</div>
      <div class="data">
        <ul class="data-list">
          <li v-for="(item,key) in enterpriseMenu.children" :key='key' :class="{active:currId == item.id}"
              @click='select(item.id,item.menuType)'>{{item.name}}</li>
        </ul>
      </div>
    </nav>
    <div class="top-title">
      <TopHead :title='titleArr'></TopHead>
    </div>
    <div class="inner-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import menu from "../../assets/test/menu";
  import TopHead from '../common/header';
  export default {
    name:'setings',
    data(){
      return{
        menu:'',
        enterpriseMenu:[],
        currId:'',
        titleArr:''
      }
    },
    mounted(){
      this.menu = menu;
      this.menu.forEach((ele)=>{
        if(ele.name == "审核"){
          this.enterpriseMenu = ele
        }
      })
      this.currId = this.enterpriseMenu.children[0].id;
      this.titleArr = this.$route.meta.title.join(",");
    },
    methods:{
      select(id,menuType){
        this.currId = id;
        this.$router.push({path:'/home/farmworkreview/'+ menuType})
        // this.titleArr = this.$route.meta.title;
        this.titleArr = this.$route.meta.title.join(",");
      },
    },
    components:{
      TopHead
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
              background: #f2f2f2;
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
