<template>
    <div class="content newNodeCompare">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="节点名称：">
                {{form.name}}
            </el-form-item>
            <el-form-item label="节点编码：" prop="node_code">
                <el-input v-model="form.node_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="节点名称：" prop="node_name">
                <el-input v-model="form.node_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义节点编码：" prop="custom_code">
                <el-input v-model="form.custom_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义节点名称：" prop="custom_name">
                <el-input v-model="form.custom_name" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {InsertNodeUserdefine} from '../../js/compare/compare.js'
export default {
    name:"newNodeCompare",
    data() {
        return {
            form: {
                code: "", // 节点编码
                name: "", // 节点名称
                node_code: "", // 节点编码
                node_name: "", // 节点名称
                custom_code: "", // 自定义节点编码
                custom_name: "", // 自定义节点名称
            },
            ghdwArr: [],
            typesArr: [],
            rules: {
                node_code: [
                    { required: true, message: '请输入节点编码', trigger: 'blur' }
                ],
                node_name: [
                    { required: true, message: '请输入节点名称', trigger: 'blur' }
                ],
                custom_name: [
                    { required: true, message: '请输入自定义节点名称', trigger: 'blur' }
                ],
                custom_code: [
                    { required: true, message: '请输入自定义节点编码', trigger: 'blur' }
                ],
            },
        }
    },
    mounted() {
        let searchMsg2 = ''
        if(localStorage.getItem('searchMsg2')){
            searchMsg2 = JSON.parse(localStorage.getItem('searchMsg2'))
        }
        this.form.name = searchMsg2.node_name
        this.form.code = searchMsg2.node_id
    },
    methods: {
        saveFun(){
            let obj = {
                node_name: this.form.name,
                node_id: this.form.code,
                userdefine_code: this.form.custom_code,
                userdefine_name: this.form.custom_name,
                before_code: this.form.node_code,
                before_name: this.form.node_name,
                association_id: '',
                userdefine_type: 2, // 自定义类型1.商户对照2.节点对照3.商品对照4.产地对照
                userdefine_code_one: '',
                userdefine_code_two: '',
                specifications: '',
                janescreen_retrieve: '',
                fullscreen_retrieve: '', // 全拼检索
                managing_mode: '', // 经营模式
                brand: '',
                supplier: '', // 供货来源
                supplier_id: '',
                ws_supplier_id: '', // 供货单位
                ws_supplier: ''
            }
            InsertNodeUserdefine(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('保存成功');
                        this.$router.push({name: 'NodeCompare'})
                    }else{
                        this.$message.error('保存失败');
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
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
        .form{
            padding: 50px 0 0 150px;
            .el-input, .el-select{
                width: 400px;
            }
        }
    }
</style>

