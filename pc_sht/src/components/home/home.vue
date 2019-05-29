<template>
    <div class="container" ref="container">
        <div class="level-one-menu">
            <figure class="logo"><img src="../../assets/images/logo.png"></figure>
            <ul class="menu-list">
                <li class="menu-item" v-for="item in mainList" :key="item.id" :class="{active:levelOneCurrId == item.id}"
                    @click="selectMenu(item.id)">
                    <p style="width: 40px"><i class="icon" :class="item.icon"></i></p>
                    <span style="width: 200px" class="text">{{item.text}}</span>
                </li>
            </ul>
        </div>
        <div class="level-two-menu" v-if="isShowLevelTwo">
            <span class="title" :class="{border:!typeArr.length}">{{levelTwoTitle}}</span>
            <ul class="menu-list" v-if='typeArr.length'>
                <li class='type-list' v-for="type in typeArr" :key='type.index'>
                    <span class='type-name'>{{type}}</span>
                    <ul>
                        <li class="menu-item" v-if='type==item.type' v-for="item in levelTwoMenu" :key='item.id' :class="{active:levelTwoCurrId == item.id}"
                            @click="selectMenu(item.id)">{{item.text}}</li>
                    </ul>
                </li>
            </ul>
            <ul class="menu-list" v-else>
                <li class="menu-item" v-for="item in levelTwoMenu" :key='item.id' :class="{active:levelTwoCurrId == item.id}"
                    @click="selectMenu(item.id)">{{item.text}}</li>
            </ul>
        </div>
        <div class="level-three-menu" :class="{'left-distance200':isHasDistance,'left-distance100':!isHasDistance}">
            <div class="nav-bar">
                <div class="title" v-if="!enterChildPage" v-for="item in levelThreeMenu" :key="item.id"
                    :class="{current:levelThreeCurrId == item.id}" @click="turnPage(item)">{{item.title}}</div>
                <div class="title" v-if="enterChildPage">
                    <span class="prev-title" @click="backPrev()">{{parentName}}</span> / <span>{{childrenName}}</span>
                </div>
                <div class="right-haddle">
                    <div class="icon-group">
                        <i class="icon icon-1"></i>
                        <i class="icon icon-2"></i>
                    </div>
                    <div class='user' @click="userClick()">
                        <i class="icon icon-3"></i>
                        <span>{{loginName}}</span>
                        <i v-if='isExit' class="exit" @click="backLogin()">退出</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="main"  :class="{'left-distance200':isHasDistance,'left-distance100':!isHasDistance}">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
// import menu from "../../assets/test/menu.js";
import Statistical from "../statistical/statistical";
import StandingBook from "../standingBook/standingBook";
import Order from '@/components/order/order'
import Management from '@/components/management/management'
import Goods from '@/components/goods/goods'
import Settings from '@/components/settings/settings'
import District from '@/components/district/district'
import Farmwork from '@/components/farmwork/farmwork'
import {getDefaultProductTypes} from "../../js/goods/goods.js";
import {Loginout} from '../../js/login/ajax.js'

