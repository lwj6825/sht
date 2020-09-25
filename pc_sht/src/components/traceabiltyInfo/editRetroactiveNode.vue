<template>
    <div class="content editRetroactiveNode">
        <el-form class="form" label-width="180px" :model="form" ref="form" :rules="rules">
            <el-form-item label="企业名称：" prop="node_name">
                <el-input v-model="form.node_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业短码：">
                <el-input v-model="form.node_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="自定义节点类型：">
                <el-input v-model="form.node_types" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否条形码追溯：" prop="bar_code">
                <el-select v-model="form.bar_code" filterable clearable placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否自动获取追溯信息：" prop="retrospect">
                <el-select v-model="form.retrospect" filterable clearable placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物品码类型：" prop="article_types">
                <el-select v-model="form.article_types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in articleTypesArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="获取物品码来源：" prop="article_source">
                <el-select v-model="form.article_source" filterable clearable placeholder="请选择" popper-class="article_source">
                    <el-option v-for="(item,index) in articleSourceArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地址：" prop="addr">
                <el-input v-model="form.addr" clearable></el-input>
            </el-form-item>
            <el-form-item label="X坐标：">
                <el-input v-model="form.x_coordinate" clearable></el-input>
            </el-form-item>
            <el-form-item label="Y坐标：">
                <el-input v-model="form.y_coordinate" clearable></el-input>
            </el-form-item>
            <el-form-item label="可溯源品类：">
                <el-checkbox-group v-model="form.category">
                    <el-checkbox v-for="(item, index) in categoryArr" :label="item.goods_type" :key="index">{{item.goods_type_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="是否展示：" prop="is_show">
                <el-select v-model="form.is_show" filterable clearable placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询逻辑类型：" prop="logic_types">
                <el-select v-model="form.logic_types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in logicTypesArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业介绍URL：">
                <el-input v-model="form.node_url" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业简介：">
                <el-input v-model="form.introduce" clearable></el-input>
            </el-form-item>
            <el-form-item label="选择节点模板：">
                <el-checkbox-group v-model="form.node_formwork">
                    <el-checkbox v-for="(item, index) in nodeFormworkArr" :label="item.id" :key="index">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择追溯模板："><!--form.-->
                <el-checkbox-group v-model="form.retrospect_formwork">
                    <el-checkbox v-for="(item, index) in retrospectFormworkArr" :label="item.id" :key="index">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择追溯信息："><!--form.-->
                <el-checkbox-group v-model="form.select_retrospect">
                    <el-checkbox v-for="(item, index) in selectRetrospectArr" :label="item.id" :key="index">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {TraceabilityCodeTypeSelect, TraceabilityCodeGainSelect, CheckLogicSelect, ToUpdateNodeTrace, UpdateNodeTrace} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
export default {
    name:"editRetroactiveNode",
    data() {
        return {
            form: {
                node_name: "", // 企业名称
                node_code: "", // 企业短码
                node_types: "", // 自定义节点类型
                bar_code: "", // 是否条形码追溯
                retrospect: "", // 是否自动获取追溯信息
                article_types: "", // 物品码类型
                article_source: "", // 获取物品码来源
                addr: "", // 地址
                x_coordinate: "", // X坐标
                y_coordinate: "", // Y坐标
                category: [], // 可溯源品类
                is_show: '', // 是否展示
                logic_types: '', // 查询逻辑类型
                node_url: '', // 企业介绍url
                introduce: '', // 企业简介
                node_formwork: [], // 选择节点模板
                retrospect_formwork: [], // 选择追溯模板
                select_retrospect: [], // 选择追溯信息
            },
            rules: {
                node_name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                node_types: [
                    { required: true, message: '请输入自定义节点类型', trigger: 'blur' }
                ],
                bar_code: [
                    { required: true, message: '请选择是否条形码追溯', trigger: 'change' }
                ],
                retrospect: [
                    { required: true, message: '请选择是否自动获取追溯信息', trigger: 'change' }
                ],
                article_types: [
                    { required: true, message: '请选择物品码类型', trigger: 'change' }
                ],
                article_source: [
                    { required: true, message: '请选择获取物品码来源', trigger: 'change' }
                ],
                article_types: [
                    { required: true, message: '请选择物品码类型', trigger: 'change' }
                ],
                article_types: [
                    { required: true, message: '请选择物品码类型', trigger: 'change' }
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                x_coordinate: [
                    { required: true, message: '请输入X坐标', trigger: 'blur' }
                ],
                y_coordinate: [
                    { required: true, message: '请输入Y坐标', trigger: 'blur' }
                ],
                is_show: [
                    { required: true, message: '请选择是否展示', trigger: 'change' }
                ],
                logic_types: [
                    { required: true, message: '请选择查询逻辑类型', trigger: 'change' }
                ],
                node_url: [
                    { required: true, message: '请输入企业介绍url', trigger: 'blur' }
                ],
            },
            ids: '',
            articleTypesArr: [],
            articleSourceArr: [],
            logicTypesArr: [],
            categoryArr: [],
            nodeFormworkArr: [],
            retrospectFormworkArr: [],
            selectRetrospectArr: [],
        }
    },
    mounted() {
        let routeMsg1 = ''
        routeMsg1 = this.$route.params
        this.ids = routeMsg1.id
        this.getViewFun()
        this.getTraceabilityCodeTypeSelectFun()
        this.getTraceabilityCodeGainSelectFun()
        this.getCheckLogicSelectFun()
    },
    methods: {
        getViewFun(){
            let str = 'id=' + this.ids
            ToUpdateNodeTrace(str)
                .then(res => {
                    this.categoryArr = res.data.allGoodsTypeList
                    res.data.node_template.forEach(val => {
                        val.id = JSON.stringify(val.id)
                    })
                    this.nodeFormworkArr = res.data.node_template
                    res.data.trace_template.forEach(val => {
                        val.id = JSON.stringify(val.id)
                    })
                    this.retrospectFormworkArr = res.data.trace_template
                    res.data.trace_template_detail.forEach(val => {
                        val.id = JSON.stringify(val.id)
                    })
                    this.selectRetrospectArr = res.data.trace_template_detail
                    let nodeTrace = res.data.nodeTrace
                    this.form.node_name = nodeTrace.node_name // 企业名称
                    this.form.node_code = nodeTrace.node_id // 企业短码
                    this.form.node_types = nodeTrace.node_trace_type // 自定义节点类型
                    this.form.bar_code = nodeTrace.is_trace // 是否条形码追溯
                    this.form.retrospect = nodeTrace.is_automatic // 是否自动获取追溯信息
                    this.form.article_types = nodeTrace.traceability_code_type // 物品码类型
                    this.form.article_source = nodeTrace.traceability_code_gain // 获取物品码来源
                    this.form.addr = nodeTrace.addr // 地址
                    this.form.x_coordinate = nodeTrace.x_coordinate // X坐标
                    this.form.y_coordinate = nodeTrace.y_coordinate // Y坐标
                    let arr = []
                    if(res.data.goodsTypeList.length > 0){
                        res.data.goodsTypeList.forEach(val =>{
                            arr.push(val.goods_type)
                        })
                    }
                    this.form.category = arr
                    // this.form.category = nodeTrace.goods_type.split('、') // 可溯源品类
                    this.form.is_show = nodeTrace.is_show // 是否展示
                    this.form.logic_types = nodeTrace.check_logic // 查询逻辑类型
                    this.form.node_url = nodeTrace.introduce_url // 企业介绍url
                    this.form.introduce = nodeTrace.company_profile // 企业简介
                    this.form.node_formwork = res.data.node_template_check // 选择节点模板
                    this.form.retrospect_formwork = res.data.trace_template_check // 选择追溯模板
                    this.form.select_retrospect = res.data.trace_template_detail_check // 选择追溯信息
                    
                    // this.form.node_formwork = nodeTrace.node_template.split(',') // 选择节点模板
                    // this.form.retrospect_formwork = nodeTrace.trace_template.split(',') // 选择追溯模板
                    // this.form.select_retrospect = nodeTrace.trace_template.split(',') // 选择追溯信息
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 物品吗类型筛选
        getTraceabilityCodeTypeSelectFun(){
            let str = ''
            TraceabilityCodeTypeSelect(str)
                .then(res => {
                    this.articleTypesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 获取物品码来源筛选
        getTraceabilityCodeGainSelectFun(){
            let routeMsg1 = this.$route.params
            let str = ''
            TraceabilityCodeGainSelect(str)
                .then(res => {
                    this.articleSourceArr = res.data.dataList
                    if(routeMsg1.traceability_code_gain){
                        this.articleSourceArr.forEach(val => {
                            if(val.text == routeMsg1.traceability_code_gain){
                                this.form.article_source = val.id
                            }
                        })
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 查询逻辑类型筛选
        getCheckLogicSelectFun(){
            let str = ''
            CheckLogicSelect(str)
                .then(res => {
                    this.logicTypesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
            let arr = this.form.retrospect_formwork.concat(this.form.select_retrospect)
            let str = ''
            if(arr.length > 0){
                str = arr.join(',')
            }else{
                str = ''
            }
            let obj = {
                node_name: this.form.node_name,
                short_code: this.form.node_id, // 
                node_trace_type: this.form.node_types, 
                is_trace: this.form.bar_code,
                is_automatic: this.form.retrospect,
                traceability_code_type: this.form.article_types,
                traceability_code_gain: this.form.article_source,
                addr: this.form.addr,
                x_coordinate: this.form.x_coordinate,
                y_coordinate: this.form.y_coordinate,
                is_show: this.form.is_show,
                check_logic: this.form.logic_types,
                introduce_url: this.form.node_url,
                company_profile: this.form.introduce,
                id: this.ids,
                goods_type: this.form.category.join(','),
                node_template: this.form.node_formwork.join(','),
                trace_template: str
            }
            UpdateNodeTrace(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '修改成功');
                        this.$router.push({name: 'RetroactiveNode'})
                    }else{
                        this.$message.error(res.message ? res.message : '修改失败');
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
<style lang="less">
    .editRetroactiveNode{
        .article_source, .el-select-dropdown__list{
            width: 300px !important;
        }
        .el-select-dropdown .el-popper .article_source{
            width: 400px !important;
        }
    }
</style>