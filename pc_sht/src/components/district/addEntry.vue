<template>
  <div class="content">
    <div class="section-content">
        <el-form  label-width="120px" :model="form" ref="form" :rules="rules" style="width: 500px;margin-left: 150px;">
            <el-form-item label="商品名称：" prop="goodsName">
                <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="品种："  prop="selectVarieties">
                <el-cascader :options="systemDefaultType" filterable @change="handleChange" placeholder="可搜索" :props="props"
                    change-on-select v-model="form.selectVarieties"></el-cascader>
            </el-form-item>
            <el-form-item label="价格：" prop="price">
                <el-input v-model="form.price" style="width: 240px;"></el-input>
                <span >&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="单位：" prop="specifications">
                <el-select v-model="form.specifications"  placeholder="未选择"  @change="selectChange" style="width: 380px;">
                    <el-option  v-for="item in specificationList" :key="item.TYPE_NAME" :label="item.TYPE_NAME"  :value="item.TYPE_NAME" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格：" v-show="isShow">
                <el-input style="width: 91px" v-model="form.input"></el-input>
                <el-select v-model="form.unit" style="width: 90px" placeholder="未选择">
                    <el-option  v-for="item in form.unitList" :key="item.id" :label="item.name"  :value="item.name"  >
                    </el-option>
                </el-select>
                <el-input style="width: 80px;text-align: center" :disabled="true" :value="form.unit" placeholder="/箱" v-model="form.goodsUnit"></el-input>
            </el-form-item>
            <el-form-item label="供应商：" prop="suppliersId">
                <el-select v-model="form.suppliersId" placeholder="请选择供应商" @change="selectSuppliers">
                    <el-option  v-for="item in suppliersList" :key="item.shop_concacts_id" :label="item.biz_name"  :value="item.shop_concacts_id" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产地：" prop="addr">
                <el-cascader :options="addrOptions" v-model="form.addr" placeholder="省/市/县" class="address" clearable :props="propes" change-on-select></el-cascader>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" class="new-add" @click="submitForm('form')" >保存</el-button>
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script>
import {getDefaultProductTypes,allSuppliers,allSpecification} from "../../js/goods/goods.js";
import {GetSupplier,AddEntry} from '../../js/district/district.js'
import {getAddr} from '../../js/user/user.js';
export default {
    name: "addEntry",    
    data() {
        return {
            isShow:true,
            //产品分类--系统默认提供
            systemDefaultType:[],
            props: {
                value: 'level_id',
                label: 'type_name',
                children: 'systemDefaultTypeList'
            },
            form: {
                goodsID:'',
                selectVarieties:[],
                goodsName:"",
                gbCode:"",
                gbName:"",
                price:"",
                goodsUnit:"",
                input:"",
                specifications:"",
                unit:'',
                addr: [],//地址
                unitList:[
                    {
                        id:'00',
                        name:'斤',
                    },
                    {
                        id:'01',
                        name:'公斤',
                    },
                    {
                        id:'02',
                        name:'g',
                    },
                    {
                        id:'03',
                        name:'kg',
                    },
                    {
                        id:'04',
                        name:'ml',
                    },
                    {
                        id:'05',
                        name:'L',
                    }
                ],
                suppliersId:"",
                suppliersName:"",
            },
            addrOptions:[],
            propes:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            suppliersList:[],
            specificationList:[],
            rules: {
                goodsName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                selectVarieties: [
                    { required: true, message: '请选择品种', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' }
                ],
                specifications: [
                    { required: true, message: '请选择包装规格', trigger: 'change' }
                ],
                suppliersId: [
                    { required: true, message: '请选择供应商', trigger: 'change' }
                ],
                addr: [
                    { required: true, message: '请选择产地', trigger: 'change' }
                ]
            },
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
    },
    mounted() {
        this.initData();
        this.getAddrList()
        if(JSON.stringify(this.$route.query) !== "{}"){       
            this.form.goodsName = this.$route.query.GOODS_NAME;
            let str = this.$route.query.level_id;
            this.form.selectVarieties = [str.slice(0,2),str.slice(0,5),str.slice(0,8)];
            this.form.gbCode = str.slice(0,8);
            this.form.price = this.$route.query.PRICE;
            this.form.specifications = this.$route.query.GOODS_UNIT;
            if(this.form.specifications == '斤' || this.form.specifications =='公斤'){
                this.isShow = false;
                this.form.input = '';
            }else{
                this.isShow = true;
                this.form.input = this.$route.query.COUNT;
                this.form.unit = this.$route.query.SPECIFICATIONS;          
            }
            this.form.suppliersName = this.$route.query.SUPPLIERS_NAME;
            this.form.goodsID = this.$route.query.ID;
        }
    },
    methods: {
        getAddrList(){//获取地区列表
            getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
        },
        addEntryFun(){
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
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId;
            let params = {
                id:'',
                goodsName:this.form.goodsName,
                gbCode:this.form.gbCode,
                price:this.form.price,
                goodsUnit:this.form.specifications,
                specifications:this.form.unit,
                count:this.form.input,
                suppliersId:this.form.suppliersId,
                suppliersName:this.form.suppliersName,
                userId: userId,
                region: region,
                areaOriginId: this.form.addr[this.form.addr.length-1],
                areaOriginNname: addrArr.join(""),
            };
            AddEntry(params)
                .then(res => {
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({path:'glCommodity'});
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addEntryFun()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleChange(value) {
            this.form.gbCode =value[value.length - 1];
        },
        selectChange(value) {//选择单位
            if(value == "斤" || value == "公斤"){
                this.isShow = false;
                this.form.input = '';
            }else {
                this.isShow = true;
            }
            this.form.goodsUnit = value;
        },
        selectSuppliers(val){//选择供应商
            this.suppliersList.forEach((ele)=>{ 
                if(ele.SHOP_CONCACTS_ID === val){
                    this.form.suppliersName = ele.BIZ_NAME;
                }
            })
        },
        //查询品种列表
        systemDefaultTypeLists(){
            getDefaultProductTypes()
                .then(res =>{
                    this.systemDefaultType = res;
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        //查询供应商列表
        getAllSuppliers(){
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let obj = {
                page: this.page,
                cols: '100',
                userId: userId,
                type: "1",
                concact_name: "",
                region: region,
                biz_name: "",
                shop_booth_id: region
            }
            GetSupplier(obj)
                .then(res => {
                    this.suppliersList = res.data.dataList
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        //查询包装规格列表
        getAllSpecification(){
            allSpecification()
                .then(res =>{
                    this.specificationList = res.data.specificationList;
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        },
        initData() {
            //查询商品品种三级列表
            this.systemDefaultTypeLists()
            //查询供应商列表
            this.getAllSuppliers()
            //查询规格列表
            this.getAllSpecification()

        }
    }
  };
</script>

<style rel="stylesheet/less" lang='less' scoped>
    .el-input,.el-cascader,.el-select{
        width: 380px;
    }
  .content {
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    .section-content{
      margin-top: 50px;
    }
    .new-add{
      margin-top: 30px;
    }
  }
</style>
