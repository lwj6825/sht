
<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="企业名称:" prop="node_id">
                {{node_name}}
            </el-form-item> 
            <el-form-item label="商户编码:">
                {{form.biz_code}}
            </el-form-item>
            <el-form-item label="商户名称:">
                {{form.biz_name}}
            </el-form-item> 
            <el-form-item label="供货单位编码:">
                {{form.ws_supplier_id}}
            </el-form-item> 
            <el-form-item label="供货单位名称:">
                {{form.ws_supplier_name}}
            </el-form-item>     
            <el-form-item label="供应商编码:" >
                {{form.gys_code}}
            </el-form-item>     
            <el-form-item label="供应商名称:" >
                {{form.gys_name}}
            </el-form-item>          
            <el-form-item label="产地编码:" >
                {{form.addr_code}}
            </el-form-item>    
            <el-form-item label="产地名称:" >
                {{form.addr_name}}
            </el-form-item>
            <el-form-item label="商品分类代码:" >
                {{form.good_code}}
            </el-form-item>
            <el-form-item label="商品分类名称:" >
                {{form.good_name}}
            </el-form-item> 
            <el-form-item label="追溯码:" >
                {{form.review_code}}
            </el-form-item>     
            <el-form-item label="标签编码:" prop="label_code">
                {{form.label_code}}
            </el-form-item>        
            <el-form-item label="备注:" >
                {{form.remark}}
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
    },
    methods:{
         
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
