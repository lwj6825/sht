<template>
    <div class="content monitorMsg">
        <div class="conditions" v-if="roleId != '80'">
            <ul>
                <li v-for="(item,index) in keyGroup" :key="index" :class="{checked_style:index == currId}" @click="focusFun(index,item)">{{item.name}}</li>
            </ul>
            <!--<p>自定义时间</p>
            <el-date-picker clearable style="width: 260px"
                v-model="dataTime" value-format="yyyy-MM-dd"
                type="daterange" @change="timeChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>-->
        </div>
        <div class="first">
            <div class="box">
                <div class="list">
                    <ul class="list_1">
                        <li class="list-title">
                            <p>企业数量</p>
                        </li> 
                        <li class="num num_1">{{list_num1}}</li>  
                    </ul>
                    <div class="proportion proportion_1">
                        <div>
                            <p>餐饮 {{qy_num1}}</p>
                            <p>批发 {{qy_num2}}</p>
                            <p>零售 {{qy_num3}}</p>
                            <p>超市 {{qy_num4}}</p>
                        </div>
                    </div><!--
                            <p>屠宰 {{qy_num5}}</p>
                        <li class="proportion_1"></li>   
                    <div id="my-chart1" class="echart"></div>-->
                </div>
                <div class="list">
                    <ul class="list_2">
                        <li>
                            <p class="list-title"><span v-if="roleId == '80'">昨日</span>已上报企业</p>
                            <p class="num num_1">{{list_num2}}<span style="font-size: 14px;">（占{{list_num11 + (roleId == '80' ? '%' : '')}}）</span></p>          
                        </li> 
                    </ul>
                    <!--<div class="proportion proportion_2">
                        <div></div>
                        <div>
                            <div id="my-chart2" class="echart"></div>
                        </div>
                    </div>-->
                    <div class="proportion proportion_3">
                        <div>
                            <p>{{arr1[2]}}&nbsp;</p>
                            <p>{{list_num3}}%</p>
                            <img v-if="list_num3 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_num3 < 0" src="../../assets/images/u732.png">
                        </div>
                    </div>
                </div>
                <div class="list">
                    <ul class="list_2">
                        <li>
                            <p class="list-title"><span v-if="roleId == '80'">昨日</span>上报数据量(条)</p>
                            <p class="num num_1">{{parseFloat(list_num4)}}</p>          
                        </li> 
                    </ul>
                    <!--<div class="proportion proportion_2">
                        <div></div>
                        <div>
                            <div id="my-chart3" class="echart"></div>
                        </div>
                    </div>-->
                    <div class="proportion proportion_3">
                        <div>
                            <p>{{arr2[2]}}&nbsp;</p>
                            <p>{{list_num5}}%</p>
                            <img v-if="list_num5 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_num5 < 0" src="../../assets/images/u732.png">
                        </div>
                    </div>
                </div>
                <div class="list">
                    <ul class="list_2">
                        <li>
                            <p class="list-title"><span v-if="roleId == '80'">昨日</span>上报商品种类</p>
                            <p class="num num_1">{{list_num6}}</p>          
                        </li> 
                    </ul>
                    <!--<div class="proportion proportion_2">
                        <div></div>
                        <div>
                            <div id="my-chart4" class="echart"></div>
                        </div>
                    </div>-->
                    <div class="proportion proportion_3">
                        <div>
                            <p>{{arr3[2]}}&nbsp;</p>
                            <p>{{list_num7}}%</p>
                            <img v-if="list_num7 > 0" src="../../assets/images/u731.png">
                            <img v-if="list_num7 < 0" src="../../assets/images/u732.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="second" v-loading="loading3" v-if="roleId != '80'">
            <p class="title">各类型企业上报数据量</p>
            <div id="my-chart5" class="echart"></div>
        </div><!---->
        <div class="third">
            <p class="title">生活必需品价格走势</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="猪肉走势" name="first"></el-tab-pane>
                <el-tab-pane label="蔬菜走势" name="second"></el-tab-pane>
                <el-tab-pane label="水果走势" name="third"></el-tab-pane>
                <el-tab-pane label="牛肉走势" name="fourth"></el-tab-pane>
                <el-tab-pane label="羊肉走势" name="seventh"></el-tab-pane>
                <el-tab-pane label="禽肉走势" name="fifth"></el-tab-pane><!--
                <el-tab-pane label="粮油走势" name="sixth"></el-tab-pane>-->
            </el-tabs>
            <div class="category">
                <p style="width: 60px;">品名：</p>
                <el-radio-group v-model="radio" @change="selectFun">
                    <el-radio v-for="(item, index) in categoryArr" :key="index" :label="item.name"></el-radio>
                </el-radio-group>
            </div><!--
            <div class="msg">
                <p>{{goods_type}}价格&nbsp;{{list_num8}}元/公斤</p>
                <p>日环比&nbsp;{{list_num9}}%</p>
                <p>月环比&nbsp;{{list_num10}}%</p>
            </div>-->
            <div id="my-chart6" class="echart"></div>
        </div>
        <div class="fourth">
            <div v-loading="loading">
                <p>猪肉来源省份</p>
                <div id="my-chart7" class="echart"></div>
            </div>
            <div v-loading="loading2">
                <p>蔬菜来源省份</p>
                <div id="my-chart8" class="echart"></div>
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
import {GetNodeCount, GetJdhydPc, QuantityReportedNew, GetGoodsAvgPc, GetWsPriceIndexPc, VegMeatProvince, VegetableProvince,
    GetGoodsType, GetNodeJgInfoType, GetPriceNode} from '../../js/monitor/monitor.js'
