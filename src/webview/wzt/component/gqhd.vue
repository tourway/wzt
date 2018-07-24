<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__gqhd">
      <div class="gqhd-main" v-for="item in list" :key="item.id">
        <div class="f f-fs ss-dss">
          <div class="gqhd-main__title f-dc f-ac f-c">
            <i class="iconfont icon-tiwen gqhd-icon-s"></i>
            <span class="gqhd-main__span">群众提问</span>
          </div>
          <div class="gqhd-main__answer boxScrollbar" v-html="item.problem">
            {{ item.problem }}
          </div>
        </div>
        <div class="f f-fs answer-main">
          <div class="gqhd-main__title f-sb">
            <div class="gqhd-main__title f-dc f-ac f-c">
              <i class="iconfont icon-daan gqhd-icon-s"></i>
              <span class="gqhd-main__span">回答</span>
            </div>
          </div>
          <div class="gqhd-main__answer boxScrollbar ss-d" v-html="item.answer">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>

    <div class="fabulous f f-c hidden">
      <div class="fabulous-box"><i class="iconfont icon-fabulous fabulous-icon"></i></div>
    </div>
    <div class="f f-ac f-c nullBox" v-show="nullBox">————  暂无数据  ————</div>
    <!-- footer -->
    <div class="footer f-c f-ac">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: lastPageIsDisabled }" @click="lastPage">上一页</a>
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: nextPageIsDisabled }" @click="nextPage">下一页</a>
    </div>

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
      list:[],
      lastPageIsDisabled: true,
      nextPageIsDisabled: false,
      pageSize:1,
      names:'',
      pageIndex:1,
      nullBox:false
    };
  },
  beforeMount() {
  },
  mounted() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;
    const headerName = this.$route.params.headerName;
    this.list = [];
    this.headerName = decodeURI(headerName);
    this.requestThods(id,1);
  },
  methods: {
    lastPage() {
      const id = this.$route.params.id;
      this.requestThods(id,--this.pageIndex);
    },
    nextPage() {
      const id = this.$route.params.id;
      this.requestThods(id,++this.pageIndex);
    },
    requestThods(id,index){
      request.post(serverConfig.getInteractionCadresMassesList, { icmtId:id,pageIndex: index, pageSize: this.pageSize }).then(res => {
        const list = [];
        const { result } = res;
        const countAll = result.count;
        if(result.list.length != 0) {
          this.names = result.list[0].names;
          result.list.forEach(({
            id,
            names,
            createDate,
            answer,
            problem,
            putQuestionsDate
          }) => {
            list.push({
              id,
              names,
              answer,
              problem,
              createDate:common.forMatData(createDate,2),
              putQuestionsDate:common.forMatData(putQuestionsDate,2)
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
          this.list = list;
        } else {
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

