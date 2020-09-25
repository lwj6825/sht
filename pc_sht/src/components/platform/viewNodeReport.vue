<template>
    <div class="content journal">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="执行时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="节点信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="主键ID、节点ID、节点名称" style="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item label="存入表名">
                        <el-select v-model="form.crbm" filterable clearable placeholder="请选择" style="width:230px;">
                            <el-option v-for="(item,index) in crbmArr" :key="index" :label="item.TABLE_NAME_CH"
                            :value="item.TABLE_NAME">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行结果">
                        <el-select v-model="form.zxjg" filterable clearable placeholder="请选择" style="width:230px;">
                            <el-option value="1" label="成功">成功</el-option>
                            <el-option value="2" label="失败">失败</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文件名称" >
                        <el-input v-model="form.name" clearable placeholder="请输入" style="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun" style="margin-left: 10px;">查询</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="执行时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="节点信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="主键ID、节点ID、节点名称" style="width:230px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun" style="margin-left: 10px;">查询</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <p class="unfold" v-if="isShow" @click="unfoldFun">{{unfold}}筛选条件</p>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">解析运行日志</p>
                <div>
                    <el-button type="primary" @click="allDeleteFun">批量删除</el-button><!---->
                    <!--<el-button type="primary" id="btn-file" plain @click="isShowFun($event)" @onblur="closeFun">批量导入</el-button>
                    <el-button type="primary" plain @click="getDownloadAssetsBase">导出</el-button>
                --></div><!--
            </div>
            <div class="file-btns" v-if="isfile">
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
                </div>-->
            </div>
            <div class="tables" v-loading.body="fullscreenLoading">
                <el-table :data="tableData" :header-cell-style="rowClass" @selection-change="changeFun">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="node_id" label="节点编码"> </el-table-column>
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
                    <!--<el-table-column prop="merchant_name" label="所属商户" >
                        <template slot-scope="scope">{{scope.row.merchant_name ? scope.row.merchant_name : '- - -'}}</template>
                    </el-table-column>-->
                   <!-- <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                            <el-button type="text" :style="(scope.row.id && scope.row.job_exception) ? {display: 'inline-block'} : {display: 'none'}" size="small" @click="dowoloadFun(scope.row)">下载</el-button>
                            <el-button type="text" :style="(scope.row.id && scope.row.job_exception) ? {display: 'inline-block'} : {display: 'none'}" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column> -->
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
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {ParseMonLog,QueryTableName,DownloadErrorLog,DeleteParseMonLogById} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"journal",
    data() {
        return {
            fullscreenLoading:true,
            startTime: '',
            endTime: '',
            isShow: true,
            form: {
                dataTime: '',
                msg: '',
                crbm: '',
                zxjg: '',
                name: '',
            },
            unfold: '收起',
            show: true,
            inline: true,
            crbmArr: [],
            page: 1,
            cols: 15,
            num: 0,
            total: '',
            tableData: [],
            userId: '',
            ids: [],
        }
    },
    mounted() {
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.userId = localStorage.getItem('userId')
        this.form.msg = this.$route.params.node_name
        this.getDataFun()
        this.getQueryTableName()
    },
    methods: {
        deleteFun(ele){
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    ids: ele.id,
                }
                DeleteParseMonLogById(params)
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
        changeFun(item){
            this.ids = []
            item.forEach(ele => {
                this.ids.push(ele.id)
            })
        },
        // 批量删除
        allDeleteFun(){
            this.$confirm('你确定要批量删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    ids: this.ids.join(','),
                }
                DeleteParseMonLogById(params)
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
        // 下载
        dowoloadFun(ele){
            let params = {
                id: ele.id
            }
            DownloadErrorLog(params)
                .then(res => {
                    this.downFile(res)
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        downFile (data) {
            let time = getNowFormatDate()
            console.log(time)
            if (!data) { return }
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none';
            link.href = url
            link.setAttribute('download', 'errorLog' + time + '.txt')

            document.body.appendChild(link)
            link.click()
        },
        getQueryTableName(){
            QueryTableName('')
                .then(res => {
                    this.crbmArr = res.data.table_name
                })
                .catch(res => {
                    console.log(res);
                })

        },
        getDataFun(){
            // const loading = this.$loading({
            //     lock: true,
            //     text: 'Loading',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            let params = {
                start_time: this.startTime,
                end_time: this.endTime,
                mon_log_base: this.form.msg,
                execute_result: this.form.name,
                table_name: this.form.crbm,
                result: this.form.zxjg,
                cols: this.cols,
                page: this.page,
            }
            ParseMonLog(params)
                .then(res => {
                    this.tableData = res.data.mon_log_list
                    this.num = res.data.mon_log.total
                    // loading.close();
                    this.fullscreenLoading = false;
                })
                .catch((res) => {
                    console.log(res)
                    this.fullscreenLoading = false;
                    // loading.close();
                })
        },
        viewFun(ele){
            this.$router.push({name: 'ViewJournal2',params: {param: ele}})
        },
        searchFun(){
            this.fullscreenLoading = true;
            this.page = 1
            this.timeChange()
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
            this.fullscreenLoading = true;
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
                dataTime: '',
                msg: '',
                crbm: '',
                zxjg: '',
                name: '',
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
            // var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            // this.startTime = timestampToTime(startTime)
            this.startTime = formatDate(start)
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
                width: 100%;
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
<style lang="less">
    .journal{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }
</style>
