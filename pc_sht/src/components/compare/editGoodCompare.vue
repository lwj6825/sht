<template>
    <div class="content editGoodCompare">
        <el-form class="form" label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="节点名称：">
                {{form.node_name}}
            </el-form-item>
            <el-form-item label="商品分类：" prop="good_types">
                <el-cascader :options="typesArr" filterable clearable @change="selectTypesFun" :props="props" change-on-select
                    v-model="form.good_types">
                </el-cascader>
            </el-form-item>
            <el-form-item label="国标名称：" prop="gb_name">
                <el-input v-model="form.gb_name" disabled placeholder="根据商品分类自动带出"></el-input>
            </el-form-item>
            <el-form-item label="国标编码：" prop="gb_code">
                <el-input v-model="form.gb_code" disabled placeholder="根据商品分类自动带出"></el-input>
            </el-form-item>
            <el-form-item label="自定义名称：" prop="custom_name">
                <el-input v-model="form.custom_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义编码：" prop="custom_code">
                <el-input v-model="form.custom_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义编码1：">
                <el-input v-model="form.custom_code1" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义编码2：">
                <el-input v-model="form.custom_code2" clearable></el-input>
            </el-form-item>
            <el-form-item label="标签编码：">
                <el-input v-model="form.label_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="规格：">
                <el-input v-model="form.specifications" clearable></el-input>
            </el-form-item>
            <el-form-item label="全拼检索：">
                <el-input v-model="form.all_retrieval" clearable></el-input>
            </el-form-item>
            <el-form-item label="简拼检索：">
                <el-input v-model="form.jp_retrieval" clearable></el-input>
            </el-form-item>
            <el-form-item label="经营模式：">
                <el-input v-model="form.pattern" clearable></el-input>
            </el-form-item>
            <el-form-item label="品牌：">
                <el-input v-model="form.brand" clearable></el-input>
            </el-form-item>
            <el-form-item label="供货来源：">
                <el-input v-model="form.source" clearable></el-input>
            </el-form-item>
            <el-form-item label="供应商编码：">
                <el-input v-model="form.gys_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="供货单位名称：">
                <el-input v-model="form.ghdw_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="供货单位编码：">
                <el-input v-model="form.ghdw_code" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {UpdateNodeUserdefine} from '../../js/compare/compare.js'
import {getDefaultProductTypes} from '../../js/goods/goods.js'
export default {
    name:"editGoodCompare",
    data() {
        return {
            form: {
                node_name: '', // 节点名称
                node_id: '', // 节点名称
                good_types: [], // 商品分类
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
                gys_code: '',
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
            typesArr: [],
            props: {
                value: 'level_id',
                label: 'type_name',
                children: 'systemDefaultTypeList'
            },
            ids: '',
        }
    },
    mounted() {
        this.getDefaultProductTypesFun()
        let routeMsg2 = ''
        routeMsg2 = this.$route.params
        this.form = {
            node_name: routeMsg2.node_name, // 节点名称
            node_id: routeMsg2.node_id, // 节点名称
            good_types: [], // 商品分类
            gb_name: routeMsg2.before_name, // 国标名称
            gb_code: routeMsg2.before_code, // 国标编码
            custom_name: routeMsg2.userdefine_name, // 自定义名称
            custom_code: routeMsg2.userdefine_code, // 自定义编码
            custom_code1: routeMsg2.userdefine_code_one, // 自定义编码1
            custom_code2: routeMsg2.userdefine_code_two, // 自定义编码2
            label_code: routeMsg2.association_id, // 标签编码
            specifications: routeMsg2.specifications, // 规格
            all_retrieval: routeMsg2.fullscreen_retrieve, // 全拼检索
            jp_retrieval: routeMsg2.janescreen_retrieve, // 简拼检索
            pattern: routeMsg2.managing_mode, // 经营模式
            brand: routeMsg2.brand, // 品牌
            source: routeMsg2.supplier, // 供货来源
            ghdw_name: routeMsg2.ws_supplier, // 供货单位名称
            ghdw_code: routeMsg2.ws_supplier_id, // 供货单位编码
            gys_code: routeMsg2.supplier_id,
        }
        this.ids = routeMsg2.id
    },
    methods: {
        selectTypesFun(ele){
            console.log(ele)
            let num = ele[ele.length - 1]
            this.typesArr.forEach(val => {
                if(val.level_id == num){
                    this.form.gb_code = val.code
                    this.form.gb_name = val.type_name
                }else{
                    val.systemDefaultTypeList.forEach(val2 => {
                        if(val2.level_id == num){
                            this.form.gb_code = val2.code
                            this.form.gb_name = val2.type_name
                        }else{
                            val2.systemDefaultTypeList.forEach(val3 => {
                                if(val3.level_id == num){
                                    this.form.gb_code = val3.code
                                    this.form.gb_name = val3.type_name
                                }else{
                                    val3.systemDefaultTypeList.forEach(val4 => {
                                        if(val4.level_id == num){
                                            this.form.gb_code = val4.code
                                            this.form.gb_name = val4.type_name
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        // 商品分类
        getDefaultProductTypesFun(){
            let str = '';
            let routeMsg2 = this.$route.params
            getDefaultProductTypes(str)
                .then(res => {
                    this.typesArr = res
                    let num = routeMsg2.before_name, arr = []
                    this.typesArr.forEach(val => {
                        if(val.type_name == num){
                            arr.push(val.level_id)
                        }else{
                            val.systemDefaultTypeList.forEach(val2 => {
                                if(val2.type_name == num){
                                    arr.push(val.level_id, val2.level_id)
                                }else{
                                    val2.systemDefaultTypeList.forEach(val3 => {
                                        if(val3.type_name == num){
                                            arr.push(val.level_id, val2.level_id, val3.level_id)
                                        }else{
                                            val3.systemDefaultTypeList.forEach(val4 => {
                                                if(val4.type_name == num){
                                                    arr.push(val.level_id, val2.level_id, val3.level_id, val4.level_id)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    if(arr.length > 4){
                        arr.splice(0, 4)
                    }
                    this.form.good_types = arr
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
            let obj = {
                id: this.ids,
                node_name: this.form.node_name,
                node_id: this.form.node_id,
                userdefine_code: this.form.custom_code,
                userdefine_name: this.form.custom_name,
                before_code: this.form.gb_code,
                before_name: this.form.gb_name,
                association_id: this.form.label_code,
                userdefine_type: 3, // 自定义类型1.商户对照2.节点对照3.商品对照4.产地对照
                userdefine_code_one: this.form.custom_code1,
                userdefine_code_two: this.form.custom_code2,
                specifications: this.form.specifications,
                janescreen_retrieve: this.form.jp_retrieval,
                fullscreen_retrieve: this.form.all_retrieval, // 全拼检索
                managing_mode: this.form.pattern, // 经营模式
                brand: this.form.brand,
                supplier: this.form.source, // 供货来源
                supplier_id: this.form.gys_code,
                ws_supplier_id: this.form.ghdw_code, // 供货单位
                ws_supplier: this.form.ghdw_name
            }
            UpdateNodeUserdefine(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('保存成功');
                        this.$router.push({name: 'GoodCompare'})
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
            .el-input, .el-select, .el-cascader{
                width: 400px;
            }
        }
    }
</style>
