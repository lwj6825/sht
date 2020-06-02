<template>
  <div class="header">
    <div class="section-content">
      <el-form :model="form" ref="form"  label-width="120px">
        <el-form-item label="供应商名称："  prop="bizName">
          <span>{{form.bizName}}</span>
        </el-form-item>
        <el-form-item label="营业执照："  prop="licenceNo">
          <span>{{form.licenceNo}}</span>
        </el-form-item>
        <el-form-item label="身份证号：" prop="regId">
          <span>{{form.regId}}</span>
        </el-form-item>
        <el-form-item label="供货单位："  >
          <span>{{form.ghdw}}</span>
        </el-form-item>
        <el-form-item label="联系人：" prop="name">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="联系电话：" prop="callphone">
          <span>{{form.callphone}}</span>
        </el-form-item>
        <el-form-item label="地址：" prop="addr">
            <span>{{form.addr}} {{form.infoAddr}}</span>
        </el-form-item>
        <el-form-item label="产地：" prop="origin_name">
          <span>{{form.origin_name}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="new-add" @click="editForm()" >{{edit}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAddr} from '../../js/user/user.js';
    export default {
      name: "",
      data() {
        return {
          edit:'修改',
          form: {
            type: '',
            licenceNo: '',//营业执照
            bizName: '',//客户名称
            regId: '',//身份证号
            name: '',//联系人
            callphone: '',//联系方式
            addrId:'',
            addr: '',//地址
            infoAddr:'',//详细地址
            origin_name: '',//产地
            shop_concacts_id:'',
            ghdw: '',
          },
          areaId: ''
        }
      },
      mounted(){
        if(this.$route.query.gysMsg){
          let gysMsg = JSON.parse(this.$route.query.gysMsg)
          this.form.type = gysMsg.type;
          this.form.licenceNo = gysMsg.licence_no;//营业执照
          this.form.bizName = gysMsg.biz_name;//供应商名称
          this.form.regId = gysMsg.regId;//身份证号
          this.form.name = gysMsg.concact_name;//联系人
          this.form.callphone = gysMsg.cellphone;//联系方式
          this.form.addrId = gysMsg.area_id;
          this.form.addr = gysMsg.area_name;//地址
          this.form.infoAddr = gysMsg.addr;//详细地址
          this.form.origin_name = gysMsg.area_origin_name;//产地
          this.form.origin_id = gysMsg.area_origin_id
          this.form.shop_concacts_id = gysMsg.shop_concacts_id;
          this.form.ghdw = gysMsg.ws_supplier;
        }
        this.areaId = this.$route.query.areaId
      },
      methods: {
        editForm(){
          // let routeData = this.$router.resolve({
          //   path: "/home/management/editSupplier",
          //   query: {
          //     gysMsg: this.$route.query.gysMsg,
          //     areaId: this.areaId
          //   }
          // });
          // window.open(routeData.href, '_blank');
          this.$router.push({name:'EditSupplier',query:{gysMsg:this.$route.query.gysMsg,areaId: this.areaId}})
        }
      }
    };
</script>

<style rel="stylesheet/less" lang='less' scoped>
.header {
  padding: 10px;
  height: 100%;
  background: #fff;
  .section-content{
    padding: 20px 100px;
    width: 400px;
  }
  .new-add{
    background: #409EFF;
  }
}
.address{
  width: 280px;
}
</style>
