<template>
    <div class="content viewRetrieval">
        
    </div>
</template>

<script>
// 时间戳转日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // var h = date.getHours() + ':';
    // var m = date.getMinutes() + ':';
    // var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
// 标准时间转日期格式
function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
import {GetJgjgByNodeid, GetNodeJgInfoGroupForJg} from '../../js/enterprise/enterprise.js'
import {GetNodeTzInfoGroupForJg} from '../../js/retrieval/retrieval.js'
export default {
    name:"viewRetrieval",
    data() {
        return {
            form: {
                dataTime: '',
                node_name: '',
                node_id: '',
                name: '',
                states: '',
                supervise: '',
            },
            superviseArr: [],
            nodeArr: [],
            startTime: '',
            endTime: '', 
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            userType: '',
            node_id: '',
        }
    },
    mounted() {
        this.form.node_id = this.$route.params.node_id
        this.form.node_name = this.$route.params.node_name
        this.node_id = localStorage.getItem('loginId')
        this.userType = localStorage.getItem('userType')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getGetJgjgByNodeid()
        this.getGetNodeJgInfoGroupForJg()
        this.getDataFun()
    },
    methods: {
        // 节点名称
        getGetNodeJgInfoGroupForJg(){
            let params = {
                node_id: this.node_id,
                usertype: this.userType,
                sjjgjg: '',
                page: 1,
                cols: 10000,
                node_type: '',
                node_name: '',
            }
            GetNodeJgInfoGroupForJg(params)
                .then(res => {
                    this.nodeArr = res.data.list
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 监管机构
        getGetJgjgByNodeid(){
            let str = 'node_id=' + this.node_id
            GetJgjgByNodeid(str)
                .then(res => {
                    this.superviseArr = res.data.list
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getDataFun(){
            let params = {
                node_id: this.form.node_id,
                usertype: this.userType,
                sjjgjg: this.form.supervise,
                page: this.page,
                cols: this.cols,
                start_time: this.startTime,
                end_time: this.endTime,
                parent_node_id: this.node_id,
                ws_supplier_name: "",
                gys_mc: this.form.name,
                plu_name: "",
            }
            GetNodeTzInfoGroupForJg(params)
                .then(res => {
                    this.tableData = res.data.list
                    this.num = res.data.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        viewFun(ele){
            this.$router.push({name: 'ViewLedger',params: ele})
        },
        viewImgFun(){

        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                dataTime: '',
                node_name: '',
                name: '',
                states: '',
                supervise: '',
            }
            this.startTime = ''
            this.endTime = ''
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.getDataFun()
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime()
            }
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .searchs{
            margin-top: 10px;
            padding: 10px 0;
            background: #fff;
            .search{
                .file-btn{
                    color: #777;
                    background: #fff;
                    border-color: #eaeaea;
                }
                .search-btn{
                    color: #409EFF;
                    background: #fff;
                }
                .clear-content{
                    margin-left: 10px;
                    cursor: pointer;
                    color: #999999;
                    font-size: 14px;
                }
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .import{
                color: #409EFF;
                background: #fff;
            }
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
                div{
                    display: flex;
                    width: 300px;
                    justify-content: flex-end;
                }
            }
        }
    }

</style>
<style lang='less'>
    .viewRetrieval{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>