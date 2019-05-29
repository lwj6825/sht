<template>
    <div class="content">
        <div class="iframe">
            <iframe src="https://das.base.shuju.aliyun.com/token3rd/dashboard/view/pc.htm?pageId=596f9f21-7b2c-44bb-ad36-2c543926b8f1&accessToken=39f333534f28643a98691e411caaa00d" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"dataStatistics",
    data() {
        return {
            
        }
    },
    methods: {
        
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
