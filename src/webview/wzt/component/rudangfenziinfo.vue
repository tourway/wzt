<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdfzInfo f-fs f-w">
      <div class="rdd-r f-sb">
        <div class="ss-ff">
          <h3 class="f-c f-ac rdfzInfo-title hidden">{{ typeName }}详细信息</h3>
          <h4 class="userInfo f-fs f-c f-ac">个人信息</h4>
            <div class="f-dc rdfzInfo-box rdfzInfo-bo__main">
              <img class="rdfzInfo-img" :src="list.headPortraitUrl" />
              <div class="rdfzInfo-info f-fs boxScrollbar">
                <ul>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">姓名：{{ list.names }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">性别：{{ list.sex }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">出生年月：{{ list.dateBirth }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">籍贯：{{ list.placeOfOrigin }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">学历：{{ list.education }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">工作单位：{{ list.workUnit }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">推荐党小组：{{ list.recomOrg }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">联系方式：{{ list.phone }}</p>
                  </li>
                  <li class="f-fs rdfzList-list">
                    <p class="rdfzList-first">居住地址：{{ list.address }}</p>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <div class="ff-ss">
          <h4 class="userInfo f-fs f-c f-ac">考察情况</h4>
          <div class="kcinfo-info boxScrollbar">
            {{ list.inveSituation }}
          </div>
        </div>
      </div>
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
      headerName: '',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      typeName:'',
      list:{}
    };
  },
  beforeMount() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    if(type == 1){
      this.typeName = '预备党员';
    }else if(type == 0){
      this.typeName = '入党积极分子';
    }
    request.post(serverConfig.getPositivePreparationDetails,{ ppId:id }).then((res) => {
      res.result.sex = res.result.sex == 1 ? '男' : ( res.result.sex == '-1' ? '未选择' : '女' );
      res.result.dateBirth = common.forMatData(res.result.dateBirth,1);
      const defaultHeaderBase64 = 'resource/img/headerDefault.png';
      res.result.headPortraitUrl = res.result.headPortraitUrl.length != 0 ? res.result.headPortraitUrl : defaultHeaderBase64; 
      // res.result.education = res.result.education == '-1' ? '未选择' : res.result.education;
      this.list = res.result;
      // console.log(this.list);
    });
  },
  mounted() {},
  methods: {},
  components: {
    "header-index": Header,
    "footer-index": Footer
  }
};
</script>
