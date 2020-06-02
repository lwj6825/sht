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
                        <div class="msg">{{ssNode_name ? ssNode_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">所属商户</div>
                        <div class="msg">{{management ? management : '无'}}</div>
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
                        <el-select v-model="ruleForm.state" filterable clearable placeholder="请选择" @change="zcStateFun">
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
                        <el-input style="width: 44%" v-model="ruleForm.jd" clearable></el-input>
                        <el-input style="width: 44%" v-model="ruleForm.wd" clearable></el-input>
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
                        <el-input type="textarea" v-model="ruleForm.bz" clearable style="max-height: 150px;"></el-input>
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
                                            <img :src="item.img_url" @click="bigImgFun(item)">
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
                <!--<el-button v-if="btn == '修改'" @click="deleteFun">删除</el-button>-->
            </div>
        </div>
        <div class="tab">
            <div class="list-title">维修信息</div>
            <div class="tab-list">
                <div class="data">
                    <div class="title">设备问题</div>
                    <div class="msg">{{sbwt ? sbwt : '无'}}</div>
                </div>
                <div class="data">
                    <div class="title">解决方案</div>
                    <div class="msg">{{jjfa ? jjfa : '无'}}</div>
                </div>
                <div class="data">
                    <div class="title">更换部件</div>
                    <div class="msg">{{ghbj ? ghbj : '无'}}</div>
                </div>
                <div class="data">
                    <div class="title">维修结果</div>
                    <div class="msg">{{wxjg == 0 ? '已完成' : '未完成'}}</div>
                </div>
                <div class="data">
                    <div class="title">维修人</div>
                    <div class="msg">{{wxr ? wxr : '无'}}</div>
                </div>
                <div class="data">
                    <div class="title">维修日期</div>
                    <div class="msg">{{wxrq ? wxrq : '无'}}</div>
                </div>
                <div class="data">
                    <div class="title">附件</div>
                    <div class="msg" v-if="imgArr.length > 0">
                        <div class="msg-item">   
                            <div class="img-list">
                                <ul>
                                    <li v-for="(item,index) in imgArr" :key="index" @click="bigImgFun(item)">
                                        <figure class="image">
                                            <img :src="item" v-if="item">
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
        <div class="big-img" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeFun2">X</p>
            <div class="imgBox">
                <figure class="images" v-for="(item,index) in imgArrs" :key="index" v-if="imgArrs.length > 0">
                    <img :style="sizeObj" :src="item.img_url" v-if="item.img_url">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryAssetsUser,QueryAssetsConf,QueryAssetsType,QueryNodeBase2,QueryBusiness,AssetsUpdate,QueryMaintainId,DeleteMaintain,
    QueryAssetsSpecifications,QueryAssetsNames,QueryAssetsManufacturers,} from '../../js/traceEquipment/traceEquipment.js'
import {uploadPhotos} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"viewMaintenance",
    data() {
        return {
            sbwt: '',
            jjfa: '',
            ghbj: '',
            wxjg: '',
            wxr: '',
            wxrq: '',
            btn: '修改',
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
            name: '',
            inspect_time: '',
            maintain_id: '',
            file: '',
            imgArr: [],
            param: {},
            isBigImg: false,
            sizeObj: {},
            imgHeight: '',
            imgArrs: [],
            userId: '',
            nameArr: [],
            zcggArr: [],
            sccjArr: [],
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId')
        // console.log(this.$route.params) 
        this.getQueryAssetsSpecifications()
        this.getQueryAssetsNames()
        this.getQueryAssetsManufacturers()
        this.getQueryNodeBase()
        this.getQueryAssetsType()
        this.getQueryAssetsConf()
        let param = this.$route.params
        this.maintain_id = param.maintain_id
        this.getMsgFun()
        // console.log(this.imgArr)
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
            this.imgArr1 = []
            this.imgArr = []
            this.getMsgFun()
        },
        closeFun2(){
            this.imgArrs = []
            this.isBigImg = false
        },   
        getMsgFun(){
            let obj = {
                maintain_id: this.maintain_id
            }
            QueryMaintainId(obj)
                .then(res => {
                    let param = res.data.assetsBase[0]
                    this.param = param
                    this.ruleForm.node = param.node_code // 关联节点信息
                    this.ssNode_name = param.node_name // 节点名称
                    this.zcType_name = param.assets_type // 资产类型
                    this.ssq_name = param.sub_period // 所属期
                    this.ruleForm.ssq = param.sub_period_id
                    this.zcState_name = param.a_conf_item // 资产状态
                    this.ruleForm.state = param.a_conf_id
                    this.ruleForm.management = param.merchant_id // 关联商户信息
                    this.management = param.merchant_name// 商户名称
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
                    this.create_time = param.create_time.substring(0,18)
                    // this.inspect_time = param.inspect_time.substring(0,18)
                    this.name = param.name
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
                    let inspectList = res.data.inspectList[0]
                    this.sbwt = inspectList.cause
                    this.jjfa = inspectList.solution
                    this.ghbj = inspectList.change_unit
                    this.wxjg = inspectList.m_result
                    this.wxr = inspectList.name
                    this.wxrq = inspectList.m_time.substring(0,16)
                    let img_urls = inspectList.image_url
                    let imgArr1 = img_urls.split(',');
                    imgArr1.forEach(val => {
                        if(val){
                            this.imgArr.push(val)
                        }
                    })
                })
                .catch(res => {
                    console.log(res);
                })

        },
        deleteFun(){
            let obj = {
                maintain_id: this.maintain_id
            }
            DeleteMaintain(obj)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({name: 'Maintenance'})
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res);
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
                    loading.close();
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
            console.log(imgStr)
            let params = {
                node_code: (this.ruleForm.node && this.ssNode_name) ? this.ruleForm.node : '', // 关联节点信息
                node_name: this.ruleForm.node && this.ssNode_name ? this.ssNode_name : '', // 节点名称
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
            console.log(params)
            AssetsUpdate(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({name: 'Maintenance'})
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
                    if(this.$route.params.assets_type){
                        this.options.forEach(val => {
                            if(val.assets_type == this.$route.params.assets_type){
                                arr.unshift(val.assets_type_id)
                            }else{
                                if(val.child_list.length > 0){
                                    val.child_list.forEach(val =>{
                                        if(val.assets_type == this.$route.params.assets_type){
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
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        btnFun(){
            if(this.btn == '修改'){
                // this.$router.push({name: 'ViewAssets',params:{param: this.param,type: 'viewMaintenance'}})
                this.btn = '保存'
            }else if(this.btn == '保存'){
                if(/^SW\d{6}$/.test(this.ruleForm.tmh) == false){
                    this.$message.error("请输入正确的条码号!");
                    return
                }
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
                // // this.btn = '修改'
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
        .list-title{
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #e4e7ed;
        }
        .view{
            margin-top: 10px;
        }
        .el-input, .el-select, .el-cascader, .el-textarea{
            width: 90%;
        }
        .tab{
            margin: 10px 0;
            width: 100%;
            background: #fff;
            .tab-list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                float: left;
                margin: 20px;
                width: 20%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                    font-weight: bold;
                }
                .msg{
                    line-height: 30px;
                    overflow: hidden;
                    color: #999;
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
            .el-carousel__container{
                width: 100%;
                height: 100%;
            }
            .el-carousel__item{
                color: #475669;
                font-size: 14px;
                margin: 0;
            }
        }
    }
</style>
<style lang="less">
    .view-assets{
        .el-select .el-input .el-select__caret,.el-input__icon{
            line-height: 24px;
        }

    }
</style>
