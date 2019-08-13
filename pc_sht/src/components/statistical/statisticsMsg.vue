<template>
    <div class="content statistical" ref="content">
    <!-- <TopHead :title='titleArr'></TopHead>  -->

      <!--<el-button type="primary" @click="goProducetable">跳转到生产</el-button>-->
        <!-- <div class="title"> -->
            <!-- <p class="right">更新时间：{{currentTime}}</p> -->
        <!-- </div> -->
        <div class="first">
            <div class="box">
                <ul class="list list_1">
                    <li class="list-title">
                        <p>当日交易额(元)</p>
                        <el-tooltip class="item" effect="dark" content="当日全部商户交易总额" placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num num_1">{{list_1_num1}}</li>       
                    <li class="proportion proportion_1">
                        <div>
                            <p>周环比</p>
                            <p>{{list_1_num2}}%</p>
                            <img v-if="list_1_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_1_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日环比</p>
                            <p>{{list_1_num3}}%</p>
                            <img v-if="list_1_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_1_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                    <li class="total" @click="skip()">月总交易额&nbsp;￥{{list_1_num4}}</li>
                </ul>
                <ul class="list list_2">
                    <li class="list-title">
                        <p>支付笔数</p>
                        <el-tooltip class="item" effect="dark" content="当日全部商户支付总笔数，图表为近7天商户支付总笔数的情况" placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num">{{list_2_num1}}<span style="float:right;font-size:14px;color:#999;">近7天支付笔数</span></li>      
                    <li>
                        <div id="my-chart" class="echart"></div>
                    </li> 
                    <li class="proportion proportion_2">
                        <div>
                            <p>周环比</p>
                            <p>{{list_2_num2}}%</p>
                            <img v-if="list_2_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_2_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日环比</p>
                            <p>{{list_2_num3}}%</p>
                            <img v-if="list_2_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_2_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                </ul>
                <ul class="list list_3">
                    <li class="list-title">
                        <p>商户活跃度</p>
                        <el-tooltip class="item" effect="dark" content="商户活跃度为当前在线的商户与全部商户的百分比，图表显示当前在线商户数量。    " placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num num_3">{{list_3_num1}}%</li>   
                    <li>
                        <div id="my-chart2" class="echart"></div>
                    </li>     
                    <li class="proportion proportion_3">
                        <div>
                            <p>周环比</p>
                            <p>{{list_3_num2}}%</p>
                            <img v-if="list_3_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_3_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日环比</p>
                            <p>{{list_3_num3}}%</p>
                            <img v-if="list_3_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_3_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                </ul>
                <ul class="list list_4">
                    <li class="list-title">
                        <p>交易商品(种)</p>
                        <el-tooltip class="item" effect="dark" content="当日交易的商品品种总数，图表为近7天交易的商品品种情况" placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num">{{list_4_num1}}<span style="float:right;font-size:14px;color:#999;">近7天交易商品数</span></li>     
                    <li>
                        <div id="my-chart3" class="echart"></div>
                    </li>   
                    <li class="proportion proportion_4">
                        <div>
                            <p>周环比</p>
                            <p>{{list_4_num2}}%</p>
                            <img v-if="list_4_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_4_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日环比</p>
                            <p>{{list_4_num3}}%</p>
                            <img v-if="list_4_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_4_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="second" v-loading="loading" >
            <div class="conditions">
                <ul style="z-index:99">
                    <li v-for="(item,index) in keyGroup" :key="index" :class="{style:index == currId}" @click="focusFun(index,item)">{{item.name}}</li>
                </ul>
                <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" :picker-options="pickerOptions"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" plain style="margin-left:20px;"
                        @click="handleBtnQuery()" 
                >查询</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="商品交易额" name="first">
                    <div class="box">
                        <div class="list-title1">
                                    <button class="list-tit" style="outline:none" v-for="(item,index) in titArr" :key="index" :class="{styles:item.userId == currId2}" @click="focusFun2(item,index)" >{{item.name}}</button>
                        </div>
                        <div class="text">
                            <div id="my-chart4" style="width:1000px;height:400px;margin-top:25px;"></div>
                            <div class="list">
                                <div class="list-item">
                                    <p class="item-title">商品销售排行</p>
                                    <ul>
                                        <li class="item" v-for="(item,index) in goodArr" :key="index">
                                            <p class="index" :class="{indexx:index < 5}">{{index + 1}}</p>
                                            <p class="name"  @click='getshopList(item.plu_name)'>{{item.plu_name}}</p>
                                            <p class="number">{{item.price.toFixed(2) + '元'}}</p>
                                        </li>
                                        <p class="lookMore" @click='More1()'>查看更多>></p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商户交易额" name="second"> 
                    <div class="box">
                        <ul class="list-title1" style="z-index:99">
                                <li class="list-tit" v-for="(item,index) in titArr" :key="index" :class="{styles:item.userId == currId2}" @click="focusFun2(item,index)">{{item.name}}</li>
                        </ul>
                        <div class="text">
                            <div id="my-chart7" style="width: 1000px;height:400px;"></div>
                            <div class="list">
                                <div class="list-item">
                                    <p class="item-title">商户交易额排行</p>
                                    <ul>
                                        <li class="item" v-for="(item,index) in merchantsArr" :key="index" >
                                            <p class="index" :class="{indexs:index < 5}">{{index + 1}}</p>
                                            <p class="name" @click='getMerChantName(item.biz_name)'>{{item.biz_name}}</p>
                                            <p class="number">{{item.price.toFixed(2) + '元'}}</p>
                                        </li>
                                    </ul>
                                    <p class="lookMore" @click='More2()'>查看更多>></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="third">
            <div class="left">
                <p class="title">台账录入情况</p>
                <div id="my-chart5" style="width: 500px;height:180px;margin-left:78px;"></div>
                <div style="font-size:14px;font-weight:bolder;margin-left:20px;">本月商户台账录入情况</div>
                <el-table :data="tableData" @sort-change="sortChange" style="width: 100%;">
                    <el-table-column type="index" label="排名" width="50"></el-table-column>
                    <el-table-column prop="BUYER_BOOTH_NAME" label="商户"></el-table-column>
                    <el-table-column prop="DAYS" label="录入天数" sortable="custom"></el-table-column>
                    <el-table-column label="单据上传情况">
                        <template slot-scope="scope">
                            <span v-if="scope.row.IS_OC_UPLOAD == 0">未上传</span>  
                            <span v-else>上传</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="cols" :total="num"
                @current-change="handleCurrentChange"></el-pagination>
            </div>
            <div class="right">
                <p class="title">电子秤在线率</p>
                <div class="msg">
                    <ul class="msg-text">
                        <li>
                            <p>·</p>
                            <p>电子秤总数：</p>
                            <p>{{count}}</p>
                        </li>
                        <li>
                            <p>·</p>
                            <p>当前在线数：</p>
                            <p>{{nums}}</p>
                        </li>
                    </ul>
                    <div class="whz">
                        <div class="fzsj">{{list_3_num1 + '%'}}</div>
                        <div class="wbhz"></div>
                        <div class="d1" :style="degObj"></span></div>
                    </div>
                </div>
                <div class="table">
                    <p class="table-title">电子秤在线商户</p>
                    <el-table :data="tableData2" style="width: 100%" @sort-change="sortChange2">
                        <el-table-column prop="seller_booth_name" label="商户名称"></el-table-column>
                        <el-table-column prop="in_date" label="电子秤最早在线时间" sortable="custom"></el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :current-page.sync="page2" :page-size="cols2" :total="num2"
                    @current-change="handleCurrentChange2"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {GetMarkets} from '../../js/district/district';
