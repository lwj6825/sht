<template>
    <header class="head-content 1">
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
        <div class="nav-menu">
            <span class="parent-menu" @click="back()">{{parent}}</span> / <span>{{child}}</span>
        </div>        
    </header>
</template>

<script>
import Bus from '../common/bus.js'
export default {
    name:'navHeader',
    props:{
        parent:{
            type:String,
            default:'',
        },
        child:{
            type:String,
            default:'',
        },
    }, 
    data(){
        return{
            isExit:false,
        }
    },
    cerated(){
        
    },
    mounted(){
        // console.log('parent:'+this.parent,'child:'+this.child)        
    },
    methods:{
        back(){
            let data = {'url':'','status':true};
            this.$router.go(-1);
            Bus.$emit('back');
        },
        userClick(){
            this.isExit = !this.isExit;
        },
        backLogin(){
            localStorage.clear();
            this.$router.push({path:'/'})
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
            color: @fsc333;
            font-size: @fs14;
            height: 60px;
            border-bottom: 1px solid #169bd5;
            box-sizing: border-box;
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
        .nav-menu{
            font-size: 14px;
            height: 58px;
            line-height: 62px;
            .parent-menu{
                color: #409EFF;
                cursor: pointer;
            }
        }
    }
</style>
