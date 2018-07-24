/*
 * @Author: tom 
 * @Date: 2017-11-13 09:58:02 
 * @Last Modified by: jerry
 * @Last Modified time: 2018-01-26 17:17:00
 */
import Vue from 'vue';
import VueRouter from 'vue-router';


import login from '../component/login.vue';//登录
import index from '../component/index.vue';//宝胜村首页
import bbx from '../component/baibaoxiang.vue';//党务政务百宝箱
import cxsq from '../component/chengxiangshequ.vue';//党务政务百宝箱
import b2b from '../component/b2b.vue';//电商集市
import fplist from '../component/fpList.vue';//精准扶贫为民办事 List
import b2bMarket from '../component/b2bMarket.vue';//电商集市
import zwzc from '../component/zhengwuzhengce.vue';//政务政策
import ddzz from '../component/dangdezuzhi.vue';//党的组织
import ddgx from '../component/dangdeguanxi.vue';//党的关系
import sjdjs from '../component/shijiudajingshen.vue';//十九大精神
import dylist from '../component/dangyuanlist.vue';//党员列表
import dyinfo from '../component/dangyuaninfo.vue';//党员详细信息
import rdfz from '../component/rudangfenzi.vue';//入党积极分子
import rdfzinfo from '../component/rudangfenziinfo.vue';//入党积极分子详情信息
import rdrq from '../component/rudangshenqing.vue';//入党积极分子详情信息
import whxk from '../component/wenhuaxiaokang.vue';//文化小康
import wzinfo from '../component/wenzhanginfo.vue';//文章详情（十九大文章详情，政务政策详情）
import cyfz from '../component/chanyefazhan.vue';//产业发展
import meet from '../component/meeting.vue';//会议签到
import thema from '../component/themasses.vue';//群众
import poor from '../component/poor.vue';//贫困户
import poorinfo from '../component/poorinfo.vue';//贫困户详细
import wgh from '../component/wgh.vue';//贫困户详细
import wghinfo from '../component/wghinfo.vue';//贫困户详细
import gqhd from '../component/gqhd.vue';//干群互动
import sjdList from '../component/sjdList.vue';//十九大list


Vue.use(VueRouter);

export default new VueRouter({
 routes:[
  // 宝胜村首页 一级
  { path:'/login',component:login,name:'login' },
  { path:'/index',component:index,name:'index' },
  //二级
  { path:'/bbx/:id/:headerName',component:bbx,name:'bbx' },
  { path:'/sjdjs/:id/:type/:headerName',component:sjdjs,name:'sjdjs' },
  { path:'/b2bMarket/:id/:type/:headerName',component:b2bMarket,name:'b2bMarket' },
  { path:'/b2b/:id/:type/:headerName',component:b2b,name:'b2b' },
  { path:'/fplist/:id/:type/:headerName',component:fplist,name:'fplist' },
  { path:'/cxsq/:id/:type/:headerName',component:cxsq,name:'cxsq' },
  { path:'/cyfz/:id',component:cyfz,name:'cyfz' },
  { path:'/sjdList/:id/:headerName',component:sjdList,name:'sjdList' },
  //三级
  { path:'/ddzz/:id/:type/:headerName',component:ddzz,name:'ddzz' },
  { path:'/ddgx/:id/:headerName',component:ddgx,name:'ddgx' },
  { path:'/zwzc/:id/:headerName',component:zwzc,name:'zwzc' },
  { path:'/meet/:id/:headerName',component:meet,name:'meet' },
  //四级
  { path:'/rdfz/:type/:headerName',component:rdfz,name:'rdfz' },
  { path:'/wzinfo/:id/:type/:headerName',component:wzinfo,name:'wzinfo' },
  { path:'/dyinfo/:type/:id/:headerName',component:dyinfo,name:'dyinfo' },
  { path:'/dylist/:type/:id/:headerName',component:dylist,name:'dylist' },
  { path:'/thema/:type/:id/:headerName',component:thema,name:'thema' },
  { path:'/rdfzinfo/:id/:type/:headerName',component:rdfzinfo,name:'rdfzinfo' },
  { path:'/rdrq/:headerName',component:rdrq,name:'rdrq' },
  { path:'/whxk/:id/:headerName',component:whxk,name:'whxk' },
  { path:'/poor/:id/:headerName',component:poor,name:'poor' },
  { path:'/poorinfo/:id/:headerName',component:poorinfo,name:'poorinfo' },
  { path:'/wgh/:id/:headerName',component:wgh,name:'wgh' },
  { path:'/wghinfo/:id/:headerName',component:wghinfo,name:'wghinfo' },
  { path:'/gqhd/:id/:headerName',component:gqhd,name:'gqhd' },
  { path:'*',redirect:'/index' }
 ]
})