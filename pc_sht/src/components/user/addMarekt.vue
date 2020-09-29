<template>
    <div class="content">
        <el-form class="form" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="节点编码" prop="node_id">
                <el-input v-model="form.node_id" @blur="unblurFun"></el-input>
            </el-form-item>
            <el-form-item label="节点名称" prop="node_name">
                <el-input v-model="form.node_name"></el-input>
            </el-form-item>
             <el-form-item label="节点类型">
                <el-select clearable filterable v-model="form.node_type" placeholder="请选择">
                    <el-option v-for="(item, index) in typesArr" :key="index" :label="item.type_name" :value="item.type_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {InsertNodeInfo, QueryNodeIdForName, QueryNodeType} from '../../js/user/user.js';
export default {
    name:"addMarekt",
    data() {
        return {
            form: {
                node_id: '',
                node_name: '',
                node_type: '',
            },
            rules: {
                node_id: [
                    { required: true, message: '请输入节点编码', trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(value.length != 9){
                            callback(new Error("请输入9位节点编码"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                node_name: [
                    { required: true, message: '请输入节点名称', trigger: 'blur' }
                ],
            },
            typesArr: [],
        }
    },
    mounted() {
        this.getQueryNodeType()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSubmit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onSubmit(){
            let obj = {
                node_id: this.form.node_id,
                node_name: this.form.node_name,
                node_type: this.form.node_type
            }
            InsertNodeInfo(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        // this.$router.push({path:'userList'});
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        unblurFun(){
            console.log(this.form.node_id)
            let obj = {
                node_id: this.form.node_id
            }
            QueryNodeIdForName(obj)
                .then(res => {
                    this.form.node_name = res.data.list[0].node_name
                    this.form.node_type = res.data.list[0].node_type
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getQueryNodeType(){
            QueryNodeType('')
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        }
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
        .form{
            padding-top: 10px;
            margin-left: 20px;
            width: 300px;
            .el-input, .el-select{
                width: 220px;
            }
        }
    }
</style>
