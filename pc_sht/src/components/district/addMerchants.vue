<template>
    <div class="contents addMerchants" ref='contents'>
        <el-tabs v-model="activeName">
            <el-tab-pane label="商户信息" name="first" :disabled="none">
                <div class="header">
                    <el-form :model="form" :rules="rules" ref="form" label-width="120px" >
                        <div class="account-cont">
                            <p class="msg-title">账号信息</p>
                            <el-row class="demo-autocomplete">
                                <el-col :span="6" style="margin-left: 0;">
                                    <el-form-item label="账号：" prop="userName">
                                        <el-input v-model="form.userName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="密码：" prop="password">
                                        <el-input v-model="form.password"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <!--<el-form-item label="角色" prop="role">
                                        <el-select v-model="form.role" placeholder="请选择角色">
                                            <el-option  v-for="item in jsList" :key="item.roleName" :label="item.roleName"  :value="item.roleName" ></el-option>
                                        </el-select>
                                    </el-form-item>-->
                                </el-col>
                            </el-row>
                            <el-row class="demo-autocomplete">
                                <el-col :span="6" style="margin-left: 0;">
                                    <el-form-item label="联系人：" prop="contact">
                                        <el-input v-model="form.contact"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <div class="msg">
                                        <el-form-item label="联系方式：" prop="telphone">
                                            <el-input v-model="form.telphone"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-checkbox-group  v-model="form.value">
                                                <el-checkbox label="1" name="type" value="1">是否向商户发送短信告知账号信息</el-checkbox>
                                            </el-checkbox-group>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="1">
                                    <!--<el-form-item>
                                        <el-checkbox-group  v-model="form.value">
                                            <el-checkbox label="1" name="type" value="1">是否向商户发送短信告知账号信息</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>-->
                                </el-col>
                            </el-row>
                        </div>
                        <div class="store-cont">
                            <p class="msg-title">商铺信息</p>
                            <div class="enterprise-info">
                                <div class="borders">
                                    <el-button type="primary" class="new-add" >添加商铺</el-button>
                                </div>
                                <div class="box">
                                    <div class="section-content">
                                        <el-form-item label="节点编码：" prop="node">
                                            <el-input v-model="form.node" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="商户编码：" prop="shangh">
                                            <el-input v-model="form.shangh" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="营业执照号：">
                                            <el-input v-model="form.licenceNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="身份证号：">
                                            <el-input v-model="form.regId"></el-input>
                                        </el-form-item>
                                        <el-form-item label="商户名称：" prop="nodeName" >
                                            <el-input v-model="form.nodeName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系人：" prop="name">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话：" prop="callphone">
                                            <el-input v-model="form.callphone"></el-input>
                                        </el-form-item>
                                        <el-form-item label="所在地区：" prop="areaName">
                                            <span>
                                                <el-cascader class="fill-input" :options="addrOptions" v-model="form.areaName" clearable
                                                :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
                                            </span>
                                        </el-form-item>
                                        <el-form-item label="地址：">
                                            <el-input v-model="form.addr"></el-input>
                                        </el-form-item>
                                        <el-form-item label="摊位号：">
                                            <el-input style="width: 260px;" v-model="form.stallNo" ></el-input>
                                        <span>&nbsp;&nbsp;例：1厅8排</span>
                                        </el-form-item>
                                        <el-form-item style="text-align: center;">
                                            <el-button type="primary" @click="submitForm('form')" >保存</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="供应商" name="second" :disabled="none1">
                <div>
                    <el-button type="primary" class="shop" @click="showFun" :style="dataArr[0].bindgys === '1' ? {display: 'none'} :  {display: 'block'} ">绑定供应商</el-button>
                    <p class="tit">{{tableData2.length > 0 ? '' : '暂无绑定供应商'}}</p>
                    <div class="gystab" v-if="show">
                        <div class="content">
                            <div class="title">
                                <p>绑定供应商</p><i class="el-icon-close" @click="closeFun"></i>
                            </div>
                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
                                <el-button type="primary" @click="searchGys">搜索</el-button>
                            </div>
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="320" style="width: 400px;"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="biz_name" label="供应商名称"></el-table-column>
                                <el-table-column prop="cellphone" label="联系电话"></el-table-column>
                            </el-table>
                            <el-pagination background @current-change="handleCurrentChange3" :current-page.sync="page2" :page-size="cols2"
                            layout="total, prev, pager, next" :total="num2"> </el-pagination>
                            <p style="margin: 10px 0;">
                                <el-button size="mini" @click="addSupplierFun">新增供应商</el-button>
                            </p>
                            <p style="text-align: center;">
                                <el-button type="primary" @click="bindGysFun">保存</el-button>
                            </p>
                        </div>
                    </div>
                    <el-table :data="tableData2" height="500" border style="margin-top: 10px;">
                        <el-table-column prop="licence_no" label="营业执照号"> </el-table-column>
                        <el-table-column prop="regId" label="身份证号"></el-table-column>
                        <el-table-column prop="biz_name" label="供应商名称"></el-table-column>
                        <el-table-column prop="concact_name" label="联系人"></el-table-column>
                    </el-table>
                    <el-pagination background class="pages" v-if="num != 0" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                        layout="total, prev, pager, next, jumper" :total="num">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品" name="third" :disabled="none2">
                <div id="shoop">
                    <p class="tit">{{tableData2.length > 0  ? '' : '暂无绑定商品'}}</p>
                    <!-- 进货 -->
                    <div class="gystab" v-if="show2">
                        <div class="content">
                            <div class="title">
                                <p>绑定商品</p><i class="el-icon-close" @click="closeFun"></i>
                            </div>
                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
                                <el-button type="primary" @click="searchJhFun">搜索</el-button>
                            </div>
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 400px;" height="320"
                            @selection-change="handleSelectionChange2">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="goods_Name" label="商品名称"></el-table-column>
                                <el-table-column prop="specifications" label="规格"></el-table-column>
                            </el-table>
                            <el-pagination v-if="num2" background @current-change="handleCurrentChange4" :current-page.sync="page2" :page-size="cols2"
                            layout="total, prev, pager, next" :total="num2"></el-pagination>
                            <p style="margin: 10px 0;">
                                <el-button size="mini" @click="addEntryFun">新增商品</el-button>
                            </p>
                            <p style="text-align: center;">
                                <el-button type="primary" @click="bindSpFun">保存</el-button>
                            </p>
                        </div>
                    </div>
                    <!-- 销售 -->
                    <div class="gystab" v-if="show3">
                        <div class="content">
                            <div class="title">
                                <p>绑定商品</p><i class="el-icon-close" @click="close2Fun"></i>
                            </div>
                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
                                <el-button type="primary" @click="searchXsFun">搜索</el-button>
                            </div>
                            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 400px;" height="320"
                            @selection-change="handleSelectionChange2">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="goods_Name" label="商品名称"></el-table-column>
                                <el-table-column prop="specifications" label="规格"></el-table-column>
                            </el-table>
                            <el-pagination v-if="num4" background @current-change="handleCurrentChange6" :current-page.sync="page4" :page-size="cols4"
                                layout="total, prev, pager, next" :total="num4"></el-pagination>
                            <p style="margin: 10px 0;">
                                <el-button size="mini" @click="addSellFun">新增商品</el-button>
                            </p>
                            <p style="text-align: center;">
                                <el-button type="primary" @click="bindSpFun2">保存</el-button>
                            </p>
                        </div>
                    </div>
                    <el-tabs  v-model="activeName2" type="card">
                        <el-tab-pane label="进货商品" name="entry">
                            <el-button type="primary" class="shop" @click="show2Fun" :style="dataArr[0].bindgys === '1' ? {display: 'none'} :  {display: 'block'} ">绑定商品</el-button>
                            <el-table :data="tableData2" border height='450' :header-cell-style="rowClass">
                                <el-table-column prop="GOODS_NAME" label="商品名称"> </el-table-column>
                                <el-table-column prop="GB_NAME" label="品种"></el-table-column>
                                <el-table-column prop="PRICE" label="价格"></el-table-column>
                                <el-table-column prop="SPECIFICATIONS" label="规格">
                                </el-table-column>
                                <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                            </el-table>
                            <el-pagination v-if="num" background class="pages" @current-change="handleCurrentChange2" :current-page.sync="page"
                            :page-size="cols" layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="销售商品" name="sell">
                            <el-button type="primary" class="shop" @click="show3Fun" :style="dataArr[0].bindgys === '1' ? {display: 'none'} :  {display: 'block'} ">绑定商品</el-button>
                            <el-table :data="tableData4" border height='450' :header-cell-style="rowClass">
                                <el-table-column prop="GOODS_NAME" label="商品名称"></el-table-column>
                                <el-table-column prop="GB_NAME" label="品种"></el-table-column>
                                <el-table-column prop="PRICE" label="价格"></el-table-column>
                                <el-table-column prop="SPECIFICATIONS" label="规格"></el-table-column>
                                <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                            </el-table>
                            <el-pagination v-if="num" background class="pages" @current-change="handleCurrentChange5" :current-page.sync="page3"
                            :page-size="cols3" layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js'
