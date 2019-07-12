<template>
    <div class="content statistical" ref="content">
    <!-- <TopHead :title='titleArr'></TopHead>  -->

      <!--<el-button type="primary" @click="goProducetable">跳转到生产</el-button>-->
        <div class="title">
            <p class="right">更新时间：{{currentTime}}</p>
        </div>
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
                            <p>周同比</p>
                            <p>{{list_1_num2}}%</p>
                            <img v-if="list_1_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_1_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日同比</p>
                            <p>{{list_1_num3}}%</p>
                            <img v-if="list_1_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_1_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                    <li class="total">月总交易额&nbsp;￥{{list_1_num4}}</li>
                </ul>
                <ul class="list list_2">
                    <li class="list-title">
                        <p>支付笔数</p>
                        <el-tooltip class="item" effect="dark" content="当日全部商户支付笔数总数" placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num">{{list_2_num1}}</li>      
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
                        <el-tooltip class="item" effect="dark" content="当日交易商户数与全部商户数量的比" placement="top">
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
                        <el-tooltip class="item" effect="dark" content="当日交易的商品品种总数" placement="top">
                            <img src="../../assets/images/u4155.png">
                        </el-tooltip>
                    </li> 
                    <li class="num">{{list_4_num1}}</li>     
                    <li>
                        <div id="my-chart3" class="echart"></div>
                    </li>   
                    <li class="proportion proportion_4">
                        <div>
                            <p>周同比</p>
                            <p>{{list_4_num2}}%</p>
                            <img v-if="list_4_num2 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_4_num2 < 0" src="../../assets/images/u732.png">
                        </div>
                        <div>
                            <p>日同比</p>
                            <p>{{list_4_num3}}%</p>
                            <img v-if="list_4_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_4_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="second">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="商品交易额" name="first">
                    <div class="box">
                        <div class="conditions">
                            <ul>
                                <li v-for="(item,index) in keyGroup" :key="index" :class="{style:index == currId}" @click="focusFun(index,item)">{{item.name}}</li>
                            </ul>
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="text">
                            <div id="my-chart4" style="width: 800px;height:400px;"></div>
                            <div class="list">
                                <ul class="list-title">
                                    <li class="list-tit" v-for="(item,index) in titArr" :key="index" :class="{styles:item.userId == currId2}" @click="focusFun2(item,index)">{{item.name}}</li>
                                </ul>
                                <div class="list-item">
                                    <p class="item-title">商品销售排行</p>
                                    <ul>
                                        <li class="item" v-for="(item,index) in goodArr" :key="index">
                                            <p class="index" :class="{indexs:index < 5}">{{index + 1}}</p>
                                            <p class="name">{{item.value}}</p>
                                            <p class="number">{{item.num + '元'}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商户交易额" name="second">
                    <div class="box">
                        <div class="conditions">
                            <ul>
                                <li v-for="(item,index) in keyGroup" :key="index" :class="{style:index == currId}" @click="focusFun(index,item)">{{item.name}}</li>
                            </ul>
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="text">
                            <div id="my-chart7" style="width: 800px;height:400px;"></div>
                            <div class="list">
                                <ul class="list-title">
                                    <li class="list-tit" v-for="(item,index) in titArr" :key="index" :class="{styles:item.userId == currId2}" @click="focusFun2(item,index)">{{item.name}}</li>
                                </ul>
                                <div class="list-item">
                                    <p class="item-title">商户交易额排行</p>
                                    <ul>
                                        <li class="item" v-for="(item,index) in merchantsArr" :key="index">
                                            <p class="index" :class="{indexs:index < 5}">{{index + 1}}</p>
                                            <p class="name">{{item.value}}</p>
                                            <p class="number">{{item.num + '元'}}</p>
                                        </li>
                                    </ul>
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
                <div id="my-chart5" style="width: 500px;height:200px;"></div>
                <el-table :data="tableData" @sort-change="sortChange" style="width: 100%;">
                    <el-table-column type="index" label="排名" width="50"></el-table-column>
                    <el-table-column prop="BUYER_BOOTH_NAME" label="商户"></el-table-column>
                    <el-table-column prop="DAYS" label="录入天数" sortable="custom"></el-table-column>
                    <el-table-column prop="state" label="单据上传情况"></el-table-column>
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
                        <el-table-column prop="SELLER_BOOTH_NAME" label="商户名称"></el-table-column>
                        <el-table-column prop="IN_DATE" label="电子秤最早在线时间" sortable="custom"></el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :current-page.sync="page2" :page-size="cols2" :total="num2"
                    @current-change="handleCurrentChange2"></el-pagination>
                </div>
            </div>
        </div>
        <div class="fourth">
            <p class="title">商品交易量及价格走势(前10)</p>
            <div id="my-chart6" style="width: 1000px;height:500px;"></div>
        </div>
    </div>
</template>
<script>
import TopHead from '../common/header'
import {QueryArea} from '../../js/area/area.js';
import {QueryGoodsRankCurrentYear,QueryGoodsRankCurrentMonth,QueryGoodsRankCurrentWeek,QueryGoodsRankCurrentDay,
    QueryBizRankCurrentWeek,QueryBizRankCurrentDay,QueryBizRankCurrentMonth,QueryBizRankCurrentYear,
    GetTzInfoUploadDays,GetTzInfoUploadBizNum,GetBizOnlineTime,GetGoodsWeightRankAndAvgPrice,
    ComputNode,ComputNodeNumWeek,ComputPluNumWeek,
    QueryMoneyCurrentWeek,QueryMoneyCurrentMonth,QueryMoneyCurrentDayHour,QueryMoneyCurrentYear
} from '../../js/statistical/statistical.js'
export default {
    name:"statistical",
    data(){
        return{
            titleArr:'',
            activeName: 'first',
            time: '',
            keyGroup: [
                {name: '当日'},
                {name: '本周'},
                {name: '本月'},
                {name: '全年'}
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
        this.getChartFun6()
        this.getChartFun7()
        
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
        var currentTime = new Date()
        this.currentTime = formatDate(currentTime)
        // const that = this
        // window.onresize = () => {
        //     return (() => {
        //         window.screenWidth = document.body.clientWidth
        //         that.screenWidth = window.screenWidth
        //     })()
        // }
    },
    watch: {
        // screenWidth (val) {
        //     if (!this.timer) {
        //         this.screenWidth = val
        //         this.timer = true
        //         let that = this
        //         setTimeout( () => {
        //             console.log(that.screenWidth)
        //             location. reload()
        //             // this.router.go(0)
        //             // that.getComputNodeNumWeekFun()
        //             // that.getComputPluNumWeekFun()
        //             // let arr = []
        //             // arr.push(that.nums)
        //             // that.getChartFun2(arr)
        //             that.timer = false
        //         }, 1000)
        //     }
        // }
    },
    methods: {
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
            this.getQueryMoneyCurrentDayHourFun()
            this.getGoodsWeightRankAndAvgPriceFun()
            if(this.activeName == 'first'){
                let str = 'node_id=' + this.loginId + '&region=' + this.titArr[0].bootList[0].shop_booth_id
                    QueryGoodsRankCurrentDay(str)
                        .then(res => {
                            res.data.zrange.forEach(val => {
                                val.num = val.score.toFixed(2)
                            })
                            this.goodArr = res.data.zrange.slice(0,10)
                            this.currId2 = this.titArr[0].userId
                        })
                        .catch(res => {
                            console.log(res);
                        })    
            }else if(this.activeName == 'second'){
                let merchants = 'node_id=' + this.loginId + '&region=' + this.titArr[0].bootList[0].shop_booth_id
                    // 商户当天
                    QueryBizRankCurrentDay(merchants)
                        .then(res => {
                            res.data.zrange.forEach(val => {
                                val.num = val.score.toFixed(2)
                            })
                            this.merchantsArr = res.data.zrange.slice(0,10)
                            this.currId2 = this.titArr[0].userId
                        })
                        .catch(res => {
                            console.log(res);
                        })
            }
            this.currId = 0
        },
        focusFun(item){
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
                        this.getGoodsWeightRankAndAvgPriceFun(val)
                    }
                }
            })
            if(item == 0){
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getQueryMoneyCurrentDayHourFun(val)
                            this.getDayFun(val)
                            this.getDayFun2(val)
                        }
                    }
                })
            }else if(item == 1){
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getQueryMoneyCurrentWeekFun(val)
                            this.getWeekFun(val)
                            this.getWeekFun2(val)
                        }
                    }
                })
            }else if(item == 2){
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getQueryMoneyCurrentMonthFun(val)
                            this.getMonthFun(val)
                            this.getMonthFun2(val)
                        }
                    }
                })
            }else if(item == 3){
                this.titArr.forEach(val => {
                    if(this.currId2){
                        if(this.currId2 == val.userId){
                            let title = val.name
                            this.legendData = title.split()
                            this.getQueryMoneyCurrentYearFun(val)
                            this.getYearFun(val)
                            this.getYearFun2(val)
                        }
                    }
                })
            }
        },
        focusFun2(item,index){
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
                this.getDayFun(item)
                if(this.currId){
                    if(this.currId == 0){
                        this.getQueryMoneyCurrentDayHourFun(item)
                        this.getDayFun(item)
                    }else if(this.currId == 1){
                        this.getQueryMoneyCurrentWeekFun(item)
                        this.getWeekFun(item)
                    }else if(this.currId == 2){
                        this.getQueryMoneyCurrentMonthFun(item)
                        this.getMonthFun(item)
                    }if(this.currId == 3){
                        this.getQueryMoneyCurrentYearFun(item)
                        this.getYearFun(item)
                    }
                }else{
                    this.getQueryMoneyCurrentDayHourFun(item)
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
                        this.getWeekFun2(item)
                    }else if(this.currId == 2){
                        this.getQueryMoneyCurrentMonthFun(item)
                        this.getMonthFun2(item)
                    }if(this.currId == 3){
                        this.getQueryMoneyCurrentYearFun(item)
                        this.getYearFun2(item)
                    }
                }else{
                    this.getQueryMoneyCurrentDayHourFun(item)
                }
            }
        },
        getChartFun1(title,data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('my-chart'));
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {},
                xAxis: {
                    data: title,
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                yAxis: {
                    show:false,
                    splitLine:{
                　　　　show:false
                　　}
                },
                series: [{
                    type: 'bar',
                    data: data,
                    itemStyle:{
                        normal:{
                            color:'#ce62d6'
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
                        name: '',
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
                legend: {},
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
        getChartFun4(title,data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('my-chart4'));
            // 绘制图表
            myChart.setOption({
                title: {
                    subtext: '交易额趋势',
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
                    }
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        stack: '总量',
                        data: data,
                        itemStyle:{
                            normal:{
                                color:'#18aaea'
                            }
                        },
                    }
                ]
            });
        },
        getChartFun5(title,data){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('my-chart5'));
            // 绘制图表
            myChart.setOption({
                title: {
                    subtext: '本月台账录入商户数',
                },
                tooltip : {
                    trigger: 'axis',
                },
                legend: {},
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
                        type:'line',
                        stack: '总量',
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
        getChartFun6(title,numArr,priceArr){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('my-chart6'));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data:['商品均价','商品交易量']
                },
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
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name:'商品交易量',
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
                                color:'#13c2c2'
                            }
                        },
                        data:numArr
                    },
                    {
                        name:'商品均价',
                        type:'line',
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:'#f88d48'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop'
                            }
                        },
                        data:priceArr
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
                    subtext: '交易额趋势',
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
                    }
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        stack: '总量',
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
                    // 商品当天
                    let str = 'node_id=' + this.loginId + '&region=' + this.titArr[0].bootList[0].shop_booth_id
                    QueryGoodsRankCurrentDay(str)
                        .then(res => {
                            res.data.zrange.forEach(val => {
                                val.num = val.score.toFixed(2)
                            })
                            this.goodArr = res.data.zrange.slice(0,10)
                            
                        })
                        .catch(res => {
                            console.log(res);
                        })
                    this.getGoodsWeightRankAndAvgPriceFun()
                    this.getQueryMoneyCurrentDayHourFun()
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        // 商品当天
        getDayFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryGoodsRankCurrentDay(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.goodArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商品本周
        getWeekFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryGoodsRankCurrentWeek(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.goodArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商品本月
        getMonthFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryGoodsRankCurrentMonth(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.goodArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })

        },
        // 商品当年
        getYearFun(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryGoodsRankCurrentYear(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.goodArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商户当天
        getDayFun2(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryBizRankCurrentDay(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.merchantsArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })

        },
        // 商户本周
        getWeekFun2(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryBizRankCurrentWeek(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.merchantsArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商户本月
        getMonthFun2(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryBizRankCurrentMonth(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.merchantsArr = res.data.zrange.slice(0,10)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 商户当年
        getYearFun2(item){
            let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
            QueryBizRankCurrentYear(str)
                .then(res => {
                    res.data.zrange.forEach(val => {
                        val.num = val.score.toFixed(2)
                    })
                    this.merchantsArr = res.data.zrange.slice(0,10)
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
                    let tableData = res.data, 
                        arr = [],
                        title = []
                    tableData.forEach(val => {
                        arr.push(val.NUM)
                        title.push(val.IN_DATE)
                    })
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
            if(item){
                let str = 'node_id=' + this.loginId + '&region=' + item.bootList[0].shop_booth_id
                GetGoodsWeightRankAndAvgPrice(str)
                    .then(res => {
                        let arr = res.data,
                            numArr = [],
                            title = [],
                            priceArr = [];
                        arr.forEach(val => {
                            numArr.push(val.score.toFixed(2))
                            title.push(val.value)
                            priceArr.push(val.average_price.toFixed(2))
                        })
                        this.getChartFun6(title,numArr,priceArr)
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }else{
                let str = 'node_id=' + this.loginId + '&region=' + this.titArr[0].bootList[0].shop_booth_id
                GetGoodsWeightRankAndAvgPrice(str)
                    .then(res => {
                        let arr = res.data,
                            numArr = [],
                            title = [],
                            priceArr = [];
                        arr.forEach(val => {
                            numArr.push(val.score.toFixed(2))
                            title.push(val.value)
                            priceArr.push(val.average_price.toFixed(2))
                        })
                        this.getChartFun6(title,numArr,priceArr)
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
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
                    arr.push(this.nums)
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
                    for(var key in obj){
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
                    for(var key in obj){
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
                    for(var key in obj){
                        arr.push(obj[key].toFixed(2))
                        title.push(key)
                    }

                    if(this.activeName == 'first'){
                        this.getChartFun4(title,arr)
                    }else if(this.activeName == 'second'){
                        this.getChartFun7(title,arr)
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
                        this.getChartFun7(title,arr)
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
                            this.getChartFun7(title,arr)
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
                            this.getChartFun7(title,arr)
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
                        this.getChartFun7(title,arr)
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
                    height:70px;
                }
            }
            .list{
                float: left;
                padding: 10px;
                margin: 10px;
                width: 23%;
                height: 200px;
                background: #fff;
                overflow: hidden;
                border: 1px solid #ccc;
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
                    font-size: 28px;
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
                }
                .num_1{
                    margin: 30px 0;
                }
                .proportion_1{
                    padding-bottom: 2px;
                    border-bottom: 1px solid #ccc;
                }
            }
            .list_2, .list_4{
                .proportion_2, .proportion_4{
                    margin-top: 20px;
                    padding-top: 6px;
                    border-top: 1px solid #ccc;
                }
            }
            .list_3,{
                .proportion_3, .proportion_4{
                    margin-top: 2px;
                    padding-top: 6px;
                    border-top: 1px solid #ccc;
                }
                .num_3,{
                    padding-bottom: 20px;
                }
            }
        }
        .second{
            clear: both;
            width: 100%;
            background: #fff;
            border: 1px solid #ccc;
            .box{
                margin: 0 auto;
                width: 1130px;
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
                margin-top: 20px;
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
                            font-size: 12px;
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
                border: 1px solid #ccc;
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
            color: #5156b8;
            border: 1px solid #5156b8 !important;
        }
        .indexs{
            border-radius: 50%;
            color: #fff;
            background: #5156b8;
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
    }
</style>
