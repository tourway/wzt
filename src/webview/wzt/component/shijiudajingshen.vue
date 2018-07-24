<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <loading :loading='loading'></loading>
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__bbx">
      <ul class="f-dc sjdjs-ul sjd-main" v-show="this.navList.length != 0 && this.navList.length != 1">
        <div class="sjdjs-ul-main boxScrollbar" :style="styleObject">
          <li  v-for="(navItem,index) in navList" @click="tab(index,navItem.id,navItem.names)" :key="navItem.id" :index='index' class="zzActivity-li f-c f-ac sjd-li" :class="{ active: active == index}">{{ navItem.names }}</li>
        </div>
        <li :style="ss" class="zzActivity-li f-c f-ac classification" @click="leftTab(switchTab)"><i :style="iconsf" class="iconfont sjd-icon-s visibility icon-shuangjiantou-right"></i>{{ classification }}<i :style="iconsf" class="iconfont sjd-icon-more icon-shuangjiantou-right"></i></li>
      </ul>
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="bbx-flex f f-sb" v-if="listO.length != 0">
        <router-link class="sjdjs-box f" :to='item.url' v-for="item in listO" :key="item.id">
          <div class="sjdjs-main f">
            <img class="sjdjs-box__img" :src="item.urlimg"/>
            <div class="sjdjs-box__con">
              <h3 class="sjdjs-box__title">{{ item.title }}</h3>
              <p class="sjdjs-box__content">{{ item.content }}</p>
              <p class="sjdjs-box__time f-fe hidden">
                <span class="sjdjs-bo__span">{{ item.time }}</span>
                <i class="iconfont icon-shuangjiantou-right sjdjs-box__icon"></i>
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="bbx-flex f f-sb" v-if="listT.length != 0">
        <router-link class="sjdjs-box f" :to='item.url' v-for="item in listT" :key="item.id">
          <div class="sjdjs-main f">
            <img class="sjdjs-box__img" :src="item.urlimg"/>
            <div class="sjdjs-box__con">
              <h3 class="sjdjs-box__title">{{ item.title }}</h3>
              <p class="sjdjs-box__content">{{ item.content }}</p>
              <p class="sjdjs-box__time f-fe hidden">
                <span class="sjdjs-bo__span">{{ item.time }}</span>
                <i class="iconfont icon-shuangjiantou-right sjdjs-box__icon"></i>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="footer f-c f-ac f-sb">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: lastPageIsDisabled }"  @click="lastPage">上一页</a>
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: nextPageIsDisabled }"  @click="nextPage">下一页</a>
    </div>
    <!-- footer ver 主干 -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
  </div>
</template>
<style>

