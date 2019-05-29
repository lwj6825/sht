<template>
  <div class="content" ref="content">  
      <div class="msg-title first-title" ref="title">账号信息</div>      
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" >
        <div class="account-msg" ref="accoutnMsg">
            <div class="account-cont">
                <el-row class="demo-autocomplete">
                    <el-col :span="6" style="margin-left: 0;">
                        <el-form-item label="账号：" prop="account">
                            <el-input v-model="form.account"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="密码：" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <!--<el-form-item label="角色" prop="role">
                            <el-select v-model="form.role" placeholder="请选择" :disabled="isDisabled">
                              <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"> </el-option>
                            </el-select>
                        </el-form-item>-->
                    </el-col>
                </el-row>
                <el-row class="demo-autocomplete">
                    <el-col :span="6" style="margin-left: 0;">
                        <el-form-item label="联系人：" prop="people">
                            <el-input v-model="form.people"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <div class="msg">
                        <el-form-item label="联系方式：" prop="telphone">
                          <el-input v-model="form.telphone"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox-group  v-model="form.value">
                            <el-checkbox label="1" name="type" value="1">是否向商户发送短信告知账号信息</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="1">
                        <!--<el-form-item>
                            <el-checkbox-group  v-model="form.value">
                                <el-checkbox label="1" name="type" value="1">是否向商户发送短信告知账号信息</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>-->
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="msg-title first-title">商铺信息</div>
        <div class="shop-msg">
          <div class="box" ref="addShop">
            <div class="shop-name" v-show="showShopListName">
              <el-button v-for="item in shopList" :key="item.index" @click='lookThis(item.shopBoothId)' 
                :class="{current:item.shopName == lookShopName}" type="primary" class="btn">{{item.shopName}}</el-button>
            </div>
            <el-button type="primary" class="btn add-btn" :class="{current:active}" @click='addShop'>添加商铺</el-button>
          </div>
          <div class="form-content" v-show="!selectAddShop">
            <!-- 展示商铺信息 -->
            <div class="infor-msg" v-show="!isEdit">
              <div class="section">
                <span class="item-name">营业执照号：</span>
                <span class="item-msg">{{lookMsg.licenceNo}}</span>
              </div>
              <div class="section">
                <span class="item-name">身份证号：</span>
                <span class="item-msg">{{lookMsg.regId}}</span>
              </div>
              <div class="section">
                <span class="item-name">商户名称：</span>
                <span class="item-msg">{{lookMsg.nodeName}}</span>
              </div> 
              <div class="section">
                <span class="item-name">企业名称：</span>
                <span class="item-msg">{{lookMsg.corporate_name}}</span>
              </div> 
              <div class="section">
                <span class="item-name">联系人：</span>
                <span class="item-msg">{{lookMsg.name}}</span>
              </div>
              <div class="section">
                <span class="item-name">联系电话：</span>
                <span class="item-msg">{{lookMsg.callphone}}</span>
              </div>
              <div class="section addr">
                <span class="item-name">地址：</span>
                <span class="item-msg">{{lookMsg.addr}}</span>
                <span class="item-msg">{{lookMsg.addrInfo}}</span>
              </div>
              <div class="section">
                <span class="item-name">摊位号：</span>
                <span class="item-msg">{{lookMsg.stallNo}}</span>
              </div>
              <div class="section">
                <el-button type="primary" @click="modifyMsg(lookMsg.nodeName)">修改</el-button>
              </div>
            </div>
            <!-- 编辑查看 -->
            <el-form :model="editForm" class="form" label-width="120px" v-show="isEdit">
              <el-form-item label="营业执照号：">
                <el-input v-model="editForm.licenceNo"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：">
                <el-input v-model="editForm.regId"></el-input>
              </el-form-item>
              <el-form-item label="商户名称：" prop="nodeName" >
                <el-input v-model="editForm.nodeName"></el-input>
              </el-form-item>
              <el-tooltip class="item" effect="dark" content="营业执照上的名称" placement="top-start">
                <el-form-item label="企业名称：" prop="corporate_name" >
                  <el-input v-model="editForm.corporate_name" clearable></el-input>
                </el-form-item>
              </el-tooltip>
              <el-form-item label="联系人：" prop="name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="callphone">
                <el-input v-model="editForm.callphone"></el-input>
              </el-form-item>
              <el-form-item label="地址：" prop="addr">
                <el-cascader class="address" :options="addrOptions" v-model="editForm.addr" placeholder="省/市/县" 
                  clearable :props="props" change-on-select></el-cascader>
                <el-input v-model="editForm.addrInfo" placeholder="请输入详细地址"></el-input>
              </el-form-item>
              <el-form-item label="摊位号：" prop="stallNo">
                <el-input style="width: 70%" v-model="editForm.stallNo" ></el-input>
                <span>&nbsp;&nbsp;例：1厅10排</span>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="saveMsg()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 新增商户 -->
          <div class="form-content" v-show="selectAddShop">
              <el-form-item label="节点编码：" prop="node">
                <el-input v-model="form.node" clearable></el-input>
              </el-form-item>
              <el-form-item label="商户编码：" prop="shangh">
                <el-input v-model="form.shangh" clearable></el-input>
              </el-form-item>
              <el-form-item label="营业执照号：">
                <el-input v-model="form.licenceNo" clearable></el-input>
              </el-form-item>
              <el-form-item label="身份证号：">
                <el-input v-model="form.regId" clearable></el-input>
              </el-form-item>
              <el-form-item label="商户名称：" prop="nodeName" >
                <el-input v-model="form.nodeName" clearable></el-input>
              </el-form-item>
              <el-tooltip class="item" effect="dark" content="营业执照上的名称" placement="top-start">
                <el-form-item label="企业名称：" prop="corporate_name" >
                  <el-input v-model="form.corporate_name" clearable></el-input>
                </el-form-item>
              </el-tooltip>
              <br/>
              <el-form-item label="商户类型：" prop="node_type" >
                <el-select v-model="form.node_type" placeholder="请选择" clearable>
                  <el-option v-for="(item,index) in types" :key="index" :value="item.value" :label="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人：" prop="name">
                <el-input v-model="form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="callphone">
                <el-input v-model="form.callphone" clearable></el-input>
              </el-form-item>
              <el-form-item label="地址：" prop="addr">
                <el-cascader class="address" :options="addrOptions" v-model="form.addr" placeholder="省/市/县"
                  clearable :props="props" change-on-select></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.addrInfo" placeholder="请输入详细地址" clearable></el-input>
              </el-form-item>
              <el-form-item label="摊位号：">
                <el-input style="width: 300px" v-model="form.stallNo" clearable></el-input>
                <span>&nbsp;&nbsp;例：1厅8排</span>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
              </el-form-item>
          </div>
        </div>
      </el-form>
  </div>
