<template>
<!--  该组件为 党的组织子组件 -->
  <div class="bsc-wzinfo boxScrollbar">
    <h3 class="bsc-wzinfo__title f-c f-ac hidden" v-if="childtab == 1">{{ title }}</h3>
    <div class="bsc-wzinfo__content" v-if="childtab == 1" v-html="childinfodataContent">
      {{ childinfodataContent }}
    </div>
    <div class="wzinfo-imgBox" v-if="childtab == 3">
      <img class="wzinfo-imgL" :src="pictureUrl" alt="">
    </div>
    <!-- 领导分工 -->
    <div class="bsc-wzinfo__box" v-if="childtab == 2">
      <div class="f-fs wzinfo-box">
        <img class="wzinfo-img" :src="leaderReuestData.headPortraitUrl" />
        <div class="f-sa wzinfo-main">
          <ul class="wzinfo-main__ul">
            <li class="wzinfo-list">姓名：{{ leaderReuestData.names }}</li>
            <li class="wzinfo-list">性别：{{ leaderReuestData.sex == 1 ? '男' : '女' }}</li>
            <li class="wzinfo-list">学历：{{ leaderReuestData.education }}</li>
            <li class="wzinfo-list">职务：{{ leaderReuestData.position }}</li>
            <li class="wzinfo-list">联系方式：{{ leaderReuestData.phone }}</li>
          </ul>
        </div>
      </div>
      <ul class="bsc-ul__wzinfo f-fs">
        <li @click="tabContent(index)" v-for="(item,index) in tabs" :key="item.id" :index='index' class="bsc-li__wzinfo f-c f-ac" :class="{ active: pActive == index}">{{ item.tabName }}</li>
      </ul>
      <div class="bsc-labor boxScrollbar" v-html="childContent"></div>
      <!-- <component :is="currentView" ></component> -->
    </div>
    <!-- 领导分工 end -->
    <div class="footer f-c f-ac wzinfo-footer" v-if="childtab == 2" style="width:50%;">
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: leaderReuestData.lastPageIsDisabled }" @click="lastPage">上一页</a>
      <a class="footer-btn f-c f-ac" :class="{ pointerEvents: leaderReuestData.nextPageIsDisabled }" @click="nextPage">下一页</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["childinfodataContent", "title", "pictureUrl", "childtab",'leaderReuestData','childContent','pictureUrl','pActive'],
  data() {
    return {
      currentView: 0,
      childContent:this.childContent,
      pageIndex:1,
      tabs: [
        { tabName: "个人简介" }, 
        { tabName: "职责介绍" }
      ]
    };
  },
  beforeCreate () {
  },
  beforeMount() {},
  mounted() {
  },
  components: {},
  methods: {
    tabContent(i) {
      this.$emit('childTab',i);
    },
    lastPage() {
      const type = this.$route.params.type;
      this.$emit('pLastPage',type,--this.pageIndex);
    },
    nextPage() {
      const type = this.$route.params.type;
      this.$emit('pNextPage',type,++this.pageIndex);
    },
  }
};
</script>
<style scoped>
.wzinfo-footer{
  margin-top:20px;
}
</style>
