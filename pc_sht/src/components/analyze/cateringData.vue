<template>
    <div class="content">
        cateringData
餐饮数据运行概况
    </div>
</template>

<script>
import {GetAllDash} from '../../js/analyze/analyze.js'
export default {
    name:"cateringData",
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
