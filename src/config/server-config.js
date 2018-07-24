let serverConfig;
// const url = `http://192.168.5.2:8080/baoshengcun`;
const itemApi = '/wzt'
// #if PRODUCT  
serverConfig = {
  //获取功能模块 ( 父ID，不传默认返回九大按钮 )
  functionModule:`api/getFunctionalModule`,
  //预备党员／积极分子信息
  partyMember:`api/getPositivePreparation`,
  //政务政策（部门）
  governmentPolicy:`api/getDepartmentManagement`,
  //党员列表
  partyMemberList:`api/getPMIList`,
  //党员信息详情
  partyMemberInfo:`api/getPMI`,
  //获取群众信息详情
  getMassInfo:`api/getMassInfo`,
  //党的组织/政权组织
  getPartyGovernOrgan:`api/getPartyGovernOrgan`,
  //获取文章类型(比如查询文化小康下一级list)
  getArticleType:`api/getArticleType`,
  //获取文章列表
  getArticle:`api/getArticle`,
  //获取群众信息列表
  getMassInfoList:`api/getMassInfoList`,
  //获取最新会议二维码
  getMeeting:`api/getMeeting`,
  //获取部门主题文章列表
  getPartyArticleList:`api/getPartyArticleList`,
  //获取预备党员或者积极分子详情
  getPositivePreparationDetails:`api/getPositivePreparationDetails`,
  //获取党员组织与领导人（领导分工）
  getPGOLList:`api/getPGOLList`,
  //获取资料信息(例如：党史党章)
  getDataTable:`api/getDataTable`,
  //获取文章
  getArticleDetails:`api/getArticleDetails`,
  //获取电商集市类型集合
  getElectricityMartTypeList:`api/getElectricityMartTypeList`,
  //获取电商集市集合
  getElectricityMartList:`api/getElectricityMartList`,
  //获取贫困户列表
  getPoorHouseholdsList:`api/getPoorHouseholdsList`,
  //获取贫困户信息
  getPoorHouseholds:`api/getPoorHouseholds`,
  //获取网格化信息列表
  getGriddingInformationList:`api/getGriddingInformationList`,
  //获取网格化信息
  getGriddingInformation:`api/getGriddingInformation`,
  //获取干群互动类型
  getInteractionCadresMassesTypeList:`api/getInteractionCadresMassesTypeList`,
  //获取干群互动集合
  getInteractionCadresMassesList:`api/getInteractionCadresMassesList`,
  //部门主题文章详情
  getPartyArticle:`api/getPartyArticle`,
  //获取天气
  getWeather:`api/getWeather`,
  //获取无纸化办公类型
  getPaperOfficTypeList:`api/getPaperOfficTypeList`,
  //获取无纸化办公集合
  getPaperOfficList:`api/getPaperOfficList`,
  //获取无纸化办公详情
  getPaperOfficDetails:`api/getPaperOfficDetails`,
  //获取电商集市详情
  getElectricityMartDetails:`api/getElectricityMartDetails`,
  //十九大精神、宝胜资讯
  getArticleDetailUrl:'api/getArticleDetailUrl',
  //登录
  indexLogin:'api/indexLogin',
  //设备授权码
  checkEquipmentnumber:'api/checkEquipmentnumber'
};
//  #endif
// #if DEV 
serverConfig = { //13
  //获取功能模块 ( 父ID，不传默认返回九大按钮 )
  functionModule:`${ itemApi }/api/getFunctionalModule`,
  //预备党员／积极分子信息
  partyMember:`${ itemApi }/api/getPositivePreparation`,
  //政务政策（部门）
  governmentPolicy:`${ itemApi }/api/getDepartmentManagement`,
  //党员列表
  partyMemberList:`${ itemApi }/api/getPMIList`,
  //党员信息详情
  partyMemberInfo:`${ itemApi }/api/getPMI`,
  //获取群众信息详情
  getMassInfo:`${ itemApi }/api/getMassInfo`,
  //党的组织/政权组织
  getPartyGovernOrgan:`${ itemApi }/api/getPartyGovernOrgan`,
  //获取文章类型(比如查询文化小康下一级list)
  getArticleType:`${ itemApi }/api/getArticleType`,
  //获取文章列表
  getArticle:`${ itemApi }/api/getArticle`,
  //获取群众信息列表
  getMassInfoList:`${ itemApi }/api/getMassInfoList`,
  //获取最新会议二维码
  getMeeting:`${ itemApi }/api/getMeeting`,
  //获取部门主题文章列表
  getPartyArticleList:`${ itemApi }/api/getPartyArticleList`,
  //获取预备党员或者积极分子详情
  getPositivePreparationDetails:`${ itemApi }/api/getPositivePreparationDetails`,
  //获取党员组织与领导人（领导分工）
  getPGOLList:`${ itemApi }/api/getPGOLList`,
  //获取资料信息(例如：党史党章)
  getDataTable:`${ itemApi }/api/getDataTable`,
  //获取文章
  getArticleDetails:`${ itemApi }/api/getArticleDetails`,
  //获取电商集市类型集合
  getElectricityMartTypeList:`${ itemApi }/api/getElectricityMartTypeList`,
  //获取电商集市集合
  getElectricityMartList:`${ itemApi }/api/getElectricityMartList`,
  //获取贫困户列表
  getPoorHouseholdsList:`${ itemApi }/api/getPoorHouseholdsList`,
  //获取贫困户信息
  getPoorHouseholds:`${ itemApi }/api/getPoorHouseholds`,
  //获取网格化信息列表
  getGriddingInformationList:`${ itemApi }/api/getGriddingInformationList`,
  //获取网格化信息
  getGriddingInformation:`${ itemApi }/api/getGriddingInformation`,
  //获取干群互动类型
  getInteractionCadresMassesTypeList:`${ itemApi }/api/getInteractionCadresMassesTypeList`,
  //获取干群互动集合
  getInteractionCadresMassesList:`${ itemApi }/api/getInteractionCadresMassesList`,
  //部门主题文章详情
  getPartyArticle:`${ itemApi }/api/getPartyArticle`,
  //获取天气
  getWeather:`${ itemApi }/api/getWeather`,
  //获取无纸化办公类型
  getPaperOfficTypeList:`${ itemApi }/api/getPaperOfficTypeList`,
  //获取无纸化办公集合
  getPaperOfficList:`${ itemApi }/api/getPaperOfficList`,
  //获取无纸化办公详情
  getPaperOfficDetails:`${ itemApi }/api/getPaperOfficDetails`,
  //获取电商集市详情
  getElectricityMartDetails:`${ itemApi }/api/getElectricityMartDetails`,
  //十九大精神、宝胜资讯
  getArticleDetailUrl:`${ itemApi }/api/getArticleDetailUrl`,
  //登录
  indexLogin:`${ itemApi }/api/indexLogin`,
  //设备授权码
  checkEquipmentnumber:`${ itemApi }/api/checkEquipmentnumber`
};
// #endif

export default serverConfig;
