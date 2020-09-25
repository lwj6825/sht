<template>
    <div class="content addBizManage">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="企业名称：" prop="node_name">
                <el-select v-model="form.node_id" filterable clearable placeholder="请选择" @change="selectNodeFun">
                    <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商户编码：" prop="biz_code">
                <el-input v-model="form.biz_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="商户名称：" prop="biz_name">
                <el-input v-model="form.biz_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="id_card">
                <el-input v-model="form.id_card" clearable></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
                <el-input v-model="form.credit_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="经营者性质：" prop="nature">
                <el-select v-model="form.nature" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in natureArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经营类型：" prop="types">
                <el-select v-model="form.types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in typesArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="法人代表：" prop="people">
                <el-input v-model="form.people" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号码/固话：" prop="phone">
                <el-input v-model="form.phone" clearable></el-input>
            </el-form-item>
             <el-form-item label="IC卡号：">
                <el-input v-model="form.ic_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="form.remake" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { QueryBusinessTypeSelect, QueryNodeSelect, QuerypropertySelect, GetBizIdByCondition, InsertBusiness} from '../../js/nodeManage/nodeManage.js'
export default {
    name:"addBizManage",
    data() {
        return {
            form: {
                node_name: "", // 企业名称
                node_id: "", // 
                biz_id_old: '',
                biz_code: "", // 商户编码
                biz_name: "", // 商户名称
                id_card: "", // 身份证号
                credit_code: "", // 统一社会信用代码
                nature: "", // 经营者性质
                types: "", // 经营类型
                people: "", // 法人代表
                phone: "", // 手机号码/固话
                ic_code: "", // IC卡号
                remake: "", // 备注
            },
            nodeArr: [],
            typesArr: [],
            natureArr: [],
            rules: {
                node_name: [
                    { required: true, message: '请选择企业名称', trigger: 'change' }
                ],
                biz_code: [
                    { required: true, message: '请输入商户编码', trigger: 'blur' }
                ],
                biz_name: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                ],
                id_card: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' }
                ],
                nature: [
                    { required: true, message: '请选择经营者性质', trigger: 'change' }
                ],
                types: [
                    { required: true, message: '请选择经营类型', trigger: 'change' }
                ],
                people: [
                    { required: true, message: '请输入法人代表', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码/固话', trigger: 'blur' }
                ],
            },
        }
    },
    mounted() {
        this.getQueryNodeSelect()
        this.getQueryBusinessTypeSelect()
        this.getQuerypropertySelect()
    },
    methods: {
        // 选择企业
        selectNodeFun(ele){
            this.nodeArr.forEach(val => {
                if(val.id == ele){
                    this.form.node_name = val.text
                }
            })
            this.getGetBizIdByCondition()
        },
        // 查询得到经营类型下拉框信息
        getQueryBusinessTypeSelect(){
            QueryBusinessTypeSelect()
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 查询企业
        getQueryNodeSelect(){
            QueryNodeSelect()
                .then(res => {
                    this.nodeArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 查询得到经营者性质（个人企业）下拉框信息
        getQuerypropertySelect(){
            QuerypropertySelect()
                .then(res => {
                    this.natureArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 根据node_id获得biz_id
        getGetBizIdByCondition(){
            let str = 'node_id=' + this.form.node_id
            GetBizIdByCondition(str)
                .then(res => {
                    this.form.biz_code = res.data.biz_id
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        saveFun(){
            let obj = {
                node_id: this.form.node_id,
                node_name: this.form.node_name,
                biz_id_old: this.form.biz_code,
                biz_id: this.form.biz_code,
                biz_name: this.form.biz_name,
                reg_id: this.form.id_card,
                social_credit_code: this.form.credit_code,
                property: this.form.nature,
                type: this.form.types,
                legal_represent: this.form.people,
                tel: this.form.phone,
                ick: this.form.ic_code,
                remark: this.form.remake
            }
            InsertBusiness(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message({
                            type: 'success',
                            message: '保存成功', 
                            duration: 8000
                        });
                        this.$router.push({name: 'BizManageMsg'})
                    }else{
                        this.$message({
                            type: 'error',
                            message: '保存失败', 
                            duration: 8000
                        });
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
