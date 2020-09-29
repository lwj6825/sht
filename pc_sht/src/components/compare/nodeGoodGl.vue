<template>
    <div class="content nodeGoodGl">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="节点信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入节点名称或者节点编码"></el-input>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.node_type" :value="item.node_type">
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
            <div class="title">
                <p class="tz-title">节点列表</p>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_id" label="节点编码"></el-table-column>
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="node_type" label="节点类型"></el-table-column>
                <el-table-column prop="sum_node_count" label="全部商品">
                    <template slot-scope="scope">
                        <div @click="jumpFun1(scope.row)" class="link_btns">{{scope.row.sum_node_count ? scope.row.sum_node_count : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="node_count" label="已上报商品">
                    <template slot-scope="scope">
                        <div @click="jumpFun2(scope.row)" class="link_btns">{{scope.row.node_count ? scope.row.node_count : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="proposal_count" label="建议上报">
                    <template slot-scope="scope">
                        <div @click="jumpFun3(scope.row)" class="link_btns">{{scope.row.proposal_count ? scope.row.proposal_count : 0}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="warning_count" label="预警商品">
                    <template slot-scope="scope">
                        <div @click="jumpFun4(scope.row)" class="link_btns">{{scope.row.warning_count ? scope.row.warning_count : 0}}</div>
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
import {NodeGoodsManage, NodePriceType} from '../../js/compare/compare.js'
export default {
    name:"nodeGoodGl",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_name: '',
                node_id: '',
                msg: '',
                types: '',
                status: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: true,
        }
    },
    mounted() {
        if(localStorage.getItem('searchMsg2')){
            this.form = JSON.parse(localStorage.getItem('searchMsg2'))
            localStorage.removeItem('searchMsg2')
        }
        this.getNodePriceType()
        this.getDataFun()
    },
    methods: {
        getNodePriceType(){
            NodePriceType('')
                .then(res => {
                    this.typesArr = res.data.node_type
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 全部
        jumpFun1(ele){
            localStorage.setItem('routeMsg2', JSON.stringify(ele))
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'AllGood', params: {msg: ele}})
        },
        // 已上报
        jumpFun2(ele){
            localStorage.setItem('routeMsg2', JSON.stringify(ele))
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'ReportGood', params: ele})
        },
        // 建议上报
        jumpFun3(ele){
            localStorage.setItem('routeMsg2', JSON.stringify(ele))
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'ProposalGood', params: ele})
        },
        // 预警
        jumpFun4(ele){
            localStorage.setItem('routeMsg2', JSON.stringify(ele))
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'WarningGood', params: ele})
        },
        downloadFun(){
            let params = {
                node_id: this.form.node_id, // 节点编码
                userdefine_name: this.form.msg, // 自定义名称
                varieties_type: this.form.types
            }
            // DownloadReportNodeGoods( params, {})
            //     .then((res) => {
            //         let time = getNowFormatDate()
            //         let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
            //         let url = window.URL.createObjectURL(blob);
            //         let aLink = document.createElement("a");
            //         aLink.style.display = "none";
            //         aLink.href = url;
            //         aLink.setAttribute("download", `已上报商品` + time);
            //         document.body.appendChild(aLink);
            //         aLink.click();
            //         document.body.removeChild(aLink); 
            //         window.URL.revokeObjectURL(url); 
            //     })
            //     .catch(function (res) {});
        },
        // 上传
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('purchase', this.file);  
            formData.append('userId', this.userId);  
            formData.append('node_id',this.loginId); 
            formData.append('region',this.areaId); 
            formData.append('node_name',this.loginName); 
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            const ajaxPost = function (url, params,config) {
                return new Promise((resolve, reject) => {
                    axios
                    .post(url, params,{config})
                    .then((res) => {
                        resolve(res.data)
                    })
                    .catch(() => {
                        reject('error')
                    })
                })
            }  
            // let url = 'goods/importPurchase'
            // ajaxPost(url,formData,config)
            //     .then(res => {
                    
            //     })
            //     .catch(res => {
            //         console.log(res)
            //     })
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_name: this.form.msg,
                node_type: this.form.types
            }
            NodeGoodsManage(obj)
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
                node_name: '',
                node_id: '',
                msg: '',
                types: '',
            }
            let routeMsg2 = '';
            if(localStorage.getItem('routeMsg2')){
                routeMsg2 = JSON.parse(localStorage.getItem('routeMsg2'))
            }else{
                routeMsg2 = this.$route.params
            }
            this.form.node_name = routeMsg2.node_name
            this.form.node_id = routeMsg2.node_id
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
    .nodeGoodGl{
        .el-table td {
            padding: 8px 0;
        }
    }
</style>