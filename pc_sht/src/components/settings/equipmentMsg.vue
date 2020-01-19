<template>
    <div class="content" ref="content">
        <div class="area" ref="areaBox">
            <AreaSelect @selectId='selectId'></AreaSelect>
        </div>
        <div class="secatch-area">
            <div class="type-item">
                <span class='label'>设备信息</span>
                <el-input class="input" v-model="msg" placeholder="请输入内容" clearable></el-input>
            </div>
            <div class="type-item left-distance">
                <span class='label'>商户信息</span>
                <el-select class="input" v-model="sh_name" placeholder="请选择" clearable filterable>
                    <el-option v-for="(item,index) in shArr" :key="index" :label="item.bootList[0].booth_name" :value="item.bootList[0].booth_name">
                    </el-option>
                </el-select>
            </div>
            <div class="type-item left-distance" v-show="isUnfold">
                <span class='label'>设备状态</span>
                <el-select class="input" v-model="status" placeholder="请选择" clearable>
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="type-item left-distance" v-show="isUnfold">
                <span class='label'>设备生产厂家</span>
                <el-select class="input" v-model="factory" placeholder="请选择" clearable>
                    <el-option v-for="item in factoryOptions" :key="item.code" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="type-item btn-grounp">
                <el-button class="btn search-btns" type="primary" @click='search'>搜索</el-button>
                <el-button class="btn file-btns">导出</el-button>
                <span class="clear-btn" v-show="isUnfold" @click='reset'>清空筛选条件</span>
            </div>
            <div class="promot-text">
                <span class="text" @click="unfold">{{promotText}}</span>
            </div>
        </div>
        <div class="infor">
            <header class="title">
                <div class="btns">
                    <span class="all-msg">全部设备信息</span>
                    <el-button class="btn new-add" type="primary" @click="setEquipmentMsg('form')">新增设备信息</el-button>
                    <el-button type="primary" class="btn import" @click="loadFun">下载</el-button>
                    <div class="submit">
                        导入设备
                        <form id="upload1" enctype="multipart/form-data" method="post"> 
                        <input type="file" class="file" ref="file" @change="fileFun($event)">
                        </form> 
                    </div>
                    <div class="btn-file">
                        <div class="submits">
                            导入快捷键
                            <form id="upload2" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="files" ref="file" @change="fileFun2($event)">
                            </form> 
                        </div>
                    </div>
                </div>
            </header>
            <el-table :data="dataList"  border>
                <el-table-column prop="DEVICENO" label="设备信息编号"> </el-table-column>
                <el-table-column prop="BOOTH_NO" label="摊位号（摊位名称）" :formatter="boothNumFormat"> </el-table-column>
                <el-table-column prop="BIZ_ID" label="商户编码"> </el-table-column>
                <el-table-column prop="BIZ_NAME" label="商户名称"> </el-table-column>
                <el-table-column prop="UNIT" label="计量单位" :formatter='unitFormat'> </el-table-column>
                <el-table-column prop="FACTORY" label="设备生成厂家"> </el-table-column>
                <el-table-column prop="STATE" label="设备状态" :formatter='statusFormat'> </el-table-column>
                <el-table-column label="操作" width='230'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="keyManagement(scope.row)">快捷键管理</el-button>
                        <el-button size="mini" type="text" style="margin-left: 5px" @click="downLoad(scope.row)">下载称文件</el-button>
                        <el-button size="mini" type="text" style="margin-left: 5px" @click="handleEidt(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" style="margin-left: 5px" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
            <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"> </el-pagination>
        </div>
        <div class="alert-box" v-if="boxShow">
            <div class="select">
                <p class="close" @click="closeFun">X</p>
                <div class="filemsg">
                {{fileMsg}}
                </div>
                
            </div>
        </div>
        <div class="panal" v-show='setFastKey'>
            <div class="panal-content">
                <header class="panal-header">
                    <span class="title">快捷键管理</span><i class="close" @click='closeSetFastKey()'>x</i>
                </header>
                <div class="box">
                    <div class="key">
                        <ul class="key-list" v-if='keyType == 1'>
                            <li class="item-key" v-for="(item,index) in keyGroup" :key="index" :class='{current:item.id == currId}' @click='selectKey(item)'>
                                <span class="key-number">{{item.number}}</span>
                                <span class="key-name" v-if="item.name == ''">未绑定商品</span>
                                <span class="key-name text" v-else>{{item.name}}</span>
                            </li>
                        </ul>
                         <ul class="key-list big-key" v-if="keyType == 2">
                            <li class="item-key" v-for="(item,index) in bigKeyGroup" :key="index" :class='{current:item.id == currId}' @click='selectKey(item)'>
                                <span class="key-number">{{item.number}}</span>
                                <span class="key-name" v-if="item.name == ''">未绑定商品</span>
                                <span class="key-name text" v-else>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search">
                        <span>选择绑定商品</span>
                        <div>
                            <el-button class='unbind' type="primary" @click="unbindGoods">解绑</el-button>
                        </div>
                        <div class="search-input">
                            <el-input class="input" v-model="goodsName" placeholder="请输入商品名称" @input='showGoods' @blur="unblur" clearable></el-input>
                            <el-button class='search-btn' size="mini" type="primary" @click='bindGoods'>绑定</el-button>
                        </div>
                        <div class="search-result-goods-list" v-show="goodsListBox">
                            <ul v-if="goodsList.length > 0">
                                <li class="goods-item" v-for="item in goodsList" :key='item.goods_id' @click='selectCurrGoods(item)'>{{item.goods_name}}</li>
                            </ul>
                            <div class="no-data" v-else>暂无数据</div>
                        </div>
                        <div class="btn-key">
                            <div class="submit">
                                批量导入
                                <form id="upload3" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file" @change="fileFun3($event)">
                                </form> 
                            </div>
                            <p class="print-btn" @click="printFastKey">打印快捷键</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {sales,purchase,deleteGood,getDefaultProductTypes} from "../../js/goods/goods.js";
