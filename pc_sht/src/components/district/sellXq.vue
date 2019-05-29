<template>
    <div class="content">
        <el-form label-width="120px" :model="form" style="width: 100%;margin-left: 20%">
            <el-form-item label="商品名称：">{{form.GOODS_NAME}}</el-form-item>
            <el-form-item label="品种：">{{form.GB_NAME}}</el-form-item>
            <el-form-item label="价格：">{{form.PRICE}}<span >&nbsp;&nbsp;元</span></el-form-item>
            <el-form-item label="单位：">{{form.GOODS_UNIT}}</el-form-item>
            <el-form-item label="供应商：">{{form.SUPPLIERS_NAME}}</el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "sellXq",
     data() {
        return {
            form: {}
        }
    },
    mounted() {
        this.form = this.$route.params
    },
}
</script>

<style scoped lang="less">
    .content{
        padding: 10px;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
    }
    .section-content{
        padding: 20px 100px;
        width: 500px;
    }
    .new-add{
        margin-top: 30px;
    }
</style>