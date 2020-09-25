<template>
    <div class="content defectCompare">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="节点名称">
                        <el-input v-model="form.node_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="日志类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.LOG_TYPE" :value="item.LOG_TYPE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="form.remark" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="数据说明">
                        <el-input v-model="form.explain" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button @click="clearFun">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">数据列表</p>
                <div>
                    <el-button type="primary" @click="allSignFun">批量标记</el-button>
                    <el-button type="primary" @click="allDeleteFun">批量删除</el-button>
                    <el-button type="primary" plain @click="downloadFun">导出</el-button>
                    <el-button type="primary" plain @click="deleteAllDataFun">删除全部</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" @selection-change="changeFun">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="log_type" label="日志类型"></el-table-column>
                <el-table-column prop="error_code" label="缺对照编码"></el-table-column>
                <el-table-column prop="error_name" label="取对照名称"></el-table-column>
                <el-table-column prop="error_data" label="备用信息"></el-table-column>
                <el-table-column prop="message" label="数据说明"></el-table-column>
                <el-table-column prop="record_date" label="最后出现时间"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="signFun(scope.row)">标记不需要做对照的数据</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
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
import {QueryErrorData,QueryErrorLogType,DownloadErrorData,DeleteErrorLogData,QueryNodeDetailType,DeleteAllErrorData,AddErrorDateRemark} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"defectCompare",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_id: '',
                node_name: '',
                types: '',
                remark: '',
                explain: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: true,
            ids: [],
        }
    },
    mounted() {
        let routeMsg1 = '';
        if(localStorage.getItem('routeMsg1')){
            routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
        }
        if(localStorage.getItem('searchMsg2')){
            this.form = JSON.parse(localStorage.getItem('searchMsg2'))
            localStorage.removeItem('searchMsg2')
        }
        this.form.node_name = routeMsg1.node_name
        this.form.node_id = routeMsg1.node_id
        this.getDataFun()
        this.getTypesFun()
    },
    methods: {
        changeFun(item){
            this.ids = []
            item.forEach(ele => {
                this.ids.push(ele.id)
            })
        },
        // 日志类型
        getTypesFun(){
            QueryErrorLogType('')
                .then(res => {
                    this.typesArr = res.data.log_type_list
                })
                .catch(res => {
                    console.log(res);
                })
            
        },
        // 批量删除
        allDeleteFun(){
            if(this.ids.length == 0){
                this.$message.error('请选择需要删除的数据！');
                return
            }
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
        // 批量标记
        allSignFun(){
            if(this.ids.length == 0){
                this.$message.error('请选择标记不需要做对照的数据！');
                return
            }
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
        // 导出
        downloadFun(){
            let params = {
                cols: this.cols,
                page: this.page,
                mon_log_base: this.form.node_name,
                log_type: this.form.types,
                node_detail_type: this.form.node,
                message: this.form.sjsm,
                error_data: this.form.byxx,
            }
            DownloadErrorData( params, {})
                .then((res) => {
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
        // 删除全部
        deleteAllDataFun(){
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
                    mon_log_base: this.form.node_name,
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
                            this.page = 1
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
        getDataFun(){
            this.loading = true
            let params = {
                cols: this.cols,
                page: this.page,
                mon_log_base: this.form.node_name,
                log_type: this.form.types,
                node_detail_type: '',
                message: this.form.explain,
                error_data: this.form.remark,
            }
            QueryErrorData(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.error_data_list
                    this.total = res.data.error_bean.total
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        handleSizeChange(val){
            this.cols = val
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                node_name: '',
                node_id: '',
                types: '',
                remark: '',
                explain: '',
            }
            let routeMsg1 = '';
            if(localStorage.getItem('routeMsg1')){
                routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
            }
            this.form.node_name = routeMsg1.node_name
            this.form.node_id = routeMsg1.node_id
            this.page = 1
            this.getDataFun()
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
            background: #fff;
            .link_btns{
                color: #409EFF;
                cursor: pointer;
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
            .zpg{
                display: flex;
                align-items: center;
                .sele-cursor{
                    height: 20px;
                    cursor: pointer;
                }
            }
            .task_name{
                p{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
    }
</style>
