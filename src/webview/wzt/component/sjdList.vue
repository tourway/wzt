<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__ddgx f f-w">
      
      <router-link :to="item.url" class="f-sa f-c f-ac ddgx-link" v-for="item in list" :key="item.id">
        <div class="ddgx-list f-c f-ac" >
        {{ item.names }}
        </div>
      </router-link>
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
      list: []
    };
  },
  beforeMount() {
  },
  mounted() {
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.functionModule,{ id:this.$route.params.id }).then((res) => {
      const { result } = res;
      // const list = [];
      result.forEach((item) => {
        item['url'] = `/sjdjs/${ item.id }/sjdjs/${ encodeURIComponent(item.names) }`;
      })
      // result.forEach(({
      //   id,
      //   names
      // }) => {
      //   list.push({
      //     id,
      //     names,
      //     url:`/sjdjs/${ id }/sjdjs/${ encodeURIComponent(names) }`
      //   })
      // })
      this.list = result;
    });
  },
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

