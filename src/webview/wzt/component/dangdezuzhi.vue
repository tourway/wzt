<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__bbx f-fs f-w f-sb">
      <!-- 1920 -->
      <ul class="bsc-ul f-dc sjd-main" style="bottom:35px;">
        <div class="sjdjs-ul-main boxScrollbar" :style="styleObject">
          <li @click="tab(index,item.view,item.type,item.tabName)" v-for="(item,index) in tabs"  :key="item.id" :type='item.type' :index='index' class="bsc-li f-c f-ac sjd-li" :class="{ active: active == index}">{{ item.tabName }}</li>
        </div>
        <li :style="ss" class="zzActivity-li f-c f-ac classification" @click="leftTab(switchTab)"><i :style="iconsf" class="iconfont sjd-icon-s visibility icon-shuangjiantou-right"></i>{{ classification }}<i :style="iconsf" class="iconfont sjd-icon-more icon-shuangjiantou-right"></i></li>
      </ul>
      <component class="compss-rr" @pLastPage='lastPage' @pNextPage='nextPage' @childTab='CTab' :childContent='childContent' :childinfodataContent='childinfodataContent' :leaderReuestData='leaderReuestData' :pictureUrl='pictureUrl' :childtab='childtab' :title='title' :is="currentViewCross" ></component>
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import wzinfo from "./wzinfo.vue";
import wzinfoCross from "./wzinfoCross.vue";
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      list: [],
      active: 0,
      currentView: "wzinfo",
      currentViewCross: "wzinfoCross",
      childinfodataContent: "",
      pictureUrl:'',
      title: '',
      childtab: 1,
      resultCache:{},
      childContent:'',
      tabs: [],
      leaderReuestData:{},
      styleObject:'',
      switchTab:false,
      ss:'',
      iconsf:'',
      classification:'分类',
      villageId:window.localStorage.getItem('villageId')
    };
  },
  beforeMount() {},
  mounted() {
    this.childtab = 1; //childTab ：1 基本情况 2：领导分工 3：组织结构
    this.info = "";
    const villageId = window.localStorage.getItem('villageId');
    const type = this.$route.params.type;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    if(this.$route.params.type == 1 || this.$route.params.type == 2){//1党的组织 2政权组织
      const tabs = [
        { tabName: "基本情况", view: "wzinfoCross", type: type },
        { tabName: "领导分工", view: "wzinfoCross", type: type },
        { tabName: "组织结构", view: "wzinfoCross", type: type }
      ]
      this.tabs = tabs;
      //type: 1 党的组织 2政权组织
      request.post(serverConfig.getPartyGovernOrgan,{ type:type,villageId:villageId }).then((res) => {
        const { result } = res;
        this.resultCache = res;
        // this.title = result.title;
        this.childinfodataContent = result.content;
      });
    }
    if(this.$route.params.type == 3){
      this.headerName = '党史党章';
      this.childtab = 1;
      const tabs = [
        { tabName: "党史", view: "wzinfo", type: 1 },
        { tabName: "党章", view: "wzinfo", type: 2 },
        { tabName: "党规", view: "wzinfo", type: 3 },
        { tabName: "权利与义务", view: "wzinfo", type: 4 },
        { tabName: "入党誓词", view: "wzinfo", type: 5 },
      ];
      this.tabs = tabs;
      request.post(serverConfig.getDataTable,{ type:1,villageId:villageId }).then((res) => {
        const { result } = res;
        // this.title = result.title;
        this.childinfodataContent = result.content;
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
    tab(i, v,t,n) {
      $('.bsc-wzinfo-e').scrollTop(0);
      const type = this.$route.params.type;
      const villageId = window.localStorage.getItem('villageId');
      this.styleObject = {};
      this.ss = {};
      this.iconsf = {};
      this.switchTab = false;
      this.classification = n;
      if(type == 1 || type == 2){//党的组织
        this.childtab = i + 1;
        const { result } = this.resultCache;
        if (this.childtab == 1) {//基本情况
          // this.title = result.title;
          this.childinfodataContent = result.content;
        } else if (this.childtab == 2) {//领导分工
          // this.title = result.title;
          request.post(serverConfig.getPGOLList,{ pgoId:type,pageIndex:1,pageSize:1,villageId:villageId }).then((res) => {
            const { result } = res;
            const { list } = result;
            const { leader } = list[0];
            const { count } = result;
            console.log(count);
            const defaultHeaderBase64 = 'resource/img/headerDefault.png';
            this.leaderReuestData = leader;
            this.leaderReuestData.headPortraitUrl = leader.headPortraitUrl.length != 0 ? leader.headPortraitUrl : defaultHeaderBase64;
            this.childContent = leader.profile;
            if(count == 1){
              this.leaderReuestData.lastPageIsDisabled = true;
              this.leaderReuestData.nextPageIsDisabled = true;
            }else{
              this.leaderReuestData.lastPageIsDisabled = true;
              this.leaderReuestData.nextPageIsDisabled = false;
            }
          });
        } else if (this.childtab == 3) {//组织结构
           console.log(result);
           this.pictureUrl = result.pictureUrl;
        }
      }
      if(type == 3){
        request.post(serverConfig.getDataTable,{ type:t,villageId:villageId }).then((res) => {
          const { result } = res;
          // this.title = result.title;
          this.childinfodataContent = result.content;
        });
      }
      // else{//政权组织
      //   this.childtab = 1;
      // }
      this.active = i;
      this.currentView = v;
    },
    CTab(i){
      this.pActive = i;
      if(i == 0){//个人简历
        this.childContent = this.leaderReuestData.profile;
      }else if(i == 1){//职务介绍
        this.childContent = this.leaderReuestData.duty;
      }else{
        this.childContent = this.leaderReuestData.profile;
      }
    },
    lastPage(type,pageindex){
       request.post(serverConfig.getPGOLList,{ pgoId:type,pageIndex:pageindex,pageSize:1,villageId:this.villageId}).then((res) => {
        const leader = res.result.list[0].leader;
        const countAll = res.result.count;
        this.leaderReuestData = leader;
        this.childContent = leader.profile;
        this.CTab(0);
        if(pageindex != 1){
          this.leaderReuestData.lastPageIsDisabled = false;
          this.leaderReuestData.nextPageIsDisabled = false;
        }
        if(pageindex == countAll){
          this.leaderReuestData.nextPageIsDisabled = true;
          this.leaderReuestData.pageIndex = pageindex;
        }
        if(pageindex == 1){
          this.leaderReuestData.lastPageIsDisabled = true;
          this.leaderReuestData.nextPageIsDisabled = false;
        }
        if(pageindex == 1 && pageindex == countAll){
          this.leaderReuestData.lastPageIsDisabled = true;
          this.leaderReuestData.nextPageIsDisabled = true;
        }
      });
    },
    nextPage(type,pageindex){
      request.post(serverConfig.getPGOLList,{ pgoId:type,pageIndex:pageindex,pageSize:1,villageId:this.villageId}).then((res) => {
        const leader = res.result.list[0].leader;
        const countAll = res.result.count;
        this.leaderReuestData = leader;
        this.childContent = leader.profile;
        this.CTab(0);
        if(pageindex != 1){
          this.leaderReuestData.lastPageIsDisabled = false;
          this.leaderReuestData.nextPageIsDisabled = false;
        }
        if(pageindex == countAll){
          this.leaderReuestData.nextPageIsDisabled = true;
          this.leaderReuestData.pageindex = pageindex;
        }
        if(pageindex == 1){
          this.leaderReuestData.lastPageIsDisabled = true;
          this.leaderReuestData.nextPageIsDisabled = false;
        }
        if(pageindex == 1 && pageindex == countAll){
          this.leaderReuestData.lastPageIsDisabled = true;
          this.leaderReuestData.nextPageIsDisabled = true;
        }
      });
    }
  },
  components: {
    wzinfo,
    wzinfoCross,
    "header-index": Header,
    "footer-index": Footer,
  },
  computed:{
    reversedMessage(){
    }
  }
};
</script>
