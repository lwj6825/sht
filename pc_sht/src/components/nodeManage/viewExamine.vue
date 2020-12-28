<template>
    <div class="content viewExamine">
        <el-form ref="form" size="mini" :model="form" label-width="180px" :rules="rules">
            <el-form-item label="用户名:" prop="account">
                <el-input class="label-width" v-model="form.account"></el-input><span class="comments" @click="commentsFun(1)">注</span>
                <el-input v-if="comments1" class="label-width idea" v-model="account_idea"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input class="label-width" v-model="form.password"></el-input><span class="comments" @click="commentsFun(2)">注</span>
                <el-input v-if="comments2" class="label-width idea" v-model="password_idea"></el-input>
            </el-form-item>
            <el-form-item label="企业编码:" prop="enterprise_code" >
                <el-input class="label-width" v-model="form.enterprise_code"></el-input>
                <!--<el-input class="label-width idea" v-model="enterprise_code_idea"></el-input>
            --></el-form-item>
            <el-form-item label="企业名称:" prop="enterprise_name">
                <el-input class="label-width" v-model="form.enterprise_name"></el-input><span class="comments" @click="commentsFun(3)">注</span>
                <el-input v-if="comments3" class="label-width idea" v-model="enterprise_name_idea"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:">
                <el-input class="label-width" v-model="form.short_name"></el-input><span class="comments" @click="commentsFun(4)">注</span>
                <el-input v-if="comments4" class="label-width idea" v-model="short_name_idea"></el-input>
            </el-form-item> 
            <el-form-item label="营业执照号:" prop="qydm">
                <el-input class="label-width" v-model="form.qydm"></el-input><span class="comments" @click="commentsFun(5)">注</span>
                <el-input v-if="comments5" class="label-width idea" v-model="qydm_idea"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
                <el-input class="label-width" v-model="form.regId"></el-input><span class="comments" @click="commentsFun(6)">注</span>
                <el-input v-if="comments6" class="label-width idea" v-model="regId_idea"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" prop="enterprise_type">
                <el-select class="label-width" v-model="form.enterprise_type" placeholder="请选择企业类型"  @change="selectGet"  >
                    <el-option v-for="(item,index) in options" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
                <!--<el-input class="label-width idea" v-model="enterprise_type_idea"></el-input>
            --></el-form-item> 
            <el-form-item label="节点类型:" prop="node_type">
                <el-select class="label-width" v-model="form.node_type" placeholder="请选择节点类型" @change="selectTypeFun">
                    <el-option v-for="(item,index) in typeArr" :key="index" :label="item.tag_name" :value="item.tag_name">
                    </el-option>
                </el-select><span class="comments" @click="commentsFun(7)">注</span>
                <el-input v-if="comments7" class="label-width idea" v-model="node_type_idea"></el-input>
            </el-form-item> 
            <el-form-item label="节点详细分类:" prop="node_detail_type">
                <el-select class="label-width" v-model="form.node_detail_type" placeholder="请选择节点详细分类" @change="selectDatailFun">
                    <el-option v-for="(item,index) in detailArr" :key="index" :label="item.tag_name" :value="item.tag_name">
                    </el-option>
                </el-select><span class="comments" @click="commentsFun(8)">注</span>
                <el-input v-if="comments8" class="label-width idea" v-model="node_detail_type_idea"></el-input>
            </el-form-item>   
            <div v-if="form.node_detail_type == '教育机构'">
                <el-form-item label="学校类别:" prop="category">
                    <el-select class="label-width" v-model="form.category" placeholder="请选择学校类别">
                        <el-option v-for="(item,index) in categoryArr" :key="index" :label="item.tag_name" :value="item.tag_id">
                        </el-option>
                    </el-select><span class="comments" @click="commentsFun(9)">注</span>
                    <el-input v-if="comments9" class="label-width idea" v-model="category_idea"></el-input>
                </el-form-item>     
                <el-form-item label="学校属性:" prop="attribute">
                    <el-radio-group class="label-width" v-model="form.attribute">
                        <el-radio label="公立">公立</el-radio>
                        <el-radio label="民办">民办</el-radio>
                    </el-radio-group><span class="comments" @click="commentsFun(10)">注</span>
                    <br/>
                    <el-input v-if="comments10" class="label-width idea" v-model="attribute_idea"></el-input>
                </el-form-item>     
            </div>  
            <el-form-item label="企业规模:" prop="scale">
                <el-select class="label-width" v-model="form.scale" placeholder="请选择企业规模">
                    <el-option v-for="(item,index) in scaleArr" :key="index" :label="item.tag_name" :value="item.tag_id">
                    </el-option>
                </el-select><span class="comments" @click="commentsFun(11)">注</span>
                <el-input v-if="comments11" class="label-width idea" v-model="scale_idea"></el-input>
            </el-form-item>    
            <el-form-item label="是否为示范企业:" prop="example">
                <el-radio-group class="label-width" v-model="form.example">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                </el-radio-group><span class="comments" @click="commentsFun(12)">注</span>
                <br/>
                <el-input v-if="comments12" class="label-width idea" v-model="example_idea"></el-input>
            </el-form-item>     
            <el-form-item label="集团名称:">
                <el-input class="label-width" v-model="form.group_name"></el-input><span class="comments" @click="commentsFun(13)">注</span>
                <el-input v-if="comments13" class="label-width idea" v-model="group_name_idea"></el-input>
            </el-form-item>  <!--
            <el-form-item label="归属区县:" prop="district_name">
                <el-input class="label-width" v-model="form.district_name"></el-input>
            </el-form-item>-->  
            <el-form-item label="可追溯品类:" prop="traceability_type">
                <el-select class="label-width" v-model="form.traceability_type" placeholder="请选择可追溯品类"  @change="selectGet1"  >
                    <el-option v-for="(item,index) in options1" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select><span class="comments" @click="commentsFun(14)">注</span>
                <el-input v-if="comments14" class="label-width idea" v-model="traceability_type_idea"></el-input>
            </el-form-item> 
            <el-form-item label="流水来源方式:" prop="source_way">
                <el-select class="label-width" v-model="form.source_way" placeholder="请选择流水来源方式"  @change="selectGet2"  >
                    <el-option v-for="(item,index) in options2" :key="index" :label="item.text" :value="item.id">
                    </el-option>
                </el-select>
                <!--<el-input class="label-width idea" v-model="source_way_idea"></el-input>
            --></el-form-item> 
            <el-form-item label="法人代表:" prop="legalRepresent">
                <el-input class="label-width" v-model="form.legalRepresent"></el-input><span class="comments" @click="commentsFun(15)">注</span>
                <el-input v-if="comments15" class="label-width idea" v-model="legalRepresent_idea"></el-input>
            </el-form-item>   
            <el-form-item label="联系人:">
                <el-input class="label-width" v-model="form.contacts"></el-input><span class="comments" @click="commentsFun(16)">注</span>
                <el-input v-if="comments16" class="label-width idea" v-model="contacts_idea"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="tel">
                <el-input class="label-width" v-model="form.tel"></el-input><span class="comments" @click="commentsFun(17)">注</span>
                <el-input v-if="comments17" class="label-width idea" v-model="tel_idea"></el-input>
            </el-form-item>    
            <div class="flex">
                <el-form-item label="省份:" prop="province_id">
                    <el-select class="label-width" v-model="form.province_id" placeholder="请选择省份"  @change="selectGet3"  >
                        <el-option v-for="(item,index) in options3" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select><span class="comments" @click="commentsFun(18)">注</span>
                    <el-input v-if="comments18" class="label-width idea" v-model="province_id_idea"></el-input>
                </el-form-item>
                <el-form-item label="市:" prop="city_id">
                    <el-select class="label-width" v-model="form.city_id" placeholder="请选择市"  @change="selectGet4"  >
                        <el-option v-for="(item,index) in options4" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select><span class="comments" @click="commentsFun(19)">注</span>
                    <el-input v-if="comments19" class="label-width idea" v-model="city_id_idea"></el-input>
                </el-form-item>      
                <el-form-item label="区/县:" prop="countyname_id">
                    <el-select class="label-width" v-model="form.countyname_id" placeholder="请选择县"  @change="selectGet5"  >
                        <el-option v-for="(item,index) in options5" :key="index" :label="item.text" :value="item.id">
                        </el-option>
                    </el-select><span class="comments" @click="commentsFun(20)">注</span>
                    <el-input v-if="comments20" class="label-width idea" v-model="countyname_id_idea"></el-input>
                </el-form-item> 
            </div>
            <el-form-item label="经营地址:" prop="addr">
                <el-input class="label-width" v-model="form.addr"></el-input><span class="comments" @click="commentsFun(21)">注</span>
                <el-input v-if="comments21" class="label-width idea" v-model="addr_idea"></el-input>
            </el-form-item> 
            <div class="flex">
                <el-form-item label="经度:" prop="x_coordinate">
                    <el-input class="label-width" v-model="form.x_coordinate"></el-input>
                </el-form-item> 
                <el-form-item label="纬度:" prop="y_coordinate">
                    <el-input class="label-width" v-model="form.y_coordinate"></el-input>
                </el-form-item>
            </div>
            <!--<el-form-item label="企业父节点:">
                <el-input class="label-width" v-model="form.parent"></el-input>
            </el-form-item>-->
            <el-form-item label="监管机构:">
                <el-select class="label-width" size="mini" v-model="form.jgjg" multiple clearable filterable placeholder="请选择">
                    <el-option v-for="(item, index) in jgjgArr" :key="index" :label="item.jgjg" :value="item.jgjg"></el-option>
                </el-select><span class="comments" @click="commentsFun(22)">注</span>
                <el-input v-if="comments22" class="label-width idea" v-model="jgjg_idea"></el-input>
            </el-form-item> 
            <el-form-item label="角色:" prop="role">
                <el-select class="label-width" size="mini" v-model="form.role" clearable filterable placeholder="请选择">
                    <el-option v-for="(item, index) in roleArr" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
                </el-select>
                <!--<el-input class="label-width idea" v-model="role_idea"></el-input>
            --></el-form-item> <!--
            <el-form-item label="邮箱:" prop="email">
                <el-input class="label-width" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="工行支付账户:" prop="shop_mer_id">
                <el-input class="label-width" v-model="form.shop_mer_id"></el-input>
            </el-form-item>-->
            <el-form-item label="备注:">
                <el-input class="label-width" v-model="form.remarks"></el-input><!--
                <el-input class="label-width idea" v-model="remarks_idea"></el-input>-->
            </el-form-item> 
            <el-form-item>
                <el-button class="save-btn" @click="rejectFun">审核驳回</el-button>
                <el-button type="primary" @click="submitForm('form')">审核通过</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {QueryNodeTypeInfoForType,QueryTraceabilityType,QuerySourceWay,QueryProvinceToSelect,GetCode,UpdateNodeState,UpdateBasicInfo,
GetNodeInfo,InsertBasicInfo, GetNodeTagInfo, QueryJgJg, ExamineBasicInfo, GetNodeId, AddRejected, QueryBasic} from '../../js/nodeManage/nodeManage.js'
import {getRoleList} from '../../js/role/role.js'
export default {
    name:"viewExamine",
    data() {
        return {
            ids: '',
            form:{
                enterprise_code: '',
                enterprise_name: '', // 企业名称
                enterprise_type: '',
                enterprise: '',
                node_type: '', // 节点类型
                node_detail_type: '', // 节点详细分类
                category: '', // 学校类别
                attribute: '', // 学校属性
                scale: '', // 企业规模
                example: '', // 是否为示范企业
                example_id: '', // 是否为示范企业
                group_name: '', // 集团名称
                district_name: '', // 归属区县
                traceability_type: '', // 可追溯品类
                remarks:'', // 备注
                source_way:'', // 流水来源方式
                regId:'', // 身份证号统一社会信用代码
                legalRepresent:'', // 法人代表
                contacts:'', // 联系人
                tel:'', // 联系电话
                province:'', // 省
                province_szm: '',
                province_id:'',
                city:'',
                city_szm: '',
                city_id:'',
                countyname:'',
                countyname_szm: '',
                countyname_id: '',
                addr:'', // 经营地址
                x_coordinate:'',
                y_coordinate:'', // 纬度
                short_name:'', // 企业简称
                parent: '', // 企业父节点
                jgjg: '', // 监管机构
                account: '',
                password: '',
                role: '',
                qydm: '', // 营业执照
                email: '',
                shop_mer_id: '', // 工行支付账户
            },
            account_idea: '',
            password_idea: '',
            enterprise_code_idea: '',
            enterprise_name_idea: '',
            short_name_idea: '',
            qydm_idea: '',
            regId_idea: '',
            enterprise_type_idea: '',
            node_type_idea: '',
            node_detail_type_idea: '',
            category_idea: '',
            attribute_idea: '',
            scale_idea: '',
            example_idea: '',
            group_name_idea: '',
            traceability_type_idea: '',
            remarks_idea: '',
            source_way_idea: '',
            legalRepresent_idea: '',
            contacts_idea: '',
            tel_idea: '',
            province_id_idea: '',
            city_id_idea: '',
            countyname_id_idea: '',
            addr_idea: '',
            jgjg_idea: '',
            role_idea: '',
            rules:{
                enterprise_code: [
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
                enterprise_name: [
                    {required: true, message: '请输入企业名称', trigger: 'blur'}]
                ,
                enterprise_type: [
                    {required: true, message: '请选择企业类型', trigger: 'blur'}
                ],
                node_type: [
                    {required: true, message: '请选择节点类型', trigger: 'blur'}
                ],
                node_detail_type: [
                    {required: true, message: '请选择节点详细分类', trigger: 'blur'}
                ],
                scale: [
                    {required: true, message: '请选择企业规模', trigger: 'blur'}
                ],
                example: [
                    {required: true, message: '请选择是否为是否企业', trigger: 'blur'}
                ],
                group_name: [
                    {required: true, message: '请输入集团名称', trigger: 'blur'}
                ],
                district_name: [
                    {required: true, message: '请输入归属区县', trigger: 'blur'}
                ],
                traceability_type: [
                    {required: true, message: '请选择可追溯品类', trigger: 'blur'}
                ],
                remarks: [
                    {required: true, message: '请输入备注', trigger: 'blur'}
                ],
                source_way: [
                    {required: true, message: '请选择流水来源方式', trigger: 'blur'}
                ],
                regId: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'}
                ],
                legalRepresent: [
                    {required: true, message: '请输入法人代表', trigger: 'blur'}
                ],
                contacts: [
                    {required: true, message: '请输入联系人', trigger: 'blur'}
                ],
                tel: [
                    {required: true, message: '请输入联系电话', trigger: 'blur'}
                ],
                addr: [
                    {required: true, message: '请输入经营地址', trigger: 'blur'}
                ],
                x_coordinate: [
                    {required: true, message: '请输入经度', trigger: 'blur'}
                ],
                y_coordinate: [
                    {required: true, message: '请输入纬度', trigger: 'blur'}
                ],
                province_id: [
                    {required: true, message: '请选择省', trigger: 'blur'}
                ],
                city_id: [
                    {required: true, message: '请选择市', trigger: 'blur'}
                ],
                countyname_id: [
                    {required: true, message: '请选择县', trigger: 'blur'}
                ],
                category: [
                    {required: true, message: '请选择学校类别', trigger: 'blur'}
                ],
                attribute: [
                    {required: true, message: '请选择学校属性', trigger: 'blur'}
                ],
                short_name: [
                    {required: true, message: '请输入企业简称', trigger: 'blur'}
                ],
                jgjg: [
                    {required: true, message: '请选择监管机构', trigger: 'blur'}
                ],
                account: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                role: [
                    {required: true, message: '请选择角色', trigger: 'blur'}
                ],
                qydm: [
                    {required: true, message: '请输入营业执照号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'}
                ],
                shop_mer_id: [
                    {required: true, message: '请输入工行支付账户', trigger: 'blur'}
                ],
            },
            options: [], // 企业类型
            options1: [], // 可追溯品类
            options2: [], // 流水
            options3: [], // 省
            options4: [], // 市
            options5: [], // 区县
            scaleArr: [],
            typeArr: [],
            detailArr: [],
            categoryArr: [],
            jgjgArr: [],
            roleArr: [],
            comments1: false,
            comments2: false,
            comments3: false,
            comments4: false,
            comments5: false,
            comments6: false,
            comments7: false,
            comments8: false,
            comments9: false,
            comments10: false,
            comments11: false,
            comments12: false,
            comments13: false,
            comments14: false,
            comments15: false,
            comments16: false,
            comments17: false,
            comments18: false,
            comments19: false,
            comments20: false,
            comments21: false,
            comments22: false,
        }
    },
    mounted(){
        this.getGetNodeId()
        this.getQueryNodeTypeInfoForType();
        this.getQueryTraceabilityType();
        this.getQuerySourceWay();
        this.getQueryProvinceToSelect();
        this.getGetNodeTagInfo()
        this.getQueryJgJgFun()
        this.getRoleFun()
        if(JSON.stringify(this.$route.params) != "{}"){
            console.log(this.$route.params)
            let param = this.$route.params;
            this.ids = param.id
            // this.form.enterprise_code = param.node_id
            this.form.enterprise_name = param.node_name
            // this.form.enterprise_type = param.node_id
            this.form.node_type = param.node_type
            this.form.node_detail_type = param.node_detail_type
            this.form.group_name = param.group_name
            this.form.district_name = param.district_name
            // this.form.traceability_type = param.traceability_type
            this.form.remarks = param.remark
            // this.form.source_way = param.source_way
            this.form.regId = param.reg_id
            this.form.legalRepresent = param.legal_represent
            this.form.contacts = param.contacts
            this.form.tel = param.tel
            // this.form.province = param.source_way // 
            // this.form.province_szm = param.source_way
            // this.form.province_id = param.source_way
            // this.form.city = param.source_way
            // this.form.city_szm = param.source_way
            // this.form.city_id = param.source_way
            // this.form.countyname = param.source_way
            // this.form.countyname_szm = param.source_way
            // this.form.countyname_id = param.source_way
            this.form.addr = param.addr
            this.form.x_coordinate = param.x_coordinate
            this.form.y_coordinate = param.y_coordinate
            this.form.short_name = param.shortname
            // this.form.parent = param.y_coordinate
            if(param.jgjg){
                this.form.jgjg = param.jgjg.split(',');
            }
            this.form.account = param.username
            this.form.password = param.password
            this.form.qydm = param.qydm
            // this.form.email = param.email
            // this.form.shop_mer_id = param.icbc_card
        }
        this.getViewFun()
    },
    methods:{
        getViewFun(){
            let obj = {
                page: 1,
                cols: 15,
                icon: 2, // 0未审核1审核通过
                node_name: '',
                id: this.ids,
            }
            QueryBasic(obj)
                .then(res => {
                    let data = res.data.dataList[0];
                    let remarkList = data.remarkList
                    if(remarkList.length > 0){
                        remarkList.forEach(val => {
                            if(val.attribute == '用户名'){
                                this.account_idea = val.notation
                                this.comments1 = true
                            }
                            if(val.attribute == '密码'){
                                this.password_idea = val.notation
                                this.comments2 = true
                            }
                            if(val.attribute == '企业名称'){
                                this.enterprise_name_idea = val.notation
                                this.comments3 = true
                            }
                            if(val.attribute == '企业简称'){
                                this.short_name_idea = val.notation
                                this.comments4 = true
                            }
                            if(val.attribute == '营业执照号'){
                                this.qydm_idea = val.notation
                                this.comments5 = true
                            }
                            if(val.attribute == '身份证号'){
                                this.regId_idea = val.notation
                                this.comments6 = true
                            }
                            if(val.attribute == '节点类型'){
                                this.node_type_idea = val.notation
                                this.comments7 = true
                            }
                            if(val.attribute == '节点详细分类'){
                                this.node_detail_type_idea = val.notation
                                this.comments8 = true
                            }
                            if(val.attribute == '学习类别'){
                                this.category_idea = val.notation
                                this.comments9 = true
                            }
                            if(val.attribute == '学校属性'){
                                this.attribute_idea = val.notation
                                this.comments10 = true
                            }
                            if(val.attribute == '企业规模'){
                                this.scale_idea = val.notation
                                this.comments11 = true
                            }
                            if(val.attribute == '是否为示范企业'){
                                this.example_idea = val.notation
                                this.comments12 = true
                            }
                            if(val.attribute == '集团名称'){
                                this.group_name_idea = val.notation
                                this.comments13 = true
                            }
                            if(val.attribute == '可追溯品类'){
                                this.traceability_type_idea = val.notation
                                this.comments14 = true
                            }
                            if(val.attribute == '法人代表'){
                                this.legalRepresent_idea = val.notation
                                this.comments15 = true
                            }
                            if(val.attribute == '联系人'){
                                this.contacts_idea = val.notation
                                this.comments16 = true
                            }
                            if(val.attribute == '联系电话'){
                                this.tel_idea = val.notation
                                this.comments17 = true
                            }
                            if(val.attribute == '省份'){
                                this.province_id_idea = val.notation
                                this.comments18 = true
                            }
                            if(val.attribute == '市'){
                                this.city_id_idea = val.notation
                                this.comments19 = true
                            }
                            if(val.attribute == '区/县'){
                                this.countyname_id_idea = val.notation
                                this.comments20 = true
                            }
                            if(val.attribute == '经营地址'){
                                this.addr_idea = val.notation
                                this.comments21 = true
                            }
                            if(val.attribute == '监管机构'){
                                this.jgjg_idea = val.notation
                                this.comments22 = true
                            }
                        })
                    }

                })
                .catch(res => {
                    console.log(res)
                })
        },
        commentsFun(ele){
            if(ele == 1){
                this.comments1 = true
            }else if(ele == 2){
                this.comments2 = true
            }else if(ele == 3){
                this.comments3 = true
            }else if(ele == 4){
                this.comments4 = true
            }else if(ele == 5){
                this.comments5 = true
            }else if(ele == 6){
                this.comments6 = true
            }else if(ele == 7){
                this.comments7 = true
            }else if(ele == 8){
                this.comments8 = true
            }else if(ele == 9){
                this.comments9 = true
            }else if(ele == 10){
                this.comments10 = true
            }else if(ele == 11){
                this.comments11 = true
            }else if(ele == 12){
                this.comments12 = true
            }else if(ele == 13){
                this.comments13 = true
            }else if(ele == 14){
                this.comments14 = true
            }else if(ele == 15){
                this.comments15 = true
            }else if(ele == 16){
                this.comments16 = true
            }else if(ele == 17){
                this.comments17 = true
            }else if(ele == 18){
                this.comments18 = true
            }else if(ele == 19){
                this.comments19 = true
            }else if(ele == 20){
                this.comments20 = true
            }else if(ele == 21){
                this.comments21 = true
            }else if(ele == 22){
                this.comments22 = true
            }
        },
        getGetNodeId(){
            GetNodeId('')
                .then(res => {
                    this.form.enterprise_code = res.data.node_id
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getRoleFun(){
            let pageData = {
                page:'1',
                cols:'100',
                roleName:'',        
                userId:localStorage.getItem('userId')    
            }
            getRoleList(pageData)
                .then(res => {
                    this.roleArr = res.data.roleList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getQueryJgJgFun(){
            QueryJgJg('')
                .then(res => {
                    this.jgjgArr = res.data.list
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 节点类型
        selectTypeFun(ele){
            this.form.node_detail_type = ''
            this.form.category = ''
            this.form.attribute = ''
            // this.form.scale = ''
            // this.form.example = ''
            this.typeArr.forEach(val => {
                if(val.tag_name == ele){
                    this.detailArr = val.child_list
                    val.child_list.forEach(val2 => {
                        val2.child_list.forEach(val3 => {
                            // if(val3.tag_name == '企业规模'){
                            //     this.scaleArr = val3.child_list
                            // }
                            if(val3.tag_name == '学校类别'){
                                this.categoryArr = val3.child_list
                            }
                            // if(val3.tag_name == '示范企业'){
                            //     this.example_id = val3.tag_id
                            // }
                        })
                    })
                }
            })
        },
        // 节点详细类型
        selectDatailFun(ele){
            this.form.category = ''
            this.form.attribute = ''
            // this.form.scale = ''
            // this.form.example = ''
        },
        // 节点类型
        getGetNodeTagInfo(){
            GetNodeTagInfo('')
                .then(res => {
                    this.typeArr = res.data.tagType
                    this.typeArr.forEach(val => {
                        val.child_list.forEach(val2 => {
                            val2.child_list.forEach(val3 => {
                                if(val3.tag_name == '企业规模'){
                                    this.scaleArr = val3.child_list
                                }
                                if(val3.tag_name == '示范企业'){
                                    this.form.example_id = val3.tag_id
                                }
                            })
                        })
                    })
                    if(this.$route.params.tag_ids){
                        let attributeArr = [];
                        this.typeArr.forEach(val => {
                            if(this.form.node_type == val.tag_name){
                                this.detailArr = val.child_list
                                val.child_list.forEach(val2 => {
                                    val2.child_list.forEach(val3 => {
                                        // if(val3.tag_name == '企业规模'){
                                        //     this.scaleArr = val3.child_list
                                        // }
                                        if(val3.tag_name == '学校类别'){
                                            this.categoryArr = val3.child_list
                                        }
                                        if(val3.tag_name == '学校属性'){
                                            attributeArr = val3.child_list
                                        }
                                        // if(val3.tag_name == '示范企业'){
                                        //     this.example_id = val3.tag_id
                                        // }
                                    })
                                })
                            }
                        })
                        let arr = this.$route.params.tag_ids.split(',')
                        arr.forEach(val => {
                            this.scaleArr.forEach(val2 => {
                                if(val == val2.tag_id){
                                    this.form.scale = val
                                }
                            })
                            this.categoryArr.forEach(val3 => {
                                if(val == val3.tag_id){
                                    this.form.category = val
                                }
                            })
                            attributeArr.forEach(val4 => {
                                if(val == val4.tag_id){
                                    this.form.attribute = val4.tag_name
                                }
                            })
                            if(val == this.form.example_id){
                                this.form.example = '是'
                            }else{
                                this.form.example = '否'
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
                        this.form.enterprise = ele.text
                    }
                })
            }else{
                this.form.enterprise = ''
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
                        this.form.province_szm = ele.szm
                        this.form.province = ele.text
                    }
                })
                this.getCodeFun()
            }else{
                this.form.province_szm = ''
                this.form.province = ''
            }
            this.form.city_szm = ''
            this.form.city = ''
            this.form.countyname_szm = ''
            this.form.countyname_id = ''
            this.form.countyname = ''
        },
        selectGet4(val){  //市
            if(val){
                this.options4.forEach(ele => {
                    if(val == ele.id){
                        this.form.city_szm = ele.szm
                        this.form.city = ele.text
                    }
                })
                this.getCodeFun1()
            }else{
                this.form.city_szm = ele.szm
                this.form.city = ele.text
            }
        },
        selectGet5(val){  //县
            if(val){
                this.options5.forEach(ele => {
                    if(val == ele.id){
                        this.form.countyname_szm = ele.szm
                        this.form.countyname_id = ele.text
                    }
                })
            }else{
                this.form.countyname_szm = ''
                this.form.countyname_id = ''
            }
        },
        saveFun(form){
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
            tag_ids = (attribute ? (attribute + ',') : '') + (this.form.example == '是' ? (this.form.example_id + ',') : '') + (this.form.scale ? (this.form.scale + ',') : '')
                + (this.form.category ? (this.form.category + ',') : '')
            if(tag_ids != ''){
                tag_ids = tag_ids.substr(0, tag_ids.length -1)
            }
            let obj = {
                id: this.ids,
                node_id: this.form.enterprise_code,
                node_name: this.form.enterprise_name, // 企业名称
                type: this.form.enterprise_type, // 企业类型编码
                type_name: this.form.enterprise, // 企业类型
                des: '', // 企业密钥
                node_type: this.form.node_type, // 节点类型
                node_detail_type: this.form.node_detail_type, // 节点详细分类
                node_id_bdp: '', // 节点编码-BDP
                group_name: this.form.group_name, // 集团名称
                district_name: this.form.countyname, // 归属区县
                traceability_type: this.form.traceability_type, // 可追溯品类
                remarks: this.form.remarks, // 备注
                source_way: this.form.source_way, // 流水来源方式
                reg_id: this.form.regId, // 身份证号统一社会信用代码
                legal_represent: this.form.legalRepresent, // 法人代表
                contacts: this.form.contacts, // 联系人
                tel: this.form.tel, // 联系电话
                province: this.form.province_szm + ',' + this.form.province_id, // 省份
                city:  this.form.city_szm + ',' + this.form.city_id, // 市
                countyname:  this.form.countyname_szm + ',' + this.form.countyname_id, // 县
                addr: this.form.addr, // 经营地址
                x_coordinate: this.form.x_coordinate,
                y_coordinate: this.form.y_coordinate, // 纬度
                short_name: this.form.short_name, // 企业简称
                parent: '', // 企业父节点
                fax: '', // 传真
                area_id: this.form.countyname_szm,
                area_name: this.form.province + this.form.city + this.form.countyname,
                icbc_card: this.form.shop_mer_id, // 工行开户账号
                username: this.form.account,
                password: this.form.password,
                qydm: this.form.qydm, // 营业执照
                roleId: this.form.role,
                email: this.form.email,
                jgjg:  this.form.jgjg ? this.form.jgjg.join(',') : '', // 监管机构
                tag_ids: tag_ids, // 逗号分隔
            }
            console.log(obj)
            ExamineBasicInfo(obj)
                .then( res =>{
                    if (res.result == true) {
                        this.$message({
                            type: 'success',
                            message: res.message ? res.message : '保存成功', 
                            duration: 8000
                        });
                        this.$router.push({name: 'ExamineMsg'})
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message ? res.message : '保存失败', 
                            duration: 8000
                        });
                    }
                })
                .catch(res=>{
                    console.log(res)
                })
        }, 
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }, 
        // 驳回
        rejectFun(){
            let arr = [], itemObj = {};
            if(this.account_idea){
                itemObj = {
                    attribute: '用户名',
                    notation: this.account_idea,
                }
                arr.push(itemObj)
            }
            if(this.password_idea){
                itemObj = {
                    attribute: '密码',
                    notation: this.password_idea,
                }
                arr.push(itemObj)
            }
            // if(this.enterprise_code_idea){
            //     itemObj = {
            //         attribute: '企业编码',
            //         notation: this.enterprise_code_idea,
            //     }
            //     arr.push(itemObj)
            // }
            if(this.enterprise_name_idea){
                itemObj = {
                    attribute: '企业名称',
                    notation: this.enterprise_name_idea,
                }
                arr.push(itemObj)
            }
            if(this.short_name_idea){
                itemObj = {
                    attribute: '企业简称',
                    notation: this.short_name_idea,
                }
                arr.push(itemObj)
            }
            if(this.qydm_idea){
                itemObj = {
                    attribute: '营业执照号',
                    notation: this.qydm_idea,
                }
                arr.push(itemObj)
            }
            if(this.regId_idea){
                itemObj = {
                    attribute: '身份证号',
                    notation: this.regId_idea,
                }
                arr.push(itemObj)
            }
            // if(this.enterprise_type_idea){
            //     itemObj = {
            //         attribute: '企业类型',
            //         notation: this.enterprise_type_idea,
            //     }
            //     arr.push(itemObj)
            // }
            if(this.node_type_idea){
                itemObj = {
                    attribute: '节点类型',
                    notation: this.node_type_idea,
                }
                arr.push(itemObj)
            }
            if(this.node_detail_type_idea){
                itemObj = {
                    attribute: '节点详细分类',
                    notation: this.node_detail_type_idea,
                }
                arr.push(itemObj)
            }
            if(this.category_idea){
                itemObj = {
                    attribute: '学校类别',
                    notation: this.category_idea,
                }
                arr.push(itemObj)
            }
            if(this.attribute_idea){
                itemObj = {
                    attribute: '学校属性',
                    notation: this.attribute_idea,
                }
                arr.push(itemObj)
            }
            if(this.scale_idea){
                itemObj = {
                    attribute: '企业规模',
                    notation: this.scale_idea,
                }
                arr.push(itemObj)
            }
            if(this.example_idea){
                itemObj = {
                    attribute: '是否为示范企业',
                    notation: this.example_idea,
                }
                arr.push(itemObj)
            }
            if(this.group_name_idea){
                itemObj = {
                    attribute: '集团名称',
                    notation: this.group_name_idea,
                }
                arr.push(itemObj)
            }
            if(this.traceability_type_idea){
                itemObj = {
                    attribute: '可追溯品类',
                    notation: this.traceability_type_idea,
                }
                arr.push(itemObj)
            }
            // if(this.source_way_idea){
            //     itemObj = {
            //         attribute: '流水来源方式',
            //         notation: this.source_way_idea,
            //     }
            //     arr.push(itemObj)
            // }
            if(this.legalRepresent_idea){
                itemObj = {
                    attribute: '法人代表',
                    notation: this.legalRepresent_idea,
                }
                arr.push(itemObj)
            }
            if(this.contacts_idea){
                itemObj = {
                    attribute: '联系人',
                    notation: this.contacts_idea,
                }
                arr.push(itemObj)
            }
            if(this.tel_idea){
                itemObj = {
                    attribute: '联系电话',
                    notation: this.tel_idea,
                }
                arr.push(itemObj)
            }
            if(this.province_id_idea){
                itemObj = {
                    attribute: '省份',
                    notation: this.province_id_idea,
                }
                arr.push(itemObj)
            }
            if(this.city_id_idea){
                itemObj = {
                    attribute: '市',
                    notation: this.city_id_idea,
                }
                arr.push(itemObj)
            }
            if(this.countyname_id_idea){
                itemObj = {
                    attribute: '区/县',
                    notation: this.countyname_id_idea,
                }
                arr.push(itemObj)
            }
            if(this.addr_idea){
                itemObj = {
                    attribute: '经营地址',
                    notation: this.addr_idea,
                }
                arr.push(itemObj)
            }
            if(this.jgjg_idea){
                itemObj = {
                    attribute: '监管机构',
                    notation: this.jgjg_idea,
                }
                arr.push(itemObj)
            }
            // if(this.role_idea){
            //     itemObj = {
            //         attribute: '角色',
            //         notation: this.role_idea,
            //     }
            //     arr.push(itemObj)
            // }
            // if(this.remarks_idea){
            //     itemObj = {
            //         attribute: '备注',
            //         notation: this.remarks_idea,
            //     }
            //     arr.push(itemObj)
            // }
            console.log(arr)
            let obj = {
                url: 'http://m.zhdtech.com/auto_access/#/' + '?id=' + this.ids,
                icon: 2,
                remarkList: arr.length > 0 ? arr : '', //这是个list   attribute  名字  notation备注
                id: this.ids,
            }
            console.log(obj)
            AddRejected(obj)
                .then(res => {
                    console.log(res)
                    if (res.result == true) {
                        this.$message({
                            type: 'success',
                            message: res.message ? res.message : '驳回成功', 
                            duration: 8000
                        });
                        this.$router.push({name: 'ExamineMsg'})
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message ? res.message : '驳回失败', 
                            duration: 8000
                        });
                    }
                })
                .catch(res => {
                    console.log(res)
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
                    if(this.$route.params.traceability_type){
                        this.options1.forEach(val => {
                            if(val.text == this.$route.params.traceability_type){
                                this.form.traceability_type = val.id
                            }
                        })
                    }
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
                    if(JSON.stringify(this.$route.params) != "{}"){
                        let param = this.$route.params;
                        if(param.area_id){
                            let arr = [], area_id = param.area_id;
                            if(area_id.slice(0,2) != '00'){
                                this.form.province_szm = area_id.slice(0,2)+'0000'
                                this.options3.forEach(val => {
                                    if(val.szm == this.form.province_szm){
                                        this.form.province = val.text
                                        this.form.province_id = val.id
                                    }
                                })
                                this.getCodeFun()
                            }
                        }
                    }
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getCodeFun(){  //市
            let data = 'pcode='+this.form.province_id
            GetCode(data)
                .then(res=>{
                    this.options4 = res.data.dataList;
                    if(JSON.stringify(this.$route.params) != "{}"){
                        let param = this.$route.params;
                        if(param.area_id){
                            let arr = [], area_id = param.area_id;
                            if(area_id.slice(0,4) != '0000'){
                                this.form.city_szm = area_id.slice(0,4)+'00'
                                this.options4.forEach(val => {
                                    if(this.form.province_szm == val.szm){
                                        this.form.city_szm = val.szm
                                        this.form.city = val.text
                                        this.form.city_id = val.id
                                    }else{
                                        if(val.szm == this.form.city_szm){
                                            this.form.city = val.text
                                            this.form.city_id = val.id
                                        }
                                    }
                                })
                            }
                            this.getCodeFun1()
                        }
                    }
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        getCodeFun1(){  //县
            let data = 'pcode='+this.form.city_id
            GetCode(data)
                .then(res=>{
                    this.options5 = res.data.dataList;
                    if(JSON.stringify(this.$route.params) != "{}"){
                        let param = this.$route.params;
                        if(param.area_id){
                            let arr = [], area_id = param.area_id;
                            this.form.countyname_szm = area_id
                            this.options5.forEach(val => {
                                if(val.szm == this.form.countyname_szm){
                                    this.form.countyname = val.text
                                    this.form.countyname_id = val.id
                                }
                            })
                        }
                    }
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
        .save-btn{
            margin-top: 30px;
            margin-left: 150px;
            margin: 30px 0 20px 150px;
        }
        .label-width{
            width: 460px;
        }
        .idea{
            margin-top: 5px;
        }
        .comments{
            padding-left: 5px;
            color: #409EFF;
            cursor: pointer;
        }
    }
</style>
<style lang="less">
    .viewExamine{
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
                    width: 100px !important;
                }
            }
        }
    }
</style>