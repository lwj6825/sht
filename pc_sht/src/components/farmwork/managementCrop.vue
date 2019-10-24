<template>
    <div class="content">
        <div class="section">
            <span class="title">合作社名称</span>
            <el-input class="search-input" v-model="cooperativeName" placeholder="请输入合作社名称" clearable size="small"></el-input>
            <span class="title">联系人</span>
            <el-input class="search-input" v-model="contactPeople" placeholder="请输入联系人姓名" clearable size="small"></el-input>
            <el-button class="search-btn" type="primary" @click='search' size="mini">搜索</el-button>
            <!--<el-button class="search-btn" size="mini">导出</el-button>-->
            <span class="clear" @click="clear">清空筛选条件</span>
        </div>
        <div class="box">
            <div class="header">
                <span class="title">全部合作社</span>
                <!--<el-button class="btn" size="small">批量导入</el-button>-->
                <el-button class="btn" type="primary" @click='addNewCooperative' size="small">新增合作社</el-button>
            </div>
            <div class="table-list">
                <!--<el-table :data="tableData" border style="width: 100%">-->
                <el-table :data="tableData"  style="width: 100%" :cell-style="getRowheight" :header-cell-style="getRowClass" >
                    <el-table-column prop="username" label="账号"> </el-table-column>
                    <el-table-column prop="booth_name" label="合作社名称"> </el-table-column>
                    <el-table-column prop="contacts" label="联系人"> </el-table-column>
                    <el-table-column prop="callphone" label="联系方式"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="infor(scope.row)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
        </div>
    </div>
</template>

<script>
import {CropMgm} from '../../js/farmthings/farmworkget.js'
export default {
    name:'managementCrop',
    data(){
        return{
            // userId:28,
          localuserId:'',
            cooperativeName:'',//合作社名称
            contactPeople:'',//联系人姓名
            tableData:[
                {
                    account: 'zhenshunhong',
                    name: '北京真顺红果蔬专业合作社',
                    contactPeople: '张士芳',
                    contactWay: '13579246810',
                }
            ],
            page: 1,
            cols: 10,
            num: 0,
        }
    },
    mounted(){
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
        this.getCropList(this.contactPeople,this.cooperativeName);
    },
    methods:{
        handleCurrentChange(val) {
            this.page = val
            this.getCropList()
        },
        addNewCooperative(){
            this.$router.push({name:'AddCrop'})
        },
        infor(row){
            // console.log(row)
            this.$router.push({name:'InforCrop',params:row})
        },
        getCropList(contactName,cropName){//获取合作社列表
            let data = {
                userId:this.localuserId,
                contacts:contactName,
                booth_name:cropName,
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
        search(){
            this.getCropList(this.contactPeople,this.cooperativeName);
        },
        clear(){
            this.cooperativeName = '';
            this.contactPeople = '';
          this.getCropList(this.contactPeople,this.cooperativeName);
        },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#F5F5F5;height:40px; padding: 0px 0; '
        } else {
          return ''
        }
      },

      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'


      },
    }
}
</script>

<style lang='less' scoped>
    .content{
        height: 100%;
        box-sizing: border-box;
        .section{
            padding: 20px 25px;
            background: #fff;
            overflow: hidden;
            .title,.search-input,.search-btn,.clear{
                float: left;
                display: block;
            }
            .title,.clear{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color:#333;
            }
            .clear{
                cursor: pointer;
                color: #999;
            }
            .search-input{
                margin-left: 15px;
                margin-right: 20px;
                width: 200px;
            }
            .search-btn{
                margin-top: 2px;
                margin-right: 10px;
                color: #409EFF;
                background: #fff;
            }
        }
        .box{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
            font-size: 14px;
            .header{
                height: 38px;
                line-height: 38px;
                overflow: hidden;
            }
            .title{
                float: left;
                display: block;
                padding-left: 5px;
                margin-top: 4px;
                height: 30px;
                line-height: 30px;
                border-left: 2px solid #409EFF;
            }
            .btn{
                float: right;
                padding: 0px 20px;
                margin-left: 20px;
            }
        }
        .table-list{
            margin-top: 10px;

        }
        .el-pagination{
            margin: 30px;
            text-align: center;
        }
    }
</style>
<style lang='less'>
.table-list{
    .el-table__header-wrapper thead tr th{
        padding:10px 0;
        background: #f2f2f2;
    }
    .el-table__body-wrapper tbody tr td{
        padding:8px 0;
    }
}
</style>
