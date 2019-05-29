<template>
  <div class="syacontent">

    <!--查询输入框-->
    <div class="sya-search">
      <el-input v-model="syCoding" placeholder="请输入溯源编码" class="sya-search-left" size="small"></el-input>
      <el-button type="primary" size="small" class="sya-search-right" @click="startSearch()">查询</el-button>
    </div>
    <!--内容区域-->
    <div class="sya-content" ref="bodycontent">
      <!--产品信息-->
      <!--<div class="public-box-info">-->
        <!--<span class="info-title">产品信息</span>-->
        <!--<div class="public-box-info-inner">-->

          <!--<div class="info-content">-->
            <!--<div class="product-left"><span class="span-width-fix-zi">品牌:</span><span>崔村红</span></div>-->
            <!--<div class="product-right"><span class="span-width-fix-zi">品种:</span>{{product_breed}}</div>-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--重新布局产品信息-->
      <div class="lz-sycx-search-item">
        <span class="lz-sycx-search-item-title">产品信息</span>
        <div class="lz-sycx-search-item-content">
          <div class="lz-sycx-search-item-content-inner">
            <div class="lz-sycx-search-item-content-inner-left">
                  <div class="lz-sycx-left">品牌:</div><span class="lz-span">崔村红</span>
            </div>
            <div class="lz-sycx-search-item-content-inner-left">
              <div class="lz-sycx-left">品种:</div><span class="lz-span">{{product_breed}}</span>
            </div>

          </div>

        </div>
      </div>

      <!--重新布局基地信息-->
      <div class="lz-sycx-search-item-two">
        <span class="lz-sycx-search-item-title">基地信息</span>
        <div class="lz-sycx-search-item-content">
          <div class="lz-sycx-search-item-content-inner">
            <div class="lz-sycx-search-item-content-inner-left">
                  <div class="lz-sycx-left">地块名称:</div><span class="lz-span">{{plot_name}}</span>
            </div>
            <div class="lz-sycx-search-item-content-inner-left">
              <div class="lz-sycx-left">地块面积:</div><span class="lz-span">{{plot_area}}</span>
            </div>

          </div>

        </div>
        <div class="lz-sycx-search-item-content">
          <div class="lz-sycx-search-item-content-inner">
            <div class="lz-sycx-search-item-content-inner-left">
                  <div class="lz-sycx-left">负责人:</div><span class="lz-span">{{plot_fzr}}</span>
            </div>
            <div class="lz-sycx-search-item-content-inner-left">
              <div class="lz-sycx-left">地址:</div><span class="lz-span">{{plot_address}}</span>
            </div>

          </div>

        </div>
      </div>

      <!--基地信息-->
      <!--<div class="public-box-info-two">-->
        <!--<span class="info-title">基地信息</span>-->

        <!--<div class="info-content-test">-->
          <!--<div class="info-content-test-all">-->
            <!--&lt;!&ndash;第一行&ndash;&gt;-->
            <!--<div class="one-row">-->
              <!--<div class="one-row-left">-->
                <!--<span class="span-width-fix-zi">地块名称:</span>{{plot_name}}-->
              <!--</div>-->
              <!--<div class="one-row-right">-->
                <!--<span class="span-width-fix-zi">地块面积:</span>{{plot_area}}-->
              <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;第二行&ndash;&gt;-->
            <!--<div class="one-row">-->
              <!--<div class="one-row-left">-->
                <!--<span class="span-width-fix-zi">负责人:</span>{{plot_fzr}}-->
              <!--</div>-->
              <!--<div class="one-row-right">-->
                <!--<span class="span-width-fix-zi">地址:</span>{{plot_address}}-->
              <!--</div>-->

            <!--</div>-->
            <!--&lt;!&ndash;第三行&ndash;&gt;-->
            <!--<div class="one-row-two">-->
              <!--&lt;!&ndash;<p>基地图片:</p>&ndash;&gt;-->
              <!--&lt;!&ndash;<img src="../../assets/images/guo01.jpg"/>&ndash;&gt;-->
              <!--&lt;!&ndash;<img class="imgtwo" src="../../assets/images/guo03.jpg"/>&ndash;&gt;-->
              <!--&lt;!&ndash;<img class="imgtwo" src="../../assets/images/guo02.jpg"/>&ndash;&gt;-->

            <!--</div>-->
          <!--</div>-->

        <!--</div>-->

      <!--</div>-->

      <!--生长过程-->
      <div class="public-box-info-three">
        <span class="info-title">生长过程</span>

        <ul>
          <li class="info-content-three-inner" v-for="itemsz in growth_record_list" :key='itemsz.index'>
            <div class="info-content-three-inner-content">
              <!--两个盒子-->
              <div class="tiem-line-waiceng" v-if="itemsz.type === '农事记录'">
                <div class="time-line-me-short">
                  <div class="short-left"></div>
                  <div class="short-right">{{itemsz.type}}</div>
                </div>
                <div class="time-date-me">
                  <div class="date-p-left"><p>{{itemsz.scsj.substr(0,4)}}</p>
                    <p>{{itemsz.scsj.substr(5,5)}}</p></div>
                  <div class="date-p-right">
                    <div>{{itemsz.describe}}</div>
                  </div>
                </div>
                <!--空盒子-->
                <div class="time-line-me-empty"></div>
              </div>

              <!--两个盒子-->
              <div class="tiem-line-waiceng" v-if="itemsz.type === '土壤施肥'">
                <div class="time-line-me-short">
                  <div class="short-left"></div>
                  <div class="short-right">{{itemsz.type}}</div>
                </div>
                <div class="time-date-me">
                  <div class="date-p-left"><p>{{itemsz.scsj.substr(0,4)}}</p>
                    <p>{{itemsz.scsj.substr(5,5)}}</p></div>
                  <div class="date-p-right">
                    <div class="date-p-right-one">肥料名称:{{itemsz.describe}}</div>
                    <div class="date-p-right-two">施肥目的:{{itemsz.goal}}</div>
                    <div class="date-p-right-two">生产单位:{{itemsz.scdw}}</div>
                  </div>
                </div>
                <!--空盒子-->
                <div class="time-line-me-empty"></div>
              </div>

              <!--两个盒子-->
              <div class="tiem-line-waiceng" v-if="itemsz.type === '病虫害防治'">
                <div class="time-line-me-short">
                  <div class="short-left"></div>
                  <div class="short-right">{{itemsz.type}}</div>
                </div>
                <div class="time-date-me">
                  <div class="date-p-left"><p>{{itemsz.scsj.substr(0,4)}}</p>
                    <p>{{itemsz.scsj.substr(5,5)}}</p></div>
                  <div class="date-p-right">
                    <div class="date-p-right-one">施药名称:{{itemsz.describe}}</div>
                    <div class="date-p-right-two">防治对象:{{itemsz.goal}}</div>
                    <div class="date-p-right-two">生产单位:{{itemsz.scdw}}</div>
                  </div>
                </div>
                <!--空盒子-->
                <div class="time-line-me-empty"></div>
              </div>

            </div>
          </li>
        </ul>


      </div>


    </div>

  </div>