import {AddMerchants,GetBindGys,BindGys,BindSp,GetBindSp,GetAllBindGys,GetAllBindSp,GetSupplier,GetEntry,GetJs,GetSell,GetAllJh} from '../../js/district/district.js'
export default {
    name: "addMerchants",
    data() {
        return {
            activeName: 'first',
            activeName2: 'entry',
            form: {
                node: '',
                shnagh: '',
                state: 1,
                userId: 2,
                userName: '',//账号
                password: '',//密码
                contact: '',//联系人
                telphone: '',//联系方式
                licenceNo: '',//营业执照
                regId: '',//身份证号
                nodeName: '',//商户名称（商铺）
                name: '',//店铺联系人
                callphone: '',//店铺联系方式
                areaId: '',
                areaName: [],//所在地区
                addr: '',//地址
                stallNo: '',//摊位号
                role: '',//角色
                value: '',
                infoAddr: []
            },
            rules: {
                node: [
                    {required: true, message: '请输入节点编码', trigger: 'blur'}
                ],
                shangh: [
                    {required: true, message: '请输入商户编码', trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                // role: [
                //     { required: true, message: '请选择角色', trigger: 'change' }
                // ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                contact: [
                    {required: true, message: '请输入联系人',trigger: 'blur'}
                ],
                telphone: [
                    {required: true, message: '请输入联系电话',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^1[34578]\d{9}$/.test(value) == false){
                            callback(new Error("请输入正确的手机号"));
                        }
                        else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                licenceNo: [
                    {required: true, message: '请输入营业执照',trigger: 'blur'},
                ],
                regId: [
                    {required: true, message: '请输入身份证号',trigger: 'blur'},
                    {
                        pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
                    }
                ],
                nodeName: [
                    {required: true, message: '请输入商户名称',trigger: 'blur'}
                ],
                name: [
                    {required: true, message: '请输入店铺联系人',trigger: 'blur'}
                ],
                callphone: [
                    {required: true, message: '请输入手机号',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^1[34578]\d{9}$/.test(value) == false){
                            callback(new Error("请输入正确的手机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                areaName: [
                    {required: true, message: '请选择所在地区',trigger: 'blur'}
                ],
                addr: [
                    {required: true, message: '请输入地址',trigger: 'blur'}
                ],
                stallNo: [
                    {required: true, message: '请输入摊位号', trigger: 'blur'}
                ],

            },
            glMerchants: '管理商户',
            addSupplier: '新增供应商',
            addEntry: '新增进货商品',
            addSell: '新增销售商品',
            dataArr: [],
            tableData: [],
            tableData2: [], // 进货列表
            tableData3: [], // 绑定销售商品
            tableData4: [], // 销售列表
            multipleSelection: [],
            bindGysId: '',
            show: false,
            show2: false, // 进货
            show3: false,
            input: '',
            msgObj: {},
            none: false,
            none1: true,
            none2: true,
            page: 1, // 供应商  进货列表
            cols: 10,
            num: 0,
            page2: 1, // 绑定供应商 进货商品
            cols2: 10,
            num2: 0,
            tableHeight: '',
            page3: 1, // 销售列表
            cols3: 10,
            num3: 0,
            page4: 1, // 绑定销售商品
            cols4: 10,
            num4: 0,
            jsList: [],
            addrOptions: [],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
        }
    },
    computed:{
        setPeople(){
            return this.form.contact;
        },
        setPhoneNumber(){
            return this.form.telphone;
        }
    },
    watch:{
        setPeople(newValue){
            this.form.name = newValue
        },
        setPhoneNumber(newValue){
            this.form.callphone = newValue
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
        this.form.userId = localStorage.getItem('userId')
    },
    mounted() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local;
        if(this.$route.params.activeName === 'second'){
            this.msgObj = this.$route.params.data
            this.none = true
            this.none2 = true
            this.none1 = false
            this.activeName = this.$route.params.activeName
            this.getAllBindGys()
        }else if(this.$route.params.activeName === 'third'){
            this.msgObj = this.$route.params.data
            this.none = true
            this.none1 = true
            this.none2 = false
            this.activeName = this.$route.params.activeName
            this.getAllBindJhSp()
            this.getAllBindXsSp()
        }
        this.getJsFun()
        getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
    },
    methods: {
        searchGys(){
            this.showFun()
        },
        searchJhFun(){
            this.show2Fun()
        },
        searchXsFun(){
            this.show3Fun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        // 供应商
        handleCurrentChange(val) {
            this.page = val
            this.getAllBindGys()
        },
        // 进货列表
        handleCurrentChange2(val) {
            this.page = val
            this.getAllBindJhSp()
        },
        handleCurrentChange5(val) {
            this.page3 = val
            this.getAllBindXsSp()
        },
        // 绑定供应商
        handleCurrentChange3(val) {
            this.page2 = val
            this.showFun()
        },
        // 绑定进货商品
        handleCurrentChange4(val) {
            this.page2 = val
            this.show2Fun()
        },
        // 绑定销售商品
        handleCurrentChange6(val) {
            this.page4 = val
            this.show3Fun()
        },
        addSupplierFun(){
            this.$router.push({path:'addSupplier'})
        },
        addEntryFun(){
            this.$router.push({path:'addEntry'})
        },
        addSellFun(){
            this.$router.push({path:'addSell'})
        },
        handleSelectionChange(val){
            var selection = []
            val.forEach((v,i) => {
                selection.push(v.shop_concacts_id)
            })
            this.bindGysId = selection.join(",")
        },
        submitForm(formName) {
            if(this.form.licenceNo == '' && this.form.regId == ''){
                this.$message.error('营业执照号和身份证号不能同时为空');
            }else{

                this.$refs[formName].validate((valid) => {
                    let region = this.dataArr[0].shop_booth_id
                    let addrArr = [];
                    this.addrOptions.forEach(ele => {
                        if(ele.szm == this.form.areaName[0]){
                            addrArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form.areaName[1]){
                                    addrArr.push(ele.caption)
                                    ele.list.forEach(ele => {
                                        if(ele.szm == this.form.areaName[2]){
                                            addrArr.push(ele.caption)

                                        }
                                    })
                                }
                            })
                        }
                    })
                    if (valid) {
                        let params = {
                            state:this.form.state,
                            userId:this.form.userId,
                            userName: this.form.userName,//账号
                            password: this.form.password,//密码
                            contact: this.form.contact,//联系人
                            telphone: this.form.telphone,//联系方式
                            licenceNo: this.form.licenceNo,//营业执照
                            regId: this.form.regId,//身份证号
                            nodeName: this.form.nodeName,//商户名称（商铺）
                            name: this.form.name,//店铺联系人
                            callphone: this.form.callphone,//店铺联系方式
                            areaName: addrArr.join(""),//所在地区
                            areaId: this.form.areaName[this.form.areaName.length - 1],
                            addr: this.form.addr,//地址
                            stallNo: this.form.stallNo,//摊位号
                            role: this.form.role, //角色
                            region: region,                   
                            node_id: this.form.node,
                            biz_id: this.form.shangh
                        };
                        console.log(params)
                        AddMerchants(params)
                            .then(res => {
                                if (res.result == true) {
                                    this.$message.success(res.message);
                                    this.$router.push('glMerchants')
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            .catch(() => {
                                this.$message.error("出错啦!");
                            })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        // 供应商
        showFun(){
            this.show = true
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let obj = {
                page: this.page2,
                cols: this.cols2,
                userId: this.msgObj.userId, // 当前商户的userId
                type: "1",
                concact_name: "",
                region: region,
                biz_name: this.input,
                shop_booth_id: this.msgObj.bootList[0].shop_booth_id, // 当前商户的shop_booth_id
                parent_userId: userId, // 区域的userId
                parent_shop_booth_id: region // 区域的shop_booth_id
            }
            GetBindGys(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num2 = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        closeFun(){
            this.show = false
            this.show2 = false
            this.input = ''
        },
        close2Fun(){
            this.show = false
            this.show3 = false
            this.input = ''
        },
        // 绑定供应商
        bindGysFun(ele){
            if(this.bindGysId){
                let region = this.dataArr[0].shop_booth_id
                let obj = {
                ids: this.bindGysId, // 绑定供应商页面勾选的供应商主键shop_concacts_id
                shop_booth_id: this.msgObj.bootList[0].shop_booth_id // 当前商户的shop_booth_id
                };
                BindGys(obj)
                    .then(res => {
                        if (res.result == true) {
                            // this.$router.go(-1);
                            this.show = false
                            this.input = ''
                            this.$message.success("绑定供应商成功");
                            this.getAllBindGys()
                        }else{

                        }
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                this.$message.error("出错啦!");
            }
        },
        handleSelectionChange2(val){
            var selection = []
            val.forEach((v,i) => {
                selection.push(v.id)
            })
            this.bindGysId = selection.join(",")
        },
        // 绑定进货
        show2Fun(){
            this.show2 = true
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let obj = {
                page: this.page2,
                cols: this.cols2,
                userId: this.msgObj.userId, // 当前商户的userId
                goods_Type: "1",
                goods_name:this.input,   
                shop_booth_id: this.msgObj.bootList[0].shop_booth_id, // 当前商户的shop_booth_id
                parent_userId: userId, // 区域的userId
                parent_shop_booth_id: region // 区域的shop_booth_id
            }
            GetBindSp(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                    this.num2 = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        // 绑定销售
        show3Fun(){
            this.show3 = true
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let obj = {
                page: this.page4,
                cols: this.cols4,
                userId: this.msgObj.userId, // 当前商户的userId
                goods_Type: "2",
                goods_name:this.input,     
                shop_booth_id: this.msgObj.bootList[0].shop_booth_id, // 当前商户的shop_booth_id
                parent_userId: userId, // 区域的userId
                parent_shop_booth_id: region // 区域的shop_booth_id
            }
            GetBindSp(obj)
                .then(res => {
                    this.tableData3 = res.data.dataList
                    this.num4 = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        // 保存绑定进货
        bindSpFun(){
            if(this.bindGysId){
                let region = this.dataArr[0].shop_booth_id
                let obj = {
                    ids: this.bindGysId, // 绑定商品页面勾选的商品主键id
                    shop_booth_id: this.msgObj.bootList[0].shop_booth_id, // 当前商户的shop_booth_id
                    goods_type:"1",
                };
                BindSp(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.input = ''
                            this.show2 = false
                            this.$message.success("绑定商品成功");
                            this.getAllBindJhSp()
                        }else{

                        }
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                this.$message.error("出错啦!");
            }
        },
        // 保存绑定销售
        bindSpFun2(){
            if(this.bindGysId){
                let region = this.dataArr[0].shop_booth_id
                let obj = {
                    ids: this.bindGysId, // 绑定商品页面勾选的商品主键id
                    shop_booth_id: this.msgObj.bootList[0].shop_booth_id, // 当前商户的shop_booth_id
                    goods_type:"2",
                };
                BindSp(obj)
                    .then(res => {
                        if (res.result == true) {
                            // this.$router.go(-1);
                            this.show3 = false
                            this.input = ''
                            this.$message.success("绑定商品成功");
                            this.getAllBindXsSp()
                        }else{

                        }
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                this.$message.error("出错啦!");
            }
        },
        // 供应商列表
        getAllBindGys(){
            let bindgys = this.dataArr[0].bindgys,
                region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            if(bindgys === '1'){
                let obj = {
                    page: this.page,
                    cols: this.cols,
                    userId: userId,
                    type: "1",
                    concact_name: "",
                    region: region,
                    biz_name: "",
                    shop_booth_id: region
                }
                GetSupplier(obj)
                    .then(res => {
                        this.tableData2 = res.data.dataList
                        this.num = res.data.condition.total
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                let obj = {
                    page: this.page,
                    cols: this.cols,
                    userId: this.msgObj.userId,
                    type: "1",
                    concact_name: '',
                    region: region,
                    biz_name: '',
                    shop_booth_id: this.msgObj.bootList[0].shop_booth_id,
                    bindgys: this.dataArr[0].bindgys,
                }
                GetAllBindGys(obj)
                    .then(res => {
                        this.tableData2 = res.data.dataList
                        this.num = res.data.condition.total
                    })
                    .catch(res => {
                        this.$message.error("出错啦!");
                    })
            }
        },
        // 进货列表
        getAllBindJhSp(){
                let region = this.dataArr[0].shop_booth_id,
                    userId = this.dataArr[0].userId,
                    bindgys = this.dataArr[0].bindgys
                if(bindgys === '1'){
                    let obj = {
                        page: this.page,
                        cols: this.cols,
                        goodsName: "",
                        suppliersName: "",
                        region: region
                    }
                    GetEntry(obj)
                        .then(res => {
                            this.tableData2 = res.data.purchaseList
                            this.num = res.data.goodsinfo.total
                        })
                        .catch(() => {
                            this.$message.error("出错啦!");
                        })
                }else{
                    let obj = {
                        page: this.page,
                        cols: this.cols,
                        bindgys: this.dataArr[0].bindgys,
                        region: region,
                        userId: this.msgObj.userId,
                        shopBoothId: this.msgObj.bootList[0].shop_booth_id,
                    }
                    GetAllJh(obj)
                        .then(res => {
                            this.tableData2 = res.data.dataList
                            this.num = res.data.condition.total
                        })
                        .catch(res => {
                            this.$message.error("出错啦!");
                        })
                }

        },
        getAllBindXsSp(){
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId,
                bindgys = this.dataArr[0].bindgys
                if(bindgys === '1'){

                    let obj = {
                        page: this.page3,
                        cols: this.cols3,
                        goodsName: "",
                        suppliersName: "",
                        region: region
                    }
                    GetSell(obj)
                        .then(res => {
                            this.tableData4 = res.data.salesList
                            this.num3 = res.data.goodsinfo.total
                        })
                        .catch(() => {
                            this.$message.error("出错啦!");
                        })
                }else{
                    let obj = {
                        page: this.page3,
                        cols: this.cols3,
                        bindgys: this.dataArr[0].bindgys,
                        region: region,
                        userId: this.msgObj.userId,
                        shopBoothId: this.msgObj.bootList[0].shop_booth_id,
                    }
                    GetAllBindSp(obj)
                        .then(res => {
                            this.tableData4 = res.data.dataList
                            this.num3 = res.data.condition.total
                        })
                        .catch(res => {
                            this.$message.error("出错啦!");
                        })
                }

        },
        // 角色
        getJsFun(){
            let obj = {
                page: this.page,
                cols: this.cols,
                roleName:'',
                USERID: this.form.userId,
            }
            GetJs(obj)
                .then(res => {
                    this.jsList = res.data.roleList
                })
                .catch(res => {
                    this.$message.error("出错啦!");
                })
        }
    }
}
</script>

<style scoped lang='less'>
    .contents{
        padding-top: 20px;
        height: 100%;
        background: #fff;
        overflow: auto;
        box-sizing: border-box;
        .msg-title{
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            padding-left: 10px;
            box-sizing: border-box;
            border-left: 2px solid #409EFF;
        }
        .el-tabs{
            margin: 0 100px;
        }
        .header {
            width: 100%;
            .account-cont{
                margin: 10px 0;
            }
            .msg{
                display: flex;
            }
            .demo-autocomplete{
                .sub-title {
                    text-align: right;
                    padding-right: 20px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                }
                .el-input,.el-select{
                    width: 150px;
                }
                .el-col{
                    margin-left: 80px;
                }
            }
            .store-cont{
                .enterprise-info{
                    padding: 10px 0;
                    font-size: 14px;
                    .borders{
                        width: 100%;
                        border-bottom: 1px solid #eaeaea;
                        .new-add{
                            background: #fff;
                            color: #409EFF;
                            border-radius: 0;
                        }
                    }
                    .radio-button{
                        padding: 20px 60px ;
                        background: #83CCE5;
                        border-color: transparent;
                    }
                    .view{
                        padding-top: 10px;
                        border-bottom: 1px solid #83CCE5;
                    }
                    .box{
                        .el-input,.el-cascader{
                            width: 380px;
                        }
                    }
                }
                .section-content{
                    margin-top: 10px;
                    padding-left: 100px;
                    width: 500px;

                }
            }
        }
        .tit{
            width: 200px;
            text-align: center;
            line-height: 30px;
            color: #999;
            margin: 8px auto;
        }
        .gystab{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
            .content{
                width: 400px;
                height: 600px;
                position: absolute;
                top: 50%;
                margin-top: -300px;
                left: 50%;
                margin-left: -200px;
                padding: 10px 20px;
                background: #fff;
                .title{
                    display: flex;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 10px;
                    p{
                        flex: 1;
                        margin-left: 30px;
                        line-height: 30px;
                    }
                    .el-icon-close{
                        width: 50px;
                        text-align: center;
                        line-height: 30px;
                        font-size: 26px;
                        cursor: pointer;
                        color: #8e8b8b;
                    }
                }
                .search{
                    text-align: center;
                    .el-input{
                        width: 60%;
                        margin: 10px;
                    }
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
        .pages{
            margin: 20px auto;
        }
        .el-checkbox{
            margin-left: -110px;
        }
        .shop{
            margin: 10px 0;
        }
        .el-form-item__content{
            width: 380px;
        }
    }
</style>
<style lang="less">
    .addMerchants{
        .el-tabs__nav{
            left: 50%;
            margin-left: -390px;
        }
        .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top{
            width: 260px;
            text-align: center;
            font-size: 18px;
        }
        .el-tabs__header{
            margin-bottom: 0;
        }
        .el-tabs--card>.el-tabs__header{
            border-bottom: none;
        }
        .el-tabs__item.is-active {
            color: #fff !important;
            background: #409EFF;
        }
        .el-tabs__item.is-active:hover{
            color: #fff;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
            background: #409EFF;
            color: #fff;
        }
        .el-tabs__item.is-disabled{
            cursor: not-allowed;
        }
        .el-tabs__item{
            padding: 0;
        }
        #shoop{
            .el-tabs__nav{
                left: 1px;
                margin-left: 0;
            }
        }
    }
</style>
