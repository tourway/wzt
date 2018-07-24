<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdsq f-fs f-w df-e" :class="{ 'wzhbg-box-s':isWzhbg }">
      <div class="rdsq-box wzinfo-main ">
        <div class="f f-sb info f-ac srdsq-box">
          <h4 class="userInfo-wz f-fs f-ac" :class="{ 'f-c':isTextLeft }">{{ title }}</h4>
          <div class="srdsq-boxp">
            <img :src="thumbnailUrl" />
          </div>
          <!-- <p class="time">{{ time }}</p> -->
        </div>
        <div class="crdsq-box" :class="{ 'hidden':isWzhbg }">

          <div class="swiper-container" v-if="isAndroid">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <!-- http://192.168.5.2:8080/wzt/ -->
                <img :src="`${ imgs[0] }`" alt="" srcset="">
              </div>
              <div class="swiper-slide">
                <img :src="`${ imgs[1] }`" alt="" srcset="">
              </div>
              <div class="swiper-slide">
                <img :src="`${ imgs[2] }`" alt="" srcset="">
              </div>
              <div class="swiper-slide">
                <img :src="`${ imgs[3] }`" alt="" srcset="">
              </div>
            </div>
          </div> 
          <div class="swiper-container" v-if="!isAndroid">
            <div class="swiper-wrapper">
              <!-- <div class="swiper-slide" v-for="pic in imgs" :key="pic.id"><img :src="`http://119.23.235.164:8083/wzt/${ pic }`" alt="" srcset=""></div> -->
              <div class="swiper-slide" v-for="pic in imgs" :key="pic.id"><img :src="`${ pic }`" alt="" srcset=""></div>
            </div>
          </div>
          <!-- <div class="swiper-pagination"></div> -->
        </div>
        <div class="kcinfoWz-box kcinfoWz boxScrollbar" v-show="!isIframe" :class="{ 'wzhbg':isWzhbg }" >
          <h4 class="title-tt f f-c">{{ title }}</h4>
          <div class="constent" v-html="content"></div>
          <!-- {{ content }} -->
        </div>
        <iframe :src="content" frameborder="0" class="boxScrollbar wzhbg-iframe" v-show="isIframe"></iframe>
        <!-- <p class="time f-fe">{{ time }}</p> -->
      </div>  
    </div>
    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';
import Swiper from '../../../lib/js/swiper/swiper-3.4.2.min.js';

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      title: "",
      content: ``,
      time:'',
      thumbnailUrl:'',
      isTextLeft:false,
      isWzhbg:false,
      isIframe:false,
      imgs:'',
      isVerticalScreen:false,
      isAndroid:false
    };
  },
  beforeMount(){},
  mounted() {
    const type = this.$route.params.type;
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    const userAgent = navigator.userAgent;  
    var index = userAgent.indexOf("Android")  
    if(index >= 0){  
      var androidVersion = parseFloat(userAgent.slice(index+8));   
      if(androidVersion <= 4.2){
        this.isAndroid = true;
      }  
    }
    if(type == 'wzhbg'){
      this.isWzhbg = true;
      this.isIframe = true;
      request.post(serverConfig.getPaperOfficDetails,{ poId:id }).then((res) => {
        const { result } = res;
        this.content = result.htmlLink;
        return false;
      });
    }else if(type == 'b2b-js'){
      request.post(serverConfig.getElectricityMartDetails,{ emId:id }).then((res) => {
        const { result } = res;
        const { picUrl } = result;
        if(this.isAndroid){
          try {
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          } catch (error) {
            console.log(error);
          }
        }else{
          if(picUrl != null){
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          }
        }
        const mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          speed: 2000,
          loop: true,
          observer:true,
          observeParents:true,
          autoplayDisableOnInteraction : false,
          autoplay:4000,
          effect:'coverflow'
        });
        this.content = result.commodityDescription;
      });
    }else 
    // if(type == 'sjdjs' || type == 'cyfz'){
    //   request.post(serverConfig.getArticleDetailUrl,{ aId:id }).then((res) => {
    //     const { result } = res;
    //     const { picUrl } = result;
    //     const metaRegexp = /<meta charset="UTF-8"\/><meta name="referrer" content="never"\/><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"\/>/gi;
    //     let metaRe = result.content.replace(metaRegexp,'');
    //     try {
    //       const imgsList = picUrl.split(',');
    //       this.imgs = imgsList;//设置服务器端返回图片的幻灯片
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     const mySwiper = new Swiper('.swiper-container', {
    //       pagination: '.swiper-pagination',
    //       paginationClickable: true,
    //       speed: 2000,
    //       loop: true,
    //       observer:true,
    //       observeParents:true,
    //       autoplayDisableOnInteraction : false,
    //       autoplay:4000,
    //       effect:'coverflow'
    //     });
    //     if(result.title.length <= 38){
    //       this.isTextLeft = true;
    //     }
    //     this.title = result.title;
    //     this.content = metaRe;
    //     this.thumbnailUrl = result.thumbnailUrl;
    //   });
    //   return false;
    // }else 
    if(type != 'zwzc'){
      request.post(serverConfig.getArticleDetails,{ aId:id }).then((res) => {
        const { result } = res;
        const { picUrl } = result;
        if(this.isAndroid){
          try {
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          } catch (error) {
            console.log(error);
          }
        }else{
          if(picUrl != null){
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          }
        }
        const mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          speed: 2000,
          loop: true,
          observer:true,
          observeParents:true,
          autoplayDisableOnInteraction : false,
          autoplay:4000,
          effect:'coverflow'
        });
        if(result.title.length <= 38){
          this.isTextLeft = true;
        }
        this.title = result.title;
        this.content = result.content;
        this.thumbnailUrl = result.thumbnailUrl;
        this.time = common.forMatData(result.createDate,2);
        // console.log(result.content);
      });
    }else{
      request.post(serverConfig.getPartyArticle,{ paId:id }).then((res) => {
        const { result } = res;
        const { picUrl } = result;
        if(this.isAndroid){
          try {
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          } catch (error) {
            console.log(error);
          }
        }else{
          if(picUrl != null){
            const imgsList = picUrl.split(',');
            this.imgs = imgsList;//设置服务器端返回图片的幻灯片
          }
        }
        const mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          speed: 2000,
          loop: true,
          observer:true,
          observeParents:true,
          autoplayDisableOnInteraction : false,
          autoplay:4000,
          effect:'coverflow'
        });
        if(result.title.length <= 38){
          this.isTextLeft = true;
        }
        this.title = result.title;
        this.content = result.content;
        this.thumbnailUrl = result.thumbnailUrl;
        this.time = common.forMatData(result.createDate,2);
      });
    }
  },
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>
