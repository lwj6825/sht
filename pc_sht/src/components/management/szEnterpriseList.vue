<template>
    <div class="content">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="企业名称">
                        <!--<el-select v-model="form.enterprise" filterable clearable placeholder="请选择">
                            <el-option v-for="item in enterpriseList" :key="item.a_conf_id" :label="item.a_conf_item" :value="item.a_conf_id">
                            </el-option>
                        </el-select>-->
                        <el-input v-model="form.enterprise" clearable size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部企业</p>
                <div>
                    <el-button type="primary" class="addBtn blue-bth" @click="addFun"> + 新建企业</el-button>
                    <!--<span class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form>
                    </span>-->
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <!--<el-table-column prop="in_date" label="编码"> </el-table-column>-->
                    <el-table-column prop="username" label="账号"> </el-table-column>
                    <el-table-column prop="booth_name" label="企业名称"> </el-table-column>
                    <el-table-column prop="contacts" label="联系人"> </el-table-column>
                    <el-table-column prop="callphone" label="联系方式"> </el-table-column>
                    <!--<el-table-column prop="actual_money" label="状态"> </el-table-column>
                    <el-table-column prop="actual_money" label="创建时间"> </el-table-column>-->
                    <el-table-column label="操作" width='220'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看</el-button>
                            <!--<el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
    </div>
</template>

<script>
import {CropMgm} from '../../js/farmthings/farmworkget.js'
export default {
    name:"szEnterpriseList",
    data() {
        return {
            form: {
                enterprise: '',
            },
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            enterpriseList: [],
            localuserId: '',
        }
    },
    mounted() {
        this.localuserId = JSON.parse(localStorage.getItem('userId'));
        this.getCropList()
    },
    methods: {
        deleteFun(ele){

        },
        getCropList(contactName,cropName){//获取合作社列表
            let data = {
                userId:this.localuserId,
                contacts: '',
                booth_name: this.form.enterprise,
                page: this.page,
                cols: this.cols,
                total: '',
            }
            CropMgm(data)
                .then(res => {
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addFun(){
            this.$router.push({name: 'SzAddEnterprise'})
        },
        detailTzFun(ele){
            this.$router.push({name: 'SzViewEnterprise',params: ele})
        },
        deleteTzFun(){

        },
        handleCurrentChange(val) {
            this.page = val
            this.getCropList()
        },
        searchFun(){
            this.page = 1
            this.getCropList()
        },
        clearFun(){
            this.form = {
                enterprise: '',
            }
            this.page = 1
            this.getCropList()
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
        height: 100%;
        .search-btn{
            margin-top: 2px;
            margin-right: 10px;
            color: #409EFF;
            background: #fff;
        }
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
            .unfold{
                text-align: center;
                font-size: 14px;
                color: #409EFF;
                cursor: pointer;
            }
            .el-form{
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
            margin: 10px 0;
            padding: 10px 0;
            background: #fff;
        }
        .table{
            position: relative;
            padding: 10px;
            background: #fff;
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    padding-left: 4px;
                    height: 20px;
                    line-height: 20px;
                    box-sizing: border-box;
                    font-size: 14px;
                    border-left: 2px solid #409EFF;
                }
                p{
                    flex: 1;
                    line-height: 30px;
                    font-size: 14px;
                }
                div{
                    display: flex;
                    justify-content: flex-end;
                    width: 300px;
                    .addBtn{
                        height: 30px;
                        margin-right: 10px;
                    }
                    .submit{
                        position: relative;
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
                            height: 36px;
                            opacity: 0;
                            background: rgba(0,0,0,0);
                        }
                    }
                   
                }
            }
            .list{
                width: 500px;
                border: 1px solid #ccc;
                .item{
                    margin: 0 10px;
                    display: flex;
                    border-bottom: 1px solid #ccc;
                    li{
                        flex: 1;
                        line-height: 30px;
                        text-align: center;
                    }
                }
                .price{
                    margin-right: 10px;
                    line-height: 30px;
                    text-align: right;
                }
            }
        }
        .el-pagination{
            text-align: center;
        }
    }

</style>
