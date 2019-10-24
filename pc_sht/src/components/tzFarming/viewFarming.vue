<template>
    <div class="content viewFarming">
        <div class="box">
            <div class="list-title">养殖场信息</div>
            <div class="list">
                <div class="data">
                    <div class="title">养殖场名称</div>
                    <div class="msg">{{form.yzcName}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖场编号</div>
                    <div class="msg">{{form.yzcNum}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖品种</div>
                    <div class="msg">{{form.varieties}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖规模</div>
                    <div class="msg">{{form.yzcSize}}</div>
                </div>
                <div class="data">
                    <div class="title">地址</div>
                    <div class="msg">{{form.addr + form.addrName}}</div>
                </div>
                <div class="data">
                    <div class="title">负责人</div>
                    <div class="msg">{{form.people + '(' + form.phone + ')'}}</div>
                </div>
                <div class="data">
                    <div class="title">所属企业</div>
                    <div class="msg">{{form.enterprise}}</div>
                </div>
                <div class="data">
                    <div class="title">创建日期</div>
                    <div class="msg">{{form.dataTime}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖场介绍</div>
                    <div class="msg">
                        {{form.introduce.length > 40 ? (form.introduce.substring(0,40) + '...') : form.introduce }} 
                        <span class="more" v-if="form.introduce.length > 40" @click="moreFun">更多</span>
                    </div>
                </div><!---->
                <div class="data">
                    <div class="title">养殖场图片</div>
                    <div class="msg">
                        <div class="msg-item">   
                            <div class="img-list">
                                <ul>
                                    <li v-for="(item,index) in imgArrs" :key="index" v-if="item.img_url" @click="bigImgFun(item)">
                                        <figure class="image">
                                            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab">
            <div class="list-title">养殖档案</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="养殖档案" name="first">
                    <el-button class="btn" @click="newFun">新建养殖档案</el-button>
                    <el-table :data="tableData" :header-cell-style="rowClass">
                        <el-table-column prop="yzc_dapc" label="档案批次"></el-table-column>
                        <el-table-column prop="yzc_code" label="档案编号"></el-table-column>
                        <el-table-column prop="yzc_rjsl" label="入圈数量(只)"></el-table-column>
                        <el-table-column prop="yzc_rjsj" label="入圈时间"></el-table-column>
                        <el-table-column prop="yzc_clsj" label="预计出栏时间"></el-table-column>
                        <el-table-column prop="yzc_fzr" label="负责人(联系方式)" width="200">
                            <template slot-scope="scope">
                                {{scope.row.yzc_fzr + (scope.row.yzc_tel ? '(' + scope.row.yzc_tel + ')' : '')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="描述"></el-table-column>
                        <el-table-column prop="city" label="图片"width="80">
                            <template slot-scope="scope" v-if="scope.row.img_list.length > 0">
                                <img class="table_img" @click="bigImgFun(scope.row.img_list[0])" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_list[0].img_url">
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="deleteFun(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="num" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                        layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="防疫防治" name="second">
                    <el-button class="btn" @click="newFun2">添加防疫防治记录</el-button>
                    <el-table :data="tableData2" :header-cell-style="rowClass">
                        <el-table-column prop="yzc_dapc" label="档案批次"></el-table-column>
                        <el-table-column prop="yzc_fynr" label="防疫内容"></el-table-column>
                        <el-table-column prop="yzc_fysc" label="防疫时间"></el-table-column>
                        <el-table-column prop="yzc_fzr" label="操作人"></el-table-column>
                        <el-table-column prop="yzc_yyname" label="用药名称"></el-table-column>
                        <el-table-column prop="yzc_yyjl" label="剂量"></el-table-column>
                        <el-table-column prop="yzc_ypscdw" label="生产单位"></el-table-column>
                        <el-table-column prop="remark" label="摘要说明"></el-table-column>
                        <el-table-column prop="city" label="图片">
                            <template slot-scope="scope" v-if="scope.row.img_list.length > 0">
                                <img class="table_img" @click="bigImgFun(scope.row.img_list[0])" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_list[0].img_url">
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun2(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="deleteFun2(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="num2" background @current-change="handleCurrentChange2" :current-page.sync="page2" :page-size="cols2"
                        layout="total, prev, pager, next, jumper" :total="num2"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="饲养记录" name="third">
                    <el-button class="btn" @click="newFun3">添加饲养记录</el-button>
                    <el-table :data="tableData3" :header-cell-style="rowClass">
                        <el-table-column prop="yzc_dapc" label="档案批次"></el-table-column>
                        <el-table-column prop="yzc_sysc" label="日期"></el-table-column>
                        <el-table-column prop="yzc_sylx" label="饲养类型"></el-table-column>
                        <el-table-column prop="yzc_syjl" label="饲养记录"></el-table-column>
                        <el-table-column prop="address" label="图片">
                            <template slot-scope="scope" v-if="scope.row.img_list.length > 0">
                                <img class="table_img" @click="bigImgFun(scope.row.img_list[0])" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_list[0].img_url">
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun3(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="deleteFun3(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination v-if="num3" background @current-change="handleCurrentChange3" :current-page.sync="page3" :page-size="cols3"
                        layout="total, prev, pager, next, jumper" :total="num3"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--新增 编辑养殖档案-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}养殖档案</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form1" :model="form1" :rules="rules" label-width="120px">
                    <el-form-item label="档案批次" prop="batch">
                        <el-input clearable v-model="form1.batch"></el-input>
                    </el-form-item>
                    <el-form-item label="档案编号" prop="daNum">
                        <el-input clearable v-model="form1.daNum"></el-input>
                    </el-form-item>
                    <el-form-item label="入圈数量" prop="rjNum">
                        <el-input clearable v-model="form1.rjNum"></el-input>
                    </el-form-item>
                    <el-form-item label="入圈时间" prop="rjTime">
                        <el-date-picker v-model="form1.rjTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计出栏时间" prop="yjclTime">
                        <el-date-picker v-model="form1.yjclTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="负责人" prop="people">
                        <el-input clearable v-model="form1.people"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input clearable v-model="form1.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input clearable v-model="form1.describe" type="textarea"></el-input>
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
                        <el-button type="primary" @click="submitForm('form1')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--新增 编辑防疫防治-->
        <div class="passwrd" v-if="isEdits2">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt2}}防疫防治记录</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form2" :model="form2" :rules="rules2" label-width="120px">
                    <el-form-item label="档案批次" prop="batch">
                        <el-select v-model="form2.batch" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.yzc_dapc"
                            :value="item.yzc_dapc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="防疫内容" prop="content">
                        <el-input clearable v-model="form2.content"></el-input>
                    </el-form-item>
                    <el-form-item label="防疫时间" prop="fyTime">
                        <el-date-picker v-model="form2.fyTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="操作人" prop="people">
                        <el-input clearable v-model="form2.people"></el-input>
                    </el-form-item>
                    <el-form-item label="用药名称" prop="drugName">
                        <el-input clearable v-model="form2.drugName"></el-input>
                    </el-form-item>
                    <el-form-item label="剂量" prop="dose">
                        <el-input clearable v-model="form2.dose"></el-input>
                    </el-form-item>
                    <el-form-item label="药品生产单位" prop="production">
                        <el-input clearable v-model="form2.production"></el-input>
                    </el-form-item>
                    <el-form-item label="摘要说明">
                        <el-input clearable v-model="form2.describe" type="textarea"></el-input>
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
                        <el-button type="primary" @click="submitForm2('form2')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--新增 编辑饲养记录-->
        <div class="passwrd" v-if="isEdits3">
            <div class="text text3">
                <div class="box-title">
                    <p class="tit">{{prompt3}}饲养记录</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form3" :model="form3" :rules="rules3" label-width="120px">
                    <el-form-item label="档案批次" prop="batch">
                        <el-select v-model="form3.batch" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.yzc_dapc"
                            :value="item.yzc_dapc"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间" prop="time">
                        <el-date-picker v-model="form3.time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="饲养类型" prop="syTypes" style="margin-bottom: 16px;">
                        <el-select v-model="form3.syTypes" filterable clearable placeholder="请选择">
                            <el-option value="仔兔">仔兔</el-option>
                            <el-option value="青年">青年</el-option>
                            <el-option value="出栏">出栏</el-option>
                        </el-select>
                        <!--<el-input clearable v-model="form3.syTypes" type="text"></el-input>-->
                    </el-form-item>
                    <el-form-item label="饲养记录" prop="describe">
                        <el-input clearable v-model="form3.describe" type="textarea"></el-input>
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
                        <el-button type="primary" @click="submitForm3('form3')">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog top="100px" title="养殖场介绍" :visible.sync="isMoreMsg" width="600" :before-close="closeMoreFun">
            <div class="more-msg">{{form.introduce}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeMoreFun">取 消</el-button>
            </span>
        </el-dialog>
        <div class="box-bigimg" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeBigImgFun">X</p>
            <div class="imgBox">
                <figure class="images" v-if="bigImgUrl">
                    <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + bigImgUrl">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import {DeleteYzcImg,GetAllYzcda,InsertYzcda,UpdateYzcda,DeleteYzcda,GetAllYzcfy,InsertYzcfy,UpdateYzcfy,
    DeleteYzcfy,GetAllYzcsy,InsertYzcsy,UpdateYzcsy,DeleteYzcsy} from '../../js/tzFarming/tzFarming.js'
import {uploadImg} from '../../js/address/url.js'
import axios from 'axios';
export default {
    name:"viewFarming",
    data() {
        return {
            form: {
                enterprise: '', // 所属企业
                yzcNum: '', // 养殖场编号
                yzcName: '', // 养殖场名称
                yzcSize: '', // 养殖规模
                varieties: '', // 养殖品种
                addr: '', // 地址
                addrName: '', // 详细地址
                people: '', // 负责人
                phone: '', // 联系方式
                introduce: '', // 养殖场介绍
                dataTime: '', // 创建日期
            },
            imgArrs: [],
            imgArr: [],
            activeName: 'first',
            tableData: [],
            page: 1,
            cols: 15,
            num: 0,
            tableData2: [],
            page2: 1,
            cols2: 15,
            num2: 0,
            tableData3: [],
            page3: 1,
            cols3: 15,
            num3: 0,
            isEdits: false,
            prompt: '新建',
            isEdits2: false,
            prompt2: '添加',
            isEdits3: false,
            prompt3: '添加',
            form1: {
                batch: '', // 档案批次
                daNum: '', // 档案编号
                rjNum: '', // 入圈数量
                rjTime: '', // 入圈时间
                yjclTime: '', // 预计出栏时间
                people: '', // 负责人
                phone: '', // 联系方式
                describe: '', // 描述
            },
            form2: {
                batch: '', // 档案批次
                content: '', // 防疫内容
                fyTime: '', // 防疫时间
                people: '', // 操作人
                drugName: '', // 用药名称
                dose: '', // 剂量
                production: '', // 药品生产单位
                describe: '', // 摘要说明
                
            },
            form3: {
                batch: '', // 档案批次
                time: '', // 时间
                syTypes: '', // 饲养类型
                describe: '', // 描述
            },
            imgArr1: [],
            imgArr2: [],
            imgArr3: [],
            batchList: [],
            typesList: [],
            ids: '',
            img_id: '',
            editImgArr: [],
            file: '',
            yzda_id: '',
            fyfz_id: '',
            syjl_id: '',
            count: 0,
            isMore: false,
            isMoreMsg: false,
            isBigImg: false,
            sizeObj: {},
            imgHeight: '',
            bigImgUrl: '',
            rules: {
                batch: [
                    { required: true, message: '请输入档案批次', trigger: 'blur' },
                ],
                daNum: [
                    { required: true, message: '请输入档案编号', trigger: 'blur' },
                ],
                rjNum: [
                    { required: true, message: '请输入入圈数量', trigger: 'blur' },
                ],
                rjTime: [
                    { required: true, message: '请选择入圈时间', trigger: 'change' }
                ],
                yjclTime: [
                    { required: true, message: '请选择预计出栏时间', trigger: 'change' }
                ],
                people: [
                    { required: true, message: '请输入负责人', trigger: 'blur' },
                ],
            },
            rules2: {
                batch: [
                    { required: true, message: '请选择档案批次', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入防疫内容', trigger: 'blur' },
                ],
                fyTime: [
                    { required: true, message: '请选择防疫时间', trigger: 'change' }
                ],
                people: [
                    { required: true, message: '请输入操作人', trigger: 'blur' },
                ],
                drugName: [
                    { required: true, message: '请输入用药名称', trigger: 'blur' },
                ],
                dose: [
                    { required: true, message: '请输入剂量', trigger: 'blur' },
                ],
                production: [
                    { required: true, message: '请输入药品生产单位', trigger: 'blur' },
                ],
            },
            rules3: {
                batch: [
                    { required: true, message: '请选择档案批次', trigger: 'change' }
                ],
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                syTypes: [
                    { required: true, message: '请选择饲养类型', trigger: 'change' }
                ],
                describe: [
                    { required: true, message: '请输入饲养记录', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() {
        let data = this.$route.params
        console.log(data)
        this.ids = data.id
        this.form.enterprise = data.booth_name
        this.form.yzcNum = data.yzc_code
        this.form.yzcName = data.yzc_name
        this.form.yzcSize = data.yzc_gm
        this.form.varieties = data.yzc_pz
        this.form.addr = data.area_name
        this.form.addrName = data.addr
        this.form.people = data.yzc_fzr
        this.form.phone = data.yzc_tel
        this.form.introduce = data.remark
        this.form.dataTime = data.record_time
        if(data.img_list.length > 0){
            this.imgArrs = data.img_list
        }
        this.getDapcFun()
        this.getYzdaFun()
        this.getFyfzFun()
        this.getSyjlFun()
    },
    methods: {
        bigImgFun(item){
            this.isBigImg = true
            this.bigImgUrl = item.img_url
            this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
        },
        closeBigImgFun(){
            this.bigImgUrl = ''
            this.isBigImg = false
        },
        moreFun(){
            this.isMoreMsg = true
        },
        closeMoreFun(){
            this.isMoreMsg = false
        },
        // 档案批次
        getDapcFun(){
            let obj = { 
                page: this.page,
                cols: '10000',
                id: this.ids
            }
            GetAllYzcda(obj)
                .then(res => {
                    this.batchList = res.data.dataList;
                })
                .catch((res) => {
                    console.log(res)
                })

        },
        // 养殖档案
        getYzdaFun(){
            let obj = { 
                page: this.page,
                cols: this.cols,
                id: this.ids
            }
            GetAllYzcda(obj)
                .then(res => {
                    this.tableData = res.data.dataList;
                    this.num = res.data.condition.total
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
        // 新增养殖档案
        submitFormFun(){
            if(this.yzda_id == ''){
                // 新增
                let arr = []
                if(this.imgArr1.length > 0){
                    this.imgArr1.forEach(val => {
                        arr.push(val.img_url)
                    })
                }
                let obj = { 
                    yzc_id: this.ids,
                    yzc_dapc: this.form1.batch, // 档案批次
                    yzc_code: this.form1.daNum, // 档案编号
                    yzc_rjsl: this.form1.rjNum, // 入圈数量
                    yzc_rjsj: this.form1.rjTime, // 入圈时间
                    yzc_clsj: this.form1.yjclTime, // 出栏时间
                    yzc_fzr: this.form1.people, // 负责人
                    yzc_tel: this.form1.phone, // 电话
                    remark: this.form1.describe, // 描述
                    img_url: arr.length > 0 ? arr.join(",") : ''
                }
                InsertYzcda(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.closeFun()
                            this.getYzdaFun()
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
                    id: this.yzda_id,
                    yzc_id: this.ids,
                    yzc_dapc: this.form1.batch, // 档案批次
                    yzc_code: this.form1.daNum, // 档案编号
                    yzc_rjsl: this.form1.rjNum, // 入圈数量
                    yzc_rjsj: this.form1.rjTime, // 入圈时间
                    yzc_clsj: this.form1.yjclTime, // 出栏时间
                    yzc_fzr: this.form1.people, // 负责人
                    yzc_tel: this.form1.phone, // 电话
                    remark: this.form1.describe, // 描述
                    img_url: this.editImgArr.length > 0 ? this.editImgArr.join(",") : '',
                }
                UpdateYzcda(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page = 1
                            this.yzda_id = ''
                            this.closeFun()
                            this.getYzdaFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        // 删除养殖档案
        deleteFun(ele){
            let obj = { 
                id: ele.id
            }
            DeleteYzcda(obj)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.closeFun()
                        this.getYzdaFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 防疫防治
        getFyfzFun(){
            let obj = { 
                page: this.page2,
                cols: this.cols2,
                id: this.ids
            }
            GetAllYzcfy(obj)
                .then(res => {
                    this.tableData2 = res.data.dataList;
                    this.num2 = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitFormFun2()
                } else {
                    return false;
                }
            });
        },
        submitFormFun2(){
            if(this.fyfz_id == ''){
                // 新增
                let arr = []
                if(this.imgArr1.length > 0){
                    this.imgArr1.forEach(val => {
                        arr.push(val.img_url)
                    })
                }
                let obj = { 
                    yzc_id: this.ids, // 养殖场主键
                    yzc_dapc: this.form2.batch, // 档案批次
                    yzc_fysc: this.form2.fyTime, // 养殖场防疫时间
                    yzc_fzr: this.form2.people, // '操作人',
                    yzc_yyname: this.form2.drugName, //  '养殖场防疫用药名称',
                    yzc_yyjl: this.form2.dose, // '养殖场防疫用药剂量',
                    yzc_ypscdw: this.form2.production, // '药品生产单位',
                    remark: this.form2.describe, //  '摘要说明',
                    img_url: arr.length > 0 ? arr.join(",") : '',
                    yzc_fynr: this.form2.content // 防疫内容
                }
                InsertYzcfy(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page2 = 1
                            this.closeFun()
                            this.getFyfzFun()
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
                    id: this.fyfz_id,
                    yzc_id: this.ids, // 养殖场主键
                    yzc_dapc: this.form2.batch, // 档案批次
                    yzc_fysc: this.form2.fyTime, // 养殖场防疫时间
                    yzc_fzr: this.form2.people, // '操作人',
                    yzc_yyname: this.form2.drugName, //  '养殖场防疫用药名称',
                    yzc_yyjl: this.form2.dose, // '养殖场防疫用药剂量',
                    yzc_ypscdw: this.form2.production, // '药品生产单位',
                    remark: this.form2.describe, //  '摘要说明',
                    yzc_fynr: this.form2.content, // 防疫内容
                    img_url: this.editImgArr.length > 0 ? this.editImgArr.join(",") : '',
                }
                UpdateYzcfy(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page2 = 1
                            this.yzda_id = ''
                            this.closeFun()
                            this.getFyfzFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        // 删除防疫防治
        deleteFun2(ele){
            let obj = { 
                id: ele.id
            }
            DeleteYzcfy(obj)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.closeFun()
                        this.getFyfzFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        // 饲养记录
        getSyjlFun(){
            let obj = { 
                page: this.page3,
                cols: this.cols3,
                id: this.ids
            }
            GetAllYzcsy(obj)
                .then(res => {
                    this.tableData3 = res.data.dataList;
                    this.num3 = res.data.condition.total
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        submitForm3(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitFormFun3()
                } else {
                    return false;
                }
            });
        },
        submitFormFun3(){
            if(this.syjl_id == ''){
                // 新增
                let arr = []
                if(this.imgArr1.length > 0){
                    this.imgArr1.forEach(val => {
                        arr.push(val.img_url)
                    })
                }
                let obj = { 
                    yzc_id: this.ids, // 养殖场主键
                    yzc_dapc: this.form3.batch, // 养殖场饲养批次
                    yzc_sysc: this.form3.time, // 养殖场饲养时间
                    yzc_sylx: this.form3.syTypes, // 饲养类型
                    yzc_syjl: this.form3.describe, // 养殖场饲养记录
                    img_url: arr.length > 0 ? arr.join(",") : '',
                }
                InsertYzcsy(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page3 = 1
                            this.closeFun()
                            this.getSyjlFun()
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
                    id: this.syjl_id,
                    yzc_id: this.ids, // 养殖场主键
                    yzc_dapc: this.form3.batch, // 养殖场饲养批次
                    yzc_sysc: this.form3.time, // 养殖场饲养时间
                    yzc_sylx: this.form3.syTypes, // 饲养类型
                    yzc_syjl: this.form3.describe, // 养殖场饲养记录
                    img_url: this.editImgArr.length > 0 ? this.editImgArr.join(",") : '',
                }
                UpdateYzcsy(obj)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success(res.message);
                            this.page3 = 1
                            this.yzda_id = ''
                            this.closeFun()
                            this.getSyjlFun()
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        },
        // 删除饲养记录
        deleteFun3(ele){
            let obj = { 
                id: ele.id
            }
            DeleteYzcsy(obj)
                .then(res => {
                    if(res.result == true){
                        this.$message.success(res.message);
                        this.page = 1
                        this.closeFun()
                        this.getSyjlFun()
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        cancelFun(){
            this.closeFun()
        },
        newFun(){
            this.prompt = '新建'
            this.isEdits = true
        },
        editFun(ele){
            this.prompt = '编辑'
            if(ele.img_list.length > 0){
                this.imgArr1 = ele.img_list
                this.img_id = ele.img_list[0].id
            }
            this.yzda_id = ele.id
            this.form1.batch = ele.yzc_dapc
            this.form1.daNum = ele.yzc_code
            this.form1.rjNum = ele.yzc_rjsl
            this.form1.rjTime = ele.yzc_rjsj
            this.form1.yjclTime = ele.yzc_clsj
            this.form1.people = ele.yzc_fzr
            this.form1.phone = ele.yzc_tel
            this.form1.describe = ele.remark
            this.isEdits = true
        },
        newFun2(){
            this.prompt2 = '添加'
            this.isEdits2 = true
        },
        editFun2(ele){
            this.prompt2 = '编辑'
            this.fyfz_id = ele.id
            if(ele.img_list.length > 0){
                this.imgArr1 = ele.img_list
                this.img_id = ele.img_list[0].id
            }
            this.form2.batch = ele.yzc_dapc
            this.form2.content = ele.yzc_fynr
            this.form2.fyTime = ele.yzc_fysc
            this.form2.people = ele.yzc_fzr
            this.form2.drugName = ele.yzc_yyname
            this.form2.dose = ele.yzc_yyjl
            this.form2.production = ele.yzc_ypscdw
            this.form2.describe = ele.remark
            this.isEdits2 = true
        },
        newFun3(){
            this.prompt3 = '添加'
            this.isEdits3 = true
        },
        editFun3(ele){
            this.prompt3 = '编辑'
            this.syjl_id = ele.id
            if(ele.img_list.length > 0){
                this.imgArr1 = ele.img_list
                this.img_id = ele.img_list[0].id
            }
            this.form3.batch = ele.yzc_dapc
            this.form3.time = ele.yzc_sysc
            this.form3.syTypes = ele.yzc_sylx
            this.form3.describe = ele.yzc_syjl
            this.isEdits3 = true
        },
        closeFun(){
            this.count = 0
            this.form1 = {
                batch: '', // 档案批次
                daNum: '', // 档案编号
                rjNum: '', // 入圈数量
                rjTime: '', // 入圈时间
                yjclTime: '', // 预计出栏时间
                people: '', // 负责人
                phone: '', // 联系方式
                describe: '', // 描述
            }
            this.form2 = {
                batch: '', // 档案批次
                content: '', // 防疫内容
                fyTime: '', // 防疫时间
                people: '', // 操作人
                drugName: '', // 用药名称
                dose: '', // 剂量
                production: '', // 药品生产单位
                describe: '', // 摘要说明   
            }
            this.form3 = {
                batch: '', // 档案批次
                time: '', // 时间
                syTypes: '', // 饲养类型
                describe: '', // 描述
            }
            this.img_id = ''
            this.yzda_id = ''
            this.fyfz_id = ''
            this.syjl_id = ''
            this.editImgArr = []
            this.isEdits = false
            this.isEdits2 = false
            this.isEdits3 = false
            this.imgArr1 = []
            this.imgArr2 = []
            this.imgArr3 = []
        },
        handleClick(tab) {
            // console.log(tab);
            this.getDapcFun()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getYzdaFun()
        },
        handleCurrentChange2(val) {
            this.page2 = val
        },
        handleCurrentChange3(val) {
            this.page3 = val
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
                        if(this.prompt == '编辑' || this.prompt2 == '编辑' || this.prompt3 == '编辑'){
                            this.editImgArr.push(res.data)
                        }
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                    event.target.value = null;
                    that.$refs.file.value = null
                    this.file = null
                })
                .catch(res => {
                    console.log(res)
                    this.$message.error("出错了");
                })

        },
        searchFun(){

        },
        clearFun(){
            this.form = {
                dataTime: '',
                goodName: '',
                enterprise: '',
            }
            this.getTime()
            this.page = 1
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
        .box-bigimg{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 666;
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
                margin-top: 50px;
            }
        }
        .more-msg{
            text-indent: 30px;
        }
        .table_img{
            width: 50px;
            height: 50px;
        }
        .list-title{
            padding-left: 20px;
            line-height: 40px;
        }
        .box{
            padding: 10px 20px;
            background: #fff;
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 28%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                    .more{
                        padding: 0 10px;
                        color: #409EFF;
                        cursor: pointer;
                    }
                }
            }
        }
        .msg-item{
            margin-top: 10px;
            display: flex;
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
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
        .tab{
            margin-top: 10px;
            padding: 10px 20px;
            background: #fff;
        }
        .el-tabs{
            margin: 0 50px;
            .btn{
                margin: 10px 0 20px 0;
                color: #169BD5;
                border: 1px solid #169BD5;
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
                margin-top: -310px;
                margin-left: -280px;
                width: 560px;
                height: 620px;
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
                    .el-input,.el-select,.el-textarea{
                        width: 300px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 80px;
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
            .text3{
                margin-top: -210px;
                height: 420px;
            }
        }
    }
</style>
