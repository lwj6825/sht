<template>
    <div class="content">
        <div class="data">
            <div class="title">生产日期：</div>
            <div class="msg">{{entryTime}}</div>
        </div>
        <div class="data">
            <div class="title">生产商品：</div>
            <div class="msg">{{salesGood}}</div>
        </div>
        <div class="data">
            <div class="title">生产数量：</div>
            <div class="msg">{{number}}</div>
        </div>
        <div class="data">
            <div class="title">生产批次号：</div>
            <div class="msg">{{batchNo}}</div>
        </div>
        <div class="data">
            <div class="title">进货商品信息：</div>
            <div class="msg view" @click="viewFun">查看进货商品信息</div>
        </div>
        <div class="search">
            <div class="title">箱码号</div>
            <el-input v-model="box_no" clearable></el-input>
            <el-button type="text" size="small" @click="searchFun">搜索</el-button>
        </div>
        <el-table :data="tableData2" :header-cell-style="rowClass">
            <el-table-column prop="in_date" label="日期"> 
                <template slot-scope="scope">
                    <p>{{entryTime}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="goods_name" label="生产商品"> </el-table-column>
            <el-table-column prop="box_no" label="箱码号"> </el-table-column>
            <el-table-column prop="batch_id" label="批次号"> </el-table-column>
            <el-table-column prop="erweima" label="二维码" width="510">
                <template slot-scope="scope">
                    <p class="btn" @click="lookFun(scope.row)">{{scope.row.erweima}}</p>
                    <!--<iframe :src="scope.row.erweima" width="96%"frameborder="0" id="contentIframe"></iframe>
                    <el-button type="text" size="small" @click="lookFun(scope.row)">{{scope.row.erweima}}</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total" background @current-change="handleCurrentChange" :page-size="cols"
          layout="total, prev, pager, next, jumper" :total='total'>
        </el-pagination>
        <div class="big-img" v-show="isBigImg" ref="boxsize">
            <p class="iconfont icon-close close" @click="closeFun2"></p>
            <div class="imgBox">
                <iframe :src="url" class="iframe" scrolling="auto" width="96%" height="100%" frameborder="0" id="contentIframe"></iframe>
            </div>
        </div>
        <div class="passwrd" v-if="isShow">
            <div class="text">
                <div class="box-title">
                    <p class="tit">查看进货商品信息</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="table">
                    <el-table :data="tableData" :header-cell-style="rowClass">
                        <el-table-column prop="or_goods_name" label="进货商品"></el-table-column>
                        <el-table-column prop="or_unit" label="规格"></el-table-column>
                        <el-table-column prop="or_number" label="数量"></el-table-column>
                        <el-table-column prop="or_batch_id" label="进货批次号"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryPurchaseInfo,FindProduction} from '../../js/production/production.js'
export default {
    name:"viewProduction",
    data() {
        return {
            entryTime: '',
            salesGood: '',
            number: '',
            batchNo: '',
            isShow: false,
            tableData: [],
            tableData2: [],
            box_no: '',
            production_id: '',
            isBigImg: false,
            sizeObj: {},
            url: '',
            imgHeight: '',
            page: 1,
            cols: 15,
            total: 0,
        }
    },
    mounted() {
        // console.log(this.$route.params.param)
        let param = this.$route.params.param
        this.entryTime = param.SC_DATE
        this.salesGood = param.GOODS_NAME
        this.number = param.NUMBER
        this.batchNo = param.BATCH_ID
        this.production_id = param.PRODUCTION_ID
        this.getFindProductionFun()
    },
    methods: {
        handleCurrentChange(val) { //currentPage 改变时会触发
            this.page = val
            this.getFindProductionFun()
        },
        searchFun(){
            this.page = 1
            this.getFindProductionFun()
        },
        lookFun(ele){
            this.isBigImg = true
            this.url = ele.erweima
        },
        closeFun2(){
            this.isBigImg = false
        }, 
        getFindProductionFun(){
            let obj = {
                production_id: this.production_id,
                box_no: this.box_no,
                page: this.page,
                cols: this.cols
            }
            FindProduction(obj)
                .then(res => {
                    this.tableData2 = res.data.dataList
                    this.total = res.data.condition.total
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
            
        },
        getDataFun(){
            let obj = {
                userdefine_batch_id: this.batchNo
            }
            QueryPurchaseInfo(obj)
                .then(res => {
                    this.tableData = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        viewFun(){
            this.getDataFun()
            this.isShow = true
        },
        closeFun(){
            this.isShow = false
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
        padding: 10px 50px;
        background: #fff;
        .iframe{
            width: 96%;
            height: 700px;
        }
        .btn{
            font-size: 13px;
            color: #409EFF;
            cursor: pointer;
        }
        .search{
            display: flex;
            font-size: 14px;
            line-height: 60px;
            .el-input{
                margin: 0 20px;
                width: 200px;
            }
        }
        .data{
            display: flex;
            font-size: 14px;
            line-height: 60px;
            .title{
                margin-right: 50px;
                width: 200px;
                text-align: right;
            }
            .view{
                color: #666;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .passwrd{
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
                margin-top: -200px;
                margin-left: -300px;
                width: 600px;
                height: 400px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        width: 330px;
                        line-height: 40px;
                        font-size: 14px;
                    }
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
                .table{
                    margin: 10px;
                    height: 330px;
                    overflow: auto;
                }
            }
        }
        .big-img{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 999;
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
            .imgBox{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
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
            
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
    }

</style>
