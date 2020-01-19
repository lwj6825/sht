<template>
    <div class="content">
         <div class="box">
                <div class="warn_title">预警原因：</div>
                <el-col :span="20">
                    <el-input type="textarea" :rows="2" v-model="warning_reason"></el-input>
                </el-col>
                <div class="resolve">解决方案：</div>
                <el-col :span="20">
                    <el-input type="textarea" :rows="5" v-model="warning_result"></el-input>
                </el-col>
                <div class="execute">
                    <a  @click="downloadDaily">下载日志附件</a>
                </div>
               
         </div>
       
    </div>
</template>

<script>
import axios from 'axios'
import {GetAllWarning,warningState,GetAllLogWarning,InsertWarning,UpdateWarning,ExecuteWarning,DownloadLogWarning} from '../../js/warning/warning.js'
export default {
    name:'editFun',
    data(){
        return{
            warning_result:'',
            warning_reason:'',
            log_id :'',
            id :''
        }
    },
    mounted(){
        window.scrollTo(0,0)
        if(JSON.stringify(this.$route.params) != "{}"){
                this.warning_reason = this.$route.params.warning_reason;
                this.warning_result = this.$route.params.warning_result;
                this.id = this.$route.params.id;
                this.log_id = this.$route.params.warn_id;
        }
    },
    methods:{
        downloadDaily(){
            window.location.href = 'http://shop.zhdtech.com/warning/downloadLogWarning?id='+this.log_id+'&log_id='+this.id
        }
    }
}
</script>

<style scoped lang='less'>
.content{
    background-color: #ffffff;
    .box{
        width:850px;
        padding-left: 50px;
        padding-top: 20px;
        height: 350px;
        .warn_title{
            padding-bottom: 20px;
        }
        .resolve{
            clear: both;
            padding-top: 40px;
            padding-bottom: 20px;
        }
        .execute{
            clear: both;
            padding-top: 20px;
            color:#1d85f9;
            font-size: 14px;
        }
    }
}
</style>
