<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {Loginout} from './js/login/ajax.js'
export default {
  name: 'App',
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    this.account = localStorage.getItem('account')
    this.password = localStorage.getItem('password')
    this.remember = localStorage.getItem('remember')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
    Storage.prototype.getExpire= key =>{
        let val =localStorage.getItem(key);
        if(!val){
            return val;
        }
        val =JSON.parse(val);
        if(Date.now()-val.time>val.expire){
            localStorage.clear();
            sessionStorage.clear();
            if(this.remember == 'true'){
              console.log(111)
                localStorage.setItem('account', this.account)
                localStorage.setItem('password', this.password);
                localStorage.setItem('remember', this.remember);
            }
            Loginout()
                .then(res => {
                    this.$router.push({path:'/'})
                })
                .catch(res => {
                    // console.log(res)
                })
            return null;
        }
        return val.data;
    }
    localStorage.getExpire("token")
  },
  updated() {
    console.log('updated')
  },
  
}
</script>

<style>
/*reset*/
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,input,textarea,p,th,td,figure{margin:0; padding:0; font-family: "微软雅黑", Microsoft Yahei, Arial, Helvetica, sans-serif; font-size: 100%;}
body,html{background: #f2f2f2;}
table{border-collapse:collapse;border-spacing:0;}
fieldset,img{border:0;}
ol,ul{list-style:none;}
a{text-decoration:none;}
textarea{ box-sizing: content-box; border:none;outline: none;}
input{outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);border-radius:0; box-sizing: content-box;border: none;}
.el-dropdown-menu{
  max-height: 240px !important;
  overflow: auto !important;
  width: 170px !important;
}
</style>
