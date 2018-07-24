<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__ddgx">
      <div class="ddgx-flex f f-sb" v-if="listO.length != 0">
        <router-link :to="item.url" class="f-sa f-c f-ac ddgx-link" v-for="item in listO" :key="item.id">
          <div class="ddgx-list f-c f-ac" >
          {{ item.title }}
          </div>
        </router-link>
      </div>
      <div class="ddgx-flex f f-sb" v-if="listT.length != 0">
        <router-link :to="item.url" class="f-sa f-c f-ac ddgx-link" v-for="item in listT" :key="item.id">
          <div class="ddgx-list f-c f-ac" >
          {{ item.title }}
          </div>
        </router-link>
      </div>
    </div>
    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";

import { serverConfig } from "../../../config/config.js";
import request from "../../../lib/js/request.js";
import common from '../../../config/common';

export default {
  data() {
    return {
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      listO: [
        { title: "党员信息", url: `/dylist/partyMember/1/${ encodeURIComponent('党员信息') }` },
        { title: "预备党员信息", url: `/rdfz/1/${ encodeURIComponent('预备党员信息') }` }
      ],
      listT:[
        { title: "入党积极分子", url: `/rdfz/0/${ encodeURIComponent('入党积极分子') }` },
        { title: "入党申请", url: `/rdrq/${ encodeURIComponent('入党申请') }` }
      ]
    };
  },
  beforeMount() {
  },
  mounted() {
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
  },
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