</template>


<script>
  import {
    symQuery
  } from "../../js/farmthings/farmworksym.js";


  export default {
    name: '',
    components: {},
    data() {
      return {
        syCoding: '',

//              地块名称  地块面积   负责人   地址   图片
        plot_name: '',
        plot_area: '',
        plot_fzr: '',
        plot_address: '',
        plot_place_name: '',

//        品种
        product_breed: '',

//        生长记录
        growth_record_list: [],

      }
    },
    methods: {

      //开始搜索
      startSearch() {
        this.getSymInfo(this.syCoding);
      },

      //          获取溯源码信息
      getSymInfo(a) {
        let symInfoNum = {
          trace_code: a,
        };

        symQuery(symInfoNum)
          .then(res => {

//        基地信息
            this.$refs.bodycontent.style.display = 'block'

            this.plot_name = res.data.Dkxx[0].place_name;
            this.plot_area = res.data.Dkxx[0].area;
            this.plot_fzr = res.data.Dkxx[0].fzr;
            this.plot_address = res.data.Dkxx[0].area_name+res.data.Dkxx[0].addr;
            this.product_breed = res.data.Dkxx[0].pz;

//            生长记录
            this.growth_record_list = res.data.dataList1;


          })
          .catch(() => {
            this.$refs.bodycontent.style.display = 'none'
            this.$message.error("溯源码输入有误!");
          })


      },

//      显示内容区域.
      getContentDiv() {
        document.getElementsByClassName('sya-content')[0].style.display = block;
      }

    },
    mounted() {
//      this.localuserId = JSON.parse(localStorage.getItem('userId'));
    }
  }
</script>

