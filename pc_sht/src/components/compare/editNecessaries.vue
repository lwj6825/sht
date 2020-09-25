<template>
    <div class="content editNecessaries">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="商品分类：" prop="types">
                <el-cascader :options="typesArr" filterable clearable :props="props" v-model="form.types" disabled>
                </el-cascader>
            </el-form-item>
            <el-form-item label="国标编码：" prop="gb_code">
                <el-input v-model="form.gb_code" disabled></el-input>
            </el-form-item>
            <el-form-item label="国标名称：" prop="gb_name">
                <el-input v-model="form.gb_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="别名：">
                <el-input v-model="form.alias" clearable></el-input>
                <p class="alias">多个名称可用逗号隔开</p>
            </el-form-item>
            <el-form-item label="标准名称：" prop="standard_name">
                <el-input v-model="form.standard_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="价格区间：">
                <div class="price">
                    <el-input v-model="form.min_price" clearable placeholder="最小值"></el-input> ——
                    <el-input v-model="form.max_price" clearable placeholder="最大值"></el-input> 元 / 公斤
                </div>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="form.sort" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {GetGoodsTypes, UpdateLifeBxGoods} from '../../js/compare/compare.js'
export default {
    name:"editNecessaries",
    data() {
        return {
            form: {
                gb_code: "", // 国标编码
                gb_name: "", // 国标名称
                alias: "", // 别名
                standard_name: "", // 标准名称
                types: [], // 商品分类
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
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' }
                ]
            },
            ids: '',
            props: {
                value: 'goods_name',
                label: 'goods_name',
                children: 'goodsCode'
            },
        }
    },
    mounted() {
        this.getGetGoodsTypesFun()
        let routeMsg2 = ''
        routeMsg2 = this.$route.params
        let str = routeMsg2.price_section, price = ''
        if(str != null){
            price = str.split("-");
        }
        this.form = {
            gb_code: routeMsg2.goods_code, // 国标编码
            gb_name: routeMsg2.name, // 国标名称
            alias: routeMsg2.alias, // 别名
            standard_name: routeMsg2.ifmaingoods, // 标准名称
            types: [routeMsg2.varieties_type, (routeMsg2.name + '(' + routeMsg2.goods_code + ')')], // 商品分类
            min_price: price[0], // 价格区间 最大值
            max_price: price[1], // 价格区间 最大值
            sort: routeMsg2.order, // 排序
        }
    },
    methods: {
        selectTypesFun(ele){
            let num = ele[ele.length - 1]
            this.typesArr.forEach(val => {
                val.goodsCode.forEach(val2 => {
                    if(num == val2.goods_name){
                        this.form.gb_code = val2.goods_code
                        this.form.gb_name = val2.name
                        this.form.alias = val2.alias
                    }
                })
            })
        },
        // 商品分类
        getGetGoodsTypesFun(){
            let str = ''
            GetGoodsTypes(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                    this.typesArr.forEach(val => {
                        val.goods_name = val.varieties_type
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
            let obj = {
                code: this.form.gb_code,
                alias: this.form.alias,
                ifmaingoods: this.form.standard_name,
                varieties_type: this.form.types[0],
                order: this.form.sort,
                max_price: this.form.max_price,
                min_price: this.form.min_price
            }
            UpdateLifeBxGoods(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('保存成功');
                        this.$router.push({name: 'Necessaries'})
                    }else{
                        this.$message.error('保存失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        submitForm(formName) {
            if(!this.form.min_price){
                this.$message.error('请输入最小值');
                return
            }
            if(!this.form.max_price){
                this.$message.error('请输入最大值');
                return
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