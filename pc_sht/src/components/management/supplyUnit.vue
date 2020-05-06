<template>
    <div class="content supplyUnit">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="供货单位名称" prop="node_name">
                        <el-input v-model="form.name" clearable placeholder="请输入供货单位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.node_type" clearable placeholder="请选择">
                            <el-option label="启用" value="启用"></el-option>
                            <el-option label="停用" value="停用"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">供货单位列表</p>
                <div>
                    <el-button type="primary" class="blue-bth" @click="startFun">批量启用</el-button>
                    <el-button type="primary" class="search-btn white-bth" @click="stopFun">批量禁用</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table  :data="tableData" :header-cell-style="rowClass" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"  width="55"></el-table-column>
                    <el-table-column prop="node_name" label="供货单位名称"></el-table-column>
                    <el-table-column prop="legal_represent" label="法人"> </el-table-column>
                    <el-table-column prop="area_name" label="经营地址"> 
                        <template slot-scope="scope">
                        <span v-if="scope.row.area_name">{{scope.row.area_name}}</span>
                        <span v-if="scope.row.addr">{{scope.row.addr}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tel" label="联系电话"> </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-switch :width="widthNum" style="width: 160px;"
                                v-model="scope.row.status" active-text="启用" inactive-text="停用"
                                active-value="启用" inactive-value="停用" @change="changeFun(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
import {QuerySupplier,QueryGyjd,ToStart,ToStop} from '../../js/user/user.js';
export default {
    name:"supplyUnit",
    data() {
        return {
            form: {
                name: '',
                node_type: '',
            },
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            node_id: '',
            selectArr: [],
            node_name: '',
            widthNum: 70,
        }
    },
    mounted() {
        this.node_id = localStorage.getItem('loginId')
        this.getDataFun()
    },
    methods: {
        startFun(){
            let arr = []
            this.selectArr.forEach(val => {
                arr.push(val.id)
            })
            let str = arr.join(',')
            let obj = {
                node_id: this.node_id,
                ids: str
            }
            ToStart(obj)
                .then(res => {
                    this.page = 1
                    this.getDataFun()
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        stopFun(){
            let arr = []
            this.selectArr.forEach(val => {
                arr.push(val.id)
            })
            let str = arr.join(',')
            let obj = {
                node_id: this.node_id,
                ids: str
            }
            ToStop(obj)
                .then(res => {
                    this.page = 1
                    this.getDataFun()
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleSelectionChange(val) {
            this.selectArr = val
        },
        getDataFun(){
            let obj = {
                node_id: this.node_id,
                page: this.page,
                cols: this.cols,
                node_name: this.form.name,
                status: this.form.node_type ? this.form.node_type : ''
            }
            QueryGyjd(obj)
                .then(res => {
                    this.num = res.data.condition.total
                    this.tableData = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun(ele){
            if(ele.status == '启用'){
                let obj = {
                    node_id: this.node_id,
                    ids: ele.id
                }
                ToStart(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else if(ele.status == '停用'){
                let obj = {
                    node_id: this.node_id,
                    ids: ele.id
                }
                ToStop(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
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
                name: '',
                node_type: '',
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
    .content{
        width: 100%;
        height: 100%;
        .file-btn{
            color: #777;
            background: #fff;
            border-color: #eaeaea;
        }
        .search-btn{
            color: #409EFF;
            background: #fff;
        }
        .search{
            .clear-content{
                margin-left: 10px;
                cursor: pointer;
                color: #999999;
                font-size: 14px;
            }
            .el-form{
                margin-left: 20px;
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
        .searchs{
            padding: 10px 0;
            background: #fff;
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
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
            text-align: center;
        }
    }
</style>
<style lang="less">
.supplyUnit{
    .el-table td{
        padding: 5px 0 !important;
    }
    .el-switch__label--left{
        position: relative;
        left: 60px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right{
        position: relative;
        right: 60px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label.is-active{
        z-index: 1111;
        color: #fff;
    }
    .el-switch__core{
        width: 60px !important;
    }
}
</style>
