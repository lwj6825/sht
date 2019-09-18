<template>
  <div class="syacontent">
    <!--查看农事记录-->
    <div class="viewcentent">
      <!--地块信息-->
      <div class="plot-info">
        <p class="plot-title">地块信息</p>
        <div class="plot-info-one-row">
          <div class="columnone">地块名称：{{viewPlaceName}}</div>
          <div class="columntwo">面积：{{viewArea}}</div>
          <div class="columnthree">品种：{{viewPz}}</div>
        </div>
        <div class="plot-info-one-row">
          <div class="columnone">预计采摘时间：{{viewCjsj}}</div>
          <div class="columntwo">预计产量：{{viewYield}}</div>
          <div class="columnone">地块负责人：{{viewFzr}}</div>
        </div>
        <div class="plot-info-one-row">
          <div class="columnone">所属企业：{{viewHzs}}</div>
          <div class="columntwo">创建日期：{{dataTime}}</div>
          <div class="column">
            <span style="color: #000;">地块介绍：
              {{dkjs.length > 40 ? (dkjs.substring(0,40) + '...') : dkjs }} </span>
            <span class="more" v-if="dkjs.length > 40" @click="moreFun">更多</span>
          </div>
        </div>
        <div class="plot-info-one-row">
          <div class="columnoneimg">
            <p>地块信息:</p>
            <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + img_url" v-if="img_url">
          </div>
        </div><!---->
      </div>
      <!--种植信息-->
      <div class="plant-info">
        <p class="plot-title">种植信息</p>
        <div class="plant-content">
          <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="土壤施肥" name="first" class="one">
              <!--添加施肥记录-->
              <div id="open_btn_sfjl" class="sf-but" @click="centerEditDialogVisible = true">添加施肥记录</div>
              <!--表格内容-->
              <div class="sf-table">
                <el-table :data="viewTrsfList" style="width: 100%" :cell-style = "getRowheight" :header-cell-style="getRowClass">
                  <el-table-column fixed prop="flmc" label="肥料名称"></el-table-column>
                  <el-table-column prop="sfmd" label="施肥目的"> </el-table-column>
                  <el-table-column prop="sl" label="施量（kg）" width="95"> </el-table-column>
                  <el-table-column prop="syfs" label="施用方式" width="80"> </el-table-column>
                  <el-table-column prop="in_date" label="施肥日期" width="120"> </el-table-column>
                  <el-table-column prop="scdw" label="生产单位" > </el-table-column>
                  <el-table-column prop="trsf_describe" label="描述" width="120"> </el-table-column>
                  <el-table-column prop="img_url" label="图片">
                    <template slot-scope="scope">
                      <img class="img" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_url" v-if="scope.row.img_url">
                    </template> 
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button size="mini" type="text" id="open_btn_btn" @click="updateTrsfjl(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="text" @click="ifDeleteTrsfRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--分页-->
              <div class="pageBlock">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                  layout="total, prev, pager, next, jumper" :total="totalPageSize"> </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="病虫害防治" name="second" class="one">
              <!--添加病虫害防治记录-->
              <div class="sf-but-two" id="open_btn_insect" @click="bchflag = true">添加病虫害防治记录</div>
              <!--表格内容-->
              <div class="sf-table">
                <el-table :data="viewBchfzList" style="width: 100%" :cell-style = "getRowheight" :header-cell-style="getRowClass" >
                  <el-table-column fixed prop="symc" label="施药名称" width="120" > </el-table-column>
                  <el-table-column prop="fzdx" label="防治对象" width="120" > </el-table-column>
                  <el-table-column prop="sybs" label="施用倍数" width="120" > </el-table-column>
                  <el-table-column prop="syl" label="施用量" width="120"> </el-table-column>
                  <el-table-column prop="in_date" label="防治日期" width="120"> </el-table-column>
                  <el-table-column prop="scdw" label="生产单位"> </el-table-column>
                  <el-table-column prop="bchfz_describe" label="描述" > </el-table-column>
                  <el-table-column prop="img_url" label="图片">
                    <template slot-scope="scope">
                      <img class="img" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_url" v-if="scope.row.img_url">
                    </template> 
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button size="mini" type="text" id="open_btn_insect" @click="updateEditBch(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="text" @click="ifDeleteBchfzjlRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--分页-->
              <div class="pageBlock">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChangeBchfz"
                  :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="totalPageSize_Bchfz">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="农事记录" name="third" class="one"><!--添加施肥记录-->
              <div class="sf-but" id="open_btn_ns" @click="nsjlflag = true">添加农事记录</div>
              <!--表格内容-->
              <div class="sf-table">
                <el-table :data="viewNsjlList" style="width: 100%" :cell-style = "getRowheight" :header-cell-style="getRowClass">
                  <el-table-column prop="in_date" label="日期" width="300"></el-table-column>
                  <!--<el-table-column prop="in_date" label="农事类型"></el-table-column>-->
                  <el-table-column prop="nsjl_describe" label="农事记录"> </el-table-column>
                  <el-table-column prop="img_url" label="图片">
                    <template slot-scope="scope">
                      <img class="img" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + scope.row.img_url" v-if="scope.row.img_url">
                    </template> 
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button size="mini" type="text" @click="updateEditNsjl(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="text" @click="ifDeleteNszjlRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--分页-->
              <div class="pageBlock">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChangeNsjl"
                  :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="totalPageSize_Nsjl">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!--新增土壤施肥-->
    <el-dialog top="80px" title="添加施肥记录" :visible.sync="centerEditDialogVisible" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--肥料名称-->
      <div class="tjsf-div2-row">
        <div class="left">肥料名称:</div>
        <div class="right">
          <el-input v-model="flmc_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥目的-->
      <div class="tjsf-div2-row">
        <div class="left">施肥目的:</div>
        <div class="right">
          <el-input v-model="sfmd_add" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <!--施量（kg）-->
      <div class="tjsf-div2-row">
        <div class="left">施量(kg):</div>
        <div class="right">
          <el-input v-model="sl_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施用方式-->
      <div class="tjsf-div2-row">
        <div class="left">施用方式:</div>
        <div class="right">
          <el-input v-model="syfs_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥日期-->
      <div class="tjsf-div2-row">
        <div class="left">施肥日期:</div>
        <div class="right">
          <el-date-picker v-model="in_date_add" type="date" size="large" value-format="yyyy-MM-dd"
            placeholder="选择日期" class="my-el-date-picker" clearable>
          </el-date-picker>
        </div>
      </div>
      <!--生产单位-->
      <div class="tjsf-div2-row">
        <div class="left">生产单位:</div>
        <div class="right">
          <el-input v-model="scdw_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">描述:</div>
        <div class="right">
          <el-input v-model="trsf_describe_add" placeholder="请输入内容" type="textarea"
            :rows="2"></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl">
              <img :src="imgUrl">
            </figure><!---->
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,1)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addNewTrsf()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <!--编辑土壤施肥-->
    <el-dialog top="80px" title="编辑施肥记录" :visible.sync="editTrsfFlag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--肥料名称-->
      <div class="tjsf-div2-row">
        <div class="left">肥料名称:</div>
        <div class="right">
          <el-input v-model="flmc_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥目的-->
      <div class="tjsf-div2-row">
        <div class="left">施肥目的:</div>
        <div class="right">
          <el-input v-model="sfmd_add" placeholder="请输入内容" type="textarea" :rows="2" clearable></el-input>
        </div>
      </div>
      <!--施量（kg）-->
      <div class="tjsf-div2-row">
        <div class="left">施量(kg):</div>
        <div class="right">
          <el-input v-model="sl_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施用方式-->
      <div class="tjsf-div2-row">
        <div class="left">施用方式:</div>
        <div class="right">
          <el-input v-model="syfs_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥日期-->
      <div class="tjsf-div2-row">
        <div class="left">施肥日期:</div>
        <div class="right">
          <el-date-picker v-model="in_date_add" type="date" size="large" value-format="yyyy-MM-dd"placeholder="选择日期" 
          class="my-el-date-picker" clearable> </el-date-picker>
        </div>
      </div>
      <!--生产单位-->
      <div class="tjsf-div2-row">
        <div class="left">生产单位:</div>
        <div class="right">
          <el-input v-model="scdw_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">描述:</div>
        <div class="right">
          <el-input v-model="trsf_describe_add" placeholder="请输入内容" type="textarea" :rows="2" clearable></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl">
              <img :src="imgUrl">
            </figure>
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,1)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="updateTrsf()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <!--新增病虫害防治   bchflag-->
    <el-dialog top="80px" title="病虫害防治记录" :visible.sync="bchflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--内容-->
      <!--肥料名称-->
      <div class="tjsf-div2-row">
        <div class="left">施药名称:</div>
        <div class="right">
          <el-input v-model="symc_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥目的-->
      <div class="tjsf-div2-row">
        <div class="left">防治对象:</div>
        <div class="right">
          <el-input v-model="fzdx_add" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <!--施量（kg）-->
      <div class="tjsf-div2-row">
        <div class="left">施用倍数:</div>
        <div class="right">
          <el-input v-model="sybs_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施用方式-->
      <div class="tjsf-div2-row">
        <div class="left">施用量:</div>
        <div class="right">
          <el-input v-model="syl_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥日期-->
      <div class="tjsf-div2-row">
        <div class="left">防治日期:</div>
        <!--<el-input v-model="input" placeholder="请输入内容" class="right"></el-input>-->
        <div class="right">
          <el-date-picker v-model="in_date_bch_add" type="date" size="large" value-format="yyyy-MM-dd"
            placeholder="选择日期" class="my-el-date-picker" clearable> </el-date-picker>
        </div>
      </div>
      <!--生产单位-->
      <div class="tjsf-div2-row">
        <div class="left">生产单位:</div>
        <div class="right">
          <el-input v-model="scdw_bch_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">描述:</div>
        <div class="right">
          <el-input v-model="bchfz_describe_add" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl2">
              <img :src="imgUrl2">
            </figure><!---->
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,2)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addNewBchfzjl()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <!--编辑病虫害防治   bchflag-->
    <el-dialog top="80px" title="编辑病虫害防治记录" :visible.sync="editBchflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--内容-->
      <!--肥料名称-->
      <div class="tjsf-div2-row">
        <div class="left">施药名称:</div>
        <div class="right">
          <el-input v-model="symc_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥目的-->
      <div class="tjsf-div2-row">
        <div class="left">防治对象:</div>
        <div class="right">
          <el-input v-model="fzdx_add" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <!--施量（kg）-->
      <div class="tjsf-div2-row">
        <div class="left">施用倍数:</div>
        <div class="right">
          <el-input v-model="sybs_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施用方式-->
      <div class="tjsf-div2-row">
        <div class="left">施用量:</div>
        <div class="right">
          <el-input v-model="syl_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--施肥日期-->
      <div class="tjsf-div2-row">
        <div class="left">防治日期:</div>
        <!--<el-input v-model="input" placeholder="请输入内容" class="right"></el-input>-->
        <div class="right">
          <el-date-picker v-model="in_date_bch_add" type="date" size="large" value-format="yyyy-MM-dd" placeholder="选择日期" 
          class="my-el-date-picker" clearable></el-date-picker>
        </div>
      </div>
      <!--生产单位-->
      <div class="tjsf-div2-row">
        <div class="left">生产单位:</div>
        <div class="right">
          <el-input v-model="scdw_bch_add" placeholder="请输入内容" clearable></el-input>
        </div>
      </div>
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">描述:</div>
        <div class="right">
          <el-input v-model="bchfz_describe_add" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl2">
              <img :src="imgUrl2">
            </figure>
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,2)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="updateBchfzjl()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <!--新增农事记录   nsjlflag-->
    <el-dialog top="200px" title="添加农事记录" :visible.sync="nsjlflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--农事日期-->
      <div class="tjsf-div2-row">
        <div class="left">农事日期:</div>
        <!--<el-input v-model="input" placeholder="请输入内容" class="right"></el-input>-->
        <div class="right">
          <el-date-picker  v-model="in_data_ns_add" type="date" size="large" value-format="yyyy-MM-dd" placeholder="选择日期" 
            class="my-el-date-picker" clearable></el-date-picker>
        </div>
      </div>
      <!--<div class="tjsf-div2-row">
        <div class="left">农事类型:</div>
        <el-input v-model="input" placeholder="请输入内容" class="right"></el-input>
        <div class="right">
          <el-select v-model="nsTypes" clearable placeholder="请选择" class="my-el-date-picker">
            <el-option label="采收" value="0"></el-option>
            <el-option label="其他" value="1"></el-option>
          </el-select>
        </div>
      </div>-->
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">农事记录:</div>
        <div class="right">
          <el-input v-model="nsjl_describe_ns_add" placeholder="请输入内容" type="textarea" :rows="3"></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row file-img">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl3">
              <img :src="imgUrl3">
            </figure><!---->
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,3)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addNewNsjl()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <!--编辑农事记录   nsjlflag-->
    <el-dialog top="200px" title="编辑农事记录" :visible.sync="editNsjlflag" :before-close="handleClose" :close-on-click-modal = "isclick"
      width="650px">
      <!--农事日期-->
      <div class="tjsf-div2-row">
        <div class="left">农事日期:</div>
        <!--<el-input v-model="input" placeholder="请输入内容" class="right"></el-input>-->
        <div class="right">
          <el-date-picker v-model="in_data_ns_add" type="date" size="large" value-format="yyyy-MM-dd" placeholder="选择日期" 
          class="my-el-date-picker" clearable> </el-date-picker>
        </div>
      </div>
      <!--<div class="tjsf-div2-row">
        <div class="left">农事类型:</div>
        <el-input v-model="input" placeholder="请输入内容" class="right"></el-input>
        <div class="right">
          <el-select v-model="nsTypes" clearable placeholder="请选择" class="my-el-date-picker">
            <el-option label="采收" value="0"></el-option>
            <el-option label="其他" value="1"></el-option>
          </el-select>
        </div>
      </div>-->
      <!--描述-->
      <div class="tjsf-div2-row">
        <div class="left">农事记录:</div>
        <div class="right">
          <el-input v-model="nsjl_describe_ns_add" placeholder="请输入内容" type="textarea" :rows="3"></el-input>
        </div>
      </div>
      <div class="tjsf-div2-row file-img">
        <div class="left">上传图片:</div>
        <div class="right">
          <div class="box-fileimg">
            <figure class="image" v-if="imgUrl3">
              <img :src="imgUrl3">
            </figure>
            <div class="submit">
              上传图片
              <form enctype="multipart/form-data" method="post"> 
                <input type="file" class="file" ref="file" multiple accept="image/*" @change="fileFun($event,3)">
              </form>
            </div>  
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="updateNsjl()" :disabled="disabled">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog top="100px" title="地块介绍" :visible.sync="isMoreMsg" width="600" :before-close="closeFun">
      <div class="more-msg">{{dkjs}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFun">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    viewFarmRecordPost,
    viewFarmBchfzPost,
    viewFarmNsjlPost,
    viewFarmTrsfjlPost,
    addFarmAddTrsfPost,
    addFarmAddBchfzPost,
    addFarmAddNsjlPost,
    deleteFarmTrsfPost,
    deleteFarmBchfzPost,
    deleteFarmNsjlPost,
    updateFarmTrsfPost,
    updateFarmBchfzPost,
    updateFarmNsjlPost
  } from "../../js/farmthings/farmworkget.js";

  export default {
    name: '',
    components: {},
    data() {
      return {
        activeName: 'first',
        test: '55555',
        isclick: false,
        publicAllId: '',
        localuserId: '',
        // 地块信息  名称  面积   品种   预计采摘时间  预计产量  地块负责人
        viewPlaceName: '',
        viewArea: '',
        viewPz: '',
        viewCjsj: '',
        viewYield: '',
        viewFzr: '',
        viewHzs: '',
        // 查看土壤施肥list
        viewTrsfList: [],
        viewBchfzList: [],
        viewNsjlList: [],
        // 添加施肥记录
        flmc_add: '',
        sfmd_add: '',
        sl_add: '',
        syfs_add: '',
        scdw_add: '',
        trsf_describe_add: '',
        in_date_add: '',
        trsf_id_add: '',
        // 土壤  病虫害   农事记录  flag
        centerEditDialogVisible: false,
        bchflag: false,
        nsjlflag: false,
        // 编辑土壤   病虫害   农事记录
        editTrsfFlag: false,
        editBchflag: false,
        editNsjlflag: false,
        // 添加病虫害记录
        symc_add: '',
        fzdx_add: '',
        sybs_add: '',
        syl_add: '',
        bchfz_describe_add: '',
        in_date_bch_add: '',
        scdw_bch_add: '',
        bch_id_add: '',
        // 农事记录
        in_data_ns_add: '',
        nsjl_describe_ns_add: '',
        nsjl_id_add: '',
        // 分页参数
        currentPage: 0,
        totalPageSize: 0,
        totalPageSize_Bchfz: 0,
        totalPageSize_Nsjl: 0,
        page_local:'1',
        page_local_bchfz:'1',
        page_local_nsjl:'1',
        dataTime: '',
        dkjs: '',
        imgUrl: '',
        imgUrl2: '',
        imgUrl3: '',
        nsTypes: '',
        img_url: '',
        imgArr: [],
        disabled: false,
        dkjs: '',
        isMore: true,
        isMoreMsg: false,
      }
    },
    mounted() {
      this.localuserId = JSON.parse(localStorage.getItem('userId'));
      this.publicAllId = this.$route.query.viewFarm.id
      this.getViewFarmRecord(this.$route.query.viewFarm.id,this.page_local);
      this.getViewFarmBchjl(this.$route.query.viewFarm.id,this.page_local_bchfz);
      this.getViewFarmNsjl(this.$route.query.viewFarm.id,this.page_local_nsjl);
    },
    methods: {
      moreFun(){
        this.isMoreMsg = true
      },
      closeFun(){
        this.isMoreMsg = false
      },
      fileFun(event,ele){
        this.img_url = ''
        this.imgArr = []
        var that = this;
        let file = event.target.files;
        let reg = /.(jpg|png|PNG|JPG)+$/;           
        if(file[0].size){
          let point = file[0].name.indexOf('.');
          if(!reg.test((file[0].name).slice(point))){
            this.$message.error("上传图片格式不支持");
            return;
          }
          let size = file[0].size / 1024 / 1024 ;
          if(size > 0.5){
            that.clarity = 0.5/size;
          }else{
            that.clarity = 1;
          }
          let reader = new FileReader();
          reader.readAsDataURL(file[0]); 
          reader.onload = function(){                    
            that.imgFun(reader.result,that.clarity,function(src){
              if(ele == 1){
                that.imgUrl = src
              }else if(ele == 2){
                that.imgUrl2 = src
              }else if(ele == 3){
                that.imgUrl3 = src
              }
              that.imgArr.push(src.slice(23))
            })
          }
        }
      },
      imgFun(path,quality,callback){
        let img = new Image();
        img.src = path;
        img.onload = function(){
          let that = this;
          let w = that.width;
          let h = that.height;
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d'); 
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh); 
            // 在canvas绘制前填充白色背景   
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(that, 0, 0, w, h);
          let base64 = canvas.toDataURL('image/jpeg', quality );
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      handleClick(tab, event) {
        if(tab.name == 'first'){

        }else if(tab.name == 'second'){

        }else if(tab.name == 'third'){
        }
      },
      // 添加施肥记录
      addSfjlnew() {
        var btn = document.getElementById('open_btn_sfjl');
        var div = document.getElementById('background-sfjl-add');
        var close = document.getElementById('close-button-sfjl-insect');
        btn.onclick = function show() {
          div.style.display = "block";
        };
        close.onclick = function close() {
          div.style.display = "none";
        }
        window.onclick = function close(e) {
          if (e.target == div) {
            div.style.display = "none";
          }
        }
      },
      // 获取页面数据
      getViewFarmRecord(a,page_local_par) {
        let viewnsjlParams = {
          id: a,
          page: page_local_par,
          cols: "10",
        };
        viewFarmRecordPost(viewnsjlParams)
          .then(res => {
            this.dataTime = res.data.dkxx_list[0].pick_date
            this.viewPlaceName = res.data.dkxx_list[0].place_name;
            this.img_url = res.data.dkxx_list[0].img_url
            this.viewArea = res.data.dkxx_list[0].area;
            this.viewPz = res.data.dkxx_list[0].pz;
            this.viewCjsj = res.data.dkxx_list[0].pick_date.slice(0, 10);
            this.viewYield = res.data.dkxx_list[0].yield;
            this.viewFzr = res.data.dkxx_list[0].fzr;
            this.viewHzs = res.data.dkxx_list[0].booth_name;
            this.dkjs = res.data.dkxx_list[0].remark
            this.viewTrsfList = res.data.trsf_data.trsf_list;
            this.totalPageSize =parseInt(res.data.trsf_data.condition.total) ;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      //  获取病虫害数据
      getViewFarmBchjl(a,page_local_par) {
        let viewBchjlParams = {
          id: a,
          page: page_local_par,
          cols: "10",
        };
        viewFarmBchfzPost(viewBchjlParams)
          .then(res => {
            this.viewBchfzList = res.data.bchfz_list;
            this.totalPageSize_Bchfz =parseInt(res.data.condition.total) ;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 获取种植信息中的农事记录
      getViewFarmNsjl(a,page_local_par) {
        let viewNsjlParams = {
          id: a,
          page: page_local_par,
          cols: "10",
        };
        viewFarmNsjlPost(viewNsjlParams)
          .then(res => {
            this.viewNsjlList = res.data.nsjl_list;
            this.totalPageSize_Nsjl =parseInt(res.data.condition.total) ;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 获取土壤施肥记录
      getViewFarmTrsf(a,page_local_par) {
        let viewNsjlParams = {
          id: a,
          page: page_local_par,
          cols: "10",
        };
        viewFarmTrsfjlPost(viewNsjlParams)
          .then(res => {
            this.viewTrsfList = res.data.trsf_list;
            this.totalPageSize = res.data.condition.total;
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 新增土壤施肥fw
      addNewTrsf() {
        this.disabled = true
        let addparams = {
          nsjl_dkxx_id: this.publicAllId,
          in_date: this.in_date_add,
          flmc: this.flmc_add,
          sfmd: this.sfmd_add,
          sl: this.sl_add,
          syfs: this.syfs_add,
          scdw: this.scdw_add,
          trsf_describe: this.trsf_describe_add,
          userId: this.localuserId,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        addFarmAddTrsfPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmTrsf(this.publicAllId,this.page_local);
              this.cleartrsf();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
            this.disabled = false
          })
      },
      // 编辑土壤施肥fw
      updateTrsfjl(index, row) {
        this.flmc_add = row.flmc
        this.sfmd_add = row.sfmd
        this.sl_add = row.sl
        this.in_date_add = row.in_date
        this.syfs_add = row.syfs
        this.scdw_add = row.scdw
        this.trsf_describe_add = row.trsf_describe
        this.trsf_id_add = row.id
        if(row.img_url){
          this.imgUrl = 'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + row.img_url
        }
        this.editTrsfFlag = true;
      },
      // 编辑病虫害防治
      updateEditBch(index, row) {
        this.in_date_bch_add = row.in_date
        this.scdw_bch_add = row.scdw
        this.symc_add = row.symc
        this.fzdx_add = row.fzdx
        this.sybs_add = row.sybs
        this.syl_add = row.syl
        this.bchfz_describe_add = row.bchfz_describe
        this.bch_id_add = row.id;
        this.editBchflag = true;
        if(row.img_url){
          this.imgUrl2 = 'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + row.img_url
        }
      },
      // 编辑农事记录
      updateEditNsjl(index, row) {
        this.in_data_ns_add = row.in_date
          this.nsjl_describe_ns_add = row.nsjl_describe
          this.nsjl_id_add = row.id
          this.editNsjlflag = true;
          this.imgUrl3 = row.img_url
          if(row.img_url){
            this.imgUrl3 = 'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + row.img_url
          }
      },
      // 保存编辑土壤施肥接口
      updateTrsf() {
        this.disabled = true
        let addparams = {
          flmc: this.flmc_add,
          sfmd: this.sfmd_add,
          sl: this.sl_add,
          in_date: this.in_date_add,
          syfs: this.syfs_add,
          scdw: this.scdw_add,
          trsf_describe: this.trsf_describe_add,
          id: this.trsf_id_add,
          userId: this.localuserId,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        updateFarmTrsfPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmTrsf(this.publicAllId,this.page_local);
              this.cleartrsf();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error(res.message);
            this.disabled = false
          })
      },
      // 关闭trsf按钮
      handleClose(done) {
        this.cleartrsf();
      },
      // 新增全部清空
      cleartrsf() {
        this.nsTypes = ''
        this.imgArr = []
        this.imgUrl = ''
        this.imgUrl2 = ''
        this.imgUrl3 = ''
        this.centerEditDialogVisible = false;
        this.bchflag = false;
        this.nsjlflag = false;
        // 编辑
        this.editTrsfFlag = false;
        this.editBchflag = false;
        this.editNsjlflag = false;
        //土壤施肥字段
        this.in_date_add = '',
        this.flmc_add = '',
        this.sfmd_add = '',
        this.sl_add = '',
        this.syfs_add = '',
        this.scdw_add = '',
        this.trsf_describe_add = '';
        // 防病虫害字段
        this.in_date_bch_add = '';
        this.scdw_bch_add = '';
        this.symc_add = '';
        this.fzdx_add = '';
        this.sybs_add = '';
        this.syl_add = '';
        // aqjg='';
        this.bchfz_describe_add = '';
        // 农事记录字段
        this.in_data_ns_add = '';
        this.nsjl_describe_ns_add = '';
      },
      // 病虫害防治记录fw
      addNewBchfzjl() {
        this.disabled = true
        let addparams = {
          nsjl_dkxx_id: this.publicAllId,
          in_date: this.in_date_bch_add,
          scdw: this.scdw_bch_add,
          symc: this.symc_add,
          fzdx: this.fzdx_add,
          sybs: this.sybs_add,
          syl: this.syl_add,
          aqjg: "",
          bchfz_describe: this.bchfz_describe_add,
          userId: this.localuserId,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        addFarmAddBchfzPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl2 = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmBchjl(this.publicAllId,this.page_local_bchfz);
              this.cleartrsf();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
            this.disabled = false
          })
      },
      // 编辑病虫害防治记录接口
      updateBchfzjl() {
        this.disabled = true
        let addparams = {
          symc: this.symc_add,
          fzdx: this.fzdx_add,
          syl: this.syl_add,
          in_date: this.in_date_bch_add,
          scdw: this.scdw_bch_add,
          sybs: this.sybs_add,
          bchfz_describe: this.bchfz_describe_add,
          id: this.bch_id_add,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        updateFarmBchfzPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl2 = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmBchjl(this.publicAllId,this.page_local_bchfz);
              this.handleClose();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
            this.disabled = false
          })
      },
      // Ns记录fw
      addNewNsjl() {
        this.disabled = true
        let addparams = {
          nsjl_dkxx_id: this.publicAllId,
          in_date: this.in_data_ns_add,
          nsjl_describe: this.nsjl_describe_ns_add,
          userId: this.localuserId,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        addFarmAddNsjlPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl3 = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmNsjl(this.publicAllId,this.page_local_nsjl);
              this.cleartrsf();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
            this.disabled = false
          })
      },
      // 更新Ns记录fw
      updateNsjl() {
        this.disabled = true
        let addparams = {
          id: this.nsjl_id_add,
          in_date: this.in_data_ns_add,
          nsjl_describe: this.nsjl_describe_ns_add,
          userId: this.localuserId,
          img_url: this.imgArr.length > 0 ? this.imgArr[0] : ''
        };
        updateFarmNsjlPost(addparams)
          .then(res => {
            this.disabled = false
            if(res.result == true){
              this.imgUrl3 = ''
              this.imgArr = []
              this.$message.success(res.message);
              this.getViewFarmNsjl(this.publicAllId,this.page_local_nsjl);
              this.cleartrsf();
            }else{
              this.disabled = false
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 关闭窗口
      closeWindow() {
        var div = document.getElementById('background');
        div.style.display = 'none'
      },
      // 关闭病虫害窗口
      closeWindowBch() {
        var div = document.getElementById('background-insect');
        div.style.display = 'none'
      },

      // 关闭农事窗口
      closeWindowNs() {
        var div = document.getElementById('background-ns');
        div.style.display = 'none'
      },
      // 删除土壤施肥记录
      ifDeleteTrsfRow(index, rows) {
        this.$confirm('此操作将永久删除该地块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTrsfRow(index, rows),
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteTrsfRow(index, rows) {
        this.deleteTrsfjl(rows.id);
      },
      deleteTrsfjl(a) {
        let deleteParams = {
          id: a,
        };
        deleteFarmTrsfPost(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getViewFarmTrsf(this.publicAllId,this.page_local_bchfz);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 删除病虫害防治记录
      ifDeleteBchfzjlRow(index, rows) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBchfzRow(index, rows),
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteBchfzRow(index, rows) {
        this.deleteBchfzjl(rows.id);
      },
      deleteBchfzjl(a) {
        let deleteParams = {
          id: a,
        };
        deleteFarmBchfzPost(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getViewFarmBchjl(this.publicAllId,this.page_local_bchfz);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      // 删除Nsjl中Nsjl记录
      ifDeleteNszjlRow(index, rows) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNsjlRow(index, rows),
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteNsjlRow(index, rows) {
        this.deleteNsjlz(rows.id);
      },
      deleteNsjlz(a) {
        let deleteParams = {
          id: a,
        };
        deleteFarmNsjlPost(deleteParams)
          .then(res => {
            this.$message.success(res.message);
            this.getViewFarmNsjl(this.publicAllId,this.page_local_nsjl);
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          })
      },
      //分页添加
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.page_local = val;
        this.getViewFarmTrsf(this.publicAllId,this.page_local);
      },
      handleCurrentChangeBchfz(val) {
        this.page_local_bchfz = val;
        this.getViewFarmBchjl(this.publicAllId,this.page_local_bchfz);
      },
      handleCurrentChangeNsjl(val) {
        this.page_local_nsjl = val;
        this.getViewFarmNsjl(this.publicAllId,this.page_local_nsjl);
      },
      getRowheight({row, column, rowIndex, columnIndex}) {
        return 'height:40px; padding: 0px 0;'
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#F5F5F5;height:40px; padding: 0px 0; '
        } else {
          return ''
        }
      },
    },
  }
</script>

<style scoped lang='less'>
  .more{
    padding: 0 10px;
    color: #409EFF;
    cursor: pointer;
  }
  .more-msg{
    text-indent: 30px;
  }
  .img{
    width: 80px;
    height: 80px;
  }
  .box-fileimg{
    display: flex;
    width: 300px;
    height: 80px;
    .submit{
      position: relative;
      top: 30%;
      left: 10px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      color: #409EFF;
      background: #fff;
      text-align: center;
      overflow: hidden;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #409EFF;
      .file{
        position: absolute;
        left: 0px;
        top: 0;
        width: 90px;
        height: 36px;
        opacity: 0;
        background: rgba(0,0,0,0);
      }
    }
    .image{
      width: 80px;
      height: 80px;
      vertical-align: middle;
      border: 1px solid #eaeaea;
      overflow: hidden;
      box-sizing: border-box;
      img{
        display: block;
        border: none;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .syacontent {
    background: #fff;
    padding: 10px;
    height: 100%;
  }
  /*遮罩层样式*/
  .tjsf-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 58px;
    font-size: 16px;
    font-weight: 600;
    .tjsf-title-inner {
      width: 414px;
      height: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      border-bottom: 0.5px solid gray;
    }
  }

  .tjsf-div2-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .left {
      width: 60px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .right {
      height: 50px;
      line-height: 50px;
      width: 300px;
      margin-left: 10px;
    }
  }
  .tjsf-div2-row-ns {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .left {
      width: 85px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .right {
      height: 50px;
      line-height: 50px;
      width: 250px;
      margin-left: 10px;
    }
  }
  .tjsf-foot {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    margin-top: 80px;
  }
  .tjsf-foot-ns {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    margin-top: 89px;
  }
  .my-el-date-picker {
    width: 300px;
  }
  #close-button {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }
  #close-button-insect {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }
  #close-button-sfjl-insect {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }
  #close-button-ns {
    font-size: 25px;
    color: gray;
    cursor: pointer;
  }
  #background {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #background-sfjl-add {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #background-insect {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #background-ns {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .div1 {
    background: #ffffff;
    width: 438px;
    height: 525px;
    margin: 12% auto;
    overflow: auto;
  }
  /*农事记录*/
  .div1-ns {
    background: #ffffff;
    width: 438px;
    height: 325px;
    margin: 23% auto;
    overflow: auto;
  }
  span {
    color: white;
    padding-top: 12px;
    cursor: pointer;
    padding-right: 15px;
  }
  .div2 {
    margin: auto;
    height: 320px;
    padding: 0 20px;
    margin-top: 10px;
  }
  .div2-ns {
    margin: auto;
    padding: 0 20px;
    margin-top: 10px;
  }
  /*内容样式*/
  .viewcentent {
    margin-left: 41px;
    margin-top: 23px;
    font-size: 14px;
    /*地块信息*/
    .plot-info {
      height: 300px;
      .plot-title {
        font-size: 16px;
        font-weight: 700;
        color: black;
      }
      .plot-info-one-row {
        height: 20px;
        margin-left: 62px;
        margin-top: 29px;
        display: flex;
        justify-content: space-between;
        .columnone {
          display: flex;
          justify-content: start;
          width: 380px ;
        }
        .columntwo {
          display: flex;
          justify-content: start;
          width: 380px;
        }
        .columnthree {
          display: flex;
          justify-content: start;
          width: 380px;
        }
        .column{
          
          width: 380px;
        }
        .columnone-dk{
          width: 1990px;
        }
        .columnoneimg{
          display: flex;
          img {
            margin-left: 20px;
            width: 80px;
            height: 80px;
          }
        }
      }
      .plot-info-two-row {
        margin-left: 62px;
        margin-top: 35px;
        display: flex;
        .lz-two-row{
        }
        .lz-two-row-ima{
          display: flex;
          img {
            margin-left: 20px;
            width: 10%;
            height: 10%;
          }
          .imgtwo {
            width: 8.6%;
            height: 8.6%;
          }
        }
      }
    }
    /*种植信息*/
    .plant-info {
      .plot-title {
        font-size: 16px;
        font-weight: 700;
        color: black;
      }
      .plant-content {
        margin-left: 62px;
        margin-top: 13px;
        .sf-but {
          width: 96px;
          height: 30px;
          cursor: pointer;
          background-color: #ffffff;
          border: 1px solid #5393FF;
          color: #5393FF;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          cursor: pointer;
        }
        .sf-but-two {
          width: 136px;
          height: 30px;
          background-color: #ffffff;
          border: 1px solid #5393FF;
          color: #5393FF;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          cursor: pointer;
        }
        .sf-table {
          margin-top: 10px;
        }
        .plant-content-title {
          display: flex;
          .btn-one {
            width: 190px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            margin-left: 2px;
            background-color: transparent;
            border-radius: 3px;
          }
          .btn-two {
            width: 190px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 2px;
            background-color: #83CDE6;
            border-radius: 3px;
          }
        }
      }
    }
  }
  .pageBlock{
    height: 80px;
    margin-top: 11px;
    display: flex;
    justify-content: center;
  }
  .file-img{
    margin-top: 40px;
  }
</style>
