<template>
    <div class="content">
        <el-form class="form" ref="form" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="屠宰日期" prop="in_date">
                <el-date-picker v-model="form.in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="屠宰企业" prop="enterprise" style="margin-bottom: 15px;">
                <el-select v-model="form.enterprise" filterable clearable placeholder="请选择" @change="selectTzqyFun">
                    <el-option v-for="(item,index) in enterpriseList" :key="index"  :label="item.biz_name" :value="item.shop_concacts_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="屠宰加工工艺描述">
                <el-input clearable v-model="form.describe" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div class="data">
            <p>屠宰信息</p>
        </div>
        <div class="table" v-loading="loading">
            <el-table  :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="in_date" label="商品名称">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.goodVal" filterable placeholder="请选择" @change="selectGoodFun(scope.row.goodVal,scope.$index)">
                            <el-option v-for="(item,index) in scope.row.goodArr"  :key="index" :label="item.GOODS_NAME" :value="item.ID">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="进货批次">
                    <template slot-scope="scope">
                        <div class="material">
                            <el-select v-model="scope.row.jhBatchId" filterable>
                                <el-option v-for="(item3,index3) in scope.row.jhBatchArr" :key="index3" :label="item3.BATCH_ID" :value="item3.BATCH_ID">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="数量">
                    <template slot-scope="scope">
                        <el-input class="input" v-model="scope.row.goodNum" size="mini" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_unit" width="100" label=""> </el-table-column>
                <el-table-column prop="ylName" label="原料名称"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="原料数量">
                    <template slot-scope="scope">
                        <div class="material">
                            <el-input v-model="scope.row.ylNum" size="mini" placeholder="数量"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="养殖场">
                    <template slot-scope="scope">
                        <div class="material">
                            <el-select v-model="scope.row.yzcName" filterable @change="selectYzcFun(scope.row.yzcName)">
                                <el-option v-for="(item3,index3) in scope.row.yzcArr" :key="index3" :label="item3.yzc_name" :value="item3.id">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="档案批次">
                    <template slot-scope="scope">
                        <div class="material">
                            <el-select v-model="scope.row.batchId" filterable>
                                <el-option v-for="(item3,index3) in scope.row.batchList" :key="index3" :label="item3.yzc_dapc"
                            :value="item3.yzc_dapc">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width='50'>
                    <template slot-scope="scope">
                        <!--<el-button type="text" size="small">查看</el-button>-->
                        <el-button type="text" size="small" @click="deleteFun(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="add-btn" v-if="tableData.length == 0" size="medium" @click="addGoodFun">添加商品</el-button>
            <div class="save-btn">
                <el-button size="small" @click="cancalFun">取消</el-button>
                <el-button type="primary" size="small" @click="submitForm('form')">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {InsertYzctzjg,QueryTzGoods} from '../../js/tzSlaughter/tzSlaughter.js'
