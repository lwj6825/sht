<template>
    <div class="content">   
        <nav class="aside-nav">
            <div class='head-title'>用户管理</div>
            <div class="data">
                <ul class="data-list">
                    <li v-for="(item,key) in enterpriseMenu.children" :key='key' :class="{active:currId == item.id}"
                        @click='select(item.id,item.menuType)'>{{item.name}}</li>
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
import superadmin from "../../assets/test/super";
import TopHead from '../common/header';
import NavHead from '../common/navHeader';
import Bus from '../common/bus.js'
export default {
    name:'user',
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
    mounted(){
        this.menu = superadmin;        
        this.menu.forEach((ele)=>{
            if(ele.name == "用户"){
                this.enterpriseMenu = ele
            }
        })
        this.currId = this.enterpriseMenu.children[0].id;          
    },
    beforeUpdate(){    
        let title = this.$route.meta.title;  
        for (let key in title){
            this.titleArr = title[key];
        }    
        Bus.$on("add",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/user/'+ msg.url})
        })
        Bus.$on("look",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/user/'+ msg.url,query:msg.row})
        })
        Bus.$on('destroyed',msg => {
            this.isDefault = msg.isDefault;
        })                
        
    },
    methods:{
        select(id,menuType){           
            this.currId = id;
            this.isDefault = true;
            this.$router.push({path:'/home/user/'+ menuType})
            let title = this.$route.meta.title;       
            for (let key in title){
                this.titleArr = title[key]
            }
        },
        
    }, 
    components:{
        TopHead,
        NavHead,
    }
}
</script>
<style scoped lang='less'>
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

