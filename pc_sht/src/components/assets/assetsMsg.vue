<template>
    <div class="content">
        <div class="iframe">
            <iframe v-if="url" :src="url" scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"assetsMsg",
    data() {
        return {
            url: ''
        }
    },
    mounted() {
        this.url = 'http://117.107.128.154:10086/AssetsAdmin/#/logined'
    },
    methods: {
        managementFun(){

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
