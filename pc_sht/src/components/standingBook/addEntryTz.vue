<template>
    <div class="content addEntryTz">
        <div class="msg">
            <el-form ref="form" :model="form" class="form2" label-width="180px" size="mini" style="width: 1000px;">
                <el-form-item label="商户信息" v-if="isShow">
                    <span>
                        <el-select filterable v-model="form.value" @change="selectGet" size="mini" placeholder="请选择"
                        :style="add ? {display: 'block'} : {display: 'none'}">
                            <el-option
                            v-for="item in options"
                            :key="item.userId"
                            :label="item.bootList[0].booth_name"
                            :value="item.bootList[0].shop_booth_id">
                            </el-option>
                        </el-select>
                        <p :style="add ? {display: 'none'} : {display: 'block'}">{{merchants}}</p>
                    </span>
                </el-form-item>
                <el-form-item label="供应商" v-if="show.gys">
                    <el-select v-model="form.gys" filterable allow-create placeholder="请选择供应商" size="mini" @change="selectSuppliers"
                    :style="add ? {display: 'block'} : {display: 'none'}">
                        <el-option  v-for="item in suppliersList" :key="item.shop_concacts_id" :label="item.biz_name" :value="item.biz_name" >
                        </el-option>
                    </el-select>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.gys}}</p>
                </el-form-item>
                <el-form-item label="进货日期" v-if="show.in_date">
                    <el-date-picker :style="add ? {display: 'block'} : {display: 'none'}"
                        v-model="form.in_date"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.in_date}}</p>
                </el-form-item>
                <el-form-item label="运输车牌号" v-if="show.transport">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.transport"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.transport}}</p>
                </el-form-item>
                <el-form-item label="生产单位" v-if="show.ghdw">
                    <el-select v-model="form.ghdw" filterable placeholder="生产单位" size="mini" @change="selectGhdw"
                    :style="add ? {display: 'block'} : {display: 'none'}">
                        <el-option  v-for="val in dwArr" :key="val.ID" :label="val.SUPPLIER_NAME" :value="val.SUPPLIER_NAME" >
                        </el-option>
                    </el-select> 
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.ghdw}}</p>
                </el-form-item>
                <el-form-item label="单据上传" v-if="show.djsc">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.djsc"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.djsc}}</p>
                </el-form-item>
                <el-form-item label="进货（厂家销售）凭证" v-if="show.cjxspz">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.cjxspz"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.cjxspz}}</p>
                </el-form-item>
                <el-form-item label="检测情况" v-if="show.jcqk">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.jcqk"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.jcqk}}</p>
                </el-form-item>
                <el-form-item label="动物检疫合格证明" v-if="show.dwjyhg">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.dwjyhg"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.dwjyhg}}</p>
                </el-form-item>
                <el-form-item label="产地证明" v-if="show.cdzm">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.cdzm"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.cdzm}}</p>
                </el-form-item>
                <el-form-item label="产地形式" v-if="show.cdxs">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.cdxs"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.cdxs}}</p>
                </el-form-item>
                <el-form-item label="肉品品质检疫合格证" v-if="show.rqqzjyhgz">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.rqqzjyhgz"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.rqqzjyhgz}}</p>
                </el-form-item>
                <el-form-item label="备注" v-if="show.remark">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.remark"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.remark}}</p>
                </el-form-item>
                <el-form-item label="打印" v-if="show.print">
                    <el-input :style="add ? {display: 'block'} : {display: 'none'}" v-model="form.print"></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.print}}</p>
                </el-form-item>
                <el-form-item label="产地：">
                    <el-cascader :style="add ? {display: 'block'} : {display: 'none'}" :options="addrOptions" v-model="form.origin_name" placeholder="省/市/县" class="address" clearable :props="props" change-on-select></el-cascader>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{form.area_origin_name}}</p>
                </el-form-item>
            </el-form>

            <el-form ref="form2" class="form2" :model="form2" label-width="180px" size="mini" style="width: 1000px;">
                <el-form-item class="form2child"
                    v-for="(value) in form2.tzUserdefineList"
                    :label="value.TYPE_NAME" :style="value.IS_SHOW == '0' ? {display: 'none'} : {display: 'block'}"
                    :key="value.ID">
                    <el-date-picker v-if="value.PROPERTY_TYPE === 'date' "
                        v-model="value.values"
                        type="date"
                        :style="add ? {display: 'block'} : {display: 'none'}"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                    <el-input v-model="value.values" :style="add ? {display: 'block'} : {display: 'none'}" v-else></el-input>
                    <p :style="add ? {display: 'none'} : {display: 'block'}">{{value.values}}</p>
                </el-form-item>
            </el-form>
            <!--<el-form ref="form3" class="form3" :model="form3" label-width="180px" size="mini" style="width: 800px;">
                <el-form-item label="付款方式">
                    <el-select :style="add ? {display: 'block'} : {display: 'none'}" v-model="form3.payWay" size="mini" clearable placeholder="请选择">
                        <el-option value="1" label="现金"></el-option>
                        <el-option value="2" label="转账"></el-option>
                        <el-option value="3" label="欠款"></el-option>
                    </el-select>
                    <p :style="add ? {display: 'none'} : {display: 'block'}" v-if="form3.payWay == '1'">现金</p>
                    <p :style="add ? {display: 'none'} : {display: 'block'}" v-else-if="form3.payWay == '2'">转账</p>
                    <p :style="add ? {display: 'none'} : {display: 'block'}" v-else>欠款</p>
                </el-form-item>
            </el-form>-->
        </div>
        <div class="table">
            <div class="title">
                <el-input prefix-icon="el-icon-search" placeholder="搜索商品" v-model="searchVal" clearable @focus="focusFun" @keyup.enter.native="searchFun" :style="add ? {display: 'block'} : {display: 'none'}"></el-input>
                <div>
                    <el-button size="mini">下载模板</el-button>
                    <el-button size="mini">批量导入</el-button>
                </div>
            </div>
            <div :style="add ? {display: 'block'} : {display: 'none'}">
                <el-button type="primary" size="mini" plain @click="focusFun" style="margin-top: 10px;" :style="tableShow ? {display: 'none'} : {display: 'block'}">添加商品</el-button>
            </div>
            <el-table class="show-good" :data="tableData" :style="tableShow ? {display: 'none'} : {display: 'block'}" style="width: 100%">
                <el-table-column v-if="showId" prop="shopId">
                </el-table-column>
                <el-table-column v-for="(val,ind) in tableHead" :label="val.TYPE_NAME" :prop="val.NAME" :key="ind"
                v-if="val.IS_SHOW === '1'">
                    <template slot-scope="scope">
                        <el-date-picker v-if="val.PROPERTY_TYPE === 'date' "
                            v-model="tableData[scope.$index][ind]"
                             :style="add ? {display: 'block'} : {display: 'none'}"
                            type="date" size="mini"
                            format="yyyy-MM-dd" style="width: 100%;min-width: 130px"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                        <p v-else-if="val.TYPE_NAME == '进货商品'" :style="add ? {display: 'block'} : {display: 'none'}">{{tableData[scope.$index][ind]}}</p>
                        <p v-else-if="val.TYPE_NAME == '规格'" :style="add ? {display: 'block'} : {display: 'none'}">{{tableData[scope.$index][ind]}}</p>
                        <el-input v-model="tableData[scope.$index][ind]" size="mini" v-else style="width: 100%;"
                        :style="add ? {display: 'block'} : {display: 'none'}"></el-input>
                        <p :style="add ? {display: 'none'} : {display: 'block'}">{{tableData[scope.$index][ind]}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" v-if="add">
                    <template slot-scope="scope">
                        <el-button type="text" class="delete-btn" size="small" @click="deleteFun(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="good" :style="tableShow ? {display: 'block'} : {display: 'none'}" >
                <el-table :data="tableData2" style="width: 100%;" >
                    <el-table-column prop="GOODS_NAME" label="商品名称"> </el-table-column>
                    <el-table-column prop="GB_NAME" :formatter="formatter" label="品种"> </el-table-column>
                    <el-table-column prop="PRICE" label="单价"> </el-table-column>
                    <el-table-column prop="GOODS_UNIT" label="规格"> </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="addGoods(scope.row)">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            </div>
            <div class="btn"><!--,实付金额￥{{payAmount}}，欠款￥{{arrears}}-->
                <p>选择商品(共{{tableData.length}}种商品，合计￥{{totalPrice}})</p>
                <el-button type="primary" @click="saveFieldFun" size="small">{{saveBtn}}</el-button>
                <el-button type="primary" :style="add ? {display: 'block'} : {display: 'none'}" size="small">保存并记下一单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
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
import {TzAdd,UpdatePc,GetAllBiz,QueryInTzDetailByTzId,QuerySuppiler,GetAllTzGys,TzUpdate} from '../../js/standingBook/standingBook.js'
import {purchase,getDefaultProductTypes} from "../../js/goods/goods.js";
import {getAddr} from '../../js/user/user.js';
export default {
    name: "addEntryTz",
    data() {
        return {
            page: 1,
            cols: 15,
            num: 0,
            showId: false,
            saveBtn: '保存',
            add: true,
            tableShow: false,
            searchVal: '',
            form: {
                value: '', // 商户
                gys: '', // 供应商
                in_date: '', // 进货日期
                transport: '', //运输车牌号
                ghdw: '', // 供货单位（生产商）
                djsc: '', //单据上传
                cjxspz: '', //进货（厂家销售）凭证
                jcqk: '', // 检测情况
                dwjyhg: '', //动物检疫合格证明
                cdzm: '', //产地证明
                cdxs: '', //产地形式
                rqqzjyhgz: '', //肉品品质检疫合格证
                remark: '', //备注
                print: '', // 打印
                suppliersName: '', // 供应商名称
                origin_name: [], // 产地
                area_origin_name: ''
            },
            show: {
                value: false, // 商户
                gys: false, // 供应商
                in_date: false, // 进货日期
                transport: false, //运输车牌号
                ghdw: false, // 供货单位（生产商）
                djsc: false, //单据上传
                cjxspz: false, //进货（厂家销售）凭证
                jcqk: false, // 检测情况
                dwjyhg: false, //动物检疫合格证明
                cdzm: false, //产地证明
                cdxs: false, //产地形式
                rqqzjyhgz: false, //肉品品质检疫合格证
                remark: false, //备注
                print: false, // 打印
            },
            form2: {
                tzUserdefineList: [],
            },
            payAmount: 0,
            arrears: 0,
            form3: {
                payAmount: '',
                arrears: '',
                payWay: '',
                time: '',
                noteMsg: '',
            },
            options: [
                {
                    bootList: [
                        {shop_booth_id:0, booth_name: ''}
                    ]
                }
            ],
            value: '',
            tableData: [
                // {
                //     date: '1',
                //     name: '111',
                //     specifications: '规格',
                //     unit_price: '单价',
                //     num: '',
                //     total_price: '总价',
                //     production: '生产日期',
                //     shelf_life: '保质期'
                // }
            ],
            tableData2: [],
            tableHead: [],
            areaId:'', // 大区的shop_booth_id
            areaIds:'', // 商户
            bigAreaId:'', // 大区userId
            page: 1,
            cols: 15,
            totalPrice: 0,
            userId: '',
            merchants: '',
            suppliersList:[],
            shopId: '',
            tzId: '',
            ids: '',
            userdefine: {},
            dwArr: [],
            ghdwId: '',
            tzList: [],
            isSuccess: false,
            isShow: true,
            isRegion: '',
            scShopId: '',
            loginName: '',
            region: '',
            addrOptions:[],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            suppliersId: '9999999999999',
            is_oc_upload: '',
            ids: '',
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        this.areaId = this.$route.params.areaId
        this.region = this.$route.params.areaId
        this.bigAreaId = this.$route.params.bigAreaId
        this.getMerchantsFun()
        // 查询品种列表
        getDefaultProductTypes()
            .then(res => {
                localStorage.setItem('queryNameData',JSON.stringify(res));
            })
            .catch(res => {
                this.$message.error("出错啦!");
            })
    },
    mounted() {  
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.loginName =  localStorage.getItem('loginName');
        if(this.isRegion == 'false'){
            this.isShow = false
        }
        this.getAddrList()//获取地区列表
        this.getGhdwFun()
        this.getGoodsFun()
        this.getFieldFun()
        this.getAllSuppliers()
        var currentTime = new Date()
        this.form.in_date = formatDate(currentTime)
        console.log(this.areaId)
        console.log(this.bigAreaId)
        if(this.$route.params.param){
            this.add = false
            this.saveBtn = '修改'
        }
    },
    watch: {
        'tableData': {
            handler: function(newVal,oldVal){
                let amount_money = 0
                let total_price = 0
                newVal.forEach(v => {
                    let total_price = (v[2]*v[4])
                    amount_money += total_price
                    this.totalPrice = parseFloat(amount_money).toFixed(2)
                    this.payAmount = this.totalPrice
                    this.arrears = parseFloat(this.totalPrice-this.payAmount).toFixed(2)
                })
            },
            deep: true
        },
        'form.value': function (val) {
            if(val){
                this.getAllSuppliers()
                this.getGoodsFun()
            }
        }
    },
    methods: {
        getAddrList(){//获取地区列表
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getGoodsFun()
        },
        deleteFun(ele){
            console.log(ele)
            this.tableData.splice(ele,1)
            this.tableData.length - 1
        },
        // 供货单位
        getGhdwFun(){
            if(this.isRegion == 'false'){
                let obj = {
                    shop_booth_id: this.scShopId
                }
                QuerySuppiler(obj)
                    .then(res => {
                        this.dwArr = res.data.suppilerList
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                let obj = {
                    shop_booth_id: this.areaId
                }
                QuerySuppiler(obj)
                    .then(res => {
                        this.dwArr = res.data.suppilerList
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }
        },
        // 选择供货单位
        selectGhdw(val){
            let areaId = '',
                areaName = '';
            this.dwArr.forEach((ele)=>{ 
                if(ele.SUPPLIER_NAME == val){
                    console.log(ele)
                    this.ghdwId = ele.SUPPLIER_ID;
                    areaId = ele.AREA_ID
                    areaName = ele.AREA_NAME
                }
            })
            let addrArr = [];
            if(areaName){
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
                }
                this.form.origin_name = originArr
            }
            let originArr = [];
            if(areaId){
                if(areaId.slice(4,6) != '00'){
                    originArr.unshift(areaId);
                }
                if(areaId.slice(2,4) != '00'){
                    originArr.unshift(areaId.slice(0,4)+'00');
                }
                if(areaId.slice(0,2) != '00'){
                    originArr.unshift(areaId.slice(0,2)+'0000');
                }
                this.form.origin_name = originArr
            }
        },
        //查询供应商列表
        getAllSuppliers(){
            if(this.isRegion == 'false'){
                let obj = {
                    page: '1',
                    cols: '100',
                    userId: this.userId, // 区域
                    type: "1",
                    concact_name: "",
                    region: this.region, //区域shop_booth_id
                    biz_name: "",
                    shop_booth_id: this.scShopId //区域shop_booth_id
                }
                GetAllTzGys(obj)
                    .then(res =>{
                        this.suppliersList = res.data.dataList
                    })
                    .catch(() => {
                    this.$message.error("出错啦!");
                    })
            }else{
                let obj = {
                    page: '1',
                    cols: '100',
                    userId: this.bigAreaId, // 区域
                    type: "1",
                    concact_name: "",
                    region: this.region, //区域shop_booth_id
                    biz_name: "",
                    shop_booth_id: this.areaId //区域shop_booth_id
                }
                GetAllTzGys(obj)
                    .then(res =>{
                        this.suppliersList = res.data.dataList
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }
        },
        selectSuppliers(val){//选择供应商
            this.form.suppliersName = val
            this.suppliersId = 9999999999999
            this.suppliersList.forEach((ele)=>{
                if(ele.biz_name == val){
                    this.suppliersId = ele.shop_concacts_id;
                }
            })
        },
        // 选择商户
        selectGet(val){
            this.options.forEach(ele => {
                if(val == ele.bootList[0].shop_booth_id){
                    this.merchants = ele.bootList[0].booth_name
                    this.bigAreaId = ele.userId
                    this.areaIds = ele.bootList[0].shop_booth_id
                }
            })
        },
        // 品种
        formatter(row, column){
            let typeName = '';
            let level_1_name  = '';
            let level_2_name  = '';
            let level_3_name  = '';
            let level_4_name  = '';
            let queryNameData = JSON.parse(localStorage.getItem('queryNameData'));
            if(!row.level_id){
                return
            }
            if(row.level_id.length == 2){
                level_1_name = queryNameData[0].type_name;
                typeName = level_1_name;
            }
            if(row.level_id.length == 5){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0-5)){
                        level_2_name = ele.type_name;
                        typeName = level_1_name +'/'+ level_2_name ;
                    }
                })
            }
            if(row.level_id.length == 8){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0,5)){
                        level_2_name = ele.type_name;
                        ele.systemDefaultTypeList.forEach((ele)=>{
                            if(ele.level_id == row.level_id.slice(0,8)){
                                level_3_name = ele.type_name;
                                typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name;
                            }
                        })
                    }
                })
            }
            if(row.level_id.length == 12){
                level_1_name = queryNameData[0].type_name;
                queryNameData[0].systemDefaultTypeList.forEach((ele)=>{
                    if(ele.level_id == row.level_id.slice(0,5)){
                        level_2_name = ele.type_name;
                        ele.systemDefaultTypeList.forEach((ele)=>{
                            if(ele.level_id == row.level_id.slice(0,8)){
                                level_3_name = ele.type_name;
                                ele.systemDefaultTypeList.forEach((ele)=>{
                                    if(ele.level_id == row.level_id.slice(0,12)){
                                        level_4_name = ele.type_name;
                                        typeName = level_1_name +'/'+ level_2_name +'/'+ level_3_name +'/'+ level_4_name;
                                    }
                                })
                            }
                        })
                    }
                })
            }
            return typeName;
        },
        searchFun(){
            this.getGoodsFun()
        },
        focusFun(ele){
            this.tableShow = true
        },
        // 添加商品
        addGoods(ele){
            this.tableShow = false
            let tableHead = this.tableHead,
                obj = {};
            for(var key in tableHead){
                if(tableHead[key].TYPE_NAME == '进货商品'){
                    obj[0] = ele.GOODS_NAME
                }else if(tableHead[key].TYPE_NAME == '规格'){
                    obj[1] = ele.GOODS_UNIT
                }else if(tableHead[key].TYPE_NAME == '价格'){
                    obj[2] = ele.PRICE
                }else if(tableHead[key].TYPE_NAME == '生产日期'){
                    obj[3] = ''
                }else if(tableHead[key].TYPE_NAME == '数量'){
                    obj[4] = 1
                }else if(tableHead[key].TYPE_NAME == '保质期'){
                    obj[5] = ''
                }
            }
            obj.shopId = ele.ID
            this.tableData.unshift(obj)
            if(this.searchVal){
                console.log(123)
                this.searchVal = ''
                this.getGoodsFun()
            }
        },
        // 获取商品列表
        getGoodsFun(){
            if(this.isRegion == 'false'){
                this.isShow = false
                let boothData = {
                    page: this.page,
                    cols: this.cols,
                    goodsName: this.searchVal,
                    suppliersName: '',
                    region: this.region,
                    userId: this.userId,
                    shopBoothId: this.areaId
                }
                purchase(boothData)
                .then(res => {
                    this.tableData2 = res.data.purchaseList;
                    this.num = res.data.goodsinfo.total
                })
                .catch(res => {
                    console.log(res)
                })
            }else{
                let boothData = {
                    page: this.page,
                    cols: this.cols,
                    goodsName: this.searchVal,
                    suppliersName: '',
                    region: this.region,
                    shopBoothId: this.areaId
                }
                purchase(boothData)
                    .then(res => {
                        this.tableData2 = res.data.purchaseList;
                        this.num = res.data.goodsinfo.total
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        // 获取字段列表
        getFieldFun(){
            let obj = {
                userId: this.userId,
                tz_type: "1",
                shop_booth_id: this.areaId
            }
            let tzList = []
            UpdatePc(obj)
                .then(res => {
                    this.tableHead = res.data.goods_property
                    this.form2.tzUserdefineList = res.data.tzUserdefineList
                    this.tzList = res.data.tzList
                    tzList = res.data.tzList
                    tzList.forEach(val => {
                        if(val.NAME === 'gys' && val.IS_SHOW === '1'){
                            this.show.gys = true
                        }
                        if(val.NAME === 'in_date' && val.IS_SHOW === '1'){
                            this.show.in_date = true
                        }
                        if(val.NAME === 'transport' && val.IS_SHOW === '1'){
                            this.show.transport = true
                        }
                        if(val.NAME === 'ghdw' && val.IS_SHOW === '1'){
                            this.show.ghdw = true
                        }
                        if(val.NAME === 'djsc' && val.IS_SHOW === '1'){
                            this.show.djsc = true
                        }
                        if(val.NAME === 'cjxspz' && val.IS_SHOW === '1'){
                            this.show.cjxspz = true
                        }
                        if(val.NAME === 'jcqk' && val.IS_SHOW === '1'){
                            this.show.jcqk = true
                        }
                        if(val.NAME === 'dwjyhg' && val.IS_SHOW === '1'){
                            this.show.dwjyhg = true
                        }
                        if(val.NAME === 'cdzm' && val.IS_SHOW === '1'){
                            this.show.cdzm = true
                        }
                        if(val.NAME === 'cdxs' && val.IS_SHOW === '1'){
                            this.show.cdxs = true
                        }
                        if(val.NAME === 'rqqzjyhgz' && val.IS_SHOW === '1'){
                            this.show.rqqzjyhgz = true
                        }
                        if(val.NAME === 'remark' && val.IS_SHOW === '1'){
                            this.show.remark = true
                        }
                        if(val.NAME === 'print' && val.IS_SHOW === '1'){
                            this.show.print = true
                        }

                    })
                    if(this.$route.params.param){
                        let param = this.$route.params.param
                        this.tzId = param.tz_id
                        this.ids = param.id
                        this.form.value = param.buyer_booth_id
                        this.form.remark = param.remark
                        this.merchants = param.buyer_booth_name
                        this.payAmount = param.actual_money
                        this.form3.payWay = param.pay_way
                        this.form.suppliersName = param.seller_booth_name
                        this.form.in_date = param.in_date
                        this.detailTzFun()
                        this.suppliersList.forEach((ele)=>{
                            // console.log(ele)
                            if(ele.biz_name === param.seller_booth_name){
                                this.form.gys = ele.shop_concacts_id
                            }
                        })
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 获取商户
        getMerchantsFun(){
            let obj = {
                page: '1',
                cols: '',
                total: "",
                userId: this.userId,
                name: "",
                boothName: "",
                stall_no: "",
                region: this.areaId
            }
            GetAllBiz(obj)
                .then(res => {
                    this.options = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        // 保存商品
        saveFieldFun(){
            console.log(this.ghdwId)
            // console.log(this.form2)
            let addrArr = [], originArr = [];
                this.addrOptions.forEach(ele => {
                    if(ele.szm == this.form.origin_name[0]){
                        originArr.push(ele.caption)
                        ele.list.forEach(ele => {
                            if(ele.szm == this.form.origin_name[1]){
                                originArr.push(ele.caption)
                                ele.list.forEach(ele => {
                                    if(ele.szm == this.form.origin_name[2]){
                                        originArr.push(ele.caption)                              
                                    }
                                })
                            }
                        })
                    }
                })
            if(this.saveBtn == '保存'){
                let in_date = '',
                    noteMsg = '',
                    gys = '';

                //     value, gys, in_date, transport, ghdw, djsc, cjxspz, jcqk, dwjyhg, cdzm, cdxs, rqqzjyhgz, remark, print
                
                let userdefine = '{';
                if(this.form2.tzUserdefineList.length == 0){
                    userdefine = ''
                }else{
                    this.form2.tzUserdefineList.forEach(val => {
                        if(val.IS_SHOW === '1'){
                            if(val.values == undefined){
                                userdefine += '"' + val.TYPE_NAME + '":"' + '' + '",'
                            }else{
                                userdefine += '"' + val.TYPE_NAME + '":"' + val.values + '",'
                            }
                        }
                    })
                    userdefine += '}'
                }
                let str = ''
                if(userdefine != '{}'){
                    str = userdefine.substr(0, userdefine.length-2)+userdefine.substr(userdefine.length-1,userdefine.length)
                }else{
                    str = userdefine
                }
                if(this.isRegion == 'false'){
                    var buyer_booth_id = this.scShopId,
                        buyer_booth_name = this.loginName;
                }else{
                    var buyer_booth_id = this.form.value,
                        buyer_booth_name = this.merchants;
                }
                let goodObj = '[';
                if(this.tzId != ''){
                    this.tableData.forEach(ele => {
                        this.tableData2.forEach(val => {
                            if(ele[0] == val.GOODS_NAME){
                                goodObj +=  '{"0":"' + ele[0] + '","1":"' + ele[1] + '","2":"' + ele[2] + '","3":"' + ele[3] 
                                    + '","4":"'+ ele[4] + '","5":"'+ ele[5] + '","shopId":"'+ val.ID + '"},'
                            }
                        })
                    })
                }
                goodObj += ']'
                let goodStr = goodObj.substr(0, goodObj.length-2)+goodObj.substr(goodObj.length-1,goodObj.length)
                let debt_money = parseFloat(this.totalPrice-this.form3.payAmount).toFixed(2)
                if(this.tzId == ''){

                    let obj = {
                        buyer_booth_id: buyer_booth_id, // 商户
                        buyer_booth_name: buyer_booth_name,
                        seller_booth_id: this.suppliersId, //卖方id 供应商9999999999999
                        seller_booth_name: this.form.gys,
                        amount_money: this.totalPrice,	//应收金额
                        actual_money: this.payAmount,	//实收金额
                        discount_rate: '',	//折扣
                        pay_way:this.form3.payWay,		//付款方式  现金/转账
                        remark: this.form.remark,		// 备注
                        creater_id:localStorage.getItem('userId'),		//创建人
                        pay_state:Math.abs(this.arrears)>0 ?1:2,	//支付状态(是否欠款) 1欠款 2结清
                        debt_money: this.arrears, // this.form3.arrears
                        goods: this.tzId != '' ? goodStr : JSON.stringify(this.tableData),
                        in_date: this.form.in_date,
                        tz_id: this.tzId,
                        flag: 'pc',
                        userdefine: str,
                        transport: this.form.transport, // 车牌号
                        suppiler_id: this.ghdwId, // 供货单位
                        suppiler_name: this.form.ghdw,
                        area_origin_id: this.form.origin_name[this.form.origin_name.length -1],//产地
                        area_origin_name: originArr.join(''),
                        region: this.areaId,
                        is_oc_upload: this.is_oc_upload
                    }
                    console.log(obj)
                    TzAdd(obj)
                        .then(res => {
                            // console.log(res)
                            if(this.tzId != ''){
                                if (res.result == true) {
                                    this.$message.success('进货台账编辑成功');
                                    this.$router.push('entryTz')
                                }else{
                                    this.$message.error('进货台账编辑失败');
                                }
                            }else{
                                if (res.result == true) {
                                    this.$message.success(res.message);
                                    this.$router.push('entryTz')
                                }else{
                                    this.$message.error(res.message);
                                }
                            }
                        })
                }else{
                        let obj = {
                        buyer_booth_id: buyer_booth_id, // 商户
                        buyer_booth_name: buyer_booth_name,
                        seller_booth_id: this.suppliersId, //卖方id 供应商9999999999999
                        seller_booth_name: this.form.gys,
                        amount_money: this.totalPrice,	//应收金额
                        actual_money: this.payAmount,	//实收金额
                        discount_rate: '',	//折扣
                        pay_way:this.form3.payWay,		//付款方式  现金/转账
                        remark: this.form.remark,		// 备注
                        creater_id:localStorage.getItem('userId'),		//创建人
                        pay_state:Math.abs(this.arrears)>0 ?1:2,	//支付状态(是否欠款) 1欠款 2结清
                        debt_money: this.arrears, // this.form3.arrears
                        goods: this.tzId != '' ? goodStr : JSON.stringify(this.tableData),
                        in_date: this.form.in_date,
                        tz_id: this.tzId,
                        flag: 'pc',
                        userdefine: str,
                        transport: this.form.transport, // 车牌号
                        suppiler_id: this.ghdwId, // 供货单位
                        suppiler_name: this.form.ghdw,
                        area_origin_id: this.form.origin_name[this.form.origin_name.length -1],//产地
                        area_origin_name: originArr.join(''),
                        region: this.areaId,
                        is_oc_upload: this.is_oc_upload
                    }
                    console.log(obj)
                    TzUpdate(obj)
                        .then(res => {
                            // console.log(res)
                            if(this.tzId != ''){
                                if (res.result == true) {
                                    this.$message.success('进货台账编辑成功');
                                    this.$router.push('entryTz')
                                }else{
                                    this.$message.error('进货台账编辑失败');
                                }
                            }else{
                                if (res.result == true) {
                                    this.$message.success(res.message);
                                    this.$router.push('entryTz')
                                }else{
                                    this.$message.error(res.message);
                                }
                            }
                        })
                }
                //TzUpdate
            }else{
                this.add = true
                this.saveBtn = '保存'
            }
        },
        // 详情
        detailTzFun(){
            let obj = {
                tz_id: this.tzId,
                id: this.ids,
            };
            QueryInTzDetailByTzId(obj)
                .then(res => {
                    let detailsArr = res.data.tzDetailList,
                        tzListArr = res.data.tzList,
                        arr = [];
                    for(var i in detailsArr){
                        detailsArr[i][0] = detailsArr[i].goods_name
                        detailsArr[i][1] = detailsArr[i].goods_unit
                        detailsArr[i][2] = detailsArr[i].price
                        detailsArr[i][3] = detailsArr[i].scrq
                        detailsArr[i][4] = detailsArr[i].number
                        detailsArr[i][5] = detailsArr[i].bzq
                        detailsArr[i].shopId = detailsArr[i].shop_booth_id
                    }
                    console.log(tzListArr[0])
                    this.tableData = detailsArr
                    this.userdefine = tzListArr[0].USERDEFINE
                    this.is_oc_upload = tzListArr[0].IS_OC_UPLOAD
                    this.ghdwId = tzListArr[0].SUPPILER_ID
                    for(var k in this.userdefine){
                        arr[k] = this.userdefine[k]
                    }
                    this.form.gys = tzListArr[0].SELLER_BOOTH_NAME
                    this.suppliersId = tzListArr[0].SELLER_BOOTH_ID
                    this.form.ghdw = this.$route.params.param.suppiler_name
                    this.form.transport = this.$route.params.param.transport
                    for(var a in arr){
                        this.form2.tzUserdefineList.forEach(val => {
                            if(a == val.TYPE_NAME){
                                val.values = (arr[a])
                            }
                        })
                    }
                    let originArr = [];
                    if(this.$route.params.param.area_origin_id){
                        if(this.$route.params.param.area_origin_id.slice(4,6) != '00'){
                            originArr.unshift(this.$route.params.param.area_origin_id);
                        }
                        if(this.$route.params.param.area_origin_id.slice(2,4) != '00'){
                            originArr.unshift(this.$route.params.param.area_origin_id.slice(0,4)+'00');
                        }
                        if(this.$route.params.param.area_origin_id.slice(0,2) != '00'){
                            originArr.unshift(this.$route.params.param.area_origin_id.slice(0,2)+'0000');
                        }
                    }
                    this.form.origin_name = originArr
                    this.form.area_origin_name = this.$route.params.param.area_origin_name
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了")
                })
        }

    }

}
</script>

<style lang='less' scoped>
    .content{
        background: #fff;
        height: 100%;
        overflow: auto;
        .msg{
            font-size: 14px;
            margin-top: 20px;
            .form2{
                .form2child{
                    float: left;
                }
                .el-form-item{
                    float: left;
                }
            }
            .form3{
                clear: both;
            }
            .el-select,.el-input,.el-cascader{
                width: 170px;
            }
        }
        .table{
            clear: both;
            margin: 0 16px;
            .title{
                display: flex;
                margin: 10px 0;
                .el-input{
                    width: 180px;
                    margin-right: 14px;
                }
            }
            .delete-btn{
                color: #f56c6c;
            }   
        }
        .btn{
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            margin-right: 20px;
            p{
                flex: 1;
                line-height: 40px;
                font-size: 14px;
            }
        }
        .el-pagination{
            text-align: center;
        }
    }
</style>
<style lang="less">
.addEntryTz{
    .el-input__icon{
        line-height: 30px;
    }
    .el-form-item{
        width: 400px;
    }
    .good{
        .el-table td{
            padding: 0;
        }
    }
}
</style>
