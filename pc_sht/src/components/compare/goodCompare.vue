<template>
    <div class="content goodCompare">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="90px">
                    <el-form-item label="节点名称">
                        <el-input class="placeholder" v-model="form.node_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="国标编码：">
                        <el-input v-model="form.gb_code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="国标名称：">
                        <el-input v-model="form.gb_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类：">
                        <el-select v-model="form.types">
                            <el-option v-for="(item, index) in typesArr" :key="index" :label="item.type_name" :value="item.level_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="自定义编码">
                        <el-input class="placeholder" v-model="form.custom_code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="自定义名称">
                        <el-input class="placeholder" v-model="form.custom_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="标签编码">
                        <el-input class="placeholder" v-model="form.label_code" clearable></el-input>
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
                <p class="tz-title">数据列表</p>
                <div>
                    <el-button type="primary" @click="addFun"> + 添加</el-button>
                    <div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <el-button plain @click="editAll">批量编辑</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="before_code" label="国标编码"></el-table-column>
                <el-table-column prop="before_name" label="国标名称"></el-table-column>
                <el-table-column prop="type_name" label="商品分类"></el-table-column><!---->
                <el-table-column prop="userdefine_code" label="自定义编码"></el-table-column>
                <el-table-column prop="userdefine_name" label="自定义名称"></el-table-column>
                <el-table-column prop="userdefine_code_one" label="自定义编码1"></el-table-column>
                <el-table-column prop="userdefine_code_two" label="自定义编码2"></el-table-column>
                <el-table-column prop="association_id" label="标签编码"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
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
import {QueryNodeUserdefine} from '../../js/compare/compare.js'
import {getDefaultProductTypes} from '../../js/goods/goods.js'
export default {
    name:"goodCompare",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                node_name: '',
                node_id: '',
                msg: '',
                gb_code: '',
                gb_name: '',
                custom_code: '',
                custom_name: '',
                label_code: '',
                types: '',
            },
            typesArr: [],
            goodArr: [],
            bizArr: [],
            nodeArr: [],
            loading: true,
        }
    },
    mounted() {
        let routeMsg1 = '';
        if(localStorage.getItem('routeMsg1')){
            routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
        }
        if(localStorage.getItem('searchMsg2')){
            this.form = JSON.parse(localStorage.getItem('searchMsg2'))
            localStorage.removeItem('searchMsg2')
        }
        this.form.node_name = routeMsg1.node_name
        this.form.node_id = routeMsg1.node_id
        this.getDefaultProductTypesFun()
        this.getDataFun()
    },
    methods: {
        // 商品分类
        getDefaultProductTypesFun(){
            let str = ''
            getDefaultProductTypes(str)
                .then(res => {
                    this.typesArr = res[0].systemDefaultTypeList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addFun(){
            localStorage.setItem('searchMsg2', JSON.stringify(this.form))
            this.$router.push({name: 'NewGoodCompare'})
        },
        editFun(ele){
            this.$router.push({name: 'EditGoodCompare', params: ele})
        },
        deleteFun(ele){

        },
        editAll(){

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
            // let url = baseUrl2 + 'goods/importPurchase'
            // ajaxPost(url,formData,config)
            //     .then(res => {
                    
            //     })
            //     .catch(res => {
            //         console.log(res)
            //     })
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                node_id: this.form.node_id, // 节点编码
                userdefine_code: this.form.custom_code, // 自定义编码
                userdefine_name: this.form.custom_name, // 自定义名称
                before_code: this.form.gb_code, // 国标编码
                before_name: this.form.gb_name, // 国标名称
                association_id: this.form.label_code, // 标签编码
                userdefine_type: 3, // 自定义类型1.商户对照2.节点对照3.商品对照4.产地对照
                level_id: this.form.types, // 商品分类
            }
            QueryNodeUserdefine(obj)
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
                msg: '',
                custom_code: '',
                custom_name: '',
                label_code: '',
            }
            let routeMsg1 = '';
            if(localStorage.getItem('routeMsg1')){
                routeMsg1 = JSON.parse(localStorage.getItem('routeMsg1'))
            }
            this.form.node_name = routeMsg1.node_name
            this.form.node_id = routeMsg1.node_id
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
