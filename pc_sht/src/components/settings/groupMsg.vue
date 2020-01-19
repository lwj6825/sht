<template>
    <div class="content repairMs">
        <div class="table">
            <div class="title">
                <p class="tz-title">全部</p>
                <div>
                   <el-button type="primary" @click="newFun" class="blue-bth"> + 新增工作组</el-button> <!---->
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="group_name" label="工作组"></el-table-column>
                    <el-table-column prop="name" label="组长"></el-table-column>
                    <el-table-column prop="user_name" label="成员"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template><!---->
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">{{prompt}}工作组</p>
                        <p class="iconfont icon-close close" @click="closeFun"></p>
                    </div>
                    <el-form class="forms" ref="form" :rules="rules" :model="form" label-width="120px" size="small">
                        <el-form-item label="工作组" prop="work">
                            <el-input type="text" clearable v-model="form.work"></el-input>
                        </el-form-item>
                        <el-form-item label="组长" prop="headman">
                            <el-select v-model="form.headman" filterable clearable placeholder="请选择" @change="selectFun">
                                <el-option v-for="(item,index) in headmanArr" :key="index" :label="item.name"
                                :value="item.name" v-if="item.userid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成员" prop="people">
                            <el-select v-model="form.people" multiple filterable clearable placeholder="请选择" @change="selectPeopleFun">
                                <el-option v-for="(item,index) in peopleArr" :key="index" :label="item.name"
                                :value="item.name" v-if="item.userid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button @click="closeFun">取消</el-button>
                        <el-button type="primary" @click="submitForm('form')" :disabled="disabled">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {GetAssetsConfig,GetAllGroup,GetAssetsUser,InsertAssetsGroup,DeleteAssetsGroup} from '../../js/repair/repair.js'
export default {
    name:"groupMsg",
    data() {
        return {
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            isEdits: false,
            form: {
                work: '',
                headman: '',
                people: [],
            },
            headmanArr: [],
            peopleArr: [],
            rules: {
                work: [
                    { required: true, message: '请输入工作组', trigger: 'blur' }
                ],
                headman: [
                    { required: true, message: '请选择组长', trigger: 'change' }
                ],
                people: [
                    { required: true, message: '请选择成员', trigger: 'change' }
                ],
            },
            prompt: '新增',
            item_id: '',
            leader_id: '', // 组长id
            peopleList: [],
            isShow: false,
            disabled: false,
        }
    },
    mounted() {
        this.getGetAssetsConfigFun()
        this.getGetAssetsUserFun()
    },
    methods: {
        aaaFun(){
            this.isShow = true
        },
        selectPeopleFun(ele){
            // console.log(ele)
        },
        selectFun(ele){
            this.headmanArr.forEach(val => {
                if(ele == val.name){
                    this.leader_id = val.userid
                }
            })
            if(!ele){
                this.leader_id = ''
            }
        },
        // 人员
        getGetAssetsUserFun(){
            let str = 'flag=1'
            GetAssetsUser(str)
                .then(res => {
                    this.headmanArr = res.data
                    this.peopleArr = res.data
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 列表
        getGetAssetsConfigFun(){
            GetAllGroup('')
                .then(res => {
                    this.tableData = res.data
                })
                .catch(res => {
                    console.log(res);
                })
        },
        editFun(ele){
            this.prompt = "修改"
            this.item_id = ele.group_id
            this.leader_id = ele.leader_id
            this.form.work = ele.group_name
            this.form.headman = ele.name
            if(ele.user_name){
                this.form.people = ele.user_name.split('、')
            }
            this.peopleList = ele.list
            this.isEdits = true
        },
        deleteFun(ele){
            let obj = {
                id: ele.group_id
            }
            DeleteAssetsGroup(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.getGetAssetsConfigFun()
                        this.getGetAssetsUserFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        sureFun(){
            this.disabled = true
            if(this.item_id){
                let arr = [], str = '', newObj = {}, delObj = {}, state = false, newArr = [];
                this.peopleList.forEach(val => {
                    arr.push(val.name)
                })
                if(arr.length > 0){
                    var arr3 = [];
                    for(var key in arr) {  //用来遍历的数组使用两个数组长度比较长的，不然可能没有效果
                    　  var stra = arr[key];
                    　　var count = 0;
                    　　for(var j = 0; j < this.form.people.length; j++) {
                    　　　  var strb = this.form.people[j];
                    　　　　if(stra == strb) {
                    　　　　    count++;
                　　　　　　}
                　　　　}
                    　　if(count === 0) { 
                    　　　　arr3.push(stra);
                    　　}
                    }
                }
                if(arr3.length > 0){
                    arr3.forEach(val => {
                        this.peopleList.forEach(val2 => {
                            if(val == val2.name){
                                delObj = {
                                    name: val2.name,
                                    user_id: val2.userid,
                                    type: 'delete',
                                    id: val2.id,
                                }
                                newArr.push(delObj)
                            }
                        })
                    })
                }
                this.form.people.forEach(val => {
                    this.peopleArr.forEach(val2 => {
                        if(val == val2.name){
                            newObj = {
                                name: val2.name,
                                user_id: val2.userid,
                                type: 'new',
                                id: '',
                            }
                            newArr.push(newObj)
                        }
                    })
                })
                let obj = {
                    id: this.item_id,
                    leader: this.form.headman, // 组长
                    leader_id: this.leader_id,
                    group_name: this.form.work, // 组名
                    user_name: newArr, // 组员
                }
                console.log(obj)
                InsertAssetsGroup(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.disabled = false
                            this.$message.success('修改成功');
                            this.closeFun()
                            this.getGetAssetsConfigFun()
                            this.getGetAssetsUserFun()
                        }else{
                            this.$message.error('修改失败');
                            this.disabled = false
                        }
                    })
                    .catch(res => {
                        this.disabled = false
                        console.log(res);
                    })
            }else{
                let arr = [], str = '', newObj = {};
                this.form.people.forEach(val => {
                    this.peopleArr.forEach(val2 => {
                        if(val == val2.name){
                            newObj = {
                                name: val2.name,
                                user_id: val2.userid,
                                type: 'new',
                                id: '',
                            }
                            arr.push(newObj)
                        }
                    })
                })
                let obj = {
                    // id: '',
                    leader: this.form.headman, // 组长
                    leader_id: this.leader_id,
                    group_name: this.form.work, // 组名
                    user_name: arr, // 组员
                }
                console.log(obj)
                InsertAssetsGroup(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.disabled = false
                            this.$message.success(res.message);
                            this.closeFun()
                            this.getGetAssetsConfigFun()
                            this.getGetAssetsUserFun()
                        }else{
                            this.disabled = false
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        this.disabled = false
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
        newFun(){
            this.prompt = "新增"
            this.isEdits = true
        },
        closeFun(){
            this.disabled = false
            this.form = {
                work: '',
                headman: '',
                people: [],
            }
            this.item_id = ''
            this.leader_id = ''
            this.peopleList = []
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
                margin-top: -175px;
                margin-left: -200px;
                width: 400px;
                height: 350px;
                background: #fff;
                .forms{
                    margin-top: 20px;
                    height: 240px;
                    overflow: auto;
                }
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
                .forms{
                    .el-input,.el-select{
                        width: 200px;
                    }
                }
                .btn{
                    margin-left: 260px;
                }
            }
        }
        .color{
            &:hover{
                color: red;
            }
        }
    }
</style>
