<template>
    <div class="content addnodeManage">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules">
            <el-form-item label="企业编码:" prop="node_id" >
                <el-input class="label-width" v-model="form.node_id" :disabled="isShow"></el-input>
            </el-form-item>
            <el-form-item label="企业名称:" prop="node_name">
                <el-input class="label-width" v-model="form.node_name"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" prop="CompanyType">
                <el-select class="label-width" v-model="form.CompanyType" placeholder="请选择企业类型"  @change="selectGet"  >
                    <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <!--<el-form-item label="企业密钥:" prop="des">
                <el-input class="label-width" v-model="form.des"></el-input>
                <el-input class="label-width" v-model="form.node_detail_type"></el-input>
                <el-input class="label-width" v-model="form.nodeType"></el-input>
            </el-form-item> -->
            <el-form-item label="节点类型:">
                <el-select class="label-width" v-model="form.nodeType" placeholder="请选择节点类型" @change="selectTypeFun">
                    <el-option v-for="(item,index) in typeArr" :key="index" :label="item.tag_name" :value="item.tag_name">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="节点详细分类:" prop="node_detail_type">
                <el-select class="label-width" v-model="form.node_detail_type" placeholder="请选择节点详细分类" @change="selectDatailFun">
                    <el-option v-for="(item,index) in detailArr" :key="index" :label="item.tag_name" :value="item.tag_name">
                    </el-option>
                </el-select>
            </el-form-item>   
            <div v-if="form.node_detail_type == '教育机构'">
                <el-form-item label="学校类别:" prop="category">
                    <el-select class="label-width" v-model="form.category" placeholder="请选择学校类别">
                        <el-option v-for="(item,index) in categoryArr" :key="index" :label="item.tag_name" :value="item.tag_id">
                        </el-option>
                    </el-select>
                </el-form-item>     
                <el-form-item label="学校属性:" prop="attribute">
                    <el-radio-group v-model="form.attribute">
                        <el-radio label="公立">公立</el-radio>
                        <el-radio label="民办">民办</el-radio>
                    </el-radio-group>
                </el-form-item>     
            </div>  
            <el-form-item label="企业规模:">
                <el-select style="width: 350px;" class="label-width" v-model="form.scale" placeholder="请选择企业规模">
                    <el-option v-for="(item,index) in scaleArr" :key="index" :label="item.tag_name" :value="item.tag_id">
                    </el-option>
                </el-select>
                <el-checkbox v-model="form.example">是否为示范企业</el-checkbox>
            </el-form-item>     
            <!--<el-form-item label="节点编码-BDP:" prop="BDP">
                <el-input class="label-width" v-model="form.BDP"></el-input>
            </el-form-item>     -->
            <el-form-item label="集团名称:">
                <el-input class="label-width" v-model="form.group_name"></el-input>
            </el-form-item>  
            <el-form-item label="归属区县:">
                <el-input class="label-width" v-model="form.district_name"></el-input>
            </el-form-item>   
            <el-form-item label="可追溯品类:" prop="traceability_type">
                <el-select class="label-width" v-model="form.traceability_type" placeholder="请选择可追溯品类"  @change="selectGet1"  >
                    <el-option v-for="(item,index) in options1" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="备注:" >
                <el-input class="label-width" v-model="form.remarks"></el-input>
            </el-form-item> 
            <el-form-item label="流水来源方式:">
                <el-select class="label-width" v-model="form.source_way" placeholder="请选择流水来源方式"  @change="selectGet2"  >
                    <el-option v-for="(item,index) in options2" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="统一社会信用代码:" prop="regId">
                <el-input class="label-width" v-model="form.regId"></el-input>
            </el-form-item>
            <el-form-item label="法人代表:" prop="legalRepresent">
                <el-input class="label-width" v-model="form.legalRepresent"></el-input>
            </el-form-item>   
            <el-form-item label="联系人:">
                <el-input class="label-width" v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="tel">
                <el-input class="label-width" v-model="form.tel"></el-input>
            </el-form-item>    
            <div class="flex">
                <el-form-item label="省份:" prop="province">
                    <el-select class="label-width" v-model="form.province" placeholder="请选择省份"  @change="selectGet3"  >
                        <el-option v-for="(item,index) in options3" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市:" prop="city">
                    <el-select class="label-width" v-model="form.city" placeholder="请选择市"  @change="selectGet4"  >
                        <el-option v-for="(item,index) in options4" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>      
                <el-form-item label="县:" prop="countyname">
                    <el-select class="label-width" v-model="form.countyname" placeholder="请选择县"  @change="selectGet5"  >
                        <el-option v-for="(item,index) in options5" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> 
            </div>
            <el-form-item label="经营地址:" prop="addr">
                <el-input class="label-width" v-model="form.addr"></el-input>
            </el-form-item> 
            <div class="flex">
                <el-form-item label="经度:" prop="x_coordinate">
                    <el-input class="label-width" v-model="form.x_coordinate"></el-input>
                </el-form-item> 
                <el-form-item label="纬度:" prop="y_coordinate">
                    <el-input class="label-width" v-model="form.y_coordinate"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="企业简称:">
                <el-input class="label-width" v-model="form.short_name"></el-input>
            </el-form-item> 
            <el-form-item label="企业父节点:">
                <el-input class="label-width" v-model="form.parent"></el-input>
            </el-form-item> 
            <!--<el-form-item label="传真:" >
                <el-input class="label-width" v-model="form.fax"></el-input>
            </el-form-item> -->
        </el-form>
        <el-button class="save-btn" type="primary" @click="save(form)">保存</el-button>
    </div>
