<template>
  <div class="content">
    <nav class="aside-nav">
      <div class='head-title'>联系人管理</div>
      <div class="data">
        <div class="type-title">商户管理</div>
        <ul class="data-list">          
          <li v-for="(item,key) in merchants(enterpriseMenu.children.nodeList)" :key='key' :class="{active:currId == item.id}"
              @click='select(item.id,item.url)'>{{item.text}}
          </li>
        </ul>        
      </div>
      <div class="data">
        <div class="type-title">联系人管理</div>
        <ul class="data-list">          
          <li v-for="(item,key) in contactPeople(enterpriseMenu.children.nodeList)" :key='key' :class="{active:currId == item.id}"
              @click='select(item.id,item.url)'>{{item.text}}
          </li>
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
  import Bus from '../common/bus.js';
  export default {
    name:'setings',
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
        if(ele.text == "管理"){
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
      Bus.$on("addMerchants",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url});
      });
      Bus.$on("manageSuppliers",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.searchMsg})
      });
      Bus.$on("manageGoods",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.searchMsg})
      });
      Bus.$on("merchantsInfor",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.inforMsg})
      });
      Bus.$on("newClient",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.goodsMsg})
      });
      Bus.$on("viewClient",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.gysMsg})
      });
      Bus.$on("editClient",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.gysMsg})
      });
      Bus.$on("newSupplier",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.goodsMsg})
      });
      Bus.$on("viewSupplier",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.gysMsg})
      });
      Bus.$on("editSupplier",msg => {
        this.isDefault = msg.status;
        this.parentOperation = this.titleArr;
        this.childOperation = msg.operationName;
        this.$router.push({path:'/home/management/'+ msg.url,query:msg.gysMsg})
      });
    },
    methods:{
      select(id,menuType){
        this.currId = id;
        this.isDefault = true;
        this.$router.push({path:'/home/management/'+ menuType});
        this.titleArr = this.$route.meta.title.join(",");
      },
      merchants(list){
        return list.filter((item)=>{
          return item.type == 'Merchants';
        })
      },
      contactPeople(list){
        return list.filter((item)=>{
          return item.type == 'ContactPeople';
        })
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
        .type-title{
          height: 38px;
          line-height: 38px;
          font-size: 12px;
          color: #ddd;
          text-align: center;
        }
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
