<template>
     <div class="content">
         <div class="search">
                    <span>执行时间：</span>
                     <el-date-picker v-model="value"  type="date" placeholder="选择日期"></el-date-picker>
                    <span class="status">状态：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button class="btn" type="primary">搜索</el-button>
         </div>
         <div class="tables">
                    <div class="title">
                        <p class="tz-title">日志列表</p>
                    </div>
                    <div class="table-box">
                        <el-table :data="tableData" :header-cell-style="rowClass" >
                            <el-table-column prop="record_time" label="执行时间" align="center"> </el-table-column>
                            <el-table-column prop="warn_name" label="执行内容" align="center"> </el-table-column>
                            <el-table-column prop="state" label="状态" align="center"> </el-table-column>
                             <el-table-column label="执行" width="160">
                                <template>
                                    <el-button>主动执行</el-button>
                                </template>
                             </el-table-column>
                            <el-table-column label="操作" fixed="right" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="handleResult(scope.row)">查看执行结果</el-button>
                                    <el-button type="text" size="small" @click="handleControl()">延期监控</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination">
                       <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                       :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                                       :total="400">
                        </el-pagination>
                    </div>
         </div>
    </div>
</template>

<script>
import {GetAllWarning,warningState,GetAllLogWarning,InsertWarning,UpdateWarning,ExecuteWarning,DownloadLogWarning} from '../../js/warning/warning.js'
export default {
    name:"dailyWarning",
    data() {
        return {
            value:'',
            tableData:[],
            currentPage:1,
            cols:10,
            options: [
                {id: '0',text: '未解决'}, 
                {id: '1',text: '已解决'}
            ],
        }
    },
    mounted() {
        this.GetAllLogWarningFun()
    },
    methods: {
        handleSizeChange(val) {   //每页
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) { //当前页
            console.log(`当前页: ${val}`);
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleResult(scope,row){  //查看执行结果
            console.log(scope,row)
        },
        handleControl(){ //延期监控
        },
        GetAllLogWarningFun(){  //查询预警日志
             let params = {
                 page: this.currentPage,
                 cols:this.cols,
                 start_time: "2019-12-11",
                 end_time: "2019-12-11",
                 state: ""
             }
             GetAllLogWarning(params)
                  .then(res=>{
                      console.log(res)
                      this.tableData = res.data.dataList;
                    //   this.total = res.data.condition.total;
                  })
                  .catch(res=>{
                        console.log(res)
                  })    
        },
    },
    components:{
    }
}
</script>

<style scoped lang='less'>
.content{
    width: 100%;
    height: 100%;
    .search{
        padding-left: 50px;
        background: #fff;
        height: 60px;
        line-height: 60px;
        span{
            font-size: 14px;
        }
        .status{
            margin-left: 100px;
        }
        .btn{
            margin-left: 70px;
        }
    }
    .tables{
        margin-top: 10px;
        width: 100%;
        height: 800px;
        background: #fff;
        .title{
            padding-top: 20px;
            padding-left: 25px;
            .tz-title{
                flex: 1;
                height: 20px;
                font-size: 14px;
                padding-left: 4px;
                line-height: 20px;
                box-sizing: border-box;
                border-left: 2px solid #409EFF;
            }
        }
        .table-box{
            margin-top: 10px;
        }
        .pagination{
            padding-top: 10px;
            text-align: center;
        }
    }
}
</style>
<style lang="less">
.el-table__row{
    height:50px;
    line-height: 50px;
}
</style>
