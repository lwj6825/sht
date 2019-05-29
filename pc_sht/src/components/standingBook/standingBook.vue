<template>
    <div class="content">   
        <nav class="aside-nav">
            <div class='head-title'>台账管理</div>
            <div class="data">
                <div class="type-title">进货管理</div>
                <ul class="data-list">
                    <li v-for="(item,key) in merchants(enterpriseMenu.children.nodeList)" :key='key' :class="{active:currId == item.id}"
                        @click='select(item.id,item.url)'>{{item.text}}
                    </li>
                </ul>
            </div>
            <div class="data">
                <div class="type-title">销售管理</div>
                <ul class="data-list">
                    <li v-for="(item,key) in contactPeople(enterpriseMenu.children.nodeList)" :key='key' :class="{active:currId == item.id}"
                        @click='select(item.id,item.url)'>{{item.text}}
                    </li>
                </ul>
            </div>

          <div class="data">
                <div class="type-title">jiance</div>
                <ul class="data-list">
                    <li  :class="{active:currId == item.id}"
                        @click='select(item.id,item.url)'>
                      检测管理
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
        </div><!---->
    </div>
</template>
<script>
import TopHead from '../common/header'
import NavHead from '../common/navHeader';
import Bus from '../common/bus.js';
import menu from "../../assets/test/menu";
export default {
    name:"standingBook",    
    data(){
        return{
            menu:'',
            enterpriseMenu:[],
            currId:'',
            titleArr:'',
            isDefault:true,
            parentOperation:'',
            childOperation:'',
            entryTz: '进货台账',
            saleTz: '销售台账',



        }
    },
    created(){
        // this.menu = JSON.parse(localStorage.getItem('menuList'));
        // this.menu = menu;


        this.menu.forEach((ele)=>{
            if(ele.text == "管理"){
                this.enterpriseMenu = ele
            }
        });


    },
    beforeUpdate(){
        Bus.$on("back",msg => {
            this.isDefault = true;
        });
        Bus.$on("addEntryTz",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/standingBook/'+ msg.url})
        })
    },
    mounted(){

        this.currId = this.enterpriseMenu.children.nodeList[0].id;

        this.titleArr = this.$route.meta.title.join(",");



    },    
    methods: {
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
<style scoped lang='less'>
    @fs13 : 13px;
    @fs16 : 16px;
    @fsc333 : #333;
    @fsc000 : #000; 
    .content{
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
            margin: 10px;
            margin-left: 110px;
            background: #fff;
        }
    }
</style>
