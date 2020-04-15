<template>
   <div class="content" ref="content">
        <div class="areaBox" ref="areaBox">
            <div class="area-content">
                <div class="area-title">市场区域</div>
                <div class="area-wrapper">
                    <ul>
                        <li class="area-item" :class="{active:selectArea== ''}" 
                            @click='selectArrFun(1)'>
                            <el-button class="list-btn" type="primary" size="medium">全部</el-button>
                        </li>
                        <li class="area-item" v-for="item in areaList" :key="item.userId"  :class="{active:selectArea==item.userId}" 
                            @click='selectId(item.userId)'>
                            <el-button class="list-btn" type="primary" size="medium">{{item.name}}</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="seacher">
            <p class="data_time">日期&nbsp;</p>
            <el-date-picker style="width:300px;float:left;margin-top:20px;margin-right:25px;margin-left:60px;"
                v-model="time" value-format="yyyy-MM-dd" default-value="2019-01-25"  type="daterange" 
                align="left" unlink-panels :picker-options="pickerOptions" range-separator="至" clear-icon	
                start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <div class="goods_name">
                商户名称&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入商户名" clearable v-model="input" style="width:185px;"></el-input>
                <el-button type="primary" plain style="margin-left:20px;"
                @click="handleBtnQuery()" >搜索</el-button>
            </div>
        </div>
        <div class="table_cell" v-loading="fullscreenLoading2">
            <div class="title">
                <div class="table_cell_title left" style="margin-left:20px;">
                商户交易额明细&nbsp;&nbsp;&nbsp;[总交易额:{{this.totol_price}}元， 总交易量:{{this.weight}}公斤]
                </div>
                <div class="right">
                    <el-button type="primary" class="addBtn blue-bth" @click="downloadFun">导出商户交易额</el-button>
                </div>
            </div>
            <el-table  :data="tableData" style="width: 100%;margin-left:20px;" :header-cell-style="{background:'#f5f5f5'}" fit
                :row-style="{height:'40px'}">
                <el-table-column prop="stall_no" label="摊位号" fit></el-table-column>
                <el-table-column prop="biz_name" label="商户名称" fit></el-table-column>
                <el-table-column prop="price"  label="总交易额(元)" :default-sort="{order: order}" sortable="custom"></el-table-column>
                <el-table-column prop="weight" label="总交易量(公斤)" :default-sort="{order: order}" sortable="custom"></el-table-column>
                <el-table-column prop="num" label="支付笔数" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="注：支付笔数为客户累积支付订单数量" placement="top">
                            <p>{{parseFloat(scope.row.num)}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="total_num" label="累计购买商品数量" :default-sort="{order: order}" sortable="custom">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="注：累计购买商品数量为所有客户每笔订单包含的商品品种数量之和" placement="top">
                            <p>{{parseFloat(scope.row.total_num)}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="kdj" label="客单价（元）">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="注：客单价为人均交易金额客单价=总交易额/支付笔数" placement="top">
                            <p>{{scope.row.kdj}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="total_num_num" label="客单量（种）">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="注：客单量为人均购买商品数量客单量=累计购买商品数量/支付笔数" placement="top">
                            <p>{{scope.row.kdl}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="weight_num" label="客均交易量（公斤）">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="注：客均交易量为人均交易商品重量客均交易量=总交易量/支付笔数" placement="top">
                            <p>{{scope.row.kjjyl}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination v-if="totalCount" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </div>
   </div>
</template>
<script>
import {QueryArea} from '../../js/area/area.js';
import {GetMarkets} from '../../js/district/district';
import {QueryGoodsRankCurrentYear,QueryGoodsRankCurrentMonth,QueryGoodsRankCurrentWeek,QueryGoodsRankCurrentDay,
    QueryBizRankCurrentWeek,QueryBizRankCurrentDay,QueryBizRankCurrentMonth,QueryBizRankCurrentYear,
    GetTzInfoUploadDays,GetTzInfoUploadBizNum,GetBizOnlineTime,GetGoodsWeightRankAndAvgPrice,
    ComputNode,ComputNodeNumWeek,ComputPluNumWeek,QueryMoneyAndWeightForBiz,QueryMoneyAndWeightForMarket,
    QueryMoneyCurrentWeek,QueryMoneyCurrentMonth,QueryMoneyCurrentDayHour,QueryMoneyCurrentYear, QueryMoneyAndWeightForNode
} from '../../js/statistical/statistical.js'
import AreaSelect from '../common/area';
import {baseUrl,importMoneyAndWeightForMarket} from '../../js/address/url.js'
export default {
    name:'MerchantMoney',
    data(){
        return{
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            weight:'',
            start_time:'',  //开始时间
            end_time:'',  //结束时间
            time:[],
            input:'',
            totol_price:'',
            weight:'',
            page: 1,
            cols: 15,
            userId: '',
            name: "",
            boothName: "",  
            areaId:'',//大区的shop_booth_id
            bigAreaId:'',//大区userId
            value1:'',
            value8: '',
            tableData: [],
            currentPage:1,
            pageSize:10,
            totalCount: 0,// 所有数据
            loading1:true,
            loading2:true,
            gooduserId:'',
            fullscreenLoading2:false,
            node_id: '',
            input2:'',
            areaList:[],
            selectArea:'',
            isRegion: '',
            order: 'desc',
        }
    },
    created(){
        this.gooduserId = this.$route.params.gooduserId;
    },
    mounted(){
        this.isRegion = localStorage.getItem('isRegion') 
        window.scrollTo(0,0)
        this.node_id = localStorage.getItem('loginId');
        this.userId = localStorage.getItem('userId');
        this.loginId = localStorage.getItem('loginId');
        this.getTime();
        //   this.getQueryMoneyAndWeightForBizFun()
        this.gooduserId = this.$route.params.gooduserId;
        this.getTime1();
        if(this.isRegion == 'true'){
            this.getAreaList();//获取区域列表  
        }
    },
    methods:{
        sortChange({column, prop, order}){
            if(order == 'descending'){
                this.order = 'desc'
            }else if(order == 'ascending'){
                this.order = 'asc'
            }else{
                this.order = 'desc'
            }
            // this.getDataFun()
        },
        downloadFun(){
            window.location.href = importMoneyAndWeightForMarket + '?node_id=' + this.node_id +  '&start_date=' + this.start_time 
            + '&end_date=' + this.end_time
        },
        // 选择全部区域
        selectArrFun(ele){
            this.selectArea = '';
            this.fullscreenLoading2 = true;
            // this.page = 1
            if(ele == 1){
                this.currentPage = 1
            }
            this.tableData = []
            this.totol_price=''
            this.weight= ''
            let str = 'node_id='+this.loginId+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page='+this.currentPage+'&cols='+this.pageSize+'&name='+this.input
            QueryMoneyAndWeightForNode(str)
                .then(res=>{
                    var totol_price = res.data.price_sum;
                    this.totol_price = Number(totol_price.toFixed(2));
                    var weight = res.data.wight_sum;
                    this.weight = Number(weight.toFixed(2));
                    this.fullscreenLoading2 = false;
                    this.tableData = res.data.list
                    this.tableData.forEach(val=>{
                        val.kdj = (val.price/val.num).toFixed(2)
                        val.kjjyl = (val.weight/val.num).toFixed(2)
                        val.kdl = (val.total_num/val.num).toFixed(0)
                        val.price = val.price.toFixed(2);
                        val.weight = val.weight.toFixed(2);
                    })
                    this.totalCount = res.data.totalCount;  //总条数
                    this.cols = res.data.cols; // 每页条数
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getAreaList(){
            let data = {
                page:"1",
                cols:"10000",
                total:"",
                userId: this.userId,
                name:"",
                boothName:"",
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res =>{
                    this.areaList = res.data.dataList;
                    if(this.gooduserId){
                        // this.selectArea = this.gooduserId
                    }else{
                        this.selectArea = this.areaList[0].userId;
                    }
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        //初始化数据
        getTime(){
            function formatTen(num) { 
                return num > 9 ? (num + "") : ("0" + num); 
            }
            var start = new Date(); 
            var year = start.getFullYear(); 
            var month = start.getMonth() + 1; 
            var day = start.getDate(); 
            this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day-1)  
            this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.start_time = this.$route.params.startTime; 
            this.end_time  = this.$route.params.endTime;
            this.time = [this.start_time,this.end_time]
            this.gooduserId = this.$route.params.gooduserId;
            this.input = this.$route.params.merChant; 
            if(!this.input){
                this.input = ""
            }else{
                this.input = this.$route.params.merChant;
            }
            // this.getQueryMoneyAndWeightForBizFun();  
            // this.getQueryMoneyAndWeightForMarketFun();
        },
        getTime1 () {
            if(localStorage.getItem("Time")){
                this.loading = false
                var arr = localStorage.getItem("Time").split(",")
                this.start_time = arr[0];
                this.end_time = arr[1];
                this.time = [this.start_time,this.end_time]
                this.input = arr[5];
                this.gooduserId = arr[3]
                this.bigAreaId = arr[3]
                this.areaId = arr[4]
                this.getQueryMoneyAndWeightForBizFun();  
                this.getQueryMoneyAndWeightForMarketFun();
                localStorage.removeItem('Time')
            }else{
                this.defaultTzFun();
                localStorage.removeItem('Time')
            }
        },
         //点击搜索
        handleBtnQuery() {
            this.fullscreenLoading2 = true;
            var start_time = this.time[0];
            var end_time = this.time[1];
            this.start_time = start_time;
            this.end_time = end_time;
            if(this.selectArea == ''){
                this.selectArrFun()
            }else{
                if(this.input ==''){
                    this.currentPage = 1;
                    this.getQueryMoneyAndWeightForBizFun();
                }
                this.getQueryMoneyAndWeightForBizFun();
                this.getQueryMoneyAndWeightForMarketFun();
            }
        },
        handleSizeChange(val) {
            this.pageSize = val ;
            if(this.selectArea == ''){
                this.selectArrFun()
            }else{
                this.getQueryMoneyAndWeightForBizFun();
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val ;
            if(this.selectArea == ''){
                this.selectArrFun()
            }else{
                this.getQueryMoneyAndWeightForBizFun();
            }
        },
        handleClick(row) {
            let dataMore = [this.time,this.input,this.gooduserId]
            localStorage.setItem("Time", dataMore);
            this.input2 = this.input;
            this.input = row.biz_name
            this.$router.push({path:'StatisticalTz',
                query:{input:this.input2,
                merChant:row.biz_name,   
                startTime:this.start_time,  
                endTime:this.end_time,
                areaId:this.areaId,
                gooduserId:this.bigAreaId
                }
            })
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
            GetMarkets(data)
                .then(res =>{
                    if(this.$route.params.gooduserId){
                        res.data.dataList.forEach(ele => {
                            if(ele.userId == this.$route.params.gooduserId){
                                this.bigAreaId = ele.userId;
                                this.areaId = ele.bootList[0].shop_booth_id;
                            }
                            
                        });
                    }else{
                        this.bigAreaId = res.data.dataList[0].userId;
                        this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                    }
                    this.getQueryMoneyAndWeightForBizFun();  
                    this.getQueryMoneyAndWeightForMarketFun();
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        selectId(id){//选择区域展示商户列表
            this.selectArea = id;
            this.fullscreenLoading2 = true;
            this.page = 1
            this.currentPage = 1
            this.input = ''
            this.tableData = []
            this.totol_price=''
            this.weight=''
            let data = {
                page: '1',
                cols: '100',
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                node_id: this.node_id
            }
            GetMarkets(data)
                .then(res =>{
                    this.fullscreenLoading2 = false;
                    this.titArr = res.data.dataList
                    res.data.dataList.forEach(ele => {
                        if(ele.userId == id){
                            this.bigAreaId = id;
                            this.areaId = ele.bootList[0].shop_booth_id;
                            this.getQueryMoneyAndWeightForBizFun()
                            this.getQueryMoneyAndWeightForMarketFun()
                        }
                    });
                })
                .catch(res =>{
                    console.log(res)
                })
            },
        // 获取表格数据
        getQueryMoneyAndWeightForBizFun(){  
            let str = 'node_id='+this.loginId+'&region='+this.areaId+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page='+this.currentPage+'&cols='+this.pageSize+'&name='+this.input
            QueryMoneyAndWeightForBiz(str)
                .then(res=>{
                    this.tableData = res.data.list
                    this.tableData.forEach(val=>{
                        val.kdj = (val.price/val.num).toFixed(2)
                        val.kjjyl = (val.weight/val.num).toFixed(2)
                        val.kdl = (val.total_num/val.num).toFixed(0)
                        val.price = val.price.toFixed(2);
                        val.weight = val.weight.toFixed(2);
                    })
                    this.totalCount = res.data.totalCount;  //总条数
                    this.cols = res.data.cols; // 每页条数
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        // 获取商品总额
        getQueryMoneyAndWeightForMarketFun(){
            this.fullscreenLoading2 = true;
            let str = 'node_id='+this.loginId+'&region='+this.areaId+'&start_date='+this.start_time+'&end_date='+this.end_time
            QueryMoneyAndWeightForMarket(str)
                .then(res=>{
                    this.fullscreenLoading2 = false;
                    var totol_price = res.data.price;
                    this.totol_price = Number(totol_price.toFixed(2));
                    var weight = res.data.weight;
                    this.weight = Number(weight.toFixed(2));
                })
                .catch(res=>{
                    console.log(res)
                })
        }, 
    },
}
</script>
<style scoped lang='less'>
    .title{
        display: flex;
        align-items: center;
        .tz-title{
            padding-left: 4px;
            height: 20px;
            line-height: 20px;
            box-sizing: border-box;
            font-size: 14px;
            border-left: 2px solid #409EFF;
        }
        .left{
            flex: 1;
            line-height: 30px;
            font-size: 14px;
        }
        .right{
            display: flex;
            justify-content: flex-end;
            width: 300px;
            .addBtn{
                height: 30px;
                margin-right: 10px;
            }
            .submit{
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
    .area-content{
        overflow: hidden;
        .area-title{
            float: left;
            padding-top: 7px;
            padding-left: 4px;
            width: 100px;
            height: 34px;
            line-height: 20px;
            font-size: 14px;
            box-sizing: border-box;
            border-left: 2px solid #409EFF;
        }
        .area-wrapper{
            margin-left: 100px;
        }
        .area-item{
            float: left;
            margin-left: 10px;
            margin-bottom: 10px;
            &.active{
            .list-btn{
                background: #409EFF;
                color: #fff;
            }
            }        
        }
        .list-btn{
            color: #409EFF;
            background: #fff;
        }
    }
    .back{
        width:100%;
        height:20px;
        line-height: 20px;
        margin-bottom:10px;
        background-Color:white;
        padding-left:20px;
        font-size:15px;
        cursor: pointer;
    }
    .back:hover{
        color:#409EFF;  //
        text-decoration: underline;
    }
    .header{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        margin-bottom: 10px;
        font-size:14px;
        p {
            display: inline-block;
            padding-left:10px;
        }
        div{
            display: inline-block;
            padding-left:10px;
        }
        p:hover{
            color:#3e9dff;
            text-decoration:underline;
        }
    }
    .areaBox{
        padding-top:7px;
        padding: 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .seacher{
        height: 70px;
        line-height: 70px;
        background-color: #fff;
        position: relative;
        font-size: 14px;
        color: '#606266';
        .data_time{
            font-size:14px;
            position: absolute;
            top: 5px;
            left: 17px;
            line-height: 60px;
        }
    }
    .button{
        float: left;
    }
    .table_cell{
        width: 100%;
        background-color: #ffffff;
        margin-top: 10px;
        .table_cell_title{
            height: 50px;
            line-height: 50px;
            font-size: 14px;
        }
    } 
    .block{
        margin-top:35px;
    }
</style>
<style lang="less">
    .content {
        .el-date-editor .el-range-separator{
            line-height: 21px;
        }
        .el-date-editor .el-range__icon{
            line-height: 23px;
        }


    }
</style>