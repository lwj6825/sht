<template>
    <div class="content lsTask">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="任务信息">
                        <el-input class="placeholder" v-model="form.msg" clearable placeholder="请输入任务ID或任务内容"></el-input>
                    </el-form-item>
                    <el-form-item label="报修模式">
                        <el-select v-model="form.bxms_id" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in bxmsArr" :key="index" :label="item.item"
                            :value="item.item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务类型">
                        <el-select v-model="form.types" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.node_name"
                            :value="item.node_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工作组">
                        <el-select v-model="form.work_id" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in workArr" :key="index" :label="item.item"
                            :value="item.item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指派给">
                        <el-select v-model="form.zpg_id" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in zpgArr" :key="index" :label="item.name"
                            :value="item.userid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-select v-model="form.people" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in peopleArr" :key="index" :label="item.name"
                            :value="item.userid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">搜索</el-button>
                        <!-- <el-button @click="clearFun">重置</el-button>-->
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <el-radio-group v-model="labelPosition" @change="selectTypesFun">
                <el-radio-button label="0">待解决</el-radio-button>
                <el-radio-button label="1">已解决</el-radio-button>
                <el-radio-button label="">全部任务</el-radio-button>
            </el-radio-group>
            <div class="title">
                <p class="tz-title">任务列表</p>
                <div>
                    <el-button type="primary" @click="addFun">+新建任务</el-button>
                    <el-button plain>导出</el-button>
                </div>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass" :cell-style="classStyle">
                <el-table-column prop="id" label="任务ID"> </el-table-column>
                <el-table-column prop="task_content" label="任务内容"> 
                    <template slot-scope="scope">
                        <div class="task_name">
                            <el-tooltip class="item" effect="dark" :content="scope.row.task_content" placement="top">
                                <p>{{scope.row.task_content}}</p>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="task_model" label="任务类型"> </el-table-column>
                <el-table-column prop="record_date" label="指派给">
                    <template slot-scope="scope">
                        <div class="zpg" v-if="!scope.row.assigned_name">
                            <span style="font-weight: bolder">未指派</span>
                            <span @click="assignFun(scope.row)" class="iconfont icon-select"></span>
                        </div>
                        <div class="zpg" v-else>
                            <span>{{scope.row.assigned_name}}</span>
                            <span @click="assignFun(scope.row)" class="iconfont icon-select"></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="group_name" label="工作组"> </el-table-column>
                <el-table-column prop="level" label="优先级"></el-table-column>
                <el-table-column prop="create_name" label="创建人"> </el-table-column>
                <el-table-column prop="record_time" label="创建时间"> </el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.task_state == 1" size="small" @click="viewFun(scope.row)">查看</el-button>
                        <div v-else>
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="stopFun(scope.row)">关闭</el-button>
                            <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <!--指派给-->
        <div class="passwrd assign" v-if="isAssign">
            <div class="text">
                <div class="box-title">
                    <p class="tit">指派给</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="clear"></div>
                <div class="msg">
                    <p>工作组</p>
                    <el-select v-model="work_id" filterable clearable placeholder="请选择">
                        <el-option v-for="(item,index) in workArr" :key="index" :label="item.item"
                            :value="item.item">
                        </el-option>
                    </el-select>
                    <p>运维人员</p>
                    <el-select v-model="assign_id" filterable clearable placeholder="请选择">
                        <el-option v-for="(item,index) in assignArr" :key="index"  :label="item.name"
                            :value="item.userid">
                        </el-option>
                    </el-select>
                </div>
                <div class="btn">
                    <el-button @click="closeFun">取消</el-button>
                    <el-button type="primary" @click="saveAssignFun">指派</el-button>
                </div>
            </div>
        </div>
        <!--新增 编辑-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}报修任务</p>
                    <p class="iconfont icon-close close" @click="closeFun2"></p>
                </div>
                <div class="clear"></div>
                <el-form class="form" ref="form2" :model="form2" :rules="rules" label-width="120px" size="small">
                    <el-form-item label="选择节点">
                        <el-select v-model="form2.node_id" filterable clearable placeholder="请选择" @change="selectNodeFun"
                            v-loadmore="loadmore2" remote :remote-method="remoteMethod2" reserve-keyword @blur="unfocusFun2">
                            <el-option v-for="(item,index) in nodeArr" :key="index" :label="item.NODE_NAME"
                                :value="item.NODE_ID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务模式" prop="bxms_id">
                        <el-select v-model="form2.bxms_id" filterable clearable placeholder="请选择">
                            <el-option v-for="item in bxmsArr" :key="item.a_conf_id"  :label="item.booth_name" :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务类型" prop="bxms_id">
                        <el-select v-model="form2.types" filterable clearable placeholder="请选择">
                            <el-option v-for="item in typesArr" :key="item.a_conf_id"  :label="item.booth_name" :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务内容" prop="task_msg">
                        <el-input clearable v-model="form2.task_msg"></el-input>
                    </el-form-item>
                    <el-form-item label="添加图片">
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
                    <el-form-item label="设备信息">
                        <div v-if="item_id">
                            <div class="equipment" v-for="(item2, index2) in equipmentList" :key="index2">
                                <el-select v-model="item2.equipment" filterable placeholder="请选择" @change="selectEquipmentFun(item2.equipment,index2)"
                                    v-loadmore="loadmore1" remote :remote-method="remoteMethod1" reserve-keyword @blur="unfocusFun1"
                                    @focus="focusFun1">
                                    <el-option v-for="(item,index) in equipmentArr" :key="index" :label="item.bar_code + '|' + item.assets_name" 
                                        :value="item.assets_id">
                                    </el-option>
                                </el-select>
                                <p class="iconfont icon-close close-equipment" @click="deleteEquipmentFun(item)"></p>
                            </div>
                        </div>
                        <div v-else>
                            <el-select v-model="item2.equipment" filterable placeholder="请选择" @change="selectEquipmentFun(item2.equipment,index2)"
                                v-loadmore="loadmore1" remote :remote-method="remoteMethod1" reserve-keyword @blur="unfocusFun1"
                                @focus="focusFun1" v-for="(item2,index2) in equipmentList" :key="index2">
                                <el-option v-for="(item,index) in equipmentArr" :key="index" :label="item.bar_code + '|' + item.assets_name" 
                                    :value="item.assets_id">
                                </el-option>
                            </el-select>
                            <p class="add-btn" @click="addEquipmentFun">添加设备</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="指派给">
                        <div class="zpg">
                            <el-select v-model="form2.work_id" filterable clearable placeholder="请选择工作组" @change="selectWorkFun">
                                <el-option v-for="(item,index) in workArr" :key="index" :label="item.item"
                                :value="item.item">
                                </el-option>
                            </el-select>
                            <el-select v-model="form2.assign_id" filterable clearable placeholder="请选择技术员">
                                <el-option v-for="(item,index) in assignArr" :key="index"  :label="item.name"
                                    :value="item.userid">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-radio-group v-model="form2.priority">
                            <el-radio :label="'高'">高</el-radio>
                            <el-radio :label="'中'">中</el-radio>
                            <el-radio :label="'低'">低</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input clearable v-model="form2.remarke"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button @click="closeFun2">取消</el-button>
                        <el-button type="primary" @click="submitForm('form2')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--关闭-->
        <div class="passwrd solve" v-if="isSolve">
            <div class="text">
                <div class="box-title">
                    <p class="tit">关闭任务</p>
                    <p class="iconfont icon-close close" @click="closeFun3"></p>
                </div>
                <div class="clear"></div>
                <el-form class="form" ref="form3" :model="form3" :rules="rules2" label-width="120px" size="small">
                    <el-form-item label="故障类型" prop="bxms_id">
                        <el-select v-model="form2.fault" filterable clearable placeholder="请选择">
                            <el-option v-for="item in faultArr" :key="item.a_conf_id"  :label="item.booth_name" :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="解决方案" prop="solve">
                        <textarea v-model="form3.solve" placeholder="例：土豆15黄瓜20"></textarea>
                    </el-form-item>
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
                                添加图片
                                <form id="upload" enctype="multipart/form-data" method="post"> 
                                    <input type="file" class="file" ref="file" @change="fileFun($event)">
                                </form>
                            </div>
                        </div>
                    </div>
                    <el-form-item class="btn">
                        <el-button @click="closeFun3">取消</el-button>
                        <el-button type="primary" @click="submitForm2('form3')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryNodeBase2,QueryBusiness,QueryAssetsBase,QueryAssetsConf} from '../../js/traceEquipment/traceEquipment.js'
