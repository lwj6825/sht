<template>
    <div class="content surveyList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="报表类型">
                        <el-select v-model="form.enterprise" filterable clearable placeholder="请选择">
                            <el-option label="零售市场" value="零售市场"></el-option>
                            <el-option label="批发市场" value="批发市场"></el-option>
                            <el-option label="超市" value="超市"></el-option>
                            <el-option label="菜车" value="菜车"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="填报日期">
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="填报企业">
                        <el-input v-model="form.node_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.states" filterable clearable placeholder="请选择">
                            <el-option  label="已上报" value="1"></el-option>
                            <el-option  label="未上报" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">报表浏览</p>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="node_type" label="报表类型"> </el-table-column>
                    <el-table-column prop="node_name" label="填报企业"> </el-table-column>
                    <el-table-column prop="in_date" label="日期"> </el-table-column>
                    <el-table-column prop="state" label="状态"></el-table-column>
                    <!--<el-table-column prop="data_source" label="数据来源">
                        <template slot-scope="scope">
                            <p v-if="scope.row.data_source == 1">中心各表抽取</p>
                            <p v-if="scope.row.data_source == 2">查询机抽取</p>
                            <p v-if="scope.row.data_source == 4">京东到家抽取</p>
                            <p v-if="scope.row.data_source == 5">人工填报</p>
                        </template>
                    </el-table-column>-->
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.state == '已上报'">
                                <el-button type="text" size="small" @click="viewFun(scope.row)">查看报价单</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <!--查看-->
            <div class="password" v-if="isView">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">查看</p>
                        <p class="iconfont icon-close close" @click="closeFun4"></p>
                    </div>
                    <div class="msg-box">
                        <div class="data">
                            <div class="tit">填报企业</div>
                            <div class="msg">
                                {{tbqyView}}
                            </div>
                        </div>
                        <div class="data">
                            <div class="tit">填报日期</div>
                            <div class="msg">
                                {{tbrqView}}
                            </div>
                        </div>
                    </div>
                    <div class="table" v-loading="loading2"><!-- -->
                        <el-table :data="tableData2" :header-cell-style="rowClass" :height="num2 ? 400 : 480">
                            <el-table-column :prop="from == '商户通' ? 'goods_name' : 'plu_name'" label="商品名称"></el-table-column>
                            <el-table-column prop="price" label="商品价格"></el-table-column>
                            <el-table-column prop="price" label="规格">
                                <template slot-scope="scope">
                                    <div v-if="from == '商户通'">
                                        <p v-if="scope.row.specifications && scope.row.count">{{Number(scope.row.count).toFixed(0) + scope.row.specifications + '/' + scope.row.goods_unit}}</p>
                                        <p v-else>{{scope.row.goods_unit}}</p>
                                    </div>
                                    <div v-else>
                                        <p v-if="scope.row.plu_name == '金龙鱼大豆调和油' || scope.row.plu_name == '鲁花花生油' ">元/桶（5L）</p>
                                        <p v-else>公斤</p>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination v-if="num2" background @current-change="handleCurrentChange2" :current-page.sync="page2" :page-size="cols2"
                        layout="total, prev, pager, next, jumper" :total="num2"></el-pagination>
                    <div class="btn">
                        <el-button @click="closeFun4" style="margin-left: 500px;">关闭</el-button>
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
import {QueryNodeInfoIndex,QueryIndex,QueryGoodsForBiz,Insert,QueryRegion,AutoIdentity,InsertList,QueryGoodsForNode,
    QueryRegionForGoodsPrice,QueryGoodsIndex} from '../../js/retail/retail.js'
