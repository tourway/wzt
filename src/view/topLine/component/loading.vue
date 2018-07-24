<template>

  <div class="main">
    <div class="loading" v-if="childLoadingDef">
      <div class="loading-wrap">
        <div class="loader-inner line-spin-fade-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: ['childLoadingDef'],
  mounted(){
    // console.log(this.childLoadingDef);
  }
}
</script>

<style scoped>
@-webkit-keyframes line-spin-fade-loader{
  50% {
    opacity: 0.3;
  }
  100%{
    opacity: 1;
  }
}
@keyframes line-spin-fade-loader{
  50%{
    opacity: 0.3;
  }
  100%{
    opacity: 1;
  }
}
@-webkit-keyframes circle{
  0%{ 
    transform:rotate(0deg); 
    }
  100%{ 
    transform:rotate(-360deg); 
  }
}
.loading-img{
  width: 30px;
  height: 30px;
  -webkit-animation:circle .3s infinite linear;/*匀速 循环*/
  animation:circle .3s infinite linear;/*匀速 循环*/
}
.loading {
  position: fixed;
  -webkit-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  margin: auto;
  background: transparent;
  opacity: 1;
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}
.loading-wrap{
  position: absolute;
  top: 50%;
  left:50%;
  margin-left:-15px;
  margin-top:-55px;
}
.loader-inner{
  position: relative;
}
.loader-inner > div{
  background-color: #fe6905;
  width: 4px;
  height: 20px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 3px;
  height: 8px;
}
.loader-inner > div:nth-child(1){
  top: 10px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
}

.loader-inner>div:nth-child(2) {
  top: 7.63636px;
  left: 7.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
}

.loader-inner>div:nth-child(3) {
  top: 0;
  left: 10px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
}

.loader-inner>div:nth-child(4) {
  top: -7.63636px;
  left: 7.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
}

.loader-inner>div:nth-child(5) {
  top: -11px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
}

.loader-inner>div:nth-child(6) {
  top: -7.63636px;
  left: -7.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
}

.loader-inner>div:nth-child(7) {
  top: 0;
  left: -11px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
}

.loader-inner>div:nth-child(8) {
  top: 7.63636px;
  left: -7.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
}
</style>
