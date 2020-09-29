<template>
    <div class="content retroactiveNode">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="120px">
                    <el-form-item label="企业编码">
                        <el-input v-model="form.node_code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-input v-model="form.node_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否条形码追溯">
                        <el-select v-model="form.bar_code" filterable clearable placeholder="请选择">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否自动化">
                        <el-select v-model="form.automation" filterable clearable placeholder="请选择">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
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
                    <el-button @click="synchroFun">手动同步</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="node_id" label="企业编码"></el-table-column>
                <el-table-column prop="node_name" label="企业名称"></el-table-column>
                <el-table-column prop="node_trace_type" label="自定义节点类型"></el-table-column>
                <el-table-column prop="is_trace" label="是否条形码追溯"></el-table-column>
                <el-table-column prop="is_automatic" label="是否自动化"></el-table-column>
                <el-table-column prop="traceability_code_type" label="物品码类型"></el-table-column>
                <el-table-column prop="traceability_code_gain" label="获取物品码方式"></el-table-column>
                <el-table-column prop="goods_type_name" label="可溯源品类"></el-table-column>
                <el-table-column prop="is_show" label="是否展示"></el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="articleFun(scope.row)">物品码同步</el-button>
                        <el-button type="text" size="small" @click="retrospectFun(scope.row)">追溯信息同步</el-button>
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
import {QueryNodeTrace, ToExecuteBusiness, ToExecute} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
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
export default {
    name:"retroactiveNode",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_code: '',
                node_name: '',
                bar_code: '',
                automation: '',
            },
            loading: true,
        }
    },
    mounted() {
        window.scrollTo(0,0)
        if(localStorage.getItem('routeMsg1')){
            localStorage.removeItem('routeMsg1')
        }
        if(localStorage.getItem('searchMsg1')){
            this.form = JSON.parse(localStorage.getItem('searchMsg1'))
            localStorage.removeItem('searchMsg1')
        }
        this.getDataFun()
    },
    methods: {
        articleFun(ele){
            if(ele.is_automatic == '否'){
                this.$confirm('请开启自动化获取物品码', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    showCancelButton: false
                }).then(() => {
                
                }).catch(() => {
                
                });
                return
            }else{
                let obj = {
                    node_id: ele.node_id,
                    traceability_code_type: ele.traceability_code_type,
                    traceability_code_gain: ele.traceability_code_gain,
                    type: '物品码同步'
                }
                ToExecute(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message ? res.message : '同步成功');
                        }else{
                            this.$message.error(res.message ? res.message : '同步失败');
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }
        },
        retrospectFun(ele){
            if(ele.is_automatic == '否'){
                this.$confirm('请开启自动化获取追溯信息', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    showCancelButton: false
                }).then(() => {
                
                }).catch(() => {
                
                });
                return
            }else{
                let obj = {
                    node_id: ele.node_id,
                    traceability_code_type: ele.traceability_code_type,
                    traceability_code_gain: ele.traceability_code_gain,
                    type: '追溯信息同步'
                }
                ToExecute(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message ? res.message : '同步成功');
                        }else{
                            this.$message.error(res.message ? res.message : '同步失败');
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }
        },
        synchroFun(){
            this.loading = true
            let str = ''
            ToExecuteBusiness(str)
                .then(res => {
                    this.loading = false
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '同步成功');
                    }else{
                        this.$message.error(res.message ? res.message : '同步失败');
                    }
                })
                .catch(res => {
                    this.loading = false
                    console.log(res)
                })
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                is_trace: this.form.bar_code,//是否条形码追溯
                node_id: this.form.node_code,
                node_name: this.form.node_name,
                is_automatic: this.form.automation,//是否自动化
            }
            QueryNodeTrace(obj)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.dataList 
                    this.total = res.data.condition.total
                })
                .catch(res => {
                    this.loading = false
                    console.log(res)
                })
        },
        editFun(ele){
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'EditRetroactiveNode', params: ele})
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
                node_code: '',
                node_name: '',
                bar_code: '',
                automation: '',
            }
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
                margin-top: -150px;
                margin-left: -300px;
                width: 600px;
                height: 300px;
                background: #fff;
                font-size: 14px;
                border-radius: 5px;
                .clear{
                    clear: both;
                }
                .form{
                    margin-top: 10px;
                    height: 460px;
                    overflow: auto;
                    .el-select, .el-input{
                        width: 400px;
                    }
                    .zpg{
                        .el-select, .el-input{
                            width: 200px;
                        }
                    }
                    textarea{
                        padding-left: 10px;
                        max-width: 390px;
                        width: 400px;
                        height: 50px;
                        border: 1px solid #DCDFE6;
                        border-radius: 4px;
                    }
                }
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
                .jjfa{
                    margin-top: 20px;
                }
                .form-div{
                    height: 340px;
                    overflow: auto;
                }
                .form{
                    height: 330px;
                }
                textarea{
                    padding-left: 10px;
                    margin: 0 10px;
                    width: 390px;
                    height: 140px;
                    border: 1px solid #DCDFE6;
                    border-radius: 4px;
                }
                .submit{
                    left: 0;
                }
                .btn{
                    margin-left: 470px;
                }
            }
        }
    }
</style>
