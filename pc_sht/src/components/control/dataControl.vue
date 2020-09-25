<template>
    <div class="content jxsjMonitor">
        <div class="searchs" ref="searchs">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="节点信息">
                    <el-input v-model="form.node_name" style="width:230px" clearable placeholder="节点编码、节点名称" ></el-input>
                </el-form-item>
                <el-form-item label="无数据天数" style="margin-left:15px;">
                    <el-input class="placeholder" v-model="form.minNum" clearable></el-input>
                    - <el-input class="placeholder" v-model="form.maxNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="节点类型">
                    <el-select v-model="form.node_detail_type" placeholder="请选择" clearable style="width:230px"  @change="selectNode" >
                        <el-option v-for="(item,index) in nodeType" :key="index" :label="item.node_detail_type" :value="item.node_detail_type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属集团">
                    <el-select v-model="form.group_name" placeholder="请选择" clearable   style="width:230px">
                        <el-option v-for="(item,index) in groupName" :key="index" :label="item.group_name" :value="item.group_name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="信息类型">
                    <el-select v-model="form.info_type" multiple collapse-tags  placeholder="请选择" clearable  style="width:230px" @change="selectType" >
                        <el-option v-for="(item,index) in InfoType" :key="index" :label="item.info_type" :value="item.info_type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据来源">
                    <el-select v-model="form.data_collection_way" placeholder="请选择" clearable style="width:230px" >
                        <el-option v-for="(item,index) in dataWay" :key="index" :label="item.data_collection_way" :value="item.data_collection_way">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属大区">
                    <el-select v-model="form.district_name" placeholder="请选择" clearable style="width:230px" >
                        <el-option v-for="(item,index) in districtName" :key="index" :label="item.text" :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item>
                    <el-button type="primary" plain @click="searchFun" style="margin-left: 32px;">查询</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="table" v-loading.body="fullscreenLoading">
            <div class="title">
                <p class="tz-title">数据列表</p>
                <div><!--
                    <el-button type="primary" @click="addFun">+新建临时任务</el-button>-->
                    <el-button plain @click="downloadFun">导出</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass" @sort-change="sortChange">
                    <el-table-column prop="node_detail_type" label="节点类型"></el-table-column>
                    <el-table-column prop="node_id" label="节点编码"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"></el-table-column>
                    <el-table-column prop="info_type" label="信息类型"></el-table-column>
                    <el-table-column :sortable="'custom'" prop="date" label="最后上报日期" width="150px;"></el-table-column>
                    <el-table-column :sortable="'custom'" prop="days" label="无数据天数" ></el-table-column>
                    <el-table-column prop="data_collection_way" label="数据来源" ></el-table-column>
                    <el-table-column prop="group_name" label="所属集团" ></el-table-column>
                    <el-table-column prop="district_name" label="所属大区" ></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" :style="(scope.row.node_id && scope.row.data_collection_way == 'FTP上传') ? {display: 'inline-block'} : {display: 'none'}"  @click="handleResult1(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="handleResult(scope.row)">记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <div class="box" v-if="isShow">
            <div class="form1">
                <div class="title">
                    <p class="tit">查看记录</p>
                    <p class="iconfont close icon-close" @click="closeForm"></p>
                </div>
                <div class="container">
                    <div class="title_note">
                        <span>记录详情</span>
                        <el-button style="float:right;margin-top:-28px;margin-left:30px;" @click="addRecord" >+添加沟通记录</el-button>
                    </div>
                    <div class="no_data" v-if="recordList == ''" >
                        <p style="font-size:20px;line-height:300px;text-align:center;color:#ccc">暂无数据</p>
                    </div>
                    <div class="container_note" v-for="(item,index) in recordList" :key="index" v-else >
                        <p>{{item.record_time}}</p>
                        <span></span>
                        <div>
                        <div>{{item.content}}</div>
                            <img v-if="item.img_url != ''" style="height:50px;width:130px;margin-left:20px;margin-top:15px;" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                            <div v-else></div>
                        </div>
                    </div>
                </div>
                <div class="btn1">
                    <el-button type="primary" @click="closeBtn()">关闭</el-button>
                </div>
            </div>
        </div>
        <div class="box1" v-if="isShow1">
            <div class="form1">
                <div class="title">
                    <p class="tit">添加沟通记录</p>
                    <p class="iconfont close icon-close" @click="closeForm"></p>
                </div>
                <el-form  :inline="true" :model="form" label-width="120px" style="margin-top:10px;">
                    <el-form-item label="添加沟通记录：" style="width:100%">
                        <el-input type="textarea" style="width:300px;" :autosize="{ minRows: 2, maxRows: 3}"  
                            placeholder="请输入内容"  v-model="textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="添加图片" style="width:100%">
                        <div class="image-box">
                            <figure class="image" v-if="img_url">
                                <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + img_url">
                            </figure>
                            <div class="submit">
                                <div class="btn">
                                    <p class="icon-add">+</p>
                                    <p>添加图片</p>     
                                </div>
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file2" multiple accept="image/*" @change="fileFun($event,5)">
                                </form>
                            </div>  
                        </div>
                    </el-form-item>
                    <el-form-item style="position:absolute;right:20px;bottom:10px">
                        <el-button @click="closeForm">取消</el-button>
                        <el-button type="primary" @click="handlesubmit()">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="box2" v-if="isShow2">
            <div class="form1">
                <div class="title">
                    <p class="tit">查看</p>
                    <p class="iconfont close icon-close" @click="closeForm"></p>
                </div>
                <div class="table" v-loading.body="fullscreenLoading1">
                    <el-table :data="mon_list" :header-cell-style="rowClass" style="width:92%;margin:0 auto" >
                        <el-table-column prop="file_name" label="文件名称"></el-table-column>
                        <el-table-column prop="down_path" label="上传路径"></el-table-column>
                        <el-table-column prop="upload_time" label="最后有效上传时间"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {NotReportedMonitoring,InsertCommunicationRecord,QueryCommunicationRecord,QueryInfoType,QuerygroupName,QueryNodeDetailType,
    DownloadNotReportedMonitoring} from '../../js/nodeManage/nodeManage.js'
import axios from 'axios';
import {QueryUploadFilesByFtpId,DeleteAllErrorData} from '../../js/traceEquipment/traceEquipment.js'
import {insertCommunicationImg} from '../../js/address/url.js'
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
    name:"dataControl",
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            textarea:'',
            isShow1:false,
            isShow2:false,
            isShow:false,
            fullscreenLoading:true,
            fullscreenLoading1:true,
            form:{
                node_name:'',
                minNum:'',
                maxNum:'',
                info_type:'',
                group_name:'',
                node_detail_type:'包装菜企业',
                data_collection_way:'',
                district_name:''
            },
            currentPage: 1,
            cols: 10,
            total: 0,
            tableData: [],
            InfoType:[],
            groupName:[],
            nodeType:[],
            dataWay:[],
            districtName:[
                {id:"1",text:"东区"},
                {id:"2",text:"南区"},
                {id:"3",text:"北区"},
            ],
            info_type:'',
            node_id:'',
            img_url:'',
            recordList:[],
            data_way:true,
            mon_list:[],
            img_url1:'',
            getSort:'',
            oldOptions:[],
            count: 0,
            file: '',
        }
    },
    mounted() {
        this.NotReportedMonitoringFun()
        this.QueryInfoTypeFun()
        this.QueryNodeDetailTypeFun()
        this.QuerygroupNameFun1()
    },
    methods: {
        downloadFun(){
            let params = {
                group_name : this.form.group_name,
                district_name : this.form.district_name,
                node_id:this.form.node_name,
                start_day:this.form.minNum,
                end_day:this.form.maxNum,
                info_type:this.form.info_type.toString(),
                node_detail_type:this.form.node_detail_type,
                data_collection_way:this.form.data_collection_way
            }
            DownloadNotReportedMonitoring( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `连续未上报监控` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        fileFun(event){
            var that = this;
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('img_url', this.file);   
            formData.append('node_id', that.node_id);  
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
            const url = insertCommunicationImg
            ajaxPost(url,formData,config)
                .then(res => {
                    this.img_url = res.data.img
                    that.file = null
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectNode(val){
            this.form.group_name = ''
            this.QuerygroupNameFun(val)
        },
         selectType(val){
            this.QueryNodeDetailTypeFun(val)
         },
         QueryNodeDetailTypeFun(val){  //可多选
            let params = {
                info_type:this.form.info_type.toString()
            }
            QueryNodeDetailType(params)
                .then(res => {
                    this.nodeType = res.data.nodeDetailTypeList;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        QuerygroupNameFun(val){
            let params = {
                "node_detail_type":val
            }
            QuerygroupName(params)
                .then(res => {
                    this.groupName = res.data.groupNameList;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        QuerygroupNameFun1(){
            this.fullscreenLoading = true;
            let params = {
                "node_detail_type":'包装菜企业'
            }
            QuerygroupName(params)
                .then(res => {
                    this.fullscreenLoading = false;
                    this.groupName = res.data.groupNameList;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        sortChange(column){
            var fieldName = column.prop;
            var sortingType = column.order;
            if(fieldName == "date"){
                if(sortingType == 'descending'){
                    this.fullscreenLoading = true;
                    this.getSort="按最后上报日期倒叙"
                    this.NotReportedMonitoringFun()
                }else{
                    this.fullscreenLoading = true;
                    this.getSort="按最后上报日期正序"
                    this.NotReportedMonitoringFun()
                }
            }
            if(fieldName=="days"){
                if(sortingType == 'descending'){
                    this.fullscreenLoading = true;
                    this.getSort="按天数倒叙"
                    this.NotReportedMonitoringFun()
                }else{
                    this.fullscreenLoading = true;
                    this.getSort="按天数正序"
                    this.NotReportedMonitoringFun()
                }
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file;
            this.dialogVisible = true;
        },
        handlesubmit(){
            let formData = new FormData()
            formData.append('img_url',this.img_url)
            formData.append('content',this.textarea)
            formData.append('node_id',this.node_id)
            formData.append('info_type',this.info_type)
            InsertCommunicationRecord(formData)
                .then(res => {
                    this.$message({
                        message: '添加沟通记录成功',
                        type: 'success'
                    });
                    this.textarea = ''
                    this.img_url = ''
                })
                .catch(res => {
                    this.$message({
                        message: '添加沟通记录失败',
                        type: 'warning'
                    });
                })
                this.isShow1 =false;
        },
        handleSuccess(response, file, fileList){
            this.$message({message: '上传成功',type: 'error'});
            this.img_url1 = file;
        },
        handleRemove(file, fileList) {  //移除图片
            this.$message({message: '移除成功',type: 'error'});
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择1个文件，请删除后继续上传`)
        },
        addRecord(){
            this.isShow1 = true;
            this.isShow = false;
        },
        closeForm(){
            this.isShow = false;
            this.isShow1 = false;
            this.isShow2 = false;
        },
        closeBtn(){
            this.isShow = false;
            this.isShow1 = false;
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
         handleSizeChange(val) {   //每页
            this.cols = val;
            this.fullscreenLoading = true;
            this.NotReportedMonitoringFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.fullscreenLoading = true;
            this.NotReportedMonitoringFun()
        },
        searchFun(){
            this.fullscreenLoading = true;
            this.currentPage = 1;
            this.NotReportedMonitoringFun()
        },
        clearFun(){  // 清楚筛选条件
            this.form.group_name = ''
            this.form.district_name = ''
            this.form.node_name = ''
            this.form.minNum = ''
            this.form.maxNum = ''
            this.form.info_type = ''
            this.form.node_detail_type = ''
            this.form.data_collection_way = ''
            this.currentPage = 1;
            this.cols = 10 ;
            this.fullscreenLoading = true;
            this.QueryNodeDetailTypeFun()
            this.QuerygroupNameFun()
            this.NotReportedMonitoringFun()
        },
        handleResult1(row){
            this.fullscreenLoading1 = true;
            let params = {
                node_id:row.node_id
            }
            QueryUploadFilesByFtpId(params)
                .then(res => {
                    this.fullscreenLoading1 = false;
                    this.mon_list = res.data.mon_list;
                })
                .catch(error => {
                    console.log(error)
                })
            this.isShow2 = true;
        },
        handleResult(row){  // 编辑
            this.node_id = row.node_id
            this.info_type = row.info_type
            let params = {
                node_id:row.node_id,
                info_type:row.info_type
            }
            QueryCommunicationRecord(params)
                .then(res => {
                    this.recordList = res.data.dataList;
                })
                .catch(error => {
                    console.log(error)
                })
            this.isShow = true;
        },
        NotReportedMonitoringFun(){ // 表格数据
            let params = {
                page : this.currentPage,
                cols : this.cols,
                sort:this.getSort,
                group_name : this.form.group_name,
                district_name : this.form.district_name,
                node_id:this.form.node_name,
                start_day:this.form.minNum,
                end_day:this.form.maxNum,
                info_type:this.form.info_type.toString(),
                node_detail_type:this.form.node_detail_type,
                data_collection_way:this.form.data_collection_way
            }
            NotReportedMonitoring(params)
                .then(res => {
                    this.fullscreenLoading = false;
                    this.tableData = res.data.dataList;
                    this.total  = res.data.condition.total;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        QueryInfoTypeFun(){ //条件筛选
            let params = {
                info_type:'',
                district_name:'',
                group_name:'',
                data_collection_way:'',
                node_detail_type:''
            }
            QueryInfoType(params)
                .then(res => {
                    this.InfoType = res.data.infoTypeList;
                    this.dataWay = res.data.dataCollectionWayList;
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }    
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .image-box{
            display: flex;
            .image{
                margin: 5px 10px;
                width: 80px;
                height: 80px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .submit{  
                position: relative;
                top: 50%;
                display: inline-block;
                margin-bottom: -12px;
                width: 90px;
                height: 30px;
                line-height: 30px;
                color: #ccc;
                background: #fff;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px dashed #ccc;
                .btn{
                    display: flex;
                    p{
                        line-height: 30px;
                    }
                    .icon-add{ 
                        margin-left: 4px;
                        margin-top: -2px;
                        font-size: 26px;
                    }
                }
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
        .table-btn{
            margin: 0 5px;
            float: left;
            cursor: pointer;
            font-size: 14px;
        }
        .searchs{
            width:100%;
            padding: 10px 0;
            background: #fff;
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
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
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
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        .placeholder{
            width: 100px !important;
        }
        .box{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .container{
                width: 100%;
                height:350px;
                overflow:hidden;
                overflow-y:auto;
                .title_note{
                    height: 45px;
                    width: 85%;
                    margin: 0 auto;
                    border-bottom: 1px solid #ccc;
                    span{
                        font-size: 14px;
                        color: #ccc;
                        padding-top: 17px;
                        display: block;
                    }
                }
                .container_note{
                    height:100px;
                    width:100%;
                    // position:absolute;
                    p{
                        padding-top:20px;
                        margin-left:40px;
                        width:100px;
                        height:80px;
                        float:left;
                        margin-right:20px;
                        border-right:1px solid #ccc;
                        font-size:14px;
                    }
                    span{
                        position:relative;
                        left:130px;
                        top:27px;
                        width:20px;
                        height:20px;
                        display:block;
                        border-radius:50%;
                        background-color:#fff;
                        border:1px solid #ccc;
                        z-index:10;
                    }
                    div{
                        // padding-top:0;
                        // height:80px;
                        font-size:14px;
                    }
                }
                
            }
            .btn1{
                    text-align:center;
                    height:50px;
                    line-height:40px;
                }
            .form1{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -250px;
                margin-left: -250px;
                width: 500px;
                height: 450px;
                background: #fff;
                .title{
                    display: flex;
                    margin: 0 20px;
                    height: 50px;
                    border-bottom: 1px solid #ccc;
                    line-height: 50px;
                    .tit{
                        flex: 1;
                        font-size: 14px;
                    }
                    .close{
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }
        .box1{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .container{
                // position:absolute;
                padding:15px;
                span{
                    position: relative;
                    bottom: 32px;
                    left: 10px; 
                    font-size: 14px;
                }
            }
            .el-icon-plus{
                position: relative;
                bottom: 45px;
            }
            .upload{
                width: 90%;
                margin-left: 25px;
                min-height:100px;
            }
            .btn1{
                position: absolute;
                bottom: 15px;
                right: 55px;
            }
            .form1{
                overflow: hidden;
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -120px;
                margin-left: -250px;
                height:250px;
                width: 500px;
                // height: 300px;
                background: #fff;
                .title{
                    display: flex;
                    margin: 0 20px;
                    height: 50px;
                    border-bottom: 1px solid #ccc;
                    line-height: 50px;
                    .tit{
                        flex: 1;
                        font-size: 14px;
                    }
                    .close{
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }
        .box2{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .form1{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -250px;
                margin-left: -290px;
                height:500px;
                width: 580px;
                background: #fff;
                .title{
                    display: flex;
                    margin: 0 20px;
                    height: 50px;
                    border-bottom: 1px solid #ccc;
                    line-height: 50px;
                    .tit{
                        flex: 1;
                        font-size: 14px;
                    }
                    .close{
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .table{
                    height: 500px;
                    overflow:hidden;
                    overflow-y:auto;
                }
            }
            .el-table{
                 overflow:hidden;
                 overflow-y:auto;
            }
        }
        .disabled .el-upload--picture-card {
            display: none;
        }
    }
    
</style>
<style lang="less">
.el-upload--picture-card{
    height: 60px !important;
    width: 60px !important;
}
.el-upload-list--picture-card .el-upload-list__item{
    height: 60px !important;
    width: 60px !important;
}
.el-table__body .el-table__row{
    height: 40px;
    line-height: 40px;
}
</style>
