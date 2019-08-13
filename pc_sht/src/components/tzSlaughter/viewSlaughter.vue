<template>
    <div class="content">
        <div class="data">
            <p>屠宰日期</p>
            <span>{{in_date}}</span>
        </div>
        <div class="data">
            <p>屠宰企业</p>
            <span>{{enterprise}}</span>
        </div>
        <div class="data">
            <p>屠宰加工工艺描述</p>
            <span>{{describe}}</span>
        </div>
        <div class="data">
            <p>屠宰信息</p>
        </div>
        <div class="table">
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="in_date" label="商品名称"></el-table-column>
                <el-table-column prop="goods_unit" width="100" label="规格"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="数量"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="原料信息"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="进货批次"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="原料数量"></el-table-column>
                <el-table-column prop="buyer_booth_name" label="送宰批次"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name:"viewSlaughter",
    data() {
        return {
            in_date: '111',
            enterprise: '222',
            describe: '333',
            tableData: [],
        }
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
            font-size: 14px;
            p{
                margin-right: 20px;
                width: 120px;
                text-align: right;
                line-height: 30px;
            }
        }
    }
</style>
