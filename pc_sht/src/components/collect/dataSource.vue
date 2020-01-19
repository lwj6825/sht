<template>
<div class="content">
    <div class="search">
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="数据源类型：">
                    <el-select v-model="form.value" clearable placeholder="请选择"  @change="selectGet" style="width:230px">
                            <el-option v-for="item in options" :key="item.text" :label="item.text" :value="item.id">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据源名称：">
                    <el-input v-model="form.input" placeholder="请输入内容" style="width:230px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="handleBtn">搜索</el-button>
                    <span class="clear-content" @click="clearFun">清空筛选条件</span>
                </el-form-item>
            </el-form>
            <!-- <span class="data_type">数据源类型：</span>
            <el-select v-model="value" placeholder="请选择"  @change="selectGet" >
                        <el-option v-for="item in options" :key="item.text" :label="item.text" :value="item.id">
                        </el-option>
            </el-select> -->
            <!-- <span class="data_name">数据源名称：</span>
            <el-input v-model="input" placeholder="请输入内容" style="width:250px"></el-input> -->
            
    </div>
    <div class="tables" v-loading.body="fullscreenLoading">
            <div class="title">
                <p class="tz-title">全部数据</p>
                 <div>
                    <el-button class="btn_data"  type="primary" @click="addSource()">+添加数据源</el-button>
                </div>
            </div>
            <div class="table-box">
                <el-table :data="tableData" :header-cell-style="rowClass" >
                    <el-table-column prop="id" label="数据源ID" align="left"> </el-table-column>
                    <el-table-column prop="source_name" label="数据源名称" align="left"> </el-table-column>
                    <el-table-column prop="driver_class_name" label="数据源类型" align="left"> </el-table-column>
                    <el-table-column prop="ip" label="IP地址" align="left"> </el-table-column>
                    <el-table-column prop="port" label="端口" align="left"> </el-table-column>
                    <el-table-column prop="data_name" label="数据库名称" align="left"> </el-table-column>
                    <el-table-column label="操作" fixed="right" align="left">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40]" :page-size="cols" layout="total, sizes, prev, pager, next, jumper"
                                :total='total'>
                </el-pagination>
            </div>
    </div>
</div>
    
    
</template>

<script>
import {GetAllDataSource,UpdateDataSource,QueryDataSourceType,InsertDataSource,QueryQuartzJob,QueryQuartzState,QuartzManagerNew} from '../../js/collect/collect.js'
export default {
    name:"dataSource",
    data() {
        return {
            form:{
                input:'',
                value:''
            },
            
            total:0, // 总数
            cols:10, //每页
            dataSou:'',//数据源选择
            tableData:[],
            currentPage:1,
            options: [],
            fullscreenLoading:true
        }
    },
    mounted() {
        this.getQueryDataSourceType();
        this.GetAllDataSourceFun();
    },
    methods: {
        clearFun(){
            this.dataSou = '';
            this.form.value = '';
            this.form.input = '';
            this.GetAllDataSourceFun()
        },
        addSource(){
            this.$router.push({path:'adddataSource'})
        },
        selectGet(val){  //选择数据源类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.dataSou = ele.id
                    }
                })
            }else{
                this.dataSou = ''
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.GetAllDataSourceFun();
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.GetAllDataSourceFun();
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleEdit(row){  //编辑
            this.$router.push({name:"AdddataSource",params:row})
        },
        handleBtn(){
            this.fullscreenLoading = true;
            this.tableData = [];
            this.currentPage = 1;
            this.GetAllDataSourceFun()
        },
        getQueryDataSourceType(){  //数据源类型查询
             QueryDataSourceType()
                  .then(res=>{
                      this.options = res.data.dataList;
                  })
                  .catch(res=>{
                        console.log(res)
                  })
        },
        GetAllDataSourceFun(){  //查看数据
                let source = {
                   page : this.currentPage,
                   cols : this.cols,
                   driver_class_name : this.dataSou,
                   source_name : this.form.input
                }
            GetAllDataSource(source)
                .then(res=>{
                    this.fullscreenLoading = false;
                    this.tableData = res.data.dataList; //表格数据
                    this.total = res.data.condition.total;
                })
                .catch(res=>{
                    console.log(res)
                })
        }
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
        background: #fff;
        padding: 10px 0px 10px 10px;
        span{
            font-size: 14px;
        }
        .data_name{
            margin-left: 40px;
        }
        .btn{
            margin-left: 70px;
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
                float: left;
            }
            .btn_data{
                float:right;
                margin-bottom:5px;
                margin-right:10px
            }
        }
        .table-box{
            margin-top: 10px;
            padding: 10px;
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
.el-form--inline .el-form-item__content{
    vertical-align: middle !important;
}
</style>