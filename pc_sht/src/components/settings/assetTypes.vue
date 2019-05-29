<template>
    <div class="content">
        <div class="box">
            <div class="title">
                <p class="tit">一级分类</p>
                <el-button type="primary" plain @click="newFun(1)">+ 新增</el-button>
            </div>
            <div class="list">
                <ul>
                    <li class="list-item" @click="focusFun(index,item)" 
                        v-for="(item,index) in dataList" :key="index" :style="currId == index ? active : ''" >
                        <p>{{item.assets_type}}</p>
                        <span @click="deleteFun(item,1)" class="iconfont icon-delete icons"></span>
                        <span @click="editFun(item,1)" class="iconfont icon-edit"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <p class="tit">二级分类</p>
                <el-button type="primary" plain @click="newFun(2)">+ 新增</el-button>
            </div>
            <div class="list">
                <p class="prompt" v-if="!parent_ass_type_id">请选择一级分类</p>
                <ul v-else-if="children.length > 0">
                    <li class="list-item" v-for="(item,index) in children" :key="index">
                        <p>{{item.assets_type}}</p>
                        <span @click="deleteFun(item,2)" class="iconfont icon-delete icons"></span>
                        <span @click="editFun(item,2)" class="iconfont icon-edit"></span>
                    </li>
                </ul>
                <p class="prompt" v-else>无内容</p>
            </div>
        </div>
        <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">{{prompt}}{{types}}级分类</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <el-form class="form" ref="form" :rules="rules" :model="form" label-width="120px">
                        <el-form-item label="资产类型名称" prop="name">
                            <el-input type="text" clearable v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item class="btn">
                            <el-button @click="cancelFun">取消</el-button>
                            <el-button type="primary" @click="submitForm('form')">确认</el-button>
                        </el-form-item>
                    </el-form>
                
                </div>
            </div>
    </div>
</template>

