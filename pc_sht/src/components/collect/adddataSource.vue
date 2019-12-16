<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="数据源名称:">
                <el-input class="label-width" v-model="form.dataName"></el-input>
            </el-form-item>
            <el-form-item label="数据源类型:">
                <el-input class="label-width" v-model="form.dataType"></el-input>
            </el-form-item>
            <el-form-item label="数据库名称:">
                <el-input class="label-width" v-model="form.dataBank"></el-input>
            </el-form-item>    
            <el-form-item label="节点类型:">
                <el-input class="label-width" v-model="form.nodeType"></el-input>
            </el-form-item>
            <el-form-item label="IP地址:">
                <el-input class="label-width" v-model="form.IP"></el-input>
            </el-form-item>     
            <el-form-item label="端口:">
                <el-input class="label-width" v-model="form.port"></el-input>
            </el-form-item>     
            <el-form-item label="用户名:">
                <el-input class="label-width" v-model="form.userName"></el-input>
            </el-form-item>  
            <el-form-item label="密码:">
                <el-input class="label-width" v-model="form.passWord"></el-input>
            </el-form-item>         
        </el-form>
        <el-button class="save-btn" type="primary" @click="save()">保存</el-button>
    </div>
</template>

<script>
import Bus from '../common/bus.js'
import {getAllFunUrlList,getAllParentNode,addFun,editItem} from '../../js/fun/fun.js'
import {GetAllDataSource,UpdateDataSource,QueryDataSourceType,InsertDataSource,QueryQuartzJob,QueryQuartzState,QuartzManagerNew} from '../../js/collect/collect.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            form:{
                dataName:'',
                dataType:'',
                dataBank:'',
                nodeType:'',
                IP:'',
                port:'',
                userName:'',
                passWord:''
            }
        }
    },
    mounted(){
    
    },
    methods:{
        save(){
                let data = {
                    functionName:this.form.funName,
                    describe:this.form.otherName,
                    functionUrl:this.form.funAddr,
                    functionParentId:this.form.parentNode,
                    level:this.form.level,
                    type:this.form.type,
                    sort:this.form.sortName,
                    node: this.form.node,
                    childrentype: this.form.childrentype,
                    nav_title: this.form.nav_title,
                };
                addFun(data)
                    .then( res =>{
                        this.$message({
                            message: '恭喜，添加成功',
                            type: 'success'
                        });
                        this.$router.push({path:'funManagement'})
                    })
                    .catch(res=>{
                        console.log(res.message)
                        this.$message.error('出错了.');
                    })
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding-left: 160px;
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
        width: 260px;
    }
</style>
