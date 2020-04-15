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
            <el-form-item label="商户编码:">
                <el-input class="label-width" v-model="form.biz_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="商户名称:">
                <el-input class="label-width" v-model="form.biz_name" clearable></el-input>
            </el-form-item> 
            <el-form-item label="供货单位编码:">
                <el-input class="label-width" v-model="form.ws_supplier_id" clearable></el-input>
            </el-form-item> 
            <el-form-item label="供货单位名称:">
                <el-input class="label-width" v-model="form.ws_supplier_name" clearable></el-input>
            </el-form-item>     
            <el-form-item label="供应商编码:" >
                <el-input class="label-width" v-model="form.gys_code" clearable></el-input>
            </el-form-item>     
            <el-form-item label="供应商名称:" >
                <el-input class="label-width" v-model="form.gys_name" clearable></el-input>
            </el-form-item>          
            <el-form-item label="产地编码:" >
                <el-input class="label-width" v-model="form.addr_code" clearable></el-input>
            </el-form-item>    
            <el-form-item label="产地名称:" >
                <el-input class="label-width" v-model="form.addr_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品分类代码:" >
                <el-input class="label-width" v-model="form.good_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品分类名称:" >
                <el-input class="label-width" v-model="form.good_name" clearable></el-input>
            </el-form-item> 
            <el-form-item label="追溯码:" >
                <el-input class="label-width" v-model="form.review_code" clearable></el-input>
            </el-form-item>     
            <el-form-item label="标签编码:" prop="label_code">
                <el-input class="label-width" v-model="form.label_code" clearable></el-input>
            </el-form-item>        
            <el-form-item label="备注:" >
                <el-input class="label-width" v-model="form.remark" clearable></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button class="save-btn" @click="clearFun">取消</el-button>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>          
        </el-form>
    </div>
</template>

<script>
import {QueryNodeSelect, InsertTraceInfo, UpdateTraceInfo} from '../../js/traceabiltyInfo/traceabiltyInfo.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            form:{
                node_id: '',
                biz_code: '',
                biz_name: '',
                ws_supplier_id: '',
                ws_supplier_name: '',
                gys_code: '',
                gys_name: '',
                addr_code: '',
                addr_name: '',
                good_code: '',
                good_name: '',
                review_code: '',
                label_code: '',
                remark: ''
            },
            rules:{
	            node_id: [
                    { required: true, message: '请选择企业名称', trigger: 'change' }
                ],
                label_code:[
                    {required: true, message: '请输入标签编码', trigger: 'blur'}
                ],
            },
            nodeArr: [],
            ids: '',
            node_name: '',
        }
    },
    mounted(){
        if(this.$route.params.id){
            let param = this.$route.params
            this.form = {
                node_id: param.node_id,
                biz_code: param.biz_id,
                biz_name: param.biz_name,
                ws_supplier_id: param.ws_supplier_id,
                ws_supplier_name: param.ws_supplier_name,
                gys_code: param.supplier_id,
                gys_name: param.supplier_name,
                addr_code: param.area_origin_id,
                addr_name: param.area_origin_name,
                good_code: param.goods_code,
                good_name: param.goods_name,
                review_code: param.trace_code,
                label_code: param.association_id,
                remark: param.remarks
            }
            this.node_name = param.node_name
            this.ids = param.id
        }
        this.getQueryNodeSelect();
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
            this.$router.push({name: 'ReviewInfo'})
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
                    node_id: this.form.node_id, // 企业编码
                    node_name: this.node_name, // 企业名称
                    biz_id: this.form.biz_code, // 商户编码
                    biz_name: this.form.biz_name, // 商户名称
                    ws_supplier_id: this.form.ws_supplier_id, // 供货单位编码
                    ws_supplier_name: this.form.ws_supplier_name, // 供货单位名称     
                    supplier_id: this.form.gys_code, // 供应商编码   
                    supplier_name: this.form.gys_name, // 供应商名称 
                    area_origin_id: this.form.addr_code, // 产地编码 
                    area_origin_name: this.form.addr_name, // 产地名称
                    goods_code: this.form.good_code, // 商品分类代码
                    goods_name: this.form.good_name, // 商品分类名称
                    trace_code: this.form.review_code, // 追溯码
                    association_id: this.form.label_code, // 标签编码
                    remarks: this.form.remark, // 备注
                };
                UpdateTraceInfo(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'ReviewInfo'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res=>{
                        this.$message.error('出错了.');
                    })
            }else{
                let data = {
                    node_id: this.form.node_id, // 企业编码
                    node_name: this.node_name, // 企业名称
                    biz_id: this.form.biz_code, // 商户编码
                    biz_name: this.form.biz_name, // 商户名称
                    ws_supplier_id: this.form.ws_supplier_id, // 供货单位编码
                    ws_supplier_name: this.form.ws_supplier_name, // 供货单位名称     
                    supplier_id: this.form.gys_code, // 供应商编码   
                    supplier_name: this.form.gys_name, // 供应商名称 
                    area_origin_id: this.form.addr_code, // 产地编码 
                    area_origin_name: this.form.addr_name, // 产地名称
                    goods_code: this.form.good_code, // 商品分类代码
                    goods_name: this.form.good_name, // 商品分类名称
                    trace_code: this.form.review_code, // 追溯码
                    association_id: this.form.label_code, // 标签编码
                    remarks: this.form.remark, // 备注
                };
                InsertTraceInfo(data)
                    .then( res =>{
                        if (res.result == true) {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                duration: 5000,
                            });
                            this.$router.push({name: 'ReviewInfo'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res=>{
                        this.$message.error('出错了.');
                    })
            }
        },  
        getQueryDataSourceType(){  //数据源类型查询
             QueryDataSourceType()
                  .then(res=>{
                      this.options = res.data.dataList;
                  })
                  .catch(res=>{
                        console.log(res)
                  })
        },
        getQueryNodeTypeInfo(){  //节点类型查询
             QueryNodeTypeInfo()
                  .then(res=>{
                      this.options1 = res.data.dataList;
                  })
                  .catch(res=>{
                        console.log(res)
                  })
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
