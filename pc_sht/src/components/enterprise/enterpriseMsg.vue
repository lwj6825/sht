<template>
    <div class="content enterpriseMsg">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px" size="mini">
                    <el-form-item label="企业名称">
                        <el-input class="fill" v-model="form.name" clearable placeholder="请输入"></el-input> 
                    </el-form-item>
                    <el-form-item label="企业类型" v-if="account != 'cpjw'">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="餐饮" value="餐饮"></el-option>
                            <el-option label="超市" value="超市"></el-option>
                            <el-option label="批发市场" value="批发市场"></el-option>
                            <el-option label="零售市场" value="零售市场"></el-option>
                        </el-select>
                    </el-form-item><!--
                    <el-form-item label="监管机构">
                        <el-select v-model="form.supervise" filterable clearable placeholder="请选择" :disabled="roleId == 40">
                            <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item label="状态">
                        <el-select v-model="form.node_state" clearable placeholder="请选择">
                            <el-option  label="开启" value="1"></el-option>
                            <el-option  label="关闭" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校类别" v-if="account == 'cpjw'">
                        <el-select v-model="form.category" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in categoryArr" :key="index" :label="item.tag_name" :value="item.tag_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校属性" v-if="account == 'cpjw'">
                        <el-select v-model="form.attribute" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in attributeArr" :key="index" :label="item.tag_name" :value="item.tag_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业规模" v-if="userType == 5">
                        <el-select v-model="form.scale" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in scaleArr" :key="index" :label="item.tag_name" :value="item.tag_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="所属区域">
                        <el-select v-model="form.region" filterable clearable placeholder="请选择">
                            <el-option  label="已上报" value="1"></el-option>
                            <el-option  label="未上报" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    -->
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button @click="clearFun"style="margin-left: 10px;">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部企业</p>
                <div><!--
                    <el-button type="primary" size="medium" class="new-add" @click="addFun">新增企业</el-button>-->
                </div>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="node_name" label="企业名称"></el-table-column>
                    <el-table-column prop="node_type" label="企业类型" v-if="account != 'cpjw'"></el-table-column>
                    <el-table-column prop="leibie" label="学校类别" v-if="account == 'cpjw'"></el-table-column>
                    <el-table-column prop="shuxing" label="学校属性" v-if="account == 'cpjw'"></el-table-column>
                    <!--
                    <el-table-column prop="sjjgjg" label="监管机构"></el-table-column>
                    <el-table-column prop="district_name" label="所属区域"></el-table-column>-->
                    <el-table-column prop="node_state" label="状态">
                        <template slot-scope="scope">
                            <p v-if="scope.row.node_state == 1">开启</p>
                            <p v-if="scope.row.node_state == 2">关闭</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button><!--
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>    
        </div>
        <!--查看-->
        <div class="password" v-if="isView">
            <div class="text">
                <div class="box-title">
                    <p class="tit">查看</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="msg">
                    <div class="tit">企业名称</div>
                    <div class="item">{{viewOjb.node_name}}</div>
                </div>
                <div class="msg">
                    <div class="tit">营业执照号</div>
                    <div class="item">{{viewOjb.licence_no ? viewOjb.licence_no : '无'}}</div>
                </div>
                <div class="msg">
                    <div class="tit">联系人名称</div>
                    <div class="item">{{viewOjb.legal_represent}}</div>
                </div>
                <div class="msg">
                    <div class="tit">联系电话</div>
                    <div class="item">{{viewOjb.tel}}</div>
                </div>
                <div class="msg">
                    <div class="tit">联系地址</div>
                    <div class="item">{{viewOjb.addr}}</div>
                </div>
                <div class="msg">
                    <div class="tit">企业类型</div>
                    <div class="item">{{viewOjb.node_type}}</div>
                </div>
                <div class="msg">
                    <div class="tit">监管机构</div>
                    <div class="item">{{viewOjb.sjjgjg ? viewOjb.sjjgjg : '无'}}</div>
                </div>
                <div class="btn">
                    <el-button @click="closeFun" style="margin-left: 420px;">取消</el-button>
                </div>
            </div>
        </div>
        <!--新增编辑-->
        <div class="password" v-if="isShow">
            <div class="text list">
                <div class="box-title">
                    <p class="tit">{{prompt}}企业</p>
                    <p class="iconfont icon-close close" @click="closeFun2"></p>
                </div>
                <el-form ref="form2" :model="form2" label-width="120px" class="form" :rules="rules">
                    <el-form-item label="企业名称" prop="node_name">
                        <el-input v-model="form2.node_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="企业ID" prop="node_code">
                        <el-input v-model="form2.node_code" clearable @input="form2.node_code=form2.node_code.replace(/[^\d]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照号" prop="licence_no">
                        <el-input v-model="form2.licence_no" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系人名称" prop="legal_represent">
                        <el-input v-model="form2.legal_represent" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="form2.tel" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址" prop="addr">
                        <el-input v-model="form2.addr" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="集团节点代码">
                        <el-input v-model="form2.parent" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="X坐标" prop="x_coordinate">
                        <el-input v-model="form2.x_coordinate" clearable @input="form2.x_coordinate=form2.x_coordinate.replace(/[^\d]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="Y坐标" prop="y_coordinate">
                        <el-input v-model="form2.y_coordinate" clearable @input="form2.y_coordinate=form2.y_coordinate.replace(/[^\d]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="企业类型" prop="node_type">
                        <el-select v-model="form2.node_type" filterable clearable placeholder="请选择">
                            <el-option label="餐饮" value="餐饮"></el-option>
                            <el-option label="超市" value="超市"></el-option>
                            <el-option label="批发市场" value="批发市场"></el-option>
                            <el-option label="零售市场" value="零售市场"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监管机构">
                        <el-select v-model="form2.sjjgjg" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in superviseArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" v-if="ids">
                        <el-switch v-model="form2.node_state" active-text="开启" inactive-text="关闭"
                            active-value="1" inactive-value="2">
                        </el-switch>
                    </el-form-item>
                    <el-form-item style="margin-left: 400px;">
                        <el-button type="primary" @click="submitForm('form2')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {GetNodeJgInfoGroupForJg, GetJgjgByNodeid, InsertNodeJgInfo, UpdateNodeJgInfo, DeleteNodeJgInfo} from '../../js/enterprise/enterprise.js'
