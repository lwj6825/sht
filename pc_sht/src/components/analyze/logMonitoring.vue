<template>
    <div class="content">
        <div class="iframe">
            <iframe src="https://das.base.shuju.aliyun.com/token3rd/dashboard/view/pc.htm?pageId=a9af4fd7-d0f2-4529-a6fb-2783de923068&accessToken=45123193dca4740a6e1e29308a8e8d06" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"logMonitoring",
    data() {
        return {
            urlId: '',
            functionid: '231'
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
