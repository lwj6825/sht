<template>
    <div class="content" ref='content'>
        <div class="msg">
            <p class="title">基本信息</p>
            <div class="section">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px" :inline="true" >
                        <el-form-item label="台账名称" prop="tzName">
                            <el-input v-model="form.tzName"></el-input>
                        </el-form-item>
                    
                        <el-form-item label="所属区域">
                            <!--<el-select v-model="form.areaId" placeholder="请选择区域" @change="selectGet" :style="disabled ? {display: 'none'} : {display: 'block'}">
                                <el-option v-for="item in areaArr" :key="item.bootList[0].shop_booth_id" :label="item.name" :value="item.bootList[0].shop_booth_id">
                                </el-option>
                            </el-select>-->
                            <el-input v-model="areaName" readonly :style="disabled ? {display: 'block'} : {display: 'none'}"></el-input>
                        </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="role">
            <p class="title">默认字段</p>
            <div>
                <el-table  :data="tableData">
                    <el-table-column
                        prop="TYPE_NAME"
                        label="字段名称">
                    </el-table-column>
                    <el-table-column
                        prop="PROPERTY_NAME"
                        label="字段类型">
                    </el-table-column>
                    <el-table-column
                        prop="IS_SHOW"
                        label="是否展示">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.IS_SHOW" 
                            active-text="展示" inactive-text="隐藏"
                            active-value="1" inactive-value="0" @change="changeFun(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="IS_NEED"
                        label="是否必填">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.IS_NEED"
                            active-text="必填" inactive-text="非必填"
                            active-value="1" inactive-value="0" @change="changeFun2(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <p class="title">自定义字段</p>
            <div>
            <el-button type="primary" size="small" @click="addMsgFun">增加字段</el-button> 
                <el-table 
                :data="tableData2">
                    <el-table-column
                        prop="TYPE_NAME"
                        label="字段名称">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入内容" size="mini" v-model="scope.row.TYPE_NAME" clearable>
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="PROPERTY_TYPE"
                        width="200"
                        label="字段类型">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.PROPERTY_TYPE" placeholder="请选择字段类型">
                                <el-option v-for="item in selectTypeArr" :key="item.property_type" :label="item.property_name" :value="item.property_type">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="IS_SHOW"
                        label="是否展示">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.IS_SHOW"
                            active-text="展示" inactive-text="隐藏"
                            active-value="1" inactive-value="0" @change="changeFun3(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="IS_NEED"
                        label="是否填项">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.IS_NEED"
                            active-text="必填" inactive-text="非必填"
                            active-value="1" inactive-value="0" @change="changeFun4(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteUserdefineFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-button class="save-btn btn" type="primary" @click="submitForm('form')">保存</el-button>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js'
import {GetArea,GetUpdateTz,IsProperty,SaveTzUserdefine,IsUserdefine,DeleteUserdefine} from '../../js/settings/settings.js';
export default {
    name: 'editSaleTz',
    data(){
        return{
            form: {
                tzName: '',
                areaId: ''
            },
            areaName: '',
            activeNames: ['1'],
            tableData: [],
            tableData2: [],
            page: 1,
            cols: 15,
            areaArr: [],
            tabHeight: 0,
            tabHeight2: 0,
            disabled: false,
            msgStr: '',
            rules: {
                tzName: [
                    { required: true, message: '请输入台账名称', trigger: 'blur' },
                ],
            },
            userId: '',
            selectTypeArr: [
                {
                    property_type: 'text',
                    property_name: '文本类型'
                },
                {
                    property_type: 'date',
                    property_name: '日期类型'
                },
                {
                    property_type: 'number',
                    property_name: '数字类型'
                },
                {
                    property_type: 'img',
                    property_name: '图片类型'
                },
            ],
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    mounted() {
        console.log(this.$route.params)
        this.tabHeight = this.$refs.content.offsetHeight - 180 - 100
        if(this.$route.params){
            this.disabled = true
            this.form.tzName = this.$route.params.tz_name
            this.form.areaId = this.$route.params.shop_booth_id 
            this.areaName = this.$route.params.booth_name 
            // console.log(this.form.areaId)
            if(this.form.areaId != ''){
                this.getUpdateFun()
            }
            // this.selectGet()
        }
        this.getAreaFun()
    },
    updated() {
        // this.tabHeight = this.$refs.content.offsetHeight - 180 - 90 - 140
    },
    methods: {
        deleteUserdefineFun(ele){
            console.log(ele)
            let obj = {
                id: ele.ID
            }
            DeleteUserdefine(obj)
                .then(res => {
                    console.log(res)
                    if (res.result == true) {
                        this.getUpdateFun()
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addMsgFun(){
            let obj = {
                TYPE_NAME: '',
                PROPERTY_TYPE: '',
                IS_SHOW: '1',
                IS_NEED: '1',
            }
            this.tableData2.unshift(obj)
        },
        selectGet(val){
            // console.log(val);
            let obj = {};
            obj = this.areaArr.find((item)=>{
                return item.bootList[0].shop_booth_id === val; //筛选出匹配数据
            });
            this.areaName = obj.name
        },
        getAreaFun(){
            let obj = {
                page: this.page,
                cols: this.cols,
                total: "",
                userId: this.userId,
                name: "",
                boothName: ""
            }
            GetArea(obj)
                .then(res => {
                    this.areaArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })

        },
        getUpdateFun(){
            let obj = {
                userId: this.userId,
                tz_type: "2",
                shop_booth_id: this.form.areaId
            }
            GetUpdateTz(obj)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.tzList
                    this.tableData2 = res.data.tzUserdefineList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun(ele){
            let obj = {
                id: ele.ID,
                is_show: ele.IS_SHOW
            }
            IsProperty(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun2(ele){
            let obj = {
                id: ele.ID,
                is_need: ele.IS_NEED
            }
            IsProperty(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun3(ele){
            console.log(ele)
            let obj = {
                id: ele.ID,
                is_show: ele.IS_SHOW
            }
            IsUserdefine(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        changeFun4(ele){
            let obj = {
                id: ele.ID,
                is_need: ele.IS_NEED
            }
            IsUserdefine(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
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
        saveFun(){
            let str = ''
            this.tableData2.forEach(v => {
                str += v.TYPE_NAME + ',' + v.PROPERTY_TYPE + ',' + v.IS_SHOW + ',' + v.IS_NEED + '∷'
            })
            console.log(str)
            let obj = {
                userId: this.userId,
                shop_booth_id: this.form.areaId,
                booth_name: this.areaName,
                tz_type: "2",
                tz_name: this.form.tzName,
                tz_value: str
            }
            console.log(obj)
            SaveTzUserdefine(obj)
                .then(res => {
                    console.log(res)
                    if (res.result == true) {
                        this.$router.push({path:'standingBookMsg'});
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
    }
}
</script>

<style scoped lang="less">
    .content{
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        background: #fff;
        .title{
            margin: 10px 0;
            line-height: 40px;
            padding-left: 20px;
        }
        .section{
            padding-left: 80px;
            padding-bottom: 40px;
            >span{
                margin-right: 10px;
            }
            .el-input,.el-select{
                width: 220px;
            }
        }
        .save-btn{
            margin-top: 30px;
        }
        .msg{
            margin: 10px;
            background: #f2f2f2;
        }
        .role{
            margin: 0 20px;
            overflow: auto;
        }
        .btn{
            margin-left: 400px;
        }
        .myinput{
            width: 200px;
            height: 50px;
        }
    }
    .el-collapse-item__content{
        padding-bottom: 0;
    }
</style>