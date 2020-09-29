<template>
    <div class="content assets">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="查询日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="执行结果">
                        <el-select v-model="form.result" filterable clearable placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="2"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="节点编码">
                        <el-input class="placeholder" v-model="form.node_code" clearable placeholder="请输入节点编码"></el-input>
                    </el-form-item>
                    <el-form-item label="节点名称">
                        <el-input class="placeholder" v-model="form.node_name" clearable placeholder="请输入节点名称"></el-input>
                    </el-form-item>
                    <el-form-item label="文件名称">
                        <el-input class="placeholder" v-model="form.file_name" clearable placeholder="请输入文件名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column type="index" label="序号" width="48"> </el-table-column>
                <el-table-column prop="node_id" label="节点编码"> </el-table-column>
                <el-table-column prop="node_name" label="节点名称"> </el-table-column>
                <el-table-column prop="table_name" label="存入表名"> </el-table-column>
                <el-table-column prop="start_time" label="开始时间" width="158"> </el-table-column>
                <el-table-column prop="end_time" label="结束时间" width="158"> </el-table-column>
                <el-table-column prop="execute_time" label="执行用时" width="76"> </el-table-column>
                <el-table-column prop="execute_num" label="处理数量" width="76"> </el-table-column>
                <el-table-column prop="execute_result" label="解析文件名"> </el-table-column>
                <el-table-column prop="job_exception" label="异常信息">
                    <template slot-scope="scope">
                        <p v-show="scope.row.job_exception">{{scope.row.job_exception.substring(0,20) + '...'}}</p>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="result" label="执行结果"></el-table-column>-->
            </el-table>
            
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import {QueryMonitoring} from '../../js/user/user.js'
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate();
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
export default {
    name:"msgMonitoring",
    data() {
        return {
            labelPosition: '0',
            page: 1,
            cols: 15,
            total: 0,
            tableData: [],
            start_date: '',
            end_date: '',
            form: {
                node_code: '',
                dataTime: '',
                node_name: '',
                file_name: '',
                result: ''
            },
        }
    },
    mounted() {
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getDataFun()
    },
    methods: {
        getDataFun(){
            let params = {
                start_time: this.startTime ? this.startTime : '',
                end_time: this.endTime ? this.endTime : '',
                cols: this.cols,
                page: this.page,
                node_id: this.form.node_code,
                node_name: this.form.node_name,
                file_name: this.form.file_name,
                result: this.form.result
            }
            QueryMonitoring(params)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.total = res.data.condition.total;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        
        searchFun(){
            this.page = 1
            this.timeChange()
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                node_code: '',
                dataTime: '',
                node_name: '',
                file_name: '',
                result: ''
            }
            this.page = 1
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.getDataFun()
        },
        getTime(){
            var start = new Date();
            this.startTime = formatDate(start)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.startTime = ''
                this.endTime = ''
            }
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .search-btn{
            color: #409EFF;
            background: #fff;
        }
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
        .table{
            margin-top: 10px;
            padding: 7px;
            background: #fff;
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        
    }
</style>
<style lang="less">
    .assets{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }
    .el-message--error{
        color: #f56c6c !important;
        font-size: 14px !important;
    }
    .el-message--success{
        color: #67c23a !important;
        font-size: 14px !important;
    }
</style>
