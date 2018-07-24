<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="meet-box">
      <div class="flfg-title f-c f-ac hidden">{{ title }}</div>
      <div class="meet-box__main f-c f-ac">
        <div class="f f-ac f-c meet-box__re"><p class="meet-box__title" :style="meetTitleFontSize">{{ meetTitle }}</p></div>
        <p v-show="contentMeet" style="color:#b93837;font-size:55px;font-weight: bold;">暂无会议</p>
        <img class="meet-box__img" v-show="meetimgSrc != ''" :src="meetimgSrc" alt="" srcset="">
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

export default {
  data() {
    return {
      headerName: '',
      title: "会议签到",
      showBtn: 3,
      meetimgSrc:'',
      meetTitle:'',
      contentMeet:false
    };
  },
  beforeMount() {
    const headerName = this.$route.params.headerName;
    const villageId = window.localStorage.getItem('villageId');
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.getMeeting,{villageId:villageId}).then((res) => {
      const { result } = res;
      if(result != ''){
        this.meetimgSrc = result.code;
        if(result.title.length > 19){
          this.meetTitleFontSize = {
            'font-size':'30px'
          }
        }
        this.meetTitle = result.title;
        this.contentMeet = false;
      }else{
        this.contentMeet = true;
      }
    });
  },
  mounted() {},
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>