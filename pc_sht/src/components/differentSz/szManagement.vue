<template>
    <div class="content">
        <el-button type="primary" @click="organizationFun">组织机构管理</el-button>
        <el-button type="primary" @click="userFun">用户管理</el-button>
        <el-button type="primary" @click="moduleFun">模块管理</el-button>
    </div>
</template>

<script>
import {toQx,toMb} from '../../js/address/url.js'
export default {
    name:"szManagement",
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {
        organizationFun(){
            // window.location.href="当前窗口";
            let url = toQx
            window.open(url);
        },
        userFun(){
            let url = toQx
            window.open(url);
        },
        moduleFun(){
            let url = toMb
            window.open(url);
        }
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .iframe{
            width: 100%;
            height: 700px;
        }
    }
</style>
