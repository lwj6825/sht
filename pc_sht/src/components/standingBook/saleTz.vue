<template>
    <div class="content saleTz" ref="content">
        <div class="areaBox" ref="areaBox" v-if="isShow">
            <AreaSelect @selectId='selectId'></AreaSelect>
        </div>
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="商户信息" v-if="isShow2">
                        <el-select clearable filterable v-model="form.user" @change="selectGet" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.userId" :label="item.bootList[0].booth_name"
                            :value="item.bootList[0].shop_booth_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售日期">
                        <!--<el-date-picker v-model="form.value1" type="datetimerange" align="right" value-format="yyyy-MM-dd HH:mm:ss" 
                            start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="timeChange">
                        </el-date-picker>-->
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.value1" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <!--<el-form-item label="欠款">
                        <el-select v-model="form.debt" placeholder="请选择欠款状态">
                            <el-option label="全部" value="a1"></el-option>
                            <el-option label="有欠款" value="a2"></el-option>
                            <el-option label="无欠款" value="a3"></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth" style="margin-left: 10px;">搜索</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="商户信息" v-if="isShow2">
                        <el-select clearable filterable v-model="form.user" @change="selectGet" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.userId" :label="item.bootList[0].booth_name"
                            :value="item.bootList[0].shop_booth_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售日期" style="width: 480px;" >
                        <!--<el-date-picker v-model="form.value1" type="datetimerange" align="right" value-format="yyyy-MM-dd HH:mm:ss" 
                            start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="timeChange">
                        </el-date-picker>-->
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.value1" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <el-button class="file-btn no-btn" @click="exportFun">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--<p class="unfold" @click="unfoldFun">{{unfold}}筛选条件</p>-->
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部销售台账</p>
                <div>
                    <el-button type="primary" class="addBtn blue-bth">新增销售台账</el-button>
                    <span class="submit">
                        导入台账
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form>
                    </span>
                </div>
            </div>
            <div class="tables">
                <el-table :data="tableData" :header-cell-style="rowClass" @expand-change="detailTzFun"
                :row-key='getRowKeys'>
                    <el-table-column prop="stall_no" label="摊位号" width="80"> </el-table-column>
                    <el-table-column prop="seller_booth_name" label="商户名称"> </el-table-column>
                    <el-table-column prop="buyer_booth_name" label="客户"> </el-table-column>
                    <el-table-column prop="in_date" label="销售日期"  width="180"> </el-table-column>
                    <el-table-column label="商品信息">
                        <template slot-scope="scope">
                            <p>{{scope.row.details}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actual_money" label="金额(元)" width="80"> </el-table-column>
                    <el-table-column prop="address" label="数据来源">
                        <template slot-scope="scope">
                            <p v-if="scope.row.tz_origin == '1'">电子秤（称重）</p>
                            <p v-if="scope.row.tz_origin == '2'">手动录入</p>
                            <p v-if="scope.row.tz_origin == '3'">电子秤 （收银）</p>
                            <p v-if="scope.row.tz_origin == '4'">解析数据</p>
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看</el-button>
                        </template> v-if="props.row.tz_id == goodMsg[0].tz_id"
                    </el-table-column>-->
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <div class="list">
                                <ul class="item">
                                    <li>商品</li>
                                    <li>单价</li>
                                    <li>数量/重量</li>
                                </ul>
                                <ul class="item" v-for="(item,index) in scope.row.tz_detail_list" :key="index">
                                    <li>{{item.goods_name}}</li>
                                    <li>{{item.price}}元/公斤</li>
                                    <li>{{item.number}}公斤</li>
                                </ul>
                                <!--<ul class="item" v-for="(item,index) in scope.row.tz_detail_list" :key="index">
                                    <li>{{item.goods_name}}</li>
                                    <li>{{item.price}}元/公斤</li>
                                    <li>{{item.number}}公斤</li>
                                </ul>-->
                                <p class="price">总金额：{{scope.row.actual_money}}元</p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
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
// 时间戳转日期格式
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
import AreaSelect from '../common/area';
import Bus from '../common/bus.js';
import {QueryArea} from '../../js/area/area.js';
import {GetAllBiz,GetSaleTz,Parse,DownloadXsTzDetail,QueryXsTzDetailByTzId} from '../../js/standingBook/standingBook.js'
import axios from 'axios';
import {baseUrl} from '../../js/address/url.js'
export default {
    name: "saleTz",    
    data() {
        return {
            page: 1,
            cols: 15,
            num: 0,
            userId: 2,
            total: '',
            areaId: '', // 大区的shop_booth_id
            bigAreaId: '', // 大区userId
            contacts: '',
            nodeName: '',
            tableData: [],
            addSaleTz: '新增销售台账',
            file: '',
            scShopId: '', // 市场的shop_booth_id
            isShow: true,
            // fit: false,
            isRegion: '',
            form: {
                user: '',
                source: '',
                value1: '',
                value2: '',
                upload: '',
            },
            unfold: '展开',
            show: false,
            inline: true,
            isShow2: true,
            options: [
                { bootList: [ {shop_booth_id:0, booth_name: ''} ] }
            ],
            buyerName: '',
            startTime: '',
            endTime: '',
            goodMsg: [],
            totalPrice: 0,
            getRowKeys (row) {
                return row.id
            },
        }
    },
    mounted() {
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.userId = localStorage.getItem('userId')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.value1 = arr
        if(this.isRegion == 'false'){
            this.isShow = false
            this.getSaleTzFun()
            this.isShow2 = false
            this.show = true
            this.unfold = '收起'
        }else{
            this.defaultTzFun()
        }
        
    },
    methods: {
        exportFun(){
            window.location.href = baseUrl + 'tz/downloadXsTzDetail?region=' + this.areaId + '&seller_booth_id=' + this.form.user 
                + '&seller_booth_name=' + this.buyerName + '&start_time=' + this.startTime + '&end_time=' + this.endTime + '&page=' 
                + this.page + '&cols=' + this.cols
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
            // var currentTime = new Date()
            // this.startTime = formatDate(currentTime)
            // // console.log(this.startTime)
            // this.endTime = this.startTime.substr(0, 10)
        },
        selectGet(val){
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.bootList[0].shop_booth_id){
                        this.buyerName = ele.bootList[0].booth_name
                    }
                })
            }else{
                this.buyerName = ''
            }        
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
                user: '',
                source: '',
                value1: '',
                value2: '',
                upload: '',
            }
            this.getTime()
            this.buyerName = ''
            this.page = 1
            this.getSaleTzFun()
        },
        timeChange(){
            if(this.form.value1){
                this.startTime = this.form.value1[0]
                this.endTime = this.form.value1[1]
            }else{
                // var currentTime = new Date()
                // this.startTime = formatDate(currentTime)
                // this.endTime = ''
                this.getTime()
            }
        },
        searchFun(){
            this.page = 1
            this.getSaleTzFun()
        },
        // 获取商户
        getMerchantsFun(){
            let obj = {
                page: '1',
                cols: '',
                total: "",
                userId: this.userId,
                name: "",
                boothName: "",
                stall_no: "",
                region: this.areaId
            }
            GetAllBiz(obj)
                .then(res => {
                    this.options = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        fileFun(event){
            // if 文件类型 txt csv xls xlsx--- 大小不能超过 10M
            let param = this.$refs.file.files[0];
            console.log(this.$refs.file.files)
            if(param.type == 'text/plain' || param.type == 'text/csv' || param.type == 'application/vnd.ms-excel' || param.type == 'text/csv' || param.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                let fileSize = param.size / 1024
                if(fileSize > 10240){
                    val = ""
                    this.$message.error('文件大小不能超过10M');
                    return
                }else{
                    this.file = event.target.files[0];
                    let formData = new FormData();
                    formData.append('myfile', this.file);  
                    formData.append('shop_booth_id',this.scShopId); 
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    };
                    const ajaxPost = function (url, params,config) {
                        return new Promise((resolve, reject) => {
                            axios
                                .post(url, params,{config})
                                .then((res) => {

                                    resolve(res.data)
                                })
                                .catch(() => {
                                    reject('error')
                                })
                        })
                    }  
                    // http://47.92.96.187:13781
                    // http://192.168.1.64:8080/analysis-file/ZhdTzParse/demo.do
                    ajaxPost('http://47.92.96.187:13781/zhd-file/ZhdTzParse/shtSaleFileParse.do',formData,config)
                        .then(res => {
                            // console.log(res)
                            if(res[0].result == true){
                                this.$message.success(res[0].message);
                            }else{
                                this.$message.error(res[0].message);
                            }
                        })
                        .catch(res => {
                            console.log(res)
                            this.$message.error("出错了");
                        })
                }
            }else{
                this.$message.error('请选择正确的文件格式，文件格式为txt、csv、xls、xlsx');
            }

        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getSaleTzFun()
        },
        defaultTzFun(){
            let data = {
                page: '1',
                cols: '100',
                total: '',
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName
            }
            QueryArea(data)
                .then(res =>{
                    this.bigAreaId = res.data.dataList[0].userId;
                    this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                    this.getSaleTzFun()
                    this.getMerchantsFun()
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        getSaleTzFun(){
            let loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if(this.isRegion == 'false'){
                let obj = {
                    region:  this.areaId,
                    seller_booth_id: this.scShopId,
                    seller_booth_name: this.buyerName,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    page: this.page,
                    cols: this.cols
                }
                GetSaleTz(obj)
                    .then(res => {
                        this.loading = false
                        this.tableData = res.data.tzList
                        this.num = res.data.tzBean.total
                        loading.close();
                    })
                    .catch(res => {
                        console.log(res)
                        loading.close();
                    })
            }else{
                let obj = {
                    region: this.areaId,
                    seller_booth_id: this.form.user,
                    seller_booth_name: this.buyerName,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    page: this.page,
                    cols: this.cols
                }
                GetSaleTz(obj)
                    .then(res => {
                        this.tableData = res.data.tzList
                        this.num = res.data.tzBean.total
                        loading.close();
                    })
                    .catch(res => {
                        console.log(res)
                        loading.close();
                    })
            }
        },
        search(ele){
            console.log(ele)
        },
        clear(ele){
            console.log(ele)
        },
        selectId(id){//选择区域
            this.getTime()
            // console.log(id)
            let data = {
                page: '1',
                cols: '100',
                total: '',
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName
            }
            QueryArea(data)
                .then(res =>{
                    // console.log(res)
                    res.data.dataList.forEach(ele => {
                        // console.log(ele)
                        if(ele.userId == id){
                            this.bigAreaId = id;
                            this.areaId = ele.bootList[0].shop_booth_id;
                            // var currentTime = new Date()
                            // this.startTime = formatDate(currentTime)
                            // this.form.value1 = [new Date(new Date().setHours(0, 0, 0, 0)),new Date(new Date().setHours(23, 59, 59, 59))]
                            // this.endTime = ''
                            var start = new Date();
                            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            this.startTime = timestampToTime(startTime)
                            var currentTime = new Date()
                            this.endTime = formatDate(currentTime)
                            let arr = []
                            arr.push(this.startTime)
                            arr.push(this.endTime)
                            this.form.value1 = arr
                            this.page = 1
                            this.form.user = ''
                            this.buyerName = ''
                            this.getSaleTzFun()
                            this.getMerchantsFun()
                        }
                    });
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        addSaleTzFun(){
            // this.$router.push({name:'AddSaleTz',params: {areaId: this.areaId,bigAreaId: this.bigAreaId}})
        },
        detailTzFun(ele,expandedRows){
            let data = {
                id: ele.id,
                tz_id: ele.tz_id
            }
            QueryXsTzDetailByTzId(data)
                .then(res =>{
                    this.tableData.forEach(val => {
                        if(ele.id == val.id){
                            val.tz_detail_list = res.data.tzDetailList
                            val.totalPrice = res.data.tzList[0].ACTUAL_MONEY
                        }
                    })
                    // this.goodMsg = res.data.tzDetailList
                    // this.totalPrice = res.data.tzList[0].ACTUAL_MONEY
                })
                .catch(res =>{
                    console.log(res)
                })
            if(expandedRows.length>1){
                expandedRows.shift();
            }   
        }
    },
    components:{
        AreaSelect,
    }
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
            .unfold{
                text-align: center;
                font-size: 14px;
                color: #409EFF;
                cursor: pointer;
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
        .areaBox{
            padding-top: 10px;
            padding-left: 10px;
            background: #fff;
        }
        .searchs{
            margin: 10px 0;
            padding: 10px 0;
            background: #fff;
        }
        .table{
            position: relative;
            padding: 10px;
            background: #fff;
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    padding-left: 4px;
                    height: 20px;
                    line-height: 20px;
                    box-sizing: border-box;
                    font-size: 14px;
                    border-left: 2px solid #409EFF;
                }
                p{
                    flex: 1;
                    line-height: 30px;
                    font-size: 14px;
                }
                div{
                    display: flex;
                    justify-content: flex-end;
                    width: 300px;
                    .addBtn{
                        height: 30px;
                        margin-right: 10px;
                    }
                    .submit{
                        position: relative;
                        display: inline-block;
                        width: 90px;
                        height: 30px;
                        line-height: 30px;
                        color: #409EFF;
                        background: #fff;
                        text-align: center;
                        overflow: hidden;
                        border-radius: 5px;
                        font-size: 14px;
                        box-sizing: border-box;
                        border: 1px solid #409EFF;
                        .file{
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            width: 90px;
                            height: 36px;
                            opacity: 0;
                            background: rgba(0,0,0,0);
                        }
                    }
                   
                }
            }
            .list{
                width: 500px;
                border: 1px solid #ccc;
                .item{
                    margin: 0 10px;
                    display: flex;
                    border-bottom: 1px solid #ccc;
                    li{
                        flex: 1;
                        line-height: 30px;
                        text-align: center;
                    }
                }
                .price{
                    margin-right: 10px;
                    line-height: 30px;
                    text-align: right;
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .saleTz{
        .el-range-editor.el-input__inner{
            padding: 0 10px;
        }
        .el-date-editor .el-range__icon,.el-date-editor .el-range-separator{
            line-height: 30px;
        }
        .el-table__body-wrapper{
            font-size: 13px;
        }
        .el-table td{
            padding: 5px 0;
        }
    }
</style>
