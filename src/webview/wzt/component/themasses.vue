<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__thema f-fs f-w">
      <h3 class="f-c f-ac dylist-title hidden">群众积分列表</h3>
      <div class="thema-s">
        <router-link class="themjf-box first f-fs" :to="item.url" v-for='item in list' :key="item.id">
          <div class="f-fs themjf-box__main">
            <img class="thema-img" :src="item.headPortraitUrl" />
            <div class="f-sb themjf-box__last">
              <ul class="themjf-ul">
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">姓名：{{ item.names }}</p>
                  <!-- <p>党员星级：<span class="iconfont icon-icon-test1 dylist-xx"></span></p> -->
                </li>
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">学历：{{ item.education }}</p>
                  <!-- <p>党员积分：86分</p> -->
                </li>
                <li class="f-fs themjf-lit">
                  <p class="themjf-first">职业：{{ item.occupation }}</p>
                  <!-- <p>帮扶对象：{{ item.helpObj }}等</p> -->
                </li>
                <li class="f-fs themjf-lit">
                  出生日期：{{ item.age }}
                </li>
              </ul>
            </div>
            <div class="f-sb themjf-box__last">
              <ul class="themjf-ul">
                <li class="f-fs themjf-lit">电话：{{ item.phone }}</li>
                <li class="f-fs themjf-lit">群众积分：{{ item.integral }}分</li>
                <li class="f-fs themjf-lit">居住地址：{{ item.address }}</li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <!-- 1920 -->
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="thems-r f-sb" v-show="!nullBox">
          <div class="f-fs themjf-box__main" v-for='item in list' :key="item.id">
            <div class="teme-sdf">
              <img class="thema-img" :src="item.headPortraitUrl" />
              <div class="f-sb themjf-box__last">
                <ul class="themjf-ul boxScrollbar">
                  <li class="f-fs themjf-lit">
                    <p class="themjf-first">姓名：{{ item.names }}</p>
                    <!-- <p>党员星级：<span class="iconfont icon-icon-test1 dylist-xx"></span></p> -->
                  </li>
                  <li class="f-fs themjf-lit">
                    <p class="themjf-first">学历：{{ item.education }}</p>
                    <!-- <p>党员积分：86分</p> -->
                  </li>
                  <li class="f-fs themjf-lit">
                    <p class="themjf-first">职业：{{ item.occupation }}</p>
                    <!-- <p>帮扶对象：{{ item.helpObj }}等</p> -->
                  </li>
                  <li class="f-fs themjf-lit">
                    出生日期：{{ item.age }}
                  </li>
                  <li class="f-fs themjf-lit">电话：{{ item.phone }}</li>
                  <li class="f-fs themjf-lit">群众积分：{{ item.integral }}分</li>
                  <li class="f-fs themjf-lit">居住地址：{{ item.address }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="wgh-e tehs">
            <div class="wghinfo-bar boxScrollbar">
              <div class="f-sb" v-for='item in integralsList' :key="item.id">
                <p>{{ `${ item.explanation }+${ item.fraction }分` }}</p>
                <!-- <span class="userInfo-time">{{ item.createDate }}</span> -->
              </div>
            </div>
          </div>
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
<style scoped>
.msg-items {
  position: absolute;
  z-index: 1;
  top: 85px;
  bottom: 0;
  overflow: hidden;
  background-color: #F7F7F7;
  width: 100%;
  touch-action: none;
}
</style>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';

export default {
  data() {
    return {
      headerName:'',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      showPageSize:1,
      pageIndex:window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal'),
      list: [],
      nullBox:false,
      integralsList:'',
      villageId:window.localStorage.getItem('villageId')
    };
  },
  beforeMount() {},
  mounted() {
    const headerName = this.$route.params.headerName;
    const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    this.headerName = decodeURI(headerName);
    this.list = [];
    this.requestThods(pageIndexLocal);
  },
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
      request.post(serverConfig.getMassInfoList,{ pageIndex:index,pageSize:this.showPageSize,villageId:this.villageId }).then((res) => {
        const { result } = res;
        const countAll = result.count;
        const headerName = this.$route.params.headerName;
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        const list = [];
        const integralsList = [];
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            names,
            education,
            phone,
            integral,
            address,
            occupation,
            dateBirth,
            headPortraitUrl,
            massIntegrals
          }) => {
            massIntegrals.forEach(({
              id,
              createDate,
              explanation,
              type,
              fraction
            }) => {
              integralsList.push({
                id,
                fraction,
                explanation,
                type:type == 0 ? '基本分+' : ( type == 1 ? '先锋分+' : '扣分-'),
                createDate:common.forMatData(createDate,0)
              })
            })
            this.integralsList = integralsList;
            list.push({
              id,
              names,
              education,
              phone,
              integral,
              address,
              occupation,
              url:`/dyinfo/TheMasses/${ id }/${ encodeURIComponent(headerName) }`,
              headPortraitUrl:headPortraitUrl.length != 0 ? headPortraitUrl : defaultHeaderBase64,
              age:common.forMatData(dateBirth,1)
            })
          });
          console.log(this.integralsList);
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
          this.list = list;
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

