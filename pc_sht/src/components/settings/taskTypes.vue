<template>
    <div class="content taskTypes">
        <div class="table">
            <div class="title">
                <p class="tz-title">全部</p>
                <div>
                    <el-button type="primary" @click="newFun" class="blue-bth"> + 新增任务类型</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="a_conf_item" label="任务类型"> </el-table-column>
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
                        <p class="tit">{{prompt}}任务类型</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <el-form class="form" ref="form" :rules="rules" :model="form" label-width="110px">
                        <el-form-item label="任务类型名称" prop="repairMs">
                            <el-input type="text" clearable v-model="form.repairMs"></el-input>
                        </el-form-item>
                        <el-form-item class="btn">
                            <el-button @click="closeFun">取消</el-button>
                            <el-button type="primary" @click="submitForm('form')">确认</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"taskTypes",
    data() {
        return {
            tableData: [{a_conf_item: '任务类型'}],
            page: 1,
            cols: 15,
            num: 0,
            isEdits: false,
            form: {
                repairMs: ''
            },
            rules: {
                repairMs: [
                    { required: true, message: '请输入任务类型', trigger: 'blur' }
                ]
            },
            prompt: '新增',
        }
    },
    mounted() {
       
    },
    methods: {
        editFun(ele){
            this.prompt = "修改"
            this.isEdits = true
        },
        deleteFun(ele){
            // let obj = {
            //     a_conf_type: 1,
            //     a_conf_id: ele.a_conf_id,
            //     userid: this.userId,
            // }
            // DeleteAssetsConf(obj)
            //     .then(res => {
            //         if (res.result == true) {
            //             this.$message.success(res.message);
            //             this.getQueryAssetsConf()
            //         }else{
            //             this.$message.error(res.message);
            //         }
            //     })
            //     .catch(res => {
            //         console.log(res);
            //     })
            
        },
        sureFun(){
            
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
        newFun(){
            this.prompt = "新增"
            this.isEdits = true
        },
        closeFun(){
            this.form = {
                repairMs: ''
            }
            this.isEdits = false
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
                height: 170px;
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
                    margin-left: 50px;
                    .el-input{
                        width: 200px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 100px;
                    }
                }
            }
        }
    }
</style>
