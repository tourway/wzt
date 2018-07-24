<template>
  <div class="login">
    <loading :loading='loading'></loading>
    <div class="login-main">
      <div class="f f-c f-ac login-b">
        <img class="login-logo" src="../../../lib/images/bsc/login-logo.png" alt="">
        <h3 class="f login-title">政好智慧党建</h3>
      </div>
      <div class="in-b f f-c f-ac">
        <span class="sd">请输入授权码：</span>
        <input type="text" class="in" :class="{ 'error shake animated': inputError }" @focus="inputFocus()" tabindex="1" v-model="account" placeholder="请输入授权码">
      </div>
      <div class="in-b f f-c f-ac hidden">
        <span class="sd">密<span class="ds-s"></span>码：</span>
        <input type="password" class="in" :class="{ 'error shake animated': inputError }" tabindex="2" v-model="password"  placeholder="请输入密码">
      </div>
      <div class="f f-c f-ac">
        <input type="button" @click="login()" class="in-btn" value="登  录">
      </div>
    </div>
  </div>
</template>
<script>
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';
import loading from './loading.vue';
import NProgress from 'nprogress';

export default {
  data () {
    return {
      account:'',
      password:'',
      inputError:false,
      loading:false
    }
  },
  beforeMount () {
  },
  mounted () {
    const _self = this;
    document.onkeydown = function(e) {
        e = e || window.event;
        if(e.keyCode == 13) {
            _self.login();
            return false;
        }
    }
  },
  methods: {
    inputFocus(){
      this.inputError = false;
    },
    login(){
      const self = this;
      const account = this.account;
      if(account === ''){
        this.inputError = true;
        this.$alert('请填写授权码！');
        NProgress.done();
        return false;
      }
      this.loading = true;
      const data = Object.assign({},{ equipmentnumber:account });
      request.post(serverConfig.checkEquipmentnumber,data).then((res) => {
        const { result,code } = res;
        this.loading = false;
        if(code == 0){
          this.$store.commit('increment');
          window.localStorage.setItem('villageId',result);
          this.$router.push({//你需要接受路由的参数再跳转
            path: '/index'
          });
        }else{
          this.inputError = true;
          this.account = '';
          NProgress.done();
          this.$alert('授权码输入错误，请正确输入授权码！');
        }
      }).finally((err) => {
        this.loading = false;
      });
    }
  },
  components: {
    loading
  }
}
</script>
