<template>
    <div class="content jgjgList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="120px">
                    <el-form-item label="监管机构">
                        <el-input class="label-width" v-model="form.jgjg" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="所属大区">
                        <el-select v-model="form.parent" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in nodeArr" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button @click="clearFun"style="margin-left: 10px;">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">监管机构</p>
                <div>
                    <el-button type="primary" @click="addFun">新增监管机构</el-button>
                    <!--<div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>-->
                </div>
            </div>
            <div class="tables">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="xh" label="序号"></el-table-column>
                    <el-table-column prop="jgjg" label="监管机构"></el-table-column>
                    <el-table-column prop="parent_name" label="所属大区"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="moveUpFun(scope.row, scope.$index)">上移</el-button>
                            <el-button type="text" size="small" @click="moveDownFun(scope.row, scope.$index)">下移</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>    
        </div>
        <div class="password addline" v-if="isAddJgjg">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}监管机构</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="clear"></div>
                <div class="msg">
                    <el-form ref="form2" :model="form2" :rules="rules" label-width="100px" class="form2">
                        <el-form-item label="所属大区" prop="parent">
                            <el-select v-model="form2.parent" filterable clearable placeholder="请选择" @change="selectParentFun">
                                <el-option v-for="(item, index) in nodeArr" :key="index" :label="item.name" :value="item.code"></el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="监管机构" prop="jgjg">
                            <el-input v-model="form2.jgjg" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="序号" prop="xh">
                            <el-input v-model="form2.xh" :disabled="prompt == '新增'"></el-input>
                        </el-form-item>
                        <el-form-item style="margin-left: 100px;">
                            <el-button type="primary" @click="submitForm('form2')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryTcJgJg, QueryParentNode, getQueryXhJd, QueryXhJd, AddTcJgJg, UpdateTcJgJg, UpdateTcJgJgXh} from '../../js/nodeManage/nodeManage.js'
export default {
    name:"jgjgList",
    data() {
        return {
            form: {
                jgjg: '',
                parent: '',
            },
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            loading: true,
            form2: {
                xh: '',
                jgjg: '',
                parent: '',
            },
            ids: '',
            isAddJgjg: false,
            nodeArr: [],
            rules: {
                xh: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
                parent: [
                    {required: true, message: '请选择父节点', trigger: 'change'}
                ],
                jgjg: [
                    { required: true, message: '请输入监管机构', trigger: 'blur' }
                ],
            },
            prompt: '新增',
            yxh: '',
        }
    },
    mounted() {
        this.getQueryParentNode()
        this.getDataFun()
    },
    methods: {
        moveUpFun(ele, idx){
            if(idx > 0){
                if(ele.parent != this.tableData[idx - 1].parent){
                    this.$message.warning('父节点不同');
                    return
                }
                let obj = {
                    id: this.tableData[idx - 1].id,
                    xh: this.tableData[idx - 1].xh,
                    yxh: ele.xh,
                    yid: ele.id
                }
                console.log(obj)
                UpdateTcJgJgXh(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                            this.closeFun()
                        }else{
                            this.$message.success(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        moveDownFun(ele, idx){
            if(idx < this.cols - 1){
                if(ele.parent != this.tableData[idx + 1].parent){
                    this.$message.warning('父节点不同');
                    return
                }
                let obj = {
                    id: this.tableData[idx + 1].id,
                    xh: this.tableData[idx + 1].xh,
                    yxh: ele.xh,
                    yid: ele.id
                }
                console.log(obj)
                UpdateTcJgJgXh(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                            this.closeFun()
                        }else{
                            this.$message.success(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        getQueryXhJd(){
            let str = 'parent=' + this.form2.parent
            QueryXhJd(str)
                .then(res => {
                    this.form2.xh = res.data.xh
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectParentFun(){
            this.getQueryXhJd()
        },
        getQueryParentNode(){
            QueryParentNode('')
                .then(res => {
                    for(var key in res.data){
                        let obj = {
                            code: key,
                            name: res.data[key]
                        }
                        this.nodeArr.push(obj)
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveFun(){
            if(this.prompt == '新增'){
                let obj = {
                    jgjg: this.form2.jgjg,
                    parent: this.form2.parent,
                    xh: this.form2.xh,
                }
                AddTcJgJg(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                            this.closeFun()
                        }else{
                            this.$message.success(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }else{
                let obj = {
                    jgjg: this.form2.jgjg,
                    parent: this.form2.parent,
                    xh: this.form2.xh,
                    id: this.ids,
                    yxh: this.yxh
                }
                UpdateTcJgJg(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                            this.closeFun()
                        }else{
                            this.$message.success(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        addFun(){
            this.prompt = '新增'
            this.isAddJgjg = true
        },
        closeFun(){
            this.isAddJgjg = false
            this.form2 = {
                xh: '',
                jgjg: '',
                parent: '',
            }
            this.ids = ''
            this.yxh = ''
        },
        getDataFun(){
            this.loading = true
            let params = {
                jgjg: this.form.jgjg,
                cols: this.cols,
                page: this.page,
                parent: this.form.parent,
                xh: '',
            }
            QueryTcJgJg(params)
                .then(res => {
                    this.loading = false
                    res.data.dataList.forEach(val => {
                        this.nodeArr.forEach(val2 => {
                            if(val2.code == val.parent){
                                val.parent_name = val2.name
                            }
                        })
                    })
                    this.tableData = res.data.dataList
                    this.num = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        editFun(ele){
            this.prompt = '编辑'
            this.form2.xh = ele.xh
            this.form2.jgjg = ele.jgjg
            this.form2.parent = ele.parent
            this.yxh = ele.xh
            this.ids = ele.id
            this.isAddJgjg = true
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                line: '',
                people: '',
            }
            this.page = 1
            this.getDataFun()
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
        .searchs{
            padding: 10px 0;
            background: #fff;
            .search{
                .file-btn{
                    color: #777;
                    background: #fff;
                    border-color: #eaeaea;
                }
                .search-btn{
                    color: #409EFF;
                    background: #fff;
                }
                .clear-content{
                    margin-left: 10px;
                    cursor: pointer;
                    color: #999999;
                    font-size: 14px;
                }
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
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
                }
            }
            .zpg{
                display: flex;
                align-items: center;
                .sele-cursor{
                    height: 20px;
                    cursor: pointer;
                }
            }
        }
        .password{
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
                margin-top: -110px;
                margin-left: -120px;
                width: 240px;
                height: 220px;
                background: #fff;
                font-size: 14px;
                border-radius: 5px;
                .clear{
                    clear: both;
                }
                .operation{
                    display: flex;
                    p{
                        flex: 1;
                    }
                    .method{
                        text-align: center;
                        font-weight: bolder;
                    }
                }
                .form{
                    margin-top: 10px;
                    height: 460px;
                    overflow: auto;
                    .el-select, .el-input{
                        width: 400px;
                    }
                }
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        font-size: 14px;
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
                .msg{
                    margin: 0 30px;
                    p{
                        margin: 10px 0;
                    }
                    .el-select{
                        width: 180px;
                    }
                }
                .btn{
                    margin-top: 50px;
                    margin-left: 60px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 10px auto;
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
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
        }
        .addline{
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -120px;
                margin-left: -250px;
                width: 500px;
                height: 240px;
                .el-input, .el-select{
                    width: 300px !important;
                }
            }
        }
    }
</style>
<style lang="less">
    .jgjgList{
        .el-table td{
            padding: 5px 0;
        }
    }
</style>