export default {
    name:'name',
    data(){
        return{
            mainList:[],//主菜单列表
            levelTwoMenu:[],//二级菜单
            levelThreeMenu:[],//三级菜单

            levelTwoTitle:'',//二级菜单标题

            levelOneCurrId:'',//一级菜单选中项
            levelTwoCurrId:'',//二级菜单选中项
            levelThreeCurrId:'',//三级菜单选中项

            isShowLevelTwo:true,//二级菜单是否存在
            isHasDistance:true,//二级菜单的间距

            isExit:false,//退出
            enterChildPage:false,//内容部分进入子页
            parentName:'',//导航上级标题
            childrenName:'',//导航下级标题

            fromPrevPageMsg:"",//返回上级数据
            toPrevPageMsg:'',
            typeArr:[],//二级菜单分类
            loginName: '管理员'
        }
    },
    created() {
        this.loginName =  localStorage.getItem('loginName');
        // console.log(localStorage.getItem('menuList'));
    },
    mounted(){
        this.mainList = JSON.parse(localStorage.getItem('menuList'));//查询菜单列表
        this.levelOneCurrId = this.mainList[0].id;//选择第一项
        this.changeMenu(this.levelOneCurrId);
        // 查询品种列表
        getDefaultProductTypes()
            .then(res => {
               localStorage.setItem('queryNameData',JSON.stringify(res))
            })
            .catch(res => {
                this.$message.error("出错啦!");
            })
    },
    watch:{
        $route(to,from){
            let toId = to.meta.id;
            let parentId = '';
            this.fromPrevPageMsg = from.meta;
            this.toPrevPageMsg = to.meta;
            if(to.meta.node == 'statistical'){
                this.enterChildPage = false;
            }else if(to.meta.node == 'district'){
                this.mainList.forEach(ele => {
                   if(ele.node == 'district'){
                        if(ele.children.id == toId){
                            this.enterChildPage = false;
                        }else{
                            this.enterChildPage = true;
                            this.mainList.forEach(ele => {
                                if(ele.node == "district"){//market页操作
                                    ele.children.nodeList.forEach(val=> {
                                        if(val.id == toId){
                                            this.parentName = ele.children.nav_title;
                                            this.childrenName = val.text;
                                        }
                                    })
                                }
                            })
                            this.mainList.forEach(ele => {//market子页操作 - 获得子级名称
                                if(ele.node == "district"){
                                    ele.children.nodeList.forEach(ele=> {
                                       if(ele.children && ele.children.nodeList.length > 0){
                                           ele.children.nodeList.forEach(val => {
                                               if(val.id == toId ){
                                                    parentId = val.parentId;
                                                    if(to.params.name){
                                                        this.childrenName = to.params.name;
                                                    }else{
                                                        this.childrenName = val.text;
                                                    }

                                                }
                                           })
                                       }
                                    })
                                }
                            })
                            this.mainList.forEach(ele => {//market子页操作 - 获得上一级名称
                                if(ele.node == "district"){
                                    ele.children.nodeList.forEach(ele=> {
                                        if(ele.id == parentId){
                                            this.parentName = ele.text;
                                        }
                                    })
                                }
                            })
                        }
                   }
               })
            }else{
                this.mainList.forEach(ele=> {
                    if(ele.node == to.meta.node){
                        if(ele.children && ele.children.node && ele.children.node != 'district'){
                            if(ele.children.nodeList.length > 0){
                                ele.children.nodeList.forEach(ele=>{
                                    if(ele.id == toId){
                                        this.enterChildPage = false;
                                        this.childrenName = ele.text;
                                        parentId = ele.parentId;

                                        this.mainList.forEach(ele=>{
                                            if(ele.children && ele.children.id == parentId){
                                                this.parentName = ele.children.nav_title
                                            }
                                        })
                                    }
                                })
                            }

                        }else{
                            if(ele.children && ele.children.nodeList.length > 0){
                                ele.children.nodeList.forEach(ele =>{//二级
                                    if(ele.children && ele.children.nodeList.length > 0){
                                        ele.children.nodeList.forEach(ele =>{//三级
                                            if(ele.id == toId){
                                                this.enterChildPage = false;
                                            }else{
                                                if(ele.children && ele.children.nodeList.length > 0){
                                                    ele.children.nodeList.forEach(ele => {
                                                        if(ele.id == toId){
                                                            this.enterChildPage = true;
                                                            parentId = ele.parentId;
                                                            this.childrenName = ele.text;

                                                            this.mainList.forEach(ele => {
                                                                if(ele.children && ele.children.nodeList.length > 0){
                                                                    ele.children.nodeList.forEach(ele => {
                                                                        if(ele.children && ele.children.nodeList.length > 0){
                                                                            ele.children.nodeList.forEach(ele => {
                                                                                if(ele.id == parentId){
                                                                                    this.parentName = ele.text;
                                                                                }
                                                                            })

                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }


                        }
                    }
                })

            }
        }
    },
    methods:{
        changeMenu(tabTd){//菜单切换
            if(tabTd == '87'){//是统计页
                this.isShowLevelTwo = false;
                this.isHasDistance = false;
                this.levelOneCurrId = tabTd;
                this.mainList.forEach(ele => {
                    if(ele.id == tabTd){
                        this.levelThreeMenu.push({
                            id:ele.id,
                            title:ele.text
                        })
                        this.$router.push({path:`/home/${ele.node}/${ele.url}`});
                    }
                })

            }else if(tabTd == '158'){//是区域页
                this.isShowLevelTwo = false;
                this.isHasDistance = false;
                this.levelOneCurrId = tabTd;
                this.mainList.forEach(ele => {
                    if(ele.id == tabTd){
                        this.levelThreeMenu.push({
                            id:ele.id,
                            title:ele.children.nav_title
                        })
                        this.$router.push({path:`/home/${ele.node}/${ele.children.url}`});
                    }
                })
            }else{
                this.mainList.forEach(ele => {//属于一级ID
                    if(ele.level == 1 && ele.id == tabTd && ele.children.node){
                        this.levelOneCurrId = tabTd;
                        this.isShowLevelTwo = false;
                        this.isHasDistance = false;
                        this.mainList.forEach(ele => {
                            if(ele.id == tabTd){
                                this.levelThreeMenu.push({
                                    id:ele.id,
                                    title:ele.children.nav_title
                                })
                                this.$router.push({path:`/home/${ele.node}/${ele.children.url}`});
                            }
                        })
                    }
                    if(ele.level == 1 && ele.id == tabTd && !ele.children.node){
                        this.isShowLevelTwo = true;
                        this.isHasDistance = true;
                        this.levelOneCurrId = tabTd;
                        this.levelTwoMenu = ele.children.nodeList;//二级菜单列表
                        this.typeArr = [];
                        ele.children.nodeList.forEach(ele =>{
                            if(ele.type && !this.typeArr.includes(ele.type)){
                                this.typeArr.push(ele.type)
                            }
                        })

                        this.levelTwoTitle = ele.children.nav_title;//二级菜单标题
                        this.levelTwoCurrId = ele.children.nodeList[0].id;//二级菜单选中项
                        ele.children.nodeList[0].children.nodeList.forEach(ele => {
                            this.levelThreeMenu.push({
                                id:ele.id,
                                title:ele.text
                            })
                        })
                        this.$router.push({
                            path:`/home/${ele.node}/${ele.children.nodeList[0].children.nodeList[0].url}`
                        });

                    }
                })
                this.mainList.forEach(ele => {//属于二级ID
                    if(ele.children){
                        ele.children.nodeList.forEach((ele)=>{
                            if(ele.level == 2 && ele.id == tabTd){
                                this.levelTwoCurrId = tabTd;
                                ele.children.nodeList.forEach(ele => {
                                    this.levelThreeMenu.push({
                                        id:ele.id,
                                        title:ele.text
                                    })
                                })
                                if(ele.describe == "自定义图表"){
                                    window.open('https://signin.aliyun.com/zhdtech.onaliyun.com/login.htm');      
                                    return
                                }
                                if(ele.children.nodeList && ele.children.nodeList.length >1){
                                    this.levelThreeCurrId = ele.children.nodeList[0].id
                                }
                                this.$router.push({
                                    path:`/home/${ele.node}/${ele.children.nodeList[0].url}`
                                });
                            }
                        })
                    }

                })
            }
        },
        selectMenu(id){//选择菜单
            this.levelThreeMenu = [];
            this.enterChildPage = false;
            this.changeMenu(id)
        },
        backPrev(){//三级菜单返回上页
            if(this.$route.meta.node == 'district'){
                let name = '';
                this.mainList.forEach(ele => {
                    if(ele.node == 'district'){
                        name = ele.children.nav_title
                    }
                })
                if(this.parentName == name){
                    this.enterChildPage = false;
                    this.$router.push({path:'market'})
                }else{
                    this.enterChildPage = true;
                    this.$router.push({path:this.fromPrevPageMsg.url})
                }
            }else{
                this.enterChildPage = false;
                let parentId = '',id_1_level = '',id_2_level = '';
                this.mainList.forEach(ele=> {
                    if(ele.children && ele.children.nodeList.length>0){
                        ele.children.nodeList.forEach(ele =>{
                            if(ele.children && ele.children.nodeList.length>0){
                                ele.children.nodeList.forEach(ele =>{
                                    if(ele.id == this.fromPrevPageMsg.id){
                                        id_1_level = ele.level;
                                    }
                                    if(ele.id == this.toPrevPageMsg.id){
                                        id_1_level = ele.level;
                                    }
                                    if(ele.children && ele.children.nodeList.length>0){
                                        ele.children.nodeList.forEach(ele => {
                                            if(ele.id == this.fromPrevPageMsg.id){
                                                id_1_level = ele.level;
                                            }
                                            if(ele.id == this.toPrevPageMsg.id){
                                                id_2_level = ele.level;
                                                parentId = ele.parentId;
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                if(id_1_level == 4 && id_2_level == 4){
                    this.mainList.forEach(ele=> {
                        if(ele.children && ele.children.nodeList.length>0){
                            ele.children.nodeList.forEach(ele =>{
                                if(ele.children && ele.children.nodeList.length>0){
                                    ele.children.nodeList.forEach(ele =>{
                                        if(ele.id == parentId){
                                            this.$router.push({path:ele.url})
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    this.$router.push({path:this.fromPrevPageMsg.url})
                }
            }
        },
        turnPage(item){//三级菜单切换
            this.mainList.forEach(ele=> {
                if(ele.children && ele.children.nodeList.length>0){
                    ele.children.nodeList.forEach(ele =>{
                        if(ele.children && ele.children.nodeList.length>0){
                            ele.children.nodeList.forEach(ele =>{
                                if(ele.id == item.id){
                                    this.$router.push({path:ele.url})
                                    this.levelThreeCurrId = ele.id;
                                }
                            })
                        }
                    })
                }
            })
        },
        userClick(){//用户点击
            this.isExit = !this.isExit;
        },
        backLogin(){//退出
            localStorage.clear();
            sessionStorage.clear();
            Loginout()
                .then(res => {
                    this.$router.push({path:'/'})
                })
                .catch(res => {
                    // console.log(res)
                })
        },
    }

}
</script>
<style  rel="stylesheet/less" lang='less' scoped>
    @fs14 : 14px;
    @fs16 : 16px;
    @fsc333 : #333;
    @fsc000 : #000;
    .container{
        position: relative;
        overflow: hidden;
        min-width: 1200px;
        .main{
            margin-left: 100px;
            padding: 70px 10px 10px;
            box-sizing: border-box;
            overflow: hidden;
        }
        .left-distance200{
            margin-left: 250px;
        }
        .left-distance100{
            margin-left: 50px;
        }
        .level-one-menu{
            position: fixed;
            left: 0;
            top: 0;
            width: 50px;
            height: 100%;
            background: #33363f;
            color: #fff;
            z-index: 102;
            overflow: hidden;
            transition: all .5s ease-in;
            .text{
                width: 0;
                overflow: hidden;
            }
            &:hover{
                width: 100px;
                .text{
                    width: 200px;
                }
                transition-delay: 0;
                transition-property: width,overflow;
                transition-duration: ease-in;
            } /***/
            .logo{
                display: block;
                margin: 10px auto;
                width: 50px;
                height: 50px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .menu-list{
                margin-top: 10px;
                font-size: 12px;
                .menu-item{
                    padding-left: 10px;
                    display: -webkit-box;
                    height: 54px;
                    line-height: 54px;
                    cursor: pointer;
                    &:hover,&.active{
                        background: #fff;
                        color: #000;
                    }
                }
            }
            .icon{
                display: inline-block;
                font-size: 0;
                width: 24px;
                height: 24px;
                vertical-align: text-top;
            }
        }

        .icon-tongji{
            background: url('../../assets/images/u4151.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .icon-taizhang{
            background: url('../../assets/images/u4154.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .icon-order{
            background: url('../../assets/images/u4148.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .icon-guanli{
            background: url('../../assets/images/u4148.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .icon-goods{
            background: url('../../assets/images/u4148.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .icon-setings{
            background: url('../../assets/images/u4171.png') no-repeat center center;
            background-size: 75% 75%;
        }
        .level-two-menu{
            position: fixed;
            left: 50px;
            top: 0;
            width: 200px;
            height: 100%;
            color:#333;
            font-size: @fs14;
            background: #fff;
            border-right: 1px solid #ddd;
            box-sizing: border-box;
            z-index: 101;
            .title{
                display: block;
                width: 100%;
                height: 59px;
                line-height: 59px;
                font-size: 16px;
                text-align: center;
                font-weight: 900;
                text-align: center;
                box-sizing: border-box;
            }
            .border{
                border-bottom:1px solid #ddd;
            }
            .menu-list{
                .type-name{
                    display:block;
                    padding-top:10px;
                    margin-left: 10px;
                    height:38px;
                    line-height:38px;
                    font-size:12px;
                    color:#aaa;
                }
                .type-list{
                    margin-bottom: 5px;
                }
                .menu-item{
                    font-size: 13px;
                    padding-left: 10px;
                    height: 38px;
                    line-height: 38px;
                    cursor: pointer;
                }
                .active{
                    background: #ddd;
                }
            }
        }
        .level-three-menu{
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            height: 60px;
            background: #fff;
            color: #333;
            font-size: @fs14;
            z-index: 101;
            .nav-bar{
                padding: 0 35px;
                min-width: 1000px;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #e4e4e4;
                background: #fff;
                box-sizing: border-box;
                .title{
                    display: inline-block;
                    margin-right: 20px;
                    color: #333;
                    font-size: 14px;
                    height: 60px;
                    border-bottom: 1px solid;
                    border-color: #e4e4e4;
                    box-sizing: border-box;
                    cursor: pointer;
                }
                .current{
                    border-color: #409EFF;
                    color: #409EFF;
                }
                .prev-title{
                    color: #409EFF;
                }
            }
            .right-haddle{
                float: right;
                .icon{
                    display: inline-block;
                    position: relative;
                    *zoom: 1;
                    top: 2px;
                    width: 16px;
                    height: 16px;
                    vertical-align: baseline;
                    cursor: pointer;
                }
                .icon-1{
                    margin-left: 15px;
                    background: url('../../assets/images/u4161.png') no-repeat center center;
                    background-size: 100% 100%;
                }
                .icon-2{
                    margin-left: 15px;
                    background: url('../../assets/images/u4155.png') no-repeat;
                    background-size: 100% 100%;
                }
                .icon-3{
                    background: url('../../assets/images/u4159.png') no-repeat;
                    background-size: 100% 100%;
                }
                .icon-group{
                    float: left;
                }
                .user{
                    float: right;
                    margin-left: 15px;
                    position: relative;
                    font-size: @fs14;
                    cursor: pointer;
                }
                .exit{
                    position: absolute;
                    top: 45px;
                    right: 0;
                    display: block;
                    padding: 7px 5px;
                    width: 50px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background: #f2f2f2;
                    font-style: normal;
                    z-index: 10;
                    border: 1px solid #ddd;
                    &:hover{
                        background: #409EFF;
                        color: #fff;
                        border-color: #409EFF;
                    }
                }
            }
        }
    }
</style>

