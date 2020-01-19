<template>
     <div class="content">
         <div class="search">
                    <el-form ref="form" :inline="true" :model="form" label-width="100px">
                        <el-form-item label="节点类型">
                            <el-select v-model="value" placeholder="请选择" clearable @change="selectGet" style="width:230px">
                                <el-option v-for="(item,index) in options" :key="index" :label="item.NODE_DETAIL_TYPE" :value="item.NODE_DETAIL_TYPE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="节点信息">
                              <el-input v-model="input" placeholder="请输入内容" style="width:230px;"></el-input>
                        </el-form-item>
                       
                        <el-form-item>
                             <el-button class="btn" type="primary" @click="handleBtnTable()">搜索</el-button>
                             <span class="clear-content" @click="clearFun">清空筛选条件</span>
                        </el-form-item>
                    </el-form>

                    <!-- <span>节点信息：</span>
                    <el-input v-model="input" placeholder="请输入内容" style="width:250px;"></el-input>
                    <span class="status">节点类型：</span>
                    <el-select v-model="value" placeholder="请选择" @change="selectGet">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.NODE_DETAIL_TYPE" :value="item.NODE_DETAIL_TYPE">
                        </el-option>
                    </el-select>
                    <el-button class="btn" type="primary" @click="handleBtnTable()">搜索</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span> -->
         </div>
         <div class="tables" v-loading.body="fullscreenLoading">
                    <div class="title">
                        <p class="tz-title">对照管理</p>
                    </div>
                    <div class="table-box">
                        <el-table :data="tableData" :header-cell-style="rowClass" >
                            <el-table-column prop="node_id" label="节点编码" align="left"> </el-table-column>
                            <el-table-column prop="node_name" label="节点名称" align="left"> </el-table-column>
                            <el-table-column prop="node_detail_type" label="节点类型" align="left"> </el-table-column>
                            <el-table-column prop="goods_count" label="缺对照商品数量" align="left"> </el-table-column>
                            <el-table-column prop="remark" label="备注" align="left"> </el-table-column>
                            <!-- <el-table-column prop="" label="未处理天数" align="center"> </el-table-column> -->
                            <el-table-column label="操作" fixed="right" align="left">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="handleResult(scope.row)">查看</el-button>
                                    <el-button type="text" size="small" @click="remarksFun(scope.row)">添加备注</el-button>
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
         <div class="box" v-if="isShow">
             <div class="form1">
                  <div class="title">
                    <p class="tit">添加备注</p>
                    <p class="iconfont close icon-close" @click="closeForm"></p>
                  </div>
                  <div class="container">
                       <span>备注：</span>
                       <el-input type="textarea" style="width:300px;" :autosize="{ minRows: 2, maxRows: 3}"  placeholder="请输入内容"
                        v-model="textarea2">
                        </el-input>
                  </div>
                  <div class="btn1">
                            <el-button @click="closeForm">取消</el-button>
                            <el-button type="primary" @click="submit()">确认</el-button>
                  </div>
            </div>
        </div>
    </div>
</template>

<script>
import {GetAllWarning,warningState,GetAllLogWarning,InsertWarning,UpdateWarning,ExecuteWarning,DownloadLogWarning,QueryLoseDataNode} from '../../js/warning/warning.js';
import {QueryNodeDetailType,AddErrorDateRemark} from '../../js/traceEquipment/traceEquipment.js';

export default {
    name:"Comparison",
    data() {
        return {
            form:{},
            isShow:false,
            textarea2:'',
            node_id:'',
            node_name:'',
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            value:'',
            tableData:[],
            currentPage:1,
            cols:10,
            options: [],
            total:0,
            dataSou:'',
            fullscreenLoading:true,
            input:''
        }
    },
    mounted() {
        // this.GetAllLogWarningFun();
        this.getQueryLoseDataNode()
        this.getQueryNodeDetailType()
    },
    methods: {
        submit(){
            let params = {
                node_id : this.node_id,
                node_name : this.node_name,
                remark : this.textarea2
            }
            this.$confirm('此操作将修改备注, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                AddErrorDateRemark(params)
                .then(res => {
                    console.log(params)
                    this.$message({
                        message: '已成功添加备注',
                        type: 'success'
                    });
                    this.isShow = false;
                })
            }).catch(()=>{
                    this.$message({
                        message: '已取消备注',
                        type: 'success'
                    });
            })
            
        },
        closeForm(){
            this.isShow = false;
        },
        remarksFun(row){
            console.log(row)
            this.node_id = row.node_id
            this.node_name = row.node_name
             this.isShow = true;
        },
        clearFun(){
            this.input = '';
            this.value = '';
            this.dataSou = '';
            this.currentPage = 1 ;
            this.fullscreenLoading = true;
            this.getQueryLoseDataNode()
        },
        
        handleBtnTable(){ // 点击搜索
            this.fullscreenLoading = true;
            this.currentPage = 1 ;
            this.getQueryLoseDataNode()
        },
        
        selectGet(val){  //选择数据源类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.NODE_DETAIL_TYPE){
                        this.dataSou = ele.NODE_DETAIL_TYPE
                    }
                })
            }else{
                this.dataSou = ''
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.getQueryLoseDataNode()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.getQueryLoseDataNode()
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleResult(row){  //查看执行结果
            // console.log(row)
            this.$router.push({name:"LookComparison",params:row})
        },
        getQueryNodeDetailType(){  //节点类型
            QueryNodeDetailType()
                .then( res => {
                    // console.log(res)
                    this.options = res.data.node_detail_type_list;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getQueryLoseDataNode(){  //查看数据
            let params = {
                mon_log_base:this.input,
                node_detail_type:this.dataSou,
                cols : this.cols,
                page : this.currentPage
            }
            QueryLoseDataNode(params)
                .then( res => {
                    this.fullscreenLoading = false;
                    this.tableData = res.data.error_data_list;
                    this.total = res.data.error_bean.total;
                })
                .catch(error => {
                    console.log(error)
                })
        },
       
    },
    components:{
    }
}
</script>

<style scoped lang='less'>
@import '../../assets/css/common.css';
.content{
    width: 100%;
    height: 100%;
    .search{
        width: 100%;
        background: #fff;
        padding: 10px 0;
        span{
            font-size: 14px;
        }
        .status{
            margin-left: 100px;
        }
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
        background: #fff;
        .title{
            padding-top: 8px;
            padding-bottom: 5px;
            padding-left: 10px;
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
            padding:10px;
        }
        .pagination{
            padding-top: 10px;
            text-align: center;
        }
    }
    .box{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 666;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        .container{
            position:absolute;
            padding:15px;
            padding-top:20px;
            padding-left:90px;
            span{
                position: relative;
                bottom: 32px;
                left: 0px;
            }
        }
        .btn1{
            position: absolute;
            bottom: 15px;
            right: 55px;
        }
        .form1{
            position: relative;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -250px;
            width: 500px;
            height: 200px;
            background: #fff;
            .title{
                display: flex;
                margin: 0 20px;
                height: 50px;
                border-bottom: 1px solid #ccc;
                line-height: 50px;
                .tit{
                    flex: 1;
                    font-size: 14px;
                }
                .close{
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
<style lang="less">
.el-table__row{
    height:50px;
    line-height: 50px;
}
.el-icon-date{
    line-height: 25px !important;
}
.el-range-separator{
    line-height: 25px !important;
}
</style>
