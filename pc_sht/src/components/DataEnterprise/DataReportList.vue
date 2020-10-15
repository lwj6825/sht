<template>
    <div class="content retailList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <el-form-item label="日期">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-select clearable v-model="form.node_nmae" @change="selectGet" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.node_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <!-- <span class="clear-content" @click="clearFun">清空筛选条件</span> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">数据列表</p>
            </div>
            <div class="tables" v-loading="loading">
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="date" label="日期" width="200"></el-table-column>
                    <el-table-column prop="node_name" label="企业名称"></el-table-column>
                    <el-table-column prop="num" label="上传数据量">
                      <template slot-scope="scope">
                        {{'共上传'+ scope.row.num + '条数据'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="file_name" width="500" label="文件名称"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                           <!-- <el-button type="text" size="small" @click="viewFun(scope.row.node_name)">查看</el-button> -->
                           <el-button type="text" size="small" @click="downloadFun(scope.row.file_name,scope.row.node_name,scope.row.date)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            <!--查看-->
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
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate;
    return currentdate
}
import {GetReportRecordFengTai,GetfileExportFT} from '../../js/DataReport/DataReport.js';
import {fileExportFT} from '../../js/address/url.js';
import axios from 'axios';
export default {
    name:"retailList",
    data() {
        return {
            isShow: true,
            form: {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
                entry: '',
                node_nmae:'',
            },
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            tableData: [],
            userId: '',
            tbqyArr: [],
            roleId: '',
            loading: true,
            options:[
              {node_name:'永辉',id:6},
              {node_name:'首航',id:1},
              {node_name:'志广',id:2},
              {node_name:'物美',id:3},
              {node_name:'岳各庄',id:4},
              {node_name:'新发地',id:5}
            ],
            buyerName:'',
            loading_batch:false
        }
    },
    mounted() {
        if(localStorage.getItem('Time')){
          let Time = localStorage.getItem('Time');
          this.startTime = JSON.parse(Time).startTime;
          this.endTime = JSON.parse(Time).endTime;
          let arr = [];
          arr.push(this.startTime);
          arr.push(this.endTime);
          this.form.dataTime = arr;
          this.GetReportRecordFengTaiFun();
          localStorage.removeItem('Time');
        }else{
          this.getTime();
        }
    },
    methods: {
      ab2str(u,f) {
         var b = new Blob([u]);
         var r = new FileReader();
          r.readAsText(b, 'utf-8');
          r.onload = function (){if(f)f.call(null,r.result)}
      },
        downloadFun(file_name,name,time){
          let _this = this;
          let formData = new FormData();
          formData.append('name', name);
          formData.append('date', time);
          GetfileExportFT( formData, {})
            .then((res) => {
              this.ab2str(res.data,function(str){
              		//str为字符串
                if(str.length>60){
                  let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
                  let url = window.URL.createObjectURL(blob);
                  let aLink = document.createElement("a");
                  aLink.style.display = "none";
                  aLink.href = url;
                  aLink.setAttribute("download", (file_name));
                  document.body.appendChild(aLink);
                  aLink.click();
                  document.body.removeChild(aLink);
                  window.URL.revokeObjectURL(url);
                }else{
                   _this.$message.error('未找到相关文件！');
                }
              });
            })
            .catch(function (res) {
                console.log(res);
            });
        },
        GetReportRecordFengTaiFun(){
            this.loading = true
            let params = {
                "page": this.page,
                "cols": this.cols,
                "end_date": this.endTime,
                "start_date": this.startTime,
                "node_name": this.buyerName,
            }
            GetReportRecordFengTai(params)
                .then(res => {
                    this.loading = false
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total;
                })
                .catch((res) => {
                    console.log(res)
                    this.loading = false
                })
        },
        searchFun(){
            this.page = 1
            this.GetReportRecordFengTaiFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.GetReportRecordFengTaiFun()
        },
        clearFun(){
            this.form = {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
                entry: '',
            }
            this.page = 1
            this.getTime()
        },
        viewFun(name){
          let obj = {
            startTime:this.startTime,
            endTime:this.endTime
          }
            localStorage.setItem('Time',JSON.stringify(obj));
            this.$router.push({name: 'DataMarketList',params: {node_name: name}})
        },
        selectGet(val){
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.buyerName = ele.node_name
                    }
                })
            }else{
                this.buyerName = ''
            }
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime()
            }
        },
        getTime(){
            var start = new Date();
            var endTime = formatDate(start)
            this.endTime = timestampToTime(endTime)
            // var currentTime = new Date(start.getTime() - 7 * 24 * 3600 * 1000)
            var currentTime = new Date()
            this.startTime= formatDate(currentTime)
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.GetReportRecordFengTaiFun()
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
        .num{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .num-p{
                    color: red;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
        .name{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .name-p{
                    color: #ccc;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
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
            position: relative;
            background: #fff;
            .file-btns{
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
            }
            .import{
                color: #409EFF;
                background: #fff;
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
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
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
                margin-top: -315px;
                margin-left: -300px;
                width: 600px;
                height: 630px;
                background: #fff;
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
                .msg-box{
                    clear: both;
                    margin: 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 80px;
                            line-height: 30px;
                        }
                        .msg{
                            flex: 1;
                            line-height: 30px;
                        }
                        .el-select{
                            width: 150px;
                        }
                    }
                }
                .tips{
                    margin-left: 20px;
                    margin-bottom: 15px;
                    margin-top: 15px;
                    font-size: 12px;
                    color: #ccc;
                }
                .search{
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 310px;
                    }
                    .el-input{
                        margin-left: 30px;
                        width: 200px;
                    }
                    .ss-btn{
                        margin-left: 20px;
                        background: #fff;
                        color: #409EFF;
                    }
                    .znlr-btn{
                        margin-right: 30px;
                    }
                }
                .btn{
                    margin-top: 10px;
                    margin-left: 30px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 50px auto;
                    position: relative;
                    left: 34%;
                    display: inline-block;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 200px;
                        height: 50px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .download{
                    margin: 50px auto;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                }
                .table{
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
        .znlr{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -180px;
                margin-left: -230px;
                width: 460px;
                height: 330px;
                font-size: 15px;
                textarea{
                    margin: 10px 30px;
                    width: 400px;
                    height: 200px;
                    background: #f2f2f2;
                }
                .btn{
                    margin: 0;
                    text-align: center;
                }
                .rules{
                    margin: 5px 20px;
                }
            }
        }
        .goodMsg{
            background: rgba(0,0,0,.2);
            .text{
                margin-top: -200px;
                margin-left: -230px;
                width: 460px;
                height: 400px;
                font-size: 15px;
                .tit{
                    width: 88%;
                    text-align: center;
                }
            }
        }
        .file{
            .text{
                margin-top: -150px;
                height: 300px;
            }
        }
    }
</style>
<style lang="less">
    .retailList{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
        .el-tabs__header{
            margin: 0 10px 10px !important;
        }
    }
</style>
