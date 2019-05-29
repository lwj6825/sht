<template>
    <div class="content inspection">
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="资产信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入资产名称、条码号"></el-input>
                    </el-form-item>
                    <el-form-item label="巡检时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange"  @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="巡检状态">
                        <el-select v-model="form.stateXj" clearable placeholder="请选择">
                            <el-option label="未巡检" value="0"></el-option>
                            <el-option label="已巡检" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="巡检人">
                        <el-select v-model="form.xjr" filterable clearable  placeholder="请选择">
                            <el-option v-for="item in xjrArr" :key="item.USERID" :label="item.NAME"
                            :value="item.USERID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资产类型">
                        <el-cascader style="width: 200px" clearable
                        :options="options" filterable @change="zcTypeFun" @focus="selectFun"
                        change-on-select placeholder="请选择"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="资产状态">
                        <el-select v-model="form.state" filterable clearable placeholder="请选择">
                            <el-option v-for="item in zcState" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
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
                        <el-button type="primary" plain @click="searchFun" style="margin-left: 10px;">查询</el-button>
                        <!--<el-button plain @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="资产信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入资产名称、条码号"></el-input>
                    </el-form-item>
                    <el-form-item label="巡检时间" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="巡检状态">
                        <el-select v-model="form.stateXj" clearable placeholder="请选择">
                            <el-option label="未巡检" value="0"></el-option>
                            <el-option label="已巡检" value="1"></el-option>
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
                    
                    <el-button type="primary" plain @click="getDownloadInspect">导出</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="assets_name" label="资产名称"> </el-table-column>
                    <el-table-column prop="assets_type" label="资产类型"> </el-table-column>
                    <el-table-column prop="bar_code" label="条码号"> </el-table-column>
                    <el-table-column prop="serial_num" label="序列号"> </el-table-column>
                    <el-table-column prop="a_conf_item" label="资产状态"> </el-table-column>
                    <el-table-column prop="record_time" label="巡检时间" width="160">
                        <template slot-scope="scope">{{scope.row.record_time.substring(0,16)}}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="巡检人">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="personalXjFun(scope.row)">{{scope.row.name}}</el-button>
                        </template>
                    </el-table-column>
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
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
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
    var D = date.getDate();
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
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
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
import {QueryAssetsUser,QueryAssetsConf,QueryAssetsType,QueryNodeBase,QueryInspect,DownloadInspect} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"inspection",
    data() {
        return {
            buyerName: '',
            startTime: '',
            endTime: '',
            isShow: true,
            form: {
                msg: '',
                types: '',
                source: '',
                xjr: '',
                node: '',
                user: '',
                state: '',
                dataTime: '',
                stateXj: '',
            },
            unfold: '收起',
            show: true,
            inline: true,
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
            clear: false,
        }
    },
    mounted() {
        this.getQueryNodeBase()
        this.getQueryAssetsType()
        this.getQueryAssetsConf()
        
        this.getQueryAssetsUser()
        this.getDataFun()
    },
    methods: {
        selectFun(){
            if(!this.options.length > 0){
                this.getQueryAssetsType()
            }
        },
        getDownloadInspect(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                assets_base: this.form.msg.trim(),
                node_code: this.form.node, // 关联节点信息 --
                start_time: this.startTime ? (this.startTime + ' 00:00:00') : '',
                end_time: this.endTime ? (this.endTime + ' 23:59:59') : '',
                assets_type_id: this.form.types, // 资产类型 -- 
                a_conf_id: this.form.state, // 资产状态 -- 
                merchant_name: this.form.user.trim(),// 关联商户信息
                userid: this.form.xjr, // 巡检人
                status: this.form.stateXj, // 巡检状态(0:未巡检，1：已巡检)
                rank: 0,
            }
            DownloadInspect( params, {})
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
                    aLink.setAttribute("download", `巡检` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
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
        getDataFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let obj = {
                assets_base: this.form.msg.trim(),
                node_code: this.form.node, // 关联节点信息 --
                start_time: this.startTime ? (this.startTime + ' 00:00:00') : '',
                end_time: this.endTime ? (this.endTime + ' 23:59:59') : '',
                assets_type_id: this.form.types, // 资产类型 -- 
                a_conf_id: this.form.state, // 资产状态 -- 
                merchant_name: this.form.user.trim(),// 关联商户信息
                userid: this.form.xjr, // 巡检人
                status: this.form.stateXj, // 巡检状态(0:未巡检，1：已巡检)
                cols: this.cols,
                page: this.page,
                rank: 0,
            }
            QueryInspect(obj)
                .then(res => {
                    this.tableData = res.data.assets_base_list
                    this.num = res.data.assets_base.total
                    loading.close();
                })
                .catch(res => {
                    console.log(res);
                })

        },
        viewFun(ele){
            this.$router.push({name: 'ViewInspection',params: ele})
        },
        personalXjFun(ele){
            this.$router.push({name: 'PersonalXjMsg',params: ele})
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
                source: '',
                xjr: '',
                node: '',
                user: '',
                state: '',
                dataTime: '',
                stateXj: '',
            }
            this.startTime = ''
            this.endTime = '' 
            this.form.types = ''
            this.options = []
            this.page = 1
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
                        margin-right: 10px;
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
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .inspection{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>
