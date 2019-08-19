// base url
export const baseUrl = 'http://192.168.1.14:8081/order_sht/';
export const baseUrl2 = 'http://192.168.1.45:8081/order_sht/';
// export const baseUrl3 = 'http://192.168.1.62:8081/order_sht/'; // 资产
export const baseUrl3 = 'https://mobile.zhdtech.com/test_sht/';  // 测试线上资产

// export const baseUrl = 'http://shtordertest.zhdtech.com:8080/order_sht/';//外网
// export const baseUrl = 'http://shop.zhdtech.com/';//外网
// export const baseUrl2 = 'http://shop.zhdtech.com/';//外网
// export const baseUrl3 = 'http://shop.zhdtech.com/';//外网
// export const baseUrl = 'http://47.92.44.95:14380/order_sht/';

// 登录地址接口
export const loginUrl = baseUrl + 'login/login';
export const loginout = baseUrl + 'login/loginout';// 登出
export const updatePassword = baseUrl + 'login/updatePassword'; // 修改密码


// superadmin用户模块
export const superGetUserList = baseUrl + 'login/getAllUser';//所有用户信息
export const superAddUser = baseUrl + 'login/insert';//新增用户
export const superEditUser = baseUrl + 'login/update';//修改用户
export const superDeleteUser = baseUrl + 'login/delete';//删除用户
export const superGetAddr = baseUrl + 'comm/getAllSSQX';//获取地区
export const getAllNode = baseUrl + 'login/getAllNode';//创建用户--所属节点
export const insertNodeInfo = baseUrl + 'login/insertNodeInfo';//添加市场
export const updateState = baseUrl + 'login/updateState';// 用户详情禁用启用
// superadmin角色模块地址
export const superRoleList = baseUrl + 'role/query'; //角色查询
export const superAddRole = baseUrl + 'role/add'; //创建角色
export const superDeleteRole = baseUrl + 'role/delete'; //删除角色
export const superEditRole = baseUrl + 'role/updateRole'; //编辑角色
export const superQueryRoleId = baseUrl + 'role/queryroleId'; //编辑角色时角色的权限ID
export const superParentRoleList = baseUrl +'function/getAllParent';//角色列表-父级
export const getRoleNode = baseUrl +'role/getRoleNode';// 获取节点列表
export const deleteRoleNode = baseUrl +'/role/deleteRoleNode';// 删除节点关系列表
export const insertRoleNode = baseUrl +'role/insertRoleNode';// 新增节点关系列表
export const deleteRoleNodeList = baseUrl +'role/deleteRoleNodeList';// 批量删除节点关系列表
export const downloadRoleNode = baseUrl +'role/downloadRoleNode';// 下载节点关系列表 接口
export const importRoleNode = baseUrl +'role/importRoleNode';// 导入节点关系列表 接口
// superadmin功能模块地址
export const superAllFunUrlList = baseUrl + 'function/getAllFunction'; //所有功能列表
export const superAllParentNode = baseUrl + 'function/getAllFun'; //所有父节点
export const superAddFun = baseUrl + 'function/insert'; //新增功能
export const superDelete = baseUrl + 'function/delete'; //删除功能
export const superEdit = baseUrl + 'function/update'; //编辑功能


