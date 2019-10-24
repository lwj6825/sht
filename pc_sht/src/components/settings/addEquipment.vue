<template>
    <div class="content">
        <div class="form-panal">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label='设备状态' style="margin-bottom:10px;">
                    <el-switch v-model="form.equipmenStatus" active-text="启用" inactive-text="禁用"> </el-switch>
                </el-form-item>
                <el-form-item label="设备信息编号" prop="equipmenName">
                    <el-input v-model="form.equipmenName" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="摊位号" prop="boothNum" >
                    <el-input v-model="form.boothNum" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="摊位名称" prop="boothName">
                    <el-input v-model="form.boothName" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="商户名称" prop="name">
                    <el-input style='width:260px;color:#333;' v-model="form.name" placeholder="请搜索" :disabled='true'></el-input>
                    <span class="search-name" @click="showBizFun">查</span>                        
                </el-form-item>
                <el-form-item label="设备生产厂家" prop="factory">
                    <el-select class="input" v-model="form.factory" placeholder="请选择">
                        <el-option v-for="item in factoryOptions" :key="item.code" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备IP"  prop="ip">
                    <el-input v-model="form.ip" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="ICCID">
                    <el-input v-model="form.iccid" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="计量单位" prop="unit">
                    <el-select v-model="form.unit" placeholder="请选择" clearable>
                        <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="秤服ws地址">
                    <el-input v-model="form.ws" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="网关">
                    <el-input v-model="form.wg" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="ssid">
                    <el-input v-model="form.ssid" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="footer-btn">
                        <el-button class="submit-btn" type="primary" @click="formConfirm('form')">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>                
        </div>
        <div class="panal" v-show="!showShopName">
            <div class="select-panal" >
                <header class="title">
                    <span>商户名称列表</span><i class="close" @click='closeShowShopName()'>x</i>
                </header>
                <el-form ref="form" :inline="true" :model="form2" label-width="80px">
                    <el-form-item label="商户名称">
                        <el-input type="text" clearable v-model="form2.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn white-bth" @click="searchFun">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData" border style="width: 100%;" height='380'>
                    <el-table-column prop="booth_name" label="名称" :formatter='boothNameFormat'> </el-table-column>
                    <el-table-column prop="addr" label="地址" :formatter='addrFormat' width='420'> </el-table-column>
                    <el-table-column label="操作" width='120'>
                        <template slot-scope="scope">
                            <el-button @click="selectCurrShop(scope.row)" type="text" size="small">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination v-if="dataTotal" background @current-change="handleCurrentChange" :current-page.sync="page"
                        :page-size="cols" layout="total, prev, pager, next, jumper" :total='dataTotal'>
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    PrintFastKey,
} from '../../js/settings/settings.js'
export default {
    name:'AddEquipment',
    data(){
        return {
            form:{
                ws: '',
                wg: '',
                ssid: '',
                password: '',
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
            rules: {
                // name: [
                //     { required: true, message: '请输入活动名称', trigger: 'blur' },
                //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                equipmenName:[
                    { required: true, message: '请输入设备信息编号', trigger: 'blur' }
                ],
                boothNum:[
                    {required:true,message:'请输入摊位号',trigger:'blur'}
                ],
                boothName:[
                    {required:true,message:'请输入摊位名称',trigger:'blur'}
                ],
                name:[
                    {required:true,message:'请选择商户名称'}
                ],
                factory:[
                    {required:true,message:'请选择设备生产厂家',trigger:'change'}
                ],
                ip:[
                    {required:true,message:'请输入设备IP',trigger:'blur'}
                ],
                iccid:[
                    {required:true,message:'请输入设备ICCID',trigger:'blur'}
                ],
                unit:[
                    {required:true,message:'请选择计量单位',trigger:'change'}
                ],
            },
            factoryOptions:[],
            unitOptions: [
                { value: '1', label: '斤' }, 
                { value: '0', label: '公斤' },
            ],
            showShopName:true,
            tableData: [],
            currentPage:1,
            dataTotal:0,
            page:1,
            cols:15,
            total:'',
            userId:2,
            areaId: '',
            equipmenId:'',//编辑时设备ID
            equipmenBoothId:'',//编辑时设备下的boothID
            form2: {
                name: ''
            }
        }
    },
    created(){
        this.userId = localStorage.getItem('userId');          
    },
    mounted() {
        if(this.$route.params.row){
            let param = this.$route.params
            this.form.equipmenStatus = param.row.STATE == 0 ? true:false;
            this.form.equipmenName = param.row.DEVICENO;
            this.form.boothNum = param.row.BOOTH_NO;
            this.form.boothName = param.row.BOOTH_NAME;
            this.form.name = param.row.BIZ_NAME;
            this.form.factory = param.row.FACTORY;
            this.form.ip = param.row.IP;
            this.form.iccid = param.row.ICCID;
            this.form.unit = param.row.UNIT;
            this.equipmenId = param.row.ID;
            this.equipmenBoothId = param.row.SHOP_BOOTH_ID     
            this.form.ws = param.row.WS
            this.form.wg = param.row.WG
            this.form.ssid = param.row.SSID
            this.form.password = param.row.PASSWORD
        }
        this.areaId = this.$route.params.areaId
        this.getFactory();//获取生产厂家
    },
    methods: {
        getFactory(){//获取生产厂家
            EquipmentManagementFactory()
                .then(res => {
                    this.factoryOptions = res.data.dataList;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        searchName(){//新增页查询商户名称
            let data = {
                page:this.page,
                cols:this.cols,
                total:this.total,
                userId:this.userId,
                name: '',
                boothName: this.form2.name,
                stall_no:"",
                region: this.areaId
            }
            MerchantsName(data)
                .then(res => {
                    // console.log(res)
                    this.tableData = res.data.dataList;
                    this.dataTotal = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        showBizFun(){
            this.page = 1
            this.showShopName = false;
            this.searchName()
        },
        formConfirm(formName){//设备信息提交按钮            
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.equipmenId && !this.equipmenBoothId){
                        // 新增
                        let data={
                            userId:this.userId,
                            state:this.form.equipmenStatus == true ? 0 : 1,
                            deviceno:this.form.equipmenName,
                            booth_no:this.form.boothNum,
                            booth_name:this.form.boothName,
                            shop_booth_id:this.merchantsNameId,
                            factory:this.form.factory,
                            ip:this.form.ip,
                            ICCID:this.form.iccid,
                            unit:this.form.unit,
                            ws: this.form.ws,
                            wg: this.form.wg,
                            ssid: this.form.ssid,
                            password: this.form.password
                        }
                        console.log(data)
                        NewAddEquipment(data)
                            .then(res => {
                                this.$message.success('添加成功');
                                this.$router.push('equipmentMsg')
                            })
                            .catch(res => {
                                this.$message.warning(res.message)
                            })
                    }else{
                        let obj = {
                            id:this.equipmenId,
                            state:this.form.equipmenStatus == true?0:1,
                            deviceno:this.form.equipmenName,
                            booth_no:this.form.boothNum,
                            booth_name:this.form.boothName,
                            shop_booth_id:this.equipmenBoothId,
                            factory:this.form.factory,
                            ip:this.form.ip,
                            ICCID:this.form.iccid,
                            unit:this.form.unit,
                            ws: this.form.ws,
                            wg: this.form.wg,
                            ssid: this.form.ssid,
                            password: this.form.password
                        }
                        EditEquipment(obj)
                            .then(res => {
                                if (res.result == true) {
                                    this.$message.success(res.message);
                                    this.$router.push('equipmentMsg')
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            .catch(res => {
                                console.log(res)
                                this.$message.warning('修改失败！')
                            })
                    }
                } else {
                    this.$message.warning("出错了")
                }
            });
        },
        closeShowShopName(){//关闭选择商户名称
            this.form2.name = ''
            this.showShopName = true;
        },
        selectCurrShop(item){//选择此商铺
            // console.log(item)
            this.showShopName = true;
            this.form.name = item.bootList[0].booth_name;
            this.merchantsNameId = item.bootList[0].shop_booth_id
        },
        
        boothNameFormat(row){//商户名称格式化
            return row.bootList[0].booth_name;
        },
        handleCurrentChange(val) { //currentPage 改变时会触发
            this.page = val
            this.searchName()
        },
        addrFormat(row){//地址格式化
            return row.bootList[0].area_name;
        },
        searchFun(){
            this.page = 1
            this.searchName()
        }
    }
    
}
</script>

<style scoped lang="less">
    .content{
        height: 100%;
        box-sizing: border-box;
        .panal{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,.5);
            z-index: 1001; 
        }
        .form-panal{
            box-sizing: border-box;
            background: #fff;
            padding-left: 100px;
        }
        .select-panal{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-400px) translateY(-250px);
            padding: 10px;
            box-sizing: border-box;
            width: 800px;
            height: 570px;
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
</style>