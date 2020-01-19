<template>
     <div class="content">
         <div class="search">
                    <el-form ref="form" :inline="true" :model="form" >
                        <el-form-item label="状态：" >
                            <el-select v-model="value" clearable placeholder="请选择" @change="selectType" style="width:230px">
                                <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn" type="primary" @click="handleBtn()">搜索</el-button>
                            <span class="clear-content" @click="clearFun">清空筛选条件</span>
                        </el-form-item>
                    </el-form>
<!--              
                    <span class="status">状态：</span>
                    <el-select v-model="value" placeholder="请选择" @change="selectType">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                    <el-button class="btn" type="primary" @click="handleBtn()">搜索</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span> -->
         </div>
         <div class="tables">
                    <div class="title">
                        <p class="tz-title">全部预警</p>
                        <div>
                            <el-button class="btn_data"  type="primary" @click="addaddwarning()">+添加预警</el-button>
                        </div>
                    </div>
                    <div class="table-box">
                        <el-table :data="tableData" :header-cell-style="rowClass" >
                            <el-table-column prop="warn_name" label="预警名称" align="left" width="550px;"> </el-table-column>
                            <el-table-column label="状态"  align="center">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.state" active-text="开启" inactive-text="关闭" 
                                        active-value="1" inactive-value="0" @change="changeFun(scope.row)">
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="执行" align="center" width="250px;">
                                <template slot-scope="scope">
                                    <el-button @click="handleBtn1(scope.row)">主动执行</el-button>
                                </template>
                             </el-table-column>
                            <el-table-column label="操作"  align="center">
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
            form:{},
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
        window.scrollTo(0,0);
        this.getAllWarningFun()
    },
    methods: {
        handleBtn1(row){
            console.log(row)
            let params = {
                id :  row.id,
                log_id : '',
                excel_url : ''
            }
             ExecuteWarning(params)
                .then( res => {
                     this.$message({
                        message: '已执行',
                        type: 'success'
                     });
                })
                .catch(error => {
                    console.log(error)
                })
        },
        clearFun(){
            this.type = '';
            this.value = ''
            this.currentPage = 1 ;
            this.getAllWarningFun()
        },
        addaddwarning(){
            this.$router.push({path:'addwarning'})
        },
         handleBtn(){
             this.currentPage = 1;
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
            this.cols = val ;
            this.getAllWarningFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.getAllWarningFun()
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleResult(scope,row){  //查看执行结果
            console.log(scope)
            this.$router.push({name:'Addwarning',params:scope})
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
        width: 100%;
        padding: 10px 0px 10px 20px;
        background: #fff;
        span{
            font-size: 14px;
        }
        // .status{
        //     margin-left: 30px;
        // }
        .btn{
            margin-left: 30px;
        }
        .clear-content{
            margin-left: 10px;
            cursor: pointer;
            color: #999999;
            font-size: 14px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
    }
    .tables{
        margin-top: 10px;
        width: 100%;
        height: 800px;
        background: #fff;
        .title{
            padding-top: 5px;
            padding-bottom: 8px;;
            padding-left: 10px;
            .tz-title{
                flex: 1;
                height: 20px;
                font-size: 14px;
                padding-left: 4px;
                line-height: 20px;
                box-sizing: border-box;
                border-left: 2px solid #409EFF;
                float:left;
            }
            .btn_data{
                float:right;
                margin-bottom:5px;
                margin-right:10px
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
.el-switch__core{
    width: 56px !important;
}
.el-switch__label--left{
  position: relative;
  left: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label.is-active{
  z-index: 1111;
  color: #fff;
}

.el-switch__label--left{
  position: relative;
  left: 59px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 59px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active{
  z-index: 1111;
  color: #9c9c9c !important;
}
</style>