//“管理”菜单
// 商户
export const queryMoneyLittleTime = baseUrl + 'redis/queryMoneyLittleTime'; //查询月总交易额
export const getAllBiz = baseUrl2 + 'manage/getAllBiz';// 查询商户列表
export const insertBiz = baseUrl + 'manage/insertBiz';// 新增商户
export const lookShop = baseUrl + 'manage/getBootListById';//新增商户-查看店铺
export const getAllBizType = baseUrl + 'manage/getAllBizType';//新增商户-商户类型
export const UpdateBizUser = baseUrl + 'manage/UpdateBizUser';// 商户详情 修改用户信息
export const UpdateBizBooth = baseUrl + 'manage/UpdateBizBooth';// 商户详情 修改商铺信息
// 供应商
export const getAllGys = baseUrl + 'manage/getAllGys';// 查询供应商列表
export const insertGys = baseUrl + 'manage/insertGys';// 新增供应商
export const downloadGys = baseUrl2 + 'manage/downloadGys';// 下载供应商
export const importGys = baseUrl2 + 'manage/importGys';// 导入供应商
// 客户
export const insertKh = baseUrl + 'manage/insertKh';// 新增客户
export const deleteGys = baseUrl + 'manage/deleteGys';// 删除供应商/商户
export const updateGys = baseUrl + 'manage/updateGys';// 编辑保存
export const supplierList = baseUrl + 'manage/getAllGysForMoreBiz';// 管理供应商
export const bindingSupplier = baseUrl + 'manage/getAllGysForBind';//管理供应商 - 绑定供应商列表
export const saveBindinSupplier  = baseUrl + 'manage/insertGysForBind';//管理供应商 - 绑定供应商保存
export const getCenterBussinessInfo  = baseUrl + 'manage/getCenterBussinessInfo';//// 营业执照号
export const importCustomer  = baseUrl + 'manage/importCustomer';//// 导入
export const downloadCustomer  = baseUrl2 + 'manage/downloadCustomer';//// 导出
//商品
export const entryGgoodsList = baseUrl + 'goods/getAllPurchaseGoodsForMoreBiz';// 管理商品 - 进货
export const sellGoodsList = baseUrl + 'goods/getAllSalesGoodsForMoreBiz';// 管理商品 - 销售
export const bindingGoods = baseUrl + 'goods/getAllGoodsForBind';// 管理商品 - 绑定商品列表
export const saveBindingGoods = baseUrl + 'goods/insertGoodsForBind';// 管理商品 - 绑定商品保存
export const getNodeApply = baseUrl + 'nodeApply/getNodeApply';// 获取申请列表
export const updateNodeApply = baseUrl + 'nodeApply/UpdateNodeApplyState';// 审核状态修改
export const queryMonitoring = baseUrl + 'nodeApply/queryMonitoring';// 对接信息监控
export const getNodeInfoXt = baseUrl + 'nodeApply/getNodeInfo';// 接入系统备案
//管理-设备管理
export const equipmentManagementList = baseUrl + 'sbgl/getAllSbxx';//设备管理 - 列表
export const equipmentManagementFactory = baseUrl + 'sbgl/getSbType';//设备管理-生产厂家
export const newAddEquipment = baseUrl + 'sbgl/insertSbxx';//设备管理 - 新增设备
export const editEquipment = baseUrl + 'sbgl/updateSbxx';//设备管理 - 修改设备信息
export const merchantsName = baseUrl + 'manage/getAllBiz';//设备管理-新增设备-查询商户名称
export const searchGoods = baseUrl + 'sbgl/getAllSaleGoods';//设备管理-快捷键绑定商品-搜索商品
export const deleteEquipment = baseUrl + 'sbgl/deleteSbxx';//设备管理-删除
export const queryBindMsg = baseUrl + 'sbgl/getAllSbGoods';//设备管理-查询当前设备绑定信息
export const bingKsys = baseUrl + 'sbgl/insertSbGoods';//设备管理-绑定商品
export const unBindKeys = baseUrl + 'sbgl/updateSbGoods';//设备管理-解绑商品



