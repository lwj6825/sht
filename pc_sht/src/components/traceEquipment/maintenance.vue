<template>
    <div class="content maintenance">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="资产类型">
                        <el-cascader style="width: 200px"
                        :options="options" filterable clearable @change="zcTypeFun" @focus="selectFun"
                        change-on-select placeholder="请选择"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="资产信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入资产名称、条码号"></el-input>
                    </el-form-item>
                    <el-form-item label="维修人">
                        <el-select v-model="form.wxr" filterable clearable placeholder="请选择">
                            <el-option v-for="item in xjrArr" :key="item.USERID" :label="item.NAME"
                            :value="item.USERID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="维修时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="维修结果">
                        <el-select v-model="form.wxjg" filterable clearable placeholder="请选择">
                            <el-option label="已完成" value="0"></el-option>
                            <el-option label="未完成" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属节点">
                        <el-select v-model="form.node" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_NAME"
                            :value="item.NODE_ID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属商户">
                        <el-input v-model="form.user" clearable placeholder="请输入商户"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" plain style="margin-left: 10px;">查询</el-button>
                        <!--<el-button plain @click="clearFun">重置</el-button>-->
                        <span @click="clearFun" class="clear-content">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="资产类型">
                        <el-cascader style="width: 200px" clearable
                        :options="options" filterable @change="zcTypeFun" @focus="selectFun"
                        change-on-select placeholder="请选择"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="资产信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入资产名称、条码号"></el-input>
                    </el-form-item>
                    <el-form-item label="维修人">
                        <el-select v-model="form.wxr" filterable clearable placeholder="请选择">
                            <el-option v-for="item in xjrArr" :key="item.USERID" :label="item.NAME"
                            :value="item.USERID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" plain style="margin-left: 10px;">查询</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                        <!-- style="margin-left: 10px;width: 300px;"<el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <el-button plain @click="clearFun">重置</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>-->
                    </el-form-item>
                </el-form>
                <p class="unfold" v-if="isShow" @click="unfoldFun">{{unfold}}筛选条件</p>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">任务列表</p>
                <div>
                    <!--<el-button type="primary" @click="newFun">新增</el-button>
                    <span class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form>
                    </span>
                    <el-button type="primary" plain @click="getDownloadMaintain">导出</el-button>
                --></div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="assets_name" label="资产名称"> </el-table-column>
                    <el-table-column prop="bar_code" label="条码号"> </el-table-column>
                    <el-table-column prop="cause" label="设备问题"> </el-table-column>
                    <el-table-column prop="change_unit" label="更换部件">
                        <template slot-scope="scope">
                            <p>{{scope.row.change_unit ? scope.row.change_unit : '无'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="m_result" label="维修结果">
                        <template slot-scope="scope">{{scope.row.m_result == 0 ? '已完成' : '未完成'}}</template> 
                    </el-table-column>
                    <el-table-column prop="m_time" label="维修时间" width="160">
                        <template slot-scope="scope">{{scope.row.m_time.substring(0,16)}}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="维修人"> </el-table-column>
                    <el-table-column prop="node_name" label="所属节点" > </el-table-column>
                    <el-table-column prop="merchant_name" label="所属商户" >
                        <template slot-scope="scope">{{scope.row.merchant_name ? scope.row.merchant_name : '- - -'}}</template> 
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
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
import {importMaintain} from '../../js/address/url.js'
import axios from 'axios';
import {QueryAssetsUser,QueryAssetsConf,QueryAssetsType,QueryNodeBase,QueryInspect,QueryMaintain,DownloadMaintain} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"maintenance",
    data() {
        return {
            buyerName: '',
            startTime: '',
            endTime: '',
            isShow: true,
            form: {
                msg: '',
                types: '',
                wxr: '',
                wxjg: '',
                node: '',
                user: '',
                dataTime: '',
            },
            unfold: '收起',
            show: true,
            inline: true,
            // options: [],
            page: 1,
            cols: 15,
            num: 0,
            userId: '',
            total: '',
            areaId: '', // 大区的shop_booth_id
            bigAreaId: '', // 大区userId
            tableData: [],
            options: [],
            zcState: [],
            ssqArr: [],
            nodeArr: [],
            xjrArr: [],
            userId: '',
            file: '',
        }
    },
    mounted() {
        this.getQueryNodeBase()
        this.getQueryAssetsType()
        this.getQueryAssetsConf()
        this.getQueryAssetsUser()
        this.getDataFun()
        this.userId = localStorage.getItem('userId')
    },
    methods: {
        selectFun(){
            if(!this.options.length > 0){
                this.getQueryAssetsType()
            }
        },
        fileFun(event){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let that = this
            // if(param.type == 'application/vnd.ms-excel'){
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('importMaintain', this.file);  
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
            let url = importMaintain + '?userid=' + this.userId
            ajaxPost(url,formData,config)
                .then(res => {
                    console.log(res)
                    let data = res.message.split('!,')
                    let newDatas = [];
                    const h = this.$createElement;
                    for(let i in data){
                        newDatas.push(h('p',null,data[i]));
                    };
                    if (res.result == true) {
                        this.$message({
                            message: h('div',null, newDatas),
                            type: 'success',
                            duration: 5000,
                        });
                        this.getDataFun()
                    }else{
                         this.$message({
                            message: h('div',null, newDatas),
                            type: 'error',
                            duration: 5000,
                        });
                    }
                    that.$refs.file.value = null
                    that.file = ''
                    loading.close();
                })
                .catch(res => {
                    console.log(res)
                    loading.close();
                })
                    
            // }else{
            //     this.$message.error('请选择正确的文件格式，文件格式为xls');
            // }

        },
        getDownloadMaintain(){ 
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                assets_name: this.form.msg.trim(),
                node_code: this.form.node, // 关联节点信息 --
                start_time: this.startTime ? (this.startTime + ' 00:00:00') : '',
                end_time: this.endTime ? (this.endTime + ' 23:59:59') : '',
                assets_type_id: this.form.types, // 资产类型 -- 
                a_conf_id: this.form.state, // 资产状态 -- 
                merchant_name: this.form.user.trim(),// 关联商户信息
                creater: this.form.wxr, // 维修人
                m_result: this.form.wxjg, // 维修结果(0:维修完毕，1:未完成)
            }
            DownloadMaintain(params, {})
                .then((res) => {
                    let time = getNowFormatDate()
            //         let blob = new Blob([res.data], {type: "application/vnd.ms-excel"}); 
            // 　      let objectUrl = URL.createObjectURL(blob); 
            //         window.location.href = objectUrl;  
                    loading.close();
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `维修` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        zcTypeFun(ele){
            this.form.types = ele[ele.length - 1]
        },
        // 查询 资产状态、所属期 等查询条件下拉框
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    // console.log(res)
                    this.zcState = res.data[1]
                    // this.ssqArr = res.data[3]
            // 1:状态，2:维修更换部件,3:所属期)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 资产类型树
        getQueryAssetsType(){
            QueryAssetsType('')
                .then(res => {
                    res.data.assetsType.forEach(val => {
                        val.value = val.assets_type_id
                        val.label = val.assets_type
                        if(val.child_list.length > 0){
                            val.children = val.child_list
                            val.child_list.forEach(val =>{
                                val.value = val.assets_type_id
                                val.label = val.assets_type
                            })
                        }
                    })
                    this.options = res.data.assetsType
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有节点
        getQueryNodeBase(){
            QueryNodeBase('')
                .then(res => {
                    // console.log(res)
                    this.nodeArr = res.data.nodeBase
                })
                .catch(res => {
                    console.log(res);
                })
        },
        getQueryAssetsUser(){
            QueryAssetsUser('')
                .then(res => {
                    // console.log(res)
                    this.xjrArr = res.data.assets_user
                })
                .catch(res => {
                    console.log(res);
                })
        },
        getDataFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let obj = {
                assets_name: this.form.msg.trim(),
                node_code: this.form.node, // 关联节点信息 --
                start_time: this.startTime ? (this.startTime + ' 00:00:00') : '',
                end_time: this.endTime ? (this.endTime + ' 23:59:59') : '',
                assets_type_id: this.form.types, // 资产类型 -- 
                a_conf_id: this.form.state, // 资产状态 -- 
                merchant_name: this.form.user.trim(),// 关联商户信息
                creater: this.form.wxr, // 维修人
                m_result: this.form.wxjg, // 维修结果(0:维修完毕，1:未完成)
                cols: this.cols,
                page: this.page,
            }
            QueryMaintain(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                    loading.close();
                })
                .catch(res => {
                    console.log(res);
                    loading.close();
                })
        },
        viewFun(ele){
            this.$router.push({name: 'ViewMaintenance',params: ele})
        },
        newFun(){
            this.$router.push({name: 'NewMaintenance'})
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        unfoldFun(){
            if(this.show == false){
                this.show = true
                this.unfold = '收起'
            }else{
                this.show = false
                this.unfold = '展开'
            }
        },
        clearFun(){
            this.form = {
                msg: '',
                types: '',
                wxr: '',
                wxjg: '',
                node: '',
                user: '',
                dataTime: '',
            }
            this.startTime = ''
            this.endTime = ''
            this.page = 1
            this.form.types = ''
            this.options = []
            this.getDataFun()
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.startTime = ''
                this.endTime = ''
            }
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
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
                .el-input,.el-date-picker,.el-select{
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
            position: relative;
            background: #fff;
            .import{
                color: #409EFF;
                background: #fff;
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
                    .submit{
                        margin: 0 10px;
                        position: relative;
                        display: inline-block;
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
                            height: 36px;
                            opacity: 0;
                            background: rgba(0,0,0,0);
                        }
                    }
                    .submit:hover{
                        background: #409EFF;
                        color: #fff;
                    }
                }
            }
            .active{
                text-decoration: underline;
                color: #c1c1c1;
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .maintenance{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
    .el-message--error{
        color: #f56c6c !important;
        font-size: 14px !important;
    }
    .el-message--success{
        color: #67c23a !important;
        font-size: 14px !important;
    }
</style>

