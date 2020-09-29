<template>
    <div class="content retailList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="日期">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form.enterprise" filterable clearable placeholder="请选择">
                            <el-option label="零售市场" value="零售市场"></el-option>
                            <el-option label="批发市场" value="批发市场"></el-option>
                            <el-option label="超市" value="超市"></el-option><!--
                            <el-option label="菜车" value="菜车"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点名称">
                        <el-select v-model="form.tbqy" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in tbqyArr" :key="index" :label="item.node_name"
                            :value="item.node_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="进场录入">
                        <el-select v-model="form.entry" filterable clearable placeholder="请选择">
                            <el-option label="已录入" value="1"></el-option>
                            <el-option label="未录入" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="零售价填报">
                        <el-select v-model="form.states" filterable clearable placeholder="请选择">
                            <el-option label="已上报" value="1"></el-option>
                            <el-option label="未上报" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">数据列表</p>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="in_date" label="日期" width="200"></el-table-column>
                    <el-table-column prop="node_type" label="节点类型" width="80"></el-table-column>
                    <el-table-column prop="node_id" label="节点编码" width="100"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"></el-table-column>
                    <el-table-column label="进场录入" width="240">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="purchaseFun(scope.row)">{{scope.row.num}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="零售价填报" width="240">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="retailFun(scope.row)">{{scope.row.state}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <!--查看-->
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
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate;
    return currentdate
}
import {QueryNodeInfoIndex,QueryIndex,QueryGoodsForBiz,Insert,QueryRegion,AutoIdentity,InsertList,QueryGoodsForNode,
    QueryRegionForGoodsPrice,QueryGoodsIndex, DownloadPriceLife, GetAllNodePage} from '../../js/retail/retail.js'
import {allBizs} from "../../js/management/management.js";
import {GetAllNode} from '../../js/user/user.js'
import { GetMarkets} from '../../js/district/district.js';
import {importPriceLife} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"retailList",
    data() {
        return {
            isShow: true,
            form: {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
                entry: '',
            },
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            userId: '',
            tbqyArr: [],
            roleId: '',
            loading: true,
        }
    },
    mounted() {
        if(localStorage.getItem('retail')){        
            localStorage.removeItem('retail');
        }
        this.getTime()
        this.roleId = localStorage.getItem('roleId')
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getDataFun()
        this.getNodeFun()
    },
    methods: {
        // 进场数据
        purchaseFun(ele){
            let obj ={
                cols: 100,
                node_name: "",
                node_id: ele.node_id,
                node_type: "",
                page: 1,
                role_id: this.roleId,
            }
            GetAllNodePage(obj)
                .then(res => {
                    localStorage.setItem('retail',JSON.stringify(res.data.dataList[0]));
                    this.$router.push({name: 'PurchaseList'})
                })
                .catch(res => {
                    console.log(res)
                })
        }, 
        // 未上报
        retailFun(ele){
            localStorage.setItem('retail',JSON.stringify(ele));
            this.$router.push({name: 'DataFilling',params: ele,})
        },
        // 获取填报企业
        getNodeFun(){
            GetAllNode()
                .then(res => {
                    this.tbqyArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getDataFun(){
            this.loading = true
            let params = {
                node_id: this.form.tbqy,
                state: this.form.states,
                start_date: this.startTime,
                end_date: this.endTime,
                cols: this.cols,
                page: this.page,
                node_type: this.form.enterprise,
                num : this.form.entry,
            }
            QueryNodeInfoIndex(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.list
                    this.num = res.data.bean.total
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
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
        clearFun(){
            this.form = {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
                entry: '',
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
                this.getTime()
            }
        },
        getTime(){
            var start = new Date();
            var startTime = formatDate(start)
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
                    margin: 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 80px;
                            line-height: 30px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select{
                            width: 150px;
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
                    .el-input{
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
                    left: 34%;
                    display: inline-block;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
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
                    color: #333;
                    background: #fff;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
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
        .znlr{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -180px;
                margin-left: -230px;
                width: 460px;
                height: 330px;
                font-size: 15px;
                textarea{
                    margin: 10px 30px;
                    width: 400px;
                    height: 200px;
                    background: #f2f2f2;
                }
                .btn{
                    margin: 0;
                    text-align: center;
                }
                .rules{
                    margin: 5px 20px;
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
        .file{
            .text{
                margin-top: -150px;
                height: 300px;
            }
        }
    }
</style>
<style lang="less">
    .retailList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
        .el-tabs__header{
            margin: 0 10px 10px !important;
        }
    }
</style>
