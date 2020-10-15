<template>
    <div class="content ledgerMsg">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px" size="mini">
                    <el-form-item label="创建时间" style="width: 350px;" >
                        <el-date-picker clearable style="width: 260px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="企业类型" v-if="account != 'cpjw'">
                        <el-select v-model="form.types" placeholder="请选择" @change="typesChangeFun">
                            <el-option label="餐饮" value="餐饮"></el-option>
                            <el-option label="超市" value="超市"></el-option>
                            <el-option label="零售市场" value="零售市场"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业名称" class="qymcselect">
                        <div v-show="form.types == '超市'">
                            <el-select size="mini" v-model="form.cs_name" filterable multiple clearable placeholder="请选择">
                                <el-option v-for="(item2, index2) in csNodeArr" :key="index2" :label="item2.node_name" :value="item2.node_id"></el-option>
                            </el-select>
                        </div>
                        <div v-show="form.types != '超市'">
                            <el-select v-model="form.name" style="height: 28px" size="mini" filterable clearable placeholder="请选择" @change="nodeChangeFun">
                                <el-option v-for="(item, index) in nodeArr" :key="index" :label="item.node_name" :value="item.node_id"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="商品名称" v-if="form.types == '餐饮'">
                        <el-input class="label-width" v-model="form.good_name" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商" v-if="form.types == '餐饮'">
                        <el-input class="label-width" v-model="form.gys_name" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="来源市场" v-if="form.types == '餐饮'">
                        <el-select v-model="form.market_name" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in marketArr" :key="index" :label="item.WS_SUPPLIER_NAME" 
                            :value="item.WS_SUPPLIER_NAME"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属街道" v-if="form.types == '餐饮' && account != 'cpjw' && userType != 6">
                        <el-select v-model="form.supervise" filterable clearable placeholder="请选择" :disabled="roleId == 40">
                            <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" v-if="form.types == '零售市场'">
                        <el-input class="label-width" v-model="form.good_name" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="所属区域" v-if="form.types == '零售市场' && userType != 6">
                        <el-select v-model="form.region" filterable clearable placeholder="请选择" @change="regionChangeFun">
                            <el-option v-for="(item, index) in regionArr" :key="index" :label="item.BOOTH_NAME" :value="item.SHOP_BOOTH_ID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户名称" v-if="form.types == '零售市场'">
                        <el-select v-model="form.sh_name" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in shArr" :key="index" :label="item.booth_name" :value="item.biz_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商" v-if="form.types == '零售市场'">
                        <el-select v-model="form.gys_name" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in gysArr" :key="index" :label="item.biz_name" :value="item.biz_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属街道" v-if="form.types == '零售市场' && account != 'cpjw' && userType != 6">
                        <el-select v-model="form.supervise" filterable clearable placeholder="请选择" :disabled="roleId == 40">
                            <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校类别" v-if="account == 'cpjw'">
                        <el-select v-model="form.category" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in categoryArr" :key="index" :label="item.tag_name" :value="item.tag_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校属性" v-if="account == 'cpjw'">
                        <el-select v-model="form.attribute" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in attributeArr" :key="index" :label="item.tag_name" :value="item.tag_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button @click="clearFun"style="margin-left: 10px;">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部数据</p>
                <div><!--
                    <el-button size="medium" class="new-add">导出</el-button>-->
                </div>
            </div>
            <div class="tables">
                <el-table :data="tableData" :header-cell-style="rowClass" v-if="isCy" v-loading="loading">
                    <el-table-column prop="in_date" label="进货日期"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"></el-table-column>
                    <el-table-column prop="ws_supplier_name" label="供货商名称"></el-table-column>
                    <el-table-column prop="weight" label="总重量"></el-table-column>
                    <el-table-column prop="is_uplode" label="单据上传">
                        <template slot-scope="scope">{{scope.row.is_uplode}}</template>
                    </el-table-column>
                    <el-table-column prop="secend_parent" label="监管机构" v-if="account != 'cpjw'&& userType != 6">
                        <template slot-scope="scope">{{scope.row.secend_parent}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看台账</el-button>
                            <el-button v-if="scope.row.is_uplode == '已上传'" type="text" size="small" @click="viewImgFun(scope.row)">查看单据</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="tableData" :header-cell-style="rowClass" v-if="isLssc" v-loading="loading">
                    <el-table-column prop="in_date" label="进货日期"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"></el-table-column>
                    <el-table-column prop="seller_booth_name" label="供货商名称"></el-table-column>
                    <el-table-column prop="buyer_booth_name" label="商户名称"></el-table-column>
                    <el-table-column prop="details" label="商品名称">
                        <template slot-scope="scope">
                            {{scope.row.details + '等' + scope.row.details_count + '种商品'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_oc_upload" label="单据上传">
                        <template slot-scope="scope">
                            <p v-if="scope.row.is_oc_upload == 1">已上传</p>
                            <p v-else-if="scope.row.is_oc_upload == 0">未上传</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sjjgjg" label="监管机构" v-if="account != 'cpjw' && userType != 6">
                        <template slot-scope="scope">{{scope.row.sjjgjg}}</template>
                    </el-table-column><!--
                    <el-table-column prop="" label=""></el-table-column>-->
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看台账</el-button>
                            <el-button type="text" v-if="scope.row.is_oc_upload == 1" size="small" @click="viewImgFun(scope.row)">查看单据</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="tableData" :header-cell-style="rowClass" v-if="isCs" v-loading="loading">
                    <el-table-column prop="IN_DATE" label="进货日期"></el-table-column>
                    <el-table-column prop="SUPPLIER_NAME" label="节点名称"></el-table-column>
                    <el-table-column prop="WS_SUPPLIER_NAME" label="供货商名称"></el-table-column>
                    <el-table-column prop="WEIGHT" label="总重量"></el-table-column>
                    <el-table-column prop="IS_UPLOAD" label="单据上传">
                        <template slot-scope="scope">
                            <p v-if="scope.row.IS_UPLOAD == 1">未上传</p>
                            <p v-else>已上传</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看台账</el-button>
                            <el-button type="text" size="small" v-if="scope.row.IS_UPLOAD != 1" @click="viewImgFun(scope.row)">查看单据</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>    
        </div>
        <!--关闭-->
        <div class="password solve" v-if="isShow">
            <div class="text">
                <div class="box-title">
                    <p class="tit">查看单据</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="clear"></div>
                <div class="jjfa">
                    <div class="msg-item">   
                        <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url" @click="bigImgFun">
                                    <figure class="image">
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                                    </figure>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="password box" v-show="isBigImg" ref="boxsize">
            <p class="iconfont icon-close close" @click="closeFun2"></p>
            <div class="imgBox">
                <el-carousel trigger="click" :autoplay="autoplay" :initial-index="current" :height="imgHeight + 'px'">
                    <el-carousel-item  v-for="(item,index) in imgArr" :key="index" v-if="imgArr">
                        <figure class="image" v-if="item.img_url">
                            <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                        </figure>
                    </el-carousel-item>
                </el-carousel>
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
import {GetGoodsTzInfoGroupForJg, GetBusinessTzInfoGroupForJg, GetJdhyd, GetNodeTzInfoGroupForJg, QueryInTzDetailBySjjgjg, JcqueryRegion,
    QuerybizByNodeId, GetAllTzGys, GetSuperMeatIn, QueryOriginalDocAPI, GetAllOriginalDoc, QueryMeatOriginalDoc, QueryAllWsSupplierName,
    QueryNodeTagTree} from '../../js/retrieval/retrieval.js'
import {GetJgjgByNodeid, GetNodeJgInfoGroupForJg} from '../../js/enterprise/enterprise.js'
export default {
    name:"ledgerMsg",
    data() {
        return {
            form: {
                dataTime: '',
                types: '餐饮',
                name: '',
                good_name: '',
                gys_name: '',
                market_name: '',
                supervise: '',
                region: '',
                sh_name: '',
                cs_name: [],
                category: '',
                attribute: '',
            },
            attributeArr: [],
            categoryArr: [],
            startTime: '',
            endTime: '', 
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            superviseArr: [],
            marketArr: [],
            regionArr: [],
            shArr: [],
            gysArr: [],
            node_id: '',
            nodeArr: [],
            nodeArrs: [],
            userType: '',
            node_name: '',
            userId: '',
            isCs: false,
            isLssc: false,
            isCy: true,
            isShow: false, // 单据
            list_node_id: '',
            list_batch_id: '',
            imgArr1: [],
            list_tz_id: '',
            loading: false,
            csNodeArr: [], // 超市企业
            isBigImg: false,
            imgArr: [],
            autoplay: false,
            current: 0,
            imgHeight: '',
            sizeObj: {},
            roleId: '',
            account: '',
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.node_id = localStorage.getItem('loginId')
        this.userType = localStorage.getItem('userType')
        this.roleId = localStorage.getItem('roleId')
        this.account = localStorage.getItem('account')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getNodeTotalFun()
        if(this.roleId == 40){
            let arr = JSON.parse(localStorage.getItem('booth_List'))
            let obj = {
                jgjg: arr[0].BOOTH_NAME
            }
            this.superviseArr.push(obj)
            this.form.supervise = this.superviseArr[0].jgjg
        }else{
            this.getGetJgjgByNodeid()
        }
        this.getQueryAllWsSupplierName()
        this.getGetNodeJgInfoGroupForJg('餐饮')
        let params = {
            node_id: this.node_id,
            usertype: this.userType,
            sjjgjg: '',
            page: 1,
            cols: 10000,
            node_type: '超市',
            node_name: '',
        }
        GetNodeJgInfoGroupForJg(params)
            .then(res => {
                this.csNodeArr = res.data.list
            })
            .catch((res) => {
                console.log(res)
            })
        this.getGetJdhyd()
        this.getDataFun()
        this.getQueryNodeTagTreeFun()
    },
    methods: {
        getQueryNodeTagTreeFun(){
            let str = 'tag_parent_id=27'
            QueryNodeTagTree(str)
                .then(res => {
                    res.data.forEach(val => {
                        if(val.tag_name == "学校类别"){
                            this.categoryArr = val.childList
                        }
                        if(val.tag_name == "学校属性"){
                            this.attributeArr = val.childList
                        }
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        bigImgFun(){
            this.isBigImg = true
            this.imgArr = this.imgArr1
        },
        closeFun2(){
            this.imgArr = []
            this.isBigImg = false
        },
        // 来源市场
        getQueryAllWsSupplierName(){
            let str = 'node_id=' + this.node_id
            QueryAllWsSupplierName(str)
                .then(res => {
                    this.marketArr = res.data.list
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        viewImgFun(ele){
            this.isBigImg = true
            if(this.form.types == '餐饮'){
                this.list_node_id = ele.node_id
                this.list_batch_id = ele.batch_id
                this.getImgFun1()
            }else if(this.form.types == '零售市场'){
                this.list_tz_id = ele.tz_id
                this.list_node_id = ele.node_id
                this.getImgFun2()
            }else if(this.form.types == '超市'){
                this.list_batch_id = ele.batch_id
                this.getImgFun3()
            }
             this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
        },
        getImgFun1(){
            let str = '&node_id=' + this.list_node_id + '&batch_id=' + this.list_batch_id
            QueryOriginalDocAPI(str)
                .then(res => {
                    let data = JSON.parse(res)
                    this.imgArr1 = data.data.resultList
                    this.imgArr = this.imgArr1
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getImgFun2(){
            let params = {
                tz_id: this.list_tz_id,
                node_id: this.list_node_id,
                tz_type: 1,
            }
            GetAllOriginalDoc(params)
                .then(res => {
                    this.imgArr1 = res.data
                    this.imgArr = this.imgArr1
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getImgFun3(){
            let str = '&node_id=&batch_id=' + this.list_batch_id
            QueryMeatOriginalDoc(str)
                .then(res => {
                    let data = JSON.parse(res)
                    this.imgArr1 = data.data.list
                    this.imgArr = this.imgArr1
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        closeFun(){
            this.isShow = false
            this.imgArr1 = []
        },
        // 选择区域
        regionChangeFun(){
            this.form.sh_name = ''
            this.form.gys_name = ''
            this.getGetAllTzGys()
            this.getQuerybizByNodeId()
        },
        // 供应商
        getGetAllTzGys(){
            let params = {
                page: 1,
                cols: 1000,
                userId: this.userId,
                type: 1,
                concact_name: "",
                region: this.form.region,
                biz_name: "",
                shop_booth_id: "",
            }
            GetAllTzGys(params)
                .then(res => {
                    this.gysArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 商户名称
        getQuerybizByNodeId(){
            let params = {
                node_id: this.form.name,
                region: this.form.region,
                booth_name: "",
            }
            QuerybizByNodeId(params)
                .then(res => {
                    this.shArr = res.data.bizList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 选择企业
        nodeChangeFun(ele){
            if(ele){
                this.nodeArr.forEach(val => {
                    if(ele == val.node_id){
                        this.node_name = val.node_name
                    }
                })
                this.getJcqueryRegion()
                this.getQuerybizByNodeId()
            }else{
                this.node_name = ''
                this.regionArr = []
                this.shArr = []
                this.gysArr = []
                this.form.region = ''
                this.form.sh_name = ''
                this.form.gys_name = ''
            }
        },
        // 所属区域
        getJcqueryRegion(){
            let params = {
                node_id: this.form.name,
                node_name: this.node_name,
                name: "",
            }
            JcqueryRegion(params)
                .then(res => {
                    this.regionArr = res.data.regionList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 节点总数
        getNodeTotalFun(){
            let params = {
                node_id: this.node_id,
                usertype: this.userType,
                sjjgjg: '',
                page: 1,
                cols: 10000,
                node_type: '',
                node_name: '',
            }
            GetNodeJgInfoGroupForJg(params)
                .then(res => {
                    this.list_num1 = res.data.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 选择企业类型
        typesChangeFun(ele){
            this.form.name = '' 
            this.form.cs_name = []
            this.form.good_name = '' 
            this.form.gys_name = '' 
            this.form.market_name = '' 
            this.form.region = '' 
            this.form.sh_name = '' 
            this.node_name = ''
            this.regionArr = []
            this.shArr = []
            this.form.region = ''
            this.form.sh_name = ''
            this.form.supervise = this.superviseArr[0].jgjg
            this.getGetNodeJgInfoGroupForJg(ele)
        },
        // 企业活跃度
        getGetJdhyd(){
            let str = 'node_id=' + this.node_id
            GetJdhyd(str)
                .then(res => {
                    this.list_num2 = res.data[0].total_count
                    this.list_num3 = res.data[0].notOnline_count
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 节点名称
        getGetNodeJgInfoGroupForJg(node_type){
            let params = {
                node_id: this.node_id,
                usertype: this.userType,
                sjjgjg: '',
                page: 1,
                cols: 10000,
                node_type: node_type,
                node_name: '',
            }
            GetNodeJgInfoGroupForJg(params)
                .then(res => {
                    if(this.form.types != '超市'){
                        this.nodeArr.unshift({node_name: '全部', node_id: ''})
                        this.nodeArr = res.data.list
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 监管机构
        getGetJgjgByNodeid(){
            let str = 'node_id=' + this.node_id
            GetJgjgByNodeid(str)
                .then(res => {
                    this.superviseArr = res.data.list
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 餐饮
        getDataFun(){
            this.loading = true
            let str = ''
            if(this.form.category && this.form.attribute){
                str += this.form.category + ',' + this.form.attribute
            }else if(this.form.category && !this.form.attribute){
                str += this.form.category
            }else if(!this.form.category && this.form.attribute){
                str += this.form.attribute
            }
            let params = {
                node_id: this.form.name,
                usertype: this.userType,
                sjjgjg: this.form.supervise,
                page: this.page,
                cols: this.cols,
                start_time: this.startTime,
                end_time: this.endTime,
                parent_node_id: this.node_id,
                ws_supplier_name: this.form.market_name, // 来源市场
                gys_mc: this.form.gys_name,
                plu_name: this.form.good_name,
                tag_id: str
            }
            GetNodeTzInfoGroupForJg(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.list
                    this.num = res.data.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 零售市场
        getDataFun2(){
            this.loading = true
            let params = {
                node_id: this.form.name,
                biz_id: this.form.sh_name,
                seller_booth_name: this.form.gys_name,
                buyer_booth_id: "",
                start_time: this.startTime,
                end_time: this.endTime,
                page: this.page,
                cols: this.cols,
                region: this.form.region,
                details_count: "",
                details: this.form.good_name,
                sjjgjg: this.form.supervise,
                district_code: this.node_id
            }
            QueryInTzDetailBySjjgjg(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.tzList
                    this.num = res.data.tzBean.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 超市
        getDataFun3(){
            let strs = ''
            this.form.cs_name.forEach(val => {
                strs += val + ','
            })
            strs = strs.substr(0, strs.length-1)
            this.loading = true
            let str = '&node_id=' + '&node_list=' + strs + '&ws_supplier=&start_date=' + this.startTime + '&end_date='
                + this.endTime + '&page=' + this.page + '&cols=' + this.cols
            GetSuperMeatIn(str)
                .then(res => {
                    let data = JSON.parse(res)
                    this.loading = false
                    this.tableData = data[0].data.resultList
                    this.num = data[0].data.totalCount
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        viewFun(ele){
            this.$router.push({name: 'ViewLedger',params: {param: ele, types: this.form.types}})
        },
        searchFun(){
            this.page = 1
            this.num = 0
            this.tableData = []
            if(this.form.types == '餐饮'){
                this.isCy = true
                this.isLssc = false
                this.isCs = false
                this.getDataFun()
            }else if(this.form.types == '零售市场'){
                this.isCy = false
                this.isLssc = true
                this.isCs = false
                this.getDataFun2()
            }else if(this.form.types == '超市'){
                if(this.form.cs_name.length == 0){
                    this.$message.warning('请选择企业名称');
                    return
                }
                this.isCy = false
                this.isLssc = false
                this.isCs = true
                this.getDataFun3()
            }
        },
        handleCurrentChange(val) {
            this.page = val
            if(this.form.types == '餐饮'){
                this.getDataFun()
            }else if(this.form.types == '零售市场'){
                this.getDataFun2()
            }else if(this.form.types == '超市'){
                this.getDataFun3()
            }
        },
        clearFun(){
            this.tableData = []
            this.num = 0
            this.isCy = true
            this.isLssc = false
            this.isCs = false
            this.form = {
                dataTime: '',
                types: '餐饮',
                name: '',
                good_name: '',
                gys_name: '',
                market_name: '',
                supervise: '',
                region: '',
                sh_name: '',
                category: '',
                attribute: '',
            }
            this.form.supervise = this.superviseArr[0].jgjg
            this.form.cs_name = []
            this.startTime = ''
            this.endTime = ''
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.getGetNodeJgInfoGroupForJg('餐饮')
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
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.startTime = ''
                this.endTime = ''
            }
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
                    margin-bottom: 10px;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
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
        .password{
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
                margin-top: -310px;
                margin-left: -300px;
                width: 600px;
                height: 620px;
                background: #fff;
                font-size: 14px;
                border-radius: 5px;
                .clear{
                    clear: both;
                }
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
            }
        }
        .box{
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 666;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
            .images{
                text-align: center;
            }
            .el-carousel{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                .image{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            .el-carousel__container{
                width: 100%;
                height: 100%;
            }
            .el-carousel__item{
                color: #475669;
                font-size: 14px;
                margin: 0;
            }
        }
        .msg-item{
            width: 600px;
            display: flex;
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin: 10px;
                        img{
                            width: 80px;
                            height: 80px;
                            border: 1px solid #eaeaea;
                        }
                    }
                }
            }
        }
    }

</style>
<style lang='less'>
    .ledgerMsg{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 22px;
        }
    }
</style>