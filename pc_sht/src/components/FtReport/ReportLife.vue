<template>
  <div class="content">
      <div class="iframe">
          <iframe src="https://shop.zhdtech.com/priceIndex/life.html"
          scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
      </div>
  </div>
</template>

<script>
  export default {
      name:"priceDaily",
      data() {
          return {

          }
      },
      mounted() {

      },
      methods: {

      },
  }
</script>
<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .iframe{
            width: 100%;
            height: 700px;
        }
    }
</style>
