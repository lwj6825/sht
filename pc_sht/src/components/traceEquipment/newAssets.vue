<template>
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="资产名称" prop="name">
                <el-select v-model="ruleForm.name" allow-create filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in nameArr" :key="index" :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产类型" prop="type">
                <el-cascader style="width: 300px" clearable v-model="ruleForm.type"
                    :options="options" filterable @change="zcTypeFun"
                    change-on-select placeholder="请选择"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="条码号" prop="tmh">
                <el-input v-model="ruleForm.tmh" clearable></el-input>
            </el-form-item>
            <el-form-item label="序列号" prop="xlh">
                <el-input v-model="ruleForm.xlh" clearable></el-input>
            </el-form-item>
           <el-form-item label="所属期" prop="ssq">
                <el-select v-model="ruleForm.ssq" filterable clearable placeholder="请选择" @change="ssqFun">
                    <el-option v-for="item in ssqArr" :key="item.a_conf_id" :label="item.a_conf_item"
                        :value="item.a_conf_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产状态" prop="states">
                <el-select v-model="ruleForm.states" filterable clearable placeholder="请选择" @change="zcStateFun">
                    <el-option v-for="item in zcState" :key="item.a_conf_id" :label="item.a_conf_item"
                        :value="item.a_conf_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格/型号" prop="ggxh">
                <el-select v-model="ruleForm.ggxh" allow-create filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in zcggArr" :key="index" :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生产厂家" prop="sccj">
                <el-select v-model="ruleForm.sccj" allow-create filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in sccjArr" :key="index" :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属节点" prop="node">
                <el-select v-model="ruleForm.node" filterable clearable placeholder="请选择" @change="ssNodeFun">
                    <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_NAME"
                        :value="item.NODE_ID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属商户">
                <el-select v-model="ruleForm.management" filterable clearable placeholder="请选择" @change="ssManagementFun" @focus="focusFun">
                    <el-option v-for="(item,index) in shArr" :key="index" :label="item.BIZ_NAME"
                        :value="item.BIZ_ID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="IP">
                <el-input v-model="ruleForm.ip" clearable></el-input>
            </el-form-item>
            <el-form-item label="经度">
                <el-input v-model="ruleForm.jd" clearable></el-input>
            </el-form-item>
            <el-form-item label="纬度">
                <el-input v-model="ruleForm.wd" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="ruleForm.bz" clearable></el-input>
            </el-form-item>
            <el-form-item label="附件：">
                <div class="msg">
                    <div class="msg-item">   
                        <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index">
                                    <figure class="image">
                                        <!--<p class="icon-delete" @click="removeFun(1,item)">-</p>-->
                                        <img :src="item.img_url" v-if="item.img_url">
                                    </figure>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span class="submit">
                                上传图片
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file" @change="fileFun($event)">
                                </form>
                            </span>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="disabled" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {QueryAssetsUser,QueryAssetsConf,QueryAssetsType,QueryNodeBase,QueryBusiness,AssetsAdd,
    QueryAssetsSpecifications,QueryAssetsNames,QueryAssetsManufacturers,} from '../../js/traceEquipment/traceEquipment.js'
