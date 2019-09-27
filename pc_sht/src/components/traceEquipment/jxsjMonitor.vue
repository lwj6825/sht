<template>
    <div class="content jxsjMonitor">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="资产信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="资产名称、ID、条码号、序列号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属期">
                        <el-select v-model="form.ssq" filterable clearable placeholder="请选择">
                            <el-option v-for="item in ssqArr" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属节点">
                        <el-select v-model="form.node" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_NAME"
                            :value="item.NODE_ID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属商户">
                        <el-input v-model="form.user" clearable placeholder="请输入商户"></el-input>
                    </el-form-item>
                    <el-form-item label="资产状态">
                        <el-select v-model="form.state" filterable clearable placeholder="请选择">
                            <el-option v-for="item in zcState" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun"style="margin-left: 10px;">查询</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="资产信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="资产名称、ID、条码号、序列号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属期">
                        <el-select v-model="form.ssq" filterable clearable placeholder="请选择">
                            <el-option v-for="item in ssqArr" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun" style="margin-left: 10px;">查询</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                        <!-- style="margin-left: 10px;width: 300px;"<el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <el-button @click="clearFun">重置</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>-->
                    </el-form-item>
                </el-form>
                <p class="unfold" v-if="isShow" @click="unfoldFun">{{unfold}}筛选条件</p>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">解析数据监控</p>
                <!--<div>
                    <el-button type="primary" @click="newFun">新增</el-button>
                    <el-button type="primary" id="btn-file" plain @click="isShowFun($event)" @onblur="closeFun">批量导入</el-button>
                    <el-button type="primary" plain @click="getDownloadAssetsBase">导出</el-button>
                </div>-->
            </div>
            <!--<div class="file-btns" v-if="isfile">
                <div>
                    <span class="submit">
                        批量新增
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                        </form>
                    </span>
                </div>
                <div>
                    <span class="submit">
                        批量修改
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="files" @change="fileFun($event,2)">
                        </form>
                    </span>
                </div>
            </div>-->
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="assets_id" label="资产ID"> </el-table-column>
                    <el-table-column prop="assets_name" label="资产名称"> </el-table-column>
                    <el-table-column prop="assets_type" label="资产类型"> </el-table-column>
                    <el-table-column prop="bar_code" label="条码号"> </el-table-column>
                    <el-table-column prop="serial_num" label="序列号"> </el-table-column>
                    <el-table-column prop="sub_period" label="所属期"> </el-table-column>
                    <el-table-column prop="a_conf_item" label="资产状态"> </el-table-column>
                    <el-table-column prop="node_name" label="所属节点" > </el-table-column>
                    <el-table-column prop="merchant_name" label="所属商户" >
                        <template slot-scope="scope">{{scope.row.merchant_name ? scope.row.merchant_name : '- - -'}}</template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
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
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {} from '../../js/traceEquipment/traceEquipment.js'
import {importAssets,importAssetsUpdate} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"jxsjMonitor",
    data() {
        return {
            buyerName: '',
            startTime: '',
            endTime: '',
            isShow: true,
            form: {
                msg: '',
                types: '',
                source: '',
                ssq: '',
                node: '',
                user: '',
                state: '',
                dataTime: ''
            },
            unfold: '收起',
            show: true,
            inline: true,
            options: [],
            zcState: [],
            ssqArr: [],
            nodeArr: [],
            shArr: [],
            page: 1,
            cols: 15,
            num: 0,
            userId: '',
            total: '',
            tableData: [],
            file: '',
            isFile: false,
            types: '',
            userId: '',
            isfile: false,
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
    },
    methods: {
        
        getDataFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                start_time: this.startTime,
                end_time: this.endTime,
                mon_log_base: this.form.msg,
                parse_type: this.form.rwhj,
                file_name: this.form.name,
                state: this.form.state,
                cols: this.cols,
                page: this.page,
            }
            QueryFtpMonLog(params)
                .then(res => {
                    this.tableData = res.data.mon_log_list
                    this.num = res.data.mon_log.total
                    loading.close();
                })
                .catch((res) => {
                    console.log(res)
                    loading.close();
                })
        },
        viewFun(ele){
            // this.$router.push({name: 'ViewAssets',params: {param: ele}})
        },
        newFun(){
            // this.$router.push({name: 'NewAssets'})
        },
        searchFun(){
            this.page = 1
            this.timeChange()
            this.getDataFun()
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
                msg: '',
                types: '',
                source: '',
                ssq: '',
                node: '',
                user: '',
                state: '',
                dataTime: ''
            }
            this.page = 1
            this.startTime = ''
            this.endTime = ''
            this.form.types = ''
            this.options = []
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
        width: 100%;
        height: 100%;
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
                position: absolute;
                top: 40px;
                right: 69px;
                z-index: 22;
                background: #fff;
                div{
                    margin-bottom: -5px;
                }
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
                .submit:hover{
                    background: #409EFF;
                    color: #fff;
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
                margin-top: -150px;
                margin-left: -200px;
                width: 400px;
                height: 230px;
                background: #fff;
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 30px auto;
                    position: relative;
                    left: 40%;
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
                .submit:hover{
                    background: #409EFF;
                    color: #fff;
                }
                .close{
                    margin: 0 10px;
                    padding-left: 340px;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                }
                .btn{
                    margin-left: 270px;
                }
            }
        }
        
    }
</style>