//“商品”菜单
//进货商品
export const queryAllSuppliers = baseUrl + 'goods/queryAllSuppliers';// 查询供应商列表（菜单选项）
export const querySpecification = baseUrl + 'goods/querySpecification';// 查询规格列表
export const queryPurchase = baseUrl + 'goods/queryPurchase ';// 查询进货商品列表
export const purchaseAdd  = baseUrl + 'goods/purchaseAdd  ';// 新增进货商品
export const getDefaultProductType = baseUrl + 'comm/getDefaultProductType';// 查询商品品种三级列表goods/GoodsCode
export const goodsCode = baseUrl + 'goods/GoodsCode';// 商品编码
export const updateGoodsImgForTrace = baseUrl + 'goods/updateGoodsImgForTrace';// 上传商品图片 + 上传追溯精选图片
//销售商品
export const querySales = baseUrl2 + 'goods/querySales';// 查询销售商品列表
export const salesAdd = baseUrl2 + 'goods/salesAdd';// 新增销售商品
export const getGoodsJdImg = baseUrl + 'goods/getGoodsJdImg';// 获取销售商品的 基地图片
export const updateGoodsJdImg = baseUrl2 + 'goods/updateGoodsJdImg';// 新增或者修改基地图片
export const deleteGoodsJdImg = baseUrl2 + 'goods/deleteGoodsJdImg';// 删除 基地图片
//单条商品
export const lookGoods = baseUrl2 + 'goods/lookGoods';// 查看商品详情
export const goodsUpdate = baseUrl2 + 'goods/goodsUpdate';// 编辑商品
export const deleteGoods = baseUrl2 + 'goods/deleteGoods';// 删除商品
// 原料
export const geStkOrigin = baseUrl2 + 'goods/geStkOrigin';// 查看原料
export const updateStkOr = baseUrl2 + 'goods/updateStkOr';// 编辑原料
export const deleteStkOr = baseUrl2 + 'goods/deleteStkOr';// 删除原料
export const insertStkOr = baseUrl2 + 'goods/insertStkOr';// 新增原料



// 区域
export const queryArea = baseUrl + 'region/getAllRegion';//查询区域
export const insertRegion = baseUrl + 'region/insertRegion' //新增市场区域
export const getAllRegion = baseUrl + 'region/getAllRegion' //获取市场区域
export const deleteRegion = baseUrl + 'region/deleteRegion' //删除市场区域
export const updateRegionAuto = baseUrl + 'region/updateRegionAuto' //否生成下游台账
// 绑定供应商
export const insertGysForBind = baseUrl + 'manage/insertGysForBind' // 绑定供应商
export const getAllGysForBind = baseUrl + 'manage/getAllGysForBind' // 点击绑定供应商查询该商户上级中未绑定的供应商
export const getAllGysForMoreBiz = baseUrl + 'manage/getAllGysForMoreBiz' // 查询多商户的某个区域下某个商户所有供应商
// 管理商品
export const queryPurchase2 = baseUrl + 'goods/queryPurchase ';// 查询进货商品列表
export const purchaseAdd2 = baseUrl + 'goods/purchaseAdd  ';// 新增进货商品
export const querySales2 = baseUrl + 'goods/querySales';// 查询销售商品列表
export const salesAdd2 = baseUrl + 'goods/salesAdd';// 新增销售商品
// 绑定商品
export const insertGoodsForBind = baseUrl + 'goods/insertGoodsForBind' // 绑定商品
export const getAllGoodsForBind = baseUrl + 'goods/getAllGoodsForBind' // 点击绑定商品查询该商户上级中未绑定的商品
export const getAllPurchaseGoodsForMoreBiz = baseUrl + 'goods/getAllPurchaseGoodsForMoreBiz' // 查询多商户的某个区域下某个商户所有商品
export const getAllSalesGoodsForMoreBiz = baseUrl + 'goods/getAllSalesGoodsForMoreBiz' // 查询多商户的某个区域下某个商户所有商品

//最新地址开始
//农事地址 http://192.168.1.14:8081/order_sht/farming/getAllDkxx  http://192.168.1.14:8081/order_sht/farming/insertDkxx
export const getFarmPlotListUrl = baseUrl + 'farming/getAllDkxx';// 获取地块list
export const addFarmPlot = baseUrl + 'farming/insertDkxx';// 增加地块
export const updateFarmPlot = baseUrl + 'farming/updateDkxx';// 更新地块
export const deleteFarmPlot = baseUrl + 'farming/deleteDkxx';// 删除地块

