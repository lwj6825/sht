<template>
    <div class="content">
        <div class="search">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="查询日期">
                    <el-date-picker style="width:300px;" v-model="time" value-format="yyyy-MM-dd"  type="daterange" align="left" unlink-panels 
                        range-separator="至" clear-icon	:picker-options="pickerOptions"  start-placeholder="开始日期"  end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="value1" clearable placeholder="请选择" @change="selectGet" style="width:230px">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="handleBtnTable()">搜索</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="tables" v-loading.body="fullscreenLoading">
            <div class="title">
                <p class="tz-title">日志列表</p>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass" >
                    <el-table-column prop="record_time" label="执行时间" align="center"> </el-table-column>
                    <el-table-column prop="warn_name" label="执行内容" align="center"> </el-table-column>
                    <el-table-column prop="state" label="状态" align="center"> </el-table-column>
                        <el-table-column label="执行" width="160">
                        <template slot-scope="scope">
                            <el-button @click="handleBtn(scope.row)">主动执行</el-button>
                        </template>
                        </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleResult(scope.row)">查看执行结果</el-button>
                            <!-- <el-button type="text" size="small" @click="handleControl()">延期监控</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {GetAllWarning,warningState,GetAllLogWarning,InsertWarning,UpdateWarning,ExecuteWarning,DownloadLogWarning} from '../../js/warning/warning.js'
export default {
    name:"dailyWarning",
    data() {
        return {
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            form:{},
            time:'',
            value:'',
            value1:'',
            tableData:[],
            currentPage:1,
            cols:10,
            options: [
                {id: '0',text: '未解决'}, 
                {id: '1',text: '已解决'}
            ],
            total:0,
            dataSou:'',
            start_time:'',
            end_time:'',
            fullscreenLoading:true
        }
    },
    mounted() {
        // this.GetAllLogWarningFun();
        this.getTime()
    },
    methods: {
        clearFun(){
            this.time ='',
            this.start_time = '',
            this.end_time = '',
            this.value1 = '',
            this.dataSou = '',
            this.currentPage = 1
            this.GetAllLogWarningFun()
        },
        getTime(){
            function formatTen(num) { 
                return num > 9 ? (num + "") : ("0" + num); 
            }
            var start = new Date(); 
            var year = start.getFullYear(); 
            var month = start.getMonth() + 1; 
            var day = start.getDate(); 
            this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.time = [this.start_time,this.end_time]
            this.GetAllLogWarningFun()
        },
        handleBtnTable(){ // 点击搜索
            this.fullscreenLoading = true ;
            this.start_time = this.time[0];
            this.end_time = this.time[1];
            this.GetAllLogWarningFun()
        },
        handleBtn(scope,row){  //查看执行结果
            let params = {
                id :  scope.warn_id,
                log_id : scope.id,
                excel_url : scope.excel_url
            }
            ExecuteWarning(params)
                .then( res => {
                    this.$message({
                        message: '已执行',
                        type: 'success'
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        },
        selectGet(val){  //选择数据源类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.dataSou = ele.id
                    }
                })
            }else{
                this.dataSou = ''
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.GetAllLogWarningFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.GetAllLogWarningFun()
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleResult(scope,row){  //查看执行结果
            this.$router.push({name:'ExecuteResult',params:scope})
        },
        handleControl(){ //延期监控
        },
        GetAllLogWarningFun(){  //查询预警日志
            let params = {
                page: this.currentPage,
                cols:this.cols,
                start_time: this.start_time,
                end_time: this.end_time,
                state: this.dataSou
            }
            GetAllLogWarning(params)
                .then(res=>{
                    this.fullscreenLoading = false ;
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
        padding: 10px 0;
        width: 100%;
        background: #fff;
        span{
            font-size: 14px;
        }
        .status{
            margin-left: 100px;
        }
        .btn{
            margin-left: 30px;
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
            padding-top: 8px;
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
.el-table__row{
    height:50px;
    line-height: 50px;
}
.el-icon-date{
    line-height: 25px !important;
}
.el-range-separator{
    line-height: 25px !important;
}
</style>
