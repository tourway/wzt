import orderService from '../../../service/order/orderService';

export default class orderController{
  static getOrders(){

    // console.log(orderService.getOrderData());
    return orderService.getOrderData().then(function(data){
      // return false;
      if(typeof data === 'object'){
        const area_info = data.buyer_detail.area_info
        const id_card = data.buyer_detail.id_card;
        const true_name = data.buyer_detail.true_name;
        const mob_phone = data.buyer_detail.mob_phone;

        const total_all_freight = data.total_all_freight;
        const total_all_num = data.total_all_num;
        const total_all_price = data.total_all_price;
        const total_all_taxs = data.total_all_taxs;
        const order_sn = data.order_sn;

        const orderList = data;
        const order_detail = data.order_detail;
        // debugger
        const orderObjet = {
          area_info,
          id_card,
          order_sn,
          true_name,
          mob_phone,
          total_all_freight,
          total_all_num,
          total_all_price,
          total_all_taxs,
          order_detail,
          orderData:data
        }
        return orderObjet;
    }  
  })
  
  }
}