import TopHead from '../common/header'
import {QueryArea} from '../../js/area/area.js';
import {QueryGoodsRankCurrentYear,QueryGoodsRankCurrentMonth,QueryGoodsRankCurrentWeek,QueryGoodsRankCurrentDay,
    QueryBizRankCurrentWeek,QueryBizRankCurrentDay,QueryBizRankCurrentMonth,QueryBizRankCurrentYear,
    GetTzInfoUploadDays,GetTzInfoUploadBizNum,GetBizOnlineTime,GetGoodsWeightRankAndAvgPrice,
    ComputNode,ComputNodeNumWeek,ComputPluNumWeek,QueryMoneyAndWeightForGoods,QueryMoneyAndWeightForBiz,
    QueryMoneyCurrentWeek,QueryMoneyCurrentMonth,QueryMoneyCurrentDayHour,QueryMoneyCurrentYear
} from '../../js/statistical/statistical.js'
export default {
    name:"statistical",
    data(){
        return{
            
            loading:true,
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            titleArr:'',
            activeName: 'first',
            time: '',
            keyGroup: [
                {name: '当日'},
                {name: '本周'},
                {name: '本月'},
                {name: '全年'},
                // {name: '自定义时间'}
            ],
            currId: '',
            currId2: '',
            legendData: [],
            titArr: [], // 区域
            goodArr: [], // 商品销售排行
            merchantsArr: [], // 商户交易额排行
            tableData: [],
            page: 1,
            cols: 5,
            num: 0,
            degObj: {},
            ratio: 0.9, // 百分比
            tableData2: [],
            page2: 1,
            cols2: 5,
            num2: 0,
            contacts: '',
            nodeName: '',
            userId: '',
            loginId: '',
            list_1_num1: '0',
            list_1_num2: '0',
            list_1_num3: '0',
            list_1_num4: '0',
            list_2_num1: '0',
            list_2_num2: '0',
            list_2_num3: '0',
            list_3_num1: '0',
            list_3_num2: '0',
            list_3_num3: '0',
            list_4_num1: '0',
            list_4_num2: '0',
            list_4_num3: '0',
            nums: '',
            count: 0,
            currentTime: '',
            order: 'desc', // 倒序
            order2: 'desc', // 倒序
            shopname:'',//商品名字,
            merChant:'',//商户名字
            start_time:'',
            end_time:'',
            time:'',
            gooduserId:''
            // userId:''
            // screenWidth: document.body.clientWidth,
        }
    },
    mounted(){
        this.userId = localStorage.getItem('userId');
        this.loginId = localStorage.getItem('loginId')
        this.getComputNodeFun()
        this.getComputNodeNumWeekFun()
        this.getComputPluNumWeekFun()
        this.getTzInfoUploadBizNumFun()
        this.getAreaFun()
        this.getBizOnlineTimeFun()
        this.getTzInfoUploadDaysFun()

        // 标准时间转日期格式
        function formatTen(num) { 
            return num > 9 ? (num + "") : ("0" + num); 
        }
        var start = new Date(); 
        var year = start.getFullYear(); 
        var month = start.getMonth() + 1; 
        var day = start.getDate(); 
        this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day)
        this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
        this.time = [this.start_time,this.end_time]
        setTimeout(() => {
                this.loading = false
        }, 3000);
    },
    methods: {
        handleBtnQuery(){
            this.currId = null;
            this.currId2 = this.titArr[0].userId;
            var startTime = this.time[0];
            var endTime = this.time[1];
            function formatDate(date) {
                var myyear = date.getFullYear();
                var mymonth = date.getMonth()+1;
                var myweekday = date.getDate();
                if(mymonth < 10){
                    mymonth = "0" + mymonth;
                }
                if(myweekday < 10){
                    myweekday = "0" + myweekday;
                }
                return (myyear+"-"+mymonth + "-" + myweekday);
            }
            this.start_time = formatDate(startTime)
            this.end_time = formatDate(endTime)
            this.time = [this.start_time,this.end_time]
            if(this.activeName == 'first'){
                // alert()
                this.getGoodsWeightRankAndAvgPriceFun(this.titArr[0])
            }else if(this.activeName == 'second'){
                // alert()
                this.getDayFun2(this.titArr[0])
            } 
            
        },
        getshopList(val){
            this.shopname = val
            this.$router.push({
                name:'CommodityMoney',
                params:{shopname:this.shopname,
                        startTime:this.start_time,  
                        endTime:this.end_time,
                         gooduserId:this.gooduserId
                        }
            })
        },
        getMerChantName(val){
            this.merChant = val
            this.$router.push({
                name:'MerchantMoney',
                params:{merChant:this.merChant,
                startTime:this.start_time,  
                endTime:this.end_time,
                gooduserId:this.gooduserId
                }
            })
        },
        skip(){  //跳转商品交易额
           this.$router.push({path:'totalTransaction'})
        },
        More1(){  // 商品跳转商品交易额页面
             this.$router.push({
                name:'CommodityMoney',
                params:{shopname:this.shopname,   
                        startTime:this.start_time,  
                        endTime:this.end_time,
                        gooduserId:this.gooduserId
                        } 
                })
                console.log(this.gooduserId)
                
        },
        More2(){ //商户跳转到商户交易额页面
            //  this.merChant = " "
             this.$router.push({name:'MerchantMoney',
                 params:{merChant:this.merChant,
                 startTime:this.start_time,
                 endTime:this.end_time,
                 gooduserId:this.gooduserId
                }})
        },
        sortChange(){
            if(this.order == 'desc'){
                this.order = 'asc'
                this.getTzInfoUploadDaysFun()
            }else if(this.order == 'asc'){
                this.order = 'desc'
                this.getTzInfoUploadDaysFun()
            }
        },
        sortChange2(column, prop, order){
            if(this.order2 == 'desc'){
                this.order2 = 'asc'
                this.getBizOnlineTimeFun()
            }else if(this.order2 == 'asc'){
                this.order2 = 'desc'
                this.getBizOnlineTimeFun()
            }
        },
        //跳转到生产
        goProducetable(){
            alert('开始了...')
            this.$router.push({path:'lzproduce/producetable'});
        },
        handleClick(){
            this.start_time = this.time[0];
            this.end_time = this.time[1];
            function formatTen(num) { 
                    return num > 9 ? (num + "") : ("0" + num); 
                }
                var start = new Date(); 
                var year = start.getFullYear(); 
                var month = start.getMonth() + 1; 
                var day = start.getDate(); 
                this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day)
                this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
                this.time = [this.start_time,this.end_time]
            this.getGoodsWeightRankAndAvgPriceFun(this.titArr[0]);
            this.currId2 = this.titArr[0].userId
            if(this.activeName == 'first'){
                    let str = 'node_id='+this.loginId+'&region='+ this.titArr[0].bootList[0].shop_booth_id+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page=1&cols=10&name=';
                    QueryMoneyAndWeightForGoods(str)
                        .then(res => {
                            let arr = res.data,
                                numArr = [],
                                title = [],
                                priceArr = [];
                            arr.list.forEach(val => {
                                numArr.push(val.price.toFixed(2))
                                title.push(val.plu_name)
                                priceArr.push(val.avg.toFixed(2))
                            })
                            this.getGoodsWeightRankAndAvgPriceFun(val)
                            this.getChartFun4(title,numArr,priceArr)
                            this.goodArr = res.data.list.slice(0,10);
                            
                        })
                        .catch(res => {
                            console.log(res);
                        })    
            }else if(this.activeName == 'second'){
                    this.getDayFun2(this.titArr[0])
                    let str = 'node_id='+this.loginId+'&region='+this.titArr[0].bootList[0].shop_booth_id+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page=1&cols=10&name=';
                    // 商户当天
                    QueryMoneyAndWeightForBiz(str)
                        .then(res => {
                            res.data.list.forEach(val => {
                                val.num = val.score.toFixed(2)
                            })
                            let arr = res.data.list,
                                numArr = [] ,
                                title = [] ;
                            arr.forEach(val => {
                                title.push(val.biz_name).slice(0,10)
                                numArr.push(val.price.toFixed(2)).slice(0,10)
                            })
                            this.getDayFun2(val)
                            this.getChartFun7(title,numArr)
                            this.merchantsArr = res.data.list.slice(0,10)
                            
                        })
                        .catch(res => {
                            console.log(res);
                        })
            }
            this.currId = 0
        },
        focusFun(item){
            console.log(item)
            console.log(this.currld)
            if(this.currId){
                if(this.currId !== item){
                    this.currId = item
                }
            }else{
                this.currId = item
            }
            this.titArr.forEach(val => {
                if(this.currId2){
                    if(this.currId2 == val.userId){
                        // this.getGoodsWeightRankAndAvgPriceFun(val)
                    }
                }
            })
            if(item == 0){
                 function formatTen(num) { 
                    return num > 9 ? (num + "") : ("0" + num); 
                }
                var start = new Date(); 
                var year = start.getFullYear(); 
                var month = start.getMonth() + 1; 
                var day = start.getDate(); 
                this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day)
                this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
                this.time = [this.start_time,this.end_time]
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getGoodsWeightRankAndAvgPriceFun(val)
                            if(this.activeName == 'second'){
                                this.getDayFun2(val)
                                this.getQueryMoneyCurrentDayHourFun()
                            }
                        }
                    }
                })
            }else if(item == 1){
                var now = new Date(); //当前日期
                var nowDayOfWeek = now.getDay(); //今天本周的第几天
                var nowDay = now.getDate(); //当前日
                var nowMonth = now.getMonth(); //当前月
                var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0; //
                function formatDate(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth()+1;
                    var myweekday = date.getDate();
                    if(mymonth < 10){
                        mymonth = "0" + mymonth;
                    }
                    if(myweekday < 10){
                        myweekday = "0" + myweekday;
                    }
                    return (myyear+"-"+mymonth + "-" + myweekday);
                }
                var weekStartDate =  new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);   ;  
                var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)+1);
                this.start_time = formatDate(weekStartDate);
                this.end_time = formatDate(weekEndDate);
                this.time = [this.start_time,this.end_time]
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getGoodsWeightRankAndAvgPriceFun(val)
                            
                            if(this.activeName == 'second'){
                                this.getQueryMoneyCurrentWeekFun(val)
                                this.getDayFun2(val)
                            }
                        }
                    }
                })
                
            }else if(item == 2){
                var now = new Date(); //当前日期
                var nowDayOfWeek = now.getDay(); //今天本周的第几天
                var nowDay = now.getDate(); //当前日
                var nowMonth = now.getMonth(); //当前月
                var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0; //
                function formatDate(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth()+1;
                    var myweekday = date.getDate();
            
                    if(mymonth < 10){
                        mymonth = "0" + mymonth;
                    }
                    if(myweekday < 10){
                        myweekday = "0" + myweekday;
                    }
                    return (myyear+"-"+mymonth + "-" + myweekday);
                }
                function getMonthDays(myMonth){
                    var monthStartDate = new Date(nowYear, myMonth, 1);
                    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
                    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
                    return days;
                }
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
                this.start_time = formatDate(monthStartDate);
                this.end_time = formatDate(monthEndDate);
                this.time = [this.start_time,this.end_time]
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getGoodsWeightRankAndAvgPriceFun(val)
                            if(this.activeName == 'second'){
                                this.getDayFun2(val)
                                this.getQueryMoneyCurrentMonthFun(val)
                            }
                        }
                    }
                })
                
            }else if(item == 3){
                var now = new Date(); //当前日期
                var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0; //
                function formatDate(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth()+1;
                    var myweekday = date.getDate();
            
                    if(mymonth < 10){
                        mymonth = "0" + mymonth;
                    }
                    if(myweekday < 10){
                        myweekday = "0" + myweekday;
                    }
                    return (myyear+"-"+mymonth + "-" + myweekday);
                }
                var yearStartDate = new Date(nowYear, 0, 1); 
                var yearEndDate = new Date(nowYear, 11, 31);
                this.start_time = formatDate(yearStartDate)
                this.end_time = formatDate(yearEndDate);
                this.time = [this.start_time,this.end_time]
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            if(this.activeName == 'second'){
                                this.getQueryMoneyCurrentYearFun(val)
                                this.getDayFun2(val)
                            }
                            this.getGoodsWeightRankAndAvgPriceFun(val)
                        }
                    }
                })
                
            }
        },
        focusFun2(item,index){
            // console.log(item.userId)
            this.gooduserId = item.userId
            if(this.currId2){
                if(this.currId2 !== item.userId){
                    this.currId2 = item.userId
                }
            }else{
                 this.currId2 = item.userId
            }
            this.getGoodsWeightRankAndAvgPriceFun(item)
            if(this.activeName == 'first'){
                let title = item.name
                this.legendData = title.split()
                if(this.currId){
                    if(this.currId == 0){
                        // this.getQueryMoneyCurrentDayHourFun(item)
                        this.getGoodsWeightRankAndAvgPriceFun(item)
                    }else if(this.currId == 1){
                        // this.getQueryMoneyCurrentWeekFun(item)
                        this.getGoodsWeightRankAndAvgPriceFun(item)
                    }else if(this.currId == 2){
                        // this.getQueryMoneyCurrentMonthFun(item)
                        this.getGoodsWeightRankAndAvgPriceFun(item)
                    }if(this.currId == 3){
                        // this.getQueryMoneyCurrentYearFun(item)
                        this.getGoodsWeightRankAndAvgPriceFun(item)
                    }
                }else{
                    // this.getQueryMoneyCurrentDayHourFun(item)
                    // this.
                }
            }else if(this.activeName == 'second'){
                let title = item.name
                this.legendData = title.split()
                this.getDayFun2(item)
                if(this.currId){
                    if(this.currId == 0){
                        this.getQueryMoneyCurrentDayHourFun(item)
                        this.getDayFun2(item)
                    }else if(this.currId == 1){
                        this.getQueryMoneyCurrentWeekFun(item)
                        this.getDayFun2(item)
                    }else if(this.currId == 2){
                        this.getQueryMoneyCurrentMonthFun(item)
                        this.getDayFun2(item)
                    }if(this.currId == 3){
                        this.getQueryMoneyCurrentYearFun(item)
                        this.getDayFun2(item)
                    }
                }else{
                    // this.getQueryMoneyCurrentDayHourFun(item)
                }
            }
        },
        getChartFun1(title,data){
            // 基于准备好的dom，初始化echarts实例
         var myChart = this.$echarts.init(document.getElementById('my-chart'));
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger:'axis'
                },
                xAxis: {
                    data: title,
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                yAxis: {
                    type:'value',
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                series: [{
                    name:'',
                    type: 'bar',
                    data: data,
                    itemStyle:{
                        normal:{
                            color:'#ce62d6'
                        }
                    },
                    formatter: function(data) {
                        if (data > 0) {
                                 return data.value;
                            } 
                            else {
                                 return '';
                            }
                    },
                }]
            });
        },
        getChartFun2(data){
            // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('my-chart2'));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                xAxis:  {
                    type: 'value',
                    show:false,
                    splitLine:{
                　　　　show:false
                　　},
                },
                yAxis: {
                    type: 'category',
                    show:false,
                    splitLine:{
                　　　　show:false
                　　},
                },
                series: [
                    {
                        name: '在线商户数',
                        type: 'bar',
                        data: data,
                        itemStyle:{
                            normal:{
                                color:'#5156b8'
                            }
                        },
                    }
                ]
            });
        },
        getChartFun3(title,data){
            // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('my-chart3'));
            // 绘制图表
            myChart.setOption({
                tooltip : {
                    trigger: 'axis',
                },
                // legend: {},
                xAxis:  {
                    type : 'category',
                    boundaryGap : false,
                    data : title,
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                yAxis: {
                    type : 'value',
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                series: [
                    {
                        name:'',
                        type:'line',
                        smooth:true,
                        symbol:'none',
                        stack: '总量',
                        areaStyle: {},
                        data:data,
                        itemStyle:{
                            normal:{
                                color:'#13c2c2'
                            }
                        },
                    }
                ]
            });
        },
        getChartFun4(title,numArr,priceArr,mark,marklevel){
            // 基于准备好的dom，初始化echarts实例
         var myChart = this.$echarts.init(document.getElementById('my-chart4'));
            // // 绘制图表
                myChart.setOption({
                    title:{
                        // subtext:'商品交易额(元)'
                    },
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     crossStyle: {
                        //         color: '#999'
                        //     }
                        // }
                    },
                    data : title,
                    xAxis: [
                        {
                            type: 'category',
                            data: title,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name : '商品交易额(元)',
                            // min:0,
                            // max:mark,
                            // interval:marklevel
                            // type: 'value',
                            // axisLabel: {
                            //     formatter: '{value}'
                            // }
                            splitLine:{
                                show:false     //去掉网格线
                            }
                        },
                        {
                            name : '均价(元)',
                            // min:0,
                            // max:30,
                            // interval:6,
                            // type: 'value',
                            // axisLabel: {
                            //     formatter: '{value}'
                            // }
                            splitLine:{
                                show:false     //去掉网格线
                            }
                        },
                        
                    ],
                    series: [
                        {
                            name:'交易额',
                            stack: '总量',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle:{
                                normal:{
                                    color:'#13c2c2',
                                    
                                }
                            },
                            data:numArr
                        },
                        {
                            name:'均价',
                            type:'line',
                            yAxisIndex: 1,
                            symbol: 'circle',
                            itemStyle:{
                                normal:{
                                    color:'#f88d48',
                                    label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示
                                    textStyle: { //数值样式
                                        color: 'f88d48',
                                        fontSize: 12
                                    }
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideTop'
                                }
                            },
                            data:priceArr,
                            
                        },
                        
                    ],
                });
                
        },
        getChartFun5(title,data){
            // 基于准备好的dom，初始化echarts实例
         var myChart = this.$echarts.init(document.getElementById('my-chart5'));
            // 绘制图表
            myChart.setOption({
                title: {
                    subtext: '近七天台账录入商户数',
                },
                tooltip : {
                    trigger: 'axis',
                },
                xAxis:  {
                    type : 'category',
                    // boundaryGap : false,
                    data : title,
                   
                },
                yAxis: {
                    type : 'value',
                    // show:false,
                    splitLine:{
                　　　　show:false
                　　},
                    min:0,
                    max:30,
                    splitNumber:3,
                },
                series: [
                    {
                        type:'line',
                        
                        name:'商户数',
                        data:data,
                        itemStyle:{
                            normal:{
                                color:'#0a8cff'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun7(title,data){
            // 基于准备好的dom，初始化echarts实例
         var myChart = this.$echarts.init(document.getElementById('my-chart7'));
            // 绘制图表
            myChart.setOption({
                title: {
                    // subtext: '交易额趋势',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: this.legendData
                },
                xAxis:  {
                    type : 'category',
                    data : title,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {  
                        interval:0,  
                        rotate:15  
                    }  
                },
                yAxis: {
                    name : '商户交易额(元)',
                    type: 'value',
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        stack: '总量',
                        data: data,
                        label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                        itemStyle:{
                            normal:{
                                color:'#5156b8'
                            }
                        },
                        barWidth: 40,
                        barCategoryGap: '5%',
                    }
                ]
            });
        },
        getDegFun(){
            let cfbl = 180 * (this.list_3_num1/100) - 180;
            let obj = {
                "transform": "rotate(" + (cfbl) + "deg)"
            }
            this.degObj = obj
        },
        getAreaFun(){
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
                    this.titArr = res.data.dataList
                    this.currId2 = this.titArr[0].userId
                    // 最下图表
                    // this.getGoodsWeightRankAndAvgPriceFun();
                    let str = 'node_id='+this.loginId+'&region='+this.titArr[0].bootList[0].shop_booth_id+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page=1&cols=10&name=';
                     QueryMoneyAndWeightForGoods(str)
                    .then(res => {
                        let arr = res.data,
                            numArr = [],
                            title = [],
                            priceArr = [];
                        arr.list.forEach(val => {
                            numArr.push(val.price.toFixed(2))
                            title.push(val.plu_name)
                            priceArr.push(val.avg.toFixed(2))
                        })
                            this.getChartFun4(title,numArr,priceArr)
                            this.goodArr = res.data.list.slice(0,10);
                        })
                        .catch(res => {
                            console.log(res);
                        })
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        // 商户
        getDayFun2(item){
            let str = 'node_id='+this.loginId+'&region='+item.bootList[0].shop_booth_id+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page=1&cols=10&name=';
            QueryMoneyAndWeightForBiz(str)
                .then(res => {
                    res.data.list.forEach(val => {
                        val.num = val.price.toFixed(2)
                    })
                    this.merchantsArr = res.data.list.slice(0,10)
                    let arr = res.data.list,
                        numArr = [] ,
                        title = [] ;
                    arr.forEach(val => {
                          title.push(val.biz_name)
                          numArr.push(val.price.toFixed(2))
                    })
                    this.getChartFun7(title.slice(0,10),numArr.slice(0,10))
                })
                .catch(res => {
                    console.log(res);
                })

        },
        // 该市场当月上传进货台账的商户信息（录入天数）
        getTzInfoUploadDaysFun(){
            let str = 'node_id=' + this.loginId + '&page=' + this.page + '&cols=' + this.cols + '&order=' + this.order
            GetTzInfoUploadDays(str)
                .then(res => {
                    this.tableData = res.data.list
                    // if(res.data.list.IS_OC_UPLOAD == 0){
                    //       IS_OC_UPLOAD
                    // }
                    this.num = res.data.total
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 该市场当月上传进货台账的商户信息（商户数）
        getTzInfoUploadBizNumFun(){
            let str = 'node_id=' + this.loginId
            GetTzInfoUploadBizNum(str)
                .then(res => {
                    let obj  = res.data,
                        arr = [],
                        title = []
                    for(var key in obj){
                        arr.push(obj[key])
                        title.push(key)
                    }
                    this.getChartFun5(title,arr)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 该市场当日电子秤最早在线时间
        getBizOnlineTimeFun(){
            let str = 'node_id=' + this.loginId + '&page=' + this.page2 + '&cols=' + this.cols2 + '&order=' + this.order2
            GetBizOnlineTime(str)
                .then(res => {
                    this.tableData2 = res.data.list
                    this.num2 = res.data.total
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商品交易量及价格走势(前10)
        getGoodsWeightRankAndAvgPriceFun(item){  
                let str = 'node_id='+this.loginId+'&region='+item.bootList[0].shop_booth_id+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page=1&cols=10&name=';
                QueryMoneyAndWeightForGoods(str)
                    .then(res => {
                        let arr = res.data,
                            numArr = [],
                            title = [],
                            priceArr = [];
                        arr.list.forEach(val => {
                            numArr.push(val.price.toFixed(2))
                            title.push(val.plu_name)
                            priceArr.push(val.avg.toFixed(2))
                        })
                        this.getChartFun4(title,numArr,priceArr)
                        this.goodArr = res.data.list.slice(0,10);
                        // this.getChartFun6(title,numArr,priceArr)
                    })
                    .catch(res => {
                        console.log(res);
                    })
            
        },
        handleCurrentChange(val){
            this.page = val
            this.getTzInfoUploadDaysFun()
        },
        handleCurrentChange2(val){
            this.page2 = val
            this.getBizOnlineTimeFun()
        },
        // 某个市场统计页面 的总金额 ,总条数,总商户数,总商品数以及日同比，周同比、当月总金额 
        getComputNodeFun(){
            let str = 'node_id=' + this.loginId
            ComputNode(str)
                .then(res => {
                    if(res.data.总交易额){
                        this.list_1_num1 = res.data.总交易额.toFixed(2)
                    }
                    if(res.data.交易额周环比){
                        this.list_1_num2 = res.data.交易额周环比.toFixed(2)
                    }
                    if(res.data.交易额日同比){
                        this.list_1_num3 = res.data.交易额日同比.toFixed(2)
                    }
                    if(res.data.当月总交易额){
                        this.list_1_num4 = res.data.当月总交易额.toFixed(2)
                    }
                    if(res.data.总支付笔数){
                        this.list_2_num1 = res.data.总支付笔数
                    }
                    if(res.data.支付笔数周环比){
                        this.list_2_num2 = res.data.支付笔数周环比.toFixed(2)
                    }
                    if(res.data.支付笔数日同比){
                        this.list_2_num3 = res.data.支付笔数日同比.toFixed(2)
                    }
                    if(res.data.商户活跃度){
                        this.list_3_num1 = res.data.商户活跃度
                    }
                    let list_3_num1 = res.data.活跃商户数
                    this.nums = list_3_num1
                    if(res.data.活跃商户周环比){
                        this.list_3_num2 = res.data.活跃商户周环比.toFixed(2)
                    }
                    if(res.data.活跃商户日环比){
                        this.list_3_num3 = res.data.活跃商户日环比.toFixed(2)
                    }
                    if(res.data.交易商品数){
                        this.list_4_num1 = res.data.交易商品数
                    }
                    if(res.data.交易商品周环比){
                        this.list_4_num2 = res.data.交易商品周环比.toFixed(2)
                    }
                    if(res.data.交易商品日同比){
                        this.list_4_num3 = res.data.交易商品日同比.toFixed(2)
                    }
                    if(res.data.总活跃商户数){
                        this.count = res.data.总活跃商户数
                    }
                    let arr = []
                    this.arrPer = arr.push(this.nums)
                    this.getChartFun2(arr)
                    this.getDegFun()
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 交易笔数周表数据
        getComputNodeNumWeekFun(){
            let str = 'node_id=' + this.loginId
            ComputNodeNumWeek(str)
                .then(res => {
                    let obj = res.data.zeroMap,
                        arr = [],
                        title = [];
                    for (var key in obj){
                        arr.push(obj[key])
                        title.push(key)
                    }
                    this.getChartFun1(title,arr)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 交易商品周表数据
        getComputPluNumWeekFun(){
            let str = 'node_id=' + this.loginId
            ComputPluNumWeek(str)
                .then(res => {
                    let obj = res.data.zeroMap,
                    
                        arr = [],
                        title = [];
                    for (var key in obj){
                        arr.push(obj[key])
                        title.push(key)
                    }
                    this.getChartFun3(title,arr)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询本周交易额数据
        getQueryMoneyCurrentWeekFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryMoneyCurrentWeek(str)
                .then(res => {
                    let obj = res.data.zeroMap,
                        arr = [],
                        title = [];
                    for (var key in obj){
                        arr.push(obj[key].toFixed(2))
                        title.push(key)
                    }
                    if(this.activeName == 'first'){
                        this.getChartFun4(title,arr)
                    }else if(this.activeName == 'second'){
                        // this.getChartFun7(title,arr)
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询本月交易额数据
        getQueryMoneyCurrentMonthFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryMoneyCurrentMonth(str)
                .then(res => {
                    let obj = res.data.zeroMap,
                        arr = [],
                        title = [];
                    for(var key in obj){
                        arr.push(obj[key].toFixed(2))
                        title.push(key)
                    }
                    if(this.activeName == 'first'){
                        this.getChartFun4(title,arr)
                    }else if(this.activeName == 'second'){
                        // this.getChartFun7(title,arr)
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询当天24小时交易额数据
        getQueryMoneyCurrentDayHourFun(item){
            if(item){
                let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
                QueryMoneyCurrentDayHour(str)
                    .then(res => {
                        let obj = res.data.zeroHourMap,
                            arr = [],
                            title = [];
                        for(var key in obj){
                            arr.push(obj[key].toFixed(2))
                            let keys = key.substr(8)
                            keys += ":00"
                            title.push(keys)
                        }
                        if(this.activeName == 'first'){
                            this.getChartFun4(title,arr)
                        }else if(this.activeName == 'second'){
                            // this.getChartFun7(title,arr)
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }else{
                let str = 'node_id=' + this.loginId + '&region=' + this.titArr[0].bootList[0].shop_booth_id
                QueryMoneyCurrentDayHour(str)
                    .then(res => {
                        let obj = res.data.zeroHourMap,
                            arr = [],
                            title = [];
                        for(var key in obj){
                            arr.push(obj[key].toFixed(2))
                            let keys = key.substr(8)
                            keys += ":00"
                            title.push(keys)
                        }
                        if(this.activeName == 'first'){
                            this.getChartFun4(title,arr)
                        }else if(this.activeName == 'second'){
                            // this.getChartFun7(title,arr)
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        // 查询当年商户交易额排行
        getQueryMoneyCurrentYearFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryMoneyCurrentYear(str)
                .then(res => {
                    let obj = res.data.monthMap,
                        arr = [],
                        title = [];
                    for(var key in obj){
                        arr.push(obj[key])
                        title.push(key)
                    }
                    if(this.activeName == 'first'){
                        this.getChartFun4(title,arr)
                    }else if(this.activeName == 'second'){
                        // this.getChartFun7(title,arr)
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },

    },
    components:{
        TopHead
    }
}
</script>
<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .title{
            .right{
                float: right;
                margin-right: 20px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
            }
        }
        .first{
            clear: both;
            width: 100%;
            overflow: hidden;
            .box{
                margin: 0 auto 10px;
                width: 100%;
                overflow: hidden;
                display: flex;
                .echart{
                    margin: 0 auto;
                    width: 240px;
                    height:50px;
                }
                
            }
            .list{
                float: left;
                padding: 10px;
                margin: 10px;
                width: 23%;
                height: 160px;
                background: #fff;
                overflow: hidden;
                // border: 1px solid #ccc;
                .list-title{
                    display: flex;
                    line-height: 30px;
                    p{
                        flex: 1;
                        font-size: 14px;
                    }
                    img{
                        width: 16px;
                        height: 16px;
                    }
                }
                .num{
                    height: 38px;
                    font-size: 24px;
                }
                .proportion{
                    display: flex;
                    div{
                        width: 140px;
                        height: 30px;
                        font-size: 12px;
                        line-height: 30px;
                        display: flex;
                        align-items: center;
                        img{
                            width: 6px;
                            height: 11px;
                        }
                        p:nth-child(2){
                            margin-right: 5px;
                            overflow: hidden;
                        }
                    }
                }
            }
            .list_1{
                .total{
                    margin-top: 14px;
                    font-size: 12px;
                    color: #999;
                    cursor: pointer;
                }
                .total:hover{
                    color:#409EFF;  //
                    text-decoration: underline;
                }
                .num_1{
                    margin: 15px 0;
                }
                .proportion_1{
                    padding-bottom: 2px;
                    border-bottom: 1px solid #ccc;
                }
            }
            .list_2, .list_4{
                .proportion_2, .proportion_4{
                    margin-top: 11px;
                    padding-top: 6px;
                    border-top: 1px solid #ccc;
                }
            }
            .list_3{
                .proportion_3, .proportion_4{
                    margin-top: 11px;
                    padding-top: 6px;
                    border-top: 1px solid #ccc;
                }
                .num_3{
                    // padding-bottom:20px;
                }
            }
        }
        .second{
            clear: both;
            width: 100%;
            background: #fff;
            // border: 1px solid #ccc;
            position: relative;
            .conditions{
                 position: absolute;
                 right: 25px;  //
                 top: 5px;
                 z-index: 99;
                 margin-top:5px;
            }
            .box{
                margin: 0 auto;
                width: 1280px;
                .areaBox{
                    padding: 10px;
                    background: #fff;
                    margin-bottom: 10px;
                }
                .list-title1{
                    position: absolute;
                    top:0; //
                    left: 20px;
                    .list-tit{
                        border-radius: 5px;
                        margin-left: 20px;
                        color: black;
                        background:#fff;
                        padding: 0 2px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 12px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        width:85px;
                        cursor: pointer;
                        float:left;
                    }
                }
            }
            .conditions{
                display: flex;
                margin-right: 10px;
                justify-content: flex-end;
                ul{
                    display: flex;
                    li{
                        margin: 0 10px;
                        font-size: 14px;
                        line-height: 30px;
                        cursor: pointer;
                    }
                }
            }
            .text{
                display: flex;
                justify-content: space-between;
                margin-top: 11px;
                .list{
                    width: 300px;
                    margin-right: 20px;
                    .list-title{
                        display: flex;
                        justify-content: center;
                        .list-tit{
                            padding: 0 2px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            font-size: 16px;
                            border: 1px solid #ccc;
                            box-sizing: border-box;
                            cursor: pointer;
                        }
                    }
                    .list-item{
                        .item-title{
                            font-size: 12px;
                            line-height: 30px;
                        }
                        .item{
                            display: flex;
                            height: 30px;
                            line-height: 30px;
                            font-size: 12px;
                            .index{
                                margin: 5px;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                            }
                            .name{
                                margin-left: 5px;
                                width: 150px;
                            }
                            .name:hover{
                                cursor: pointer;
                                color:#409EFF;
                            }
                            .number{
                                width: 120px;
                            }
                        }
                    }
                }
            }
        }
        .third{
            display: flex;
            margin: 10px 0;
            .left,.right{
                flex: 1;
                min-width: 534px;
                padding: 10px;
                background: #fff;
                // border: 1px solid #ccc;
                .title{
                    padding-left: 16px;
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                    border-bottom: 1px solid #ccc;
                }
                .el-pagination{
                    margin-right: 20px;
                    text-align: right;
                }
            }
            .left{
                margin-right: 10px;
            }
            .right{
                .msg{
                    display: flex;
                    padding: 24px 0;
                    .msg-text{
                        margin: 20px 60px;
                        li{
                            display: flex;
                            font-size: 12px;
                            line-height: 34px;
                            p:first-child{
                                color: #409EFF;
                                font-size: 30px;
                                line-height: 30px;
                            }
                        }
                    }
                    .whz {
                        margin: 20px 50px;
                        width:160px;
                        height:80px;
                        overflow:hidden;
                        position:relative;
                        .wbhz {
                            box-sizing:border-box;
                            border:20px solid #ce62d6;
                            border-top-left-radius:80px;
                            border-top-right-radius:80px;
                            width:160px;
                            height:80px;
                            border-bottom:none;
                        }
                        .d1 {
                            position:relative;
                            top:-80px;
                            z-index:10;
                            height:80px;
                            width:160px;
                            border:20px solid #8454d4;
                            box-sizing:border-box;
                            border-top-left-radius:80px;
                            border-top-right-radius:80px;
                            border-bottom:none;
                            transform-origin:50%  100%;
                            transform:rotate(-180deg);
                            transition:all 1s;
                        }
                        .fzsj {
                            height:60px;
                            text-align:center;
                            position:absolute;
                            top:40px;
                            left:0;
                            width:100%;
                        }
                    }
                }
                .table{
                    .table-title{
                        margin-left: 20px;
                        font-weight: bolder;
                        font-size: 14px;
                        line-height: 30px;
                    }
                }
            }
        }
        .fourth{
            width: 100%;
            background: #fff;
            border: 1px solid #ccc;
            .title{
                padding-left: 16px;
                height: 30px;
                font-size: 14px;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
            }
            #my-chart6{
                margin-top: 20px;
            }
        }
        .style{
            color: #409EFF;
        }
        .styles{
            color: #fff !important;
            // border: 1px solid #5156b8 !important;
            background: #3e9dff !important;;
        }
        .indexs{
            border-radius: 50%;
            color: #fff;
            background: #5156b8;
        }
        .indexx{
            border-radius: 50%;
            color: #fff;
            background: #13c2c2;
        }
        .lookMore{
            font-size: 14px;
            text-align: center;
            margin-top: 3px; 
            margin-top: 15px;
        }
        .lookMore:hover{
              color:#409EFF;
              cursor: pointer;
              text-decoration: underline;
        }
    }
</style>
<style lang="less">
    .statistical{
        .el-tabs__nav{
            margin-left: 20px;
        }
        .el-range-editor.el-input__inner{
            width: 300px;
            font-size: 12px;
        }
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-tabs__nav-wrap{
            height: 50px;
            line-height: 50px;
        }
    }
</style>
