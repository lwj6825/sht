<template>
    <div class="content slaughterList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="90px" clearable>
                    <el-form-item label="屠宰批次号" prop="name">
                        <el-input v-model="form.batch"></el-input>
                    </el-form-item>
                    <el-form-item label="屠宰日期" style="width: 400px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部生产记录</p>
                <div>
                    <el-button type="primary" class="blue-bth" @click="addFun">添加屠宰记录</el-button>
                    <!--<el-button type="primary" class="import white-bth" @click="dowoloadAllFun">批量下载</el-button>
                --></div>
            </div>
            <div class="tables" >
                <el-table  :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="tz_rq" label="屠宰日期"> </el-table-column>
                    <el-table-column prop="stk_batch_id" label="屠宰批次号"> </el-table-column>
                    <el-table-column prop="stk_goods_name" label="商品信息"> </el-table-column>
                    <!--<el-table-column prop="GOODS_UNIT" label="规格"> </el-table-column>-->
                    <el-table-column prop="stk_num" label="数量"> </el-table-column>
                    <el-table-column prop="biz_name" label="屠宰企业"> </el-table-column>
                    <el-table-column label="操作" width='200'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
import {GetAllYzctzjg,DeleteYzctzjg} from '../../js/tzSlaughter/tzSlaughter.js'
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
export default {
    name:"slaughterList",
    data() {
        return {
            form: {
                batch: '',
                dataTime: '',
            },
            node_id: '',
            startTime: '',
            endTime: '',
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
        }
    },
    mounted() {
        this.node_id = localStorage.getItem('loginId')
        // this.getTime()
        // let arr = []
        // arr.push(this.startTime)
        // arr.push(this.endTime)
        // this.form.dataTime = arr
        this.getDataFun()
    },
    methods: {
        getDataFun(){
            let obj = { 
                stk_batch_id: this.form.batch,
                start_time: this.startTime,
                end_time: this.endTime,
                page: this.page,
                cols: this.cols,
                node_id: this.node_id
            }
            GetAllYzctzjg(obj)
                .then(res => {
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        addFun(){
            this.$router.push({name: 'NewSlaughter'})
        },
        handleCurrentChange(val) {
            this.page = val
        },
        viewFun(ele){
            this.$router.push({name: 'ViewSlaughter',params: ele})
        },
        deleteFun(ele){
            let obj = { 
                id: ele.id
            }
            DeleteYzctzjg(obj)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        clearFun(){
            this.form = {
                batch: '',
                dataTime: ''
            }
            this.startTime = ''
            this.endTime = ''
            // this.getTime()
            // let arr = []
            // arr.push(this.startTime)
            // arr.push(this.endTime)
            // this.form.dataTime = arr
            this.page = 1
            this.getDataFun()
        },
        searchFun(){
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
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
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
    .content{
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
                    width: 1000px;
                }
                .el-input,.el-date-picker,.el-select{
                    width: 160px;
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
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .slaughterList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>
