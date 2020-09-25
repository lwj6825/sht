<template>
    <div class="content allGood">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="商品信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入商品名称或商品编码"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.varieties_type" :value="item.varieties_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status" filterable clearable placeholder="请选择">
                            <el-option label="已上报" value="1"></el-option>
                            <el-option label="未上报" value="0"></el-option>
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
                <p class="tz-title">商品列表</p>
                <div><!--
                    <div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button @click="downloadFun">导出</el-button>-->
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="userdefine_code" label="商品编码"></el-table-column>
                <el-table-column prop="userdefine_name" label="商品名称"></el-table-column>
                <el-table-column prop="varieties_type" label="商品分类"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column><!--
                <el-table-column prop="" label="价格系数"></el-table-column>-->
                <el-table-column prop="goods_code" label="对照编码"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
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
import {GetGoodsTypes, QueryNodeGoods} from '../../js/compare/compare.js'
export default {
    name:"allGood",
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
        let routeMsg2 = '';
        if(localStorage.getItem('routeMsg2')){
            routeMsg2 = JSON.parse(localStorage.getItem('routeMsg2'))
        }else{
            routeMsg2 = this.$route.params
        }
        if(localStorage.getItem('searchMsg3')){
            this.form = JSON.parse(localStorage.getItem('searchMsg3'))
            localStorage.removeItem('searchMsg3')
        }
        this.form.node_name = routeMsg2.node_name
        this.form.node_id = routeMsg2.node_id
        this.getGetGoodsTypesFun()
        this.getDataFun()
    },
    methods: {
        // 商品分类
        getGetGoodsTypesFun(){
            let str = ''
            GetGoodsTypes(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        editFun(ele){
            localStorage.setItem('searchMsg3', JSON.stringify(this.form))
            this.$router.push({name: 'EditAllGood', params: ele})
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
                node_id: this.form.node_id, // 节点编码
                userdefine_name: this.form.msg, // 自定义名称
                varieties_type: this.form.types,
                status: this.form.status, // 已上报：1未上报：0
            }
            QueryNodeGoods(obj)
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