import {allGys} from "../../js/management/management.js";
import {sales} from "../../js/goods/goods.js";
import {GetAllYzcda,GetAllYzcxx} from '../../js/tzFarming/tzFarming.js'
import {QueryPurchaseGoods} from '../../js/production/production.js'
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
export default {
    name:"newSlaughter",
    data() {
        return {
            tableData: [],
            node_id: '',
            node_name: '',
            goodArr: [],
            batchId: '',
            szBatchId: '',
            enterpriseList: [],
            userId: '',
            batchList: [],
            yzcArr: [],
            stk_goods_code: '',
            stk_goods_name: '',
            form: {
                in_date: '',
                enterprise: '',
                describe: '',
            },
            rules: {
                in_date: [
                    { required: true, message: '请选择屠宰日期', trigger: 'change' }
                ],
                enterprise: [
                    { required: true, message: '请选择屠宰企业', trigger: 'change' }
                ],
            },
            loading: true,
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem('userId'));
        this.scShopId = localStorage.getItem('scShopId');
        this.node_id = localStorage.getItem('loginId')
        this.node_name = localStorage.getItem('loginName')
        this.getPlotHzsList()
        var currentTime = new Date()
        this.form.in_date = formatDate(currentTime)
        this.getNsGoodsQueryPOSTType()
        this.getDataFun()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    return false;
                }
            });
        },
        selectTzqyFun(ele){
            let suppliersName = ''
            this.enterpriseList.forEach(val => {
                if(ele == val.shop_concacts_id){
                    suppliersName = val.biz_name
                }
            })
            this.getNsGoodsQueryPOSTType(suppliersName)
        },
        selectYzcFun(ele){
            this.ids = ele
            this.getDapcFun(ele)
        },
        // 养殖场
        getDataFun(){
            let obj = { 
                userId: '', // 所属企业
                yzc_name: '', // 养殖场名称
                start_time: '',
                end_time: '',
                page: 1,
                cols: 10000,
                node_id: this.node_id
            }
            GetAllYzcxx(obj)
                .then(res => {
                    this.yzcArr = res.data.dataList;
                    this.ids = res.data.dataList[0].id
                    this.getDapcFun()
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 档案批次
        getDapcFun(ele){
            let obj = { 
                page: this.page,
                cols: '10000',
                id: this.ids
            }
            GetAllYzcda(obj)
                .then(res => {
                    this.batchList = res.data.dataList;
                    if(ele){
                        this.tableData.forEach(val => {
                            if(val.yzcName == ele){
                                val.batchList = this.batchList
                                if(val.batchList.length > 0){
                                    val.batchId = val.batchList[0].yzc_dapc
                                }else{
                                    val.batchId = ''
                                }
                            }
                        })
                    }
                })
                .catch((res) => {
                    console.log(res)
                })

        },
        // 商品
        getNsGoodsQueryPOSTType(ele) {
            this.loading = true
            let boothData = {
                page: 1,
                cols: 10000,
                goodsName: '',
                goodsCode: '',
                suppliersName: ele,
                region: '',
                userId: this.userId,
                total: '',
                j_name: ''
            }
            sales(boothData)
                .then(res => {
                    if(this.tableData.length > 0){
                        this.tableData[0].goodArr = res.data.salesList;
                    }else{
                        this.goodArr = res.data.salesList;
                    }
                    this.loading = false
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
                })
        },
        // 所属企业
        getPlotHzsList() {
            let boothData = {
                page: 1,
                cols: 100000,
                userId: this.userId,
                type:'1',
                concact_name: '',
                biz_name: '',
                region: this.areaId,
                shop_booth_id:this.scShopId,
          }
          allGys(boothData)
            .then(res => {
                this.enterpriseList = res.data.dataList;
            })
            .catch(res => {
                console.log(res)
            })
        },
        cancalFun(){
            this.$router.push({name: 'SlaughterList'})
        },
        deleteFun(ele){
            this.tableData.splice(ele,1)
            this.tableData.length - 1
        },
        saveFun(){
            if(this.tableData.length == 0){
                this.$message.error('请填写屠宰信息！');
                return;
            }
            if(this.tableData[0].goodVal == ''){
                this.$message.error('请选择商品名称！');
                return;
            }
            if(this.tableData[0].jhBatchId == ''){
                this.$message.error('请选择进货批次！');
                return;
            }
            if(this.tableData[0].goodNum == ''){
                this.$message.error('请输入数量！');
                return;
            }
            if(this.tableData[0].ylName == ''){
                this.$message.error('该商品没有原料，请添加原料！');
                return;
            }
            if(this.tableData[0].ylNum == ''){
                this.$message.error('请输入原料数量！');
                return;
            }
            let obj = {
                node_id: this.node_id, // 节点编码
                node_name: this.node_name, // 节点名称
                tz_rq: this.form.in_date, // 屠宰日期
                tz_qy: this.form.enterprise, // 屠宰企业 对应的是 供应商 shop_contact 的id
                tz_remark: this.form.describe, // 屠宰描述
                stk_batch_id: this.tableData[0].goodVal, //成品 信息批次 id 一般为兔白条 的 关联兔子白条 的进货台账
                stk_goods_code: this.stk_goods_code, //养殖场 成品的 商品码
                stk_goods_name: this.stk_goods_name, // 成品的商品名称 兔白条
                stk_num: this.tableData[0].goodNum, // 成品的数量 
                or_batch_id: this.tableData[0].jhBatchId, //原料 的批次码  可以为空
                or_goods_code: this.tableData[0].ylCode, //原料商品码
                or_goods_name: this.tableData[0].ylName, //原料商品名称
                or_num: this.tableData[0].ylNum, //原料数量
                da_batch_id: this.tableData[0].batchId, //关联活兔 的饲养记录的档案 批次
                yzc_id: this.tableData[0].yzcName,
            }
            console.log(obj)
            InsertYzctzjg(obj)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.$router.push({name: 'SlaughterList'})
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 进货商品信息
        selectGoodMsgFun(ele){
            // let params = {
            //     node_id: this.node_id,
            //     or_goods_code: ele.OR_GOODS_CODE,
            // }
            // let obj = {};
            // QueryGoodsBatchId(params)
            //     .then(res => {
            //         this.tableData.forEach(val => {
            //             val.gooaMsgArr.forEach(val2 => {
            //                 if(ele.OR_GOODS_CODE == val2.OR_GOODS_CODE){
            //                     val2.batchArr = res.data.dataList;
            //                 }
            //             })
            //         })
            //     })
            //     .catch(() => {
            //         this.$message.error("出错啦!");
            //     })
        },
        // 选择商品
        selectGoodFun(ele,ele2){
            this.loading = true
            let goods_unit = '', dataList = [], goods_code = '';
            this.goodArr.forEach(val => {
                if(ele == val.ID){
                    goods_unit = val.GOODS_UNIT
                    dataList = val.stk_list
                    this.stk_goods_code = val.GOODS_CODE
                    this.stk_goods_name = val.GOODS_NAME
                }
            })
            this.tableData.forEach(val => {
                if(val.goodVal == ele){  
                    val.gooaMsgArr = dataList
                    val.goods_unit = goods_unit
                    val.batchList = this.batchList
                    if(val.yzcArr.length > 0){
                        val.yzcName = val.yzcArr[0].id
                    }
                    val.yzcName = val.yzcArr[0].id
                    if(val.batchList.length > 0){
                        val.batchId = val.batchList[0].yzc_dapc
                    }
                    if(dataList.length > 0){
                        val.ylName = dataList[0].or_goods_name
                        val.ylCode = dataList[0].or_goods_code
                    }
                }
            })
            let params = {
                node_id: this.node_id,
                stk_goods_code: this.stk_goods_code,
            }
            QueryTzGoods(params)
                .then(res => {
                    this.tableData.forEach(val => {
                        if(val.goodVal == ele){
                            if(res.data.dataList.length > 0){
                                val.jhBatchArr = res.data.dataList[0].batch
                                val.jhBatchId = res.data.dataList[0].batch[0].BATCH_ID
                            }else{
                                val.jhBatchArr = []
                                val.jhBatchId = ''
                            }
                            
                        }
                    })
                    this.loading = false
                })
                .catch(res => {
                    this.loading = false
                })
        },
        addGoodFun(){
            // if(!this.form.enterprise){
            //     this.$message.warning('请选择屠宰企业');
            //     return
            // }
            let obj = {
                goodArr: this.goodArr, // 商品信息
                gooaMsgArr: [], // 原料信息
                batchList: [], // 档案批次
                goodVal: '', // 商品名称
                goodNum: '', // 数量
                goods_unit: '', // 规格
                jhBatchId: '', // 进货批次
                jhBatchArr: [], // 进货批次
                batchId: '', // 档案批次
                ylNum: '', // 原料数量
                yzcArr: this.yzcArr, // 养殖场
                yzcName: '', // 养殖场名称
                ylName: '', // 原料名称
                ylCode: '', //原料商品码
            }
            this.tableData.unshift(obj)
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
        padding: 10px;
        background: #fff;
        .data{
            margin-left: 20px; 
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            p{
                margin-right: 20px;
                width: 120px;
                text-align: right;
                font-size: 14px;
            }
        }
        .form{
            .el-textarea, .el-select, .el-date-picker, .el-input{
                width: 300px;
            }
        }
        .table{
            margin: 20px auto;
        }
        .save-btn{
            margin-top: 20px;
            margin-left: 400px;
        }
        .add-btn{
            margin: 10px 0;
            width: 100%;
        }
        .el-input__icon{
            line-height: 30px;
        }
        .material{
            margin: 5px 0;
            display: flex;
        }
        .el-input{
            width: 88px;
        }
        .select-godmsg{
            margin: 0 20px;
        }
        .material-name{
            padding-left: 20px !important;
        }
    }

</style>
<style>
.el-input__icon{
    line-height: 30px;
}
.el-table td {
    padding: 5px 0;
}
</style>
