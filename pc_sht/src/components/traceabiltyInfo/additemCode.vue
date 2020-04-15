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
            <el-form-item label="物品编码:" prop="good_code">
                <el-input class="label-width" v-model="form.good_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="物品名称:">
                <el-input class="label-width" v-model="form.good_name" clearable></el-input>
            </el-form-item> 
            <el-form-item label="标签编码:" prop="label_code">
                <el-input class="label-width" v-model="form.label_code" clearable></el-input>
            </el-form-item> 
            <el-form-item label="标签名称:" >
                <el-input class="label-width" v-model="form.label_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="经营模式:">
                <el-input class="label-width" v-model="form.pattern" clearable></el-input>
            </el-form-item>     
            <el-form-item label="品牌:" >
                <el-input class="label-width" v-model="form.brand" clearable></el-input>
            </el-form-item>     
            <el-form-item label="进货来源:" >
                <el-input class="label-width" v-model="form.source" clearable></el-input>
            </el-form-item>          
            <el-form-item label="商品分类:" >
                <el-input class="label-width" v-model="form.category" clearable></el-input>
            </el-form-item>    
            <el-form-item label="备注:" >
                <el-input class="label-width" v-model="form.remarke" clearable></el-input>
            </el-form-item>  
            <el-form-item>
                <el-button class="save-btn" @click="clearFun">取消</el-button>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>                   
        </el-form>
    </div>
</template>

<script>
import {QueryNodeSelect, InsertTraceabilityCode, UpdateTraceabilityCode} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            form:{
                node_id: '',
                good_code: '',
                good_name: '',
                label_code: '',
                label_name: '',
                pattern: '',
                brand: '',
                source: '',
                category: '',
                remarke: '',
            },
            nodeArr: [],
            options1:[],
            rules:{
                node_id: [
                    { required: true, message: '请选择企业名称', trigger: 'change' }
                ],
                good_code:[
                    {required: true, message: '请输入物品编码', trigger: 'blur'}
                ],
                label_code:[
                    {required: true, message: '请输入标签编码', trigger: 'blur'}
                ],
            },
            ids: '',
            node_name: '',
        }
    },
    mounted(){
        if(this.$route.params.id){
            let param = this.$route.params
            this.form = {
                node_id: param.node_id,
                good_code: param.traceability_code,
                good_name: param.traceability_name,
                label_code: param.association_name,
                label_name: param.association_id,
                pattern: param.managing_mode,
                brand: param.brand,
                source: param.supplier,
                category: param.goods_type,
                remarke: param.remarks,
            }
            this.node_name = param.node_name
            this.ids = param.id
        }
        this.getQueryNodeSelect()
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
        clearFun(){
            this.$router.push({name: 'ItemCode'})
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
        saveFun(form){
            if(this.ids){
                let data = {
                    id: this.ids,
                    node_id: this.form.node_id,    
                    traceability_code: this.form.good_code,
                    traceability_name: this.form.good_name,
                    node_name: this.node_name, 
                    remarks: this.form.remarke,
                    managing_mode: this.form.pattern,      
                    brand: this.form.brand,            
                    supplier: this.form.source,        
                    goods_type: this.form.category,      
                    association_name: this.form.label_name,
                    association_id: this.form.label_code,   
                };
                UpdateTraceabilityCode(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'ItemCode'})
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
                    traceability_code: this.form.good_code,
                    traceability_name: this.form.good_name,
                    node_name: this.node_name, 
                    remarks: this.form.remarke,
                    managing_mode: this.form.pattern,      
                    brand: this.form.brand,            
                    supplier: this.form.source,        
                    goods_type: this.form.category,      
                    association_name: this.form.label_name,
                    association_id: this.form.label_code,   
                };
                InsertTraceabilityCode(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'ItemCode'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res=>{
                        this.$message.error('出错了.');
                    })
            }
                
        },  
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
