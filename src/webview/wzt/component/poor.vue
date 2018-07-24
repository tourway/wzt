<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__flfg">
      <div class="poor-flex f-sb" v-if="listO.length != 0">
        <router-link class="poorList poor-s" :to="{ name: 'poorinfo', params: { id: item.id }}"  v-for="item in listO" :key="item.id">
          <div class="poor-s f">
            <img class="flfg-box__img" :src="item.thumbnailUrl"/>
            <div class="flfg-box__con">
              <ul class="b2bMarket-ul">
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">户主姓名：</span>{{ item.names }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">家庭成员数量：</span>{{ item.numberFamilyNum }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">家庭年收入：</span>{{ item.familyAnnualIncome }} 元</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">帮扶人：</span>{{ item.pmiNames }}</li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <div class="poor-flex f-sb" v-if="listT.length != 0">
        <router-link class="poorList poor-s" :to="{ name: 'poorinfo', params: { id: item.id }}"  v-for="item in listT" :key="item.id">
          <div class="poor-s f">
            <img class="flfg-box__img" :src="item.thumbnailUrl"/>
            <div class="flfg-box__con">
              <ul class="b2bMarket-ul">
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">户主姓名：</span>{{ item.names }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">家庭成员数量：</span>{{ item.numberFamilyNum }}</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">家庭年收入：</span>{{ item.familyAnnualIncome }} 元</li>
                <li class="b2bMarket-ul__li"><span class="b2bMarket-ul__span poor-ul__span">帮扶人：</span>{{ item.pmiNames }}</li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
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
  beforeMount() {
  },
  mounted(){
    const headerName = this.$route.params.headerName;
    const villageId = this.villageId;
    const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    this.headerName = decodeURI(headerName);
    this.requestThods(serverConfig.getPoorHouseholdsList,{ pageIndex: pageIndexLocal, pageSize: this.showPageSize,villageId:villageId },pageIndexLocal);
  },
  methods: {
    lastPage() {
      //有多个tabs时 > nav
      const pageIndex = --this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(serverConfig.getPoorHouseholdsList,{ pageIndex:pageIndex ,pageSize: this.showPageSize,villageId:villageId},this.pageIndex);
    },
    nextPage() {
      //有多个tabs时 > nav
      this.listO = [];
      this.listT = [];
      const pageIndex = ++this.pageIndex;
      const villageId = this.villageId;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(serverConfig.getPoorHouseholdsList,{ pageIndex: pageIndex,pageSize: this.showPageSize,villageId:villageId},this.pageIndex);
    },
    requestThods(requestUrl, requestData, index) {
      //获取文章列表（十九大精神）
      request.post(requestUrl, requestData, index).then(res => {
        const { result } = res;
        const countAll = result.count;
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        const list = [];
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            names,
            numberFamilyNum,
            familyAnnualIncome,
            pmiNames,
            thumbnailUrl
          }) => {
            list.push({
              id,
              names,
              numberFamilyNum,
              familyAnnualIncome,
              pmiNames,
              thumbnailUrl:thumbnailUrl.length != 0 ? thumbnailUrl : defaultHeaderBase64,
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