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
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.item"
                            :value="item.item">
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
        <div class="table">
            <div class="title">
                <p class="tz-title">数据列表</p>
                <div>
                    <el-button type="primary" @click="allSignFun">批量标记</el-button>
                    <el-button type="primary" @click="allDeleteFun">批量删除</el-button>
                    <el-button type="primary" plain @click="downloadFun">导出</el-button>
                    <el-button type="primary" plain @click="deleteAllDataFun">删除全部</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="id" label="日志类型"></el-table-column>
                <el-table-column prop="id" label="缺对照编码"></el-table-column>
                <el-table-column prop="id" label="取对照名称"></el-table-column>
                <el-table-column prop="id" label="备用信息"></el-table-column>
                <el-table-column prop="id" label="数据说明"></el-table-column>
                <el-table-column prop="id" label="最后出现时间"></el-table-column>
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
export default {
    name:"defectCompare",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [
                {
                    aa: '111'
                }
            ],
            form: {
                node_name: '',
                types: '',
                remark: '',
                explain: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
        }
    },
    mounted() {
        
    },
    methods: {
        // 批量删除
        allDeleteFun(){

        },
        // 批量标记
        allSignFun(){

        },
        // 导出
        downloadFun(){

        },
        // 删除全部
        deleteAllDataFun(){

        },
        signFun(ele){

        },
        deleteFun(ele){

        },
        getDataFun(){

        },
        handleSizeChange(val){
            this.cols = val
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
                types: '',
                remark: '',
                explain: '',
            }
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
