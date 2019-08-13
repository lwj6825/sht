<template>
    <div class="content farmingList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="90px">
                    <el-form-item label="养殖场名称">
                        <el-select v-model="form.farmingName" filterable clearable placeholder="请选择">
                            <el-option v-for="item in farmingList" :key="item.a_conf_id" :label="item.a_conf_item" :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间" style="width: 390px;" >
                        <el-date-picker clearable style="width: 300px"
                            v-model="form.dataTime" value-format="yyyy-MM-dd"
                            type="daterange" @change="timeChange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属企业">
                        <el-select v-model="form.enterprise" filterable clearable placeholder="请选择">
                            <el-option v-for="item in enterpriseList" :key="item.a_conf_id" :label="item.a_conf_item" :value="item.a_conf_id">
                            </el-option>
                        </el-select>
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
                <p class="tz-title">全部养殖场</p>
                <div>
                    <el-button type="primary" class="addBtn blue-bth" @click="addFun"> + 新增养殖场</el-button>
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
                    <el-table-column prop="in_date" label="创建日期"> </el-table-column>
                    <el-table-column prop="buyer_booth_name" label="编号"> </el-table-column>
                    <el-table-column prop="seller_booth_name" label="养殖场名称"> </el-table-column>
                    <el-table-column prop="suppiler_name" label="养殖规模"> </el-table-column>
                    <el-table-column prop="extra2" label="养殖品种"> </el-table-column>
                    <el-table-column prop="extra2" label="负责人"> </el-table-column>
                    <el-table-column prop="actual_money" label="所属企业"> </el-table-column>
                    <el-table-column label="操作" width='220'>
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detailTzFun(scope.row)">查看养殖档案</el-button>
                            <el-button type="text" size="small" @click="editFun(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="deleteTzFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <!--新增 编辑-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}养殖场</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form2" :model="form2" label-width="120px">
                    <el-form-item label="所属企业">
                        <el-select v-model="form2.enterprise" filterable clearable placeholder="请选择">
                            <el-option v-for="item in enterpriseList" :key="item.a_conf_id" :label="item.a_conf_item" 
                                :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="养殖场编号">
                        <el-input clearable v-model="form2.yzcNum"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖场名称">
                        <el-input clearable v-model="form2.yzcName"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖规模">
                        <el-input clearable v-model="form2.yzcSize"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖品种">
                        <el-select v-model="form2.varieties" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in varietiesArr" :key="index" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                        <!--<el-cascader v-model="form2.varieties" :options="systemDefaultType"
                            filterable @change="handleChange" :props="props" change-on-select>
                        </el-cascader>-->
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-cascader :options="addrOptions" v-model="form2.addr" placeholder="省/市/县" class="address" clearable 
                            :props="propes" change-on-select></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input clearable v-model="form2.addrName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input clearable v-model="form2.people"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input clearable v-model="form2.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖场介绍">
                        <el-input clearable v-model="form2.introduce" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                    <figure class="image">
                                        <p class="icon-delete" @click="removeFun(index)">-</p><!---->
                                        <img :src="item.img_url">
                                    </figure>
                                </li>
                            </ul>
                            </div>
                            <div>
                                <div class="submit">
                                    上传图片
                                    <form id="upload" enctype="multipart/form-data" method="post"> 
                                        <input type="file" class="file" ref="file" @change="fileFun($event)">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm">确认</el-button>
                    </el-form-item>
                </el-form>
            
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
    var D = date.getDate() + ' ';
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
import {getDefaultProductTypes} from "../../js/goods/goods.js";
import {getAddr} from '../../js/user/user.js';
export default {
    name:"farmingList",
    data() {
        return {
            form: {
                dataTime: '',
                farmingName: '',
                enterprise: '',
            },
            startTime: '',
            endTime: '',
            enterpriseList: [],
            farmingList: [],
            file: '',
            tableData: [
                {in_date: '07-11'}
            ],
            page: 1,
            cols: 15,
            num: 0,
            url: '',
            imgArr1: [],
            imgArrs: [],
            prompt: '新增',
            isEdits: false,
            form2: {
                enterprise: '', // 所属企业
                yzcNum: '', // 养殖场编号
                yzcName: '', // 养殖场名称
                yzcSize: '', // 养殖规模
                varieties: '', // 养殖品种
                addr: [], // 地址
                addrName: '', // 详细地址
                people: '', // 负责人
                phone: '', // 联系方式
                introduce: '', // 养殖场介绍
            },
            enterpriseList: [],
            varietiesArr: [],
            // systemDefaultType:[],
            // props: {
            //     value: 'level_id',
            //     label: 'type_name',
            //     children: 'systemDefaultTypeList'
            // },
            addrOptions:[],
            propes:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
        }
    },
    mounted() {
        this.systemDefaultTypeLists()
        this.getAddrList()
        this.getTime()
        let arr = []
        arr.push(this.startTime)
        arr.push(this.endTime)
        this.form.dataTime = arr
    },
    methods: {
        editFun(ele){
            this.prompt = '修改'
            this.isEdits = true
        },
        handleChange(value) {
            this.form2.varieties =value[value.length - 1];
        },
        // 查询品种列表
        systemDefaultTypeLists(){
            getDefaultProductTypes()
                .then(res =>{
                    this.systemDefaultType = res;
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        submitForm(){
            let addrArr = [];
            this.addrOptions.forEach(ele => {
                if(ele.szm == this.form.addr[0]){
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.form.addr[1]){
                            addrArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form.addr[2]){
                                    addrArr.push(ele.caption)                              
                                }
                            })
                        }
                    })
                }
            })
            // areaOriginId: this.form.addr[this.form.addr.length-1],
            // areaOriginNname: addrArr.join(""),
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.newAssetsTypeFun()
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        addFun(){
            this.prompt = '新增'
            this.isEdits = true
        },
        cancelFun(){
            this.closeFun()
        },
        closeFun(){
            this.form2 = {
                enterprise: '', // 所属企业
                yzcNum: '', // 养殖场编号
                yzcName: '', // 养殖场名称
                yzcSize: '', // 养殖规模
                varieties: '', // 养殖品种
                addr: [], // 地址
                addrName: '', // 详细地址
                people: '', // 负责人
                phone: '', // 联系方式
                introduce: '', // 养殖场介绍

            }
            this.isEdits = false
        },
        detailTzFun(ele){
            this.$router.push({name: 'ViewFarming'})
        },
        deleteTzFun(ele){

        },
        handleCurrentChange(val) {
            this.page = val
        },
        fileFun(event){
            let that = this
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('importAssets', this.file);   
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
            // let url = importAssets + '?userid=' + this.userId
            // ajaxPost(url,formData,config)
            //     .then(res => {
            //         if(res[0].result == true){
            //             this.$message.success(res[0].message);
            //         }else{
            //             this.$message.error(res[0].message);
            //         }
            //         // that.$refs.file.value = null
            //         this.file = null
            //     })
            //     .catch(res => {
            //         console.log(res)
            //         this.$message.error("出错了");
            //     })

        },
        searchFun(){

        },
        clearFun(){
            this.form = {
                dataTime: '',
                farmingName: '',
                enterprise: '',
            }
            this.getTime()
            this.page = 1
        },
        getAddrList(){//获取地区列表
            getAddr()
                .then(res => {
                    this.addrOptions = res.data.dataList
                    // let addrArr = [];
                    // if(this.$route.params.goodsMsg){
                    //     if(this.$route.params.goodsMsg.areaOriginNname){
                    //         let areaName = this.$route.params.goodsMsg.areaOriginNname
                    //         if(areaName.slice(0,3) == '北京市'){
                    //         this.addrOptions.forEach(ele => {
                    //             addrArr.push('110000')
                    //             ele.list.forEach(ele => {
                    //                 if(areaName.slice(3,6) == ele.caption){
                    //                 addrArr.push(ele.szm)
                    //                 ele.list.forEach(ele => {
                    //                     if(areaName.slice(6) == ele.caption){
                    //                     addrArr.push(ele.szm)                              
                    //                     }
                    //                 })
                    //                 }
                    //             })
                    //         })
                    //         }else if(areaName.slice(0,3) == '上海市'){
                    //         this.addrOptions.forEach(ele => {
                    //             addrArr.push('310000')
                    //             ele.list.forEach(ele => {
                    //                 if(areaName.slice(3,6) == ele.caption){
                    //                 addrArr.push(ele.szm)
                    //                 ele.list.forEach(ele => {
                    //                     // console.log(ele)
                    //                     if(areaName.slice(6) == ele.caption){
                    //                     addrArr.push(ele.szm)                              
                    //                     }
                    //                 })
                    //                 }
                    //             })
                    //         })
                    //         }else{
                    //         return
                    //         }
                    //         this.form.addr = addrArr.slice(0,3)
                    //     }
                    // }
                })
                .catch(res => {
                    console.log(res)
                })
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
            var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
            overflow: auto;
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -370px;
                margin-left: -280px;
                width: 560px;
                height: 740px;
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
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 30px;
                    .el-input,.el-select,.el-textarea,.el-cascader{
                        width: 300px;
                    }
                    .btn{
                        margin-left: 80px;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 10px 0;
                    position: relative;
                    left: 10%;
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
                .btn{
                    margin-left: 270px;
                }
                
            }
        }
        .msg-item{
            margin: 10px 0;
            width: 500px;
            display: flex;
            .submit{
                margin: 0 30px;
                position: relative;
                left: 0;
                top: 20%;
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
                    height: 30px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
            }
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin: 10px;
                        .icon-delete{
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 12px;
                            height: 12px;
                            text-align: center;
                            line-height: 7px;
                            font-size: 24px;
                            background: #990000;
                            color: #fff;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    .farmingList{
        .el-range-editor.el-input__inner{
            padding: 0 10px;
        }
        .el-date-editor .el-range__icon,.el-date-editor .el-range-separator{
            line-height: 30px;
        }
        .el-table__body-wrapper{
            font-size: 13px;
        }
        .el-table td{
            padding: 5px 0;
        }
    }
</style>
