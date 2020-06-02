<template>
    <div class="content editGoodCompare">
        <el-form class="form" label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="节点名称：">
                {{form.node_name}}
            </el-form-item>
            <el-form-item label="商品分类：" prop="good_types">
                <el-select v-model="form.good_types">
                    <el-option  v-for="item in typesArr" :key="item.shop_concacts_id" :label="item.biz_name"  :value="item.shop_concacts_id" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="国标名称：" prop="gb_name">
                <el-input v-model="form.gb_name" disabled placeholder="根据商品分类自动带出"></el-input>
            </el-form-item>
            <el-form-item label="国标编码：" prop="gb_code">
                <el-input v-model="form.gb_code" disabled placeholder="根据商品分类自动带出"></el-input>
            </el-form-item>
            <el-form-item label="自定义名称：" prop="custom_name">
                <el-input v-model="form.custom_name"></el-input>
            </el-form-item>
            <el-form-item label="自定义编码：" prop="custom_code">
                <el-input v-model="form.custom_code"></el-input>
            </el-form-item>
            <el-form-item label="自定义编码1：">
                <el-input v-model="form.custom_code1"></el-input>
            </el-form-item>
            <el-form-item label="自定义编码2：">
                <el-input v-model="form.custom_code2"></el-input>
            </el-form-item>
            <el-form-item label="标签编码：">
                <el-input v-model="form.label_code"></el-input>
            </el-form-item>
            <el-form-item label="规格：">
                <el-input v-model="form.specifications"></el-input>
            </el-form-item>
            <el-form-item label="全拼检索：">
                <el-input v-model="form.all_retrieval"></el-input>
            </el-form-item>
            <el-form-item label="简拼检索：">
                <el-input v-model="form.jp_retrieval"></el-input>
            </el-form-item>
            <el-form-item label="经营模式：">
                <el-input v-model="form.pattern"></el-input>
            </el-form-item>
            <el-form-item label="品牌：">
                <el-input v-model="form.brand"></el-input>
            </el-form-item>
            <el-form-item label="供货来源：">
                <el-input v-model="form.source"></el-input>
            </el-form-item>
            <el-form-item label="供货单位名称：">
                <el-select v-model="form.ghdw" placeholder="请选择供应商">
                    <el-option  v-for="item in ghdwArr" :key="item.shop_concacts_id" :label="item.biz_name"  :value="item.shop_concacts_id" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供货单位编码：">
                <el-input v-model="form.ghdw_code" disabled placeholder="与供货单位关联自动带出"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"editGoodCompare",
    data() {
        return {
            form: {
                node_name: '', // 节点名称
                good_types: '', // 商品分类
                gb_name: "", // 国标名称
                gb_code: "", // 国标编码
                custom_name: "", // 自定义名称
                custom_code: "", // 自定义编码
                custom_code1: "", // 自定义编码1
                custom_code2: "", // 自定义编码2
                label_code: "", // 标签编码
                specifications: "", // 规格
                all_retrieval: "", // 全拼检索
                jp_retrieval: "", // 简拼检索
                pattern: '', // 经营模式
                brand: '', // 品牌
                source: "", // 供货来源
                ghdw_name: "", // 供货单位名称
                ghdw_code: '', // 供货单位编码
            },
            ghdwArr: [],
            typesArr: [],
            rules: {
                good_types: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                gb_name: [
                    { required: true, message: '请选择商品分类', trigger: 'blur' }
                ],
                gb_code: [
                    { required: true, message: '请选择商品分类', trigger: 'blur' }
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
            this.$router.push({name: 'GoodCompare'})
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
