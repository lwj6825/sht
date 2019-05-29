<template>
    <div class="content">
       <div class="top-title" v-if="isDefault">
            <TopHead :title='titleArr'></TopHead>   
        </div> 
        <div class="top-title" v-else>
            <NavHead :parent='parentOperation' :child='childOperation'></NavHead>
        </div>
       <div class="box">
           <router-view></router-view>
       </div>
      
    </div>
</template>

<script>
import TopHead from '../common/header';
import NavHead from '../common/navHeader';
import Bus from '../common/bus.js'
export default {
    name:'role',
    data(){
        return{
            isDefault:true,
            titleArr:'',
            parentOperation:'',
            childOperation:'',
        }
    },
    mounted(){
        let title = this.$route.meta.title;       
        for (let key in title){
            this.titleArr = title[key]
        }
    },
    beforeUpdate(){        
        Bus.$on("create",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/role/'+ msg.url,query:msg.row})
        })
        Bus.$on('destroyed',msg => {
            this.isDefault = msg.isDefault;
        })
    },
    methods: {
     
    },   
    components:{
        TopHead,
        NavHead,
    }
}
</script>

<style scoped lang='less'>    
    .content{
        position: relative;
        height: 100%;        
        .box{
            position: absolute;
            top: 70px;
            right: 10px;
            left: 10px;
            bottom: 10px;
            padding: 10px;
            box-sizing: border-box;
            background: #fff;
        }        
    }
</style>

