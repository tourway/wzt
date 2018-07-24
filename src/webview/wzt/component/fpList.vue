<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName' v-if="!isPhones"></header-index>
    <!-- main -->
    <div class="baoshengcun-main__b2b f-fs f-w f-c f-ac">

      <div class="baoshengcun-main__listB2b f-c f" v-for="item in listB2b" :key='item.id'>
        <router-link :to='item.url' class="f-c f-ac baoshengcun-main__link">
          {{ item.names }}
        </router-link>
      </div>
      
      
      
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
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
      headerName: "",
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      listB2b: [],
      isPhones:false
    };
  },
  beforeMount() {
  },
  watch:{
    '$route' (to, from) {
      console.log(to);
      console.log(from);
    }
  },
  mounted() {
    const type = this.$route.params.type;
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    const isPhones = common.isPhone();
    if(isPhones){
      this.isPhones = true;
    }
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.functionModule, { id: id }).then(res => {
      const { result } = res;
      const listB2b = [];
      //首页——精准扶贫为民办事入口进入
      result.forEach(({ 
        id,
        names
      }) => {
        if(id == 38){
          listB2b.push({
            id,
            names,
            url: `/sjdjs/${id}/fpList/${ encodeURIComponent(names) }`
          });
        }else{
          listB2b.push({
            id,
            names,
            url: `/poor/${id}/${ encodeURIComponent(names) }`
          });
        }
      });
      this.listB2b = listB2b;
    });
  },
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>

