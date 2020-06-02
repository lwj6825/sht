<template>
    <div class="content editAddrCompare">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="节点名称：">
                {{form.node_name}}
            </el-form-item>
            <el-form-item label="产地编码：" prop="biz_code">
                <el-input v-model="form.biz_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="产地名称：" prop="biz_name">
                <el-input v-model="form.biz_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义编码：" prop="custom_code">
                <el-input v-model="form.custom_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义名称：" prop="custom_name">
                <el-input v-model="form.custom_name" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"editAddrCompare",
    data() {
        return {
            form: {
                biz_code: "", // 产地编码
                biz_name: "", // 产地名称
                custom_code: "", // 自定义编码
                custom_name: "", // 自定义名称
            },
            ghdwArr: [],
            typesArr: [],
            rules: {
                biz_code: [
                    { required: true, message: '请输入产地编码', trigger: 'blur' }
                ],
                biz_name: [
                    { required: true, message: '请输入产地名称', trigger: 'blur' }
                ],
                custom_name: [
                    { required: true, message: '请输入自定义名称', trigger: 'blur' }
                ],
                custom_code: [
                    { required: true, message: '请输入自定义编码', trigger: 'blur' }
                ],
            },
        }
    },
    mounted() {
        
    },
    methods: {
        saveFun(){
            this.$router.push({name: 'AddrCompare'})
        },
        submitForm(formName) {
            this.saveFun()
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.saveFun()
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
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
