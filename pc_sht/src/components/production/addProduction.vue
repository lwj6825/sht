<template>
    <div class="content">
        <div class="data">
            <p>生产日期</p>
            <el-date-picker
                v-model="in_date"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="data">
            <p>销售商品</p>
        </div>
        <div class="table">
            <el-table  :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="in_date" label="商品名称">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.goodVal" filterable placeholder="请选择" @change="selectGoodFun(scope.row.goodVal,scope.$index)">
                            <el-option v-for="(item,index) in scope.row.goodArr" :key="index" :label="item.goods_name" :value="item.goods_code">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="数量">
                    <template slot-scope="scope">
                        <el-input class="input" v-model="scope.row.goodNum" size="mini" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_unit" width="100" label=""> </el-table-column>
                <el-table-column prop="buyer_booth_name" label="原料名称">
                    <template slot-scope="scope">
                        <div class="material" v-if="scope.row.goodVal" v-for="(item2,index2) in scope.row.gooaMsgArr" :key="index2">
                            <p style="padding-left: 20px;" calss="material-name">{{item2.or_goods_name}}</p>
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="buyer_booth_name" label="原料单位/规格">
                    <template slot-scope="scope">
                        <div class="material" v-if="scope.row.goodVal" v-for="(item2,index2) in scope.row.gooaMsgArr" :key="index2">
                            <p style="padding-left: 20px;" calss="material-name">{{item2.or_goods_name}}</p>
                        </div>
                    </template>-->
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="批次信息">
                    <template slot-scope="scope">
                        <div class="material" v-if="scope.row.goodVal" v-for="(item2,index2) in scope.row.gooaMsgArr" :key="index2">
                            <el-select v-model="item2.batchId" filterable placeholder="批次信息">
                                <el-option v-for="(item3,index3) in item2.batch" :key="index3" :label="item3.BATCH_ID" :value="item3.BATCH_ID">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_booth_name" label="原料数量">
                    <template slot-scope="scope">
                        <div class="material" v-if="scope.row.goodVal" v-for="(item2,index2) in scope.row.gooaMsgArr" :key="index2">
                            <el-input v-model="item2.materialNum" size="mini" placeholder="数量"></el-input>
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
            <el-button class="add-btn" size="medium" @click="addGoodFun">添加商品</el-button>
            <br/>
            <el-button class="save-btn" type="primary" size="small" @click="saveFun">保存</el-button>
        </div>
    </div>
</template>

<script>
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
import {QueryGoodsinfo,QueryPurchaseGoods,QueryGoodsBatchId,InsertProduction} from '../../js/production/production.js'
export default {
    name:"addProduction",
    data() {
        return {
            in_date: '',
            tableData: [],
            node_id: '',
            goodArr: [],
            batchId: ''
        }
    },
    mounted() {
        var currentTime = new Date()
        this.in_date = formatDate(currentTime)
        this.node_id = localStorage.getItem('loginId')
        this.getGoodFun()
    },
    methods: {
        deleteFun(ele){
            this.tableData.splice(ele,1)
            this.tableData.length - 1
        },
        saveFun(){
            let str = '', userdefine = '';
            if(this.tableData.length > 0){
                this.tableData.forEach(val => {
                    val.goodArr.forEach(val2 => {
                        if(val.goodVal == val2.goods_code){
                            str += '{"node_id":"' + val2.node_id + '","node_name":"' + val2.node_name + '","stk_goods_code":"' + val2.goods_code
                                + '","stk_goods_name":"' + val2.goods_name + '","stk_gb_code":"' + val2.gb_code + '","stk_gb_name":"' + val2.gb_name
                                + '","stk_unit":"' + val2.goods_unit + '","stk_number":"' + val.goodNum + '","userdefine_code_two":"' + val2.userdefine_code_two
                                + '","sc_data":"' + this.in_date + '","userdefine_category":"' + val2.userdefine_category + '","or":['
                        }
                    })
                    val.gooaMsgArr.forEach((val3,index) => {
                        str += '{"or_goods_code":"' + val3.or_goods_code + '","or_goods_name":"' + val3.or_goods_name + '","or_unit":"' + val3.or_unit
                        + '","or_batch_id":"' + val3.batchId + '","or_weight":' + '""' + ',"or_number":"' + val3.materialNum + '","main_or":' + '"0"}'+ ( (index==val.gooaMsgArr.length-1)? "":',')
                    })
                    str += ']},' 
                })
                if(str != ''){
                    userdefine = str.substring(0,str.length - 1)
                }
                let params = {
                    data: userdefine ? ('[' + userdefine + ']') : ''
                }
                InsertProduction(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.$router.push({name: 'productionMsg'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }
        },
        // 进货商品信息
        selectGoodMsgFun(ele){
            let params = {
                node_id: this.node_id,
                or_goods_code: ele.OR_GOODS_CODE,
            }
            let obj = {};
            QueryGoodsBatchId(params)
                .then(res => {
                    this.tableData.forEach(val => {
                        val.gooaMsgArr.forEach(val2 => {
                            if(ele.OR_GOODS_CODE == val2.OR_GOODS_CODE){
                                val2.batchArr = res.data.dataList;
                            }
                        })
                    })
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        // 选择商品
        selectGoodFun(ele,ele2){
            let states = false;
            let arr = [],newArr = [];
            this.tableData.forEach(val => {
                if(val.gooaMsgArr.length > 0){
                    if(ele == val.goodVal){
                        // this.$message({
                        //     message: '不能选择同一商品',
                        //     type: 'warning',
                        //     offset: 200,
                        // });
                        arr.push(val.goodVal)
                        // states = true
                        // return
                    }
                }
                
            })
            arr.forEach(val => {
                if(newArr.indexOf(val) == -1) {
                    newArr.push(val)
                }else{
                    this.$message({
                        message: '不能选择同一商品',
                        type: 'warning',
                        offset: 200,
                    });
                    states = true
                    return
                }
            })
            if(states == false){
                let goods_unit = '',obj = {};
                this.goodArr.forEach(val => {
                    if(ele == val.goods_code){
                        goods_unit = val.goods_unit
                    }
                })
                let params = {
                    node_id: this.node_id,
                    stk_goods_code: ele,
                }
                QueryPurchaseGoods(params)
                    .then(res => {
                        let dataList = res.data.dataList
                        this.tableData.forEach(val => {
                            if(val.goodVal == ele){
                                dataList.forEach(val2 => {
                                    val2.batchId = ''
                                    val2.materialNum = ''
                                })
                                val.gooaMsgArr = dataList
                                val.goods_unit = goods_unit
                                if(dataList == 0){
                                    this.$message({
                                        message: '匹配不全',
                                        type: 'warning',
                                        offset: 200,
                                    });
                                }
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                this.tableData.splice(ele2,1)
                this.tableData.length - 1
            }
        },
        getGoodFun(){
            let params = {
                node_id: this.node_id,
                goods_Name: '',
            }
            QueryGoodsinfo(params)
                .then(res => {
                    this.goodArr = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        addGoodFun(){
            let obj = {
                goodArr: this.goodArr,
                gooaMsgArr: [],
                goodVal: '',
                goodNum: '',   
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
                font-size: 14px;
            }
        }
        .table{
            margin: 20px auto;
        }
        .save-btn{
            margin-top: 20px;
            margin-left: 48%;
        }
        .add-btn{
            margin: 10px 0;
            width: 100%;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 200px;
        }
        .el-input__icon{
            line-height: 30px;
        }
        .material{
            margin: 5px 0;
            display: flex;
        }
        .el-input{
            width: 130px;
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
