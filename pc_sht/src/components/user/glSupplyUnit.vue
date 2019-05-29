<template>
    <div class="content glSupplyUnit">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="供货单位名称" prop="node_name">
                        <el-input v-model="form.name" clearable placeholder="请输入供货单位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form.node_type" placeholder="请选择">
                            <el-option v-for="(item,index) in types" :key="index" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchFun" class="search-btn white-bth">搜索</el-button>
                        <el-button class="file-btn no-btn">导出</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">供货单位列表</p>
                <div>
                    <el-button type="primary" @click="editFun()" class="blue-bth">新增供货单位</el-button>
                </div>
            </div>
            <div class="tables" >
                <el-table  :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="node_id" label="节点编码"> </el-table-column>
                    <el-table-column prop="node_name" label="供货单位名称"></el-table-column>
                    <el-table-column prop="legal_represent" label="法人"> </el-table-column>
                    <el-table-column prop="area_name" label="经营地址"> 
                        <template slot-scope="scope">
                            {{scope.row.area_name + scope.row.addr}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="tel" label="联系电话"> </el-table-column>
                    <el-table-column prop="typename" label="节点类型"> </el-table-column>
                    <el-table-column prop="info_update_time" label="创建日期"> </el-table-column>
                    <el-table-column label="操作" width='100'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <div class="box" v-if="isShow">
            <div class="form">
                <div class="title">
                    <p class="tit">新增供货单位</p>
                    <p class="close" @click="closeForm">X</p>
                </div>
                <el-form ref="form2" :rules="rules" :model="form2" label-width="120px">
                    <el-form-item label="节点编码" prop="node_id">
                        <el-input v-model="form2.node_id" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供货单位名称" prop="name">
                        <el-input v-model="form2.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="单位简称">
                        <el-input v-model="form2.unitName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="传真">
                        <el-input v-model="form2.fax" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            v-model="form2.time"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="法人">
                        <el-input v-model="form2.person" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="经营地址">
                        <el-cascader :options="addrOptions" v-model="form2.areaName" placeholder="省/市/县" class="address" clearable :props="props" change-on-select></el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form2.addr" placeholder="详细地址" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="form2.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="节点类型">
                        <el-select v-model="form2.node_type" placeholder="请选择" @change="selectChange" clearable>
                            <el-option v-for="(item,index) in types" :key="index" :value="item.code" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form2')">保存</el-button>
                        <el-button @click="resetForm('form2')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {getAddr,QuerySupplier,InsertSupplier,UpdateSupplier,DeleteSupplier,FindSupplier} from '../../js/user/user.js';
export default {
    name:"glSupplyUnit",
    data() {
        return {
            form: {
                name: '',
                node_type: '',
            },
            form2: {
                node_id: '',
                name: '',
                person: '',
                areaName: [],
                addr: '',
                addr: '',
                phone: '',
                node_type: '',
                unitName: '',
                fax: '',
                time: '',
            },
            types: [
                {code: '0001', name: '屠宰场'},
                {code: '0002', name: '批发市场'},
                {code: '1002', name: '配送中心'},
                {code: '0006', name: '其他'},
            ],
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            isShow: false,
            addrOptions: [],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            rules: {
                node_id: [
                    { required: true, message: '请输入节点编码', trigger: 'blur' },
                    { min: 9, max: 9, message: '长度在9个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入供货单位名称', trigger: 'blur' }
                ],
            },
            is_id: '',
            typeName: '',
        }
    },
    mounted() {
        this.getAddrList()
        this.getDataFun()
    },
    methods: {
        selectChange(val){
            this.types.forEach(ele => {
                if(val == ele.code){
                    this.typeName = ele.name
                }
            })
        },
        saveFun(){
            let originArr = [];
            this.addrOptions.forEach(ele => {
                if(ele.szm == this.form2.areaName[0]){
                    originArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.form2.areaName[1]){
                            originArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form2.areaName[2]){
                                    originArr.push(ele.caption)                              
                                }
                            })
                        }
                    })
                }
            })
            if(!this.is_id){
                let obj = {
                    node_id: this.form2.node_id,
                    node_name: this.form2.name,
                    shortname: this.form2.unitName,
                    legal_represent: this.form2.person,
                    tel: this.form2.phone,
                    fax: this.form2.fax,
                    type: this.form2.node_type,
                    area_name: originArr.join(''),
                    addr: this.form2.addr,
                    info_update_time: this.form2.time,
                    area_id: this.form2.areaName[this.form2.areaName.length -1],
                    typename: this.typeName,
                }
                InsertSupplier(obj)
                    .then(res => {
                         if (res.result == true) {
                            this.$message.success(res.message);
                            this.closeForm()
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{
                let obj = {
                    node_id: this.form2.node_id,
                    node_name: this.form2.name,
                    shortname: this.form2.unitName,
                    legal_represent: this.form2.person,
                    tel: this.form2.phone,
                    fax: this.form2.fax,
                    type: this.form2.node_type,
                    area_name: originArr.join(''),
                    addr: this.form2.addr,
                    info_update_time: this.form2.time,
                    area_id: this.form2.areaName[this.form2.areaName.length -1],
                    typename: this.typeName,
                    id: this.is_id,
                }
                UpdateSupplier(obj)
                    .then(res => {
                         if (res.result == true) {
                            this.$message.success(res.message);
                            this.closeForm()
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.closeForm()
            this.$refs[formName].resetFields();
        },
        closeForm(){
            this.isShow = false
            this.form2 = {
                node_id: '',
                name: '',
                person: '',
                areaName: [],
                addr: '',
                addr: '',
                phone: '',
                node_type: '',
                unitName: '',
                fax: '',
                time: '',
            }
        },
        getDataFun(){
            let obj = {
                page: this.page,
                cols: this.cols,
                type: this.form.node_type,
                node_name: this.form.name
            }
            QuerySupplier(obj)
                .then(res => {
                    this.num = res.data.condition.total
                    this.tableData = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        deleteFun(ele){
            let obj = {
                id: ele.id
            }
            DeleteSupplier(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        editFun(ele){
            this.isShow = true
            if(ele){
                console.log(ele)
                let obj = {
                    id: ele.id
                }
                FindSupplier(obj)
                    .then(res => {
                        let data = res.data.dataList[0]
                        this.is_id = data.id
                        this.form2.node_id = data.node_id
                        this.form2.name = data.node_name
                        this.form2.person = data.legal_represent
                        this.form2.addr = data.addr
                        this.form2.phone = data.tel
                        this.form2.node_type = data.type
                        this.form2.unitName = data.shortname
                        this.form2.fax = data.fax
                        this.form2.time = data.info_update_time
                        this.typeName = data.typename
                        this.form2.node_type = data.type
                        let originArr = [],addrArr = [];
                        if(data.area_name){
                            let areaName = data.area_name
                            if(areaName.slice(0,3) == '北京市'){
                                this.addrOptions.forEach(ele => {
                                    addrArr.push('110000')
                                    ele.list.forEach(ele => {
                                        if(areaName.slice(3,6) == ele.caption){
                                        addrArr.push(ele.szm)
                                        ele.list.forEach(ele => {
                                            if(areaName.slice(6) == ele.caption){
                                            addrArr.push(ele.szm)                              
                                            }
                                        })
                                        }
                                    })
                                })
                                this.form2.areaName = addrArr.slice(0,3)
                            }else if(areaName.slice(0,3) == '上海市'){
                                this.addrOptions.forEach(ele => {
                                    addrArr.push('310000')
                                    ele.list.forEach(ele => {
                                        if(areaName.slice(3,6) == ele.caption){
                                        addrArr.push(ele.szm)
                                        ele.list.forEach(ele => {
                                            // console.log(ele)
                                            if(areaName.slice(6) == ele.caption){
                                            addrArr.push(ele.szm)                              
                                            }
                                        })
                                        }
                                    })
                                })
                                this.form2.areaName = addrArr.slice(0,3)
                            }else{
                                if(data.area_id){
                                    if(data.area_id.slice(4,6) != '00'){
                                        originArr.unshift(data.area_id);
                                    }
                                    if(data.area_id.slice(2,4) != '00'){
                                        originArr.unshift(data.area_id.slice(0,4)+'00');
                                    }
                                    if(data.area_id.slice(0,2) != '00'){
                                        originArr.unshift(data.area_id.slice(0,2)+'0000');
                                    }
                                }
                                this.form2.areaName = originArr
                            }
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
                
            }
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                name: '',
                node_type: '',
            }
            this.page = 1
            this.getDataFun()
        },
        getAddrList(){//获取地区列表
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .search{
            .file-btn{
                color: #777;
                background: #fff;
                border-color: #eaeaea;
            }
            .search-btn{
                color: #409EFF;
                background: #fff;
            }
            .clear-content{
                margin-left: 10px;
                cursor: pointer;
                color: #999999;
                font-size: 14px;
            }
            .el-form{
                margin-left: 20px;
                width: 1000px;
            }
            .el-input,.el-date-picker,.el-select{
                width: 160px;
            }
            .unfold{
                text-align: center;
                font-size: 14px;
                color: #409EFF;
                cursor: pointer;
            }
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .searchs{
            padding: 10px 0;
            background: #fff;
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
                div{
                    display: flex;
                    width: 300px;
                    justify-content: flex-end;
                }
            }
        }
        .box{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .form{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -350px;
                margin-left: -300px;
                width: 600px;
                height: 700px;
                background: #fff;
                .title{
                    display: flex;
                    margin: 0 20px;
                    height: 50px;
                    border-bottom: 1px solid #ccc;
                    line-height: 50px;
                    .tit{
                        flex: 1;
                        font-size: 14px;
                    }
                    .close{
                        width: 50px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .el-form{
                    margin: 20px 50px;
                    .el-input,.el-cascader,.el-select{
                        width: 300px;
                    }
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
