<template>
    <div class="content">
          <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="码类型：">
                        <el-select v-model="form.type" placeholder="请选择" clearable  style="width:230px" >
                                <el-option v-for="item in options" :key="item.text" :label="item.text" :value="item.id">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="节点查询：">
                        <el-input v-model="form.input" placeholder="节点编码、节点名称" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="规则类型：">
                        <el-select v-model="form.rule" placeholder="请选择" clearable  style="width:230px" >
                                <el-option v-for="item in options1" :key="item.id" :label="item.text" :value="item.id">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="handleBtn">搜索</el-button>
                        <!-- <el-button>导出</el-button> -->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>    
                    
                </el-form>
          </div>
          <div class="tables" v-loading.body="fullscreenLoading">
                <div class="title">
                    <p class="tz-title">解码规则管理</p>
                    <div>
                         <el-button class="btn_data"  type="primary" @click="adddecodingRules()">+添加</el-button>
                         <el-button class="btn_data" type="primary" plain @click="DownloadDecodeRuleFun">导出</el-button>
                         <span class="submit">
                            导入
                            <form id="upload" enctype="multipart/form-data" method="post"> 
                                <input type="file" class="file" ref="file" @change="fileFun($event)">
                            </form>
                        </span>
                    </div>
                </div>
                <div class="table-box">
                    <el-table :data="tableData" :header-cell-style="rowClass" >
                        <el-table-column prop="node_name" label="企业名称" align="left"> </el-table-column>
                        <el-table-column prop="code_type" label="码类型" align="left"> </el-table-column>
                        <el-table-column prop="rule_type" label="规则名称" align="left"> </el-table-column>
                        <el-table-column prop="rule_name" label="开始截取位置" align="left"> </el-table-column>
                        <el-table-column prop="start_intercept_position" label="截取长度" align="left"> </el-table-column>
                        <el-table-column prop="" label="备注" align="center" ></el-table-column>
                        <el-table-column label="操作" fixed="right" align="left">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                                 <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
import {QueryDecodeRule,QueryCodeTypeSelect,QueryNodeSelect,InsertDecodeRule,UpdateDecodeRule,DeleteDecodeRule,DownloadDecodeRule,ImportDecodeRule} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
import {baseUrl4} from '../../js/address/url.js'
import axios from 'axios';
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
export default {
    name:"district",
    data() {
        return {
            fileMsg:'',
            file:'',
            fullscreenLoading:true,
            tableData:[],
            form:{
                input:'',
                type:'',
                rule:'',
            },
            currentPage:1,
            total:0,
            cols:10,
            options:[],
            options1:[],
            node_id:'',
        }
    },
    mounted() {
        this.QueryCodeTypeSelectFun();
        this.QueryNodeSelectFun()
        this.QueryDecodeRuleFun()
    },
    methods: {

        // 跳转添加页
        adddecodingRules(){
            this.$router.push({name:"AdddecodingRules"})
        },
        //删除
        handleDelete(row){
            console.log(row)
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {             
                let params = {
                    id:row.id
                }
                DeleteDecodeRule(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success('删除成功');
                            this.QueryDecodeRuleFun()
                        }else{
                            this.$message.error('删除失败');
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        // 跳转编辑页
        handleEdit(row){
            console.log(row)
            this.$router.push({name:"AdddecodingRules",params:row})
            
        },
        // 表头颜色
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.QueryDecodeRuleFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.QueryDecodeRuleFun()
        },
        handleBtn(){  //点击搜索
            this.fullscreenLoading = true;
            this.QueryDecodeRuleFun()
        },
        selectType(val){  //选择企业类型
            // if(val){
            //     this.options.forEach(ele => {
            //         if(val == ele.id){
            //             this.companyType = ele.id
            //             // console.log(this.companyType)
            //         }
            //     })
            // }else{
            //     this.companyType = ''
            // }
        },
        clearFun(){ //清楚筛选条件
            this.form.input = ''
            this.form.type = ''
            this.currentPage = 1
            this.form.rule = ''
            this.fullscreenLoading = true;
            this.QueryDecodeRuleFun()

        },
        QueryCodeTypeSelectFun(){  //码类型
            QueryCodeTypeSelect()
            .then(res => {
                console.log(res,'码类型')
                 this.options = res.data.dataList;
            })
            .catch(res => {
                 console.log(res)
            })
        },
        QueryNodeSelectFun(){  //企业类型
            QueryNodeSelect()
            .then(res => {
                console.log(res,'企业类型')
                 this.options1 = res.data.dataList;
            })
            .catch(res => {
                 console.log(res)
            })
        },
        // 表格数据
        QueryDecodeRuleFun(){  //查询所有节点
            let params = {
                page: this.currentPage,
                cols:this.cols,
                code_type:this.form.type,
                node_name:this.form.input,
                rule_type:this.form.rule,
            }
            QueryDecodeRule(params)
            .then(res => {
                console.log(res)
                 this.fullscreenLoading = false;
                 this.tableData = res.data.dataList;
                 this.total = res.data.condition.total;

            })
            .catch(res => {
                 console.log(res)
            })
        },
        // 下载节点
        DownloadDecodeRuleFun(){
            this.fullscreenLoading = true;
            let params = {
                code_type: '',
                node_name:'',
                rule_type:''
            }
            DownloadDecodeRule(params,{})
                .then(res => {
                        let time = getNowFormatDate()
                        this.fullscreenLoading = false;
                        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                        let url = window.URL.createObjectURL(blob);
                        let aLink = document.createElement("a");
                        aLink.style.display = "none";
                        aLink.href = url;
                        aLink.setAttribute("download", `解码规则` + time);
                        document.body.appendChild(aLink);
                        aLink.click();
                        document.body.removeChild(aLink); 
                        window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {})
        },
        // 导入节点
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('nodeInfo', this.file);
            let config = {
            headers:{'Content-Type':'multipart/form-data'}
            };
            const ajaxPost = function (url, params,config) {
            return new Promise((resolve, reject) => {
                axios
                .post(url, params,{config})
                .then((res) => {
                    resolve(res.data)
                })
                .catch(() => {
                    reject('error')
                })
            })
            }  
            let url = baseUrl4 + 'warning/importDecodeRule'
            ajaxPost(url,formData,config)
            .then(res => {
                this.fileMsg = res.message
                this.$refs.file.value = null
            })
            .catch(res => {
                this.$message.error("出错了");
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
        padding: 10px 0;
        background: #fff;
        span{
            font-size: 14px;
        }
        .data_name{
            margin-left: 40px;
        }
        .btn{
            margin-left: 20px;
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
            padding-bottom: 8px;
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
            .submit{
                float: right;
                position: relative;
                top: 0;
                display: inline-block;
                margin: 0 10px;
                width: 50px;
                height: 30px;
                line-height: 30px;
                color: #409EFF;
                background: #fff;
                text-align: center;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px solid #409EFF;
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 90px;
                    height: 30px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
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
    .el-switch__label *{
        font-size: 12px !important;
    }
}   
</style>
<style lang="less">
.el-form--inline .el-form-item__content{
    vertical-align: middle !important;
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