import {QueryArea} from '../../js/area/area.js';
import AreaSelect from '../common/area';
import { 
    MerchantsName , 
    EquipmentManagementList,
    EquipmentManagementFactory,
    NewAddEquipment, 
    SearchGoods,   
    DeleteEquipment,
    QueryBindMsg,
    BingKsys,
    UnBindKeys,
    EditEquipment,
    DownLoadDoc,
} from '../../js/settings/settings.js'
import {baseUrl} from '../../js/address/url.js'
import {allBizs} from "../../js/management/management.js";
export default {
    name:'EquipmentMsg',
    data(){
        return{
            currentPage:1,
            dataTotal:0,
            showShopName:true,
            msg:'',//设备信息
            status:'',//设备状态
            factory:'',//生产厂家
            statusOptions:[
                {value:0,label:'启用'},
                {value:1,label:'禁用'},
            ],
            factoryOptions:[],
            isUnfold:false,

            page:1,
            cols:15,
            num: 0,
            total:'',
            userId:2,
            goodsName: "",
            supplier:'',
            bigAreaId:'',//大区userId
            areaId:'',//大区的shop_booth_id
            goodsName:'',
            goodsId:'',
            dataList:[],
            keyGroup:[
                {id:'key1',number:'1',name:''},
                {id:'key2',number:'2',name:''},
                {id:'key3',number:'3',name:''},
                {id:'key4',number:'4',name:''},
                {id:'key5',number:'5',name:''},
                {id:'key6',number:'6',name:''},
                {id:'key7',number:'7',name:''},
                {id:'key8',number:'8',name:''},
                {id:'key9',number:'9',name:''},
                {id:'key10',number:'10',name:''},
                {id:'key11',number:'11',name:''},
                {id:'key12',number:'12',name:''},
                {id:'key13',number:'13',name:''},
                {id:'key14',number:'14',name:''},
                {id:'key15',number:'15',name:''},
                {id:'key16',number:'16',name:''},
                {id:'key17',number:'17',name:''},
                {id:'key18',number:'18',name:''},
                {id:'key19',number:'19',name:''},
                {id:'key20',number:'20',name:''},
                {id:'key21',number:'21',name:''},
                {id:'key22',number:'22',name:''},
                {id:'key23',number:'23',name:''},
                {id:'key24',number:'24',name:''},
                {id:'key25',number:'25',name:''},
                {id:'key26',number:'26',name:''},
                {id:'key27',number:'27',name:''},
                {id:'key28',number:'28',name:''},
                {id:'key29',number:'29',name:''},
                {id:'key30',number:'30',name:''},
            ],
            bigKeyGroup:[
                {id:'key1',number:'1',name:''},
                {id:'key2',number:'2',name:''},
                {id:'key3',number:'3',name:''},
                {id:'key4',number:'4',name:''},
                {id:'key5',number:'5',name:''},
                {id:'key6',number:'6',name:''},
                {id:'key7',number:'7',name:''},
                {id:'key8',number:'8',name:''},
                {id:'key9',number:'9',name:''},
                {id:'key10',number:'10',name:''},
                {id:'key11',number:'11',name:''},
                {id:'key12',number:'12',name:''},
                {id:'key13',number:'13',name:''},
                {id:'key14',number:'14',name:''},
                {id:'key15',number:'15',name:''},
                {id:'key16',number:'16',name:''},
                {id:'key17',number:'17',name:''},
                {id:'key18',number:'18',name:''},
                {id:'key19',number:'19',name:''},
                {id:'key20',number:'20',name:''},
                {id:'key21',number:'21',name:''},
                {id:'key22',number:'22',name:''},
                {id:'key23',number:'23',name:''},
                {id:'key24',number:'24',name:''},
                {id:'key25',number:'25',name:''},
                {id:'key26',number:'26',name:''},
                {id:'key27',number:'27',name:''},
                {id:'key28',number:'28',name:''},
                {id:'key29',number:'29',name:''},
                {id:'key30',number:'30',name:''},
                {id:'key31',number:'31',name:''},
                {id:'key32',number:'32',name:''},
                {id:'key33',number:'33',name:''},
                {id:'key34',number:'34',name:''},
                {id:'key35',number:'35',name:''},
                {id:'key36',number:'36',name:''},
                {id:'key37',number:'37',name:''},
                {id:'key38',number:'38',name:''},
                {id:'key39',number:'39',name:''},
                {id:'key40',number:'40',name:''},
                {id:'key41',number:'41',name:''},
                {id:'key42',number:'42',name:''},
                {id:'key43',number:'43',name:''},
                {id:'key44',number:'44',name:''},
                {id:'key45',number:'45',name:''},
                {id:'key46',number:'46',name:''},
                {id:'key47',number:'47',name:''},
                {id:'key48',number:'48',name:''},
                {id:'key49',number:'49',name:''},
                {id:'key50',number:'50',name:''},
                {id:'key51',number:'51',name:''},
                {id:'key52',number:'52',name:''},
                {id:'key53',number:'53',name:''},
                {id:'key54',number:'54',name:''},
                {id:'key55',number:'55',name:''},
                {id:'key56',number:'56',name:''},
                {id:'key57',number:'57',name:''},
                {id:'key58',number:'58',name:''},
                {id:'key59',number:'59',name:''},
                {id:'key60',number:'60',name:''},
                {id:'key61',number:'61',name:''},
                {id:'key62',number:'62',name:''},
                {id:'key63',number:'63',name:''},
                {id:'key64',number:'64',name:''},
                {id:'key65',number:'65',name:''},
                {id:'key66',number:'66',name:''},
                {id:'key67',number:'67',name:''},
                {id:'key68',number:'68',name:''},
                {id:'key69',number:'69',name:''},
                {id:'key70',number:'70',name:''},
                {id:'key71',number:'71',name:''},
                {id:'key72',number:'72',name:''},
            ],
            currId:'',//设置快捷键 选择键ID
            setFastKey:false,//设置快捷键管理
            formPanal:false,//新增设备信息
            form:{
                equipmenStatus:true,
                equipmenName:'',
                boothNum:'',
                boothName:'',
                name:'',
                factory:'',
                ip:'',
                iccid:'',
                unit:'',
            },
            unitOptions: [
                { value: '1', label: '斤' }, 
                { value: '0', label: '公斤' },
            ],
            goodsList:[],
            goodsListBox:false,
            tableData: [],
            merchantsNameId:'',//新增设备选择商户名称id
            keyType:1,
            mainKeyType:'',//快捷键管理当前设备设备类型 30键 72键
            equipmenId:'',//编辑时设备ID
            equipmenBoothId:'',//编辑时设备下的boothID
            deviceId:'',//设备ID
            boxShow: false,
            fileMsg: '',
            file: '',
            shArr: [],
            sh_name: '',
            node_id: '',
        }
    },
    computed:{
        promotText:function(){
            if(this.isUnfold){
                return '收起筛选条件'
            }else{
                return '展开筛选条件'
            }
        }
    },
    created(){
        this.userId = localStorage.getItem('userId');          
    },
    mounted(){
        this.node_id = localStorage.getItem('loginId');
        this.getFactory();//获取生产厂家
        this.getAllRegion('');//获取大区ID  
    },
    methods:{
        getAllBizs(){
            let boothData = {
            page: 1,
            cols: 1000,
            total: 0,
            userId: this.userId,
            name: '',
            boothName: '',
            stall_no: '',
            region:this.areaId,
            }
            allBizs(boothData)
                .then(res => {
                    this.shArr = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })

        },
        handleCurrentChange(val) {
            this.page = val
            this.getAllEquipmentList()
        },
        closeFun(){
            this.boxShow = false;
            this.file = ''
            this.getAllEquipmentList()
        },
        loadFun(){
            window.location.href = baseUrl + "sbgl/downloadSbxx?region=" + this.areaId
        },
        fileFun(event){
            let param = this.$refs.file.files[0];
                this.file = event.target.files[0];
                let formData = new FormData();
                formData.append('sbxx', this.file);  
                formData.append('userId', this.userId);  
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
                //http://192.168.1.14:8081/order_sht/sbgl/importSbxx
                let url = baseUrl + 'sbgl/importSbxx'
                ajaxPost(url,formData,config)
                    .then(res => {
                        this.boxShow = true;
                        this.fileMsg = res.message
                        this.$refs.file.value = null
                    })
                    .catch(res => {
                        console.log(res)
                        this.$message.error("出错了");
                    })
        },
        // 区域导入快捷键
        fileFun2(event){
            let param = this.$refs.file.files[0];
                this.file = event.target.files[0];
                let formData = new FormData();
                formData.append('regionkjj', this.file);  
                formData.append('region', this.areaId);  
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
                let url = baseUrl + 'sbgl/importRegionkjj'
                ajaxPost(url,formData,config)
                    .then(res => {
                        this.boxShow = true;
                        this.fileMsg = res.message
                        this.$refs.file.value = null
                    })
                    .catch(res => {
                        console.log(res)
                        this.$message.error("出错了");
                    })
        },
        // 设备导入快捷键
        fileFun3(event){
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('regionkjj', this.file);  
            formData.append('region', this.areaId);
            formData.append('device_info_id', this.deviceId);  
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
            let url = baseUrl + 'sbgl/importSbkjj'
            ajaxPost(url,formData,config)
                .then(res => {
                    this.boxShow = true;
                    this.fileMsg = res.message
                    this.$refs.file.value = null
                    this.setFastKey = false;
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了");
                })
        },
        boothNumFormat(row){//摊位号格式化
            return `${row.BOOTH_NO} (${row.BOOTH_NAME})`
        },
        unitFormat(row){//单位格式化
            if(row.UNIT == 0){
                return '公斤'
            }
            if(row.UNIT == 1){
                return '斤'
            }
        },
        statusFormat(row){//状态格式化
            if(row.STATE == 0){
                return '启用'
            }
            if(row.STATE == 1){
                return '禁用'
            }
        },
        getFactory(){//获取生产厂家
            EquipmentManagementFactory()
                .then(res => {
                    this.factoryOptions = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getAllRegion(regionId){//获取区域ID
            let data = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                node_id: this.node_id
            }
             QueryArea(data)
                .then(res => {      
                    if(regionId){
                        res.data.dataList.forEach(ele => {
                            if(ele.userId == regionId){
                                this.bigAreaId = ele.userId;
                                this.areaId = ele.bootList[0].shop_booth_id;
                                this.getAllEquipmentList();//获取所有设备信息列表  
                            }
                        })
                    }else{
                        this.bigAreaId = res.data.dataList[0].userId;
                        this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                        this.getAllEquipmentList();//获取所有设备信息列表   
                    }
                    this.getAllBizs() // 商户
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getAllEquipmentList(){//获取所有设备信息列表
            let data = {
                region:this.areaId,
                name:this.msg,
                state:this.status,
                factory:this.factory,
                page:this.page,
                cols:this.cols,
                booth_name: this.sh_name

            }
            EquipmentManagementList(data)
                .then(res => {
                    this.dataList = res.data.dataList;
                    this.num = res.data.condition.total
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectId(id){//选择区域展示设备信息列表 
            this.getAllRegion(id);
            this.getAllBizs() // 商户
        },
        search(){//按条件搜索         
            this.getAllRegion(this.bigAreaId);
        },
        reset(){//清空筛选条件
            this.msg = '';
            this.status = '';
            this.factory = '';
            this.sh_name = '';
            this.getAllEquipmentList()
        },
        unfold(){//是否展开筛选条件
            this.isUnfold = !this.isUnfold;
        },
        selectKey(item){
            if(this.currId){
                if(this.currId == item.id){
                    this.currId = ''
                }else{
                    this.currId = item.id
                }
            }else{
                this.currId = item.id
            }
        },
        setEquipmentMsg(){//新增设备信息
            this.$router.push({name: 'AddEquipment', params: {areaId: this.areaId}})
        },
        closeSetFastKey(){//关闭快捷键管理
            this.setFastKey = false;
        },
        keyManagement(row){//快捷键管理
            this.currId = ''; 
            this.mainKeyType = row.CODE;// 1是30键 2是72键
            this.deviceId = row.ID;//设备ID
            this.goodsName = '';
            if(this.mainKeyType == 2){
                this.keyType = 2;
                this.setFastKey = true;
                QueryBindMsg({device_info_id:this.deviceId})
                    .then(res => {
                        if(res.data.dataList.length>0){    
                            this.bigKeyGroup.forEach((ele,index) => {
                                ele.id = 'key'+ index++
                                ele.name = '';
                                ele.number = index++;
                            })                        
                            for(let i =0;i<this.bigKeyGroup.length;i++){
                                for(let j=0;j<res.data.dataList.length;j++){
                                    if(this.bigKeyGroup[i].number == res.data.dataList[j].KEY_NUMBER){
                                        this.bigKeyGroup[i].name = res.data.dataList[j].GOODS_NAME;
                                        this.bigKeyGroup[i].id = res.data.dataList[j].ID;
                                    }
                                }
                            }
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else if(this.mainKeyType == 1){
                this.keyType = 1;
                this.setFastKey = true;
                QueryBindMsg({device_info_id:this.deviceId})
                    .then(res => {
                        if(res.data.dataList.length>0){
                            this.keyGroup.forEach((ele,index) => {
                                ele.id = 'key'+ index++
                                ele.name = '';
                                ele.number = index++;
                            })
                            for(let i =0;i<this.keyGroup.length;i++){
                                for(let j=0;j<res.data.dataList.length;j++){
                                    if(this.keyGroup[i].number == res.data.dataList[j].KEY_NUMBER){
                                        this.keyGroup[i].name = res.data.dataList[j].GOODS_NAME;
                                        this.keyGroup[i].id = res.data.dataList[j].ID;
                                    }
                                }
                            }
                        }
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{
                this.$message.info('此设备暂无快捷键管理功能！');
                return
            }
            
        },  
        resetForm(formName){//设备信息取消
            this.formPanal = false;
        },
        unblur(){
            if(!this.goodsName){
                this.goodsListBox = false;
            }
        },
        showGoods(){
            if(!this.goodsName){
                this.goodsListBox = false;
            }else{
                let data = {
                    region:this.areaId,
                    goods_name:this.goodsName,
                }
                SearchGoods(data)
                    .then(res => {
                        this.goodsListBox = true;
                        this.goodsList = res.data.dataList;
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }
            
            
        },
        bindGoods(){//绑定商品
            if(!this.currId){
                this.$message.warning('请选择要绑定的快捷键！');
            }else if(!this.goodsName){
                this.$message.warning('请选择要绑定的商品！');
            }else{                
                if(!this.goodsId){
                    this.$message.warning('请选择商品进行绑定！')
                }else{
                    if(this.mainKeyType == 1){
                        let keyNumber = '',keyName = '';
                        this.keyGroup.forEach(ele => {
                            if(ele.id == this.currId){
                                if(ele.name != ''){
                                    this.$message.warning('此快捷键已绑定商品' );
                                    keyName = ele.name
                                    return
                                }else{
                                    keyNumber = ele.number  
                                }                  
                            }
                            
                        })
                        if(keyName != ''){
                            return
                        }else{
                            let obj = {
                                device_info_id:this.deviceId,
                                goods_id:this.goodsId,
                                goods_name:this.goodsName,
                                key_number:keyNumber
                            }
                            BingKsys(obj)
                                .then(res=>{
                                    this.$message.success('绑定成功！')
                                    this.keyGroup.forEach(ele => {
                                        if(ele.number == keyNumber){
                                            ele.name = this.goodsName; 
                                            ele.id = res.data                
                                        }
                                    })
                                    this.goodsId = '';
                                    this.goodsName = '';
                                })
                                .catch(res=>{
                                    this.$message.warning('绑定失败！')
                                })
                        }
                    }
                    if(this.mainKeyType == 2){
                        let keyNumber = '';
                        this.bigKeyGroup.forEach(ele => {
                            if(ele.id == this.currId){
                                keyNumber = ele.number                      
                            }
                        })
                        let obj = {
                            device_info_id:this.deviceId,
                            goods_id:this.goodsId,
                            goods_name:this.goodsName,
                            key_number:keyNumber
                        }
                        BingKsys(obj)
                            .then(res=>{
                                this.$message.success('绑定成功！')
                                this.bigKeyGroup.forEach(ele => {
                                    if(ele.number == keyNumber){
                                        ele.name = this.goodsName; 
                                        ele.id = res.data                
                                    }
                                })
                                this.goodsId = '';
                                this.goodsName = '';
                            })
                            .catch(res=>{
                                this.$message.warning('绑定失败！')
                            })
                    }
                    
                }
                
            }
        },
        unbindGoods(){//解绑商品
            if(!this.currId){
                this.$message.warning('请选择要解绑的快捷键！');
                return
            }
            if(this.mainKeyType == 2){
                this.bigKeyGroup.forEach((ele,index) => {
                    if(ele.id ==  this.currId){
                        if(ele.name){
                            let data= {
                                id:this.currId,
                                goods_id:null,
                                goods_name:null
                            }
                            var currIndex = ele.number;
                            UnBindKeys(data)
                                .then(res => {
                                    this.$message.success('删除成功！');
                                    this.bigKeyGroup[currIndex-1].name = '';
                                    this.bigKeyGroup[currIndex-1].id = 'key' + currIndex;
                                    this.bigKeyGroup.forEach((ele,index) => {
                                        if(ele.name == ''){
                                            ele.id = 'key' + ele.number
                                        }
                                    })
                                })
                                .catch(res => {
                                    console.log(res)
                                    this.$message.success('删除失败！')
                                })
                        }else{
                            this.$message.warning('此快捷键还未绑定商品！'); 
                        }
                    }
                })
            }      
            if(this.mainKeyType == 1){
                this.keyGroup.forEach((ele,index) => {
                    if(ele.id == this.currId){
                        if(ele.name){
                            let data= {
                                id:this.currId,
                                goods_id:null,
                                goods_name:null
                            }
                            var currIndex = ele.number;
                            UnBindKeys(data)
                                .then(res => {
                                    this.$message.success('删除成功！');
                                    this.keyGroup[currIndex-1].name = '';
                                    this.keyGroup[currIndex-1].id = 'key' + currIndex;
                                     this.keyGroup.forEach((ele,index) => {
                                        if(ele.name == ''){
                                            ele.id = 'key' + ele.number
                                        }
                                    })
                                    console.log(this.keyGroup)
                                })
                                .catch(res => {
                                    console.log(res)
                                    this.$message.success('删除失败！')
                                })
                        }else{
                            this.$message.warning('此快捷键还未绑定商品！'); 
                        }
                    }
                })
            }            
        },
        selectCurrGoods(item){//选择商品并绑定快捷键
            this.goodsName = item.goods_name;
            this.goodsId = item.goods_id;
            this.goodsListBox = false;
        },
        downLoad(row){//下载称文件   
            console.log(row)
            this.mainKeyType = row.CODE;// 1是30键 2是72键
            if(this.mainKeyType == 2 || this.mainKeyType == 1){
                let obj = {
                    id : row.ID, // 设备id
                    shop_booth_id: row.SHOP_BOOTH_ID, // 店铺
                    region: this.areaId, // 区域
                    userId: this.userId // 登陆人id
                }
                // device_info_id: row.ID
                DownLoadDoc(obj)
                    .then(res =>{
                        this.downFile(res)
                    })
                    .catch(res => {
                        console.log(res)
                    })
            }else{
                this.$message.info('此设备暂无下载称文件功能！');
                return
            }
        }, 
        downFile (data) {
            if (!data) { return }
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none';
            link.href = url
            link.setAttribute('download', 'download.txt')
            
            document.body.appendChild(link)
            link.click()
        },
        handleEidt(row){//编辑      
            this.$router.push({name: 'AddEquipment', params: {areaId: this.areaId,row: row}})
        }, 
        handleDelete(row){//删除
            // console.log(row)
            this.$confirm('确认删除此条设备信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                DeleteEquipment({id:row.ID})
                    .then(res => {
                        this.$message.success('删除成功！');
                        this.getAllRegion(this.bigAreaId);
                    })
                    .catch(res => {
                        console.log(res)
                    })                
            }).catch(()=> {
                this.$message.info('已取消删除')
            })
            
        },
        printFastKey(){            
            if(this.mainKeyType == 2 || this.mainKeyType == 1){
                window.location.href= baseUrl + "sbgl/printSbGoods?device_info_id="+this.deviceId               
            }
        },
        downExcl(res){
            var blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        　　var downloadElement = document.createElement('a');
        　　var href = window.URL.createObjectURL(blob); //创建下载的链接
        　　downloadElement.href = href;
        　　downloadElement.download = 'xxx.xls'; //下载后文件名
        　　document.body.appendChild(downloadElement);
        　　downloadElement.click(); //点击下载
        　　document.body.removeChild(downloadElement); //下载完成移除元素
        　　window.URL.revokeObjectURL(href); //释放掉blob对象 
        },
        
    },
    components:{
        AreaSelect,
    }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
    .content{        
        height: 100%;       
        box-sizing: border-box;
        .btn-file{
            margin-bottom: 10px;
            .submits{
                position: relative;
                width: 90px;
                height: 30px;
                border-radius: 5px;
                border: 1px solid #409EFF;
                line-height: 30px;
                background: #fff;
                color: #409EFF;
                text-align: center;
                overflow: hidden;
                font-size: 14px;
                box-sizing: border-box;
                .files{
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
        .btn-key{
            display: flex;
            margin-top: 320px;
            line-height: 30px;
            justify-content: flex-end;
            .submit{
                position: relative;
                margin-right: 10px;
                width: 60px;
                height: 30px;
                color: #409EFF;
                text-align: center;
                overflow: hidden;
                font-size: 12px;
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 60px;
                    height: 30px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                    cursor: pointer;
                }
            }
            .print-btn{
                text-align: right;
                color: #409EFF;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .el-pagination{
            margin-top: 15px;
            text-align: center;
        }
        .btns{
            display: flex;
            .submit{
                position: relative;
                margin: 0 10px;
                width: 90px;
                height: 30px;
                border-radius: 5px;
                border: 1px solid #409EFF;
                line-height: 30px;
                background: #fff;
                color: #409EFF;
                text-align: center;
                overflow: hidden;
                font-size: 14px;
                box-sizing: border-box;
                .file{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 60px;
                    height: 30px;
                    opacity: 0;
                    background: rgba(0,0,0,0);
                }
            }
        }
        .file-btns{
            color: #777;
            background: #fff;
            border-color: #eaeaea;
        }
        .clear-btn{
            color: #999;
        }
        .search-btns{
            color: #409EFF;
            background: #fff;
        }
        .alert-box{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 999;
            .select{
                position: relative;
                top: 50%;
                margin-top: -150px;
                left: 50%;
                margin-left: -200px;
                background: #fff;
                width: 400px;
                height: 300px;
                .close{
                    text-align: right;
                    margin-right: 20px;
                    padding-top: 10px;
                    cursor: pointer;
                }
            }
            .filemsg{
                width: 360px;
                height: 240px;
                margin: 10px auto;
                font-size: 14px;
                overflow: hidden;
            }
        }
        .area,.secatch-area{
            margin-bottom: 10px;
            padding: 10px;
            background: #fff;
            overflow: hidden;
        }
        .type-item{
            float: left;
            margin-bottom: 10px;
            font-size: 14px;
            .label{
                display: inline-block;
                padding-right: 5px;
                width:90px;
                text-align: right;
            }
            .left-distance{
                margin-left: 30px;
            }
            .input{
                width: 220px;
            }
        }
        .btn-grounp{
            margin-left: 30px;
            >span{
                margin-left: 10px;
                cursor: pointer;
                &:hover{
                    color: #409EFF;
                }
            }
            .btn{
                padding: 0 10px; 
            }
        }
        .promot-text{
            clear: both;
            width: 100%;
            height: 30px;
            font-size: 12px;
            color: #409EFF;
            line-height: 30px;
            text-align: center;
            .text{
                cursor: pointer;
            }
        }
        .infor{
            padding: 10px;
            height: 100%;
            box-sizing: border-box;
            background: #fff;
            .title{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                overflow: hidden;
                .btn{
                    padding: 0 16px; 
                }
                .all-msg{
                    width: 80%;
                    padding-left: 4px;
                    display:block;
                    height: 20px;
                    line-height: 20px;
                    border-left: 2px solid #409EFF;
                }
                .import{
                    color: #409EFF;
                    background: #fff;
                }
            }
        }
        .panal{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,.5);
            z-index: 1001; 
            .form-panal{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-250px) translateY(-335px);
                padding: 10px;
                box-sizing: border-box;
                width: 500px;
                height: 670px;
                background: #fff;
            }
            .select-panal{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-400px) translateY(-250px);
                padding: 10px;
                box-sizing: border-box;
                width: 800px;
                height: 500px;
                background: #fff;
                .title{
                    padding: 10px;
                    margin-bottom: 10px;
                }
                .close{
                    float: right;
                    display: block;
                    margin-top: 6px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-style: normal;
                    cursor: pointer;                    
                }
                .pagination{
                    padding-top: 10px;
                    text-align: center;
                }
            }
            .footer-btn{
                margin: 10px auto 0;
                width: 100%;
                overflow: hidden;
            }
            .submit-btn{
                float: left;
                width: 100px;
            }
            .cancel-btn{
                float: left;
                margin-left: 50px;
                width: 100px;
            }
            .panal-content{
               position: absolute;
               left: 50%;
               top: 50%;
               transform: translateX(-450px) translateY(-300px);
               padding: 10px;
               box-sizing: border-box;
               width: 900px;
               height: 600px;
               background: #fff;
            }
            .panal-header{
                padding: 0 15px;
                margin-bottom: 10px;
                height: 40px;
                line-height: 40px;
                border-bottom:1px solid #ddd;
                .close{
                    float: right;
                    display: block;
                    margin-top: 6px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-style: normal;
                    cursor: pointer;
                }
            }
            .search-name{
                display: inline-block;
                width: 25px;
                height: 25px;
                text-align: center;
                background: url('../../assets/images/u20631.png') no-repeat;
                background-size: 100% 100%;
                font-size: 0;
                cursor: pointer;
            }
            .box{
                height: 530px;
                overflow: hidden;
                .key{
                    float: left;
                    width: 630px;
                }
                .key-list{
                    overflow: hidden;
                }
                .item-key{
                    float: left;
                    margin-bottom: 10px;
                    margin-right: 5px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;                   
                }
                .current{
                    .key-number{
                        background: #409EFF;
                        color: #fff;
                    }
                    .key-name{
                        color: #409EFF;
                    }                    
                }
                .key-number{
                    display: block;
                    width: 98px;
                    height: 56px;
                    text-align: center;
                    line-height: 56px;
                    color: #000;
                    font-weight: 900;
                    border-bottom: 1px solid #ddd;
                }
                .key-name{
                    display: block;
                    width: 98px;
                    height: 24px;
                    text-align: center;
                    line-height: 24px;
                    color: #aaa;
                    font-size: 12px;
                    &.text{
                        color: #000;
                        font-weight: 900;
                    }
                }
                .big-key{
                    .key-number{
                        width: 71px;
                        height: 26px;
                        line-height: 26px;
                    }
                    .key-name{
                        width: 71px;
                        height: 20px;
                        line-height: 20px;
                    }
                }
                .search{
                    float: right;
                    padding: 10px;
                    width: 240px;
                    height: 455px;
                    font-size: 14px;
                    box-sizing: border-box;
                    background: #f2f2f2;
                }
                
                .search-input{
                    margin-top: 10px;
                }
                .search-result-goods-list{
                    padding: 5px 0 5px;
                    border:1px solid #ddd;
                    border-top:none;
                }
                .point-key{
                    margin-top: 10px;
                    padding: 0 8px;
                }
                .no-data{
                    color: #aaa;
                    text-align: center;
                }
                .goods-item{
                    padding: 5px 10px;
                    height: 24px;
                    line-height: 24px;
                    cursor: pointer;
                    &:hover{
                        color: #409EFF;
                        background: #ddd;
                    }
                }
                .input{
                    width: 160px;
                    height: 32px;
                    line-height: 32px;
                }
                .search-btn,.unbind{
                    padding: 0;
                    width: 55px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                }
                .unbind{
                    margin-top: 10px;
                }
            }
        }
    }
</style>
<style lang='less'>
.search{
    .search-input{  
        .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
}
.content{
    .el-input__icon{
        line-height: 30px;
    } 
}
.form-panal{
    .el-form-item__content,.el-select{
        width:300px;
    }
}
</style>