import {uploadPhotos} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"newAssets",
    data() {
        return {
            ruleForm: {
                name: '',
                type: [],
                tmh: '',
                xlh: '',
                ssq: '',
                states: '',
                ggxh: '',
                sccj: '',
                node: '',
                management: '',
                ip: '',
                jd: '',
                wd: '',
                bz: ''
            },
            imgUrl: '',
            rules: {
                name: [
                    { required: true, message: '请选择资产名称', trigger: 'change' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请选择资产名称"));
                        }else if(value.length > 50){
                            callback(new Error("字符过长"));
                        }else{
                            callback();
                        }
                    }, trigger: 'change'}
                ],
                type: [
                    { required: true, message: '请选择资产类型', trigger: 'change' }
                ],
                tmh: [
                    { required: true, message: '请输入条码号', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(/^SW\d{6}$/.test(value) == false){
                            callback(new Error("请输入正确的条码号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                xlh: [
                    { required: true, message: '请输入序列号', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请输入序列号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                ssq: [
                    { required: true, message: '请选择所属期', trigger: 'change' }
                ],
                states: [
                    { required: true, message: '请选择资产状态', trigger: 'change' }
                ],
                ggxh: [
                    { required: true, message: '请选择规格型号', trigger: 'change' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请选择规格型号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'change'}
                ],
                sccj: [
                    { required: true, message: '请选择生产厂家', trigger: 'change' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请选择生产厂家"));
                        }else{
                            callback();
                        }
                    }, trigger: 'change'}
                ],
                node: [
                    { required: true, message: '请选择所属节点', trigger: 'change' }
                ],
            },
            options: [],
            zcState: [],
            ssqArr: [],
            nodeArr: [],
            shArr: [],
            ssq_name: '',
            zcType_name: '',
            zcState_name: '',
            ssNode_name: '',
            management: '',
            userId: '',
            imgArr1: [],
            file: '',
            disabled: false,
            nameArr: [],
            zcggArr: [],
            sccjArr: [],
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        this.getQueryAssetsSpecifications()
        this.getQueryAssetsNames()
        this.getQueryAssetsManufacturers()
        this.getQueryNodeBase()
        this.getQueryAssetsType()
        this.getQueryAssetsConf()
    },
    methods: {
        // 查询所有资产规格
        getQueryAssetsSpecifications(){
            QueryAssetsSpecifications('')
                .then(res => {
                    this.zcggArr = res.data.assetsspecifications
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询所有资产名称
        getQueryAssetsNames(){
            QueryAssetsNames('')
                .then(res => {
                    this.nameArr = res.data.assetsnames
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询所有资产生产厂家
        getQueryAssetsManufacturers(){
            QueryAssetsManufacturers('')
                .then(res => {
                    this.sccjArr = res.data.queryassetsmanufacturers
                })
                .catch(res => {
                    console.log(res);
                })
        },
        fileFun(event,ele){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var that = this;
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', this.file);  
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            const ajaxPost = function (url, params,config) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(url, params,{config})
                        .then((res) => {
                            resolve(res.data)
                        })
                        .catch(() => {
                            reject('error')
                        })
                })
            }  
            const url = uploadPhotos
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        let obj = {
                            img_url: res.data.imgUrl
                        }
                        this.imgArr1.push(obj)
                        loading.close();
                    }else{
                        this.$message.error(res.message);
                    }
                    this.$refs.file.value = null
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了");
                })
        },
        zcTypeFun(ele){
            // console.log(ele)
            // this.form.types = ele[ele.length - 1]
            this.options.forEach(val => {
                if(val.assets_type_id == ele[ele.length - 1]){
                    this.zcType_name = val.assets_type
                }else{
                    val.child_list.forEach(val =>{
                        if(val.assets_type_id == ele[ele.length - 1]){
                            this.zcType_name = val.assets_type
                        }
                    })
                }
            })
        },
        ssqFun(ele){
            this.ssqArr.forEach(val => {
                if(val.a_conf_id == ele){
                    this.ssq_name = val.a_conf_item
                }
            })
        },
        zcStateFun(ele){
            this.zcState.forEach(val => {
                if(val.a_conf_id == ele){
                    this.zcState_name = val.a_conf_item
                }
            })
        },
        ssNodeFun(ele){
            this.nodeArr.forEach(val => {
                if(val.NODE_ID == ele){
                    this.ssNode_name = val.NODE_NAME
                }
            })
            this.ruleForm.management = ''
            this.management = ''
            this.getQueryBusiness()
        },
        ssManagementFun(ele){
            this.shArr.forEach(val => {
                if(val.BIZ_ID == ele){
                    this.management = val.BIZ_NAME
                }
            })
        },
        focusFun(){
            if(this.ruleForm.node == ''){
                this.$message.error("请选择节点!");
            }
        },
        // 新增资产
        getAssetsAdd(){
            this.disabled = true
            let imgStr = ''
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    imgStr += val.img_url + ','
                })
                imgStr = imgStr
            }else{
                imgStr = ''
            }
            let params = {
                node_code: this.ruleForm.node, // 关联节点信息
                node_name: this.ruleForm.node ? this.ssNode_name : '', // 节点名称
                assets_type: this.ruleForm.type[this.ruleForm.type.length - 1] ? this.zcType_name : '', // 资产类型
                assets_type_id: this.ruleForm.type[this.ruleForm.type.length - 1],
                sub_period: this.ruleForm.ssq ? this.ssq_name : '', // 所属期
                sub_period_id: this.ruleForm.ssq,
                a_conf_item: this.ruleForm.states ? this.zcState_name : '', // 资产状态
                a_conf_id: this.ruleForm.states,
                merchant_id: this.ruleForm.management, // 关联商户信息
                merchant_name: this.ruleForm.management ? this.management : '',// 商户名称
                assets_name: this.ruleForm.name.trim(), // 资产名称
                bar_code: this.ruleForm.tmh.trim(), // 条码号（SW）
                serial_num: this.ruleForm.xlh.trim(), // 序列号 
                specifications: this.ruleForm.ggxh.trim(), // 规格型号
                manufacturer: this.ruleForm.sccj.trim(), // 生产厂家
                ip: this.ruleForm.ip.trim(), // IP
                longitude: this.ruleForm.jd.trim(), // 经度
                remark: this.ruleForm.bz.trim(), // 备注
                latitude: this.ruleForm.wd.trim(),
                userid: this.userId,
                image_url: imgStr,
            }
            // console.log(params)
            AssetsAdd(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({name: 'Assets'})
                    }else{
                        this.$message.error(res.message);
                        this.disabled = false
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    this.disabled = false
                    console.log(res)
                })
        },
        // 查询 所有资产用户信息（需要确定用户类型类型）
        getQueryAssetsUser(){
            // QueryAssetsUser('')
            //     .then(res => {
            //         // console.log(res)
            //         // this.userId = res.data.assets_user[0].USERID
            //     })
            //     .catch(res => {
            //         console.log(res);
            //     })
        },
        // 查询 资产状态、所属期 等查询条件下拉框
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    // console.log(res)
                    this.zcState = res.data[1]
                    this.ssqArr = res.data[3]
            // 1:状态，2:维修更换部件,3:所属期)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 资产类型树
        getQueryAssetsType(){
            QueryAssetsType('')
                .then(res => {
                    res.data.assetsType.forEach(val => {
                        val.value = val.assets_type_id
                        val.label = val.assets_type
                        if(val.child_list.length > 0){
                            val.children = val.child_list
                            val.child_list.forEach(val =>{
                                val.value = val.assets_type_id
                                val.label = val.assets_type
                            })
                        }
                    })
                    this.options = res.data.assetsType
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有节点
        getQueryNodeBase(){
            QueryNodeBase('')
                .then(res => {
                    // console.log(res)
                    this.nodeArr = res.data.nodeBase
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有商户
        getQueryBusiness(){
            if(this.ruleForm.node){
                // node_id  先选节点后选商户  新增
                let str = 'node_id=' + this.ruleForm.node
                QueryBusiness(str)
                    .then(res => {
                        // console.log(res)
                        this.shArr = res.data.business
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getAssetsAdd()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$router.push({name: 'Assets'})
        },
        
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
        .box-fileimg{
            display: flex;
            width: 300px;
            height: 100px;
            .submit{
                position: relative;
                top: 36%;
                left: 10px;
                width: 90px;
                height: 30px;
                line-height: 30px;
                color: #409EFF;
                background: #fff;
                text-align: center;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px solid #409EFF;
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0;
                    width: 90px;
                    height: 36px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
            }
            .image{
                width: 200px;
                height: 100px;
                vertical-align: middle;
                border: 1px solid #eaeaea;
                overflow: hidden;
                box-sizing: border-box;
                img{
                    display: block;
                    border: none;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .msg{
            height: 80px;
            color: #999;
        }
        .submit{
            margin: 0 30px;
            position: relative;
            left: 0;
            top: 20%;
            display: inline-block;
            width: 90px;
            height: 30px;
            line-height: 30px;
            color: #409EFF;
            background: #fff;
            text-align: center;
            overflow: hidden;
            border-radius: 5px;
            font-size: 14px;
            box-sizing: border-box;
            border: 1px solid #409EFF;
            .file{
                position: absolute;
                left: 0px;
                top: 0px;
                width: 90px;
                height: 30px;
                opacity: 0;
                background: rgba(0,0,0,0);
            }
        }
        .img-list{
            ul{
                display: flex;
                flex-wrap:wrap;
                li{
                    position: relative;
                    top: 0;
                    left: 0;
                    margin: 10px;
                    .icon-delete{
                        position: absolute;
                        top: -6px;
                        right: -6px;
                        width: 12px;
                        height: 12px;
                        text-align: center;
                        line-height: 7px;
                        font-size: 24px;
                        background: #990000;
                        color: #fff;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                    img{
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }
        
        .msg-item{
            margin: 10px 0;
            width: 500px;
            display: flex;
        }
        .el-form{
            padding-top: 20px;
            margin-left: 100px;
        }
        .el-input,.el-select{
            width: 300px;
        }
    }
</style>
