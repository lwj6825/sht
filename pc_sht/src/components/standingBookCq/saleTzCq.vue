<template>
    <div class="content saleTzCq" ref="content">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--收起-->
                <el-form ref="forms" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="销售日期">
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.value1" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="配送单位">
                        <el-select size="mini" v-model="form.gys_id" clearable filterable placeholder="请选择供应商">
                            <el-option v-for="(item, index) in gysArr" :key="index" :label="item.biz_name" :value="item.biz_name"></el-option>
                        </el-select>
                    </el-form-item><!--
                    <el-form-item label="数据来源" v-if="isShow2">
                        <el-select clearable filterable placeholder="请选择" @change="selectGet" v-model="form.source" >
                            <el-option label="电子秤（称重）" value="1"></el-option>
                            <el-option label="手动录入" value="2"></el-option>
                            <el-option label="电子秤（收银）" value="3"></el-option>
                            <el-option label="解析数据" value="4"></el-option> 
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="商品名称">
                        <el-select v-model="form.GoodList" filterable clearable size="mini">
                            <el-option  v-for="(val,index) in goodsArr" :key="index" :label="val.GOODS_NAME" :value="val.GOODS_CODE" >
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部销售台账</p>
                <div>
                    <el-button type="primary" @click="addSaleTzFun" class="blue-bth">新增销售台账</el-button>
                    <el-button type="primary" style="margin-right: 10px;" class="import white-bth" @click="isDownloadFun">下载模板</el-button>
                    <span class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form>
                    </span>
                </div>
            </div>
            <div class="tables">
                <el-table :data="tableData" :header-cell-style="rowClass" v-loading="loading">
                    <el-table-column prop="in_date" label="配送日期"  width="180"> </el-table-column>
                    <el-table-column label="商品信息">
                        <template slot-scope="scope">
                            <p>{{scope.row.goodMsg}}等共{{scope.row.details_count}}件商品</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="details_count" label="数量" width="80"> </el-table-column>
                    <el-table-column prop="buyer_booth_name" label="配送单位"></el-table-column>
                    <el-table-column prop="address" label="单据上传" > 
                        <template slot-scope="scope">
                            <p v-if="scope.row.is_oc_upload == 1">已上传单据</p>
                            <p v-else-if="scope.row.is_oc_upload == 0">未上传单据</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="againFun(scope.row)">再次录入</el-button><!--
                            <el-button type="text" size="small" @click="deleteTzFun(scope.row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="address" label="数据来源">
                        <template slot-scope="scope">
                            <p v-if="scope.row.tz_origin == '1'">电子秤（称重）</p>
                            <p v-if="scope.row.tz_origin == '2'">手动录入</p>
                            <p v-if="scope.row.tz_origin == '3'">电子秤 （收银）</p>
                            <p v-if="scope.row.tz_origin == '4'">解析数据</p>
                        </template>
                    </el-table-column>-->
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, sizes, prev, pager, next, jumper" :total="num" @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 40]"></el-pagination>
        </div>
        <div class="passwrd file" v-if="isFile">
            <div class="text">
                <div class="box-title">
                    <p class="tit">下载模板</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="msg-box">
                    <div class="data">
                        <div class="tit">日期：</div>
                        <div class="msg">
                            <el-date-picker :picker-options="pickerOptions" style="width: 200px;" v-model="in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="file-btns">
                    <!--<div>
                        <span class="submit">
                            确认导入
                            <form id="upload" enctype="multipart/form-data" method="post">
                                <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                            </form>
                        </span>
                    </div>-->
                    <div>
                        <p class="download" @click="downloadFun">下载</p>
                    </div>
                </div>
            </div>
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
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // var h = date.getHours() + ':';
    // var m = date.getMinutes() + ':';
    // var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
