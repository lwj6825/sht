<template>
    <div class="content">
        <div class="iframe">
            <iframe :src="url" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name:"dataWeekPort",
    data() {
        return {
            url: '',
            mainList: []
        }
    },
    mounted() {
        this.mainList = JSON.parse(localStorage.getItem('menuList'))
        this.mainList.forEach(val => {
            if(val.node == 'dataPort'){
                if(!val.children.url){
                    val.children.nodeList.forEach(val2 => {
                        if(val2.children.nodeList[0].id == '511'){
                            this.url = val2.children.nodeList[0].dashId
                        }
                    })
                }
            }
        })
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
