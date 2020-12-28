<template>
    <div class="content enterpriseFt">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="日期">
                        <el-select v-model="form.dataTime" filterable placeholder="请选择" @change="selectFun">
                            <el-option v-for="(item, index) in timeArr" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择" @change="selectTypesFun">
                            <el-option label="超市" value="0"></el-option>
                            <el-option label="购物中心" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-select v-model="form.node_name" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in shopArr" :key="index" :label="item.shop_name" :value="item.shop_id"></el-option>
                        </el-select>
                    </el-form-item><!--
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    -->
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">历史记录</p>
                <div>
                    <el-button class="import white-bth" @click="downloadFun2">导出汇总表</el-button>
                </div>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="shop_name" label="企业名称"></el-table-column>
                    <el-table-column prop="saleroom" label="总销售额（万元）"></el-table-column>
                    <el-table-column prop="saleroom_cater" label="餐企销售额（万元）"></el-table-column>
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
                        <el-table :data="tableData2" :header-cell-style="rowClass" height="376">
                            <el-table-column prop="report_date" label="日期" width="90"></el-table-column>
                            <el-table-column prop="node_type" label="总销售额（万元）" align="center">
                                <el-table-column prop="saleroom" :label="current_year + '年'"></el-table-column>
                                <el-table-column prop="saleroom_old" :label="last_year + '年'"></el-table-column>
                                <el-table-column prop="saleroom_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.saleroom_on != 0 && scope.row.saleroom_on && scope.row.saleroom_on != null ? scope.row.saleroom_on + '%' : scope.row.saleroom_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="node_id" label="餐饮销售（万元）" align="center" v-if="shop_type != 0">
                                <el-table-column prop="saleroom_cater" :label="current_year + '年'"></el-table-column>
                                <el-table-column prop="saleroom_cater_old" :label="last_year + '年'"></el-table-column>
                                <el-table-column prop="saleroom_cater_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.saleroom_cater_on != 0 && scope.row.saleroom_cater_on && scope.row.saleroom_cater_on != null ? scope.row.saleroom_cater_on + '%' : scope.row.saleroom_cater_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="node_name" label="客流（人）" align="center">
                                <el-table-column prop="passenger_num" :label="current_year + '年'"></el-table-column>
                                <el-table-column prop="passenger_num_old" :label="last_year + '年'"></el-table-column>
                                <el-table-column prop="passenger_num_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.passenger_num_on && scope.row.passenger_num_on != 0 && scope.row.passenger_num_on != null ? scope.row.passenger_num_on + '%' : scope.row.passenger_num_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="node_name" label="客单价（元/人次）" align="center">
                                <el-table-column prop="passenger_price" :label="current_year + '年'"></el-table-column>
                                <el-table-column prop="passenger_price_old" :label="last_year + '年'"></el-table-column>
                                <el-table-column prop="passenger_price_on" label="同比(%)">
                                    <template slot-scope="scope">
                                        {{scope.row.passenger_price_on != 0 && scope.row.passenger_price_on  && scope.row.passenger_price_on != null ? scope.row.passenger_price_on + '%' : scope.row.passenger_price_on}}
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column prop="open_employee" label="开工人数（人/日均）"></el-table-column>
                            <el-table-column prop="open_employee_new" label="新增人数（人/日均）"></el-table-column>
                        </el-table>
                        <div class="tips">
                            <p class="total" v-if="shop_type == 0">在营业的商户总数{{biz_total}}家</p>
                            <p class="total" v-else>在营业的商户总数{{biz_total}}家，其中餐饮商户数为{{cy_biz}}家</p>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button @click="closeFun">关闭</el-button>
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
    ExportGwzxTemplate, ExportWeekReportExcel
} from '../../js/reportGwzx/reportGwzx.js'
export default {
    name:"enterpriseFt",
    data() {
        return {
            form: {
                dataTime: '',
                node_name: '',
                types: '',
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
            timeArr: [],
            timeSlot: [],
            startTime: '',
            endTime: '',
            userId: '',
            rolename: '',
            shop_id: '',
            shop_name: '',
            current_data: '', // 当前星期
            shopArr: [],
            shop_type: '',
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
        this.form.dataTime = this.timeArr[0]
        setTimeout(() => {
            this.getDataFun()
        }, 300)
    },
    methods: {
        selectTypesFun(ele){
            this.getGetShopInfoByUserId()
        },
        // 根据user_id 返回门店数据
        getGetShopInfoByUserId(){
            let str = 'user_id=' + this.userId + '&shop_type=' + this.form.types;
            GetShopInfoByUserId(str)
                .then(res => {
                    this.shopArr = res.data.list
                    // this.biz_total = res.data.list[0].retailer_num
                    // this.cy_biz = res.data.list[0].retailer_num_cater
                    // this.rolename = res.data.list[0].rolename
                    // this.shop_id = res.data.list[0].shop_id
                    // this.shop_name = res.data.list[0].shop_name
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectFun(ele){
            if(ele){
                let arr = ele.split('-');
                this.startTime = arr[0].split('.').join('-')
                this.endTime = arr[1].split('.').join('-')
            }else{
                this.startTime = ''
                this.endTime = ''
            }
        },
        viewFun(ele){
            this.biz_total = ele.retailer_num
            this.cy_biz = ele.retailer_num_cater
            this.rolename = ele.rolename
            this.shop_id = ele.shop_id
            this.shop_name = ele.shop_name
            this.shop_type = ele.shop_type
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
            this.biz_total = ''
            this.cy_biz = ''
            this.rolename = ''
            this.shop_id = ''
            this.shop_name = ''
            this.shop_type = ''
        },
        downloadFun2(){
            this.loading = true
            let params = {
                by_week: this.form.dataTime,
                user_id: this.userId
            }
            ExportWeekReportExcel( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    this.loading = false
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `丰台区商超及购物中心消费采集表` + this.form.dataTime);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {
                    this.loading = false
                });
        },
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
                    aLink.setAttribute("download", ele.shop_name + ele.by_week);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(re => {
                    this.loading = false
                });
        },
        getDataFun(){
            this.loading = true
            let params = {
                by_week: this.form.dataTime,
                shop_id: this.form.node_name ? this.form.node_name : '', // 超市门店编码
                shop_type: this.form.types ? this.form.types : '', // 超市门店编码
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
                node_name: '',
                types: '',
            }
            this.page = 1
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
                margin-top: -280px;
                margin-left: -500px;
                width: 1011px;
                height: 560px;
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
                    .total{
                        padding: 5px 0;
                        font-size: 14px;
                    }
                }
                .btn{
                    margin: 0 auto;
                    text-align: center;
                }
            }
        }
    }
</style>
<style lang="less">
    .enterpriseFt{
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
        }
    }
</style>
