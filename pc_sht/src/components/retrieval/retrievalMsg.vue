<template>
    <div class="content retrievalMsg">
        <el-tabs v-model="activeName">
            <el-tab-pane label="进场数据查询" name="first">
                <div class="first_box">
                    <div>
                        <p class="title">节点总数</p>
                        <p class="nums">{{list_num1}}</p>
                    </div>
                    <div>
                        <p class="title">上传数据企业总量</p>
                        <p class="nums">{{list_num2}}</p>
                    </div>
                    <div>
                        <p class="title">未上传数据企业总量</p>
                        <p class="nums">{{list_num3}}</p>
                    </div>
                </div>
                <div class="searchs" ref="searchs">
                    <div class="search">
                        <el-form ref="form" :inline="true" :model="form" label-width="80px">
                            <el-form-item label="创建时间" style="width: 350px;" >
                                <el-date-picker clearable style="width: 260px"
                                    v-model="form.dataTime" value-format="yyyy-MM-dd"
                                    type="daterange" @change="timeChange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="企业类型">
                                <el-select v-model="form.types" placeholder="请选择" @change="typesChangeFun">
                                    <el-option label="餐饮" value="餐饮"></el-option>
                                    <el-option label="超市" value="超市"></el-option>
                                    <el-option label="零售市场" value="零售市场"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="企业名称">
                                <el-select v-model="form.name" filterable clearable placeholder="请选择" @change="nodeChangeFun">
                                    <el-option v-for="(item, index) in nodeArr" :key="index" :label="item.node_name" :value="item.node_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <div v-if="form.types == '餐饮'">
                                <el-form-item label="商品名称">
                                    <el-input class="label-width" v-model="form.good_name" clearable placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="供应商">
                                    <el-input class="label-width" v-model="form.gys_name" clearable placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="来源市场">
                                    <el-select v-model="form.market_name" filterable clearable placeholder="请选择">
                                        <el-option label="中北市场" value="中北市场"></el-option>
                                        <el-option label="城北回龙观商品交易市场" value="城北回龙观商品交易市场"></el-option>
                                        <el-option label="水屯批发市场" value="水屯批发市场"></el-option>
                                        <el-option label="北京京表农副产品市场中心" value="北京京表农副产品市场中心"></el-option>
                                        <el-option label="北京城北回龙观商品交易市场有限公司三旗百汇分市场" value="北京城北回龙观商品交易市场有限公司三旗百汇分市场"></el-option>
                                        <el-option label="北京白坊祥和农副产品零售市场" value="北京白坊祥和农副产品零售市场"></el-option>
                                        <el-option label="北京诚信瀚海农副产品市场有限公司" value="北京诚信瀚海农副产品市场有限公司"></el-option>
                                        <el-option label="燕丹华燕市场" value="燕丹华燕市场"></el-option>
                                        <el-option label="太平兴园市场" value="太平兴园市场"></el-option>
                                        <el-option label="南环春晖市场" value="南环春晖市场"></el-option>
                                        <el-option label="绿保农贸市场" value="绿保农贸市场"></el-option>
                                    
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属街道">
                                    <el-select v-model="form.supervise" filterable clearable placeholder="请选择">
                                        <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-else-if="form.types == '零售市场'">
                                <el-form-item label="商品名称">
                                    <el-input class="label-width" v-model="form.good_name" clearable placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所属区域">
                                    <el-select v-model="form.region" filterable clearable placeholder="请选择" @change="regionChangeFun">
                                        <el-option v-for="(item, index) in regionArr" :key="index" :label="item.BOOTH_NAME" :value="item.SHOP_BOOTH_ID"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="商户名称">
                                    <el-select v-model="form.sh_name" filterable clearable placeholder="请选择">
                                        <el-option v-for="(item, index) in shArr" :key="index" :label="item.booth_name" :value="item.biz_id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="供应商">
                                    <el-select v-model="form.gys_name" filterable clearable placeholder="请选择">
                                        <el-option v-for="(item, index) in gysArr" :key="index" :label="item.biz_name" :value="item.biz_name"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属街道">
                                    <el-select v-model="form.supervise" filterable clearable placeholder="请选择">
                                        <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
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
                        <div>
                            <el-button size="medium" class="new-add">导出</el-button>
                        </div>
                    </div>
                    <div class="tables">
                        <el-table :data="tableData" :header-cell-style="rowClass">
                            <el-table-column v-if="!isCs" prop="node_name" label="企业名称"></el-table-column>
                            <el-table-column v-if="isCy" prop="weight" label="进货总量"></el-table-column>
                            <el-table-column v-if="isCy" prop="num" label="数据量"></el-table-column>
                            <el-table-column v-if="isCy" prop="secend_parent" label="监管企业"></el-table-column>
                            <el-table-column v-if="isCy" prop="in_date" label="进货日期"></el-table-column>
                            <el-table-column v-if="isLssc" prop="buyer_booth_name" label="商户名称"></el-table-column>
                            <el-table-column v-if="isLssc" prop="seller_booth_name" label="供货商名称"></el-table-column>
                            <el-table-column v-if="isLssc" prop="details" label="商品名称"></el-table-column>
                            <el-table-column v-if="isLssc" prop="seller_booth_name" label="供货商名称"></el-table-column>
                            <el-table-column v-if="isCs" prop="SUPPLIER_NAME" label="企业名称"></el-table-column>
                            <el-table-column v-if="isCs" prop="IN_DATE" label="进货日期"></el-table-column>
                            <el-table-column v-if="isCs" prop="BOOTH_NAME" label="柜台"></el-table-column>
                            <el-table-column v-if="isCs" prop="WS_SUPPLIER_NAME" label="生产单位"></el-table-column>
                            <el-table-column v-if="isCs" prop="IN_DATE" label="进货日期"></el-table-column>
                            <el-table-column prop="state" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="viewFun(scope.row)">查看台账</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>    
                </div>
            </el-tab-pane>
        </el-tabs>
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
    QuerybizByNodeId, GetAllTzGys, GetSuperMeatIn} from '../../js/retrieval/retrieval.js'
