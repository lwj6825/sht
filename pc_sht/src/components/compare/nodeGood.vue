<template>
    <div class="content nodeGood">
        <div class="msg" v-if="!isList">
            <div class="headers" @click="switchFun">
                <img src="../../assets/images/u5433.png" alt="">
                <p>切换列表</p>
            </div>
            <div class="searchs" ref="searchs">
                <div class="condition">
                    <div class="node-msg">节点名称： {{form.node_name}}</div>
                    <div class="msg">
                        <p @click="focusFun(1)" :class="types == 'week' ? 'active' : ''">近7天</p>
                        <p @click="focusFun(2)" :class="types == 'month' ? 'active' : ''">近30天</p>
                        <p :class="types == '' ? 'active' : ''">自定义时间</p>
                        <el-date-picker clearable style="width: 260px"
                            v-model="dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker><!---->
                    </div>
                </div>
            </div>
            <div class="tabs" v-loading="loading2">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item, index) in allTypesArr" :key="index" :label="item" :name="item"></el-tab-pane>
                </el-tabs>
                <div>
                    <el-radio-group v-model="radio" @change="selectFun">
                        <el-radio v-for="(item, index) in categoryArr" :key="index" :label="item.goods_name"></el-radio>
                    </el-radio-group>
                    <div v-if="isChart" id="my-chart" class="echart"></div>
                    <p style="text-align: center; font-size: 14px; color: #999;" v-else>暂无数据</p>
                </div>
            </div>
        </div>
        <div class="msg" v-else>
            <div class="headers" @click="switchFun">
                <img src="../../assets/images/u5520.png" alt="">
                <p>切换图表</p>
            </div>
            <div class="searchs" ref="searchs">
                <div class="search">
                    <el-form ref="form" :inline="true" :model="form" label-width="80px">
                        <el-form-item label="商品信息">
                            <el-input v-model="form.msg" clearable placeholder="请输入商品名称或商品编码或对照编码"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-select v-model="form.types" filterable clearable placeholder="请选择">
                                <el-option v-for="(item,index) in typesArr" :key="index" :label="item.varieties_type" :value="item.varieties_type">
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
                    <p class="tz-title">商品列表</p>
                    <div>
                        <!--<div class="submit">
                            批量导入
                            <form id="upload" enctype="multipart/form-data" method="post"> 
                                <input type="file" class="file" ref="file" @change="fileFun($event)">
                            </form> 
                        </div>-->
                        <el-button @click="downloadFun">导出</el-button>
                    </div>
                </div>
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="node_name" label="节点名称" width="300"></el-table-column>
                    <el-table-column prop="userdefine_code" label="商品编码"></el-table-column>
                    <el-table-column prop="userdefine_name" label="商品名称"></el-table-column>
                    <el-table-column prop="varieties_type" label="商品分类"></el-table-column>
                    <el-table-column prop="brand" label="规格系数"></el-table-column><!--
                    <el-table-column prop="" label="价格系数"></el-table-column>-->
                    <el-table-column prop="goods_code" label="对照编码"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看明细</el-button>
                            <el-button type="text" size="small" @click="closeFun(scope.row)">关闭上报</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                    @size-change="handleSizeChange"></el-pagination>
            </div>
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
import {QueryReportNodeGoods, GetGoodsTypes, CloseReportNodeGoods, DownloadReportNodeGoods, SelectReportNodeGoodsType, SelectReportNodeGoodsPrice,
    } from '../../js/compare/compare.js'
