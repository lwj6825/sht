<template>
   <div class="content">
        <div class="search">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="查询日期：">
                    <el-date-picker style="width:300px;"
                        v-model="form.time" value-format="yyyy-MM-dd"  type="daterange" align="left" unlink-panels range-separator="至" clear-icon	
                        :picker-options="pickerOptions"  start-placeholder="开始日期"  end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务名称：">
                    <el-input v-model="form.input" placeholder="请输入内容" style="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="任务类型：">
                    <el-select v-model="form.value" clearable placeholder="请选择"  @change="selectType" style="width:230px;">
                        <el-option v-for="(item,index) in type" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行结果：">
                    <el-select v-model="form.value1" clearable placeholder="请选择"  @change="selectResult" style="width:230px;">
                        <el-option v-for="(item,index) in result" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-left:20px;" @click="handleBtn()">搜索</el-button>
                    <span @click="clearFun" class="clear-content">清空筛选条件</span>
                </el-form-item>
            </el-form>
                <!-- <div> -->
                    <!-- <span>查询日期：</span>
                        <el-date-picker style="width:270px;"
                        v-model="time" value-format="yyyy-MM-dd"  type="daterange" align="left" unlink-panels range-separator="至" clear-icon	
                        :picker-options="pickerOptions"  start-placeholder="开始日期"  end-placeholder="结束日期">
                    </el-date-picker> -->
                    <!-- <span class="status">任务名称：</span>
                    <el-input v-model="input" placeholder="请输入内容" style="width:250px"></el-input> -->
                    <!-- <span class="type">任务类型：</span>
                    <el-select v-model="value" placeholder="请选择" style="width:150px" @change="selectType">
                        <el-option v-for="(item,index) in type" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select> -->
                <!-- </div> -->
                <!-- <div class="search_second"> -->
                    <!-- <span class="result">执行结果：</span>
                    <el-select v-model="value1" placeholder="请选择" style="width:100px" @change="selectResult">
                        <el-option v-for="(item,index) in result" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <!-- <el-button type="primary" style="margin-left:20px;" @click="handleBtn()">搜索</el-button>
                    <span @click="clearFun" class="clear-content">清空筛选条件</span> -->
                <!-- </div> -->
        </div>
        <div class="tables" v-loading.body="fullscreenLoading">
            <div class="title">
                <p class="tz-title">数据列表</p>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass" >
                    <el-table-column prop="job_name" label="任务名称"></el-table-column>
                    <el-table-column prop="job_type" label="任务类型"></el-table-column>
                    <el-table-column prop="start_time" label="开始时间"></el-table-column>
                    <el-table-column prop="end_time" label="结束时间"></el-table-column>
                    <el-table-column prop="execute_time" label="执行用时"></el-table-column>
                    <el-table-column prop="execute_num" label="处理数量"></el-table-column>
                    <el-table-column prop="execute_result" label="执行结果"></el-table-column>
                    <el-table-column prop="job_exception" label="异常信息"></el-table-column>
                    <!-- <el-table-column label="异常信息" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleResult(scope.row)">查看异常信息</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
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
    return  year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
