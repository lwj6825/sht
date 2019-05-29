<template>
    <div class="content">
        <el-form ref="form" :model="form" :rules="rules"  label-width="160px" style="margin-left: 150px;">
            <el-form-item label="营业执照号：">
                <el-input v-model="form.licenceNo"></el-input>
                <el-select v-model="value4" clearable placeholder="请选择" v-if="show" @change="selectFun">
                    <el-option
                    v-for="(item) in options"
                    :key="item.biz_id"
                    :label="item.biz_name"
                    :value="item.biz_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="form.regId"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：" prop="boothType">
                <el-select v-model="form.boothType" placeholder="请选择经营范围" @change="boothChange">
                    <el-option  v-for="val in boothArr" :key="val.code" :label="val.name" :value="val.code" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供货单位" prop="ghdw">
                <el-select v-model="form.ghdw" placeholder="请选择供货单位" @change="selectGhdw">
                    <el-option  v-for="val in dwArr" :key="val.ID" :label="val.SUPPLIER_NAME" :value="val.SUPPLIER_NAME" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商名称：" prop="bizName">
                <el-input v-model="form.bizName"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="callphone">
                <el-input v-model="form.callphone"></el-input>
            </el-form-item>
            <el-form-item label="所在地区/地址：" prop="addr">
                <el-cascader class="fill-input" :options="addrOptions" v-model="form.addr" clearable
                    :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
            </el-form-item>
            <el-form-item label="地址：" >
                <el-input class="fill-input" v-model="form.inforAddr" clearable placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="产地：" prop="origin_name">
                <el-cascader class="fill-input" :options="addrOptions" v-model="form.origin_name" clearable
                    :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
            </el-form-item>
            <el-form-item style="margin-left: 160px;">
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getAddr} from '../../js/user/user.js'
import {AddSupplier} from '../../js/district/district.js'
import {insGys,GetCenterBussinessInfo} from "../../js/management/management.js";
import {QuerySuppiler} from '../../js/standingBook/standingBook.js'
export default {
    name: "addSupplier",
    data() {
        return {
            show: false,
            options: [],
            value4: '',
            form: { 
                boothType: '',
                ghdw: '',
                name: '', // 联系人
                callphone: '', // 联系电话
                licenceNo: '', //营业执照号
                bizName: '', // 供应商名称
                regId: '', //身份证号
                origin_name: [], // 产地
                origin_id: '',
                addr: [],// 地址
                inforAddr:'',
            },
            dwArr: [],
            isRegion: '',
            scShopId: '',
            ghdwId: '',
            boothName: '',
            boothArr: [
                { name: '肉类', code: '2005', },
                { name: '蔬菜', code: '1005', },
                { name: '水果类', code: '10061', },
                { name: '禽蛋类', code: '10062', },
                { name: '粮油副食', code: '10063', },
                { name: '酒水饮料', code: '10064', },
                { name: '干货类', code: '10065', },
                { name: '水产类', code: '10066', },
                { name: '其它', code: '1006', },
            ],
            biz_id: '',
            rules: {
                // licenceNo: [
                //     {required: true, message: '请输入营业执照',trigger: 'blur'},
                // ],
                // regId: [
                //     {required: true, message: '请输入身份证号',trigger: 'blur'},
                //     {
                //         pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
                //     }
                // ],
                boothType: [
                  { required: true, message: '请选择经营范围', trigger: 'blur' }
                ],
                ghdw: [
                  { required: true, message: '请选择供货单位', trigger: 'blur' }
                ],
                bizName: [
                    {required: true, message: '请输入供应商名称',trigger: 'blur'}
                ],
                name: [
                    {required: true, message: '请输入联系人',trigger: 'blur'}
                ],
                callphone: [
                    {required: true, message: '请输入手机号',trigger: 'blur'},
                    {validator:function(rule,value,callback){
                        if(/^1[34578]\d{9}$/.test(value) == false){
                            callback(new Error("请输入正确的手机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                areaName: [
                    {required: true, message: '请选择所在地区',trigger: 'change'}
                ],
                addr: [
                    {required: true, message: '请输入详细地址',trigger: 'blur'}
                ],
                origin_name: [
                    {required: true, message: '请输入产地', trigger: 'blur'}
                ],

            },
            addrOptions: [],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            name:'',
            parent:'',
            dataArr: '',
        }
    },
    created() {
        var local = JSON.parse(localStorage.getItem('dataList'));
        this.dataArr = local
    },
    mounted() {
        // 获取地址
        getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
        this.isRegion = localStorage.getItem('isRegion')
        this.scShopId = localStorage.getItem('scShopId');
        this.getGhdwFun()
    },
    watch: {
        'form.licenceNo': function (val) {
            if (val.length == 0) {
                this.show = false
                this.value4 = ''
            } else{
                this.show = true
                this.getYyzhFun()
            } 
        }
    },
    methods: {
         // 供货单位
        getGhdwFun(){
            let region = this.dataArr[0].shop_booth_id;
            if(this.isRegion == 'false'){
                let obj = {
                    shop_booth_id: this.scShopId
                }
                QuerySuppiler(obj)
                    .then(res => {
                        this.dwArr = res.data.suppilerList
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }else{
                let obj = {
                    shop_booth_id: region
                }
                QuerySuppiler(obj)
                    .then(res => {
                        this.dwArr = res.data.suppilerList
                    })
                    .catch(() => {
                        this.$message.error("出错啦!");
                    })
            }
        },
        // 选择供货单位
        selectGhdw(val){
            this.dwArr.forEach((ele)=>{ 
                if(ele.SUPPLIER_NAME == val){
                    this.ghdwId = ele.SUPPLIER_ID;
                    
                }
            })
        },
        selectFun(val){
            if(val == ''){
                this.form.name = ''
                this.form.callphone = ''
                this.form.bizName = ''
                this.biz_id = ''
            }else{
                this.options.forEach((ele)=>{ 
                    if(ele.biz_id == val){
                        this.form.name = ele.legal_represent
                        this.form.callphone = ele.telphone
                        this.form.bizName = ele.biz_name
                        this.biz_id = ele.biz_id
                    }
                })
            }
            console.log(val)
        },
        // 营业执照
        getYyzhFun(){
            let obj = {
                regId: this.form.licenceNo
            }
            GetCenterBussinessInfo(obj)
                .then(res => {
                console.log(res)
                this.options = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 经营范围
        boothChange(val){
            this.boothArr.forEach((ele)=>{ 
                if(ele.code == val){
                    this.boothName = ele.name;
                    
                }
            })
        },
        addSupplierFun(){
            let region = this.dataArr[0].shop_booth_id,
                userId = this.dataArr[0].userId
            let addrArr = [],originArr = [];
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
                }else if(ele.szm == this.form.origin_name[0]){
                    originArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.form.origin_name[1]){
                            originArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.form.origin_name[2]){
                                    originArr.push(ele.caption)                              
                                }
                            })
                        }
                    })
                }
            })
            let obj = {
                callphone: this.form.callphone,
                licenceNo: this.form.licenceNo,
                bizName: this.form.bizName,
                bizId: this.biz_id,
                regId: this.form.regId,
                name: this.form.name,
                areaId: this.form.addr[this.form.addr.length - 1],
                areaName: this.form.inforAddr,
                addr: addrArr.join(""),
                area_origin_id: this.form.origin_name[this.form.origin_name.length -1],//产地
                area_origin_name: originArr.join(''),
                type: "1",
                region: region,
                userId: userId,
                supplier_type: this.boothName, //经营范围
                supplier_code: this.form.boothType,
                ws_supplier: this.form.ghdw, // 供货单位
                ws_supplier_id: this.ghdwId,
                shop_booth_id: this.scShopId
            }
            AddSupplier(obj)
                .then(res => {
                    if (res.result == true) {
                            this.$message.success(res.message);
                            this.$router.push({path:'glSupplier'})  
                        }else{
                            this.$message.error(res.message);
                        }
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
            
        },
        submitForm(formName) {
            
            if(this.form.licenceNo == ''){
                this.$message.error('营业执照号不能为空');
            }else{  
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addSupplierFun()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        getDqfun(){
            GetDq()
                .then(res => {
                    console.log(res)
                })
                .catch(() => {
                    this.$message.error("出错啦!");
                })
        }

    }
}
</script>

<style scoped lang='less'>
    .content{
        padding-top: 50px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
    }
    .el-form{
        margin-left: 100px;
        .el-input,.el-cascader,.el-select{
            width: 280px;
        }
    }
    .el-form-item__content{
        margin-left: 100px;
        margin: 0 auto;
        text-align: center;
    }
    .el-col-2{
        text-align: center;
    }
</style>