import {QueryNodeTagTree} from '../../js/retrieval/retrieval.js'
export default {
    name:"auditJournal",
    data(){
        return{
            form: {
                name: '',
                types: '',
                states: '',
                account: '',
                region: '',
                supervise: '',
                node_state: '',
                category: '',
                attribute: '',
                scale: '',
            },
            attributeArr: [],
            categoryArr: [],
            scaleArr: [],
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            node_ids: '',
            userType: '',
            superviseArr: [],
            isView: false,
            viewOjb: {},
            isShow: false, // 新增编辑
            prompt: '新增',
            form2: {
                node_code: '',
                node_name: '',
                licence_no: '',
                legal_represent: '',
                tel: '',
                addr: '',
                parent: '',
                node_type: '',
                sjjgjg: '',
                x_coordinate: '',
                y_coordinate: '',
                node_state: '',
            },
            ids: '',
            sjjgjgArr: [],
            rules: {
                node_name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                node_code: [
                    { required: true, message: '请输入企业ID', trigger: 'blur' },
                    {validator:function(rule,value,callback){
                        if(typeof(value) == 'number'){
                            if(JSON.stringify(value).length != 9){
                                callback(new Error("请输入9位企业ID"));
                            }else{
                                callback();
                            }
                        }else{
                            if(value.length != 9){
                                callback(new Error("请输入9位企业ID"));
                            }else{
                                callback();
                            }
                        }
                    }, trigger: 'blur'},
                ],
                licence_no: [
                    { required: true, message: '请输入营业执照号', trigger: 'blur' }
                ],
                legal_represent: [
                    { required: true, message: '请输入联系人名称', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ],
                addr: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' }
                ],
                node_type: [
                    { required: true, message: '请选择企业类型', trigger: 'blur' }
                ],
                x_coordinate: [
                    { required: true, message: '请输入X坐标', trigger: 'blur' },
                ],
                y_coordinate: [
                    { required: true, message: '请输入Y坐标', trigger: 'blur' },
                ]
            },
            roleId: '',
            account: '',
            loading: true,
        }
    },
    mounted(){
        this.account = localStorage.getItem('account')
        this.node_ids = localStorage.getItem('loginId')
        this.userType = localStorage.getItem('userType')
        this.roleId = localStorage.getItem('roleId')
        if(this.roleId == 40){
            let arr = JSON.parse(localStorage.getItem('booth_List'))
            let obj = {
                jgjg: arr[0].BOOTH_NAME
            }
            this.superviseArr.push(obj)
            this.form.supervise = this.superviseArr[0].jgjg
        }else{
            this.getGetJgjgByNodeid()
        }
        this.getDataFun()
        this.getQueryNodeTagTreeFun()
    },
    methods: {
        getQueryNodeTagTreeFun(){
            let str = 'tag_parent_id=27'
            QueryNodeTagTree(str)
                .then(res => {
                    res.data.forEach(val => {
                        if(val.tag_name == "学校类别"){
                            this.categoryArr = val.childList
                        }
                        if(val.tag_name == "学校属性"){
                            this.attributeArr = val.childList
                        }
                    })
                })
                .catch(res => {
                    console.log(res)
                })
            if(this.userType == 5){
                QueryNodeTagTree('tag_parent_id=-1')
                    .then(res => {
                        res.data.forEach(val => {
                            if(val.tag_name == "企业规模"){
                                this.scaleArr = val.childList
                            }
                        })
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
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
            if(this.ids){
                // 编辑
                let params = {
                    id: this.ids,
                    node_id: this.form2.node_code,
                    node_name: this.form2.node_name,
                    addr: this.form2.addr,
                    licence_no: this.form2.licence_no,
                    legal_represent: this.form2.legal_represent,
                    tel: this.form2.tel,
                    parent: this.form2.parent,
                    node_type: this.form2.node_type,
                    sjjgjg: this.form2.sjjgjg,
                    x_coordinate: this.form2.x_coordinate,
                    y_coordinate: this.form2.y_coordinate,
                    district_code: this.node_ids,
                    node_state: this.form2.node_state,
                }
                UpdateNodeJgInfo(params)
                    .then(res => {
                        if (res.result == true) {
                            this.closeFun2()
                            this.$message.success(res.message);
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }else{
                // 新增
                let params = {
                    node_id: this.form2.node_code,
                    node_name: this.form2.node_name,
                    addr: this.form2.addr,
                    licence_no: this.form2.licence_no,
                    legal_represent: this.form2.legal_represent,
                    tel: this.form2.tel,
                    parent: this.form2.parent,
                    node_type: this.form2.node_type,
                    sjjgjg: this.form2.sjjgjg,
                    x_coordinate: this.form2.x_coordinate,
                    y_coordinate: this.form2.y_coordinate,
                    district_code: this.node_ids,
                }
                InsertNodeJgInfo(params)
                    .then(res => {
                        if (res.result == true) {
                            this.closeFun2()
                            this.$message.success(res.message);
                            this.page = 1
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        }, 
        closeFun2(){
            this.isShow = false
            this.form2 = {
                node_id: '',
                node_name: '',
                licence_no: '',
                legal_represent: '',
                tel: '',
                addr: '',
                parent: '',
                node_type: '',
                sjjgjg: '',
                x_coordinate: '',
                y_coordinate: '',
                node_state: '',
            }
            this.ids = ''
        },
        closeFun(){
            this.isView = false
            this.viewOjb = {}
        },
        getGetJgjgByNodeid(){
            let str = 'node_id=' + this.node_ids
            GetJgjgByNodeid(str)
                .then(res => {
                    this.superviseArr = res.data.list
                    this.superviseArr.unshift({jgjg: '无'})
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        getDataFun(){
            this.loading = true
            let str = ''
            if(this.form.category && this.form.attribute && this.form.scale){
                str += this.form.category + ',' + this.form.attribute + ',' + this.form.scale
            }else if(this.form.category && !this.form.attribute && !this.form.scale){
                str += this.form.category
            }else if(this.form.category && this.form.attribute && !this.form.scale){
                str += this.form.category + ',' + this.form.attribute
            }else if(this.form.category && !this.form.attribute && this.form.scale){
                str += this.form.category + ',' + this.form.scale
            }else if(!this.form.category && this.form.attribute && !this.form.scale){
                str += this.form.attribute
            }else if(!this.form.category && this.form.attribute && this.form.scale){
                str += this.form.attribute + ',' + this.form.scale
            }else if(!this.form.category && !this.form.attribute && this.form.scale){
                str += this.form.scale
            }
            let params = {
                node_id: this.node_ids,
                usertype: this.userType,
                sjjgjg: this.form.supervise,
                page: this.page,
                cols: this.cols,
                node_type: this.form.types == 0 ? '' : this.form.types,
                node_name: this.form.name,
                node_state: this.form.node_state,
                tag_id: str
            }
            GetNodeJgInfoGroupForJg(params)
                .then(res => {
                    this.loading = false
                    res.data.list.forEach(val => {
                        if(val.tag_name){
                            let arr = val.tag_name.split(',');
                            if(arr[0] != '公立' && arr[0] != '民办'){
                                val.leibie = arr[0];
                                val.shuxing = arr[1];
                            }else{
                                val.leibie = arr[1];
                                val.shuxing = arr[0];
                            }
                        }
                    })
                    this.tableData = res.data.list
                    this.num = res.data.total
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        addFun(){
            this.prompt = '新增'
            this.isShow = true
        },
        editFun(ele){
            this.prompt = '编辑'
            this.ids = ele.id
            this.form2 = {
                node_code: ele.node_id,
                node_name: ele.node_name,
                licence_no: ele.licence_no,
                legal_represent: ele.legal_represent,
                tel: ele.tel,
                addr: ele.addr,
                parent: ele.parent,
                node_type: ele.node_type,
                sjjgjg: ele.sjjgjg,
                x_coordinate: ele.x_coordinate,
                y_coordinate: ele.y_coordinate,
                node_state: ele.node_state
            }
            this.isShow = true
        },
        deleteFun(ele){
            let str = 'node_id=' + ele.node_id + '&id=' + ele.id
            DeleteNodeJgInfo(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('删除成功');
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        viewFun(ele){
            this.viewOjb = ele
            this.isView = true
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                name: '',
                types: '',
                states: '',
                account: '',
                region: '',
                supervise: '',
                category: '',
                attribute: '',
                scale: '',
            }
            this.form.supervise = this.superviseArr[0].jgjg
            this.page = 1
            this.getDataFun()
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
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .searchs{
            padding: 10px 0;
            background: #fff;
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
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 10px;
                }
            }
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            position: relative;
            background: #fff;
            .import{
                color: #409EFF;
                background: #fff;
            }
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
        .password{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -170px;
                margin-left: -300px;
                width: 600px;
                height: 340px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                    .close{
                        float: right;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
                .msg{
                    display: flex;
                    margin: 10px 20px;
                    font-size: 14px;
                    .tit{
                        margin-right: 20px;
                        width: 80px;
                        text-align: right;
                    }
                }
                .btn{
                    margin-top: 30px;
                    margin-left: 110px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .password .list{
            margin-top: -350px;
            height: 700px;
            .el-form{
                margin-top: 10px;
            }
            .el-select, .el-input{
                width: 400px;
            }
        }
    }
</style>
<style lang="less">
    .enterpriseMsg{
        .el-table td{
            padding: 3px 0;
        }
    }
</style>
