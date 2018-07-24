
import Vue from 'vue';
import topLine from './component/topLine.vue';

new Vue({
  el:'#container',
  render: app => app(topLine)
})
