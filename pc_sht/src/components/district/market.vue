<template>
    <div class="content" ref='content'>
        <div class="option-wrapper">
            <div class="option">
                <span class="option-title">市场区域</span>
                <el-input class="fill-input" v-model="nodeName" clearable placeholder="输入市场区域" style="width: 200px;"></el-input>
                <span class="option-title">负责人</span>
                <el-input class="fill-input" v-model="contacts" clearable placeholder="输入负责人或联系方式" style="width: 200px;"></el-input>
                <el-button type="primary" size="medium" class="search-btn" @click="searchFun">搜索</el-button>
                <span class="clear" @click="clearFun">清空筛选条件</span>
            </div>
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部市场区域</p>
                <div>
                    <el-button type="primary" size="medium" class="new-add" @click="addMarketFun">新增市场区域</el-button>
                    <el-button type="primary" size="medium" class="import">批量导入</el-button>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" border :header-cell-style="rowClass">
                    <el-table-column prop="name" label="市场区域"></el-table-column>
                    <el-table-column prop="boothType" label="经营范围" width="80">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.booth_type}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contacts" label="负责人"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式" width="140"></el-table-column>
                    <el-table-column label="是否已签供应商" width="120">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.bindgys === '1'? '是' : '否'}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column
                        label="是否生成下游台账" width="160">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.is_auto"
                            active-text="开启" inactive-text="禁用"
                            active-value="1" inactive-value="0" @change="changeFun(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="460">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="glMerchantsFun(scope.row)">管理商户&emsp;|</el-button>
                            <el-button type="text" size="small" @click="glSupplierFun(scope.row)">管理供应商&emsp;|</el-button>
                            <el-button type="text" size="small" @click="glCommodityFun(scope.row)">管理商品&emsp;|</el-button>
                            <el-button type="text" size="small" @click="glStandingBookFun(scope.row)">管理台账&emsp;|</el-button>
                            <el-button type="text" size="small" @click="redactFun(scope.row)">修改&emsp;|</el-button>
                            <el-button type="text" size="small" @click="deleteMarketsFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
        </div>
    </div>
</template>

<script>
import { GetMarkets,DeleteMarkets,UpdateRegionAuto } from '../../js/district/district.js';
export default {
    name:"market",
    data() {
        return {
            addMarket: '新增市场区域',
            glMerchants: '管理商户',
            glSupplier: '管理供应商',
            glCommodity: '管理商品',
            glStandingBook: '管理台账',
            redact: '修改',
            contacts: '',
            nodeName: '',
            tableData: [],
            value: '',
            page: 1,
            cols: 10,
            num: 0,
            userId: '',
        }
    },
    mounted() {
        this.getMarketFun()
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    methods: {
        changeFun(ele){
            console.log(ele)
            let obj = {
                shop_booth_id: ele.bootList[0].shop_booth_id,
                is_auto: ele.is_auto
            }
            UpdateRegionAuto(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        clearFun(){
            this.contacts = ''
            this.nodeName = ''
            this.getMarketFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getMarketFun()
        },
        getMarketFun(){            
            let obj = {
                page: this.page,
                cols: this.cols,
                total:"",
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName
            }
            GetMarkets(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        searchFun(){
            if(this.contacts || this.nodeName){
                this.getMarketFun()
            }else{
                this.getMarketFun()
            }
        },
        deleteMarketsFun(ele){
            let obj = {
                userId: ele.userId
            }
            DeleteMarkets(obj)
                .then(res => {
                    this.getMarketFun()
                    this.$message.success(res.message);
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        addMarketFun(){//新增市场区域
            this.$router.push({name:'AddMarket'})
        },
        glMerchantsFun(ele){//管理商户
            let param = ele.bootList
            localStorage.setItem("dataList",JSON.stringify(param))
             this.$router.push({name:'GlMerchants'})
        },
        glSupplierFun(ele){//管理供应商  
            let param = ele.bootList
            localStorage.setItem("dataList",JSON.stringify(param))
            this.$router.push({name:'GlSupplier'})
        },
        glCommodityFun(ele){//管理商品 
            let param = ele.bootList
            localStorage.setItem("dataList",JSON.stringify(param))
            this.$router.push({name:'GlCommodity'})
        },
        glStandingBookFun(ele){//管理台账 
            let param = ele.bootList
            localStorage.setItem("dataList",JSON.stringify(param))
            this.$router.push({name:'GlStandingBook'})
        },
        redactFun(ele){//修改
            this.$router.push({name:'Redact',params: ele})
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        box-sizing: border-box;
        height: 100%;
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
        .tables{
            padding: 10px;
            margin-top: 10px;
            background: #fff;
        }
        .search-btn{
            color: #409EFF;
            background: #fff;
        }
        .import{
            color: #169bd5;
            background: #fff;
        }
        .option-wrapper{
            padding: 10px;
            margin-bottom: 10px;
            background: #fff;
        }
        .option{
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            overflow: hidden;
            .option-title,.fill-input,.fill-select{
                float: left;
                display: block;
                margin-right: 20px;
            }
            .option{
                width: 100px;
            }
            .fill-input{
                width: 160px;
            }
            .clear{
                margin-left: 10px;
                cursor: pointer;
                color: #999;
            }
        }
        .booth-management-msg{
            margin-top: 20px;
            width: 100%;
        }
    }
    .el-pagination{
        margin-top: 15px;
        text-align: center;
    }
    .table{
        margin-top: 10px;
    }
</style>
