<template>
    <div class="content view-assets">
        <div class="box">
            <div class="list-title">资产信息</div>
            <div class="view" v-if="btn == '修改'">
                <div class="list">
                    <div class="data">
                        <div class="title">资产名称</div>
                        <div class="msg">{{ruleForm.name ? ruleForm.name : '无'}}(ID：{{assets_id}})</div>
                    </div>
                    <div class="data">
                        <div class="title">资产类型</div>
                        <div class="msg">{{zcType_name ? zcType_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">所属期</div>
                        <div class="msg">{{ssq_name ? ssq_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">条码号</div>
                        <div class="msg">{{ruleForm.tmh ? ruleForm.tmh : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">序列号</div>
                        <div class="msg">{{ruleForm.xlh ? ruleForm.xlh : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">资产状态</div>
                        <div class="msg">{{zcState_name ? zcState_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">生产厂家</div>
                        <div class="msg">{{ruleForm.sccj ? ruleForm.sccj : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">规格/型号</div>
                        <div class="msg">{{ruleForm.ggxh ? ruleForm.ggxh : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">所属节点</div>
                        <div class="msg">{{ssNode_name2 ? ssNode_name2 : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">所属商户</div>
                        <div class="msg">{{management2 ? management2 : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">IP</div>
                        <div class="msg">{{ruleForm.ip ? ruleForm.ip : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">经纬度</div>
                        <div class="msg" v-if="ruleForm.jd == '' && ruleForm.wd == ''">无</div>
                        <div class="msg" v-else>{{ruleForm.jd ? ruleForm.jd : '无' + '/' + ruleForm.wd ? ruleForm.wd : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">创建人</div>
                        <div class="msg">{{creater}}</div>
                    </div>
                    <div class="data">
                        <div class="title">资产创建日期</div>
                        <div class="msg">{{create_time}}</div>
                    </div>
                    <div class="data">
                        <div class="title">创建方式</div>
                        <div class="msg">{{create_way == 0 ? '批量导入' : '手动添加'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">备注</div>
                        <div class="msg">{{ruleForm.bz ? ruleForm.bz : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">附件</div>
                        <div class="msg" v-if="imgArr1.length > 0">
                            <div class="msg-item">   
                                <div class="img-list">
                                    <ul>
                                        <li v-for="(item,index) in imgArr1" :key="index" @click="bigImgFun(item)" v-if="item.img_url">
                                            <figure class="image">
                                                <img :src="item.img_url">
                                            </figure>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="msg" v-else>无</div>
                    </div>
                </div>
            </div>
             <div class="list" v-else>
                <div class="data">
                    <div class="title">资产名称</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.name" allow-create filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in nameArr" :key="index" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title" style="margin-bottom: 5px">资产类型</div>
                    <div class="msg">
                        <el-cascader clearable v-model="ruleForm.type"
                            :options="options" filterable @change="zcTypeFun"
                            change-on-select placeholder="请选择"
                        ></el-cascader>
                    </div>
                </div>
                <div class="data">
                    <div class="title">所属期</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.ssq" clearable placeholder="请选择" @change="ssqFun">
                            <el-option v-for="item in ssqArr" :key="item.a_conf_id" :label="item.a_conf_item"
                                :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">条码号</div>
                    <div class="msg">
                        <el-input v-model="ruleForm.tmh" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">序列号</div>
                    <div class="msg">
                        <el-input v-model="ruleForm.xlh" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">资产状态</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.state" filterablet clearable placeholder="请选择" @change="zcStateFun">
                            <el-option v-for="item in zcState" :key="item.a_conf_id" :label="item.a_conf_item"
                                :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">生产厂家</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.sccj" allow-create filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in sccjArr" :key="index" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">规格/型号</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.ggxh" allow-create filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in zcggArr" :key="index" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">所属节点</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.node" filterable clearable placeholder="请选择" @change="ssNodeFun">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_NAME"
                                :value="item.NODE_ID">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">所属商户</div>
                    <div class="msg">
                        <el-select v-model="ruleForm.management" filterable clearable placeholder="请选择" @change="ssManagementFun" @focus="focusFun">
                            <el-option v-for="item in shArr" :key="item.BIZ_ID" :label="item.BIZ_NAME"
                                :value="item.BIZ_ID">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="data">
                    <div class="title">IP</div>
                    <div class="msg">
                        <el-input v-model="ruleForm.ip" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">经纬度</div>
                    <div class="msg">
                        <el-input style="width: 86px" v-model="ruleForm.jd" clearable></el-input>
                        <el-input style="width: 86px" v-model="ruleForm.wd" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">创建人</div>
                    <div class="msg">{{creater}}</div>
                </div>
                <div class="data">
                    <div class="title">资产创建日期</div>
                    <div class="msg">{{create_time}}</div>
                </div>
                <div class="data">
                    <div class="title">创建方式</div>
                    <div class="msg">{{create_way == 0 ? '批量导入' : '手动添加'}}</div>
                </div>
                <div class="data">
                    <div class="title">备注</div>
                    <div class="msg">
                        <el-input v-model="ruleForm.bz" clearable></el-input>
                    </div>
                </div>
                <div class="data">
                    <div class="title">附件</div>
                    <div class="msg">
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
                                <span class="submit">
                                    上传图片
                                    <form id="upload" enctype="multipart/form-data" method="post"> 
                                        <input type="file" class="file" ref="file" @change="fileFun($event)">
                                    </form>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="btnFun">{{btn}}</el-button>   
                <el-button v-if="btn == '保存'" @click="clearFun">取消</el-button>
            </div>
        </div>
        <div class="big-img" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeFun2">X</p>
            <div class="imgBox">
                <figure class="images" v-for="(item,index) in imgArrs" :key="index" v-if="imgArrs.length > 0">
                    <img :style="sizeObj" :src="item.img_url" v-if="item.img_url">
                </figure>
            </div>
        </div>
        <div class="tab">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="变更记录" name="first">
                    <el-table :data="tableData" :header-cell-style="rowClass">
                        <el-table-column prop="c_time" label="变更日期" width="200"></el-table-column>
                        <!--<el-table-column prop="c_type" label="变更类型"></el-table-column>-->
                        <el-table-column prop="name" label="操作人" width="200"> </el-table-column>
                        <el-table-column prop="c_type" label="操作方式" width="200">
                            <template slot-scope="scope">
                                {{scope.row.c_type == 1 ? '批量' : '手动'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="a_c_details" label="变更内容">
                            <template slot-scope="scope">
                                <div v-for="(item,index) in scope.row.a_c_details" :key="index" v-if="scope.row.a_c_details.length == 1">
                                    <p v-if="item.c_item == '附件'">{{item.c_after == '' ? '删除附件' : '修改附件'}}</p>
                                    <p v-else>{{item.c_item + '由' + (item.c_before ? ("“" + item.c_before + "”"): "“空”") + '变为' + (item.c_after ? ("“" + item.c_after + "”") : "“空”")}}</p>
                                </div>
                                <div v-for="(item,index) in scope.row.a_c_details" :key="index" v-if="scope.row.a_c_details.length > 1">
                                    <p v-if="item.c_item == '附件'">{{index + 1 + '、'}}{{item.c_after == '' ? '删除附件' : '修改附件'}}</p>
                                    <p v-else>{{index + 1 + '、'}}{{item.c_item + '由' + (item.c_before ? ("“" + item.c_before + "”"): "“空”") + '变为' + (item.c_after ? ("“" + item.c_after + "”") : "“空”")}}</p>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="巡检记录" name="second">
                    <el-table :data="tableData2" :header-cell-style="rowClass">
                        <el-table-column prop="inspect_time" label="巡检日期"></el-table-column>
                        <el-table-column prop="name" label="巡检人"> </el-table-column>
                        <el-table-column prop="image_url" label="附件">
                            <template slot-scope="scope">
                                <p v-if="scope.row.image_url == ''" >无</p>
                                <el-button v-else type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="num" background @current-change="handleCurrentChange2" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="维修记录" name="third">
                    <el-table :data="tableData3" :header-cell-style="rowClass">
                        <el-table-column prop="m_time" label="维修日期"></el-table-column>
                        <el-table-column prop="cause" label="设备问题"> </el-table-column>
                        <el-table-column prop="solution" label="解决方案">
                            <template slot-scope="scope">
                                <p>{{scope.row.solution ? scope.row.solution : '无'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="change_unit" label="更换部件">
                            <template slot-scope="scope">
                                <p>{{scope.row.change_unit ? scope.row.change_unit : '无'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="m_result" label="维修结果"> 
                            <template slot-scope="scope">{{scope.row.m_result == 0 ? '已完成' : '未完成'}}</template> 
                        </el-table-column>
                        <el-table-column prop="name" label="维修人"> </el-table-column>
                        <el-table-column prop="" label="附件">
                            <template slot-scope="scope">
                                <p v-if="scope.row.image_url == ''" >无</p>
                                <el-button v-else type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注"> </el-table-column>
                    </el-table>
                    <el-pagination v-if="num" background @current-change="handleCurrentChange3" :current-page.sync="page" :page-size="cols"
                    layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
            </el-tabs>
            <div class="passwrd" v-if="isEdits">
                <div class="text">
                    <div class="close" @click="closeFun">X</div>
                    <div class="img-carousel">
                        <el-carousel trigger="click" :autoplay="autoplay">
                            <el-carousel-item  v-for="(item,index) in imgArr" :key="index" v-if="imgArr">
                                <figure class="images">
                                    <img :src="item" v-if="item">
                                </figure>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,'');
}
import {QueryAssetsUser,QueryAssetsConf,QueryAssetsType,QueryNodeBase2,QueryBusiness,AssetsUpdate,QueryChangeListByAssetsId,
    QueryInspectinfoListByAssetsId,QueryMaintaininfoListByAssetsId,QueryAssetsSpecifications,QueryAssetsNames,QueryAssetsManufacturers,
    } from '../../js/traceEquipment/traceEquipment.js'
import {uploadPhotos} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"viewAssets",
    data() {
        return {
            btn: '修改',
            activeName: 'first',
            page: 1,
            cols: 5,
            num: 0,
            userId: '',
            total: '',
            tableData: [],
            tableData2: [],
            tableData3: [],
            zcmg: '',
            ruleForm: {
                name: '',
                type: [],
                tmh: '',
                xlh: '',
                ssq: '',
                state: [],
                ggxh: '',
                sccj: '',
                node: '',
                management: '',
                ip: '',
                jd: '',
                wd: '',
                bz: ''
            },
            options: [],
            zcState: [],
            ssqArr: [],
            nodeArr: [],
            shArr: [],
            ssq_name: '',
            zcType_name: '',
            zcState_name: '',
            ssNode_name: '',
            management: '',
            assets_id: '',
            creater: '',
            create_time: '',
            create_way: '',
            imgArr1: [],
            imgArr: [],
            file: '',
            type: '',
            isEdits: false,
            userId: '',
            isBigImg: false,
            sizeObj: {},
            imgHeight: '',
            imgArrs: [],
            autoplay: false,
            nameArr: [],
            zcggArr: [],
            sccjArr: [],
            management2: '',
            ssNode_name2: '',
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        console.log(this.$route.params.param)
        this.getQueryAssetsSpecifications()
        this.getQueryAssetsNames()
        this.getQueryAssetsManufacturers()
        this.getQueryNodeBase()
        this.getQueryAssetsType()
        this.getQueryAssetsConf()
        if(this.$route.params.type){
            this.btn = '保存'
            this.type = this.$route.params.type
        }
        let param = this.$route.params.param
        this.ruleForm.node = param.node_code // 关联节点信息
        this.ssNode_name2 = param.node_name // 节点名称
        this.zcType_name = param.assets_type // 资产类型
        // this.ruleForm.type = param.assets_type_id
        this.ssq_name = param.sub_period // 所属期
        this.ruleForm.ssq = param.sub_period_id
        this.zcState_name = param.a_conf_item // 资产状态
        this.ruleForm.state = param.a_conf_id
        this.ruleForm.management = param.merchant_id // 关联商户信息
        this.management2 = param.merchant_name// 商户名称
        this.ruleForm.name = param.assets_name // 资产名称
        this.ruleForm.tmh = param.bar_code // 条码号（SW）
        this.ruleForm.xlh = param.serial_num // 序列号 
        this.ruleForm.ggxh = param.specifications // 规格型号
        this.ruleForm.sccj = param.manufacturer // 生产厂家
        this.ruleForm.ip = param.ip // IP
        this.ruleForm.jd = param.longitude // 经度
        this.ruleForm.bz = param.remark // 备注
        this.ruleForm.wd = param.latitude
        this.assets_id = param.assets_id // 资产id
        this.create_way = param.create_way
        this.creater = param.name
        this.create_time = param.create_time.substring(0,16)
        let img_url = param.image_url
        let  imgArr = img_url.split(','),obj ={};
        imgArr.forEach(val => {
            if(val){
                obj = {
                    img_url: val
                }
                this.imgArr1.push(obj)
            }
        })
        this.getQueryBusiness()
        this.getUpdataFun()
        this.getXjFun()
        this.getWxFun()
    },
    methods: { 
        // 查询所有资产规格
        getQueryAssetsSpecifications(){
            QueryAssetsSpecifications('')
                .then(res => {
                    this.zcggArr = res.data.assetsspecifications
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询所有资产名称
        getQueryAssetsNames(){
            QueryAssetsNames('')
                .then(res => {
                    this.nameArr = res.data.assetsnames
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询所有资产生产厂家
        getQueryAssetsManufacturers(){
            QueryAssetsManufacturers('')
                .then(res => {
                    this.sccjArr = res.data.queryassetsmanufacturers
                })
                .catch(res => {
                    console.log(res);
                })
        },
        bigImgFun(item){
            this.isBigImg = true
            this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
            let obj = {}
            if(item.img_url){
                this.imgArrs.push(item)
            }else{
                obj = {
                    img_url: item
                }
                this.imgArrs.push(obj)
            }
            
        },
        clearFun(){
            this.btn = '修改'
            let param = this.$route.params.param
            this.ruleForm.node = param.node_code // 关联节点信息
            this.ssNode_name2 = param.node_name // 节点名称
            this.zcType_name = param.assets_type // 资产类型
            // this.ruleForm.type = param.assets_type_id
            this.ssq_name = param.sub_period // 所属期
            this.ruleForm.ssq = param.sub_period_id
            this.zcState_name = param.a_conf_item // 资产状态
            this.ruleForm.state = param.a_conf_id
            this.ruleForm.management = param.merchant_id // 关联商户信息
            this.shArr.forEach(val => {
                if(val.BIZ_ID == this.$route.params.param.merchant_id){
                    this.management = val.BIZ_NAME
                }
            })
            this.nodeArr.forEach(val => {
                if(val.NODE_ID == this.$route.params.param.node_code){
                    this.ssNode_name = val.NODE_NAME
                }
            })
            this.management2 = param.merchant_name// 商户名称
            this.ruleForm.name = param.assets_name // 资产名称
            this.ruleForm.tmh = param.bar_code // 条码号（SW）
            this.ruleForm.xlh = param.serial_num // 序列号 
            this.ruleForm.ggxh = param.specifications // 规格型号
            this.ruleForm.sccj = param.manufacturer // 生产厂家
            this.ruleForm.ip = param.ip // IP
            this.ruleForm.jd = param.longitude // 经度
            this.ruleForm.bz = param.remark // 备注
            this.ruleForm.wd = param.latitude
            this.assets_id = param.assets_id // 资产id
            this.create_way = param.create_way
            this.creater = param.name
            this.create_time = param.create_time.substring(0,16)
            this.imgArr1 = []
            let img_url = param.image_url
            let  imgArr = img_url.split(','),obj ={};
            imgArr.forEach(val => {
                if(val){
                    obj = {
                        img_url: val
                    }
                    this.imgArr1.push(obj)
                }
            })
        },
        closeFun2(){
            this.imgArrs = []
            this.isBigImg = false
        },   
        viewFun(ele){
            this.imgArr = []
            this.isEdits = true
            if(ele.image_url){
                let img_url = ele.image_url
                let  imgArr = img_url.split(','),obj ={};
                imgArr.forEach(val => {
                    if(val){
                        this.imgArr.push(val)
                    }
                })
            }
        },
        closeFun(){
            this.isEdits = false
            this.imgArr = []
        },
        // 查询变更记录
        getUpdataFun(){
            let params = {
                assets_id: this.assets_id,
                cols: this.cols,
                page: this.page,
            }
            QueryChangeListByAssetsId(params)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.change_log_list
                    this.num = res.data.assets_base.total
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                })
            
        },
        // 查询巡检记录
        getXjFun(){
            let params = {
                assets_id: this.assets_id,
                cols: this.cols,
                page: this.page,
            }
            QueryInspectinfoListByAssetsId(params)
                .then(res => {
                    // console.log(res)
                    this.tableData2 = res.data.inspectinfo_list
                    this.num = res.data.assets_base.total
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                })
        },
        // 查询维修记录
        getWxFun(){
            let params = {
                assets_id: this.assets_id,
                cols: this.cols,
                page: this.page,
            }
            QueryMaintaininfoListByAssetsId(params)
                .then(res => {
                    // console.log(res)
                    this.tableData3 = res.data.amaintaininfo_list
                    this.num = res.data.assets_base.total
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                })
        },
        fileFun(event,ele){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var that = this;
            let param = this.$refs.file.files[0];
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', this.file);  
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
            const url = uploadPhotos
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        let obj = {
                            img_url: res.data.imgUrl
                        }
                        this.imgArr1.push(obj)
                        loading.close();
                    }else{
                        this.$message.error(res.message);
                    }
                    this.$refs.file.value = null
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了");
                })
        },
        removeFun(ele){
            this.imgArr1.splice(ele,1)
            this.imgArr1.length - 1
        },
        getAssetsUpdate(){
            let imgStr = ''
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    if(val.img_url){
                        imgStr += val.img_url + ','
                    }
                })
                imgStr = imgStr
            }else{
                imgStr = ''
            }
            let params = {
                node_code: this.ruleForm.node, // 关联节点信息
                node_name: this.ruleForm.node ? this.ssNode_name : '', // 节点名称
                assets_type: this.zcType_name, // 资产类型
                assets_type_id: this.ruleForm.type[this.ruleForm.type.length - 1],
                sub_period: this.ruleForm.ssq ? this.ssq_name : '', // 所属期
                sub_period_id: this.ruleForm.ssq,
                a_conf_item: this.ruleForm.state ? this.zcState_name : '', // 资产状态
                a_conf_id: this.ruleForm.state,
                merchant_id: this.ruleForm.management, // 关联商户信息
                merchant_name: this.ruleForm.management ? this.management : '',// 商户名称
                assets_name: this.ruleForm.name.trim(), // 资产名称
                bar_code: this.ruleForm.tmh.trim(), // 条码号（SW）
                serial_num: this.ruleForm.xlh.trim(), // 序列号 
                specifications: this.ruleForm.ggxh.trim(), // 规格型号
                manufacturer: this.ruleForm.sccj.trim(), // 生产厂家
                ip: this.ruleForm.ip.trim(), // IP
                longitude: this.ruleForm.jd.trim(), // 经度
                remark: this.ruleForm.bz.trim(), // 备注
                latitude: this.ruleForm.wd.trim(),
                assets_id: this.assets_id,
                image_url: imgStr,
                userid: this.userId,
            }
            AssetsUpdate(params)
                .then(res => {
                    console.log(res)
                    if (res.result == true) {
                        this.$message.success(res.message);
                        if(this.type == 'viewMaintenance'){
                            this.$router.push({name: 'Maintenance'})
                        }else if(this.type == 'viewInspection'){
                            this.$router.push({name: 'Inspection'})
                        }else{
                            this.$router.push({name: 'Assets'})
                        }
                        this.btn = '修改'
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        zcTypeFun(ele){
            this.options.forEach(val => {
                if(val.assets_type_id == ele[ele.length - 1]){
                    this.zcType_name = val.assets_type
                }else{
                    val.child_list.forEach(val =>{
                        if(val.assets_type_id == ele[ele.length - 1]){
                            this.zcType_name = val.assets_type
                        }
                    })
                }
            })
        },
        ssqFun(ele){
            this.ssqArr.forEach(val => {
                if(val.a_conf_id == ele){
                    this.ssq_name = val.a_conf_item
                }
            })
        },
        zcStateFun(ele){
            this.zcState.forEach(val => {
                if(val.a_conf_id == ele){
                    this.zcState_name = val.a_conf_item
                }
            })
        },
        ssNodeFun(ele){
            this.nodeArr.forEach(val => {
                if(val.NODE_ID == ele){
                    this.ssNode_name = val.NODE_NAME
                }
            })
            this.ruleForm.management = ''
            this.management = ''
            this.getQueryBusiness()
        },
        ssManagementFun(ele){
            this.shArr.forEach(val => {
                if(val.BIZ_ID == ele){
                    this.management = val.BIZ_NAME
                }
            })
        },
        focusFun(){
            if(this.ruleForm.node == ''){
                this.$message.error("请选择节点!");
            }
        },
        // 查询 资产状态、所属期 等查询条件下拉框
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    // console.log(res)
                    this.zcState = res.data[1]
                    this.ssqArr = res.data[3]
            // 1:状态，2:维修更换部件,3:所属期)
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 资产类型树
        getQueryAssetsType(){
            QueryAssetsType('')
                .then(res => {
                    res.data.assetsType.forEach(val => {
                        val.value = val.assets_type_id
                        val.label = val.assets_type
                        if(val.child_list.length > 0){
                            val.children = val.child_list
                            val.child_list.forEach(val =>{
                                val.value = val.assets_type_id
                                val.label = val.assets_type
                            })
                        }
                    })
                    this.options = res.data.assetsType
                    let arr = []
                    if(this.$route.params.param.assets_type){
                        this.options.forEach(val => {
                            if(val.assets_type == this.$route.params.param.assets_type){
                                arr.unshift(val.assets_type_id)
                            }else{
                                if(val.child_list.length > 0){
                                    val.child_list.forEach(val =>{
                                        if(val.assets_type == this.$route.params.param.assets_type){
                                            arr.unshift(val.assets_type_id)
                                            arr.unshift(val.parent_ass_type_id)
                                        }
                                    })
                                }
                            }
                        })
                        this.ruleForm.type = arr
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有节点
        getQueryNodeBase(){
            QueryNodeBase2('')
                .then(res => {
                    // console.log(res)
                    this.nodeArr = res.data.nodeBase
                    this.nodeArr.forEach(val => {
                        if(val.NODE_ID == this.$route.params.param.node_code){
                            this.ssNode_name = val.NODE_NAME
                        }
                    })
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有商户
        getQueryBusiness(){
            if(this.ruleForm.node){
                // node_id  先选节点后选商户  新增
                let str = 'node_id=' + this.ruleForm.node
                QueryBusiness(str)
                    .then(res => {
                        // console.log(res)
                        this.shArr = res.data.business
                        this.shArr.forEach(val => {
                            if(val.BIZ_ID == this.$route.params.param.merchant_id){
                                this.management = val.BIZ_NAME
                            }
                        })
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        btnFun(){
            if(this.btn == '修改'){
                this.btn = '保存'
            }else if(this.btn == '保存'){
                // if(/^SW\d{6}$/.test(this.ruleForm.tmh) == false){
                //     this.$message.error("请输入正确的条码号!");
                //     return
                // }
                if(this.ruleForm.name == ''){
                    this.$message.error("请选择资产名称!");
                    return
                }
                if(this.ruleForm.type == ''){
                    this.$message.error("请选择资产类型!");
                    return
                }
                if(this.ruleForm.xlh == ''){
                    this.$message.error("请输入序列号!");
                    return
                }
                if(this.ruleForm.node == ''){
                    this.$message.error("请选择节点!");
                    return
                }
                if(this.ruleForm.ssq == ''){
                    this.$message.error("请选择所属期!");
                    return
                }
                if(this.ruleForm.state == ''){
                    this.$message.error("请选择资产状态!");
                    return
                }
                if(this.ruleForm.ggxh == ''){
                    this.$message.error("请选择规格型号!");
                    return
                }
                if(this.ruleForm.sccj == ''){
                    this.$message.error("请选择生产厂家!");
                    return
                }
                this.getAssetsUpdate()
                // this.btn = '修改'
            }
        },
        handleClick(tab) {
            this.page = 1
            if(tab.name == 'first'){
                this.getUpdataFun()
            }else if(tab.name == 'second'){
                this.getXjFun()
            }else if(tab.name == 'third'){
                this.getWxFun()
            }
        },
        
        handleCurrentChange(val) {
            this.page = val
            this.getUpdataFun()
        },
        handleCurrentChange2(val) {
            this.page = val
            this.getXjFun()
        },
        handleCurrentChange3(val) {
            this.page = val
            this.getWxFun()
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
        .box{
            padding: 10px 20px;
            background: #fff;
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 20%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
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
                
                .msg-item{
                    margin: 10px 0;
                    width: 500px;
                    display: flex;
                }
            }
            .btn{
                clear: both;
                margin-right: 100px;
                text-align: right;
            }
        }
        .el-input, .el-select, .el-cascader{
            width: 176px;
        }
        .tab{
            margin: 10px 0;
            padding: 10px;
            background: #fff;
            .active{
                text-decoration: underline;
                color: #c1c1c1;
            }
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
                margin-top: -325px;
                margin-left: -400px;
                width: 800px;
                background: #fff;
                .close{
                    margin: 0 10px;
                    padding-right: 20px;
                    height: 40px;
                    text-align: right;
                    line-height: 40px;
                    font-size: 16px;
                    border-bottom: 1px solid #ccc;
                    cursor: pointer;
                }
                .img-carousel{
                    margin-top: 10px;
                    width: 800px;
                    height: 600px;
                }
                .el-carousel{
                    width: 800px;
                    height: 600px;
                }
                
                .el-carousel__item{
                    color: #475669;
                    font-size: 14px;
                    margin: 0;
                }
                .images{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }
        .list-title{
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #e4e7ed;
        }
        .view{
            margin-top: 10px;
        }
        .big-img{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 999;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
            .images{
                text-align: center;
            }
            .imgBox{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .image{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
    }
</style>
<style lang="less">
    .view-assets{
        .el-select .el-input .el-select__caret,.el-input__icon{
            line-height: 24px;
        }
        .el-carousel__container{
            width: 800px;
            height: 600px;
        }
        .el-table{
            color: #999;
        }
    }
</style>

