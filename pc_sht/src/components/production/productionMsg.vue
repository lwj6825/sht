<template>
    <div class="content productionMsg">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="90px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="生产批次号" prop="name">
                        <el-input v-model="form.productionCode" placeholder="输入生产批次号"></el-input>
                    </el-form-item>
                    <el-form-item label="销售商品" prop="name">
                        <el-input v-model="form.goodName" placeholder="输入销售商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="生产日期" style="width: 400px;" >
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
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="90px" :style="show ? {display: 'none'} : {display: 'block'}">
                    <el-form-item label="生产日期" style="width: 400px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <p class="unfold" @click="unfoldFun">{{unfold}}筛选条件</p>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部生产任务</p>
                <div>
                    <el-button type="primary" class="blue-bth" @click="addProductionFun">添加生产任务</el-button>
                    <el-button type="primary" class="import white-bth" @click="dowoloadAllFun">批量下载</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table  :data="tableData" :header-cell-style="rowClass" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column prop="SC_DATE" label="生产日期"> </el-table-column>
                    <el-table-column prop="BATCH_ID" label="生产批次号"> </el-table-column>
                    <el-table-column prop="GOODS_NAME" label="销售商品"> </el-table-column>
                    <el-table-column prop="GOODS_UNIT" label="规格"> </el-table-column>
                    <el-table-column prop="NUMBER" label="销售数量"> </el-table-column>
                    <el-table-column width='140' label="进货商品信息">
                        <template slot-scope="scope">
                            <p class="btn" @click="viewFun2(scope.row)">查看进货商品信息</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width='200'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看&emsp;|</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除&emsp;|</el-button>
                            <el-button type="text" size="small" @click="dowoloadFun(scope.row)">下载文件</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination><!---->
            <div class="passwrd" v-if="isShow">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">查看进货商品信息</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <div class="view-table">
                        <el-table :data="tableData2" :header-cell-style="rowClass">
                            <el-table-column prop="or_goods_name" label="进货商品"> </el-table-column>
                            <el-table-column prop="or_unit" label="规格"> </el-table-column>
                            <el-table-column prop="or_number" label="数量"> </el-table-column>
                            <el-table-column prop="or_batch_id" label="进货批次号"> </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
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
import {GetAllProduction,QueryPurchaseInfo,DownloadProduction,DownloadBatchProduction,DeleteProduction} from '../../js/production/production.js';
export default {
    name:"productionMsg",
    data() {
        return {
            form: {
                goodName: '',
                productionCode: '',
                dataTime: ''
            },
            unfold: '展开',
            show: false,
            startTime: '',
            endTime: '',
            node_id: '',
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            isShow: false,
            tableData2: [],
            selectArr: []
        }
    },
    mounted() {
        this.node_id = localStorage.getItem('loginId')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getDataFun()
    },
    methods: {
        deleteFun(ele){
            let params = {
                id: ele.ID,
                userdefine_batch_id: ele.BATCH_ID
            }
            DeleteProduction(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        dowoloadAllFun(){
            let arr = [],str = '';
            if(this.selectArr.length > 0){
                this.selectArr.forEach(val => {
                    arr.push(val.ID)
                })
                if(arr.length > 0){
                    str = arr.join(',')
                    let params = {
                        ids: str
                    }
                    DownloadBatchProduction(params)
                        .then(res => {
                            this.downFile(res)
                        })
                        .catch(() => {
                            this.$message.error("出错啦!");
                        })
                }
            }
        },
        dowoloadFun(ele){
            let params = {
                id: ele.ID
            }
            DownloadProduction(params)
                .then(res => {
                    this.downFile(res)
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        downFile (data) {
            if (!data) { return }
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none';
            link.href = url
            link.setAttribute('download', 'download.txt')
            
            document.body.appendChild(link)
            link.click()
        },
        getDataFun2(batch_id){
            let obj = {
                userdefine_batch_id: batch_id
            }
            QueryPurchaseInfo(obj)
                .then(res => {
                    this.tableData2 = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        viewFun2(ele){
            this.getDataFun2(ele.BATCH_ID)
            this.isShow = true
        },
        closeFun(){
            this.isShow = false
        },
        viewFun(ele){
            this.$router.push({name: 'viewProduction',params: {param: ele}})
        },
        getDataFun(){
            let obj = {
                node_id: this.node_id,
                stk_batch_id: this.form.productionCode,
                stk_goods_name: this.form.goodName,
                start_time: this.startTime,
                end_time: this.endTime,
                page: this.page,
                cols: this.cols
            }
            GetAllProduction(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        handleSelectionChange(val) {
            this.selectArr = val
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        unfoldFun(){
            if(this.show == false){
                this.show = true
                this.unfold = '收起'
            }else{
                this.show = false
                this.unfold = '展开'
            }
        },
        clearFun(){
            this.form = {
                goodName: '',
                productionCode: '',
                dataTime: ''
            }
            this.getTime()
            this.page = 1
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        addProductionFun(){
            this.$router.push({name: "addProduction"})
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
    @import '../../assets/css/common.css';
    .content{
        .searchs{
            padding: 10px 0;
            background: #fff;
        }
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
        .btn{
            color: #666;
            text-decoration: underline;
            cursor: pointer;
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
                margin-top: -200px;
                margin-left: -300px;
                width: 600px;
                height: 400px;
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
                .view-table{
                    margin: 10px;
                    height: 330px;
                    overflow: auto;
                }
            }
        }
    }

</style>
<style lang="less">
    .productionMsg{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px !important;
        }
    }
</style>
