<template>
    <div class="content">
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
            <el-form-item label="企业密钥:" prop="des">
                <el-input class="label-width" v-model="form.des"></el-input>
            </el-form-item> 
            <el-form-item label="节点类型:">
                <el-input class="label-width" v-model="form.nodeType"></el-input>
            </el-form-item> 
            <el-form-item label="节点详细分类:" prop="node_detail_type">
                <el-input class="label-width" v-model="form.node_detail_type"></el-input>
            </el-form-item>     
            <el-form-item label="节点编码-BDP:" prop="BDP">
                <el-input class="label-width" v-model="form.BDP"></el-input>
            </el-form-item>     
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
            <el-form-item label="省份:" prop="province">
                <el-select class="label-width" v-model="form.province" placeholder="请选择省份"  @change="selectGet3"  >
                            <el-option v-for="(item,index) in options3" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="市:" prop="city">
                <el-select class="label-width" v-model="form.city" placeholder="请选择"  @change="selectGet4"  >
                            <el-option v-for="(item,index) in options4" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>      
            <el-form-item label="县:" prop="countyname">
                <el-select class="label-width" v-model="form.countyname" placeholder="请选择"  @change="selectGet5"  >
                            <el-option v-for="(item,index) in options5" :key="index" :label="item.text" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="经营地址:" prop="addr">
                <el-input class="label-width" v-model="form.addr"></el-input>
            </el-form-item> 
            <el-form-item label="经度:" prop="x_coordinate">
                <el-input class="label-width" v-model="form.x_coordinate"></el-input>
            </el-form-item> 
            <el-form-item label="纬度:" prop="y_coordinate">
                <el-input class="label-width" v-model="form.y_coordinate"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:">
                <el-input class="label-width" v-model="form.short_name"></el-input>
            </el-form-item> 
            <el-form-item label="企业父节点:">
                <el-input class="label-width" v-model="form.parent"></el-input>
            </el-form-item> 
            <el-form-item label="传真:" >
                <el-input class="label-width" v-model="form.fax"></el-input>
            </el-form-item> 
        </el-form>
        <el-button class="save-btn" type="primary" @click="save(form)">保存</el-button>
    </div>
</template>

<script>
import {QueryNodeTypeInfoForType,QueryTraceabilityType,QuerySourceWay,QueryProvinceToSelect,GetCode,UpdateNodeState,UpdateBasicInfo,
GetNodeInfo,InsertBasicInfo} from '../../js/nodeManage/nodeManage.js'
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
                countyname_X1:''
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
                    node_id:[{required: true, message: '请输入企业编码', trigger: 'blur'}],
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
                    countyname :[{required: true, message: '请选择县', trigger: 'blur'}]
	             }
        }
    },
    mounted(){
        console.log(this.$route.params)
        if(JSON.stringify(this.$route.params) != "{}"){
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
                }
                else if(this.$route.params.data.basic.traceability_type == '2'){
                      this.form.traceability = '蔬菜'
                       this.form.traceability_type = '蔬菜'
                }
                else if(this.$route.params.data.basic.traceability_type == '3'){
                      this.form.traceability = '猪肉、蔬菜'
                      this.form.traceability_type = '猪肉、蔬菜'
                }
                this.form.remarks = this.$route.params.data.basic.remark;
                // this.form.source_way = this.$route.params.data.basic.source_way;
                if(this.$route.params.data.basic.source_way == '1'){
                      this.form.source_way = '配送'
                }
                else if(this.$route.params.data.basic.source_way == '2'){
                      this.form.source_way = '商务通'
                }
                this.form.regId = this.$route.params.data.basic.reg_id;
                this.form.legalRepresent = this.$route.params.data.basic.legal_represent;
                this.form.contacts = this.$route.params.data.basic.contacts;
                this.form.tel = this.$route.params.data.basic.tel;
                this.form.province = this.$route.params.data.sheng.caption;
                this.form.city = this.$route.params.data.shi.caption
                this.form.countyname = this.$route.params.data.qu.caption
                //
                this.form.addr = this.$route.params.data.basic.addr;
                this.form.x_coordinate = this.$route.params.data.basic.x_coordinate;
                this.form.y_coordinate = this.$route.params.data.basic.y_coordinate;
                this.form.short_name = this.$route.params.data.basic.shortname;
                this.form.parent = this.$route.params.data.basic.parent;
                this.form.fax = this.$route.params.data.basic.fax;
                this.form.type_name = this.$route.params.data.basic.type_name;
                this.form.area_id = this.form.countyname_X1;
                this.form.area_name = this.province_S_text+this.city_text+this.countyname_X_text;
        }
        this.getQueryNodeTypeInfoForType();
        this.getQueryTraceabilityType();
        this.getQuerySourceWay();
        this.getQueryProvinceToSelect();
    },
    methods:{
        selectGet(val){  //企业类型
            if(val){
                this.options.forEach(ele => {
                    if(val == ele.id){
                        this.form.CompanyTypeMsg = ele.id
                    }
                })
            }else{
                this.form.CompanyTypeMsg = ''
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
                        console.log(this.pro.toString())
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
                        console.log(this.city_c.toString())
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
                            type_name:this.form.type_name,
                            area_id:this.form.countyname_X,
                            area_name:this.province_S_text+this.city_text+this.countyname_X_text,
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
                            type_name:this.form.type_name,
                            area_id:this.form.countyname_X,
                            area_name:this.province_S_text+this.city_text+this.countyname_X_text,
                        };
                        console.log(this.form.CompanyType)
                        InsertBasicInfo(data)
                            .then( res =>{
                                this.$message({
                                    message: '恭喜，添加成功',
                                    type: 'success'
                                });
                                this.$router.push({path:'nodeManageMsg'})
                            })
                            .catch(res=>{
                                this.$message.error('出错了.');
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
        width: 450px;
    }
</style>
