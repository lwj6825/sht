<template>
    <div class="content" ref="content">
        <div class="areaBox" ref="areaBox">
            <AreaSelect @selectId='selectId'></AreaSelect>
        </div>
        <div class="commodity" ref="commodity">
            <div class="box" v-if="boxShow">
                <div class="select">
                    <p class="close" @click="closeFun">X</p>
                    <div class="filemsg">
                        {{fileMsg}}
                    </div>
                </div>
            </div>
        </div>
        <div class="option-wrapper" ref="optionWrapper">
            <el-row class="demo-autocomplete">
                <el-col :span="2"><div class="sub-title">商铺名称</div></el-col>
                <el-col :span="4"><el-input v-model="boothName" placeholder="输入商铺名称" clearable></el-input></el-col>
                <el-col :span="2"><div class="sub-title">联系人</div></el-col>  
                <el-col :span="4"><el-input v-model="name" placeholder="输入联系人或联系方式" clearable></el-input></el-col>
                <el-col :span="2"><div class="sub-title">摊位号</div></el-col>
                <el-col :span="4"><el-input v-model="stall_no"  placeholder="输入摊位号" clearable></el-input></el-col>
            </el-row>
            <el-row class="demo-autocomplete">
                <el-button type="primary" size="medium" class="import" style="margin-left: 8.5%" @click="searchConditions">搜索</el-button>
                <el-button type="primary" size="medium" class="file-btn">导出</el-button>
                <span class="span-clear" @click="clearConditions">清空筛选条件</span>
            </el-row>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部商户</p>
                <div></div>
            </div>
            <div class="booth-management-msg" >    
                <el-table :data="dataList" border>
                    <el-table-column label="商铺名称">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.booth_name}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column label="商铺编码">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.biz_id}}</li>
                            </ul>
                        </template>    
                    </el-table-column>
                    <el-table-column label="摊位号">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.stall_no}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="item in scope.row.bootList" :key="item.shop_booth_id">{{item.contacts}}&emsp;{{item.callphone}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width='60' center>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="inforHandle(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination v-if="dataTotal" background @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="cols" layout="total, prev, pager, next, jumper" :total='dataTotal'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {allBizs} from "../../js/management/management.js";
import {QueryArea} from '../../js/area/area.js';
import AreaSelect from '../common/area';
import axios from 'axios';
import {baseUrl} from '../../js/address/url.js'
export default {
    name:"bizList",
    data() {
        return {
            addMerchants:'新增商户',
            manageMerchants:'',
            manageGoods:'',
            infor:'详情',
            dataList:[],
            total: "",
            page: 1,
            cols: 15,
            userId: 2,
            name: "",
            boothName: "",
            stall_no: "",
            areaId:'',//大区的shop_booth_id
            bigAreaId:'',//大区userId
            currentPage:1,
            dataTotal:0,
            loginId: '',
            loginName: '',
            boxShow: false,
            fileMsg: '',
            file: '',
            node_id: '',
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        this.loginId = localStorage.getItem('loginId')
        this.loginName = localStorage.getItem('loginName')
        this.node_id = localStorage.getItem('loginId');
    },
    mounted() {
        this.getList();//首页展示-获取供应商列表    
    },
    methods: {
        handleCurrentChange(val) { //currentPage 改变时会触发
            this.page = val
            this.getAllBizs()
        },
        searchConditions(){//搜索
            let params = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name.trim(),
                boothName: this.boothName.trim(),
                stall_no: this.stall_no.trim(),
                region:this.areaId,
            }
            allBizs(params)
                .then(res => {
                    this.dataTotal = res.data.condition.total;
                    this.dataList = res.data.dataList;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        clearConditions(){//清空筛选条件
            this.boothName = '';
            this.name = '';
            this.stall_no = '';
            let params = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                stall_no: this.stall_no,
                region:this.areaId,
            }
            allBizs(params)
                .then(res => {
                    this.dataTotal = res.data.condition.total;
                    this.dataList = res.data.dataList;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        inforHandle(index,row){//详情
            this.$router.push({name:'ViewBizList',query:{inforMsg: JSON.stringify(row)}})
            // let routeData = this.$router.resolve({
            //     path: "/home/statistical/viewBizList",
            //     query: {
            //         inforMsg:row
            //     }
            // });
            // window.open(routeData.href, '_blank');
        },
        getList(){ //首页展示-获取商户列表
            let data = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res => {        
                    this.bigAreaId = res.data.dataList[0].userId;
                    this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                    let boothId = res.data.dataList[0].bootList[0].shop_booth_id;
                    this.getAllBizs()
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getAllBizs(){
            let boothData = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                stall_no: this.stall_no,
                region:this.areaId,
            }
            allBizs(boothData)
                .then(res => {
                    this.dataTotal = res.data.condition.total;
                    this.dataList = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectId(id){//选择区域展示商户列表
            this.page = 1
            let data = {
                page: 1,
                cols: 1000,
                total: this.total,
                userId: this.userId,
                name: '',
                boothName: '',
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res =>{
                    res.data.dataList.forEach(ele => {
                    if(ele.userId == id){
                        this.bigAreaId = id;
                        this.areaId = ele.bootList[0].shop_booth_id;
                        let boothId = ele.bootList[0].shop_booth_id;
                        this.getAllBizs()
                    }
                    });
                })
                .catch(res =>{
                    console.log(res)
                })
        }
    },
    components:{
        AreaSelect,
    }
}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
        box-sizing: border-box;
        .areaBox{
            padding: 10px;
            background: #fff;
        }
        .table{
            padding: 10px;
            background: #fff;
        }
        .title{
            display: flex;
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
                .file{
                    line-height: 28px;
                    font-size: 14px; 
                }
            }
        }
        .box{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 999;
            .filemsg{
                width: 360px;
                height: 240px;
                margin: 10px auto;
                font-size: 14px;
                overflow: hidden;
            }
            .select{
                background: #fff;
                width: 400px;
                height: 300px;
                position: relative;
                top: 50%;
                margin-top: -150px;
                left: 50%;
                margin-left: -200px;
                .close{
                    text-align: right;
                    margin-right: 20px;
                    padding-top: 10px;
                    cursor: pointer;
                }
            }
        }
        .submit{
            position: relative;
            top: 0;
            display: inline-block;
            margin: 0 10px;
            width: 90px;
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
        .new-add{
            background: #409EFF;
        }
        .file-btn{
            color: #777;
            background: #fff;
            border-color: #eaeaea;
        }
        .import{
            color: #409EFF;
            background: #fff;
        }
        .span-clear {
            color: #999999;
            margin-left: 15px;
            cursor: pointer;
            font-size: 14px;
        }
        .option-wrapper{
            margin: 10px 0;
            background: #fff;
            padding: 10px;
            .demo-autocomplete{
                margin-top: 10px;
                .sub-title {
                    width: 70px;
                    text-align: right;
                    padding-right: 10px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                }
            }
        }
        .booth-management-msg{
            margin-top: 10px;
            width: 100%;
        }    
    }
</style>
<style>
    .el-table--border th{
        color: #333;
        background:#F2F2F2;
    }
    .pagination{
        padding-top: 10px;
        text-align: center;
    }
</style>