<script>
import {QueryAssetsType,AddAssetsType,DeleteAssetsConf,UpdateAssetsType,DeleteAssetsType} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"assetTypes",
    data() {
        return {
            dataList: [],
            children: [],
            currId: null,
            active: {
                color: '#fff',
                background: '#409EFF',
            },
            form: {
                name: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入资产类型', trigger: 'blur' }
                ]
            },
            isEdits: false,
            types: '一',
            parent_ass_type_id: '',
            userId: '',
            assets_type_old: '',
            assets_type_id: '',
            prompt: '新增',
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.getQueryAssetsType()
    },
    methods: {
        deleteFun(ele){
            this.$confirm('你确定要删除吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                let obj = {
                    assets_type_id: ele.assets_type_id,
                    assets_type: ele.assets_type,
                    userid: this.userId,
                }
                DeleteAssetsType(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.currId = null
                            this.closeFun()
                            this.getQueryAssetsType()
                            this.children = []
                            this.parent_ass_type_id = ''
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
        editFun(item,ele){
            this.prompt = "修改"
            this.form.name = item.assets_type
            this.assets_type_id = item.assets_type_id
            this.assets_type_old = item.assets_type
            this.parent_ass_type_id = item.parent_ass_type_id
            if(ele == 1){
                this.types = '一'
                this.isEdits = true
            }else if(ele == 2){
                if(this.parent_ass_type_id){
                    this.types = '二'
                    this.isEdits = true
                }else{
                    this.$message.warning('请选择一级分类');
                }
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.newAssetsTypeFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelFun(){
            this.form = {
                name: ''
            }
            this.isEdits = false
            this.assets_type_id = ''
        },
        closeFun(){
            this.form = {
                name: ''
            }
            this.isEdits = false
            this.assets_type_id = ''
        },
        newFun(ele){
            this.prompt = "新增"
            if(ele == 1){
                this.types = '一'
                this.isEdits = true
            }else if(ele == 2){
                if(this.parent_ass_type_id){
                    this.types = '二'
                    this.isEdits = true
                }else{
                    this.$message.warning('请选择一级分类');
                }
            }
        },
        newAssetsTypeFun(){
            if(this.assets_type_id){
                if(this.types == '一'){   
                    let obj = {
                        assets_type_id: this.assets_type_id,
                        assets_type: this.form.name,
                        assets_type_old: this.assets_type_old,
                        userid: this.userId,
                    }
                    UpdateAssetsType(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success(res.message);
                                this.currId = null
                                this.closeFun()
                                this.getQueryAssetsType()
                                this.children = []
                                this.parent_ass_type_id = ''
                                this.assets_type_id = ''
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        })  
                }else if(this.types == '二'){
                    let obj = {
                        assets_type_id: this.assets_type_id,
                        assets_type: this.form.name,
                        assets_type_old: this.assets_type_old,
                        userid: this.userId,
                        parent_ass_type_id: this.parent_ass_type_id,
                    }
                    console.log(obj)
                    UpdateAssetsType(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success(res.message);
                                this.currId = null
                                this.closeFun()
                                this.getQueryAssetsType()
                                this.children = []
                                this.assets_type_id = ''
                                this.parent_ass_type_id = ''
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        })  
                }
            }else{
                // 新增
                if(this.types == '一'){
                    let obj = {
                        assets_type: this.form.name,
                        parent_ass_type_id: '',
                        userid: this.userId,
                    }
                    AddAssetsType(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success(res.message); 
                                this.currId = null
                                this.closeFun()
                                this.getQueryAssetsType()
                                this.children = []
                                this.parent_ass_type_id = ''
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        })  
                }else if(this.types == '二'){
                    this.types = '二'
                    let obj = {
                        assets_type: this.form.name,
                        parent_ass_type_id: this.parent_ass_type_id,
                        userid: this.userId,
                    }
                    AddAssetsType(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success(res.message);
                                this.currId = null
                                this.closeFun()
                                this.getQueryAssetsType()
                                this.children = []
                                this.parent_ass_type_id = ''
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            console.log(res);
                        })  
                }
            }
           
        },
        focusFun(item,ele){
            if(this.currId){
                if(this.currId !== item){
                    this.currId = item
                }
            }else{
                this.currId = item
            }
            this.children = ele.child_list.reverse()
            this.parent_ass_type_id = ele.assets_type_id
        },
        getQueryAssetsType(data){
            QueryAssetsType('')
                .then(res => {
                    res.data.assetsType.forEach(val => {
                        if(val.child_list.length > 0){
                            val.children = val.child_list
                            val.child_list.forEach(val =>{
                                val.value = val.assets_type_id
                                val.label = val.assets_type
                            })
                        }
                    })
                    this.dataList = res.data.assetsType.reverse()
                    // this.children = res.data.assetsType[0].child_list.reverse()
                    // this.parent_ass_type_id = res.data.assetsType[0].assets_type_id
                })
                .catch(res => {
                    console.log(res);
                })
        },
    }
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        height: 600px;
        background: #fff;
        .box{
            float: left;
            margin-top: 50px;
            margin-left: 50px;
            width: 44%;
            border: 1px solid #ccc;
            .title{
                display: flex;
                padding: 20px 0;
                border-bottom: 1px solid #ccc;
                .tit{
                    margin-left: 20px;
                    width: 74%;
                }
            }
            .list{
                clear: both;
                width: 100%;
                height: 410px;
                overflow: auto;
                .list-item{
                    display: flex;
                    padding-left: 20px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    border-bottom: 1px solid #ccc;
                    box-sizing: border-box;
                    p{
                        width: 80%;
                    }
                    span{
                        width: 40px;
                        text-align: center;
                    }
                    &:hover{
                        color: #fff;
                        background: #409EFF;
                    }
                }
                .prompt{
                    color: #999;
                    padding-left: 20px;
                    line-height: 40px;
                    font-size: 14px;
                    border-bottom: 1px solid #ccc;
                    box-sizing: border-box;
                }
            }
            .active{
                color: #fff;
                background: #409EFF;
            }
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
                    margin-left: 30px;
                    .el-input{
                        width: 200px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 120px;
                    }
                }
            }
        }
    }
</style>