//查看农事记录相关地址
export const viewFarmRecord = baseUrl + 'farming/queryAllNsjl';// 查看农事记录
export const viewFarmRecordTrsf = baseUrl + 'farming/getAllTrsf';// 查看农事记录
export const viewFarmRecordBchfz = baseUrl + 'farming/getAllBchfz';// 查看病虫害防治记录
export const viewFarmRecordNsjl = baseUrl + 'farming/getAllNsjl';// 查看农事记录中的农事记录
export const viewFarmHzs = baseUrl + 'farming/queryShopBoooth';// 查看农事记录中的农事记录

export const cropMgm = baseUrl + 'farming/queryShopBoooth'; //合作社管理-查询列表
export const editSave = baseUrl + 'farming/UpdateBooth';//合作社管理-修改保存

//  farming/insertBchfz    farming/deleteBchfz   farming/insertNsjl    farming/deleteNsjl   farming/insertTrsf   farming/deleteTrsf

export const viewFarmAddTrsf = baseUrl + 'farming/insertTrsf';// 新增土壤施肥记录
export const viewFarmDeleteTrsf = baseUrl + 'farming/deleteTrsf';// 删除土壤施肥记录
export const viewFarmAddBchfz = baseUrl + 'farming/insertBchfz';// 新增病虫害防治记录
export const viewFarmDeleteBchfz = baseUrl + 'farming/deleteBchfz';// 删除病虫害防治记录
export const viewFarmAddNsjl = baseUrl + 'farming/insertNsjl';// 增加农事记录中的农事记录
export const viewFarmDeleteNsjl = baseUrl + 'farming/deleteNsjl';// 删除农事记录中的农事记录

//三个更新记录
export const viewFarmUpdateTrsf = baseUrl + 'farming/updateTrsf';// 更新土壤施肥记录
export const viewFarmUpdateBchfz = baseUrl + 'farming/updateBchfz';// 更新病虫害防治记录
export const viewFarmUpdateNsjl = baseUrl + 'farming/updateNsjl';// 更新农事记录中的农事记录



//溯源的相关的地址
export const symQueryUrl = baseUrl + 'farming/querySymApply';// 溯源码查询
export const symGetAllUrl = baseUrl + 'farming/getAllSymApply';// 获取所有溯源码
export const symInsertUrl = baseUrl + 'farming/insertSymApply';// 溯源码新增

//农事商品相关地址   
export const nsGoodsQueryUrl = baseUrl + 'farming/queryGoodsBreed';// 农事商品查询
export const nsGoodsInsertUrl = baseUrl + 'farming/insertGoodsBreed';// 农事商品新增
export const nsGoodsDeleteUrl = baseUrl + 'farming/deleteGoodsBreed';// 农事商品删除
export const nsGoodsUpdateUrl = baseUrl + 'farming/updateGoodsBreed';// 农事商品更新
export const nsGoodsNumberUrl = baseUrl + 'farming/GoodsCode';// 农事商品更新
export const nsHeZuoSheImagUrl = baseUrl + 'farming/insertJdxxDoc';// 变更合作社图片的接口

//农事审核
export const nsAuditQueryUrl = baseUrl + 'farming/querySymAudit';// 审核查询
export const nsAuditInsertUrl = baseUrl + 'farming/updateSymAudit';// 审核通过
export const nsAuditInsertOverUrl = baseUrl + 'farming/updateSymAuditturn';// 审核驳回
export const nsAuditDownloadUrl = baseUrl + 'farming/downloadTraceCode';// 下载审核码


//结束


