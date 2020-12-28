<template>
    <div class="content">
        <div class="search">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="节点信息：">
                    <el-input v-model="form.input" placeholder="节点编码、节点名称" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="企业类型：">
                    <el-select v-model="form.type" placeholder="请选择" clearable @change="selectType" style="width:230px" >
                        <el-option v-for="item in options" :key="item.text" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="form.icon" placeholder="请选择" clearable  @change="selectStatus" style="width:230px" >
                        <el-option v-for="item in status" :key="item.text" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="白名单：">
                    <el-select v-model="form.list" placeholder="请选择"  @change="selectList" style="width:220px" >
                            <el-option v-for="item in list" :key="item.text" :label="item.text" :value="item.id">
                            </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button class="btn" type="primary" @click="handleBtn">搜索</el-button>
                    <!-- <el-button>导出</el-button> -->
                    <span class="clear-content" @click="clearFun">清空筛选条件</span>
                </el-form-item>    
            </el-form>
        </div>
        <div class="tables" v-loading="fullscreenLoading">
            <div class="title">
                <p class="tz-title">数据列表</p>
                <div>
                    <el-button class="btn_data"  type="primary" @click="addnodeManage()">+添加</el-button> <!-- -->
                    <el-button class="btn_data" type="primary" plain @click="getDownloadNodeInfoFun">导出</el-button>
                    <span class="submit">
                        导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form>
                    </span>
                </div>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass" >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="node_id" label="节点编码"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"></el-table-column>
                    <el-table-column prop="type" label="企业类型"> 
                        <template slot-scope="{row: {type}}">
                            <span v-if="+type == '0001'">屠宰厂</span>
                            <span v-else-if="+type == '0002'">批发市场</span>
                            <span v-else-if="+type == '0002'">批发市场</span>
                            <span v-else-if="+type == '0003'">零售市场</span>
                            <span v-else-if="+type == '0004'">超市</span>
                            <span v-else-if="+type == '0007'">团体</span>
                        </template>    
                    </el-table-column>
                    <el-table-column prop="legal_represent" label="法人代表"></el-table-column>
                    <el-table-column prop="tel" label="联系电话"></el-table-column>
                    <el-table-column prop="addr" label="地址"></el-table-column>
                    <el-table-column prop="record_date" label="备案时间" width="160"></el-table-column>
                    <el-table-column prop="icon" label="状态" width="160">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.icon" active-text="开启" inactive-text="关闭" 
                                active-value="1" inactive-value="2" @change="changeFun(scope.row)">
                            </el-switch>
                        </template>    
                    </el-table-column>
                    <!-- <el-table-column prop="" label="监控白名单"> </el-table-column> -->
                    <el-table-column label="操作" width="70">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                    :total='total'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryNodeTypeInfoForType,QueryTraceabilityType,QuerySourceWay,QueryProvinceToSelect,GetCode,UpdateNodeState,UpdateBasicInfo,
