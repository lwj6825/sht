<template>
    <div class="content approachList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="节点名称">
                        <el-select v-model="form.node_name" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in nodeArr" :key="index" :label="item.NODE_NAME" :value="item.NODE_NAME"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="进场日期">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">列表数据</p>
                <div><!--
                    <el-button @click="downloadFun">导出</el-button>
                    <el-button type="primary" id="btn-file" plain @click="isShowFun">批量导入</el-button>-->
                </div>
            </div>
            <div class="tables">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="TOTAlCOUNT" label="节点总数"></el-table-column>
                    <el-table-column prop="SC_COUNT" label="上报数据的企业数"></el-table-column>
                    <el-table-column prop="WSC_COUNT" label="未上报数据的企业数"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="tables">
                <el-table :data="tableData2" :header-cell-style="rowClass">
                    <el-table-column prop="RETAIL_MARKET_ID" label="节点编码" width="120"></el-table-column>
                    <el-table-column prop="RETAIL_MARKET_NAME" label="节点名称"></el-table-column>
                    <el-table-column prop="ADDR" label="地址"></el-table-column>
                    <el-table-column prop="JGJG" label="监管机构" width="120"></el-table-column>
                    <el-table-column prop="TOTAL_NUM" label="数据量" width="70"></el-table-column>
                    <el-table-column prop="DAY_COUNT" label="报送天数" width="90"></el-table-column>
                    <el-table-column prop="AVG" label="日均报送量" width="90"></el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
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
import {QueryBizInfos, QuerySaleEntryJgInfo} from '../../js/approach/approach.js'
export default {
    name:"approachList",
    data() {
        return {
            form: {
                node_name: '',
                dataTime: [],
            },
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            tableData2: [],
            parent_node_id: '',
            name: '',
            nodeArr: [],
            loading: true,
        }
    },
    mounted() {
        this.parent_node_id = localStorage.getItem('parent_node_id');
        this.name = localStorage.getItem('name');
        this.account = localStorage.getItem('account');
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
        this.getQueryBizInfosFun()
        this.getDataFun()
    },
    methods: {
        // 节点名称
        getQueryBizInfosFun(){
            let obj = {
                jg_dm: this.parent_node_id,
                yh_mc: this.name,
                yh_dm: this.account,
                node_id: '',
                node_name: ''
            }
            QueryBizInfos(obj)
                .then(res => {
                    this.nodeArr = res.data.list
                })
                .catch(res => {
                    console.log(res)
                })
        },
        downloadFun(){

        },
        getDataFun(){
            this.loading = true
            let obj = {
                jg_dm: this.parent_node_id,
                yh_mc: this.name,
                node_name: this.form.node_name,
                startDate: this.startTime,
                endDate: this.endTime,
            }
            QuerySaleEntryJgInfo(obj)
                .then(res => {
                    this.tableData = res.data.spjctj
                    this.tableData2 = res.data.grid
                    this.loading = false
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
                })
        },
        searchFun(){
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                node_name: '',
                dataTime: '',
            }
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.page = 1
            this.getDataFun()
        },
        getTime(){
            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            var firstDay = new Date(y, m, 1);
            var lastDay = new Date(y, m + 1, 0);
            this.startTime = formatDate(firstDay)
            this.endTime = formatDate(lastDay)
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.startTime = ''
                this.endTime = ''
            }
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
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .searchs{
            padding: 10px 0;
            background: #fff;
            .search{
                .file-btn{
                    color: #777;
                    background: #fff;
                    border-color: #eaeaea;
                }
                .search-btn{
                    color: #409EFF;
                    background: #fff;
                }
                .clear-content{
                    margin-left: 10px;
                    cursor: pointer;
                    color: #999999;
                    font-size: 14px;
                }
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .file-btns{
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
            }
            .import{
                color: #409EFF;
                background: #fff;
            }
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
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
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
    }
</style>
<style lang='less'>
    .approachList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-table td{
            padding: 8px 0;
        }
    }
</style>