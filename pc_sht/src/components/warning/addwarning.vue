<template>
    <div class="content">
         <div class="box">
             <el-form  :model="form" ref="ruleForm" label-width="120px" :rules="rules">
                <el-form-item class="label-width" label="预警名称:" prop="warnName">
                    <el-input class="label-width" v-model="form.warnName"></el-input>
                </el-form-item>
                <el-form-item  label="预警SQL:" prop="warnSql">
                    <el-input class="label-width" type="textarea" :rows="4"  v-model="form.warnSql"></el-input>
                </el-form-item>
                <el-form-item label="满足条件:" prop="select">
                    <!-- <span style="float:left;margin-right:5px;">未上传天数：</span> -->
                     <el-select v-model="form.select" clearable placeholder="请选择" style="float:left" @change="selectGet">
                        <el-option v-for="item in options"  :key="item.id" :label="item.text" :value="item.id"></el-option>
                     </el-select>
                     <el-input class="label-width" v-model="form.day" placeHOLDER="请输入天数" style="float:left;width:180px;"></el-input>
                     <span style="margin-left:5px;"></span>
                </el-form-item>
                <el-form-item label="执行时间" prop="radio">
                     <el-radio v-model="form.radio" label="每天09:00">每天09:00</el-radio>
                     <el-radio v-model="form.radio" label="每周一">每周一</el-radio>
                     <el-radio v-model="form.radio" label="每周五">每周五</el-radio>
                     <el-radio v-model="form.radio" label="每周六">每周六</el-radio>
                     <el-radio v-model="form.radio" label="每周日">每周日</el-radio>
                </el-form-item>
                <el-form-item  label="结果SQL:" prop="resultSql">
                    <el-input class="label-width" type="textarea" :rows="4"  v-model="form.resultSql"></el-input>
                </el-form-item>
                <el-form-item  label="解决方案:" prop="resolve">
                    <el-input class="label-width" type="textarea" :rows="4"  v-model="form.resolve"></el-input>
                </el-form-item>
                <el-form-item  label="备注:" prop="remarks">
                    <el-input class="label-width" v-model="form.remarks"></el-input>
                </el-form-item>
                <el-form-item label="收件人邮箱:">
                    <el-input class="label-width" v-model="form.eMail"></el-input>
                </el-form-item>
                <!-- <el-form-item label="发送方式">
                     <el-radio v-model="radio1" label="1">即时通知</el-radio>
                </el-form-item> -->
             </el-form>
             <el-button class="save-btn" type="primary" @click="save(form)">保存</el-button>
             <el-button @click="remove()">取消</el-button>
         </div>
    </div>
</template>

