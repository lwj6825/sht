<template>
    <div class="content">
        <div class="iframe">
            <iframe v-if="urlId" :src="'https://ups.bdp.cn/api/custom_sso/sso?domain=zhdtech&RelayState=embed/dashboard.html?dashId=' + urlId  + '%26ruleId=1'" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"nodeReport",
    data() {
        return {
            urlId: '',
            functionid: '227'
        }
    },
    mounted() {
        this.getAllDashFun()
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
