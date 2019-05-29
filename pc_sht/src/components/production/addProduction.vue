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
                <el-table-column prop="in_date" label="商品名称"> </el-table-column>
                <el-table-column prop="buyer_booth_name" label="规格"> </el-table-column>
                <el-table-column prop="buyer_booth_name" label="数量"> </el-table-column>
                <el-table-column prop="buyer_booth_name" label="进货商品信息"> </el-table-column>
                <el-table-column label="操作" width='180'>
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="save-btn" type="primary" size="small">保存</el-button>
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
export default {
    name:"addProduction",
    data() {
        return {
            in_date: '',
            tableData: []
        }
    },
    mounted() {
        var currentTime = new Date()
        this.in_date = formatDate(currentTime)
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
            p{
                margin-right: 20px;
                font-size: 14px;
            }
        }
        .table{
            margin-top: 20px;
        }
        .save-btn{
            margin-top: 20px;
            margin-left: 200px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 200px;
        }
        .el-input__icon{
            line-height: 30px;
        }
    }

</style>