<script>
import {GetAllWarning,warningState,GetAllLogWarning,InsertWarning,UpdateWarning,ExecuteWarning,DownloadLogWarning,QueryNodeTypeInfo} from '../../js/warning/warning.js'
export default {
    name:'Addwarning',
    data(){
        return{
            isEdit:false,
            value:'',
            form:{
                warnName:'',
                warnSql:'',
                select:'',
                day:'',
                radio:'',
                resultSql:'',
                resolve:'',
                remarks:'',
                eMail:'',
                dataSou:'',
                dataTime:'',
                id:'',
                radio2:''
            },
            options:[
                {id:'1',text:'大于'},
                {id:'2',text:'大于等于'},
                {id:'3',text:'等于'},
                {id:'4',text:'小于'},
                {id:'5',text:'小于等于'}
            ],
            radio1:'1',
            rules:{
	            	warnName :[{required: true, message: '请输入预警名称', trigger: 'blur'}],
                    warnSql :[{required: true, message: '请输入预警SQL', trigger: 'blur'}],
                    select :[{required: true, message: '请输入阈值', trigger: 'blur'}],
                    radio :[{required: true, message: '请选择时间', trigger: 'blur'}],
                    resultSql :[{required: true, message: '请输入结果SQL', trigger: 'blur'}],
                    resolve :[{required: true, message: '请输入解决方案', trigger: 'blur'}],
                    remarks :[{required: true, message: '请输入备注', trigger: 'blur'}]
	             }
        }
    },
    mounted(){
        //  console.log(this.$route.params)
         window.scrollTo(0,0);
         if(JSON.stringify(this.$route.params) != "{}"){
                this.isEdit = true;
                this.form.id = this.$route.params.id; // id
                this.form.warnName = this.$route.params.warn_name; //名称
                this.form.warnSql = this.$route.params.warn_sql;  //预警sql
                // this.form.select = this.$route.params.relation_type; // 关系  
            
                if(this.$route.params.relation_type == '1'){
                    this.form.select = '大于'
                    this.form.dataSou = '大于'
                } 
                else if(this.$route.params.relation_type == '2'){
                    this.form.select = '大于等于'
                    this.form.dataSou = '大于等于'
                }   
                else if(this.$route.params.relation_type == '3'){
                    this.form.select = '等于'
                    this.form.dataSou = '等于'
                }
                else if(this.$route.params.relation_type == '4'){
                    this.form.select = '小于'
                    this.form.dataSou = '小于'
                }
                else if(this.$route.params.relation_type == '5'){
                    this.form.select = '小于等于'
                    this.form.dataSou = '小于等于'
                }
                this.form.day = this.$route.params.threshold; // 天数
                this.form.resultSql = this.$route.params.result_sql; // 结果sql
                this.form.eMail = this.$route.params.mail_config; // 收件人邮箱配置
                this.form.remarks = this.$route.params.remarks; // 备注
                this.form.resolve = this.$route.params.mail_msg; // 解决方案
                this.form.radio = this.$route.params.execution_method; //执行时间
        }
    },
    methods:{
        selectGet(val){  
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.form.dataSou = ele.text
                    }
                })
            }else{
                this.form.dataSou = ''
            }
        },
        remove(){
            this.$router.push({path:'warnManage'})
        },
        save(ruleForm){
             this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                   if(this.isEdit){
                        let params = {
                                id : this.form.id,
                                warn_name:this.form.warnName,//预警名称
                                warn_sql:this.form.warnSql, //预警SQL
                                relation_type:this.form.select, //与阈值关系
                                threshold:this.form.day, //阈值
                                result_sql:this.form.resultSql, //结果SQL
                                mail_config:this.form.eMail, //收件人邮箱配置
                                remarks:this.form.remarks, //备注 
                                mail_msg:this.form.resolve, //解决方案
                                execution_method:this.form.radio //执行时间
                            } 
                            UpdateWarning(params)
                                .then( res => {
                                    console.log(params)
                                    this.$message({
                                        message: '恭喜，修改成功',
                                        type: 'success'
                                    });
                                    this.$router.push({path:'warnManage'})
                                })
                                .catch( res => {
                                    this.$message.error('出错了.');
                                })
                    }else{
                        let params = {
                            warn_name:this.form.warnName,//预警名称
                            warn_sql:this.form.warnSql, //预警SQL
                            relation_type:this.form.select, //与阈值关系
                            threshold:this.form.day, //阈值
                            result_sql:this.form.resultSql, //结果SQL
                            mail_config:this.form.eMail, //收件人邮箱配置
                            remarks:this.form.remarks, //备注 
                            mail_msg:this.form.resolve, //解决方案
                            execution_method:this.form.radio //执行时间
                        }
                        InsertWarning(params)
                            .then( res => {
                                this.$message({
                                    message: '恭喜，添加成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'warnManage'})
                            })
                            .catch( res => {
                                this.$message.error('出错了.');
                            })
                    }
                }
            });
             
            
        }
    }
}
</script>

<style scoped lang='less'>
.content{
    background-color: #ffffff;
    .box{
        width:1100px;
        padding-left: 50px;
        padding-top: 20px;
        height: 700px;
        .save-btn{
            margin-left: 250px;
        }
        .label-width{
            width: 600px;
        }
    }
}
</style>
