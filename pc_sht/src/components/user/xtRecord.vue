<template>
    <div class="content assets">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="节点名称">
                        <el-input class="placeholder" v-model="form.node_name" clearable placeholder="请输入节点名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="searchFun"style="margin-left: 10px;">查询</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_id" label="节点编码"> </el-table-column>
                <el-table-column prop="node_name" label="节点名称"> </el-table-column>
                <el-table-column prop="parse_type_num" label="环节编码"> </el-table-column>
                <el-table-column prop="record_date" label="记录日期"> </el-table-column>
                <el-table-column prop="beanString" label="服务类"> </el-table-column>
                <el-table-column prop="method" label="执行方法"> </el-table-column>
                <el-table-column prop="rootPath" label="根目录"></el-table-column>
                <el-table-column prop="downPath" label="下载路径"> </el-table-column>
                <el-table-column prop="upPath" label="上传目录"> </el-table-column>
            </el-table>
            
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import {GetNodeInfoXt} from '../../js/user/user.js'
export default {
    name:"xtRecord",
    data() {
        return {
            page: 1,
            cols: 15,
            total: 0,
            tableData: [],
            form: {
                node_name: '',
            },
        }
    },
    mounted() {
        this.getDataFun()
    },
    methods: {
        getDataFun(){
            let params = {
                cols: this.cols,
                page: this.page,
                node_name: this.form.node_name,
            }
            GetNodeInfoXt(params)
                .then(res => {
                    this.tableData = res.data.list
                    this.total = res.data.bean.total;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
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
    }
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
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        
    }
</style>
<style lang="less">
    .assets{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }
    .el-message--error{
        color: #f56c6c !important;
        font-size: 14px !important;
    }
    .el-message--success{
        color: #67c23a !important;
        font-size: 14px !important;
    }
</style>
