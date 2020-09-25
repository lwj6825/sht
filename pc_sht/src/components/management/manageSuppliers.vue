<template>
    <div class="content" ref="content">
        <div ref="btnHeight" :class="{hide:visibleHide}">
            <el-button class="btn" type="primary" @click="addNewSupplier">绑定供应商</el-button>            
        </div>        
        <div class="infor-msg">
            <el-table :data="tableData" border>
                <el-table-column prop="biz_name" label="供应商名称"></el-table-column>
                <el-table-column prop="licence_no" label="营业执照号"> </el-table-column>
                <el-table-column prop="regId" label="身份证号"></el-table-column>
                <el-table-column prop="concact_name" label="联系人"></el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="msg-box" v-if="addNew">
            <div class="container">
                <header class="title">绑定供应商<span class="iconfont icon-close close" @click="closeMsgBox"></span></header>
                <div class="search">
                    <el-input class="search-input" v-model="inputValue" placeholder="请输入供应商名称" clearable></el-input>
                    <el-button class="search-button" type="primary" @click='searchSupplier'>搜索</el-button>
                </div>
                <div class="msg-table">
                    <el-table :data="supplierData" border style="width: 100%" height='153'>
                        <el-table-column prop="id" label="" width='50'>
                            <template slot-scope="scope">
                                <el-checkbox @change="changeFun(scope.row)"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="biz_name" label="供应商名称"> </el-table-column>
                        <el-table-column prop="cellphone" label="联系方式"> </el-table-column>
                    </el-table>   
                </div>
                <!--<div class="add-new" @click="addGysFun">新增供应商</div>-->
                <el-button class="msg-save-btn" type="primary" @click="addSupplierSave">保存</el-button>
            </div>
        </div>
        <div class="pagination">
            <el-pagination v-if="dataTotal" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="15" layout="total, prev, pager, next, jumper" :total='dataTotal'>
            </el-pagination>
        </div>
        <div class="viewbox" v-if="isView">
            <div class="section-content">
                <p @click="colseFun">X</p>
                <el-form :model="form" ref="form"  label-width="120px">
                    <el-form-item label="营业执照："  prop="licenceNo">
                        <span>{{form.licenceNo}}</span>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="regId">
                        <span>{{form.regId}}</span>
                    </el-form-item>
                    <el-form-item label="供应商名称："  prop="bizName">
                        <span>{{form.bizName}}</span>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="name">
                        <span>{{form.name}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="callphone">
                        <span>{{form.callphone}}</span>
                    </el-form-item>
                    <el-form-item label="地址：" prop="addr">
                        <span>{{form.addr}} {{form.infoAddr}}</span>
                    </el-form-item>
                    <el-form-item label="产地：" prop="origin_name">
                        <span>{{form.origin_name}}</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {SupplierList,BindingSupplier,SaveBindinSupplier} from '../../js/management/management.js'
export default {
    name:'manageSuppliers',
    data(){
        return{
            tableData: [],
            inputValue:'',
            selectSupplier:[],
            supplierData:[],
            addNew:false,
            visibleHide:true,
            selectArr:[],
            currentPage:1,
            dataTotal:0,
            form: {
                type: '',
                licenceNo: '',//营业执照
                bizName: '',//客户名称
                regId: '',//身份证号
                name: '',//联系人
                callphone: '',//联系方式
                addrId:'',
                addr: [],//地址
                infoAddr:'',//详细地址
                origin_name: '',//产地
                shop_concacts_id:'',
            },
            isView: false,
            searchMsg: {},
            areaId: '',
        }
    },
    created() {
        if(this.$route.query.searchMsg){
            this.searchMsg = JSON.parse(this.$route.query.searchMsg)
        }
    },
    mounted(){
        this.areaId = this.$route.query.areaId
        this.getSupplierList(1,this.searchMsg,this.searchMsg.currShop_userId);
    },
    methods: {
        addGysFun(){
            this.$router.push({name:'NewSupplier',params: {areaId: this.areaId}})
        },
        handleSizeChange(val) { //pageSize 改变时会触发
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) { //currentPage 改变时会触发
            this.getSupplierList(val,this.searchMsg,this.searchMsg.currShop_userId);
        },
        colseFun(){
            this.isView = false
        },
        handleClick(row) {
            this.isView = true
            this.form.type = row.type;
            this.form.licenceNo = row.licence_no;//营业执照
            this.form.bizName = row.biz_name;//供应商名称
            this.form.regId = row.regId;//身份证号
            this.form.name = row.concact_name;//联系人
            this.form.callphone = row.cellphone;//联系方式
            this.form.addrId = row.area_id;
            this.form.addr = row.area_name;//地址
            this.form.infoAddr = row.addr;//详细地址
            this.form.origin_name = row.origin_name;//产地
            this.form.shop_concacts_id = row.shop_concacts_id;
        },
        searchSupplier(){//绑定供应商搜索
            this.getBindingSupplierList(
                this.inputValue,
                this.searchMsg.parent_userId,
                this.searchMsg.parent_shop_booth_id,
                this.searchMsg.currShop_shop_booth_id,
                this.searchMsg.currShop_userId
            )
        },
        getSupplierList(page,data,uId){//展示供应商列表
            if(data.bindgys == '1'){
                this.visibleHide = true;
            }else{
                this.visibleHide = false;
            }
            let msgData = {
                page:page,
                cols:"15",
                userId:uId,
                type:"1",
                concact_name:"",
                region:data.region,
                biz_name:"",
                shop_booth_id:data.shop_booth_id,
                bindgys:data.bindgys
            }
            SupplierList(msgData)
                .then(res => {
                    this.dataTotal = res.data.condition.total;
                    this.tableData = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun(item){//复选框勾选
            if(this.selectSupplier.includes(item.shop_concacts_id)){
                this.selectSupplier.forEach((ele,index) => {
                    if(ele == item.shop_concacts_id){
                        this.selectSupplier.splice(index,1);
                    }
                })
            }else{
                this.selectSupplier.push(item.shop_concacts_id);
            }
        },
        addNewSupplier(){//绑定供应商列表
            this.addNew = true;
            this.getBindingSupplierList(
                this.inputValue,
                this.searchMsg.parent_userId,
                this.searchMsg.parent_shop_booth_id,
                this.searchMsg.currShop_shop_booth_id,
                this.searchMsg.currShop_userId
            )
        },
        //获取绑定列表数据
        getBindingSupplierList(searchName,parent_userId,parent_shop_booth_id,currShop_shop_booth_id,currShop_userId){
            let data = {
                page:"1",
                cols:"15",            
                type:"1",
                concact_name:"",
                biz_name:searchName,
                parent_userId:parent_userId,//区域的userId
                parent_shop_booth_id:parent_shop_booth_id,//区域的shop_booth_id
                shop_booth_id:currShop_shop_booth_id,//当前商户的shop_booth_id
                userId:currShop_userId//当前商户的userId
            }
            BindingSupplier(data)
                .then(res => {
                    this.supplierData = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        closeMsgBox(){//关闭添加绑定供应商弹层
            this.addNew = false;
        },
        addSupplierSave(){//绑定供应商保存
            let data = {
                ids:this.selectSupplier.join(','),
                shop_booth_id:this.searchMsg.currShop_shop_booth_id
            }
            SaveBindinSupplier(data)
                .then(res => {
                    this.$message.success('恭喜，绑定成功！');
                    this.addNew = false;
                    this.getSupplierList(1,this.searchMsg,this.searchMsg.currShop_userId); 
                    this.getBindingSupplierList(
                        this.inputValue,
                        this.searchMsg.parent_userId,
                        this.searchMsg.parent_shop_booth_id,
                        this.searchMsg.currShop_shop_booth_id,
                        this.searchMsg.currShop_userId
                    )   
                    this.selectSupplier = [];         
                })
                .catch(res => {
                    this.$message.error('抱歉，绑定失败！');
                    console.log(res)
                })
        },
    }
}
</script>

<style lang="less" scoped>
    @import '../../assets/css/common.css';
    .content{
        padding: 20px;
        width: 100%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;        
        .hide{
            display: none;
        }  
        .infor-msg{
            margin-top: 10px;
        }
        .msg-box{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            background: rgba(0,0,0,.5);      
            .container{
                position: relative;
                top:50%;
                left: 50%;
                padding: 20px;
                width: 500px;
                height: 404px;
                transform: translateX(-250px) translateY(-202px);
                box-sizing: border-box;
                background: #fff;
                .title{
                    margin-bottom: 20px;
                    padding: 7px 0;
                    border-bottom:1px solid #ddd;
                    overflow: hidden;
                    .btn{
                        margin-bottom: 10px;
                    } 
                    .close{
                        float: right;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 16px;
                        cursor: pointer;
                    }  
                }
                .search{
                    margin-bottom: 20px;
                    .search-input{
                        width: 260px;
                    }
                }
                .add-new{
                    margin-bottom: 20px;
                    padding: 2px 3px;
                    width: 70px;
                    font-size: 14px;
                    color: #409EFF;
                    border-radius: 3px;
                    border:1px dotted #409EFF;
                    cursor: pointer;
                }
                .msg-save-btn{
                    display: block;
                    margin: 0 auto;
                }
            }  
        }
        .viewbox{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            background: rgba(0,0,0,.5);   
            p{
                text-align: right;
                margin-right: 20px;
                padding-top: 20px;
                cursor: pointer;
            }   
            .section-content{
                width: 400px;
                height: 500px;
                background: #fff;
                position: relative;
                top: 50%;
                margin-top: -260px;
                left: 50%;
                margin-left: -200px;
            }
        }
    }
</style>
<style>
.el-checkbox{
    display: block;
}
.el-checkbox+.el-checkbox{
    margin-left: 0;
}
.el-table th.is-leaf{
    background: #f5f5f5;
}
.msg-table{
    margin-bottom: 10px;
}
.msg-table .el-table th,.msg-table .el-table td{
    padding: 7px 0;
}
</style>
