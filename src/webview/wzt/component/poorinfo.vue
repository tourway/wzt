<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdfz f-fs f-w">
      <div class="rdfz-sd f f-dc">
        <div class="poor-dd f-w">
          <div class="poor-dd__first">
            <h3 class="f-c f-ac rdfz-title hidden">贫困户{{ list.names }}的信息</h3>
            <div class="f f-sb poorinfo-title">
              <h4 class="userInfo f-fs f-c f-ac">个人信息</h4>
              <span class="f-c f-ac poorinfo-tel">扶贫热线电话：{{ list.helpingHotLine }}</span>
            </div>
            <!-- 党员信息 -->
            <div class="f-fs rdfz-box">
              <img class="rdfz-img" :src="list.thumbnailUrl" />
              <div class="rdfz-info f-sa boxScrollbar">
                <ul class="rdfz-info__dyinfo">
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">姓名：</span>{{ list.names }}</p>
                    <!-- <p>党员星级：<span class="iconfont icon-icon-test1 rdfz-xx"></span></p> -->
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">性别：</span>{{ list.sex }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">出生年月：</span>{{ list.dateBirth }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">籍贯：</span>{{ list.placeOfOrigin }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">学历：</span>{{ list.education }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">民族：</span>{{ list.nation }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">家庭年收入：</span>{{ list.familyAnnualIncome }} 元</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">职业：</span>{{ list.workUnit }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">联系方式：</span>{{ list.phone }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first"><span class="poor-span">居住地址：</span>{{ list.address }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="poor-dd__two">
            <h4 class="userInfo f-fs f-c f-ac">致贫原因</h4>
            <div class="kcinfo-box boxScrollbar" >
              {{ list.causesPoverty }}
            </div>
          </div>
          <!-- 党员信息 end -->
        </div>
        <div class="poor-dd f f-w">
          <div class="poor-dd__first">
            <div class="f f-sb poorinfo-title">
              <h4 class="userInfo f-fs f-c f-ac">扶贫措施</h4>
            </div>
            <div class="kcinfo-boxs boxScrollbar .rdfz-box" >
              {{ list.helpingMeasure }}
            </div>
          </div>
          <div class="poor-dd__two">
            <div class="f f-sb poorinfo-title">
              <h4 class="userInfo f-fs f-c f-ac">扶贫成果</h4>
            </div>
            <div class="kcinfo-boxs boxScrollbar .rdfz-box" >
              {{ list.helpingSituation }}
            </div>
          </div>
        </div>
      </div>
      <!-- 群众信息 -->
      <!-- 群众信息 end -->
    </div>

    <!-- footer -->
    <footer-index :showBtn='showBtn'></footer-index>
  </div>
</template>

<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { serverConfig } from '../../../config/config';
import request from '../../../lib/js/request';
import common from '../../../config/common';

export default {
  data() {
    return {
      isPartyMember:true,
      headerName: '',
      type:'',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      list: {}
    };
  },
  beforeMount() {
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    request.post(serverConfig.getPoorHouseholds,{ phId:id }).then((res) => {
      console.log(res);
      const { result } = res;
      const { massIntegrals } = result;
      const integralsList = [];
      result.dateBirth = common.forMatData(result.dateBirth,1);
      result.sex = result.sex == 1 ? '男' : '女';
      const defaultHeaderBase64 = 'resource/img/headerDefault.png';
      result.thumbnailUrl = result.thumbnailUrl.length != 0 ? result.thumbnailUrl : defaultHeaderBase64; 
      this.list = result;
    });
  },
  mounted() {},
  methods: {
  },
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>