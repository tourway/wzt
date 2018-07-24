<template>
  <div class="wrap">

    <div class="loading" :class="loading?'hidden':''">
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

    <header class="header">
      <div class="header-m f-ac">
        <div class="iconfont f icon-BBEA-CA---ABDx header-m-start__end"></div>
        <div class="header-m__title">确认订单</div>
        <div class="header-m-start__end f"></div>
      </div>  
    </header>
    <div class="content">

      <div class="address f-ac">
        <div class="adder-box">
          <ul class="address-ul">
            <li class="address-ul__li ">
                <img class="address-user" src="../../../lib/images/user.png" />
              <div class="address-add__info address-add__dd">
                <p>收货人：{{ orderObjet.true_name }}<span class="address-add__tel">{{ orderObjet.mob_phone }}</span></p>
                <p>身份证：{{ orderObjet.id_card }}</p>
                <div class="address-line"></div>
              </div>
              <div class="a"></div>
            </li>
            <li class="address-ul__li">
              <img class="address-add" src="../../../lib/images/address.png" />
              <div class="address-add__info f-sb">
                <!--<p >收货人：张晓红</p>-->
                <span class="address-add__table f-sa">地址：</span>
                <p class="address-add__p f-sa">
                  <span class="address-add__tabin">{{ orderObjet.area_info }}</span>
                </p>
              </div>
            </li>
            <li class="address-ul__icon iconfont icon-EFEA-EEF-DB-DD-CFACBDABx "></li>
            
          </ul>
          <div class="address-Line__bg"></div>
          </div>
          <!--<div class="address-ul__icon "></div>-->
      </div>
      <!-- order title -->
       <div class="count-order__box">
         
         <div class="f-ac pl count-order order-ft">总订单号：{{ orderObjet.order_sn }}</div>

         <div class="sonOderList" v-for="sonList in orderObjet.order_detail" v-if="typeof sonList === 'object' ">
           

            <div class="f-ac pl count-order">店铺名称：{{ sonList.store_name }}</div>
            <div class="f-ac pl count-order f-sb"><span>订单编号：{{ sonList.son_order_sn }}</span><span class="order-depot">{{ sonList.goods_send_way }}</span></div>
            <div class="order-wrap" v-for="(goodsList,index) in sonList" v-if="typeof goodsList === 'object' ">
              
              <!-- order -->
              <div class="order-main" :goods_id="goodsList.goods_id">
                <div class="order-main__img">
                  <img src="../../../lib/images/img1.png"/>
                </div>
                <div class="order-main__info">
                  <p class="order-main__title">{{ goodsList.goods_name }}</p>
                  <p class="order-main__spe" >规格：<span v-for="item in goodsList.goods_spec ">{{ item }}</span></p>
                  <div class="order-main__money f-sb f-ac">
                    <span class="f f__money iconfont icon-ACB-E-D-D-BCECx">{{ goodsList.goods_price }}</span>
                    <span class="f f__number">x{{ goodsList.goods_total_num }}</span>
                  </div>
                </div>
              </div>
            </div>
          
          <div class="f-ac pl order-i f-sb">
            <span>商品运费</span><span><i class="iconfont icon-ACB-E-D-D-BCECx myc"></i><span class="myc mycs">{{ sonList.total_freight }}</span></span>
          </div>
          
          <div class="f-ac pl order-i f-sb">
            <span>商品税金</span><span><i class="iconfont icon-ACB-E-D-D-BCECx myc"></i><span class="myc mycs">{{ sonList.total_taxs }}</span></span>
          </div>
          
          <div class="f-sb f-ac order-count" :class="orderN==2?'order-count__last':''">
            <div class="wrap-footer__count  f-ac ">
              <div class="wrap-footer__countM">
                <span>共{{ sonList.total_num }}件商品<span class="wrap-footer__xc">小计:</span>{{  }}</span>
                <span class="wrap-footer__my myc"><i class="iconfont icon-ACB-E-D-D-BCECx myc"></i>{{ sonList.total_price }}</span>
              </div>  
            </div>
          </div>
          
          </div>
          
       </div>

       
       <div class="f-ac order-msg pl">
        买家留言
       </div>
       <div class="order-box__textarea pl">
         <textarea class="order-msg__textarea" placeholder="选填：对本次交易的说明"></textarea>
       </div>
      <!--<div class="f-ac pl order-i f-sb">
        <span>活动优惠：满300减30</span><span class="myc">-<i class="iconfont icon-ACB-E-D-D-BCECx myc"></i><span class="myc mycs">20.00</span></span>
      </div>

      <a><div class="f-ac pl order-i f-sb">
        <span>优惠券</span><span>满100减5<i class="iconfont icon-EFEA-EEF-DB-DD-CFACBDABx order-mj"></i></span>
      </div></a>-->
    </div>

    <footer class="wrap-footer f-ac">
      <div class="f-sb f-ac wrap-footer__box">
        <div class="wrap-footer__count  f-ac ">
          <div class="wrap-footer__countM">
            <span>实付总金额</span>
            <span class="wrap-footer__my myc"><i class="iconfont icon-ACB-E-D-D-BCECx myc"></i>{{ orderObjet.total_all_price }}</span>
          </div>  
        </div>
        <div class="wrap-footer__submit  f-ac">
          <button class="wrap-footer__btn" :class="shelf?'submit-shelf__btn':''" @click="orderPay()">确认下单</button>
        </div>
      </div>
    </footer>
    
    <!--  -->
    <div class="order-pay" :class="isOpenPay?'hidden':''"></div>
    <div class="order-pp" :class="isOpenPay?'hidden':''">
      <div class="order-pay__box" :class="isOpenPay?'order-pay__out':'order-pay__in'">
        
        <div class="order-pay__main">
          <div class="order-header f-c f-ac">
            <i class="iconfont icon-ACAB-CE-E-A-DFAEEAx order-header__del" @click="closePay()"></i>
            <div class="order-header__title">请选择支付方式</div>
          </div>
          <ul class="pay-main">
            <li class="f-ac pay-main__li" @click="selePay()" v-if="!isWx">
              <img src="../../../lib/images/def.png" class="pay-main__icon" />
              <i class="iconfont icon-DB-C-B-B-FFABDCFx pay-zfb"></i>
              支付宝支付
            </li>
            <li class="f-ac pay-main__li" @click="selePay()" v-if="isWx">
              <img src="../../../lib/images/def.png" class="pay-main__icon" />
              <i class="iconfont icon-FD-CF-FE-BAC-ECCCEx pay-wx"></i>
              微信支付
            </li>
          </ul>
          <div class="f-c f-ac pay-money">
            需付款：<span class="pay-money__pay"><i class="iconfont icon-ACB-E-D-D-BCECx"></i>{{ orderObjet.total_all_price }}</span>
          </div>
          <button class="pay-submit" @click="immPay()" :class="isPayBtn?'':'pay-submit__sele'">立即支付</button>
        </div>

    </div>
    </div>

  </div>
