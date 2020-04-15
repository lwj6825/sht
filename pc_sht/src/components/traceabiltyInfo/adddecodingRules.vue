<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules">
            <el-form-item label="企业名称:" prop="node_id">
                <el-select class="label-width" v-model="form.node_id" filterable clearable placeholder="请选择" @change="selectWorkFun">
                    <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.text"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="码类型：" prop="code_type">
                <el-select class="label-width" v-model="form.code_type" clearable placeholder="请选择">
                    <el-option v-for="(item,index) in codeArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="规则名称:" prop="rule_name">
                <el-input class="label-width" v-model="form.rule_name"></el-input>
            </el-form-item>
            <el-form-item label="规则类型:">
                <el-select class="label-width" v-model="form.rule_type" clearable placeholder="请选择">
                    <el-option v-for="(item,index) in ruleArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始截取位置:" prop="start_intercept_position">
                <el-input class="label-width" v-model="form.start_intercept_position" clearable></el-input>
            </el-form-item> 
            <el-form-item label="截取长度:" prop="intercept_length">
                <el-input class="label-width" v-model="form.intercept_length" clearable></el-input>
            </el-form-item> 
            <el-form-item label="开头数字:">
                <el-input class="label-width" v-model="form.start_num" clearable></el-input>
            </el-form-item>     
            <el-form-item label="备注:" >
                <el-input class="label-width" v-model="form.remake" clearable></el-input>
            </el-form-item>      
            <el-form-item>
                <el-button class="save-btn" @click="clearFun">取消</el-button>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>          
        </el-form>
    </div>
</template>

<script>
import {QueryNodeSelect, InsertDecodeRule, QueryRuleTypeSelect, QueryCodeTypeSelect, UpdateDecodeRule} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
export default {
    name:'editFun',
    data(){
        return{
            ids: '',
            form:{
                node_id: '',
                code_type: '',
                rule_name: '',
                start_intercept_position: '',
                intercept_length: '',
                start_num: '',
                remake: '',
                rule_type: '',
            },
            rules:{
                node_id: [
                    { required: true, message: '请选择企业名称', trigger: 'change' }
                ],
                code_type: [
                    { required: true, message: '请选择码类型', trigger: 'change' }
                ],
                rule_name :[
                    {required: true, message: '请输入规则名称', trigger: 'blur'}
                ],
                start_intercept_position :[
                    {required: true, message: '请输入开始截取位置', trigger: 'blur'}
                ],
                intercept_length :[
                    {required: true, message: '请输入截取长度', trigger: 'blur'}
                ],
            },
            nodeArr: [],
            codeArr: [],
            ruleArr: [],
            node_name: '',
        }
    },
    mounted(){
        this.getQueryNodeSelect()
        this.getQueryCodeTypeSelect()
        this.getQueryRuleTypeSelect()
        if(this.$route.params.id){
            let param = this.$route.params
            this.form = {
                node_id: param.node_id,
                rule_name: param.rule_name,
                start_intercept_position: param.start_intercept_position,
                intercept_length: param.intercept_length,
                start_num: param.beginning,
                remake: param.remarks,
                code_type: '',
                rule_type: '',
            }
            this.node_name = param.node_name
            this.ids = param.id
        }
    },
    methods:{
        selectWorkFun(ele){
            this.nodeArr.forEach(val => {
                if(val.id == ele){
                    this.node_name = val.text
                }
            })
        },
        // 企业名称
        getQueryNodeSelect(){
            let str = ''
            QueryNodeSelect(str)
                .then(res => {
                    this.nodeArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 码类型
        getQueryCodeTypeSelect(){
            let str = ''
            QueryCodeTypeSelect(str)
                .then(res => {
                    this.codeArr = res.data.dataList
                    let param = this.$route.params
                    this.codeArr.forEach(val => {
                        if(val.text == param.code_type){
                            this.form.code_type = val.id
                        }
                    })
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 规则类型
        getQueryRuleTypeSelect(){
            let str = ''
            QueryRuleTypeSelect(str)
                .then(res => {
                    this.ruleArr = res.data.dataList
                    let param = this.$route.params
                    this.ruleArr.forEach(val => {
                        if(val.text == param.rule_type){
                            this.form.rule_type = val.id
                        }
                    })
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        clearFun(){
            this.$router.push({name: 'DecodingRules'})
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
        saveFun(){
            if(this.ids){
                let data = {
                    id: this.ids,
                    node_id: this.form.node_id,
                    node_name: this.node_name,
                    code_type: this.form.code_type,
                    rule_name: this.form.rule_name,
                    start_intercept_position: this.form.start_intercept_position,
                    intercept_length: this.form.intercept_length,
                    remarks: this.form.remake,
                    beginning: this.form.start_num,
                    rule_type: this.form.rule_type,
                };
                UpdateDecodeRule(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'DecodingRules'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res=>{
                        this.$message.error('出错了.');
                    })
            }else{
                let data = {
                    node_id: this.form.node_id,
                    node_name: this.node_name,
                    code_type: this.form.code_type,
                    rule_name: this.form.rule_name,
                    start_intercept_position: this.form.start_intercept_position,
                    intercept_length: this.form.intercept_length,
                    remarks: this.form.remake,
                    beginning: this.form.start_num,
                    rule_type: this.form.rule_type,
                };
                InsertDecodeRule(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'DecodingRules'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res=>{
                        console.log(res)
                    })
            }
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding-left: 60px;
        padding-top: 30px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;   
        .el-form-item{
            margin-bottom: 10px;
        }
        .save-btn{
            margin-top: 30px;
            margin-left: 150px;
            margin: 30px 0 20px 150px;
        }
    }
    .label-width{
        width: 450px;
    }
</style>
