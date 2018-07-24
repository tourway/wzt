<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
    <div class="baoshengcun-main__whxk" v-if="listO.length != 0">
      <div class="whxk-flex f f-fs" v-if="listO.length != 0">
        <router-link :to="{name:'sjdjs',params:{ id:item.id , type:'whxk-list',headerName:item.names }}" v-for="item in listO" class="zwzc-list f-c f-ac whxk-ss" :key="item.id">
          <div class="f-c f-ac" >
            {{ item.names }}
          </div>
        </router-link>
      </div>
      <div class="whxk-flex f f-fs" v-if="listT.length != 0">
        <router-link :to="{name:'sjdjs',params:{ id:item.id , type:'whxk-list',headerName:item.names }}" v-for="item in listT" class="zwzc-list f-c f-ac whxk-ss" :key="item.id">
          <div class="f-c f-ac" >
            {{ item.names }}
          </div>
        </router-link>
      </div>
      <div class="whxk-flex f f-fs" v-if="listTH.length != 0">
        <router-link :to="{name:'sjdjs',params:{ id:item.id , type:'whxk-list',headerName:item.names }}" v-for="item in listTH" class="zwzc-list f-c f-ac whxk-ss" :key="item.id">
          <div class="f-c f-ac" >
            {{ item.names }}
          </div>
        </router-link>
      </div>
    </div>
    <div class="footer f-c f-ac">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: lastPageIsDisabled }" @click="lastPage">上一页</a>
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: nextPageIsDisabled }" @click="nextPage">下一页</a>
    </div>
    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
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
      nullBox:false,
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      listO: [],
      listT: [],
      listTH: [],
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex:1,
      pageSize:12,
      villageId:window.localStorage.getItem('villageId')
    };
  },
  beforeMount() {
  },
  mounted() {
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    const whxkId = window.localStorage.setItem('whxkId',id);
    const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    this.headerName = decodeURI(headerName);
    this.listO =[];
    this.listT =[];
    this.listTH =[];
    //三级页面返回参数错误 —— bug
    const id_s = whxkId != null ? whxkId : id;
    const pageIndexLocal_s = whxkId != null ? 1 : 1;
    this.requestThods(id_s,pageIndexLocal_s,this.pageSize);
  },
  methods: {
    lastPage() {
      const id = this.$route.params.id;
      const pageIndex = --this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(id,pageIndex,this.pageSize);
    },
    nextPage() {
      const id = this.$route.params.id;
      const pageIndex = ++this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(id,pageIndex,this.pageSize);
    },
    requestThods(id,index,size){
      request.post(serverConfig.getArticleType,{ fmId:id,pageIndex:index,pageSize:size,villageId:this.villageId }).then((res) => {
        const { result } = res;
        const list = [];
        const countAll = result.count;
        if(result.list.length != 0){
          result.list.forEach(({
            id,
            names
          }) => {
            list.push({
              id,
              names
            })
          })
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
          this.listO = list.splice(0,4);
          this.listT = list.splice(0,4);
          this.listTH = list;
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