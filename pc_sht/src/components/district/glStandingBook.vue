<template>
    <div class="content" ref="content">
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
                <el-col :span="4" class="sub-title">台账数量：</el-col>
                <el-col :span="4"  class="sub-text"></el-col>
            </el-row>
        </div>
        <div class="tables">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="进货台账" name="first">
                    <div class="table">
                        <el-table :data="tableData" border height="100%" :header-cell-style="rowClass">
                            <el-table-column prop="date" label="商品名称"></el-table-column>
                            <el-table-column prop="name" label="品种"></el-table-column>
                            <el-table-column prop="province" label="价格"></el-table-column>
                            <el-table-column prop="city" label="规格"></el-table-column>
                            <el-table-column prop="city" label="供应商"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="销售台账" name="second">
                    <div class="table">
                        <el-table :data="tableData2" border height="100%" :header-cell-style="rowClass">
                            <el-table-column prop="date" label="商品名称"></el-table-column>
                            <el-table-column prop="name" label="品种"></el-table-column>
                            <el-table-column prop="province" label="价格"></el-table-column>
                            <el-table-column prop="city" label="规格"></el-table-column>
                            <el-table-column prop="city" label="供应商"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination background @current-change="handleCurrentChange2" :current-page.sync="page2" :page-size="cols2"
                    layout="total, prev, pager, next, jumper" :total="num2"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: "glStandingBook",
    data() {
        return {
            activeName: 'first',
            tableData: [],
            tableData2: [],
            dataArr: [],
            page: 1,
            cols: 10,
            num: 0,
            page2: 1,
            cols2: 10,
            num2: 0,
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
    },
    mounted() {
        
    },
    methods: {
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        handleCurrentChange(val){
            console.log(val)
        },
        handleCurrentChange2(val){
            console.log(val)
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        height: 100%;
        box-sizing: border-box;
        .tables{
            padding: 10px;
            margin-top: 10px;
            background: #fff;
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
            .titles{
                font-size: 14px;
            }
        }
    }
    .el-pagination{
        margin: 30px;
        text-align: center;
    }
</style>
<style>
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        background: #409EFF;
        color: #fff;
    }
    .el-tabs--card>.el-tabs__header{
        border-bottom: none;
    }
    .el-tabs__header{
        margin-bottom: 0;
    }
</style>
