<template>
  <div class="my-table" style="padding-top: 20px;">
    <el-table :data="data"
    border
    style="width: 90%; "
    height="300">
      <my-column v-for="(item,index) in col" :key="index" :mycol="item"></my-column>
    </el-table>
  </div>
</template>
 <!-- :span-method="objectSpanMethod" -->
<script>
import MyColumn from './MyColumn'
export default {
  data() {
    return {
    }
  },
  components: {
    MyColumn
  },
  props: {
    col: {
      type: Array
    },
    data: {
      type: Array
    },
    spanArr:{
       type: Array
    }
  },
  watch: {
      col: {
        handler: function(newVal,oldVal){
         console.log(newVal)
        }
      },
      deep: true
  },
  mounted(){
      // this.getSpanArr()
      console.log(this.col);
  },
  methods: {
      // getSpanArr(){
      //   let contactDot = 0;
      //   console.log(this.spanArr)
      //     this.data.forEach( (item,index) => {
      //         if(index===0){
      //             this.spanArr.push(1)
      //         }else{
      //           if(item.region === this.data[index-1].region){
      //               this.spanArr[contactDot] += 1;
      //               this.spanArr.push(0)
      //           }else{
      //               contactDot = index
      //               this.spanArr.push(1)
      //           }
      //         }
      //     })
      //     console.log(this.spanArr)
      // },
        /* arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
              return [1, 2];
            } else if (columnIndex === 1) {
              return [0, 0];
            }
          }
        }, */
        objectSpanMethod({row, column, rowIndex, columnIndex}){
                // console.log(this.spanArr)
                if(columnIndex ===0){
                  // console.log(this.spanArr[rowIndex])
                    if(this.spanArr[rowIndex]){
                        return {
                            rowspan:this.spanArr[rowIndex],
                            colspan:1
                        }
                    }else{
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },

  }
}
</script>
<style scoped>
</style>
