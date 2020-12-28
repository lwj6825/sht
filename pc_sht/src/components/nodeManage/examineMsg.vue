<template>
    <div class="content examineMsg">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="企业名称">
                        <el-input v-model="form.node_name" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.icon" filterable clearable placeholder="请选择">
                            <el-option label="未审核" value="0">未审核</el-option>
                            <el-option label="审核通过" value="1">审核通过</el-option>
                            <el-option label="审核驳回" value="2">审核驳回</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">数据列表</p>
                <div>
                    
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="node_name" label="企业名称"></el-table-column>
                <el-table-column prop="contacts" label="联系人"></el-table-column>
                <el-table-column prop="tel" label="联系电话"></el-table-column>
                <el-table-column prop="reg_id" label="身份证号"></el-table-column>
                <el-table-column prop="legal_represent" label="法人代表"></el-table-column>
                <el-table-column prop="url" label="驳回链接">
                    <template slot-scope="scope">
                        <p v-if="scope.row.icon == 2">{{scope.row.url}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="状态" width="100">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.is_open">
                            <p v-if="scope.row.icon == 0">未审核</p>
                            <p v-if="scope.row.icon == 1">审核通过</p>
                            <p v-if="scope.row.icon == 2">审核驳回</p>
                        </div>
                        <div v-else>
                            <p v-if="scope.row.is_open == 0">企业未修改</p>
                            <p v-if="scope.row.is_open == 1">企业已修改</p>
                            <p v-if="scope.row.is_open == 2">审核通过</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="node_name" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.icon != 1" size="mini" type="text" @click="viewFun(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import {QueryBasic} from '../../js/nodeManage/nodeManage.js'
export default {
    name:"examineMsg",
    data() {
        return {
            page: 1,
            cols: 15,
            total: 0,
            tableData: [],
            loading: true,
            form: {
                node_name: '',
                icon: '',
            },
        }
    },
    mounted() {
        this.getDataFun()
    },
    methods: {
        viewFun(ele){
            this.$router.push({name: 'ViewExamine', params: ele})
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                node_name: '',
                icon: '',
            }
            this.page = 1
            this.getDataFun()
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                icon: this.form.icon, // 0未审核1审核通过
                node_name: this.form.node_name,
            }
            QueryBasic(obj)
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
        handleCurrentChange(val) {
            this.page = val
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
                .submit{
                    position: relative;
                    top: 0;
                    display: inline-block;
                    margin: 0 10px;
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
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
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
<style lang="less">
    .examineMsg{
        .el-table td {
            padding: 9px 0;
        }
    }
</style>
