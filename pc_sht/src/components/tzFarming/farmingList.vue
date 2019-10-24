<template>
    <div class="content farmingList">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="90px">
                    <el-form-item label="养殖场名称">
                        <!--<el-select v-model="form.farmingName" filterable clearable placeholder="请选择">
                            <el-option v-for="item in farmingList" :key="item.a_conf_id" :label="item.a_conf_item" :value="item.a_conf_id">
                            </el-option>
                        </el-select>-->
                        <el-input clearable v-model="form.farmingName"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" style="width: 390px;">
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
                            <el-option v-for="item in enterpriseList" :key="item.a_conf_id"  :label="item.booth_name" :value="item.userId">
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
                    <el-table-column prop="record_time" label="创建日期"> </el-table-column>
                    <el-table-column prop="yzc_code" label="养殖场编号"> </el-table-column>
                    <el-table-column prop="yzc_name" label="养殖场名称" width="200"> </el-table-column>
                    <el-table-column prop="yzc_pz" label="养殖品种"> </el-table-column>
                    <el-table-column prop="yzc_gm" label="养殖规模"> </el-table-column>
                    <el-table-column prop="yzc_gm" label="地址" width="200">
                        <template slot-scope="scope">{{scope.row.area_name + scope.row.addr}}</template>
                    </el-table-column>
                    <el-table-column prop="yzc_fzr" label="负责人"> </el-table-column>
                    <el-table-column prop="booth_name" label="所属企业"> </el-table-column>
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
                <el-form class="form" ref="form2" :model="form2" :rules="rules" label-width="120px">
                    <el-form-item label="所属企业" prop="enterprise">
                        <el-select v-model="form2.enterprise" filterable clearable placeholder="请选择">
                            <el-option v-for="item in enterpriseList" :key="item.a_conf_id"  :label="item.booth_name" :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="养殖场编号" prop="yzcNum">
                        <el-input clearable v-model="form2.yzcNum"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖场名称" prop="yzcName">
                        <el-input clearable v-model="form2.yzcName"></el-input>
                    </el-form-item>
                    <el-form-item label="养殖品种" prop="varieties">
                        <el-select v-model="form2.varieties" filterable clearable placeholder="请选择" @change="pzChange">
                            <el-option v-for="(item,index) in varietiesArr" :key="index" :label="item.goods_Name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="养殖规模" prop="yzcSize">
                        <el-input clearable v-model="form2.yzcSize"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" prop="addr">
                        <el-cascader :options="addrOptions" v-model="form2.addr" placeholder="省/市/县" class="address" clearable 
                            :props="propes" change-on-select></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="addrName">
                        <el-input clearable v-model="form2.addrName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="people">
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
                                        <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
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
                        <el-button type="primary" @click="submitForm('form2')">确认</el-button>
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
import {getAddr} from '../../js/user/user.js';
import { plotHzsList } from "../../js/farmthings/farmworkget.js";
import {GetAllYzcxx, InsertYzcxx, GetYzcImg, DeleteYzcImg, UpdateYzcxx, DeleteYzcxx} from "../../js/tzFarming/tzFarming.js"
import { nsGoodsQueryPOST, } from "../../js/farmthings/farmworkgoods.js";
import {uploadImg} from '../../js/address/url.js'
import axios from 'axios';
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
            tableData: [],
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
            varietiesArr: [],
            varieties: '',
            addrOptions:[],
            propes:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            userId: '',
            node_id: '',
            node_name: '',
            list_id: '',
            editImgArr: [],
            img_id: '',
            count: 0,
            rules: {
                enterprise: [
                    { required: true, message: '请选择所属企业', trigger: 'change' }
                ],
                yzcNum: [
                    { required: true, message: '请输入养殖场编号', trigger: 'blur' },
                ],
                yzcName: [
                    { required: true, message: '请输入养殖场名称', trigger: 'blur' },
                ],
                varieties: [
                    { required: true, message: '请选择养殖品种', trigger: 'change' }
                ],
                yzcSize: [
                    { required: true, message: '请输入养殖规模', trigger: 'blur' },
                ],
                addrName: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                ],
                people: [
                    { required: true, message: '请输入负责人', trigger: 'blur' },
                ],
                addr: [
                    { required: true, message: '请选择所在地区', trigger: 'change' }
                ],
            }
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem('userId'));
        this.node_id = localStorage.getItem('loginId')
        this.node_name = localStorage.getItem('loginName')
        this.getAddrList()
        // this.getTime()
        // let arr = []
        // arr.push(this.startTime)
        // arr.push(this.endTime)
        // this.form.dataTime = arr
        this.getPlotHzsList()
        this.getNsGoodsQueryPOSTType()
        this.getDataFun()
    },
    methods: {
        pzChange(ele){
            this.varietiesArr.forEach(val => {
                if(ele == val.id){
                    this.varieties = val.goods_Name
                }
            })
        },
        getDataFun(){
            let obj = { 
                userId: this.form.enterprise, // 所属企业
                yzc_name: this.form.farmingName, // 养殖场名称
                start_time: this.startTime,
                end_time: this.endTime,
                page: this.page,
                cols: this.cols,
                node_id: this.node_id
            }
            GetAllYzcxx(obj)
                .then(res => {
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 品种
        getNsGoodsQueryPOSTType() {
            let param = {
                page: 1,
                cols: 10000,
                userId: this.userId,
            }
            nsGoodsQueryPOST(param)
            .then(res => {
                this.varietiesArr = res.data.dataList;
            })
            .catch(() => {
                this.$message.error("数据加载失败!");
            })
        },
        // 所属企业
        getPlotHzsList() {
            let param = {
                userId: this.userId,
            }
            plotHzsList(param)
                .then(res => {
                    this.enterpriseList = res.data.dataList;
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        editFun(ele){
            this.list_id = ele.id
            // this.getImgFun()
            this.prompt = '修改'
            let originArr = [];
            if(ele.area_id){
                if(ele.area_id.slice(4,6) != '00'){
                    originArr.unshift(ele.area_id);
                }
                if(ele.area_id.slice(2,4) != '00'){
                    originArr.unshift(ele.area_id.slice(0,4)+'00');
                }
                if(ele.area_id.slice(0,2) != '00'){
                    originArr.unshift(ele.area_id.slice(0,2)+'0000');
                }
            }
            if(ele.img_list.length > 0){
                this.imgArr1 = ele.img_list
                this.img_id = ele.img_list[0].id
            }
            if(ele.area_name){
                let areaName = ele.area_name;
                let addrArr = [];
                if(areaName.slice(0,3) == '北京市'){
                    this.addrOptions.forEach(ele => {
                        addrArr.push('110000')
                        ele.list.forEach(ele => {
                            if(areaName.slice(3,6) == ele.caption){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele => {
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                })
                            }
                        })
                    })
                    this.form2.addr = addrArr.slice(0,3)
                }else if(areaName.slice(0,3) == '上海市'){
                    addrArr.push('310000')
                    this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                            if(areaName.slice(3,6) == ele.caption){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele => {
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                })
                            }
                        })
                    })
                    this.form2.addr = addrArr.slice(0,3)
                }else if(areaName.slice(0,3) == '天津市'){
                    addrArr.push('120000')
                    this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                            if(areaName.slice(3,6) == ele.caption){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele => {
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                })
                            }
                        })
                    })
                    this.form2.addr = addrArr.slice(0,3)
                }else if(areaName.slice(0,3) == '重庆市'){
                    addrArr.push('500000')
                    this.addrOptions.forEach(ele => {
                        ele.list.forEach(ele => {
                            if(areaName.slice(3,6) == ele.caption){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele => {
                                    if(areaName.slice(6) == ele.caption){
                                        addrArr.push(ele.szm)                              
                                    }
                                })
                            }
                        })
                    })
                    this.form2.addr = addrArr.slice(0,3)
                }else{
                    let arr = [];
                    if(ele.area_id.slice(4,6) != '00'){
                        arr.unshift(ele.area_id);
                    }
                    if(ele.area_id.slice(2,4) != '00'){
                        arr.unshift(ele.area_id.slice(0,4)+'00');
                    }
                    if(ele.area_id.slice(0,2) != '00'){
                        arr.unshift(ele.area_id.slice(0,2)+'0000');
                    }
                    this.form2.addr = arr;
                }
            }
            this.form2.enterprise = JSON.stringify(ele.userId)  
            this.form2.yzcNum = ele.yzc_code
            this.form2.yzcName = ele.yzc_name
            this.form2.yzcSize = ele.yzc_gm
            this.form2.varieties = ele.yzc_pzid
            this.form2.addrName = ele.addr
            this.form2.people = ele.yzc_fzr
            this.form2.phone = ele.yzc_tel
            this.form2.introduce = ele.remark
            this.varieties = ele.yzc_pz
            this.isEdits = true
        },
        getImgFun(){
            let str = 'id=' + this.list_id + '&type=1'
            GetYzcImg(str)
                .then(res => {
                    if(res.data.length > 0){
                        this.imgArr1 = res.data
                    }
                })
                .catch((res) => {
                    console.log(res)  
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitFormFun()
                } else {
                    return false;
                }
            });
        },
        submitFormFun(){
            let addrArr = [];
            this.addrOptions.forEach(ele => {
                if(ele.szm == this.form2.addr[0]){
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.form2.addr[1]){
                            addrArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form2.addr[2]){
                                    addrArr.push(ele.caption)                              
                                }
                            })
                        }
                    })
                }
            })
            let arr = []
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    arr.push(val.img_url)
                })
            }
            if(this.list_id == ''){
                // 新增
                let obj = {
                    userid: this.form2.enterprise,  // 所属企业
                    node_id: this.node_id, // 节点编码
                    node_name: this.node_name, // 节点名称
                    yzc_name: this.form2.yzcName, // 地块名称
                    yzc_code: this.form2.yzcNum, // 地块编码
                    yzc_pz: this.varieties, // 品种
                    yzc_pzid: this.form2.varieties, // 品种id
                    yzc_gm: this.form2.yzcSize, // 养殖场规模
                    yzc_tel: this.form2.phone, // 联系方式
                    userId: this.userId, // 登陆人ID
                    yzc_fzr: this.form2.people, // 地块负责人
                    record_time: '', // 
                    addr: this.form2.addrName, 
                    remark: this.form2.introduce, // 描述
                    area_id: this.form2.addr[this.form2.addr.length-1], 
                    area_name: addrArr.join(""), 
                    img_url: arr.length > 0 ? arr.join(",") : ''
                }
                InsertYzcxx(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.closeFun()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }else{
                if(this.img_id && this.count == 1){
                    this.removeFun()
                }
                // 编辑
                let obj = {
                    id: this.list_id,
                    yzc_name: this.form2.yzcName, // 地块名称
                    yzc_code: this.form2.yzcNum, // 地块编码
                    yzc_pz: this.varieties, // 品种
                    yzc_pzid: this.form2.varieties, // 品种id
                    yzc_gm: this.form2.yzcSize, // 养殖场规模
                    yzc_tel: this.form2.phone, // 联系方式
                    userId: this.userId, // 登陆人ID
                    yzc_fzr: this.form2.people, // 地块负责人
                    record_time: '', // 
                    addr: this.form2.addrName, 
                    area_id: this.form2.addr[this.form2.addr.length-1], 
                    remark: this.form2.introduce, // 描述
                    area_name: addrArr.join(""), 
                    img_url: this.editImgArr.length > 0 ? this.editImgArr.join(",") : '',
                    userid: this.form2.enterprise,  // 所属企业
                }
                UpdateYzcxx(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.closeFun()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
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
            this.count = 0
            this.imgArr1 = []
            this.editImgArr = []
            this.img_id = ''
            this.varieties = ''
            this.isEdits = false
            this.list_id = ''
        },
        detailTzFun(ele){
            this.$router.push({name: 'ViewFarming',params: ele})
        },
        deleteTzFun(ele){
            let param = {
                id: ele.id,
            }
            DeleteYzcxx(param)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        removeFun(ele,item){
            this.imgArr1 = []
            let obj = {
                id: this.img_id
            }
            DeleteYzcImg(obj)
                .then(res => {
                    this.img_id = ''
                })
                .catch((res) => {
                    console.log(res)
                })
            this.getImgFun()
        },
        fileFun(event){
            this.count = 1
            this.imgArr1 = []
            this.editImgArr = []
            let that = this
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('img_url', this.file);   
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
            let url = uploadImg
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        this.imgArr1 = []
                        let obj = {
                            img_url: res.data
                        }
                        let arr = []
                        arr.push(obj)
                        this.imgArr1 = arr
                        if(this.prompt == '修改'){
                            this.editImgArr.push(res.data)
                        }
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                    that.$refs.file.value = null
                    this.file = null
                })
                .catch(res => {
                    console.log(res)
                })

        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                dataTime: '',
                farmingName: '',
                enterprise: '',
            }
            this.startTime = ''
            this.endTime = ''
            // this.getTime()
            this.page = 1
            // let arr = []
            // arr.push(this.startTime)
            // arr.push(this.endTime)
            // this.form.dataTime = arr
            this.getDataFun()
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
                        .icon-deletes{
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
