<template>
    <div class="content glContrast">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="对照信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="ID、节点编码、节点名称"></el-input>
                    </el-form-item>
                    <el-form-item label="日志类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.LOG_TYPE"
                            :value="item.LOG_TYPE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form.node" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_DETAIL_TYPE"
                            :value="item.NODE_DETAIL_TYPE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据说明">
                        <el-input class="placeholder" v-model="form.sjsm" clearable placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="备用信息">
                        <el-input class="placeholder" v-model="form.byxx" clearable placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun"style="margin-left: 10px;">查询</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">对照管理</p>
                <div>
                    <el-button type="primary" @click="allSignFun">批量标记</el-button>
                    <el-button type="primary" @click="allDeleteFun">批量删除</el-button><!---->
                    <el-button type="primary" plain @click="downloadFun">导出</el-button>
                    <el-button type="primary" plain @click="deleteAllDataFun">删除全部</el-button>
                </div>
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
                <el-table :data="tableData" :header-cell-style="rowClass" @selection-change="changeFun">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="id" label="ID"> </el-table-column>
                    <el-table-column prop="node_id" label="节点编码"> </el-table-column>
                    <el-table-column prop="node_name" label="节点名称"> </el-table-column>
                    <el-table-column prop="log_type" label="日志类型"> </el-table-column>
                    <el-table-column prop="error_code" label="缺对照编码"> </el-table-column>
                    <el-table-column prop="error_name" label="取对照名称"> </el-table-column>
                    <el-table-column prop="error_data" label="备用信息" > </el-table-column>
                    <el-table-column prop="message" label="数据说明" > </el-table-column>
                    <el-table-column prop="record_date" label="最后时间" > </el-table-column>
                    <!--<el-table-column prop="SCBJ" label="删除标记" > </el-table-column>-->
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="signFun(scope.row)">标记不需要做对照的数据</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">设置阈值</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <div class="form">
                        <el-input type="text" clearable v-model="threshold"></el-input>
                        <div class="btn">
                            <el-button @click="closeFun">取消</el-button>
                            <el-button type="primary" @click="submitForm">确认</el-button>
                        </div>
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
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {QueryErrorData,QueryErrorLogType,DownloadErrorData,DeleteErrorLogData,QueryNodeDetailType,DeleteAllErrorData} from '../../js/traceEquipment/traceEquipment.js'
import {importAssets,importAssetsUpdate} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"glContrast",
    data() {
        return {
            form: {
                msg: '',
                types: '',
                node: '',
                sjsm: '',
                byxx: '',
            },
            unfold: '收起',
            show: true,
            inline: true,
            typesArr: [],
            page: 1,
            cols: 15,
            num: 0,
            userId: '',
            total: '',
            tableData: [],
            isEdits: false,
            threshold: '',
            ids: [],
            nodeArr: [],
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        if(this.$route.params.node_id){
            this.form.msg = this.$route.params.node_id
        }else if(this.$route.params.node_name){
            this.form.msg = this.$route.params.node_name
        }
        this.getNodeFun()
        this.getDataFun()
        this.getTypesFun()
    },
    methods: {
        // 当前条件结果全部删除，最少有一个条件   全部删除
        deleteAllDataFun(ele){
            if(this.form.types == '' && this.form.node == '' && this.form.sjsm == ''){
                this.$message.error('删除失败，至少添加一个条件');
                return
            }
            this.$confirm('你确定要全部删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {         
                let params = {
                    cols: this.cols,
                    page: this.page,
                    mon_log_base: this.form.msg,
                    log_type: this.form.types,
                    node_detail_type: this.form.node,
                    message: this.form.sjsm,
                    error_data: this.form.byxx,
                }
                DeleteAllErrorData(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        // 查询 所有节点
        getNodeFun(){
            QueryNodeDetailType('')
                .then(res => {
                    // console.log(res)
                    this.nodeArr = res.data.node_detail_type_list
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 批量标记
        allSignFun(){
            this.$confirm('你确定要批量标记不需要做对照的数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {                
                let params = {
                    ids: this.ids.join(','),
                    set_type: 2,
                }
                DeleteErrorLogData(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        // 标记不需要做对照的数据
        signFun(ele){
            this.$confirm('你确定要标记不需要做对照的数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {            
                let params = {
                    ids: ele.id,
                    set_type: 2,
                }
                DeleteErrorLogData(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        // 批量删除
        allDeleteFun(){
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {        
                let params = {
                    ids: this.ids.join(','),
                    set_type: 1,
                }
                DeleteErrorLogData(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        deleteFun(ele){
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {    
                let params = {
                    ids: ele.id,
                    set_type: 1,
                }
                DeleteErrorLogData(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        downloadFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                cols: this.cols,
                page: this.page,
                mon_log_base: this.form.msg,
                log_type: this.form.types,
                node_detail_type: this.form.node,
                message: this.form.sjsm,
                error_data: this.form.byxx,
            }
            DownloadErrorData( params, {})
                .then((res) => {
                    loading.close();
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `对照信息` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        getTypesFun(){
            QueryErrorLogType('')
                .then(res => {
                    this.typesArr = res.data.log_type_list
                })
                .catch(res => {
                    console.log(res);
                })
            
        },
        changeFun(item){
            this.ids = []
            console.log(item)
            item.forEach(ele => {
                this.ids.push(ele.id)
            })
        },
        cancalMonitor(ele){

        },
        submitForm(){

        },
        editFun(ele){
            this.isEdits = true
        },
        closeFun(){
            this.form = {
                zcState: ''
            }
            this.isEdits = false
        },
        getDataFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                cols: this.cols,
                page: this.page,
                mon_log_base: this.form.msg,
                log_type: this.form.types,
                log_type: this.form.types,
                node_detail_type: this.form.node,
                message: this.form.sjsm,
                error_data: this.form.byxx,
            }
            QueryErrorData(params)
                .then(res => {
                    this.tableData = res.data.error_data_list
                    this.num = res.data.error_bean.total
                    loading.close();
                })
                .catch((res) => {
                    console.log(res)
                    loading.close();
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
                node: '',
                sjsm: '',
                byxx: '',
            }
            if(this.$route.params.node_id){
                this.form.msg = this.$route.params.node_id
            }else if(this.$route.params.node_name){
                this.form.msg = this.$route.params.node_name
            }
            this.page = 1
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
    @import '../../assets/css/common.css';
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
                height: 170px;
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
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 50px;
                    .el-input{
                        width: 200px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 140px;
                    }
                }
            }
        }
        
    }
</style>