// 设置
// 自定义设置
// ----台账管理
// -------进货台账 销售台账 进货 tz_type = 1 销售 tz_type = 2
export const getAllTzType = baseUrl + 'setting/getAllTzType';// 列表
export const updateTz = baseUrl + 'setting/update';// 点击编辑按钮默认列表
export const saveTzProperty = baseUrl + 'setting/saveTzProperty';// 编辑是否展示或者是否必填接口（默认字段）
export const saveTzUserdefineProperty = baseUrl + 'setting/saveTzUserdefineProperty';// 编辑是否展示或者是否必填接口（自定义字段）
export const deleteTzUserdefine = baseUrl + 'setting/deleteTzUserdefine';// 删除自定义字段
export const saveTzUserdefine = baseUrl + 'setting/saveTzUserdefine';// 进货保存按钮接口
// ----设备管理-下载称文件
export const downLoadDoc = baseUrl + 'sbgl/downloadSbGoods';//设备管理 - 下载称文件
// 企业信息
export const getNodeInfo = baseUrl + 'login/getNodeInfo';//获取企业信息
export const updateNodeInfo = baseUrl + 'login/updateNodeInfo';//修改企业信息
// 追溯模板
export const queryGoodsForTrace = baseUrl + 'goods/queryGoodsForTrace';//追溯精选蔬菜查询
export const queryGoodsForNoTrace = baseUrl + 'goods/queryGoodsForNoTrace';//追溯精选蔬菜添加时
export const insertGoodsForTrace = baseUrl + 'goods/insertGoodsForTrace';//追溯精选蔬菜删除  0代表删除，1代表选择为精选
export const getNodeZzrzForTrace = baseUrl + 'login/getNodeZzrzForTrace';//查询资质认证图片信息
export const deleteNodeZzrzForTrace = baseUrl + 'login/deleteNodeZzrzForTrace';//删除资质认证图片信息
export const uploadZzrzInfoForTrace = baseUrl + 'login/uploadZzrzInfoForTrace';//上传资质认证图片信息

// 台账
export const getAllTzGys = baseUrl + 'tz/getAllTzGys' // 获取台账供应商
// ----进货台账
export const queryInTzDetailRegion = baseUrl + 'tz/queryInTzDetailRegion' // 列表
export const tzAdd = baseUrl + 'tz/tzAdd' // 新增台账
export const tzUpdate = baseUrl + 'tz/tzUpdate' // 编辑台账
export const deleteTzByTzId =  baseUrl + 'tz/deleteTzByTzId';//删除进货台账
export const updatePc = baseUrl + 'setting/updatePc';// 点击编辑按钮默认列表
export const queryInTzDetailByTzId = baseUrl + 'tz/queryInTzDetailByTzId';// 台账详情
export const querySuppiler = baseUrl + 'tz/querySuppiler';// 供货单位
export const deleteDoc = baseUrl + 'originalDoc/deleteOriginalDoc';//删除单据
export const searchDoc =  baseUrl + 'originalDoc/getAllOriginalDoc';//查询单据originalDoc/insertOriginalDocFile
// 销售台账
export const queryXsTzDetailRegion = baseUrl + 'tz/queryXsTzDetailRegion' // 列表
export const downloadXsTzDetail = baseUrl + 'tz/downloadXsTzDetail' // 导出
export const queryXsTzDetailByTzId = baseUrl + 'tz/queryXsTzDetailByTzId' // 查看商品
//分析
export const getAllDash = baseUrl + 'bdp/getAllDash' // 列表baseUrl2 + '/bdp/toQx'
export const toQx = baseUrl + 'bdp/toQx' // 组织机构、用户
export const toMb = baseUrl + 'bdp/toMb' // 模块


//检测的相关地址
export const queryCheckList = baseUrl + 'check/getAllCheck' // 查询检测信息
export const addCheckItem = baseUrl + 'check/insertCheck' // 新增检测信息
export const deteleCheckItem = baseUrl + 'check/deleteCheck' // 删除检测信息
export const BaseImgUrl = 'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' // 删除检测信息
export const jcqueryPurchase = baseUrl + 'check/queryCheckGoods ';// 查询进货商品列表

