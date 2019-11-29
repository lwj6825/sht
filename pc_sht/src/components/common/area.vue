<template>
    <div class="area-content">
      <div class="area-title">市场区域</div>
      <div class="area-wrapper">
        <ul>
          <li class="area-item" v-for="item in areaList" :key="item.userId"  :class="{active:selectArea==item.userId}" 
            @click='selectAddr(item.userId)'>
            <el-button class="list-btn" type="primary" size="medium">{{item.name}}</el-button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {QueryArea} from '../../js/area/area.js';
export default {
    name:'areaBox',  
    props: ['gooduserId'],
    data(){
      return{
        areaList:[],
        selectArea:'',
        userId: '',
        isRegion: '',
        node_id: '',
      }
    },
    mounted() {
      this.isRegion = localStorage.getItem('isRegion')
      this.userId = localStorage.getItem('userId')  
      this.node_id = localStorage.getItem('loginId');  
      if(this.isRegion == 'true'){
        this.getAreaList();//获取区域列表  
      }
      this.selectArea = this.gooduserId
    },
    methods:{
      selectAddr(addrId){//选择地区
        this.selectArea = addrId;
        this.$emit('selectId',addrId)
      },
      getAreaList(){
        let data = {
          page:"1",
          cols:"15",
          total:"",
          userId: this.userId,
          name:"",
          boothName:"",
          node_id: this.node_id
        }
        QueryArea(data)
          .then(res =>{
            this.areaList = res.data.dataList;
            if(this.gooduserId){
              this.selectArea = this.gooduserId
            }else{
              this.selectArea = this.areaList[0].userId;
            }
          })
          .catch(res =>{
            console.log(res)
          })
      },
    },
}
</script>

<style rel="stylesheet/less" lang='less' scoped>
  .area-content{
      overflow: hidden;
      .area-title{
        float: left;
        padding-top: 7px;
        padding-left: 4px;
        width: 100px;
        height: 34px;
        line-height: 20px;
        font-size: 14px;
        box-sizing: border-box;
        border-left: 2px solid #409EFF;
      }
      .area-wrapper{
        margin-left: 100px;
      }
      .area-item{
        float: left;
        margin-left: 10px;
        margin-bottom: 10px;
        &.active{
          .list-btn{
            background: #409EFF;
            color: #fff;
          }
        }        
      }
      .list-btn{
        color: #409EFF;
        background: #fff;
      }
    }
</style>
