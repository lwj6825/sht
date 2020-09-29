<template>
    <div class="content dataFilling">
        <div class="node">
            当前企业： <span class="span">{{node_name}}</span>
        </div>
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期：">
                        <el-date-picker clearable style="width: 300px" v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <!-- <span class="clear-content" @click="clearFun">清空筛选条件</span> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">历史上传</p>
                <div>
                    <el-button type="primary" class="mybtn" plain @click="isShowFun(1)">数据上传</el-button>
                </div>
                </div>
            </div>
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass" v-loading="Dataloading">
                    <el-table-column class="data" prop="date" label="上传日期"></el-table-column>
                    <el-table-column prop="num" label="上传数据量">
                      <template slot-scope="scope">
                        {{'共上传'+ scope.row.num + '条数据'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="file_name" width="500" label="文件名称"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                           <el-button type="text" size="small" @click="downloadFun(scope.row.file_name,scope.row.node_name,scope.row.date)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
            </div>
            <!--批量导入、导出-->
            <div class="passwrd file" v-if="isfile" v-loading="loading_batch">
                <div class="text">
                    <div class="box-title">
                        <p class="tit">{{types == 1 ? '导入' : '导出'}}</p>
                        <p class="iconfont icon-close close" @click="closeFun3"></p>
                    </div>
                    <div class="msg-box">
                        <div class="data">
                            <div class="tit">填报企业</div>
                            <div class="msg">{{node_name}}</div>
                        </div>
                        <div class="data">
                            <div class="tit">填报日期：</div>
                            <div class="msg">
                                <el-date-picker style="width: 150px;" v-model="in_date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                placeholder="选择日期"></el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="file-btns">
                        <div v-if="types == 1">
                            <span class="submit">
                                确认导入
                                <form id="upload" enctype="multipart/form-data" method="post">
                                    <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                                </form>
                            </span>
                        </div>
                        <!-- <div v-else-if="types == 2">
                            <p class="download" @click="downloadFun">导出</p>
                        </div> -->
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
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate;
    return currentdate
}
import {fileParseFT} from '../../js/address/url.js';
import {GetReportRecordFengTai,GetfileExportFT} from '../../js/DataReport/DataReport.js';
import axios from 'axios';
export default {
    name:"dataFilling",
    data() {
        return {
            isShow: true,
            form: {
                dataTime: '',
                enterprise: '',
                tbqy: '',
                states: '',
            },
            inline: true,
            page: 1,
            cols: 15,
            num: 0,
            page2: 1,
            cols2: 15,
            num2: 0,
            tableData: [],
            userId: '',
            enterpriseArr: [],
            tbqyArr: [],
            statesArr: [],
            isfile: false,
            isEdits: false,
            merchant: '',
            merchantName:'',
            merchantArr: [],
            tbqy: '',
            in_date: '',
            name: '',
            tableData2: [],
            goodNum: '',
            isZnlr: false,
            message: '',
            activeName: 'first',
            isView: false,
            tbrqView: '',
            tbqyView: '',
            tbqyUserId: '',
            tbqyName: '',
            region: '',
            regionArr: [],
            newGoodArr: [],
            newGoodObj: {},
            biz_id: '',
            biz_name: '',
            viewNodeId: '',
            istableAdd: false, // 点击列表操作添加报表
            allGood: [],
            selectGood: [],
            company: 0,
            isSearch: false, // 是否搜索报价商品
            unitName: '公斤',
            node_id: '',
            node_name: '',
            viewGood: [],
            isGoodMsg: false,
            goodName: '',
            tableData3: [],
            loading: false, // 新增商品
            loading2: false, // 查看商品
            loading3: false, // 查看商品详细信息
            isAgain: false, // 再次报价
            tbqy_name: '',
            startTime: '',
            endTime: '',
            Dataloading:true,
            listTime:'',
            chooseMer:false,
            merloading:false,
            region_name:'',
            userId: '',
            types: 0,
            loading_batch: false,
            file: '',
            unit: '',
            roleId: '',
            count: 1,
            retail_count: 0,
            addGood: [], // 添加商品切换区域
            save_loading: false,
        }
    },
    mounted() {
      if(localStorage.getItem('loginName').indexOf(' ')>-1){
        this.node_name = localStorage.getItem('loginName').split(' ')[0];
      }else{
        this.node_name = localStorage.getItem('loginName').split('-')[0];
      }
        this.getTime()
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
      isShowFun(ele){
          var currentTime = new Date()
          this.in_date = formatDate(currentTime)
          this.isfile = true
          this.types = ele
      },
        fileFun(event,index){
            this.loading_batch = true
            let file = event.target.files[0];
            if(file!= undefined && file!='' && file!=null){
              let formData = new FormData();
              formData.append('myfile', file);
              formData.append('name', this.node_name);
              formData.append('date', this.in_date);
              let config = {
                  headers:{'Content-Type': 'multipart/form-data'}
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
              let url = fileParseFT
              ajaxPost(url,formData,config)
                  .then(data => {
                      this.loading_batch = false
                      this.$refs.file.value = null;
                      let res = data[0];
                      if (res.result == true) {
                          // this.closeFun3()
                          this.$alert('导入成功', '提示', {
                              confirmButtonText: '确定',
                              type: 'success',
                              callback: action => {

                              }
                          });
                          this.isfile = false;
                          this.GetReportRecordFengTaiFun()
                      }else{
                          this.$alert(res.message ? res.message : '导入失败', '提示', {
                              confirmButtonText: '确定',
                              type: 'error',
                              callback: action => {

                              },
                          });
                      }
                      this.file = ''
                      // event.target.value = '';
                  })
                  .catch(res => {
                      console.log(res)
                      this.loading_batch = false
                      this.$refs.file.value = null;
                  })
            }

        },

        // 关闭导入
        closeFun3(){
            this.isfile = false
            this.types = ''
            this.tbqy_name = ''
            this.tbqy = ''
            this.tbqyUserId = ''
            this.tbqyName = ''
            this.region = ''
            this.regionArr = []
            this.newGoodArr = []
            this.newGoodObj = {}
            this.tableData2 = []
            this.merchant = ''
            this.biz_id = ''
            this.biz_name = ''
            this.merchantArr = []
            this.activeName = 'first'
            this.page2 = 1
            this.num2 = ''
            this.name = ''
            this.istableAdd = false
            var currentTime = new Date()
            this.in_date = formatDate(currentTime)
            this.listTime = ''
            this.company = 0
            this.isSearch = false
            this.selectGood = []
            this.allGood = []
            this.unitName = '公斤'
            this.viewGood = []
        },
        GetReportRecordFengTaiFun(){
            let params = {
                "page": this.page,
                "cols": this.cols,
                "end_date": this.endTime,
                "start_date": this.startTime,
                "node_name": this.node_name,
            }
             GetReportRecordFengTai(params)
                .then(res => {
                    this.Dataloading = false;
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total;
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        searchFun(){
          this.page = 1;
          this.GetReportRecordFengTaiFun();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.GetReportRecordFengTaiFun();

        },
        clearFun(){
            this.form = {
                dataTime: '',
            }
            this.page = 1
            this.getTime()
            let arr = []
            arr.push(this.startTime)
            arr.push(this.endTime)
            this.form.dataTime = arr
            this.GetReportRecordFengTaiFun()
        },
        timeChange(ele){
            if(this.form.dataTime){
                this.startTime = this.form.dataTime[0]
                this.endTime = this.form.dataTime[1]
            }else{
                this.getTime();
            }
        },
        getTime(){
            var start = new Date();
            var endTime = formatDate(start);
            this.endTime = timestampToTime(endTime);
            var currentTime = new Date(start.getTime() - 6 * 24 * 3600 * 1000);
            this.startTime = formatDate(currentTime);
            let arr = [this.startTime,this.endTime];
            this.form.dataTime = arr;
            this.GetReportRecordFengTaiFun();
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
        .node{
            padding: 10px 20px;
            margin-bottom: 10px;
            background: #fff;
            font-size: 14px;
            .span{
                font-weight: bolder;
            }
        }
        .num{
            div{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                align-items: center;
                .num-p{
                    width: 100px;
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
                .mybtn{
                  background-color: #409EFF;
                  color: #fff;
                }
            }
        }
        .tables{
            padding: 0 10px 10px;
            background: #fff;
            .el-table td{
              padding: 10upx 0;
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
                margin-top: -340px;
                margin-left: -310px;
                width: 600px;
                height: 620px;
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
                        .el-select, .el-input{
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
                    left: 30%;
                    display: inline-block;
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
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
                    color: #409EFF;
                    background: #fff;
                    text-align: center;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #409EFF;
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
    .dataFilling{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
        .el-input__icon{
            line-height: 30px;
        }
        .el-table td{
          padding: 5px 0;
        }
        .el-tabs__header{
            margin: 0 10px 10px !important;
        }
    }
</style>
