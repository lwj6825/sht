<template>
    <div class="content reportCsLsit">
         <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="日期">
                        <el-select v-model="form.dataTime" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in timeArr" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in shopArr" :key="index" :label="item.shop_name" :name="'shop_id' + item.shop_id"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">历史记录</p>
                <div>
                    <el-button type="primary" @click="addFun" class="blue-bth">数据上报</el-button>
                    <div class="submit">
                        模板导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button class="import white-bth" @click="isFileFun(2)">下载模板</el-button>
                </div>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="by_week" label="日期" width="252"></el-table-column>
                    <el-table-column prop="saleroom" label="总销售额（万元）"></el-table-column>
                    <el-table-column prop="passenger_num" label="客流（人）"></el-table-column>
                    <el-table-column prop="passenger_price" label="客单价（元/人次）"></el-table-column>
                    <el-table-column prop="open_employee" label="开工人数（人/日均）"></el-table-column>
                    <el-table-column prop="open_employee_new" label="新增人数（人/日均）"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                            <el-button type="text" size="small" @click="downloadFun(scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <!--查看-->
        <div class="popup" v-if="isView">
            <div class="text">
                <div class="box-title">
                    <p class="tit">查看详情</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="box-msg">
                    <div class="msg-title">
                        <div class="left">
                            <p class="tit">丰台区商超市场监测销售情况统计表</p>
                            <p class="tit tit2">{{time}}（周四至周三）</p>
                        </div>
                        <div class="right">{{shop_name}}</div>
                    </div>
                    <div class="msg-table">
                        <el-table :data="tableData2" :header-cell-style="rowClass" height="338">
                            <el-table-column prop="report_date" label="日期" width="90" align="center"></el-table-column>
                            <el-table-column prop="node_type" label="总销售额（万元）" align="center">
                                <el-table-column prop="saleroom" :label="current_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="saleroom_old" :label="last_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="saleroom_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.saleroom_on != 0 && scope.row.saleroom_on != null ? scope.row.saleroom_on + '%' : scope.row.saleroom_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="node_name" label="客流（人）" align="center">
                                <el-table-column prop="passenger_num" :label="current_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="passenger_num_old" :label="last_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="passenger_num_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.passenger_num_on != 0 && scope.row.passenger_num_on != null ? scope.row.passenger_num_on + '%' : scope.row.passenger_num_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="node_name" label="客单价（元/人次）" align="center">
                                <el-table-column prop="passenger_price" :label="current_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="passenger_price_old" :label="last_year + '年'" align="center"></el-table-column>
                                <el-table-column prop="passenger_price_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.passenger_price_on != 0 && scope.row.passenger_price_on != null ? scope.row.passenger_price_on + '%' : scope.row.passenger_price_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="open_employee" label="开工人数（人/日均）" align="center"></el-table-column>
                            <el-table-column prop="open_employee_new" label="新增人数（人/日均）" align="center"></el-table-column>
                        </el-table>
                        <div class="tips">
                            <p class="total">在营业的商户总数{{biz_total}}家</p>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button @click="closeFun">关闭</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--数据上报-->
        <div class="popup add" v-if="isAdd">
            <div class="text">
                <div class="box-title">
                    <p class="tit">数据上报</p>
                    <p class="iconfont icon-close close" @click="closeFun2"></p>
                </div>
                <div class="box-msg">
                    <div class="msg-title">
                        <div class="left">
                            <p class="tit">丰台区商超市场监测销售情况统计表</p>
                            <p class="tit tit2">{{time}}（周四至周三）</p>
                        </div>
                        <div class="right">{{shop_name}}</div>
                    </div>
                    <div class="msg-table">
                        <div style="height: 350px; overflow:auto;">
                            <el-table :data="tableData3" :header-cell-style="rowClass" height="350">
                                <el-table-column prop="time" label="日期" width="90" align="center"></el-table-column>
                                <el-table-column prop="sale" label="总销售额（万元）" align="center">
                                    <el-table-column prop="sale_current" :label="current_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.sale_current" @input="inputFun"></el-input>
                                            <p class="increase" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="sale_last" :label="last_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.sale_last" @input="inputFun"></el-input>
                                            <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="passenger_flow" label="客流（人）" align="center">
                                    <el-table-column prop="passenger_flow_current" :label="current_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.passenger_flow_current" @input="inputFun"></el-input>
                                            <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="passenger_flow_last" :label="last_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.passenger_flow_last" @input="inputFun"></el-input>
                                            <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="passenger_price" label="客单价（元/人次）" align="center">
                                    <el-table-column prop="passenger_price_current" :label="current_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.passenger_price_current"></el-input>
                                            <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="passenger_price_last" :label="last_year + '年'" min-width="100" align="center">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.passenger_price_last"></el-input>
                                            <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="start_num" label="开工人数（人）" min-width="100" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.start_num"></el-input>
                                        <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="new_start_num" label="新增人数（人）" min-width="100" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.new_start_num"></el-input>
                                        <p class="increase none" v-if="scope.row.sale_rate > 20">较昨日+{{scope.row.sale_rate}}%</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="tips">
                            <div class="total">
                                <span>在营业的商户总数</span>
                                <el-input v-model="biz_total"></el-input>
                                <span>家</span>
                            </div>
                            <p class="total color-red">注：请于每周四12点前完成数据上报！</p>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button type="primary" @click="saveFun">保存</el-button>
                        <el-button @click="closeFun2">关闭</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--批量导入、导出-->
        <div class="popup file" v-if="isFile">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{types == 1 ? '模板导入' : '下载模板'}}</p>
                    <p class="iconfont icon-close close" @click="closeFun3"></p>
                </div>
                <div class="msg-box">
                    <div class="data">
                        <div class="tit">选择日期</div>
                        <div class="msg">
                            <el-select v-model="dataTime" filterable clearable placeholder="请选择">
                                <el-option v-for="(item, index) in timeArr" :key="index" :label="item" :value="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="file-btns">
                    <div v-if="types == 1">
                        <!--<span class="submit">
                            确认导入
                            <form id="upload" enctype="multipart/form-data" method="post">
                                <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                            </form>
                        </span>-->
                    </div>
                    <div v-else-if="types == 2">
                        <p class="download" @click="downloadFun2">确认下载</p>
                    </div>
                </div>
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
import timeObj from '../../assets/js/listTime.js'
import {QueryWeekReportList, QueryReportDetailsList, GetShopInfoByUserId, GetSavedReport, AddReport, ExportGwzxDetails, 
    ExportGwzxTemplate, GetYestodaySaleroom
} from '../../js/reportGwzx/reportGwzx.js'
import {importWeekReport, exportGwzxTemplate} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"reportCsLsit",
    data() {
        return {
            form: {
                dataTime: '',
            },
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            loading: true,
            isView: false,
            name: '',
            time: '',
            current_year: '',
            last_year: '',
            biz_total: '',
            cy_biz: '',
            tableData2: [],
            tableData3: [
                // {
                //     time: '',
                //     sale_current: '',
                //     sale_last: '',
                //     sale_rate: '',
                //     catering_current: '',
                //     catering_last: '',
                //     catering_rete: '',
                //     passenger_flow_current: '',
                //     passenger_flow_last: '',
                //     passenger_flow_rate: '',
                //     passenger_price_current: '',
                //     passenger_price_last: '',
                //     passenger_price_rate: '',
                //     start_num: '',
                //     new_start_num: '',
                // },
            ],
            types: '',
            isFile: false,
            dataTime: '',
            isAdd: false,
            timeArr: [],
            timeSlot: [],  
            startTime: '',
            endTime: '',
            activeName: '',
	        userId: '',
            rolename: '',
            shop_id: '',
            shop_name: '',
            current_data: '', // 当前星期
            saveArr: '', // 已保存数据
            file: '',
            shopArr: [],
            oldDayArr: [], // 上周三数据
            isChange: false,
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.name = localStorage.getItem('loginName');
        this.current_data = timeObj.weekday
        if(this.current_data == 4){
            timeObj.list.forEach((val, idx) => {
                if(idx > 0){
                    let arr = val[0].split('-'), arr2 = val[6].split('-');
                    let str =  arr[0] + '年' + arr[1] + '月' + arr[2] + '日-' + arr2[0] + '年' + arr2[1] + '月' + arr2[2] + '日';
                    this.timeArr.push(str)
                }
            })
            this.timeSlot = timeObj.list[1]
        }else{
            timeObj.list.forEach(val => {
                let arr = val[0].split('-'), arr2 = val[6].split('-');
                let str =  arr[0] + '年' + arr[1] + '月' + arr[2] + '日-' + arr2[0] + '年' + arr2[1] + '月' + arr2[2] + '日';
                this.timeArr.push(str)
            })
            this.timeSlot = timeObj.list[0]
        }
        var currentDate = new Date();
        this.current_year = currentDate.getFullYear()
        this.last_year = this.current_year - 1
        this.getGetShopInfoByUserId()
        setTimeout(() => {
            this.getGetYestodaySaleroom()
            this.getDataFun()
        }, 300)
    },
    watch: {
        'tableData3': {
            handler: function(newVal,oldVal){
                newVal.forEach((v, idx) => {
                    let num1 = '',
                        num2 = '',
                        num3 = '',
                        num4 = '',
                        num5 = '',
                        num6 = '',
                        num7 = '',
                        num8 = '',
                        num9 = '',
                        num10 = '';
                    if(v.sale_current){
                        num1 += v.sale_current;
                        v.sale_current = num1.replace(/[^\d.]/g,'')
                    }
                    if(v.sale_last){
                        num2 += v.sale_last;
                        v.sale_last = num2.replace(/[^\d.]/g,'')
                    }
                    if(v.passenger_flow_current){
                        num5 += v.passenger_flow_current;
                        v.passenger_flow_current = num5.replace(/[^\d.]/g,'')
                    }
                    if(v.passenger_flow_last){
                        num6 += v.passenger_flow_last;
                        v.passenger_flow_last = num6.replace(/[^\d.]/g,'')
                    }
                    if(v.passenger_price_current){
                        num7 += v.passenger_price_current;
                        v.passenger_price_current = num7.replace(/[^\d.]/g,'')
                    }
                    if(v.passenger_price_last){
                        num8 += v.passenger_price_last;
                        v.passenger_price_last = num8.replace(/[^\d.]/g,'')
                    }
                    if(v.start_num){
                        num9 += v.start_num;
                        v.start_num = num9.replace(/[^\d.]/g,'')
                    }
                    if(v.new_start_num){
                        num10 += v.new_start_num
                        v.new_start_num = num10.replace(/[^\d.-]/g,'')
                    }
                    if(idx == 6){
                        if(this.oldDayArr.length > 0){
                            if(this.oldDayArr[0].saleroom && this.oldDayArr[0].saleroom!= 0){
                                let num = ((newVal[idx].sale_current - this.oldDayArr[0].saleroom)/this.oldDayArr[0].saleroom)*100;
                                newVal[idx].sale_rate = this.strFun(num.toFixed(2))
                            }else{
                                newVal[idx].sale_rate = 0
                            }
                        }
                    }else{
                        if(newVal[idx + 1].sale_current && newVal[idx + 1].sale_current !=0){
                            let num = ((newVal[idx].sale_current - newVal[idx+1].sale_current)/newVal[idx+1].sale_current)*100;
                            newVal[idx].sale_rate = this.strFun(num.toFixed(2))
                        }else{
                            newVal[idx].sale_rate = 0
                        }
                    }
                    if(!v.passenger_price_current || this.isChange){
                        if(v.sale_current && v.sale_current != 0 && v.passenger_flow_current && v.passenger_flow_current != 0){
                            v.passenger_price_current = (v.sale_current*10000/v.passenger_flow_current).toFixed(2)
                        }
                    }
                    if(!v.passenger_price_last || this.isChange){
                        if(v.sale_last && v.sale_last != 0 && v.passenger_flow_last && v.passenger_flow_last != 0){
                            v.passenger_price_last = (v.sale_last*10000/v.passenger_flow_last).toFixed(2)
                        }
                    }
                })
                this.isChange = false
            },
            deep: true
        },
    },
    methods: {
        inputFun(){
            this.isChange = true
        },
        // 获取本周第二天的前一天数据（上周三）
        getGetYestodaySaleroom(){
            let obj = {
                user_id: this.userId,
                shop_id: this.shop_id,
                report_date: this.timeSlot[0],
            }
            GetYestodaySaleroom(obj)
                .then(res => {
                    this.oldDayArr = res.data.list
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleClick(tab, event) {
            this.shopArr.forEach(val => {
                if(this.activeName.substr(7) == val.shop_id){
                    this.biz_total = val.retailer_num
                    this.rolename = val.rolename
                    this.shop_id = val.shop_id
                    this.shop_name = val.shop_name
                }
            })
            this.getGetYestodaySaleroom()
            this.page = 1
            this.getDataFun()
        },
        // 根据user_id 返回门店数据
        getGetShopInfoByUserId(){
            let str = 'user_id=' + this.userId;
            GetShopInfoByUserId(str)
                .then(res => {
                    this.shopArr = res.data.list
                    if(this.activeName != 0){
                        res.data.list.forEach(val => {
                            if(this.activeName == 'shop_id' +val.shop_id){
                                this.biz_total = val.retailer_num
                                this.rolename = val.rolename
                                this.shop_id = val.shop_id
                                this.shop_name = val.shop_name
                            }
                        })
                    }else{
                        this.biz_total = res.data.list[0].retailer_num
                        // this.cy_biz = res.data.list[0].retailer_num_cater
                        this.rolename = res.data.list[0].rolename
                        this.shop_id = res.data.list[0].shop_id
                        this.shop_name = res.data.list[0].shop_name
                        this.activeName = 'shop_id' + res.data.list[0].shop_id
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 回显已保存的数据(数据上报)
        getGetSavedReport(){
            let obj = {
                user_id: this.userId,
                shop_id: this.shop_id,
                by_week: this.timeArr[0],
            }
            GetSavedReport(obj)
                .then(res => {
                    this.saveArr = res.data.savedReport
                    this.timeSlot.forEach(val => {
                        let arr = val.split('-');
                        let obj = {
                            time: arr[1] + '月' + arr[2] + '日',
                            data_time: val,
                            sale_current: '',
                            sale_last: '',
                            sale_rate: '',
                            catering_current: '',
                            catering_last: '',
                            catering_rete: '',
                            passenger_flow_current: '',
                            passenger_flow_last: '',
                            passenger_flow_rate: '',
                            passenger_price_current: '',
                            passenger_price_last: '',
                            passenger_price_rate: '',
                            start_num: this.oldDayArr.length > 0 ? this.oldDayArr[0].open_employee : '',
                            new_start_num: '0',
                            id: ''
                        }
                        this.tableData3.push(obj)
                    })
                    if(this.saveArr.length > 0){
                        this.saveArr.forEach(val => {
                            this.tableData3.forEach((val2, idx2) => {
                                if(val.report_date == val2.data_time){
                                    val2.sale_current = val.saleroom
                                    val2.sale_last = val.saleroom_old
                                    val2.sale_rate = val.saleroom_on
                                    val2.catering_current = val.saleroom_cater
                                    val2.catering_last = val.saleroom_cater_old
                                    val2.catering_rete = val.saleroom_cater_on
                                    val2.passenger_flow_current = val.passenger_num
                                    val2.passenger_flow_last = val.passenger_num_old
                                    val2.passenger_flow_rate = ''
                                    val2.passenger_price_current = val.passenger_price
                                    val2.passenger_price_last = val.passenger_price_old
                                    val2.passenger_price_rate = ''
                                    val2.start_num = val.open_employee
                                    val2.new_start_num = val.open_employee_new ? val.open_employee_new : '0'
                                    val2.id = val.id
                                }
                            })
                        })
                    }
                    this.tableData3.forEach((val, idx) => {
                        if(idx + 1 < 7){
                            this.tableData3[idx + 1].start_num = this.tableData3[idx].start_num
                        }
                    })
                    this.tableData3 = this.tableData3.reverse()
                    this.time = this.timeArr[0]
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 去除.00
        strFun(str){
			if(typeof(str)=='number'){
				str = JSON.stringify(str);
			}
			if(str){
				if(str.indexOf('.00') != -1){
				 str = str.substring(0,str.indexOf('.00'))
				}else{
				    str = str
				}
			}
		   return str
        },
        saleBlurFun(ele, idx){
            // if(idx == 6){
            //     return
            // }else{
            //     if(this.tableData3[idx + 1].sale_current){
            //         let num = ((this.tableData3[idx].sale_current - this.tableData3[idx+1].sale_current)/this.tableData3[idx+1].sale_current)*100;
            //         this.tableData3[idx].sale_rate = this.strFun(num.toFixed(2))
            //     }
            // }
        },
        // 导入，导出
        isFileFun(ele){
            this.types = ele 
            this.dataTime = this.timeArr[0]
            this.isFile = true
        },
        closeFun3(){
            this.isFile = false
            this.dataTime = ''
        },
        // 查看
        viewFun(ele){
            this.getGetShopInfoByUserId()
            this.isView = true
            let params = {
                week_id: ele.id,
                user_id: this.userId
            }
            QueryReportDetailsList(params)
                .then(res => {
                    this.tableData2 = res.data.list.reverse()
                    if(this.tableData2.length > 0){
                        this.time = ele.by_week
                        ele.report_date = '合计'
                        this.tableData2.push(ele)
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        closeFun(){
            this.isView = false
        },
        // 数据上报
        addFun(){
            this.getGetShopInfoByUserId()
            this.getGetSavedReport()
            this.isAdd = true
        },
        closeFun2(){
            this.isAdd = false
            this.tableData3 = []
        },
        saveFun(){
            let state = true;
            this.tableData3.forEach(val => {
                if(state){
                    if(val.sale_current == '' || val.sale_current == null){
                        // this.$message.warning('请输入' + this.current_year + '年' + val.time + '销售额');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.sale_last == '' || val.sale_last == null){
                        // this.$message.warning('请输入' + (this.last_year) + '年' + val.time + '销售额');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.passenger_flow_current == '' || val.passenger_flow_current == null){
                        // this.$message.warning('请输入' + this.current_year + '年' + val.time + '客流');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.passenger_flow_last == '' || val.passenger_flow_last == null){
                        // this.$message.warning('请输入' + this.last_year + '年' + val.time + '客流');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.passenger_price_current == '' || val.passenger_price_current == null){
                        // this.$message.warning('请输入' + this.current_year + '年' + val.time + '客单价');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.passenger_price_last == '' || val.passenger_price_last == null){
                        // this.$message.warning('请输入' + this.last_year + '年' + val.time + '客单价');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.start_num == '' || val.start_num == null){
                        // this.$message.warning('请输入开工人数');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                    if(val.new_start_num == '' || val.new_start_num == null){
                        // this.$message.warning('请输入新增开工人数');
                        this.$message.warning('请填写所有数据后保存');
                        state = false;
                        return;
                    }
                }
            })
            if(state){
                let arr = [], msgObj = {};
                this.tableData3.forEach(val => {
                    msgObj = {
                        by_week: this.timeArr[0],
                        is_upload: 1,
                        open_employee: val.start_num, // 开工人数
                        open_employee_new: val.new_start_num, // 新增开工人数
                        passenger_num: val.passenger_flow_current, // 当年客流量
                        passenger_num_old: val.passenger_flow_last, // 去年客流量
                        passenger_price: val.passenger_price_current, // 客单价
                        passenger_price_old: val.passenger_price_last,
                        report_date: val.data_time, // 报告日期
                        retailer_num: this.biz_total, // 商户总数
                        retailer_num_cater: this.cy_biz, // 餐饮商户总数
                        rolename: this.rolename, // 登录人?
                        saleroom: val.sale_current, // 销售额
                        saleroom_old: val.sale_last,
                        saleroom_on: val.sale_rate, // 销售额同比
                        saleroom_cater: '', // 餐饮销售额
                        saleroom_cater_old: '',
                        saleroom_cater_on: '',
                        user_id: this.userId,
                        shop_id: this.shop_id,
                        shop_name: this.shop_name,
                        // id: val.id
                    }
                    arr.push(msgObj)
                })
                console.log(arr)
                let obj = arr
                AddReport(obj)
                    .then(res =>{
                        if(res.result == true){
                            this.closeFun2()
                            this.getDataFun()
                            this.$message.success('保存成功');
                        }else{
                            this.$message.error(res.message ? res.message :'保存失败');
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        // 下载详情
        downloadFun(ele){
            this.loading = true
            let params = {
                week_id: ele.id,
                user_id: this.userId
            }
            ExportGwzxDetails( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    this.loading = false
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `丰台区商超及购物中心消费采集表` + ele.by_week);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {
                    this.loading = false
                });
        },
        // 下载模板
        downloadFun2(){
            if(this.dataTime){
                let params = {
                    by_week: this.dataTime,
                    user_id: this.userId
                }
                ExportGwzxTemplate( params, {})
                    .then((res) => {
                        let time = getNowFormatDate()
                        this.loading = false
                        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                        let url = window.URL.createObjectURL(blob);
                        let aLink = document.createElement("a");
                        aLink.style.display = "none";
                        aLink.href = url;
                        aLink.setAttribute("download", `丰台区商超及购物中心消费采集表` + this.dataTime);
                        document.body.appendChild(aLink);
                        aLink.click();
                        document.body.removeChild(aLink); 
                        window.URL.revokeObjectURL(url); 
                        this.isFile = false
                    })
                    .catch(function (res) {
                        this.loading = false
                    });
            }else{
                this.$message.warning('请选择日期');
                return;
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
            let url = importWeekReport
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message ? res.message : '导入失败');
                    }
                    this.isFile = false
                    this.file = ''
                    this.page = 1
                    this.getDataFun()
                    document.getElementById('upload').reset();
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getDataFun(){
            this.loading = true
            let params = {
                by_week: this.form.dataTime,
                shop_id: this.shop_id, // 超市门店编码
                cols: this.cols,
                page: this.page,
                user_id: Number(this.userId),
            }
            QueryWeekReportList(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.list
                    this.num = res.data.bean.total
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                dataTime: '',
            }
            this.page = 1
            this.startTime = ''
            this.endTime = ''
            this.getDataFun()
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
    @import '../../assets/css/common.css';
    .content{
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
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 240px;
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
        .tabs{
            margin-top: 10px;
            padding: 0 10px;
            background: #fff;
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .file-btns{
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
            }
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
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        .popup{
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
                margin-top: -260px;
                margin-left: -500px;
                width: 1011px;
                height: 520px;
                background: #fff;
                border-radius: 5px;
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
                .box-msg{
                    .msg-title{
                        margin: 10px 20px 0;
                        padding: 10px 0;
                        display: flex;
                        align-items: center;
                        border: 1px solid #EBEEF5;
                        .left{
                            flex: 1;
                            text-align: center;
                            .tit2{
                                font-size: 12px;
                            }
                        }
                        .right{
                            width: 200px;
                            font-size: 12px;
                        }
                    }
                }
                .msg-table{
                    margin: 0 20px;
                    .tips{
                        display: flex;
                        justify-content: space-between;
                        .total{
                            padding: 5px 0;
                            font-size: 14px;
                            .el-input{
                                width: 100px;
                            }
                        }
                        .color-red{
                            color: red;
                        }
                    }
                }
                .btn{
                    margin: 0 auto;
                    text-align: center;
                }
            }
        }
        .file{
            .text{
                margin-top: -100px;
                margin-left: -200px;
                height: 200px;
                width: 400px;
                .msg-box{
                    margin-top: 15px;
                    .data{
                        margin: 0 20px 10px;
                        display: flex;
                        .tit{
                            width: 80px;
                            line-height: 30px;
                            font-size: 14px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select, .el-input{
                            width: 240px;
                        }
                    }
                }
                .submit{
                    margin: 20px auto;
                    position: relative;
                    left: 25%;
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
                    margin: 20px auto;
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
            }
        }
        .add{
            .text{
                margin-top: -275px;
                margin-left: -470px;
                width: 940px;
                height: 550px;
                .el-input{
                    padding: 0 10px;
                }
                .increase{
                    height: 20px;
                    font-size: 12px;
                    color: red;
                    overFlow: hidden;
                }
                .none{
                    visibility:hidden;
                }
            }
        }
    }
</style>
<style lang="less">
    .reportCsLsit{
        .popup{
            .el-table th{
                padding: 0;
            }
            .el-table td {
                padding: 6px 0;
            }
            .el-input__icon{
                line-height: 30px;
            }
            .el-table__body-wrapper .is-scrolling-left{
                overflow: auto !important;
            }
            .el-table--scrollable-x .el-table__body-wrapper{
                overflow: auto !important;
            }
            .el-table__body-wrapper{
                overflow: auto !important;
            }
            .el-table .cell{
                padding: 0 !important;
                p{
                    line-height: 15px !important;
                }
            }
        }
    }
</style>