// 统计
export const queryMoneyAndWeightForMarket = baseUrl + 'redis/queryMoneyAndWeightForMarket' //查询商品商户总额
export const queryMoneyAndWeightForBiz = baseUrl + 'redis/queryMoneyAndWeightForBiz' //查询商户交易额统计
export const queryMoneyAndWeightForGoods = baseUrl + 'redis/queryMoneyAndWeightForGoods' //查询商品交易额统计
export const queryGoodsRankCurrentYear = baseUrl + 'redis/queryGoodsRankCurrentYear' // 查询当年商品交易额排行
export const queryGoodsRankCurrentMonth = baseUrl + 'redis/queryGoodsRankCurrentMonth' // 查询当月商品交易额排行
export const queryGoodsRankCurrentWeek = baseUrl + 'redis/queryGoodsRankCurrentWeek' // 查询当周商品交易额排行
export const queryGoodsRankCurrentDay = baseUrl + 'redis/queryGoodsRankCurrentDay' // 查询当天商品交易额排行
export const queryBizRankCurrentWeek = baseUrl + 'redis/queryBizRankCurrentWeek' // 查询当周商户交易额排行
export const queryBizRankCurrentDay = baseUrl + 'redis/queryBizRankCurrentDay' // 查询当天商户交易额排行 
export const queryBizRankCurrentMonth = baseUrl + 'redis/queryBizRankCurrentMonth' // 查询当月商户交易额排行
export const queryBizRankCurrentYear = baseUrl + 'redis/queryBizRankCurrentYear' // 查询当年商户交易额排行
export const getTzInfoUploadDays = baseUrl + 'redis/getTzInfoUploadDays' // 该市场当月上传进货台账的商户信息（录入天数）
export const getTzInfoUploadBizNum = baseUrl + 'redis/getTzInfoUploadBizNum' //  该市场当月上传进货台账的商户信息（商户数）
export const getBizOnlineTime = baseUrl + 'redis/getBizOnlineTime' // 该市场当日电子秤最早在线时间
export const getGoodsWeightRankAndAvgPrice = baseUrl + 'redis/getGoodsWeightRankAndAvgPrice' // 商品交易量及价格走势(前10)
export const computNode = baseUrl + 'redis/computNode' // 某个市场统计页面 的总金额 ,总条数,总商户数,总商品数以及日同比，周同比、当月总金额 
export const computNodeNumWeek = baseUrl + 'redis/computNodeNumWeek' // 交易笔数周表数据
export const computPluNumWeek = baseUrl + 'redis/computPluNumWeek' // 交易商品周表数据
export const queryMoneyCurrentWeek = baseUrl + 'redis/queryMoneyCurrentWeek' // 查询本周交易额数据
export const queryMoneyCurrentMonth = baseUrl + 'redis/queryMoneyCurrentMonth' // 查询本月交易额数据
export const queryMoneyCurrentDayHour = baseUrl + 'redis/queryMoneyCurrentDayHour' // 查询当天24小时交易额数据
export const queryMoneyCurrentYear = baseUrl + 'redis/queryMoneyCurrentYear' // 查询当年商户交易额排行


// 供货单位
export const querySupplier = baseUrl + 'supplier/querySupplier' // 供货单位管理查询（超管）
export const insertSupplier = baseUrl + 'supplier/insertSupplier' // 新增供货单位（超管）
export const updateSupplier = baseUrl + 'supplier/updateSupplier' // 修改供货单位（超管）
export const deleteSupplier = baseUrl + 'supplier/deleteSupplier' // 删除供货单位（超管）
export const findSupplier = baseUrl + 'supplier/findSupplier' // 根据id查询供货单位（超管）
export const queryGyjd = baseUrl + 'supplier/queryGyjd' // 供应单位状态管理查询
export const toStart = baseUrl + 'supplier/toStart' //启用
export const toStop = baseUrl + 'supplier/toStop' // 禁用

// 生产
export const getAllProduction = baseUrl + 'production/getAllProduction' // 生产查询
export const queryGoodsinfo = baseUrl + 'production/queryGoodsinfo' // 搜索商品
export const queryPurchaseGoods = baseUrl + 'production/queryPurchaseGoods' // 查询进货商品信息
export const queryGoodsBatchId = baseUrl + 'production/queryGoodsBatchId' // 查询进货商品的批次号  选择批次号后填写重量
export const insertProduction = baseUrl + 'production/insertProduction' // 新增生产任务
export const queryPurchaseInfo = baseUrl + 'production/queryPurchaseInfo' // 查询进货信息
export const deleteProduction = baseUrl + 'production/deleteProduction' // 删除生产任务
export const downloadProduction = baseUrl + 'production/downloadProduction' // 下载文件
export const downloadBatchProduction = baseUrl + 'production/downloadBatchProduction' // 批量下载文件
export const findProduction = baseUrl + 'production/findProduction' // 查看生产详情