import AreaSelect from '../common/area';
import Bus from '../common/bus.js';
import {QueryArea} from '../../js/area/area.js';
import {GetAllBiz,GetSaleTz,Parse,DownloadXsTzDetail,QueryXsTzDetailByTzId,jcpurchase, QueryPcTzSaleInfoList} from '../../js/standingBookCq/standingBookCq.js'
import axios from 'axios';
import {exportTzSaleInfoTemplate,importTzSaleInfo} from '../../js/address/url.js'
import {allGys} from "../../js/management/management.js";
import {sales,getDefaultProductTypes} from "../../js/goods/goods.js";
export default {
    name: "saleTzCq",    
    data() {
        return {
            // options:['电子秤','11','11','11'],
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
            local_check_good_options:[],
            addSaleTz: '新增销售台账',
            file: '',
            scShopId: '', // 市场的shop_booth_id
            isShow: true,
            // fit: false,
            isRegion: '',
            form: {
                user: '',
                source: '',//选中数据来源
                value1: '',
                value2: '',
                upload: '',
                GoodList:'',//选中商品信息
                gys_id: '',
            },
            gysArr: [],
            goodsArr: [],
            unfold: '收起',
            show: true,
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
            start_time:'',
            end_time:'',
            loading:true,
            node_id: '',
            startTime2: '',
            file: '',
            isFile: false,
            in_date: '',
            pickerOptions: { 
                disabledDate(time) {
                    return time.getTime() >  new Date().getTime()
                }
            }
        }
    },
    mounted() {
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.userId = localStorage.getItem('userId')
        this.local_node_id_id = localStorage.getItem('nodeidlocal');
        this.node_id = localStorage.getItem('loginId');
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.value1 = arr
        this.getSaleTzFun()
        this.getAllGys()
        this.getGoodFun()
    },
    methods: {
        getGoodFun(){
            let boothData = {
                page: 1,
                cols: 1000,
                goodsName: '',
                goodsCode: '',
                suppliersName: '',
                region: '',
                userId: this.userId,
                total: '',
                j_name: ''
            }
            sales(boothData)
                .then(res => {
                    this.goodsArr = res.data.salesList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 获取供应商
        getAllGys(){
            let boothData = {
                page: 1,
                cols: 1000,
                userId: this.userId,
                type: '2',
                concact_name: '',
                biz_name: '',
                region: this.areaId,
                shop_booth_id: this.scShopId,
            }
            allGys(boothData)
                .then(res => {
                    this.gysArr = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        detailTzFun(ele){
            this.$router.push({name:'ViewSaleTzCq', params: ele})
        },
        deleteTzFun(){

        },
        addSaleTzFun(){
            this.$router.push({name:'AddSaleTzCq'})
        },
        againFun(ele){
            this.$router.push({name:'AddSaleTzCq',params: {param: ele,types: 'again'}})
        },
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('myfile', this.file);  
            formData.append('user_id', this.userId);  
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
            let url = importTzSaleInfo
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.page = 1
                        this.getSaleTzFun()
                    }else{
                        this.$message.error(res.message ? res.message : '导入失败');
                    }
                    this.file = ''
                    document.getElementById('upload').reset();
                })
                .catch(res => {
                    console.log(res)
                })
        },
        isDownloadFun(){
            this.isFile = true 
            var currentTime = new Date()
            this.in_date = formatDate(currentTime)
        },
        closeFun(){
            this.isFile = false
            this.in_date = ''
        },
        downloadFun(){
            let url = exportTzSaleInfoTemplate;
            window.location.href = url + '?in_date=' + this.in_date + '&user_id=' + this.userId 
            this.closeFun()
        },
        handleSizeChange(val){
            this.cols = val
            this.getSaleTzFun()
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
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
        clearFun(){
            this.form = {
                user: '',
                source: '',
                value1: '',
                value2: '',
                upload: '',
                GoodList:'',//选中商品信息
            }
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.value1 = arr
            this.buyerName = ''
            this.page = 1
            this.getSaleTzFun()
        },
        timeChange(){
            if(this.form.value1){
                this.startTime = this.form.value1[0]
                this.endTime = this.form.value1[1]
            }else{
                this.startTime = ''
                this.endTime = ''
                // var currentTime = new Date()
                // this.startTime = formatDate(currentTime)
                // this.endTime = ''
                // this.getTime()
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
        getSaleTzFun(){
            this.loading = true
            let obj = {
                seller_booth_id: this.scShopId,
                start_time: this.startTime,
                end_time: this.endTime,
                page: this.page,
                cols: this.cols,
                goods_code: this.form.GoodList,
                buyer_booth_name: this.form.gys_id
            }
            QueryPcTzSaleInfoList(obj)
                .then(res => {
                    this.loading = false
                    res.data.tzList.forEach(val => {
                        let arr = val.details.split(',');
                        val.goodMsg = arr[0];
                    })
                    this.tableData = res.data.tzList
                    this.num = res.data.tzBean.total
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
                })
        },
    },
    components:{
        AreaSelect,
    }
}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
        .back:hover{
            color:#409EFF;  //
            text-decoration: underline;
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
            .unfold{
                text-align: center;
                font-size: 14px;
                color: #409EFF;
                cursor: pointer;
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
                margin-left: -310px;
                width: 600px;
                height: 300px;
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
                    margin: 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 auto;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 60px;
                            line-height: 30px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select, .el-input{
                            width: 200px;
                        }
                    }
                }
                .tips{
                    margin-left: 20px;
                    margin-bottom: 15px;
                    margin-top: 15px;
                    font-size: 12px;
                    color: #ccc;
                }
                .search{
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 310px;
                    }
                    .el-input, .el-select{
                        margin-left: 30px;
                        width: 200px;
                    }
                    .ss-btn{
                        margin-left: 20px;
                        background: #fff;
                        color: #409EFF;
                    }
                    .znlr-btn{
                        margin-right: 30px;
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
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 50px auto;
                    position: relative;
                    left: 30%;
                    display: inline-block;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
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
                        width: 200px;
                        height: 50px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .download{
                    margin: 50px auto;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
                    color: #409EFF;
                    background: #fff;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #409EFF;
                }
                .table{
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .saleTzCq{
        .el-range-editor.el-input__inner{
            padding: 0 10px;
        }
        .el-date-editor .el-range-separator{
            line-height: 30px;
        }
       .el-date-editor .el-range__icon{
           line-height: 20px;
       }
        .el-table__body-wrapper{
            font-size: 13px;
        }
        .el-table td{
            padding: 5px 0;
        }
        .content .el-date-editor .el-range-separator{
            line-height: 28px;
        }
        .passwrd{
            .el-input__icon{
                line-height: 30px;
            }
        }
    }
</style>
