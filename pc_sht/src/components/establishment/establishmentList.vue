<template>
    <div class="content establishmentList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="120px">
                    <el-form-item label="节点名称">
                        <el-input v-model="form.node_msg" clearable placeholder="请输入节点名称"></el-input>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form.node_types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.node_type" :value="item.node_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属区县" v-if="roleId != '80'">
                        <el-select v-model="form.addr" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in addrArr" :key="index" :label="item.district_name" :value="item.district_name">
                            </el-option>
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
            <!--<div class="title">
                <p class="tz-title">节点列表</p>
                <div>
                    <el-button v-if="editAllBtn == '批量修改'" type="primary" @click="addFun"> + 添加</el-button>
                    <el-button v-if="editAllBtn == '批量修改'" @click="downloadFun">导出</el-button>
                    <div class="submit" v-if="editAllBtn == '批量修改'">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button v-if="editAllBtn == '完成'" @click="cancelFun">取消</el-button>
                    <el-button @click="allEditFun">{{editAllBtn}}</el-button>
                </div>
            </div>-->
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column prop="node_type" label="节点类型"></el-table-column>
                <el-table-column prop="district_name" label="所属区县"></el-table-column>
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
import {QueryNodePriceExtract, QueryNodePriceExtractNew, NodePriceType, NodePriceTypeNew, DownloadPriceNodeExtract, BatchUpdatePriceNode} from '../../js/compare/compare.js'
import {importPriceNodeExtract} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"establishmentList",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_msg: '',
                node_types: '',
                detail_types: '',
                addr: '',
                extract_types: '',
            },
            typesArr: [],
            detailArr: [],
            addrArr: [],
            extractArr: [],
            loading: true,
            editAllBtn: '批量修改',
            editArr: [],
            file: '',
            roleId: '',
        }
    },
    mounted() {
        this.roleId = localStorage.getItem('roleId')
        let routeMsg1 = '';
        if(localStorage.getItem('routeMsg1')){
            routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
        }
        if(localStorage.getItem('district_name')){
            this.form.addr = JSON.parse(localStorage.getItem('district_name'))
        }
        if(localStorage.getItem('searchMsg2')){
            this.form = JSON.parse(localStorage.getItem('searchMsg2'))
            localStorage.removeItem('searchMsg2')
        }
        this.getNodePriceType()
        this.getDataFun()
    },
    methods: {
        getNodePriceType(){
            if(this.roleId == '80'){
                NodePriceTypeNew('')
                    .then(res => {
                        this.typesArr = res.data.node_type.slice(0, res.data.node_type.length -2)
                        this.detailArr = res.data.node_detail_type
                        this.addrArr = res.data.district_name
                        this.extractArr = res.data.data_source
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{
                NodePriceType('')
                    .then(res => {
                        this.typesArr = res.data.node_type
                        this.detailArr = res.data.node_detail_type
                        this.addrArr = res.data.district_name
                        this.extractArr = res.data.data_source
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_name: this.form.node_msg,
                node_type: this.form.node_types,
                node_detail_type: this.form.detail_types,
                district_name: this.form.addr,
                data_source: this.form.extract_types,
                state: 1,
            }
            if(this.roleId == '80'){
                QueryNodePriceExtractNew(obj)
                    .then(res => {
                        this.loading = false
                        this.total = res.data.condition.total
                        let arr = [], num = '';
                        res.data.dataList.forEach(val =>{
                            // this.extractArr.forEach(val2 => {
                            //     if(val2.text == val.data_source){
                            //         val.types = val2.id
                            //     }
                            // })
                        })
                        this.tableData = res.data.dataList 
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }else{
                QueryNodePriceExtract(obj)
                    .then(res => {
                        this.loading = false
                        this.total = res.data.condition.total
                        let arr = [], num = '';
                        res.data.dataList.forEach(val =>{
                            this.extractArr.forEach(val2 => {
                                if(val2.text == val.data_source){
                                    val.types = val2.id
                                }
                            })
                        })
                        this.tableData = res.data.dataList 
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }
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
                node_msg: '',
                node_types: '',
                detail_types: '',
                addr: '',
                extract_types: '',
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
    .establishmentList{
        .el-input__icon{
            line-height: 30px;
        }
        .table{
            background: #fff;
        }
    }
</style>
<style lang="less">
    .establishmentList{
        .el-table td {
            padding: 7px 0px;
        }
    }
</style>