<template>
    <div class="content reportList">
        <div class="areaBox" ref="areaBox" v-if="roleId != '80'">
            <div class="area-content">
                <div class="area-title">区县</div>
                <div class="area-wrapper">
                    <ul>
                        <li class="area-item" v-for="(item, index) in areaList" :key="index"  :class="{active:selectArea==item}" 
                            @click='selectId(item)'>
                            <el-button class="list-btn" type="primary" size="medium">{{item}}</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.types" @change="selectFun" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in typesArr" :key="index" :label="item" :value="item"
                             v-if="roleId != 80 && item != '牛肉类' && item != '禽肉类' && item != '羊肉类'"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品种">
                        <el-select v-model="form.varieties" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in varietiesArr" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button  @click="downloadFun"style="margin-left: 10px;">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="超市价格" name="first"></el-tab-pane>
                <el-tab-pane label="批发价格" name="second"></el-tab-pane>
                <el-tab-pane label="菜车价格" name="third"></el-tab-pane>
                <el-tab-pane label="商超价格" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="goods_type" label="类型"> </el-table-column>
                    <el-table-column prop="goods_name" label="品种"> </el-table-column>
                    <el-table-column prop="today_price" label="价格（元/公斤）"> </el-table-column>
                    <el-table-column prop="rate" label="环比（%）"></el-table-column>
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
import {GetTodayGoodsTableLimteTime, GetTodayGoodsTableLimteTimeNew, GetGoodsTypeAndName, GetGoodsTypeAndNameNew} from '../../js/report/report.js'
import {exportTodayGoodsTableLimteTime, exportTodayGoodsTableLimteTimeNew} from '../../js/address/url.js'
export default {
    name: 'reportList',
    data() {
        return {
            startTime: '',
            endTime: '',
            form: {
                dataTime: '',
                types: '',
                varieties: '',
            },
            varietiesArr: [],
            typesArr: [],
            startTime: '',
            endTime: '',
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            activeName: 'first',
            loading: false, 
            areaList: [],
            selectArea: '',
            currentTime: '',
            pickerOptions: { 
                disabledDate(time) {
                    return time.getTime() >  new Date().getTime()
                }
            },
            roleId: '',
        }
    },
    mounted() {
        this.roleId = localStorage.getItem('roleId')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getGetGoodsTypeAndName()
        this.getDataFun()
    },
    methods: {
        selectFun(){
            this.form.varieties = ''
            let str = 'goodsType=' + (this.form.types ? this.form.types : '')
            if(this.roleId == '80'){
                GetGoodsTypeAndNameNew(str)
                    .then(res => {
                        this.varietiesArr = res.data.mian_goods
                    })
                    .catch((res) => {
                        this.loading = false
                        console.log(res)
                    })
            }else{
                GetGoodsTypeAndName(str)
                    .then(res => {
                        this.varietiesArr = res.data.mian_goods
                    })
                    .catch((res) => {
                        this.loading = false
                        console.log(res)
                    })
            }
        },
        getGetGoodsTypeAndName(){
            if(this.roleId == '80'){
                GetGoodsTypeAndNameNew('')
                    .then(res => {
                        this.varietiesArr = res.data.mian_goods
                        this.typesArr = res.data.goods_type
                        this.areaList = res.data.qx
                        this.selectArea = this.areaList[0]
                    })
                    .catch((res) => {
                        this.loading = false
                        console.log(res)
                    })
            }else{
                GetGoodsTypeAndName('')
                    .then(res => {
                        this.varietiesArr = res.data.mian_goods
                        this.typesArr = res.data.goods_type
                        this.areaList = res.data.qx
                        this.selectArea = this.areaList[0]
                    })
                    .catch((res) => {
                        this.loading = false
                        console.log(res)
                    })
            }
        },
        // 选择区县
        selectId(ele){
            this.selectArea = ele
            this.getDataFun()
        },
        handleClick() {
            this.form.types = ''
            this.form.varieties = ''
             if(this.activeName == 'second'){
                this.form.types = '猪肉类'
            }
            this.getDataFun()
        },
        getDataFun(){
            let end = new Date('2020-12-31').getTime()
            let scope = end - 3600 * 1000 * 24 * 365
            let states = true;
            if(new Date(this.startTime) < scope || new Date(this.endTime) > end){
                this.$message.warning('时间参数无效，有效区间为2020-01-01 -- 2020-12-31');
                states = false
            }else{
                states = true;
                this.loading = true
            }
            let node_detail_type = '', node_type = '', district_name = '';
            if(this.activeName == 'first'){
                node_type = '超市'
                node_detail_type = ''
            }else if(this.activeName == 'second'){
                node_type = '批发市场'
                // this.form.types = '猪肉类'
                node_detail_type = ''
                if(this.form.types != '猪肉类'){
                    states = false;
                    this.tableData = []
                    this.loading = false
                }
            }else if(this.activeName == 'third'){
                node_type = '零售市场'
                node_detail_type = ''
            }else if(this.activeName == 'fourth'){
                node_type = '批发市场'
                node_detail_type = '超市配送'
            }
            if(this.selectArea == '北京市'){
                district_name = ''
            }else{
                district_name = this.selectArea
            }
            if(states){
                let str = 'date=' + this.startTime + '&endDate=' + this.endTime + '&node_type=' + node_type 
                    + '&node_detail_type=' + node_detail_type + '&goods_type=' + (this.form.types ? this.form.types : '') 
                    + '&goods_name=' + (this.form.varieties ? this.form.varieties : '') + '&district_name=' + district_name
                if(this.roleId == '80'){
                    GetTodayGoodsTableLimteTimeNew(str)
                        .then(res => {
                            this.loading = false
                            if(!res.data){
                                this.tableData = []
                            }else{
                                this.tableData = res.data.list
                            }
                        })
                        .catch((res) => {
                            this.loading = false
                            console.log(res)
                        })
                }else{
                    GetTodayGoodsTableLimteTime(str)
                        .then(res => {
                            this.loading = false
                            if(!res.data){
                                this.tableData = []
                            }else{
                                this.tableData = res.data.list
                            }
                        })
                        .catch((res) => {
                            this.loading = false
                            console.log(res)
                        })
                }
            }
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        downloadFun(){
            let node_detail_type = '', node_type = '', district_name = '';
            if(this.activeName == 'first'){
                node_type = '超市'
                node_detail_type = ''
            }else if(this.activeName == 'second'){
                node_type = '批发市场'
            }else if(this.activeName == 'third'){
                node_type = '零售市场'
                node_detail_type = ''
            }else if(this.activeName == 'fourth'){
                node_type = '批发市场'
                node_detail_type = '超市配送'
            }
            if(this.selectArea == '北京市'){
                district_name = ''
            }else{
                district_name = this.selectArea
            }
            if(this.roleId == '80'){
                window.location.href = exportTodayGoodsTableLimteTimeNew + '?date=' + this.startTime + '&endDate=' + this.endTime + '&node_type=' + node_type 
                    + '&node_detail_type=' + node_detail_type + '&goods_type=' + this.form.types + '&goods_name=' + this.form.varieties
                    + '&district_name=' + district_name
            }else{
                window.location.href = exportTodayGoodsTableLimteTime + '?date=' + this.startTime + '&endDate=' + this.endTime + '&node_type=' + node_type 
                    + '&node_detail_type=' + node_detail_type + '&goods_type=' + this.form.types + '&goods_name=' + this.form.varieties
                    + '&district_name=' + district_name
            }
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
            let ends = new Date('2020-12-31').getTime()
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24);
            if(new Date(startTime) > ends){
                startTime = ends
            }
            this.startTime = timestampToTime(startTime)
            var end = new Date()
            var endTime = end.setTime(end.getTime() - 3600 * 1000 * 24);
            if(new Date(endTime) > ends){
                endTime = ends
            }
            this.endTime = timestampToTime(endTime)
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
        .areaBox{
            padding-top:7px;
            padding: 10px;
            background: #fff;
            .area-content{
                overflow: hidden;
                .area-title{
                    float: left;
                    padding-left: 4px;
                    width: 50px;
                    height: 34px;
                    line-height: 34px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
                .area-item{
                    float: left;
                    margin-left: 10px;
                    margin-bottom: 10px;
                    &.active{
                        .list-btn{
                            background: #409EFF;
                            color: #fff;
                        }
                    }        
                }
                .list-btn{
                    color: #409EFF;
                    background: #fff;
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
        
    }
</style>
<style lang="less">
    .reportList{
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
            padding: 8px 0;
        }
    }
</style>