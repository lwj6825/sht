<template>
    <div class="content">
        <div class="table">
            <div class="title">
                <p class="tz-title">全部部件</p>
                <div>
                    <el-button type="primary" @click="newFun" class="blue-bth">新增部件</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="a_conf_item" label="部件名称"> </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">{{prompt}}部件名称</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <el-form class="form" :rules="rules" ref="form" :model="form" label-width="100px">
                        <el-form-item label="部件名称" prop="zcState">
                            <el-input type="text" clearable v-model="form.zcState"></el-input>
                        </el-form-item>
                        <el-form-item label="部件首字母" prop="search">
                            <el-input type="text" clearable v-model="form.search" placeholder="请输入首字母，用于部件检索"></el-input>
                        </el-form-item>
                        <el-form-item class="btn">
                            <el-button @click="cancelFun">取消</el-button>
                            <el-button type="primary" @click="submitForm('form')">确认</el-button>
                        </el-form-item>
                    </el-form>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryAssetsConf,SetAssetsConf,DeleteAssetsConf,UpdateAssetsConf} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"assetState",
    data() {
        return {
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            isEdits: false,
            form: {
                zcState: '',
                search: '',
            },
            
            rules: {
                zcState: [
                    { required: true, message: '请输入资产状态', trigger: 'blur' }
                ],
                search: [
                    { required: true, message: '请输入首字母，用于部件检索', trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/[a-zA-Z]/.test(value) == false){
                            callback(new Error("请输入首字母，用于部件检索"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ]
            },
            userId: '',
            a_conf_item_old: '',
            a_conf_id: '',
            prompt: '新增',
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.getQueryAssetsConf()
    },
    methods: {
        editFun(ele){
            this.prompt = "修改"
            this.a_conf_id = ele.a_conf_id
            this.a_conf_item_old = ele.a_conf_item
            this.form.zcState = ele.a_conf_item
            this.form.search = ele.acronym
            this.isEdits = true
        },
        // 查询 资产状态、所属期 等查询条件下拉框
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data[2].reverse()
                    // this.num = res.data[2].length
                })
                .catch(res => {
                    console.log(res);
                })
        },
        sureFun(){
            if(this.a_conf_id){
                let obj = {
                    a_conf_type: 2,
                    a_conf_id: this.a_conf_id,
                    a_conf_item_old: this.a_conf_item_old,
                    a_conf_item: this.form.zcState,
                    userid: this.userId,
                    acronym: this.form.search,
                }
                UpdateAssetsConf(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getQueryAssetsConf()
                            this.cancelFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }else{
                let obj = {
                    a_conf_type: 2,
                    a_conf_item: this.form.zcState,
                    acronym: this.form.search,
                    userid: this.userId,
                }
                SetAssetsConf(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getQueryAssetsConf()
                            this.cancelFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.sureFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelFun(){
            this.form = {
                zcState: '',
                search: '',
            }
            this.isEdits = false
            this.a_conf_id = ''
        },
        newFun(){
            this.prompt = "新增"
            this.isEdits = true
        },
        deleteFun(ele){
            this.$confirm('你确定要删除吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                let obj = {
                    a_conf_type: 2,
                    a_conf_id: ele.a_conf_id,
                    userid: this.userId,
                }
                DeleteAssetsConf(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getQueryAssetsConf()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res);
                    })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        closeFun(){
            this.form = {
                zcState: '',
                search: '',
            }
            this.isEdits = false
            this.a_conf_id = ''
        },
        handleCurrentChange(val) {
            this.page = val
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
        background: #fff;
        .table{
            padding: 10px;
            background: #fff;
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
            .import{
                color: #409EFF;
                background: #fff;
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        .password{
            width: 40% !important;
        }
        .passwrd{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -150px;
                margin-left: -200px;
                width: 400px;
                height: 220px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        width: 330px;
                        line-height: 40px;
                        font-size: 14px;
                    }
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
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 30px;
                    .el-input{
                        width: 200px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 140px;
                    }
                }
            }
        }
    }
    .verify_box{
        width: 240px;
        height: 40px;
        background: #e9e6e9;
        position: relative;
    }
    .verify_box p{
        position: absolute;
        top:-20%;
        left: 45%;
        z-index: 5;
    }
    .shadow {
        position: absolute;
        height: 40px;
        background: greenyellow;
    }
    .verify_core{
        background: #fff;
        border: 1px solid #adadc2;
        width: 50px;
        height: 40px;
        box-sizing: border-box;
        position: absolute;
        z-index: 20;
    }
    .verify_core img{
        width: 30px;
        height: 30px;
        margin: 5px auto;
        display: block;
    }


</style>

