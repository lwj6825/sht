<template>
    <div class="content newNecessaries">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="国标编码：" prop="gb_code">
                <el-input v-model="form.gb_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="国标名称：" prop="gb_name">
                <el-input v-model="form.gb_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="别名：">
                <el-input v-model="form.alias" clearable></el-input>
                <p class="alias">多个名称可用逗号隔开</p>
            </el-form-item>
            <el-form-item label="标准名称：" prop="standard_name">
                <el-input v-model="form.standard_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="types">
                <el-select v-model="form.types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in typesArr" :key="index" :label="item.item"
                    :value="item.item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格区间：">
                <div class="price">
                    <el-input v-model="form.min_price" clearable placeholder="最小值"></el-input> ——
                    <el-input v-model="form.max_price" clearable placeholder="最大值"></el-input> 元 / 公斤
                </div>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="form.sort" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"newNecessaries",
    data() {
        return {
            form: {
                gb_code: "", // 国标编码
                gb_name: "", // 国标名称
                alias: "", // 别名
                standard_name: "", // 标准名称
                types: '', // 商品分类
                min_price: '', // 价格区间 最大值
                max_price: '', // 价格区间 最大值
                sort: '', // 排序
            },
            ghdwArr: [],
            typesArr: [],
            rules: {
                gb_code: [
                    { required: true, message: '请输入国标编码', trigger: 'blur' }
                ],
                gb_name: [
                    { required: true, message: '请输入国标名称', trigger: 'blur' }
                ],
                standard_name: [
                    { required: true, message: '请输入标准名称', trigger: 'blur' }
                ],
                types: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
            },
        }
    },
    mounted() {
        
    },
    methods: {
        saveFun(){
            this.$router.push({name: 'Necessaries'})
        },
        submitForm(formName) {
            this.saveFun()
            // if(!this.form.min_price){
            //     this.$message.error('请输入最小值');
            //     return
            // }
            // if(!this.form.max_price){
            //     this.$message.error('请输入最大值');
            //     return
            // }
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
            .alias{
                font-size: 12px;
                color: #999;
                line-height: 20px;
            }
            .price{
                .el-input{
                    width: 150px;
                }
            }
        }
    }
</style>