</template>

<script>
import {QueryNodeTypeInfoForType,QueryTraceabilityType,QuerySourceWay,QueryProvinceToSelect,GetCode,UpdateNodeState,UpdateBasicInfo,
GetNodeInfo,InsertBasicInfo, GetNodeTagInfo} from '../../js/nodeManage/nodeManage.js'
export default {
    name:'editFun',
    data(){
        return{
            isEdit:false,
            isShow:false,
            form:{
                province_szm:'',
                node_id:'',
                node_name:'',
                CompanyType:'',
                des:'',
                nodeType:'',
                node_detail_type:'',
                BDP:'',
                group_name:'',
                district_name:'',
                traceability_type:'',
                remarks:'',
                source_way:'',
                regId:'',
                legalRepresent:'',
                contacts:'',
                tel:'',
                //
                province:'',
                city:'',
                city2:'',
                countyname:'',
                addr:'',
                x_coordinate:'',
                y_coordinate:'',
                short_name:'',
                parent:'',
                fax:'',
                type_name:'',
                area_id:'',
                area_name:'',
                //
                CompanyTypeMsg:'',
                traceability:'',
                source:'',
                province_S:'',
                city_S:'',
                countyname_X:'',
                countyname_X2:'',
                countyname_X1:'',
                example: '',
                scale: '',
                category: '',
                attribute: '',
            },
            options:[],
            options1:[],
            options2:[],
            options3:[],
            options4:[],
            options5:[],
            province_S_text:'',
            countyname_X_text:'',
            city_c:[],
            city_text:'',
            pro:[],
            rules:{
                    node_id:[
                        {required: true, message: '请输入企业编码', trigger: 'blur'},
                        {validator:function(rule,value,callback){
                            if(typeof(value) == 'number'){
                                if(JSON.stringify(value).length != 9){
                                    callback(new Error("请输入9位企业编码"));
                                }else{
                                    callback();
                                }
                            }else{
                                if(value.length != 9){
                                    callback(new Error("请输入9位企业编码"));
                                }else{
                                    callback();
                                }
                            }
                        }, trigger: 'blur'},
                    ],
                    node_name :[{required: true, message: '请输入企业名称', trigger: 'blur'}],
                    CompanyType :[{required: true, message: '请选择企业类型', trigger: 'blur'}],
                    des :[{required: true, message: '请输入企业密钥', trigger: 'blur'}],
                    node_detail_type :[{required: true, message: '请输入分类', trigger: 'blur'}],
                    BDP :[{required: true, message: '请输入节点编码', trigger: 'blur'}],
                    traceability_type :[{required: true, message: '请选择可追溯品类', trigger: 'blur'}],
                    regId :[{required: true, message: '请输入统一社会信用代码', trigger: 'blur'}],
                    legalRepresent :[{required: true, message: '请输入法人代表', trigger: 'blur'}],
                    tel :[{required: true, message: '请输入联系电话', trigger: 'blur'}],
                    addr :[{required: true, message: '请输入经营地址', trigger: 'blur'}],
                    x_coordinate :[{required: true, message: '请选择经度', trigger: 'blur'}],
                    y_coordinate :[{required: true, message: '请选择纬度', trigger: 'blur'}],
                    province :[{required: true, message: '请选择省', trigger: 'blur'}],
                    city :[{required: true, message: '请选择市', trigger: 'blur'}],
                    countyname :[{required: true, message: '请选择县', trigger: 'blur'}],
                    category :[
                        {required: true, message: '请选择学校类别', trigger: 'blur'}
                    ],
                    attribute :[
                        {required: true, message: '请选择学校属性', trigger: 'blur'}
                    ],
            },
            scaleArr: [],
            typeArr: [],
            detailArr: [],
            categoryArr: [],
        }
    },
    mounted(){
        
        this.getQueryNodeTypeInfoForType();
        this.getQueryTraceabilityType();
        this.getQuerySourceWay();
        this.getQueryProvinceToSelect();
        this.getGetNodeTagInfo()
        if(JSON.stringify(this.$route.params) != "{}"){
            this.form.attribute = this.$route.params.data.basic.school_attribute
            this.form.example = this.$route.params.data.basic.node_example ? true : ''
            this.isShow = true;
            this.isEdit = true;
            this.form.node_id = this.$route.params.data.basic.node_id; 
            this.form.node_name = this.$route.params.data.basic.node_name;
            this.form.CompanyType = this.$route.params.data.basic.type;
            this.form.des = this.$route.params.data.basic.des;            
            this.form.nodeType = this.$route.params.data.basic.node_type;
            this.form.node_detail_type = this.$route.params.data.basic.node_detail_type;
            this.form.BDP = this.$route.params.data.basic.node_id_bdp;
            this.form.group_name = this.$route.params.data.basic.group_name;
            this.form.district_name = this.$route.params.data.basic.district_name;
            // this.form.traceability_type = this.$route.params.traceability_type;
            if(this.$route.params.data.basic.traceability_type == '1'){
                this.form.traceability = '猪肉'
                this.form.traceability_type = '猪肉'
            }else if(this.$route.params.data.basic.traceability_type == '2'){
                this.form.traceability = '蔬菜'
                this.form.traceability_type = '蔬菜'
            }else if(this.$route.params.data.basic.traceability_type == '3'){
                this.form.traceability = '猪肉、蔬菜'
                this.form.traceability_type = '猪肉、蔬菜'
            }
            this.form.remarks = this.$route.params.data.basic.remark;
            // this.form.source_way = this.$route.params.data.basic.source_way;
            if(this.$route.params.data.basic.source_way == '1'){
                this.form.source_way = '配送'
            }else if(this.$route.params.data.basic.source_way == '2'){
                this.form.source_way = '商务通'
            }
            this.form.regId = this.$route.params.data.basic.reg_id;
            this.form.legalRepresent = this.$route.params.data.basic.legal_represent;
            this.form.contacts = this.$route.params.data.basic.contacts;
            this.form.tel = this.$route.params.data.basic.tel;
            if(this.$route.params.data.sheng.code != '9999'){
                this.form.province = this.$route.params.data.sheng.code;
            }
            if(this.$route.params.data.shi.code != '9999'){
                this.form.city = this.$route.params.data.shi.code
            }
            if(this.$route.params.data.qu.code != '9999'){
                this.form.countyname = this.$route.params.data.qu.code
            }
            // this.form.CompanyTypeMsg = 
            if(this.$route.params.data.sheng.code && this.$route.params.data.sheng.code != '9999'){
                let sheng = this.$route.params.data.sheng
                this.form.province_S = sheng.code
                this.form.province_szm = sheng.szm
                this.province_S_text = sheng.caption
                this.pro = [this.form.province_szm,this.form.province_S].toString()
                this.getCodeFun()
                if(this.$route.params.data.shi.code && this.$route.params.data.shi.code != '9999'){
                    let shi = this.$route.params.data.shi
                    this.form.city2 = shi.code
                    this.city_text = shi.caption
                    this.city_szm = shi.szm 
                    this.city_c = [shi.szm,shi.id].toString()
                    this.getCodeFun1()
                    if(this.$route.params.data.qu.code && this.$route.params.data.qu.code != '9999'){
                        let qu = this.$route.params.data.qu
                        this.form.countyname_X2 = qu.qu
                        this.form.countyname_X = qu.szm
                        this.countyname_X_text = qu.caption
                        this.countyname = [qu.szm,qu.qu].toString()
                    }
                }
            }
            this.form.addr = this.$route.params.data.basic.addr;
            this.form.x_coordinate = this.$route.params.data.basic.x_coordinate;
            this.form.y_coordinate = this.$route.params.data.basic.y_coordinate;
            this.form.short_name = this.$route.params.data.basic.shortname;
            this.form.parent = this.$route.params.data.basic.parent;
            this.form.fax = this.$route.params.data.basic.fax;
            this.form.type_name = this.$route.params.data.basic.typename;
            this.form.area_id = this.form.countyname_X1;
            this.form.area_name = this.province_S_text+this.city_text+this.countyname_X_text;
        }
    },
    methods:{
        // 节点类型
        selectTypeFun(ele){
            console.log(ele)
            this.form.node_detail_type = ''
            this.form.category = ''
            this.form.attribute = ''
            this.form.scale = ''
            this.form.example = ''
            this.typeArr.forEach(val => {
                if(val.tag_name == ele){
                    this.detailArr = val.child_list
                    val.child_list.forEach(val2 => {
                        val2.child_list.forEach(val3 => {
                            if(val3.tag_name == '企业规模'){
                                this.scaleArr = val3.child_list
                            }
                            if(val3.tag_name == '学校类别'){
                                this.categoryArr = val3.child_list
                            }
                            if(val3.tag_name == '学校类别'){
                                this.categoryArr = val3.child_list
                            }
                        })
                    })
                }
            })
        },
        // 节点详细类型
        selectDatailFun(ele){
            this.form.category = ''
            this.form.attribute = ''
            this.form.scale = ''
            this.form.example = ''
        },
        // 节点详细类型
        getGetNodeTagInfo(){
            GetNodeTagInfo('')
                .then(res => {
                    this.typeArr = res.data.tagType
                    if(this.$route.params.data){
                        this.typeArr.forEach(val => {
                            console.log(val)
                            if(val.tag_name == this.$route.params.data.basic.node_type){
                                this.detailArr = val.child_list
                                val.child_list.forEach(val2 => {
                                    val2.child_list.forEach(val3 => {
                                        console.log(val3)
                                        if(val3.tag_name == '企业规模'){
                                            this.scaleArr = val3.child_list
                                            this.form.scale = this.$route.params.data.basic.node_scale_id
                                        }
                                        if(val3.tag_name == '学校类别'){
                                            this.categoryArr = val3.child_list
                                            this.form.category = this.$route.params.data.basic.school_type_id
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        selectGet(val){  //企业类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.form.CompanyTypeMsg = ele.id
                        this.form.type_name = ele.text
                    }
                })
            }else{
                this.form.CompanyTypeMsg = ''
                this.form.type_name = ''
            }
        },
        selectGet1(val){  //可追溯品类
            if(val){
                this.options1.forEach(ele => {
                    if(val == ele.id){
                        this.form.traceability = ele.id
                    }
                })
            }else{
                this.form.traceability = ''
            }
        },
        selectGet2(val){  //可追溯品类
            if(val){
                this.options2.forEach(ele => {
                    if(val == ele.id){
                        this.form.source = ele.id
                    }
                })
            }else{
                this.form.source = ''
            }
        },
        selectGet3(val){  //省
            if(val){
                this.options3.forEach(ele => {
                    if(val == ele.id){
                        this.form.province_S = ele.id
                        this.form.province_szm = ele.szm
                        this.province_S_text = ele.text
                        this.pro = [this.form.province_szm,this.form.province_S].toString()
                    }
                })
                this.getCodeFun()
            }else{
                this.form.province_S = ''
            }
        },
        selectGet4(val){  //市
            if(val){
                this.options4.forEach(ele => {
                    if(val == ele.id){
                        this.form.city2 = ele.id
                        this.city_text = ele.text
                        this.city_szm = ele.szm 
                        this.city_c = [ele.szm,ele.id].toString()
                    }
                })
                this.getCodeFun1()
            }else{
                this.form.city_S = ''
            }
        },
        selectGet5(val){  //县
            if(val){
                this.options5.forEach(ele => {
                    if(val == ele.id){
                        this.form.countyname_X2 = ele.id
                        this.form.countyname_X = ele.szm
                        this.countyname_X_text = ele.text
                        this.countyname = [ele.szm,ele.id].toString()
                    }
                })
            }else{
                this.form.countyname_X = ''
            }
        },
        save(form){
            let attribute = '', example = '', scale = '', tag_ids = '';
            if(this.form.attribute){
                this.typeArr.forEach(val => {
                    val.child_list.forEach(val2 => {
                        val2.child_list.forEach(val3 => {
                            if(this.form.node_detail_type == val2.tag_name){
                                if(val3.tag_name == '示范企业'){
                                    if(this.form.example == true){
                                        example = val3.tag_id
                                    }
                                }
                                if(val3.tag_name == '学校属性'){
                                    val3.child_list.forEach(val4 => {
                                        if(this.form.attribute == val4.tag_name){
                                            attribute = val4.tag_id
                                        }
                                    })
                                }
                            }
                        })
                    })
                })
            }
            tag_ids = (attribute ? (attribute + ',') : '') + (example ? (example + ',') : '') + (this.form.scale ? (this.form.scale + ',') : '')
                + (this.form.category ? (this.form.category + ',') : '')
            if(tag_ids != ''){
                tag_ids = tag_ids.substr(0, tag_ids.length -1)
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.isEdit){
                        let data = {
                            node_id:this.form.node_id,
                            node_name:this.form.node_name,
                            type:this.form.CompanyType,
                            des:this.form.des,
                            node_type:this.form.nodeType,
                            node_detail_type:this.form.node_detail_type,
                            node_id_bdp:this.form.BDP,
                            group_name: this.form.group_name,
                            district_name: this.form.district_name,
                            traceability_type:this.form.traceability_type,
                            remark:this.form.remarks,
                            source_way:this.form.source_way,
                            reg_id:this.form.regId,
                            legal_represent:this.form.legalRepresent,
                            contacts:this.form.contacts,
                            tel:this.form.tel,
                            province:this.pro,
                            city:this.city_c,
                            countyname:this.countyname,
                            addr:this.form.addr,
                            x_coordinate:this.form.x_coordinate,
                            y_coordinate:this.form.y_coordinate,
                            short_name:this.form.short_name,
                            parent:this.form.parent,
                            fax:this.form.fax,
                            typename:this.form.type_name,
                            area_id:this.form.countyname_X,
                            area_name:this.province_S_text+this.city_text+this.countyname_X_text,
                            tag_ids: tag_ids,
                        };
                        UpdateBasicInfo(data)
                            .then( res =>{
                                this.$message({
                                    message: '恭喜，修改成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'nodeManageMsg'})
                            })
                            .catch(res=>{
                                this.$message.error('出错了.');
                            })
                    }else{
                        let data = {
                            node_id:this.form.node_id,
                            node_name:this.form.node_name,
                            type:this.form.CompanyType,
                            des:this.form.des,
                            node_type:this.form.nodeType,
                            node_detail_type:this.form.node_detail_type,
                            node_id_bdp:this.form.BDP,
                            group_name: this.form.group_name,
                            district_name: this.form.district_name,
                            traceability_type:this.form.traceability_type,
                            remark:this.form.remarks,
                            source_way:this.form.source_way,
                            reg_id:this.form.regId,
                            legal_represent:this.form.legalRepresent,
                            contacts:this.form.contacts,
                            tel:this.form.tel,
                            province:this.pro,
                            city:this.city_c,
                            countyname:this.countyname,
                            addr:this.form.addr,
                            x_coordinate:this.form.x_coordinate,
                            y_coordinate:this.form.y_coordinate,
                            short_name:this.form.short_name,
                            parent:this.form.parent,
                            fax:this.form.fax,
                            typename:this.form.type_name,
                            area_id:this.form.countyname_X,
                            area_name:this.province_S_text+this.city_text+this.countyname_X_text,
                            tag_ids: tag_ids,
                        };
                        InsertBasicInfo(data)
                            .then( res =>{
                                this.$message({
                                    message: '恭喜，添加成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'nodeManageMsg'})
                            })
                            .catch(res=>{
                                conosle.log(res)
                            })
                    }
                }
            })
        },  
        getQueryNodeTypeInfoForType(){  //企业类型查询
            QueryNodeTypeInfoForType()
                .then(res=>{
                    this.options = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getQueryTraceabilityType(){  //可追溯品类
            QueryTraceabilityType()
                .then(res=>{
                    this.options1 = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getQuerySourceWay(){  //流水
            QuerySourceWay()
                .then(res=>{
                    this.options2 = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getQueryProvinceToSelect(){  //省份
            QueryProvinceToSelect()
                .then(res=>{
                    this.options3 = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getCodeFun(){  //市
            let data = 'pcode='+this.form.province_S
            GetCode(data)
                .then(res=>{
                    this.options4 = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getCodeFun1(){  //县
            let data = 'pcode='+this.form.city
            GetCode(data)
                .then(res=>{
                    this.options5 = res.data.dataList;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding-left: 60px;
        padding-top: 30px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;   
        .el-form-item{
            margin-bottom: 10px;
        }
        .save-btn{
            margin-top: 30px;
            margin-left: 150px;
            margin: 30px 0 20px 150px;
        }
    }
    .label-width{
        width: 480px;
    }
</style>
<style lang="less">
    .addnodeManage{
        .flex{
            margin-left: 120px;
            display: flex;
            width: 630px;
            .el-form-item{
                display: flex;
                .el-form-item__label{
                    width: 60px !important;
                }
                .el-form-item__content{
                    width: 120px !important;
                    margin-left: 0 !important;
                }
                .el-input, .el-select{
                    width: 120px !important;
                }

            }
        }
    }
</style>