import {allBizs} from "../../js/management/management.js";
import { GetMarkets} from '../../js/district/district.js';
import {QueryNodeInfoIndexNew, GetAllNodeJc} from '../../js/supervise/supervise.js'
import {GetNodePriceData, QueryNodeGoodsDetails} from '../../js/survey/survey.js'
export default {
    name:"surveyList",
    data() {
        return {
            startTime: '',
            endTime: '',
            isShow: true,
            form: {
                node_name: '',
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '1',
            },
            startTime: '',
            endTime: '',
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            page2: 1,
            cols2: 15,
            num2: 0,
            tableData: [],
            userId: '',
            enterpriseArr: [],
            tbqyArr: [],
            statesArr: [],
            isfile: false,
            isEdits: false,
            merchant: '',
            merchantArr: [],
            tbqy: '',
            in_date: '',
            name: '',
            tableData2: [],
            goodNum: '',
            isZnlr: false,
            message: '',
            activeName: 'first',
            isView: false,
            tbrqView: '',
            tbqyView: '',
            tbqyUserId: '',
            tbqyName: '',
            region: '',
            regionArr: [],
            newGoodArr: [],
            newGoodObj: {},
            biz_id: '',
            biz_name: '',
            viewNodeId: '',
            istableAdd: false, // 点击列表操作添加报表
            allGood: [],
            selectGood: [], 
            company: 0,
            isSearch: false, // 是否搜索报价商品
            unitName: '公斤',
            node_id: '',
            viewGood: [],
            isGoodMsg: false,
            goodName: '',
            tableData3: [],
            loading: false, // 新增商品
            loading2: false, // 查看商品
            loading3: false, // 查看商品详细信息
            titleArr: [],
            count: 1,
            from: '',
        }
    },
    mounted() {
        this.getTime()
        this.node_id = localStorage.getItem('loginId')
        // this.userId = localStorage.getItem('userId')
        var currentTime = new Date()
        this.in_date = formatDate(currentTime)
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getDataFun()
    },
    methods: {
        handleClick() {
            this.regionArr.forEach(val => {
                if(this.activeName == val.BOOTH_NAME ){
                    this.tabRegion = val.SHOP_BOOTH_ID
                }
            })
            if(this.activeName == 'first'){
                this.tabRegion = ''
            }
            setTimeout(() => {
                if(this.viewNodeId){
                    this.getViewFun()
                }
            }, 100)
        },
        // 关闭查看
        closeFun4(){
            this.isView = false
            this.tbqyView = ''
            this.tbrqView = ''
            this.page2 = 1
            this.num2 = ''
            this.tableData2 = []
            this.regionArr = []
            this.tabRegion = ''
            this.name = ''
            this.count = 1
            this.viewNodeId = ''
            this.activeName = 'first'
            this.company = 0
            this.isSearch = false
            this.selectGood = []
            this.unitName = '公斤'
            this.from = ''
            this.num2 = 0
        },
        viewFun(ele){
            this.isView = true
            this.tbrqView = ele.in_date
            this.tbqyView = ele.node_name
            this.viewNodeId = ele.node_id
            this.page2 = 1
            this.loading2 = true
            this.from = ele.from
            this.getViewFun(ele.node_id)
        },
        // 查看获取商品
        getViewFun(node_id){
            this.loading2 = true
            let that = this;
            if(this.from == '商户通'){
                let params = {
                    node_id: this.viewNodeId,
                    in_date: this.tbrqView,
                    cols: 10000,
                    page: 1,
                    region: this.tabRegion,
                    goods_name: this.name,
                }
                QueryIndex(params)
                    .then(res => {
                        this.loading2 = false
                        this.tableData2 = res.data.list
                        if(this.count == 1){
                            let arr = res.data.map,
                                obj = {};
                            for(let key in arr){
                                obj = {
                                    SHOP_BOOTH_ID: key,
                                    BOOTH_NAME: arr[key]
                                }
                                this.regionArr.push(obj)
                            }
                            this.count = 2
                        }
                    })
                    .catch((res) => {
                        this.loading2 = false
                        console.log(res)
                    })
            }else if(this.from == '中心'){
                let params = {
                    node_id: this.viewNodeId,
                    cols: this.cols2,
                    page: this.page2,
                    start_date: this.tbrqView,
                    end_date: this.tbrqView,
                }
                QueryNodeGoodsDetails(params)
                    .then(res => {
                        this.loading2 = false
                        this.tableData2 = res.data.dataList
                        this.num2 = res.data.condition.total
                    })
                    .catch((res) => {
                        this.loading2 = false
                        console.log(res)
                    })
            }
            
        },
        deleteFun(){

        },
        isShowFun(){
            this.isfile = true
        },
        getDataFun(){
            this.loading = true
            let params = {
                state: this.form.states,
                start_date: this.startTime,
                end_date: this.endTime,
                cols: this.cols,
                page: this.page,
                node_type: this.form.enterprise,
                node_name: this.form.node_name,
            }
            GetNodePriceData(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.list
                    this.num = res.data.total
                })
                .catch((res) => {
                    this.loading = false
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
        handleCurrentChange2(val) {
            this.page2 = val
            this.getViewFun()
        },
        clearFun(){
            this.form = {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
            }
            this.page = 1
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.getDataFun()
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
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime());
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
        width: 100%;
        height: 100%;
        .num{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .num-p{
                    color: red;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
        .name{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .name-p{
                    color: #ccc;
                    font-size: 12px;
                    text-align: right;
                }
            }
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
            padding: 10px;
            position: relative;
            background: #fff;
            .file-btns{
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
            }
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
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        .password{
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
                margin-top: -315px;
                margin-left: -300px;
                width: 600px;
                height: 630px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        font-size: 14px;
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
                }
                .msg-box{
                    clear: both;
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 70px;
                        }
                        .el-select{
                            width: 150px;
                        }
                    }
                }
                .btn{
                    margin-top: 10px;
                    margin-left: 30px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .table{
                    padding: 0 10px;
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
        .goodMsg{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -200px;
                margin-left: -230px;
                width: 460px;
                height: 400px;
                font-size: 15px;
                .tit{
                    width: 88%;
                    text-align: center;
                }
            }
        }
        
    }
</style>
<style lang="less">
    .surveyList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
        .el-tabs__header{
            margin: 0 10px 10px !important;
        }
        .el-table td{
            padding: 5px 0;
        }
    }
</style>