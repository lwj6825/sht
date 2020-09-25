<template>
    <div class="content viewEntryTzCq">
        <div class="box">
            <div class="list-title">台账信息</div>
            <div class="view">
                <div class="list">
                    <div class="data">
                        <div class="title">供应商</div>
                        <div class="msg">
                            <p>{{form.gys ? form.gys : '无'}}</p>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">进货日期</div>
                        <div class="msg">
                            <p>{{form.in_date ? form.in_date : '无'}}</p>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">生产单位</div>
                        <div class="msg">
                            <p>{{form.ghdw ? form.ghdw : '无'}}</p>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">产地</div>
                        <div class="msg">
                            <p>{{form.area_origin_name ? form.area_origin_name: '无'}}</p>
                        </div>
                    </div>
                    <div class="data">
                        <div class="title">单据上传</div>
                        <div class="msg">
                            <p>{{form.djsc ? form.djsc : '无'}}</p>
                        </div>
                    </div>
                    <div class="data" v-if="isImgList">
                        <div class="title">单据管理</div>
                        <div class="msg-item">   
                            <div class="img-list">
                                <ul v-if="imgArr1.length > 0">
                                    <li v-for="(item,index) in imgArr1" :key="index">
                                        <figure class="image">
                                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url" @click="bigImgFun(index)" v-if="item.img_url">
                                        </figure>
                                    </li>
                                </ul>
                                <p v-else>无</p><!---->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="list-title">商品信息<span>(已选{{count}}种商品，合计￥{{totalPrice}})</span></div>
            <div class="table">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
                    <el-table-column prop="goods_unit" label="单位规格"> </el-table-column>
                    <el-table-column prop="price" label="单价"> </el-table-column>
                    <el-table-column prop="scrq" label="生产日期"> </el-table-column>
                    <el-table-column prop="number" label="数量"> </el-table-column>
                    <el-table-column prop="bzq" label="保质期"> </el-table-column>
                    <!--
                    <el-table-column prop="brand" label="品牌"> </el-table-column>-->
                </el-table>
            </div>
            </div>
        </div><!--
        <div class="bigimg-box" v-show="isBigImg" ref="boxsize">
            <div class="imgBox">
                <p class="close" @click="closeFun">X</p>
            </div>
            <div class="imgBox">
                <el-carousel trigger="click" :autoplay="autoplay" :initial-index="current" :height="imgHeight + 'px'">
                    <el-carousel-item  v-for="(item,index) in imgArr1" :key="index" v-if="imgArr1.length>0">
                        <figure class="images" v-if="item.img_url">
                            <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                        </figure>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>-->
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
import {TzAdd,UpdatePc,GetAllBiz,QueryInTzDetailByTzId,QuerySuppiler,GetAllTzGys,TzUpdate, SearchDoc, QueryPcTzInfoDetailList} from '../../js/standingBookCq/standingBookCq.js'
import {purchase,getDefaultProductTypes} from "../../js/goods/goods.js";
import {getAddr} from '../../js/user/user.js';
export default {
    name: "viewEntryTzCq",
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
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        this.areaId = this.$route.query.areaId
        this.region = this.$route.query.areaId
        this.bigAreaId = this.$route.query.bigAreaId
    },
    mounted() {  
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.loginName =  localStorage.getItem('loginName');
        this.node_id = localStorage.getItem('loginId')
        // var currentTime = new Date()
        // this.form.in_date = formatDate(currentTime)
        let param = JSON.parse(this.$route.query.param)
        console.log(param)
        this.tzId = param.tz_id
        this.form.gys = param.seller_booth_name
        this.form.in_date = param.in_date
        this.form.ghdw = param.suppiler_name
        this.form.area_origin_name = param.addr
        this.form.gys = param.seller_booth_name
        this.detailTzFun()
    },
    methods: {
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
        getImgFun(){
            let obj = {
                tz_id: this.tzId,
                node_id: this.node_id,
                tz_type: 1,
            }
            SearchDoc(obj)
                .then(res => {
                    this.imgArr1 = res.data              
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 详情
        detailTzFun(){
            let obj = {
                tz_id: this.tzId,
            };
            QueryPcTzInfoDetailList(obj)
                .then(res => {
                    this.tableData = res.data.tzList
                    this.count = this.tableData.length
                    this.tableData.forEach(val => {
                        this.totalPrice += Number(val.price)
                    })
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
                width: 170px;
            }
        }
        .msg-item{
            display: flex;
            margin: 10px 0;
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin-right: 10px;
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
            p{
                color: #999;
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
.viewEntryTzCq{
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
