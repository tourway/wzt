/*
 * @Author: tourway 
 * @Date: 2017-06-12 17:20:50 
 * @Last Modified by: tourway
 * @Last Modified time: 2017-06-14 11:15:21
 */
import topLineDetailsService from '../../../service/topLine/topLineDetailsService';

export default class topLineDetailsController{
  static getTopLineDetails(id){
    return topLineDetailsService.requestTopLineDetails(id).then((res) => {
      return res.data;
    });
  }
}