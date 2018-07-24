<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__flfg">
      <div class="wgh-flex f f-sb" v-if="listO.length != 0">
        <router-link class="whg-a" :to="{ name: 'wghinfo', params: { id: item.id,headerName:headerName }}"  v-for="item in listO" :key="item.id">
          <div class="wgh-box">
            <img class="wgh-box__img" :src="item.thumbnailPictureUrl"/>
            <div class="wgh-box__con">
              <ul class="wgh-box__ul wgh-ul-r">
                <li class="wgh-box__li"><span class="wgh-box__span">片区名：</span>{{ item.areaname }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">负责人：</span>{{ item.principal }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">职务：</span>{{ item.duty }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">管辖区域：</span>{{ item.jurisdictionArea }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">工作单位：</span>{{ item.workUnit }}</li>
              </ul>
              <span class="wgh-ul__span hidden">查看详情<i class="iconfont icon-shuangjiantou-right icon-right"></i></span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="wgh-flex f f-sb" v-if="listT.length != 0">
        <router-link class="whg-a" :to="{ name: 'wghinfo', params: { id: item.id,headerName:headerName }}"  v-for="item in listT" :key="item.id">
          <div class="wgh-box">
            <img class="wgh-box__img" :src="item.thumbnailPictureUrl"/>
            <div class="wgh-box__con">
              <ul class="wgh-box__ul wgh-ul-r">
                <li class="wgh-box__li"><span class="wgh-box__span">片区名：</span>{{ item.areaname }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">负责人：</span>{{ item.principal }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">职务：</span>{{ item.duty }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">管辖区域：</span>{{ item.jurisdictionArea }}</li>
                <li class="wgh-box__li"><span class="wgh-box__span">工作单位：</span>{{ item.workUnit }}</li>
              </ul>
              <span class="wgh-ul__span hidden">查看详情<i class="iconfont icon-shuangjiantou-right icon-right"></i></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
    <div class="footer f-c f-ac f-sb">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: lastPageIsDisabled }" @click="lastPage">上一页</a>
      <div style="font-size:30px;color:red;display:none;">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>···</span>
        <span>10</span>
      </div>
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

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      active: 0,
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex: window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal'),
      showPageSize: 4,
      listO: [],
      listT: [],
      navList: [],
      nullBox:false,
      villageId:window.localStorage.getItem('villageId')
    };
  },
  beforeMount() {},
  mounted() {
    const headerName = this.$route.params.headerName;
    const villageId = this.villageId;
    const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    this.headerName = decodeURI(headerName);
    this.requestThods(serverConfig.getGriddingInformationList,{ pageIndex: pageIndexLocal, pageSize: this.showPageSize,villageId:villageId },pageIndexLocal);
  },
  methods: {
    lastPage() {
      this.listO = [];
      this.listT = [];
      const pageIndex = --this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(serverConfig.getGriddingInformationList,{pageIndex: pageIndex,pageSize: this.showPageSize,villageId:villageId},this.pageIndex);
    },
    nextPage() {
      this.listO = [];
      this.listT = [];
      const pageIndex = ++this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(serverConfig.getGriddingInformationList,{ pageIndex:pageIndex,pageSize: this.showPageSize,villageId:villageId }, this.pageIndex);
    },
    requestThods(requestUrl, requestData, index) {
      request.post(requestUrl, requestData, index).then(res => {
        const { result } = res;
        const countAll = result.count;
        const list = [];
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            areaname,
            principal,
            workUnit,
            duty,
            jurisdictionArea,
            thumbnailPictureUrl
          }) => {
            list.push({
              id,
              areaname,
              principal,
              workUnit,
              duty,
              jurisdictionArea,
              thumbnailPictureUrl:thumbnailPictureUrl.length != 0 ? thumbnailPictureUrl : defaultHeaderBase64,
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