import {QueryJobType,QueryExecuteResult,GetAllJobExecuteLog} from '../../js/analysis/analysis.js'
export default {
    name:"taskMotion",
    data() {
        return {
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            form:{
                time:'',
                input:'',
                value:'',
                value1:'',
            },
            fullscreenLoading:true,
            data:'',
            cols:10,
            currentPage:1,
            tableData:[],
            type: [],
            result:[],
            taskType:'',
            taskResult:'',
            total:0,
            // time:'',//默认今日日期
            in_data:'',
            startTime:'',
            endTime:'',
            flag: true
        }
    },
    computed: {
       
    },
    mounted() {
        if(this.flag){
            this.getTime()
            this.GetAllJobExecuteLogFun()
        }
        this.getqueryJobType()
        this.getqueryExecuteResult()
        this.getTime()
    },
    methods: {
        clearFun(){
            function formatTen(num) { 
                return num > 9 ? (num + "") : ("0" + num); 
            }
            var start = new Date(); 
            var year = start.getFullYear(); 
            var month = start.getMonth() + 1; 
            var day = start.getDate(); 
            this.startTime = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.endTime = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.form.time = [this.startTime,this.endTime]
            this.fullscreenLoading = true;
            this.form.input = '';
            this.form.value = '';
            this.form.value1 = '';
            this.taskType = '';
            this.taskResult = '';
            this.page = 1;
            this.GetAllJobExecuteLogFun()
        },
         getTime(){
            function formatTen(num) { 
                return num > 9 ? (num + "") : ("0" + num); 
            }
            var start = new Date(); 
            var year = start.getFullYear(); 
            var month = start.getMonth() + 1; 
            var day = start.getDate(); 
            this.startTime = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.endTime = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.form.time = [this.startTime,this.endTime]
            this.GetAllJobExecuteLogFun()
        },
        handleBtn(){  //点击搜索    
            this.fullscreenLoading = true;
            this.flag = false;
            this.currentPage = 1;
            this.startTime = this.form.time[0];
            this.endTime = this.form.time[1];
            this.GetAllJobExecuteLogFun()
        },
        selectType(val){  //任务类型
            if(val){
                this.type.forEach(ele => {
                    if(val == ele.id){
                        this.taskType = ele.id
                    }
                })
            }else{
                this.taskType = ''
            }
        },
        selectResult(val){  //任务结果
            if(val){
                this.result.forEach(ele => {
                    if(val == ele.id){
                        this.taskResult = ele.id
                    }
                })
            }else{
                this.taskResult = ''
            }
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
         handleSizeChange(val) {   //每页
            this.cols = val ;
            this.GetAllJobExecuteLogFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val ; 
            this.fullscreenLoading = true
            this.GetAllJobExecuteLogFun()
        },
        getqueryJobType(){  //任务运行日志中任务类型
            QueryJobType()
                .then(res=>{
                    this.type = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getqueryExecuteResult(){  //任务运行日志中任务执行结果
            QueryExecuteResult()
                .then(res=>{
                    this.result = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })    
        },
        GetAllJobExecuteLogFun(){  //任务运行日志查询
            let params = {
                page:this.currentPage,
                cols:this.cols,
                start_date:this.startTime,
                end_date:this.endTime,
                job_type:this.taskType,
                job_name:this.form.input,
                execute_result:this.taskResult
            }
            GetAllJobExecuteLog(params)
                .then(res=>{
                    this.fullscreenLoading = false;
                    this.tableData = res.data.dataList;
                    this.total = res.data.condition.total;
                })
                .catch(res=>{
                    console.log(res)
                })    
        },
    },
    components:{
    }
}
</script>

<style scoped lang='less'>
.content{
    width: 100%;
    height: 100%;
    .search{
        width: 100%;
        // padding-left: 50px;
        // padding-right: 105px;
        padding:10px 0;
        background: #fff;
        // height: 115px;
        span{
            font-size: 14px;
        }
        .status,.type{
            margin-left: 30px;
        }
        .search_second{
            padding-top: 20px;
        }
        .clear-content{
            margin-left: 10px;
            cursor: pointer;
            color: #999999;
            font-size: 14px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }
    .tables{
        margin-top: 10px;
        width: 100%;
        background: #fff;
        .title{
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 10px;
            .tz-title{
                flex: 1;
                height: 20px;
                font-size: 14px;
                padding-left: 4px;
                line-height: 20px;
                box-sizing: border-box;
                border-left: 2px solid #409EFF;
            }
        }
        .table-box{
            padding:10px;
        }
        .pagination{
            padding-top: 10px;
            text-align: center;
        }
    }
}   

</style>
<style lang="less">
.el-input__icon{
    line-height: 33px;
}
.el-icon-arrow-up{
    line-height: 33px;
}
.el-table__row{
    height:50px;
    line-height: 50px;
}
.el-input__icon{
    line-height:26px;
}
.el-date-editor .el-range__icon{
    line-height: 24px !important;
}
.el-date-editor .el-range-separator{
    line-height: 24px !important;
}
</style>