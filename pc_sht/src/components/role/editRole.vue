<template>
    <div class="content">
        <div class="msg">
            <p class="title">基本信息</p>
            <div class="section">
                <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input class="fill-input" placeholder="请输入内容" v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDescription">
                        <el-input type="textarea" :autosize="true" class="fill-input text" placeholder="请输入内容" v-model="ruleForm.roleDescription">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="父级角色" prop="">
                        <el-select class="fill-input" v-model="ruleForm.parent" placeholder="请选择" v-loadmore="loadmore" @change="changeFun">
                            <el-option v-for="(item, index) in roleArr" :key="index" :label="item.roleName" :value="item.roleName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="功能权限" name="first">
                <div class="role">
                    <div>
                        <p>台账相关功能菜单</p>
                        <el-tree
                            :data="dataMsg" default-expand-all
                            show-checkbox checked
                            node-key="level_id"
                            :default-checked-keys="entry"
                            ref="tree" @check="handleCheckChange"
                            highlight-current
                            :props="defaultProps">
                        </el-tree>
                    </div>
                    <div>
                        <p>电脑端功能菜单</p>
                        <el-tree
                        :data="data2"
                        show-checkbox :default-checked-keys="checkM"
                        @check="handleCheckChange2"
                        node-key="id"
                        ref="tree2"
                        highlight-current
                        :props="defaultProps2">
                        </el-tree>
                    </div>
                    <div>
                        <p>移动端功能菜单</p>
                        <el-tree
                        :data="data3"
                        show-checkbox :default-checked-keys="checkM"
                        @check="handleCheckChange3"
                        node-key="id"
                        ref="tree3"
                        highlight-current
                        :props="defaultProps3">
                        </el-tree>
                    </div>
                </div>
                <el-button class="save-btn" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-tab-pane>
            <el-tab-pane label="节点权限" name="second" v-if="isShowNode">
                <div class="node-title">
                    <p class="tz-title">
                        <el-input class="placeholder" v-model="nodeName" clearable></el-input>
                        <el-button type="text" @click="searchFun">搜索</el-button>
                    </p>
                    <div>
                        <el-button type="primary" @click="newFun">新增</el-button>
                        <span class="submit">
                            批量新增
                            <form id="upload" enctype="multipart/form-data" method="post"> 
                                <input type="file" class="file" ref="file" @change="fileFun($event)">
                            </form>
                        </span>
                        <p class="download" @click="downloadFun">下载模板</p>
                    </div>
                </div>
                <div class="tables" >
                <el-table :data="tableData" ref="table" :header-cell-style="rowClass" @select="deleteFun" @select-all="deleteAllFun">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="node_name" label="节点名称"> </el-table-column>
                    <el-table-column prop="node_id" label="节点编码"> </el-table-column>
                    
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            </el-tab-pane>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">新增节点</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <el-form class="form" ref="form" :model="form" label-width="80px">
                        <el-form-item label="选择节点" prop="zcState">
                            <el-select v-model="form.node" filterable clearable placeholder="请选择">
                                <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.node_name"
                                :value="item.node_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="btn">
                            <el-button @click="cancelFun">取消</el-button>
                            <el-button type="primary" @click="newNodeFun">确认</el-button>
                        </el-form-item>
                    </el-form>
                
                </div>
            </div>
        </el-tabs>
       
    </div>
</template>

<script>
import {getRoleList,addRoleList,queryRoleId,editRoleList,parentRoleList,GetRoleNode,InsertRoleNode,
    DeleteRoleNode,DeleteRoleNodeList,importRoleNode,} from '../../js/role/role.js'