GetNodeInfo,InsertBasicInfo,ToBasicUpdate,DownloadNodeInfo} from '../../js/nodeManage/nodeManage.js'
import {baseUrl4} from '../../js/address/url.js'
import axios from 'axios';
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
    name:"district",
    data() {
        return {
            fileMsg:'',
            file:'',
            fullscreenLoading:true,
            tableData:[],
            form:{
                input:'',
                type:'',
                status:'',
                list:'',
                icon:'',
            },
            companyType:'',
            statusType:'',
            listType:'',
            currentPage:1,
            total:0,
            cols:10,
            status:[
                {id:'1',text:'开启'},
                {id:'2',text:'关闭'}
            ],
            list:[],
            options:[],
            node_id:'',
            state:'',
        }
    },
    mounted() {
        this.getQueryNodeTypeInfoForType();
        this.GetNodeInfoFun()
    },
    methods: {
        changeFun(ele){
            let obj = 'node_id='+ele.node_id
            UpdateNodeState(obj)
                .then((res)=>{
                    this.$message.success(res.message);
                })
                .catch(res => {
                   this.$message.error(res.message);
                })
        },
        addnodeManage(){
            this.$router.push({name:"AddnodeManage"})
        },
        handleEdit(row){
            let params = {
                node_id : row.node_id,
                node_name : row.node_name
            }
            ToBasicUpdate(params)
                .then(res => {
                    this.$router.push({name:"AddnodeManage",params:res})
                })
                .catch(error => {
                    console.log(error)
                })
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.GetNodeInfoFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.GetNodeInfoFun()
        },
        handleBtn(){  //点击搜索
            this.fullscreenLoading = true;
            this.currentPage = 1;
            this.GetNodeInfoFun()
        },
        selectType(val){  //选择企业类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.companyType = ele.id
                    }
                })
            }else{
                this.companyType = ''
            }
        },
        selectStatus(val){ //选择状态
            if(val){
                this.status.forEach(ele => {
                    if(val == ele.id){
                        this.statusType = ele.id
                    }
                })
            }else{
                this.statusType = ''
            }
        },
        selectList(val){
            if(val){
                this.status.forEach(ele => {
                    if(val == ele.id){
                        this.listType = ele.id
                    }
                })
            }else{
                this.statusType = ''
            }
        },
        clearFun(){ //清楚筛选条件
            this.form.input = ''
            this.form.type = ''
            // this.form.status = ''
            this.form.icon = ''
            this.currentPage = 1
            this.statusType = ''
            this.companyType = ''
            this.fullscreenLoading = true;
            this.GetNodeInfoFun()
        },
        getQueryNodeTypeInfoForType(){  //企业类型
            QueryNodeTypeInfoForType()
            .then(res => {
                this.options = res.data.dataList;
            })
            .catch(res => {
                console.log(res)
            })
        },
        GetNodeInfoFun(){  //查询所有节点
            let params = {
                page: this.currentPage,
                cols:this.cols,
                icon: this.statusType,
                node_id:this.form.input,
                type:this.companyType
            }
            GetNodeInfo(params)
            .then(res => {
                this.fullscreenLoading = false;
                this.tableData = res.data.dataList;
                this.total = res.data.condition.total;
            })
            .catch(res => {
                console.log(res)
            })
        },
        getDownloadNodeInfoFun(){
            this.fullscreenLoading = true;
            let params = {
                icon: this.form.icon,
                node_id:this.form.input,
                type:this.form.type
            }
            DownloadNodeInfo(params,{})
                .then(res => {
                    let time = getNowFormatDate()
                    this.fullscreenLoading = false;
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `节点` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {})
        },
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('nodeInfo', this.file);
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
            let url = baseUrl4 + 'warning/importNodeInfo'
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.currentPage = 1
                        this.GetNodeInfoFun()
                    }else{
                        this.$message.error(res.message);
                    }
                    this.file = ''
                    document.getElementById('upload').reset();
                })
                .catch(res => {
                    console.log(res)
                })
        },
    },
    components:{
    }
}
</script>

<style scoped lang='less'>
.content{
    width: 100%;
    height: 100%;
    .search{
        width: 100%;
        padding: 10px 0;
        background: #fff;
        span{
            font-size: 14px;
        }
        .data_name{
            margin-left: 40px;
        }
        .btn{
            margin-left: 20px;
        }
        .clear-content{
            margin-left: 10px;
            cursor: pointer;
            color: #999999;
            font-size: 14px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }
   
    .tables{
        margin-top: 10px;
        width: 100%;
        background: #fff;
        .title{
            padding-top: 8px;
            padding-bottom: 8px;
            padding-left: 10px;
            .tz-title{
                flex: 1;
                height: 20px;
                font-size: 14px;
                padding-left: 4px;
                line-height: 20px;
                box-sizing: border-box;
                border-left: 2px solid #409EFF;
                float:left;
            }
            .btn_data{
                float:right;
                margin-bottom:5px;
                margin-right:10px
            }
            .submit{
                float: right;
                position: relative;
                top: 0;
                display: inline-block;
                margin: 0 10px;
                width: 50px;
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
        .table-box{
            margin-top: 10px;
            padding: 10px;
        }
        .pagination{
            padding-top: 10px;
            text-align: center;
        }
    }
    .el-switch__label *{
        font-size: 12px !important;
    }
}   
</style>
<style lang="less">
    .el-form--inline .el-form-item__content{
        vertical-align: middle !important;
    }
    .el-switch__core{
        width: 56px !important;
    }
    .el-switch__label--left{
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
    }
    .el-switch__label--right{
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
    }
    .el-switch__label.is-active{
    z-index: 1111;
    color: #fff;
    }

    .el-switch__label--left{
    position: relative;
    left: 59px;
    color: #fff;
    z-index: -1111;
    }
    .el-switch__label--right{
    position: relative;
    right: 59px;
    color: #fff;
    z-index: -1111;
    }
    .el-switch__label--right.is-active{
    z-index: 1111;
    color: #fff !important;
    }
    .el-switch__label--left.is-active{
    z-index: 1111;
    color: #9c9c9c !important;
    }
</style>