<template>
    <div class="content newNodeExtraction">
        <el-form class="form" label-width="140px" :model="form" ref="form" :rules="rules">
            <el-form-item label="节点编码：" prop="node_code">
                <el-input v-model="form.node_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="节点名称：" prop="node_name">
                <el-input v-model="form.node_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="节点地址：">
                <el-input v-model="form.addr" clearable></el-input>
            </el-form-item>
            <el-form-item label="父节点编码：">
                <el-input v-model="form.parent_code" clearable></el-input>
            </el-form-item>
            <el-form-item label="集团名称：">
                <el-input v-model="form.group_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="节点类型：">
                <el-select v-model="form.node_types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in typesArr" :key="index" :label="item.node_type" :value="item.node_type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点详细类型：">
                <el-select v-model="form.detail_types" filterable clearable placeholder="请选择" v-if="form.node_types">
                    <el-option v-for="(item,index) in detailArr" :key="index" v-if="form.node_types == item.node_type" :label="item.node_detail_type" :value="item.node_detail_type">
                    </el-option>
                </el-select>
                <el-select v-model="form.detail_types" filterable clearable placeholder="请选择" v-else>
                    <el-option v-for="(item,index) in detailArr" :key="index" :label="item.node_detail_type" :value="item.node_detail_type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属区县：">
                <el-select v-model="form.district_name" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in addrArr" :key="index" :label="item.district_name" :value="item.district_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据抽取类型：" prop="extract_types">
                <el-select v-model="form.extract_types" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in extractArr" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否补充数据：">
                <el-input v-model="form.replenish" clearable></el-input>
            </el-form-item>
            <el-form-item label="经度：">
                <el-input v-model="form.x_coordinate" clearable></el-input>
            </el-form-item>
            <el-form-item label="纬度：">
                <el-input v-model="form.y_coordinate" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 150px">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {NodePriceType, InsertPriceNode} from '../../js/compare/compare.js'
export default {
    name:"newNodeExtraction",
    data() {
        return {
            form: {
                node_code: "", // 节点编码
                node_name: "", // 节点名称
                addr: '',
                parent_code: "", // 父节点编码
                group_name: "", // 集团名称
                node_types: "", // 节点类型
                detail_types: "", // 节点详细类型
                district_name: '', // 所属区县
                extract_types: '', // 数据抽取类型
                replenish: '', // 是否补充数据
                x_coordinate: '',
                y_coordinate: '',
            },
            typesArr: [],
            detailArr: [],
            addrArr: [],
            extractArr: [],
            rules: {
                node_code: [
                    { required: true, message: '请输入节点编码', trigger: 'blur' }
                ],
                node_name: [
                    { required: true, message: '请输入节点名称', trigger: 'blur' }
                ],
                extract_types: [
                    { required: true, message: '请选择数据抽取类型', trigger: 'change' }
                ],
            },
        }
    },
    mounted() {
        let searchMsg2 = ''
        if(localStorage.getItem('searchMsg2')){
            searchMsg2 = JSON.parse(localStorage.getItem('searchMsg2'))
        }
        this.getNodePriceType()
    },
    methods: {
        getNodePriceType(){
            NodePriceType('')
                .then(res => {
                    this.typesArr = res.data.node_type
                    this.detailArr = res.data.node_detail_type
                    this.addrArr = res.data.district_name
                    this.extractArr = res.data.data_source
                })
                .catch(res => {
                    console.log(res)
                })
        },
        saveFun(){
            let obj = {
                node_name: this.form.node_name,
                node_id: this.form.node_code,
                addr: this.form.addr,
                parent: this.form.parent_code,
                node_type: this.form.node_types,
                node_detail_type: this.form.detail_types,
                group_name: this.form.group_name,
                district_name: this.form.district_name,
                data_source: this.form.extract_types,
                varieties_type: this.form.replenish, 
                x_coordinate: this.form.x_coordinate,
                y_coordinate: this.form.y_coordinate
            }
            InsertPriceNode(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('保存成功');
                        this.$router.push({name: 'NodeExtraction'})
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
            .el-input, .el-select{
                width: 400px;
            }
        }
    }
</style>
