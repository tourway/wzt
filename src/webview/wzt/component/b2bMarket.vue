<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__flfg">
      <ul class="f-dc sjdjs-ul sjd-main" v-show="this.navList.length != 0 && this.navList.length != 1">
        <div class="sjdjs-ul-main boxScrollbar" :style="styleObject">
          <li :style="styleObject" v-for="(navItem,index) in navList" @click="tab(index,navItem.id,navItem.names)" :key="navItem.id" :index='index' class="zzActivity-li f-c f-ac sjd-li" :class="{ active: active == index}">{{ navItem.names }}</li>
        </div>
        <li :style="ss" class="zzActivity-li f-c f-ac classification" @click="leftTab(switchTab)"><i :style="iconsf" class="iconfont sjd-icon-s visibility icon-shuangjiantou-right"></i>{{ classification }}<i :style="iconsf" class="iconfont sjd-icon-more icon-shuangjiantou-right"></i></li>
      </ul>
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="flfg-flex f f-sb" v-if="listO.length != 0">
        <router-link v-if="iscross" v-for="item in listO" :key="item.id" :id='item.id' :to='item.url' class="f flfg-box">
          <div class="f">
            <img class="flfg-box__img" :src="item.pictureUrl"/>
            <div class="flfg-box__con boxScrollbar">
              <ul class="b2bMarket-ul">
                <li class="b2bMarket-ul__li sjd-main"><span class="b2bMarket-ul__span">简介：</span>{{ item.briefIntroduction }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">联系人：</span>{{ item.contacts }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">电话号码：</span>{{ item.phoneNumber }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">地址：</span>{{ item.address }}<span class="b2b-o hidden">查看详情<i class="iconfont b2b-s icon-shuangjiantou-right"></i></span></li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <div class="flfg-flex f f-sb" v-if="listT.length != 0">
        <router-link v-if="iscross" v-for="item in listT" :key="item.id" :id='item.id' :to='item.url' class="f flfg-box">
          <div class="f">
            <img class="flfg-box__img" :src="item.pictureUrl"/>
            <div class="flfg-box__con boxScrollbar">
              <ul class="b2bMarket-ul">
                <li class="b2bMarket-ul__li sjd-main"><span class="b2bMarket-ul__span">简介：</span>{{ item.briefIntroduction }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">联系人：</span>{{ item.contacts }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">电话号码：</span>{{ item.phoneNumber }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span">地址：</span>{{ item.address }}<span class="b2b-o hidden">查看详情<i class="iconfont b2b-s icon-shuangjiantou-right"></i></span></li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="footer f-c f-ac">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: lastPageIsDisabled }" @click="lastPage">上一页</a>
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: nextPageIsDisabled }" @click="nextPage">下一页</a>
    </div>
    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from "../../../config/config";
import request from "../../../lib/js/request";
import common from "../../../config/common";

export default {
  data() {
    return {
      nullBox:false,
      headerName: '' ,
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      active: 0,
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex: 1,
      showPageSize:4,
      listO: [],
      listT: [],
      navList:[],
      switchTab:false,
      styleObject:'',
      ss:'',
      iconsf:'',
      iscross:false,
      classification:'分类'
    };
  },
  beforeMount() {
  },
  mounted() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;//区别是从那个入口进入到list列表
    const headerName = this.$route.params.headerName;//区别是从那个入口进入到list列表
    const pageIndexLocal = window.localStorage.getItem('pageIndexLocal') == null ? '1' : window.localStorage.getItem('pageIndexLocal');
    const villageId = window.localStorage.getItem('villageId');
    this.headerName = decodeURI(headerName);
    this.navList = [];
    this.listO = [];
    this.listT = [];
    this.iscross = true;
    const tabId = window.localStorage.getItem('tabId');
    const tabIndex = window.localStorage.getItem('tabIndex');
    if(tabId != null){
      this.active = tabIndex;
      request.post(serverConfig.getElectricityMartTypeList,{ type:type,villageId:villageId }).then((res) => {
        const { result } = res;
        const navList = [];
        if(result.length != 0){
          result.forEach(({
            id,
            names
          }) => {
            navList.push({
              id,
              names
            })
          });
          this.navList = navList;
          this.$route.params.id = tabId;
          //获取文章列表
          this.requestThods(serverConfig.getElectricityMartList,{ emtId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize },pageIndexLocal);
        }else{
          this.nullBox = true;
          this.lastPageIsDisabled = true;
          this.nextPageIsDisabled = true;
        }
      });
    }else{
      request.post(serverConfig.getElectricityMartTypeList,{ type:type,villageId:villageId }).then((res) => {
        const { result } = res;
        const navList = [];
        if(result.length != 0){
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
          this.requestThods(serverConfig.getElectricityMartList,{ emtId:this.$route.params.id,pageIndex:pageIndexLocal,pageSize:this.showPageSize },pageIndexLocal);
        }else{
          this.nullBox = true;
          this.lastPageIsDisabled = true;
          this.nextPageIsDisabled = true;
        }
      });
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
    tab(i, id,name) {
      this.active = i;
      this.$route.params.id = id;
      this.pageIndex = 0;
      this.styleObject = {};
      this.ss = {};
      this.iconsf = {};
      this.switchTab = false;
      this.nullBox = false;
      this.classification = name;
      this.listO = [];
      this.listT = [];
      window.localStorage.setItem('tabId',id);
      window.localStorage.setItem('tabIndex',i);
      window.localStorage.setItem('pageIndexLocal',1);
      this.requestThods(serverConfig.getElectricityMartList,{ emtId: id, pageIndex: 1, pageSize: this.showPageSize },1);
    },
    lastPage() {
      const id = this.$route.params.id;
      const type = this.$route.params.type;
      //有多个tabs时 > nav
      this.listO = [];
      this.listT = [];
      this.requestThods(serverConfig.getElectricityMartList,
        {
          emtId: id,
          pageIndex: --this.pageIndex,
          pageSize: this.showPageSize
        },
        this.pageIndex
      );
    },
    nextPage() {
      const id = this.$route.params.id;
      const type = this.$route.params.type;
      //有多个tabs时 > nav
      this.listO = [];
      this.listT = [];
      if (this.pageIndex == 0) {
        this.pageIndex = 1;
      }
      this.requestThods(serverConfig.getElectricityMartList,
        {
          emtId: id,
          pageIndex: ++this.pageIndex,
          pageSize: this.showPageSize
        },
        this.pageIndex
      );
    },
    requestThods(requestUrl, requestData, index) {
      //获取文章列表（十九大精神）
      request.post(requestUrl, requestData, index).then(res => {
        const { result } = res;
        const countAll = result.count;
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        const list = [];
        if(result.list.length != 0){
          this.nullBox = false;
          result.list.forEach(({
            id,
            contacts,
            phoneNumber,
            address,
            commodityDescription,
            pictureUrl,
            briefIntroduction
          }) => {
            list.push({
              id,
              contacts,
              phoneNumber,
              address,
              commodityDescription,
              briefIntroduction,
              url:`/wzinfo/${id}/b2b-js/${ encodeURI(this.$route.params.headerName) }`,
              pictureUrl:pictureUrl.length != 0 ? pictureUrl : defaultHeaderBase64
            })
          })
          if (index != 1) {
            this.lastPageIsDisabled = false;
            this.nextPageIsDisabled = false;
          }
          if (index == countAll) {
            this.nextPageIsDisabled = true;
            this.pageIndex = index;
          }
          if (index == 1) {
            this.lastPageIsDisabled = true;
            this.nextPageIsDisabled = false;
          }
          if (index == 1 && index == countAll) {
            this.lastPageIsDisabled = true;
            this.nextPageIsDisabled = true;
          }
          this.listO = list.splice(0,2);
          this.listT = list;
        }else{
          this.nullBox = true;
          this.lastPageIsDisabled = true;
          this.nextPageIsDisabled = true;
        }
      });
    }
  },
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>