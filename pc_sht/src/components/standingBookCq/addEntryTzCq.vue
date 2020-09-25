<template>
    <div class="content addEntryTzCq">
        <div class="box">
            <div class="list-title">台账信息</div>
            <div class="view">
                <div class="list">
                    <div class="data">
                        <div class="title">进货日期</div>
                        <div class="msg">
                            <el-date-picker :picker-options="pickerOptions" v-model="form.in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">供应商</div>
                        <div class="msg">
                            <el-select v-model="form.gys" filterable allow-create placeholder="请选择供应商" size="mini" @change="selectSuppliers">
                                <el-option  v-for="(item, index) in suppliersList" :key="index" :label="item.biz_name" :value="item.biz_name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">供货单位</div>
                        <div class="msg">
                            <el-input v-model="form.ghdw" readonly></el-input>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">单据上传</div>
                        <div class="msg">
                            <div class="msg-item">   
                                <div class="img-list">
                                    <ul>
                                        <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                            <figure class="image">
                                                <img :src="item.img_url" @click="bigImgFun(item)">
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
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="table">
            <div class="list-title">商品信息<span>(已选{{count}}种商品，合计￥{{totalPrice}})</span></div>
            <el-table class="show-good" :data="tableData" :header-cell-style="rowClass" v-loading="loading">
                <el-table-column prop="GOODS_NAME" label="商品信息">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.GOODS_NAME" filterable size="mini" @change="selectGoodFun(scope.row, scope.$index)">
                            <el-option  v-for="(val,index) in goodArr" :key="index" :label="val.GOODS_NAME" :value="val.GOODS_NAME" >
                            </el-option>
                        </el-select> 
                    </template>
                </el-table-column>
                <el-table-column prop="GOODS_UNIT" label="单位规格" width="100"></el-table-column>
                <el-table-column prop="PRICE" label="单价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.PRICE"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="in_date" label="生产日期">
                    <template slot-scope="scope">
                        <el-date-picker :picker-options="pickerOptions" v-model="scope.row.in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column prop="BZQ" label="保质期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.BZQ"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" class="delete-btn" size="small" @click="deleteFun(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-button class="add-btn" type="primary" plain size="medium" plain @click="focusFun" style="margin-top: 10px;" 
                > + 添加商品</el-button>
            </div>
            <div class="save-btn">
                <el-button type="primary" @click="saveFieldFun" size="small">保存</el-button>
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
import {TzAdd,UpdatePc,GetAllBiz,QueryInTzDetailByTzId,QuerySuppiler,GetAllTzGys,TzUpdate, SearchDoc, SaveInTzAgain, QueryPcTzInfoDetailList} from '../../js/standingBookCq/standingBookCq.js'
import {purchase,getDefaultProductTypes} from "../../js/goods/goods.js";
import {getAddr} from '../../js/user/user.js';
export default {
    name: "addEntryTzCq",
    data() {
        return {
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
            need: {
                gys: '',
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
            tableData: [],
            tableData2: [],
            tableHead: [],
            areaId:'', // 大区的shop_booth_id
            areaIds:'', // 商户
            bigAreaId:'', // 大区userId
            page: 1,
            cols: 50,
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
            types: '',
            count: 0,
            pageShow: false,
            imgArr1: [],
            isImgList: false,
            node_id: '',
            isBigImg: false,
            imgList: [],
            autoplay: false,
            current: 0,
            imgHeight: '',
            sizeObj: {},
            types: 1,
            query: '',
            oldmerchants: '',
            states: 1,
            valLength1: 4,
            goodArr: [],
            loading: false,
            pickerOptions: { 
                disabledDate(time) {
                    return time.getTime() >  new Date().getTime()
                }
            }
        }
    },
    created() {
    },
    mounted() {  
        this.userId = localStorage.getItem('userId')
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.loginName =  localStorage.getItem('loginName');
        this.node_id = localStorage.getItem('loginId')
        var currentTime = new Date()
        this.form.in_date = formatDate(currentTime)
        this.getAllSuppliers()
        if(this.$route.params.types == 'again'){
            this.tzId = this.$route.params.param.tz_id
            this.form.gys = this.$route.params.param.seller_booth_name
            this.form.ghdw = this.$route.params.param.suppiler_name
            this.form.in_date = this.$route.params.param.in_date
            this.detailTzFun()
        }
    },
    watch: {
        'tableData': {
            handler: function(newVal,oldVal){
                let amount_money = 0
                let total_price = 0
                let str = ''
                this.count = 0
                newVal.forEach(v => {
                    if(v.number != ''){
                        this.count++
                    }
                    if(v.number){
                        total_price = (v.number*v.PRICE)
                        amount_money += total_price
                        this.totalPrice = parseFloat(amount_money).toFixed(2)
                    }
                })
            },
            deep: true
        },
    },
    methods: {
        deleteFun(ele){
            this.tableData.splice(ele,1)
            this.tableData.length - 1
        },
        // 再次进货查看详情
        detailTzFun(){
            let obj = {
                tz_id: this.tzId,
            };
            QueryPcTzInfoDetailList(obj)
                .then(res => {
                    res.data.tzList.forEach(val => {
                        val.goodArr = []
                        val.PRICE = ''
                        val.BZQ = ''
                        val.in_date = ''
                    })
                    this.tableData = res.data.tzList
                    let boothData = {
                        page: 1,
                        cols: 1000,
                        goodsName: '',
                        goodsCode: '',
                        suppliersName: this.form.gys,
                        region: '',
                        userId: this.userId,
                        total: '',
                        j_name: ''
                    }
                    purchase(boothData)
                        .then(res => {
                            this.goodArr = res.data.purchaseList;
                            this.tableData.forEach(value => {
                                this.goodArr.forEach(val => {
                                    if(value.goods_name == val.GOODS_NAME){
                                        value.BRAND = val.BRAND
                                        value.BZQ = value.bzq
                                        value.COUNT = value.count
                                        value.DISGRANT = val.DISGRANT
                                        value.GB_CODE = val.GB_CODE
                                        value.GB_NAME = val.GB_NAME
                                        value.GOODS_CODE = val.GOODS_CODE
                                        value.GOODS_DESCRIBE = val.GOODS_DESCRIBE
                                        value.GOODS_NAME = val.GOODS_NAME
                                        value.GOODS_TYPE = val.GOODS_TYPE
                                        value.GOODS_UNIT = value.goods_unit
                                        value.ID = val.ID
                                        value.IMG_URL = val.IMG_URL
                                        value.J_NAME = val.J_NAME
                                        value.PRICE = value.price
                                        value.PRODUCT_IMG_URL = val.PRODUCT_IMG_URL
                                        value.RECORD_DATE = val.RECORD_DATE
                                        value.SCBJ = val.SCBJ
                                        value.SHOP_BOOTH_ID = val.SHOP_BOOTH_ID
                                        value.SORT = val.SORT
                                        value.SPECIFICATIONS = val.SPECIFICATIONS
                                        value.SUPPLIERS_ID = val.SUPPLIERS_ID
                                        value.SUPPLIERS_NAME = value.specifications
                                        value.UPDATE_DATE = val.UPDATE_DATE
                                        value.USERDEFINE_CATEGORY = val.USERDEFINE_CATEGORY
                                        value.XJBJ = val.XJBJ
                                        value.areaOriginId = val.areaOriginId
                                        value.areaOriginNname = value.area_origin_name
                                        value.association_id = val.association_id
                                        value.level_id = val.level_id
                                        value.userdefine_code_one = val.userdefine_code_one
                                        value.userdefine_code_two = val.userdefine_code_two
                                        value.goodArr = this.goodArr
                                        value.in_date = value.scrq
                                    }
                                })
                            })
                            this.tableData = this.tableData
                        })
                        .catch(res => {
                            console.log(res)
                        })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectGoodFun(ele, idx){
            this.tableData.forEach((value, index) => {
                if(idx == index){
                    this.goodArr.forEach(val => {
                        if(val.GOODS_NAME == ele.GOODS_NAME){
                            value.BRAND = val.BRAND
                            value.BZQ = val.BZQ
                            value.COUNT = val.COUNT
                            value.DISGRANT = val.DISGRANT
                            value.GB_CODE = val.GB_CODE
                            value.GB_NAME = val.GB_NAME
                            value.GOODS_CODE = val.GOODS_CODE
                            value.GOODS_DESCRIBE = val.GOODS_DESCRIBE
                            value.GOODS_NAME = val.GOODS_NAME
                            value.GOODS_TYPE = val.GOODS_TYPE
                            value.GOODS_UNIT = val.GOODS_UNIT
                            value.ID = val.ID
                            value.IMG_URL = val.IMG_URL
                            value.J_NAME = val.J_NAME
                            value.PRICE = val.PRICE
                            value.PRODUCT_IMG_URL = val.PRODUCT_IMG_URL
                            value.RECORD_DATE = val.RECORD_DATE
                            value.SCBJ = val.SCBJ
                            value.SHOP_BOOTH_ID = val.SHOP_BOOTH_ID
                            value.SORT = val.SORT
                            value.SPECIFICATIONS = val.SPECIFICATIONS
                            value.SUPPLIERS_ID = val.SUPPLIERS_ID
                            value.SUPPLIERS_NAME = val.SUPPLIERS_NAME
                            value.UPDATE_DATE = val.UPDATE_DATE
                            value.USERDEFINE_CATEGORY = val.USERDEFINE_CATEGORY
                            value.XJBJ = val.XJBJ
                            value.areaOriginId = val.areaOriginId
                            value.areaOriginNname = val.areaOriginNname
                            value.association_id = val.association_id
                            value.level_id = val.level_id
                            value.userdefine_code_one = val.userdefine_code_one
                            value.userdefine_code_two = val.userdefine_code_two
                        }
                    })
                    
                }
            })
        },
        getGoodFun(){
            let boothData = {
                page: 1,
                cols: 1000,
                goodsName: '',
                goodsCode: '',
                suppliersName: this.form.gys,
                region: '',
                userId: this.userId,
                total: '',
                j_name: ''
            }
            purchase(boothData)
                .then(res => {
                    var currentTime = new Date()
                    let in_date = formatDate(currentTime)
                    res.data.purchaseList.forEach(val => {
                        val.goodArr = []
                        val.number = ''
                        val.in_date = ''
                    })
                    this.goodArr = res.data.purchaseList;
                    let goodObj = {}
                    this.goodArr.forEach(val => {
                        val.goodArr = this.goodArr
                        val.number = ''
                        val.in_date = in_date
                        this.tableData.push(val)
                    })
                    this.loading = false
                })
                .catch(res => {
                    console.log(res)
                })
        },
        //查询供应商列表
        getAllSuppliers(){
            let obj = {
                page: '1',
                cols: '1000',
                userId: this.userId, // 区域
                type: "1",
                concact_name: "",
                region: '', //区域shop_booth_id
                biz_name: "",
                shop_booth_id: this.scShopId //区域shop_booth_id
            }
            GetAllTzGys(obj)
                .then(res =>{
                    this.suppliersList = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectSuppliers(ele){
            this.tableData = []
            this.loading = true
            this.suppliersList.forEach(val => {
                if(val.biz_name == ele){
                    this.form.ghdw = val.ws_supplier
                }
            })
            this.getGoodFun()
        },
        bigImgFun(item){
            this.isBigImg = true
            this.current = item
            this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
        },
        closeFun(){
            this.isBigImg = false
        },
        // 添加选择商品
        focusFun(){
            if(this.form.gys == ''){
                this.$message.error('供应商不能为空');
                return
            }
            var currentTime = new Date()
            let in_date = formatDate(currentTime)
            let goodObj = {}
            goodObj.goodArr = this.goodArr
            goodObj.number = ''
            goodObj.in_date = in_date
            goodObj.GOODS_NAME = ''
            this.tableData.push(goodObj)
        },
        // 保存商品
        saveFieldFun(){
            if(this.form.gys == ''){
                this.$message.error('供应商不能为空');
                return
            }
            if(this.tableData.length == 0){
                this.$message.error('请选择商品');
                return
            }
            let str = '', state = true;
            this.tableData.forEach((val, idx) => {
                if(state){
                    if(!val.number){
                        this.$message.error('数量不能为空');
                        state = false
                        return
                    }
                    str += '{"供货商名称":"' + this.form.gys + '","产地":"' + val.areaOriginNname + '","进货日期":"' + this.form.in_date 
                        + '","原料编码":"' + val.GOODS_CODE + '","原料名称":"' + val.GOODS_NAME + '","保质期":"' + val.BZQ
                        + '","来源市场":"' + this.form.ghdw + '","进货量":"' + val.number + '","进货单价":"' + val.PRICE 
                        + (idx == this.tableData.length - 1 ? '"}' : '"},')
                }
            })
            console.log(str)
            if(state){
                let obj = {
                    shop_booth_id: Number(this.scShopId),
                    data: str.length > 0 ? '[' + str + ']' : '',
                }
                SaveInTzAgain(obj)
                    .then(res =>{
                        console.log(res)
                        if (res.result == true) {
                            this.$message.success(res.message ? res.message : '保存成功');
                            this.$router.push({name: 'EntryTzCq'})
                        }else{
                            this.$message.error(res.message ? res.message : '保存失败');
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },

    }

}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
        .bigimg-box{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 666;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
            .images{
                text-align: center;
            }
            .el-carousel{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                .image{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            .el-carousel__container{
                width: 100%;
                height: 100%;
            }
            .el-carousel__item{
                color: #475669;
                font-size: 14px;
                margin: 0;
            }
        }
        .msg{
            font-size: 14px;
            margin: 12px 0;
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
                width: 200px;
            }
            .msg-item{
                margin: 10px 0;
                width: 500px;
                display: flex;
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
            }
        }
        .box{
            clear: both;
            padding: 10px 20px;
            background: #fff;
            .list{
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 20%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
                .msg-item{
                    margin: 10px 0;
                    width: 500px;
                    display: flex;
                }
            }
            .btn{
                clear: both;
                margin-right: 100px;
                text-align: right;
            }
        }
        .table{
            clear: both;
            margin: 10px 0;
            padding: 0 16px;
            background: #fff;
            .title{
                display: flex;
                margin: 10px 0;
            }
            .el-input, .el-date-picker{
                width: 130px;
                margin-right: 14px;
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
        .el-table{
            margin-top: 20px;
        }
        .save-btn{
            margin-top: 10px;
            padding: 20px 0;
            text-align: center;
        }
        .add-btn{
            margin: 10px 0;
            width: 100%;
        }
        .el-pagination{
            text-align: center;
        }
        .list-title{
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #e4e7ed;
            span{
                padding-left: 10px;
                font-size: 14px;
                color: #666;
            }
        }
    }
</style>
<style lang="less">
.addEntryTzCq{
    .el-input__icon{
        line-height: 30px;
    }
    .el-form-item{
        width: 25%;
    }
    .el-table td{
        padding: 8px 0 !important;
    }
    .el-cascader{
        line-height: 30px;
    }
}
</style>
