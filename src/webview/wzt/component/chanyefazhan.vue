<template>
  <div class="wrap baoshengcun-index index">
      <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="bsc-cyfz">
        <ul class="bsc-ulCyfz f-fs">
          <li @click="tab(index)" v-for="(item,index) in tabs" :key="item.id" :index='index' class="bsc-liCyfz f-c f-ac" :class="{ active: active == index}">{{ item.tabName }}</li>
        </ul>
        <img class="bsc-cyfzImg" src="../../../lib/images/bsc/infoimg.jpg" alt="" srcset="">
        <div class="bsc-labor__cyfz boxScrollbar">
          {{ content }}
        </div>
        <!-- <component :is="currentView" ></component> -->
      </div>
      <!-- {{ childinfodata }} -->
    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
  
</template>
<script>
import Header from "./header.vue";
import Footer from "./footer.vue";

export default {
  props: ["childinfodata", "infotype", "childtab"],
  data() {
    return {
      headerName: "产业发展",
      active: 0,
      currentView: 0,
      showBtn: 3,
      // tabs: [{ tabName: "支柱产业" }, { tabName: "其他产业" }]
    };
  },
  mounted() {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  },
  methods: {
    tab(i, v) {
      this.active = i;
    }
  }
};
</script>