// 加工工艺
export const getAllProductionTech = baseUrl + 'farming/getAllProductionTech' // 查询加工工艺接口
export const insertProductionTech = baseUrl + 'farming/insertProductionTech' // 新增加工工艺接口
export const updateProductionTech = baseUrl + 'farming/updateProductionTech' // 更改加工工艺接口
export const deleteProductionTech = baseUrl + 'farming/deleteProductionTech' // 删除加工工艺接口

// 资产
export const queryAssetsUser = baseUrl3 + 'assets/queryAssetsUser' // 查询 所有资产用户信息（需要确定用户类型类型）
export const queryAssetsConf = baseUrl3 + 'assets/queryAssetsConf' // 2.查询 资产状态、所属期 等查询条件下拉框
export const queryAssetsType = baseUrl3 + 'assets/queryAssetsType' // 3.查询 资产类型树
export const queryNodeBase = baseUrl3 + 'assets/queryNodeBaseHasAssets' // 4.查询 所有节点
export const queryNodeBase2 = baseUrl3 + 'assets/queryNodeBase' // 4.查询 所有节点
export const queryBusiness = baseUrl3 + 'assets/queryBusiness' // 5.查询 所有商户
export const queryAssetsBase = baseUrl3 + 'assets/queryAssetsBase' // 6.查询资产信息
export const downloadAssetsBase = baseUrl3 + 'assets/downloadAssetsBase' // 7.导出资产信息
export const assetsAdd = baseUrl3 + 'assets/assetsAdd' // 8.新增资产
export const assetsUpdate = baseUrl3 + 'assets/assetsUpdate' // 9.修改资产
export const importAssets = baseUrl3 + 'assets/importAssets' // 10.资产批量导入 -- 新增
export const importAssetsUpdate = baseUrl3 + 'assets/importAssetsUpdate' // 11.资产批量导入 -- 修改
export const uploadPhotos = baseUrl3 + 'assets/uploadPhoto2' // 图片上传
export const muploadPhotos = baseUrl3 + 'assets/uploadPhotos' // 多图片上传
export const queryChangeListByAssetsId = baseUrl3 + 'assets/queryChangeListByAssetsId' // 资产--查询变更记录 
export const queryInspectinfoListByAssetsId = baseUrl3 + 'assets/queryInspectinfoListByAssetsId' // 资产--查询巡检记录 
export const queryMaintaininfoListByAssetsId = baseUrl3 + 'assets/queryMaintaininfoListByAssetsId' // 资产--查询维修记录
export const updateMoreAssetsStatus = baseUrl3 + 'assets/updateMoreAssetsStatus' // 批量变更
export const inspectMoreAssets = baseUrl3 + 'assets/inspectMoreAssets' // 批量巡检
export const addinspect = baseUrl3 + 'assets/addinspect' // 新增巡检
export const addAssetsType = baseUrl3 + 'assetsSet/addAssetsType' // 新增资产类型
export const setAssetsConf = baseUrl3 + 'assetsSet/setAssetsConf' // 配置资产-新增 资产状态、部件名称、所属期
export const deleteAssetsConf = baseUrl3 + 'assetsSet/deleteAssetsConf' // 配置资产-《删除》 资产状态、部件名称、所属期
export const queryInspect = baseUrl3 + 'assets/queryInspect' // 查询巡检信息
export const queryInspectId = baseUrl3 + 'assets/queryInspectId' // 根据巡检id查看巡检信息以及巡检记录
export const downloadInspect = baseUrl3 + 'assets/downloadInspect' // 导出巡检信息
export const deleteInspect = baseUrl3 + 'assets/deleteInspect' // 删除巡检记录
export const queryMaintain = baseUrl3 + 'assets/queryMaintain' // 查询维修信息
export const bar_code = baseUrl3 + 'assets/bar_code' // 根据条码号查询设备名称
export const maintainAdd = baseUrl3 + 'assets/maintainAdd' // 新增维修记录传资产id
export const downloadMaintain = baseUrl3 + 'assets/downloadMaintain' // 导出维修记录
export const queryMaintainId = baseUrl3 + 'assets/queryMaintainId' // 根据维修id查看维修信息以及维修记录
export const deleteMaintain = baseUrl3 + 'assets/deleteMaintain' // 删除维修记录
export const queryInspectionRecord = baseUrl3 + 'assets/queryInspectionRecord' // 查看个人的巡检记录
export const importMaintain = baseUrl3 + 'assets/importMaintain' // 维修导入
export const queryMaintainName = baseUrl3 + 'assets/queryMaintainName' // 维修新增输入条码号
export const updateAssetsType = baseUrl3 + 'assetsSet/updateAssetsType' // 修改资产类型
export const deleteAssetsType = baseUrl3 + 'assetsSet/deleteAssetsType' // 删除资产类型
export const updateAssetsConf = baseUrl3 + 'assetsSet/updateAssetsConf' // 配置资产-《修改》 资产状态、部件名称、所属期
export const queryAssetsSpecifications = baseUrl3 + 'assets/queryAssetsSpecifications' // 查询所有资产规格
export const queryAssetsNames = baseUrl3 + 'assets/queryAssetsNames' // 查询所有资产名称
export const queryAssetsManufacturers = baseUrl3 + 'assets/queryAssetsManufacturers' // 查询所有资产生产厂家