</template>

<script>

import '../scss/order.scss'

import orderInfo from '../js/orderData.js';

import common from '../../../config/_common.js';

import { serverConfig } from '../../../config/config';

import request from '../../../lib/js/request';


let _this = this;
export default {
  data(){
    return {
      orderN:2, //订单是否为最后一个
      shelf:false,//商品是否为告罄或下架
      loading:true,
      isOpenPay:true,
      isPayBtn:false,//是否支付
      isWx:false,
      orderObjet:{}
    };
  },
  beforeMount(){  //mounted 之前执行
    this.isWx = common.isWx();
  },
  mounted(){
    // console.log(this.$refs.menuItem);
    // this.loading =  true;
    orderInfo.getOrders().then((res) =>{
      console.log(res);
      this.orderObjet = res;
    });
  },
  methods:{
    //确认下单
    orderPay(){
      
      const buyerData = this.orderObjet.order_detail;
      const wapOrderConfirmData = [];
      if(typeof buyerData === 'object'){
        for(let orderList in buyerData){
          for(let sonList in buyerData[orderList]){
            if(typeof buyerData[orderList][sonList] === 'object'){
              wapOrderConfirmData.push(`${buyerData[orderList][sonList].goods_id}:${buyerData[orderList][sonList].goods_total_num}`);
            }
          }
        }
      }
      // console.log(JSON.stringify(wapOrderConfirmData));
      this.openPay();

      for(let i =0;i < wapOrderConfirmData.length ;i++){
        
        const params = {
          'goods_id':wapOrderConfirmData[i].split(':')[0],
          'goods_num':wapOrderConfirmData[i].split(':')[1]
        };
        const post_obj = {
            "header":{
              "signature":'435996dfdf5d310b89282bef52448f59d1dfa873',
              "timestamp":'1489714819',
              "nonce":'61648'
              },
            "cmd":{
              "name":'wap_order_confirm'
              },
            "data":params
        };
        request.post(serverConfig.wap,post_obj).then((res) => {
          if(res.errcode === 10205){
          //   debugger
          //   console.log(res.data.goods_id);
          }
          $(".order-wrap .order-main").each(function () { 
            // console.log($(this).attr("goods_id")); 
            console.log(this);
          }); 
          // $('.order-wrap .order-main').each(() => {
          //   console.log(this.$el.querySelector('.order-main'));
          // })
        })
      }

    },
    selePay(){
      console.log(2);
    },
    closePay(){
      this.isOpenPay = true;
    },
    openPay(){
      this.isOpenPay = false;
    },
    //支付
    immPay(){
      const params = {
        'order_sn':this.orderObjet.order_sn
      };
      const post_obj = {
          "header":{
            "signature":'435996dfdf5d310b89282bef52448f59d1dfa873',
            "timestamp":'1489714819',
            "nonce":'61648'
            },
          "cmd":{
            "name":'alipay_payment'
            },
          "data":params
      };
      request.post(serverConfig.wap,post_obj).then((res) => {
        
      })
      console.log(params.order_sn);
    },
  }
}

</script>