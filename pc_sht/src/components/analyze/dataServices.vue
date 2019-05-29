<template>
    <div class="content">
        <div class="iframe">
            <iframe src="https://das.base.shuju.aliyun.com/token3rd/dashboard/view/pc.htm?pageId=1cc363ed-0485-462e-93f9-a0dfbb525b90&accessToken=2bca810669ffd112c630a11902d43c05" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name:"dataServices",
    data() {
        return {
            
        }
    },
    mounted() {
        // this.getAllDashFun()
    },
    methods: {
        getAllDashFun(){
            let obj = {
            	status: "1",
	            functionid: this.functionid
            }
            GetAllDash(obj)
                .then(res => {
                    console.log(res)
                    this.urlId = res.data.dataList[0].dashid
                })
            .catch(res => {
                console.log(res)
            })
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
