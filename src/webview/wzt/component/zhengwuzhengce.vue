<template>
  <div class="wrap baoshengcun-index index">
    <!-- heder  -->
    <header-index :headerName='headerName' :weatherMain='weatherMain'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__zwzcList">
      <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
      <div class="zwzcList-flex f f-fs" v-if="listO.length != 0">
        <router-link :to='{ name:"sjdjs", params:{ id:item.id,type:"zwzc",headerName:item.names } }' v-for="item in listO" :key="item.id" class="zwzc-list f-c f-ac">
          <div class="zwzc-list f-c f-ac">
          {{ item.names }}
          </div>
        </router-link>
      </div>
      <div class="zwzcList-flex f f-fs" v-if="listT.length != 0">
        <router-link :to='{ name:"sjdjs", params:{ id:item.id,type:"zwzc",headerName:item.names } }' v-for="item in listT" :key="item.id" class="zwzc-list f-c f-ac">
          <div class="zwzc-list f-c f-ac">
          {{ item.names }}
          </div>
        </router-link>
      </div>
      <div class="zwzcList-flex f f-fs" v-if="listTH.length != 0">
        <router-link :to='{ name:"sjdjs", params:{ id:item.id,type:"zwzc",headerName:item.names } }' v-for="item in listTH" :key="item.id" class="zwzc-list f-c f-ac">
          <div class="zwzc-list f-c f-ac">
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
      headerName: "",
      title: "部门",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      listO: [],
      listT: [],
      listTH: [],
      weatherMain:true,
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex:1,
      pageSize:12,
      villageId:window.localStorage.getItem('villageId')
    };
  },
  beforeMount() {},
  mounted() {
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    // const pageIndexLocal=  window.localStorage.getItem('pageIndexLocal') == null ? 1 : window.localStorage.getItem('pageIndexLocal');
    const pageIndexLocal=  this.pageIndex;
    this.requestThods(pageIndexLocal,this.pageSize);
  },
  methods: {
    lastPage() {
      const pageIndex = --this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(pageIndex,this.pageSize);
    },
    nextPage() {
      const pageIndex = ++this.pageIndex;
      window.localStorage.setItem('pageIndexLocal',pageIndex);
      this.requestThods(pageIndex,this.pageSize);
    },
    requestThods(index,size){
      request.post(serverConfig.governmentPolicy,{ pageIndex:index,pageSize:size,villageId:this.villageId }).then((res) => {
        const list = [];
        const { result } = res;
        const countAll = result.count;
        if(result.list.length != 0){
          result.list.forEach(({ id, names }) => {
            list.push({
              id,
              names
            });
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

