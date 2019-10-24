<template>
    <div class="content" ref="content">
        <div class="account-cont">
            <p class="titles">区域信息</p>
            <el-row class="demo-autocomplete">
                <el-col :span="4"  class="sub-title">市场区域：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].booth_name}}</el-col>
                <el-col :span="4"  class="sub-title">负责人：</el-col>
                <el-col :span="4"  class="sub-text">{{dataArr[0].contacts + '(' + dataArr[0].callphone + ')'}} </el-col>
                <el-col :span="4" class="sub-title">已签供应商：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].bindgys === '1' ? '是' : '否'}}</el-col>
            </el-row>
            <el-row class="demo-autocomplete">
                <el-col :span="4" class="sub-title">商户数量：</el-col>
                <el-col :span="4"  class="sub-text">{{num}}</el-col>
            </el-row>
            
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部商户</p>
                <div>
                    <el-button type="primary" size="medium" class="new-add" @click="addMerchantsFun">新增商户</el-button>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" border class="booth-management-msg" :header-cell-style="rowClass">
                    <el-table-column prop="name" label="商铺名称">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.booth_name}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column prop="name" label="摊位号">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.stall_no}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="账号"> </el-table-column>
                    <el-table-column prop="name" label="联系人">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.contacts}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column prop="name" label="联系方式" width="140">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.callphone}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column label="操作" width='280'>
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="bindGysFun(scope.row)">绑定供应商</el-button>
                        <el-button type="text" size="small" @click="bindSpFun(scope.row)">绑定商品</el-button>
                        <el-button type="text" size="small" @click="merchantsXqFun(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page"
                :page-size="cols" layout="total, prev, pager, next, jumper" :total="num">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {GetMerchants} from '../../js/district/district.js';
export default {
    name: "glMerchants",
    data() {
        return {
            addMerchants: '新增商户',
            bindGys: '绑定供应商',
            bindSp: '绑定商品',
            tableData: [],
            page: 1,
            cols: 10,
            dataArr: [],
            merchantsXq: '详情',
            num: 0,
            userId: '',
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.userId = localStorage.getItem('userId')
        this.dataArr = local
    },
    mounted() {
        if(this.$route.params.prevName){
            localStorage.setItem('prevName',this.$route.params.prevName)
        }
        this.getMerchantsFun()
    },
    methods: {
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getMerchantsFun()
        },
        addMerchantsFun(){//新增商户
            this.$router.push({name:'AddMerchants'});
        },
        bindGysFun(ele){//绑定供应商
            this.$router.push({name:'AddMerchants',params:{name:this.bindGys,data: ele,activeName:'second'}});
        },
        bindSpFun(ele){//绑定商品
            this.$router.push({name:'AddMerchants',params:{name:this.bindSp,data: ele,activeName:'third'}});
        },
        merchantsXqFun(ele){//详情
            this.$router.push({name:'MerchantsXq',params:{'ele': ele}});
        },
        getMerchantsFun(){
            let region = this.dataArr[0].shop_booth_id
            let obj = {
                page: this.page,
                cols: this.cols,
                total: "",
                userId: this.userId,
                name: "",
                boothName: "",
                stall_no: "",
                region: region
            }
            GetMerchants(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        box-sizing: border-box;
        height: 100%;
        .tables{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
        }
        .title{
            display: flex;
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
            .titles{
                font-size: 14px;
            }
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
