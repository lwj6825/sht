<template>
    <div class="content">
        <div class="iframe">
            <iframe src="https://das.base.shuju.aliyun.com/token3rd/dashboard/view/pc.htm?pageId=05181507-ef3b-4b87-bbe9-a33e2971d239&accessToken=8800d2cb2e799df78680f9342186f809" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"gailAnalyze",
    data() {
        return {
            urlId: '',
            functionid: '224'
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
