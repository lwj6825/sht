<template>
    <div class="content wjscSituation">
        <div class="table">
            <div class="title">
                <p class="tz-title">最近15条解析情况</p>
                <!--<div>
                    <el-button type="primary" @click="allSignFun">批量标记</el-button>
                    <el-button type="primary" @click="allDeleteFun">批量删除</el-button>
                    <el-button type="primary" plain @click="downloadFun">导出</el-button>
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
                    <el-table-column prop="node_id" label="节点ID"> </el-table-column>
                    <el-table-column prop="node_name" label="节点名称"> </el-table-column>
                    <el-table-column prop="table_name" label="存入表名"> </el-table-column>
                    <el-table-column prop="start_time" label="执行时间"> </el-table-column>
                    <el-table-column prop="execute_time" label="执行用时"> </el-table-column>
                    <el-table-column prop="data_date" label="数据时间"> </el-table-column>
                    <el-table-column prop="execute_num" label="表存入数"> </el-table-column>
                    <el-table-column prop="save_total_num" label="总存入数"> </el-table-column>
                    <el-table-column prop="file_total_num" label="文件总数"> </el-table-column>
                    <el-table-column prop="execute_result" label="文件名称"> </el-table-column>
                    <el-table-column prop="result" label="执行消息"> </el-table-column>
                    <el-table-column prop="job_result" label="执行信息"> </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">查看</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <div class="msg">
                        <div class="msg-title">ID主键</div>
                        <div class="data">{{msgObj.id}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">任务环节</div>
                        <div class="data">{{msgObj.parse_type}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">任务类型</div>
                        <div class="data">{{msgObj.job_type}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">开始时间</div>
                        <div class="data">{{msgObj.start_time}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">结束时间</div>
                        <div class="data">{{msgObj.end_time}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">执行用时（秒）</div>
                        <div class="data">{{msgObj.execute_time}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">数据时间</div>
                        <div class="data">{{msgObj.data_date}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">文件名/日期</div>
                        <div class="data">{{msgObj.execute_result}}</div>
                    </div>
                    <div class="msg">
                        <div class="msg-title">异常信息</div>
                        <div class="data">{{msgObj.job_exception}}</div>
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
import {ParseMonLogForRecently} from '../../js/traceEquipment/traceEquipment.js'
import {importAssets,importAssetsUpdate} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"wjscSituation",
    data() {
        return {
            form: {
                msg: '',
                types: '',
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
            ftp_id: '',
            node_id: '',
            node_name: '',
            parse_type_name: '',
            table_name: '',
            msgObj: {},
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.node_id = this.$route.params.node_id
        this.node_name = this.$route.params.node_name
        this.parse_type_name = this.$route.params.parse_type_name
        this.table_name = this.$route.params.table_name
        this.ftp_id = this.$route.params.ftp_id
        this.getDataFun()
    },
    methods: {
        viewFun(ele){
            this.isEdits = true
            this.msgObj = ele
        },
        closeFun(){
            this.msgObj = {}
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
                node_id: this.node_id,
                node_name: this.node_name,
                parse_type_name: this.parse_type_name,
                table_name: this.table_name
            }
            ParseMonLogForRecently(params)
                .then(res => {
                    this.tableData = res.data.mon_log_list
                    // this.num = res.data.error_bean.total
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
                .msg{
                    display: flex;
                    line-height: 30px;
                    font-size: 15px;
                    .msg-title{
                        margin-right: 20px;
                        width: 150px;
                        text-align: right;
                    }
                }
            }
        }
        
    }
</style>