import {GetJgjgByNodeid, GetNodeJgInfoGroupForJg} from '../../js/enterprise/enterprise.js'
export default {
    name:"retrievalMsg",
    data() {
        return {
            activeName: 'first',
            list_num1: '0',
            list_num2: '0',
            list_num3: '0',
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
            },
            startTime: '',
            endTime: '', 
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            superviseArr: [],
            regionArr: [],
            shArr: [],
            gysArr: [],
            node_id: '',
            nodeArr: [],
            userType: '',
            node_name: '',
            userId: '',
            isCs: false,
            isLssc: false,
            isCy: true,
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.node_id = localStorage.getItem('loginId')
        this.userType = localStorage.getItem('userType')
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        // this.getNodeTotalFun()
        // this.getGetJgjgByNodeid()
        // this.getGetNodeJgInfoGroupForJg('餐饮')
        // this.getGetJdhyd()
        // this.getDataFun()
    },
    methods: {
        // 选择区域
        regionChangeFun(){
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
                this.form.region = ''
                this.form.sh_name = ''
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
            this.form.good_name = '' 
            this.form.gys_name = '' 
            this.form.market_name = '' 
            this.form.supervise = '' 
            this.form.region = '' 
            this.form.sh_name = '' 
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
                    this.nodeArr = res.data.list
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
            }
            GetNodeTzInfoGroupForJg(params)
                .then(res => {
                    this.tableData = res.data.list
                    this.num = res.data.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 零售市场
        getDataFun2(){
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
                    this.tableData = res.data.tzList
                    this.num = res.data.tzBean.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 超市
        getDataFun3(){
            let str = '&node_id=' + '&node_list=' + this.form.name + '&ws_supplier=&start_date=' + this.startTime + '&end_date='
                + this.endTime + '&page=' + this.page + '&cols=' + this.cols
            GetSuperMeatIn(str)
                .then(res => {
                    let data = JSON.parse(res)
                    console.log(data)
                    this.tableData = data[0].data.resultList
                    this.num = data[0].data.totalCount
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        viewFun(ele){
            // this.$router.push({name: 'ViewRetrieval',params: ele})
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
            }
            this.startTime = ''
            this.endTime = ''
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
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
                this.getTime()
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
    .content{
        width: 100%;
        height: 100%;
        .first_box{
            margin-bottom: 10px;
            background: #fff;
            display: flex;
            div{
                padding: 20px 0;
                flex: 1;
                text-align: center;
                .title{
                    color: #999;
                    font-size: 12px;
                }
                .nums{
                    margin-top: 5px;
                    font-size: 20px;
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
        .types{
            display: flex;
            .types_title{
                margin: 0 12px;
                font-size: 14px;
                color: #606266;
            }
        }
    }

</style>
<style lang='less'>
    .retrievalMsg{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-tabs__header{
            padding: 0 20px;
            background: #fff;
        }
    }
</style>