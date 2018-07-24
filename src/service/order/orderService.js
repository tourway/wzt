/*
 * @Author: tom 
 * @Date: 2017-03-17 09:30:05 
 * @Last Modified by: tourway
 * @Last Modified time: 2017-08-07 11:36:44
 */
import { serverConfig } from '../../config/config';
import request from '../../lib/js/request';
// import request from '../../lib/js/custom-request';


export default class orderService{
  static getOrderData(){
    
      const params = {
        'member_mobile':'18208150654',
        'cart_id':'68'
        // 'address_id':'1'
      };
      const post_obj = {
          "header":{
            "signature":'435996dfdf5d310b89282bef52448f59d1dfa873',
            "timestamp":'1489714819',
            "nonce":'61648'
            },
          "cmd":{
            "name":'wap_order_list'
            },
          "data":params
      };

    return request.post(serverConfig.wap,post_obj).then((res) => {
      console.log(res);
      return res.data;
    });
  }
}