// 养殖场
export const getAllYzcxx = baseUrl + 'farming/getAllYzcxx' // 养殖场管理查询
export const insertYzcxx = baseUrl + 'farming/insertYzcxx' // 新增养殖场
export const updateYzcxx = baseUrl + 'farming/updateYzcxx' // 更新养殖场
export const deleteYzcxx = baseUrl + 'farming/deleteYzcxx' // 删除养殖场
export const uploadImg = baseUrl + 'farming/uploadImg' // 上传图片
export const getYzcImg = baseUrl + 'farming/getYzcImg' // 获取上传图片?id=1&type=1 id 为每个主体的主键，type （1：养殖场图片，2：档案图片，3：防疫图片。4：饲养图片）
export const deleteYzcImg = baseUrl + 'farming/deleteYzcImg' // 删除图片
export const getAllYzcda = baseUrl + 'farming/getAllYzcda' // 查看养殖场档案信息
export const insertYzcda = baseUrl + 'farming/insertYzcda' // 新增养殖场档案
export const updateYzcda = baseUrl + 'farming/updateYzcda' // 更新养殖场档案
export const deleteYzcda = baseUrl + 'farming/deleteYzcda' // 删除养殖场档案
export const getAllYzcfy = baseUrl + 'farming/getAllYzcfy' // 查看养殖场防疫
export const insertYzcfy = baseUrl + 'farming/insertYzcfy' // 新增养殖场防疫
export const updateYzcfy = baseUrl + 'farming/updateYzcfy' // 更新养殖场防疫
export const deleteYzcfy = baseUrl + 'farming/deleteYzcfy' // 删除养殖场防疫
export const getAllYzcsy = baseUrl + 'farming/getAllYzcsy' // 查询养殖场饲养
export const insertYzcsy = baseUrl + 'farming/insertYzcsy' // 新增养殖场饲养
export const updateYzcsy = baseUrl + 'farming/updateYzcsy' // 更新养殖场饲养记录
export const deleteYzcsy = baseUrl + 'farming/deleteYzcsy' // 删除养殖场饲养
// 屠宰
export const getAllYzctzjg = baseUrl + 'farming/getAllYzctzjg' // 查询屠宰加工
export const insertYzctzjg = baseUrl + 'farming/insertYzctzjg' // 新增屠宰加工
export const deleteYzctzjg = baseUrl + 'farming/deleteYzctzjg' // 删除屠宰加工