<style scoped lang='less'>
  .syacontent {
    padding: 10px;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
  }

  /*搜索*/
  .sya-search {
    width: 40%;
    display: flex;
    justify-content: space-between;
    .sya-search-left {
      flex: 5;
      margin-right: 20px;
    }
    .sya-search-right {
      flex: 1;
    }
  }

  /*内容*/
  .sya-content {
    width: 100%;
    margin-top: 40px;
    height: 87.5%;
    font-size: 14px;
    display: none;

  }

  /*产品信息*/
  .public-box-info {
    width: 100%;
    height: 15%;
    margin-top: 40px;
    background-color: #F8F8F8;
    border: 1px solid #E4E4E4;
    .info-title {
      position: relative;
      width: 60px;
      height: 100px;
      top: -12px;
      left: 30px;
      background-color: #fff;
    }

    .public-box-info-inner {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;

      .info-content {
        width: 80%;
        display: flex;
        align-items: center;
        .product-left {
          flex: 3;

        }
        .product-right {
          flex: 1;
        }
        .span-width-fix-zi {
          margin-right: 10px;
        }
      }

    }

  }

  /*产品重新布局*/
  .lz-sycx-search-item {
    width: 100%;
    height: 100px;
    margin-top: 40px;
    background-color: #F8F8F8;
    border: 1px solid #E4E4E4;

    .lz-sycx-search-item-title {
      position: relative;
      width: 60px;
      top: -12px;
      left: 30px;
      background-color: #fff;
    }

    .lz-sycx-search-item-content{
      width: 100%;
      height: 81px;
      /*background-color: #409EFF;*/
      display: flex;
      align-items: center;
      justify-content: center;
      .lz-sycx-search-item-content-inner{
        width: 90%;
        height: 50%;
        /*background-color: #ffdc32;*/
        display: flex;
        .lz-sycx-search-item-content-inner-left{
            flex: 1;
            /*background-color: antiquewhite;*/
          display: flex;
          align-items: center;
          .lz-sycx-left{
            width: 80px;
            display: flex;
            /*justify-content:flex-end ;*/
          }
          .lz-span{
            margin-left: 10px;
          }
        }
      }
    }

  }


  /*产品重新布局*/
  .lz-sycx-search-item-two {
    width: 100%;
    height: 200px;
    margin-top: 40px;
    background-color: #F8F8F8;
    border: 1px solid #E4E4E4;

    .lz-sycx-search-item-title {
      position: relative;
      width: 60px;
      top: -12px;
      left: 30px;
      background-color: #fff;
    }

    .lz-sycx-search-item-content{
      width: 100%;
      height: 81px;
      /*background-color: #409EFF;*/
      display: flex;
      align-items: center;
      justify-content: center;
      .lz-sycx-search-item-content-inner{
        width: 90%;
        height: 50%;
        /*background-color: #ffdc32;*/
        display: flex;
        .lz-sycx-search-item-content-inner-left{
            flex: 1;
            /*background-color: antiquewhite;*/
          display: flex;
          align-items: center;
          .lz-sycx-left{
            width: 80px;
            display: flex;
            /*justify-content:flex-end ;*/
          }
          .lz-span{
            margin-left: 10px;
          }
        }
      }
    }

  }

  /*基地信息*/
  .public-box-info-two {
    width: 100%;
    height: 30%;
    margin-top: 40px;
    background-color: #F8F8F8;
    border: 1px solid #E4E4E4;
    .info-title {
      position: relative;
      width: 60px;
      height: 100px;
      top: -12px;
      left: 30px;
      background-color: #fff;
    }

    .info-content-test {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 90%;

      .info-content-test-all {
        width: 80%;
        height: 130px;
        .one-row {
          height: 25%;
          display: flex;
          align-items: center;

          .one-row-left {
            flex: 3;
            .span-width-fix-zi {
              margin-right: 10px;
            }
          }
          .one-row-right {
            flex: 1;
            .span-width-fix-zi {
              margin-right: 10px;
            }
          }
        }
        .one-row-two {
          margin-top: 5px;
          height: 50%;
          display: flex;
          img {
            width: 10%;
            height: 90%;
            margin-left: 10px;
          }

        }
      }
    }

  }

  .public-box-info-three {
    width: 100%;
    margin-top: 40px;
    background-color: #F8F8F8;
    border: 1px solid #E4E4E4;
    .info-title {
      position: relative;
      width: 60px;
      height: 100px;
      top: -12px;
      left: 30px;
      background-color: #fff;
    }

    .ul-content {
      height: 80%;
    }

    .info-content-three-inner {
      width: 100%;
      height: 93%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .info-content-three-inner-content {
        width: 88%;

        .tiem-line-waiceng {
          .time-line-me-short {
            width: 100%;
            height: 20px;
            margin-left: 25px;
            font-size: 14px;
            display: flex;
            .short-left {
              width: 25px;
              height: 20px;
              line-height: 20px;
              border-left: 1px solid #96D9EF;
              padding-left: 15px;

            }
            .short-right {
              color: #96D9EF;
            }
          }

          .time-date-me {
            width: 100%;
            height: 40px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: flex;
            .date-p-left {
              width: 50px;
              background-color: #fff;
              color: #7a7a7a;
            }
            .date-p-right {
              height: 40px;
              width: 98%;
              background-color: #fff;
              border-radius: 7px;
              display: flex;
              align-items: center;
              border: 1px solid #E4E4E4;
              padding-left: 15px;
              .date-p-right-one {
                flex: 1;
              }
              .date-p-right-two {
                flex: 1;
              }
            }
          }

        }

        .time-line-me-empty {
          width: 100%;
          height: 40px;
          border-left: 1px solid #96D9EF;
          margin-left: 25px;
        }

        .time-line-me-empty-last {
          width: 100%;
          height: 20px;
          border-left: 1px solid #96D9EF;
          margin-left: 25px;
        }

      }
    }

  }


</style>
