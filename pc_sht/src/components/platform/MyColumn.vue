<template>

  <el-table-column :prop="mycol.prop"
    :label="mycol.label"
    align="left"
    style="width: 12.5rem;">

    <template v-if="mycol.children">
      <my-column v-for="(item, index) in mycol.children"
        :key="index"
        :mycol="item"
        style="width: 12.5rem;"></my-column>
    </template>

  </el-table-column>
</template>

<script>
export default {
  name: 'MyColumn',
  data() {
    return {
      childrenList:[],
    }
  },
  props: {
    mycol: {
      type: Object
    }
  },
  watch: {
      mycol: {
        handler: function(newVal,oldVal){
        //  console.log(newVal)
         /*  console.log(newVal)
         console.log(newVal.children) */
        }
      },
      deep: true
  },
  mounted() {
    console.log(this.mycol)
    // console.log("---------" + this.mycol)
    // console.log(this.mycol.children);
  }


}

</script>
<style scoped >
</style>
