<template>
    <div class="content">
        <el-form class="form" ref="form" :model="form" label-width="100px">
            <div class="title">账号信息</div>
            <el-form-item>
                <span class="text">账号：</span>
                <span class="account-text">{{form.account}}</span>
                <span class="text">密码：</span>
                <input type="hidden" v-model="form.password">
                <span style="display:inline-block;min-width:50px;" v-if="form.password">******</span>
                <span style="display:inline-block;min-width:50px;" v-else></span>                
                <!-- <el-button class="reset-password" type="info" plain @click="resetPassword()">重置密码</el-button> -->
            </el-form-item>
            <el-form-item>
                <span class="text">系统角色：</span>
                <span class="role-text">{{form.role}} 
                    <!-- <i class="edit-icon" @click='systemRoleDialog = true'></i> -->
                </span>
                <span class="text">状态：</span>         
                <el-switch
                v-model="form.switchStatus"
                active-text="启用" inactive-text="禁用"
                active-value="1" inactive-value="0" @change="toggleStatus(form.switchStatus)">
                </el-switch>
            </el-form-item>
            <div v-if='!isSuper'>
                <div class="title user-msg">用户信息</div>
                <el-form-item label="营业执照号：" class="padding-left">
                    <span class="info-text">{{form.code}} <i class="edit-icon" @click="codeShow()"></i></span>
                </el-form-item>
                <el-form-item label="企业名称：" class="padding-left">
                <span class="info-text">{{form.companyName}} <i class="edit-icon" @click='companyNameShow()'></i></span>
                </el-form-item>
                <el-form-item label="身份证号：" class="padding-left">
                    <span class="info-text">{{form.idCard}} <i class="edit-icon" @click='idCardShow()'></i></span>
                </el-form-item>
                <el-form-item label="联系人：" class="padding-left">
                    <span class="info-text">{{form.contantName}} <i class="edit-icon" @click="contantNameShow()"></i></span>
                </el-form-item>
                <el-form-item label="联系电话：" class="padding-left">
                <span class="info-text">{{form.phone}} <i class="edit-icon" @click="phoneShow()"></i></span>
                </el-form-item>
                <el-form-item label="地址：" class="padding-left">
                    <span class="info-text">{{form.areaName}}{{form.addr}} <i class="edit-icon" @click="addrShow()"></i></span>
                </el-form-item>
                <!-- <el-form-item label="所属节点：" class="padding-left">
                    <span class="info-text">{{form.node}}</span>
                </el-form-item> -->
            </div>
        </el-form>
        
        <el-dialog title="修改系统角色" :visible.sync="systemRoleDialog" class="edit-msg">
            <el-form :model="systemRoleForm">   
                <el-form-item label="系统角色">
                    <el-select v-model="systemRoleForm.role" placeholder="请选择" clearable>
                        <el-option v-for="item in systemRoleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option> 
                    </el-select>
                </el-form-item>   
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="systemRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="systemRoleDialog = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改营业执照号" :visible.sync="licenseCodeDialog"  class="edit-msg" >
            <el-form :model="licenseCodeForm">   
                <el-form-item label="营业执照号">
                    <el-input class="fill-input" v-model="licenseCodeForm.code" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="licenseCodeDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetCode()">确 定</el-button>
            </div>
        </el-dialog>

         <el-dialog title="修改企业名称" :visible.sync="enterpriseNameDialog"  class="edit-msg" >
            <el-form :model="enterpriseNameForm">   
                <el-form-item label="企业名称">
                    <el-input class="fill-input" v-model="enterpriseNameForm.name" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="enterpriseNameDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetCompanyName()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改身份证号" :visible.sync="idCardDialog"  class="edit-msg" >
            <el-form :model="idCardForm">   
                <el-form-item label="身份证号">
                    <el-input class="fill-input" v-model="idCardForm.idCard" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="idCardDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetIdCard()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改联系人" :visible.sync="contactPeopleDialog"  class="edit-msg" >
            <el-form :model="contactPeopleForm">   
                <el-form-item label="联系人">
                    <el-input class="fill-input" v-model="contactPeopleForm.people" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="contactPeopleDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetContantName()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改联系电话" :visible.sync="contactPhoneDialog"  class="edit-msg" >
            <el-form :model="contactPhoneForm">   
                <el-form-item label="联系电话">
                    <el-input class="fill-input" v-model="contactPhoneForm.phone" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="contactPhoneDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetPhone()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改所属节点" :visible.sync="nodeDialog"  class="edit-msg" >
            <el-form :model="nodeForm">   
                <el-form-item label="所属节点">
                    <el-input class="fill-input" v-model="nodeForm.node" clearable auto-complete="off"></el-input>
                </el-form-item>   
            </el-form>            
            <div slot="footer" class="dialog-footer">
                <el-button @click="nodeDialog = false">取 消</el-button>
                <el-button type="primary" @click="nodeDialog = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="地址" :visible.sync="addrDialog">
            <el-form :model="addrForm">               
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-cascader :options="addrOptions" v-model="addrForm.addr" clearable style="width:260px;"
                        :props="props" change-on-select placeholder='省/市/县'> </el-cascader>
                    <el-input class="info-addr" v-model="addrForm.addrInfo" clearable placeholder="请输入详细地址"></el-input>
                </el-form-item> 
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="addrDialog = false">取 消</el-button>
                <el-button type="primary" @click="resetAddr()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getAddr,editUser,GetAllNode,UpdateState} from '../../js/user/user.js'
