<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules">
            <el-form-item label="数据源名称:" prop="dataName">
                <el-input class="label-width" v-model="form.dataName"></el-input>
            </el-form-item>
            <el-form-item label="数据源类型：" prop="dataSou">
                <el-select v-model="form.dataSou" placeholder="请选择"  @change="selectGet"  >
                            <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="数据库名称:" prop="dataBank">
                <el-input class="label-width" v-model="form.dataBank"></el-input>
            </el-form-item> 
            <el-form-item label="节点类型" prop="nodeType">
                <el-select v-model="form.nodeType" placeholder="请选择"  @change="selectGet"  >
                            <el-option v-for="(item,index) in options1" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="IP地址:" prop="IP">
                <el-input class="label-width" v-model="form.IP"></el-input>
            </el-form-item>     
            <el-form-item label="端口:" prop="port">
                <el-input class="label-width" v-model="form.port"></el-input>
            </el-form-item>     
            <el-form-item label="用户名:" prop="userName">
                <el-input class="label-width" v-model="form.userName"></el-input>
            </el-form-item>  
            <el-form-item label="密码:" prop="passWord">
                <el-input type="password" class="label-width" v-model="form.passWord"></el-input>
            </el-form-item>         
        </el-form>
        <el-button class="save-btn" type="primary" @click="save(form)">保存</el-button>
    </div>
</template>

<script>
import Bus from '../common/bus.js'
import {GetAllDataSource,UpdateDataSource,QueryDataSourceType,InsertDataSource,QueryQuartzJob,QueryQuartzState,QuartzManagerNew} from '../../js/collect/collect.js'
import {QueryNodeTypeInfo} from '../../js/warning/warning.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            form:{
                id:'',
                dataName:'',
                dataType:'',
                dataBank:'',
                nodeType:'',
                IP:'',
                port:'',
                userName:'',
                passWord:'',
                initial_size:'',
                max_active:'',
                max_idle:'',
                min_idle:'',
                dataSou:''
            },
            options:[],
            options1:[],
            rules:{
	            	dataName :[{required: true, message: '请输入数据源名称', trigger: 'blur'}],
                    dataSou :[{required: true, message: '请选择数据源类型', trigger: 'blur'}],
                    dataBank :[{required: true, message: '请输入数据库名称', trigger: 'blur'}],
                    nodeType :[{required: true, message: '请输入节点类型', trigger: 'blur'}],
                    IP :[{required: true, message: '请输入IP地址', trigger: 'blur'}],
                    port :[{required: true, message: '请输入端口号', trigger: 'blur'}],
                    userName :[{required: true, message: '请输入用户名', trigger: 'blur'}],
                    passWord :[{required: true, message: '请输入密码', trigger: 'blur'}]
	             }
        }
    },
    mounted(){
        if(JSON.stringify(this.$route.params) != "{}"){
                this.isEdit = true;
                this.form.id = this.$route.params.id;
                this.form.dataName = this.$route.params.source_name;
                this.form.dataSou = this.$route.params.driver_class_name;
                this.form.dataBank = this.$route.params.data_name;            
                this.form.nodeType = this.$route.params.node_type;
                this.form.IP = this.$route.params.ip;
                this.form.port = this.$route.params.port;
                this.form.userName = this.$route.params.user_name;
                this.form.passWord = this.$route.params.password;
                this.form.initial_size = this.$route.params.initial_size;
                this.form.max_active = this.$route.params.max_active;
                this.form.max_idle = this.$route.params.max_idle;
                this.form.min_idle = this.$route.params.min_idle;
        }
        this.getQueryDataSourceType();
        this.getQueryNodeTypeInfo()
    },
    methods:{
        selectGet(val){  //选择数据源类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.form.dataSou = ele.id
                    }
                })
            }else{
                this.form.dataSou = ''
            }
        },
         selectGet1(val){  //节点类型
            if(val){
                this.options1.forEach(ele => {
                    if(val == ele.id){
                        this.form.nodeType = ele.id
                    }
                })
            }else{
                this.form.nodeType = ''
            }
        },
        save(form){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.isEdit){
                        let data = {
                            id:this.form.id,
                            source_name:this.form.dataName,
                            driver_class_name:this.form.dataSou,
                            data_name:this.form.dataBank,
                            node_type:this.form.nodeType,
                            ip:this.form.IP,
                            port:this.form.port,
                            user_name: this.form.userName,
                            password: this.form.passWord,
                            initial_size:this.form.initial_size,
                            max_active:this.form.max_active,
                            max_idle:this.form.max_idle,
                            min_idle:this.form.min_idle
                        };
                        UpdateDataSource(data)
                            .then( res =>{
                                console.log(data)
                                this.$message({
                                    message: '恭喜，修改成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'dataSource'})
                            })
                            .catch(res=>{
                                this.$message.error('出错了.');
                            })
                    }else{
                        let data = {
                            source_name:this.form.dataName,
                            driver_class_name:this.form.dataSou,
                            data_name:this.form.dataBank,
                            node_type:this.form.nodeType,
                            ip:this.form.IP,
                            port:this.form.port,
                            user_name: this.form.userName,
                            password: this.form.passWord,
                        };
                        InsertDataSource(data)
                            .then( res =>{
                                this.$message({
                                    message: '恭喜，添加成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'dataSource'})
                            })
                            .catch(res=>{
                                this.$message.error('出错了.');
                            })
                    }
                }
            })
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
