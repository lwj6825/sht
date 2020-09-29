<template>
    <div class="content bizManageMsg">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="商户名称">
                        <el-input v-model="form.biz_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="商户编码">
                        <el-input v-model="form.biz_code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="经营类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-input v-model="form.node_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-select v-model="form.enable" clearable placeholder="请选择">
                            <el-option v-for="(item,index) in enableArr" :key="index" :label="item.text"
                            :value="item.id"></el-option>
                        </el-select>
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
                    <el-button plain @click="downloadFun">导出</el-button>
                    <div class="submit">
                        批量导入
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="node_name" label="企业名称"></el-table-column>
                <el-table-column prop="biz_id" label="商户编码"></el-table-column>
                <el-table-column prop="biz_name" label="商户名称"></el-table-column>
                <el-table-column prop="reg_id" label="身份证号"></el-table-column>
                <el-table-column prop="type_name" label="经营类型"></el-table-column>
                <el-table-column prop="legal_represent" label="法人代表"></el-table-column>
                <el-table-column prop="tel" label="手机号码/固话"></el-table-column>
                <el-table-column prop="state" label="启用/停用" width="100">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state"
                            active-value="启用" inactive-value="停用" @change="enableFun(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="is_pay" label="开通支付/关闭支付" width="140">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_pay"
                            active-value="开启支付" inactive-value="关闭支付" @change="openFun(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="node_name" label="操作" width="100">
                    <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="viewFun(scope.row)">查看</el-button>
                    <el-button size="mini" type="text" @click="editFun(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"></el-pagination>
        </div>
        <div class="password" v-if="isView">
            <div class="text">
                <div class="box-title">
                    <p class="tit">企业 {{form2.node_name}} 信息</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="jjfa">
                    <el-form ref="form2" :model="form2" label-width="140px" size="small">
                        <el-form-item label="商户编码">
                            {{form2.biz_code}}
                        </el-form-item>
                        <el-form-item label="商户名称">
                            {{form2.biz_name}}
                        </el-form-item>
                        <el-form-item label="企业编码">
                            {{form2.node_code}}
                        </el-form-item>
                        <el-form-item label="企业名称">
                            {{form2.node_name}}
                        </el-form-item>
                        <el-form-item label="身份证号">
                            {{form2.id_card}}
                        </el-form-item>
                        <el-form-item label="经营类型">
                            {{form2.types}}
                        </el-form-item>
                        <el-form-item label="法人代表">
                            {{form2.people}}
                        </el-form-item>
                        <el-form-item label="联系电话">
                            {{form2.phone}}
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button type="primary"@click="closeFun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 时间戳转日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // var h = date.getHours() + ':';
    // var m = date.getMinutes() + ':';
    // var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
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
import {QueryBusinessStateSelect, QueryBusinessTypeSelect, QueryBusiness, UpdateBusinessState, UpdateBusinessIsPay, DownloadBusiness
    } from '../../js/nodeManage/nodeManage.js'
