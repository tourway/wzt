<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName' :weatherMain='weatherMain'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__cxsqBox" v-show="!nullBox">
      <div class="cxsq-flex f-fs" v-if="cxsqListO.length != 0">
        <div class="baoshengcun-main__cxsqList f" :class="item.customClass" v-for="item in cxsqListO" :key='item.id' >
          <router-link :to='item.url'>
            <div class="baoshengcun-main__cxsq f-c f-ac" :class="item.customClass"><i :style="item.style" class="iconfont cs-icon" :class="item.iconClass"></i>{{ item.names }}</div>
          </router-link>
        </div>
      </div>
      <div class="cxsq-flex f-fs" v-if="cxsqListT.length != 0">
        <div class="baoshengcun-main__cxsqList f" :class="item.customClass" v-for="item in cxsqListT" :key='item.id' >
          <router-link :to='item.url'>
            <div class="baoshengcun-main__cxsq f-c f-ac" :class="item.customClass"><i :style="item.style" class="iconfont cs-icon" :class="item.iconClass"></i>{{ item.names }}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
    <div class="footer f-c f-ac" v-show="isGqhd">
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
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      cxsqListO: [],
      cxsqListT: [],
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageIndex:1,
      pageSize:6,
      isGqhd:false,
      weatherMain:false,
      iconClass:'',
      style:'',
      villageId:window.localStorage.getItem('villageId'),
      nullBox:false
    };
  },
  beforeMount() {
    
  },
  mounted() {
    this.weatherMain = true;
    const id = this.$route.params.id;
    const type = this.$route.params.type;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    this.cxsqListO = [];
    this.cxsqListT = [];
    //城乡社区发展治理
    if(type == 'cxsq'){
      const crossScreenW = common.windowWidth();
      request.post(serverConfig.functionModule,{ id:id }).then((res) => {
        const { result } = res;
        const cxsqList = [];
        result.forEach(({
          id,
          names
        }) => {
          if(id == 42){//网格化管理页面
            cxsqList.push({
              id,
              names,
              iconClass:'icon-wangluohua',
              url:`/wgh/${id}/${ encodeURIComponent(names) }`
            })
          }else{
            cxsqList.push({
              id,
              names,
              iconClass:this.iconClassf(id).split('|')[0],
              style:this.iconClassf(id).split('|')[1],
              url:`/sjdjs/${id}/cxsqList/${ encodeURIComponent(names) }`
            })
          }
          
        })
        if(!crossScreenW){
           cxsqList.push({
            id:1,
            names:'雪亮工程',
            url:''
          })
        }
        this.cxsqListO = cxsqList.splice(0,3);
        this.cxsqListT = cxsqList;
      });
    }
    //干群互动
    if(type == "gqhd"){
      this.isGqhd = true;
      this.requestThods(1,this.pageSize);
    }
  },
  methods: {
    iconClassf(id){
      let _class = '';
      if(id == 30){
        _class = 'icon-yanglaoyiliao'
      }else if(id == 31){
        _class = 'icon-chuangyejiuye|font-size:70px'
      }else if(id == 32){
        _class = 'icon-wudashequ|margin-left: -43px;'
      }else if(id == 33){
        _class = 'icon-cunminzizhi'
      }
      return _class;
    },
    lastPage() {
      this.requestThods(--this.pageIndex,this.pageSize);
    },
    nextPage() {
      this.requestThods(++this.pageIndex,this.pageSize);
    },
    requestThods(index,size){
      request.post(serverConfig.getInteractionCadresMassesTypeList,{ pageIndex:index,pageSize:size,villageId:this.villageId }).then((res) => {
        const { result } = res;
        const list = [];
        const countAll = result.count;
        const type = this.$route.params.type;
        if(result.list.length != 0){
          if(type == 'gqhd'){
            result.list.forEach(({
              id,
              names
            }) => {
              list.push({
                id,
                names,
                customClass:'cwgkgqhd',
                style:'display:none',
                url:`/gqhd/${id}/${ encodeURIComponent(names) }`
              })
            })
          }else{
            result.list.forEach(({
              id,
              names
            }) => {
              list.push({
                id,
                names,
                url:`/gqhd/${id}/${ encodeURIComponent(names) }`
              })
            })
          }
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
          this.cxsqListO = list.splice(0,3);
          this.cxsqListT = list;
        }else{
          this.nullBox = true;
          this.loading = false;
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

