<template>
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="条码号" prop="tmh">
                <el-input v-model="ruleForm.tmh"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="设备问题" prop="sbwt">
                <el-input class="textarea" type="textarea" v-model="ruleForm.sbwt"></el-input>
            </el-form-item>
            <el-form-item label="解决方案">
                <el-input class="textarea" type="textarea" v-model="ruleForm.jjfa"></el-input>
            </el-form-item>
            <el-form-item label="更换部件"><!---->
                <el-select v-model="ruleForm.ghbj" multiple filterable clearable placeholder="请选择" @change="bjFun">
                    <el-option v-for="item in bjArr" :key="item.a_conf_id" :label="item.a_conf_item"
                        :value="item.a_conf_item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="维修结果" prop="wxjg">
                <el-select v-model="ruleForm.wxjg" placeholder="请选择">
                    <el-option label="已完成" value="0"></el-option>
                    <el-option label="未完成" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="维修日期" prop="data">
                <el-date-picker value-format="yyyy-MM-dd"
                v-model="ruleForm.data"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="维修人" prop="people">
                <el-select v-model="ruleForm.people" placeholder="请选择">
                    <el-option v-for="item in xjrArr" :key="item.USERID" :label="item.NAME"
                    :value="item.USERID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属节点" prop="node">
                <el-input v-model="ruleForm.node" disabled></el-input>
            </el-form-item>
            <el-form-item label="附件">
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
// 标准时间转日期格式
function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
import {uploadPhotos} from '../../js/address/url.js'
import axios from 'axios';
import {QueryAssetsUser,QueryAssetsConf,QueryNodeBase,MaintainAdd,QueryMaintainName} from '../../js/traceEquipment/traceEquipment.js'
export default {
    name:"newMaintenance",
    data() {
        return {
            ruleForm: {
                tmh: '',
                name: '',
                sbwt: '',
                jjfa: '',
                ghbj: '',
                wxjg: '',
                data: new Date(),
                people: '',
                node: '',
            },
            imgUrl: '',
            rules: {
                tmh: [
                    { required: true, message: '请输入正确的条码号', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(/^SW\d{6}$/.test(value) == false){
                            callback(new Error("请输入正确的条码号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请输入设备名称"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                sbwt: [
                    { required: true, message: '请输入设备问题', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请输入设备问题"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                jjfa: [
                    { required: true, message: '请输入解决方案', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(value.trim() == false){
                            callback(new Error("请输入解决方案"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                wxjg: [
                    { required: true, message: '请选择维修结果', trigger: 'change' }
                ],
                data: [
                    { required: true, message: '请选择维修日期', trigger: 'change' }
                ],
                people: [
                    { required: true, message: '请选择维修人', trigger: 'change' }
                ],
                node: [
                    { required: true, message: '请选择所属节点', trigger: 'change' }
                ],
            },
            nodeArr: [],
            ssNode_name: '',
            ssqArr: [],
            ssq_name: '',
            xjrArr: [],
            wxr_name: '',
            bjArr: [],
            bj_name: '',
            assets_id: '',
            userId: '',
            imgArr1: [],
            file: '',
            disabled: false,
        }
    },
    mounted() {
        this.getQueryAssetsConf()
        this.getQueryNodeBase()
        this.getQueryAssetsUser()
        var currentTime = new Date()
        this.ruleForm.data = formatDate(currentTime)
        this.userId = localStorage.getItem('userId')
    },
    watch: {
        'ruleForm.tmh': function (val) {
            if(val.length == 8){
                let obj = {
                    bar_code: val
                }
                QueryMaintainName(obj)
                    .then(res => {
                        if(res.data.dataList){
                            this.$message.success(res.message);
                            this.ruleForm.node = res.data.dataList[0].node_name
                            this.ruleForm.name = res.data.dataList[0].assets_name
                            this.assets_id = res.data.dataList[0].assets_id
                        }else{
                            this.$message.error(res.message);
                            this.ruleForm.node = ''
                            this.ruleForm.name = ''
                            this.assets_id = ''
                        }
                        
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
            
        }
    },
    methods: {
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
        bjFun(ele){
            console.log(ele)
            this.bjArr.forEach(val => {
                if(val.a_conf_id == ele){
                    this.bj_name += val.a_conf_item + ','
                }
            })
        },
        ssNodeFun(ele){
            this.nodeArr.forEach(val => {
                if(val.NODE_ID == ele){
                    this.ssNode_name = val.NODE_NAME
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
        getQueryAssetsUser(){
            QueryAssetsUser('')
                .then(res => {
                    // console.log(res)
                    this.xjrArr = res.data.assets_user
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
        // 查询 资产状态、所属期 等查询条件下拉框
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    // console.log(res)
                    this.zcState = res.data[1]
                    this.ssqArr = res.data[3]
                    this.bjArr = res.data[2]
            // 1:状态，2:维修更换部件,3:所属期)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        saveFun(){
            var currentTime = new Date()
            var hour = currentTime.getHours(); 
            var minute = currentTime.getMinutes(); 
            var second = currentTime.getSeconds(); 
            let timeStr =' ' + formatTen(hour) + ':' + formatTen(minute) + ':' + formatTen(second)
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
            let obj = {
                bar_code: this.ruleForm.tmh.trim(),
                assets_name: this.ruleForm.name.trim(), // 设备名称
                cause: this.ruleForm.sbwt.trim(), // 设备问题 
                solution: this.ruleForm.jjfa.trim(), // 解决方案
                // change_unit: this.ruleForm.ghbj, // 更换部件
                change_unit: this.ruleForm.ghbj ? this.ruleForm.ghbj.join(',') : '', // 更换部件
                m_result: this.ruleForm.wxjg, // 维修结果(0:维修完毕，1:未完成)
                m_time: this.ruleForm.data + timeStr, // 维修时间
                m_creator: this.ruleForm.people, // 维修人
                node_code: this.ruleForm.node, // 关联节点信息
                assets_id: this.assets_id, // 资产id
                userid: this.userId,
                image_url: imgStr,
            }
            MaintainAdd(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({name: 'Maintenance'})
                    }else{
                        this.$message.error(res.message);
                        this.disabled = false
                    }
                })
                .catch(res => {
                    console.log(res);
                    this.disabled = false
                })
        },
        submitForm(formName) {
            if(this.ruleForm.node == ''|| this.ruleForm.name == ''){
                this.$message.error('设备不存在');
            }else{
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveFun()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        resetForm(formName) {
            this.$router.push({name: 'Maintenance'})
        }
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
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
        .textarea{
            margin: 6px 0;
            width: 300px;
            font-size: 12px;
        }
    }
</style>