import {importBusiness} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"bizManageMsg",
    data() {
        return {
            page: 1,
            cols: 10,
            total: 0,
            tableData: [],
            form: {
                biz_name: '',
                biz_code: '',
                types: '',
                node_name: '',
                dataTime: '',
                enable: '',
            },
            typesArr: [],
            enableArr: [],
            loading: true,
            isView: false,
            form2: {
                biz_code: '',
                biz_name: '',
                node_code: '',
                node_name: '',
                id_card: '',
                types: '',
                people: '',
                phone: '',
            },
            startTime: '',
            endTime: '',
            file: '',
        }
    },
    mounted() {
        // this.getTime()
        // let arr = []
        // arr.push(this.startTime)
        // arr.push(this.endTime)
        // this.form.dataTime = arr
        this.getQueryBusinessStateSelect()
        this.getQueryBusinessTypeSelect()
        this.getDataFun()
    },
    methods: {
        // 查询得到启用停用信息
        getQueryBusinessStateSelect(){
            let str = ''
            QueryBusinessStateSelect(str)
                .then(res => {
                    this.enableArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 查询得到经营类型下拉框信息
        getQueryBusinessTypeSelect(){
            QueryBusinessTypeSelect()
                .then(res => {
                    this.typesArr = res.data.dataList
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        enableFun(ele){
            let states = 0
            if(ele.state == '启用'){
                states = 1
            }else if(ele.state == '停用'){
                states = 2
            }
            let str = 'id=' + ele.biz_id
            UpdateBusinessState(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '修改成功');
                    }else{
                        this.$message.error(res.message ? res.message : '修改失败');
                    }
                    this.getDataFun()
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        openFun(ele){
            let str = 'id=' + ele.biz_id
            UpdateBusinessIsPay(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '修改成功');
                    }else{
                        this.$message.error(res.message ? res.message : '修改失败');
                    }
                    this.getDataFun()
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        addFun(){
            this.$router.push({name: 'AddBizManage'})
        },
        editFun(ele){
            this.$router.push({name: 'EditBizManage', params: ele})
        },
        viewFun(ele){
            this.form2 = {
                biz_code: ele.biz_id,
                biz_name: ele.biz_name,
                node_code: ele.node_id,
                node_name: ele.node_name,
                id_card: ele.reg_id,
                types: ele.type_name,
                people: ele.legal_represent,
                phone: ele.tel,
            }
            this.isView = true
        },
        downloadFun(){
            let params = {
                biz_name: this.form.biz_name,
                biz_id: this.form.biz_code,
                start_date: this.startTime,
                end_date: this.endTime,
                type_id: this.form.types, // 经营类型
                node_name: this.form.node_name,
                state_id: this.form.enable, // 是否启用（启用1停用2）
            }
            DownloadBusiness( params, {})
                .then((res) => {
                    let time = getNowFormatDate()
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                    let url = window.URL.createObjectURL(blob);
                    let aLink = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href = url;
                    aLink.setAttribute("download", `商户备案` + time);
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink); 
                    window.URL.revokeObjectURL(url); 
                })
                .catch(function (res) {});
        },
        // 上传
        fileFun(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('business', this.file);  
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
            let url = importBusiness
            ajaxPost(url,formData,config)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message ? res.message : '导入成功');
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message ? res.message : '导入失败');
                    }
                    this.file = ''
                })
                .catch(res => {
                    console.log(res)
                })
        },
        closeFun(){
            this.isView = false
            this.form2 = {
                biz_code: '',
                biz_name: '',
                node_code: '',
                node_name: '',
                id_card: '',
                types: '',
                people: '',
                phone: '',
            }
        },
        getDataFun(){
            this.loading = true
            let obj = {
                page: this.page,
                cols: this.cols,
                biz_name: this.form.biz_name,
                biz_id: this.form.biz_code,
                start_date: this.startTime,
                end_date: this.endTime,
                type_id: this.form.types, // 经营类型
                node_name: this.form.node_name,
                state_id: this.form.enable, // 是否启用（启用1停用2）
            }
            QueryBusiness(obj)
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
                biz_name: '',
                biz_code: '',
                types: '',
                node_name: '',
                dataTime: '',
                enable: '',
            }
            // this.getTime()
            // let arr = []
            // arr.push(this.startTime)
            // arr.push(this.endTime)
            // this.form.dataTime = arr
            this.page = 1
            this.getDataFun()
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.startTime = ''
                this.endTime = ''
            }
        },
        getTime(){
            var start = new Date();
            var startTime = start.setTime(start.getTime());
            this.startTime = timestampToTime(startTime)
            var currentTime = new Date()
            this.endTime = formatDate(currentTime)
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
        .password{
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
                margin-top: -255px;
                margin-left: -300px;
                width: 600px;
                height: 510px;
                background: #fff;
                font-size: 14px;
                border-radius: 5px;
                .clear{
                    clear: both;
                }
                .form{
                    margin-top: 10px;
                    height: 460px;
                    overflow: auto;
                    .el-select, .el-input{
                        width: 400px;
                    }
                    .zpg{
                        .el-select, .el-input{
                            width: 200px;
                        }
                    }
                    textarea{
                        padding-left: 10px;
                        max-width: 390px;
                        width: 400px;
                        height: 50px;
                        border: 1px solid #DCDFE6;
                        border-radius: 4px;
                    }
                }
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        font-size: 14px;
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
                }
                .jjfa{
                    margin-top: 20px;
                }
                .form-div{
                    height: 340px;
                    overflow: auto;
                }
                .form{
                    height: 330px;
                }
                textarea{
                    padding-left: 10px;
                    margin: 0 10px;
                    width: 390px;
                    height: 140px;
                    border: 1px solid #DCDFE6;
                    border-radius: 4px;
                }
                .submit{
                    left: 0;
                }
                .btn{
                    text-align: center;
                }
            }
        }
    }
</style>
<style lang="less">
    .bizManageMsg{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
    }
</style>