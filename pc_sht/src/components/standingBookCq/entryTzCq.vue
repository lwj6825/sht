<template>
    <div class="content entry-tz" ref="content">
        <div class="areaBox" ref="areaBox" v-if="isShow">
            <AreaSelect @selectId='selectId'></AreaSelect>
        </div>
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="进货日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select size="mini" v-model="form.gys_id" multiple clearable filterable placeholder="请选择供应商">
                            <el-option v-for="(item, index) in gysArr" :key="index" :label="item.biz_name" :value="item.shop_concacts_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-select size="mini" v-model="form.goods_name" clearable filterable placeholder="请选择商品">
                            <el-option v-for="(val,index) in goodsArr" :key="index" :label="val.GOODS_NAME" :value="val.GOODS_CODE" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单据上传">
                        <el-select v-model="form.upload" clearable placeholder="请选择上传状态">
                            <el-option label="未上传" value="0"></el-option>
                            <el-option label="已上传" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部进货台账</p>
                <div>
                    <el-button type="primary" @click="addEntryTzFun" class="blue-bth">新增进货台账</el-button>
                    <el-button type="primary" class="import white-bth" @click="isDownloadFun">下载模板</el-button>
                    <div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button type="primary" class="import white-bth" @click="exportFun">导出</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="in_date" label="进货日期"> </el-table-column>
                    <el-table-column label="商品信息" >
                        <template slot-scope="scope">
                            <p>{{scope.row.details}}等共{{scope.row.details_count}}件商品</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="details_count" label="数量" width="120"> </el-table-column>
                    <el-table-column prop="seller_booth_name" label="供应商"> </el-table-column>
                    <el-table-column prop="suppiler_name" label="供货单位"> </el-table-column><!---->
                    <el-table-column prop="addr" label="产地" width="120"> </el-table-column>
                    <el-table-column prop="address" label="单据上传" > 
                        <template slot-scope="scope">
                            <p v-if="scope.row.is_oc_upload == 1">已上传单据</p>
                            <p v-else-if="scope.row.is_oc_upload == 0">未上传单据</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width='220'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" v-if="fileBtn" @click="fileShowFun(scope.row)">上传单据</el-button>
                            <el-button type="text" size="small" @click="againFun(scope.row)">再次进货</el-button>
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <div class="passwrd file" v-if="isFile">
            <div class="text">
                <div class="box-title">
                    <p class="tit">下载模板</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="msg-box">
                    <div class="data">
                        <div class="tit">供应商</div>
                        <div class="msg">
                            <el-select size="mini" v-model="gys_array" multiple clearable filterable placeholder="请选择供应商">
                                <el-option v-for="(item, index) in gysArr" :key="index" :label="item.biz_name" :value="item.shop_concacts_id"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="data">
                        <div class="tit">日期：</div>
                        <div class="msg">
                            <el-date-picker style="width: 200px;" v-model="in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="file-btns">
                    <!--<div>
                        <span class="submit">
                            确认导入
                            <form id="upload" enctype="multipart/form-data" method="post">
                                <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                            </form>
                        </span>
                    </div>-->
                    <div>
                        <p class="download" @click="downloadFun">下载</p>
                    </div>
                </div>
            </div>
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
import AreaSelect from '../common/area';
import Bus from '../common/bus.js';
import {QueryArea} from '../../js/area/area.js';
import {GetEntryTz,GetAllBiz,DeleteDoc,SearchDoc,UpdatePc,DeleteTzByTzId, ExportPcTzInfoList, QueryPcTzInfoList} from '../../js/standingBookCq/standingBookCq.js'
import {exportTzInfoTemplate, importTzInfo} from '../../js/address/url.js'
import axios from 'axios';
import {allGys} from "../../js/management/management.js";
import {purchase,getDefaultProductTypes} from "../../js/goods/goods.js";
export default {
    name: "entryTzCq",
    data() {
        return {
            page: 1,
            cols: 15,
            num: 0,
            userId: '',
            total: '',
            areaId: '', // 大区的shop_booth_id
            bigAreaId: '', // 大区userId
            contacts: '',
            nodeName: '',
            tableData: [],
            addEntryTz: '新增进货台账',
            buyerName: '',
            startTime: '',
            endTime: '',
            isShow: true,
            isRegion: '',
            form: {
                goods_name: '',
                upload: '',
                dataTime: [],
                gys_id: '',
            },
            gys_array: '',
            in_date: '',
            gysArr: [],
            goodsArr: [],
            unfold: '展开',
            show: false,
            inline: true,
            isShow2: true,
            options: [
                {
                    bootList: [
                        {shop_booth_id:0, booth_name: ''}
                    ]
                }
            ],
            isFile: false,
            item_1_list: [],
            item_2_list: [],
            item_3_list: [],
            item_4_list: [],
            item_5_list: [],
            item_6_list: [],
            item_7_list: [],
            item_8_list: [],
            node_id: '',
            imgArr: [],
            biz_id: '',
            tz_id: '',
            clarity: '',
            typeArr: [],
            fileShow1: true,
            fileShow2: true,
            fileShow3: true,
            fileShow4: true,
            fileShow5: true,
            fileShow6: true,
            fileShow7: true,
            fileShow8: true,
            fileBtn: true,
            isMarket: true,
            file: '',
            isFile: false,
            pickerOptions: { 
                disabledDate(time) {
                    return time.getTime() >  new Date().getTime()
                }
            }
        }
    },
    created() {
        if(localStorage.getItem('roleId') == "79" || localStorage.getItem('roleId') == "77"){
            this.isMarket = false
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.node_id = localStorage.getItem('loginId')
        this.roleId = localStorage.getItem('roleId')
        this.getTime()
        if(this.isRegion == 'false'){
            this.isShow = false
            this.isShow2 = false
            this.show = true
            this.unfold = '收起'
            this.getEntryTzFun()
        }else{
            this.defaultTzFun()
        }
        this.getAllGys()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getFieldFun()
        this.getGoodFun()
    },
    methods: {
        getGoodFun(){
            let boothData = {
                page: 1,
                cols: 1000,
                goodsName: '',
                goodsCode: '',
                suppliersName: this.form.gys,
                region: '',
                userId: this.userId,
                total: '',
                j_name: ''
            }
            purchase(boothData)
                .then(res => {
                    this.goodsArr = res.data.purchaseList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 获取供应商
        getAllGys(){
            if(this.isRegion == 'false'){
                let boothData = {
                    page: 1,
                    cols: 1000,
                    userId: this.userId,
                    type: '1',
                    concact_name: '',
                    biz_name: '',
                    region: this.areaId,
                    shop_booth_id: this.scShopId,
                }
                allGys(boothData)
                    .then(res => {
                        this.gysArr = res.data.dataList;
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{
                let boothData = {
                    page: 1,
                    cols: 1000,
                    userId: this.userId,
                    type: '1',
                    concact_name: '',
                    biz_name: '',
                    region: this.areaId,
                    shop_booth_id: this.areaId,
                }
                allGys(boothData)
                    .then(res => {
                        this.gysArr = res.data.dataList;
                    })
                    .catch(res => {
                        console.log(res)
                    })
                }
        },
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('myfile', this.file);  
            formData.append('user_id', this.userId);  
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
            let url = importTzInfo
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.page = 1
                        this.getEntryTzFun()
                    }else{
                        this.$message.error(res.message ? res.message : '导入失败');
                    }
                    this.file = ''
                    document.getElementById('upload').reset();
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 导出
        exportFun(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let params = {
                buyer_booth_id: this.scShopId,
                start_time: this.startTime,
                end_time: this.endTime,
                gys_id: this.form.gys_id.join(','),
                is_oc_upload: this.form.upload
            }
            ExportPcTzInfoList( params, {})
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
                    aLink.setAttribute("download", `进货台账` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                    // let blob = new Blob([res.data])
                    // let downloadElement = document.createElement('a')
                    // let href = window.URL.createObjectURL(blob); //创建下载的链接
                    // downloadElement.href = href;
                    // downloadElement.download = `资产` + time; //下载后文件名
                    // document.body.appendChild(downloadElement);
                    // downloadElement.click(); //点击下载
                    // document.body.removeChild(downloadElement); //下载完成移除元素
                    // window.URL.revokeObjectURL(href); //释放blob对象 
                })
                .catch(function (res) {
                    loading.close();
                });
        },
        isDownloadFun(){
            this.isFile = true 
            var currentTime = new Date()
            this.in_date = formatDate(currentTime)
        },
        closeFun(){
            this.isFile = false
            this.gys_array = ''
            this.in_date = ''
        },
        // 下载模板
        downloadFun(){
            console.log(this.gys_array.join(','))
            let url = exportTzInfoTemplate;
            window.location.href = url + '?in_date=' + this.in_date + '&user_id=' + this.userId + '&gys_array=' 
                + this.gys_array.join(',')
            this.closeFun()
        },
        deleteTzFun(ele){
            let str = 'tz_id=' + ele.tz_id
            DeleteTzByTzId(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.page = 1
                        this.getEntryTzFun()  
                    }else{
                        this.$message.error(res.message);
                    } 
                })
                .catch(res => {
                    console.log(res);
                })
        },
        fileShowFun(ele){
            this.tz_id = ele.tz_id
            this.biz_id = ele.biz_id
            this.$router.push({name: 'ImgUploadCq', params: {data: ele,userId: this.userId,areaId: this.areaId,tz_id: this.tz_id,biz_id: this.biz_id}})
        },
        // 获取字段列表
        getFieldFun(){
            let obj = {
                userId: this.userId,
                tz_type: "1",
                shop_booth_id: this.areaId
            }
            UpdatePc(obj)
                .then(res => {
                    this.typeArr = res.data.danju_property
                    this.isShowFileFun()
                })
                .catch(res => {
                    console.log(res)
                })
        },
        isShowFileFun(){
            this.typeArr.forEach(ele => {
                if(this.areaId == ele.SHOP_BOOTH_ID){
                    if(ele.TYPE_NAME == "单据上传"){
                        if(ele.IS_SHOW == 1){
                            this.fileBtn = true
                        }else{
                            this.fileBtn = false
                        }
                    }
                }
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
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
        // 选择商户
        selectGet(val){
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.bootList[0].shop_booth_id){
                        this.buyerName = ele.bootList[0].booth_name
                    }
                })
            }else{
                this.buyerName = ''
            }
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
                goods_name: '',
                upload: '',
                dataTime: [],
                gys_id: '',
            }
            this.buyerName = ''
            // this.getTime()
            this.startTime = ''
            this.endTime = ''
            this.page = 1
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.getEntryTzFun()
        },
        searchFun(){
            this.page = 1
            this.timeChange()
            this.getEntryTzFun()
        },
        // 获取商户
        getMerchantsFun(){
            let obj = {
                page: '1',
                cols: '',
                total: "",
                userId: this.userId,
                name: "",
                boothName: "",
                stall_no: "",
                region: this.areaId
            }
            GetAllBiz(obj)
                .then(res => {
                    this.options = res.data.dataList
                })
                .catch(() => {
                    console.log(res)
                })
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getEntryTzFun()
        },
        defaultTzFun(){
            let data = {
                page: '1',
                cols: '100',
                total: '',
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName,
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res =>{
                    this.bigAreaId = res.data.dataList[0].userId;
                    this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                    this.getEntryTzFun()
                    this.getMerchantsFun()
                    this.isShowFileFun()
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        getEntryTzFun(){
            if(this.isRegion == 'false'){
                let obj = {
                    buyer_booth_id: this.scShopId,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    page: this.page,
                    cols: this.cols,
                    is_oc_upload: this.form.upload,
                    gys_id: this.form.gys_id ? this.form.gys_id.join(',') : '',
                    goods_code: this.form.goods_name,
                }
                QueryPcTzInfoList(obj)
                    .then(res => {
                        this.tableData = res.data.tzList
                        this.num = res.data.tzBean.total
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{    
                // let obj = {
                //     region:  this.areaId,
                //     buyer_booth_id: this.form.user,
                //     start_time: this.startTime,
                //     end_time: this.endTime,
                //     page: this.page,
                //     cols: this.cols,
                //     buyer_booth_name: '',
                //     is_oc_upload: this.form.upload
                // }
                // GetEntryTz(obj)
                //     .then(res => {
                //         this.tableData = res.data.tzList
                //         this.num = res.data.tzBean.total
                //     })
                //     .catch(res => {
                //         console.log(res)
                //     })
            }
        },
        selectId(id){//选择区域
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            let data = {
                page: '1',
                cols: '100',
                total: '',
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName,
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res =>{
                    res.data.dataList.forEach(ele => {
                        if(ele.userId == id){
                            this.bigAreaId = id;
                            this.areaId = ele.bootList[0].shop_booth_id;
                            this.getEntryTzFun()
                            this.getMerchantsFun()
                            this.isShowFileFun()
                        }
                    });
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        addEntryTzFun(){
            // let routeData = this.$router.resolve({
            //     path: "/home/standingBook/addEntryTz",
            //     query: {
            //         areaId: this.areaId,
            //         bigAreaId: this.bigAreaId
            //     }
            // });
            // window.open(routeData.href, '_blank');
            this.$router.push({name:'AddEntryTzCq',query: {areaId: this.areaId,bigAreaId: this.bigAreaId}})
        },
        detailTzFun(ele){
            // console.log(ele)
            this.$router.push({name:'ViewEntryTzCq',query: {areaId: this.areaId,bigAreaId: this.bigAreaId,param: JSON.stringify(ele)}})
            // let routeData = this.$router.resolve({
            //     path: "/home/standingBook/viewEntryTz",
            //     query: {
            //         areaId: this.areaId,
            //         bigAreaId: this.bigAreaId,
            //         param: JSON.stringify(ele)
            //     }
            // });
            // window.open(routeData.href, '_blank');
        },
        againFun(ele){
            // let routeData = this.$router.resolve({
            //     path: "/home/standingBook/addEntryTz",
            //     query: {
            //         areaId: this.areaId,
            //         bigAreaId: this.bigAreaId,
            //         param: JSON.stringify(ele),
            //         types: 'again'
            //     }
            // });
            // window.open(routeData.href, '_blank');
            this.$router.push({name:'AddEntryTzCq',params: {param: ele,types: 'again'}})
        }
    },
    components:{
        AreaSelect,
    }
}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
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
                min-width: 930px;
            }
            .el-input, .el-select{
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
        .areaBox{
            padding: 10px;
            margin-bottom: 10px;
            background: #fff;
        }
        .searchs{
            padding: 10px 0;
            background: #fff;
        }
        .import{
            color: #409EFF;
            background: #fff;
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
                    width: 360px;
                    justify-content: flex-end;
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
            }
        }
        .passwrd{
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
                margin-left: -310px;
                width: 600px;
                height: 300px;
                background: #fff;
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
                .msg-box{
                    clear: both;
                    margin: 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 60px;
                            line-height: 30px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select, .el-input{
                            width: 200px;
                        }
                    }
                }
                .tips{
                    margin-left: 20px;
                    margin-bottom: 15px;
                    margin-top: 15px;
                    font-size: 12px;
                    color: #ccc;
                }
                .search{
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 310px;
                    }
                    .el-input, .el-select{
                        margin-left: 30px;
                        width: 200px;
                    }
                    .ss-btn{
                        margin-left: 20px;
                        background: #fff;
                        color: #409EFF;
                    }
                    .znlr-btn{
                        margin-right: 30px;
                    }
                }
                .btn{
                    margin-top: 10px;
                    margin-left: 30px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 50px auto;
                    position: relative;
                    left: 30%;
                    display: inline-block;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
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
                        width: 200px;
                        height: 50px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .download{
                    margin: 50px auto;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
                    color: #409EFF;
                    background: #fff;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #409EFF;
                }
                .table{
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
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
    .entry-tz{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .passwrd{
            .el-input__icon{
                line-height: 30px;
            }
        }
        .el-date-editor .el-range-separator{
            line-height: 24px;
        }
    }
</style>
