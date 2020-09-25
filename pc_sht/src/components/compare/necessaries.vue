<template>
    <div class="content necessaries">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="商品分类">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.varieties_type" :value="item.varieties_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品信息">
                        <el-input v-model="form.msg" clearable placeholder="请输入商品名称或国标信息"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <el-button @click="clearFun">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table" v-loading="loading">
            <div class="title">
                <p class="tz-title">生活必需品列表</p>
                <div>
                    <el-button v-if="editAllBtn == '批量修改'" type="primary" @click="addFun"> + 添加</el-button>
                    <el-button v-if="editAllBtn == '批量修改'" type="primary" @click="downloadFun">导出</el-button>
                    <!--<div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>-->
                    <el-button v-if="editAllBtn == '完成'" @click="cancelFun">取消</el-button>
                    <el-button type="primary" @click="allEditFun">{{editAllBtn}}</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" :style="editAllBtn == '批量修改' ? {'display': 'block'} : {'display': 'none'}">
                <el-table-column prop="order" label="排序" width="100"></el-table-column>
                <el-table-column prop="ifmaingoods" label="标准名称" width="100"></el-table-column>
                <el-table-column prop="varieties_type" label="商品分类" width="100"></el-table-column>
                <el-table-column prop="price_section" label="价格区间（元/公斤）" width="200"></el-table-column>
                <el-table-column prop="goods_code" label="国标编码" width="100"></el-table-column>
                <el-table-column prop="name" label="国标名称" width="100"></el-table-column>
                <el-table-column prop="alias" label="别名"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="tableData" :header-cell-style="rowClass" :style="editAllBtn == '批量修改' ? {'display': 'none'} : {'display': 'block'}">
                <el-table-column prop="order" label="排序" width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.order" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="ifmaingoods" label="标准名称" width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.ifmaingoods" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="varieties_type" label="商品分类" width="100"></el-table-column>
                <el-table-column label="价格区间" width="200">
                    <template slot-scope="scope">
                        <el-input style="width: 86px;" v-model="scope.row.min_price" clearable placeholder="最小值" @input="inputFun(scope.row)"></el-input>
                        <el-input style="width: 86px;" v-model="scope.row.max_price" clearable placeholder="最大值" @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_code" label="国标编码" width="100"></el-table-column>
                <el-table-column prop="name" label="国标名称" width="100"></el-table-column>
                <el-table-column prop="alias" label="别名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.alias" clearable @input="inputFun(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            + " "  + date.getHours()  + seperator2  + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate
}
import {GetLifeBxGoods, GetGoodsTypes, DownloadLifeBxGoods, BatchUpdateLifeBxGoods, DeleteLifeBxGoods, GetGoodsTypeNew} from '../../js/compare/compare.js'
export default {
    name:"necessaries",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                types: '',
                msg: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: false,
            editAllBtn: '批量修改',
            editArr: [],
            props: {
                value: 'goods_name',
                label: 'goods_name',
                children: 'goodsCode'
            },
        }
    },
    mounted() {
        if(localStorage.getItem('varieties_type')){
            this.form.types = JSON.parse(localStorage.getItem('varieties_type'))
        }
        if(localStorage.getItem('searchMsg2')){
            this.form = JSON.parse(localStorage.getItem('searchMsg2'))
            localStorage.removeItem('searchMsg2')
        }
        this.getGetGoodsTypesFun()
        this.getDataFun()
    },
    methods: {
        // 商品分类
        getGetGoodsTypesFun(){
            let str = ''
            GetGoodsTypeNew(str)
                .then(res => {
                    this.typesArr = res.data.dataList
                    this.typesArr.forEach(val => {
                        val.goods_name = val.varieties_type
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectTypesFun(ele){
            let num = ''
            this.tableData.forEach(val => {
                if(ele.goods_code == val.goods_code){
                    num = ele.types[ele.types.length - 1]
                    this.typesArr.forEach(val2 => {
                        val2.goodsCode.forEach(val3 => {
                            if(num == val3.goods_name){
                                val.goods_code = val3.goods_code
                                val.name = val3.name
                                val.alias = val3.alias
                            }
                        })
                    })
                }
            })
        },
        inputFun(ele){
            if(this.editArr.length == 0){
                this.editArr.push(ele)
            }else{
                this.editArr.forEach((val,index) => {
                    if(val.id == ele.id){
                        this.editArr.splice(index,1)
                    }
                })
                this.editArr.push(ele)
            }
        },
        // 批量编辑
        allEditFun(){
            if(this.editAllBtn == '批量修改'){
                this.editAllBtn = '完成'
            }else if(this.editAllBtn == '完成'){
                let arr = [], itemObj = {};
                if(this.editArr.length > 0){
                    this.editArr.forEach((val,index) => {
                        itemObj = {
                            code: val.goods_code,
                            alias: val.alias,
                            ifmaingoods: val.ifmaingoods,
                            order: val.order,
                            max_price: val.max_price,
                            min_price: val.min_price
                        }
                        arr.push(itemObj)
                    })
                    let obj = "{" + '"data"' + ":" + JSON.stringify(arr) + "}"
                    BatchUpdateLifeBxGoods(obj)
                        .then(res => {
                            if (res.result == true) {
                                this.$message.success('修改成功');
                                this.editAllBtn = '批量修改'
                                this.editArr = []
                                this.getDataFun()
                            }else{
                                this.$message.error('修改失败');
                            }
                        })
                        .catch(res => {
                            this.loading = false
                            console.log(res)
                        })
                }else{
                    this.editAllBtn = '批量修改'
                    this.editArr = []
                    this.getDataFun()
                }
            }
        },
        cancelFun(){
            this.editAllBtn = '批量修改'
            this.editArr = []
            this.getDataFun()
        },
        downloadFun(){
            let params = {
                name: this.form.msg,
                varieties_type: this.form.types
            }
            DownloadLifeBxGoods( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `生活必需品商品库管理` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        addFun(){
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'NewNecessaries'})
        },
        editFun(ele){
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'EditNecessaries', params: ele})
        },
        deleteFun(ele, index){
            let obj = {
                code: ele.goods_code
            }
            DeleteLifeBxGoods(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success('删除成功');
                        this.page = 1
                        if(this.editAllBtn == '批量修改'){
                            this.getDataFun()
                        }else if(this.editAllBtn == '完成'){
                            this.tableData.splice(index,1)
                        }
                    }else{
                        this.$message.error('删除失败');
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 上传
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('purchase', this.file);  
            formData.append('userId', this.userId);  
            formData.append('node_id',this.loginId); 
            formData.append('region',this.areaId); 
            formData.append('node_name',this.loginName); 
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            const ajaxPost = function (url, params,config) {
                return new Promise((resolve, reject) => {
                    axios
                    .post(url, params,{config})
                    .then((res) => {
                        resolve(res.data)
                    })
                    .catch(() => {
                        reject('error')
                    })
                })
            }  
            // let url = 'goods/importPurchase'
            // ajaxPost(url,formData,config)
            //     .then(res => {
                    
            //     })
            //     .catch(res => {
            //         console.log(res)
            //     })
        },
        getDataFun(){
            this.loading = true
            let price = '', str = ''
            let obj = {
                page: this.page,
                cols: this.cols,
                name: this.form.msg,
                varieties_type: this.form.types
            }
            GetLifeBxGoods(obj)
                .then(res => {
                    this.loading = false
                    this.total = res.data.condition.total
                    res.data.dataList.forEach(val => {
                        str = val.price_section
                        if(str != null){
                            price = str.split("-");
                            val.min_price = price[0] // 价格区间 最大值
                            val.max_price = price[1] // 价格区间 最大值
                        }
                    })
                    this.tableData = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
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
                types: '',
                remark: '',
                explain: '',
            }
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
                    margin-bottom: 0;
                }
            }
        }
        .table{
            margin-top: 10px;
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