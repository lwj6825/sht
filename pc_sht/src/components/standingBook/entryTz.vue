<template>
    <div class="content entry-tz" ref="content">
        <div class="areaBox" ref="areaBox" v-if="isShow">
            <AreaSelect @selectId='selectId'></AreaSelect>
        </div>
        <div class="searchs" ref="searchs">
            <div class="search">
                <!--展开-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
                    <el-form-item label="商户信息" v-if="isShow2">
                        <el-select filterable clearable v-model="form.user" @change="selectGet" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.userId" :label="item.bootList[0].booth_name"
                            :value="item.bootList[0].shop_booth_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="进货日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="单据上传">
                        <el-select v-model="form.upload" placeholder="请选择上传状态">
                            <el-option label="全部" value="1"></el-option>
                            <el-option label="已上传" value="2"></el-option>
                            <el-option label="未上传" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="欠款">
                        <el-select v-model="form.debt" placeholder="请选择欠款状态">
                            <el-option label="全部" value="a1"></el-option>
                            <el-option label="有欠款" value="a2"></el-option>
                            <el-option label="无欠款" value="a3"></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth" style="margin-left: 10px;">搜索</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <!--收起-->
                <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
                    <el-form-item label="商户信息" v-if="isShow2">
                        <el-select filterable clearable v-model="form.user" @change="selectGet" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.userId" :label="item.bootList[0].booth_name"
                            :value="item.bootList[0].shop_booth_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="进货日期" style="width: 380px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
                <p class="unfold" v-if="isShow" @click="unfoldFun">{{unfold}}筛选条件</p>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部进货台账</p>
                <div>
                    <el-button type="primary" @click="addEntryTzFun" class="blue-bth">新增进货台账</el-button>
                    <!--<el-button type="primary" class="import white-bth">导入台账</el-button>-->
                </div>
            </div>
            <div class="tables" >
                <el-table  :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="in_date" label="进货日期"> </el-table-column>
                    <el-table-column prop="buyer_booth_name" label="商户名称" v-if="isShow"> </el-table-column>
                    <el-table-column label="商品信息" >
                        <template slot-scope="scope">
                            <p>{{scope.row.details}}等共{{scope.row.details_count}}件商品</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="seller_booth_name" label="供应商"> </el-table-column>
                    <el-table-column prop="suppiler_name" label="生产单位"> </el-table-column>
                    <el-table-column prop="extra2" label="总数量/重量"> </el-table-column>
                    <el-table-column prop="actual_money" label="金额(元)" width="80"> </el-table-column>
                    <el-table-column prop="stall_no" label="摊位号" width="80"> </el-table-column>
                    <!--<el-table-column prop="address" label="数据来源">
                        <template slot-scope="scope">
                            <p>{{scope.row.tz_origin == '1' ? '订单' : '手动录入'}}</p>
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="address" label="是否上传单据" > 
                        <template slot-scope="scope">
                            <p v-if="scope.row.is_oc_upload == 1">已上传单据</p>
                            <p v-if="scope.row.is_oc_upload == 0">未上传单据</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width='220'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" v-if="fileBtn" @click="fileShowFun(scope.row)">上传单据</el-button>
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="againFun(scope.row)">再次进货</el-button>
                            <el-button type="text" size="small" @click="deleteTzFun(scope.row)">删除</el-button>
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
    var D = date.getDate() + ' ';
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
import AreaSelect from '../common/area';
import Bus from '../common/bus.js';
import {QueryArea} from '../../js/area/area.js';
import {GetEntryTz,GetAllBiz,DeleteDoc,SearchDoc,UpdatePc,DeleteTzByTzId} from '../../js/standingBook/standingBook.js'
export default {
    name: "entryTz",
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
                user: '',
                source: '',
                upload: '',
                dataTime: ''
            },
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
        }
    },
    created() {
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.node_id = localStorage.getItem('loginId')
        
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
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getFieldFun()
    },
    methods: {
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
            this.$router.push({name: 'ImgUpload', params: {data: ele,userId: this.userId,areaId: this.areaId,tz_id: this.tz_id,biz_id: this.biz_id}})
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
                user: '',
                source: '',
                upload: '',
            }
            this.buyerName = ''
            this.getTime()
            this.page = 1
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
                    this.$message.error("出错啦!");
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
                    region:  this.areaId,
                    buyer_booth_id: this.scShopId,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    page: this.page,
                    cols: this.cols,
                    buyer_booth_name: this.buyerName,
                }
                GetEntryTz(obj)
                    .then(res => {
                        this.tableData = res.data.tzList
                        this.num = res.data.tzBean.total
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{    
                let obj = {
                    region:  this.areaId,
                    buyer_booth_id: this.form.user,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    page: this.page,
                    cols: this.cols,
                    buyer_booth_name: this.buyerName,
                }
                GetEntryTz(obj)
                    .then(res => {
                        this.tableData = res.data.tzList
                        this.num = res.data.tzBean.total
                    })
                    .catch(res => {
                        console.log(res)
                    })
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
                nodeName: this.nodeName
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
            this.$router.push({name:'AddEntryTz',params: {areaId: this.areaId,bigAreaId: this.bigAreaId}})
        },
        detailTzFun(ele){
            // console.log(ele)
            this.$router.push({name:'AddEntryTz',params: {areaId: this.areaId,bigAreaId: this.bigAreaId,param: ele}})
        },
        againFun(ele){
            this.$router.push({name:'AddEntryTz',params: {areaId: this.areaId,bigAreaId: this.bigAreaId,param: ele,types: 'again'}})
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
                width: 1000px;
            }
            .el-input,.el-date-picker,.el-select{
                width: 160px;
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
                    width: 300px;
                    justify-content: flex-end;
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
    }
</style>
