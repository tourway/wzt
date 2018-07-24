<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdfzList">
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="rdfzList-flex f f-sb" v-if="listO.length != 0">
        <router-link class="rdfzList-box f-fs" :to="item.url" v-for='item in listO' :key="item.id">
          <div class="f-fs rdfz-box__main">
            <img class="rdfzList-img" :src="item.headPortraitUrl" />
            <div class="rdfzList-info f-fs">
              <ul class="rdfzlist-ul">
                <li class="f-fs rdfzd-list">
                  <p class="rdfzInfo-first">姓名：{{ item.names }}</p>
                  <!-- <p>党员星级：<span class="iconfont icon-icon-test1 rdfzInfo-xx"></span></p> -->
                </li>
                <li class="f-fs rdfzd-list">
                  <p class="rdfzInfo-first">学历：{{ item.education }}</p>
                  <!-- <p>党员积分：86分</p> -->
                </li>
                <li class="f-fs rdfzd-list">
                  推荐党小组：{{ item.recomOrg }}
                </li>
                <li class="f-fs rdfzd-list">
                  居住地址：{{ item.address }}
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <div class="rdfzList-flex f f-sb" v-if="listT.length != 0">
        <router-link class="rdfzList-box f-fs" :to="item.url" v-for='item in listT' :key="item.id">
          <div class="f-fs rdfz-box__main">
            <img class="rdfzList-img" :src="item.headPortraitUrl" />
            <div class="rdfzList-info f-fs">
              <ul class="rdfzlist-ul">
                <li class="f-fs rdfzd-list">
                  <p class="rdfzInfo-first">姓名：{{ item.names }}</p>
                  <!-- <p>党员星级：<span class="iconfont icon-icon-test1 rdfzInfo-xx"></span></p> -->
                </li>
                <li class="f-fs rdfzd-list">
                  <p class="rdfzInfo-first">学历：{{ item.education }}</p>
                  <!-- <p>党员积分：86分</p> -->
                </li>
                <li class="f-fs rdfzd-list">
                  推荐党小组：{{ item.recomOrg }}
                </li>
                <li class="f-fs rdfzd-list">
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

import Header from './header.vue';
import Footer from './footer.vue';
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';

export default {
  data () {
    return {
      nullBox:false,
      headerName:'',
      title:'',
      lastPageIsDisabled:true,
      nextPageIsDisabled:false,
      showBtn:3,//控制尾部组件 1显示返回 2显示首页 3显示双按钮
      pageIndex:window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal'),
      listO:[],
      listT:[],
      pageSize:4,
      villageId:window.localStorage.getItem('villageId')
    }
  },
  beforeMount () {},
  mounted () {
    const headerName = this.$route.params.headerName;
    const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    this.headerName = decodeURI(headerName);
    if(this.$route.params.type == 1){//预备党员
      this.title = '预备党员信息列表';
    }else{//入党分子
      this.title = '入党积极分子信息列表';
    }
    this.requestThods(pageIndexLocal);
  },
  methods: {
    lastPage(){
      const pageIndex = --this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',this.pageIndex);
      this.requestThods(pageIndex);
    },
    nextPage(){
      const pageIndex = ++this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',this.pageIndex);
      this.requestThods(pageIndex);
    },
    requestThods(index){
      request.post(serverConfig.partyMember,{ type:this.$route.params.type,pageIndex:index,pageSize:this.pageSize,villageId:this.villageId }).then((res) => {
        const { result } = res;
        const countAll = result.count;
        const list = [];
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            headPortraitUrl,
            education,
            address,
            names,
            recomOrg,
          }) => {
            list.push({
              id,
              address,
              names,
              recomOrg,
              education,
              headPortraitUrl:headPortraitUrl.length != 0 ? headPortraitUrl : defaultHeaderBase64,
              url:`/rdfzinfo/${id}/${this.$route.params.type}/${ encodeURIComponent(this.$route.params.headerName) }`
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
    'header-index':Header,
    'footer-index':Footer
  }
}
</script>