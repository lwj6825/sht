<template>
    <div class="content reportCsLsit">
        <div class="iframe">
            <iframe :src="url" scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name:"reportCsLsit",
    data() {
        return {
            url: '',
            userId: '',
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        // this.url = 'http://192.168.0.40:8848/Report/ftReporting.html?userId=' + this.userId;
        this.url = 'http://shop.zhdtech.com/priceIndex/ftReporting.html?userId=' + this.userId;
        //https://shop.zhdtech.com/priceIndex/life.html
    },
    methods: {
        
    },
}
</script>

<style scoped lang='less'>
    .content{
        background: #fff;
        .iframe{
            width: 100%;
            height: 680px;
        }
    }
</style>

