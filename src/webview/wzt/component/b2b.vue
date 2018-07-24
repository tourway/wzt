<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName' :weatherMain='weatherMain' v-if="!isPhones"></header-index>
    <!-- main -->
    <div class="baoshengcun-main__b2b f-fs f-w f-c f-ac">

      <div class="baoshengcun-main__listB2b f-c f" v-for="item in listB2b" :key='item.id'>
        <router-link :to='item.url' class="f-ac f-c">
          <i :style="item.styless" class="iconfont cs-icon" :class="item.iconClass"></i>
          {{ item.names }}
        </router-link>
      </div>
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from "../../../config/config";
import request from "../../../lib/js/request";
import common from '../../../config/common';

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      weatherMain:false,
      listB2b: [],
      iconClass:'',
      styless:'',
      isPhones:false
    };
  },
  beforeMount() {
  },
  watch:{
    '$route' (to, from) {
      console.log(to);
      console.log(from);
    }
  },
  mounted() {
    const crossScreenW = common.windowWidth();
    const isPhones = common.isPhone();
    if(crossScreenW){
      this.weatherMain = true;
    }
    if(isPhones){
      this.isPhones = true;
    }
    const type = this.$route.params.type;
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.functionModule, { id: id }).then(res => {
      const { result } = res;
      const listB2b = [];
      //首页——电商入口进入
      if(type == 'b2b'){
        result.forEach(({ 
          id,
        names
        }) => {
          if(id == 40){
            listB2b.push({
              id,
              names,
              iconClass:'icon-dianshang',
              url: `/b2bMarket/${id}/0/${ encodeURIComponent(names) }`
            });
          }else if(id == 41){
            listB2b.push({
              id,
              names,
              iconClass:'icon-jishi',
              url: `/b2bMarket/${id}/1/${ encodeURIComponent(names) }`
            });
          }
        });
      }
      //首页——精准扶贫为民办事入口进入
      if(type == 'fp'){
        result.forEach(({ 
          id,
        names
        }) => {
          if(id == 26){
            listB2b.push({
              id,
              names,
              iconClass:'icon-jingzhunfupin',
              url: `/fplist/${id}/fplist/${ encodeURIComponent(names) }`
            });
          }else{
            listB2b.push({
              id,
              names,
              iconClass:'icon-weiminbanshi',
              url: `/sjdjs/${id}/jzfp-wmbs/${ encodeURIComponent(names) }`
            });
          }
        });
      }
      //首页——文化小康学习园地入口进入
      if(type == 'whxk'){
        result.forEach(({ 
          id,
        names
        }) => {
          if(id == 28){
            listB2b.push({
              id,
              names,
              iconClass:'icon-wenhuaxiaokang',
              url: `/whxk/${id}/${ encodeURIComponent(names) }`
            });
          }else{
            listB2b.push({
              id,
              names,
              iconClass:'icon-xuexiyuandi',
              url: `/sjdjs/${id}/whxk-xxyd/${ encodeURIComponent(names) }`
            });
          }
          
        });
      }
      //首页——村务公开干群互动入口进入
      if(type == 'cwgkgqhd'){
        result.forEach(({ 
          id,
        names
        }) => {
          if(id == 43){//村务财务公开
            listB2b.push({
              id,
              names,
              iconClass:this.iconClassf(id),
              url: `/sjdjs/${ id }/cwgk/${ encodeURIComponent(names) }`
            });
          }else{//干群互动
            listB2b.push({
              id,
              names,
              iconClass:this.iconClassf(id).split('|')[0],
              styless:this.iconClassf(id).split('|')[1],
              url: `/cxsq/${ id }/gqhd/${ encodeURIComponent(names) }`
            });
          }
          
        });
      }
      this.listB2b = listB2b;
    });
  },
  methods: {
    iconClassf(id){
      let iconClass = '';
      if(id == 43){
        iconClass = 'icon-cunwugongkai';
      }else if(id == 44){
        iconClass = 'icon-ganqunhudong|font-size:64px;';
      }
      return iconClass;
    }
  },
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

