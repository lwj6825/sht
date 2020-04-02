<template>
    <div class="container" ref="container" @keyup.enter="loginClick()">
        <img class="strip" src="../../../static/strip.png" alt="">
        <img class="image" src="../../../static/logoStrip.png" alt="">
        <div class="message">
            <div class="header">北京E追溯商户通</div>
            <div class="login-area">
                <header class="title">系统登录</header>
                <div class="content">
                        <!--<el-input class="fill-input" prefix-icon="el-icon-user" v-model="account">
                        </el-input>-->
                    <div class="account" :class="current == 1 ? 'active' : ''">
                        <span class="iconfont icon-zhangh"></span>
                        <input type="text" @focus="focusFun(1)" v-model="account" placeholder="输入账号">
                    </div>
                    <div class="password" :class="current == 2 ? 'active' : ''">
                        <span class="iconfont icon-mim"></span>
                        <input type="password" @focus="focusFun(2)" v-model="password" placeholder="输入密码">
                    </div>
                    <div class="code"> 
                        <div class="validation" :class="current == 3 ? 'active' : ''">
                            <span class="iconfont icon-yanzm"></span>
                            <input type="text" @focus="focusFun(3)" v-model="validation" placeholder="验证码">
                        </div>
                        <p class="num" v-if="numCode">{{numCode}}</p>
                        <p class="btn" @click="getValidationFun">{{codeBtn}}</p>
                    </div>
                    <div class="other">
                        <label for="remberPassword">
                            <el-checkbox v-model="check" @change="checkFun">记住密码</el-checkbox>
                        </label>
                        <!--<span class="code-login">验证码登录</span>
                        <span class="forget-password">忘记密码？</span> -->                   
                    </div>
                </div>
                <footer class="login-btn" @click="loginClick()">
                    <input type="button" value="登录">
                </footer>
            </div>
        </div>
        <!--<canvas id="canvas"></canvas>-->
        <div class="footer">版权所有©北京志恒达科技有限公司-京ICP备05030152号</div>
    </div>
