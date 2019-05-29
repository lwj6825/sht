<template>
    <div class="content" ref="content">
        <div class="account-cont">
            <p class="titles">区域信息</p>
            <el-row class="demo-autocomplete">
                <el-col :span="4"  class="sub-title">市场区域：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].booth_name}}</el-col>
                <el-col :span="4"  class="sub-title">负责人：</el-col>
                <el-col :span="4"  class="sub-text">{{dataArr[0].contacts + '(' + dataArr[0].callphone + ')'}}</el-col>
                <el-col :span="4" class="sub-title">已签供应商：</el-col>
                <el-col :span="4" class="sub-text">{{dataArr[0].bindgys === '1' ? '是' : '否'}}</el-col>
            </el-row>
            <el-row class="demo-autocomplete">
                <el-col :span="4" class="sub-title">供应商数量：</el-col>
                <el-col :span="4"  class="sub-text">{{num + '人'}}</el-col>
            </el-row>
        </div>
        <div class="tables">
            <div class="title">
                <p class="tz-title">全部供应商</p>
                <div>
                    <el-button type="primary" size="medium" class="new-add" @click="addSupplierFun">新增供应商</el-button>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" border :header-cell-style="rowClass">
                    <el-table-column prop="biz_name" label="供应商名称"></el-table-column>
                    <el-table-column prop="licence_no" label="营业执照号"></el-table-column>
                    <el-table-column prop="regId" label="身份证号"></el-table-column>
                    <el-table-column prop="concact_name" label="联系人"></el-table-column>
                    <el-table-column prop="cellphone" label="联系电话"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="supplierXqFun(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
import {GetSupplier} from '../../js/district/district.js'
export default {
    name: "glSupplier",
    data() {
        return {
            tableData: [],
            addSupplier: '新增供应商',
            supplierXq: '查看',
            page: 1,
            cols: 10,
            dataArr: {},
            num: 0,
        }
    },
    mounted() {
        if(this.$route.params.prevName){
            localStorage.setItem('prevName',this.$route.params.prevName)
        }
        this.GetSupplierFun()
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
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
            this.GetSupplierFun()
        },
        GetSupplierFun(){
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let obj = {
                page: this.page,
                cols: this.cols,
                userId: userId,
                type: "1",
                concact_name: "",
                region: region,
                biz_name: "",
                shop_booth_id: region
            }
            GetSupplier(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        addSupplierFun(){
            this.$router.push({name:'AddSupplier'})
        },
        supplierXqFun(ele){
            this.$router.push({name: 'SupplierXq',params: ele})
        },
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