import {importAssets,importAssetsUpdate} from '../../js/address/url.js'
import {QueryNodeBasePage,GetAssetsConfig,GetAssetsUser,InsertAssetsTask,GetAssetsTask,GetAssetsTaskImg,UpdateAssetsTask,
    DeleteAssetsTaskImg,GetAssetsTaskInfo,InsertAssetsImg,UpdateAssetsTaskInfo,DeleteAssetsInfo,UpdateAssetsTaskAssignId,
    InsertAssetsTaskResult} from '../../js/repair/repair.js'
import {uploadImgTask} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"lsTask",
    data() {
        return {
            page: 1,
            cols: 15,
            total: 0,
            tableData: [],
            form: {
                msg: '',
                types: '',
                bxms_id: '',
                zpg_id: '',
                work_id: '',
                people: '',
            },
            typesArr: [],
            nodeArr: [],
            bxmsArr: [],
            zpgArr: [],
            workArr: [],
            peopleArr: [],
            labelPosition: 0,
            isAssign: false, // 指派
            assign_id: '', // 运维人员
            assignArr: [],
            work_id: '', // 工作组
            prompt: '新建',
            isEdits: false, // 新增，编辑
            form2: {
                node_id: '', // 选择节点
                bxms_id: '', // 报修模式
                types: '', //任务类型
                task_msg: '', // 任务内容
                equipment: '', // 设备信息
                work_id: '', // 工作组
                assign_id: '', // 技术人员
                priority: '高', // 优先级
                remarke: '', // 备注
            },
            rules: {
                node_id: [
                    { required: true, message: '请选择节点', trigger: 'change' }
                ],
                bxms_id: [
                    { required: true, message: '请选择任务模式', trigger: 'change' }
                ],
                types: [
                    { required: true, message: '请选择任务类型', trigger: 'change' }
                ],
                task_msg: [
                    { required: true, message: '请输入任务内容', trigger: 'blur' },
                ],
            },
            equipmentArr: [],
            imgArr1: [],
            file: '',
            isSolve: false, // 关闭
            form3: {
                solve: '',
                fault: '', // 故障类型
            },
            faultArr: [],
            rules2: {
                solve: [
                    { required: true, message: '请输入解决方案', trigger: 'blur' },
                ],
            },
            equipmentArr: [],
            merchant_name: '',
            node_name: '',
            page1: 1, // 设备
            cols1: 50,
            num1: '',
            types1: '',
            query1: '',
            page2: 1, // 节点
            cols2: 50,
            num2: '',
            types2: '',
            query2: '',
            userId: '', // 登录人
            userName: '', // 登录人
            role_id: '', // 登录人
            item_id: '', // 数据id
            assert_info: [], // 设备信息
            equipmentList: [{equipment: ''}],
            solve_id: '', // 关闭数据id
            equipmentMsg: [], // 关闭任务获取设备信息
            partArr: [], // 更换部件
        }
    },
    mounted() {
       
    },
    methods: {
        // 获取更换部件
        getQueryAssetsConf(){
            QueryAssetsConf('')
                .then(res => {
                    this.partArr = res.data[2]
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 新增设备
        addEquipmentFun(){
            let obj = {
                equipment: '',
            }
            this.equipmentList.push(obj)
        },
        // 删除设备信息
        deleteEquipmentFun(ele){
            let str = 'id=' + ele.id
            DeleteAssetsInfo(str)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.getGetAssetsTaskInfo()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 删除图片
        removeFun(ele,ele2){
            if(ele.id){
                let params = {
                    id: ele.id,
                }
                DeleteAssetsTaskImg(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.getImgFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }else{
                this.imgArr1.splice(ele2,1)
                this.imgArr1.length - 1
            }
        },
        // 查看图片
        getImgFun(){
            this.imgArr1 = []
            let params = {
                id: this.item_id,
            }
            GetAssetsTaskImg(params)
                .then(res => {
                    res.data.forEach(val => {
                        val.img_url = val.url
                        this.imgArr1.push(val)
                    })
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        // 选择工作组
        selectWorkFun(ele){
            this.assign_id = ''
            this.getGetAssetsUserFun(ele)
        },
        // 选择设备信息 
        selectEquipmentFun(ele,ele2){
            console.log(ele)
            let states = false;
            let arr = [],newArr = [];
            this.equipmentList.forEach(val => {
                if(ele == val.equipment){
                    arr.push(val.equipment)
                }
            })
            arr.forEach(val => {
                if(newArr.indexOf(val) == -1) {
                    newArr.push(val)
                }else{
                    this.$message({
                        message: '不能选择同一设备',
                        type: 'warning',
                        offset: 200,
                    });
                    states = true
                    return
                }
            })
            if(states == false){
                if(this.item_id){
                    // 编辑设备信息
                    let obj = {}
                    this.equipmentArr.forEach(val => {
                        this.equipmentList.forEach(val2 => {
                            if(val2.equipment == val.assets_id){
                                val2.assets_name = val.assets_name
                                val2.assets_no = val.bar_code
                                obj = val2
                            }
                        })
                    })
                    let newobj = {}
                    let arr = []
                    newobj = {
                        id: obj.id,
                        assets_id: obj.assets_id,
                        assets_no: obj.assets_no,
                        assets_name: obj.assets_name, // 电子秤，
                        describe: '', // 设备问题描述,
                        assets_part: '', // 设备部件
                        text: '', // 解决方案
                        result: '', //  维修结果 0 未完成，1已完成
                        task_id: this.item_id,
                        create_name : this.userName,  // 当前登录人的名字
                    }
                    arr.push(newobj)
                    let params = arr
                    UpdateAssetsTaskInfo(params)
                        .then(res => {
                            if (res.result == true) {
                                this.equipmentList = []
                                this.$message.success(res.message);
                                this.getGetAssetsTaskInfo()
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                        .catch((res) => {
                            this.$message.error("出错啦!");
                            console.log(res)
                        })
                }else{
                    this.assert_info = []
                    this.equipmentArr.forEach(val => {
                        this.equipmentList.forEach(val2 => {
                            if(val2.equipment == val.assets_id){
                                this.assert_info.push(val)
                            }
                        })
                    })
                }
            }else{
                if(this.item_id){
                    this.getGetAssetsTaskInfo()
                }else{
                    this.equipmentList.splice(ele2,1)
                    this.equipmentList.length - 1
                }
                
            }
            if(this.item_id){
                let obj = {}
                this.equipmentArr.forEach(val => {
                    if(val.assets_id == ele){
                        obj = val
                    }
                })
                
            }
        },
        //查询指派人
        getGetAssetsUserFun(group_name){
            let str = 'group_name=' + (group_name ? group_name : '')
            GetAssetsUser(str)
                .then(res => {
                    this.zpgArr = res.data
                    this.assignArr = res.data
                })
                .catch(res => {
                    console.log(res);
                })
        },
        //查询创建人
        getGetAssetsUserFun2(){
            let str = 'group_name=' + ''
            GetAssetsUser(str)
                .then(res => {
                    this.peopleArr = res.data
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询用户组以及 报修类型 ，任务类型
        getGetAssetsConfigFun(){
            GetAssetsConfig('')
                .then(res => {
                    this.bxmsArr = res.data[4]
                    this.workArr = res.data[5]
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 加载更多的设备信息
        loadmore1 (e) { 
            this.page1 = this.page1 + 1
            if(this.types1 == 1){
                console.log(this.equipmentArr.length)
                console.log(this.num1)
                if(this.num1 == this.equipmentArr.length){
                    return
                }else{
                    this.getQueryAssetsBase()
                }
            }else{
                this.remoteMethod1(this.query1)
            }
        },
        // 搜索设备
        remoteMethod1(query) {
            if(this.query1 != query){
                this.page1 = 1
                this.equipmentArr = []
            }
            this.query1 = query
            if(this.types1 == 1){
                this.page1 = 1
                this.equipmentArr = []
            }
            if (query !== '') {
                this.types1 = 2
                setTimeout(() => {
                    let params = {
                        assets_base: this.query1,
                        node_code: this.form2.node_id, // 关联节点信息 --
                        start_time: '',
                        end_time: '',
                        assets_type_id: '', // 资产类型 -- 
                        sub_period_id: '', // 所属期 -- 
                        a_conf_id: '', // 资产状态 -- 
                        merchant_id: '', // 关联商户信息
                        merchant_name: '',
                        cols: this.cols1,
                        page: this.page1,
                    }
                    QueryAssetsBase(params)
                        .then(res => {
                            let arr = res.data.assets_base_list
                            this.equipmentArr = this.equipmentArr.concat(arr)
                            this.num1 = res.data.assets_base.total
                        })
                        .catch((res) => {
                            console.log(res)
                        })
                }, 200);
            }else{
                this.page1 = 1
                this.types1 = 1
                this.equipmentArr = []
                this.getQueryAssetsBase()
            }
        },
        unfocusFun1(){
            if(this.query1 != ''){
                setTimeout(() => {
                    this.query1 = ''
                    this.page1 = 1
                    this.types1 = 1
                    this.equipmentArr = []
                    this.getQueryAssetsBase()
                }, 1000)
            }
        },
        // 设备获取焦点
        focusFun1(){
            if(!this.form2.node_id){
                this.$message.error('请先选择节点');
                return
            }
            if(this.query1 != '' && !this.item_id){
                // setTimeout(() => {
                    this.page1 = 1
                    this.types1 = 1
                    this.equipmentArr = []
                    this.getQueryAssetsBase()
                // }, 1000)
            }
        },
        // 加载更多的节点
        loadmore2 (e) { 
            this.page2 = this.page2 + 1
            if(this.types2 == 1){
                if(this.num2 == this.nodeArr.length){
                    return
                }else{
                    this.getQueryNodeBasePage()
                }
            }else{
                this.remoteMethod2(this.query2)
            }
        },
        // 搜索节点
        remoteMethod2(query) {
            if(this.query2 != query){
                this.page2 = 1
                this.nodeArr = []
            }
            this.query2 = query
            if(this.types2 == 1){
                this.page2 = 1
                this.nodeArr = []
            }
            if (query != '') {
                this.types2 = 2
                setTimeout(() => {
                    let str = 'page=' + this.page2 + '&cols=' + this.cols2 + '&node_name=' + this.query2
                    QueryNodeBasePage(str)
                        .then(res => {
                            let arr = res.data.map1.nodeBase
                            this.nodeArr = this.nodeArr.concat(arr)
                            this.num2 = res.data.total
                        })
                        .catch(res => {
                            console.log(res);
                        })
                }, 200);
            }else{
                this.page2 = 1
                this.types2 = 1
                this.nodeArr = []
                this.getQueryNodeBasePage()
            }
        },
        unfocusFun2(){
            if(this.query2 != ''){
                setTimeout(() => {
                    this.page2 = 1
                    this.types2 = 1
                    this.nodeArr = []
                    this.getQueryNodeBasePage()
                }, 1000)
            }
        },
        // 选择商户
        selectMerchantFun(ele){
            this.merchantArr.forEach(val => {
                if(val.BIZ_ID == ele){
                    this.merchant_name = val.BIZ_NAME
                }
            })
            if(!ele){
                this.merchant_name = ''
            }
        },
        // 选择节点
        selectNodeFun(ele){
            this.nodeArr.forEach(val => {
                if(val.NODE_ID == ele){
                    this.node_name = val.NODE_NAME
                }
            })
            if(ele){
                this.form2.merchant = ''
                this.merchant_name = ''
                this.getQueryBusiness()
                this.page1 = 1
                this.types1 = 1
                this.query1 = ''
                this.getQueryAssetsBase()
            }else{
                this.form2.merchant = ''
                this.merchant_name = ''
                this.merchantArr = []
                this.equipmentArr = []
                this.assert_info =  []
                this.form2.equipment = ''
            }
        },
        // 查询设备信息
        getQueryAssetsBase(){
            let params = {
                assets_base: '',
                node_code: this.form2.node_id, // 关联节点信息 --
                start_time: '',
                end_time: '',
                assets_type_id: '', // 资产类型 -- 
                sub_period_id: '', // 所属期 -- 
                a_conf_id: '', // 资产状态 -- 
                merchant_id: '', // 关联商户信息
                merchant_name: '',
                cols: this.cols1,
                page: this.page1,
            }
            QueryAssetsBase(params)
                .then(res => {
                    let arr = res.data.assets_base_list
                    this.equipmentArr = this.equipmentArr.concat(arr)
                    this.num1 = res.data.assets_base.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 查询 所有节点
        getQueryNodeBasePage(){
            let str = 'page=' + this.page2 + '&cols=' + this.cols2 + '&node_name=' + ''
            QueryNodeBasePage(str)
                .then(res => {
                    let arr = res.data.map1.nodeBase
                    this.nodeArr = this.nodeArr.concat(arr)
                    this.num2 = res.data.total
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 查询 所有商户
        getQueryBusiness(){
            if(this.form2.node_id){
                // node_id  先选节点后选商户  新增
                let str = 'node_id=' + this.form2.node_id
                QueryBusiness(str)
                    .then(res => {
                        // console.log(res)
                        this.merchantArr = res.data.business
                    })
                    .catch(res => {
                        console.log(res);
                    })
            }
        },
        // 关闭任务
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun2()
                } else {
                    return false;
                }
            });
        },
        // 无设备信息关闭任务保存
        saveFun2(){
            let params = {
                id: '',// 自增
                task_id: this.solve_id,// 任务id
                broke_type: '',// 故障类型
                text: this.form3.solve,// 解决方案，
                url: '',// 图片上传之后的路径逗号隔开
                create_id: this.userId, // 创建人 当前登录人
                create_name : this.userName,  // 当前登录人的名字
            }
            InsertAssetsTaskResult(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.closeFun3()
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
            let img_url = '';
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    if(val.id){
                        return
                    }else{
                        img_url += val.img_url + ','
                    }
                })
                if(img_url != ''){
                    img_url = img_url.substr(0, img_url.length - 1)
                }
                // 保存图片
                let obj = {
                    url: img_url,
                    id: this.solve_id,
                    url_type: 3,
                }
                InsertAssetsImg(obj)
                    .then(res => {
                        
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }
        },
        // 有设备信息关闭任务保存
        submitForm3(){
            console.log(this.equipmentMsg)
            if(this.equipmentMsg[0].describe == ''){
                this.$message.error("请输入设备问题！");
                return
            }
            if(this.equipmentMsg[0].describe == ''){
                this.$message.error("请选择维修结果！");
                return
            }
            let arr = [], obj = {};
            this.equipmentMsg.forEach(val => {
                obj = {
                    id: val.id,
                    assets_id: val.assets_id,
                    assets_no: val.assets_no,
                    assets_name: val.assets_name, // 电子秤，
                    describe: val.describe, // 设备问题描述,
                    assets_part: val.assets_part, // 设备部件
                    text: val.text, // 解决方案
                    result: val.result, //  维修结果 0 未完成，1已完成
                    task_id: this.solve_id,
                    create_name : this.userName,  // 当前登录人的名字
                }
                arr.push(obj)
            })
            let params = arr
            console.log(params)
            UpdateAssetsTaskInfo(params)
                .then(res => {
                    if (res.result == true) {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.closeFun3()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
            let img_url = '';
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    if(val.id){
                        return
                    }else{
                        img_url += val.img_url + ','
                    }
                })
                if(img_url != ''){
                    img_url = img_url.substr(0, img_url.length - 1)
                }
                // 保存图片
                let obj = {
                    url: img_url,
                    id: this.equipmentMsg[0].id,
                    url_type: 2,
                }
                // InsertAssetsImg(obj)
                //     .then(res => {
                        
                //     })
                //     .catch((res) => {
                //         this.$message.error("出错啦!");
                //         console.log(res)
                //     })
            }
        },
        // 关闭任务
        closeFun3(){
            this.isSolve = false
            this.form3 = {
                solve: '',
            },
            this.solve_id = ''
            this.file = ''
            this.imgArr1 = []
            this.equipmentMsg = []
        },
        // 关闭任务有设备
        fileFun2(event,item,index){
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
            let url = uploadImgTask
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        let obj = {
                            img_url: res.data
                        }
                        console.log(this.equipmentMsg)
                        this.equipmentMsg[index].imgArr1.push(obj)
                        this.$message.success(res.message);
                        let imgobj = {
                            url: res.data,
                            id: item.id,
                            url_type: 2,
                        }
                        InsertAssetsImg(imgobj)
                            .then(res => {
                                
                            })
                            .catch((res) => {
                                this.$message.error("出错啦!");
                                console.log(res)
                            })
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
        fileFun(event){
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
            let url = uploadImgTask
            ajaxPost(url,formData,config)
                .then(res => {
                    if(res.result == true){
                        let obj = {
                            img_url: res.data
                        }
                        let arr = []
                        arr.push(obj)
                        this.imgArr1.push(obj)
                        // if(this.prompt == '修改'){
                        //     this.editImgArr.push(res.data)
                        // }
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    return false;
                }
            });
        },
        // 新增编辑保存
        saveFun(){
            let img_url = '';
            if(this.imgArr1.length > 0){
                this.imgArr1.forEach(val => {
                    if(val.id){
                        return
                    }else{
                        img_url += val.img_url + ','
                    }
                })
                if(img_url != ''){
                    img_url = img_url.substr(0, img_url.length - 1)
                }
                // 保存图片
                let params = {
                    url: img_url,
                    id: this.item_id,
                    url_type: 1,
                }
                InsertAssetsImg(params)
                    .then(res => {
                        if (res.result == true) {
                            
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }
            let assert_info = '';
            if(this.assert_info.length > 0){
                this.assert_info.forEach((val,idx) => {
                    assert_info += (idx + 1) + ',' + val.bar_code + ',' + val.assets_name + '::'
                })
                if(assert_info != ''){
                    assert_info = assert_info.substr(0, assert_info.length-2)
                }
            }
            if(this.item_id){
                // 编辑
                let assign_name = '';
                this.assignArr.forEach(val => {
                    if(val.userid == this.form2.assign_id){
                        assign_name = val.name
                    }
                })
                let params = {
                    level: this.form2.priority, 
                    task_content: this.form2.task_msg, // --任务内容
                    node_id: this.form2.node_id,
                    node_name: this.node_name,
                    repair_model: this.form2.bxms_id, // -- 报修模式
                    remark: this.form2.remarke,
                    create_name : this.userName,  // 当前登录人的名字
                    assigned_id: this.form2.assign_id, // 指派人
                    assigned_name: assign_name,
                    group_name: this.form2.work_id, // 工作组
                    id: this.item_id,
                    user_id: this.userId,
                    biz_id: this.form2.merchant,
                    biz_name: this.merchant_name,
                }
                console.log(params)
                UpdateAssetsTask(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.closeFun2()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }else{
                let params = {
                    node_id: this.form2.node_id,
                    node_name: this.node_name,
                    biz_id: this.form2.merchant,
                    biz_name: this.merchant_name,
                    repair_model: this.form2.bxms_id, // -- 报修模式
                    task_content: this.form2.task_msg, // --任务内容
                    create_id: this.userId, // 创建人 当前登录人
                    create_name : this.userName,  // 当前登录人的名字
                    group_name: this.form2.work_id, // 工作组
                    assigned_id: this.form2.assign_id, // 指派人
                    assert_info: assert_info, // 设备信息
                    url: '', // 图片
                    level: this.form2.priority, 
                    remark: this.form2.remarke,
                    task_state: 0, // 状态 0 为未解决，1 是已解决
                    scbj: 1, // 删除标价 1位未删除，0位删除 在回收站可查询
                    task_type: 1 // 1位报修 2为 临时任务
                }
                console.log(params)
                InsertAssetsTask(params)
                    .then(res => {
                        if (res.result == true) {
                            this.$message.success(res.message);
                            this.closeFun2()
                            this.getDataFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        this.$message.error("出错啦!");
                        console.log(res)
                    })
            }
        },
        // 关闭新增编辑
        closeFun2(){
            this.isEdits = false
            this.form2 = {
                node_id: '', // 选择节点
                merchant: '',
                bxms_id: '', // 报修模式
                task_msg: '', // 任务内容
                equipment: '', // 设备信息
                work_id: '', // 工作组
                assign_id: '', // 技术人员
                priority: '高', // 优先级
                remarke: '', // 备注
            }
            this.merchantArr = []
            this.merchant_name = ''
            this.node_name = ''
            this.prompt = '新增'
            this.file = ''
            this.item_id = ''
            this.imgArr1 = []
            this.equipmentArr = []
            this.assert_info =  []
            this.equipmentList = [{equipment: ''}]
        },
        // 打开指派
        assignFun(ele){
            this.assign_id = ele.assigned_id // 运维人员
            this.work_id = ele.group_name // 工作组
            this.item_id = ele.id
            this.getGetAssetsUserFun(ele.group_name)
            this.isAssign = true
        },
        // 关闭指派
        closeFun(){
            this.isAssign = false // 指派
            this.assign_id = '' // 运维人员
            this.work_id = '' // 工作组
            this.item_id = ''
        },
        // 保存指派
        saveAssignFun(){
            let assign_name = '';
            this.assignArr.forEach(val => {
                if(val.userid == this.assign_id){
                    assign_name = val.name
                }
            })
            let params = {
                assign_id: this.assign_id,
                assigh_name: assign_name,
                group_name: this.work_id,
                id: this.item_id,
                create_name: this.userName,
            }
            UpdateAssetsTaskAssignId(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.closeFun()
                        this.getDataFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        addFun(){
            this.isEdits = true
            this.getGetAssetsUserFun('')
        },
        viewFun(ele){
            this.$router.push({name: 'ViewLsTask',params: ele})
        },
        editFun(ele){
            this.isEdits = false
            this.form2 = {
                node_id: ele.node_id, // 选择节点
                merchant: ele.biz_id,
                bxms_id: ele.repair_model, // 报修模式
                task_msg: ele.task_content, // 任务内容
                equipment: '', // 设备信息
                work_id: ele.group_name, // 工作组
                assign_id: ele.assigned_id, // 技术人员
                priority: ele.level, // 优先级
                remarke: ele.remark, // 备注
            }
            this.item_id = ele.id
            this.getQueryAssetsBase()
            this.getQueryBusiness()
            this.getGetAssetsUserFun(ele.group_name)
            this.getImgFun()
            this.getGetAssetsTaskInfo()
            this.merchant_name = ele.biz_name
            this.node_name = ele.node_name
            this.prompt = '编辑'
            this.equipmentList = []
            this.isEdits = true
        },
        // 获取数据已保存设备
        getGetAssetsTaskInfo(){
            this.equipmentList = []
            let obj = {}
            let str = 'id=' + this.item_id;
            GetAssetsTaskInfo(str)
                .then(res => {
                    res.data.forEach(val => {
                        this.equipmentArr.forEach(val2 => {
                            if(val.assets_no == val2.bar_code){
                                val.equipment = val2.assets_id
                                this.equipmentList.push(val)
                            }
                        })
                    })
                })
                .catch(res => {
                    console.log(res);
                })
        },
        // 关闭任务
        stopFun(ele){
            this.solve_id = ele.id
            let str = 'id=' + this.solve_id;
            GetAssetsTaskInfo(str)
                .then(res => {
                    res.data.forEach(val => {
                        val.imgArr1 = []
                    })
                    this.equipmentMsg = res.data
                })
                .catch(res => {
                    console.log(res);
                })
            this.isSolve = true
        },
        deleteFun(){
            
        },
        selectTypesFun(){
            this.page = 1
            this.getDataFun()
        },
        getDataFun(){
            let params = {
                cols: this.cols,
                page: this.page,
                task_content: this.form.msg, // 任务id或者内容
                node_id: this.form.node_id,
                repair_model: this.form.bxms_id, // 报修模式
                create_id: this.form.people, // 创建人 
                assigned_id: this.form.zpg_id, // 指派人
                group_name: this.form.work_id, // 工作组
                user_id: this.userId, // 当前登录人的 userid
                task_state: this.labelPosition,
                role_id: this.role_id,
            }
            GetAssetsTask(params)
                .then(res => {
                    this.tableData = res.data.list
                    this.total = res.data.bean.total;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
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
                msg: '',
                types: '',
                bxms_id: '',
                zpg_id: '',
                work_id: '',
                people: '',
            }
            this.page = 1
            this.getDataFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        classStyle({row}){
            if(row.is_read == 0){
                return {
                    fontWeight: 'bolder'
                }
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
        .search-btn{
            color: #409EFF;
            background: #fff;
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
                margin-top: -265px;
                margin-left: -300px;
                width: 600px;
                height: 530px;
                background: #fff;
                font-size: 14px;
                .form{
                    margin-top: 10px;
                    .el-select, .el-input{
                        width: 400px;
                    }
                    .zpg{
                        .el-select, .el-input{
                            width: 200px;
                        }
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
                .msg-box{
                    clear: both;
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 100px;
                        }
                        .el-select{
                            width: 150px;
                        }
                    }
                }
                .tips{
                    margin-left: 20px;
                    margin-bottom: 15px;
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
                    margin-left: 330px;
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
                    margin: 10px auto;
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 90px;
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
                        width: 90px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                } 
                .table{
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .clear{
                    clear: both;
                }
            }
        }
        .assign{
            .text{
                margin-top: -130px;
                margin-left: -120px;
                width: 240px;
                height: 260px;
                .msg{
                    margin: 0 30px;
                    p{
                        margin: 10px 0;
                    }
                    .el-select{
                        width: 180px;
                    }
                }
                .btn{
                    margin-top: 20px;
                    margin-left: 60px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .solve{
            .text{
                margin-top: -220px;
                height: 440px;
                textarea{
                    width: 400px;
                    height: 200px;
                    border: 1px solid #ccc;
                }
                .submit{
                    left: 140px;
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
            .title{
                display: flex;
                margin: 10px 0;
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
            .zpg{
                display: flex;
                align-items: center;
                span:last-child{
                    height: 16px;
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
        
    }
</style>