</template>
<script>
import {login,login2,GetShtUserInfo} from "../../js/login/ajax.js";
// import PointLine from '../../assets/js/canvas.js';
import {loginUrl} from '../../js/address/url.js'
export default {
    name:'login',
    data(){
        return {
            account:'',
            password:'',
            check:false,
            userId:'',
            validation: '', // 验证码4位
            numCode: '',
            codeBtn: '获取验证码',
            code: '',
            current: 0,
            user:''
        }
    },
    created() {
        this.$nextTick(function(){
            this.$refs.container.style.width = window.innerWidth + 'px';
            this.$refs.container.style.height = window.innerHeight + 'px';
        })
        this.getValidationFun()
    },
    mounted(){
        
        // console.log(this.$route.query)
        if(this.$route.query.account){
            localStorage.clear();
            sessionStorage.clear();
            let str = 'username=' + this.$route.query.account + '&password=' + this.$route.query.password
            GetShtUserInfo(str)
                .then(res => {
                    if(res.result == true){
                        this.account = res.data.username
                        this.password = res.data.password
                        let data = {
                            username : this.account,
                            password : this.password,
                        }
                        login(data).then((res)=>{
                            if(res.data.booth_list.length != 0){
                                let name = res.data.booth_list[0].name,
                                    node_id = res.data.booth_list[0].node_id,
                                    isRegion = res.data.role_list[0].region,
                                    scShopId = res.data.booth_list[0].SHOP_BOOTH_ID,
                                    roleId = res.data.role_list[0].ROLEID;
                                localStorage.setItem('loginName',name);
                                localStorage.setItem('loginId',node_id);
                                localStorage.setItem('isRegion',isRegion);
                                localStorage.setItem('scShopId',scShopId);
                                localStorage.setItem('roleId',roleId);
                                localStorage.setItem('account',this.account);
                                localStorage.setItem('password',this.password);
                                sessionStorage.setItem('userName',this.account)
                                this.setCookie('userName',this.account)
                            }
                            if(res.result){
                                if(this.check){
                                    localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                                    localStorage.setItem('username',JSON.stringify(this.account));
                                    localStorage.setItem('checked',JSON.stringify(true));
                                    localStorage.setItem('userId',res.data.userId);
                                    localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                                    this.userId = res.data.userId;
                                }else{
                                    localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                                    localStorage.setItem('username',JSON.stringify(this.account));
                                    localStorage.setItem('userId',res.data.userId);
                                    localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                                    this.userId = res.data.userId;
                                }
                                this.$router.push({name:'home'})
                            }else{
                                clocalStorage.clear();                    
                            }                
                        }).catch((res)=>{
                            this.$message.error('账号或密码输入不正确!')
                        })
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        }
        // this.getValidationFun()
        // const pointLine = new PointLine();
        // if(localStorage.getItem('checked')){        
        //     this.account = localStorage.getItem('accoutn');
        //     this.userId = localStorage.getItem('userId');
        //     this.$router.push({path:'home'})
        // }
        if(localStorage.getItem('remember')){        
            this.account = localStorage.getItem('account');
            this.password = localStorage.getItem('password');
            if(localStorage.getItem('remember') == 'true'){
                this.check = true
            }else{
                this.check = false
            }
        }
    },
    methods:{
        focusFun(ele){
            this.current = ele
        },
        checkFun(ele){
            localStorage.setItem('remember',ele);
        },
        getValidationFun(){
            this.code = "";
            var codeLength = 4;
            //随机数
            var random = new Array(0,1,2,3,4,5,6,7,8,9);
            for(var i = 0; i < codeLength; i++) {
                //取得随机数的索引（0~35）
                var index = Math.floor(Math.random()*10);
                //根据索引取得随机数加到code上
                this.code += random[index];
            }
            //把code值赋给验证码
            this.numCode = this.code;
        },
        setCookie: function (cname, cvalue, exdays) {
            document.cookie = cname + "=" + cvalue + "; "
        },
        loginClick(){
            if(this.account == ''){
                this.$message.error("请输入账号");
                return;
            }
            if(this.password == ''){
                this.$message.error("请输入密码");
                return;
            }  
            if(this.validation == ''){
                this.$message.error("请输入验证码");
                return;
            }            
            if(this.validation.toLowerCase() != this.numCode.toLowerCase()){
                this.$message.error("验证码不正确");
                return;
            }
            let data = {
                username : this.account,
                password : this.password,
            }
            login(data).then((res)=>{
                console.info(res)
                // localStorage.setItem("user", res);
                // console.log(user)
                if(res.data.booth_list.length != 0){
                    let name = res.data.booth_list[0].name,
                        node_id = res.data.booth_list[0].node_id,
                        isRegion = res.data.role_list[0].region,
                        scShopId = res.data.booth_list[0].SHOP_BOOTH_ID,
                        roleId = res.data.role_list[0].ROLEID;
                    localStorage.setItem('loginName',name);
                    localStorage.setItem('loginId',node_id);
                    localStorage.setItem('isRegion',isRegion);
                    localStorage.setItem('scShopId',scShopId);
                    localStorage.setItem('roleId',roleId);
                    localStorage.setItem('account',this.account);
                    localStorage.setItem('password',this.password);
                    localStorage.setItem('userType',res.data.booth_list[0].usertype);
                    sessionStorage.setItem('userName',this.account)
                    this.setCookie('userName',this.account)
                }
                if(res.result){
                    if(this.check){
                        localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                        localStorage.setItem('username',JSON.stringify(this.account));
                        localStorage.setItem('checked',JSON.stringify(true));
                        localStorage.setItem('userId',res.data.userId);
                        localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                        this.userId = res.data.userId;
                    }else{
                        localStorage.setItem('menuList',JSON.stringify(res.data.menu_list));
                        localStorage.setItem('username',JSON.stringify(this.account));
                        localStorage.setItem('userId',res.data.userId);
                        localStorage.setItem('nodeidlocal',res.data.booth_list[0].node_id);
                        this.userId = res.data.userId;
                    }
                    this.$router.push({name:'home'})
                }else{
                    clocalStorage.clear();                    
                }                
            }).catch((res)=>{
                this.$message.error('账号或密码输入不正确!')
            })
            
        }
    }
}
</script>
<style scoped lang="less">
    @import '../../assets/css/common.css';
    .container{
        display: flex;
        background: #fff;
        min-width: 1200px;
        height: 100%;
        .strip{
            width: 150px;
            height: 100%;
        }
        .image{
            // width: 600px;
            height: 100%;
        }
        .message{
            position: relative;
            top: 50%;
            right: 0;
            margin: -260px auto 0;
            width: 400px;
            height: 520px;
            box-sizing: border-box;
        }
        .header{
            margin-bottom: 40px;
            width: 400px;
            height: 50px;
            line-height: 50px;
            font-size: 32px;
            text-align: center;
            font-weight: bold;
            color: #000;
        }
        .login-area{           
            margin: 0 auto;
            width: 400px;
            height:420px;
            // transform: translateY(-182px) translateX(-200px);
            border: 1px solid #ededed;
            border-radius: 3px;
            background: #fff;
            box-shadow: 2px 2px 10px 5px #ededed;
            .title{
                margin: 30px 0;
                font-size: 28px;
                font-weight: bold;
                color: #2ea7e0;
                text-align: center;
            }
            .content{
                .account,.password{
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 25px;
                    width: 80%;
                    height: 44px;
                    line-height: 40px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    border-radius: 2px;
                    span{
                        width: 44px;
                        height: 42px;
                        text-align: center;
                        background: #f2f2f2;
                        display: inline-block;
                    }
                    input{
                        display: inline-block;
                        margin-left: 10px;
                        height: 26px;
                        line-height: 26px;
                        width: 70%;
                    }
                }
                .code{
                    display: flex;
                    margin: 0 auto;
                    width: 80%;  
                    .validation{
                        display: block;
                        margin-bottom: 10px;
                        width: 150px;
                        height: 44px;
                        line-height: 40px;
                        box-sizing: border-box;
                        border: 1px solid #ccc;
                        border-radius: 2px;
                        span{
                            width: 44px;
                            height: 42px;
                            text-align: center;
                            background: #f2f2f2;
                            display: inline-block;
                        }
                        input{
                            display: inline-block;
                            margin-left: 10px;
                            height: 26px;
                            line-height: 26px;
                            width: 58%;
                        }
                    }
                    .num{
                        margin-left: 10px;
                        width: 50px;
                        height: 44px;
                        line-height: 40px;
                        color: #999;
                        text-align: center;
                        box-sizing: border-box;
                        border: 1px solid #ccc;
                        border-radius: 2px;
                    }
                    .btn{
                        margin-left: 10px;
                        width: 100px;
                        height: 44px;
                        line-height: 40px;
                        color: #fff;
                        background: #2ea7e0;
                        text-align: center;
                        box-sizing: border-box;
                        border: 1px solid #2ea7e0;
                        border-radius: 2px;
                        cursor: pointer;
                        
                    }
                }
                .other{
                    margin: 0 auto 25px;
                    width: 80%; 
                    font-size: 14px;  
                    color: #606266; 
                    label{
                        cursor: pointer;
                    }                
                }                
                .code-login,.forget-password{
                    float: right;
                    display: block;
                    cursor: pointer;
                }
            }
            .login-btn{
                input{
                    display: block;
                    margin: 0 auto;
                    height: 44px;
                    line-height: 44px;
                    width: 80%;
                    color: #fff;
                    border: none;
                    border-radius: 3px;
                    background: #2ea7e0;
                    cursor: pointer;
                }
            }
        }
        .footer{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0 30px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 12px;
            text-align: center;
            box-sizing: border-box;
            color: #989898;
        }
        .active{
            border-color: #2ea7e0 !important;
        }
    }
</style>