export default {
    name:"monitorMsg",
    data() {
        return {
            keyGroup: [
                {name: '昨日'},
                {name: '近7天'},
                {name: '本月'},
                {name: '本年'},
            ],
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            time: '',
            currId: '',
            dataTime: '',
            startTime: '',
            endTime: '', 
            list_num1: '0',
            list_num2: '0',
            list_num3: '0',
            list_num4: '0',
            list_num5: '0',
            list_num6: '0',
            list_num7: '0',
            list_num8: '0',
            list_num9: '0',
            list_num10: '0',
            list_num11: '0',
            activeName: 'first',
            categoryArr: [
                {name: '鲜猪肉'},
            ],
            radio: '鲜猪肉',
            node_id: '',
            types: 'day',
            goods_type: '猪肉类',
            currentTime: '',
            lsPriceArr: [], // 菜车
            pfPriceArr: [], // 批发
            csPriceArr: [], // 超市
            priceTit: [],
            yesterday: '',
            arr1: [],
            arr2: [],
            arr3: [],
            loading: true,
            loading2: true,
            loading3: true,
            qy_num1: '0',
            qy_num2: '0',
            qy_num3: '0',
            qy_num4: '0',
            qy_num5: '',
            node_id: '',
            roleId: '',
        }
    },
    mounted() {
        this.roleId = localStorage.getItem('roleId')
        if(localStorage.getItem('loginId') != 'undefined'){
            this.node_id = localStorage.getItem('loginId')
        }
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.dataTime = arr
        var current = new Date()
        this.currentTime = formatDate(current)
        var zt = new Date();
        var zttime = zt.setTime(zt.getTime() - 3600 * 1000 * 24);
        this.yesterday = timestampToTime(zttime)
        if(this.roleId == '80'){
            this.getGetPriceNode()
        }else{
            this.getGetJdhydPc()
            this.getQuantityReportedNew()
            this.getGetGoodsType()
        }
        this.getGetGoodsAvgPc1()
        this.getGetGoodsAvgPc2()
        this.getGetGoodsAvgPc3()
        this.getGetWsPriceIndexPc()
        this.getVegMeatProvince()
        this.getVegetableProvince()
    },
    methods: {
        // 首页查询节点数量接口
        getGetPriceNode(){
            let str = 'type=' + this.types
            GetPriceNode(str)
                .then(res => {
                    let dataNumList = res.data.dataNumList, // 各个环节数据的数量
                        goodsNumList = res.data.goodsNumList, // 商品
                        numList = res.data.numList, // 各个环节节点数量
                        onLineList = res.data.onLineList, // 各个环节在线节点的数量
                        title1 = [], title2 = [];
                    this.list_num6 = goodsNumList[0].today_num
                    this.list_num1 = res.data.total_num
                    if(this.types == 'day'){
                        title1 = ['昨日', '今日', '日环比']
                        this.arr3 = title1
                    }else if(this.types == 'week'){
                        title1 = ['上周', '本周', '周环比']
                        this.arr3 = title1
                    }else if(this.types == 'month'){
                        title1 = ['上月', '本月', '月环比']
                        this.arr3 = title1
                    }else if(this.types == 'year'){
                        title1 = ['上年', '本年', '年环比']
                        this.arr3 = title1
                    }
                    this.list_num7 = parseFloat(goodsNumList[0].rate)
                    let num = 0, num2 = 0;
                    let title = [], data = []
                    numList.forEach(val => {
                        title.push(val.node_type)
                        data.push(val.node_count)
                        if(val.node_type == '超市'){
                            this.qy_num4 = val.node_count
                        }else if(val.node_type == '零售市场'){
                            this.qy_num3 = val.node_count
                        }else if(val.node_type == '批发市场'){
                            this.qy_num2 = val.node_count
                        }else if(val.node_type == '生鲜配送'){
                            num = val.node_count
                        }else if(val.node_type == '团体消费单位'){
                            num2 = val.node_count
                        }
                    })
                    this.qy_num1 = num + num2
                    this.list_num4 = dataNumList[0].today_num
                    this.list_num5 = parseFloat(dataNumList[0].rate)
                    if(this.types == 'day'){
                        this.arr2 = ['昨日', '当前', '日环比']
                    }else if(this.types == 'week'){
                        title2 = ['上周', '本周', '周环比']
                        this.arr2 = title2
                        // this.getChartFun2(title2, arr2, arr3)
                    }else if(this.types == 'month'){
                        title2 = ['上月', '本月', '月环比']
                        this.arr2 = title2
                    }else if(this.types == 'year'){
                        title2 = ['上年', '本年', '年环比']
                        this.arr2 = title2
                    }
                    this.list_num2 = onLineList[0].today_num
                    this.list_num3 = parseFloat(onLineList[0].rate)
                    this.list_num11 = onLineList[0].numRate
                    if(this.types == 'day'){
                        this.arr1 = ['昨日', '当前', '日环比']
                    }else if(this.types == 'week'){
                        title2 = ['上周', '本周', '周环比']
                        this.arr1 = title2
                        // this.getChartFun2(title2, arr2, arr3)
                    }else if(this.types == 'month'){
                        title2 = ['上月', '本月', '月环比']
                        this.arr1 = title2
                    }else if(this.types == 'year'){
                        title2 = ['上年', '本年', '年环比']
                        this.arr1 = title2
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 上报商品种类
        getGetGoodsType(){
            let str = 'node_id=' + this.node_id + '&type=' + this.types
            GetGoodsType(str)
                .then(res => {
                    let msg1 = res.data.上报商品种类,
                        title1 = [],
                        arr1 = [],
                        arr2 = [];
                    if(this.types == 'day'){
                        title1 = ['昨日', '今日', '日环比']
                        this.arr3 = title1
                        arr1.push(msg1.昨日)
                        arr2.push(msg1.今日)
                        this.list_num6 = msg1.今日
                        let num = msg1.rate
                        this.list_num7 = parseFloat(num)
                        this.getChartFun4(title1, arr1, arr2)
                    }else if(this.types == 'week'){
                        title1 = ['上周', '本周', '周环比']
                        this.arr3 = title1
                        arr1.push(msg1.上周)
                        arr2.push(msg1.本周)
                        this.list_num6 = msg1.本周
                        let num = msg1.rate
                        this.list_num7 = parseFloat(num)
                        this.getChartFun4(title1, arr1, arr2)
                    }else if(this.types == 'month'){
                        title1 = ['上月', '本月', '月环比']
                        this.arr3 = title1
                        arr1.push(msg1.上月)
                        arr2.push(msg1.本月)
                        this.list_num6 = msg1.本月
                        let num = msg1.rate
                        this.list_num7 = parseFloat(num)
                        this.getChartFun4(title1, arr1, arr2)
                    }else if(this.types == 'year'){
                        title1 = ['上年', '本年', '年环比']
                        this.arr3 = title1
                        arr1.push(msg1.上年)
                        arr2.push(msg1.本年)
                        this.list_num6 = msg1.本年
                        let num = msg1.rate
                        this.list_num7 = parseFloat(num)
                        this.getChartFun4(title1, arr1, arr2)
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 选择商品类型
        selectFun(ele){
            this.getGetGoodsAvgPc1()
            this.getGetGoodsAvgPc2()
            this.getGetGoodsAvgPc3()
            this.getGetWsPriceIndexPc()
        },
        // 蔬菜省份来源
        getVegetableProvince(){
            this.loading2 = true
            let str = 'date=' + this.currentTime + '&node_id=' + this.node_id + '&type=month'
            VegetableProvince(str)
                .then(res => {
                    var theChar = res.data.图标;
                    var onlineList = [];
                    var onlineData = [];
                    let colorList = ['#F79646','#B65708','#4BACC6','#8064A2','#4B3D62','#F9AB6B','#276A7c']
                    for(var i=0;i<theChar.length;i++){
                        onlineList.push(theChar[i].SHENG);
                        var val = theChar[i].百分比.split('%')[0];
                        var obj ={
                            value:val, 
                            name: theChar[i].SHENG,
                            itemStyle:{
                                normal:{
                                    color:colorList[i],
                                }
                            }
                        }
                        onlineData.push(obj);
                    }	
                    this.getChartFun8(onlineData)
                })
                .catch((res) => {
                    this.loading2 = false
                    console.log(res)
                })
        },
        // 猪肉来源省份
        getVegMeatProvince(){
            this.loading = true
            let str = 'date=' + this.currentTime + '&node_id=' + this.node_id + '&type=month'
            VegMeatProvince(str)
                .then(res => {
                    var theChar = res.data.图标;
                    var onlineList = [];
                    var onlineData = [];
                    let colorList = ['#F79646','#B65708','#4BACC6','#8064A2','#4B3D62','#F9AB6B','#276A7c']
                    for(var i=0;i<theChar.length;i++){
                        onlineList.push(theChar[i].SHENG);
                        var val = theChar[i].百分比.split('%')[0];
                        var obj ={
                            value:val, 
                            name: theChar[i].SHENG,
                            itemStyle:{
                                normal:{
                                    color:colorList[i],
                                }
                            }
                        }
                        onlineData.push(obj);
                    }	
                    this.getChartFun7(onlineData)
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        // 生活必需品价格走势文字内容
        getGetWsPriceIndexPc(){
            // let goods_type = ''
            // if(this.goods_type == '猪肉类'){
            //     goods_type = '猪肉'
            // }else if(this.goods_type == '猪肉类'){
            //     goods_type = '猪肉'
            // }
            // let str = '';
            // str = 'goods_type=' + this.goods_type + '&node_id=' + this.node_id
            // GetWsPriceIndexPc(str)
            //     .then(res => {
            //         let data = res.data
            //         if(data.MonthPrice != 0){
            //             this.list_num8 = data.MonthPrice.toFixed(2)
            //         }else{
            //             this.list_num8 = 0
            //         }
            //         // if(data.today_rate){
            //         //     this.list_num9 = data.today_rate
            //         // }else{
            //         //     this.list_num9 = ''
            //         // }
            //         if(parseFloat(data.rate) != 0){
            //             this.list_num10 = data.rate.toFixed(2)
            //         }else{
            //             this.list_num10 = 0
            //         }
            //     })
            //     .catch((res) => {
            //         console.log(res)
            //     })
        },
        // 零售市场价格走势
        getGetGoodsAvgPc1(){
            // node_type零售市场，超市，批发市场
            let goods_name = ''
            if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
                goods_name = ''
            }else{
                goods_name = this.radio
            }
            let str = '';
            str = 'date=' + this.currentTime + '&node_type=零售市场' + '&goods_type=' + this.goods_type + '&node_id='
                + '&type=month' + '&goods_name=' + goods_name
            GetGoodsAvgPc(str)
                .then(res => {
                    let data = res.data.map,
                        title = [],
                        arr = [];
                    for(let key in data){
                        title.push(key)
                        arr.push(data[key].toFixed(2))
                    }
                    this.lsPriceArr = arr.slice(0,arr.length - 1)
                    this.priceTit = title
                    this.getChartFun6(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 超市价格走势
        getGetGoodsAvgPc2(){
            let goods_name = ''
            if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
                goods_name = ''
            }else{
                goods_name = this.radio
            }
            let str = '';
            str = 'date=' + this.currentTime + '&node_type=超市' + '&goods_type=' + this.goods_type + '&node_id='
            + '&type=month' + '&goods_name=' + goods_name
            // node_type零售市场，超市，批发市场
            GetGoodsAvgPc(str)
                .then(res => {
                    let data = res.data.map,
                        title = [],
                        arr = [];
                    for(let key in data){
                        title.push(key)
                        arr.push(data[key].toFixed(2))
                    }
                    this.csPriceArr = arr.slice(0,arr.length - 1)
                    this.priceTit = title
                    this.getChartFun6(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 批发价格走势
        getGetGoodsAvgPc3(){
            let goods_name = ''
            if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
                goods_name = ''
            }else{
                goods_name = this.radio
            }
            let str = '';
            str = 'date=' + this.currentTime + '&node_type=批发市场' + '&goods_type=' + this.goods_type + '&node_id='
            + '&type=month' + '&goods_name=' + goods_name
            // node_type零售市场，超市，批发市场
            GetGoodsAvgPc(str)
                .then(res => {
                    let data = res.data.map,
                        title = [],
                        arr = [];
                    for(let key in data){
                        title.push(key)
                        arr.push(data[key].toFixed(2))
                    }
                    this.pfPriceArr = arr.slice(0,arr.length - 1)
                    this.priceTit = title
                    this.getChartFun6(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 企业数量已上报企业
        getGetJdhydPc(){
            let str = 'node_id=' + this.node_id + '&type=' + this.types
            GetJdhydPc(str)
                .then(res => {
                    let msg1 = res.data.企业数据量
                    this.list_num1 = msg1.企业数量
                    let data1 = msg1
                    let title1 = [], arr1 = [];
                    for(let key in data1){
                        if(key == '团体消费单位'){
                            this.qy_num1 = data1[key];
                        }else if(key == '批发市场'){
                            this.qy_num2 = data1[key];
                        }else if(key == '零售市场'){
                            this.qy_num3 = data1[key];
                        }else if(key == '超市'){
                            this.qy_num4 = data1[key];
                        }else if(key == '屠宰企业'){
                            this.qy_num5 = data1[key];
                        }
                    }
                    let msg2 = res.data.已上报企业
                    let title2 = [], arr2 = [], arr3 = [], arr = [];
                    // this.getChartFun1(title1, arr1)
                    if(this.types == 'day'){
                        this.arr1 = ['昨日', '当前', '日环比']
                        title2 = title2.slice(0,2)
                        arr2.push(msg2.yesterday)
                        arr3.push(msg2.today)
                        let num = msg2.日环比
                        this.list_num3 = parseFloat(num)
                        this.list_num11 = msg2.占比
                        this.list_num2 = msg2.today
                        // this.getChartFun2(title2, arr2, arr3)
                    }else if(this.types == 'week'){
                        title2 = ['上周', '本周', '周环比']
                        this.arr1 = title2
                        title2 = title2.slice(0,2)
                        arr2.push(msg2.上周企业上报)
                        arr3.push(msg2.本周企业上报)
                        let num = msg2.周环比
                        this.list_num11 = msg2.占比
                        this.list_num3 = parseFloat(num)
                        this.list_num2 = msg2.本周企业上报
                        // this.getChartFun2(title2, arr2, arr3)
                    }else if(this.types == 'month'){
                        title2 = ['上月', '本月', '月环比']
                        this.arr1 = title2
                        title2 = title2.slice(0,2)
                        arr2.push(msg2.上月企业上报)
                        arr3.push(msg2.本月企业上报)
                        let num = msg2.月环比
                        this.list_num11 = msg2.占比
                        this.list_num3 = parseFloat(num)
                        this.list_num2 = msg2.本月企业上报
                        // this.getChartFun2(title2, arr2, arr3)
                    }else if(this.types == 'year'){
                        title2 = ['上年', '本年', '年环比']
                        this.arr1 = title2
                        title2 = title2.slice(0,2)
                        arr2.push(msg2.上年企业上报)
                        arr3.push(msg2.本年企业上报)
                        let num = msg2.年环比
                        this.list_num11 = msg2.占比
                        this.list_num3 = parseFloat(num)
                        this.list_num2 = msg2.本年企业上报
                        // this.getChartFun2(title2, arr2, arr3)
                    }
                    let msg3 = res.data.各类企业上报企业数据量
                    let title3 = [], arr4 = [];
                    for(let key2 in msg3){
                        title3.push(key2)
                        arr4.push(msg3[key2])
                    }
                    this.qyNum = arr4
                    this.qyTypes = title3
                    this.loading3 = false
                    this.getChartFun5(this.qyTypes, this.qyNum, this.qySjlNum)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 上报数据量
        getQuantityReportedNew(){
            let str = 'node_id=' + this.node_id + '&type=' + this.types
            QuantityReportedNew(str)
                .then(res => {
                    let msg1 = res.data.上报数据量
                    let title1 = [], arr1 = [], arr2 = [], arr = [];
                    if(this.types == 'day'){
                        this.arr2 = ['昨日', '当前', '日环比']
                        title1 = title1.slice(0,2)
                        arr1.push(msg1.yesterday)
                        arr2.push(msg1.today)
                        let num = msg1.日环比
                        this.list_num5 = parseFloat(num)
                        this.list_num4 = msg1.today
                        // this.getChartFun3(title1, arr1, arr2)
                    }else if(this.types == 'week'){
                        title1 = ['上周', '本周', '周环比']
                        this.arr2 = title1
                        title1 = title1.slice(0,2)
                        arr1.push(msg1.上周)
                        arr2.push(msg1.本周)
                        let num = msg1.周环比
                        this.list_num5 = parseFloat(num)
                        this.list_num4 = msg1.本周
                        // this.getChartFun3(title1, arr1, arr2)
                    }else if(this.types == 'month'){
                        title1 = ['上月', '本月', '月环比']
                        this.arr2 = title1
                        title1 = title1.slice(0,2)
                        arr1.push(msg1.上月)
                        arr2.push(msg1.本月)
                        let num = msg1.月环比
                        this.list_num5 = parseFloat(num)
                        this.list_num4 = msg1.本月
                        // this.getChartFun3(title1, arr1, arr2)
                    }else if(this.types == 'year'){
                        title1 = ['上年', '本年', '年环比']
                        this.arr2 = title1
                        title1 = title1.slice(0,2)
                        arr1.push(msg1.上年)
                        arr2.push(msg1.本年)
                        let num = msg1.年环比
                        this.list_num5 = parseFloat(num)
                        this.list_num4 = msg1.本年
                        // this.getChartFun3(title1, arr1, arr2)
                    }
                    let msg2 = res.data.各类企业上报数据量
                    let title2 = [], arr3 = [];
                    for(let key in msg2){
                        title2.push(key)
                        arr3.push(msg2[key])
                    }
                    this.qySjlNum = arr3
                    this.loading3 = false
                    this.getChartFun5(this.qyTypes, this.qyNum, this.qySjlNum)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 选择价格走势类型
        handleClick(tab, event) {
            if(this.activeName == 'first'){
                this.categoryArr = [
                    {name: '鲜猪肉'},
                ]
                this.radio = '鲜猪肉'
                this.goods_type = '猪肉类'
            }else if(this.activeName == 'second'){
                this.categoryArr = [
                    {name: '蔬菜'},
                    {name: '白萝卜'},
                    {name: '菜花'},
                    {name: '葱头'},
                    {name: '大白菜'},
                    {name: '大葱'},
                    {name: '大蒜'},
                    {name: '冬瓜'},
                    {name: '豆角'},
                    {name: '胡萝卜'},
                    {name: '黄豆芽'},
                    {name: '黄瓜'},
                    {name: '尖椒'},
                    {name: '韭菜'},
                    {name: '苦瓜'},
                    {name: '绿豆芽'},
                    {name: '平菇'},
                    {name: '芹菜'},
                    {name: '青椒'},
                    {name: '生菜'},
                    {name: '生姜'},
                    {name: '蒜苗'},
                    {name: '土豆'},
                    {name: '莴笋'},
                    {name: '西红柿'},
                    {name: '小白菜'},
                    {name: '心里美萝卜'},
                    {name: '油菜'},
                    {name: '油麦菜'},
                    {name: '圆白菜'},
                    {name: '圆茄子'},
                ]
                this.radio = '蔬菜'
                this.goods_type = '蔬菜'
            }else if(this.activeName == 'third'){
                this.categoryArr = [
                    {name: '水果'},
                    // {name: '橙子'},
                    // {name: '冬枣'},
                    {name: '富士苹果'},
                    {name: '国产香蕉'},
                    {name: '哈密瓜'},
                    // {name: '红心柚'},
                    {name: '皇冠梨'},
                    {name: '火龙果'},
                    // {name: '巨峰葡萄'},
                ]
                this.radio = '水果'
                this.goods_type = '水果类'
            }else if(this.activeName == 'fourth'){
                this.categoryArr = [
                    {name: '鲜牛肉'}
                ]
                this.radio = '鲜牛肉'
                this.goods_type = '牛肉类'
            }else if(this.activeName == 'fifth'){
                this.categoryArr = [
                    {name: '禽肉'},
                    {name: '白条鸡'},
                    {name: '鸭子'},
                ]
                this.radio = '禽肉'
                this.goods_type = '禽肉类'
            }else if(this.activeName == 'sixth'){
                this.categoryArr = [
                    // {name: ''}
                ]
                this.radio = ''
                this.goods_type = '粮油副食'
            }else if(this.activeName == 'seventh'){
                this.categoryArr = [
                    {name: '鲜羊肉'}
                ]
                this.radio = '鲜羊肉'
                this.goods_type = '羊肉类'
            }
            this.getGetGoodsAvgPc1()
            this.getGetGoodsAvgPc2()
            this.getGetGoodsAvgPc3()
            this.getGetWsPriceIndexPc()
        },
        getChartFun1(title, data){
            // 基于准备好的dom，初始化echarts实例
            var myChart1 = this.$echarts.init(document.getElementById('my-chart1'));
            // 绘制图表
            myChart1.setOption({
                tooltip: {},
                xAxis:  {
                    type: 'category',
                    data: title,
                },
                yAxis: {
                    type: 'value',
                    show:false,
                },
                series: [
                    {
                        type:'bar',
                        data: data,
                        itemStyle:{
                            normal:{
                                color:'#ce62d6'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun2(title, data1, data2){
            // 基于准备好的dom，初始化echarts实例
            var myChart2 = this.$echarts.init(document.getElementById('my-chart2'));
            // 绘制图表
            myChart2.setOption({
                tooltip: {
                    position: ['0', '50%']
                },
                xAxis:  {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                    show:false,
                },
                series: [
                    {
                        name: title[0],
                        type:'bar',
                        data: data1,
                        itemStyle:{
                            normal:{
                                color:'#9999ff'
                            }
                        },
                        
                    },
                    {
                        name: title[1],
                        type:'bar',
                        data: data2,
                        itemStyle:{
                            normal:{
                                color:'#ce62d6'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun3(title, data1, data2){
            // 基于准备好的dom，初始化echarts实例
            var myChart3 = this.$echarts.init(document.getElementById('my-chart3'));
            // 绘制图表
            myChart3.setOption({
                tooltip: {
                    position: ['0', '50%']
                },
                xAxis:  {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                    show:false,
                },
                series: [
                    {
                        name: title[0],
                        type:'bar',
                        data: data1,
                        itemStyle:{
                            normal:{
                                color:'#9999ff'
                            }
                        },
                        
                    },
                    {
                        name: title[1],
                        type:'bar',
                        data: data2,
                        itemStyle:{
                            normal:{
                                color:'#ce62d6'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun4(title,data1, data2){
            // 基于准备好的dom，初始化echarts实例
            var myChart4 = this.$echarts.init(document.getElementById('my-chart4'));
            // 绘制图表
            myChart4.setOption({
                tooltip: {},
                xAxis:  {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                    show:false,
                },
                series: [
                    {
                        name: title[0],
                        type:'bar',
                        data: data1,
                        itemStyle:{
                            normal:{
                                color:'#9999ff'
                            }
                        },
                        
                    },
                    {
                        name: title[1],
                        type:'bar',
                        data: data2,
                        itemStyle:{
                            normal:{
                                color:'#ce62d6'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun5(title, data1, data2){
            this.loading3 = false
            let max1 = 0, max2 = 0;
            if(data1){
                max1 = Math.max(...data1);
            }
            if(data2){
                max2 = Math.max(...data2);
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart5 = this.$echarts.init(document.getElementById('my-chart5'));
            // 绘制图表
            myChart5.setOption({
                tooltip: {},
                legend: {
                    data: ['数据量', '上报企业数量']
                },
                xAxis:  {
                    type: 'category',
                    data: title
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '数据量（万条）',
                        max: max2,
                        splitLine:{
                            show:false
                        },
                    },
                    {
                        type: 'value',
                        name: '上报企业数量（个）',
                        max: max1,
                        splitLine:{
                            show:false
                        },
                    }
                ],
                series: [
                    {
                        name: '数据量',
                        type:'bar',
                        data: data2,
                        barWidth: '20%',
                        itemStyle:{
                            normal:{
                                color:'#199ed8'
                            }
                        },
                        
                    },
                    {
                        name: '上报企业数量',
                        type:'bar',
                        data: data1,
                        yAxisIndex: 1,
                        barWidth: '20%',
                        itemStyle:{
                            normal:{
                                color:'#ff9966'
                            }
                        },
                        
                    }
                ]
            });
        },
        getChartFun6(title, data1, data2, data3){
            let legend = []
            let count1 = 0, count2 = 0, count3 = 0;
            data1.forEach(val => {
                if(val == '0.00'){
                    count1++
                }
            })
            if(count1 == data1.length){
                data1 = []
            }
            data2.forEach(val => {
                if(val == '0.00'){
                    count2++
                }
            })
            if(count2 == data2.length){
                data2 = []
            }
            data3.forEach(val => {
                if(val == '0.00'){
                    count3++
                }
            })
            if(count3 == data3.length){
                data3 = []
            }
            if(data1.length != 0){
                if(this.activeName == 'first' || this.roleId != '80'){
                    legend.unshift('批发价格走势')
                }else{
                    legend.unshift('商超价格走势')
                }
            } 
            if(data2.length != 0){
                legend.unshift('超市价格走势')
            } 
            if(data3.length != 0){
                legend.unshift('菜车价格走势')
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart6 = this.$echarts.init(document.getElementById('my-chart6'));
            // 绘制图表
            myChart6.setOption({
                tooltip: {
                    trigger: 'axis',
                    // formatter: '{b}: {c} 元/公斤'
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    data: title,
                },
                yAxis: {
                    type: 'value',
                    name: '价格（元/公斤）',
                },
                series: [
                    {
                        name: (this.activeName == 'first' || this.roleId != '80') ? '批发价格走势' : '商超价格走势',
                        type: 'line',
                        data: data1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        itemStyle:{
                            normal:{
                                color: (this.activeName == 'first' || this.roleId != '80') ? '#199ED8' : '#19A96E'
                            }
                        },
                    },
                    {
                        name: '超市价格走势',
                        type: 'line',
                        data: data2,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        itemStyle:{
                            normal:{
                                color:'#FF9966'
                            }
                        },
                    },
                    {
                        name: '菜车价格走势',
                        type: 'line',
                        data: data3,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        itemStyle:{
                            normal:{
                                color:'#FF6666'
                            }
                        },
                    },
                ]
            });
        },
        getChartFun7(data){
            this.loading = false
            // 基于准备好的dom，初始化echarts实例
            var myChart7 = this.$echarts.init(document.getElementById('my-chart7'));
            // 绘制图表
            myChart7.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                },
                series : [
                    {
                        type: 'pie',
                        radius : ['50%', '70%'],
                        selectedMode: 'single',
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
        getChartFun8(data){
            this.loading2 = false
            // 基于准备好的dom，初始化echarts实例
            var myChart8 = this.$echarts.init(document.getElementById('my-chart8'));
            // 绘制图表
            myChart8.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                },
                // legend: {
                //     data: title,
                // },
                series : [
                    {
                        type: 'pie',
                        radius : ['50%', '70%'],
                        selectedMode: 'single',
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },
        // 切换日月周年
        focusFun(item){
            if(this.currId){
                if(this.currId !== item){
                    this.currId = item
                }
            }else{
                this.currId = item
            }
            if(item == 0){
                this.types = 'day'
            }else if(item == 1){
                this.types = 'week'
            }else if(item == 2){
                this.types = 'month'
            }else if(item == 3){
                this.types = 'year'
            }
            if(this.roleId == '80'){
                this.getGetPriceNode()
            }else{
                this.loading3 = true
                this.getGetJdhydPc()
                this.getQuantityReportedNew()
                this.getGetGoodsType()
            }
            // this.getGetJdhydPc()
            // this.getQuantityReportedNew()
            // this.getGetGoodsAvgPc1()
            // this.getGetGoodsAvgPc2()
            // this.getGetGoodsAvgPc3()
            // this.getGetGoodsType()
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime()
            }
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100;
        height: 100%; 
        .conditions{
            margin-bottom: 10px;
            padding: 10px 0;
            display: flex;
            justify-content: center;
            background: #fff;
            ul{
                display: flex;
                li{
                    margin: 0 10px;
                    font-size: 14px;
                    line-height: 30px;
                    cursor: pointer;
                }
            }
            p{
                margin: 0 10px;
                font-size: 14px;
                line-height: 30px;
            }
        }
        .first{
            clear: both;
            width: 100%;
            overflow: hidden;
            .box{
                width: 100%;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
            }
            .echart{
                margin: 0 auto;
                width: 100%;
                height:60px;
            }
            .list{
                flex: 1;
                margin-right: 10px;
                padding: 10px 10px 3px;
                background: #fff;
                overflow: hidden;
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
                    margin: 10px 0;
                    height: 38px;
                    font-size: 24px;
                }
                .proportion{
                    display: flex;
                    div{
                        width: 140px;
                        height: 30px;
                        font-size: 12px;
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
            .list:last-child{
                margin-right: 0;
            }
            .proportion_1{
                border-top: 1px solid #ccc;
                div{
                    flex: 1;
                    display: flex;
                    p{
                        flex: 1;
                    }
                }
            }
            .proportion_2{
                padding-top: 13px;
                border-top: 1px solid #ccc;
            }

            .list_2{
                display: flex;
                justify-content: space-between;
            }
            .proportion_3{
                border-top: 1px solid #ccc;
                span{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #9999ff;
                }
                .now{
                    background: #ce62d6;
                }
            }
        }
        .second{
            margin-top: 10px;
            width: 100%;
            height: 320px;
            background: #fff;
            .title{
                padding: 20px 50px;
                font-size: 14px;
            }
            .echart{
                margin: 0 auto;
                width: 100%;
                height:280px;
            }
        }
        .third{
            margin-top: 10px;
            width: 100%;
            height: 470px;
            background: #fff;
            .title{
                padding: 20px 50px;
                font-size: 14px;
            }
            .category{
                margin: 0 50px 20px;
                display: flex;
                width: 100%;
                font-size: 14px;
                p{
                    width: 60px;
                }
                .el-radio-group{
                    flex: 1;
                }
            }
            .msg{
                margin: 10px auto;
                display: flex;
                width: 400px;
                height: 30px;
                font-size: 14px;
                line-height: 30px;
                background: #13C2C2;
                color: #fff;
                p{
                    flex: 1;
                    text-align: center;
                }
            }
            .echart{
                margin: 0 auto;
                width: 100%;
                height:300px;
            }
        }
        .fourth{
            clear: both;
            margin-top: 10px;
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            div:first-child{
                width: 49%;
                margin-right: 10px;
            }
            div:last-child{
                flex: 1;
            }
            div{
                width: 49%;
                background: #fff;
            }
            p{
                margin-left: 20px;
                margin-top: 20px;
                font-size: 14px;
            }
            .echart{
                margin: 0 auto;
                width: 100%;
                height: 450px;
            }
        }
        .checked_style{
            color: #409EFF;
        }
    }
</style>
<style lang="less">
    .monitorMsg{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-tabs{
            margin: 0 50px;
        }
        .el-radio{
            width: 100px;
            line-height: 1.5;
        }
    }
</style>