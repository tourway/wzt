/*
 * @Author: tom 
 * @Date: 2017-11-10 13:52:56 
 * @Last Modified by: jerry
 * @Last Modified time: 2018-05-03 15:43:11
 */
import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router/router';
import transition from './component/transition.vue';
import './scss/index.scss';
import '../../lib/css/normalize.css';
// import './js/rem';
import Alert from './js/alert';
import stores from './js/stores';
import NProgress from 'nprogress'
import '../../lib/css/nprogress.css';
import common from '../../config/common';
// import '../BaoShengCun/component/lib/scroll/scroll.scss';
// import IScrollView from 'vue-iscroll-view';
// import IScroll from 'iscroll/build/iscroll-probe.js';
// Vue.use(IScrollView,IScroll);
Vue.use(Alert);
Vue.use(Vuex);
const store = new Vuex.Store(stores);
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true });
const VILLAGEID = common.GetRequest().villageId;//村社 常量 ID
if(VILLAGEID != undefined){
  if(VILLAGEID.length != 0){
    window.localStorage.setItem('villageId',VILLAGEID);
  }
}
router.beforeEach((to, from, next) => {
  NProgress.start();
  const villageId = window.localStorage.getItem('villageId');//获取浏览器缓存的用户信息
  if (villageId) {//如果有就直接到首页咯 -- 处理刷新的时候vuex被清空但是用户已经登录的情况
    next();
  } else {
    if (to.path === '/login') {//如果是登录页面路径，就直接next()
      next();
    } else {//不然就跳转到登录；
      next('/login');
    }
  }
});
router.afterEach(transition => {
  NProgress.done();
});
new Vue({
  el: '#container',
  router,
  template: '<App/>',
  store,
  render: app => app(transition)
})