<template>
    <div class="content quotationList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期：">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <!-- <span class="clear-content" @click="clearFun">清空筛选条件</span> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">历史报价</p>
                <div>
                    <el-button type="primary" @click="addFun"> + 添加市场报价</el-button>
                    <el-button type="primary" @click="merchantFun">按商户查看</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass" v-loading="Dataloading">
                    <el-table-column prop="date" label="填报日期"> </el-table-column>
                    <el-table-column prop="num" label="上报商品数量">
                      <template slot-scope="scope">
                        {{'已上报'+scope.row.num+'种商品'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="text" size="small" @click="viewFun(scope.row)">查看报价单</el-button><!--
                                <el-button type="text" size="small" @click="deleteFun(scope.row)">删除报价单</el-button>-->
                                <!-- <el-button type="text" size="small" @click="merchantFun(scope.row)">按商户查看</el-button> -->
                                <el-button type="text" size="small" @click="againFun(scope.row)">再次报价</el-button>
                            </div>
                            <!-- <el-button v-else type="text" size="small" @click="addFun(scope.row)">添加报价单</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
             <!-- 选择商户 -->
            <div class="passwrd" v-if="chooseMer">
                <div class="text" style="height: 400px;width: 460px;margin-left: -230px;margin-top: -200px;">
                    <div class="box-title">
                        <p class="tit">选择再次报价商户</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <div>
                        <el-tabs v-model="activeName" @tab-click="handleClick1">
                            <el-tab-pane label="全部" name="first"></el-tab-pane>
                            <el-tab-pane v-for="(item5,index5) in regionArr" :key="index5" :label="item5.BOOTH_NAME"
                                :name="item5.BOOTH_NAME"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="table">
                        <el-table :data="merchantArr" :header-cell-style="rowClass" @row-click="handleRow" height="300" v-loading="merloading">
                            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                            <el-table-column prop="biz_name" label="商户名称"></el-table-column>
                            <el-table-column prop="stall_no" label="摊位号"></el-table-column>
                        </el-table>
                    </div>

                </div>
            </div>
            <!--新增-->
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit" v-if="isAgain">再次报价</p>
                        <p class="tit" v-else>添加市场报价</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <div class="msg-box" v-if="isAgain">
                        <div class="data">
                            <div class="tit">所属区域：</div>
                            <div class="msg">{{region_name}}</div>
                        </div>
                        <div class="data">
                            <div class="tit">所属商户：</div>
                            <div class="msg">{{merchantName}}</div>
                        </div>
                    </div>
                    <div v-if="region == '' && !isAgain">
                        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="istableAdd">
                            <el-tab-pane label="全部" name="first"></el-tab-pane>
                            <el-tab-pane v-for="(item4,index4) in regionArr" :key="index4" :label="item4.BOOTH_NAME"
                                :name="item4.BOOTH_NAME"></el-tab-pane>
                        </el-tabs>
                        <el-tabs v-model="activeName" @tab-click="handleClick" v-else>
                            <el-tab-pane label="全部" name="first"></el-tab-pane>
                            <el-tab-pane v-for="(item5,index5) in regionArr" :key="index5" :label="item5.BOOTH_NAME"
                                :name="item5.BOOTH_NAME"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="search">
                        <p>
                            <el-input style="width: 300px;" clearable v-model="name" type="text" placeholder="搜索商品"></el-input>
                            <el-button @click="searchGoodFun" type="primary" class="ss-btn">搜索</el-button>
                        </p>
                        <el-button v-if="!isAgain" @click="znlrFun" plain class="znlr-btn">智能录入</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="tableData2" :header-cell-style="rowClass" height="420" v-loading="loading">
                            <el-table-column prop="goods_name" label="商品名称">
                                <template slot-scope="scope">
                                    <div class="name">
                                        <div v-if="!isAgain">
                                            <p>{{scope.row.goods_name}}</p>
                                            <p class="name-p" v-if="scope.row.yesterday_price">{{'昨日价格' + '￥' + (scope.row.goods_unit=='斤'?scope.row.yesterday_price/2:scope.row.yesterday_price)}}</p>
                                            <p class="name-p" v-if="scope.row.history_price && !scope.row.yesterday_price">{{'历史价格' + '￥' + scope.row.history_price}}</p>
                                        </div>
                                        <div v-else>
                                            <p>{{scope.row.goods_name}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num" label="销售价">
                                <template slot-scope="scope">
                                    <div class="num">
                                        <div v-if="!isAgain">
                                            <p>
                                                <el-input @change="inputFun(scope.row)" size="min" clearable v-model="scope.row.price" type="text" placeholder="请填写零售价"></el-input>
                                            </p>
                                            <p class="num-p" v-if="scope.row.rate > 0">{{'上涨' + scope.row.rate + '%'}}</p>
                                            <p class="num-p" v-else-if="scope.row.xiaj">{{'下降' + scope.row.xiaj + '%'}}</p>
                                            <p class="num-p" v-else></p>
                                        </div>
                                        <div v-else>
                                            <p>
                                                <el-input @change="inputFun(scope.row)" size="min" clearable v-model="scope.row.price" type="text" placeholder="请填写零售价"></el-input>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_unit" label="规格" width="100">
                                <template slot-scope="scope">
                                    <p v-if="scope.row.specifications && scope.row.count">{{Number(scope.row.count).toFixed(0) + scope.row.specifications + '/' + scope.row.goods_unit}}</p>
                                    <p v-else>{{scope.row.goods_unit}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="btn">
                        <span>共{{tableData2.length}}种商品</span>
                        <el-button @click="closeFun" style="margin-left: 330px;">取消</el-button>
                        <el-button type="primary" @click="allAddFun" v-if="allGood.length > 0">确认上报</el-button>
                        <el-button type="primary" @click="submitForm" v-else>确认上报</el-button>
                    </div>
                </div>
            </div>
            <!--智能录入-->
            <div class="passwrd znlr" v-if="isZnlr">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">智能录入</p><!---->
                        <p class="iconfont icon-close close" @click="closeFun2"></p>
                    </div>
                    <p class="rules">粘贴文字，自动识别商品名称、零售价</p>
                    <textarea v-model="message" placeholder="例：土豆15黄瓜20"></textarea>
                    <div class="btn">
                        <el-button type="primary" @click="submitForm2">智能识别</el-button>
                    </div>
                </div>
            </div>
            <!--查看-->
            <div class="passwrd" v-if="isView">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">查看报价单</p>
                        <p class="iconfont icon-close close" @click="closeFun4"></p>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="first"></el-tab-pane>
                        <el-tab-pane v-for="(item,index) in regionArr" :key="index"  :label="item.BOOTH_NAME"
                            :name="item.BOOTH_NAME"></el-tab-pane>
                    </el-tabs>
                    <div class="search">
                        <p>
                            <el-input style="width: 300px;" clearable v-model="name" type="text" placeholder="搜索商品"></el-input>
                            <el-button @click="searchGoodFun" type="primary" class="ss-btn">搜索</el-button>
                        </p>
                    </div>
                    <div class="table">
                        <el-table :data="tableData2" :header-cell-style="rowClass" height="420" v-loading="loading2">
                            <el-table-column prop="goods_name" label="商品名称">
                                <template slot-scope="scope">
                                    <div class="name" @click="goodMsgFun(scope.row)">
                                        <div>
                                            <p>{{scope.row.goods_name}}</p>
                                            <p class="name-p" v-if="scope.row.yesterday_price">{{'昨日价格' + '￥' + (scope.row.goods_unit=='斤'?scope.row.yesterday_price/2:scope.row.yesterday_price)}}</p>
                                            <p class="name-p" v-if="scope.row.history_price && !scope.row.yesterday_price">{{'历史价格' + '￥' + scope.row.history_price}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="销售价">
                                <template slot-scope="scope">
                                    <div class="num">
                                        <div>
                                            <p class="price" v-if="scope.row.price">{{scope.row.goods_unit=='斤'?scope.row.price/2:scope.row.price}}</p>
                                            <p class="price" v-else>{{scope.row.price}}</p>
                                            <p class="num-p" v-if="scope.row.rate > 0">{{'上涨' + scope.row.rate + '%'}}</p>
                                            <p class="num-p" v-else-if="scope.row.xiaj">{{'下降' + scope.row.xiaj + '%'}}</p>
                                            <p class="num-p" v-else></p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_unit" label="规格" width="100">
                                <template slot-scope="scope">
                                    <p v-if="scope.row.specifications && scope.row.count">{{Number(scope.row.count).toFixed(0) + scope.row.specifications + '/' + scope.row.goods_unit}}</p>
                                    <p v-else>{{scope.row.goods_unit}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="btn">
                        <span>共{{tableData2.length}}种商品</span>
                        <el-button @click="closeFun4" style="margin-left: 420px;">取消</el-button>
                    </div>
                </div>
            </div>
            <!--查看商品详细信息-->
            <div class="passwrd goodMsg" v-if="isGoodMsg">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">{{goodName}}</p>
                        <p class="iconfont icon-close close" @click="closeFun5"></p>
                    </div>
                    <div class="table" v-loading="loading3">
                        <el-table :data="tableData3" :header-cell-style="rowClass" height="310">
                            <el-table-column prop="goods_name" label="商户名称">
                                <template slot-scope="scope">
                                    <div class="name">
                                        <div>
                                            <p @click="bizViewFun(scope.row)">{{scope.row.biz_name}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="销售价">
                                <template slot-scope="scope">
                                    <div class="num">
                                        <div>
                                            <p class="price" v-if="scope.row.price">{{scope.row.goods_unit=='斤'?scope.row.price/2:scope.row.price}}</p>
                                            <p class="price" v-else>{{scope.row.price}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="goods_unit" label="规格" width="100">
                                <template slot-scope="scope">
                                    <p v-if="scope.row.specifications && scope.row.count">{{Number(scope.row.count).toFixed(0) + scope.row.specifications + '/' + scope.row.goods_unit}}</p>
                                    <p v-else>{{scope.row.goods_unit}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
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
import {getQueryNodeInfoIndex,getQueryIndex,getQueryGoodsForBiz,getInsert,getQueryRegion,AutoIdentity,getInsertList,getQueryGoodsForNode,
    getQueryRegionForGoodsPrice,getQueryGoodsIndex,getQueryIndexDate,getQueryNodeGoodsBiz} from '../../js/quotation/quotation.js'
import {allBizs} from "../../js/management/management.js";
import {GetAllNode} from '../../js/user/user.js'
import {GetMarkets} from '../../js/district/district.js';
export default {
    name:"quotationList",
    data() {
        return {
            isShow: true,
            form: {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
            },
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            page2: 1,
            cols2: 15,
            num2: 0,
            tableData: [],
            userId: '',
            enterpriseArr: [],
            tbqyArr: [],
            statesArr: [],
            isfile: false,
            isEdits: false,
            merchant: '',
            merchantName:'',
            merchantArr: [],
            tbqy: '',
            in_date: '',
            name: '',
            tableData2: [],
            goodNum: '',
            isZnlr: false,
            message: '',
            activeName: 'first',
            isView: false,
            tbrqView: '',
            tbqyView: '',
            tbqyUserId: '',
            tbqyName: '',
            region: '',
            regionArr: [],
            newGoodArr: [],
            newGoodObj: {},
            biz_id: '',
            biz_name: '',
            viewNodeId: '',
            istableAdd: false, // 点击列表操作添加报表
            allGood: [],
            selectGood: [],
            company: 0,
            isSearch: false, // 是否搜索报价商品
            unitName: '公斤',
            node_id: '',
            viewGood: [],
            isGoodMsg: false,
            goodName: '',
            tableData3: [],
            loading: false, // 新增商品
            loading2: false, // 查看商品
            loading3: false, // 查看商品详细信息
            isAgain: false, // 再次报价
            tbqy_name: '',
            startTime: '',
            endTime: '',
            Dataloading:true,
            listTime:'',
            chooseMer:false,
            merloading:false,
            region_name:'',
        }
    },
    mounted() {
        this.getTime()
        // this.userId = localStorage.getItem('userId')
        // let arr = [];
        // arr.push(this.startTime);
        // arr.push(this.endTime);
        // this.form.dataTime = arr;
        this.getDataFun();
        // this.getNodeFun();
    },
    methods: {
        selectTimeFun(ele){
            this.getGoodFun()
        },
        bizViewFun(ele){
            if(ele.biz_name == '市场'){
                return
            }
            this.$router.push({name: 'ViewRetail',params: {bizView: ele}})
        },
        // 查看商品详细信息
        goodMsgFun(ele){
            this.loading3 = true
            this.isGoodMsg = true
            this.goodName = ele.goods_name + '均价￥' + (ele.goods_unit=='斤'?ele.price/2:ele.price)
            let obj = {
                page: 1,
                cols: 10000,
                node_id: ele.node_id,
                in_date: ele.in_date,
                goods_name: ele.goods_name,
            }
            getQueryGoodsIndex(obj)
                .then(res => {
                    this.loading3 = false
                    this.tableData3 = res.data.list
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        closeFun5(){
            this.isGoodMsg = false
            this.goodName = ''
            this.tableData3 =  []
        },
        inputFun(val){
          if(val.id==null){
            return ;
          }
            let goodobj = {};
            if(this.viewGood.length == 0){
                    if(!val.price){
                        goodobj = {
                            node_id: val.node_id,
                            node_name: val.node_name,
                            shop_booth_id: val.merchant,
                            biz_id: val.biz_id,
                            biz_name: val.biz_name,
                            in_date: val.in_date,
                            goods_id: val.goods_id,
                            goods_code: val.goods_code,
                            goods_name: val.goods_name,
                            goods_unit: val.goods_unit,
                            count: val.count,
                            specifications: val.specifications,
                            price: val.price,
                            yesterday_price: val.yesterday_price ? val.yesterday_price : '',
                            history_price: val.history_price ? val.history_price : '',
                            area_id: val.area_id ? val.area_id : '',
                            area_name: val.area_name ? val.area_name : '',
                            weight: val.weight ? val.weight : '',
                            real_weight: val.real_weight ? val.real_weight : '',
                        }
                        this.viewGood.push(goodobj)
                    }
            }else{
                this.viewGood.forEach((ele,index) => {
                    if(val.goods_id == ele.goods_id){
                        this.viewGood.splice(index,1)
                    }
                })
                goodobj = {
                    node_id: val.node_id,
                    node_name: val.node_name,
                    shop_booth_id: this.merchant,
                    biz_id: val.biz_id,
                    biz_name: val.biz_name,
                    in_date: val.in_date,
                    goods_id: val.goods_id,
                    goods_code: val.goods_code,
                    goods_name: val.goods_name,
                    goods_unit: val.goods_unit,
                    count: val.count,
                    specifications: val.specifications,
                    price: val.price,
                    yesterday_price: val.yesterday_price ? val.yesterday_price : '',
                    history_price: val.history_price ? val.history_price : '',
                    area_id: val.area_id ? val.area_id : '',
                    area_name: val.area_name ? val.area_name : '',
                    weight: val.weight ? val.weight : '',
                    real_weight: val.real_weight ? val.real_weight : '',
                }
                this.viewGood.push(goodobj)
            }
        },
        // 修改提交
        editFun(ele){
            let arr = [],goodobj = {};
            console.log(this.viewGood)
            this.viewGood.forEach(val => {
                if(val.price){
                    arr.push(val)
                }
            })
            if(arr.length > 0){
                if(this.company == 1){
                    arr.forEach(val => {
                        if(val.price){
                            val.price = val.price*2
                        }
                    })
                }
                console.log(arr)
                let obj =  JSON.stringify(arr)
                getInsertList(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success('修改成功');
                            this.closeFun4()
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        // 获取当前时间商品
        getGoodFun(){
            this.loading = true
            if(this.isSearch == true){
                if(this.selectGood.length > 0){
                    this.selectGood.forEach(val => {
                        this.tableData2.forEach(val2 => {
                            if(val.goods_id == val2.goods_id){
                                val.price = val2.price
                            }
                        })
                    })
                }else{
                    this.selectGood = this.tableData2
                }
            }
            // console.log(this.selectGood)
            if(this.merchant){
                let obj = {
                    page: 1,
                    cols: 10000,
                    node_id: this.tbqy,
                    shop_booth_id: this.merchant ? this.merchant : '',
                    region: this.region ? this.region : this.tabRegion,
                    in_date: this.in_date,
                    goods_name: this.name,
                    unit_type: 1,
                }
                getQueryGoodsForBiz(obj)
                    .then(res => {
                        this.loading = false
                        let str = ''
                        if(this.isSearch == true){
                            res.data.list.forEach(val2 => {
                                this.selectGood.forEach(val => {
                                    if(val2.goods_id == val.goods_id){
                                        val2.price = val.price;
                                    }
                                    // if(val.price){
                                    //     if(this.company == 1){
                                    //         val.price = val.price/2
                                    //     }
                                    // }
                                })
                            })
                             console.log(res.data.list);
                        }else{
                            res.data.list.forEach(val => {
                                if(val.rate < 0){
                                    str = JSON.stringify(val.rate).substring(1)
                                    val.xiaj = str
                                }
                                if(val.price){
                                    if(this.company == 1){
                                        val.price = val.price/2
                                    }
                                }
                            })
                        }
                        res.data.list.forEach(val => {
                            if(val.price){
                                if(val.goods_unit == '斤'){
                                    val.price = val.price/2
                                }
                            }
                        })
                        this.tableData2 = res.data.list
                        this.num2 = res.data.bean.total
                        if(this.isAgain && !this.isSearch){
                          this.loading = true;
                          this.getGoodFun2();
                        }
                    })
                    .catch(() => {
                        this.loading = false
                        this.$message.error("出错啦!");
                    })
            }else{
                let obj = {
                    page: 1,
                    cols: 10000,
                    node_id: this.tbqy,
                    shop_booth_id: this.merchant ? this.merchant : '',
                    region: this.region ? this.region : this.tabRegion,
                    in_date: this.in_date,
                    goods_name: this.name,
                    unit_type: 1,
                }
                getQueryGoodsForNode(obj)
                    .then(res => {
                        this.loading = false
                        let str = ''
                        if(this.isSearch == true){
                            res.data.list.forEach(val2 => {
                                this.selectGood.forEach(val => {
                                    if(val2.goods_id == val.goods_id){
                                        val2.price = val.price
                                    }
                                    // if(val.price){
                                    //     if(this.company == 1){
                                    //         val.price = val.price/2
                                    //     }
                                    // }
                                })
                            })
                        }else{
                            res.data.list.forEach(val => {
                                if(val.rate < 0){
                                    str = JSON.stringify(val.rate).substring(1)
                                    val.xiaj = str
                                }
                                if(val.price){
                                    if(this.company == 1){
                                        val.price = val.price/2
                                    }
                                }
                            })
                        }
                        res.data.list.forEach(val => {
                            if(val.price){
                                if(val.goods_unit == '斤'){
                                    val.price = val.price/2
                                }
                            }
                        })
                        this.tableData2 = res.data.list
                        this.num2 = res.data.bean.total
                        if(this.isAgain && !this.isSearch){
                          this.loading = true;
                          this.getGoodFun2();
                        }
                    })
                    .catch(() => {
                        this.loading = false
                        this.$message.error("出错啦!");
                    })
            }
        },
        // 获取列表搜索时间商品
        getGoodFun2(){
            // this.getGoodFun()
            if(this.merchant){
                let obj = {
                    page: 1,
                    cols: 10000,
                    node_id: this.tbqy,
                    shop_booth_id: this.merchant ? this.merchant : '',
                    region: this.region ? this.region : this.tabRegion,
                    in_date: this.listTime,
                    goods_name: this.name,
                    unit_type: 1,
                }
              getQueryGoodsForBiz(obj)
                  .then(res => {
                        this.loading = false
                        res.data.list.forEach(val => {
                            if(val.price){
                                if(val.goods_unit == '斤'){
                                    val.price = val.price/2
                                }
                            }
                            this.tableData2.forEach(val2 => {
                                if(val.goods_code == val2.goods_code){
                                    // val2.price = val.price
                                    val.area_id = val2.area_id
                                    val.area_name = val2.area_name
                                    val.biz_id = val2.biz_id
                                    val.biz_name = val2.biz_name
                                    val.cols = val2.cols
                                    val.count = val2.count
                                    val.end_date = val2.end_date
                                    val.goods_code = val2.goods_code
                                    val.goods_id = val2.goods_id
                                    val.goods_name = val2.goods_name
                                    val.goods_unit = val2.goods_unit
                                    val.history_price = val2.history_price
                                    val.history_rate = val2.history_rate
                                    val.id = val2.id
                                    val.in_date = val2.in_date
                                    val.node_id = val2.node_id
                                    val.node_name = val2.node_name
                                    val.num = val2.num
                                    val.page = val2.page
                                    val.rate = val2.rate
                                    val.real_weight = val2.real_weight
                                    val.region = val2.region
                                    val.region_name = val2.region_name
                                    val.shop_booth_id = val2.shop_booth_id
                                    val.specifications = val2.specifications
                                    val.start_date = val2.start_date
                                    val.state = val2.state
                                    val.total = val2.total
                                    val.uid = val2.uid
                                    val.unit_type = val2.unit_type
                                    val.user_id = val2.user_id
                                    val.weight = val2.weight
                                    val.yesterday = val2.yesterday
                                    val.yesterday_price = val2.yesterday_price
                                }
                            })
                        })

                  })
                  .catch(() => {
                      this.loading = false
                  })
            }else{
              let obj = {
                  page: 1,
                  cols: 10000,
                  node_id: this.tbqy,
                  shop_booth_id: this.merchant ? this.merchant : '',
                  region: this.region ? this.region : this.tabRegion,
                  in_date: this.listTime,
                  goods_name: this.name,
                    unit_type: 1,
              }
              getQueryGoodsForNode(obj)
                  .then(res => {
                        this.loading = false
                        res.data.list.forEach(val => {
                            if(val.price){
                                if(val.goods_unit == '斤'){
                                    val.price = val.price/2
                                }
                            }
                            this.tableData2.forEach(val2 => {
                                if(val.goods_code == val2.goods_code){
                                    // val2.price = val.price
                                    val.area_id = val2.area_id
                                    val.area_name = val2.area_name
                                    val.biz_id = val2.biz_id
                                    val.biz_name = val2.biz_name
                                    val.cols = val2.cols
                                    val.count = val2.count
                                    val.end_date = val2.end_date
                                    val.goods_code = val2.goods_code
                                    val.goods_id = val2.goods_id
                                    val.goods_name = val2.goods_name
                                    val.goods_unit = val2.goods_unit
                                    val.history_price = val2.history_price
                                    val.history_rate = val2.history_rate
                                    val.id = val2.id
                                    val.in_date = val2.in_date
                                    val.node_id = val2.node_id
                                    val.node_name = val2.node_name
                                    val.num = val2.num
                                    val.page = val2.page
                                    val.rate = val2.rate
                                    val.real_weight = val2.real_weight
                                    val.region = val2.region
                                    val.region_name = val2.region_name
                                    val.shop_booth_id = val2.shop_booth_id
                                    val.specifications = val2.specifications
                                    val.start_date = val2.start_date
                                    val.state = val2.state
                                    val.total = val2.total
                                    val.uid = val2.uid
                                    val.unit_type = val2.unit_type
                                    val.user_id = val2.user_id
                                    val.weight = val2.weight
                                    val.yesterday = val2.yesterday
                                    val.yesterday_price = val2.yesterday_price
                                }
                            })
                        })

                  })
                  .catch(() => {
                      this.loading = false
                  })
            }
        },
        // 选择区域
        selectRegion(ele){
            this.page2 = 1
            if(ele){
                this.getBizFun()
            }else{
                this.region = ''
            }
            this.getGoodFun()
        },
        // 选择商户
        selectMarchant(ele){
            this.page2 = 1
            this.merchantArr.forEach(val => {
                if(ele == val.bootList[0].shop_booth_id){
                    this.biz_id = val.bootList[0].biz_id
                    this.biz_name = val.bootList[0].booth_name
                }
            })

            if(!ele){
                this.biz_id = ''
                this.biz_name = ''
            }
            this.getGoodFun()
        },
        // 选择填报企业
        selectTbqy(ele){
            this.page2 = 1
            this.tbqyArr.forEach(val => {
                if(ele == val.node_id){
                    this.tbqyUserId = val.userId
                    this.tbqyName = val.node_name
                }
            })
            if(!ele){
                this.tbqyUserId = ''
                this.tbqyName = ''
            }
            this.loading = true
            setTimeout(() => {
                this.getMarketFun()
                this.getGoodFun()
            }, 1000)
        },
        // 获取区域
        getMarketFun(){
            let obj = {
                page: 1,
                cols: 1000,
                total:"",
                userId: this.tbqyUserId,
                contacts: '',
                nodeName: '',
                node_id: this.tbqy,
            }
            getQueryRegionForGoodsPrice(obj)
                .then(res => {
                    this.regionArr = res.data.regionList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        // 获取填报企业
        getNodeFun(){
            GetAllNode()
                .then(res => {
                    this.tbqyArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 获取商户
        getBizFun(){
            let boothData = {
                in_date:this.listTime,
                node_id: this.tbqy,
                region: this.region ? this.region : this.tabRegion,
            }
            getQueryNodeGoodsBiz(boothData)
                .then(res => {
                    this.merchantArr = res.data.list;
                    this.merloading = false;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleRow(e){
          console.log(e);
          this.chooseMer = false;
          this.loading = true;
          this.tbqyName = localStorage.getItem('loginName');
          this.in_date = this.startTime;
          this.merchant = e.shop_booth_id;
          this.merchantName = e.biz_name;
          this.isAgain = true;
          this.region_name = e.region_name;
          this.region = e.region;
          setTimeout(() => {
              this.getGoodFun()
          }, 100)
            this.isEdits = true
        },
        handleClick1() {
          this.merloading = true;
            this.regionArr.forEach(val => {
                if(val.bootList){
                    if(this.activeName == val.bootList[0].booth_name){
                        this.tabRegion = val.bootList[0].shop_booth_id;
                    }
                }else{
                    if(this.activeName == val.BOOTH_NAME ){
                        this.tabRegion = val.SHOP_BOOTH_ID
                    }
                }
            })
            if(this.activeName == 'first'){
                this.tabRegion = ''
            }
            setTimeout(() => {
                this.getBizFun();
            }, 100)
        },
        handleClick() {
            this.regionArr.forEach(val => {
                if(val.bootList){
                    if(this.activeName == val.bootList[0].booth_name){
                        this.tabRegion = val.bootList[0].shop_booth_id
                    }
                }else{
                    if(this.activeName == val.BOOTH_NAME ){
                        this.tabRegion = val.SHOP_BOOTH_ID
                    }
                }
            })
            if(this.activeName == 'first'){
                this.tabRegion = ''
            }
            setTimeout(() => {
                if(this.viewNodeId){
                    this.getViewFun()
                }else{
                    this.getGoodFun()
                }
            }, 100)
        },
        // 智能录入
        znlrFun(){
            if(this.tbqy == ''){
                this.$message.error('请选择填报企业！');
                return;
            }
            // if(this.region == ''){
            //     this.$message.error('请选择所属区域！');
            //     return;
            // }
            // if(this.merchant == ''){
            //     this.$message.error('请选择所属商户！');
            //     return;
            // }
            this.isZnlr = true
        },
        chack_name(str){
        　　var pattern = new RegExp("[`~!@#$^&*()=|{}''\\[\\]<>《》/?~！@#￥&*（）——|{}【】‘”“'？]");
        　　if (pattern.test(str)){
        　　　　return true;
        　　}else{
        　　    return false;
            }
        },
        // 智能识别保存
        submitForm2(){
            if(this.message.indexOf('，')){
                this.message = this.message.replace(/，/g, "");
            }
            if(this.message.indexOf(',')){
                this.message = this.message.replace(/,/g, "");
            }
            if(this.message.indexOf(';')){
                this.message = this.message.replace(/;/g, "");
            }
            if(this.message.indexOf('；')){
                this.message = this.message.replace(/；/g, "");
            }
            if(this.message.indexOf(' ')){
                this.message = this.message.replace(/ /g, "");
            }
            if(this.message.indexOf(':')){
                this.message = this.message.replace(/:/g, "");
            }
            if(this.message.indexOf('、')){
                this.message = this.message.replace(/、/g, "");
            }
            if(this.message.indexOf('。')){
                this.message = this.message.replace(/。/g, "");
            }
            let state = false;
            state = this.chack_name(this.message);
            if(state == true){
                this.$message.error('不能输入特殊符号');
                return
            }else{
                let obj = {
                    goods: this.message,
                    shop_booth_id: this.merchant,
                    node_id: this.tbqy,
                    region: this.region ? this.region : this.tabRegion,
                    in_date: this.in_date,
                    unit_type: 1,
                }
                getAutoIdentity(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.tableData2.forEach(val => {
                                res.data.forEach(val2 => {
                                    if(val.goods_id == val2.goods_id){
                                        val.price = val2.price
                                    }
                                })
                            })
                            if(res.message.indexOf('失败的商品有') == -1){
                                this.allGood = res.data
                                this.num2 = ''
                                this.isZnlr = false
                                this.message = ''
                            }else{
                                this.message = res.message.substring(res.message.indexOf('失败的商品有') + 6)
                            }
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }

        },
        // 智能录入保存
        allAddFun(){
            this.submitForm()
        },
        closeFun2(){
            this.isZnlr = false
            this.message = ''
            this.allGood = []
        },
        //
        searchGoodFun(){
            this.page2 = 1
            this.isSearch = true
            if(this.viewNodeId){
                this.getViewFun()
            }else{
                this.getGoodFun()
            }
        },
        // 新增
        submitForm(ele){
            // if(this.tbqy == ''){
            //     this.$message.error('请选择填报企业！');
            //     return;
            // }
            let arr = [],goodobj = {};
                if(this.isSearch == true){
                    this.selectGood.forEach(val => {
                        this.tableData2.forEach(val2 => {
                            if(val.goods_id == val2.goods_id){
                                val.price = val2.price
                            }
                        })
                    })
                    this.selectGood.forEach(val => {
                        if(val.price){
                          let price = '';
                            if(val.goods_unit=='斤'){
                                price = val.price*2
                            }else{
                                price = val.price
                            }
                            goodobj = {
                                node_id: val.node_id,
                                node_name: val.node_name,
                                shop_booth_id: this.merchant,
                                biz_id: this.biz_id,
                                biz_name: this.biz_name,
                                in_date: this.in_date,
                                goods_id: val.goods_id,
                                goods_code: val.goods_code,
                                goods_name: val.goods_name,
                                goods_unit: val.goods_unit,
                                count: val.count,
                                specifications: val.specifications,
                                price: price,
                                yesterday_price: val.yesterday_price ? val.yesterday_price : '',
                                history_price: val.history_price ? val.history_price : '',
                                area_id: val.area_id ? val.area_id : '',
                                area_name: val.area_name ? val.area_name : '',
                                weight: val.weight ? val.weight : '',
                                real_weight: val.real_weight ? val.real_weight : '',
                            }
                            arr.push(goodobj)
                        }
                    })
                }else{
                    this.tableData2.forEach(val => {
                        if(val.price){
                            let price = '';
                            if(val.goods_unit=='斤'){
                                price = val.price*2
                            }else{
                                price = val.price
                            }
                            goodobj = {
                                node_id: val.node_id,
                                node_name: val.node_name,
                                shop_booth_id: this.merchant,
                                biz_id: this.biz_id,
                                biz_name: this.biz_name,
                                in_date: this.in_date,
                                goods_id: val.goods_id,
                                goods_code: val.goods_code,
                                goods_name: val.goods_name,
                                goods_unit: val.goods_unit,
                                count: val.count,
                                specifications: val.specifications,
                                price: price,
                                yesterday_price: val.yesterday_price ? val.yesterday_price : '',
                                history_price: val.history_price ? val.history_price : '',
                                area_id: val.area_id ? val.area_id : '',
                                area_name: val.area_name ? val.area_name : '',
                                weight: val.weight ? val.weight : '',
                                real_weight: val.real_weight ? val.real_weight : '',
                            }
                            arr.push(goodobj)
                        }
                    })
                }
            if(arr.length > 0 || this.viewGood.length > 0){
                if(this.viewGood.length > 0){
                    this.viewGood.forEach((val,index) => {
                        arr.forEach(val2 => {
                            if(val.goods_id == val2.goods_id){
                                this.viewGood.splice(index,1)
                            }
                        })
                    })
                    arr = arr.concat(this.viewGood)
                }
                if(this.company == 1){
                    arr.forEach(val => {
                        if(val.price){
                            val.price = val.price*2
                        }
                    })
                }
                console.log(arr)
                let obj =  JSON.stringify(arr)
                getInsertList(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.closeFun()
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        closeFun(){
            this.isEdits = false
            this.isAgain = false
            this.chooseMer = false;
            this.tbqy_name = ''
            this.tbqy = ''
            this.tbqyUserId = ''
            this.tbqyName = ''
            this.region = ''
            this.tabRegion = '';
            this.regionArr = []
            this.newGoodArr = []
            this.newGoodObj = {}
            this.tableData2 = []
            this.merchant = ''
            this.biz_id = ''
            this.biz_name = ''
            this.merchantArr = []
            this.merchantName = '';
            this.merchant = '';
            this.activeName = 'first'
            this.page2 = 1
            this.num2 = ''
            this.name = ''
            this.istableAdd = false
            var currentTime = new Date()
            this.in_date = formatDate(currentTime)
             this.listTime = ''
            this.company = 0
            this.isSearch = false
            this.selectGood = []
            this.allGood = []
            this.unitName = '公斤'
            this.viewGood = []
        },
        // 导入
        closeFun3(){
            this.isfile = false
            this.tbqy = ''
            this.tbqyUserId = ''
            this.tbqyName = ''
            this.region = ''
            this.regionArr = []
            this.merchant = ''
            this.biz_id = ''
            this.biz_name = ''
            this.merchantArr = []
        },
        // 关闭查看
        closeFun4(){
            this.isView = false
            this.tbqyView = ''
            this.tbrqView = ''
            this.page2 = 1
            this.num2 = ''
            this.tableData2 = []
            this.regionArr = []
            this.tabRegion = ''
            this.name = ''
            this.viewNodeId = ''
            this.activeName = 'first'
            this.company = 0
            this.isSearch = false
            this.selectGood = []
            this.unitName = '公斤'
        },
        changeFun(ele){
            if(ele == 0){
                this.unitName = '公斤'
                this.tableData2.forEach(val => {
                    if(val.price){
                       val.price = val.price*2
                    }
                })
                this.selectGood.forEach(val => {
                    if(val.price){
                       val.price = val.price*2
                    }
                })
            }else if(ele == 1){
                this.unitName = '斤'
                this.tableData2.forEach(val => {
                    if(val.price){
                       val.price = val.price/2
                    }
                })
                this.selectGood.forEach(val => {
                    if(val.price){
                       val.price = val.price/2
                    }
                })
            }
        },
        // 再次报价
        againFun(ele){
          this.chooseMer = true;
          this.tbqyUserId = localStorage.getItem('userId');
          this.tbqy = localStorage.getItem('loginId');
          this.listTime = ele.date;
          this.merloading = true;
          setTimeout(() => {
              this.getMarketFun()
              this.getBizFun()
          }, 100)
        },
        addFun(ele){
          //添加报价的接口参数
          this.loading = true;
          this.tbqyUserId = localStorage.getItem('userId');
          this.tbqyName = localStorage.getItem('loginName');
          this.tbqy = localStorage.getItem('loginId');
          this.in_date = this.startTime;
          setTimeout(() => {
              this.getMarketFun()
              this.getGoodFun()
          }, 100)

            // if(ele.node_id){
            //     this.istableAdd = true
            //     this.tbqy = ele.node_id
            //     this.tbqyArr.forEach(val => {
            //         if(ele.node_id == val.node_id){
            //             this.tbqyUserId = val.userId
            //         }
            //     })
            //     this.in_date = ele.in_date
            //     if(ele.node_id){
            //         let obj = {
            //             node_id: ele.node_id,
            //         }
            //         getQueryRegionForGoodsPrice(obj)
            //             .then(res => {
            //                 this.regionArr = res.data.regionList
            //             })
            //             .catch((res) => {
            //                 console.log(res)
            //             })
            //     }
            //     setTimeout(() => {
            //         this.getGoodFun()
            //     }, 1000)
            // }else{
            //     this.istableAdd = false
            // }
            this.isEdits = true
        },
        viewFun(ele){
            this.isView = true;
            this.tbrqView = ele.date;
            this.tbqyView = localStorage.getItem('loginName');
            this.viewNodeId = localStorage.getItem('loginId');
            this.page2 = 1;
            this.loading2 = true;
            this.getViewFun(this.viewNodeId);
        },
        // 查看获取商品
        getViewFun(node_id){
            if(this.isSearch == true){
                if(this.selectGood.length > 0){
                    this.selectGood.forEach(val => {
                        this.tableData2.forEach(val2 => {
                            if(val.goods_id == val2.goods_id){
                                val.price = val2.price
                            }
                        })
                    })
                }else{
                    this.selectGood = this.tableData2
                }
            }
            console.log(this.selectGood)
            let params = {
                node_id: this.viewNodeId,
                in_date: this.tbrqView,
                cols: 10000,
                page: 1,
                region: this.tabRegion,
                goods_name: this.name,
            }
            getQueryIndex(params)
                .then(res => {
                    this.loading2 = false
                    let str = ''
                    if(this.isSearch == true){
                        res.data.list.forEach(val2 => {
                            this.selectGood.forEach(val => {
                                if(val2.goods_id == val.goods_id){
                                    val2.price = val.price
                                }
                                // if(val.price){
                                //     if(this.company == 1){
                                //         val.price = val.price/2
                                //     }
                                // }
                            })
                        })
                    }else{
                        res.data.list.forEach(val => {
                            if(val.rate < 0){
                                str = JSON.stringify(val.rate).substring(1)
                                val.xiaj = str
                            }
                            if(val.price){
                                if(this.company == 1){
                                    val.price = val.price/2
                                }
                            }
                        })
                    }
                    this.tableData2 = res.data.list
                })
                .catch((res) => {
                    this.loading2 = false
                    console.log(res)
                })
            if(node_id){
                let obj = {
                    node_id: node_id,
                }
                getQueryRegionForGoodsPrice(obj)
                    .then(res => {
                        this.regionArr = res.data.regionList
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }

        },
        deleteFun(){

        },
        // 商户查看
        merchantFun(){
          let obj = {
            in_date: this.startTime,
            node_id: localStorage.getItem('loginId'),
            node_name: localStorage.getItem('loginName'),
          }
          this.$router.push({name: 'ViewQuotation',params: obj})
        },
        isShowFun(){
            this.isfile = true
        },
        getDataFun(){
            let params = {
                // node_id: this.form.tbqy,
                // state: this.form.states,
                // start_date: this.startTime,
                // end_date: this.endTime,
                // cols: this.cols,
                // page: this.page,
                // node_type: this.form.enterprise,

                node_id: localStorage.getItem('loginId'),
                in_date: this.startTime,
                cols: this.cols,
                page: this.page,
                region: this.tabRegion,
                goods_name: this.name,

            }
            getQueryIndex(params)
                .then(res => {
                  this.Dataloading = false;
                    this.tableData = res.data.date
                    this.num = res.data.date_total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        searchFun(){
          if(this.form.dataTime){
            this.page = 1
            this.getDataFun2()
          }else{
            this.page = 1
            this.getDataFun()
          }
        },
        getDataFun2(){
            let params = {
                node_id: localStorage.getItem('loginId'),
                start_date: this.startTime,
                end_date: this.endTime,
                cols: this.cols,
                page: this.page,
                region: this.tabRegion,
                goods_name: this.name,
            }
            getQueryIndexDate(params)
                .then(res => {
                  this.Dataloading = false;
                    this.tableData = res.data.date
                    this.num = res.data.date_total
                })
                .catch((res) => {
                    console.log(res)
                })
        },

        handleCurrentChange(val) {
            this.page = val
            if(this.form.dataTime){
               this.getDataFun2()
            }else{
               this.getDataFun()
            }

        },
        clearFun(){
            this.form = {
                dataTime: '',
            }
            this.page = 1
            this.getTime()
            // let arr = []
            // arr.push(this.startTime)
            // arr.push(this.endTime)
            // this.form.dataTime = arr
            this.getDataFun()
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
            var startTime = formatDate(start)
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
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .num{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                align-items: center;
                .num-p{
                    width: 100px;
                    color: red;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
        .name{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .name-p{
                    color: #ccc;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
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
                margin-top: -315px;
                margin-left: -300px;
                width: 600px;
                height: 630px;
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
                            width: 80px;
                            line-height: 30px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select{
                            width: 150px;
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
                    .el-input{
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
                        width: 200px;
                        height: 50px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
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
        .znlr{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -180px;
                margin-left: -230px;
                width: 460px;
                height: 330px;
                font-size: 15px;
                textarea{
                    margin: 10px 30px;
                    width: 400px;
                    height: 200px;
                    background: #f2f2f2;
                }
                .btn{
                    margin: 0;
                    text-align: center;
                }
                .rules{
                    margin: 5px 20px;
                }
            }
        }
        .goodMsg{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -200px;
                margin-left: -230px;
                width: 460px;
                height: 400px;
                font-size: 15px;
                .tit{
                    width: 88%;
                    text-align: center;
                }
            }
        }

    }
</style>
<style lang="less">
    .quotationList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
        .el-input__icon{
            line-height: 30px;
        }
        .el-tabs__header{
            margin: 0 10px 10px !important;
        }
    }
</style>
