<template>
   <header class="f-sb baoshengcun-logo">
     <div class="f-fs baoshengcun-logo__main">
        <img src="../../../lib/images/bsc/logo.png" />
        <h3 class="f-c f-ac baoshengcun-title">{{ headerName }}</h3>
     </div>
     <div class="f-c f-ac baoshengcun-weather" v-if="weatherMain">
       <div class="f-fs f-c f-ac header-fa">
         <i class="iconfont icon-time iconfont-time"></i>
         <div class="f-dc f-c">
           <label class="header-time">{{ date }}</label>
           <span class="header-span">{{ dates }}</span>
         </div>
       </div>
       <div class="f-fs f-c f-ac">
         <i class="iconfont icon-weather iconfont-weather"></i>
         <div class="f-dc f-c">
           <label class="header-time">{{ weather }}°C</label>
           <span class="header-span f-c">{{ pm }}</span>
         </div>
       </div>
     </div>
   </header>
</template>
<script>
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';

export default {
  data () {
   return {
     date:'',
     weather:'',
     pm:'',
     dates:''
   }
  },
  props: ['headerName','weatherMain'],
  mounted () {
    this.updateTime()
    const timerID = setInterval(this.updateTime, 1000);
    request.post(serverConfig.getWeather,{}).then( (res) => {
      this.weather = res.result.HeWeather5[0].now.tmp;
      this.pm = res.result.HeWeather5[0].aqi.city.qlty;
      this.dates = res.result.date;
    });
  },
  methods: {
    updateTime(){
      let cd = new Date();
      this.date = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  }
}
</script>