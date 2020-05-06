<template>
    <header class="head-content 2">
        <div class="right-haddle">
            <div class="icon-group">
                <i class="icon icon-1"></i>
                <i class="icon icon-2"></i>                
            </div>
            <div class='user' @click="userClick()">
                <i class="icon icon-3"></i>
                <span>管理员</span>
                <i v-if='isExit' class="exit" @click="backLogin()">退出</i>
            </div>
        </div>
        <div>
            <span class="name" v-for="(item,index) in dataTitle" :key="index" @click='turnPage(index)'>{{item}}</span>            
        </div>        
    </header>
</template>

<script>
export default {
    name:'topHead',
    props:{
        title:String
    },
    data(){
        return{
            dataTitle:[],
            isExit:false,
        }
    },
    mounted(){        
        let titleObj  = this.$route.meta.title;
        let arr = [];
        for (var i in titleObj) {
            arr.push(titleObj[i]); 
        }
        arr.forEach(ele => {
            this.dataTitle.push(ele)
        });
        
    },
    methods:{
        userClick(){
            this.isExit = !this.isExit;
        },
        backLogin(){
            localStorage.clear();
            this.$router.push({path:'/'})
        },
        turnPage(index){
            this.$emit('turnPage',index)
        }
    },
    watch:{
        $route(){
            this.dataTitle = [];
            let arr = this.title.split(',');
            arr.forEach(ele => {
                this.dataTitle.push(ele)
            });
        }
    }
}
</script>

<style scoped lang='less'>
    @fs14 : 14px;
    @fs16 : 16px;
    @fsc333 : #333;
    @fsc000 : #000;
    .head-content{
        padding:0 35px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid rgba(228, 228, 228, 1);
        background: #fff;
        box-sizing: border-box;
        .name{
            display: inline-block;
            padding: 0 10px;
            margin-right: 20px;
            color: @fsc333;
            font-size: @fs14;
            height: 58px;            
            box-sizing: border-box;
            cursor: pointer;
            &.curr{
                border-bottom: 1px solid #169bd5;
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
