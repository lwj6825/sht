<template>
    <div class="content personalXjMsg">
        <div class="table">
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="name" label="巡检人"> </el-table-column>
                <el-table-column prop="inspect_time" label="巡检时间"> </el-table-column>
                <el-table-column prop="assets_count" label="设备数量"> </el-table-column>
                <el-table-column prop="node_count" label="节点数量"> </el-table-column>
            </el-table>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
import {QueryInspectionRecord} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"personalXjMsg",
    data() {
        return {
            page: 1,
            cols: 15,
            num: 0,
            userId: '',
            total: '',
            tableData: [],
        }
    },
    mounted() {
        console.log(this.$route.params)
        this.name = this.$route.params.name
        this.getDataFun()
    },
    methods: {
        getDataFun(){
            let obj = {
                inspect_creater_name: this.name
            }
            QueryInspectionRecord(obj)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.dataList
                    this.num = res.data.dataList.length
                })
                .catch(res => {
                    console.log(res);
                })

        },
        handleCurrentChange(val) {
            this.page = val
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
        background: #fff;
        .table{
            padding: 20px;
            .el-pagination{
                margin: 20px 0;
                text-align: center;
            }
        }
    }
</style>
<style lang="less">
    .personalXjMsg{    
        .el-table td{
            padding: 10px 0;
        }
    }
</style>

