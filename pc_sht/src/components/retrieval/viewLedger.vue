<template>
    <div class="content viewLedger">
        <div class="box">
            <div class="list-title">台账信息</div>
            <div class="view">
                <div class="list">
                    <div class="data">
                        <div class="title">进货日期</div>
                        <div class="msg">{{in_data ? in_data : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">商户信息</div>
                        <div class="msg">{{sh_name ? sh_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">供应商</div>
                        <div class="msg">{{gys_name ? gys_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">生产单位</div>
                        <div class="msg">{{scdw_name ? scdw_name : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">产地</div>
                        <div class="msg">{{addr ? addr : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">备注</div>
                        <div class="msg">{{remake ? remake : '无'}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab">
            <div class="list-title">商品信息</div>
            <el-table :data="tableData" :header-cell-style="rowClass" v-if="isCy">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="PLU_NAME" label="商品名称"></el-table-column>
                <el-table-column prop="SPECIFICATIONS" label="规格"></el-table-column>
                <el-table-column prop="PRICE" label="单价"></el-table-column>
                <el-table-column prop="WEIGHT" label="数量"></el-table-column>
                <el-table-column prop="TOTAL" label="总价"></el-table-column>
                <el-table-column prop="IN_DATE" label="生产日期"></el-table-column>
            </el-table>
            <el-table :data="tableData" :header-cell-style="rowClass" v-if="isLssc">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="goods_unit" label="规格"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="number" label="数量"></el-table-column>
                <el-table-column prop="ACTUAL_MONEY" label="总价"></el-table-column>
                <el-table-column prop="" label="生产日期"></el-table-column>
            </el-table>
            <el-table :data="tableData" :header-cell-style="rowClass" v-if="isCs">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="MEAT_NAME" label="商品名称"></el-table-column>
                <el-table-column prop="SPECIFICATIONS" label="规格"></el-table-column>
                <el-table-column prop="PRICE" label="单价"></el-table-column>
                <el-table-column prop="SL" label="数量"></el-table-column>
                <el-table-column prop="" label="总价">
                    <template slot-scope="scope">
                        <p>{{scope.row.PRICE*scope.row.SL.toFixed(2)}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="IN_DATE" label="生产日期"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {QueryTtxfjcxxDetailApi, JsqueryInTzDetailByTzId} from '../../js/retrieval/retrieval.js'
export default {
    name:"viewLedger",
    data() {
        return {
            page: 1,
            cols: 5,
            num: 0,
            tableData: [],
            qy_name: '', // 企业名称
            in_data: '',
            secend_parent: '', // 监管企业
            weight: '', // 进货总量
            num: '', // 数据量
            sh_name: '',
            gys_name: '',
            scdw_name: '',
            addr: '',
            remake: '',
            isCs: false,
            isLssc: false,
            isCy: true,
            node_id: '',
            batch_id: '',
            tz_id: '',
            gt_name: '',
        }
    },
    mounted() {
        console.log(this.$route.params)
        let param = this.$route.params.param
        let types = this.$route.params.types
        if(types == '餐饮'){
            this.isCy = true
            this.isLssc = false
            this.isCs = false
            this.node_id = param.node_id
            this.batch_id = param.batch_id
            this.qy_name = param.node_name
            this.in_data = param.in_date
            this.secend_parent = param.secend_parent
            this.num = param.num
            this.weight = param.weight
            this.getDataFun1()
        }else if(types == '零售市场'){
            this.isCy = false
            this.isLssc = true
            this.isCs = false
            this.tz_id = param.tz_id
            this.getDataFun2()
        }else if(types == '超市'){
            this.isCy = false
            this.isLssc = false
            this.isCs = true
            this.in_data = param.IN_DATE
            this.gt_name = param.BOOTH_NAME
            this.scdw_name = param.WS_SUPPLIER_NAME
            this.addr = param.AREA_ORIGIN_NAME
            this.sh_name = param.RETAIL_MARKET_NAME
            this.gys_name = param.GYS_MC
            this.addr = param.AREA_ORIGIN_NAME
            let obj = {
                MEAT_NAME: param.MEAT_NAME,
                PRICE: param.PRICE,
                SL: param.SL,
                WEIGHT: param.WEIGHT,
                IN_DATE: param.IN_DATE
            }
            this.tableData.push(obj)
            this.getDataFun3()
        }
    },
    methods: {
        getDataFun1(){
            let str = '&node_id=' + this.node_id + '&batch_id=' + this.batch_id
            QueryTtxfjcxxDetailApi(str)
                .then(res => {
                    let data = JSON.parse(res)
                    this.tableData = data.data.resultList
                    this.sh_name = this.tableData[0].RETAIL_MARKET_NAME
                    this.gys_name = this.tableData[0].GYS_MC
                    this.addr = this.tableData[0].AREA_ORIGIN_NAME
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getDataFun2(){
            let params = {
                tz_id: this.tz_id
            }
            JsqueryInTzDetailByTzId(params)
                .then(res => {
                    this.tableData = res.data.tzDetailList
                    let param = res.data.tzList[0]
                    this.in_data = param.IN_DATE
                    this.sh_name = param.BUYER_BOOTH_NAME
                    this.gys_name = param.SELLER_BOOTH_NAME
                    this.scdw_name = param.SUPPILER_NAME
                    this.addr = param.AREA_ORIGIN_NAME
                    this.remake = param.REMARK
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getDataFun3(){

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
        .list-title{
            padding-left: 20px;
            margin-bottom: 10px;
            line-height: 40px;
            border-bottom: 1px solid #e4e7ed;
        }
        .box{
            padding: 10px 20px;
            background: #fff;
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 20%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
                .submit{
                    margin: 0 30px;
                    position: relative;
                    left: 0;
                    top: 20%;
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
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .img-list{
                    ul{
                        display: flex;
                        flex-wrap:wrap;
                        li{
                            position: relative;
                            top: 0;
                            left: 0;
                            margin: 10px;
                            .icon-delete{
                                position: absolute;
                                top: -6px;
                                right: -6px;
                                width: 12px;
                                height: 12px;
                                text-align: center;
                                line-height: 7px;
                                font-size: 24px;
                                background: #990000;
                                color: #fff;
                                border-radius: 50%;
                                cursor: pointer;
                            }
                            img{
                                width: 50px;
                                height: 50px;
                            }
                        }
                    }
                }
                
                .msg-item{
                    margin: 10px 0;
                    width: 500px;
                    display: flex;
                }
            }
            .btn{
                clear: both;
                margin-right: 100px;
                text-align: right;
            }
        }
        .tab{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
        }
    }

</style>

<style lang="less">
    .viewLedger{
        .el-table td{
            padding: 5px 0;
        }
    }
</style>