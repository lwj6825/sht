<template>
    <div class="content">
        <div class="searchs">
            <div class="search">
                <p>审核状态:</p>
                <el-radio-group v-model="labelPosition" size="small" @change="selectFun">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="1">待审核</el-radio-button>
                    <el-radio-button label="2">审核通过</el-radio-button>
                    <el-radio-button label="3">审核驳回</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="record_date" label="申请时间"> </el-table-column>
                <el-table-column prop="node_name" label="企业名称"> </el-table-column>
                <el-table-column prop="legal_represent" label="法人代表"> </el-table-column>
                <el-table-column prop="tel" label="联系方式"> </el-table-column>
                <el-table-column prop="serial_num" label="地址">
                    <template slot-scope="scope">{{scope.row.area_name + scope.row.addr}}</template>
                </el-table-column>
                <el-table-column prop="apply_state" label="审核状态">
                    <template slot-scope="scope">
                        <p v-if="scope.row.apply_state == 0">全部</p>
                        <p v-if="scope.row.apply_state == 1">待审核</p>
                        <p v-if="scope.row.apply_state == 2">审核通过</p>
                        <p v-if="scope.row.apply_state == 3">审核驳回</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.apply_state == 1" size="small" @click="jumpFun(scope.row)">审核</el-button>
                        <el-button type="text" v-if="scope.row.apply_state == 2" size="small" @click="jumpFun(scope.row)">查看</el-button>
                        <el-button type="text" v-if="scope.row.apply_state == 3" size="small" @click="jumpFun(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            + " "  + date.getHours()  + seperator2  + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate
}
import {GetNodeApply} from '../../js/user/user.js'
export default {
    name:"enterpriseAudit",
    data() {
        return {
            labelPosition: '0',
            page: 1,
            cols: 15,
            total: 0,
            tableData: [],
            start_date: '',
            end_date: ''
        }
    },
    mounted() {
        this.getDataFun()
    },
    methods: {
        jumpFun(ele){
            this.$router.push({name: "XqReview",params: ele})
        },
        selectFun(ele){
            this.getDataFun()
        },
        getDataFun(){
            let params = {
                apply_state: this.labelPosition,//  申请状态0 ，全部，1待审核；2审核通过，3驳回
                start_date: this.start_date,
                end_date: this.end_date,
                page: this.page,
                cols: this.cols
            }
            GetNodeApply(params)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.list
                    this.total = res.data.bean.total
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .searchs{
            padding: 10px 0;
            background: #fff;
            .search{
                display: flex;
                align-items: center;
                p{
                    margin: 0 30px;
                    font-size: 14px;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        
    }
</style>
<style lang="less">
    .assets{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }
    .el-message--error{
        color: #f56c6c !important;
        font-size: 14px !important;
    }
    .el-message--success{
        color: #67c23a !important;
        font-size: 14px !important;
    }
</style>
