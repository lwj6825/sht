<template>
    <div class="content">
        <div class="search">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="起始日期：">
                    <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                        type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="物品编码：">
                    <el-input v-model="form.goodCode" clearable placeholder="请输入物品编码" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：">
                    <el-select class="label-width" v-model="form.companyName" filterable clearable allow-create placeholder="请选择" style="width:230px">
                        <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.text" :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经营模式：">
                    <el-input v-model="form.model" clearable placeholder="请输入经营模式" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="品牌：">
                    <el-input v-model="form.brand" clearable placeholder="请输入品牌" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="供货来源：">
                    <el-input v-model="form.sources" clearable clearable placeholder="请输入供货来源" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="商品分类：">
                    <el-input v-model="form.product" clearable placeholder="请输入商品分类" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="标签编码：">
                    <el-input v-model="form.labelCode" clearable placeholder="请输入标签编码" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item label="标签名称：">
                    <el-input v-model="form.labelName" clearable placeholder="请输入标签名称" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="handleBtn">搜索</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span>
                </el-form-item>    
            </el-form>
        </div>
        <div class="tables" v-loading="fullscreenLoading">
            <div class="title">
                <p class="tz-title">物品码管理</p>
                <div>
                    <el-button class="btn_data"  type="primary" @click="addnodeManage()">+添加</el-button>
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
                    <el-table-column prop="node_name" label="企业名称"></el-table-column>
                    <el-table-column prop="traceability_code" label="物品编码"></el-table-column>
                    <el-table-column prop="traceability_name" label="物品名称"></el-table-column>
                    <el-table-column prop="association_id" label="标签编码"></el-table-column>
                    <el-table-column prop="brand" label="品牌"></el-table-column>
                    <el-table-column prop="supplier" label="供货来源"></el-table-column>
                    <el-table-column prop="association_name" label="标签名称"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column prop="info_update_time" label="日期"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="cols" layout="total, prev, pager, next, jumper" :total='total'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryTraceabilityCode, DeleteTraceabilityCode, DownloadTraceabilityCode, QueryNodeSelect} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
import {baseUrl4} from '../../js/address/url.js'
import axios from 'axios';
// 时间戳转日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // var h = date.getHours() + ':';
    // var m = date.getMinutes() + ':';
    // var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
// 标准时间转日期格式
function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
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
                dataTime: '',
                goodCode:'',
                companyName:'',
                model:'',
                brand:'',
                sources:'',
                product:'',
                labelCode:'',
                labelName:'',
            },
            currentPage:1,
            total: 0,
            cols: 15,
            options:[],
            node_id:'',
            startTime: '',
            endTime: '',
            nodeArr: '',
        }
    },
    mounted() {
        this.GetNodeInfoFun()
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getQueryNodeSelect()
    },
    methods: {
        // 企业名称
        getQueryNodeSelect(){
            let str = ''
            QueryNodeSelect(str)
                .then(res => {
                    this.nodeArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 跳转添加页
        addnodeManage(){
            this.$router.push({name:"AdditemCode"})
        },
        //编辑
        handleEdit(row){
            this.$router.push({name:"AdditemCode", params: row})
        },
        //删除
        handleDelete(row){
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {             
                let params = {
                    id:row.id
                }
                DeleteTraceabilityCode(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success('删除成功');
                            this.currentPage = 1
                            this.GetNodeInfoFun()
                        }else{
                            this.$message.error('删除失败');
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        rowClass({ row, rowIndex}) { 
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.GetNodeInfoFun()
        },
        handleBtn(){  //点击搜索
            this.currentPage = 1
            this.GetNodeInfoFun()
        },
        clearFun(){ //清楚筛选条件
            this.form = {
                dataTime: '',
                goodCode: '',
                companyName: '',
                model: '',
                brand: '',
                sources: '',
                product: '',
                labelCode: '',
                labelName: '',
            }
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.currentPage = 1
            this.GetNodeInfoFun()
        },
        // 表格数据
        GetNodeInfoFun(){ 
            this.fullscreenLoading = true;
            let params = {
                page: this.currentPage,
                cols: this.cols,
                start_date: this.startTime, // 开始时间
                end_date: this.endTime, // 结束时间
                traceability_code: this.form.goodCode, // 物品编码
                node_name: this.form.companyName, // 企业名称
                managing_mode:this.form.model, // 经营模式
                brand: this.form.brand, // 品牌
                supplier: this.form.sources, // 供货来源       
                goods_type: this.form.product, // 商品分类
                association_name:this.form.labelName, // 标签名称
                association_id: this.form.labelCode, // 标签编码
            }
            QueryTraceabilityCode(params)
                .then(res => {
                    this.fullscreenLoading = false;
                    this.tableData = res.data.dataList;
                    this.total = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        //导出
        getDownloadNodeInfoFun(){
            this.fullscreenLoading = true;
            let params = {
                start_date: this.startTime, // 开始时间
                end_date: this.endTime, // 结束时间
                traceability_code: this.form.goodCode, // 物品编码
                node_name: this.form.companyName, // 企业名称
                managing_mode:this.form.model, // 经营模式
                brand: this.form.brand, // 品牌
                supplier: this.form.sources, // 供货来源       
                goods_type: this.form.product, // 商品分类
                association_name:this.form.labelName, // 标签名称
                association_id: this.form.labelCode, // 标签编码
            }
            DownloadTraceabilityCode(params,{})
                .then(res => {
                    let time = getNowFormatDate()
                    this.fullscreenLoading = false;
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `物品码` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {})
        },
        //导入
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('traceabilityCode', this.file);
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
            let url = baseUrl4 + 'warning/importTraceabilityCode'
            ajaxPost(url,formData,config)
            .then(res => {
                if (res.result == true) {
                    this.$message.success('导入成功');
                    this.currentPage = 1
                    this.GetNodeInfoFun()
                }else{
                    this.$message.error(res.message);
                }
                this.file = null
            })
            .catch(res => {
                console.log(res)
                this.$message.error("出错了");
            })
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime()
            }
        },
        getTime(){
            var start = new Date();
            // var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = formatDate(start)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
    },
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
.el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
    line-height: 24px;
}
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