</template>

<script>
import {getRoleList} from '../../js/role/role.js';
import {getAddr} from '../../js/user/user.js';
import {insBiz,LookShop,allBizs,GetAllBizType} from '../../js/management/management.js';
export default {
  name:"",
  data(){
    return{
      rules: {
        node: [
          {required: true, message: '请输入节点编码', trigger: 'blur'}
        ],
        shangh: [
          {required: true, message: '请输入商户编码', trigger: 'blur'}
        ],
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        people: [
          {required: true, message: '请输入联系人',trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请输入联系电话',trigger: 'blur'},
          {validator:function(rule,value,callback){
            if(/^1[34578]\d{9}$/.test(value) == false){
              callback(new Error("请输入正确的手机号"));
            }
            else{
              callback();
            }
          }, trigger: 'blur'}
        ],
        licenceNo: [
          {required: true, message: '请输入营业执照',trigger: 'blur'},
        ],
        regId: [
          {required: true, message: '请输入身份证号',trigger: 'blur'},
          {
            pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确'
          }
        ],
        nodeName: [
          {required: true, message: '请输入商户名称',trigger: 'blur'}
        ],
        corporate_name: [
          {required: true, message: '请输入企业名称',trigger: 'blur'}
        ],
        node_type: [
          { required: true, message: '请选择商户类型', trigger: 'change' }
        ],
        name: [
          {required: true, message: '请输入店铺联系人',trigger: 'blur'}
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
        addr: [
          {required: true, message: '请选择所在地区',trigger: 'blur'}
        ],
        addrInfo: [
          {required: true, message: '请输入地址',trigger: 'blur'}
        ],
        stallNo: [
          {required: true, message: '请输入摊位号', trigger: 'blur'}
        ],
        // role: [
        //   { required: true, message: '请选择角色', trigger: 'change' }
        // ],
      },
      roleOptions:[
        {roleId: 0}
      ],
      checked:false,
      isDisabled:false,
      userId:'',
      form:{
        node: '',
        shnagh: '',
        people:'',
        phoneNumber:'',
        account:'',//账号
        password:'',//密码
        role:'',//角色
        licenceNo: '',//营业执照
        regId: '',//身份证号
        nodeName: '',//商户名称（商铺）
        corporate_name: '', // 企业名称
        name: '',//店铺联系人
        callphone: '',//店铺联系方式
        addr:[],
        addrInfo: '',//地址
        stallNo: '',//摊位号
        node_type: ''
      },
      types: [],
      lookMsg:{
        licenceNo:'',
        regId:'',
        nodeName:'',
        name:'',
        callphone:'',
        addrInfo:'',
        stallNo:'',
        corporate_name: ''
      },
      editForm:{},
      addrOptions:[],
      props:{
          label: 'caption',
          value:'szm',
          children: 'list'
      },
      shopList:[],//绑定商铺
      showShopListName:false,//绑定商铺是否展示
      active:true,//选中添加商铺
      lookShopName:'',//查看商铺
      selectAddShop:true,//选中添加商品展示表单
      isEdit:false,//是否在编辑
    }
  },
  created() {
    this.userId = localStorage.getItem('userId')
  },
  mounted(){
    this.getRoleType();//获取角色列表     
    this.getAddrList();//获取地区列表
    this.getBizTypeFun()
  },  
  computed:{
    setPeople(){
      return this.form.people;
    },
    setPhoneNumber(){
      return this.form.phoneNumber;
    }
  },
  watch:{
    shopList(val){
      if(val.length > 0){
        this.showShopListName = true;
      }
    },
    setPeople(newValue){
      this.form.name = newValue
    },
    setPhoneNumber(newValue){
      this.form.callphone = newValue
    }
  },
  methods:{
    getBizTypeFun(){
      GetAllBizType()
        .then(res => {
          console.log(res)
          this.types = res.data
        })
        .catch(res => {
          console.log(res)
        }) 
    },
    getRoleType(){//获取角色列表
      let pageData = {
        page:'1',
        cols:'15',
        roleName:'',   
        USERID: this.userId,         
      }
      getRoleList(pageData)
        .then(res => {
          this.roleOptions = res.data.roleList;
        })
        .catch(res => {
          console.log(res)
        }) 
    },
    getAddrList(){//获取地区列表
      getAddr()
        .then(res => {
          this.addrOptions = res.data.dataList
        })
        .catch(res => {
            console.log(res)
        })
    },
    submitForm(formName) {
      if(this.form.licenceNo == '' && this.form.regId == ''){
        this.$message.error('营业执照号和身份证号不能同时为空');
      }else{
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveFun()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    saveFun(){//添加商铺保存
      // 根据地区序列号查询地址
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
      // 新增商户提交数据
      
        let data = {
          userName:this.form.account,//账号
          password:this.form.password,//密码
          roleId:this.form.role,//角色
          contact:this.form.people,//联系人
          telphone:this.form.telphone,// 联系人电话       
          state:"1",
          licenceNo:this.form.licenceNo,//营业执照号
          regId:this.form.regId,//身份证
          nodeName:this.form.nodeName,//商铺名称
          corporate_name:this.form.corporate_name,//企业名称
          name:this.form.name,//联系人
          callphone:this.form.callphone,//联系电话
          areaId:this.form.addr[2],//地址序列号
          areaName:addrArr.join(""),//地址名称
          addr:this.form.addrInfo,//地址详细信息
          stallNo:this.form.stallNo,//摊位号
          region:localStorage.getItem('merchantsAreaId'),//大区id
          userId:this.userId,//用户id
          node_id: this.form.node,
          biz_id: this.form.shangh,
          type: this.form.node_type
        }
        console.log(data)
        insBiz(data)
          .then(res => {
            console.log(res)
            if(res.message == '保存成功'){
              this.$message({
                message: '恭喜您，保存成功！',
                type: 'success'
              });
              this.$router.push('merchantsMgm')
              // this.isDisabled = true;
              // // 新增商铺保存后重置页面录入信息   
              // this.form.licenceNo='';//营业执照号
              // this.form.regId='';//身份证
              // this.form.nodeName='';//商铺名称
              // this.form.name='';//联系人
              // this.form.callphone='';//联系电话
              // this.form.addr=[];//地址
              // this.form.addrInfo='';//地址详细信息
              // this.form.stallNo='';//摊位号
            }else{
              this.$message.error('账号已存在');
            }
          })
          .catch(res => {
            console.log('出错了')
          })
    },
    getShopMsg(uId){//查询商铺详情
      allBizs({userId:uId})
        .then(res =>{
          let len = res.data.dataList.length;
          if(len > 0){
            this.isEdit = false;
            this.shopList = res.data.dataList[0].bootList;
          }
        })
        .catch(res =>{
          console.log(res)
        })
    },
    lookThis(shopId){//查看商铺信息
     LookShop({shop_booth_id:shopId})
        .then(res => {
          console.log(res)
          this.lookShopName = res.data.dataList[0].booth_name;
          this.isEdit = false;
          this.active = false;
          this.selectAddShop = false;

          this.lookMsg.licenceNo = res.data.dataList[0].licenceNo;//营业执照号
          this.lookMsg.regId = res.data.dataList[0].regId;//身份证
          this.lookMsg.nodeName = res.data.dataList[0].booth_name;//商铺名称
          this.lookMsg.name = res.data.dataList[0].contacts;//联系人
          this.lookMsg.callphone = res.data.dataList[0].callphone;//联系电话
          this.lookMsg.addr = res.data.dataList[0].area_id;//地址名称
          this.lookMsg.addrInfo = res.data.dataList[0].addr;//地址详细信息
          this.lookMsg.stallNo = res.data.dataList[0].stall_no;//摊位号
          console.log(this.lookMsg)
        })
        .catch(res => {
          console.log(res)
        })
      
    },
    modifyMsg(name){//修改商铺信息
      this.isEdit = true;      
      this.editForm.licenceNo = this.lookMsg.licenceNo;//营业执照号
      this.editForm.regId = this.lookMsg.regId;//身份证
      this.editForm.nodeName = this.lookMsg.nodeName;//商铺名称
      this.editForm.name = this.lookMsg.name;//联系人
      this.editForm.callphone = this.lookMsg.callphone;//联系电话
      this.editForm.addr = this.lookMsg.addr;//地址名称
      this.editForm.addrInfo = this.lookMsg.addrInfo;//地址详细信息
      this.editForm.stallNo = this.lookMsg.stallNo;//摊位号
    },
    saveMsg(){// 修改商户提交数据
      let data = {
        licenceNo:this.editForm.licenceNo,//营业执照号
        regId:this.editForm.regId,//身份证
        nodeName:this.editForm.nodeName,//商铺名称
        name:this.editForm.name,//联系人
        callphone:this.editForm.callphone,//联系电话
        areaId:this.editForm.addr[2],//地址序列号
        areaName:this.editForm.addr.join(""),//地址名称
        addr:this.editForm.addrInfo,//地址详细信息
        stallNo:this.editForm.stallNo,//摊位号
      }
      console.log(data)
    },
    addShop(){//添加商铺
      this.lookShopName = '';
      this.active = true;
      this.selectAddShop = true;
      // 添加商品重置录入信息
      if(!this.shopList.userId){
        this.isDisabled = true;
      }else{
        this.isDisabled = false;
        this.form.account='';//账号
        this.form.password='';//密码
        this.form.role='';//角色
        this.form.people='';//联系人
        this.form.phoneNumber='';// 联系人电话   
      }         
      
      this.form.licenceNo='';//营业执照号
      this.form.regId='';//身份证
      this.form.nodeName='';//商铺名称
      this.form.name='';//联系人
      this.form.callphone='';//联系电话
      this.form.addr=[];//地址
      this.form.addrInfo='';//地址详细信息
      this.form.stallNo='';//摊位号


    },
  },
  components:{

  }
}
</script>

<style scoped lang="less">
  @color:#409EFF;
  .content{
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .el-form-item{ 
      clear: both;
    }
    .add-btn{
      color: #409EFF;
      background: #fff;
    }
    .msg{
      display: flex;
    }
    .msg-title{
      padding-left: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      border-left: 2px solid #409EFF;
    }
    .title{
      margin-bottom: 15px;
      padding: 5px 15px;
      font-size: 14px;
    }
    .account-msg{
      padding: 0 40px;
      overflow: hidden;
    }
    .account-cont{
      .demo-autocomplete{
        .sub-title {
          text-align: right;
          padding-right: 20px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
        .el-input,.el-select{
          width: 150px;
        }
        .el-col{
          margin-left: 80px;
        }
        .el-checkbox{
          margin-left: -110px;
        }
      }
    }
    .item{
      float: left;
      margin-bottom: 20px;
      width: 33.33%;
      height: 40px;
      line-height: 40px;
      .input{
        width: 150px;
      }
      .item-name{
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
    .last-itme{
      width: 66.66%;
    }
    .shop-msg{
      .box{
        border-bottom: 1px solid #eaeaea;
      }
      .shop-name{
        display: inline-block;
      }
      .btn{
        border-radius: 0;
        background: #fff;
        color:@color;
        border:1px solid @color;
      }
      .current{
        background: #fff;
        color: @color;
      }      
    }
    .form-content{
      padding: 20px 0 0 100px;
      .form{
        width: 460px;
      }
      .el-input,.el-cascader,.el-select{
        width: 400px;
      }
      .infor-msg{
        font-size: 14px;
        color: #606266;
      }
      .section{
        overflow: hidden;
        .el-button{
          margin-left: 120px;
        }
      }
      .item-name{
        float: left;
        display: block;
        padding-right: 12px;
        width: 120px;
        text-align: right;
        box-sizing: border-box;
      }
      .item-msg{
        display: block;
        margin-left: 120px;
      }
      
      .addr{
        margin-bottom: 0;
        height: 104px;
        .item-msg{
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
