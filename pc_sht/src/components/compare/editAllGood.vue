<template>
    <div class="content editAllGood">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="商品编码：" prop="good_code">
                <el-input v-model="form.good_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品名称：" prop="good_name">
                <el-input v-model="form.good_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品分类：">
                <el-select v-model="form.good_types" filterable disabled placeholder="请选择">
                    <el-option v-for="(item,index) in typesArr" :key="index" :label="item.varieties_type" :value="item.varieties_type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格上报：">
                <el-switch v-model="form.price_report" active-text="开启" active-value="1" inactive-text="关闭" inactive-value="0">
                </el-switch>
            </el-form-item>
            <div v-if="form.price_report == 1">
                <el-form-item label="对照编码：">
                    <el-input v-model="form.compare_code" clearable></el-input>
                </el-form-item>
                <el-form-item label="规格系数：">
                    <el-input v-model="form.specifications" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="价格系数：">
                    <el-input v-model="form.price" disabled></el-input>
                </el-form-item>-->
            </div>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {UpdateNodeGoods, GetGoodsTypes} from '../../js/compare/compare.js'
export default {
    name:"editAllGood",
    data() {
        return {
            form: {
                good_code: "", 
                good_name: "", 
                good_types: '',
                compare_code: "", 
                price_report: '1', 
                specifications: '',
                price: '',
            },
            ghdwArr: [],
            typesArr: [],
            rules: {
                good_code: [
                    { required: true, message: '请输入商品编码', trigger: 'blur' }
                ],
                good_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
            },
        }
    },
    mounted() {
        let routeMsg3 = ''
        routeMsg3 = this.$route.params
        this.form = {
            good_code: routeMsg3.userdefine_code, 
            good_name: routeMsg3.userdefine_name, 
            good_types: routeMsg3.varieties_type,
            compare_code: routeMsg3.goods_code, 
            price_report: '', 
            specifications: routeMsg3.brand,
            price: '',
        }
        if(routeMsg3.status == '已上报'){
            this.form.price_report = '1'
        }else if(routeMsg3.status == '未上报'){
            this.form.price_report = '0'
        }
        this.ids = routeMsg3.id
        this.getGetGoodsTypesFun()
    },
    methods: {
        // 商品分类
        getGetGoodsTypesFun(){
            let str = ''
            GetGoodsTypes(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
            let obj = {
                id: this.ids,
                goods_code: this.form.compare_code,
                brand: this.form.specifications, // 规格系数
                status: this.form.price_report
            }
            UpdateNodeGoods(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('保存成功');
                        this.$router.push({name: 'AllGood'})
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        submitForm(formName) {
            if(this.form.price_report == '1'){
                if(this.form.compare_code == '' || this.form.compare_code == 'null' || this.form.compare_code == null){
                    this.$message.error('请输入对照编码');
                    return
                }
            }
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
            .el-input, .el-select, .el-cascader{
                width: 400px;
            }
        }
    }
</style>
