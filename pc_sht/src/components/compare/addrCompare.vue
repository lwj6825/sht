<template>
    <div class="content addrCompare">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="节点名称">
                        <el-input v-model="form.node_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="产地名称">
                        <el-input v-model="form.addr" clearable></el-input>
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
                    <el-button v-if="editAllBtn == '批量修改'" type="primary" @click="addFun"> + 添加</el-button>
                    <el-button v-if="editAllBtn == '批量修改'" @click="downloadFun">导出</el-button>
                    <div class="submit" v-if="editAllBtn == '批量修改'">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button v-if="editAllBtn == '完成'" @click="cancelFun">取消</el-button>
                    <el-button type="primary" @click="allEditFun">{{editAllBtn}}</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" :style="editAllBtn == '批量修改' ? {'display': 'block'} : {'display': 'none'}">
                <el-table-column prop="before_code" label="产地编码"></el-table-column>
                <el-table-column prop="before_name" label="产地名称"></el-table-column>
                <el-table-column prop="userdefine_code" label="自定义编码"></el-table-column>
                <el-table-column prop="userdefine_name" label="自定义名称"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="tableData" :header-cell-style="rowClass" :style="editAllBtn == '批量修改' ? {'display': 'none'} : {'display': 'block'}">
                <el-table-column prop="before_code" label="产地编码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.before_code" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="before_name" label="产地名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.before_name" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column prop="userdefine_code" label="自定义编码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.userdefine_code" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="userdefine_name" label="自定义名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.userdefine_name" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row, scope.$index)">删除</el-button>
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
import {QueryNodeUserdefine, DeleteUserdefine, DownloadNodeUserdefine, BatchUpdateNodeUserdefine} from '../../js/compare/compare.js'
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
import {importNodeUserdefine} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"addrCompare",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_name: '',
                addr: '',
            },
            addrArr: [],
            loading: true,
            editAllBtn: '批量修改',
            editArr: [],
            file: '',
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
    },
    methods: {
        inputFun(ele){
            if(this.editArr.length == 0){
                this.editArr.push(ele)
            }else{
                this.editArr.forEach((val,index) => {
                    if(val.id == ele.id){
                        this.editArr.splice(index,1)
                    }
                })
                this.editArr.push(ele)
            }
        },
        // 批量编辑
        allEditFun(){
            if(this.editAllBtn == '批量修改'){
                this.editAllBtn = '完成'
            }else if(this.editAllBtn == '完成'){
                let arr = [], itemObj = {};
                if(this.editArr.length > 0){
                    this.editArr.forEach((val,index) => {
                        itemObj = {
                            id: val.id,
                            node_name: val.node_name,
                            node_id: val.node_id,
                            userdefine_code: val.userdefine_code,
                            userdefine_name: val.userdefine_name,
                            before_code: val.before_code,
                            before_name: val.before_name,
                            association_id: '',
                            userdefine_type: 4,
                            userdefine_code_one: '',
                            userdefine_code_two: '',
                            specifications: '',
                            janescreen_retrieve: '',
                            fullscreen_retrieve: '',
                            managing_mode: '',
                            brand: '',
                            supplier: '',
                            supplier_id: '',
                            ws_supplier_id: '',
                            ws_supplier: ''
                        }
                        arr.push(itemObj)
                    })
                    let obj = "{" + '"data"' + ":" + JSON.stringify(arr) + "}"
                    BatchUpdateNodeUserdefine(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success('修改成功');
                                this.editAllBtn = '批量修改'
                                this.editArr = []
                                this.getDataFun()
                            }else{
                                this.$message.error('修改失败');
                            }
                        })
                        .catch(res => {
                            this.loading = false
                            console.log(res)
                        })
                }else{
                    this.editAllBtn = '批量修改'
                    this.editArr = []
                    this.getDataFun()
                }
            }
        },
        cancelFun(){
            this.editAllBtn = '批量修改'
            this.editArr = []
            this.getDataFun()
        },
        downloadFun(){
            let params = {
                node_id: this.form.node_id, // 节点编码
                userdefine_code: '', // 自定义编码
                userdefine_name: '', // 自定义名称
                before_code: '', // 国标编码
                before_name: '', // 国标名称
                association_id: '', // 标签编码
                userdefine_type: 4, // 自定义类型1.商户对照2.节点对照3.商品对照4.产地对照
                level_id: '', // 商品分类
            }
            DownloadNodeUserdefine( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `产地对照` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        // 上传
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('node_userdefine', this.file);  
            formData.append('userdefine_type', 4);  
            formData.append('node_id', this.form.node_id); 
            formData.append('node_name', this.form.node_name); 
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
            let url = importNodeUserdefine
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                    this.file = ''
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addFun(){
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'NewAddrCompare'})
        },
        editFun(ele){
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'EditAddrCompare', params: ele})
        },
        deleteFun(ele, index){
            let str = 'id=' + ele.id
            DeleteUserdefine(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('删除成功');
                        this.page = 1
                        if(this.editAllBtn == '批量修改'){
                            this.getDataFun()
                        }else if(this.editAllBtn == '完成'){
                            this.tableData.splice(index,1)
                        }
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_id: this.form.node_id, // 节点编码
                userdefine_code: '', // 自定义编码
                userdefine_name: '', // 自定义名称
                before_code: '', // 国标编码
                before_name: this.form.addr, // 国标名称
                association_id: '', // 标签编码
                userdefine_type: 4, // 自定义类型1.商户对照2.节点对照3.商品对照4.产地对照
                level_id: '', // 商品分类
            }
            QueryNodeUserdefine(obj)
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
                addr: '',
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