<template>
    <div class="header">

        <div class="section-content">
          <el-form :model="form" ref="form"  label-width="120px">
            <el-form-item label="营业执照：">
              <span>{{form.licenceNo}}</span>
            </el-form-item>
            <el-form-item label="身份证号：">
              <span>{{form.regId}}</span>
            </el-form-item>
            <el-form-item label="客户名称："  prop="bizName">
              <span>{{form.bizName}}</span>
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
            <el-form-item>
              <el-button type="primary" class="new-add" @click="editForm()" >{{edit}}</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
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
            addr: [],//地址
            infoAddr:'',//详细地址
            shop_concacts_id:'',
          },
        }
      },
      mounted(){
        if(JSON.stringify(this.$route.params.gysMsg)){
          this.form.type = this.$route.params.gysMsg.type;
          this.form.licenceNo = this.$route.params.gysMsg.licence_no;//营业执照
          this.form.bizName = this.$route.params.gysMsg.biz_name;//供应商名称
          this.form.regId = this.$route.params.gysMsg.regId;//身份证号
          this.form.name = this.$route.params.gysMsg.concact_name;//联系人
          this.form.callphone = this.$route.params.gysMsg.cellphone;//联系方式
          this.form.addrId = this.$route.params.gysMsg.area_id;
          this.form.addr = this.$route.params.gysMsg.area_name;//地址
          this.form.infoAddr = this.$route.params.gysMsg.addr;//详细地址
          this.form.shop_concacts_id = this.$route.params.gysMsg.shop_concacts_id;
        }
      },
      methods: {
        editForm(){
          this.$router.push({name:'EditClient',params:{'name':this.edit,gysMsg:this.$route.params.gysMsg}})
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
    width: 600px;
  }
  .new-add{
    background: #409EFF;
  }

}
</style>
