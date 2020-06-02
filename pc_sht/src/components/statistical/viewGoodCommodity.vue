<template>
    <div class="content viewGoodCommodity" ref="content">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="商户名称">
                        <el-input clearable v-model="form.biz_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input clearable v-model="form.good_name"></el-input>
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
                <p class="tz-title">商品交易额明细</p>
            </div>
            <div class="tables" v-loading="loading">
                <el-table  :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="stall_no" label="摊位号"></el-table-column>
                    <el-table-column prop="plu_name" label="商品名称"></el-table-column>
                    <el-table-column prop="sumprice" label="总交易额（元）"></el-table-column>
                    <el-table-column prop="sumweight" label="总交易量（公斤）"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column label="操作" width='80'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看明细</el-button>
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
import {QueryMoneyAndWeightForOneBiz} from '../../js/statistical/statistical.js'
export default {
    name: "viewGoodCommodity",
    data() {
        return {
            page: 1,
            cols: 15,
            num: 0,
            startTime: '',
            endTime: '',
            isShow: true,
            isRegion: '',
            form: {
                dataTime: '',
                biz_name: '',
                good_name: '',
            },
            tableData: [],
            userId: '',
            scShopId: '',
            node_id: '',
            biz_id: '',
            loading: true,
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.node_id = localStorage.getItem('loginId')
        let routeMsg2 = JSON.parse(localStorage.getItem('routeMsg2'))
        this.form.biz_name = routeMsg2.biz_name
        this.biz_id = routeMsg2.biz_id
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getDataFun()
    },
    methods: {
        detailTzFun(){

        },
        getDataFun(){
            var currentTime = new Date();
            let time = formatDate(currentTime)
            if(this.startTime == time || this.endTime == time){
                this.$message.error('不能选择今天日期');
                return
            }
            this.loading = true
            let str = 'node_id=' + this.node_id + '&biz_id=' + this.biz_id + '&start_date=' + this.startTime + '&end_date='
                + this.endTime + '&page=' + this.page + '&cols=' + this.cols + '&name=' + this.form.biz_name + '&goods_name='
                + this.form.good_name
            QueryMoneyAndWeightForOneBiz(str)
                .then(res=>{
                    this.loading = false
                    this.tableData = res.data.list 
                    this.num = res.data.totalCount
                })
                .catch(res=>{
                    console.log(res)
                })
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
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24);
            this.startTime = timestampToTime(startTime)
            var end = new Date()
            var endTime = end.setTime(end.getTime() - 3600 * 1000 * 24);
            this.endTime = timestampToTime(endTime)
        },
        clearFun(){
            this.form.good_name = ''
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.page = 1
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.timeChange()
            this.getDataFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
    },
}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
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
                min-width: 1000px;
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
        .areaBox{
            padding: 10px;
            margin-bottom: 10px;
            background: #fff;
        }
        .searchs{
            padding: 10px 0;
            background: #fff;
        }
        .import{
            color: #409EFF;
            background: #fff;
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
    .viewGoodCommodity{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>
