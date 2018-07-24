
import Vue from 'vue';
import topLineDetails from './component/topLineDetails.vue';

new Vue({
  el:'#container',
  render: app => app(topLineDetails)
})
