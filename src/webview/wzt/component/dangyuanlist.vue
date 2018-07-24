<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__dylist">
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="dylist-flex f f-sb" v-if="listO.length != 0">
        <router-link class="dylist-box f-fs" :to="item.url" v-for='item in listO' :key="item.id">
          <div class="f-fs dylist-dy">
            <img class="dylist-img" :src="item.headPortraitUrl" />
            <div class="dylist-info">
              <ul class="dylist-ul">
                <li class="f-fs dylist-list">
                  <p class="dylist-first">姓名：{{ item.names }}</p>
                  <p class="hidden">党员星级：<span class="iconfont icon-icon-test1 dylist-xx"></span></p>
                </li>
                <li class="f-sb dylist-list">
                  <p class="dylist-first">学历：{{ item.education == '-1' ? '无' : item.education }}</p>
                  <p>党员积分：{{ item.integral }}分</p>
                </li>
                <li class="f-fs dylist-list">
                  <!-- visibility -->
                  <!-- <p class="dylist-first">职务：{{ item.posts }}</p> -->
                  <p>帮扶对象：{{ item.partyMembersPovertyHelpNames }}</p>
                </li>
                <li class="f-fs dylist-list ds">
                  居住地址：{{ item.address }}
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <div class="dylist-flex f f-sb" v-if="listT.length != 0">
        <router-link class="dylist-box f-fs" :to="item.url" v-for='item in listT' :key="item.id">
          <div class="f-fs dylist-dy">
            <img class="dylist-img" :src="item.headPortraitUrl" />
            <div class="dylist-info">
              <ul class="dylist-ul">
                <li class="f-fs dylist-list">
                  <p class="dylist-first">姓名：{{ item.names }}</p>
                  <p class="hidden">党员星级：<span class="iconfont icon-icon-test1 dylist-xx"></span></p>
                </li>
                <li class="f-sb dylist-list">
                  <p class="dylist-first">学历：{{ item.education == '-1' ? '无' : item.education }}</p>
                  <p>党员积分：{{ item.integral }}分</p>
                </li>
                <li class="f-fs dylist-list">
                  <!-- visibility -->
                  <!-- <p class="dylist-first">职务：{{ item.posts }}</p> -->
                  <p>帮扶对象：{{ item.partyMembersPovertyHelpNames }}</p>
                </li>
                <li class="f-fs dylist-list ds">
                  居住地址：{{ item.address }}
                </li>
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
import common from '../../../config/common';

export default {
  data() {
    return {
      nullBox:false,
      headerName: '',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex:window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal'),
      pageSize:4,
      villageId:window.localStorage.getItem('villageId'),
      listO: [],
      listT: []
    };
  },
  beforeMount() {
    this.listO = [];
    this.listT = [];
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    this.requestThods(this.pageIndex);
  },
  mounted() {},
  methods: {
    lastPage() {
      const pageIndex = --this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(pageIndex);
    },
    nextPage() {
      const pageIndex = ++this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(pageIndex);
    },
    requestThods(index){
      request.post(serverConfig.partyMemberList, { pageIndex: index, pageSize: this.pageSize,villageId:this.villageId }).then(res => {
        const list = [];
        const { result } = res;
        const countAll = result.count;
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            headPortraitUrl,
            names,
            education,
            address,
            posts,
            integral,
            partyMembersPovertyHelpNames
          }) => {
            list.push({
              id,
              names,
              education,
              address,
              integral,
              posts,
              headPortraitUrl:headPortraitUrl.length != 0 ? headPortraitUrl : defaultHeaderBase64,
              partyMembersPovertyHelpNames:partyMembersPovertyHelpNames.length != 0 ? partyMembersPovertyHelpNames : '无',
              url: `/dyinfo/${ this.$route.params.type }/${ id }/${ encodeURI(this.$route.params.headerName) }`,
            })
          });
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