import {downloadRoleNode,baseUrl} from '../../js/address/url.js'
import {Query} from '../../js/settings/settings.js'
import axios from 'axios';
export default {
    name:'editRole',
    data(){
        return{
            isEdit:false,
            ruleForm: {
                roleName:'',
                roleDescription:'',
                parent: '',
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleDescription: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' }
                ],
            },
            checkList:[],
            role:[],
            dataList:[],
            roleId:'',
            dataMsg: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            entryId: '',
            entryArr: [],
            saleId: '',
            saleArr: [],
            dataList:[], // 最外
            dataArr:[], // 最外
            child: [], // 1
            entry: [], // 选中
            data2: [],
            data3: [],
            defaultProps2: {
                children: 'children',
                label: 'label'
            },
            defaultProps3: {
                children: 'children',
                label: 'label'
            },
            mchildTd: '',
            checkM: [], // 选中的菜单id  mchild
            activeName: 'first',
            nodeName: '',
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            role_id: '',
            isEdits: false,
            form: {
                node: ''
            },
            nodeArr: [],
            node_id: '',
            isShowNode: false,
            file: '',
            mchildTd3: [],
            roleArr: [],
            parentTotal: 1, // 父级角色页数
            parent_id: '',
        }
    },
    mounted(){
        this.$nextTick(function () {
            parentRoleList()
                .then(res => {
                    let dataArr = res.data.u_list
                    dataArr.forEach((v, i) => {
                        v.label = v.functionName
                        v.id = v.functionId
                        this.dataArr.push(v);
                    });
                    dataArr.forEach((v, i) => {
                        if(v.functionId){
                            if(v.children != undefined){
                                v.children.forEach((v,i) => {
                                    v.label = v.name
                                    v.children = v.property
                                    if(v.children){
                                        v.children.forEach((v,i) => {
                                            v.label = v.type_name
                                            if(v.tzPropertyBeanList){
                                                v.children = v.tzPropertyBeanList
                                                if(v.children){
                                                    v.children.forEach((v,i) => {
                                                        v.label = v.type_name
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                    this.dataMsg = this.dataArr
                    let child_list = res.data.m_child_list;
                    child_list.forEach(v => {
                        v.label = v.describe
                        v.children = v.node_list
                        if(v.node_list){
                            v.node_list.forEach(v =>{
                                v.label = v.describe
                                v.children = v.node_list
                                if(v.node_list){
                                    v.node_list.forEach(v =>{
                                        v.label = v.describe
                                        v.children = v.node_list
                                        if(v.node_list){
                                            v.node_list.forEach(v =>{
                                                v.label = v.describe
                                                v.children = v.node_list
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.data2 = child_list
                    let m_child_mobile_list = res.data.m_child_mobile_list
                    m_child_mobile_list.forEach(v => {
                        v.label = v.describe
                        v.children = v.node_list
                        if(v.node_list){
                            v.node_list.forEach(v =>{
                                v.label = v.describe
                                v.children = v.node_list
                                if(v.node_list){
                                    v.node_list.forEach(v =>{
                                        v.label = v.describe
                                        v.children = v.node_list
                                        if(v.node_list){
                                            v.node_list.forEach(v =>{
                                                v.label = v.describe
                                                v.children = v.node_list
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    this.data3 = m_child_mobile_list
                })
                .catch(res => {
                    console.log(res.result)
                })
            if(this.$route.params.row){
                let param = this.$route.params.row
                this.isEdit = true;
                this.ruleForm.roleName = param.roleName;
                this.ruleForm.roleDescription = param.description;
                this.ruleForm.parent = param.parent
                this.parent_id = param.parent_id
                this.roleId = param.roleId
                this.setCheckedKeys()
                this.isShowNode = true
                this.role_id = param.roleId
                this.getNodeFun()
            }
            this.getQueryFun()
        })
    },
    watch: {
        // 'nodeName': function(newVal,oldVal){
        //     if(!newVal){
        //         this.nodeName = ''
        //         this.page = 1
        //         this.getNodeFun()
        //     }
        // }
    },
    methods:{
        changeFun(ele){
            this.roleArr.forEach(val => {
                if(ele == val.roleName){
                    this.parent_id = val.roleId
                }
            })
        },
        getQueryFun(){
            let obj = {
                page: this.parentTotal,
                cols: 100,
            }
            Query(obj)
                .then(res => {
                    this.num = res.data.roleFuncton.total
                    if(res.data.roleList.length > 0){
                        let arr = res.data.roleList
                        this.roleArr = this.roleArr.concat(arr)
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        loadmore (e) { 
            if(this.roleArr.length == this.num){
                return
            }
            this.parentTotal = this.parentTotal + 1
            this.getQueryFun()
        },
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', this.file);  
            formData.append('role_id', this.role_id);  
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
            let url = baseUrl + 'role/importRoleNode'
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.page = 1
                        this.nodeName = ''
                        this.getNodeFun()
                    }else{
                        this.$message.error(res.message);
                    }
                    this.$refs.file.value = null
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了");
                })

        },
        downloadFun(){
            window.location.href = downloadRoleNode + '?role_id=' + this.role_id
        },
        // 删除节点关系列表
        deleteFun(selection, row){
            let obj = {
                id: row.id
            }
            DeleteRoleNode(obj)
                .then(res => {
                     if (res.result == true) {
                            this.$message.success(res.message);
                            this.page = 1
                            this.nodeName = ''
                            this.getNodeFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        checked() {
        //首先el-table添加ref="table"引用标识
            for (let i = 0; i < this.tableData.length; i++) {
                this.$refs.table.toggleRowSelection(this.tableData[i], true);
            }
        },
        // 删除全部节点
        deleteAllFun(){
            this.$confirm('确定要取消该页面所有的节点权限？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let arr = [],str = '';
                this.tableData.forEach(val => {
                    arr.push(val.id)
                })
                if(arr.length > 0){
                    str = arr.join(',')
                }
                let obj = {
                    id: str
                }
                DeleteRoleNodeList(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.page = 1
                            this.nodeName = ''
                            this.getNodeFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                this.getNodeFun()
            });
            
        },
        newNodeFun(){
            let obj = {
                role_id: this.role_id,
                node_id: this.form.node
            }
            InsertRoleNode(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.cancelFun()
                        this.page = 1
                        this.nodeName = ''
                        this.getNodeFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        cancelFun(){
            this.form = {
                node: ''
            }
            this.isEdits = false
        },
        newFun(){
            this.getAllNode()
            this.isEdits = true
        },
        closeFun(){
            this.form = {
                node: ''
            }
            this.isEdits = false
        },
        getAllNode(){
            let obj = {
                node_name: '',
                page: 1,
                cols: 1000,
                role_id: 1,
            }
            GetRoleNode(obj)
                .then(res => {
                    this.nodeArr = res.data.list
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getNodeFun(){
            let obj = {
                node_name: this.nodeName,
                page: this.page,
                cols: this.cols,
                role_id: this.role_id
            }
            GetRoleNode(obj)
                .then(res => {
                    this.tableData = res.data.list
                    this.num = res.data.bean.total
                    this.$nextTick(function () {
                        this.checked()
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getNodeFun()
        },
        searchFun(){
            this.page = 1
            this.getNodeFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        setCheckedKeys(){
            queryRoleId(this.roleId)
                .then(res => {
                    console.log(res)
                    let funArr = [],checkList = [];
                    funArr = res.data.u_list
                    let entryId = [],saleId = [];
                    funArr.forEach(v => {
                        if(v.children){
                            v.children.forEach(v => {
                                if(v.property){
                                    v.property.forEach(v => {
                                        if(v.tz_type === '1'){
                                            this.entryArr.push(v.level_id)
                                            if(v.tzPropertyBeanList){
                                                v.tzPropertyBeanList.forEach(v => {
                                                    this.entryArr.push(v.level_id)
                                                    entryId.push(v.id)
                                                })
                                            }
                                        }else if(v.tz_type === '2'){
                                            this.saleArr.push(v.level_id)
                                            if(v.tzPropertyBeanList){
                                                v.tzPropertyBeanList.forEach(v => {
                                                    this.saleArr.push(v.level_id)
                                                    saleId.push(v.id)
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                    let entry = [],sale = [];
                    for(let a in this.entryArr){
                        entry.push(this.entryArr[a])
                    }
                    this.entry = entry
                    for(let a in this.saleArr){
                        this.entry.push(this.saleArr[a])
                    }
                    let mList = res.data.m_list
                    mList.forEach(v => {
                        this.checkM.push(v.functionid)
                    })
                })
                .catch(res => {
                    console.log(res)
                })   
        },
        handleCheckChange(){         
            let checkedArr = this.$refs.tree.getCheckedNodes(),
                entryArr = [],
                entryId = [],
                saleArr = [],
                saleId = [];
            checkedArr.forEach((v,i) => {
                if(v.tz_type === '1'){
                    entryArr.push(v)
                }else if(v.tz_type === '2'){
                    saleArr.push(v)
                }
            })
            entryArr.forEach((v,i) => {
                entryId.push(v.id)
            })
            saleArr.forEach((v,i) => {
                saleId.push(v.id)
            })
            this.entryId = entryId.join(',')
            this.saleId = saleId.join(',')
            console.log(this.entryId)   
            console.log(this.saleId)   
        },
        handleCheckChange2(){
            let mchild = this.$refs.tree2.getCheckedNodes(),
                mchildArr = [];
            mchild.forEach(v => {
                mchildArr.push(v.functionId)
            })
            this.mchildTd = mchildArr.join(',')
        },
        handleCheckChange3(){
            let mchild3 = this.$refs.tree3.getCheckedNodes(),
                mchildArr = [];
            mchild3.forEach(v => {
                mchildArr.push(v.functionId)
            })
            this.mchildTd3 = mchildArr.join(',')
        },
        save(){
            this.handleCheckChange()
            this.handleCheckChange2()
            this.handleCheckChange3()
            let arr = [];
            if(this.mchildTd.length == 0 && this.mchildTd3.length == 0 && this.entryId.length == 0 && this.saleId.length == 0){
                this.$message.error('请选择角色权限');
            }else{
                if(this.mchildTd3.length > 0){
                    this.mchildTd += ',' + this.mchildTd3
                }
                let mchildTd = this.mchildTd
                console.log(mchildTd)
                if(this.isEdit){
                    let editData = {
                        roleName:this.ruleForm.roleName,
                        function: mchildTd, 
                        description:this.ruleForm.roleDescription,
                        roleId:this.roleId,
                        userId:JSON.parse(localStorage.getItem("userId")),  
                        tzEntry: this.entryId,
                        tzSale: this.saleId,  
                        parent: this.parent_id 
                    }
                    console.log(editData)   
                    editRoleList(editData)
                        .then(res => {
                            if (res.result == true) {
                                this.$router.push({path:'roleManagement'})
                                this.$message.success(res.message);
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        })
                }else{                
                    let data = {
                        roleName:this.ruleForm.roleName,
                        description:this.ruleForm.roleDescription,
                        function: mchildTd,      
                        userId:JSON.parse(localStorage.getItem("userId")),          
                        tzEntry: this.entryId,
                        tzSale: this.saleId,    
                        parent: this.parent_id
                    }        
                    console.log(data)   
                    addRoleList(data)
                        .then(res => {
                            if (res.result == true) {
                                this.$router.push({path:'roleManagement'})
                                this.$message.success(res.message);
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        })
                }
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.save()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        padding-top: 10px;
        width: 100%;
        height: 100%;
        font-size: 14px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        .title{
            margin-bottom: 10px;
            line-height: 40px;
            padding-left: 20px;
        }
        .section{
            .el-form{
                width: 880px;
            }
        }
        .fill-input{
            margin-right: 20px;
            width: 160px;
        }
        .checkbox-group{
            padding-left: 200px;
            width: 600px;
            .el-checkbox{
                margin-left: 0;
                margin-bottom: 10px;
                width: 300px;
            }
        }
        .save-btn{
            margin-top: 50px;
            margin-left: 400px;
        }
        .msg{
            background: #f2f2f2;
            margin:0 10px 10px;
        }
        .role{
            display: flex;
            div{
                flex: 1;
            }
            .el-tree{
                padding-top: 10px;
                padding-left: 50px;
            }
        }
        .node-title{
            display: flex;
			justify-content: space-between;
            margin-bottom: 10px;
            .tz-title{
                display: flex;
                align-items: center;
                .el-input{
                    margin-right: 10px;
                    width: 300px;
                }
            }
            .download{
                margin: 0 10px;
                color: #999;
                cursor: pointer;
            }
            div{
                display: flex;
                align-items: center;
                width: 300px;
                justify-content: flex-end;
                .submit{
                    margin-left: 10px;
                    position: relative;
                    display: inline-block;
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
        .el-tabs{
            margin: 0 20px;
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
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
                    .el-input, .el-select{
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
</style>
