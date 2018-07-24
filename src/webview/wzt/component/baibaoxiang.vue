<template>
  <div class="wrap baoshengcun-index index">
    <!-- heder  -->
    <loading :loading='loading'></loading>
    <header-index :headerName='headerName' :weatherMain='weatherMain'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__bbxindex">
      <div class="bbx-flex f-sb f">
        <div class="baoshengcun-main__list f-c f-ac" v-for="item in listO" :key='item.id'>
          <router-link :to="item.url" class="f-fs baoshengcun-main__link f-c f-ac">
            <p class="bbx-iconp" :style="item.stylep"><i class="iconfont bbx-icon" :style="item.style" :class="item.iconClass"></i></p>
            <p class="bbx-icons f-c f-ac" :style="item.styles">{{ item.names }}</p>
          </router-link>
        </div>
      </div>
      <div class="bbx-flex f-sb f">
        <div class="baoshengcun-main__list f" v-for="item in listT" :key='item.id'>
          <router-link :to="item.url" class="f-fs baoshengcun-main__link f-c f-ac">
            <p class="bbx-iconp" :style="item.stylep"><i class="iconfont bbx-icon" :style="item.style" :class="item.iconClass"></i></p>
            <p class="bbx-icons f-c f-ac" :style="item.styles">{{ item.names }}</p>
          </router-link>
        </div>
      </div>
      <div class="bbx-flex f-sb f">
        <div class="baoshengcun-main__list f" v-for="item in listTH" :key='item.id'>
          <router-link :to="item.url" class="f-fs baoshengcun-main__link f-c f-ac">
            <p class="bbx-iconp" :style="item.stylep"><i class="iconfont bbx-icon" :style="item.style" :class="item.iconClass"></i></p>
            <p class="bbx-icons f-c f-ac" :style="item.styles">{{ item.names }}</p>
          </router-link>
        </div>
      </div>
      
    </div>
    <!-- footer -->
    <footer-index :showBtn='showBtn' :headerName='headerName'></footer-index>
  </div>
</template>

<script>

import Header from './header.vue';
import Footer from './footer.vue';
import loading from './loading.vue';
import common from '../../../config/common';

import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';


export default {
  data () {
    return {
      loading:true,
      headerName:'',
      showBtn:3,//控制尾部组件 1显示返回 2显示首页 3显示双按钮
      weatherMain:true,
      listO:[],
      listT:[],
      listTH:[]
    }
  },
  beforeMount () {
  },
  mounted () {
    this.listO = [];
    this.listT = [];
    this.listTH = [];
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.functionModule,{ id:this.$route.params.id }).then( (res) => {
      const list = [];
      const { result } = res;
      result.forEach(({
        id,
        names
      }) => {
        list.push({
          id,
          names,
          iconClass:this.iconClass(id).split('|')[0],
          style:this.iconClass(id).split('|')[1],
          url:this.urlHandle(names,id),
          styles:this.isPhoned(id).span,
          stylep:this.isPhoned(id).p
        });
      })
      this.listO = list.splice(0,4);
      this.listT = list.splice(0,4);
      this.listTH = list;
      this.loading = false;
    });
  },
  methods: {
    isPhoned(id){
       let styleObject = {};
       if(id == 18){
         styleObject = {
           span:{
             width:'70%'
           },
           p:{
             'margin-bottom':'-.093333rem'
           }
         }
       }
       return styleObject;
    },
    iconClass(id){
      const isphone = common.isPhone();
      let iconClass = '';
      if(id == 10){
          iconClass = `icon-partyMember|font-size:45px`;
        }else if(id == 11){
          iconClass = `icon-organization`;
        }else if(id == 12){
          iconClass = `icon-partyConstitution`;
        }else if(id == 13){
          iconClass = `icon-relationalNetwork|font-size:43px`;
        }else if(id == 14){
          iconClass = `icon-activity|font-size:43px;`;
        }else if(id == 15){
          iconClass = `icon-law|font-size:58px;top: -4px;position: relative;margin-right: 30px;`;
        }else if(id == 16){
          iconClass = `icon-policy|font-size:43px`;
        }else if(id == 17){
          iconClass = `icon-Sign|font-size:43px;position:relative;top:-5px;`;
        }else if(id == 18){
          iconClass = `icon-corrupt|font-size:57px;margin-right:-13px;position: relative;top: -5px;`;
        }else if(id == 19){
          iconClass = `icon-integral|font-size:40px`;
        }else if(id == 22){
          iconClass = `icon-partySchool|font-size:40px`;
        }else if(id == 23){
          iconClass = `icon-school|font-size:43px`;
        }
      return iconClass;
    },
    urlHandle(names,id){
      let str = '';
      if(id == 10){
        //type: 1 党的组织 2 政权组织
        str = `/ddzz/${id}/1/${ encodeURIComponent(names) }`;
      }else if(id == 11){
        //type: 1 党的组织 2 政权组织
        str = `/ddzz/${id}/2/${ encodeURIComponent(names) }`;
      }else if(id == 12){
        str = `/ddzz/${id}/3/${ encodeURIComponent(names) }`;
      }else if(id == 13){
        str = `/ddgx/${id}/${ encodeURIComponent(names) }`;
      }else if(id == 14){
        str = `/sjdjs/${id}/zzhd/${ encodeURIComponent(names) }`;
      }else if(id == 15){
        str = `/sjdjs/${id}/flfg/${ encodeURIComponent(names) }`;
      }else if(id == 16){
        str = `/zwzc/${id}/${ encodeURIComponent(names) }`;
      }else if(id == 17){
        str = `/meet/${id}/${ encodeURIComponent(names) }`;
      }else if(id == 18){
        str = `/sjdjs/${id}/wqlwfb/${ encodeURIComponent(names) }`;
      }else if(id == 19){
        //type == TheMasses 群众信息 type == isPartyMember 党员信息
        str = `/thema/TheMasses/${id}/${ encodeURIComponent(names) }`;
      }else if(id == 22){
        str = `/sjdjs/${id}/wdx/${ encodeURIComponent(names) }`;
      }else if(id == 23){
        str = `/sjdjs/${id}/nmyx/${ encodeURIComponent(names) }`;
      }
      return str;
    }
  },
  components: {
    loading,
    'header-index':Header,
    'footer-index':Footer
  }
}
</script>

