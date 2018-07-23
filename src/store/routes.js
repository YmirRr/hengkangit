export default {
  //------------------------------------------------------------------------路由数据----------------------------------------------------------------------
  home: { name: 'home', url: '/home', parent: 'home', default: '/home' }, //首页
  order: { name: 'order', url: '/order/orderList/:id', parent: 'order', default: '/order/orderList/:id' }, //采购管理
  orderDetails: { name: 'orderDetails', url: '/order/orderDetails/:id', parent: 'order' },
  orderList: { name: 'orderList', url: '/order/orderList/:id', parent: 'order' },

  OuManage: { name: 'OuManage', url: '/OuManage/OuManageList/:id', parent: 'OuManage', default: '/OuManage/OuManageList/:id' }, //组织管理
  OuManageDetail: { name: 'OuManageDetail', url: '/OuManage/OuManageDetail/:id', parent: 'OuManage' },
  OuManageModify: { name: 'OuManageModify', url: '/OuManage/OuManageModify/:id', parent: 'OuManage' },
  OuManageList: { name: 'OuManageList', url: '/OuManage/OuManageList/:id', parent: 'OuManage' },
  OuManageImportFile: { name: 'OuManageImportFile', url: '/OuManage/OuManageImportFile/:id/:backRouterName', parent: 'OuManage' },

  attributeSpecification: { name: 'attributeSpecification', url: '/attributeSpecification/attributeSpecificationDetail/:id', parent: 'attributeSpecification', default: '/attributeSpecification/attributeSpecificationDetail/:id' }, //类目属性规格
  attributeSpecificationDetail: { name: 'attributeSpecificationDetail', url: '/attributeSpecification/attributeSpecificationDetail/:id', parent: 'attributeSpecification' },

  goodsFiles: { name: 'goodsFiles', url: '/goodsFiles/goodsFilesList/:id', parent: 'goodsFiles', default: '/goodsFiles/goodsFilesList/:id' }, //商品档案
  goodsFilesDetail: { name: 'goodsFilesDetail', url: '/goodsFiles/goodsFilesDetail/:id', parent: 'goodsFiles' },
  goodsFilesModify: { name: 'goodsFilesModify', url: '/goodsFiles/goodsFilesModify/:id', parent: 'goodsFiles' },
  goodsFilesList: { name: 'goodsFilesList', url: '/goodsFiles/goodsFilesList/:id', parent: 'goodsFiles' },
  goodsFilesImportFile: { name: 'goodsFilesImportFile', url: '/goodsFiles/goodsFilesImportFile/:id/:backRouterName', parent: 'goodsFiles' },
  // Record:{ name: 'Record', url: '/Record/commodityRecord/:id', parent: 'Record', default: '/Record/commodityRecord/:id' } , //商品档案
  // commodityRecord:{ name: 'commodityRecord', url: '/Record/commodityRecord/:id', parent: 'Record' } ,
  // commodityRecordDetails:{ name: 'commodityRecordDetails', url: '/Record/commodityRecordDetails/:id', parent: 'Record' } ,

  repository: { name: 'repository', url: '/repository/repositoryList/:id', parent: 'repository', default: '/repository/repositoryList/:id' }, //仓库管理
  repositoryList: { name: 'repositoryList', url: '/repository/repositoryList/:id', parent: 'repository' },
  repositoryData: { name: 'repositoryData', url: '/repository/repositoryData/:id', parent: 'repository' },
  repositoryModify: { name: 'repositoryModify', url: '/repository/repositoryModify/:id', parent: 'repository' },
  commodityPropertyofGoods: { name: 'commodityPropertyofGoods', url: '/commodityPropertyofGoods/:id', parent: 'commodityPropertyofGoods', default: '/commodityPropertyofGoods/:id' }, //商品品牌
  customer: { name: 'customer', url: '/customer/customerList/:id', parent: 'customer', default: '/customer/customerList/:id' }, //客户资料
  customerList: { name: 'customerList', url: '/customer/customerList/:id', parent: 'customer' },
  customerDetail: { name: 'customerDetail', url: '/customer/customerDetail/:id', parent: 'customer' },
  customerModify: { name: 'customerModify', url: '/customer/customerModify/:id', parent: 'customer' },

  supplier: { name: 'supplier', url: '/supplier/supplierList/:id', parent: 'supplier', default: '/supplier/supplierList/:id' }, //供应商资料
  supplierList: { name: 'supplierList', url: '/supplier/supplierList/:id', parent: 'supplier' },
  supplierDetail: { name: 'supplierDetail', url: '/supplier/supplierDetail/:id', parent: 'supplier' },
  supplierModify: { name: 'supplierModify', url: '/supplier/supplierModify/:id', parent: 'supplier' },
  //客户分类
  customerClass: { name: 'customerClass', url: '/customerClass/customerClassList/:id', parent: 'customerClass', default: '/customerClass/customerClassList/:id' }, //客户分类
  customerClassList: { name: 'customerClassList', url: '/customerClass/customerClassList/:id', parent: 'customerClass' },
  customerClassDetail: { name: 'customerClassDetail', url: '/customerClass/customerClassDetail/:id', parent: 'customerClass' },
  customerClassModify: { name: 'customerClassModify', url: '/customerClass/customerClassModify/:id', parent: 'customerClass' },
  account: { name: 'account', url: '/account/accountList/:id', parent: 'account', default: '/account/accountList/:id' }, //会计期间
  accountList: { name: 'accountList', url: '/account/accountList/:id', parent: 'account' },
  accountDetail: { name: 'accountDetail', url: '/account/accountDetail/:id', parent: 'account' },

  currency: { name: 'currency', url: '/currency/currencyList/:id', parent: 'currency', default: '/currency/currencyList/:id' }, //币种管理
  currencyList: { name: 'currencyList', url: '/currency/currencyList/:id', parent: 'currency' },

  commodityBrand: { name: 'commodityBrand', url: '/commodityBrand/:id', parent: 'commodityBrand', default: '/commodityBrand/:id' }, //商品品牌
  specificationOfGoods: { name: 'specificationOfGoods', url: '/specificationOfGoods/:id', parent: 'specificationOfGoods', default: '/specificationOfGoods/:id' }, //商品品牌

  bill: { name: 'bill', url: '/bill/billList/:id', parent: 'bill', default: '/bill/billList/:id' }, //模板2.0
  billDetails: { name: 'billDetails', url: '/bill/billDetails/:id', parent: 'bill' },
  billList: { name: 'billList', url: '/bill/billList/:id', parent: 'bill' },

  menu: { name: 'menu', url: '/menu/menuList/:id', parent: 'menu', default: '/menu/menuList/:id' }, //菜单管理
  menuDetail: { name: 'menuDetail', url: '/menu/menuDetail/:id', parent: 'menu' },
  menuList: { name: 'menuList', url: '/menu/menuList/:id', parent: 'menu' },
  menuModify: { name: 'menuModify', url: '/menu/menuModify/:id', parent: 'menu' },
  menuImportFile: { name: 'menuImportFile', url: '/menu/menuImportFile/:id/:backRouterName', parent: 'menu' },

  commodityProperty: { name: 'commodityProperty', url: '/commodityProperty/commodityPropertyList/:id', parent: 'commodityProperty', default: '/commodityProperty/commodityPropertyList/:id' }, //商品属性
  commodityPropertyDetails: { name: 'commodityPropertyDetails', url: '/commodityProperty/commodityPropertyDetails/:id', parent: 'commodityProperty' },
  commodityPropertyModify: { name: 'commodityPropertyModify', url: '/commodityProperty/commodityPropertyModify/:id', parent: 'commodityProperty' },
  commodityPropertyList: { name: 'commodityPropertyList', url: '/commodityProperty/commodityPropertyList/:id', parent: 'commodityProperty' },

  commercial: { name: 'commercial', url: '/commercial/commercialSpecification/:id', parent: 'commercial', default: '/commercial/commercialSpecification/:id' }, //商品规格
  commercialSpecification: { name: 'commercialSpecification', url: '/commercial/commercialSpecification/:id', parent: 'commercial' },
  commercialSpecificationDetails: { name: 'commercialSpecificationDetails', url: '/commercial/commercialSpecificationDetails/:id', parent: 'commercial' },
  commercialSpecificationModify: { name: 'commercialSpecificationModify', url: '/commercial/commercialSpecificationModify/:id', parent: 'commercial' },

  commodityleimu: { name: 'commodityleimu', url: '/commodityleimu/commodityClassHeading/:id', parent: 'commodityleimu', default: '/commodityleimu/commodityClassHeading/:id' }, //商品类目
  CommodityCategoriesDetails: { name: 'CommodityCategoriesDetails', url: '/commodityleimu/CommodityCategoriesDetails/:id', parent: 'commodityleimu' },
  commodityClassHeading: { name: 'commodityClassHeading', url: '/commodityleimu/commodityClassHeading/:id', parent: 'commodityleimu' },

  storeHouse: { name: 'storeHouse', url: '/storeHouse/storeHouseList/:id', parent: 'storeHouse', default: '/storeHouse/storeHouseList/:id' }, //仓库演示
  storeHouseModify: { name: 'storeHouseModify', url: '/storeHouse/storeHouseModify/:id', parent: 'storeHouse' },
  storeHouseList: { name: 'storeHouseList', url: '/storeHouse/storeHouseList/:id', parent: 'storeHouse' },

  Property: { name: 'Property', url: '/Property/classProperty/:id', parent: 'Property', default: '/Property/classProperty/:id' }, //类目属性规格
  classProperty: { name: 'classProperty', url: '/Property/classProperty/:id', parent: 'Property' },
  classPropertyDetails: { name: 'classPropertyDetails', url: '/Property/classPropertyDetails/:id', parent: 'Property' },

  specification: { name: 'specification', url: '/specification/specificationOfGoodsList/:id', parent: 'specification', default: '/specification/specificationOfGoodsList/:id' }, //商品规格组
  specificationOfGoodsList: { name: 'specificationOfGoodsList', url: '/specification/specificationOfGoodsList/:id', parent: 'specification' },
  specificationOfGoodsDetails: { name: 'specificationOfGoodsDetails', url: '/specification/specificationOfGoodsDetails/:id', parent: 'specification' },
  specificationOfGoodsModify: { name: 'specificationOfGoodsModify', url: '/specification/specificationOfGoodsModify/:id', parent: 'specification' },

  tenant: { name: 'tenant', url: '/tenant/tenantManagement/:id', parent: 'tenant', default: '/tenant/tenantManagement/:id' }, //租户管理
  tenantManagement: { name: 'tenantManagement', url: '/tenant/tenantManagement/:id', parent: 'tenant' },
  tenantManagementAdd: { name: 'tenantManagementAdd', url: '/tenant/tenantManagementAdd/:id', parent: 'tenant' },

  groupManage: { name: 'groupManage', url: '/groupManage/groupManageList/:id', parent: 'groupManage', default: '/groupManage/groupManageList/:id' }, //集团管理
  groupManageList: { name: 'groupManageList', url: '/groupManage/groupManageList/:id', parent: 'groupManage' },

  businessArea: { name: 'businessArea', url: '/businessArea/businessAreaList/:id', parent: 'businessArea', default: '/businessArea/businessAreaList/:id' }, //业务地区管理
  businessAreaList: { name: 'businessAreaList', url: '/businessArea/businessAreaList/:id', parent: 'businessArea' },
  businessAreaDetail: { name: 'businessAreaDetail', url: '/businessArea/businessAreaDetail/:id', parent: 'businessArea' },
  businessAreaModify: { name: 'businessAreaModify', url: '/businessArea/businessAreaModify/:id', parent: 'businessArea' },
  businessAreaImportFile: { name: 'businessAreaImportFile', url: '/businessArea/businessAreaImportFile/:id/:backRouterName', parent: 'businessArea' },

  department: { name: 'department', url: '/department/departmentList/:id', parent: 'department', default: '/department/departmentList/:id' }, //部门资料
  departmentList: { name: 'departmentList', url: '/department/departmentList/:id', parent: 'department' },
  departmentDetail: { name: 'departmentDetail', url: '/department/departmentDetail/:id', parent: 'department' },
  departmentModify: { name: 'departmentModify', url: '/department/departmentModify/:id', parent: 'department' },

  shop: { name: 'shop', url: '/shop/shopList/:id', parent: 'shop', default: '/shop/shopList/:id' }, //店铺资料
  shopList: { name: 'shopList', url: '/shop/shopList/:id', parent: 'shop' },
  shopDetail: { name: 'shopDetail', url: '/shop/shopDetail/:id', parent: 'shop' },
  shopModify: { name: 'shopModify', url: '/shop/shopModify/:id', parent: 'shop' },

  dictionary: { name: 'dictionary', url: '/dictionary/dictionaryList/:id', parent: 'dictionary', default: '/dictionary/dictionaryList/:id' }, //系统字典
  dictionaryList: { name: 'dictionaryList', url: '/dictionary/dictionaryList/:id', parent: 'dictionary' },

  user: { name: 'user', url: '/user/userList/:id', parent: 'user', default: '/user/userList/:id' }, //用户资料
  userList: { name: 'userList', url: '/user/userList/:id', parent: 'user' },
  userDetail: { name: 'userDetail', url: '/user/userDetail/:id', parent: 'user' },
  userModify: { name: 'userModify', url: '/user/userModify/:id', parent: 'user' },
  userImportFile: { name: 'userImportFile', url: '/user/userImportFile/:id/:backRouterName', parent: 'user' },

  userGroup: { name: 'userGroup', url: '/userGroup/userGroupList/:id', parent: 'userGroup', default: '/userGroup/userGroupList/:id' }, //用户组
  userGroupList: { name: 'userGroupList', url: '/userGroup/userGroupList/:id', parent: 'userGroup' },
  userGroupDetail: { name: 'userGroupDetail', url: '/userGroup/userGroupDetail/:id', parent: 'userGroup' },
  userGroupModify: { name: 'userGroupModify', url: '/userGroup/userGroupModify/:id', parent: 'userGroup' },
  userGroupImportFile: { name: 'userGroupImportFile', url: '/userGroup/userGroupImportFile/:id/:backRouterName', parent: 'userGroup' },

  role: { name: 'role', url: '/role/roleList/:id', parent: 'role', default: '/role/roleList/:id' }, //角色资料
  roleList: { name: 'roleList', url: '/role/roleList/:id', parent: 'role' },
  roleDetail: { name: 'roleDetail', url: '/role/roleDetail/:id', parent: 'role' },
  roleModify: { name: 'roleModify', url: '/role/roleModify/:id', parent: 'role' },
  roleImportFile: { name: 'roleImportFile', url: '/role/roleImportFile/:id/:backRouterName', parent: 'role' },
  //职员资料
  staff: { name: 'staff', url: '/staff/staffList/:id', parent: 'staff', default: '/staff/staffList/:id' },
  staffList: { name: 'staffList', url: '/staff/staffList/:id', parent: 'staff' },
  staffDetail: { name: 'staffDetail', url: '/staff/staffDetail/:id', parent: 'staff' },
  staffModify: { name: 'staffModify', url: '/staff/staffModify/:id', parent: 'staff' },
  //计量单位
  unitOfMeasurement: { name: 'unitOfMeasurement', url: '/unitOfMeasurement/unitOfMeasurementList/:id', parent: 'unitOfMeasurement', default: '/unitOfMeasurement/unitOfMeasurementList/:id' },
  unitOfMeasurementList: { name: 'unitOfMeasurementList', url: '/unitOfMeasurement/unitOfMeasurementList/:id', parent: 'unitOfMeasurement', default: '/unitOfMeasurement/unitOfMeasurementList/:id' },
  //行政地区
  adminstrArea: { name: 'adminstrArea', url: '/adminstrArea/adminstrAreaList/:id', parent: 'adminstrArea', default: '/adminstrArea/adminstrAreaList/:id' },
  adminstrAreaList: { name: 'adminstrAreaList', url: '/adminstrArea/adminstrAreaList/:id', parent: 'adminstrArea', default: '/adminstrArea/adminstrAreaList/:id' },
  adminstrAreaDetail: { name: 'adminstrAreaDetail', url: '/adminstrArea/adminstrAreaDetail/:id', parent: 'adminstrArea', default: '/adminstrArea/adminstrAreaDetail/:id' },
  adminstrAreaModify: { name: 'adminstrAreaModify', url: '/adminstrArea/adminstrAreaModify/:id', parent: 'adminstrArea', default: '/adminstrArea/adminstrAreaModify/:id' },

  //供应商分类
  supplierClassify: { name: 'supplierClassify', url: '/supplierClassify/supplierClassifyList/:id', parent: 'supplierClassify', default: '/supplierClassify/supplierClassifyList/:id' },
  supplierClassifyList: { name: 'supplierClassifyList', url: '/supplierClassify/supplierClassifyList/:id', parent: 'supplierClassify', default: '/supplierClassify/supplierClassifyList/:id' },
  supplierClassifyDetail: { name: 'supplierClassifyDetail', url: '/supplierClassify/supplierClassifyDetail/:id', parent: 'supplierClassify', default: '/supplierClassify/supplierClassifyDetail/:id' },
  supplierClassifyModify: { name: 'supplierClassifyModify', url: '/supplierClassify/supplierClassifyModify/:id', parent: 'supplierClassify', default: '/supplierClassify/supplierClassifyModify/:id' },
  //编码规则
  ruleCode: { name: 'ruleCode', url: '/ruleCode/ruleCodeList/:id', parent: 'ruleCode', default: '/ruleCode/ruleCodeList/:id' },
  ruleCodeList: { name: 'ruleCodeList', url: '/ruleCode/ruleCodeList/:id', parent: 'ruleCode' },
  ruleCodeDetail: { name: 'ruleCodeDetail', url: '/ruleCode/ruleCodeDetail/:id', parent: 'ruleCode' },
  ruleCodeModify: { name: 'ruleCodeModify', url: '/ruleCode/ruleCodeModify/:id', parent: 'ruleCode' },
  //会员等级
  memberLevel: { name: 'memberLevel', url: '/memberLevel/memberLevelList/:id', parent: 'memberLevel', default: '/memberLevel/memberLevelList/:id' },
  memberLevelList: { name: 'memberLevelList', url: '/memberLevel/memberLevelList/:id', parent: 'memberLevel', default: '/memberLevel/memberLevelList/:id' },
  memberLevelDetail: { name: 'memberLevelDetail', url: '/memberLevel/memberLevelDetail/:id', parent: 'memberLevel', default: '/memberLevel/memberLevelDetail/:id' },
  memberLevelModify: { name: 'memberLevelModify', url: '/memberLevel/memberLevelModify/:id', parent: 'memberLevel', default: '/memberLevel/memberLevelModify/:id' },
  //会员注册
  memberReg: { name: 'memberReg', url: '/memberReg/memberRegDetail/:id', parent: 'memberReg', default: '/memberReg/memberRegDetail/:id' },
  memberRegDetail: { name: 'memberRegDetail', url: '/memberReg/memberRegDetail/:id', parent: 'memberReg', default: '/memberReg/memberRegDetail/:id' },
  //积分变动
  integralChange: { name: 'integralChange', url: '/integralChange/integralChangeDetail/:id', parent: 'integralChange', default: '/integralChange/integralChangeDetail/:id' },
  integralChangeDetail: { name: 'integralChangeDetail', url: '/integralChange/integralChangeDetail/:id', parent: 'integralChange' },
  //积分记录
  integralRecord: { name: 'integralRecord', url: '/integralRecord/integralRecordList/:id', parent: 'integralRecord', default: '/integralChange/integralRecordList/:id' },
  integralRecordList: { name: 'integralRecordList', url: '/integralRecord/integralRecordList/:id', parent: 'integralRecord' },
  integralRecordList: { name: 'integralRecordList', url: '/integralRecord/integralRecordList/:id', parent: 'integralRecord' },
  //多倍积分
  integralFactor: { name: 'integralFactor', url: '/integralFactor/integralFactorList/:id', parent: 'integralFactor', default: '/integralFactor/integralFactorList/:id' },
  integralFactorList: { name: 'integralFactorList', url: '/integralFactor/integralFactorList/:id', parent: 'integralFactor' },
  integralFactorBirth: { name: 'integralFactorBirth', url: '/integralFactor/integralFactorBirth/:id', parent: 'integralFactor' },

  integralBirthModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  integralFactorMember: { name: 'integralFactorMember', url: '/integralFactor/integralFactorMember/:id', parent: 'integralFactor' },
  integralMemberModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  integralFactorHoliday: { name: 'integralFactorHoliday', url: '/integralFactor/integralFactorHoliday/:id', parent: 'integralFactor' },
  integralHolidayModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  integralFactorCommodity: { name: 'integralFactorCommodity', url: '/integralFactor/integralFactorCommodity/:id', parent: 'integralFactor' },
  integralCommodityModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  //兑换策略
  convertibilityStrategy: { name: 'convertibilityStrategy', url: '/convertibilityStrategy/convertibilityStrategyList/:id', parent: 'convertibilityStrategy', default: '/convertibilityStrategy/convertibilityStrategyList/:id' },
  convertibilityStrategyList: { name: 'convertibilityStrategyList', url: '/convertibilityStrategy/convertibilityStrategyList/:id', parent: 'convertibilityStrategy' },
  convertibilityStrategyDetail: { name: 'convertibilityStrategyDetail', url: '/convertibilityStrategy/convertibilityStrategyDetail/:id', parent: 'convertibilityStrategy' },
  convertibilityStrategyModify: { name: 'convertibilityStrategyModify', url: '/convertibilityStrategy/convertibilityStrategyModify/:id', parent: 'convertibilityStrategy' },

  integralFactorMember: { name: 'integralFactorMember', url: '/integralFactor/integralFactorMember/:id', parent: 'integralFactor' },
  integralMemberModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  integralFactorHoliday: { name: 'integralFactorHoliday', url: '/integralFactor/integralFactorHoliday/:id', parent: 'integralFactor' },
  integralHolidayModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },
  integralFactorCommodity: { name: 'integralFactorCommodity', url: '/integralFactor/integralFactorCommodity/:id', parent: 'integralFactor' },
  integralCommodityModify: { name: 'integralBirthModify', url: '/integralFactor/integralBirthModify/:id', parent: 'integralFactor' },


  //日常管理
  dailyManage: { name: 'dailyManage', url: '/dailyManage/dailyManageDetail/:id', parent: 'dailyManage', default: '/dailyManage/dailyManageDetail/:id' },
  dailyManageDetail: { name: 'dailyManageDetail', url: '/dailyManage/dailyManageDetail/:id', parent: 'dailyManage' },
  //状态变更
  statusChange: { name: 'statusChange', url: '/statusChange/statusChangeDetail/:id', parent: 'statusChange', default: '/statusChange/statusChangeDetail/:id' },
  statusChangeDetail: { name: 'statusChangeDetail', url: '/statusChange/statusChangeDetail/:id', parent: 'statusChange', default: '/statusChange/statusChangeDetail/:id' },
  //会员延期
  memberDelay: { name: 'memberDelay', url: '/memberDelay/memberDelayDetail/:id', parent: 'memberDelay', default: '/memberDelay/memberDelayDetail/:id' },
  memberDelayDetail: { name: 'memberDelayDetail', url: '/memberDelay/memberDelayDetail/:id', parent: 'memberDelay', default: '/memberDelay/memberDelayDetail/:id' },
  //等级变更
  levelChange: { name: 'levelChange', url: '/levelChange/levelChangeDetail/:id', parent: 'levelChange', default: '/levelChange/levelChangeDetail/:id' },
  levelChangeDetail: { name: 'levelChangeDetail', url: '/levelChange/levelChangeDetail/:id', parent: 'levelChange', default: '/levelChange/levelChangeDetail/:id' },
  //会员换卡
  changeCard: { name: 'changeCard', url: '/changeCard/changeCardDetail/:id', parent: 'changeCard', default: '/changeCard/changeCardDetail/:id' },
  changeCardDetail: { name: 'changeCardDetail', url: '/changeCard/changeCardDetail/:id', parent: 'changeCard', default: '/changeCard/changeCardDetail/:id' },
  //注册赠送
  regGive: { name: 'regGive', url: '/regGive/regGiveList/:id', parent: 'regGive', default: '/regGive/regGiveList/:id' },
  regGiveList: { name: 'regGiveList', url: '/regGive/regGiveList/:id', parent: 'regGive' },
  regGiveDetail: { name: 'regGiveDetail', url: '/regGive/regGiveDetail/:id', parent: 'regGive' },
  regGiveModify: { name: 'regGiveModify', url: '/regGive/regGiveModify/:id', parent: 'regGive' },
  //消费赠送
  consumeGive: { name: 'consumeGive', url: '/consumeGive/consumeGiveList/:id', parent: 'consumeGive', default: '/consumeGive/consumeGiveList/:id' },
  consumeGiveList: { name: 'consumeGiveList', url: '/consumeGive/consumeGiveList/:id', parent: 'consumeGive' },
  consumeGiveDetail: { name: 'consumeGiveDetail', url: '/consumeGive/consumeGiveDetail/:id', parent: 'consumeGive' },
  consumeGiveModify: { name: 'consumeGiveModify', url: '/consumeGive/consumeGiveModify/:id', parent: 'consumeGive' },
  //充值赠送
  rechargeGive: { name: 'rechargeGive', url: '/rechargeGive/rechargeGiveList/:id', parent: 'rechargeGive', default: '/rechargeGive/rechargeGiveList/:id' },
  rechargeGiveList: { name: 'rechargeGiveList', url: '/rechargeGive/rechargeGiveList/:id', parent: 'rechargeGive' },
  rechargeGiveDetail: { name: 'rechargeGiveDetail', url: '/rechargeGive/rechargeGiveDetail/:id', parent: 'rechargeGive' },
  rechargeGiveModify: { name: 'rechargeGiveModify', url: '/rechargeGive/rechargeGiveModify/:id', parent: 'rechargeGive' },
  //升级赠送
  upgradeGive: { name: 'upgradeGive', url: '/upgradeGive/upgradeGiveList/:id', parent: 'upgradeGive', default: '/upgradeGive/upgradeGiveList/:id' },
  upgradeGiveList: { name: 'upgradeGiveList', url: '/upgradeGive/upgradeGiveList/:id', parent: 'upgradeGive' },
  upgradeGiveDetail: { name: 'upgradeGiveDetail', url: '/upgradeGive/upgradeGiveDetail/:id', parent: 'upgradeGive' },
  upgradeGiveModify: { name: 'upgradeGiveModify', url: '/upgradeGive/upgradeGiveModify/:id', parent: 'upgradeGive' },
  //推荐赠送
  recoGive: { name: 'recoGive', url: '/recoGive/recoGiveList/:id', parent: 'recoGive', default: '/recoGive/recoGiveList/:id' },
  recoGiveList: { name: 'recoGiveList', url: '/recoGive/recoGiveList/:id', parent: 'recoGive' },
  recoGiveDetail: { name: 'recoGiveDetail', url: '/recoGive/recoGiveDetail/:id', parent: 'recoGive' },
  recoGiveModify: { name: 'recoGiveModify', url: '/recoGive/recoGiveModify/:id', parent: 'recoGive' },
  //会员分组
  memberGroup: { name: 'memberGroup', url: '/memberGroup/memberGroupList/:id', parent: 'memberGroup', default: '/memberGroup/memberGroupList/:id' },
  memberGroupList: { name: 'memberGroupList', url: '/memberGroup/memberGroupList/:id', parent: 'memberGroupList', default: '/memberGroup/memberGroupList/:id' },
  memberGroupDetail: { name: 'memberGroupDetail', url: '/memberGroup/memberGroupDetail/:id', parent: 'memberGroupDetail', default: '/memberGroup/memberGroupDetail/:id' },
  memberGroupData: { name: 'memberGroupData', url: '/memberGroup/memberGroupData/:id', parent: 'memberGroupData', default: '/memberGroup/memberGroupData/:id' },
  memberGroup: { name: 'memberGroup', url: '/memberGroup/memberGroupList/:id', parent: 'memberGroup', default: '/memberGroup/memberGroupList/:id' },
  memberGroupList: { name: 'memberGroupList', url: '/memberGroup/memberGroupList/:id', parent: 'memberGroupList', default: '/memberGroup/memberGroupList/:id' },
  memberGroupDetail: { name: 'memberGroupDetail', url: '/memberGroup/memberGroupDetail/:id', parent: 'memberGroupDetail', default: '/memberGroup/memberGroupDetail/:id' },
  memberGroupModify: { name: 'memberGroupModify', url: '/memberGroup/memberGroupModify/:id', parent: 'memberGroupModify', default: '/memberGroup/memberGroupModify/:id' },
  memberGroupData: { name: 'memberGroupData', url: '/memberGroup/memberGroupData/:id', parent: 'memberGroupData', default: '/memberGroup/memberGroupData/:id' },

  //会员自定义属性
  memberAttributes: { name: 'memberAttributes', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },
  memberAttributesList: { name: 'memberAttributesList', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },
  memberAttributes: { name: 'memberAttributes', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },
  memberAttributesList: { name: 'memberAttributesList', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },

  memberAttributes: { name: 'memberAttributes', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },
  memberAttributesList: { name: 'memberAttributesList', url: '/memberAttributes/memberAttributesList/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesList/:id' },

  memberAttributesModify: { name: 'memberAttributesModify', url: '/memberAttributes/memberAttributesModify/:id', parent: 'memberAttributes', default: '/memberAttributes/memberAttributesModify/:id' },
  //会员自定义属性值
  memberAttributesValue: { name: 'memberAttributesValue', url: '/memberAttributesValue/memberAttributesValueList/:id', parent: 'memberAttributesValue', default: '/memberAttributesValue/memberAttributesValueList/:id' },
  memberAttributesValueList: { name: 'memberAttributesValueList', url: '/memberAttributesValue/memberAttributesValueList/:id', parent: 'memberAttributesValue', default: '/memberAttributesValue/memberAttributesValueList/:id' },




  //会员资料
  memberInformation: { name: 'memberInformation', url: '/memberInformation/memberInformationDetail/:id', parent: 'memberInformation', default: '/memberInformation/memberInformationDetail/:id' },

  memberInformationDetail: { name: 'memberInformationDetail', url: '/memberInformation/memberInformationDetail/:id', parent: 'memberInformation', default: '/memberInformation/memberInformationDetail/:id' },

  //卡券库
  card: { name: 'card', url: '/card/cardList/:id', parent: 'card', default: '/card/cardList/:id' },
  cardList: { name: 'cardList', url: '/card/cardList/:id', parent: 'card' },
  cardDetail: { name: 'cardDetail', url: '/card/cardDetail/:id', parent: 'card' },
  cardModify: { name: 'cardModify', url: '/card/cardModify/:id', parent: 'card' },

  //卡券发送
  cardSend: { name: 'cardSend', url: '/cardSend/cardSendList/:id', parent: 'cardSend', default: '/cardSend/cardSendList/:id' },
  cardSendList: { name: 'cardSendList', url: '/cardSend/cardSendList/:id', parent: 'cardSend' },
  cardSendDetail: { name: 'cardSendDetail', url: '/cardSend/cardSendDetail/:id', parent: 'cardSend' },
  cardSendModify: { name: 'cardSendModify', url: '/cardSend/cardSendModify/:id', parent: 'cardSend' },

  //会员列表
  memberList: { name: 'memberList', url: '/memberList/memberListDetail/:id', parent: 'memberList', default: '/memberList/memberListDetail/:id' },
  memberListDetail: { name: 'memberListDetail', url: '/memberList/memberListDetail/:id', parent: 'memberList' },


  //卡券库
  card: { name: 'card', url: '/card/cardList/:id', parent: 'card', default: '/card/cardList/:id' },
  cardList: { name: 'cardList', url: '/card/cardList/:id', parent: 'card', default: '/card/cardList/:id' },
  cardDetail: { name: 'cardDetail', url: '/card/cardDetail/:id', parent: 'card', default: '/card/cardDetail/:id' },
  cardModify: { name: 'cardModify', url: '/card/cardModify/:id', parent: 'card', default: '/card/cardModify/:id' },

  //----------------------------------------------------------------------------路由数据-----------------------------------------------------------------------
  //网店资料
  onlineStore: { name: 'onlineStore', url: '/onlineStore/onlineDetails/:id', parent: 'onlineStore', default: '/onlineStore/onlineDetails/:id' },
  onlineList: { name: 'onlineList', url: '/onlineStore/onlineList/:id', parent: 'onlineStore', default: '/onlineStore/onlineList/:id' },
  onlineModify: { name: 'onlineModify', url: '/onlineStore/onlineModify/:id', parent: 'onlineStore', default: '/onlineStore/onlineModify/:id' },
  onlineDetails: { name: 'onlineDetails', url: '/onlineStore/onlineDetails/:id', parent: 'onlineStore', default: '/onlineStore/onlineDetails/:id' },


  //商品对应
  commodityCorrespondence: { name: 'commodityCorrespondence', url: '/commodityCorrespondence/commodityCorrespondenceList/:id', parent: 'commodityCorrespondence', default: '/commodityCorrespondence/commodityCorrespondenceList/:id' },
  commodityCorrespondenceList: { name: 'commodityCorrespondence', url: '/commodityCorrespondence/commodityCorrespondenceList/:id', parent: 'commodityCorrespondence', default: '/commodityCorrespondence/commodityCorrespondenceList/:id' },
  //订单管理--退货单
  returnNote: { name: 'returnNote', url: '/returnNote/returnNoteList/:id', parent: 'returnNote', default: '/returnNote/returnNoteList/:id' },
  returnNoteList: { name: 'returnNote', url: '/returnNote/returnNoteList/:id', parent: 'returnNote', default: '/returnNote/returnNoteList/:id' },
  returnNoteDetails: { name: 'returnNote', url: '/returnNote/returnNoteDetails/:id', parent: 'returnNote', default: '/returnNote/returnNoteDetails/:id' },
  //订单管理--退款单
  refundOrder: { name: 'refundOrder', url: '/refundOrder/refundOrderList/:id', parent: 'refundOrder', default: '/refundOrder/refundOrderList/:id' },
  refundOrderList: { name: 'refundOrder', url: '/refundOrder/refundOrderList/:id', parent: 'refundOrder', default: '/refundOrder/refundOrderList/:id' },
  //订单管理--销售订单
  // salesOrder:{name:'salesOrder',url:'/salesOrder/salesOrderList/:id',parent:'salesOrder',default:'/salesOrder/salesOrderList/:id'},
  // salesOrderList:{name:'salesOrder',url:'/salesOrder/salesOrderList/:id',parent:'salesOrder',default:'/salesOrder/salesOrderList/:id'},
  // salesOrderDetails:{name:'salesOrder',url:'/salesOrder/salesOrderDetails/:id',parent:'salesOrder',default:'/salesOrder/salesOrderDetails/:id'},
  // salesOrderModify:{name:'salesOrder',url:'/salesOrder/salesOrderModify/:id',parent:'salesOrder',default:'/salesOrder/salesOrderModify/:id'},
  //配货中心--拣货单管理
  workorderManage: { name: 'workorderManage', url: '/workorderManage/workorderManageList/:id', parent: 'workorderManage', default: '/workorderManage/workorderManageList/:id' },
  workorderManageList: { name: 'workorderManage', url: '/workorderManage/workorderManageList/:id', parent: 'workorderManage', default: '/workorderManage/workorderManageList/:id' },


  //物流对应
  logisticsCorrespondence: { name: 'logisticsCorrespondence', url: '/logisticsCorrespondence/logisticsCorrespondenceList/:id', parent: 'logisticsCorrespondence', default: '/logisticsCorrespondence/logisticsCorrespondenceList/:id' },
  logisticsCorrespondenceList: { name: 'logisticsCorrespondenceList', url: '/logisticsCorrespondence/logisticsCorrespondenceList/:id', parent: 'logisticsCorrespondence', default: '/logisticsCorrespondence/logisticsCorrespondenceList/:id' },


  // 电子面单接口
  electronicSurfaceInterface: { name: 'electronicSurfaceInterface', url: '/electronicSurfaceInterface/electronicSurfaceInterfaceList/:id', parent: 'electronicSurfaceInterface', default: '/electronicSurfaceInterface/electronicSurfaceInterfaceList/:id' },
  electronicSurfaceInterfaceList: { name: 'electronicSurfaceInterfaceList', url: '/electronicSurfaceInterface/electronicSurfaceInterfaceList/:id', parent: 'electronicSurfaceInterface', default: '/electronicSurfaceInterface/electronicSurfaceInterfaceList/:id' },
  electronicSurfaceInterfaceDitail: { name: 'electronicSurfaceInterfaceDitail', url: '/electronicSurfaceInterface/electronicSurfaceInterfaceDitail/:id', parent: 'electronicSurfaceInterface' },
  //----------------------------------------------------------------------------路由数据-----------------------------------------------------------------------


  //拣货工单制作
  workorderBuild: { name: 'workorderBuild', url: '/workorderBuild/workorderBuildList/:id', parent: 'workorderBuild', default: '/workorderBuild/workorderBuildList/:id' },
  workorderBuildList: { name: 'workorderBuildList', url: '/workorderBuild/workorderBuildList/:id', parent: 'workorderBuild', default: '/workorderBuild/workorderBuildList/:id' },
  //-------------------------------------------------------------------储值管理----------------------------
  //充值面额
  rechargeDenomination: { name: 'rechargeDenomination', url: '/rechargeDenomination/rechargeDenominationList/:id', parent: 'rechargeDenomination', default: '/rechargeDenomination/rechargeDenominationList/:id' },
  rechargeDenominationList: { name: 'rechargeDenominationList', url: '/rechargeDenomination/rechargeDenominationList/:id', parent: 'rechargeDenomination', default: '/rechargeDenominationList/rechargeDenominationList/:id' },

  //----------------------------------------------------------------------------路由数据-----------------------------------------------------------------------
  // 物流策略
  logisticsStrategy: {
    name: 'logisticsStrategy',
    url: '/logisticsStrategy/logisticsStrategyList/:id',
    parent: 'logisticsStrategy',
    default: '/logisticsStrategy/logisticsStrategyList/:id'
  },
  logisticsStrategyList: {
    name: 'logisticsStrategyList',
    url: '/logisticsStrategy/logisticsStrategyList/:id',
    parent: 'logisticsStrategy',
    default: '/logisticsStrategy/logisticsStrategyList/:id'
  },
  logisticsStrategyModify: {
    name: 'logisticsStrategyModify',
    url: '/logisticsStrategy/logisticsStrategyModify/:id',
    parent: 'logisticsStrategy',
    default: '/logisticsStrategy/logisticsStrategyModify/:id'
  },
  logisticsStrategyDetail: {
    name: 'logisticsStrategyDetail',
    url: '/logisticsStrategy/logisticsStrategyDetail/:id',
    parent: 'logisticsStrategy',
    default: '/logisticsStrategy/logisticsStrategyDetail/:id'
  },
  // 审核策略
  auditStrategy: { name: 'auditStrategy', url: '/auditStrategy/auditStrategyList/:id', parent: 'auditStrategy', default: '/auditStrategy/auditStrategyList/:id' },
  auditStrategyList: { name: 'auditStrategyList', url: '/auditStrategy/auditStrategyList/:id', parent: 'auditStrategy', default: '/auditStrategy/auditStrategyList/:id' },
  auditStrategyModify: { name: 'auditStrategyModify', url: '/auditStrategy/auditStrategyModify/:id', parent: 'auditStrategy', default: '/auditStrategy/auditStrategyModify/:id' },
  auditStrategyDetail: { name: 'auditStrategyDetail', url: '/auditStrategy/auditStrategyDetail/:id', parent: 'auditStrategy', default: '/auditStrategy/auditStrategyDetail/:id' },
  //充值记录
  rechargeRecord: { name: 'rechargeRecord', url: '/rechargeRecord/rechargeRecordList/:id', parent: 'rechargeRecord', default: '/rechargeRecord/rechargeRecordList/:id' },
  rechargeRecordList: { name: 'rechargeRecordList', url: '/rechargeRecord/rechargeRecordList/:id', parent: 'rechargeRecord', default: '/rechargeRecordList/rechargeRecordList/:id' },
  //订单管理--退货单
  returnNote: {
    name: 'returnNote',
    url: '/returnNote/returnNoteList/:id',
    parent: 'returnNote',
    default: '/returnNote/returnNoteList/:id'
  },
  returnNoteList: {
    name: 'returnNote',
    url: '/returnNote/returnNoteList/:id',
    parent: 'returnNote',
    default: '/returnNote/returnNoteList/:id'
  },
  returnNoteDetails: {
    name: 'returnNote',
    url: '/returnNote/returnNoteDetails/:id',
    parent: 'returnNote',
    default: '/returnNote/returnNoteDetails/:id'
  },
  //订单管理--退款单
  refundOrder: {
    name: 'refundOrder',
    url: '/refundOrder/refundOrderList/:id',
    parent: 'refundOrder',
    default: '/refundOrder/refundOrderList/:id'
  },
  refundOrderList: {
    name: 'refundOrder',
    url: '/refundOrder/refundOrderList/:id',
    parent: 'refundOrder',
    default: '/refundOrder/refundOrderList/:id'
  },
  //订单管理--销售订单
  salesOrder: {
    name: 'salesOrder',
    url: '/salesOrder/salesOrderList/:id',
    parent: 'salesOrder',
    default: '/salesOrder/salesOrderList/:id'
  },
  salesOrderList: {
    name: 'salesOrder',
    url: '/salesOrder/salesOrderList/:id',
    parent: 'salesOrder',
    default: '/salesOrder/salesOrderList/:id'
  },
  salesOrderDetails: {
    name: 'salesOrder',
    url: '/salesOrder/salesOrderDetails/:id',
    parent: 'salesOrder',
    default: '/salesOrder/salesOrderDetails/:id'
  },
  salesOrderModify: {
    name: 'salesOrder',
    url: '/salesOrder/salesOrderModify/:id',
    parent: 'salesOrder',
    default: '/salesOrder/salesOrderModify/:id'
  },

  //配货中心--出货单管理
  shippingOrderManagement: { name: 'shippingOrderManagement', url: '/shippingOrderManagement/shippingOrderManagementList/:id', parent: 'shippingOrderManagement', default: '/shippingOrderManagement/shippingOrderManagementList/:id' },
  shippingOrderManagementList: { name: 'shippingOrderManagement', url: '/shippingOrderManagement/shippingOrderManagementList/:id', parent: 'shippingOrderManagement', default: '/shippingOrderManagement/shippingOrderManagementList/:id' },

  rechargeDenomination: { name: 'rechargeDenomination', url: '/rechargeDenomination/rechargeDenominationList/:id', parent: 'rechargeDenomination', default: '/rechargeDenomination/rechargeDenominationList/:id' },
  rechargeDenominationList: { name: 'rechargeDenominationList', url: '/rechargeDenomination/rechargeDenominationList/:id', parent: 'rechargeDenomination', default: '/rechargeDenominationList/rechargeDenominationList/:id' },

  //复核出库
  checkOutstock: { name: 'checkOutstock', url: '/checkOutstock/checkOutstockList/:id', parent: 'checkOutstock', default: '/checkOutstock/checkOutstockList/:id' },
  checkOutstockList: { name: 'checkOutstockList', url: '/checkOutstock/checkOutstockList/:id', parent: 'checkOutstock', default: '/checkOutstockList/checkOutstockList/:id' },

  //会员充值

  membershipRecharge: { name: 'membershipRecharge', url: '/membershipRecharge/membershipRechargeList/:id', parent: 'membershipRecharge', default: '/membershipRecharge/membershipRechargeList/:id' },
  membershipRechargeList: { name: 'membershipRechargeList', url: '/membershipRecharge/membershipRechargeList/:id', parent: 'membershipRecharge', default: '/membershipRechargeList/membershipRechargeList/:id' },

  //订单下载
  orderDownload: { name: 'orderDownload', url: '/orderDownload/orderDownloadList/:id', parent: 'orderDownload', default: '/orderDownload/orderDownloadList/:id' },
  orderDownloadList: { name: 'orderDownloadList', url: '/orderDownload/orderDownloadList/:id', parent: 'orderDownload', default: '/orderDownload/orderDownloadList/:id' },
  orderDownloadDetail: { name: 'orderDownloadDetail', url: '/orderDownload/orderDownloadDetail/:id', parent: 'orderDownload', default: '/orderDownload/orderDownloadDetail/:id' },

  //库存策略
  inventoryStrategy: { name: 'inventoryStrategy', url: '/inventoryStrategy/inventoryStrategyList/:id', parent: 'inventoryStrategy', default: '/inventoryStrategy/inventoryStrategyList/:id' },
  inventoryStrategyList: { name: 'inventoryStrategyList', url: '/inventoryStrategy/inventoryStrategyList/:id', parent: 'inventoryStrategy', default: '/inventoryStrategy/inventoryStrategyList/:id' },
  inventoryStrategyDitail: { name: 'inventoryStrategyList', url: '/inventoryStrategy/inventoryStrategyDitail/:id', parent: 'inventoryStrategy', default: '/inventoryStrategy/inventoryStrategyDitail/:id' },

  //退货单入库
  tabrkth: { name: 'tabrkth', url: '/tabrkth/tabrkthList/:id', parent: 'tabrkth', default: '/tabrkth/tabrkthList/:id' },
  tabrkthList: { name: 'tabrkthList', url: '/tabrkth/tabrkthList/:id', parent: 'tabrkth', default: '/tabrkth/tabrkthList/:id' },
  //兑换记录
  recordExchange: { name: 'recordExchange', url: '/recordExchange/recordExchangeList/:id', parent: 'recordExchange', default: '/recordExchange/recordExchangeList/:id' },
  recordExchangeList: { name: 'recordExchangeList', url: '/recordExchange/recordExchangeList/:id', parent: 'recordExchange', default: '/recordExchangeList/recordExchangeList/:id' },
  //积分兑换
  integralExchange: { name: 'integralExchange', url: '/integralExchange/integralExchangeList/:id', parent: 'integralExchange', default: '/integralExchange/integralExchangeList/:id' },
  integralExchangeList: { name: 'integralExchangeList', url: '/integralExchange/integralExchangeList/:id', parent: 'integralExchange', default: '/integralExchangeList/integralExchangeList/:id' },

  //语言切换
  language:{name: 'language',url:'/language/languageList',parent:'language',default:'/language/languageList'},
  languageList:{name: 'languageList',url:'/language/languageList',parent:'language',default:'/language/languageList'}
}
