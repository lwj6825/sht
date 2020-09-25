<template>
    <div class="content compareList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="企业类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择" @change="selectTypesFun">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点信息">
                        <el-select v-model="form.msg" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.text"
                            :value="item.text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="对照商品">
                        <el-select v-model="form.good" clearable placeholder="请选择">
                            <el-option label="有数据" value="1"></el-option>
                            <el-option label="无数据" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户对照">
                        <el-select v-model="form.biz" clearable placeholder="请选择">
                            <el-option label="有数据" value="1"></el-option>
                            <el-option label="无数据" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点对照">
                        <el-select v-model="form.node" clearable placeholder="请选择">
                            <el-option label="有数据" value="1"></el-option>
                            <el-option label="无数据" value="0"></el-option>
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
                <div><!--
                    <el-button type="primary" @click="addFun">+新建临时任务</el-button>
                    <el-button plain @click="downloadFun">导出</el-button>-->
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" @sort-change="sortChange">
                <el-table-column prop="node_type" label="企业类型"></el-table-column>
                <el-table-column prop="node_id" label="节点编码"></el-table-column>
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="goods" label="对照商品" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun1(scope.row)" class="link_btns">{{scope.row.goods ? scope.row.goods : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_count" width="130" label="缺失对照商品" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun2(scope.row)" class="link_btns">{{scope.row.goods_count ? scope.row.goods_count : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="price_count" width="130" label="价格抽取商品" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun3(scope.row)" class="link_btns">{{scope.row.price_count ? scope.row.price_count : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="bussiness" label="商户对照" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun4(scope.row)" class="link_btns">{{scope.row.bussiness ? scope.row.bussiness : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="node" label="节点对照" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun5(scope.row)" class="link_btns">{{scope.row.node ? scope.row.node : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="origin" label="产地对照" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <div @click="jumpFun6(scope.row)" class="link_btns">{{scope.row.origin ? scope.row.origin : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                            <el-button type="text" size="small" @click="addRemarkFun(scope.row)">添加备注</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"></el-pagination>
        </div>
        <div class="password" v-if="isRemark">
            <div class="text">
                <div class="box-title">
                    <p class="tit">添加备注</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="jjfa">
                    <el-form ref="form2" :model="form2" label-width="80px" size="small">
                        <el-form-item label="备注">
                            <textarea v-model="form2.remark"></textarea>
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button @click="closeFun">取消</el-button>
                        <el-button type="primary"@click="submitForm">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryNode, QueryNodeTypeSelect, QueryNodeSelectNew} from '../../js/compare/compare.js'
import {AddErrorDateRemark} from '../../js/traceEquipment/traceEquipment.js';
export default {
    name:"compareList",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                msg: '',
                types: '',
                good: '',
                biz: '',
                node: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: true,
            isRemark: false,
            form2: {
                remark: ''
            },
            node_id: '',
            node_name: '',
            order: 'desc', 
            sortField: 'goods',
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
        if(localStorage.getItem('routeMsg2')){
            localStorage.removeItem('routeMsg2')
        }
        if(localStorage.getItem('searchMsg2')){
            localStorage.removeItem('searchMsg2')
        }
        this.queryNodeTypeSelectFun()
        this.getQueryNodeSelectNewFun()
        this.getDataFun()
    },
    methods: {
        sortChange({column, prop, order}){
            this.page = 1
            this.sortField = column.property
            if(order == 'descending'){
                this.order = 'desc'
            }else if(order == 'ascending'){
                this.order = 'asc'
            }
            this.getDataFun()
        },
        selectTypesFun(ele){
            this.getQueryNodeSelectNewFun()
        },
        // 获取节点
        getQueryNodeSelectNewFun(){
            let str = 'node_type=' + (this.form.types ? this.form.types : '') + '&node_name='
            QueryNodeSelectNew(str)
                .then(res => {
                    this.nodeArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addRemarkFun(ele){
            this.node_id = ele.node_id
            this.node_name = ele.node_name
            this.form.remark = ele.remark
            this.isRemark = true
        },
        closeFun(){
            this.isRemark = false
            this.node_id = ''
            this.node_name = ''
            this.form2 = {
                remark: ''
            }
        },
        submitForm(){
            let params = {
                node_id: this.node_id,
                node_name: this.node_name,
                remark: this.form2.remark
            }
            AddErrorDateRemark(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.getDataFun()
                        this.closeFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 节点类型查询
        queryNodeTypeSelectFun(){
            let str = ''
            QueryNodeTypeSelect(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 对照商品数量
        jumpFun1(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'GoodCompare', params: {msg: ele}})
        },
        // 缺失对照商品数量
        jumpFun2(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'DefectCompare', params: ele})
        },
        // 价格抽取商品数量
        jumpFun3(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'NodeGood', params: ele})
        },
        // 商户对照数量
        jumpFun4(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'BizCompare', params: ele})
        },
        // 节点对照数量
        jumpFun5(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'NodeCompare', params: ele})
        },
        // 省市区县对照
        jumpFun6(ele){
            localStorage.setItem('routeMsg1', JSON.stringify(ele))
            localStorage.setItem('searchMsg1', JSON.stringify(this.form))
            this.$router.push({name: 'AddrCompare', params: ele})
        },
        getDataFun(){
            this.loading = true
            let sort = ''
            if(this.order == 'desc'){
                sort = 0
            }else{
                sort = 1
            }
            let obj = {
                page: this.page,
                cols: this.cols,
                node_id: this.form.msg,
                type: this.form.types,
                goods_userdefine: this.form.good, // 有数据1无数据0
                biz_userdefine: this.form.biz, // 有数据1无数据0
                node_uerdefine: this.form.node, // 有数据1无数据0
                bussiness: this.sortField == 'bussiness' ? sort : '',
                goods: this.sortField == 'goods' ? sort : '',
                node: this.sortField == 'node' ? sort : '',
                origin: this.sortField == 'origin' ? sort : '',
                goods_count: this.sortField == 'goods_count' ? sort : '',
                price_count: this.sortField == 'price_count' ? sort : '' 
            }
            QueryNode(obj)
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
                msg: '',
                types: '',
                good: '',
                biz: '',
                node: '',
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
