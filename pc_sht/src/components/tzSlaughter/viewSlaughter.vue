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
                <el-table-column prop="stk_goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="stk_num" label="数量"></el-table-column>
                <el-table-column prop="or_goods_name" label="原料信息"></el-table-column>
                <el-table-column prop="or_batch_id" label="进货批次"></el-table-column>
                <el-table-column prop="or_num" label="原料数量"></el-table-column>
                <el-table-column prop="da_batch_id" label="档案批次"></el-table-column>
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
        console.log(this.$route.params)
        let data = this.$route.params
        this.in_date = data.tz_rq
        this.enterprise = data.biz_name
        this.describe = data.tz_remark
        let obj = {
            stk_goods_name: data.stk_goods_name,
            stk_num: data.stk_num,
            or_goods_name: data.or_goods_name,
            or_batch_id: data.or_batch_id,
            or_num: data.or_num,
            da_batch_id: data.da_batch_id,
        }
        this.tableData.push(obj)
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
