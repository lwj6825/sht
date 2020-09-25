<template>
    <div class="content viewAllGood">
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">商品列表</p>
                <div>
                    <!--<div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button @click="downloadFun">导出</el-button>-->
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="plu_code" label="商品编码"></el-table-column>
                <el-table-column prop="plu_name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="tran_date" label="日期"></el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
import {QueryNodeGoodsDetail, GetGoodsTypes, CloseReportNodeGoods} from '../../js/compare/compare.js'
export default {
    name:"viewAllGood",
    data() {
        return {
            isList: false,
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_name: '',
                node_id: '',
                msg: '',
                types: '',
                goods_code: '',
            },
            typesArr: [],
            loading: true,
        }
    },
    mounted() {
        let routeMsg3 = '';
        if(localStorage.getItem('routeMsg3')){
            routeMsg3 = JSON.parse(localStorage.getItem('routeMsg3'))
        }
        // if(localStorage.getItem('searchMsg2')){
        //     this.form = JSON.parse(localStorage.getItem('searchMsg2'))
        //     localStorage.removeItem('searchMsg2')
        // }
        this.form.node_name = routeMsg3.node_name
        this.form.node_id = routeMsg3.node_id
        this.form.goods_code = routeMsg3.goods_code
        this.getGetGoodsTypesFun()
        this.getDataFun()
    },
    methods: {
        // 商品分类
        getGetGoodsTypesFun(){
            let str = ''
            GetGoodsTypes(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        downloadFun(){

        },
        viewFun(ele){
            // this.$router.push({name: 'ViewNodeGood'})
        },
        closeFun(ele){
            this.$confirm('你确定要关闭上报吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {        
                let obj = {
                    id: ele.id
                }
                CloseReportNodeGoods(obj)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        console.log(res)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_id: this.form.node_id, // 节点编码
                goods_code: this.form.goods_code,
                // userdefine_name: this.form.msg, // 自定义名称
                // varieties_type: this.form.types
            }
            QueryNodeGoodsDetail(obj)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.dataList 
                    this.total = res.data.condition.total
                })
                .catch(res => {
                    this.loading = false
                    console.log(res)
                })
        },
        handleSizeChange(val){
            this.cols = val
            this.getDataFun()
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
                node_name: '',
                node_id: '',
                msg: '',
                types: '',
                goods_code: '',
            }
            let routeMsg2 = '';
            if(localStorage.getItem('routeMsg2')){
                routeMsg2 = JSON.parse(localStorage.getItem('routeMsg2'))
            }
            this.form.node_name = routeMsg2.node_name
            this.form.node_id = routeMsg2.node_id
            this.form.goods_code = routeMsg2.goods_code
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
    .content{
        width: 100%;
        height: 100%;
        .table{
            padding: 10px;
            background: #fff;
            .link_btns{
                color: #409EFF;
                cursor: pointer;
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
                .submit{
                    position: relative;
                    top: 0;
                    display: inline-block;
                    margin: 0 10px;
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
            }
            .zpg{
                display: flex;
                align-items: center;
                .sele-cursor{
                    height: 20px;
                    cursor: pointer;
                }
            }
            .task_name{
                p{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
    }
</style>
<style lang="less">
    .viewAllGood{
        .el-table td {
            padding: 8px 0;
        }
    }
</style>