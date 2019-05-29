<template>
    <div class="content glCommodity" ref="content">
        <div class="account-cont">
            <h6 class="titles">区域信息</h6>
            <el-row class="demo-autocomplete">
                <el-col :span="4"  class="sub-title">市场区域：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].booth_name}}</el-col>
                <el-col :span="4"  class="sub-title">负责人：</el-col>
                <el-col :span="4"  class="sub-text">{{dataArr[0].contacts + '(' + dataArr[0].callphone + ')'}}</el-col>
                <el-col :span="4" class="sub-title">已签供应商：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].bindgys === '1' ? '是' : '否'}}</el-col>
            </el-row>
            <el-row class="demo-autocomplete">
                <el-col :span="4" class="sub-title">商品数量：</el-col>
                <el-col :span="4"  class="sub-text">{{num + num2 + '种'}}</el-col>
            </el-row>
        </div>
        <div class="tables">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane :label="'进货商品(' + num + ')'" name="first">
                    <div class="title">
                        <p class="tz-title">全部进货商品</p>
                        <div>
                            <el-button type="primary" size="medium" class="new-add shop" @click="addEntryFun">新增进货商品</el-button>
                        </div>
                    </div>
                    <div class="table">
                        <el-table :data="tableData" border :header-cell-style="rowClass">
                            <el-table-column prop="GOODS_NAME" label="商品名称"></el-table-column>
                            <el-table-column prop="GB_NAME" label="品种" :formatter="formatter"></el-table-column>
                            <el-table-column prop="PRICE" label="价格"></el-table-column>
                            <el-table-column prop="GOODS_UNIT" label="规格"></el-table-column>
                            <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="entryXqFun(scope.row)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="'销售商品(' + num2 + ')'" name="second">
                    <div class="title">
                        <p class="tz-title">全部销售商品</p>
                        <div>
                            <el-button type="primary" size="medium" class="new-add shop" @click="addSellFun">新销售货商品</el-button>
                        </div>
                    </div>
                    <div class="table">
                        <el-table :data="tableData2" border :header-cell-style="rowClass">
                            <el-table-column prop="GOODS_NAME" label="商品名称"></el-table-column>
                            <el-table-column prop="GB_NAME" label="品种" :formatter="formatter"></el-table-column>
                            <el-table-column prop="PRICE" label="价格"></el-table-column>
                            <el-table-column prop="GOODS_UNIT" label="规格"></el-table-column>
                            <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="sellXqFun(scope.row)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination background @current-change="handleCurrentChange2" :current-page.sync="page2" :page-size="cols2"
                    layout="total, prev, pager, next, jumper" :total="num2"> </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {getDefaultProductTypes} from "../../js/goods/goods.js";
import {GetEntry,GetSell} from '../../js/district/district.js'
export default {
    name: "glCommodity",
    data() {
        return {
            activeName: 'first',
            tableData: [],
            tableData2: [],
            addEntry: '新增进货商品',
            addSell: '新增销售商品',
            entryXq: '查看进货商品',
            sellXq: '查看销售商品',
            dataArr: [],
            page: 1,
            cols: 10,
            num: 0,
            page2: 1,
            cols2: 10,
            num2: 0,
            queryNameData: [],
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
        this.queryNameData = JSON.parse(localStorage.getItem('queryNameData'))
    },
    mounted() {
        this.getEntryFun()
        this.getSellFun()
    },
    methods: {
        formatter(row, column){
            let typeName = '';
            let level_1_name  = '';
            let level_2_name  = '';
            let level_3_name  = '';
            let level_4_name  = '';
            let queryNameData = this.queryNameData;
            if(!row.level_id){
                return
            }
            if(row.level_id.length == 2){
                level_1_name = queryNameData[0].type_name;
                typeName = level_1_name;
            }
            if(row.level_id.length == 5){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0-5)){
                        level_2_name = ele.type_name;
                        typeName = level_1_name +'/'+ level_2_name ;
                    }
                })
            }
            if(row.level_id.length == 8){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0,5)){
                        level_2_name = ele.type_name;
                        ele.systemDefaultTypeList.forEach((ele)=>{
                            if(ele.level_id == row.level_id.slice(0,8)){
                                level_3_name = ele.type_name;
                                typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name;
                            }
                        })
                    }
                })
            }
            if(row.level_id.length == 12){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0,5)){
                        level_2_name = ele.type_name;
                        ele.systemDefaultTypeList.forEach((ele)=>{
                            if(ele.level_id == row.level_id.slice(0,8)){
                                level_3_name = ele.type_name;
                                ele.systemDefaultTypeList.forEach((ele)=>{
                                    if(ele.level_id == row.level_id.slice(0,12)){
                                        level_4_name = ele.type_name;
                                        typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name +'/'+ level_4_name;
                                    }
                                })
                            }
                        })
                    }
                })
            }
            return typeName;
        }, 
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getEntryFun()
        },
        handleCurrentChange2(val) {
            this.page2 = val
            this.getSellFun()
        },
        getEntryFun(){
            let region = this.dataArr[0].shop_booth_id
            let obj = {
                page: this.page,
                cols: this.cols,
                goodsName: "",
                suppliersName: "",
                region: region
            }
            GetEntry(obj)
                .then(res => {
                    this.tableData = res.data.purchaseList
                    this.num = res.data.goodsinfo.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        getSellFun(){
            let region = this.dataArr[0].shop_booth_id
            let obj = {
                page: this.page2,
                cols: this.cols2,
                goodsName: "",
                suppliersName: "",
                region: region
            }
            GetSell(obj)
                .then(res => {
                    this.tableData2 = res.data.salesList
                    this.num2 = res.data.goodsinfo.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        addEntryFun(){
            this.$router.push({path:'addEntry'})
        },
        addSellFun(){
            this.$router.push({path:'addSell'})
        },
        entryXqFun(ele){
            this.$router.push({name: 'EntryXq',params: ele})
        },
        sellXqFun(ele){
            this.$router.push({name: 'SellXq',params: ele})
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        height: 100%;
        box-sizing: border-box;
        .tables{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
        }
        .title{
            display: flex;
            margin: 10px 0;
            height: 30px;
            .tz-title{
                flex: 1;
                height: 20px;
                font-size: 14px;
                padding-left: 4px;
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
        .demo-autocomplete{
            margin-top: 10px;
            .sub-title {
            text-align: right;
            padding-right: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            }
            .sub-text {
            text-align: left;
            padding-right: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            }
        }
        .account-cont{
            padding: 10px;
            width: auto;
            background: #fff;
            margin-bottom: 10px;
        }
    }
    .el-pagination{
        margin: 30px;
        text-align: center;
    }
    .table{
        margin-top: 10px;
    }
</style>
<style lang="less">
    .glCommodity{

        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
            background: #409EFF;
            color: #fff;
        }
        .el-tabs__header{
            margin-bottom: 0;
        }
    }
</style>