import {getRoleList} from '../../js/role/role.js'
export default {
    name:"loolInfo",
    data(){
        return{
            activeIconClass:true,
            inActiveIconClass:false,
            form:{
                account:'',
                password:'',
                role:"",
                roleId:'',
                switchStatus:true,
                code:'',
                companyName:'',
                idCard:'',
                contantName:'',
                phone:'',
                areaId:'',
                areaName:'',
                addr:'',
                node:'',
                shopBoothId:'',
                userId:'',
            },
            value3: true,
            formLabelWidth: '120px',
            systemRoleDialog:false,//修改系统角色
            systemRoleForm:{
                role:'',
            },
            systemRoleOptions:[],
            
            licenseCodeDialog:false,//修改执照号
            licenseCodeForm:{
                code:'',
            },

            enterpriseNameDialog:false,//修改企业名字
            enterpriseNameForm:{
                name:'',
            },  

            idCardDialog:false,//修改身份证号
            idCardForm:{
                idCard:''
            },

            contactPeopleDialog:false,//修改联系人
            contactPeopleForm:{
                people:''
            },

            contactPhoneDialog:false,//修改联系电话
            contactPhoneForm:{
                phone:''
            },

            nodeDialog:false,//修改所属节点
            nodeForm:{
                node:''
            },

            addrDialog: false,//修改地址            
            addrForm: {
                addr:[],
                addrInfo:'',
            },            
            addrOptions: [],
            props:{
                label: 'caption',
                value:'szm',
                children: 'list'
            },
            isLook:false,
            isSuper:false,
            nodeOptions: [
                {
                    value: '110114107',
                    label: '水屯批发市场'
                }
            ]
        }        
    },
    mounted(){
        console.log(this.$route.params.row)
        if(this.$route.params.row.roleId == 1){
            this.isSuper = true;

            this.form.code='';
            this.form.companyName='';
            this.form.idCard='';
            this.form.contantName='';
            this.form.phone='';
            this.form.areaId='',
            this.form.areaName='',
            this.form.addr='';
            this.form.shopBoothId = '';
            this.form.userId = '';
            this.form.node = '';
        }
        if(this.$route.params.row.roleId != 1 && this.$route.params.row.userName){
            this.isSuper = false;
            this.form.isLook = true;            
            this.form.account=this.$route.params.row.userName;
            this.form.password=this.$route.params.row.password;
            this.form.role=this.$route.params.row.roleName;
            this.form.roleId = this.$route.params.row.roleId;
            if(this.$route.params.row.scbj == '启用'){
                this.form.switchStatus = '1'
            }else{
                this.form.switchStatus = '0'
            }      
            if(this.$route.params.row.bootList.length > 0){ 
                this.form.code=this.$route.params.row.bootList[0].licenceNo;    
                this.form.companyName=this.$route.params.row.bootList[0].booth_name;
                this.form.idCard=this.$route.params.row.bootList[0].regId;
                this.form.contantName=this.$route.params.row.bootList[0].contacts;
                this.form.phone=this.$route.params.row.bootList[0].callphone;
                this.form.areaId=this.$route.params.row.bootList[0].area_id,
                this.form.areaName=this.$route.params.row.bootList[0].area_name,
                this.form.addr=this.$route.params.row.bootList[0].addr;
                this.form.shopBoothId = this.$route.params.row.bootList[0].shop_booth_id;
            }
            this.form.userId = this.$route.params.row.userId;
            if(this.$route.params.row.roleId == '3'){
                if(this.$route.params.row.bootList[0].node_id == '110114107'){
                    this.form.node = '水屯批发市场';
                }
            }
            if(this.$route.params.row.roleId == '2'){
                if(this.$route.params.row.node_id == '110114107'){
                    this.form.node = '水屯批发市场';
                }
            }
        }
        // 获取系统角色
        let pageData = {
            page:'1',
            cols:'15',
            roleName:'',            
        }
        getRoleList(pageData)
            .then(res => {
                this.systemRoleOptions = res.data.roleList;
            })
            .catch(res => {
                console.log(res)
            })
        // 获取地址
        getAddr()
            .then(res => {
                this.addrOptions = res.data.dataList
            })
            .catch(res => {
                console.log(res)
            })
    },    
    methods:{
        getNodeFun(){
            GetAllNode()
                .then(res => {
                    console.log(res)
                    this.nodeOptions = res.data.dataList
                })
                .catch(res => {
                    console.log(res)
                })
        },
        resetPassword() {
            // 暂时不让修改密码
            let data = {
                userName:this.form.account,
                // password:this.form.password,
                password:'000000',
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                nodeName:this.form.companyName,
                regId:this.form.idCard,  
                name:this.form.contantName,
                callphone:this.form.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,                
            }
            editUser(data)
                .then(res => {
                    // console.log(res)
                    this.$router.push({path:'userList'})
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                })
                .catch(res => {
                    console.log(res)
                })
            // this.$confirm('是否要重置该账号的密码？', '确认提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$alert('密码已重置为初始密码000000。', '重置密码', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 this.form.password = '000000'
            //                  this.$message({
            //                     type: 'success',
            //                     message: '重置成功!'
            //                 });
            //             }
            //         });
                   
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });          
            //     });
        },
        toggleStatus(e){     
            let data = {
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,   
                state: e,  
            }
            UpdateState(data)
                .then(res => {
                    if(res.result == true){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }else{
                        this.$message({
                            type: 'warring',
                            message: '修改失败'
                        });
                    }
                })
                .catch(res => {
                    console.log(res)
                })
                
        },
        //展示营业执照号
        codeShow(){
            this.licenseCodeForm.code=this.form.code;
            this.licenseCodeDialog = true
        },
        //修改营业执照号
        resetCode(){
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                // licenceNo:this.form.code,
                licenceNo:this.licenseCodeForm.code,
                nodeName:this.form.companyName,
                regId:this.form.idCard,  
                name:this.form.contantName,
                callphone:this.form.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.licenseCodeDialog = false;
                        this.form.code = this.licenseCodeForm.code;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.licenseCodeDialog = false;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })

            
        },
        // 展示企业名称
        companyNameShow(){
            this.enterpriseNameForm.name = this.form.companyName;
            this.enterpriseNameDialog = true
        },
        // 修改企业名称
        resetCompanyName(){
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                // nodeName:this.form.companyName,
                nodeName:this.enterpriseNameForm.name,
                regId:this.form.idCard,  
                name:this.form.contantName,
                callphone:this.form.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }            
            // console.log(data)
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.enterpriseNameDialog = false;
                        this.form.companyName = this.enterpriseNameForm.name;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.enterpriseNameDialog = false;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 展示身份证号
        idCardShow(){
            this.idCardForm.idCard = this.form.idCard;
            this.idCardDialog = true;
        },
        // 修改省份证号
        resetIdCard(){
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                nodeName:this.form.companyName,
                // regId:this.form.idCard,  
                regId:this.idCardForm.idCard,  
                name:this.form.contantName,
                callphone:this.form.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }            
            // console.log(data)
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.idCardDialog = false ;
                        this.form.idCard = this.idCardForm.idCard;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.idCardDialog = false;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 展示联系人
        contantNameShow(){
            this.contactPeopleForm.people = this.form.contantName;
            this.contactPeopleDialog = true;
        },
        // 修改联系人
        resetContantName(){
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                nodeName:this.form.companyName,
                regId:this.form.idCard,   
                // name:this.form.contantName,
                name:this.contactPeopleForm.people,
                callphone:this.form.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }            
            // console.log(data)
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.contactPeopleDialog = false ;
                        this.form.contantName = this.contactPeopleForm.people;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.contactPeopleDialog = false;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 展示联系电话
        phoneShow(){
            this.contactPhoneForm.phone = this.form.phone;
            this.contactPhoneDialog = true;
        },
        // 修改联系电话
        resetPhone(){
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                nodeName:this.form.companyName,
                regId:this.form.idCard,   
                name:this.form.contantName,
                // callphone:this.form.phone,
                callphone:this.contactPhoneForm.phone,
                areaId:this.form.areaId,
                areaName:this.form.areaName,
                addr:this.form.addr,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }            
            // console.log(data)
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.contactPhoneDialog = false ;
                        this.form.phone = this.contactPhoneForm.phone;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.contactPhoneDialog = false;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 展示地址
        addrShow(){
            // console.log(this.form.areaId)
            // let oneLevel = this.form.areaId.slice(0,2);
            // let towLevel = this.form.areaId.slice(2,4);
            // let threeLevel = this.form.areaId.slice(4,6);
            // let addrArr = [];
            // this.addrOptions.forEach(ele => {
            //     if(ele.szm == oneLevel+"0000"){
            //         // addrArr.push(ele.caption)
            //         addrArr.push(ele.szm);
            //         ele.list.forEach(ele=>{
            //             if(ele.szm == oneLevel+towLevel+'00'){
            //                 // addrArr.push(ele.caption)
            //                 addrArr.push(ele.szm)
            //                 ele.list.forEach(ele=>{
            //                     if(ele.szm == oneLevel+towLevel+threeLevel){
            //                         // addrArr.push(ele.caption)
            //                         addrArr.push(ele.szm)
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // })
            let oneLevel = this.form.areaId.slice(0,2);
            let towLevel = this.form.areaId.slice(2,4);
            let threeLevel = this.form.areaId.slice(4,6);
            let addrArr = [];
            this.addrOptions.forEach(ele => {
                if(oneLevel == 11 || oneLevel == 12 || oneLevel == 50 || oneLevel == 31 || oneLevel == 81 || oneLevel == 82){
                    if(ele.szm == oneLevel + "0000"){
                        addrArr.push(ele.szm);
                        ele.list.forEach(ele=>{
                            if(ele.szm == oneLevel + "0000"){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele=>{
                                    if(ele.szm == oneLevel+towLevel+threeLevel){
                                        addrArr.push(ele.szm)
                                    }
                                })
                            }
                        })
                    }
                }else{
                    if(ele.szm == oneLevel+"0000"){
                        addrArr.push(ele.szm);
                        ele.list.forEach(ele=>{
                            if(ele.szm == oneLevel+towLevel+'00'){
                                addrArr.push(ele.szm)
                                ele.list.forEach(ele=>{
                                    if(ele.szm == oneLevel+towLevel+threeLevel){
                                        addrArr.push(ele.szm)
                                    }
                                })
                            }
                        })
                    }
                }
                
            })
            this.addrForm.addr = addrArr;
            this.addrForm.addrInfo = this.form.addr;
            this.addrDialog = true;
        },
        // 修改地址
        resetAddr(){            
            let addrArr = [];
            this.addrOptions.forEach(ele => {
                if(ele.szm == this.addrForm.addr[0]){
                    addrArr.push(ele.caption)
                    ele.list.forEach(ele => {
                        if(ele.szm == this.addrForm.addr[1]){
                            addrArr.push(ele.caption)
                            ele.list.forEach(ele => {
                                if(ele.szm == this.addrForm.addr[2]){
                                    addrArr.push(ele.caption)
                                    
                                }
                            })
                        }
                    })
                }
            })
            // console.log(addrArr)
            let data = {
                userName:this.form.account,
                password:this.form.password,
                roleId:this.form.roleId,                
                state:this.form.switchStatus,
                licenceNo:this.form.code,
                nodeName:this.form.companyName,
                regId:this.form.idCard,   
                name:this.form.contantName,
                callphone:this.form.phone,
                // areaId:this.form.areaId,
                areaId:this.addrForm.addr[2],
                // areaName:this.form.areaName,
                areaName:addrArr.join(''),
                // addr:this.form.addr,                
                addr:this.addrForm.addrInfo,                
                nodeId:this.form.node,   
                shop_booth_id:this.form.shopBoothId,
                userId:this.form.userId,      
            }            
            // console.log(data)
            editUser(data)
                .then(res => {
                    if(res.result){
                        this.addrDialog = false;;
                        this.form.areaId = this.addrForm.addr[2];
                        this.form.areaName = addrArr.join('');
                        this.form.addr = this.addrForm.addrInfo;
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    }else{
                        this.addrDialog = false;;
                        this.$message({
                            type: 'warring',
                            message: res.message
                        });
                    }
                    
                })
                .catch(res => {
                    console.log(res)
                })
        },
        
    },
    // computed: {
    //     switchStatus() {
    // 　　　　return this.form.switchStatus
    // 　　}
    // },
    // watch:{
    //     switchStatus(){    
    //         if(value){
    //             this.activeIconClass=true
    //             this.inActiveIconClass=false
    //         }else{
    //             this.activeIconClass=false
    //             this.inActiveIconClass=true
    //         }   
    //     }
    // }
}
</script>
<style scoped lang='less'>
    .content{
        padding: 30px 30px 0;
        height: 100%; 
        background: #fff;
        box-sizing: border-box;
        .form{
            color: #606266;
            font-size: 14px;
            .fill-input{
                width: 260px;
            }
            .el-form-item{
                margin-bottom: 10px;
            }            
            .text{
                display: inline-block;
                width: 80px;
                text-align: right;
            }
            .title{
                margin-bottom: 10px;
                &.user-msg{
                    margin-top: 30px;
                }
            }
            .account-text,.role-text{
                display: inline-block;
                width: 200px;
            }
            .reset-password{
                margin-left: 10px;
                padding: 7px 9px;
                font-size: 13px;
            }
            .info-text{
                display: block;
                width: 400px;
                .edit-icon{
                    margin-top: 10px;
                    float: right;
                }
            }
        }
        .edit-icon{
            display: inline-block;
            margin-left: 10px;
            width: 17px;
            height: 17px;
            vertical-align: sub;
            background: url('../../assets/images/u8505.png') no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
        .padding-left{
            padding-left: 90px;
        }
        .info-addr{
            margin-top: 20px;
            display: block;
            width: 260px;
        }
        

    }
</style>
<style lang='less'>
    
    .inactive-icon-class .el-switch__label--left,.active-icon-class .el-switch__label--right{   
        display: none;
    }

    .el-cascader-menu{
        height: 160px;
    }

    .edit-msg{
        .el-dialog{
            width: 360px;
        }
        .fill-input{
            width:200px;
        }
        .dialog-footer{
            text-align:center;
        }
    }
</style>
