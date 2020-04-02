<template>
    <div class="content">
          <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <!-- <el-form-item label="起始日期">
                            <el-date-picker style="width:300px;"
                            v-model="form.time" value-format="yyyy-MM-dd"  type="daterange" align="left" unlink-panels range-separator="至" clear-icon	
                            :picker-options="pickerOptions"  start-placeholder="开始日期"  end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item label="物品编码：">
                        <el-input v-model="form.goodCode" placeholder="请输入物品编码" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称：">
                        <el-input v-model="form.companyName" placeholder="请输入企业名称" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="经营模式：">
                        <el-input v-model="form.model" placeholder="请输入经营模式" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌：">
                        <el-input v-model="form.brand" placeholder="请输入品牌" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="供货来源：">
                        <el-input v-model="form.sources" placeholder="请输入供货来源" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类：">
                        <el-input v-model="form.product" placeholder="请输入商品分类" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="标签编码：">
                        <el-input v-model="form.labelCode" placeholder="请输入标签编码" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item label="标签名称：">
                        <el-input v-model="form.labelName" placeholder="请输入标签名称" style="width:230px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="handleBtn">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>    
                    
                </el-form>
          </div>
          <div class="tables" v-loading.body="fullscreenLoading">
                <div class="title">
                    <p class="tz-title">物品码管理</p>
                    <div>
                         <el-button class="btn_data"  type="primary" @click="addnodeManage()">+添加</el-button>
                         <el-button class="btn_data" type="primary" plain @click="getDownloadNodeInfoFun">导出</el-button>
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
                        <el-table-column prop="node_id" label="企业名称" align="left"> </el-table-column>
                        <el-table-column prop="node_name" label="物品编码" align="left"> </el-table-column>
                        <el-table-column prop="legal_represent" label="物品名称" align="left"> </el-table-column>
                        <el-table-column prop="tel" label="标签编码" align="left"> </el-table-column>
                        <el-table-column prop="addr" label="品牌" align="left"> </el-table-column>
                        <el-table-column prop="icon" label="供货来源" align="center" ></el-table-column>
                        <el-table-column prop="" label="标签名称" align="left"> </el-table-column>
                        <el-table-column prop="" label="备注" align="left"> </el-table-column>
                        <el-table-column prop="" label="日期" align="left"> </el-table-column>
                        <el-table-column label="操作" fixed="right" align="left">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                                 <el-button type="text" size="small" @click="handleEdit(scope.row)">删除</el-button>
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
import {QueryNodeTypeInfoForType,QueryTraceabilityType,QuerySourceWay,QueryProvinceToSelect,GetCode,UpdateNodeState,UpdateBasicInfo,
GetNodeInfo,InsertBasicInfo,ToBasicUpdate,DownloadNodeInfo} from '../../js/nodeManage/nodeManage.js'
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
                time:'',
                goodCode:'',
                companyName:'',
                model:'',
                brand:'',
                sources:'',
                product:'',
                labelCode:'',
                labelName:'',
            },
            currentPage:1,
            total:0,
            cols:10,
            options:[],
            node_id:'',
        }
    },
    mounted() {
        this.GetNodeInfoFun()
    },
    methods: {
        // 跳转添加页
        addnodeManage(){
            this.$router.push({name:"AddnodeManage"})
        },
        //编辑
        handleEdit(row){
            console.log(row)
            let params = {
                  node_id : row.node_id,
                  node_name : row.node_name
            }
            ToBasicUpdate(params)
                .then(res => {
                    this.$router.push({name:"AddnodeManage",params:res})
                })
                .catch(error => {
                    console.log(error)
                })
            
        },
        rowClass({ row, rowIndex}) {  //表头背景颜色
            return {
                background: '#f2f2f2',
                color: '#000'
            }
        },
        handleSizeChange(val) {   //每页
            this.cols = val;
            this.GetNodeInfoFun()
        },
        handleCurrentChange(val) { //当前页
            this.currentPage = val;
            this.GetNodeInfoFun()
        },
        handleBtn(){  //点击搜索
            this.fullscreenLoading = true;
        },
        clearFun(){ //清楚筛选条件
        },
        // 表格数据
        GetNodeInfoFun(){  //查询所有节点
            let params = {
                 
            }
            GetNodeInfo(params)
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
        //导出
        getDownloadNodeInfoFun(){
            this.fullscreenLoading = true;
            let params = {
            }
            DownloadNodeInfo(params,{})
                .then(res => {
                        let time = getNowFormatDate()
                        this.fullscreenLoading = false;
                        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                        let url = window.URL.createObjectURL(blob);
                        let aLink = document.createElement("a");
                        aLink.style.display = "none";
                        aLink.href = url;
                        aLink.setAttribute("download", `节点` + time);
                        document.body.appendChild(aLink);
                        aLink.click();
                        document.body.removeChild(aLink); 
                        window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {})
        },
        //导入
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
            let url = baseUrl4 + 'warning/importNodeInfo'
            ajaxPost(url,formData,config)
            .then(res => {
                this.fileMsg = res.message
                this.$refs.file.value = null
            })
            .catch(res => {
                console.log(res)
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