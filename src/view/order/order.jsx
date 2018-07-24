// import '../../lib/css/normalize.css';
// import './scss/iconfont.css';

import Vue from 'vue';
import order from './component/order.vue';

new Vue({
    el:'#container',
    render:app => app(order)
})