export default {
    name:"nodeGood",
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
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: true,
            loading2: true,
            isList: true,
            dataTime: '',
            startTime: '',
            endTime: '',
            activeName: '',
            types: 'week',
            good_types: '蔬菜',
            categoryArr: [],
            radio: '',
            allTypesArr: [],
            count: 0,
            isChart: true,
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
        this.getGetGoodsTypesFun()
        this.getAllTypesFun()
        this.getDataFun()
    },
    methods: {
        // 获取商品大类
        getAllTypesFun(){
            let obj = {
                node_id: this.form.node_id, // 节点编码
                type: this.types,
                varieties_type: '',
                start_date: this.startTime,
                end_date: this.endTime,
            }
            SelectReportNodeGoodsType(obj)
                .then(res => {
                    let arr = res.data.dataList, array = []
                    for(var i = 0; i < arr.length; i++){
                        if (array.indexOf(arr[i].varieties_type) === -1) {
                            array.push(arr[i].varieties_type)
                        }
                    }
                    this.allTypesArr = array
                    this.activeName = array[0]
                    this.good_types = array[0]
                    this.getSelectReportNodeGoodsTypeFun()
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectFun(){    
            this.getSelectReportNodeGoodsPriceFun()
        },
        // 已上报商品的均价每天（折线图）
        getSelectReportNodeGoodsPriceFun(){
            this.loading2 = true
            let that = this;
            let obj = {
                node_id: this.form.node_id, // 节点编码
                type: this.types,
                varieties_type: this.good_types,
                start_date: this.startTime,
                end_date: this.endTime,
                goods_name: this.radio,
            }
            SelectReportNodeGoodsPrice(obj)
                .then(res => {
                    let msg1 = res.data.node_id,
                        msg2 = res.data.parent
                    let arr = [], arr2 = [], title = [], title2 = [], legend1 = '', legend2 = '';
                    msg1.forEach(val => {
                        title.push(val.tran_date.slice(5))

                        arr.push(val.price)
                    })
                    msg2.forEach(val => {
                        arr2.push(val.price)
                        title2.push(val.tran_date)
                    })
                    if(title.length < title2.length){
                        title = title2
                    }
                    this.loading2 = false
                    // this.$nextTick(function(){
                        if(arr.length == 0 && arr2.length == 0){
                            this.isChart = false
                        }else{
                            if(msg1.length > 0){
                                legend1 = msg1[0].node_detail_type
                            }
                            if(msg2.length > 0){
                                legend2 = msg2[0].node_detail_type
                            }
                            this.isChart = true
                            that.getChartFun1(title, arr, arr2, legend1, legend2)
                        }
                    // })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 已上报商品的种类（折线图）
        getSelectReportNodeGoodsTypeFun(){
            let obj = {
                node_id: this.form.node_id, // 节点编码
                type: this.types,
                varieties_type: this.good_types,
                start_date: this.startTime,
                end_date: this.endTime,
            }
            SelectReportNodeGoodsType(obj)
                .then(res => {
                    if(res.data.dataList.length > 0){
                        this.categoryArr = res.data.dataList
                        this.radio = this.categoryArr[0].goods_name
                        this.getSelectReportNodeGoodsPriceFun()
                    }else{
                        this.isChart = false
                        this.loading2 = false
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getChartFun1(title, data1, data2, legend1, legend2){
            // 基于准备好的dom，初始化echarts实例
            let legend = []
            if(data1.length != 0){
                legend.push(legend1)
            } 
            if(data2.length != 0){
                legend.push(legend2)
            } 
            var myChart1 = this.$echarts.init(document.getElementById('my-chart'));
            // 绘制图表
            myChart1.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br/>{a}价格: {c} '
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    type: 'category',
                    data: title,
                },
                yAxis: {
                    type: 'value',
                    name: '商品均价（元/公斤）',
                },
                series: [
                    {
                        name: legend1,
                        type: 'line',
                        data: data1,
                        itemStyle:{
                            normal:{
                                color:'#199ED8'
                            }
                        },
                    },
                    {
                        name: legend2,
                        type: 'line',
                        data: data2,
                        itemStyle:{
                            normal:{
                                color:'#FF9966'
                            }
                        },
                    },
                ]
            });
        },
        handleClick(tab, event){
            this.loading2 = true
            this.good_types = this.activeName
            this.getSelectReportNodeGoodsTypeFun()
        },
        focusFun(ele){
            this.loading2 = true
            if(ele == 1){
                this.types = 'week'
            }else if(ele == 2){
                this.types = 'month'
            }
            this.getAllTypesFun()
        },
        switchFun(){
            this.isList = !this.isList
            if(this.isList == false){
                if(this.count == 0){
                    this.getAllTypesFun()
                    this.count = 1
                }else{
                    this.getSelectReportNodeGoodsPriceFun()
                }
            }
        },
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
        downloadFun(){
            let params = {
                node_id: this.form.node_id, // 节点编码
                userdefine_name: this.form.msg, // 自定义名称
                varieties_type: this.form.types
            }
            DownloadReportNodeGoods( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `已上报商品` + time);
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
        viewFun(ele){
            localStorage.setItem('routeMsg3', JSON.stringify(ele))
            this.$router.push({name: 'ViewNodeGood'})
        },
        closeFun(ele){
            this.$confirm('你确定要关闭上报吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {        
                let obj = {
                    id: ele.id
                }
                CloseReportNodeGoods(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message ? res.message : '保存成功');
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message ? res.message : '保存失败');
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_id: this.form.node_id, // 节点编码
                userdefine_name: this.form.msg, // 自定义名称
                varieties_type: this.form.types
            }
            QueryReportNodeGoods(obj)
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
            let routeMsg1 = '';
            if(localStorage.getItem('routeMsg1')){
                routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
            }
            this.form.node_name = routeMsg1.node_name
            this.form.node_id = routeMsg1.node_id
            this.page = 1
            this.getDataFun()
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
        timeChange(ele){
            this.loading2 = true
            this.types = ''
            if(this.dataTime){
                this.startTime = this.dataTime[0]
                this.endTime = this.dataTime[1]
            }
            this.getAllTypesFun()
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
        .headers{
            display: flex;
            height: 40px;
            align-items: center;
            font-size: 14px;
            background: #fff;
            cursor: pointer;
            img{
                padding: 0 10px;
                width: 16px;
                height: 16px;
            }
        }
        .searchs{
            margin-top: 10px;
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
                    width: 300px;
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
            .condition{
                display: flex;
                align-items: center;
                font-size: 14px;
                .node-msg{
                    margin: 0 20px;
                }
                .msg{
                    display: flex;
                    align-items: center;
                    margin: 0 auto;;
                    p{
                        margin-right: 20px;
                    }
                    p:nth-child(1), p:nth-child(2){
                        cursor: pointer;
                    }
                }
            }
        }
        .tabs{
            margin-top: 10px;
            background: #fff;
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
        .echart{
            margin-top: 30px;
            width: 100%;
            height: 300px;
        }
        .active{
            color: #409EFF;
        }
    }
</style>
<style lang="less">
    .nodeGood{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-tabs{
            margin: 0 30px;
        }
        .el-radio-group{
            margin: 0 30px;
        }
        .el-radio{
            width: 100px;
            line-height: 1.5;
        }
        .el-table td {
            padding: 8px 0;
        }
    }
</style>