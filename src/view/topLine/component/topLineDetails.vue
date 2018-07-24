<template>
  <div class="wrap">
      <loading v-if="loading"></loading>
      <div style="display:none;"><button id="OCHideHudView">OC</button></div>
       <!-- <div class="f-c f-dc topLineDetails-main"> -->
        <!-- <h3 class="topLineDetails-title">{{ request.headline_title }}</h3> -->
        <!--<span class="topLineDetails-time ml20">2017-05-06</span>-->
      <!-- </div>  -->
      <div class="topLineDetails" v-html="request.headline_body">
        {{ request.headline_body }}
      </div>

  </div>
</template>

<script>

import '../scss/topLineDetails.scss';
import topLineDetailsRequest from '../js/topLineDetailsData.js';
import common from '../../../config/_common.js';
import loading from '../component/loading.vue';
// import '../../../lib/scss/_utils.scss';
// import '../../../lib/scss/_universal.scss';

export default {
  data () {
    return {
      request:'',
      loading:false
    }
  },
  beforeMount(){  //mounted 之前执行

  },
  mounted(){
    this.WebViewOC();
    topLineDetailsRequest.getTopLineDetails(common.GetRequest().id).then((res) => {
      this.request = res;
      this.loading = false;
      $('#OCHideHudView').click();
      console.log(res);
    });
  },
  methods:{
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
