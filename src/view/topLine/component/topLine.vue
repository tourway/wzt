<template>
  <div class="wrap">
      <!--<img src="../../../lib/images/test.png" class="wrapTest" >-->
      <loading v-if="loading" :childLoadingDef='isLoading'></loading>
      <div v-if="notTopLine" class="topLine-list__not f-c">敬请期待哦~</div>
      <div style="display:none;"><button id="OCHideHudView">OC</button></div>
      <div class="topLine-list"  v-for="item in items" @click="see(item.headline_title,item.id)" :title="item.headline_title" :key="item.id">
        <img class="topLine-list__img" :src="item.headline_img" >
        <div class="topLine-list__main f-c f-dc">
          <h3 class="topLine-list__title ml20">{{ item.headline_title }}</h3>
          <span class="topLine-list__time ml20">{{ item.publish_time }}</span>
        </div>
      </div>
  </div>
</template>

<script>
// import '../scss/scroll.scss';
import '../scss/topLine.scss';
import urlConfig from '../../../config/url-config.js';
import topLineList from '../js/topLineData.js';
import common from '../../../config/_common.js';
import loading from '../component/loading.vue';
// import mui from '../../../lib/js/mui.min.js';
// import scroll from './scroll.vue';

let v;//全局Vue
let finished = true;

export default {
  data () {
    return {
      items:[],
      loading:false,
      notTopLine:false,
      isLoading:false
    }
  },
  beforeMount(){  //mounted 之前执行

  },
  mounted(){
    v = this;
    this.wapScroll();
    this.WebViewOC();
    topLineList.getTopLines().then((res) => {
      this.loading = false;
      $('#OCHideHudView').click();
      if(res.returnArr.length != 0){
        this.items = res.returnArr;
      }else{
        this.notTopLine = true;
      }
      // console.log(res.returnArr.length);
    });
  },
  methods:{
    see(title,id){
      location.href = `${urlConfig.topLineDetails}&id=${id}&version=${common.GetRequest().version}&title=搜客头条`;
    },
    wapScroll(){
      let page = 1;
      $(window).scroll(function(){
         //监听事件内容
        //  console.log(common.getScrollHeight());
        //  console.log(common.getWindowHeight() + common.getDocumentTop());
        if(finished && parseInt(common.getScrollHeight()) === parseInt(common.getWindowHeight() + common.getDocumentTop())){
            finished = true;
            loadMore()
        }
        function loadMore(){
          page++;
          finished = true;
          topLineList.getTopLines(page).then((res) => {
            if(res.returnArr.length != 0){
              // console.log(res.returnArr);
              $('#OCHideHudView').click();
              v.items = v.items.concat(res.returnArr);
            }else{
              page = 1;
              finished = false;
              console.log('—— 没有更多数据 ——');
            }
          });
        }
      });
    },
    WebViewOC(){
      /*这段代码是固定的，必须要放到js中*/
      function setupWebViewJavascriptBridge(callback) {
          if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
          if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
      }
      /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
      
      setupWebViewJavascriptBridge(function(bridge) {
              /*我们在这注册一个JS方法，供OC调用，接收ObjC传过来的参数，并反馈结果给OC*/
            //   bridge.registerHandler("readyLoad", function(data, responseCallback) {
            //     if(jidIsNull != null  && jidIsNull.toString().length>1){
            //       responseCallback({'isIndex':'YES'});
            //     }else{
            //       return;
            //     }
            //   });
            //   bridge.registerHandler('showMenu', function(data) {
            //     if(data.parm=='1'){
            //         showMenu();
            //     }else if(data.parm=='0'){
            //       hideMenu();
            //     }
            //   })
            //   $('body').on("tap",".mui-backdrop",function (){ //tap ios 需要tap 事件 click 不能触发
            //     //alert('我已触发');
            // bridge.callHandler('clickBodyCloseBoard',{'parm':'0'},function(response){ return;});
            // });
            /*JS调用OC注册的方法，并向OC传递参数，JS得到OC反馈*/
            $('#OCHideHudView').click(function(){
              bridge.callHandler('hideHudView',function(response){ return;});
            });
      });
    }
  },
  components: {
    loading
  }
}
</script>
