<template>
    <div class="content">
        <div class="iframe">
            <iframe src="https://das.base.shuju.aliyun.com/token3rd/dashboard/view/pc.htm?pageId=b985a221-1a53-417e-829a-3dfd6187bd92&accessToken=f08bf05d07614b103cbc4a7d77b6ed23" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name:"getsTo",
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
