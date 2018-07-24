<template>
  <div class="wrap baoshengcun-index main">
    <!-- heder  -->
    <loading :loading='loading'></loading>
    <header-index :headerName='headerName' :weatherMain='weatherMain'></header-index>
    <!-- main -->
    <div class="baoshengcun-main">
      <div class="f f-sb flex-b">
        <router-link v-for="item in listO" :key="item.id" :id='item.id' :to='item.url' class="f f-fs baoshengcun-item">
          <div class="f-c f-ac f-dc baoshengcun-item">
            <i class="baoshengcun-icon iconfont" :class="item.icon"></i>
            <span class="baoshengcun-item__title">{{ item.name }}</span>
          </div>
        </router-link>
      </div>
      <div class="f f-sb flex-b">
        <router-link v-for="item in listT" :key="item.id" :id='item.id' :to='item.url' class="f-fs baoshengcun-item">
          <div class="f-c f-ac f-dc baoshengcun-item">
            <i class="baoshengcun-icon iconfont" :class="item.icon"></i>
            <span class="baoshengcun-item__title">{{ item.name }}</span>
          </div>
        </router-link>
      </div>
      <div class="f f-sb flex-b">
        <router-link v-for="item in listS" :key="item.id" :id='item.id' :to='item.url' class="f-fs index-box baoshengcun-item">
          <div class="f-c f-ac f-dc baoshengcun-item">
            <i class="baoshengcun-icon iconfont" :class="item.icon"></i>
            <span class="baoshengcun-item__title">{{ item.name }}</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
  </div>
</template>

<script>
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';
import Header from './header.vue';
import Footer from './footer.vue';
import loading from './loading.vue';


export default {
  data () {
    return {
      loading:true,
      headerName:'智慧党建',
      showBtn:0,//控制尾部组件 1显示返回 2显示首页 3显示双按钮
      weatherMain:true,
      listO:[],
      listT:[],
      listS:[],
    }
  },
  beforeMount () {
  },
  mounted () {
    // const userAgent = navigator.userAgent;  
    // console.log(userAgent);
    // var index = userAgent.indexOf("Android")  
    // if(index >= 0){  
    //   var androidVersion = parseFloat(userAgent.slice(index+8));   
    //   console.log(`安卓版本：${ androidVersion }`);
    //   if(androidVersion<3){  
    //     // 版本小于3的事情  
    //     alert('版本小于3');  
    //   }  
    // }
    // console.log(`window.devicePixelRatio:${ window.devicePixelRatio }`);
    // console.log(`屏幕分辨率:${ window.screen.width }*${ window.screen.height }`);
    // console.log(`网页可见区域宽(body)，包括border:${ document.body.offsetWidth }*${ document.body.offsetHeight }`);
    // console.log(`网页可见区域高(body):${ document.body.clientWidth }*${ document.body.clientHeight }`);
    // console.log(`网页正文全文宽，包括有滚动条时的未见区:${ document.body.scrollWidth }*${ document.body.scrollHeight }`);
    // console.log(`网页被卷去的Top(滚动条)*网页被卷去的Left(滚动条):${ document.body.scrollTop }*${ document.body.scrollLeft }`);
    // console.log(this.$store.state.isLogin);
    window.localStorage.setItem('pageIndexLocal',1);
    this.listO = [];
    this.listT = [];
    this.listS = [];
    request.post(serverConfig.functionModule,{}).then( (res) => {
      const { result } = res;
      const list = [];
      result.forEach(({
        id,
        names
      }) => {
        list.push({
          id,
          name:names,
          icon:`${ this.iconFun(id).split('|')[0] }`,
          url:`${ this.iconFun(id,names).split('|')[1] }`,
        })
      });
      this.listO = list.slice(0,3);
      this.listT = list.slice(3,6);
      this.listS = list.slice(6,9);
      this.loading = false;
    });
  },
  methods: {
    iconFun(id,names){
      let str = '';
      if(id == 1){
        str = `icon-baibaoxiang|/bbx/${ id }/${ encodeURIComponent(names) }`;
      }else if(id == 2){
        str = `icon-d|/sjdjs/${ id }/sjdjs/${ encodeURIComponent(names) }`;
      }else if(id == 3){
        str = `icon-heart|/b2b/${ id }/fp/${ encodeURIComponent(names) }`;
      }else if(id == 4){
        str = `icon-f|/b2b/${ id }/whxk/${ encodeURIComponent(names) }`;
      }else if(id == 5){
        str = `icon-book|/cxsq/${ id }/cxsq/${ encodeURIComponent(names) }`;
      }else if(id == 6){
        str = `icon-rmb|/b2b/${ id }/cwgkgqhd/${ encodeURIComponent(names) }`;
      }else if(id == 7){
        str = `icon-develop|/sjdjs/${ id }/cyfz/${ encodeURIComponent(names) }`;
      }else if(id == 8){
        str = `icon-b2b|/b2b/${ id }/b2b/${ encodeURIComponent(names) }`;
      }else if(id == 9){
        str = `icon-autonomy|/sjdjs/${ id }/wzhbg/${ encodeURIComponent(names) }`;
      }
      return str;
    }
  },
  components: {
    loading,
    'header-index':Header,
    'footer-index':Footer,
  }
}
</script>
