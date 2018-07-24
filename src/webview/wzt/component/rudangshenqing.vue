<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <loading :loading='loading'></loading>
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdsq f-fs f-w">
      <h3 class="f-c f-ac rdsq-title hidden">入党申请</h3>

      <ul class="f-dc sjdjs-ul sjd-main">
        <div class="sjdjs-ul-main boxScrollbar" :style="styleObject">
          <li v-for="(navItem,index) in navList" @click="tab(index,navItem.id,navItem.names)" :key="navItem.id" :index='index' class="zzActivity-li f-c f-ac sjd-li" :class="{ active: active == index}">{{ navItem.names }}</li>
        </div>
        <li :style="ss" class="zzActivity-li f-c f-ac classification" @click="leftTab(switchTab)"><i :style="iconsf" class="iconfont sjd-icon-s visibility icon-shuangjiantou-right"></i>{{ classification }}<i :style="iconsf" class="iconfont sjd-icon-more icon-shuangjiantou-right"></i></li>
      </ul>
      <div class="rdsq-box">
        <!-- <h4 class="rdfzInfo-rdsq f-fs f-c f-ac">{{ item.title }}</h4> -->
        <div class="kcinfo-box kcinfo-rdsq boxScrollbar" v-html="content">
          {{ content }}
        </div>
      </div>  
      
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';
import loading from './loading.vue';

export default {
  data() {
    return {
      loading:true,
      headerName: '',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      content: '',
      navList:[],
      active:0,
      iconsf:'',
      ss:'',
      classification:'分类'
    };
  },
  beforeMount() {},
  mounted() {
    this.navList = [
      { id:6,names:'入党条件' },
      { id:8,names:'入党程序' },
      { id:7,names:'入党问题' }
    ]
    const headerName = this.$route.params.headerName;
    const villageId = window.localStorage.getItem('villageId');
    this.headerName = decodeURI(headerName);
    const content = '';
    //入党条件
    request.post(serverConfig.getDataTable,{ type:6,villageId:villageId }).then((res) => {
      this.loading = false;
      const { result } = res;
      this.content = result.content
    });
  },
  methods: {
    leftTab(d){
      if(!d){
        this.styleObject = {
          left: '-1px',
        };
        this.ss = {
          'margin-left':'0px'
        };
        this.iconsf = {
          'display':'none'
        };
        this.switchTab = true;
      }else{
        this.styleObject = {};
        this.ss = {};
        this.iconsf = {};
        this.switchTab = false;
      }
    },
    tab(i,id,n){
      this.loading = true;
      this.active = i;
      this.$route.params.id = id;
      this.styleObject = {};
      this.ss = {};
      this.iconsf = {};
      this.switchTab = false;
      this.pageIndex = 1;
      this.classification = n;
      const type = this.$route.params.type;
      const villageId = window.localStorage.getItem('villageId');
      if(id == 6){//入党条件
         request.post(serverConfig.getDataTable,{ type:6,villageId:villageId }).then((res) => {
          this.loading = false;
          const { result } = res;
          this.content = result.content
        });
      }else if(id == 8){//入党程序
         request.post(serverConfig.getDataTable,{ type:8,villageId:villageId }).then((res) => {
          this.loading = false;
          const { result } = res;
          this.content = result.content
        });
      }else if(id == 7){//相关问题
         request.post(serverConfig.getDataTable,{ type:7,villageId:villageId }).then((res) => {
          this.loading = false;
          const { result } = res;
          this.content = result.content
        });
      }
      // window.localStorage.setItem('tabId',id);
      // window.localStorage.setItem('tabIndex',i);
      // window.localStorage.setItem('pageIndexLocal',1);
      // const pageIndexLocal = window.localStorage.getItem('pageIndexLocal') >= 1 ? 1 : window.localStorage.getItem('pageIndexLocal');
    },
  },
  components: {
    loading,
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

