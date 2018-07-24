<template>

  <div class="main-loading">
    

    <div class="loading" v-if="loading">
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
  props: ['loading'],
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
  width: 80px;
  height: 80px;
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
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 8px;
  height: 24px;
}
.loader-inner > div:nth-child(1){
  top: 60px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
}

.loader-inner>div:nth-child(2) {
  top: 51.63636px;
  left: 23.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
}

.loader-inner>div:nth-child(3) {
  top: 27px;
  left: 33px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
}

.loader-inner>div:nth-child(4) {
  top: 1.36364px;
  left: 26.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
}

.loader-inner>div:nth-child(5) {
  top: -12px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
}

.loader-inner>div:nth-child(6) {
  top: 1.36364px;
  left: -25.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
}

.loader-inner>div:nth-child(7) {
  top: 27px;
  left: -33px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
}

.loader-inner>div:nth-child(8) {
  top: 50.63636px;
  left: -25.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
}
@media only screen and (min-width: 375px) and (max-width:1079px){
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
    margin-left:-.2rem;
    margin-top:-.733333rem;
  }
  .loader-inner{
    position: relative;
  }
  .loader-inner > div{
    background-color: #fe6905;
    border-radius: .026667rem;
    margin: .026667rem;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: .08rem;
    height: .213333rem;
  }
  .loader-inner > div:nth-child(1){
    top: .266667rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(2) {
    top: .203636rem;
    left: .203636rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(3) {
    top: 0;
    left: .266667rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(4) {
    top: -.203636rem;
    left: .203636rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(5) {
    top: -.293333rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(6) {
    top: -.203636rem;
    left: -.203636rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(7) {
    top: 0;
    left: -.293333rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  }

  .loader-inner>div:nth-child(8) {
    top: .203636rem;
    left: -.203636rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  }
}



/* .loader-inner > div{
  background-color: #fe6905;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 40px;
  height: 45px;
}
.loader-inner > div:nth-child(1){
  top: 10px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
}

.loader-inner>div:nth-child(2) {
  top: 15.27272px;
  left: 15.27272px;
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
  top: -15.27272px;
  left: 15.27272px;
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
  top: -15.27272px;
  left: -15.27272px;
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
  top: 15.27272px;
  left: -15.27272px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
} */
</style>
