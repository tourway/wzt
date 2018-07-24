<template>
  <div class="wrap baoshengcun-index index sjd-index">
    <!-- heder  -->
    <header-index :headerName='headerName'></header-index>
    <!-- main -->
    <div class="baoshengcun-main__rdfz f-fs f-w">
      <div class="rdfz-sd f f-fs">
        <div class="dyinfo-dd f-w f-dc">
          <h3 class="f-c f-ac rdfz-title hidden">{{ type }}{{ list.names }}的信息</h3>
          <h4 class="userInfo f-fs f-c f-ac">个人信息</h4>
          <div class="sf">
            <!-- 党员信息 -->
          <div class="f-fs rdfz-box">
            <img class="rdfz-img" :src="list.headPortraitUrl" />
              <div class="rdfz-info f-sa boxScrollbar">
                <ul class="rdfz-info__dyinfo">
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">姓名：{{ list.names }}</p>
                    <!-- <p>党员星级：<span class="iconfont icon-icon-test1 rdfz-xx"></span></p> -->
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">性别：{{ list.sex }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">出生年月：{{ list.dateBirth }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">籍贯：{{ list.placeOfOrigin }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">学历：{{ list.education }}</p>
                  </li>
                  <li class="f-fs dyinfo-list" v-if="isPartyMember">
                    <p class="rdfz-first">所在党组：{{ list.myPartyGroup }}</p>
                  </li>
                  <li class="f-fs dyinfo-list" v-if="isPartyMember">
                    <p class="rdfz-first">入党时间：{{ list.timeToJoinTheParty }}</p>
                  </li>
                  <li class="f-fs dyinfo-list" v-if="isPartyMember">
                    <p class="rdfz-first">工作单位：{{ list.workUnit }}</p>
                  </li>
                  <li class="f-fs dyinfo-list" v-if="!isPartyMember">
                    <p class="rdfz-first">职业：{{ list.occupation }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">联系方式：{{ list.phone }}</p>
                  </li>
                  <li class="f-fs dyinfo-list">
                    <p class="rdfz-first">居住地址：{{ list.address }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="fdf-s">
            <h4 class="userInfo f-fs f-c f-ac">{{ type }}积分</h4>
            <div class="kcinfo-box kcinfo boxScrollbar" v-if="isPartyMember">
              <div class="f-sb userInfo-wf" v-for='item in list.integralsList' :key="item.id">
                <p class="userInfo-content">{{ `${ item.explanation }${ item.type }${ item.integral }分` }}</p>
                <span class="userInfo-time f-ae">{{ item.doDate }}</span>
              </div>
            </div>
          </div>
          <!-- 党员信息 end -->
        </div>
        <div class="dyinfo-dd">
          <h4 class="userInfo f-fs f-c f-ac" v-if="isPartyMember">精准扶贫</h4>
          <div class="kcinfo-box kcinfo ds-oo boxScrollbar" v-if="isPartyMember">
            <p v-for="arr in list.partyMembersPovertyHelps" :key="arr.id" >{{ arr.describes }}</p>
          </div>
          <!-- 群众信息 -->
          <div class="kcinfo-box kcinfoWz-TheMasses boxScrollbar" v-if="!isPartyMember">
            <div class="f-sb" v-for='item in list.integralsList' :key="item.id">
              <p>{{ `${ item.explanation }+${ item.fraction }分` }}</p>
              <span class="userInfo-time">{{ item.doDate }}</span>
            </div>
          </div>
          <!-- 群众信息 end -->
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
      isPartyMember:true,
      headerName: '',
      type:'',
      showBtn: 3, //控制尾部组件 1显示返回 2显示首页 3显示双按钮
      list: {}
    };
  },
  beforeMount() {
    const type = this.$route.params.type;
    const id = this.$route.params.id;
    const headerName = this.$route.params.headerName;
    this.headerName = decodeURI(headerName);
    if(type == 'partyMember'){//党员信息请求
      this.type = '党员';
      this.isPartyMember = true;
      request.post(serverConfig.partyMemberInfo,{ pmiId:id }).then((res) => {
        const { result } = res;
        // console.table(result);
        const { partyMembersIntegrals } = result;//党员积分集合
        const { partyMembersPovertyHelps } = result;//精准扶贫
        const integralsList = [];
        result.dateBirth = result.dateBirth != undefined ? common.forMatData(result.dateBirth,1) : '无';
        result.sex = result.sex == 1 ? '男' : '女';
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        result.headPortraitUrl = result.headPortraitUrl.length != 0 ? result.headPortraitUrl : defaultHeaderBase64; 
        result.timeToJoinTheParty = result.timeToJoinTheParty != null ? common.forMatData(result.timeToJoinTheParty,1) : '无';
        partyMembersIntegrals.forEach(({
          id,
          createDate,
          explanation,
          integral,
          doDate,
          type
        }) => {
          integralsList.push({
            id,
            explanation,
            integral,
            type:type == 0 ? '基本分+' : ( type == 1 ? '先锋分+' : '扣分-'),
            createDate:common.forMatData(createDate,0),
            doDate:common.forMatData(doDate,0)
          })
        })
        result.integralsList = integralsList;
        this.list = result;
      });
    }else if(type == 'TheMasses'){//群众信息请求
      this.type = '群众';
      this.isPartyMember = false;
      request.post(serverConfig.getMassInfo,{ miId:id }).then((res) => {
        console.log(res);
        const { result } = res;
        const { massIntegrals } = result;
        const integralsList = [];
        const defaultHeaderBase64 = 'resource/img/headerDefault.png';
        result.dateBirth = result.dateBirth != null ? common.forMatData(result.dateBirth,1) : '无';
        result.sex = result.sex == 1 ? '男' : '女';
        result.headPortraitUrl = result.headPortraitUrl.length != 0 ? result.headPortraitUrl : defaultHeaderBase64; 
        massIntegrals.forEach(({
          doDate,
          explanation,
          fraction,
          id,
          names
        }) => {
          integralsList.push({
            id,
            explanation,
            fraction,
            names,
            doDate:common.forMatData(doDate,0)
          })
          result.integralsList = integralsList;
        })
        this.list = result;
      });
    }
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