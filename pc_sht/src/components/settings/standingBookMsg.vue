<template>
    <div class="content standingBookMsg" ref='content'>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="进货台账" name="first"><!--
                <el-button type="primary" class="shop" @click="addEntryTzFun">新增进货台账类型</el-button>-->
                <div>
                    <el-table :data="tableData" border  :header-cell-style="rowClass">
                        <el-table-column
                        prop="tz_name"
                        label="台账名称" >
                        </el-table-column>
                        <el-table-column
                        prop="booth_name"
                        label="所属区域" >
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="300">
                        <template slot-scope="scope">
                            <!--<el-button @click="handleClick(scope.row)" type="text" size="small"></el-button>-->
                            <el-button type="text" size="small" @click="editEntryTzFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="销售台账" name="second"><!--
                <el-button type="primary" class="shop">新增销售台账类型</el-button>-->
                <el-table :data="tableData2" border :header-cell-style="rowClass">
                    <el-table-column
                    prop="tz_name"
                    label="台账名称" >
                    </el-table-column>
                    <el-table-column
                    prop="booth_name"
                    label="进货台账类型" >
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <!--<el-button @click="handleClick(scope.row)" type="text" size="small"></el-button>-->
                        <el-button type="text" size="small" @click="editSaleTzFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Bus from '../common/bus.js';
import {GetEntryTz} from '../../js/settings/settings.js'
export default {
    name: 'standingBookMsg',
    data(){
        return{
            activeName: 'first',
            tableData: [], // 进货
            tableData2: [], // 销售
            page: 1,
            cols: 10,
            addEntryTz: '新增进货台账',
            addSaleTz: '新增销售台账',
            editEntryTz: '编辑进货台账',
            editSaleTz: '编辑销售台账',
            userId: '',
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    mounted() {
        this.getEntryTzFun()
        this.getSaleTzFun()
    },
    methods: {
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        getEntryTzFun(){
            let obj = {
                userId: this.userId,
                tz_type: "1",
                page: this.page,
                cols: this.cols
            }
            // console.log(this.userId)
            GetEntryTz(obj)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        getSaleTzFun(){
            let obj = {
                userId: this.userId,
                tz_type: "2",
                page: this.page,
                cols: this.cols
            }
            GetEntryTz(obj)
                .then(res => {
                    this.tableData2 = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        addEntryTzFun(){
        },
        editEntryTzFun(ele){
            this.$router.push({name: 'EditEntryTz',params: ele})
        },
        editSaleTzFun(ele){
            this.$router.push({name: 'EditSaleTz',params: ele})
        },
    }
}
</script>

<style scoped lang="less">
    .content{
        padding: 10px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        .shop{
            margin: 10px 0;
        }
        .el-table{
            margin-top: 10px;
        }
    }
</style>
<style lang="less">
    .standingBookMsg{
        .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top{
            width: 200px;
            text-align: center;
            font-size: 18px;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
            background: #409EFF;
            color: #fff;
        }
        .el-tabs__item .is-top{
            border: none;
            width: 200px;
        }
        .el-tabs__header{
            margin-bottom: 0;
        }
    }
</style>
