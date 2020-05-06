<template>
    <div class="content reviewJournal">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="查询日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="查询码">
                        <el-input class="placeholder" v-model="form.code" clearable placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-input class="placeholder" v-model="form.qy_name" clearable placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="查询类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="查询结果">
                        <el-select v-model="form.result" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in resultArr" :key="index" :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">追溯日志查询</p>
                    <el-button type="primary" plain @click="downloadFun">导出</el-button>
                </div>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="node_id" label="企业编码"></el-table-column>
                    <el-table-column prop="node_name" label="企业名称"></el-table-column>
                    <el-table-column prop="trace_code" label="查询码"></el-table-column>
                    <el-table-column prop="trace_date" label="查询日期"></el-table-column>
                    <el-table-column prop="trace_type" label="查询类型"></el-table-column>
                    <el-table-column prop="trace_result" label="查询结果"></el-table-column>
                    <el-table-column prop="check_type" label="查询设备"></el-table-column>
                    <el-table-column prop="error_msg" label="错误信息"></el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
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
function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            + " "  + date.getHours()  + seperator2  + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate
}
import {QueryCodeTypeSelect, QueryEtraceLog, QueryResultTypeSelect, DownloadEtraceLog} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
import {baseUrl4} from '../../js/address/url.js'
export default {
    name:"reviewJournal",
    data() {
        return {
            form: {
                dataTime: '',
                code: '',
                qy_name: '',
                types: '',
                result: '',
            },
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            typesArr: [],
            resultArr: [],
            startTime: '',
            endTime: '',
            loading: true,
        }
    },
    mounted() {
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.QueryCodeTypeSelectFun()
        this.QueryResultTypeSelectFun()
        this.getDataFun()
    },
    methods: {
        QueryCodeTypeSelectFun(){  //码类型
            QueryCodeTypeSelect('')
                .then(res => {
                    this.typesArr = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        QueryResultTypeSelectFun(){
            QueryResultTypeSelect('')
                .then(res => {
                    this.resultArr = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        downloadFun(){
            this.loading = true
            let params = {
                start_date: this.startTime,
                end_date: this.endTime,
                trace_code: this.form.code, // 查询码
                node_name: this.form.qy_name, // 企业名称
                trace_type: this.form.types, // 查询类型   1：二维码 3：条形码
                trace_result: this.form.result, // 查询结果  0：失败  1：成功
            }
            DownloadEtraceLog( params, {})
                .then((res) => {
                    this.loading = false
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `追溯查询日志` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        getDataFun(){
            this.loading = true
            let params = {
                cols: this.cols,
                page: this.page,
                start_date: this.startTime,
                end_date: this.endTime,
                trace_code: this.form.code, // 查询码
                node_name: this.form.qy_name, // 企业名称
                trace_type: this.form.types, // 查询类型   1：二维码 3：条形码
                trace_result: this.form.result, // 查询结果  0：失败  1：成功
            }
            QueryEtraceLog(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                })
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
                code: '',
                qy_name: '',
                types: '',
                result: '',
            }
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.page = 1
            this.getDataFun()
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime()
            }
        },
        getTime(){
            var start = new Date();
            // var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = formatDate(start)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
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
@import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .searchs{
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
        .tables{
            padding: 0 10px;
            background: #fff;
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
            .import{
                color: #409EFF;
                background: #fff;
            }
            .title{
                display: flex;
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
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        .passwrd{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -150px;
                margin-left: -200px;
                width: 400px;
                height: 170px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        width: 330px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                }
                .close{
                    float: right;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    cursor: pointer;
                }
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 50px;
                    .el-input{
                        width: 200px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 140px;
                    }
                }
            }
        }
        
    }
</style>
<style lang="less">
    .reviewJournal{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>