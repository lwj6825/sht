<template>
    <div class="container" @keyup.enter="loginClick()">
        <div class="header">北京E追溯商户通</div>
        <div class="login-area">
            <header class="title">系统登录</header>
            <div class="content">
                <label class="account">账号<input type="text" v-model="account"></label>
                <label class="password">密码<input type="password" v-model="password"></label>
                <div class="code"> 
                    <div class="validation">
                        <p>验证码</p>
                        <input type="text" v-model="validation">
                    </div>
                    <p class="btn" @click="getValidationFun">{{codeBtn}}</p>
                    <p class="num" v-if="numCode">{{numCode}}</p>
                </div>
                <div class="other">
                    <label for="remberPassword">
                        <el-checkbox v-model="check">记住密码</el-checkbox>
                    </label>
                    <span class="code-login">验证码登录</span>
                    <span class="forget-password">忘记密码？</span>                    
                </div>
            </div>
            <footer class="login-btn" @click="loginClick()">
                <input type="button" value="登录">
            </footer>
        </div>
        <canvas id="canvas"></canvas>
        <div class="footer">版权所有©北京志恒达科技有限公司-京ICP备05030152号</div>
    </div>
</template>
<script>
import {login,login2} from "../../js/login/ajax.js";
import PointLine from '../../assets/js/canvas.js';
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
        }
    },
    created() {
        this.getValidationFun()
    },
    mounted(){
        this.getValidationFun()
        const pointLine = new PointLine();
        if(localStorage.getItem('checked')){        
            this.account = localStorage.getItem('accoutn');
            this.userId = localStorage.getItem('userId');
            this.$router.push({path:'home'})
        }
    },
    methods:{
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
                    this.$router.push({path:'home'})
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
    .container{
        position: relative;
        background: #fff;
        height: 100%;
        .header{
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 30px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            color: #409eff;
            box-sizing: border-box;
        }
        .login-area{
            position: absolute;
            top: 50%;
            left: 50%;
            margin: 0 auto;
            width: 400px;
            height:364px;
            transform: translateY(-182px) translateX(-200px);
            border: 1px solid #ddd;
            border-radius: 3px;
            background: #fff;
            box-shadow: 0 0 6px #ddd;
            .title{
                margin-top: 50px;
                margin-bottom: 40px;
                font-size: 24px;
                color: #333;
                font-weight: 900;
                text-align: center;
            }
            .content{
                .account,.password{
                    display: block;
                    margin: 0 auto;
                    padding: 8px;
                    width: 80%;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ddd;
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
                    margin: 10px auto 10px;
                    width: 80%; 
                    font-size: 14px;  
                    .validation{
                        display: flex;
                        font-size: 16px; 
                        box-sizing: border-box;
                        border-bottom: 1px solid #ddd;
                        p{
                            padding-bottom: 10px;
                            margin-left: 8px;
                            width: 58px;
                            height: 30px;
                            line-height: 30px;
                        }
                        input{
                            padding-bottom: 10px;
                            width: 110px;
                        }
                    }
                    .num{
                        margin-top: 10px;
                        width: 50px;
                        height: 30px;
                        text-align: center;
                        background: #ccc;
                        color: #fff;
                        line-height: 30px;
                    }
                    .btn{
                        margin-top: 10px;
                        width: 90px;
                        height: 30px;
                        text-align: center;
                        color: #666;
                        line-height: 30px;
                        cursor: pointer;
                        
                    }
                }
                .other{
                    margin: 0 auto 30px;
                    width: 80%; 
                    font-size: 14px;   
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
                    height: 30px;
                    line-height: 30px;
                    width: 80%;
                    color: #fff;
                    border: none;
                    border-radius: 3px;
                    background: #199ed8;
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
        }
    }
</style>

