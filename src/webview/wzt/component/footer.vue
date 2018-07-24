<template>
  <footer>
   <div class="baoshengcun-footer">
     <!-- <a :href="clickTime ? 'javascript:window.history.go(-1)' : 'javascript:void(0)'" v-show="showBtn === 1 || showBtn === 3"><i class="baoshengcun-icon__return iconfont icon-return baoshengcun-iconFooter"></i></a> -->
     <a @click="historyGo()" :href="url" v-show="showBtn === 1 || showBtn === 3"><i class="baoshengcun-icon__return iconfont icon-return baoshengcun-iconFooter"></i></a>
     <router-link to='/index' v-show="showBtn === 2 || showBtn === 3"><i class="baoshengcun-icon__home iconfont icon-home baoshengcun-iconFooter"></i></router-link>
   </div>
  </footer>
</template>

<script>
import common from '../../../config/common';
export default {
  data () {
   return {
    phone:false,
    clickTime:true,
    url:'javascript:window.history.go(-1)'
   }
  },
  props:['headerName','showBtn'],
  mounted () {
    // javascript:window.history.go(-1)
    // console.log(this.$route.name);
    const name = this.$route.name;
    const villageId = window.localStorage.getItem('villageId');
    if(name == 'index' || name == 'bbx' || name == 'fplist'){
      window.localStorage.setItem('pageIndexLocal',1);
      window.localStorage.removeItem('tabId');
      window.localStorage.removeItem('whxkId');
      window.localStorage.removeItem('tabName');
      window.localStorage.removeItem('tabIndex');
      window.localStorage.removeItem('searchKey');
      window.localStorage.removeItem('wghData');
      window.localStorage.removeItem('zwzcData');
      window.localStorage.removeItem('list');
      window.localStorage.removeItem('navList');
    }
    if(name == 'ddgx' || name == 'cxsq' || name == 'b2b' || name == 'whxk'){
      window.localStorage.removeItem('tabId');
      window.localStorage.removeItem('tabIndex');
      window.localStorage.removeItem('tabName');
      window.localStorage.setItem('pageIndexLocal',1);
    }
    if(name == 'zwzc'){
      // window.localStorage.setItem('pageIndexLocal',1);
    }
    if(name == 'sjdjs'){
      window.localStorage.setItem('pageIndexLocal',1);
    }
  },
  methods: {
    historyGo(){
      // setTimeout(() => {
      //   this.url = 'javascript:void(0)';
      // },400);
      if(!this.clickTime){
        this.url = 'javascript:void(0)';
      }else{
        this.clickTime = false;
      }
    }
  }
}
</script>