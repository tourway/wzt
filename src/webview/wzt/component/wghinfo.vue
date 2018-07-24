<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__thema wghinfo-main">
      <div class="wgh-s f-fs">
        <div>
          <div class="t1 f-c f-ac">管辖人介绍</div>
          <div class="f-dc themjf-box__main">
            <img class="thema-img" :src="list.thumbnailPictureUrl" />
            <div class="f-sb themjf-box__last">
              <ul class="themjf-ul wghinfo-ul boxScrollbar">
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">姓名：{{ list.principal }}</p>
                </li>
                <li class="f-fs themjf-lit">出生年月：{{ list.dateBirth }}</li>
                <li class="f-fs themjf-lit">职务：{{ list.duty }}</li>
                <li class="f-fs themjf-lit">政治面貌：{{ list.rulingFace }}</li>
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">工作单位：{{ list.workUnit }}</p>
                </li>
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">片区名：{{ list.areaname }}</p>
                </li>
                <li class="f-fs themjf-lit">管辖区域：{{ list.jurisdictionArea }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="wh-ss">
          <div class="t1 f-c f-ac">管辖区域</div>
          <div class="wh-ss-nav">
            <ul class="f f-dc">
              <li class="ss-li f-c f-ac" :class="{ 'ss-active':!state }" @click="contentTab(true)">区域介绍</li>
              <li class="ss-li f-c f-ac" :class="{ 'ss-active':state }" @click="contentTab(false)">管辖成效</li>
            </ul>
          </div>
          <div class="wgh-e">
            <div class="wghinfo-bar boxScrollbar" v-html="content">
              <!-- {{ content }} -->
              <!-- {{ list.briefIntroduction }} -->
            </div>
            <!-- <div class="wghinfo-bar boxScrollbar"> -->
              <!-- {{ list.details }} -->
            <!-- </div> -->
          </div>
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

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      list: {},
      state:false,
      listCache:{},
      content:''
    };
  },
  beforeMount() {},
  mounted() {
    this.list = [];
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    this.requestThods(id);
  },
  methods: {
    requestThods(id){
      const crossScreenW = common.windowWidth();
      request.post(serverConfig.getGriddingInformation,{ giId:id }).then((res) => {
        const { result } = res;
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        res.result.dateBirth = common.forMatData(result.dateBirth,1);
        res.result.thumbnailPictureUrl = result.thumbnailPictureUrl.length != 0 ? result.thumbnailPictureUrl : defaultHeaderBase64
        this.list = result;
        if(crossScreenW){
          this.listCache = result;
          this.content = result.briefIntroduction;
        }
      });
    },
    contentTab(d){
      if(!d){//管辖成效
        // console.log(`${d}+管辖成效`);
        this.content = this.listCache.details;
        this.state = true;
      }else{//区域介绍
        // console.log(`${d}+区域介绍`);
        this.content = this.listCache.briefIntroduction;
        this.state = false;
      }
    }
  },
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

