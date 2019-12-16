<template>
     <div class="content">
         <div class="search">
                    <span class="status">状态：</span>
                    <el-select v-model="value" placeholder="请选择" @change="selectType">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                    <el-button class="btn" type="primary" @click="handleBtn()">搜索</el-button>
         </div>
         <div class="tables">
                    <div class="title">
                        <p class="tz-title">全部预警</p>
                    </div>
                    <div class="table-box">
                        <el-table :data="tableData" :header-cell-style="rowClass" >
                            <el-table-column prop="warn_name" label="预警名称" align="left"> </el-table-column>
                            <el-table-column label="状态" width="160">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.state" active-text="开启" inactive-text="禁用"
                                        active-value="1" inactive-value="0" @change="changeFun(scope.row)">
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" align="right">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="handleResult(scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination">
                       <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                       :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                                       :total="total">
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
            type:'',
            tableData:[],
            currentPage:1,
            total:0,
            cols:10,
            options: [
                {id: '0',text: '关闭'}, 
                {id: '1',text: '开启'},
            ],
        }
    },
    mounted() {
        this.getAllWarningFun()
    },
    methods: {
         handleBtn(){
             this.getAllWarningFun()
         },
         changeFun(ele){
            console.log(ele)
            let obj = {
                id:ele.id,
                state:ele.state
            }
            warningState(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectType(val){  //任务类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.type = ele.id
                    }
                })
            }else{
                this.type = ''
            }
        },
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
        getAllWarningFun(){  //预警管理查询
             let params = {
                 page: this.currentPage,
                 cols:this.cols,
                 state: this.type
             }
             GetAllWarning(params)
                  .then(res=>{
                      console.log(res)
                      this.tableData = res.data.dataList;
                      this.total = res.data.condition.total;
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
        // .status{
        //     margin-left: 30px;
        // }
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
            padding:10px;
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
