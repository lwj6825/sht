<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="功能名称:">
                <el-input class="label-width" v-model="form.funName"></el-input>
            </el-form-item>
            <el-form-item label="别名:">
                <el-input class="label-width" v-model="form.otherName"></el-input>
            </el-form-item>
            <el-form-item label="功能地址:">
                <el-input class="label-width" v-model="form.funAddr"></el-input>
            </el-form-item>            
            <el-form-item label="父节点:">
                <el-select class="label-width" v-model="form.parentNode" placeholder="请选择">                    
                    <el-option v-for="item in parentNodeOptions" :key="item.functionId" :label="item.functionName" :value="item.functionId"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="级别:">
                <el-select class="label-width" v-model="form.level" placeholder="请选择">
                    <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别:">
                <el-radio v-model="form.type" label="1">操作</el-radio>
                <el-radio v-model="form.type" label="2">行为</el-radio>
            </el-form-item>
            <el-form-item label="排序字段:">
                <el-input class="label-width" v-model="form.sortName"></el-input>
            </el-form-item>
            <el-form-item label="节点:">
                <el-input class="label-width" v-model="form.node"></el-input>
            </el-form-item>     
            <el-form-item label="二级菜单类型:">
                <el-input class="label-width" v-model="form.childrentype"></el-input>
            </el-form-item>     
            <el-form-item label="二级菜单标题:">
                <el-input class="label-width" v-model="form.nav_title"></el-input>
            </el-form-item>           
        </el-form>
        <el-button class="save-btn" type="primary" @click="save()">保存</el-button>
    </div>
</template>

<script>
import Bus from '../common/bus.js'
import {getAllFunUrlList,getAllParentNode,addFun,editItem} from '../../js/fun/fun.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            form:{
                funName:'',
                otherName:'',
                funAddr:'',
                parentNode:'',
                level:'',
                type:'1',
                sortName:'',
                functionId:'',
                node: '',
                childrentype: '',
                nav_title: '',
            },
            parentId:'',
            parentNodeOptions: [],
            levelOptions: [
                {
                    value: '1',
                    label: '1'
                }, 
                {
                    value: '2',
                    label: '2'
                },
                {
                    value: '3',
                    label: '3'
                },
                {
                    value: '4',
                    label: '4'
                },
                
            ],
        }
    },
    created(){
        getAllParentNode()
            .then(res => {
                localStorage.setItem('parentNodeOptions',JSON.stringify(res))
            })
            .catch(res => {
                console.log(res)
            })
    },
    mounted(){
        // console.log(this.$route.params)
        this.parentNodeOptions = JSON.parse(localStorage.getItem('parentNodeOptions'));
        if(JSON.stringify(this.$route.params) != "{}"){
            this.isEdit = true;
            this.form.funName = this.$route.params.functionName;
            this.form.otherName = this.$route.params.describe;
            this.form.funAddr = this.$route.params.functionUrl;            
            this.form.parentNode = this.$route.params.functionParent;
            this.parentId = this.$route.params.functionParentId;
            this.form.level = this.$route.params.level;
            this.form.type = this.$route.params.type=="操作"?'1':'2';
            this.form.sortName = this.$route.params.sort;
            this.form.functionId = this.$route.params.functionId;
            this.form.node = this.$route.params.node;
            this.form.childrentype = this.$route.params.childrentype;
            this.form.nav_title = this.$route.params.nav_title;
        }       
    },
    methods:{
        save(){
            if(this.isEdit){   
                let id = ''; 
                if(parseFloat(this.form.parentNode).toString() == "NaN"){
                    id = this.parentId
                }else{
                    id = this.form.parentNode
                }
                let editData = {                       
                    functionId:this.form.functionId,  //此功能ID
                    functionName:this.form.funName,
                    describe:this.form.otherName,
                    functionUrl:this.form.funAddr,
                    functionParentId:id,
                    level:this.form.level,                                       
                    type:this.form.type,
                    sort:this.form.sortName,
                    node:this.form.node,
                    childrentype:this.form.childrentype,
                    nav_title:this.form.nav_title,                  
                }
                editItem(editData)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.$router.push({path:'funManagement'})
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        this.$message.error('出错了.');
                    })
            }else{  
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