</style>

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
      nullBox:false,
      loading:true,
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      active:0,
      lastPageIsDisabled:true,
      nextPageIsDisabled:false,
      pageIndex:1,
      navList:[],
      listO: [],
      listT: [],
      styleObject:'',
      switchTab:false,
      showPageSize:4,
      ss:'',
      iconsf:'',
      classification:window.localStorage.getItem('tabName') == null ? '分类' : decodeURI(window.localStorage.getItem('tabName')),
      villageId:window.localStorage.getItem('villageId')
    };
  },
  components: {
    scroll,
    loading,
    "header-index": Header,
    "footer-index": Footer
  },
  beforeMount() {
  },
  mounted() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;//区别是从那个入口进入到list列表
    const headerName = this.$route.params.headerName;
    const pageIndexLocal = window.localStorage.getItem('pageIndexLocal') == null ? '1' : window.localStorage.getItem('pageIndexLocal');
    const villageId = this.villageId;
    this.headerName = decodeURI(headerName);
    if(type == 'whxk-list'){
      this.pageIndex = 1;
      this.ss = {
        display: 'none'
      };
      this.requestThods(serverConfig.getArticle,{ atId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:villageId },pageIndexLocal);
      return false;
    }
    if(type == 'zwzc'){//政务政策页面进入
      this.navList = [ { id:1,names:'政务政策'} ];
      this.pageIndex = 1;
      this.requestThods(serverConfig.getPartyArticleList,{ stId:id,pageIndex:1,pageSize:this.showPageSize,villageId:villageId },1);
      return false;
    }
    // if(type == 'cxsqList' || type == 'fpList' || type == 'jzfp-wmbs' 
    // || type == 'whxk' || type == 'whxk-xxyd' || type == 'cyfz' || 
    // type == 'flfg' || type == 'zzhd' || type == 'wdx' || type == 'nmyx'){
    //   this.pageIndex = 1;
    // }
    if(type != 'zwzc'){//十九大精神页面进入
      // 获取nav
      const tabId = window.localStorage.getItem('tabId');
      const tabIndex = window.localStorage.getItem('tabIndex');
      if(tabId != null){
        if(type == 'wzhbg'){
          this.navList = [];
          this.listO = [];
          this.listT = [];
          request.post(serverConfig.getPaperOfficTypeList,{ pageIndex:-1,pageSize:-1,villageId:villageId }).then((res) => {
            const { result } = res;
            const navList = [];
            if(result.list.length != 0){
              result.list.forEach(({
                id,
                title
              }) => {
                navList.push({
                  id,
                  names:title
                })
              })
              this.navList = navList;
              this.$route.params.id = tabId;
              //获取文章列表
              this.requestThods(serverConfig.getPaperOfficList,{ potId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:villageId },pageIndexLocal);
            }else{
              this.nullBox = true;
              this.loading = false;
              this.lastPageIsDisabled = true;
              this.nextPageIsDisabled = true;
            }
          });
        }else{
          this.active = tabIndex;
          this.navList = [];
          this.listO = [];
          this.listT = [];
          request.post(serverConfig.getArticleType,{ fmId:id,villageId:villageId }).then((res) => {
            const { result } = res;
            const navList = [];
            result.forEach(({
              id,
              names
            }) => {
              navList.push({
                id,
                names
              })
            })
            this.navList = navList;
            this.$route.params.id = tabId;
            //获取文章列表
            this.requestThods(serverConfig.getArticle,{ atId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:villageId },pageIndexLocal);
          });
        }
      }else{
        if(type == 'wzhbg'){
          this.navList = [];
          this.listO = [];
          this.listT = [];
          request.post(serverConfig.getPaperOfficTypeList,{ pageIndex:-1,pageSize:-1,villageId:villageId }).then((res) => {
            console.log(res);
            const { result } = res;
            const navList = [];
            if(result.list.length != 0){
              result.list.forEach(({
                id,
                title
              }) => {
                navList.push({
                  id,
                  names:title
                })
              })
              this.navList = navList;
              this.$route.params.id = this.navList[0].id;
              //获取文章列表
              this.requestThods(serverConfig.getPaperOfficList,{ potId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:villageId },pageIndexLocal);
            }else{
              this.nullBox = true;
              this.loading = false;
              this.lastPageIsDisabled = true;
              this.nextPageIsDisabled = true;
            }
          });
        }else{
          this.navList = [];
          this.listO = [];
          this.listT = [];
          request.post(serverConfig.getArticleType,{ fmId:id,villageId:villageId }).then((res) => {
            const { result } = res;
            const navList = [];
            result.forEach(({
              id,
              names
            }) => {
              navList.push({
                id,
                names
              })
            })
            this.navList = navList;
            this.$route.params.id = this.navList[0].id;
            //获取文章列表
            this.requestThods(serverConfig.getArticle,{ atId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:villageId },pageIndexLocal);
          });
          // this.requestThods(serverConfig.getArticle,{ atId:2,pageIndex:pageIndexLocal,pageSize:this.showPageSize,villageId:6 },pageIndexLocal);
        }
      }
      return false;
    }
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
    tab(i,id,name){
      this.listO = [];
      this.listT = [];
      this.loading = true;
      this.active = i;
      this.$route.params.id = id;
      this.styleObject = {};
      this.ss = {};
      this.iconsf = {};
      this.switchTab = false;
      this.pageIndex = 1;
      this.classification = name;
      const type = this.$route.params.type;
      const villageId = this.villageId;
      window.localStorage.setItem('tabId',id);
      window.localStorage.setItem('tabName',encodeURIComponent(name));
      window.localStorage.setItem('tabIndex',i);
      window.localStorage.setItem('pageIndexLocal',1);
      // const pageIndexLocal = window.localStorage.getItem('pageIndexLocal') >= 1 ? 1 : window.localStorage.getItem('pageIndexLocal');
      if(type == 'wzhbg'){
        this.requestThods(serverConfig.getPaperOfficList,{ potId:id,pageIndex:1,pageSize:this.showPageSize,villageId:villageId },1);
      }else{
        this.requestThods(serverConfig.getArticle,{ atId:id,pageIndex:1,pageSize:this.showPageSize,villageId:villageId },1);
      }
    },
    lastPage(){
      this.loading = true;
      const id = this.$route.params.id;
      const type = this.$route.params.type;
      const pageIndex = --this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      if(type == 'wzhbg'){
        this.requestThods(serverConfig.getPaperOfficList,{ potId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
      if(type != 'zwzc'){//有多个tabs时 > nav
        this.requestThods(serverConfig.getArticle,{ atId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
      if(type == 'zwzc'){
        this.requestThods(serverConfig.getPartyArticleList,{ stId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
    },
    nextPage(){
      this.loading = true;
      const id = this.$route.params.id;
      const type = this.$route.params.type;
      const pageIndex = ++this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      if(type == 'wzhbg'){
        this.requestThods(serverConfig.getPaperOfficList,{ potId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
      if(type != 'zwzc'){//有多个tabs时 > nav
        this.listO = [];
        this.listT = [];
        if(this.pageIndex == 0){
          this.pageIndex = 1;
        }
        this.requestThods(serverConfig.getArticle,{ atId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
      if(type == 'zwzc'){
        this.requestThods(serverConfig.getPartyArticleList,{ stId:id,pageIndex:pageIndex,pageSize:this.showPageSize,villageId:villageId },this.pageIndex);
        return false;
      }
    },
    str(str){
      // if(str != null){
      //   if(str.length >= 66){
      //     return `${ str.substring(0,66) }...`;
      //   }else{
      //     return str;
      //   }
      // }
      return str;
    },
    requestThods(requestUrl,requestData,index){
      //获取文章列表（十九大精神）
      request.post(requestUrl,requestData,index).then((res) => {
        const { result } = res;
        const countAll = result.count;
        const list = [];
        const type = this.$route.params.type;
        if(result.list.length != 0) {
          if(type == 'wzhbg'){//无纸化办公
            if(result.list.length != 0){
              result.list.forEach(({
                id,
                createDate,
                title,
                coverLink,
                htmlLink,
                paperDescribe
              }) => {
                list.push({
                  id,
                  title,
                  urlimg:coverLink,
                  content:paperDescribe,
                  url:`/wzinfo/${id}/${ this.$route.params.type }/${ encodeURI(this.$route.params.headerName) }`
                })
              });
            }else{
              this.nullBox = true;
              this.loading = false;
              this.lastPageIsDisabled = true;
              this.nextPageIsDisabled = true;
            }
          }else{
            result.list.forEach(({
              id,
              thumbnailUrl,
              title,
              createDate,
              content,
              text
            }) => {
              list.push({
                id,
                title,
                text,
                urlimg:thumbnailUrl,
                content:this.str(text).length != 0 ? this.str(text) : '图片展示',
                time:`发布时间：${common.forMatData(createDate,2)}`,
                url:`/wzinfo/${id}/${ this.$route.params.type }/${ encodeURI(this.$route.params.headerName) }`
              })
            });
          }
          if(index != 1){
            this.lastPageIsDisabled = false;
            this.nextPageIsDisabled = false;
          }
          if(index == countAll){
            this.nextPageIsDisabled = true;
            this.pageIndex = index;
          }
          if(index == 1){
            this.lastPageIsDisabled = true;
            this.nextPageIsDisabled = false;
          }
          if(index == 1 && index == countAll){
            this.lastPageIsDisabled = true;
            this.nextPageIsDisabled = true;
          }
          this.listO = list.splice(0,2);
          this.listT = list;
          this.loading = false;
          this.nullBox = false;
        } else {
          this.nullBox = true;
          this.loading = false;
          this.lastPageIsDisabled = true;
          this.nextPageIsDisabled = true;
        }
      });
    }
  }
};
</script>
